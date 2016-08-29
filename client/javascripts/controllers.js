(function() {
	angular 
		.module('collaboApp')
		.controller('CodePostsController', CodePostsController) 
		.controller('NewCodePostController', NewCodePostController)
		.controller('EditCodePostController', EditCodePostController)

		.controller('FilmPostsController', FilmPostsController) 
		.controller('NewFilmPostController', NewFilmPostController)
		.controller('EditFilmPostController', EditFilmPostController)

		.controller('MusicPostsController', MusicPostsController) 
		.controller('NewMusicPostController', NewMusicPostController)
		.controller('EditMusicPostController', EditMusicPostController)
		
		.controller('UsersController', UsersController)
		// .controller('NewUserController', NewUserController)
		.controller('EditUserController', EditUserController)

		.controller('UibCarouselController', UibCarouselController)
		.controller('HomeCtrl', HomeCtrl)
		.controller('LoginHomeCtrl', LoginHomeCtrl)
		.controller('LogoutCtrl', LogoutCtrl)
		.controller('MailCtrl', MailCtrl)
		.controller('SettingsCtrl', SettingsCtrl)
		.controller('LandingCtrl', LandingCtrl)
		function LandingCtrl($location,auth, store,$timeout,$rootScope, UsersService){
					  	// alert('youv reached landing control')

			var vm=this;
			vm.auth = auth
		  	var fadeOut = function(){
		  		
		  		$location.path('/home');
		  		
		  	};
			if(localStorage.length>0){
		  		$location.path('/loggedinHome');
		  	}
	  		else {
	  		var windowFade = $timeout(fadeOut,6900)
	  		// fadeOut()
	  		}
		  	alert('you have reached landing control')
		};
		function MailCtrl(filmMail,musicMail,$location,auth, store,$timeout,$rootScope, UsersService,FilmPostCommentsService,FilmPostService){
			var vm=this;
			vm.auth = auth;
			// for(var property in mail.data) {
			//     console.log(property + "=" + mail[property]);
			// }
			console.log('musicMail is: '+musicMail)

			vm.name = JSON.parse(localStorage.profile).given_name
			vm.navpicture = JSON.parse(localStorage.profile).picture
			vm.filmCommentPosts = []
			vm.musicPostComments = []
			
			for(var i = 0; i<filmMail.data.length; i++){
				// if (JSON.parse(localStorage.profile).user_id === mail.data[i].user_id){
					console.log(filmMail.data[i])
					vm.filmCommentPosts.push(filmMail.data[i])
				// }
				// vm.picture = FilmPostService.getPosts
			}
			// for(var i = 0; i<musicMail.data.length; i++){
			// 	// if (JSON.parse(localStorage.profile).user_id === mail.data[i].user_id){
			// 		// console.log(musicMail.data[i])
			// 		vm.musicPostComments.push(musicMail.data[i])
			// 	// }
			// 	// vm.picture = FilmPostService.getPosts
			// }
			console.log('array after compiling: '+vm.filmCommentPosts)
			console.log(vm.userMail)

			vm.hasFilmMail = false

			vm.showFilm = false
			if(vm.filmCommentPosts.length>0){
				vm.showFilm = true	
			}
			vm.showMusic = false
			if(vm.musicPostComments.length>0){
				vm.showMusic=true
			}
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
			// alert('homeCtrl loaded')
			console.log('youve reached the home controller!')
			// location.reload()
			var vm=this;
			vm.auth = auth;
			

			if(localStorage.length>0){
		  		$location.path('/loggedinHome');
		  	}

			// if(localStorage.length === 0){
		  		
		 //  	}



		  	// $rootScope.$watch('watch',function(newValue,oldValue){
	    //         if($rootScope.watch){
	    //         }
	    //     })
		  	
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
				// debugger

				auth.signin({popup: true}, function(profile,token){
					alert('login function run')

					store.set('profile',profile);
					store.set('token',token);
					vm.username = profile['name']
					vm.picture = profile['picture'];
				})
			}
			vm.logout = function(){
				store.remove('profile')
				store.remove('token')
				localStorage.clear()
			}
		};
		function LoginHomeCtrl($location,auth,store,$timeout,$rootScope,mail){
						console.log('youve reached the logged in home controller!')

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
				localStorage.clear()
				// alert('local storage is: '+localStorage)
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



//~~~~~~CODE POSTS CONTROLLER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		function CodePostsController(CodePostService,CodePostCommentsService,posts,$location,$route, NgMap,store,$rootScope){
			var vm = this;
			vm.posts = posts.data;
		}
		function NewCodePostController(PostService,$location){
			var vm = this;
			vm.post = {};

			vm.addPost = function(newPost){
				var req = {post: newPost};
				PostService.createPost(req).then(function(res){
					$location.path('/posts');
				})
			}
		}
		function EditCodePostController(PostService, post, $location){ //$routeParams is  Angular's version of req.params in express
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
		function MusicPostsController(MusicPostService, MusicPostCommentsService,posts,$location,$route, NgMap){
			var vm = this;
			vm.posts = posts.data;
			vm.go = function ( path ) {
		    	$location.path( path );
		  	};

		  	vm.goBack =function(){
		  		if(localStorage.length === 0){
		  			console.log('length is zero')
		  		$location.path('/home')
		  		}

		  		else if (localStorage.length>0){
		  			console.log('length is greater than zero')
		  		$location.path('/loggedinHome')	
		  		}
		  	}
		  	vm.showMap = false
		  	vm.showVid = true
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
		  			// VERIFY THAT YOU DON'T NEED THIS! (I THINK THIS WAS REPLACED BY AN NG-SHOW FOR THE TEXTBOX) var el = document.querySelector(".textBox")
		  			// var parent = document.getElementById('musicContent')
		  			// parent.removeChild(el)
		  		}
		  	}

		  	vm.removePost = function(id){
		  		MusicPostService.deletePost(id).then(function(){
		  			$route.reload();
		  		})
		  	}
		  	vm.loggedIn = false
		  	if(localStorage.length > 0){
		  		vm.loggedIn = true
		  	}
		  	vm.checkId = function(post={'user_id':'dummyData'}){
	  		  	if(localStorage.length > 0){
				  if(post.user_id === JSON.parse(localStorage.profile).user_id){
				  	return true		  			
				  }
				  else{
				  	return false
				  }	
	  		  	}
	  		  	else {
	  		  		return false
	  		  	}
		  	}
		  	vm.addMusicPostComment = function(id,newMusicPostComment){
		  		// alert('reached comment control')
		  		console.log('comment control')
		  		console.log(id+'_'+newMusicPostComment.comment)
		  		
		  		vm.comment.user_pic = JSON.parse(localStorage.profile).picture
		  		vm.comment.user_id = JSON.parse(localStorage.profile).user_id
		  		vm.comment.post_id = id
		  		var req = {post: newMusicPostComment};
		  		console.log(req.post.comment)
		  		MusicPostCommentsService.createPost(req).then(function(res){
		  			// $location.path('/filmPosts');
		  		})
		  	}	
		}

		function NewMusicPostController(MusicPostService,$location,store){
			var vm = this;
			vm.post = {};

			vm.post.user_pic = JSON.parse(localStorage.profile).picture
			vm.post.user_id = JSON.parse(localStorage.profile).user_id

			vm.addMusicPost = function(newMusicPost){
				var req = {post: newMusicPost};
				
				MusicPostService.createPost(req).then(function(res){
					$location.path('/musicPosts');
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
		  	vm.goBack = function(){
		  		if(localStorage.length === 0){
		  		$location.path('/home')
		  		}
		  		else if (localStorage.length>0){
		  		$location.path('/loggedinHome')	
		  		}
		  	}
		  	vm.profile = store.get('profile')


		  	vm.loggedIn = false
		  	if(localStorage.length > 0){
		  		vm.loggedIn = true
		  	}
		  	vm.checkId = function(post={'user_id':'dummyData'}){
	  		  	if(localStorage.length > 0){
				  if(post.user_id === JSON.parse(localStorage.profile).user_id){
				  	return true		  			
				  }
				  else{
				  	return false
				  }	
	  		  	}
	  		  	else {
	  		  		return false
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

		  			// selected[0].classList.remove('focus')
		  			// VERIFY THAT YOU DON'T NEED THIS! (I THINK THIS WAS REPLACED BY AN NG-SHOW FOR THE TEXTBOX)
		  			// var el = document.querySelector(".textBox")
		  			// var parent = document.getElementById('filmContent')
		  			// parent.removeChild(el)
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
			// var currentUserId = store.get('profile')
			vm.addFilmPost = function(newFilmPost){
				var req = {post: newFilmPost};
				// , user: currentUserId
				FilmPostService.createPost(req).then(function(res){
					$location.path('/filmPosts');
				})
			}
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
		CodePostsController.$inject = ['CodePostService','CodePostCommentsService','posts','$location','$route', 'NgMap','store'];
		NewCodePostController.$inject = ['CodePostService','$location','store'] 
		EditCodePostController.$inject = ['PostService', 'post', '$location']

		FilmPostsController.$inject = ['FilmPostService','FilmPostCommentsService','posts','$location','$route', 'NgMap','store'];
		//  ^removed $rootScopt, cause I don't think it's needed
		NewFilmPostController.$inject = ['FilmPostService','$location','store'] 
		EditFilmPostController.$inject = ['FilmPostService', 'post', '$location']

		MusicPostsController.$inject = ['MusicPostService','MusicPostCommentsService','posts','$location','$route', 'NgMap'];
		NewMusicPostController.$inject = ['MusicPostService','$location','store'] 
		EditMusicPostController.$inject = ['MusicPostService', 'post', '$location']

		LandingCtrl.$inject = ['$location', 'auth', 'store','$timeout','$rootScope','UsersService']

		LogoutCtrl.$inject = ['$location','auth','store']

		HomeCtrl.$inject = ['$location', 'auth', 'store','$timeout','$rootScope','UsersService']
		LoginHomeCtrl.$inject = ['$location','auth','store','$timeout','$rootScope','mail']
		MailCtrl.$inject = ['filmMail','musicMail','$location','auth', 'store','$timeout','$rootScope', 'UsersService','FilmPostCommentsService','FilmPostService']
		SettingsCtrl.$inject = ['$location','auth', 'store']
		EditUserController.$inject = ['UsersService', '$location','auth','store','user']

})()

