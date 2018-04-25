const express = require('express')
const router = express.Router();
const knex = require('../db/knex')

router.get('/', function (req,res){
knex('music_post_conversations').where('user_id',req.body)
	.then(function(post){
		res.send(post)
	});
});
router.get('/:id', function(req,res){
	knex.select(['mpc.message','mpc.user_id']).from('music_post_conversations as mpc')
	.where('mpc.first_comment_id',req.params.id)
	.then(function(messages){
		res.send(messages)
	});
});
router.post('/',function(req,res){
	knex('music_post_conversations').insert(req.body.post, '*')
	.then(function(post){
		res.send(post)
	});
});
router.delete('/:id', (req,res) => {
	knex('music_post_conversations').where('id', req.params.id).del().then(function(){
		res.send('musicPost deleted!');
	}).catch(function(err){
		res.send
	});
});
router.put('/:id', (req,res) => {
	knex('music_post_conversations')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
		res.send('musicPost Updated!')
	}).catch(function(err){
		res.send(err);
	});
});
module.exports = router