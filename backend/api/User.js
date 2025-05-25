const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

// Modelo de Usuario
const { User, validate } = require('./../models/User');

// encriptación de password
const bcrypt = require('bcrypt');

const Joi = require("joi");

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const username = await User.findOne({ username: req.body.username });
        if (username)
            return res.status(409).send({ message: "Ya existe un usuario registrado con el usuario ingresado!"})

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "Ya existe un usuario registrado con el mail ingresado!"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "Usuario creado correctamente!"})
    } catch (error) {
        res.status(500).send({ message: "Error interno del servidor!" })
    }
});

// Login
router.post('/signin', async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        
        let user = await User.findOne({ email: req.body.email });

        if (!user)
            user = await User.findOne({ username: req.body.email });

        if (!user)
            return res.status(401).send({ message: "El correo y/o la contraseña son invalidos!" });
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ message: "El correo y/o la contraseña son invalidos!" });
        
        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "Inicio de sesión exitoso!"})
        
    } catch (error) {
        res.status(500).send({message: "Error interno del servidor!" })
    }
});

// Validar body
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
}


// Delete
router.post('/delete', async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.body.id });
        const id = req.body.id;
        
        if (!user)
            return res.status(401).send({ message: "No se encontró el usuario seleccionado!" });

        const remove = await User.findByIdAndDelete(id);
        if (!remove)
            return res.status(401).send({ message: "No se encontró el usuario seleccionado!" });
        
        res.status(200).send({message: "Usuario eliminado con éxito!"})
    } catch (error) {
        res.status(500).send({message: "Error interno del servidor!" })
    }
});

// Envío de correo
router.post("/forgot-password", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user)
            return res.status(401).send({ message: "El correo no está registrado!" });
        
        const tokenReset = user.createResetPasswordToken();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: 'Jeroky Store',
            to: `${user.email}`,
            subject: 'Jeroky Store - Solicitud reseteo de contraseña',
            text: `http://localhost:3001/reset_password/${user._id}/${tokenReset}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.status(500).send({message: "Error en el envío del correo!" })
            } 
        });
        res.status(200).send({message: "Correo enviado con éxito!"})
    } catch (error) {
        res.status(500).send({message: "Error interno del servidor!" })
    }
});

// Reseteo de contraseña
router.post('/reset-password/:id/:token', (req, res) => {
    try {
        const {id, token} = req.params
        let password = req.body.password
        let password2 = req.body.password2
        if(password != password2) {
            return res.status(401).send({ message: "Las contraseñas no coinciden!" });
        }
        
        jwt.verify(token, process.env.JWTPRIVATEKEY_FORGOT, (err, decoded) => {
            if(err) {
                return res.status(401).send({ message: "El token ingresado es incorrecto!" });
            } else {
                bcrypt.hash(password, 10)
                .then(hash => {
                    User.findByIdAndUpdate({_id: id}, {password: hash})
                    .then(u => res.status(200).send({ message: "Contraseña actualizada con éxito!"}))
                    .catch(err => res.status(500).send({ message: "Error al actualizar la contraseña, intente nuevamente."}))
                })
            }
        })
    } catch (error) {
        res.status(500).send({message: "Error interno del servidor!" })
    }
});

// Obtengo datos desde la db
router.get('/report', async (req, res) => {
    try {
        const datos = await User.find();
        res.send(datos);
    } catch (error) {
        res.status(500).send({message: "Error interno del servidor!" })
    }
});

module.exports = router;