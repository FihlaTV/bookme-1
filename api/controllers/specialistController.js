const specialistDAO = require("../../src/dao/sqlite/specialistDAO");

/**
 * @param {Object} req
 * @param {Object} res
 */
exports.readSpecialists = function (req, res) {
    specialistDAO.getSpecialists()
        .then((specialists) => {
            res.json(specialists);
        }, (error) => {
            res.sendStatus(500);
        })
};