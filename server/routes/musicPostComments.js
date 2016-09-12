const express = require('express')
const router = express.Router();
const knex = require('../db/knex')


router.get('/', function (req,res){
console.log(req.body)
console.log(req.body.user_id)	

knex('music_post_comments').where('user_id',req.body)
	.then(function(post){
		res.send(post)
	})
})
router.get('/:id', function(req,res){
	knex.select(['c.comment','mp.genre','u.user_pic','u.display_name']).from('music_posts as mp')
	.join('music_post_comments as c', 'c.post_id', '=', 'mp.id')
	.join('users as u', 'u.third_party_user_id','=','c.user_id')
	.where('mp.user_id',req.params.id)
	.then(function(mail){
	// eval(require('locus'))
		console.log('music mail is: '+mail.data)
		res.send(mail)
	})
	
})

router.post('/',function(req,res){
	console.log('MONKEY'+req.body.post.post_id)
	knex('music_posts').where({id:req.body.post.post_id}).first().then(function(data){
		knex('users').where({third_party_user_id:data.user_id}).first().update('has_mail','true')
			.then(function(){
				knex('music_post_comments').insert(req.body.post, '*')
					.then(function(post){
						res.send({post})
					})
			})
	
	})
})


router.delete('/:id', (req,res) => {
	knex('music_post_comments').where('id', req.params.id).del().then(function(){
		res.send('musicPost deleted!');
	}).catch(function(err){
		res.send
	})
})

router.put('/:id', (req,res) => {
	knex('music_post_comments')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
			res.send('musicPost Updated!')
		}).catch(function(err){
			res.send(err);
		})
})
module.exports = router