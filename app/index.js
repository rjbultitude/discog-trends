fetch('./server/index.js')
    .then((d) => {
        console.log(d);
    })
    .catch((e) => {
        console.warn(e);
    });