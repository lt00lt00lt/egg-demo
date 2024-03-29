/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const path = require('path');

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571361625159_2862';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  //Mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'cdb-11vchhbg.bj.tencentcdb.com',
      // 端口号
      port: '10113',
      // 用户名
      user: 'root',
      // 密码
      password: 'LT950120',
      // 数据库名
      database: 'lab_manage_system',
      // 打印查询结果
      debug: false,
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  //View
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks' //左边写成.html后缀，会自动渲染.html文件
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  }

  // 配置上传
  config.multipart = {
    fileSize: '100mb',
    mode: 'stream',
    fileExtensions: ['.docx'], // 扩展几种上传的文件格式
  };

  return {
    ...config,
    ...userConfig,
  };
};
