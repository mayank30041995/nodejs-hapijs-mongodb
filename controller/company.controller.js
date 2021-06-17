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
  

};