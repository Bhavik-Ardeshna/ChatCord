console.log('Welcome client.js');
const msgareaScroll = document.querySelector(".messagearea");
const socket = io();

//Grabing msg and using JS display it in frontend with desired format
socket.on('message', (msg) => {
    outputMsg(msg, "right");
    // Scroll always remain at bottom
    msgareaScroll.scrollTop = msgareaScroll.scrollHeight;
});

socket.on('recieve', (msg) => {
    outputMsg(msg, "left");
    // Scroll always remain at bottom
    msgareaScroll.scrollTop = msgareaScroll.scrollHeight;
});

// Eventlistner which listen the input message in box
$('form').on('submit', (e) => {
    e.preventDefault();
    socket.emit('message', $('#message').val());
    $('#message').val('');
});


// Utility function for displaying msg
function outputMsg(msg, side) {
    const div = document.createElement('div');
    let url;
    div.classList.add('msg');
    if (side === "right") {
        div.classList.add('rightarea');
        url = "url(https://image.flaticon.com/icons/svg/145/145867.svg)";
    } else {
        div.classList.add('leftarea');
        url = "url(https://image.flaticon.com/icons/svg/327/327779.svg)";
    }
    console.log(msg);
    div.innerHTML = `<div class="msg-img"
                        style="background-image: ${url}"></div>
                    <div class="bubble">
                        <div class="msg-info">
                            <div class="rname">${msg.username}</div>
                            <div class="time">${msg.time}</div>
                        </div>
                        <div class="msg-text">
                            ${msg.msg}
                        </div>
                    </div>`

    document.querySelector('.messagearea').appendChild(div);
}
