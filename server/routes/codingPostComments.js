const express = require('express')
const router = express.Router();
const knex = require('../db/knex')


router.get('/', function (req,res){
console.log(req.body)
console.log(req.body.user_id)	

knex('coding_post_comments').where('user_id',req.body)
	.then(function(post){
		res.send(post)
	})
})
router.get('/:id', function(req,res){
	knex.select(['c.comment','c.user_pic','scripting_language']).from('coding_posts as f')
	.join('coding_post_comments as c', 'f.id', '=', 'c.post_id')
	.where('f.user_id',req.params.id)
	.then(function(mail){
		console.log('mail is: '+mail)
	// eval(require('locus'))
		res.send(mail)
	})
	
})

router.post('/',function(req,res){
	console.log('ATTENTION! req.body = '+req.body)
	console.log('req.body.post is: '+req.body.post)
	
	knex('coding_post_comments').insert(req.body.post, '*')
	.then(function(post){
		res.send(post)
	})
})


router.delete('/:id', (req,res) => {
	knex('coding_post_comments').where('id', req.params.id).del().then(function(){
		res.send('codingPost deleted!');
	}).catch(function(err){
		res.send
	})
})

router.put('/:id', (req,res) => {
	knex('coding_post_comments')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
			res.send('codingPost Updated!')
		}).catch(function(err){
			res.send(err);
		})
})
module.exports = router