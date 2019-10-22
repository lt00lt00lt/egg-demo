'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v1');

module.exports = class AdvanceService extends Service {
    //查询数据
    async find(tableName, conditions, pageNum, pageSize) {
        let sql = `select * from ${tableName} where 1=1 `;
        if (conditions) {
            for (let condition of conditions) {
                if (condition.mode) {
                    sql += `and ${condition.name} like '%${condition.value}%' `
                } else {
                    sql += `and ${condition.name} = '${condition.value}' `
                }
            }
        }
        if (pageNum && pageSize) {
            sql += `limit ${pageSize * (pageNum - 1)} , ${pageSize}`
        }
        const results = await this.app.mysql.query(sql);
        return { results };
    }

    //高级检索
    async seniorFind(tableName, term, pageNum, pageSize) {
        let sql = `select * from ${tableName} `;
        
        
        if (pageNum && pageSize) {
            sql += `limit ${pageSize * (pageNum - 1)} , ${pageSize}`
        }
        const results = await this.app.mysql.query(sql);
        return { results };
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