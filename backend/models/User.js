const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// pre save

userSchema.statics.signup = async function (email, password) {

    if (!email || !password) {
        throw Error("All fields are required")
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough (must contain 1 UpperCase,1 Lowercase,1 Special character,1 Number)")
    }
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("Email already in use!");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
}


userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields are required")
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("User doesnot exist,try with other email and password");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("incorrect credentials")
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);