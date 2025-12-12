const express = require('express');
const router = express.Router();
const auth = require('../middleware/adminAuth');
const Page = require('../models/Page');
const AdminUser = require("../models/AdminUser");


// GET page by key
router.get('/:key', async (req, res) => {
const page = await Page.findOne({ key: req.params.key });
if (!page) return res.status(404).json({});
res.json(page);
});


// ADMIN: update/create
router.post('/:key', auth, async (req, res) => { 
const key = req.params.key;
const payload = req.body;
let page = await Page.findOne({ key });
if (page) {
Object.assign(page, payload);
await page.save();
} else {
page = await Page.create({ key, ...payload });
}
res.json(page);
});


module.exports = router;