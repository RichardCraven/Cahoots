//TODO:

//1. geT DATABSE WORKING, FIGURE OUT ROUTING TO COMMUNICATE TO DB AND PERFORM CRUD
//2.Wire up Angular and connect view for showing pirates
//3.Handle creation of pirate
//4.Hnadle deletion
//5.Handle update
//6.Refactor

const express = require('express')
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
// const locus = require('locus')
// const apiRoutes = require('./routes')



const users = require('./routes/users')
const posts = require('./routes/posts')
const musicPosts = require('./routes/musicPosts')
const filmPosts = require('./routes/filmPosts')
const filmPostComments = require('./routes/filmPostComments')
const codingPosts = require('./routes/codingPosts')
const cleanupPosts = require('./routes/cleanupPosts')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({encoded:false}))
app.use(morgan('tiny'));

app.use('/javascripts', express.static(__dirname + '/../client/javascripts'))
app.use('/stylesheets', express.static(__dirname + '/../client/stylesheets'))
app.use('/images', express.static(__dirname + '/../client/images'))
app.use('/views', express.static(__dirname + '/../client/views'))

app.use('/api/posts', posts)
app.use('/api/film', filmPosts) 
app.use('/api/filmPostComments', filmPostComments)
app.use('/api/music', musicPosts)
app.use('/api/users', users)
//the path here ('/api/film') corresponds to the service that uses it ex: const BASE_URL = '/api/film')



app.get('*',function(req,res){
	console.log(__dirname)
	res.sendFile('layout.html', {root: './client/views'});
})


app.listen(3015, function() {
	console.log('Listening on port 3015')
})