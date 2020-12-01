const express = require('express');
const server = express();

const shortid = require('shortid');
server.use(express.json());

//empty array where users will be
let users = [];

const Users = {
    getAll() {
        return users;
    },
    getById(id) {
        return users.find(u => u.id === id);
    },
    createNew(user) {
        const newUser = { id: shortid.generate(), ...user };
        users.push(newUser);
        return newUser;
    },
    delete(id) {
        const user = users.find(u => u.id === id)
        if(user){
            users = users.filter(u => u.id !== id)
        }
        return users;
    },
    update(id, changes) {
        const user = users.find(u => u.id === id)
        if (!user) {
            return null
        } else {
            const updatedUser = { id, ...changes }
            users = users.map(d => {
                if (d.id === id) return { id, ...changes }
                return d
            })
            return { id, ...changes }
        }
    }
}

server.get('/api/users', (req, res) => {
    const users = Users.getAll();
    if (!users) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    } else {
        res.status(200).json(users);
    }
})
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = Users.getById(id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
})
server.post('/api/users', (req, res) => {
    const userFromClient = req.body;

    if (!userFromClient.name || !userFromClient.bio) {
        res.status(400).json({ message: 'name and bio are required!' })
    } else {
        const newlyCreatedUser = Users.createNew(userFromClient);
        res.status(201).json(newlyCreatedUser);
    }
})
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const deleted = Users.delete(id);
    if(deleted){
        res.status(200).json(deleted);
    } else {
        res.status(404).json({message: 'id not found with ' + id});
    }
});
server.put('/api/users/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    const updatedUser = Users.update(id, changes);
    if (updatedUser) {
        res.status(200).json(updatedUser);
    } else {
        res.status(404).json({ message: 'user not found with id ' + id })
    }
})

server.use('*', (req, res) => {
    res.status(404).json({ message: "not found" });
})

server.listen(5000, () => {
    console.log("SERVER IS LISTENING ON PORT 5000");
});