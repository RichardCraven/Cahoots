const express = require('express')
const router = express.Router();
const knex = require('../db/knex')

// router.get('/:id', function (req, res) {
// 	knex.select(['mpc.created_at', 'mpc.message', 'mpc.user_id', 'mpc.first_comment_id', 'mpc.music_post_id', 'u.display_name', 'original_post.descriptive_title', 'original_post.summary', 'u.user_pic']).from('music_post_conversations as mpc')
// 		.join('music_posts as original_post', 'original_post.id', '=', 'mpc.music_post_id')
// 		.join('users as u', 'u.third_party_user_id', '=', 'mpc.user_id')
// 		.where('original_post.user_id', req.params.id)
// 		.then(function (post) {
// 			res.send(post)
// 		});
// });
router.get('/:id', function (req, res) {
	knex.select(['mpc.created_at', 'mpc.message', 'mpc.user_id', 'u.display_name', 'u.bio','mpc.first_comment_id', 'mpc.music_post_id', 'original_post.descriptive_title', 'original_post.summary', 'u.user_pic']).from('music_post_conversations as mpc')
		.join('music_posts as original_post', 'original_post.id', '=', 'mpc.music_post_id')
		.join('users as u', 'u.third_party_user_id', '=', 'mpc.user_id')
		.where('original_post.user_id', req.params.id)
		.then(function (posters_messages) {
			knex.select(['mpc.created_at', 'mpc.message', 'mpc.user_id', 'u.display_name', 'u.bio','mpc.first_comment_id', 'mpc.music_post_id', 'original_post.descriptive_title', 'original_post.summary', 'u.user_pic']).from('music_post_conversations as mpc')
				.join('music_posts as original_post', 'original_post.id', '=', 'mpc.music_post_id')
				.join('music_post_comments as mpcom', 'mpcom.id', '=', 'mpc.first_comment_id')
				.join('users as u', 'u.third_party_user_id', '=', 'mpc.user_id')
				.where('mpcom.user_id', req.params.id)
				.then(function (commentors_messages) {
					let post = {
						posters_messages: posters_messages,
						commentors_messages: commentors_messages
					}
					res.send(post)
				})
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