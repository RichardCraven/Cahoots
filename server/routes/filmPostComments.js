const express = require('express')
const router = express.Router();
const knex = require('../db/knex')


router.get('/', function (req,res){
console.log(req.body)
console.log(req.body.user_id)	

knex('film_post_comments').where('user_id',req.body)
	.then(function(post){
		res.send(post)
	})
})
router.get('/:id', function(req,res){
	knex.select(['c.comment','c.user_pic','topic']).from('film_posts as f')
	.join('film_post_comments as c', 'f.id', '=', 'c.post_id')
	.where('f.user_id',req.params.id)
	.then(function(mail){
		res.send(mail)
	})
})

router.post('/',function(req,res){
	console.log('ATTENTION! req.body = '+req.body)
	console.log('req.body.post is: '+req.body.post)
	
	knex('film_post_comments').insert(req.body.post, '*')
	.then(function(post){
		res.send(post)
	})
})


router.delete('/:id', (req,res) => {
	knex('film_post_comments').where('id', req.params.id).del().then(function(){
		res.send('filmPost deleted!');
	}).catch(function(err){
		res.send
	})
})

router.put('/:id', (req,res) => {
	knex('film_post_comments')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
			res.send('filmPost Updated!')
		}).catch(function(err){
			res.send(err);
		})
})
module.exports = router