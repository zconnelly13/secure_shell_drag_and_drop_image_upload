window.addEventListener('load',function(e) {
    document.getElementsByTagName('iframe')[0].contentDocument.body.addEventListener('drop',function(e) {
        e.preventDefault();
        console.log(e);
    },false);
    document.getElementsByTagName('iframe')[0].contentDocument.body.addEventListener('dragover',function(e) {
        e.preventDefault();
    },false);
});

