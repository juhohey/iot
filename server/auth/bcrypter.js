const bcrypt = require('bcrypt');

/**
 * Bcrypt - todo
 */
const bcrypter = ()=> {

    'use strict';
    const bcrypter = {};

    bcrypter.compare = (presumed, pass)=>bcrypt.compareSync(presumed, pass);

    /**
     * Are these sync methods?
     */
    bcrypter.make = (pass)=>{
      const salt = bcrypt.genSalt(); //default 10 rounds
      const encrypted = bcrypt.genHash(pass, salt);
      return encrypted;
    }

    return bcrypter;
};

module.exports = bcrypter();