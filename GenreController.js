const express = require('express');

const router = express.Router();

const { GenreTB } = require('../models1/sequelize');

exports.getGenres = (req,res)=>{
	GenreTB.findAll({
		attributes: ['genreId', 'genreName']
	})
	.then(genre => {
		console.log(genre);
		
		res.status(200).send({genre: genre})
	})
	.catch(err => {
		res.status(404).send({
			message: err.message || "Some error ocured"
		})
	})


}

exports.addGenre = (req, res) => {

	let { genreName } = req.body;

	console.log("Got req: ", req.body);

	GenreTB.create({
		genreName: genreName
	})
	.then(genre => {
		if(genre)
		{
			res.status(200).send('Genre added');
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occured"
		})
	})
}


exports.updateGenre = (req, res) => {

	let { genreName, genreId} = req.body;

	console.log("Got req: ", req.body);

	GenreTB.update({genreName: genreName},{
		where: { genreId: genreId}})
	.then(genre => {
		if(genre)
		{
			res.status(200).send('Genre updated');
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occured"
		})
	})
}


exports.deleteGenre = (req, res) => {

	let { genreId} = req.body;

	console.log("Got req: ", req.body);

	GenreTB.destroy({
		where: { genreId: genreId}
	})
	.then(genre => {
		if(genre)
		{
			res.status(200).send('Genre deleted');
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error occured"
		})
	})
}