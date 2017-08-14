const R = require('ramda');
const bcrypter = require('./bcrypter');
//const tokener = require('./tokener');  //Todo
const userModel = require('../models/user');


/**
 * Auth - todo
 */
const auth = (knex) => {

    'use strict';
    const auth = {};
    const userModelInstance = userModel(knex);

    const getUserObject = user=>R.props(Object.keys(user).filter(filterUserAtts), user);
    const getUser = username => userModelInstance.getOne(username);
    
    const notPublic = ['password', 'created_at', 'updated_at'];
    const filterByNotPublic = (attr) => filteredAttrs.indexOf(attr) === -1;

    auth.login = async (req, res) => {

        try {
            const body = req.body//getBody();
            const userArr = await getUser(body.username); 
            const user = userArr[0];

            if(!user)
                    throw 'noSuchUser';
            if(!userModelInstance.canLogin(user))
                    throw '!canLogin';
            
            const valid = bcrypter.compare(body.password, user.password);

            if(!valid)
                    throw 'Passwd not valid';

            const token = {user:{username:user.username}};
            setToken(res, token);
            return user;
        } catch (cannotLoginErr) {
              return Promise.reject(cannotLoginErr);
        }
    }
    auth.reqister = (req) => {

        return new Promise((resolve, reject) => {
            
            const body = getBody(req);
            const instance = makeUser(body)
                .then(resolve)
                .catch(reject)
        });
    };
    
    auth.verify = (req, res, next)=>{

        const userToken = getUserToken(req);
        if(!userToken) return badRequest(res, 400);
        getUser(userToken)
            .then(userInstance=>{
                req.user = userInstance;
                next();
            })
            .catch(err=>{
                console.log('verify err', err);
                res.send(500)
            })

        //TODO jwt
    };

    function makeUser(body){
        const password = bcrypter.make(body.password);
        const userObject = getUserObject(body);
        const user = R.assoc('password', password, userObject);
        //Save
    }
    function canLogin(user){
        return user.canLogin;
    }
    function badRequest(res, code){
        res.sendStatus(code);
    }
    
    function ok(req, user, next){

        const token = tokener.get(user);
        setToken(req, token);

        const authUser = getUserObject(user);
        req.user = authUser;
        next(); 
    
    }
    function setToken(res, token) {
        res.cookie('x-api-token', token, { maxAge: 9000000, httpOnly: true });
    }
    function getUserToken(req){
        return req.cookies['x-api-token'] || req.body.token; 
    }

    return auth;
};

module.exports = auth;