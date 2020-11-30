const express = require('express');
const server = express();

const shortid = require('shortid');
server.use(express.json());

//fake dummy user data'
let users = [];
const Users = {
    createNew(user) {
        const newUser = { id: shortid.generate(), ...user };
        users.push(newUser);
        return newUser;
    },
    getAll() {
        return users;
    },
}

server.post('/api/users', (req, res) => {
    const userFromClient = req.body;

    if (!userFromClient.name || !userFromClient.bio) {
        res.status(400).json({ message: 'name and bio are required!' })
    } else {
        const newlyCreatedUser = Users.createNew(userFromClient);
        res.status(201).json(newlyCreatedUser);
    }
})
server.get('/api/users', (req, res) => {
    const users = Users.getAll();
    res.status(200).json(users);
})


server.use('*', (req, res) => {
    res.status(404).json({ message: "not found" });
})

server.listen(5000, () => {
    console.log("SERVER IS LISTENING ON PORT 5000");
});