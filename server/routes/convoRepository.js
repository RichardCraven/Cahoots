const express = require('express')
const router = express.Router();
const knex = require('../db/knex')


router.get('/', function (req,res){
console.log(req.body)
console.log(req.body.user_id)	

// knex('convo_repository').where('user_id',req.body)
// 	.then(function(post){
// 		res.send(post)
})

router.get('/:category/:id', function(req,res){
	knex.select(['c.message','u.display_name','u.user_pic']).from('convo_repository as c')
	.join('users as u', 'c.user_id', '=', 'u.third_party_user_id')
	.where('c.category',req.params.category)
	.where('c.original_comment_id',req.params.id)
	// .where({req.params.category:"c.category","c.original_comment_id":req.params.id})
	.then(function(messages){
		console.log('messages are: '+messages)
		console.log(req.params.category)
		res.send(messages)
	})
	.catch(function(err){
		res.send(err);
	});	
})

router.post('/',function(req,res){
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