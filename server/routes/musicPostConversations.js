const express = require('express')
const router = express.Router();
const knex = require('../db/knex')

router.get('/:id', function (req, res) {
	knex.select(['mpc.id', 'mpc.message', 'mpc.user_id']).from('music_post_conversations as mpc')
		.join('music_posts as original_post', 'original_post.id', '=', 'mpc.music_post_id')
		// .join('users as u', 'u.third_party_user_id', '=', 'mpc.user_id')
		.where('original_post.user_id', req.params.id)
		.then(function (post) {
			res.send(post)
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