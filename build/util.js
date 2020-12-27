// Copyright 2013 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var fs = require('fs');
var path = require('path');
var print = console.log.bind(console);

function isParseTreeType(type, trees) {
  return type in trees || type === 'ParseTree';
}

function isBlockOrStatementType(types, trees) {
  return types[0] === 'Block' && isParseTreeType(types[1], trees);
}

module.exports = {
  print: print,

  printLicense: function() {
    // This reads the license header from the current file.
    var data = fs.readFileSync(__filename, 'utf-8');
    data.split(/\n/).every(function(line) {
      if (line.indexOf('//') === 0) {
        print(line);
        return true;
      }
      return false;
    });
    print();
  },

  printAutoGenerated: function(dataFile) {
    print('// This file was auto generated by %s',
                path.basename(process.argv[1]));
    print('// from %s', dataFile || path.basename(process.argv[2]));
    print('// Do not edit!');
    print();
  },

  toConstantName: function(n) {
    return n[0] + n.slice(1).replace(/([A-Z])/g, '_$1').toUpperCase();
  },

  isParseTreeType: isParseTreeType,
  isBlockOrStatementType: isBlockOrStatementType,

  isParseTreeListType: function(type, trees) {
    return type.lastIndexOf('Array<', 0) === 0 &&
        isParseTreeType(type.substring('Array<'.length, type.length - 1),
                        trees);
  },

  // Filters out keys that are used as comments.
  parseJSON: function(data) {
    return JSON.parse(data, function(key, value) {
      if (key !== '//')
        return value;
    });
  }
};
