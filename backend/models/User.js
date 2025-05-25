const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");


// Modelo de usuario default
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});


// Generar token de autenticación
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "30d",
	});
	return token;
};

// Generar token reset password
userSchema.methods.createResetPasswordToken = function () {
    const resetToken = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY_FORGOT, {
		expiresIn: "30d",
	});
    return resetToken;
}

// Creo el objeto 
const User = mongoose.model('user', userSchema);

// Complejidad de la password
const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
};

// Validar body del modelo
const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity(complexityOptions).required().label("Password")
    });
    return schema.validate(data)
}


// Exporto función y objeto User
module.exports = { User, validate };