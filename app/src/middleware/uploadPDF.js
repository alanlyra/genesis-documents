const express = require('express')
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files/pdfDocs/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + uuidv4() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

const uploadPDF = (req, res, next) => {
    upload.single('file')(req, res, function (err) {
        if (err) {
            return res.status(400).send({ error: err.message })
        }
        next()
    })
}

module.exports = uploadPDF;