'use strict';

const Service = require('egg').Service;
const BackResult = require('../config/BackResult');

class LoginService extends Service {
    async login(username, password) {
        const results = await this.app.mysql.select('student', { // 搜索表
            where: { student_username: username, student_password: password }, // WHERE 条件
        });
        if (results && results.length > 0) {
            return BackResult.backResult(true, results, "", results.length);
        } else {
            return BackResult.backResult(false, [], "登陆失败，用户名或密码错误！", 0);
        }
    }
}

module.exports = LoginService;
