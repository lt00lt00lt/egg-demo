'use strict';

const Controller = require('egg').Controller;

/**
 * 登录页面、首页跳转Controller
 */
class HomeController extends Controller {
  async login() {
    await this.ctx.render('login');
  }
  async index() {
    await this.ctx.render('index');
  }
}

module.exports = HomeController;
