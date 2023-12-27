new Promise((resolve, reject) => {
    console.log(111);
    resolve('error');
}).then(value => {
    console.log(222);
}).then(value => {
    console.log(value);
}).then(value => {
    console.log(value)
}).catch(reason => {
    console.log(reason);
})