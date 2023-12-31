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
 * prescription.model.ts
 */

import { DataTypes } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prescription = (sequelize: any, Sequelize: any) => {
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
            type: DataTypes.DATE,
            allowNull: true
        },
        writtenBy: {
            type: Sequelize.STRING
        },
        filled: {
            type: DataTypes.DATE,
            allowNull: true
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: true
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

export default prescription;