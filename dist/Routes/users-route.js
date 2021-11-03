"use strict";
var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({});
exports.Category = mongoose.model('Category', categorySchema);
