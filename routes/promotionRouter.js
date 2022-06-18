const express = require("express");
const promotionRouter = express.Router();

promotionRouter
  .route("/promotions")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send all promotions to you`);
  })
  .post((req, res) => {
    res.end(
      `Adding promotion ${req.body.name} with description ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT not supported with /promotions`);
  })
  .delete((req, res) => {
    res.end("Deleting all promotions");
  });

promotionRouter
  .route("/:promotionId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send promotion ${req.params.promotionId} to you`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST not supported on /promotions/${promotionId}`);
  })
  .put((req, res) => {
    res.write(`Updating promotion ${req.params.promotionId}`);
    res.end(
      `Will update promotion ${req.body.name} with description ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting promotion ${req.params.promotionId}`);
  });

module.exports = promotionRouter;
