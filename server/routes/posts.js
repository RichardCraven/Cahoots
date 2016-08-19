const express = require('express')
const router = express.Router();
const knex = require('../db/knex')

router.get('/', function (req,res){
	knex('posts').then(function(posts){
		res.send(posts);		
	}).catch(function(err){
		res.send(err);
	});
})

router.get('/:id', function(req,res){
	knex('posts').where('id',req.params.id).first()
	.then(function(post){
		res.send(post)
	})
})

router.post('/',function(req,res){
	knex('posts').insert(req.body.post, '*')
	.then(function(post){
		res.send(post)
	})
})

router.delete('/:id', (req,res) => {
	knex('posts').where('id', req.params.id).del().then(function(){
		res.send('post deleted!');
	}).catch(function(err){
		res.send
	})
})

router.put('/:id', (req,res) => {
	knex('posts')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
			res.send('post Updated!')
		}).catch(function(err){
			res.send(err);
		})
})

//GET '/:id'
//PUT '/:id'
//POST '/'
//DELETE '/:id'


module.exports = router