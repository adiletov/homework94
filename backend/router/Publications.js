const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const Publication = require('../models/Publication');
const User = require('../models/User');


const config = require('../config');
const storage = config.storage;
const upload = multer({storage});

router.get('/', auth, async (req,res)=>{
    let subscriptions = [req.user._id];

    if(req.user.subscriptions.length > 0){
        subscriptions = subscriptions.concat(req.user.subscriptions);
    }
    const publications = await Publication.find({userId: {$in: subscriptions}}).sort({datetime: -1}).populate('userId');
    res.send(publications)
});

router.get('/tags', async (req, res) => {
    const tags = await Publication.distinct('tags');
    res.send(tags)
});

router.get('/:id', async (req,res)=>{
    const user  = await User.findOne({_id: req.params.id});
    let subscriptions = [user];

    if(user.subscriptions.length > 0){
        subscriptions = subscriptions.concat(user.subscriptions);
    }
    const publications = await Publication.find({userId: {$in: subscriptions}}).sort({datetime: -1}).populate('userId');
    res.send(publications)
});




router.post('/', auth, upload.single('image'), async (req, res) => {
        const newPublication = {
            title: req.body.title,
            description: req.body.description,
            userId: req.user._id,
            tags: JSON.parse(req.body.tags),
            datetime: new Date().toLocaleString('ru-Ru')
        };
        if (req.file) {
            newPublication.image = req.file.filename
        }
        const publication = new Publication(newPublication);
        try {
            await publication.save();
            res.send({message: 'Опубликовано'})
        } catch (e) {
            res.status(404).send(e)
        }
});

module.exports = router;