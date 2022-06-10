const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");
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
incidentSchema.plugin(mongoosePaginate);
const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
