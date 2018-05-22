const express = require('express')
const router = express.Router();
const knex = require('../db/knex')


router.get('/', function (req,res){
knex('coding_post_comments').where('user_id',req.body)
	.then(function(post){
		res.send(post)
	})
})
router.get('/:id', function(req,res){
	knex.select(['c.comment', 'c.id', 'c.is_accepted', 'cp.framework', 'u.user_pic', 'u.display_name', 'u.bio', 'c.category', 'c.user_id', 'c.post_id', 'cp.descriptive_title']).from('coding_posts as cp')
	.join('coding_post_comments as c', 'c.post_id', '=', 'cp.id')
	.join('users as u', 'u.third_party_user_id','=','c.user_id')
	.where('cp.user_id',req.params.id)
	.then(function(mail){
		res.send(mail)
	})
})

router.get('/history/:id', function(req,res){
	knex.select(['c.comment', 'c.post_id', 'u.user_pic', 'c.is_accepted', 'u.display_name', 'c.category', 'c.user_id', 'c.id', 'cp.descriptive_title' ]).from('coding_post_comments as c')
	.join('coding_posts as cp', 'c.post_id', '=', 'cp.id')
	.join('users as u', 'u.third_party_user_id','=','c.user_id')
	.where('c.user_id',req.params.id)
	.then(function(comment){
		res.send(comment)
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
		res.send('codingPostComment deleted!');
	}).catch(function(err){
		res.send
	})
})

router.put('/:id', (req,res) => {
	console.log('YOOOOO daa is ', req.params.id);
	console.log('YOOOOO req.body is ', req.body);
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