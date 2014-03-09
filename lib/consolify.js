/*
 * consolify
 *
 * Copyright (c) 2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var through = require('through');
var fs      = require('fs');

var template1 = fs.readFileSync(__dirname + '/template1.html').toString();
var template2 = fs.readFileSync(__dirname + '/template2.html').toString();
var template3 = fs.readFileSync(__dirname + '/template3.html').toString();
var reload    = fs.readFileSync(__dirname + '/../node_modules/browser-reload/reload.js').toString();

module.exports = function (options) {
  if (!options) options = {};
  var out = through(write, end);

  var headerWritten = false;

  function write(chunk) {
    if (!headerWritten) {
      out.queue(template1);
      out.queue(options.title || 'Consolify');
      out.queue(template2);
      headerWritten = true;
    }
    out.queue(chunk);
  }

  function end() {
    if (options.reload) out.queue(reload);
    out.queue(template3);
    out.queue(null);
  }

  return out;
}
