const express = require('express')
const router = express.Router();
const knex = require('../db/knex')

router.get('/:id', function (req, res) {
	knex('film_post_conversations as fpc')
		.join('film_posts as original_post', 'original_post.id', '=', 'fpc.film_post_id')
		.where('original_post.user_id', req.params.id)
		.then(function (post) {
			res.send(post)
		});
});
router.post('/',function(req,res){
	knex('film_post_conversations').insert(req.body.post, '*')
	.then(function(post){
		res.send(post)
	});
});
router.delete('/:id', (req,res) => {
	knex('film_post_conversations').where('id', req.params.id).del().then(function(){
		res.send('filmPost deleted!');
	}).catch(function(err){
		res.send
	});
});
router.put('/:id', (req,res) => {
	knex('film_post_conversations')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
		res.send('filmPost Updated!')
	}).catch(function(err){
		res.send(err);
	});
});
module.exports = router