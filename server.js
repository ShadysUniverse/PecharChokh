const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const POSTS_FILE = 'posts.json';

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Read posts from file
const readPosts = () => {
    try {
        const data = fs.readFileSync(POSTS_FILE);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Write posts to file
const writePosts = (posts) => {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
};

app.get('/api/posts', (req, res) => {
    const posts = readPosts();
    res.json(posts);
});

app.post('/api/posts', (req, res) => {
    const posts = readPosts();
    const newPost = { message: req.body.message, createdAt: new Date() };
    posts.push(newPost);
    writePosts(posts);
    res.status(201).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
