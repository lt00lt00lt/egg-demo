'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');
const SqlBuilder = require('../config/SqlBuilder');
const BackResult = require('../config/BackResult');

/**
 * 高级检索、增删改、文件上传下载Service
 */
module.exports = class AdvanceService extends Service {
    //查询数据
    async find(tableName, conditions, pageNum, pageSize) {
        let sql = SqlBuilder.simpleSqlBuilder(tableName, conditions, pageNum, pageSize);
        const results = await this.app.mysql.query(sql);
        if (results && results.length > 0) {
            return BackResult.backResult(true, results, "", results.length);
        } else {
            return BackResult.backResult(false, [], "数据检索失败！", 0);
        }
    }

    //高级检索
    async seniorFind(tableName, term, pageNum, pageSize) {
        let res = SqlBuilder.advancedSqlBuilder(tableName, term, pageNum, pageSize);
        let sql = res.sql;
        let number = res.number;
        let results = await this.app.mysql.query(sql);
        let count = await this.app.mysql.query(number);
        if (results && results.length > 0) {
            return BackResult.backResult(true, results, "", count[0].count);
        } else {
            return BackResult.backResult(false, [], "数据检索失败！", 0);
        }
    }

    //根据id删除数据
    async delete(tableName, id) {
        const results = await this.app.mysql.delete(tableName, { id: id });
    }

    //根据id批量删除数据
    async batchDelete(tableName, ids) {
        ids.forEach(element => {
            this.app.mysql.delete(tableName, { id: element });
        });
    }

    //保存数据
    async save(tableName, datas) {
        //如果参数中传入了id，则为修改，否则为插入
        if (datas.id) {
            const result = await this.app.mysql.update(tableName, datas); // 更新 posts 表中的记录
            const updateSuccess = result.affectedRows === 1;
        } else {
            datas["id"] = uuid();
            const result = await this.app.mysql.insert(tableName, datas);
            // 判断插入成功·
            const insertSuccess = result.affectedRows === 1;
        }
    }

    //批量保存数据
    async batchSave(tableName, datas) {
        datas.forEach(element => {
            //如果参数中传入了id，则为修改，否则为插入
            if (element.id) {
                const result = this.app.mysql.update(tableName, element); // 更新 posts 表中的记录
            } else {
                element["id"] = uuid();
                const result = this.app.mysql.insert(tableName, element);
            }
        });
    }

}