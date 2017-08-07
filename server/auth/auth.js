const R = require('ramda');
const bcrypter = require('./bcrypter');
const tokener = require('./tokener');  //Todo

/**
 * Auth - todo
 */
const auth = function() {

    'use strict';
    const auth = {};

    const getUserObject = user=>R.props(Object.keys(user).filter(filterUserAtts), user);
    
    const filteredAttrs = ['password', 'created_at', 'updated_at'];
    const filterByAttrs = (attr) => filteredAttrs.indexOf(attr) === -1;

    auth.login = (req,res,next)=>{

        const body = getBody();
        const user = getUser(body); // TODO

        if(!canLogin(user)) return badRequest(res, 403);

        const valid = bcrypter.compare(body.password, user.password);

        if(!valid) return badRequest(res, 400);
        else return ok(req, user, next);
    }
    auth.reqister = (req)=>{

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
    function setToken(req, token){
        req.headers['x-api-token'] = token;
    }
    function getUserToken(req){
        return req.headers['x-api-token'] || req.body.token; 
    }

    return auth;
};

module.exports = auth();