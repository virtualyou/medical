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

const sql = require("./db.js");

// constructor
const Prescription = function(prescription) {

    this.name = prescription.name;
    this.identNo = prescription.identNo;
    this.size = prescription.size;
    this.form = prescription.form;
    this.rxUnit = prescription.rxUnit;
    this.quantity = prescription.quantity;
    this.pharmacy = prescription.pharmacy;
    this.pharmacyPhone = prescription.pharmacyPhone;
    this.written = prescription.written;
    this.writtenBy = prescription.writtenBy;
    this.filled = prescription.filled;
    this.expired = prescription.expired;
    this.refillNote = prescription.refillNote;
    this.manufacturedBy = prescription.manufacturedBy;
    this.note = prescription.note;
};

Prescription.create = (newPrescription, result) => {
    sql.query("INSERT INTO prescriptions SET ?", newPrescription, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created prescription: ", { id: res.insertId, ...newPrescription });
        result(null, { id: res.insertId, ...newPrescription });
    });
};

Prescription.findById = (prescriptionId, result) => {
    sql.query(`SELECT * FROM prescriptions WHERE id = ${prescriptionId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found prescription: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Prescription with the id
        result({ kind: "not_found" }, null);
    });
};

Prescription.getAll = result => {
    sql.query("SELECT * FROM prescriptions", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("prescriptions: ", res);
        result(null, res);
    });
};

Prescription.updateById = (id, prescription, result) => {
    sql.query(
        "UPDATE prescriptions SET name = ?, identNo = ?, size = ?, form = ?, rxUnit = ?, quantity = ?, pharmacy = ?, pharmacyPhone = ?, written = ?, writtenBy = ?, filled = ?, expired = ?, refillNote = ?, manufacturedBy = ?, note = ? WHERE id = ?",
        [prescription.name, prescription.identNo, prescription.size, prescription.form, prescription.rxUnit, prescription.quantity, prescription.pharmacy, prescription.pharmacyPhone, prescription.written, prescription.writtenBy, prescription.filled, prescription.expired, prescription.refillNote, prescription.manufacturedBy, prescription.note, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Prescription with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated prescription: ", { id: id, ...prescription });
            result(null, { id: id, ...prescription });
        }
    );
};

Prescription.remove = (id, result) => {
    sql.query("DELETE FROM prescriptions WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Prescription with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted prescription with id: ", id);
        result(null, res);
    });
};

Prescription.removeAll = result => {
    sql.query("DELETE FROM prescriptions", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} prescriptions`);
        result(null, res);
    });
};

module.exports = Prescription;
