console.log('Welcome client.js');
const msgareaScroll = document.querySelector(".messagearea");
const socket = io();
const grpid = document.getElementById('grpid');
// const grpUsr = document.getElementById('grpUsr');
const userList = document.getElementById('usersidd');
//Grabing name and group gorm url using Qs library
const {username,grp} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});

console.log(username,grp);   

document.getElementById('hdname').innerText = username;

//Emit username and grp to server side
socket.emit("JoinGrp",{username,grp})

socket.on("grpUser",({grp,users})=>{
    outputGrpName(grp);
    outputUsers(users);
})

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

function outputGrpName(grp) {
    grpid.innerText = grp;
}

// function outputUsers(users) {
//     console.log(users);

//     const temp =[];
//     users.forEach(user=>{

//         if(temp.findIndex(name=>user.username===name)===-1){
//             temp.push(user.username);
//             document.getElementById('toemp').innerHTML="";
//             const div = document.createElement('div');
//         div.classList.add('grp-list');
//         div.innerHTML = `<h5>${user.username}</h5>`
//         document.querySelector('.grp-scroll').appendChild(div);
//         }
        
//     });
//     console.log(temp);
//    }
  
// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach(user=>{
      const li = document.createElement('li');
      li.classList.add('grp-list');
      li.innerText = user.username;
      userList.appendChild(li);
    });
   }