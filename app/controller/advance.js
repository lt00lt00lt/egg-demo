'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const uuid = require('uuid/v4');
const path = require('path');
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');

/**
 * 高级检索、增删改、文件上传下载Controller
 */
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

    //文件上传方法
    async upload() {
        const ctx = this.ctx;
        //egg-multipart 已经帮我们处理文件二进制对象
        // node.js 和 php 的上传唯一的不同就是 ，php 是转移一个 临时文件
        // node.js 和 其他语言（java c#） 一样操作文件流
        const stream = await ctx.getFileStream();
        //新建一个文件名
        const filename = uuid() + path.extname(stream.filename).toLocaleLowerCase();
        //文件生成绝对路径
        //当然这里这样市不行的，因为你还要判断一下是否存在文件路径
        const target = path.join(this.config.baseDir, 'file', filename);
        //生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target);
        try {
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            throw err;
        }
        //文件响应
        ctx.body = {
            url: 'file/' + filename
        };
    }

    //文件下载方法
    async download() {
        const ctx = this.ctx;
        const fileName = await ctx.params.fileName;
        const filePath = path.resolve('file', fileName);
        this.ctx.attachment(fileName);
        this.ctx.set('Content-Type', 'application/octet-stream');
        this.ctx.body = fs.createReadStream(filePath);
    }
}