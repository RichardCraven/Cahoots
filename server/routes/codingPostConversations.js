const express = require('express')
const router = express.Router();
const knex = require('../db/knex')

router.get('/:id', function (req,res){
	knex.select(['cpc.created_at', 'cpc.message', 'cpc.user_id', 'u.display_name', 'cpc.first_comment_id', 'cpc.coding_post_id', 'original_post.descriptive_title', 'original_post.summary', 'u.user_pic']).from('coding_post_conversations as cpc')
	.join('coding_posts as original_post', 'original_post.id', '=', 'cpc.coding_post_id')
	.join('users as u', 'u.third_party_user_id', '=', 'cpc.user_id')
	.where('original_post.user_id',req.params.id)
	.then(function(post){
		res.send(post)
	});
});
router.post('/',function(req,res){
	knex('coding_post_conversations').insert(req.body.post, '*')
	.then(function(post){
		// console.log('AND HERE THIS! user is ', user, 'post is ', post)
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