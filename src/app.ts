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
 * app.ts
 */

import express, {type Express} from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import db from "./models/index";
import prescriptionRouter from "./routes/prescription.routes";
import cookieSession from "cookie-session";
import * as process from "process";
// swagger api documentation
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const initIndex = process.argv.indexOf("--init=true");
const init = initIndex !== -1;

const app: Express = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(
    cookieSession({
        name: "virtualyou-session",
        keys: ["COOKIE_SECRET"],
        domain: '.virtualyouplan.com',
        httpOnly: true,
        sameSite: 'strict'
    })
);

app.use(function (_req, res, next) {
    res.setTimeout(120000, function () {
        console.log('Request has timed out.');
        res.send(408);
    });
    next();
});

app.get("/", (_req, res) => {
    res.send("Welcome to the VirtualYou Medical API.");
});

// swagger path to documentation
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// database
const Prescription = db.prescription;

if (init) {
    db.sequelize.sync({force: true}).then(() => {
        console.log("Drop and Resync Db");
        initial();
    });
} else {
    db.sequelize.sync();
}

// routes
app.use(prescriptionRouter);

// create reference role objects
function initial() {
// new model objects here
    Prescription.create({
        name: "Metformin",
        identNo: "6792303",
        size: "",
        form: "tablet",
        rxUnit: "500mg",
        quantity: "60",
        pharmacy: "Kroger",
        pharmacyPhone: "919-567-5499",
        written: "12/01/2023",
        writtenBy: "Dr. Smith",
        filled: "12/01/2023",
        expires: "06/01/2025",
        refillNote: "2 refills by 02/07/2024",
        manufacturedBy: "Mylan",
        note: "Take with food",
        userKey: 1
    });

    Prescription.create({
        name: "Pravastatin",
        identNo: "6733303",
        size: "",
        form: "tablet",
        rxUnit: "20mg",
        quantity: "60",
        pharmacy: "Kroger",
        pharmacyPhone: "919-567-5499",
        written: "12/01/2023",
        writtenBy: "Dr. Smith",
        filled: "12/01/2023",
        expires: "10/23/2025",
        refillNote: "2 refills by 02/07/2024",
        manufacturedBy: "Zocor",
        note: "Take one tablet nightly",
        userKey: 1
    });

    Prescription.create({
        name: "Amlodipine",
        identNo: "6802323",
        size: "",
        form: "tablet",
        rxUnit: "10mg",
        quantity: "60",
        pharmacy: "Kroger",
        pharmacyPhone: "919-567-5499",
        written: "12/01/2023",
        writtenBy: "Dr. Smith",
        filled: "12/01/2023",
        expires: "10/23/2025",
        refillNote: "2 refills by 02/07/2024",
        manufacturedBy: "Eli Lily",
        note: "Take as needed",
        userKey: 1
    });

}

export default app;
