const express = require('express');

const router = express.Router();

const { AuthorTB, BookTB } = require('../models1/sequelize');

exports.getAuthors = (req, res) => {

	AuthorTB.findAll({
		attributes: ['authorId', 'authorName']
	})
	.then(author => {
		console.log(author);
		
		//res.render('./author', { author: author});

		res.status(200).send({author: author})
	})
	.catch(err => {
		res.status(404).send({
			message: err.message || "Some error ocured"
		})
	})

}

exports.getAuthorBooks = (req, res) => {

	AuthorTB.findAll({
		include: [
			BookTB 
		]
	})
	.then(authorBook => {

		let bookArr = [];

		res.render('./author', { books: res.json(authorBook)});

	})
	.catch(err => {
		res.status(404).send({
			message: err.message || "Some error ocured"
		})
	})
}

exports.addAuthor = (req, res) => {

	let { authorName } = req.body;

	console.log("Got req: ", req.body);

	AuthorTB.create({
		authorName: authorName
	})
	.then(author => {
		if(author)
		{
			res.status(200).send('Author added');
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occured"
		})
	})
}

exports.updateAuthor = (req, res) => {

	let { authorName, authorId} = req.body;

	console.log("Got req: ", req.body);

	AuthorTB.update({authorName: authorName},{
		where: { authorId: authorId}})
	.then(author => {
		if(author)
		{
			res.status(200).send('Author updated');
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occured"
		})
	})
}

exports.deleteAuthor = (req, res) => {

	let { authorId} = req.body;

	console.log("Got req: ", req.body);

	AuthorTB.destroy({
		where: { authorId: authorId}
	})
	.then(author => {
		if(author)
		{
			res.status(200).send('Author deleted');
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occured"
		})
	})
}