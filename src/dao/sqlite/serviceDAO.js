const connection = require("./connection");

function mapServiceGroup(row) {
    return {
        id: row["service_group_id"],
        name: row["service_group_name"],
        description: row["service_group_description"]
    };
}

function mapService(row) {
    return {
        id: row["service_id"],
        name: row["service_name"],
        description: row["service_description"]
    };
}

/**
 * @returns {Promise}
 */
exports.getRootServiceGroups = function () {
    return connection.selectAll("select * from service_groups where parent_service_group_id is null")
        .then((resultSet) => resultSet.map(mapServiceGroup));
};

/**
 * @param {?number} parentGroupId
 * @returns {Promise}
 */
exports.getServiceGroups = function (parentGroupId) {
    return connection.selectAll("select * from service_groups where parent_service_group_id = ?", parentGroupId)
        .then((resultSet) => resultSet.map(mapServiceGroup));
};

/**
 * @param {number} groupId
 * @returns {Promise}
 */
exports.getServices = function (groupId) {
    return connection.selectAll("select * from services where service_group_id = ?", groupId)
        .then((resultSet) => resultSet.map(mapService));
};