const users = [];


function userJoin(id,username,grp) {
    const user = {id,username,grp};
    users.push(user);
    return user;   
}

function getCurrentUser(id) {
    return users.find(user=>user.id===id);
}

function userLeave(id) {
    const index = users.findIndex(user=>user.id===id);
    if(index !== -1){
        return users.splice(index,1)[0];
    }
}

function getGrpUsers(grp) {
    return users.filter(user => user.grp === grp);
  }

module.exports = {
    userJoin,getCurrentUser,userLeave,getGrpUsers
}