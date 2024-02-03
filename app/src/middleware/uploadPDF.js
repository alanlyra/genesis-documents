const express = require('express')
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'pdfDocs/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
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