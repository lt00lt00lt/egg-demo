'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
    async login(username, password) {
        const results = await this.app.mysql.select('admin', { // 搜索表
            where: { admin_username: username, admin_password: password }, // WHERE 条件
        });
        return { results };
    }
}

module.exports = LoginService;
