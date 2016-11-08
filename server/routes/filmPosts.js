const express = require('express')
const router = express.Router();
const knex = require('../db/knex')

router.get('/', function (req,res){
	// knex('film_posts').then(function(filmPosts){
	// 	res.send(filmPosts);
	knex.select(['u.display_name','u.user_pic','u.third_party_user_id','f.id','topic','brief_description']).from('film_posts as f')
	.join('users as u', 'u.third_party_user_id', '=', 'f.user_id')
		.then(function(filmPosts){
		res.send(filmPosts);
		})
	.catch(function(err){
		res.send(err);
	});		
	
})

router.get('/:id', function(req,res){
	knex.select(['u.display_name','u.user_pic','topic','brief_description']).from('film_posts as f')
	.join('users as u', 'u.third_party_user_id', '=', 'f.user_id')
	.where('f.id',req.params.id).first()
	.then(function(post){
		res.send(post)
	})
})
//PREVIOUS VERSION: 
// router.get('/:id', function(req,res){
// 	knex.select(['u.display_name','u.user_pic','topic','brief_description']).from('film_posts as f')
// 	.join('users as u', 'u.third_party_user_id', '=', 'f.user_id')
// 	knex('film_posts').where('u.third_party_user_id',req.params.id).first()
// 	.then(function(post){
// 		res.send(post)
// 	})
// })

router.post('/',function(req,res){
	// debugger
	console.log('ATTENTION! req.body = '+req.body)
	console.log('req.body.post.data is: '+req.body.post[0])
	// knex.select('u.display_name').from('users as u')
	// .then(function(display){
		// req.body.post.display_name = display[0].display_name
		// eval(require('locus'))
	knex('film_posts').insert(req.body.post, '*')
	.then(function(post){

		res.send(post)
	})
	// })
})


router.delete('/:id', (req,res) => {
	knex('film_posts').where('id', req.params.id).del().then(function(){
		res.send('filmPost deleted!');
	}).catch(function(err){
		res.send
	})
})

router.put('/:id', (req,res) => {
	knex('film_posts')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
			res.send('filmPost Updated!')
		}).catch(function(err){
			res.send(err);
		})
})
module.exports = router