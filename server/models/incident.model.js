const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const incidentSchema = new Schema({
	title: { type: String, required: true },
    description: { type: String, required: true },
    projectName: { type: String, required: true },
    assignee: { type: String, required: true},
    priority: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
}, {
    timestamps: true,
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
