const db = require('../models');
const Company = db.company

module.exports = {

    async create(req, reply) {
        if (!req.payload.name) {
            return reply({ er: 'name is required field' }).code(400);
        }

        try {
            var company = new Company(req.payload);
            var result = await company.save();
            return reply.response(result);
        } catch (error) {
            return res.response(error).code(500);
        }
    },
    async find(req, reply) {

        try {
            var company = await Company.find().exec();
            return reply.response(company);
        } catch (error) {
            return reply.response(error).code(500);
        }
    },
    async findOne(req, reply) {
        if (!req.params.id) {
            return reply({ err: 'id is required param' }).code(400);
        }

        try {
            var company = await Company.findById(req.params.id).exec();
            return reply.response(company);
        } catch (error) {
            return reply.response(error).code(500);
        }

    },
   

};