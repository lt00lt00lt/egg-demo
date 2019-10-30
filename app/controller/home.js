'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async login() {
    await this.ctx.render('login');
  }
  async index() {
    await this.ctx.render('index');
  }
}

module.exports = HomeController;
