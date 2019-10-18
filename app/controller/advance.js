'use strict';

const Controller = require('egg').Controller;

class AdvanceController extends Controller {
    async find() {
        const { ctx, service } = this;
        let tableName = ctx.params.tableName;
        let conditions = ctx.request.body;
        const res = await service.advance.find(tableName, conditions);
        ctx.body = res;
    }
}
module.exports = AdvanceController;