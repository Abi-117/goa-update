const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminUserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
}, { timestamps: true });

// FIXED pre-save hook for Mongoose v7
AdminUserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
AdminUserSchema.methods.matchPassword = async function (entered) {
    return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('AdminUser', AdminUserSchema);
