
/*
 *
 * VirtualYou Project
 * Copyright 2023 David L Whitehurst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("prescriptions", {
        name: {
            type: Sequelize.STRING
        },
        identNo: {
            type: Sequelize.STRING
        },
        size: {
            type: Sequelize.STRING
        },
        form: {
            type: Sequelize.STRING
        },
        rxUnit: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.STRING
        },
        pharmacy: {
            type: Sequelize.STRING
        },
        pharmacyPhone: {
            type: Sequelize.STRING
        },
        written: {
            type: Sequelize.STRING
        },
        writtenBy: {
            type: Sequelize.STRING
        },
        filled: {
            type: Sequelize.STRING
        },
        expired: {
            type: Sequelize.STRING
        },
        refillNote: {
            type: Sequelize.STRING
        },
        manufacturedBy: {
            type: Sequelize.STRING
        },
        note: {
            type: Sequelize.STRING
        },
        userKey: {
            type: Sequelize.INTEGER
        }
    });
};

/*
Prescription.create({
    name: "Metformin",
    identNo": "6792303",
    size: "",
    form: "tablet",
    rxUnit: "500mg",
    quantity: "60",
    pharmacy: "Kroger",
    pharmacyPhone: "919-567-5499",
    written: "10/23/2023",
    writtenBy: "Dr. Smith",
    filled: "10/23/2023",
    expired: "10/23/2025",
    refillNote: "2 refills by 02/07/2024",
    manufacturedBy: "Mylan",
    note: "Take with food",
    userKey: 1
});
*/