var pkg = require('../package.json');

module.exports = {
  dist: 'dist',
  banner:
  '/*!\n' +
  ' * Copyright 2015 Oceanhouse21 GmbH \n' +
  ' * http://oceanhouse21.com/\n' +
  ' *\n' +
  ' * ShopIonic, v0.9.0\n' +
  ' * A hybrid app m-commerce platform built on ionic..\n' +
  ' * http://shopionic.com/\n' +
  ' *\n' +
  ' * By @gschlenkhoff <3\n' +
  ' *\n' +
  ' * Licensed under the MIT license. Please see LICENSE for more information.\n'+
  ' *\n' +
  ' */\n\n',
  shopIonicFiles: [
    // Base
    'js/shopionic.js',

    // Services
    'js/service/cart.js',
    'js/service/category.js'
  ]
};
