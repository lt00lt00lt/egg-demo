'use strict';

const Service = require('egg').Service;

class AdvanceService extends Service {
    async find(tableName, conditions) {
        console.log(conditions);
        const results = await this.app.mysql.select(tableName);
        return { results };
    }
}

module.exports = AdvanceService;