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
			// console.log('filmMail is', filmMail, 'FilmPostCommentsService is ', FilmPostCommentsService)
			console.log('[index] codingMail is ', codingMail)
			// console.log('filmmail is: '+filmMail+'. musicMail is: '+musicMail+'. codingMail is: '+codingMail)

			vm.name = JSON.parse(localStorage.profile).given_name
			vm.navpicture = JSON.parse(localStorage.profile).picture
			vm.filmCommentPosts = []
			vm.musicPostComments = []
			vm.codingPostComments = []
			var myDisplayName;

			var currentId = JSON.parse(localStorage.profile).user_id
			UsersService.getUser(currentId).then(function(res){
				myDisplayName = res.data.display_name
			})
			
			for(let i = 0; i<filmMail.data.length; i++){
					var id = filmMail.data[i].post_id
					// console.log(id)
					FilmPostService.getPost(id).then(function(res){
						// console.log(res.data.display_name)
					filmMail.data[i].recipient = res.data.display_name
						if(res.data.display_name===myDisplayName){
							filmMail.data[i].recipient = 'You'
						}
					})
					vm.filmCommentPosts.push(filmMail.data[i])
			}
			// console.log(vm.filmCommentPosts)
			for(var i = 0; i<musicMail.data.length; i++){
					vm.musicPostComments.push(musicMail.data[i])
			}
			for(var i = 0; i<codingMail.data.length; i++){
					vm.codingPostComments.push(codingMail.data[i])
			}
			// console.log(vm.filmCommentPosts)

			vm.hasNewFilmMail = false
			vm.hasNewMusicMail = false
			vm.hasNewCodingMail = false

			vm.showFilmMail = false
			vm.showMusicMail = false
			vm.showCodingMail = false

			vm.showFilmResponseField = false
			vm.showMusicResponseField = false
			vm.showCodingResponseField = false

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

			vm.newMessage = function(postId,message,category){
				console.log('ng-submitted')
				vm.post = {}
				vm.post.category = category
				vm.post.message = message
				vm.post.original_comment_id = postId
				vm.post.user_id = JSON.parse(localStorage.profile).user_id
				var req = {post: vm.post};
				// event.preventDefault();
				ConvoRepoService.createMessage(req)
				// $scope.$apply();
			}

			vm.deleteConvo = function(postId, comment, category){
				console.log('testies testies YAAAAAAAAAAAAAAAAAA')
			};


			var bool = true
			vm.respondFilm = function(idx){
				// console.log(idx)
				vm.messages = []
				var eyedee = vm.filmCommentPosts[idx].id
				console.log(ConvoRepoService)
				console.log(eyedee)
				ConvoRepoService.getMessages('film',eyedee).then(function(res){
					console.log(res)
					// console.log(res.data)
					res.data.forEach(function(e){
						console.log(e.display_name+': '+e.message)
						vm.messages.push({user:e.display_name,message:e.message})
		  				// vm.messages.push({e.display_name,e.message})
					})
		  			console.log(vm.messages)
		  		})

				vm.showFilmResponseField = !vm.showFilmResponseField
				if(vm.showFilmResponseField === true){
				// vm.messages.push('Hi there','Mamaia','Woopsies')


				var selected = Array.from(document.querySelectorAll('.postFilmResponseArea')).filter((v,i) => i == idx)
				var selectedChatbox = Array.from(document.querySelectorAll('.chatbox')).filter((v,i) => i == idx)	
		  		// console.log(selectedChatbox[0])
				var others = Array.from(document.querySelectorAll('.postFilmResponseArea')).filter((v,i) => i !== idx)		  		
				others.forEach(function(i){i.style.display = 'none'})
				selectedChatbox[0].style.display = 'block'

				}
				if(vm.showFilmResponseField === false){
					var selected = Array.from(document.querySelectorAll('.postFilmResponseArea')).filter((v,i) => i == idx)		  			
					var selectedChatbox = Array.from(document.querySelectorAll('.chatbox')).filter((v,i) => i == idx)	
					var others = Array.from(document.querySelectorAll('.postFilmResponseArea')).filter((v,i) => i !== idx)
					selectedChatbox[0].style.display = 'none'
					others.forEach(function(i){i.style.display = 'block'})

				}
				console.log(vm.messages)
			}
			vm.respondMusic = function(idx){
				console.log(vm.showMusicResponseField)
				// console.log('autofocus = '+ $('.postTextField')[0].form[0].autofocus)
				// console.log('before: '+responseAutoFocus)
				vm.showMusicResponseField = !vm.showMusicResponseField
				if(vm.showMusicResponseField === true){
				var selected = Array.from(document.querySelectorAll('.postMusicResponseArea')).filter((v,i) => i == idx)		  		
				var others = Array.from(document.querySelectorAll('.postMusicResponseArea')).filter((v,i) => i !== idx)		  		
				others.forEach(function(i){i.style.display = 'none'})
				}
				if(vm.showMusicResponseField === false){
					var selected = Array.from(document.querySelectorAll('.postMusicResponseArea')).filter((v,i) => i == idx)		  			
					var others = Array.from(document.querySelectorAll('.postMusicResponseArea')).filter((v,i) => i !== idx)

					others.forEach(function(i){i.style.display = 'block'})
				}
			}
			vm.respondCoding = function(idx){
				vm.showCodingResponseField = !vm.showCodingResponseField
				if(vm.showCodingResponseField === true){
				var selected = Array.from(document.querySelectorAll('.postCodingResponseArea')).filter((v,i) => i == idx)		  		
				var others = Array.from(document.querySelectorAll('.postCodingResponseArea')).filter((v,i) => i !== idx)		  		
				others.forEach(function(i){i.style.display = 'none'})
				}
				if(vm.showCodingResponseField === false){
					var selected = Array.from(document.querySelectorAll('.postCodingResponseArea')).filter((v,i) => i == idx)		  			
					var others = Array.from(document.querySelectorAll('.postCodingResponseArea')).filter((v,i) => i !== idx)

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
		function CodingPostsController(CodingPostService,CodingPostCommentsService,UsersService,posts,$location,$route, NgMap, codingMail, $timeout, $rootScope){
			var vm = this, span, area, cursor;


			// console.log('this is ', this)

			// console.log(posts)
			posts.data.forEach(function(i){
				var facebook = /^(facebook)/,
					numberPattern = /\d+/g,
					fbUserId;
				if(facebook.test(i.third_party_user_id)){
					fbUserId = i.third_party_user_id.match(numberPattern)[0];
					i.user_pic = 'http://graph.facebook.com/'+ fbUserId +'/picture?type=large'
					
				}
			})
			// if(posts)

			vm.showMap = false
			vm.showVid = true
			vm.toggleView = false
		  	vm.showText = false
			vm.posts = posts.data;
			vm.backButton = 'home'
			vm.tempIndex = null;
			vm.test = false;

			// console.log('[index] codingMail is ', codingMail)
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
		  		else if (localStorage.length>0 && vm.backButton === 'home'){
		  			$location.path('/loggedinHome')	
		  		}else if (localStorage.length>0 && vm.backButton === 'codingIndex'){
		  			vm.show(vm.tempIndex)

		  			vm.backButton = 'home'	
		  		}
		  	}

		  	vm.loggedIn = false
		  	if(localStorage.length > 0){
		  		vm.loggedIn = true
		  	}


		  	// function makeExpandingArea(container) {
		  	//  var area = container.querySelector('textarea');
		  	//  var span = container.querySelector('#fakespan');
		  	//  var cursor = container.querySelector('.blinking-cursor');

		  	//  if(area.addEventListener) {
		  	//    area.addEventListener('focus', function(){
		  	//      cursor.style.visibility = 'visible'
		  	//    })
		  	//    area.addEventListener('focusout', function(){
		  	//      cursor.style.visibility = 'hidden'
		  	//    })

		  	//    area.addEventListener('input', function() {
		  	//      span.textContent = area.value;
		  	//    }, false);
		  	//    span.textContent = area.value;
		  	//  } else if (area.attachEvent) {
		  	//    // IE8 compatibility
		  	//    area.attachEvent('onpropertychange', function() {
		  	//      span.innerText = area.value;
		  	//    });
		  	//    span.innerText = area.value;
		  	//  }
		  	// // Enable extra CSS
		  	// 	container.className += "active";
		  	// }
		  	// var areas = document.querySelectorAll('.expandingArea');
		  	// var l = areas.length;while (l--) {
		  	// 	// console.log(areas[l])
		  	//  makeExpandingArea(areas[l]);
		  	// }


		  	vm.show = function(idx){
		  	 var selected, others;
		  	 vm.tempIndex = idx;
		  	 
	  		 if(!vm.test){
	  		 	vm.test = true;
	  		 }

	  		 vm.toggleView = !vm.toggleView
	  		 vm.showText = !vm.showText
	  		 // vm.showMap = !vm.showMap
	  		 vm.showVid = !vm.showVid


	  		 // console.log('this is ', this, 'vm is ', vm)

		  		 if(vm.toggleView === true){
		  		 	console.log('toggleView ', vm.toggleView)


		  		  vm.backButton = 'codingIndex'

		  		  selected = Array.from(document.querySelectorAll('md-list-item')).filter((v,i) => i == idx)		  		
		  		  others = Array.from(document.querySelectorAll('md-list-item')).filter((v,i) => i !== idx)		  		
		  		  others.forEach(function(i){i.style.display = 'none'})

		  		  selected[0].classList.add('focus')
	  		 		// var inputContainer = document.querySelectorAll('.width70').forEach();

  		 		 $timeout(function() {
		  		 		// console.log('inside')
		  		 		
		  		 		// var myNodeList = document.querySelectorAll('md-input-container');
		  		 		// var myArrayFromNodeList = []; 
		  		 		// for (var i = 0; i < myNodeList.length; i++) {
		  		 		//   myArrayFromNodeList.push(myNodeList[i]); 
		  		 		// }
		  		 		// myArrayFromNodeList.forEach(function (e){
		  		 		// 	e.classList.remove('md-input-invalid')
		  		 		// 	e.classList.remove('md-input-focused')
		  		 		// 	e.classList.remove('md-input-has-value')
		  		 		// })

		  		 		// console.log(myArrayFromNodeList)



	  		 		var myNodeList = document.querySelectorAll('md-input-container');
	  		 		var myArrayFromNodeList = []; 
	  		 		for (var i = 0; i < myNodeList.length; i++) {
	  		 		  myArrayFromNodeList.push(myNodeList[i]); 
	  		 		}
	  		 		myArrayFromNodeList.forEach(function (e){
	  		 			e.classList.remove('md-input-invalid')
	  		 			e.classList.remove('md-input-focused')
	  		 			e.classList.remove('md-input-has-value')
	  		 			// e.innerText = 'message'
	  		 		})
	  		 			console.log('nodelist is ', myArrayFromNodeList[0].innerText)


	  		 		// console.log('input container ', inputContainer)
	  		 		// inputContainer.classList.remove("md-input-has-value", "md-input-invalid");
	  		 		// console.log('classlist post: ',inputContainer.classList)

		  		 	function makeExpandingArea(container) {

		  		 	console.log('container is ', container)
		  		 	 var area = container.querySelector('textarea');
		  		 	 var span = container.querySelector('#fakespan');
		  		 	 var cursor = container.querySelector('.blinking-cursor');

		  		 	 console.log('area: ', area.value, 'span: ', span.textContent, 'cursor : ', cursor, 'container: ', container)

		  		 	 if(area.addEventListener) {
		  		 	   area.addEventListener('focus', function(){
		  		 	   	console.log('FOCUS ON TRIGGERED')
		  		 	     cursor.style.visibility = 'visible'
		  		 	   })
		  		 	   area.addEventListener('focusout', function(){
		  		 	   	console.log('FOCUS OUT TRIGGERED')
		  		 	     cursor.style.visibility = 'hidden'
		  		 	   })

		  		 	   area.addEventListener('input', function() {
		  		 	     span.textContent = area.value;
		  		 	   });
		  		 	   // console.log('okay area is ', area)
		  		 	   // span.textContent = area.value;
		  		 	   span.textContent = area.value;
		  		 	 } else if (area.attachEvent) {
		  		 	   // IE8 compatibility
		  		 	   area.attachEvent('onpropertychange', function() {
		  		 	     // span.innerText = area.value;
		  		 	   });
		  		 	   // span.innerText = area.value;
		  		 	 }
		  		 	// Enable extra CSS
		  		 		container.className += "active";
		  		 	}
		  		 	var areas = document.querySelectorAll('.expandingArea');
		  		 	// console.log('areas.length is ', areas.length)
		  		 	makeExpandingArea(areas[idx])


		  		 	vm.showMap = true;
		  		 	// var l = areas.length;while (l--) {
		  		 	// 	console.log('area ', l, 'is ', areas[l], 'idx is ', idx)
		  		 	//  makeExpandingArea(areas[l]);
		  		 	// }
		  		 	// console.log(NgMap)
		  		 	// google.maps.event.trigger(map, 'resize')

		  		 	// console.log($timeout)
		  		 	// $timeout(function() {
		  		 	// 	console.log('inside')
		  		 	// 	NgMap.getMap('map').then(function(response) {
		  		 	// 		console.log('about to resize')
		  		 	// 		google.maps.event.trigger(response, 'resize');
		  		 	// 	});
		  		 	// }, 500);
		  		 	// NgMap.control.refresh()
		  		 	// var map;
		  		 	// vm.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtNoaazwyeqMuiXN9zNkWAW8y-WdCGp40&v=3&";	
		  		 	// x = NgMap.getMap('map');
	  		 		}, 500);
		  		 }

		  		 if(vm.toggleView === false){
		  		 	console.log('off')

		  		 		vm.showMap = false;
  		 		 	// $timeout(function() {
		  		 		// console.log('inside OFF')

		  		 		var myNodeList = document.querySelectorAll('md-input-container');
		  		 		var myArrayFromNodeList = []; 
		  		 		for (var i = 0; i < myNodeList.length; i++) {
		  		 		  myArrayFromNodeList.push(myNodeList[i]); 
		  		 		}
		  		 		myArrayFromNodeList.forEach(function (e){
		  		 			e.classList.remove('md-input-invalid')
		  		 			e.classList.remove('md-input-focused')
		  		 			e.classList.remove('md-input-has-value')
		  		 		})
		  		 			console.log('SECONDARY  nodelist is ', myArrayFromNodeList)



		  		 		
			  		 	var myNodeList2 = document.querySelectorAll('.expandingAreaactive');
			  		 	var myArrayFromNodeList2 = []; 
			  		 	for (var i = 0; i < myNodeList2.length; i++) {
			  		 	  myArrayFromNodeList2.push(myNodeList2[i]); 
			  		 	}
			  		 	myArrayFromNodeList2.forEach(function (e){
			  		 		e.className = "expandingArea"
			  		 	})

			  		 	console.log(myArrayFromNodeList2)

			  		 	var myNodeList3 = document.querySelectorAll('#fakespan');
			  		 	var myArrayFromNodeList3 = []; 
			  		 	for (var i = 0; i < myNodeList3.length; i++) {
			  		 	  myArrayFromNodeList3.push(myNodeList3[i]); 
			  		 	}
			  		 	myArrayFromNodeList3.forEach(function (e){
			  		 		// console.log(e)
			  		 		e.textContent = ''
			  		 		// e.getParentNode().removeChild(e);
			  		 	})

			  		 	// console.log(myArrayFromNodeList3)

			  		 	var myNodeList4 = document.querySelectorAll('textarea');
			  		 	var myArrayFromNodeList4 = []; 
			  		 	for (var i = 0; i < myNodeList4.length; i++) {
			  		 	  myArrayFromNodeList4.push(myNodeList4[i]); 
			  		 	}
			  		 	// console.log('area elements are ', myArrayFromNodeList4)
			  		 	myArrayFromNodeList4.forEach(function (e){
			  		 		e.value = ''
			  		 		// console.log('area is ', e)
			  		 		// e.getParentNode().removeChild(e);
			  		 	})

	  		 		// }, 1500);

	  		 		vm.test = false;

		  		 	vm.backButton = 'home'


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

		  		console.log('in CODING POST COMMENT, id is ', id, 'comment is ', newCodingPostComment, this)

		  		vm.comment.user_id = JSON.parse(localStorage.profile).user_id
		  		vm.comment.post_id = id
		  		var req = {post: newCodingPostComment};
		  		
		  		// this.toggleView = false
		  			console.log('vm.toggleview is ', this.toggleView)

		  		CodingPostCommentsService.createPost(req).then(function(res){
		  			// $location.path('/filmPosts');
		  			vm.show(vm.tempIndex)
		  			// vm.goBack();
		  		}, vm)
		  	}
		}
		function NewCodingPostController(CodingPostService,UsersService,$location,store){
			var vm = this;
			vm.post = {};
			vm.goBackToCodingIndex = function(){
				$location.path('/codingPosts')
			}
			vm.post.user_id = JSON.parse(localStorage.profile).user_id

			function makeExpandingArea(container) {
			console.log(container)			
			 var area = container.querySelector('textarea');
			 var span = container.querySelector('#fakespan');
			 var cursor = container.querySelector('.blinking-cursor');
			 span.addEventListener('onactivate', function(){
			   console.log('span ITS ACTIVE')

			 })

			 if (area.addEventListener) {
			   area.addEventListener('focus', function(){
			     cursor.style.visibility = 'visible'
			   })
			   area.addEventListener('focusout', function(){
			     cursor.style.visibility = 'hidden'
			   })
			   area.addEventListener('input', function(e) {
			   	if(span.offsetWidth > area.offsetWidth){
			   		var carriage = document.createElement("input");
			   		carriage.setAttribute('inputType', 'insertLineBreak');
			   		span.appendChild(carriage)
			   		// console.log(e)
			   		// e.inputType = "insertLineBreak";
			   		// e.data = 'hey whats going on fattie';
			   		// e.isDefaultPrevented = true;
			   		// console.log(e)
			   		// area.value = '/r' + area.value
			   		// return
			   	}
			   		// console.log(e.inputType)
			     span.textContent = area.value;
			     // console.log('area.width vs span width is ', area.offsetWidth, span.offsetWidth)
			   }, false);
			   span.textContent = area.value;
			 } else if (area.attachEvent) {
			   // IE8 compatibility
			   area.attachEvent('onpropertychange', function() {
			     span.innerText = area.value;
			     console.log('here2')
			   });
			   span.innerText = area.value;
			 }
			// Enable extra CSS
				container.className += "active";
			}var areas = document.querySelectorAll('.expandingArea');
			var l = areas.length;while (l--) {
			 makeExpandingArea(areas[l]);
			}
			// makeExpandingArea(document)




			vm.addCodingPost = function(newCodingPost){
				var req = {post: newCodingPost};
				// var id = vm.post.user_id
				console.log('going to codingPostService')
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
		function MusicPostsController(MusicPostService, MusicPostCommentsService,UsersService,posts,$location,$route, NgMap, musicMail){
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
//~~~~~~FILMposts controller~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~			
		function FilmPostsController(FilmPostService,FilmPostCommentsService,UsersService,posts,$location,$route, NgMap, filmMail, $rootScope){
			var vm = this;
			vm.showMap = false
			vm.showVid = true
			vm.backHome = '/home'

			console.log('IN FILM POSTS CONTROLLER, filmMail is ', filmMail, 'FilmPostCommentsService is ',  FilmPostCommentsService)
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
		// var spoon = 'fid'
		CodingPostsController.$inject = ['CodingPostService','CodingPostCommentsService','UsersService','posts','$location','$route', 'NgMap', 'codingMail', '$timeout'];
		NewCodingPostController.$inject = ['CodingPostService','UsersService','$location','store'] 
		EditCodingPostController.$inject = ['CodingPostService', 'post', '$location']

		FilmPostsController.$inject = ['FilmPostService','FilmPostCommentsService','UsersService','posts','$location','$route', 'NgMap', 'filmMail'];
		//  ^removed $rootScopt, cause I don't think it's needed
		NewFilmPostController.$inject = ['FilmPostService','UsersService','$location','store'] 
		EditFilmPostController.$inject = ['FilmPostService', 'post', '$location']

		MusicPostsController.$inject = ['MusicPostService','MusicPostCommentsService','UsersService','posts','$location','$route', 'NgMap', 'musicMail'];
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

