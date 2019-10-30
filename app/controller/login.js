'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
    async login() {
        const { ctx, service } = this;
        let username = ctx.params.username;
        let password = ctx.params.password;
        const res = await service.login.login(username, password);
        ctx.body = res;
    }
}

module.exports = LoginController;
