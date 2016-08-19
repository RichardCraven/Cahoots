(function() {
	angular 
		.module('collaboApp')
		.controller('PostsController', PostsController) 
		.controller('NewPostController', NewPostController)
		.controller('ShowPostController', ShowPostController)
		.controller('EditPostController', EditPostController)

		.controller('FilmPostsController', FilmPostsController) 
		.controller('NewFilmPostController', NewFilmPostController)
		.controller('ShowFilmPostController', ShowFilmPostController)
		.controller('EditFilmPostController', EditFilmPostController)

		.controller('MusicPostsController', MusicPostsController) 
		.controller('NewMusicPostController', NewMusicPostController)
		.controller('ShowMusicPostController', ShowMusicPostController)
		.controller('EditMusicPostController', EditMusicPostController)
		
		.controller('UsersController', UsersController)
		// .controller('NewUserController', NewUserController)
		.controller('ShowUserController', ShowUserController)
		.controller('EditUserController', EditUserController)

		.controller('UibCarouselController', UibCarouselController)
		.controller('HomeCtrl', HomeCtrl)
		.controller('LoginHomeCtrl', LoginHomeCtrl)
		.controller('LogoutCtrl', LogoutCtrl)
		.controller('MailCtrl', MailCtrl)
		.controller('SettingsCtrl', SettingsCtrl)
		.controller('LandingCtrl', LandingCtrl)
		function LandingCtrl($timeout,$location){
		  	function fadeOut(){
		  		if(localStorage.length>0){
		  		$location.path('/loggedinHome');
		  		}
		  		else {
		  		$location.path('/home');
		  		}
		  	};
			var windowFade = $timeout(fadeOut,6900)
		};
		function MailCtrl(mail,$location,auth, store,$timeout,$rootScope, UsersService,FilmPostCommentsService,FilmPostService){
			var vm=this;
			vm.auth = auth;

			vm.name = JSON.parse(localStorage.profile).given_name
			vm.navpicture = JSON.parse(localStorage.profile).picture
			console.log(mail)
			vm.filmCommentPosts = []
			
			for(var i = 0; i<mail.data.length; i++){
				// if (JSON.parse(localStorage.profile).user_id === mail.data[i].user_id){
					console.log(mail.data[i])
					vm.filmCommentPosts.push(mail.data[i])
				// }
				// vm.picture = FilmPostService.getPosts
			}
			console.log('array after compiling: '+vm.filmCommentPosts)
			console.log(vm.userMail)
			vm.hasFilmMail = false


			vm.showFilm = true
			vm.showMusic = false
			vm.showCoding = false

			vm.logout = function(){
				store.remove('profile')
				store.remove('token')
				$location.path('/home')
			}


			vm.go = function ( path ) {
			    $location.path( path );
			  };


			if(localStorage.length>0){
				
				document.getElementById('newpic').style.display = 'inline';
				document.getElementById('newpic').style.height = "100px !important" 
				document.getElementById('newpic').style.width = '100px !important'
			}
		};
		function SettingsCtrl($location,auth,store){
			var vm=this;
			vm.auth = auth;

			vm.navpicture = JSON.parse(localStorage.profile).picture

			vm.name = JSON.parse(localStorage.profile).given_name

			vm.logout = function(){
				store.remove('profile')
				store.remove('token')
				$location.path('/home')
			}
		};

		function HomeCtrl($location,auth, store,$timeout,$rootScope, UsersService){
			var vm=this;
			vm.auth = auth;

		  	$rootScope.$watch('watch',function(newValue,oldValue){
	            if($rootScope.watch){
	            }
	        })
		  	if(localStorage.length === 0){
		  		document.getElementById('pic').style.display = 'none';
		  		document.getElementById('name').style.display = 'none';
		  		document.getElementById('loginButton').style.display = 'inline';
				document.getElementById('logoutButton').style.display = 'none';
		  	}
		  	if(localStorage.length>0){
		  		vm.name = JSON.parse(localStorage.profile).given_name
		  		vm.picture = JSON.parse(localStorage.profile).picture
		  		vm.picStyle = "height:100px;width:100px; display: inline"
		  		// document.getElementById('loginButton').style.display = 'none';
		  		document.getElementById('logoutButton').style.display = 'inline';
		  	}
		  	vm.go = function ( path ) {
			    $location.path( path );
			  };
			var doThisOnce = true
			if(document.getElementById('video-background')&&doThisOnce){  
			  	document.getElementById('video-background').addEventListener('loadedmetadata', function() {
			  		
			 	 this.currentTime = 2;
			 	 doThisOnce = false
				}, false);
			}
			vm.login = function (){
				
				auth.signin({popup: true}, function(profile,token){
					store.set('profile',profile);
					store.set('token',token);
					vm.username = profile['name']
					vm.picture = profile['picture'];
				})
			}
			vm.logout = function(){
				store.remove('profile')
				store.remove('token')
			}
		};
		function LoginHomeCtrl($location,auth,store,$timeout,$rootScope, UsersService,mail,FilmPostCommentsService){
			var vm=this;
			vm.auth = auth;
			console.log('@ loginHomeCtrl')
			vm.go = function ( path ) {
			    $location.path( path );
			  };
			console.log(JSON.parse(localStorage.profile).user_id)  
			vm.user_id = JSON.parse(localStorage.profile).user_id
			console.log(vm.user_id)
			vm.hasMail = false
			if(localStorage.length>0){
				vm.hasMail = true
			}


			if(localStorage.length>0){
				vm.name = JSON.parse(localStorage.profile).given_name
				vm.picture = JSON.parse(localStorage.profile).picture
				document.getElementById('newpic').style.display = 'inline';
				document.getElementById('newpic').style.height = "100px !important" 
				document.getElementById('newpic').style.width = '100px !important'
				document.getElementById('newloginButton').style.display = 'none';
				document.getElementById('newlogoutButton').style.display = 'inline';
			}
			console.log(vm.name)


			vm.logout = function(){
				store.remove('profile')
				store.remove('token')
				document.getElementById('newloginButton').style.display = 'inline';
				document.getElementById('newlogoutButton').style.display = 'none';
				document.getElementById('newpic').style.display = 'none';
				document.getElementById('newname').style.display = 'none';
				$location.path('/home')
			}
		}
		function LogoutCtrl($location,auth,store){
			var vm = this;
			console.log('logout ctrl active')
			vm.auth = auth;
			vm.go = function ( path ) {
			    $location.path( path );
			  };

			vm.logout = function(){
				console.log('logoutbuttonClicked')
				store.remove('profile')
				store.remove('token')
				$location.path('/home')
			}
		}


		function UibCarouselController(){
		  var vm=this;
		  vm.myInterval = 3000;
		  vm.noWrapSlides = false;
		  vm.active=0;
		  vm.slides=[
		    {id:0, image: 'assets/images/lasers.jpg', text: 'TableFul'},
		    {id:1, image: 'assets/images/club1.JPG', text: 'for a great night out'},
		    {id:2, image: 'assets/images/club2.jpg', text: 'friends new and old'},
		    {id:3, image: 'assets/images/bottles1.jpg', text: 'sign in with Facebook' }
		  ]
		  var slides = vm.slides
		  var currIndex = 0;
		
		}
//~~~~~~USERS CONTROLLER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		function UsersController(UsersService,posts,$location,$route, NgMap){
			var vm = this;
			vm.posts = posts.data;
			vm.go = function ( path ) {
		    	$location.path( path );
		  	};
		  	vm.removePost = function(id){
		  		
		  		UsersService.deleteUser(id).then(function(){
		  			$route.reload();
		  		})
		  	}	
		}

		function ShowUserController(UsersService, $route){
			var vm = this;

			vm.removePost = function(id){
				UsersService.deleteUser(id).then(function(){
					$route.reload();
				})
			}

		}
		function EditUserController(UsersService, $location,auth,store,user){ 
			console.log('reached edit user controller')
			// console.log('user is: '+user.data)
			var vm = this;
			vm.user = user.data
			console.log(vm.user.zip_code+' pumpkin...'+vm.user.bio)
			if(vm.user.display_name===null){
				console.log('display_name is null')
				vm.user.display_name = ' '
			}
			if(vm.user.zip_code===null){
				console.log('zip_code is null')
				vm.user.zip_code = ' '
			}
			if(vm.user.bio===null){
				console.log('bio is not null')
				vm.user.bio = ' '
			}
			vm.auth = auth;

				vm.navpicture = JSON.parse(localStorage.profile).picture

				vm.name = JSON.parse(localStorage.profile).given_name

				vm.logout = function(){
					store.remove('profile')
					store.remove('token')
					$location.path('/home')
				}

			vm.updateUser = function(user){
				console.log('begin updateUser function')
				var req = {user: user}
				console.log('if this req works, req.user.id is: '+req.user.id)
				UsersService.updateUser(req).then(function(res){					
				$location.path('/loggedinHome');
				})
			}
		}



//~~~~~~POSTS CONTROLLER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		function PostsController(posts){
			var vm = this;
			vm.posts = posts.data;
		}
		function NewPostController(PostService,$location){
			var vm = this;
			vm.post = {};

			vm.addPost = function(newPost){
				var req = {post: newPost};
				
				PostService.createPost(req).then(function(res){
					$location.path('/posts');
				})
			}
		}
		function ShowPostController(PostService, $route){
			var vm = this;

			vm.removePost = function(id){
				PostService.deletePost(id).then(function(){
					$route.reload();
				})
			}

		}
		function EditPostController(PostService, post, $location){ //$routeParams is  Angular's version of req.params in express
			var vm = this;
				vm.post = post.data
				if(!vm.post) {$location.path('/posts')}

			vm.updatePost = function(post){
				var req = {post: post}
				PostService.updatePost(req).then(function(res){					
				$location.path('/posts');
				})
			}
		}
