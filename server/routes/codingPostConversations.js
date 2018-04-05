const express = require('express')
const router = express.Router();
const knex = require('../db/knex')

router.get('/', function (req,res){
knex('coding_post_conversations').where('user_id',req.body)
	.then(function(post){
		res.send(post)
	});
});
router.get('/:id', function(req,res){
	knex.select(['cpc.message','cpc.user_id']).from('coding_post_conversations as cpc')
	.where('cpc.first_comment_id',req.params.id)
	.then(function(messages){
		res.send(messages)
	});
});
router.post('/',function(req,res){
	console.log('ATTENTION! req.body = '+req.body)
	console.log('req.body.post is: '+req.body.post)
	
	knex('coding_post_conversations').insert(req.body.post, '*')
	.then(function(post){
		res.send(post)
	});
});
router.delete('/:id', (req,res) => {
	knex('coding_post_conversations').where('id', req.params.id).del().then(function(){
		res.send('codingPost deleted!');
	}).catch(function(err){
		res.send
	});
});
router.put('/:id', (req,res) => {
	knex('coding_post_conversations')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
			res.send('codingPost Updated!')
		}).catch(function(err){
			res.send(err);
		})
})
module.exports = router