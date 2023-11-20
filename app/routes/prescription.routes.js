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

module.exports = app => {
    const prescriptions = require("../controllers/prescription.controller.js");

    // Create a new Prescription
    app.post("/api/v1/prescriptions", prescriptions.create);

    // Retrieve all Prescriptions
    app.get("/api/v1/prescriptions", prescriptions.findAll);

    // Retrieve a single Prescription with prescriptionId
    app.get("/api/v1/prescriptions/:prescriptionId", prescriptions.findOne);

    // Update a Prescription with prescriptionId
    app.put("/api/v1/prescriptions/:prescriptionId", prescriptions.update);

    // Delete a Prescription with prescriptionId
    app.delete("/api/v1/prescriptions/:prescriptionId", prescriptions.delete);

    // Delete all prescriptions
    app.delete("/api/v1/prescriptions", prescriptions.deleteAll);
};
