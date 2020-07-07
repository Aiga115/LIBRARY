const express = require('express');

const router = express.Router();

const { UserTB } = require('../models1/sequelize');

exports.getUsers = (req,res)=>{
	UserTB.findAll({
		attributes: ['userId', 'userName','userSurname']
	})
	.then(user => {
		console.log(user);
		
		res.render('user', { user: res.json(user) });
	})
	.catch(err => {
		res.status(404).send({
			message: err.message || "Some error ocured"
		})
	})


}