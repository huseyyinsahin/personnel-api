"use strict";

const Personnel = require("../models/personnel");

const { CustomError } = require("../errors/customError");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ['Personnels']
        #swagger.summary = 'List Personnels'
        #swagger.description = `
            You can send query with endpoint for filter[], search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */
    const data = await res.getModelList(Personnel, {}, "departmentId");

    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Personnel),
      data,
    });
  },

  create: async (req, res) => {
    /*
        #swagger.tags = ['Personnels']
        #swagger.summary = 'Create Personnel'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/Personnel'
            }
        }
    */



    const isLead = req.body.isLead || false;

    if (isLead) {
      await Personnel.updateMany(
        { departmentId: req.body.departmentId, isLead: true },
        { isLead: false },
        { runValidators: true }
      );
    }
    const data = await Personnel.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
        #swagger.tags = ['Personnels']
        #swagger.summary = 'Read Single Personnel'
    */
    let data = null;
    if (req.params.id == req.user._id || req.user.isAdmin) {
      data = await Personnel.findOne({ _id: req.params.id });
    } else {
      throw new CustomError("Sadece kendi bilgilerinizi görebilirsiniz", 401);
    }

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
        #swagger.tags = ['Personnels']
        #swagger.summary = 'Update Personnel'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/Personnel'
            }
        }
    */
    const isLead = req.body.isLead || false;

    if (isLead) {
      const { departmentId } = await Personnel.findOne(
        { _id: req.params.id },
        { departmentId: 1 }
      );

      await Personnel.updateMany(
        { departmentId, isLead: true },
        { isLead: false },
        { runValidators: true }
      );
    }

    const data = await Personnel.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Personnel.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
        #swagger.tags = ['Personnels']
        #swagger.summary = 'Delete Personnel'
    */
    const data = await Personnel.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
