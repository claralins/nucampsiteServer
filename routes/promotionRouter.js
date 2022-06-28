const express = require("express");
const Promotion = require("../models/promotion");
const promotionRouter = express.Router();

promotionRouter
  .route("/")
  .get((req, res, next) => {
    Promotion.find().then((promotions) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(promotions);
    });
  })
  .post((req, res, next) => {
    Promotion.create(req.body)
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT not supported with /promotions`);
  })
  .delete((req, res, next) => {
    Promotion.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
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
