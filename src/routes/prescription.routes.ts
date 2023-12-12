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

import {NextFunction, Request, Response} from "express";
import prescriptionController from "../controllers/prescription.controller";
import authJwt from '../utility/authJwt';
import express from 'express';

const prescriptionRouter = express();

prescriptionRouter.use((_req: Request, res: Response, next: NextFunction) => {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});

/*
 * ************************************************************************
 * WARNING: Admin only
 * ************************************************************************
 */

// GET - all prescriptions
prescriptionRouter.get(
    "/medical/v1/prescriptions",
    [authJwt.verifyToken, authJwt.isAdmin],
    prescriptionController.getAllPrescriptions
);

// GET - a prescription by id
prescriptionRouter.get(
    "/medical/v1/prescriptions/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    prescriptionController.getPrescription
);

// PUT - update a prescription by id
prescriptionRouter.put(
    "/medical/v1/prescriptions/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    prescriptionController.updatePrescription
);

// DELETE - a prescription by id
prescriptionRouter.delete(
    "/medical/v1/prescriptions/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    prescriptionController.deletePrescription
);

// DELETE - all prescriptions
prescriptionRouter.delete(
    "/medical/v1/prescriptions",
    [authJwt.verifyToken, authJwt.isAdmin],
    prescriptionController.deleteAllPrescriptions
);

/*
 * ************************************************************************
 * Owner related
 * ************************************************************************
 */

// GET - all prescriptions for owner
prescriptionRouter.get(
    "/medical/v1/owner/prescriptions",
    [authJwt.verifyToken, authJwt.isOwnerOrAgentOrMonitor],
    prescriptionController.getAllPrescriptionsForOwner
);

// GET - prescription by id for owner only
prescriptionRouter.get(
    "/medical/v1/owner/prescriptions/:id",
    [authJwt.verifyToken, authJwt.isOwnerOrAgentOrMonitor],
    prescriptionController.getPrescriptionForOwner
);

// POST - create a new Prescription for owner (owner or agent cognizant of userKey)
prescriptionRouter.post(
    "/medical/v1/owner/prescriptions",
    [authJwt.verifyToken, authJwt.isOwnerOrAgent],
    prescriptionController.createPrescriptionForOwner
);

// PUT - update a prescription for owner only
prescriptionRouter.put(
    "/medical/v1/owner/prescriptions/:id",
    [authJwt.verifyToken, authJwt.isOwnerOrAgent],
    prescriptionController.updatePrescriptionForOwner
);

// DELETE - delete a prescription by id for owner only
prescriptionRouter.delete(
    "/medical/v1/owner/prescriptions/:id",
    [authJwt.verifyToken, authJwt.isOwnerOrAgent],
    prescriptionController.deletePrescriptionForOwner
);

// DELETE - all prescriptions for owner only
prescriptionRouter.delete(
    "/medical/v1/owner/prescriptions",
    [authJwt.verifyToken, authJwt.isOwnerOrAgent],
    prescriptionController.deleteAllPrescriptionsForOwner
);


export default prescriptionRouter;
