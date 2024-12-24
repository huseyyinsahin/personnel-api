"use strict";

const mongoose = require("mongoose");
const { BadRequestError } = require("../errors/customError");

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new BadRequestError("Invalid MongoDB ID");
  }
  next();
};
