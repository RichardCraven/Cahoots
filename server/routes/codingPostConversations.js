const express = require('express')
const router = express.Router();
const knex = require('../db/knex')


router.get('/', function (req,res){
knex('coding_post_conversations').where('user_id',req.body)
	.then(function(post){
		res.send(post)
	})
})
router.get('/:id', function(req,res){
	knex.select(['cpc.message','cpc.user_id']).from('coding_post_conversations as cpc')
	.where('cpc.first_comment_id',req.params.id)
	.then(function(messages){
		// for(var a in mail[0]){
		// 	console.log('a 666666 is ',a)
		// }
		// console.log('coding mail is: '+   mail[0])
		res.send(messages)
	})




	// knex.select(['c.comment','c.id','cp.framework','u.user_pic','u.display_name', 'c.user_id']).from('coding_posts as cp')
	// .join('coding_post_comments as c', 'c.post_id', '=', 'cp.id')
	// .join('users as u', 'u.third_party_user_id','=','c.user_id')
	// .where('cp.user_id',req.params.id)
	// .then(function(mail){
	// 	res.send(mail)
	// })
	
})

router.post('/',function(req,res){
	console.log('ATTENTION! req.body = '+req.body)
	console.log('req.body.post is: '+req.body.post)
	
	knex('coding_post_conversations').insert(req.body.post, '*')
	.then(function(post){
		res.send(post)
	})
})


router.delete('/:id', (req,res) => {
	knex('coding_post_conversations').where('id', req.params.id).del().then(function(){
		res.send('codingPost deleted!');
	}).catch(function(err){
		res.send
	})
})

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