const mongoose = require('mongoose');
const { Schema } = mongoose;

const collectionMapping = require('../collection_mapping/Projects.js')

const DocumentSchema = require('./subSchemas/DocumentSchema.js');
const RoadmapSchema = require('./subSchemas/RoadmapSchema.js.js');
const ScenariosSchema = require('./subSchemas/ScenariosSchema.js');
const ReportSchema = require('./subSchemas/ReportSchema.js');
const ProjectService = require('../services/ProjectService.js');
const PreProcessingService = require('../services/PreProcessingService.js');
const { collection } = require('./Projects.js');


const ProjectsSchema = new Schema({
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: String,
    owner: String,
    bibliometrics: {
        method: String,
        keywords: [String],
        documents: [DocumentSchema]
    },
    roadmap: [RoadmapSchema],
    scenarios: [ScenariosSchema],
    report: [ReportSchema]
});

ProjectsSchema.statics.addDocument = ProjectService.addDocument;
ProjectsSchema.statics.preProcessing = PreProcessingService.preProcessing;

module.exports = mongoose.model('Projects', ProjectsSchema, collectionMapping);