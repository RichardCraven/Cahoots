//non-Jon Papa style
// var app = angular.module('collaboApp',['ngRoute']);

//Jon Papa style
(function(){
	console.log("creating angular app")
	angular
		.module('collaboApp',['ngRoute','ui.bootstrap','ngMaterial','ngMap','auth0', 'angular-storage', 'angular-jwt','mrResponsiveParallax'])
		// ,'ngMap'
		.config(config)
		.config(auth0)
		.run(runFunction)
			
	function config($routeProvider, $locationProvider,authProvider){
			$routeProvider
				.when('/', {
				  templateUrl: '../views/landing.html',
				  controller: 'LandingCtrl',
				  controllerAs: 'vm'
				})
				.when('/home', {
				  templateUrl: '../views/home.html',
				  controller: 'HomeCtrl',
				  controllerAs: 'vm'
				})
				.when('/loggedinHome', {
					templateUrl: '../views/loggedinHome.html',
					controller: 'LoginHomeCtrl',
					controllerAs: 'vm',
					resolve: {
						mail: getAllMail
					}	
				})
				.when('/mailbox', {
				  templateUrl: '../views/users/mailbox.html',
				  controller: 'MailCtrl',
				  controllerAs: 'vm',
				  resolve: {
				  	mail: getAllMail
				  }
				})
				.when('/:id/userSettings',{
				  templateUrl: '../views/users/userSettings.html',
				  controller: 'EditUserController',
				  controllerAs: 'vm',
				  resolve: {
					 user: getUserById
				  }
				})
				.when( '/logout', {
				  controller: 'LogoutCtrl',
				  controllerAs: 'vm',
				  templateUrl: '../views/logout/logout.html'
				})
				.when('/posts', {
					templateUrl: '../views/posts/index.html',
					controller: 'PostsController',
					controllerAs: 'vm',
					resolve: {
						posts: getAllPosts
					//^resolve waits for the promise to get resolved and stores it as posts, then injects it into the controller
					}
				})
				.when('/posts/new', {
					templateUrl: '../views/posts/new.html',
					controller: 'NewPostController',
					controllerAs: 'vm'
				})
				.when('/posts/:id/edit', {
					templateUrl: '../views/posts/edit.html',
					controller: 'EditPostController',
					controllerAs: 'vm',
					resolve: {
					 post: getPostById
					}
				})
//~~~~~~~~~~~~~~ FILM POSTS ROUTING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				.when('/filmPosts', {
					templateUrl: '../views/categories/film/index.html',
					controller: 'FilmPostsController',
					controllerAs: 'vm',
					resolve: {
						// document.getElementById('map').style.height = '100%'  <---- how can I do this?
						posts: getAllFilmPosts
					//^resolve waits for the promise to get resolved and stores it as posts, then injects it into the controller
					}
				})
				.when('/filmPosts/new', {
					templateUrl: '../views/categories/film/new.html',
					controller: 'NewFilmPostController',
					controllerAs: 'vm'
				})
				.when('/filmPosts/:id/edit', {
					templateUrl: '../views/categories/film/edit.html',
					controller: 'EditFilmPostController',
					controllerAs: 'vm',
					resolve: {
					 post: getFilmPostById
					}
				})
//~~~~~~~~~~~~~~ MUSIC POSTS ROUTING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				.when('/musicPosts', {
					templateUrl: '../views/categories/music/index.html',
					controller: 'MusicPostsController',
					controllerAs: 'vm',
					resolve: {
						posts: getAllMusicPosts
					//^resolve waits for the promise to get resolved and stores it as posts, then injects it into the controller
					}
				})
				.when('/musicPosts/new', {
					templateUrl: '../views/categories/music/new.html',
					controller: 'NewMusicPostController',
					controllerAs: 'vm'
				})
				.when('/musicPosts/:id/edit', {
					templateUrl: '../views/categories/music/edit.html',
					controller: 'EditMusicPostController',
					controllerAs: 'vm',
					resolve: {
					 post: getMusicPostById
					}
				})				
				.otherwise({redirectTo: '/'})
				$locationProvider.html5Mode(true)

				// Configure Auth0
				authProvider.init({
				  domain: 'craven.auth0.com',
				  clientID: 'sI6rbsS557DwaMiz649qWI0Qla9pwWtG',
				  loginUrl: '/'
				});
		};

	function runFunction($rootScope, auth, store, jwtHelper, $location,UsersService){
  	  // Wrapper function to handle profile and toke storage
	  var saveUserInfo = function(profile, token) {
	    store.set('profile', profile);
	    store.set('token', token);
	    $rootScope.watch = true;

	    // var name = JSON.parse(localStorage.profile).given_name
	    // var picture = JSON.parse(localStorage.profile).picture

	    var newUser = {name : JSON.parse(localStorage.profile).given_name,
	    user_pic : JSON.parse(localStorage.profile).picture, third_party_user_id : JSON.parse(localStorage.profile).user_id, first_time:true,has_mail:false }
	    
	  
    	console.log(newUser)
    	
    	var req = {user: newUser};
    	
    	UsersService.createUser(req).then(function(res){
    		// alert('successfully logged in')
    		$location.path('/loggedinHome');
    		console.log(res)
    	})
	    if(localStorage.length>0){
	    document.getElementById('newloginButton').style.display = 'none';
	    document.getElementById('newlogoutButton').style.display = 'inline';
	    
	    }
	    else if (localStorage.length === 0){
	    document.getElementById('loginButton').style.display = 'none';
	    document.getElementById('logoutButton').style.display = 'inline';
	    }

	    // console.log('profile: '+profile+', token: '+token)
	    // console.log('name:'+profile.name)
	    // console.log(document.getElementById('nameSpan'))
	    // alert('Welcome to Cahoots, '+profile.name+'!')	
	     // document.getElementById('name')	
	  };
	  // Called when lock shows
	  auth.lockOn('show', function () {
	    // alert('shown');
	  });
	  // Called when lock hides
	  auth.lockOn('hide', function () {
	    // alert('hidden');
	  });
	  // Called when authentication is successful
	  auth.lockOn("authenticated", function(authResult) {
	    // console.log(authResult);


	    auth.getProfile(authResult.idToken).then(function (profile) {
	    	// debugger
	      // console.log(profile);
	      // Save user info to local storage
	      saveUserInfo(profile, authResult.idToken);
	    })
	  });
	  // Called when authentication fails
	  auth.lockOn("error", function(error) {
	    console.log(error);
	  });
	  // Listen to a location change event
	  $rootScope.$on('$locationChangeStart', function() {
	    // Grab the user's token
	    var token = store.get('token');
	    // Check if token was actually stored
	    if (token) {
	      // Check if token is yet to expire
	      if (!jwtHelper.isTokenExpired(token)) {
	        // Check if the user is not authenticated
	        if (!auth.isAuthenticated) {
	          // Re-authenticate with the user's profile
	          auth.authenticate(store.get('profile'), token);
	        }
	      } else {
	        // Show the login page
	        $location.path('/logout');
	      }
	    }

	  });
	} 
	function auth0(authProvider){
		//Configure Auth0 with credentials
		authProvider.init({
		    domain: 'craven.auth0.com',
		    // TODO: move client id to .env
		    clientID: 'sI6rbsS557DwaMiz649qWI0Qla9pwWtG',
		    loginUrl: '/home'
		});

		// CODE FORM AUTH0: 
		// Called when login is successful
		authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', '$rootScope',
		  function($location, profilePromise, idToken, store, $rootScope) {
		    // Successfully log in
		    // Access to user profile and token
		    profilePromise.then(function(profile){
		      // profile
		      // debugger
		      store.set('profile', profile);
		      store.set('token', idToken);
		      $rootScope.watch = true;

		    });
		    // $location.url('/'); // location after login.
		  }]);

		//Called when login fails
		authProvider.on('loginFailure', function() {
		  // If anything goes wrong
		});
	}
	function getAllPosts(PostService){
		console.log('getAllPosts')
		return PostService.getPosts();
	}
	function getPostById(PostService,$route){
		return PostService.getPost($route.current.params.id);
	}

	function getAllFilmPosts(FilmPostService){
		console.log('getAllFilmPosts')
		return FilmPostService.getPosts();
	}
	function getFilmPostById(FilmPostService,$route){
		return FilmPostService.getPost($route.current.params.id);
	}

	function getMusicPostById(MusicPostService,$route){
		return MusicPostService.getPost($route.current.params.id);
	}
	function getUserById(UsersService,$route){
		return UsersService.getUser($route.current.params.id);
	}
	function getAllMusicPosts(MusicPostService){
		console.log('getAllMusicPosts')
		return MusicPostService.getPosts();
	}
	function getAllMail(FilmPostCommentsService){
		console.log(FilmPostCommentsService)
		var user_id = JSON.parse(localStorage.profile).user_id
		return FilmPostCommentsService.getMail(user_id);
	}




	config.$inject = ['$routeProvider', '$locationProvider','authProvider']

	runFunction.$inject = ['$rootScope', 'auth', 'store', 'jwtHelper', '$location','UsersService']

	getAllPosts.$inject = ['PostService']
	getPostById.$inject = ['PostService','$route']

	getAllFilmPosts.$inject = ['FilmPostService']
	getFilmPostById.$inject = ['FilmPostService','$route']

	getAllMusicPosts.$inject = ['MusicPostService']
	getMusicPostById.$inject = ['MusicPostService','$route']

	getUserById.$inject = ['UsersService','$route']
	// getAllMail.$inject = ['FilmPostCommentsService']

	auth0.$inject = ['authProvider']


})()

// var colorArr = ['#181e31','#2b3249','#b6962a','#ecd350','#6b1f0f']
// var random = Math.round(Math.random() *11) 
// console.log(random)
// console.log(colorArr)