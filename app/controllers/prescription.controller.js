// ****************************************************************************
// Copyright 2023 David L. Whitehurst
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
//
// ****************************************************************************

const Prescription = require("../models/prescription.model.js");

// Create and Save a new Prescription
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    //console.log(req.body);

    // Create a Prescription
    const prescription = new Prescription({

        name: req.body.name,
        identNo: req.body.identNo,
        size: req.body.size,
        form: req.body.form,
        rxUnit: req.body.rxUnit,
        quantity: req.body.quantity,
        pharmacy: req.body.pharmacy,
        pharmacyPhone: req.body.pharmacyPhone,
        written: req.body.written,
        writtenBy: req.body.writtenBy,
        filled: req.body.filled,
        expired: req.body.expired,
        refillNote: req.body.refillNote,
        manufacturedBy: req.body.manufacturedBy,
        note: req.body.note
    });

    // Save Prescription in the database
    Prescription.create(prescription, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Prescription."
            });
        else {
            res.status(201); // created (success)
            res.send(''); // empty body
        }
    });
};

// Retrieve all Prescriptions from the database.
exports.findAll = (req, res) => {
    Prescription.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving prescriptions."
            });
        else {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(data);
        }
    });
};

// Find a single Prescription with a prescriptionId
exports.findOne = (req, res) => {
    Prescription.findById(req.params.prescriptionId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Prescription with id ${req.params.prescriptionId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Prescription with id " + req.params.prescriptionId
                });
            }
        } else res.send(data);
    });
};

// Update a Prescription identified by the prescriptionId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Prescription.updateById(
        req.params.prescriptionId,
        new Prescription(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Prescription with id ${req.params.prescriptionId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Prescription with id " + req.params.prescriptionId
                    });
                }
            } else {
                res.status(204); // no content (success)
                res.send(''); // empty body
            }
        }
    );
};

// Delete a Prescription with the specified prescriptionId in the request
exports.delete = (req, res) => {
    Prescription.remove(req.params.prescriptionId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Prescription with id ${req.params.prescriptionId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Prescription with id " + req.params.prescriptionId
                });
            }
        } else {
            res.status(204); // no content (success)
            res.send(''); // empty body
        }
    });
};

// Delete all Prescriptions from the database.
exports.deleteAll = (req, res) => {
    Prescription.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all prescriptions."
            });
        else {
            res.status(204); // no content (success)
            res.send(''); // empty body
        }
    });
};
