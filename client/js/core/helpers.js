export const queue = (fn = a=>a, t = 600) =>{
    setTimeout(()=> {
        fn();
    }, t);
};

export const last = arr => {
    const last = arr.length -1;
    return arr.slice(last, last +1)[0];
};

export const getID = () => Math.random().toString(36).substring(5);

export const toJSON = couldBeJSON => {
    
    try {
        const payload = JSON.parse(couldBeJSON);
        return payload;
    } catch (notJson) {
        console.error('payload not JSON', notJson);
        return {};
    }
}