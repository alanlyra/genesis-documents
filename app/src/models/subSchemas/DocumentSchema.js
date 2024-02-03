const mongoose = require('mongoose');
const { Schema } = mongoose;
const PreProcessingService = require('../../services/PreProcessingService');

const DocumentSchema = new Schema({
    name: String,
    description: String,
    uploadDate: Date,
    URL: String,
    preprocessing: {
        text: String,
        sentences: [Schema.Types.Mixed]
    }
},{
    toJSON:{virtuals: true},
    toObject:{virtuals: true}
});

// Relação entre usuário e role pelo mongoose
DocumentSchema.virtual('projects', {
    ref: 'Document',
    localField: '_id',
    foreignField: 'bibliometrics.documents'
})

DocumentSchema.methods.preProcessing = PreProcessingService.preProcessing;

const Document = mongoose.model('Document', DocumentSchema, 'Documents')

module.exports = Document