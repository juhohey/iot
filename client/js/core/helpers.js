export const queue = (fn = a=>a, t = 600) =>{
    setTimeout(()=> {
        fn();
    }, t);
};

export const last = arr => {
    const last = arr.length -1;
    return arr.slice(last, last +1)[0];
};