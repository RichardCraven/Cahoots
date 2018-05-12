const express = require('express')
const router = express.Router();
const knex = require('../db/knex')

router.get('/', function (req,res){
	knex('users').then(function(users){
		res.send(users);		
	}).catch(function(err){
		res.send(err);
	});
})

router.get('/:id', function(req,res){
	knex('users').where('third_party_user_id',req.params.id).first()
	.then(function(user){
		res.send(user)
	})
})

router.post('/',function(req,res){
	console.log('knex query beginning, req.body = '+req.body.user)
	knex('users').insert(req.body.user, '*')
	.then(function(user){
		res.send(user)
	}).catch(function(err){
		res.send(err)
	})
})

router.delete('/:id', (req,res) => {
	knex('users').where('id', req.params.id).del().then(function(){
		res.send('user deleted!');
	}).catch(function(err){
		res.send
	})
})

// router.put('/:id', (req,res) => {
// 	// req.body.user.zip_code = +req.body.user.zip_code || null ;
// 	console.log('BIMBOBAMBO req.body is ', req.body);
	
// 	knex('users')
// 		.where('third_party_user_id', req.body.post.third_party_id)
// 		.update(req.body.post)
// 		.then(function(){
// 			console.log('oh hey');
			
// 		}).catch(function(err){
// 			res.send(err);
// 		})
// })

router.put('/:id', (req, res) => {
	req.body.user.zip_code = +req.body.user.zip_code || null;
	knex('users')
		.where('id', req.params.id)
		.update(req.body.user)
		.then(function () {
			res.send('user Updated!')
		}).catch(function (err) {
			res.send(err);
		})
})
router.put('/third_party_id/:id', (req, res) => {
	knex('users')
		.where('third_party_user_id', req.params.id)
		.update({has_mail : req.body.user.has_mail})
		.then(function () {
			res.send('user Updated!')
		}).catch(function (err) {
			res.send(err);
		})
})

//GET '/:id'
//PUT '/:id'
//user '/'
//DELETE '/:id'


module.exports = router