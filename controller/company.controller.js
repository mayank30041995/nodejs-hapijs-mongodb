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
    async update(req, reply) {
        if (!req.params.id) {
            return reply({ err: 'id is required param' }).code(400);
        }
        let attributes = {};

        if (req.payload.name) {
            attributes.name = req.payload.name;
        }
        if (req.payload.city) {
            attributes.city = req.payload.city;
        }
        if (req.payload.address) {
            attributes.address = req.payload.address;
        }
        try {
            var result = await Company.findByIdAndUpdate(req.params.id, req.payload, { new: true });
            return reply.response(result);
        } catch (error) {
            return reply.response(error).code(500);
        }

    }

};