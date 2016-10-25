(function() {
	angular 
		.module('collaboApp')
		.controller('CodingPostsController', CodingPostsController) 
		.controller('NewCodingPostController', NewCodingPostController)
		.controller('EditCodingPostController', EditCodingPostController)

		.controller('FilmPostsController', FilmPostsController) 
		.controller('NewFilmPostController', NewFilmPostController)
		.controller('EditFilmPostController', EditFilmPostController)

		.controller('MusicPostsController', MusicPostsController) 
		.controller('NewMusicPostController', NewMusicPostController)
		.controller('EditMusicPostController', EditMusicPostController)
		
		.controller('UsersController', UsersController)
		.controller('EditUserController', EditUserController)

		.controller('MiscCtrl',MiscCtrl)
		.controller('UibCarouselController', UibCarouselController)
		.controller('HomeCtrl', HomeCtrl)
		.controller('LoginHomeCtrl', LoginHomeCtrl)
		.controller('LogoutCtrl', LogoutCtrl)
		.controller('MailCtrl', MailCtrl)
		.controller('LandingCtrl', LandingCtrl)
		function LandingCtrl($location,auth, store,$timeout,$rootScope, UsersService){

			var vm=this;
			vm.auth = auth
		  	var fadeOut = function(){
		  		
		  		location.href = '/home';
		  		
		  	};
			if(localStorage.profile){
		  		location.href = '/loggedinHome';
		  	}
	  		else {
	  			var fadeOut = $timeout(fadeOut,6900)
	  		}

		};
		function MailCtrl(filmMail,musicMail,codingMail,$location,auth, store,$timeout,$rootScope, UsersService,FilmPostCommentsService,FilmPostService,ConvoRepoService){
			var vm=this;
			vm.auth = auth;


			console.log('filmmail is: '+filmMail+'. musicMail is: '+musicMail+'. codingMail is: '+codingMail)

			vm.name = JSON.parse(localStorage.profile).given_name
			vm.navpicture = JSON.parse(localStorage.profile).picture
			vm.filmCommentPosts = []
			vm.musicPostComments = []
			vm.codingPostComments = []
			
			for(var i = 0; i<filmMail.data.length; i++){
					vm.filmCommentPosts.push(filmMail.data[i])
			}
			for(var i = 0; i<musicMail.data.length; i++){
					vm.musicPostComments.push(musicMail.data[i])
			}
			for(var i = 0; i<codingMail.data.length; i++){
					vm.codingPostComments.push(codingMail.data[i])
			}

			vm.hasNewFilmMail = false
			vm.hasNewMusicMail = false
			vm.hasNewCodingMail = false
			vm.showFilmMail = false
			vm.showMusicMail = false
			vm.showCodingMail = false
			vm.showResponseField = false
			var responseAutoFocus = false

			if(vm.filmCommentPosts.length>0){
				vm.showFilmMail = true	
			}
			if(vm.musicPostComments.length>0){
				vm.showMusicMail = true
			}
			if(vm.codingPostComments.length>0){
				vm.showCodingMail = true
			}

			vm.logout = function(){
				store.remove('profile')
				store.remove('token')
				location.href = '/home';c
			}


			vm.go = function ( path ) {
			    $location.path( path );
			  };


			if(localStorage.length>0){
				
				document.getElementById('newpic').style.display = 'inline';
				document.getElementById('newpic').style.height = "100px !important" 
				document.getElementById('newpic').style.width = '100px !important'
			}
			// vm.respondFilm = function(idx){
			// 	vm.showResponseField = !vm.showResponseField
			// 	responseAutoFocus = !responseAutoFocus
			// 	$('.responseField').autofocus = responseAutoFocus
			// 	console.log(responseAutoFocus)
			// }
			console.log('got here')

			vm.addFilmCommentResponse = function(postId,comment){
				null
			}


			var bool = true
			vm.respondFilm = function(idx){
				console.log($('.postTextField'))

				console.log('autofocus = '+ $('.postTextField')[0].form[0].autofocus)

				$('.postTextField')[0].form[0].autofocus = bool
				bool = !bool

				console.log('autofocus = '+ $('.postTextField')[0].form[0].autofocus)





				console.log('before: '+responseAutoFocus)
				vm.showResponseField = !vm.showResponseField
				vm.showText = !vm.showText

				// responseAutoFocus = !responseAutoFocus
				// $('.postTextField').autofocus = responseAutoFocus
				// console.log('xxx: '+$('.postTextField').autofocus)
				// console.log('after: '+responseAutoFocus)
				if(vm.showResponseField === true){
				var selected = Array.from(document.querySelectorAll('.postResponseArea')).filter((v,i) => i == idx)		  		
				var others = Array.from(document.querySelectorAll('.postResponseArea')).filter((v,i) => i !== idx)		  		
				others.forEach(function(i){i.style.display = 'none'})

				

				}
				if(vm.showResponseField === false){
					var selected = Array.from(document.querySelectorAll('.postResponseArea')).filter((v,i) => i == idx)		  			
					var others = Array.from(document.querySelectorAll('.postResponseArea')).filter((v,i) => i !== idx)

					others.forEach(function(i){i.style.display = 'block'})

				}
			}
		};
		//testing
		function HomeCtrl($location,auth, store,$timeout,$rootScope, UsersService){
			console.log('HomeCtrl')


			var vm=this;
			vm.auth = auth;
			

			if(localStorage.profile){
		  		$location.path('/loggedinHome');
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
				})
			}
			vm.logout = function(){
				store.remove('profile')
				store.remove('token')
				localStorage.clear()
			}
		};
		function MiscCtrl($location){
			var vm=this;
			vm.goBack = function(){
				if(localStorage.length === 0){
				$location.path('/home')
				}
				else if (localStorage.length>0){
				$location.path('/loggedinHome')	
				}
			}
		}
		function LoginHomeCtrl($location,auth,store,$timeout,$rootScope,UsersService){
			console.log('loginHomeCtr')

			var vm=this;
			vm.auth = auth;
			var userName;
			vm.welcome = 'Hey, beautiful'
			var getUser = function(id){
				UsersService.getUser(id).then(function(user){
					if(!user.data.display_name || user.data.display_name == undefined || user.data.display_name == null){
						vm.welcome = 'Hey, beautiful'
					}
					else {
						userName = user.data.display_name
						vm.welcome = ('Welcome '+user.data.display_name)
					}
				})
			}
			var id = JSON.parse(localStorage.profile).user_id
			
			getUser(id)
			

			vm.go = function ( path ) {
			    $location.path( path );
			  };
			vm.user_id = JSON.parse(localStorage.profile).user_id
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


			vm.logout = function(){
				localStorage.clear()
				document.getElementById('newloginButton').style.display = 'inline';
				document.getElementById('newlogoutButton').style.display = 'none';
				document.getElementById('newpic').style.display = 'none';
				document.getElementById('newname').style.display = 'none';
				location.href = '/home';
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
				store.remove('profile')
				store.remove('token')
				location.href = '/home';
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
			var vm = this;
			vm.user = user.data
			if(vm.user.display_name==null||vm.user.display_name==undefined){
				vm.user.display_name = ''
			}
			if(vm.user.zip_code==null){
				vm.user.zip_code = ' '
			}
			if(vm.user.bio===null){
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
				var req = {user: user}
				UsersService.updateUser(req).then(function(res){					
				$location.path('/loggedinHome');
				})
			}
		}



//~~~~~~CODING POSTS CONTROLLER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		function CodingPostsController(CodingPostService,CodingPostCommentsService,UsersService,posts,$location,$route, NgMap,store,$rootScope){
			var vm = this;
			vm.showMap = false
			vm.showVid = true
			vm.toggleView = false
		  	vm.showText = false
			vm.posts = posts.data;
			console.log(vm.posts)
			vm.backHome = '/home'
			if(localStorage.length>0){
				vm.backHome = '/loggedinHome'
			}
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
		  	vm.loggedIn = false
		  	if(localStorage.length > 0){
		  		vm.loggedIn = true
		  	}
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
		  		}
		  	}
		  	vm.removePost = function(id){
		  		CodingPostService.deletePost(id).then(function(){
		  			$route.reload();
		  		})
		  	}
		  	var map;
		  	vm.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtNoaazwyeqMuiXN9zNkWAW8y-WdCGp40&v=3&";	
		  	x = NgMap.getMap('map');
		  	
  		  	vm.checkId = function(post={'user_id':'dummyData'}){
  	  		  	if(localStorage.length > 0){
  				  if(post.third_party_user_id === JSON.parse(localStorage.profile).user_id){
  				  	'hello user!'
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


		  	vm.comment = {}
		  	vm.addCodingPostComment = function(id,newCodingPostComment){
		  		vm.comment.user_id = JSON.parse(localStorage.profile).user_id
		  		vm.comment.post_id = id
		  		var req = {post: newCodingPostComment};
		  		
		  		CodingPostCommentsService.createPost(req).then(function(res){
		  			// $location.path('/filmPosts');
		  		})
		  	}
		}
		function NewCodingPostController(CodingPostService,UsersService,$location,store){
			var vm = this;
			vm.post = {};
			vm.goBackToCodingIndex = function(){
				$location.path('/codingPosts')
			}
			vm.post.user_id = JSON.parse(localStorage.profile).user_id

			vm.addCodingPost = function(newCodingPost){
				var req = {post: newCodingPost};
				// var id = vm.post.user_id
				CodingPostService.createPost(req).then(function(res){
					$location.path('/codingPosts');
				})
			}
		}
		function EditCodingPostController(CodingPostService, post, $location){ //$routeParams is  Angular's version of req.params in express
			var vm = this;
				vm.post = post.data
				if(!vm.post) {$location.path('/codingPosts')}
			vm.updatePost = function(post){
				var req = {post: post}
				CodingPostService.updatePost(req).then(function(res){					
				$location.path('/codingPosts');
				})
			}
		}
//~~~~~~MUSICposts conroller~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~		
		function MusicPostsController(MusicPostService, MusicPostCommentsService,UsersService,posts,$location,$route, NgMap){
			var vm = this;
			vm.showMap = true
			vm.showVid = true
			vm.posts = posts.data;
			for(var i = 0; i < vm.posts.length; i++){
				if(!vm.posts[i].display_name){
					vm.posts[i].display_name = JSON.parse(localStorage.profile).given_name
				}
			}
			// console.log(posts.data)
			vm.backHome = '/home'
			if(localStorage.length>0){
				vm.backHome = '/loggedinHome'
			}
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
		  	vm.checkId = function(post){
	  		  	if(localStorage.length > 0){
				  if(post.third_party_user_id === JSON.parse(localStorage.profile).user_id){
				  	console.log('why is this repeating 12 times??')
				  	return true		  			
				  }
	  		  	}
	  		  	else{
	  		  		return false
	  		  	}
		  	}

		  	vm.editPost = null
		  	href="/filmPosts/{{post.id}}/edit"

		  	vm.addMusicPostComment = function(id,newMusicPostComment){
		  		vm.comment.user_id = JSON.parse(localStorage.profile).user_id
		  		vm.comment.post_id = id
		  		var req = {post: newMusicPostComment};
		  		MusicPostCommentsService.createPost(req).then(function(res){
		  			// $location.path('/filmPosts');
		  		})
		  	}	
		}

		function NewMusicPostController(MusicPostService,UsersService,$location,store){
			var vm = this;
			vm.post = {};
			vm.post.user_id = JSON.parse(localStorage.profile).user_id

			vm.goBackToMusicIndex = function(){
				$location.path('/musicPosts')
			}

			vm.addMusicPost = function(newMusicPost){
				var req = {post: newMusicPost};
				// var id = vm.post.user_id
					
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
		function FilmPostsController(FilmPostService,FilmPostCommentsService,UsersService,posts,$location,$route, NgMap,store,$rootScope){
			var vm = this;
			vm.showMap = false
			vm.showVid = true
			vm.backHome = '/home'
			if(localStorage.length>0){
				vm.backHome = '/loggedinHome'
			}
			vm.posts = posts.data;
			console.log(vm.posts.length)
			for(var i = 0; i < vm.posts.length; i++){
							console.log(1)
				if(!vm.posts[i].display_name){
					var userId = vm.posts[i].user_id
					console.log(vm.posts[i])
					UsersService.getUser(userId).then(function(user){
						if(!user.data.display_name || user.data.display_name == undefined || user.data.display_name == null){
							// vm.posts[i].display_name = user.data.name
							console.log('vm.posts[i]')
						}
						else {
							vm.posts[i].display_name = user.data.display_name
						}
					})
				}
			}



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
		  	vm.checkId = function(post){
	  		  	if(localStorage.length > 0){
				  if(post.third_party_user_id === JSON.parse(localStorage.profile).user_id){
				  	return true		  			
				  }
				  else{
				  	return false
				  }	
	  		  	}
	  		  	return false
		  	}
		  	vm.toggleView = false
		  	vm.showText = false
		  	vm.show = function(idx){
		  		vm.toggleView = !vm.toggleView
		  		vm.showText = !vm.showText
		  		vm.showMap = !vm.showMap
		  		vm.showVid = !vm.showVid

		  		// if()

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
				vm.comment.user_id = JSON.parse(localStorage.profile).user_id
				vm.comment.post_id = id
				var userID = vm.comment.user_id

				var req = {post: newFilmPostComment};
				UsersService.getUser(userID).then(function(user){
					if(!user.data.display_name || user.data.display_name == undefined || user.data.display_name == null){
						req.post.display_name = user.data.name
					}
					else {
						req.post.display_name = user.data.display_name
					}
				})
				FilmPostCommentsService.createPost(req).then(function(res){
					// $location.path('/filmPosts');
				})
			}
		}

		function NewFilmPostController(FilmPostService,UsersService,$location, store){
			var vm = this;
			vm.post = {};
			vm.post.user_id = JSON.parse(localStorage.profile).user_id
			
			vm.goBackToFilmIndex = function(){
				$location.path('/filmPosts')
			}
			vm.addFilmPost = function(newFilmPost){
				console.log(newFilmPost)

				var req = {post: newFilmPost};
				// var id = vm.post.user_id
				FilmPostService.createPost(req).then(function(res){
						location.href ='/filmPosts';
				})
			}
		}
		function EditFilmPostController(FilmPostService, post, $location){ 
			var vm = this;
			alert('got to edit contrler')
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
		CodingPostsController.$inject = ['CodingPostService','CodingPostCommentsService','UsersService','posts','$location','$route', 'NgMap','store'];
		NewCodingPostController.$inject = ['CodingPostService','UsersService','$location','store'] 
		EditCodingPostController.$inject = ['CodingPostService', 'post', '$location']

		FilmPostsController.$inject = ['FilmPostService','FilmPostCommentsService','UsersService','posts','$location','$route', 'NgMap','store'];
		//  ^removed $rootScopt, cause I don't think it's needed
		NewFilmPostController.$inject = ['FilmPostService','UsersService','$location','store'] 
		EditFilmPostController.$inject = ['FilmPostService', 'post', '$location']

		MusicPostsController.$inject = ['MusicPostService','MusicPostCommentsService','UsersService','posts','$location','$route', 'NgMap'];
		NewMusicPostController.$inject = ['MusicPostService','UsersService','$location','store'] 
		EditMusicPostController.$inject = ['MusicPostService', 'post', '$location']

		LandingCtrl.$inject = ['$location', 'auth', 'store','$timeout','$rootScope','UsersService']

		LogoutCtrl.$inject = ['$location','auth','store']

		MiscCtrl.$inject = ['$location']

		HomeCtrl.$inject = ['$location', 'auth', 'store','$timeout','$rootScope','UsersService']
		LoginHomeCtrl.$inject = ['$location','auth','store','$timeout','$rootScope','UsersService']
		MailCtrl.$inject = ['filmMail','musicMail','codingMail','$location','auth', 'store','$timeout','$rootScope', 'UsersService','FilmPostCommentsService','FilmPostService','ConvoRepoService']
		// SettingsCtrl.$inject = ['$location','auth', 'store']
		EditUserController.$inject = ['UsersService', '$location','auth','store','user']

})()

