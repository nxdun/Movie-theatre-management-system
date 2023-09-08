const routes = require("express").Router();
const { Router } = require("express");
let Supplier = require("../models/supplier.js");

Router.route("/add").post((req, res) => {
    const S_name = req.body.S_name;
    const S_id = req.body.S_id;
    const S_address = req.body.S_address;
    const S_email = req.body.S_email;
    const S_status = req.body.S_status;
    const S_createDate = req.body.S_createDate;

    const newSupplier = new Supplier({
        S_name,
        S_id,
        S_address,
        S_email,
        S_status,
        S_createDate
    });

    newSupplier.save()
    .then(() => res.json("Supplier added!"))
    .catch(err => res.status(400).json("Error: " + err));
})

routes.route("/").get((req, res) => {
    Supplier.find()
    .then(supplier => res.json(supplier))
    .catch(err => res.status(400).json("Error: " + err));
})

routes.route("update/:id").put(async(req, res) => {
    let supplierId = req.params.id;
    const {S_name, S_id, S_address, S_email, S_status, S_createDate} = req.body;

    const updateSupplier = {
        S_name,
        S_id,
        S_address,
        S_email,
        S_status,
        S_createDate
    }
    const update = awaitSupplier.findByIdAndUpdate(supplierId, updateSupplier)
    .then(() => {
        res.status(200).send({status: "Supplier updated"})  
    }).
        catch(err => res.status(500).send({status: "Error with updating data", error: err.message}));   
    })

    routes.route("/delete/:S_id").delete(async(req, res) => {
        let supplierId = req.params.id;

        await Supplier.findByIdAndDelete(supplierId)
        .then(() => {
            res.status(200).send({status: "Supplier deleted"});
        }).catch(err => res.status(500).send({status: "Error with delete supplier", error: err.message}));
    })
    routes.route("/get/:S_id").get(async(req, res) => {
        let supplierId = req.params.id;
        const supplier = await Supplier.findById(supplierId)
        .then(() => {
            res.status(200).send({status: "Supplier fetched", supplier})
        }).catch(err => res.status(500).send({status: "Error with get supplier", error: err.message}));
    })
    module.exports = routes;

