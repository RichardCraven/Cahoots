const express = require('express')
const router = express.Router();
const knex = require('../db/knex')

router.get('/', function (req,res){
	console.log('in router get coding points');
	
	knex.select(['u.display_name', 'u.user_pic', 'u.third_party_user_id', 'u.latlong', 'c.id', 'descriptive_title', 'summary', 'framework', 'created_at']).from('coding_posts as c')
	.join('users as u', 'u.third_party_user_id', '=', 'c.user_id')
		.then(function(codingPosts){
			console.log('posts are ', codingPosts);
			
		res.send(codingPosts);
		})
	.catch(function(err){
		res.send(err);
	});
})

router.get('/:id', function(req,res){
	knex('coding_posts').where('id',req.params.id).first()
	.then(function(post){
		res.send(post)
	})
})

router.post('/',function(req,res){
	knex('coding_posts').insert(req.body.post, '*')
	.then(function(post){
		res.send(post)
	})
})


router.delete('/:id', (req,res) => {
	knex('coding_posts').where('id', req.params.id).del().then(function(){
		res.send('codingPost deleted!');
	}).catch(function(err){
		res.send
	})
})

router.put('/:id', (req,res) => {
	knex('coding_posts')
		.where('id', req.params.id)
		.update(req.body.post)
		.then(function(){
			res.send('codingPost Updated!')
		}).catch(function(err){
			res.send(err);
		})
})
module.exports = router