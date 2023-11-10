// Create web server
// 1. Require node modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// 2. Create an instance of express
const app = express();
// 3. Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
// 4. Set up routes
// GET /comments
app.get('/comments', (req, res) => {
  // 1. Read comments.json file
  fs.readFile('comments.json', 'utf8', (err, data) => {
    // 2. Send data back to client
    res.send(data);
  });
});
// POST /comments
app.post('/comments', (req, res) => {
  // 1. Read comments.json file
  fs.readFile('comments.json', 'utf8', (err, data) => {
    // 2. Convert data to an array
    const comments = JSON.parse(data);
    // 3. Add new comment to array
    comments.push({
      id: uuidv4(),
      name: req.body.name,
      comment: req.body.comment,
    });
    // 4. Write array back to file
    fs.writeFile('comments.json', JSON.stringify(comments), () => {
      // 5. Send success response to client
      res.send('Comment added successfully!');
    });
  });
});
// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  // 1. Read comments.json file
  fs.readFile('comments.json', 'utf8', (err, data) => {
    // 2. Convert data to an array
    const comments = JSON.parse(data);
    // 3. Remove comment from array
    const newComments = comments.filter((comment) => {
      return comment.id !== req.params.id;
    });
    // 4. Write array back to file
    fs.writeFile('comments.json', JSON.stringify(newComments), () => {
      // 5. Send success response to client
      res.send('Comment deleted successfully!');
    });
  });
});
// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  // 1. Read comments.json