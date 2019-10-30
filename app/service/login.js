'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
    async login(username, password) {
        const results = await this.app.mysql.select('student', { // 搜索表
            where: { student_username: username, student_password: password }, // WHERE 条件
        });
        return { results };
    }
}

module.exports = LoginService;
