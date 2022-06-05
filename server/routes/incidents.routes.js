const router = require('express').Router();

// Project Model
const Incident = require('../models/incident.model');

// index (get all Incidents)
router.route('/').get((req, res) => {
	Incident.find()
		.then(incidents => res.json(incidents))
		.catch(err => res.status(400).json('Error: ' + err));
});

// CREATE
router.route('/create').post((req, res) => { 
	const title = req.body.title;
    const description = req.body.description;
    const projectName = req.body.projectName;
    const assignee = req.body.assignee;
    const priority = req.body.priority;
    const status = req.body.status;
    const type = req.body.type;

    const newIncident = new Incident({
    	title,
    	description,
    	projectName,
        assignee,
    	priority,
    	status,
    	type,
    });

    newIncident.save()
     	.then(() => res.json('Incident successfully created.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// READ
router.route('/:id').get((req,res) => {
    Incident.findById(req.params.id)
        .then(incident => res.json(incident))
        .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE
router.route('/update/:id').post((req,res) => {
    Incident.findById(req.params.id)
        .then(incident => {
	    	incident.title = req.body.title;
	    	incident.description = req.body.description;
	    	incident.projectName = req.body.projectName;
            incident.assignee = req.body.assignee;
	    	incident.priority = req.body.priority;
	    	incident.status = req.body.status;
	    	incident.type = req.body.type;

            incident.save()
                .then(() => res.json('Incident updated'))
                .catch(err => res.status(400).json('Error: ' + err));
    	})
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE
router.route('/:id').delete((req,res) => {
    Incident.findByIdAndDelete(req.params.id)
        .then(incident => res.json('incident deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;