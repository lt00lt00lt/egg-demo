'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  //mysql
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },

  //nunjucks
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  //oss
  oss : {
    enable: true,
    package: 'egg-oss',
  }
};
