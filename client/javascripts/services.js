//SERVICES MANAGE DATA BETWEEN ANGULAR AND BACK END
(function() {

	angular
		.module('collaboApp')
		.service('PostService', PostService)
		.service('MusicPostService', MusicPostService)
		.service('MusicPostCommentsService', MusicPostCommentsService)
		.service('MusicPostConversationsService', MusicPostConversationsService)
		.service('FilmPostService', FilmPostService)
		.service('FilmPostCommentsService', FilmPostCommentsService)
		.service('FilmPostConversationsService', FilmPostConversationsService)
		.service('CodingPostService', CodingPostService)
		.service('CodingPostCommentsService', CodingPostCommentsService)
		.service('CodingPostConversationsService', CodingPostConversationsService)
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
			this.getHistory = function(user_id){
				return $http.get(BASE_URL+'/history/'+user_id)
			};
			this.createPost = function(newPost){
				return $http.post(BASE_URL, newPost); //on server req.body.post
			}
			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			}

			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			}
		};
		function MusicPostConversationsService($http){
		 	const BASE_URL = '/api/musicPostConversations'
			this.getConvos = function(user_id){
				return $http.get(BASE_URL+'/'+user_id)
			};
			this.getConvoThread = function(user_id, data) {
				return $http.get(BASE_URL + '/thread/' + user_id, data)
			};
			this.createMessage = function(message){
				return $http.post(BASE_URL, message); //on server req.body.post
			};
			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			};
			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			};
		};
		function FilmPostService($http){
		 	const BASE_URL = '/api/film';

			this.getPosts = function(){
				return $http.get(BASE_URL)
			};
			this.createPost = function(newPost){
				return $http.post(BASE_URL, newPost); //on server req.body.post
			};
			this.getPost = function(id){
				return $http.get(BASE_URL + '/' + id)
			};
			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			};
			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			};
		};
		function FilmPostCommentsService($http){
		 	const BASE_URL = '/api/filmPostComments';

			this.getMail = function(user_id){
				return $http.get(BASE_URL+'/'+user_id)
			};
			this.getHistory = function(user_id){
				return $http.get(BASE_URL+'/history/'+user_id)
			};
			this.createPost = function(newPost){
				return $http.post(BASE_URL, newPost); //on server req.body.post
			};
			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			};
			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) 
			};
		};
		function FilmPostConversationsService($http){
		 	const BASE_URL = '/api/filmPostConversations'
			this.getConvos = function(user_id){
				return $http.get(BASE_URL+'/'+user_id)
			};
			this.getConvoThread = function (user_id, data) {
				return $http.get(BASE_URL + '/thread/' + user_id, data)
			};
			this.createMessage = function(message){
				return $http.post(BASE_URL, message); 
			};
			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			};
			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) 
			};
		};
		function CodingPostService($http){
		 	const BASE_URL = '/api/coding'

			this.getPosts = function(){
				console.log('in get coding posts');
				
				return $http.get(BASE_URL)
			};
			this.createPost = function(newPost){
				return $http.post(BASE_URL, newPost); 
			};
			this.getPost = function(id){
				return $http.get(BASE_URL + '/' + id)
			};
			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			};
			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			};
		};
		function CodingPostCommentsService($http){
		 	const BASE_URL = '/api/codingPostComments'
			this.getMail = function(user_id){
				return $http.get(BASE_URL+'/'+user_id)
			};
			this.getHistory = function(user_id){
				return $http.get(BASE_URL+'/history/'+user_id)
			};
			this.createPost = function(newPost){
				return $http.post(BASE_URL, newPost); //on server req.body.post
			};
			this.deletePost = function(id){
				console.log('DELETE ID IS ', id);
				
				return $http.delete(BASE_URL + '/' + id)
			};
			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			};
		};
		function CodingPostConversationsService($http){
		 	const BASE_URL = '/api/codingPostConversations'
			this.getConvos = function(user_id){
				return $http.get(BASE_URL+'/'+user_id)
			};
			this.getConvoThread = function (user_id, data) {
				let coding_post_id = data.post.coding_post_id,
				first_comment_id = data.post.first_comment_id;
				
				console.log('in service, codingId is ', coding_post_id, 'first_comment_id is ', first_comment_id);
				return $http.get(BASE_URL + '/thread/coding/' + coding_post_id + '/' + first_comment_id, data.post)
			};
			this.createMessage = function(message){
				return $http.post(BASE_URL, message); //on server req.body.post
			};
			this.deletePost = function(id){
				return $http.delete(BASE_URL + '/' + id)
			};
			this.updatePost = function(data){
				return $http.put(BASE_URL + '/' + data.post.id, data) //on server req.body.post
			};
		};
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
			this.updateUser = function (data) {
				if(!data.user.id && data.user.third_party_id){
					return $http.put(BASE_URL + '/third_party_id/' + data.user.third_party_id, data)
				} else {

					return $http.put(BASE_URL + '/' + data.user.id, data) //on server req.body.post
				}
				
			}
		};
		function ConvoRepoService($http){
		 	const BASE_URL = '/api/convoRepository';
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
		};
		UsersService.$inject = ['$http']
		PostService.$inject = ['$http']
		MusicPostService.$inject = ['$http']
		MusicPostCommentsService.$inject = ['$http']
		MusicPostConversationsService.$inject = ['$http']
		FilmPostService.$inject = ['$http']
		FilmPostCommentsService.$inject = ['$http']
		FilmPostConversationsService.$inject = ['$http']
		CodingPostService.$inject = ['$http']
		CodingPostCommentsService.$inject = ['$http']
		CodingPostConversationsService.$inject = ['$http']
		ConvoRepoService.$inject = ['$http']
})()