//SERVICES MANAGE DATA BETWEEN ANGULAR AND BACK END


(function() {

	angular
		.module('collaboApp')
		.service('PostService', PostService)
		.service('MusicPostService', MusicPostService)
		.service('MusicPostCommentsService', MusicPostCommentsService)
		.service('FilmPostService', FilmPostService)
		.service('FilmPostCommentsService', FilmPostCommentsService)
		.service('CodingPostService', CodingPostService)
		.service('CodingPostCommentsService', CodingPostCommentsService)
		.service('UsersService', UsersService)

		function PostService($http){
		 	const BASE_URL = '/api/posts'

			this.getPosts = function(){
				console.log('postservice')
				return $http.get(BASE_URL)
			}

			this.createPost = function(newPost){
				return $http.post(BASE_URL, newPost); //on server req.body.post
			}

			this.getPost = function(id){
				return $http.get(BASE_URL + '/' + id)
			}

			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			}

			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			}
		}
		function MusicPostService($http){
		 	const BASE_URL = '/api/music'

			this.getPosts = function(){
				return $http.get(BASE_URL)
			}

			this.createPost = function(newPost){
				return $http.post(BASE_URL, newPost); //on server req.body.post
			}

			this.getPost = function(id){
				return $http.get(BASE_URL + '/' + id)
			}

			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			}

			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			}
		}
		function MusicPostCommentsService($http){
		 	const BASE_URL = '/api/musicPostComments'

			this.getMail = function(user_id){
				// user_id = {user_id: user_id}
				console.log(user_id)
				console.log('musicPostCommentsService GET MAIL')
				// $http.get(BASE_URL).then(function(data){
				// console.log(data)
				// })
				return $http.get(BASE_URL+'/'+user_id)
			}

			this.createPost = function(newPost){
				console.log('newPost.post: '+newPost.post)
				console.log('newPost.post.post_id is: '+newPost.post.post_id)
				return $http.post(BASE_URL, newPost); //on server req.body.post
			}
			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			}

			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			}
		}
		function FilmPostService($http){
		 	const BASE_URL = '/api/film'

			this.getPosts = function(){
				console.log('filmPostservice GET POSTS')
				// $http.get(BASE_URL).then(function(data){
				// console.log(data)
				// })
				return $http.get(BASE_URL)
			}

			this.createPost = function(newPost){
				return $http.post(BASE_URL, newPost); //on server req.body.post
			}

			// this.createPostComment = function(comment){
			// 	return $http.post(BASE_URL, comment);
			// }

			this.getPost = function(id){
				return $http.get(BASE_URL + '/' + id)
			}

			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			}

			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			}
		}
		function FilmPostCommentsService($http){
		 	const BASE_URL = '/api/filmPostComments'

			this.getMail = function(user_id){
				return $http.get(BASE_URL+'/'+user_id)
			}

			this.createPost = function(newPost){
				return $http.post(BASE_URL, newPost); //on server req.body.post
			}
			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			}

			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			}
		}
		function CodingPostService($http){
		 	const BASE_URL = '/api/coding'

			this.getPosts = function(){
				console.log('codingPostservice GET POSTS')
				return $http.get(BASE_URL)
			}

			this.createPost = function(newPost){
				return $http.post(BASE_URL, newPost); //on server req.body.post
			}

			this.getPost = function(id){
				return $http.get(BASE_URL + '/' + id)
			}

			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			}

			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			}
		}
		function CodingPostCommentsService($http){
		 	const BASE_URL = '/api/codingPostComments'
		 	console.log('got to coding comments service')
			this.getMail = function(user_id){
				return $http.get(BASE_URL+'/'+user_id)
			}

			this.createPost = function(newPost){
				return $http.post(BASE_URL, newPost); //on server req.body.post
			}
			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			}

			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			}
		}
		function UsersService($http){
		 	const BASE_URL = '/api/users'
		 	
			this.createUser = function(newPost){
				console.log('creatUser service run')
				return $http.post(BASE_URL, newPost); //on server req.body.post
			}

			this.getUser = function(id){
				return $http.get(BASE_URL + '/' + id)
			}

			this.deleteUser = function(id){
				return $http.delete(BASE_URL + '/' + id)
			}

			this.updateUser = function(data){
				return $http.put(BASE_URL + '/' + data.user.id, data) //on server req.body.post
			}
		}
		UsersService.$inject = ['$http']
		PostService.$inject = ['$http']
		MusicPostService.$inject = ['$http']
		MusicPostCommentsService.$inject = ['$http']
		FilmPostService.$inject = ['$http']
		FilmPostCommentsService.$inject = ['$http']
		CodingPostService.$inject = ['$http']
		CodingPostCommentsService.$inject = ['$http']
})()