//~~~~~~MUSICposts conroller~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~		
		function MusicPostsController(MusicPostService,posts,$location,$route, NgMap){
			var vm = this;
			vm.posts = posts.data;
			vm.go = function ( path ) {
		    	$location.path( path );
		  	};
		  	vm.removePost = function(id){
		  		MusicPostService.deletePost(id).then(function(){
		  			$route.reload();
		  		})
		  	}	
		}

		function NewMusicPostController(MusicPostService,$location){
			var vm = this;
			vm.post = {};

			vm.addMusicPost = function(newMusicPost){
				var req = {post: newMusicPost};
				
				MusicPostService.createPost(req).then(function(res){
					$location.path('/musicPosts');
				})
			}
		}

		function ShowMusicPostController(MusicPostService, $route){
			var vm = this;

			vm.removePost = function(id){
				MusicPostService.deletePost(id).then(function(){
					$route.reload();
				})
			}

		}
		function EditMusicPostController(MusicPostService, post, $location){ 
			var vm = this;
				vm.post = post.data
				if(!vm.post) {$location.path('/musicPosts')}

			vm.updatePost = function(post){
				var req = {post: post}
				MusicPostService.updatePost(req).then(function(res){					
				$location.path('/musicPosts');
				})
			}
		}
//~~~~~~FILMposts conroller~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~			
		function FilmPostsController(FilmPostService,FilmPostCommentsService,posts,$location,$route, NgMap,store,$rootScope){

			var vm = this;
			vm.showMap = false
			vm.showVid = true
			vm.posts = posts.data;
			vm.go = function ( path ) {
		    	$location.path( path );
		  	};
		  	vm.goBack =function(){
		  		if(localStorage.length === 0){
		  		$location.path('/home')
		  		}
		  		else if (localStorage.length>0){
		  		$location.path('/loggedinHome')	
		  		}
		  	}
		  	vm.profile = store.get('profile')

		  	vm.checkId = function(post){
	  		  	if(localStorage.length > 0){
				  if(post.user_id !== JSON.parse(localStorage.profile).user_id){
				  			return false		  			
				  }
				  else{
				  	return true
				  }	
	  		  	}
		  	}
		  	vm.toggleView = false
		  	vm.showText = false
		  	vm.show = function(idx){
		  		vm.toggleView = !vm.toggleView
		  		vm.showText = !vm.showText
		  		vm.showMap = !vm.showMap
		  		vm.showVid = !vm.showVid
		  		if(vm.toggleView === true){
		  		var selected = Array.from(document.querySelectorAll('md-list-item')).filter((v,i) => i == idx)		  		
		  		var others = Array.from(document.querySelectorAll('md-list-item')).filter((v,i) => i !== idx)		  		
		  		others.forEach(function(i){i.style.display = 'none'})

		  		selected[0].classList.add('focus')
		  		}
		  		if(vm.toggleView === false){
		  			var selected = Array.from(document.querySelectorAll('md-list-item')).filter((v,i) => i == idx)		  			
		  			var others = Array.from(document.querySelectorAll('md-list-item')).filter((v,i) => i !== idx)

		  			others.forEach(function(i){i.style.display = 'block'})

		  			selected[0].classList.remove('focus')
		  			var el = document.querySelector(".textBox")
		  			var parent = document.getElementById('filmContent')
		  			parent.removeChild(el)
		  		}
		  	}
			vm.removePost = function(id){
				FilmPostService.deletePost(id).then(function(){
					$route.reload();
				})
			}
			var map;
			vm.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtNoaazwyeqMuiXN9zNkWAW8y-WdCGp40&v=3&";	
			x = NgMap.getMap('map');
			
			vm.comment = {}
			vm.addFilmPostComment = function(id,newFilmPostComment){
				vm.comment.user_pic = JSON.parse(localStorage.profile).picture
				vm.comment.user_id = JSON.parse(localStorage.profile).user_id
				vm.comment.post_id = id
				var req = {post: newFilmPostComment};
				
				FilmPostCommentsService.createPost(req).then(function(res){
					// $location.path('/filmPosts');
				})
			}
		}

		function NewFilmPostController(FilmPostService,$location, store){
			var vm = this;
			vm.post = {};
			vm.post.user_pic = JSON.parse(localStorage.profile).picture
			vm.post.user_id = JSON.parse(localStorage.profile).user_id
			var currentUserId = store.get('profile')
			vm.addFilmPost = function(newFilmPost){
				var req = {post: newFilmPost};
				// , user: currentUserId
				FilmPostService.createPost(req).then(function(res){
					$location.path('/filmPosts');
				})
			}
		}
		function ShowFilmPostController(FilmPostService, $route, store,$rootScope){
			var vm = this;
		}
		function EditFilmPostController(FilmPostService, post, $location){ 
			var vm = this;
				vm.post = post.data
				if(!vm.post) {
					$location.path('/filmPosts')
				}

			vm.updatePost = function(post){
				var req = {post: post}
				FilmPostService.updatePost(req).then(function(res){					
				$location.path('/filmPosts');
				})
			}
		}
		PostsController.$inject = ['posts'];
		NewPostController.$inject = ['PostService','$location'] 
		ShowPostController.$inject = ['PostService', '$route']
		EditPostController.$inject = ['PostService', 'post', '$location']

		FilmPostsController.$inject = ['FilmPostService','FilmPostCommentsService','posts','$location','$route', 'NgMap','store','$rootScope'];
		NewFilmPostController.$inject = ['FilmPostService','$location','store'] 
		ShowFilmPostController.$inject = ['FilmPostService', '$route','store','$rootScope']
		EditFilmPostController.$inject = ['FilmPostService', 'post', '$location']

		MusicPostsController.$inject = ['MusicPostService','posts','$location','$route', 'NgMap'];
		NewMusicPostController.$inject = ['MusicPostService','$location'] 
		ShowMusicPostController.$inject = ['MusicPostService', '$route']
		EditMusicPostController.$inject = ['MusicPostService', 'post', '$location']

		LandingCtrl.$inject = ['$timeout','$location']

		LogoutCtrl.$inject = ['$location','auth','store']

		HomeCtrl.$inject = ['$location', 'auth', 'store','$timeout','$rootScope','UsersService']
		LoginHomeCtrl.$inject = ['$location','auth','store','$timeout','$rootScope', 'UsersService','mail']
		MailCtrl.$inject = ['mail','$location','auth', 'store','$timeout','$rootScope', 'UsersService','FilmPostCommentsService','FilmPostService']
		SettingsCtrl.$inject = ['$location','auth', 'store']
		EditUserController.$inject = ['UsersService', '$location','auth','store','user']

})()

