const express = require('express')
const router = express.Router();
const knex = require('../db/knex')


router.get('/', function (req,res){
console.log(req.body)
console.log(req.body.user_id)	

knex('convo_repository').where('user_id',req.body)
	.then(function(post){
		res.send(post)
	})
})
router.get('/:id', function(req,res){
	knex.select(['c.comment','fp.topic','u.user_pic','u.display_name']).from('film_posts as fp')
	.join('convo_repository as c', 'c.post_id', '=', 'fp.id')
	.join('users as u', 'u.third_party_user_id','=','c.user_id')
	.where('fp.user_id',req.params.id)
	.then(function(mail){
		console.log('film mail is: '+mail)
		res.send(mail)
	})
})

router.post('/',function(req,res){
	console.log('ATTENTION! req.body = '+req.body)
	console.log('req.body.post is: '+req.body.post)
	
	knex('convo_repository').insert(req.body.post, '*')
	.then(function(post){
		res.send(post)
	})
})


router.delete('/:id', (req,res) => {
	knex('convo_repository').where('id', req.params.id).del().then(function(){
		res.send('filmPost deleted!');
	}).catch(function(err){
		res.send
	})
})

router.put('/:id', (req,res) => {
	knex('convo_repository')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
			res.send('filmPost Updated!')
		}).catch(function(err){
			res.send(err);
		})
})
module.exports = router