#!/usr/bin/env node

const CoverageBabel = require('./coverage-babel').default

var cn = new CoverageBabel(process.argv[2])

cn.sayHello()
