window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:9020');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");

    var params = (new URL(document.location)).searchParams;
    var urlName = params.get('name');
    var urlChat = params.get('line');
    if (urlName) {
        name.value = urlName;
    }
    if (urlChat){
        field.value = urlChat;
    }
    if(urlChat && urlName) {
        var text = field.value;
        socket.emit('send', { message: text, username: name.value });
        field.value = "";
    }

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
            field.value = "";
        }
    };

}
