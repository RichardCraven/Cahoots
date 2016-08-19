const express = require('express')
const router = express.Router();
const knex = require('../db/knex')

router.get('/', function (req,res){
	knex('film_posts').then(function(filmPosts){
		res.send(filmPosts);		
	}).catch(function(err){
		res.send(err);
	});
})

router.get('/:id', function(req,res){
	knex('film_posts').where('id',req.params.id).first()
	.then(function(post){
		res.send(post)
	})
})

router.post('/',function(req,res){
	// debugger
	knex('film_posts').insert(req.body.post, '*')
	.then(function(post){
		res.send(post)
	})
})


router.delete('/:id', (req,res) => {
	knex('film_posts').where('id', req.params.id).del().then(function(){
		res.send('filmPost deleted!');
	}).catch(function(err){
		res.send
	})
})

router.put('/:id', (req,res) => {
	knex('film_posts')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
			res.send('filmPost Updated!')
		}).catch(function(err){
			res.send(err);
		})
})
module.exports = router