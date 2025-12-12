const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');


router.post('/login', async (req, res) => {
const { email, password } = req.body;
const admin = await AdminUser.findOne({ email });
if (admin && (await admin.matchPassword(password))) {
const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
return res.json({ token, admin: { name: admin.name, email: admin.email } });
}
return res.status(401).json({ message: 'Invalid credentials' });
});


module.exports = router;