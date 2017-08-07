const fs = require("fs");
const path = require("path");

const readModuleFile = function() {

    'use strict';
    const readModuleFile = {};

    readModuleFile.require = (paths, condition)=>{

        const modules = [];
        const dirPath = path.join(paths.join(''));
        
        return fs.readdirSync(dirPath)
            .map( name=> {
                if(condition(name)) {
                    const module = require(path.join(dirPath+"/"+name));
                    return {name, module};
                }
            })
            .filter(a=>a);
    }

    return readModuleFile;
};

module.exports = readModuleFile();