const express = require('express');

const router = express.Router();

const { AuthorTB } = require('../models1/sequelize');
const { BookTB } = require('../models1/sequelize');
const { GenreTB } = require('../models1/sequelize');
const { UserTB } = require('../models1/sequelize');

exports.getLibraryAuthors = (req,res)=>{
	AuthorTB.findAll({
		attributes: ['authorId', 'authorName']
	})
	.then(author => {
		console.log(author);
		
		res.render('./author', { author: author });
	})
	.catch(err => {
		res.status(404).send({
			message: err.message || "Some error ocured"
		})
	})


}
exports.getLibraryBooks = (req, res) => {

	BookTB.findAll({
		attributes: ['bookId', 'bookName']
	})
	.then(book => {
		console.log(book);
		
		res.render('index', { title: res.json(book) });
	})
	.catch(err => {
		res.status(404).send({
			message: err.message || "Some error ocured"
		})
	})

}
exports.getBookGenres = (req,res) => {
	GenreTB.findAll({
		attributes: ['genreId', 'genreName']
	})
	.then(genre => {
		console.log(genre);
		
		res.render('genre', { genre: res.json(genre) });
	})
	.catch(err => {
		res.status(404).send({
			message: err.message || "Some error ocured"
		})
	})

}
exports.getLibraryUsers = (req,res)=>{
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