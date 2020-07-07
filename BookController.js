const express = require('express');

const router = express.Router();

const { BookTB } = require('../models1/sequelize');

exports.getBooks = (req, res) => {

	BookTB.findAll({
		attributes: ['bookId', 'bookName']
	})
	.then(book => {
		console.log(book);
		
		res.status(200).send({book: book})
	})
	.catch(err => {
		res.status(404).send({
			message: err.message || "Some error ocured"
		})
	})

}


exports.addBook = (req, res) => {

	let { bookName } = req.body;

	console.log("Got req: ", req.body);

	BookTB.create({
		bookName: bookName
	})
	.then(book => {
		if(book)
		{
			res.status(200).send('Book added');
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occured"
		})
	})
}

exports.updateBook = (req, res) => {

	let { bookName, bookId} = req.body;

	console.log("Got req: ", req.body);

	BookTB.update({bookName: bookName},{
		where: { bookId: bookId}})
	.then(book => {
		if(book)
		{
			res.status(200).send('Book updated');
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occured"
		})
	})
}


exports.deleteBook = (req, res) => {

	let { bookId} = req.body;

	console.log("Got req: ", req.body);

	BookTB.destroy({
		where: { bookId: bookId}
	})
	.then(book => {
		if(book)
		{
			res.status(200).send('Book deleted');
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occured"
		})
	})
}