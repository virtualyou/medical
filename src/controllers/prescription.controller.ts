
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
 * prescription.controller.ts
 */

import db from '../models';
import { Request, Response } from 'express';
const Prescription = db.prescription;

class ExpressError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ExpressError';
    }
}

const errorHandler = (err: ExpressError, _req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
};

const getAllPrescriptions = (req: Request, res: Response) => {
    Prescription.findAll()
        .then((data:PrescriptionType) => {
            res.send(data);
        })
        .catch((err: ExpressError) => {
            errorHandler(err, req, res);
        });
};

const getAllPrescriptionsForOwner = (req: Request, res: Response) => {

    Prescription.findAll({
            where: {
                userKey: getWhereKey(req),
            },
        }
    )
        .then((data:PrescriptionType) => {
            res.send(data);
        })
        .catch((err: ExpressError) => {
            errorHandler(err, req, res);
        });
};

const getPrescription = (req: Request, res: Response) => {
    const id = req.params['id'];

    Prescription.findByPk(id)
        .then((data:PrescriptionType) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Prescription with id=${id}.`
                });
            }
        })
        .catch((err: ExpressError) => {
            errorHandler(err, req, res);
        });
};

const getPrescriptionForOwner = (req: Request, res: Response) => {
    const id = req.params['id'];

    Prescription.findOne({
        where: {
            id: id,
            userKey: getWhereKey(req)
        }
    })
        .then((data:PrescriptionType) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `May not belong to Owner or cannot find this Prescription with id=${id}.`
                });
            }
        })
        .catch((err: ExpressError) => {
            errorHandler(err, req, res);
        });
};

const createPrescriptionForOwner = (req: Request, res: Response) => {

    // Check request
    if (!req.body.name) {
        res.status(400).send({
            message: "Bad Request, name cannot be empty!"
        });
        return;
    }

    // Create new Prescription object
    const prescription = {
        name: req.body.name || "",
        identNo: req.body.identNo || "",
        size: req.body.size || "",
        form: req.body.form || "",
        rxUnit: req.body.rxUnit || "",
        quantity: req.body.quantity || "",
        pharmacy: req.body.pharmacy || "",
        pharmacyPhone: req.body.pharmacyPhone || "",
        written: req.body.written || "",
        writtenBy: req.body.writtenBy || "",
        filled: req.body.filled || "",
        expired: req.body.expired || "",
        refillNote: req.body.refillNote || "",
        manufacturedBy: req.body.manufacturedBy || "",
        note: req.body.note || "",
        userKey: getWhereKey(req)
    };

    // Create Prescription using Sequelize
    Prescription.create(prescription)
        .then((data:PrescriptionType) => {
            res.status(201).send(data);
        })
        .catch((err: ExpressError) => {
            errorHandler(err, req, res);
        });
};

const updatePrescription = (req: Request, res: Response) => {
    const id = req.params['id'];

    Prescription.update(req.body, {
        where: {
            id: id
        }
    })
        .then((num:number) => {
            if (num == 1) {
                res.send({
                    message: "Prescription was updated successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Prescription with id=${id} could not be found!`
                });
            }
        })
        .catch((err: ExpressError) => {
            errorHandler(err, req, res);
        });
};

const updatePrescriptionForOwner = (req: Request, res: Response) => {
    const id = req.params['id'];

    Prescription.update(req.body, {
        where: {
            id: id,
            userKey: getWhereKey(req)
        }
    })
        .then((num:number) => {
            if (num == 1) {
                res.send({
                    message: "Prescription was updated successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Prescription with id=${id} may not belong to owner or could not be found!`
                });
            }
        })
        .catch((err: ExpressError) => {
            errorHandler(err, req, res);
        });
};


const deletePrescription = (req: Request, res: Response) => {
    // url parameter
    const id = req.params['id'];

    // delete specific record
    Prescription.destroy({
        where: {
            id: id
        }
    })
        .then((num:number) => {
            if (num == 1) {
                return res.status(200).send({
                    message: "Prescription was deleted!"
                });
            } else {
                res.status(404).send({
                    message: `Prescription was not found!`
                });
            }
        })
        .catch((err: ExpressError) => {
            errorHandler(err, req, res);
        });
}

const deletePrescriptionForOwner = (req: Request, res: Response) => {
    // url parameter
    const id = req.params['id'];

    // delete specific record
    Prescription.destroy({
        where: {
            id: id,
            userKey: getWhereKey(req)
        }
    }).then((num:number) => {
        if (num == 1) {
            return res.status(200).send({
                message: "Prescription was deleted!"
            });
        } else {
            res.status(404).send({
                message: `Prescription was not found!`
            });
        }
    })
        .catch((err: ExpressError) => {
            errorHandler(err, req, res);
        });
}

const deleteAllPrescriptions = (req: Request, res: Response) => {

    Prescription.destroy({
        where: {},
        truncate: false
    })
        .then((nums:number) => {
            res.status(200).send({ message: `${nums} Prescriptions were deleted successfully!` });
        })
        .catch((err: ExpressError) => {
            errorHandler(err, req, res);
        });
}

const deleteAllPrescriptionsForOwner = (req: Request, res: Response) => {

    Prescription.destroy({
        where: {userKey: getWhereKey(req)},
        truncate: false
    })
        .then((nums:number) => {
            res.status(200).send({ message: `${nums} Prescriptions were deleted successfully!` });
        })
        .catch((err: ExpressError) => {
            errorHandler(err, req, res);
        });
}

const getWhereKey = (req: Request) => {
    let key: number;
    if (req.ownerId === 0) {
        console.log("key " + req.userId);
        key = req.userId;
    } else {
        key = req.ownerId;
        console.log("key " + req.ownerId);
    }
    return key;
}

const prescriptionController = {
    getAllPrescriptions,
    getAllPrescriptionsForOwner,
    getPrescription,
    getPrescriptionForOwner,
    createPrescriptionForOwner,
    updatePrescription,
    updatePrescriptionForOwner,
    deletePrescription,
    deletePrescriptionForOwner,
    deleteAllPrescriptions,
    deleteAllPrescriptionsForOwner
};
export default prescriptionController;

