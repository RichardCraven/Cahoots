//TODO:

//1. Do ROUTING TO COMMUNICATE TO DB AND PERFORM CRUD
//2.Wire up Angular and connect view
//6.Refactor

const express = require('express')
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const locus = require('locus')
const favicon = require('serve-favicon')
// const apiRoutes = require('./routes')

const faviconPath = __dirname + '/public/faviconPath'

const users = require('./routes/users')
// const posts = require('./routes/posts')
const musicPosts = require('./routes/musicPosts')
const musicPostComments = require('./routes/musicPostComments')
const musicPostConversations = require('./routes/musicPostConversations')
const filmPosts = require('./routes/filmPosts')
const filmPostComments = require('./routes/filmPostComments')
const filmPostConversations = require('./routes/filmPostConversations')
const codingPosts = require('./routes/codingPosts')
const codingPostComments = require('./routes/codingPostComments')
const codingPostConversations = require('./routes/codingPostConversations')
const cleanupPosts = require('./routes/cleanupPosts')
const convoRepository = require('./routes/convoRepository')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({encoded:false}))
app.use(morgan('tiny'));

app.use('/javascripts', express.static(__dirname + '/../client/javascripts'))
app.use('/stylesheets', express.static(__dirname + '/../client/stylesheets'))
app.use('/images', express.static(__dirname + '/../client/images'))
app.use('/views', express.static(__dirname + '/../client/views'))

// app.use('/api/posts', posts)
app.use('/api/film', filmPosts) 
app.use('/api/filmPostComments', filmPostComments)
app.use('/api/filmPostConversations', filmPostConversations)
app.use('/api/music', musicPosts)
app.use('/api/musicPostComments', musicPostComments)
app.use('/api/musicPostConversations', musicPostConversations)
app.use('/api/coding', codingPosts)
app.use('/api/codingPostComments', codingPostComments)
app.use('/api/codingPostConversations', codingPostConversations)
app.use('/api/users', users)
app.use('/api/convoRepository', convoRepository)
//the path here ('/api/film') corresponds to the service that uses it ex: const BASE_URL = '/api/film')
// app.use(favicon(faviconPath))

app.get('*',function(req,res){
	console.log(__dirname)
	res.sendFile('layout.html', {root: './client/views'});
})


app.listen(3015, function() {
	console.log('Listening on port 3015')
})