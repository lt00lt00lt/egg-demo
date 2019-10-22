'use strict';

const Controller = require('egg').Controller;

module.exports = class AdvanceController extends Controller {
    //查询方法
    async find() {
        const { ctx, service } = this;
        let pageNum = parseInt(ctx.query.pageNum);
        let pageSize = parseInt(ctx.query.pageSize);
        let tableName = ctx.params.tableName;
        let conditions = ctx.request.body;
        const res = await service.advance.find(tableName, conditions, pageNum, pageSize);
        ctx.body = res;
    }

    //高级检索方法
    async seniorFind() {
        const { ctx, service } = this;
        let pageNum = parseInt(ctx.query.pageNum);
        let pageSize = parseInt(ctx.query.pageSize);
        let tableName = ctx.params.tableName;
        let term = ctx.request.body;
        const res = await service.advance.seniorFind(tableName, term, pageNum, pageSize);
        ctx.body = res;
    }

    //删除方法
    async delete() {
        const { ctx, service } = this;
        let tableName = ctx.params.tableName;
        let id = ctx.params.id;
        const res = await service.advance.delete(tableName, id);
        ctx.body = res;
    }

    //批量删除方法
    async batchDelete() {
        const { ctx, service } = this;
        let tableName = ctx.params.tableName;
        let ids = ctx.request.body;
        const res = await service.advance.batchDelete(tableName, ids);
        ctx.body = res;
    }

    //保存方法
    async save() {
        const { ctx, service } = this;
        let tableName = ctx.params.tableName;
        let datas = ctx.request.body;
        const res = await service.advance.save(tableName, datas);
        ctx.body = res;
    }

    //批量保存方法
    async batchSave() {
        const { ctx, service } = this;
        let tableName = ctx.params.tableName;
        let datas = ctx.request.body;
        const res = await service.advance.batchSave(tableName, datas);
        ctx.body = res;
    }
}