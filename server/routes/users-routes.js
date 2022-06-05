const router = require('express').Router();

// Project Model
const User = require('../models/user.model');

// CREATE
router.route('/create').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;
    const newUser = new User({
    	name,
    	email,
    	role,
        password
    });

    newUser.save()
        .then(() => res.json('User successfully created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// READ
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE
router.route('/:id').delete((req,res) => {
User.findByIdAndDelete(req.params.id)
    .then(usr => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

