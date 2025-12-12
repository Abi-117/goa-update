const mongoose = require('mongoose');
const PageSchema = new mongoose.Schema({
key: { type: String, unique: true }, // e.g. 'home', 'about'
title: String,
slug: String,
sections: [{
heading: String,
content: String,
image: String,
}],
}, { timestamps: true });
module.exports = mongoose.model('Page', PageSchema);