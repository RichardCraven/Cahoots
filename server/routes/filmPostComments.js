const express = require('express')
const router = express.Router();
const knex = require('../db/knex')


router.get('/', function (req,res){
	knex('film_post_comments').where('user_id',req.body)
	.then(function(post){
		res.send(post)
	})
});
router.get('/:id', function(req,res){
	knex.select(['c.comment', 'c.is_accepted', 'fp.descriptive_title', 'u.user_pic', 'u.display_name', 'c.id', 'c.post_id', 'c.category', 'c.user_id']).from('film_posts as fp')
	.join('film_post_comments as c', 'c.post_id', '=', 'fp.id')
	.join('users as u', 'u.third_party_user_id','=','c.user_id')
	.where('fp.user_id',req.params.id)
	.then(function(mail){
		console.log('film mail is: '+mail)
		res.send(mail)
	})
});

router.get('/history/:id', function(req,res){
	knex.select(['c.comment', 'c.is_accepted', 'c.post_id', 'u.user_pic', 'u.display_name', 'c.user_id', 'c.id', 'c.category', 'fp.descriptive_title' ]).from('film_post_comments as c')
	.join('film_posts as fp', 'c.post_id', '=', 'fp.id')
	.join('users as u', 'u.third_party_user_id','=','c.user_id')
	.where('c.user_id',req.params.id)
	.then(function(comment){
		res.send(comment)
	})
});

router.post('/',function(req,res){
	console.log('ATTENTION! req.body = '+req.body)
	console.log('req.body.post is: '+req.body.post)
	
	knex('film_post_comments').insert(req.body.post, '*')
	.then(function(post){
		res.send(post)
	})
});

router.delete('/:id', (req,res) => {
	knex('film_post_comments').where('id', req.params.id).del().then(function(){
		res.send('filmPost deleted!');
	}).catch(function(err){
		res.send
	})
});

router.put('/:id', (req,res) => {
	knex('film_post_comments')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
			res.send('filmPost Updated!')
		}).catch(function(err){
			res.send(err);
		})
});
module.exports = router