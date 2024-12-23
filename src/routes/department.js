"use strict";

const router = require("express").Router();

const department = require("../controllers/department");
const {
  isAdminOrLead,
  isLogin,
  isAdmin,
} = require("../middlewares/permissions");

router
  .route("/")
  .get(isAdmin, department.list)
  .post(isAdmin, department.create);

router
  .route("/:id")
  .get(isLogin, department.read)
  .put(isAdmin, department.update)
  .patch(isAdmin, department.update)
  .delete(isAdmin, department.delete);

router.get("/:id/personnel", isAdminOrLead, department.personnels);
module.exports = router;
