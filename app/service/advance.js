'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v1');

class AdvanceService extends Service {
    //检索数据
    async find(tableName, conditions) {
        const results = await this.app.mysql.select(tableName);
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

module.exports = AdvanceService;