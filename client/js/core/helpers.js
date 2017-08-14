export const queue = (fn = a=>a, t = 600) =>{
    setTimeout(()=> {
        fn();
    }, t);
};