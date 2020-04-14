const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('../config');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const axios = require('axios');
const {nanoid} = require('nanoid');
const auth = require('../middleware/auth');

const storage = config.storage;
const upload = multer({storage});


router.get('/', async (req, res) => {
    const users = await User.find();
    if (!users) {
        res.status(401).send({error: 'No users'})
    }
    res.send(users)
});

router.get('/user/:id', async (req, res) => {
    const user = await User.findOne({_id: req.params.id});
    if (!user) {
        res.status(401).send({error: 'Такого пользователя нет'})
    }
    res.send(user)
});

router.post('/', upload.single('avatar'), async (req, res) => {
    const newUser = {
        fullName: req.body.fullName,
        username: req.body.username,
        emailOrPhone: req.body.emailOrPhone,
        password: req.body.password
    };
    if (req.file) {
        newUser.avatar = req.file.filename
    }
    const user = new User(newUser);

    try {
        await user.generationToken();
        await user.save();
        res.send(user)
    } catch (e) {
        e.code === 11000 ? res.status(401).send({errors: {username: {message: 'Такой пользователь существует!!!'}}}) :
            res.status(404).send(e)
    }
});


router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        res.status(401).send({error: 'Password or username in correct!'})
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        res.status(401).send({error: 'Password or username in correct!'})
    }
    try {
        await user.generationToken();
        await user.save();
        res.send(user)
    } catch (e) {
        res.status(404).send({error: 'Not found!'})
    }
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Bye'};

    const token = req.get('Authorization');
    if (!token) return res.send(success);
    const user = await User.findOne({token});
    if (!user) return res.send(success);

    user.generationToken();
    await user.save();
    return res.send(success);
});

router.post('/facebook', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const response = await axios.get(debugTokenUrl);
        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'});
        }
        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Wrong user ID'});
        }

        let user = await User.findOne({facebookId: req.body.id});
        if (!user) {
            const newUser = {
                fullName: req.body.name,
                username: req.body.id,
                password: nanoid(),
                facebookId: req.body.id
            };
            if (req.body.picture) {
                newUser.avatar = req.body.picture.data.url
            }
            user = new User(newUser);
        }
        await user.generationToken();
        await user.save();
        res.send(user)
    } catch (e) {
        res.status(404).send({error: 'Not found!'})
    }
});
router.put('/update', auth, upload.single('avatar'), async (req, res) => {
    const user = await User.findOne({_id: req.user._id});
    if (!user) {
        res.status(401).send({error: 'No user'})
    }
    user.fullName = req.body.fullName;
    if (req.file) {
        user.avatar = req.file.filename;
        user.avatar_change = true
    }
    if (req.user.facebookId) {
        user.username = req.body.username;
        user.username_changed = true
    }
    try {
        await user.generationToken();
        await user.save();
        res.send(user)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.post('/subscribe', auth, async (req, res) => {
    const user = req.user;
    user.subscriptions = [...user.subscriptions, req.body.id];
    await user.save();
    res.send(user)
});

module.exports = router;