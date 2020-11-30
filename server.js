const express = require('express');
const server = express();


server.use('*', (req, res) => {
    res.status(404).json({message: "not found"});
})

server.listen(5000, () => {
    console.log("SERVER IS LISTENING ON PORT 5000");
});