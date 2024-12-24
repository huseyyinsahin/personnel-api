"use strict";

const router = require("express").Router();

const personnel = require("../controllers/personnel");

const { isLogin, isAdmin } = require("../middlewares/permissions");

router.route("/").get(isAdmin, personnel.list).post(isAdmin, personnel.create);

router
  .route("/:id")
  .get(isLogin, personnel.read)
  .put(isAdmin, personnel.update)
  .patch(isAdmin, personnel.update)
  .delete(isAdmin, personnel.delete);

module.exports = router;
