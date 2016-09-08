#!/usr/bin/env node

const CoverageNative = require('./coverage-native')

var cn = new CoverageNative(process.argv[2])

cn.sayHello()
