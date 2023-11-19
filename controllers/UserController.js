const User = require('../models/User')
const { createError } = require('../utils/Helpers')
const { errorCodesEnum, jwt_secret } = require('../Config')
const JWT = require('jsonwebtoken')

const now = Date.now();

signToken = (payload) => {
    const access_token = JWT.sign(payload, jwt_secret, { expiresIn: 3600 });
    const refresh_token = JWT.sign(payload, jwt_secret, { expiresIn: 86400 });
    return { access_token, refresh_token };
}

module.exports = {
    register: async (req, res, next) => {
        try {
            const newUser = User(req.body);
            const userAlreadyExists = await User.userAlreadyExists({ email: newUser.email });
            // check if user exists
            if (userAlreadyExists) {
                response = createError(errorCodesEnum.CONFLICT, "", {}, "User has already been taken", {});
                res.json(response);
                return
            }
            // create a new user
            const user = await User.saveUser(newUser)
            if (user) {
                // generate token for this use
                const payload = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile
                };
                const { access_token, refresh_token } = signToken(payload);
                res.json({
                    access_token,
                    token_type: "Bearer",
                    "expires_in": "3600",
                    "expires_at": `${now + 3600}`,
                    refresh_token,
                    "refresh_expires_at": `${now + 86400}`,
                    "refresh_expires_in": "86400",
                    user_info: user
                });
            }
            response = createError(errorCodesEnum.INTERNAL_SERVER_ERROR, "Whoops something went wrong");
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            User.findByQuery({ email: req.body.email }).then(user => {
                // compare password
                User.comparePassword(req.body.password, user.password).then(_isMatch => {
                    const payload = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    }
                    // generate token for this use
                    const { access_token, refresh_token } = signToken(payload);
                    res.json({
                        access_token,
                        token_type: "Bearer",
                        "expires_in": "3600",
                        "expires_at": `${now + 3600}`,
                        refresh_token,
                        "refresh_expires_at": `${now + 86400}`,
                        "refresh_expires_in": "86400",
                        user_info: user
                    });

                }).catch(err => {
                    response = createError(errorCodesEnum.Unauthorized, "User not found");
                    res.json(response);
                });
            }).catch(err => {
                response = createError(errorCodesEnum.Unauthorized, "Unable to get user information");
                res.status(200).json(response);
            })

        } catch (error) {
            next(error);
        }


    },
    profile: async (req, res) => {
        res.json(req.user);
    }
}