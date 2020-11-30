const express = require('express');
const server = express();

const shortid = require('shortid'); 

//fake dummy user data'
let users = {
    id: shortid.generate(),
    name: "Jane Doe", 
    bio: "Not Tarzan's Wife, another Jane", 
}

const Users = {
    getAll() {
        return users;
    },
}

server.get('/api/users', (req, res) => {
    const users = Users.getAll();
    res.status(200).json(users);
})

server.use('*', (req, res) => {
    res.status(404).json({message: "not found"});
})

server.listen(5000, () => {
    console.log("SERVER IS LISTENING ON PORT 5000");
});