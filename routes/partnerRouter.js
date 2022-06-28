// boiler plate + connects routes to backend server to db
const express = require("express");

// importing Partner model to use the schemas and use it with CRUD behaviors
const Partner = require("../models/partner");

// const authenticate = require("../authenticate");
// const cors = require("./cors")

const partnerRouter = express.Router();

partnerRouter
  .route("/")

  // cors options      req/res objects
  // .options(cors.cors, (req, res) => res.sendStatus(200))

  //escaping callback hell using es6 syntax of arrow functions + Promises
  .get((req, res, next) => {
    Partner.find()
      .then((partners) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "applicaiton/json");
        res.json(partners);
      })
      // if promise fails, we can catch and return the error here
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Partner.create(req.body)
      .then((partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
    // res.end(
    //   `Adding partner ${req.body.name} with description ${req.body.description}`
    // );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT not supported on /partners`);
  })
  .delete((req, res) => {
    Partner.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
    // res.end(`Deleting all promotions`);
  });

partnerRouter
  .route("/:partnerId")
  .get((req, res, next) => {
    Partner.findById(req.params.partnerId)
      .then((partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST not supported on /partners/${req.params.partnerId}`);
  })
  .put((req, res, next) => {
    Partner.findByIdAndUpdate(
      req.params.partnerId,
      { $set: req.body },
      { new: true }
    )
      .then((partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })
  .delete((req, res) => {
    Partner.findByIdAndDelete(req.params.partnerId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = partnerRouter;
