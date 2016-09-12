const express = require('express')
const router = express.Router();
const knex = require('../db/knex')

router.get('/', function (req,res){
	// knex('music_posts').then(function(musicPosts){
	// 	res.send(musicPosts);		
	// }).catch(function(err){
	// 	res.send(err);
	// });
	knex.select(['u.display_name','u.user_pic','u.third_party_user_id','m.id','genre','description','roles_needed']).from('music_posts as m')
	.join('users as u', 'u.third_party_user_id', '=', 'm.user_id')
		.then(function(musicPosts){
		res.send(musicPosts);
		})
	.catch(function(err){
		res.send(err);
	});	
})

router.get('/:id', function(req,res){
	knex('music_posts').where('id',req.params.id).first()
	.then(function(post){
		res.send(post)
	})
})

router.post('/',function(req,res){
	knex('music_posts').insert(req.body.post, '*')
	.then(function(post){
		res.send(post)
	})
})

router.delete('/:id', (req,res) => {
	knex('music_posts').where('id', req.params.id).del().then(function(){
		res.send('musicPost deleted!');
	}).catch(function(err){
		res.send
	})
})

router.put('/:id', (req,res) => {
	knex('music_posts')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
			res.send('musicPost Updated!')
		}).catch(function(err){
			res.send(err);
		})
})

module.exports = router;