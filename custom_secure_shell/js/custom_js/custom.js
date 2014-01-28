window.addEventListener('load',function(e) {
    var iframeInterval = setInterval(function() {
        try {
            var iframeBody = document.getElementsByTagName('iframe')[0].contentDocument.body;
            setDragAndDropEventListeners(iframeBody);
            clearInterval(iframeInterval);
        } catch(e) {
            // iframe is not yet ready
        }
    },500);
});

function setDragAndDropEventListeners(iframeBody) {
    iframeBody.addEventListener('drop',function(e) {
        e.preventDefault();
        var images = e.dataTransfer.files;
        for (var i=0;i<images.length;i++) {
            var image = images[i];
            uploadToImgur(image);
        }
    },false);
    iframeBody.addEventListener('dragover',function(e) {
        e.preventDefault();
    },false);
}

function uploadToImgur(image) {
    var name = image.name.substr(0,image.name.indexOf("."));
    var formData = new FormData();
    formData.append("image",image);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization","Client-ID 5ff142545dd4022");
    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText);
        var commandString = "wget " + response.data.link + ";";
        commandString += "mv ";
        commandString += response.data.link.substr(response.data.link.lastIndexOf("/") + 1);
        commandString += " " + name + "_" + response.data.width + "_" + response.data.height + ".png\n";
        copy(commandString);
        paste(commandString);
        var iframeDocument = document.getElementsByTagName('iframe')[0].contentDocument;
        iframeDocument.body.focus();
    }
    xhr.send(formData);
}

function copy(text) {
    var textarea = document.createElement('textarea');
    textarea.style.position = 'absolute';
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.select();
    document.execCommand('copy');
}

function paste(string) {
    var iframeDocument = document.getElementsByTagName('iframe')[0].contentDocument;
    var cursor = iframeDocument.getElementsByClassName('cursor-node')[0];
    cursor.focus();
    cursor.setAttribute('focus','true');
    iframeDocument.execCommand('paste');
}
