
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

const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const init = process.argv.includes('--init=true');

const app = express();

require('dotenv').config();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
      name: "virtualyou-session",
      keys: ["COOKIE_SECRET"], // should use as secret environment variable
      httpOnly: true,
      sameSite: 'strict'
    })
);

// database
const db = require("./app/models");
const Prescription = db.prescription;

if (init) {
  db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });
} else {
  db.sequelize.sync();
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the VirtualYou Medical API." });
});

// routes
require("./app/routes/prescription.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Prescription.create({
    name: "Metformin",
    identNo: "6792303",
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
    userKey: 10
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
    written: "10/23/2023",
    writtenBy: "Dr. Smith",
    filled: "10/23/2023",
    expired: "10/23/2025",
    refillNote: "2 refills by 02/07/2024",
    manufacturedBy: "Zocor",
    note: "Take one tablet nightly",
    userKey: 10
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
    written: "10/23/2023",
    writtenBy: "Dr. Smith",
    filled: "10/23/2023",
    expired: "10/23/2025",
    refillNote: "2 refills by 02/07/2024",
    manufacturedBy: "Eli Lily",
    note: "Take as needed",
    userKey: 10
  });
}
