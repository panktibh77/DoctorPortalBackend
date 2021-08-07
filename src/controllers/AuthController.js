const express = require('express');
const AuthRoute = express.Router();
let jwt = require('jsonwebtoken');
const users = require('../models/usersModel').default;
const CryptoJS = require("crypto-js");
const { default: Users } = require('../models/usersModel');

AuthRoute.post('/login', async (req, res, next) => {
    let email = req && req.body && req.body.email;
    let password = req && req.body && req.body.password;
    if(email && password){
        try {
            let userObj = await users.query().where('email', email).first();
            if (userObj) {
                if (email === userObj.email && password === userObj.password) {
                    let token = jwt.sign(
                        {
                            email: userObj.email
                        },
                        process.env.SECRET,
                        {
                            expiresIn: '24h'
                        }
                    );
                    delete userObj.password;
                    res.status(200).send({
                        statusCode: res && res.statusCode,
                        statue: 'OK',
                        message: 'Authentication successful!',
                        token: token,
                        user: userObj
                    });
                }
                else {
                    res.status(403).send({
                        statusCode: res && res.statusCode,
                        status: 'Forbidden',
                        message: 'Invalid email or password!'
                    })
                }
            } else {
                res.status(404).send({
                    statusCode: res && res.statusCode,
                    status: 'Not Found',
                    message: 'Invalid email or password!'
                })
            }
        } catch (error) {
            res.status(500).send({ 
                statusCode: res && res.statusCode,
                status: 'Internal Server Error',
                error: error.message,
                stack: error.stack,
            })
        }
    } else {
        res.status(400).send({
            statusCode: res && res.statusCode,
            status: 'Bad Request',
            message: 'Authentication failed! please check the request'
        });
    }
})

AuthRoute.post('/sign-up',async (req, res, next) =>{
    try{
        const user = {
            'name': req.body.name,
            'email': req.body.email,
            'password': req.body.password
        }
        const users = Users.query().insertGraphAndFetch(user);
        res.status(201).send({
            statue: 'Created',
            message: 'User created successfully!',
            user: users
        })
    } catch(error){
        res.status(500).send({
            statusCode: res && res.statusCode,
            status: 'Internal Server Error!',
            message: error.message
        });
    }
})

// export default AuthRoute;
module.exports = AuthRoute;