'use strict';

module.exports = {
    simpleSqlBuilder: function (tableName, conditions, pageNum, pageSize) {
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
        return sql;
    },

    advancedSqlBuilder: function (tableName, term, pageNum, pageSize) {
        let res = {};
        let sql = `select * from ${tableName} `;
        let number = `select count(*) as count from  ${tableName} `;
        if (term.relations) {
            for (let relation of term.relations) {
                let key1 = Object.keys(relation)[0];
                let key2 = Object.keys(relation)[1];
                sql += `left join ${key2} on ${key1}.${relation[key1]}=${key2}.${relation[key2]} `;
                number += `left join ${key2} on ${key1}.${relation[key1]}=${key2}.${relation[key2]} `;
            }
        }

        if (term.conditions) {
            sql += "where 1=1 ";
            number += "where 1=1 ";
            for (let condition of term.conditions) {
                if (condition.mode) {
                    sql += `and ${condition.dataTable}.${condition.name} like '%${condition.value}%' `;
                    number += `and ${condition.dataTable}.${condition.name} like '%${condition.value}%' `;
                } else {
                    sql += `and ${condition.dataTable}.${condition.name} = '${condition.value}' `;
                    number += `and ${condition.dataTable}.${condition.name} = '${condition.value}' `;
                }
            }
        }

        if (term.order) {
            if (term.order.mode) {
                sql += `order by ${term.order.dataTable}.${term.order.field} `;
            } else {
                sql += `order by ${term.order.dataTable}.${term.order.field} desc `;
            }
        }

        if (pageNum && pageSize) {
            sql += `limit ${pageSize * (pageNum - 1)} , ${pageSize}`
        }
        res["sql"] = sql;
        res["number"] = number;
        return res;
    }
}

