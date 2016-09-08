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
		// console.log(user.display_name)
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

router.put('/:id', (req,res) => {
	knex('users')
		.where('id', req.params.id)
		.update(req.body.user)
		.then(function(){
			res.send('user Updated!')
		}).catch(function(err){
			res.send(err);
		})
})

//GET '/:id'
//PUT '/:id'
//user '/'
//DELETE '/:id'


module.exports = router