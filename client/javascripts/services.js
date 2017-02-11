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
		.service('ConvoRepoService', ConvoRepoService)

		function PostService($http){
		 	const BASE_URL = '/api/posts'

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
		function FilmPostService($http){
		 	const BASE_URL = '/api/film'

			this.getPosts = function(){
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
		function ConvoRepoService($http){
		 	const BASE_URL = '/api/convoRepository'

			this.getMessages = function(category,post_id){
				console.log('got to the convoRepo service'+post_id)
				return $http.get(BASE_URL+'/'+category+'/'+post_id)
			}

			this.createMessage = function(newCommentObj){
				// $scope.$apply();
				return $http.post(BASE_URL+ '/', newCommentObj); //on server req.body.post
			}
			this.createPost = function(newPost){
				return $http.post(BASE_URL, newPost); //on server req.body.post
			}
			this.deleteMessage = function(id){
				return $http.delete(BASE_URL + '/' + id)
			}

			// this.updatePost = function(data){
			// 	return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			// }
		}
		UsersService.$inject = ['$http']
		PostService.$inject = ['$http']
		MusicPostService.$inject = ['$http']
		MusicPostCommentsService.$inject = ['$http']
		FilmPostService.$inject = ['$http']
		FilmPostCommentsService.$inject = ['$http']
		CodingPostService.$inject = ['$http']
		CodingPostCommentsService.$inject = ['$http']
		ConvoRepoService.$inject = ['$http']
})()