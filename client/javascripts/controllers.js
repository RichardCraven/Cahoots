
(function() {
	angular 
		.module('collaboApp')
		.directive('paperInput', paperInput)
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
		.controller('HomeCtrl', HomeCtrl)
		.controller('LoginHomeCtrl', LoginHomeCtrl)
		.controller('MailCtrl', MailCtrl)
		.controller('LandingCtrl', LandingCtrl)
		
		function paperInput($templateCache){
			function linkFn(scope, element, attrs) {
				scope.isRequired = angular.isDefined(attrs.required);
				scope.isDatepicker = angular.isDefined(attrs.date);
				scope.state = {
					opened: false
				};
			}
			return {
				template: $templateCache.get('paperInput'),
				scope: {
					label: '@',
					type: '@',
					modelRef: '='
				}
			}
		}
		function LandingCtrl($location,auth, store,$timeout,$rootScope, UsersService){
			var vm=this;
		  	var fadeOut = function(){
		  		location.href = '/home';
		  	};
			if(localStorage.length > 0){
		  		location.href = '/loggedinHome';
		  	} else {
	  			localStorage.clear()
	  			var fadeOut = $timeout(fadeOut,6900)
	  		};
		};
		function MailCtrl($scope, filmMail, musicMail, codingMail, filmConvos, musicConvos, codingConvos, $location, auth, store, $timeout, $rootScope, UsersService, FilmPostCommentsService, FilmPostService, ConvoRepoService, CodingPostConversationsService, CodingPostCommentsService, FilmPostConversationsService, FilmPostCommentsService, MusicPostConversationsService, MusicPostCommentsService){
			var vm=this;
			vm.name = JSON.parse(localStorage.profile).given_name;
			vm.displayName = '';
			vm.navpicture = JSON.parse(localStorage.profile).picture;
			vm.user_id = JSON.parse(localStorage.profile).user_id;
			vm.filmPostComments = [];
			vm.musicPostComments = [];
			vm.codingPostComments = [];
			vm.codingConvos = [];
			vm.musicConvos = [];
			vm.filmConvos = [];
			vm.activeConvos = [];
			vm.selectedConvo = 
			vm.convoMessage = null;
			vm.littleLength = '100px';
			vm.middleLength = '35%';
			vm.longLength = '65%';
			vm.longestLength = '100%';
			vm.isVisible = false;
			vm.showButtons = function(post){
				vm.isVisible = post.id;
			};
			vm.hideButtons = function(post){vm.isVisible = false}
			var myDisplayName, post_id, fbUserId, facebook = /^(facebook)/,
			numberPattern = /\d+/g;
			UsersService.getUser(vm.user_id).then(function(res){
				myDisplayName = res.data.display_name;
				vm.displayName = res.data.display_name;
			});
			if(facebook.test(vm.user_id)){
				fbUserId = vm.user_id.match(numberPattern)[0];
				vm.navpicture = 'http://graph.facebook.com/'+ fbUserId +'/picture?type=large'
			};
			for(var i = 0; i<filmMail.data.length; i++){
				if(filmMail.data[i].is_accepted) continue
				if (facebook.test(filmMail.data[i].user_id)) {
					fbUserId = filmMail.data[i].user_id.match(numberPattern)[0];
					filmMail.data[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
				};
				vm.filmPostComments.push(filmMail.data[i])
			};
			for(var i = 0; i<musicMail.data.length; i++){
				if (musicMail.data[i].is_accepted) continue
				if (facebook.test(musicMail.data[i].user_id)) {
					fbUserId = musicMail.data[i].user_id.match(numberPattern)[0];
					musicMail.data[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
				};
				vm.musicPostComments.push(musicMail.data[i])
			};
			for(var i = 0; i<codingMail.data.length; i++){
				if (codingMail.data[i].is_accepted) continue
				if (facebook.test(codingMail.data[i].user_id)) {
					fbUserId = codingMail.data[i].user_id.match(numberPattern)[0];
					codingMail.data[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
				};
				vm.codingPostComments.push(codingMail.data[i])
			};
			for(var i = 0; i<codingConvos.data.length; i++){
				if (codingConvos.data[i].user_id === vm.user_id) { continue }
				if (facebook.test(codingConvos.data[i].user_id)) {
					fbUserId = codingConvos.data[i].user_id.match(numberPattern)[0];
					codingConvos.data[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
				};
				codingConvos.data[i].category = 'coding';
				vm.codingConvos.push(codingConvos.data[i])
			};
			for (var i = 0; i < musicConvos.data.length; i++) {
				if (musicConvos.data[i].user_id === vm.user_id) { continue }
				if (facebook.test(musicConvos.data[i].user_id)) {
					fbUserId = musicConvos.data[i].user_id.match(numberPattern)[0];
					musicConvos.data[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
				};
				musicConvos.data[i].category = 'music';
				vm.musicConvos.push(musicConvos.data[i])
			};
			for (var i = 0; i < filmConvos.data.length; i++) {
				if(filmConvos.data[i].user_id === vm.user_id){continue}
				if (facebook.test(filmConvos.data[i].user_id)) {
					fbUserId = filmConvos.data[i].user_id.match(numberPattern)[0];
					filmConvos.data[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
				};
				filmConvos.data[i].category = 'film';
				vm.filmConvos.push(filmConvos.data[i])
			};
			let addToActives = function (arr) {
				arr.forEach(el => vm.activeConvos.push(el))
			}
			addToActives(vm.codingConvos);
			addToActives(vm.musicConvos);
			addToActives(vm.filmConvos);

			vm.activeConvos.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

			vm.logout = function(){
				store.remove('profile');
				store.remove('token');
				location.href = '/home';
			};
			vm.goBack = function(){
				$location.path('/loggedinHome')
			};
			vm.checkIfPendingEmpty = function (){
				if (!vm.codingPostComments.length && !vm.musicPostComments.length && !vm.filmPostComments.length){
					let activeTab = document.getElementsByClassName('md-tab')[5];
					$timeout(function () {
						vm.clickTrigger(activeTab)
					}, 0, false);
				}
			}
			$scope.$on('$viewContentLoaded', function () {
				$timeout(function () {
					vm.checkIfPendingEmpty();
				}, 500, false);
			});
			vm.clickTrigger = function(targetNode, hold){
					function triggerMouseEvent(node, eventType) {
						var clickEvent = document.createEvent('MouseEvents');
						clickEvent.initEvent(eventType, true, true);
						node.dispatchEvent(clickEvent);
					}
					if (targetNode) {
						//--- Simulate a natural mouse-click sequence.
						triggerMouseEvent(targetNode, "mouseover");
						triggerMouseEvent(targetNode, "mousedown");
						if(!hold){
						triggerMouseEvent(targetNode, "mouseup");
						triggerMouseEvent(targetNode, "click");
						}
					}
					else
					console.log("*** Target node not found!");
			}
			vm.acceptConversation = function(post){
				let msg = {};
				msg.user_id = post.user_id;
				msg.first_comment_id = post.id;
				msg.message = post.comment;
				let req = { post: msg };
				switch(post.category){
					case 'coding':
					msg.coding_post_id = post.post_id;
						CodingPostConversationsService.createMessage(req).then(function (res) {
							for(let i = 0; i<vm.codingPostComments.length; i++){
								if(vm.codingPostComments[i].id === res.data[0].first_comment_id){
									vm.codingPostComments.splice(i,1);	
									let activeTab = document.getElementsByClassName('md-tab')[5]
									activeTab.style.backgroundColor = '#f5f5dc';
									let beigePulse = setTimeout(function(){
										activeTab.style.backgroundColor = 'white';
									}, 500);			
								}
							};
							post.message = post.comment;
							vm.activeConvos.unshift(post);	
							req = {post: {
								id : post.id,
								is_accepted : true
							}}
							CodingPostCommentsService.updatePost(req).then(function (res){
								vm.checkIfPendingEmpty();
							}, vm);
						}, vm);
					break;
					case 'music':
						msg.music_post_id = post.post_id;
						MusicPostConversationsService.createMessage(req).then(function (res) {
							for (let i = 0; i < vm.musicPostComments.length; i++) {
								if (vm.musicPostComments[i].id === res.data[0].first_comment_id) {
									vm.musicPostComments.splice(i, 1);
									let activeTab = document.getElementsByClassName('md-tab')[5]
									activeTab.style.backgroundColor = '#f5f5dc';
									let beigePulse = setTimeout(function () {
										activeTab.style.backgroundColor = 'white';
									}, 500);
								}
							};
							post.message = post.comment;
							vm.activeConvos.unshift(post);	
							req = {
								post: {
									id: post.id,
									is_accepted: true
								}
							}
							MusicPostCommentsService.updatePost(req).then(function (res) {
								vm.checkIfPendingEmpty();
							}, vm);
						}, vm);
						break;
					case 'film':
						msg.film_post_id = post.post_id;
						FilmPostConversationsService.createMessage(req).then(function (res) {
							for (let i = 0; i < vm.filmPostComments.length; i++) {
								if (vm.filmPostComments[i].id === res.data[0].first_comment_id) {
									vm.filmPostComments.splice(i, 1);	
									let activeTab = document.getElementsByClassName('md-tab')[5]
									activeTab.style.backgroundColor = '#f5f5dc';
									let beigePulse = setTimeout(function () {
										activeTab.style.backgroundColor = 'white';
									}, 500);
								}
							};
							post.message = post.comment;
							vm.activeConvos.unshift(post);	
							req = {
								post: {
									id: post.id,
									is_accepted: true
								}
							}
							FilmPostCommentsService.updatePost(req).then(function (res) {
								vm.checkIfPendingEmpty();
							}, vm);
						}, vm);
						break;
				};
			};
			vm.declineConversation = function(post, $event) {
				let req = post.id, index;
				node = $event.target
				$timeout(function () {
					vm.clickTrigger(node, true)
				}, 0, false);
				switch (post.category) {
					case 'coding':
						for (let i = 0; i < vm.codingPostComments.length; i++) {
							if (vm.codingPostComments[i].id === post.id) {
								index = i;
							}
						};
						vm.codingPostComments.splice(index, 1);
						CodingPostCommentsService.deletePost(req).then(function (res) {
							vm.checkIfPendingEmpty();
						});
					break;
					case 'music':
						for (let i = 0; i < vm.musicPostComments.length; i++) {
							if (vm.musicPostComments[i].id === post.id) {
								index = i;
							}
						};
						vm.musicPostComments.splice(index, 1);
						MusicPostCommentsService.deletePost(req).then(function (res) {
							vm.checkIfPendingEmpty();
						});
						break;
					case 'film':
						for (let i = 0; i < vm.filmPostComments.length; i++) {
							if (vm.filmPostComments[i].id === post.id) {
								index = i;
							}
						};
						vm.filmPostComments.splice(index, 1);
						FilmPostCommentsService.deletePost(req).then(function (res) {
							vm.checkIfPendingEmpty();
						});
						break;
				};
			};
			let highlightables = document.getElementsByClassName('highlightable');
			vm.activateConvo = function(idx, convoPost, $event){
				for(let i = 0; i < highlightables.length; i++){
					highlightables[i].style.backgroundColor = 'white';
				};
				highlightables[idx].style.backgroundColor = 'beige';
				
				let chatbox = document.getElementsByClassName('chatboxText')[0];
				chatbox.innerHTML = '';
				
				switch(vm.activeConvos[idx].category){
					case 'film':
					
						for (var i = 0; i < filmConvos.data.length; i++) {
							let current = filmConvos.data[i];
							if (current.first_comment_id === vm.activeConvos[idx].first_comment_id) {
								current.display_name === vm.displayName ? name = 'You' : name = current.display_name;
								let newLi = document.createElement('li'),
									msg = current.message;
								newLi.innerHTML = name + ':  &nbsp;' + msg;
								chatbox.appendChild(newLi);
							};
						};
					break;
					case 'music':
						
						for (var i = 0; i < musicConvos.data.length; i++) {
							let current = musicConvos.data[i];
							if (current.first_comment_id === vm.activeConvos[idx].first_comment_id) {
								current.display_name === vm.displayName ? name = 'You' : name = current.display_name;
								let newLi = document.createElement('li'),
									msg = current.message;
								newLi.innerHTML = name + ':  &nbsp;' + msg;
								chatbox.appendChild(newLi);
							};
						};
					break;
					case 'coding':
						for (var i = 0; i < codingConvos.data.length; i++) {
							let current = codingConvos.data[i];
							if (current.first_comment_id === vm.activeConvos[idx].first_comment_id  ){
								current.display_name === vm.displayName ? name = 'You' : name = current.display_name;
								let newLi = document.createElement('li'),
									msg = current.message;
								newLi.innerHTML = name + ':  &nbsp;' + msg;
								chatbox.appendChild(newLi);
							};
						};
					break;
				}

				vm.selectedConvo = vm.activeConvos[idx];
			};
			vm.newMessage = function(msg){
				let chatbox = document.getElementsByClassName('chatboxText')[0];
				let messageInput = document.getElementById('usermsg');
				let post = {};
				let req = {};
				post.message = msg;
				post.user_id = vm.user_id;
				post.first_comment_id = vm.selectedConvo.first_comment_id;
				switch(vm.selectedConvo.category){
					case 'film':
						post.film_post_id = vm.selectedConvo.film_post_id;
						req.post = post;
						FilmPostConversationsService.createMessage(req).then(function(res){
							let name = vm.displayName;
							let newLi = document.createElement('li');
							newLi.innerHTML = name + ':  &nbsp;' + msg;
							chatbox.appendChild(newLi);
							vm.convoMessage = '';
						})
					break;
					case 'music':
						post.music_post_id = vm.selectedConvo.music_post_id;
						req.post = post;
						MusicPostConversationsService.createMessage(req).then(function (res) {
							let name = vm.displayName;
							let newLi = document.createElement('li');
							newLi.innerHTML = name + ':  &nbsp;' + msg;
							chatbox.appendChild(newLi);
							vm.convoMessage = '';
						})
					break;
					case 'coding':
						post.coding_post_id = vm.selectedConvo.coding_post_id;
						req.post = post;
						CodingPostConversationsService.createMessage(req).then(function (res) {
							let name = vm.displayName;
							let newLi = document.createElement('li');
							newLi.innerHTML = name + ':  &nbsp;' + msg;
							chatbox.appendChild(newLi);
							vm.convoMessage = '';
						})
					break;

				}
			};
			vm.deleteConvo = function(postId, comment, category){
			};
			vm.respondFilm = function(idx){
				vm.messages = []
				var id = vm.filmPostComments[idx].id;
				ConvoRepoService.getMessages('film',id).then(function(res){
					res.data.forEach(function(e){
						vm.messages.push({user:e.display_name,message:e.message})
					});
		  		});
				vm.showFilmResponseField = !vm.showFilmResponseField;
				if(vm.showFilmResponseField === true){
					let selected = Array.from(document.querySelectorAll('.postFilmResponseArea')).filter((v,i) => i == idx),
					selectedChatbox = Array.from(document.querySelectorAll('.chatbox')).filter((v,i) => i == idx),
					others = Array.from(document.querySelectorAll('.postFilmResponseArea')).filter((v,i) => i !== idx);	
								
					others.forEach(function(i){i.style.display = 'none'});
					selectedChatbox[0].style.display = 'block';
				}
				if(vm.showFilmResponseField === false){
					var selectedChatbox = Array.from(document.querySelectorAll('.chatbox')).filter((v,i) => i == idx),
						others = Array.from(document.querySelectorAll('.postFilmResponseArea')).filter((v,i) => i !== idx);
					selectedChatbox[0].style.display = 'none';
					others.forEach(function(i){i.style.display = 'block'});
				};
			}
			vm.respondMusic = function(idx){
				vm.showMusicResponseField = !vm.showMusicResponseField
				if(vm.showMusicResponseField === true){
				var selected = Array.from(document.querySelectorAll('.postMusicResponseArea')).filter((v,i) => i == idx),		  		
					others = Array.from(document.querySelectorAll('.postMusicResponseArea')).filter((v,i) => i !== idx);		  		
				others.forEach(function(i){i.style.display = 'none'})
				}
				if(vm.showMusicResponseField === false){
					var selected = Array.from(document.querySelectorAll('.postMusicResponseArea')).filter((v,i) => i == idx),		  			
						others = Array.from(document.querySelectorAll('.postMusicResponseArea')).filter((v,i) => i !== idx);

					others.forEach(function(i){i.style.display = 'block'})
				}
			}
			vm.respondCoding = function(idx){
				vm.showCodingResponseField = !vm.showCodingResponseField
				if(vm.showCodingResponseField === true){
				var selected = Array.from(document.querySelectorAll('.postCodingResponseArea')).filter((v,i) => i == idx),		  		
				    others = Array.from(document.querySelectorAll('.postCodingResponseArea')).filter((v,i) => i !== idx);		  		
				others.forEach(function(i){i.style.display = 'none'});
				};
				if(vm.showCodingResponseField === false){
					var selected = Array.from(document.querySelectorAll('.postCodingResponseArea')).filter((v,i) => i == idx),		  			
						others = Array.from(document.querySelectorAll('.postCodingResponseArea')).filter((v,i) => i !== idx);
					others.forEach(function(i){i.style.display = 'block'});
				};
			};
		};

		function HomeCtrl($location,auth, store,$timeout,$rootScope, UsersService){
			var vm=this;
			localStorage.clear()
			if(localStorage.profile){
					location.href = '/loggedinHome';
		  	} else {
		  		localStorage.clear();
		  	};
		  	vm.go = function ( path ) {
				location.href = path;
			};
			vm.login = function (){
				auth.signin({popup: true}, function(profile,token){
				});
			}
			vm.logout = function(){
				store.remove('profile');
				store.remove('token');
				localStorage.clear();
			}
		};
		function MiscCtrl($location){
			var vm=this;
			vm.goBack = function(){
				if(localStorage.length === 0){
					$location.path('/home');
				} else if (localStorage.length>0){
					$location.path('/loggedinHome');	
				};
			};
		};
		function LoginHomeCtrl($location,auth,store,$timeout,$rootScope,UsersService){
			var vm=this,
				facebook = /^(facebook)/,
				numberPattern = /\d+/g,
			    fbUserId, userName;
			vm.showLoginButton = false;
			vm.user_id = JSON.parse(localStorage.profile).user_id;
			vm.go = function ( path ) {
			    $location.path( path );
			};
			UsersService.getUser(vm.user_id).then(function(user){
				console.log('user is ', user);
				
				if(!user.data.display_name || user.data.display_name == undefined || user.data.display_name == null){
					vm.welcome = 'Welcome'
				} else {
					userName = user.data.display_name
					vm.welcome = ('Welcome '+user.data.display_name+'!')
				};
				if(user.data.has_mail){
					console.log('HAS MAIL!');
					vm.hasMail = true;
				}

			});
			vm.hasMail = false;
			if(localStorage.length>0){
				// vm.hasMail = true
			};
			if(localStorage.length>0){
				var user = JSON.parse(localStorage.profile)
				vm.name = user.given_name
				vm.picture = user.picture

				if(facebook.test(user.user_id)){
					fbUserId = user.user_id.match(numberPattern)[0];
					vm.picture = 'http://graph.facebook.com/'+ fbUserId +'/picture?type=large'
				}
			}
			vm.goToMail = function(){
				console.log('in here???');
				
				location.href = '/mailbox'
			}

			vm.logout = function(){
				localStorage.clear()
				location.href = '/home';
			}
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
			var vm = this, fbUserId, facebook = /^(facebook)/, numberPattern = /\d+/g;
			vm.user = user.data;
			vm.user_id = JSON.parse(localStorage.profile).user_id;
			vm.navpicture = JSON.parse(localStorage.profile).picture;
			vm.name = JSON.parse(localStorage.profile).given_name;

			if(vm.user.display_name==null||vm.user.display_name==undefined){
				vm.user.display_name = ''
			};
			if(vm.user.zip_code==null){
				vm.user.zip_code = ' '
			};
			if(vm.user.bio===null){
				vm.user.bio = ' '
			};
			if(facebook.test(vm.user_id)){
				fbUserId = vm.user_id.match(numberPattern)[0];
				vm.navpicture = 'http://graph.facebook.com/'+ fbUserId +'/picture?type=large'
			};
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
			};
		};
//~~~~~~CODING POSTS CONTROLLER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		function CodingPostsController($scope, CodingPostService,CodingPostCommentsService,UsersService,posts,$location,$route, NgMap, codingMail, codingHistory, $timeout, $rootScope, CodingPostConversationsService){
			
			var vm = this, span, area, cursor;

			vm.showVid = vm.showCommentInput = vm.convoBegun = vm.showOwl = true;
			vm.showMap = vm.showChat = vm.toggleView = vm.toggleResponseView =
			vm.showText = vm.waitingResponse = vm.showResponses = vm.test = 
			vm.theyResponded = vm.showCrickets = vm.responsesNeedCleanup = 
			vm.loggedIn = false;
			vm.currentUser = false;
			vm.convoArea = false;
			vm.tempIndex = false;
			vm.posts = posts.data;
			vm.backButton = 'home'
			vm.leftPanel = 'CONNECT'
			vm.responses; 
			vm.rightColumnHeader = 'PROXIMITY';
			vm.leftWidth = 50;
			vm.showLoginToRespond = true;
			vm.showResponse = null;

			if($(window).width() < 1200){
				vm.leftWidth = 100;
				vm.showOwl = false;
			}

			if(localStorage.length > 0){
				vm.loggedIn = true
			};

			vm.myTrackingFunction = function(post){
				//some code to put the logged-in user's posts at the top
			}
			//this gets around the issue of facebook profile pic URLs expiring
			posts.data.length && posts.data.forEach(function(i){
				var facebook = /^(facebook)/,
					numberPattern = /\d+/g,
					fbUserId;
				if(facebook.test(i.third_party_user_id)){
					fbUserId = i.third_party_user_id.match(numberPattern)[0];
					i.user_pic = 'http://graph.facebook.com/'+ fbUserId +'/picture?type=large'
				}
			});

			// document.body.onkeydown = function (e) {
			// 	// alert(String.fromCharCode(e.keyCode) + " --> " + e.keyCode);
			// 	if (String.fromCharCode(e.keyCode).toLowerCase() === 'p'){
			// 		console.log('triggering');
			// 		vm.convo = true;
			// 		$scope.$digest()
			// 	}
			// };


		  	vm.goBack = function(){
	  		 if(localStorage.length === 0){
	  			$location.path('/home')
	  		 }
	  		 else if (localStorage.length>0 && vm.backButton === 'home'){
	  			$location.path('/loggedinHome')	
	  		 } else if (localStorage.length>0 && vm.backButton === 'codingIndex'){
	  			vm.show(vm.tempIndex)
	  			vm.backButton = 'home'	
	  		 };
		  	};
			 vm.show = function(idx){
		  	 vm.tempIndex = idx;
	  		 vm.toggleView = !vm.toggleView;
	  		 vm.showText = !vm.showText;
			   vm.showVid = !vm.showVid;
			 vm.comment = {};

	  		 var selected = Array.from(document.querySelectorAll('md-list-item')).filter((v,i) => i == idx),
	  		 	 others = Array.from(document.querySelectorAll('md-list-item')).filter((v,i) => i !== idx);

	  		 	if(vm.toggleView === true){
					   console.log('in here coding', localStorage);
					if (localStorage.length) {
						vm.showLoginToRespond = false;
					} else {
						vm.showCommentInput = false;
					}
				  vm.backButton = 'codingIndex';
				  if(vm.leftWidth === 50){
				  	vm.leftWidth = 100;
				  	vm.showOwl = false;
				  };
		  		  selected[0].classList.add('focus')	  	;	
		  		  others.forEach(function(i){i.style.display = 'none'});
    		  	  if(localStorage.length > 0 && posts.data[idx].third_party_user_id === JSON.parse(localStorage.profile).user_id){
  			  	    vm.showResponses = true;
  			  	    vm.showCommentInput = false;
  			  	    vm.leftPanel = 'RESPONSES';
  			  	    vm.responses = codingMail.data.filter((v,i) => codingMail.data[i].framework === posts.data[idx].framework);
  			  	    vm.responses.forEach(function(i){
  			  	    	let facebook = /^(facebook)/,
  			  	    		numberPattern = /\d+/g,
  			  	    		fbUserId;
  			  	    	if(facebook.test(i.user_id)){
  			  	    		fbUserId = i.user_id.match(numberPattern)[0];
  			  	    		i.user_pic = 'http://graph.facebook.com/'+ fbUserId +'/picture?type=large'
  			  	    	};
  			  	    });
  			  	    if(!vm.responses.length){
  			  	    	vm.showCrickets = true;
  			  	    };
  			  	    vm.showResponse = function(index, response){
  			  	    	vm.responsesNeedCleanup = true;
  			  	    	vm.toggleResponseView = !vm.toggleResponseView;
  			  	    	let convoStarted = false,
  			  	    	    responseContainer = Array.from(document.querySelectorAll('.messageContainer')).filter((v, i) => v.dataset.parentidx === idx.toString()),
  			  	    		selectedResponse = Array.from(document.querySelectorAll('.responses')).filter((v, i) => v.dataset.userid === response.user_id && v.dataset.comment === response.comment),
  			  	    		nonselectedResponses = Array.from(document.querySelectorAll('.responses')).filter((v, i) => v.dataset.comment !== response.comment),
  			  	    		responseHeader = selectedResponse[idx].parentElement.children[0],
  			  	    		conversationArea = selectedResponse[idx].parentElement.children[1],
  			  	    	    req = {post: vm.msg};
  			  	    	CodingPostConversationsService.getConvos(vm.responses[index].id).then(function(res){
								console.log('RES is ', res);
									
								
  			  	    		if(!res.data.length){
		  			  	    	if(vm.toggleResponseView){
										vm.convoArea = index;	
								console.log('convo is ', vm.convoArea);

		  			  	    		nonselectedResponses.forEach(function(i){i.style.display = 'none'});
		  			  	    		
		  			  	    		// conversationArea.style.height = responseContainer[0].clientHeight + 'px';
		  			  	    		// if(selectedResponse[idx].parentElement.classList.contains('odd2')){
		  			  	    		// 	conversationArea.style.background = '#ccceff';
		  			  	    		// } else {conversationArea.style.background = '#E6FFCC'};

		  			  	    		// let beginConvoButton = document.createElement('div');
		  			  	    		// beginConvoButton.style.width = '100%;';
		  			  	    		// beginConvoButton.style.backgroundColor = '#beed90';
		  			  	    		// beginConvoButton.style.margin = '5px';
		  			  	    		// beginConvoButton.style.height = '60px';
		  			  	    		// beginConvoButton.style.textAlign = 'center';
		  			  	    		// beginConvoButton.style.paddingTop = '15px';
		  			  	    		// beginConvoButton.style.marginLeft = '55px';
		  			  	    		// beginConvoButton.style.marginRight = '55px';
		  			  	    		// beginConvoButton.innerHTML = 'Begin Conversation';
		  			  	    		// conversationArea.appendChild(beginConvoButton);
		  			  	    		// beginConvoButton.onmouseenter = function(){beginConvoButton.style.backgroundColor = '#a7d37a'};
		  			  	    		// beginConvoButton.onmouseleave = function(){beginConvoButton.style.backgroundColor = '#beed90'};
		  			  	    		// beginConvoButton.onmousedown = function(){
		  			  	    		// 	beginConvoButton.style.backgroundColor = '#ffffff';
		  			  	    		// 	vm.convoBegun = true;
		  			  	    		// 	vm.showMap = false;
		  			  	    		// 	vm.showChat = true;
		  			  	    		// 	let li = document.createElement('li'),
		  			  	    		// 	response = vm.responses[index];
		  			  	    		// 	li.innerHTML = response.display_name + ':  &nbsp;' + response.comment;
		  			  	    		// 	var chatbox = document.getElementsByClassName('chatboxText')[idx];
		  			  	    		// 	chatbox.appendChild(li);
		  			  	    		// };
		  			  	    		//CREATING CONVO MESSGAE
		  			  	    		vm.msg = {};
		  			  	    		vm.codingPostConversation = function(message){
		  			  	    			 vm.msg.user_id = JSON.parse(localStorage.profile).user_id;
		  			  	    			 vm.msg.coding_post_id = vm.posts[idx].id;
		  			  	    			 vm.msg.first_comment_id = vm.responses[index].id;

			  	    			   		var req = {post: vm.msg};
			  	    			   		CodingPostConversationsService.createMessage(req).then(function(res){
	  		  	    			   			var newLi2 = document.createElement('li');
	  		  	    			   				msg = res.data[0].message;
		  		  	    			   		newLi2.innerHTML = 'You:  &nbsp;' + msg;
		  		  	    			   		var chatbox = document.getElementsByClassName('chatboxText')[idx];
		  			  	    				chatbox.appendChild(newLi2);
		  			  	    				vm.msg.message = '';
		  			  	    				conversationArea.removeChild(beginConvoButton)
			  	    			   		}, vm);
		  			  	    		}
		  			  	    	} else {
			  			  	    		nonselectedResponses.forEach(function(i){i.style.display = 'block'})
			  			  	    		vm.convoArea = false;
			  			  	    		var chatbox = document.getElementsByClassName('chatboxText')[idx]
			  			  	    		chatbox.innerHTML = ''
			  			  	    		vm.showMap = true;
			  			  	    		vm.showChat = false;
			  			  	    		// var convoAreas = Array.from(document.getElementsByClassName('conversationArea'));
			  			  	    		// convoAreas.forEach(function(e){ e.innerHTML = '' });
			  			  	    } 
  			  	    		} else {
  			  	    			vm.convoBegun = true;
  			  	    			if(vm.toggleResponseView){
	  			  	    			nonselectedResponses.forEach(function(i){i.style.display = 'none'})
	  			  	    			conversationArea.style.height = responseContainer[0].clientHeight + 'px'
	  			  	    			var mapContainers = document.getElementsByClassName('mapContainer')
	  			  	    				mapContainers[idx].classList.remove('animated','slideInRight');
	  			  	    				mapContainers[idx].classList.add('animated', 'slideOutRight');

	  			  	    			vm.showMap = false;
	  			  	    			vm.showChat = true;
	  			  	    			var li = document.createElement('li'),
	  			  	    			response = vm.responses[index];

	  			  	    			li.innerHTML = response.display_name + ':  &nbsp;' + response.comment

	  			  	    			var chatbox = document.getElementsByClassName('chatboxText')[idx];
	  			  	    			chatbox.innerHTML = '';
	  			  	    			chatbox.appendChild(li);

	  			  	    			res.data.forEach(function(v){
	  			  	    				var newLi = document.createElement('li'),
	  			  	    				    msg = v.message, name;
	  			  	    				if(v.user_id === JSON.parse(localStorage.profile).user_id){
	  			  	    					name = 'You';
	  			  	    				} else {
	  			  	    					name = response.display_name
	  			  	    				};
	  			  	    				newLi.innerHTML = name + ':  &nbsp;' + msg;
	  			  	    				chatbox.appendChild(newLi);
				    		  	  	});
	  	  			  	    		vm.msg = {};
	  	  			  	    		vm.codingPostConversation = function(message){
	  	  			  	    			 vm.msg.user_id = JSON.parse(localStorage.profile).user_id;
	  	  			  	    			 vm.msg.coding_post_id = vm.posts[idx].id;
	  	  			  	    			 vm.msg.first_comment_id = vm.responses[index].id;

	  		  	    			   		var req = {post: vm.msg};
	  		  	    			   		CodingPostConversationsService.createMessage(req).then(function(res){
	  		  	    			   			var newLi2 = document.createElement('li');
	  		  	    			   				msg = res.data[0].message;
		  		  	    			   		newLi2.innerHTML = 'You:  &nbsp;' + msg;
		  			  	    				chatbox.appendChild(newLi2);
		  			  	    				vm.msg.message = '';
	  		  	    			   		}, vm);
	  	  			  	    		};
  			  	    			} else {
  			  	    				var mapContainers = document.getElementsByClassName('mapContainer')
  			  	    					mapContainers[idx].classList.remove('animated','slideOutRight');
  			  	    					mapContainers[idx].classList.add('animated', 'slideInRight');

  			  	    				nonselectedResponses.forEach(function(i){i.style.display = 'block'})
  			  	    				// var chatbox = document.getElementsByClassName('chatboxText')[idx]
  			  	    				// chatbox.innerHTML = '';
  			  	    				vm.showMap = true;
  			  	    				vm.showChat = false;
  			  	    				// var convoAreas = Array.from(document.getElementsByClassName('conversationArea'));
  			  	    				// convoAreas.forEach(function(e){ e.innerHTML = '' });
  			  	    			};
  			  	    		}
  			  	    	}, vm);
  			  	    }
    		  	  } else {
    		  	    vm.history = {};
					vm.history.comment;
						 
    		  	  	codingHistory && codingHistory.data.forEach(function(v){
						//If you have already commented on this post, display waiting message
    		  	  		if(v.post_id === posts.data[idx].id){
    		  	  			vm.showCommentInput = false;
    		  	  			vm.waitingResponse = true;
    		  	  			vm.history.comment = v.comment;
    		  	  			var yourCommentMsg = v.comment;
    		  	  			CodingPostConversationsService.getConvos(v.id).then(function(res){
								//If they responded, show chat box
    		  	  				if(res.data.length){
									let chatbox;
    		  	  					vm.waitingResponse = false;
	  			  	    			vm.showChat = true;
    		  	  					vm.showCommentInput = false;
    		  	  					vm.theyResponded = true;
									vm.rightColumnHeader = 'CONVERSATION';	
    		  	  					chatbox = document.getElementsByClassName('chatboxText')[idx],
    		  	  						yourComment = document.createElement('li');
    		  	  					chatbox.innerHTML = '';
    		  	  					yourComment.innerHTML = 'You: &nbsp;' + yourCommentMsg;
    		  	  					chatbox.appendChild(yourComment);
	  			  	    			res.data.forEach(function(v){
	  			  	    				var newLi = document.createElement('li'),
	  			  	    				    msg = v.message, name;
	  			  	    				if(v.user_id === JSON.parse(localStorage.profile).user_id){
	  			  	    					name = 'You';
	  			  	    				} else {
	  			  	    					name = posts.data[idx].display_name
	  			  	    				};
	  			  	    				newLi.innerHTML = name + ':  &nbsp;' + msg;
	  			  	    				chatbox.appendChild(newLi);
				    		  	  	})
	  			  	    			//CREATING CONVO MESSGAE
		  			  	    		vm.msg = {};
		  			  	    		vm.codingPostConversation = function(message){
		  			  	    			 vm.msg.user_id = JSON.parse(localStorage.profile).user_id;
		  			  	    			 vm.msg.coding_post_id = vm.posts[idx].id;
		  			  	    			 vm.msg.first_comment_id = v.id;
			  	    			   		var req = {post: vm.msg};
			  	    			   		CodingPostConversationsService.createMessage(req).then(function(res){
	  		  	    			   			var newLi2 = document.createElement('li');
	  		  	    			   				msg = res.data[0].message;
		  		  	    			   		newLi2.innerHTML = 'You:  &nbsp;' + msg;
		  		  	    			   		var chatbox = document.getElementsByClassName('chatboxText')[idx];
		  			  	    				chatbox.appendChild(newLi2);
		  			  	    				vm.msg.message = '';
			  	    			   		}, vm);
		  			  	    		};
    		  	  				};
    		  	  			}, vm);
    		  	  		}
    		  	  	}) 
    		  	  };
  		 		  $timeout(function() {
  		 		  	if(vm.showChat){
  		 		  		return
  		 		  	}
	  		 		vm.showMap = true;
	  		 		myArrayFromNodeList = Array.from(document.querySelectorAll('md-input-container'))
	  		 		myArrayFromNodeList.forEach(function (e){
	  		 			e.classList.remove('md-input-invalid')
	  		 			e.classList.remove('md-input-focused')
	  		 			e.classList.remove('md-input-has-value')
	  		 		});
	  		 	  }, 500);
		  		};
		  		if(vm.toggleView === false){
					vm.showCommentInput = true;
					vm.theyResponded = vm.waitingResponse = 
					vm.showResponses = vm.showMap = vm.showChat = 
					vm.showCrickets = false;

					vm.backButton = 'home';
					vm.rightColumnHeader = 'PROXIMITY'
		  			vm.leftPanel = 'CONNECT';
					expandingNodes = Array.from(document.querySelectorAll('.expandingAreaactive')),
	  				fakeSpans = Array.from(document.querySelectorAll('#fakespan')),
	  				textAreas = Array.from(document.querySelectorAll('textarea')),
	  				containers = Array.from(document.querySelectorAll('.messageContainer')),		  		
	  				convoAreas = Array.from(document.getElementsByClassName('conversationArea'));

  			  	    if($(window).width() > 1200){
  			  	    	vm.leftWidth = 50;
  			  	    	vm.showOwl = true;
  			  	    };
		  			// convoAreas.forEach(function(e){ e.innerHTML = '' })
		  			others.forEach(function(i){i.style.display = 'block'});
		  			if(vm.responsesNeedCleanup){
		  				Array.from(document.querySelectorAll('.responses')).forEach(function(i){i.style.display = 'block'})
		  				vm.responsesNeedCleanup = false;
		  				vm.toggleResponseView = false;
		  				vm.convo = null;
		  			};
		  			selected[0].classList.remove('focus');	
		  			expandingNodes.forEach(function (e){e.className = "expandingArea"});
		  		 	fakeSpans.forEach(function (e){e.textContent = ''});
		  		 	textAreas.forEach(function (e){e.value = ''});
		  		};
		  	}

		  	vm.removePost = function(id){
	  		 CodingPostService.deletePost(id).then(function(){
	  			$route.reload();
	  		 });
		  	}

  		  	vm.checkId = function(post){
	  		  return localStorage.length > 0 && post.third_party_user_id === JSON.parse(localStorage.profile).user_id ? true : false
		  	}

		  	var map;
		  	vm.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtNoaazwyeqMuiXN9zNkWAW8y-WdCGp40&v=3&";	
		  	x = NgMap.getMap('map');
		  	vm.comment = {};
		  	vm.addCodingPostComment = function(id,newCodingPostComment){
		  		vm.comment.user_id = JSON.parse(localStorage.profile).user_id
				  vm.comment.post_id = id;
				  vm.comment.category = 'coding';
		  		var req = {post: newCodingPostComment};
		  		CodingPostCommentsService.createPost(req).then(function(res){
					codingHistory.data.push(res.data[0])
		  			vm.show(vm.tempIndex)
		  		}, vm)
		  	};
		};
		function NewCodingPostController(CodingPostService,UsersService,$location,store){
			var vm = this;
			vm.post = {};
			document.getElementsByClassName('newPostTopicArea')[0].focus();
			vm.goBackToCodingIndex = function(){
				$location.path('/codingPosts')
			}
			vm.post.user_id = JSON.parse(localStorage.profile).user_id;

			vm.addCodingPost = function(newCodingPost){
				console.log('creating coding post: ', newCodingPost);
				
				var req = {post: newCodingPost};
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
	function MusicPostsController(MusicPostService, MusicPostCommentsService, UsersService,posts,$location, $route, NgMap, musicMail, musicHistory, $timeout, $rootScope, MusicPostConversationsService) {

		var vm = this, span, area, cursor;

		vm.showVid = vm.showCommentInput = vm.convoBegun = vm.showOwl = true;
		vm.showMap = vm.showChat = vm.toggleView = vm.toggleResponseView =
		vm.showText = vm.waitingResponse = vm.showResponses = vm.test =
		vm.theyResponded = vm.showCrickets = vm.responsesNeedCleanup =
		vm.loggedIn = vm.currentUser = vm.convo = vm.tempIndex = false;
		vm.posts = posts.data;
		vm.backButton = 'home'
		vm.leftPanel = 'CONNECT'
		vm.responses;
		vm.rightColumnHeader = 'PROXIMITY';
		vm.leftWidth = 50;
		vm.postWidth = 100;
		vm.testHeight = '800px';
		vm.showLoginToRespond = true;
		
		console.log('musicHistory is ', musicHistory);
		

		if ($(window).width() < 1200) {
			vm.leftWidth = 100;
			vm.showOwl = false;
		}
		if (localStorage.length > 0) {
			vm.loggedIn = true
		};
		vm.myTrackingFunction = function (post) {
			//some code to put the logged-in user's posts at the top
		}
		posts.data.length && posts.data.forEach(function (i) {
			var facebook = /^(facebook)/,
				numberPattern = /\d+/g,
				fbUserId;
			if (facebook.test(i.third_party_user_id)) {
				fbUserId = i.third_party_user_id.match(numberPattern)[0];
				i.user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
			}
		});
		vm.goBack = function () {
			if (localStorage.length === 0) {
				$location.path('/home')
			}
			else if (localStorage.length > 0 && vm.backButton === 'home') {
				$location.path('/loggedinHome')
			} else if (localStorage.length > 0 && vm.backButton === 'musicIndex') {
				vm.show(vm.tempIndex)
				vm.backButton = 'home'
			};
		};
		vm.show = function (idx) {
			vm.tempIndex = idx;
			vm.toggleView = !vm.toggleView;
			vm.showText = !vm.showText;
			vm.showVid = !vm.showVid;
			vm.comment = {};
			// console.log('uhh ', document.querySelectorAll('.main-post-row'));
			
			var selected = Array.from(document.querySelectorAll('md-list-item')).filter((v, i) => i == idx),
			others = Array.from(document.querySelectorAll('md-list-item')).filter((v, i) => i !== idx);
			
			if(vm.toggleView === true) {
				if (localStorage.length) {
					vm.showLoginToRespond = false;
				} else {
					vm.showCommentInput = false;
				}
				console.log('yo. mapcontaioner is ', document.getElementsByClassName('mapContainer')[idx]);
				vm.postWidth = 50;
				vm.backButton = 'musicIndex';
				if (vm.leftWidth === 50) {
					vm.leftWidth = 100;
					vm.showOwl = false;
				};
				selected[0].classList.add('focus');				
				others.forEach(function (i) { i.style.display = 'none' });
				if (localStorage.length > 0 && posts.data[idx].third_party_user_id === JSON.parse(localStorage.profile).user_id) {
					vm.showResponses = true;
					vm.showCommentInput = false;
					vm.leftPanel = 'RESPONSES'
					vm.responses = musicMail.data.filter((v, i) => musicMail.data[i].framework === posts.data[idx].framework);
					vm.responses.forEach(function (i) {
						var facebook = /^(facebook)/,
							numberPattern = /\d+/g,
							fbUserId;
						if (facebook.test(i.user_id)) {
							fbUserId = i.user_id.match(numberPattern)[0];
							i.user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
						};
					});
					if (!vm.responses.length) {
						vm.showCrickets = true;
					};
					vm.showResponse = function (index, response) {
						vm.responsesNeedCleanup = true;
						vm.toggleResponseView = !vm.toggleResponseView;
						var convoStarted = false,
							responseContainer = Array.from(document.querySelectorAll('.messageContainer')).filter((v, i) => v.dataset.parentidx === idx.toString()),
							selectedResponse = Array.from(document.querySelectorAll('.responses')).filter((v, i) => v.dataset.userid === response.user_id && v.dataset.comment === response.comment),
							nonselectedResponses = Array.from(document.querySelectorAll('.responses')).filter((v, i) => v.dataset.comment !== response.comment),
							responseHeader = selectedResponse[idx].parentElement.children[0],
							conversationArea = selectedResponse[idx].parentElement.children[1],
							req = { post: vm.msg };
						MusicPostConversationsService.getConvos(vm.responses[index].id).then(function (res) {
							if (!res.data.length) {
								if (vm.toggleResponseView) {
									// nonselectedResponses.forEach(function (i) { i.style.display = 'none' });
									// vm.convo = index;



									
									// conversationArea.style.height = responseContainer[0].clientHeight + 'px';
									// if (selectedResponse[idx].parentElement.classList.contains('odd2')) {
									// 	conversationArea.style.background = '#ccceff';
									// } else { conversationArea.style.background = '#E6FFCC' };

									// var beginConvoButton = document.createElement('div');
									// beginConvoButton.style.width = '100%;';
									// beginConvoButton.style.backgroundColor = '#beed90';
									// beginConvoButton.style.margin = '5px';
									// beginConvoButton.style.height = '60px';
									// beginConvoButton.style.textAlign = 'center';
									// beginConvoButton.style.paddingTop = '15px';
									// beginConvoButton.style.marginLeft = '55px';
									// beginConvoButton.style.marginRight = '55px';
									// beginConvoButton.innerHTML = 'Begin Conversation';
									// conversationArea.appendChild(beginConvoButton);
									// beginConvoButton.onmouseenter = function () { beginConvoButton.style.backgroundColor = '#a7d37a' };
									// beginConvoButton.onmouseleave = function () { beginConvoButton.style.backgroundColor = '#beed90' };
									// beginConvoButton.onmousedown = function () {
									// 	beginConvoButton.style.backgroundColor = '#ffffff';
									// 	vm.convoBegun = true;
									// 	vm.showMap = false;
									// 	vm.showChat = true;
									// 	var li = document.createElement('li'),
									// 		response = vm.responses[index];
									// 	li.innerHTML = response.display_name + ':  &nbsp;' + response.comment;
									// 	var chatbox = document.getElementsByClassName('chatboxText')[idx];
									// 	chatbox.appendChild(li);
									// };

									//CREATING CONVO MESSAGE
									// vm.msg = {};
									// vm.musicPostConversation = function (message) {
									// 	vm.msg.user_id = JSON.parse(localStorage.profile).user_id;
									// 	vm.msg.music_post_id = vm.posts[idx].id;
									// 	vm.msg.first_comment_id = vm.responses[index].id;

									// 	var req = { post: vm.msg };
									// 	MusicPostConversationsService.createMessage(req).then(function (res) {
									// 		var newLi2 = document.createElement('li');
									// 		msg = res.data[0].message;
									// 		newLi2.innerHTML = 'You:  &nbsp;' + msg;
									// 		var chatbox = document.getElementsByClassName('chatboxText')[idx];
									// 		chatbox.appendChild(newLi2);
									// 		vm.msg.message = '';
									// 		conversationArea.removeChild(beginConvoButton)
									// 	}, vm);
									// };
								} else {
									nonselectedResponses.forEach(function (i) { i.style.display = 'block' })
									vm.convo = null;
									var chatbox = document.getElementsByClassName('chatboxText')[idx]
									chatbox.innerHTML = ''
									vm.showMap = true;
									vm.showChat = false;
									var convoAreas = Array.from(document.getElementsByClassName('conversationArea'));
									convoAreas.forEach(function (e) { e.innerHTML = '' });

									
								}
							} else {
								vm.convoBegun = true;
								if (vm.toggleResponseView) {
									nonselectedResponses.forEach(function (i) { i.style.display = 'none' })
									conversationArea.style.height = responseContainer[0].clientHeight + 'px'
									var mapContainers = document.getElementsByClassName('mapContainer')
									mapContainers[idx].classList.remove('animated', 'slideInRight');
									mapContainers[idx].classList.add('animated', 'slideOutRight');
									
									
									vm.showMap = false;
									vm.showChat = true;
									var li = document.createElement('li'),
										response = vm.responses[index];

									li.innerHTML = response.display_name + ':  &nbsp;' + response.comment

									var chatbox = document.getElementsByClassName('chatboxText')[idx];
									chatbox.innerHTML = '';
									chatbox.appendChild(li);

									res.data.forEach(function (v) {
										var newLi = document.createElement('li'),
											msg = v.message, name;
										if (v.user_id === JSON.parse(localStorage.profile).user_id) {
											name = 'You';
										} else {
											name = response.display_name
										};
										newLi.innerHTML = name + ':  &nbsp;' + msg;
										chatbox.appendChild(newLi);
									});
									vm.msg = {};
									vm.musicPostConversation = function (message) {
										vm.msg.user_id = JSON.parse(localStorage.profile).user_id;
										vm.msg.music_post_id = vm.posts[idx].id;
										vm.msg.first_comment_id = vm.responses[index].id;

										var req = { post: vm.msg };
										MusicPostConversationsService.createMessage(req).then(function (res) {
											var newLi2 = document.createElement('li');
											msg = res.data[0].message;
											newLi2.innerHTML = 'You:  &nbsp;' + msg;
											chatbox.appendChild(newLi2);
											vm.msg.message = '';
										}, vm);
									};
								} else {
									var mapContainers = document.getElementsByClassName('mapContainer')
									mapContainers[idx].classList.remove('animated', 'slideOutRight');
									mapContainers[idx].classList.add('animated', 'slideInRight');

									nonselectedResponses.forEach(function (i) { i.style.display = 'block' })
									vm.convo = null;
									var chatbox = document.getElementsByClassName('chatboxText')[idx]
									chatbox.innerHTML = '';
									vm.showMap = true;
									vm.showChat = false;
									var convoAreas = Array.from(document.getElementsByClassName('conversationArea'));
									convoAreas.forEach(function (e) { e.innerHTML = '' });
								};
							}
						}, vm);
					}
				} else {
					vm.history = {};
					vm.history.comment;
					musicHistory && musicHistory.data.forEach(function (v) {
						//If you have already commented on this post, display waiting message
						if (v.post_id === posts.data[idx].id) {
							vm.showCommentInput = false;
							vm.waitingResponse = true;
							vm.history.comment = v.comment;
							var yourCommentMsg = v.comment;
							MusicPostConversationsService.getConvos(v.id).then(function (res) {
								//If they responded, show chat box
								if (res.data.length) {
									let chatbox;
									vm.waitingResponse = false;
									vm.showChat = true;
									vm.showCommentInput = false;
									vm.theyResponded = true;
									vm.rightColumnHeader = 'CONVERSATION';
									chatbox = document.getElementsByClassName('chatboxText')[idx],
										yourComment = document.createElement('li');
									chatbox.innerHTML = '';
									yourComment.innerHTML = 'You: &nbsp;' + yourCommentMsg;
									chatbox.appendChild(yourComment);
									res.data.forEach(function (v) {
										var newLi = document.createElement('li'),
											msg = v.message, name;
										if (v.user_id === JSON.parse(localStorage.profile).user_id) {
											name = 'You';
										} else {
											name = posts.data[idx].display_name
										};
										newLi.innerHTML = name + ':  &nbsp;' + msg;
										chatbox.appendChild(newLi);
									})
									//CREATING CONVO MESSGAE
									vm.msg = {};
									vm.musicPostConversation = function (message) {
										vm.msg.user_id = JSON.parse(localStorage.profile).user_id;
										vm.msg.music_post_id = vm.posts[idx].id;
										vm.msg.first_comment_id = v.id;
										var req = { post: vm.msg };
										MusicPostConversationsService.createMessage(req).then(function (res) {
											var newLi2 = document.createElement('li');
											msg = res.data[0].message;
											newLi2.innerHTML = 'You:  &nbsp;' + msg;
											var chatbox = document.getElementsByClassName('chatboxText')[idx];
											chatbox.appendChild(newLi2);
											vm.msg.message = '';
										}, vm);
									};
								};
							}, vm);
						}
					})
				};
				$timeout(function () {
					if (vm.showChat) {
						return
					}
					console.log('IN HERE');
					
					vm.showMap = true;
					myArrayFromNodeList = Array.from(document.querySelectorAll('md-input-container'))
					myArrayFromNodeList.forEach(function (e) {
						e.classList.remove('md-input-invalid')
						e.classList.remove('md-input-focused')
						e.classList.remove('md-input-has-value')
					});
				}, 500);
			};
			if (vm.toggleView === false) {
				vm.postWidth = 100;
				vm.showCommentInput = true;
				vm.theyResponded = vm.waitingResponse =
					vm.showResponses = vm.showMap = vm.showChat =
					vm.showCrickets = false;

				vm.backButton = 'home';
				vm.rightColumnHeader = 'PROXIMITY'
				vm.leftPanel = 'CONNECT';
				expandingNodes = Array.from(document.querySelectorAll('.expandingAreaactive')),
					fakeSpans = Array.from(document.querySelectorAll('#fakespan')),
					textAreas = Array.from(document.querySelectorAll('textarea')),
					containers = Array.from(document.querySelectorAll('.messageContainer')),
					convoAreas = Array.from(document.getElementsByClassName('conversationArea'));

				if ($(window).width() > 1200) {
					vm.leftWidth = 50;
					vm.showOwl = true;
				};
				convoAreas.forEach(function (e) { e.innerHTML = '' })
				others.forEach(function (i) { i.style.display = 'block' });
				if (vm.responsesNeedCleanup) {
					Array.from(document.querySelectorAll('.responses')).forEach(function (i) { i.style.display = 'block' })
					vm.responsesNeedCleanup = false;
					vm.toggleResponseView = false;
					vm.convo = null;
				};
				selected[0].classList.remove('focus');
				expandingNodes.forEach(function (e) { e.className = "expandingArea" });
				fakeSpans.forEach(function (e) { e.textContent = '' });
				textAreas.forEach(function (e) { e.value = '' });
			};
		}

		vm.removePost = function (id) {
			MusicPostService.deletePost(id).then(function () {
				$route.reload();
			});
		}

		vm.checkId = function (post) {
			return localStorage.length > 0 && post.third_party_user_id === JSON.parse(localStorage.profile).user_id ? true : false
		}

		var map;
		vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBtNoaazwyeqMuiXN9zNkWAW8y-WdCGp40&v=3&";
		x = NgMap.getMap('map');
		vm.comment = {};
		vm.addMusicPostComment = function (id, newMusicPostComment) {
			vm.comment.user_id = JSON.parse(localStorage.profile).user_id
			vm.comment.post_id = id;
			vm.comment.category = 'music';
			var req = { post: newMusicPostComment };
			MusicPostCommentsService.createPost(req).then(function (res) {
				musicHistory.data.push(res.data[0])
				vm.show(vm.tempIndex)
			}, vm)
		};
	};

		function NewMusicPostController(MusicPostService,UsersService,$location,store){
			var vm = this;
			vm.post = {};
			vm.post.user_id = JSON.parse(localStorage.profile).user_id

			// document.getElementsByClassName('newPostTopicArea')[0].focus();

			function paperInput($templateCache) {
				function linkFn(scope, element, attrs) {
				}
				return {
					template: $templateCache.get('paperInput'),
					scope: {
						label: '@',
						type: '@',
						modelRef: '='
					}
				}
			}

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
	function FilmPostsController(FilmPostService, FilmPostCommentsService, UsersService, posts, $location, $route, NgMap, filmMail, filmHistory, $timeout, $rootScope, FilmPostConversationsService) {
		var vm = this, span, area, cursor;

		vm.showVid = vm.showCommentInput = vm.convoBegun = vm.showOwl = true;
		vm.showMap = vm.showChat = vm.toggleView = vm.toggleResponseView =
		vm.showText = vm.waitingResponse = vm.showResponses = vm.test =
		vm.theyResponded = vm.showCrickets = vm.responsesNeedCleanup =
		vm.loggedIn = vm.currentUser = vm.convo = vm.tempIndex = false;
		vm.posts = posts.data;
		vm.backButton = 'home'
		vm.leftPanel = 'CONNECT'
		vm.responses;
		vm.rightColumnHeader = 'PROXIMITY';
		vm.leftWidth = 50;
		vm.comment = {};
		vm.showLoginToRespond = true;

		if ($(window).width() < 1200) {
			vm.leftWidth = 100;
			vm.showOwl = false;
		}

		if (localStorage.length > 0) {
			vm.loggedIn = true
		};

		vm.myTrackingFunction = function (post) {
			//some code to put the logged-in user's posts at the top
		}
		//this gets around the issue of facebook profile pic URLs expiring
		posts.data.length && posts.data.forEach(function (i) {
			var facebook = /^(facebook)/,
				numberPattern = /\d+/g,
				fbUserId;
			if (facebook.test(i.third_party_user_id)) {
				fbUserId = i.third_party_user_id.match(numberPattern)[0];
				i.user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
			}
		});
		vm.goBack = function () {
			if (localStorage.length === 0) {
				$location.path('/home')
			}
			else if (localStorage.length > 0 && vm.backButton === 'home') {
				$location.path('/loggedinHome')
			} else if (localStorage.length > 0 && vm.backButton === 'filmIndex') {
				vm.show(vm.tempIndex)
				vm.backButton = 'home'
			};
		};
		vm.show = function (idx) {
			vm.tempIndex = idx;
			vm.toggleView = !vm.toggleView;
			vm.showText = !vm.showText;
			vm.showVid = !vm.showVid;
			vm.comment = {};

			var selected = Array.from(document.querySelectorAll('md-list-item')).filter((v, i) => i == idx),
				others = Array.from(document.querySelectorAll('md-list-item')).filter((v, i) => i !== idx);

			if (vm.toggleView === true) {
				if(localStorage.length){
					vm.showLoginToRespond = false;
				} else {
					vm.showCommentInput = false;
				}
				console.log('toggleView is true');
				
				vm.backButton = 'filmIndex';
				if (vm.leftWidth === 50) {
					vm.leftWidth = 100;
					vm.showOwl = false;
				};
				selected[0].classList.add('focus');
				others.forEach(function (i) { i.style.display = 'none' });
				if (localStorage.length > 0 && posts.data[idx].third_party_user_id === JSON.parse(localStorage.profile).user_id) {
					vm.showResponses = true;
					vm.showCommentInput = false;
					vm.leftPanel = 'RESPONSES';
					vm.responses = filmMail.data.filter((v, i) => filmMail.data[i].framework === posts.data[idx].framework);
					vm.responses.forEach(function (i) {
						var facebook = /^(facebook)/,
							numberPattern = /\d+/g,
							fbUserId;
						if (facebook.test(i.user_id)) {
							fbUserId = i.user_id.match(numberPattern)[0];
							i.user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
						};
					});
					if (!vm.responses.length) {
						vm.showCrickets = true;
					};
					vm.showResponse = function (index, response) {
						vm.responsesNeedCleanup = true;
						vm.toggleResponseView = !vm.toggleResponseView;

						var convoStarted = false,
						responseContainer = Array.from(document.querySelectorAll('.messageContainer')).filter((v, i) => v.dataset.parentidx === idx.toString()),
						selectedResponse = Array.from(document.querySelectorAll('.responses')).filter((v, i) => v.dataset.userid === response.user_id && v.dataset.comment === response.comment),
						nonselectedResponses = Array.from(document.querySelectorAll('.responses')).filter((v, i) => v.dataset.comment !== response.comment);
						var responseHeader = selectedResponse[idx].parentElement.children[0];
							var conversationArea = selectedResponse[idx].parentElement.children[1],
							req = { post: vm.msg };
						FilmPostConversationsService.getConvos(vm.responses[index].id).then(function (res) {
							if (!res.data.length) {
								if (vm.toggleResponseView) {
									nonselectedResponses.forEach(function (i) { i.style.display = 'none' });
									vm.convo = index;
									conversationArea.style.height = responseContainer[0].clientHeight + 'px';
									if (selectedResponse[idx].parentElement.classList.contains('odd2')) {
										conversationArea.style.background = '#ccceff';
									} else { conversationArea.style.background = '#E6FFCC' };

									var beginConvoButton = document.createElement('div');
									beginConvoButton.style.width = '100%;';
									beginConvoButton.style.backgroundColor = '#beed90';
									beginConvoButton.style.margin = '5px';
									beginConvoButton.style.height = '60px';
									beginConvoButton.style.textAlign = 'center';
									beginConvoButton.style.paddingTop = '15px';
									beginConvoButton.style.marginLeft = '55px';
									beginConvoButton.style.marginRight = '55px';
									beginConvoButton.innerHTML = 'Begin Conversation';
									conversationArea.appendChild(beginConvoButton);
									beginConvoButton.onmouseenter = function () { beginConvoButton.style.backgroundColor = '#a7d37a' };
									beginConvoButton.onmouseleave = function () { beginConvoButton.style.backgroundColor = '#beed90' };
									beginConvoButton.onmousedown = function () {
										beginConvoButton.style.backgroundColor = '#ffffff';
										vm.convoBegun = vm.showChat = true;
										vm.showMap = false;
										var li = document.createElement('li'),
											response = vm.responses[index];
										li.innerHTML = response.display_name + ':  &nbsp;' + response.comment;
										var chatbox = document.getElementsByClassName('chatboxText')[idx];
										chatbox.appendChild(li);
									};
									//CREATING CONVO MESSGAE
									vm.msg = {};
									vm.filmPostConversation = function(message){
										vm.msg.user_id = JSON.parse(localStorage.profile).user_id;
										vm.msg.film_post_id = vm.posts[idx].id;
										vm.msg.first_comment_id = vm.responses[index].id;

										var req = { post: vm.msg };
										FilmPostConversationsService.createMessage(req).then(function (res) {
											var newLi2 = document.createElement('li');
											msg = res.data[0].message;
											newLi2.innerHTML = 'You:  &nbsp;' + msg;
											var chatbox = document.getElementsByClassName('chatboxText')[idx];
											chatbox.appendChild(newLi2);
											vm.msg.message = '';
											conversationArea.removeChild(beginConvoButton)
										}, vm);
									}
								} else {
									nonselectedResponses.forEach(function (i) { i.style.display = 'block' })
									vm.convo = null;
									var chatbox = document.getElementsByClassName('chatboxText')[idx]
									chatbox.innerHTML = '';
									vm.showMap = true;
									vm.showChat = false;
									var convoAreas = Array.from(document.getElementsByClassName('conversationArea'));
									convoAreas.forEach(function (e) { e.innerHTML = '' });
								}
							} else {
								vm.convoBegun = true;
								if (vm.toggleResponseView) {
									vm.showChat = true;
									vm.showMap = false;
									nonselectedResponses.forEach(function (i) { i.style.display = 'none' })
									conversationArea.style.height = responseContainer[0].clientHeight + 'px'
									var mapContainers = document.getElementsByClassName('mapContainer')
									mapContainers[idx].classList.remove('animated', 'slideInRight');
									mapContainers[idx].classList.add('animated', 'slideOutRight');
									var li = document.createElement('li'),
										response = vm.responses[index];

									li.innerHTML = response.display_name + ':  &nbsp;' + response.comment

									var chatbox = document.getElementsByClassName('chatboxText')[idx];
									chatbox.innerHTML = '';
									chatbox.appendChild(li);

									res.data.forEach(function (v) {
										var newLi = document.createElement('li'),
											msg = v.message, name;
										if (v.user_id === JSON.parse(localStorage.profile).user_id) {
											name = 'You';
										} else {
											name = response.display_name
										};
										newLi.innerHTML = name + ':  &nbsp;' + msg;
										chatbox.appendChild(newLi);
									});
									vm.msg = {};
									vm.filmPostConversation = function (message) {
										vm.msg.user_id = JSON.parse(localStorage.profile).user_id;
										vm.msg.film_post_id = vm.posts[idx].id;
										vm.msg.first_comment_id = vm.responses[index].id;

										var req = { post: vm.msg };
										FilmPostConversationsService.createMessage(req).then(function (res) {
											var newLi2 = document.createElement('li');
											msg = res.data[0].message;
											newLi2.innerHTML = 'You:  &nbsp;' + msg;
											chatbox.appendChild(newLi2);
											vm.msg.message = '';
										}, vm);
									};
								} else {
									var mapContainers = document.getElementsByClassName('mapContainer');
									mapContainers[idx].classList.remove('animated', 'slideOutRight');
									mapContainers[idx].classList.add('animated', 'slideInRight');

									nonselectedResponses.forEach(function (i) { i.style.display = 'block' })
									vm.convo = null;
									var chatbox = document.getElementsByClassName('chatboxText')[idx]
									chatbox.innerHTML = '';
									vm.showMap = true;
									vm.showChat = false;
									var convoAreas = Array.from(document.getElementsByClassName('conversationArea'));
									convoAreas.forEach(function (e) { e.innerHTML = '' });
								};
							}
						}, vm);
					}
				} else {
					vm.history = {};
					vm.history.comment;

					filmHistory && filmHistory.data.forEach(function (v) {
						//If you have already commented on this post, display waiting message
						if (v.post_id === posts.data[idx].id) {
							vm.showCommentInput = false;
							vm.waitingResponse = true;
							vm.history.comment = v.comment;
							var yourCommentMsg = v.comment;
							FilmPostConversationsService.getConvos(v.id).then(function (res) {
								//If they responded, show chat box
								if (res.data.length) {
									let chatbox;
									vm.waitingResponse = vm.showCommentInput = false;
									vm.showChat = vm.theyResponded = true;
									vm.rightColumnHeader = 'CONVERSATION';
									chatbox = document.getElementsByClassName('chatboxText')[idx],
									yourComment = document.createElement('li');
									chatbox.innerHTML = '';
									yourComment.innerHTML = 'You: &nbsp;' + yourCommentMsg;
									chatbox.appendChild(yourComment);
									res.data.forEach(function (v) {
										var newLi = document.createElement('li'),
											msg = v.message, name;
										if (v.user_id === JSON.parse(localStorage.profile).user_id) {
											name = 'You';
										} else {
											name = posts.data[idx].display_name
										};
										newLi.innerHTML = name + ':  &nbsp;' + msg;
										chatbox.appendChild(newLi);
									})
									//CREATING CONVO MESSGAE
									vm.msg = {};
									vm.filmPostConversation = function (message) {
										vm.msg.user_id = JSON.parse(localStorage.profile).user_id;
										vm.msg.film_post_id = vm.posts[idx].id;
										vm.msg.first_comment_id = v.id;
										var req = { post: vm.msg };
										FilmPostConversationsService.createMessage(req).then(function (res) {
											var newLi2 = document.createElement('li');
											msg = res.data[0].message;
											newLi2.innerHTML = 'You:  &nbsp;' + msg;
											var chatbox = document.getElementsByClassName('chatboxText')[idx];
											chatbox.appendChild(newLi2);
											vm.msg.message = '';
										}, vm);
									};
								};
							}, vm);
						}
					})
				};
				$timeout(function () {
					if (vm.showChat) {
						return
					}
					vm.showMap = true;
					myArrayFromNodeList = Array.from(document.querySelectorAll('md-input-container'))
					myArrayFromNodeList.forEach(function (e) {
						e.classList.remove('md-input-invalid')
						e.classList.remove('md-input-focused')
						e.classList.remove('md-input-has-value')
					});
				}, 500);
			};
			if(vm.toggleView === false) {
				vm.showCommentInput = true;
				vm.theyResponded = vm.waitingResponse =
				vm.showResponses = vm.showMap = vm.showChat =
				vm.showCrickets = false;

				vm.backButton = 'home';
				vm.rightColumnHeader = 'PROXIMITY'
				vm.leftPanel = 'CONNECT';
				expandingNodes = Array.from(document.querySelectorAll('.expandingAreaactive')),
				fakeSpans = Array.from(document.querySelectorAll('#fakespan')),
				textAreas = Array.from(document.querySelectorAll('textarea')),
				containers = Array.from(document.querySelectorAll('.messageContainer')),
				convoAreas = Array.from(document.getElementsByClassName('conversationArea'));

				if ($(window).width() > 1200) {
					vm.leftWidth = 50;
					vm.showOwl = true;
				};
				convoAreas.forEach(function (e) { e.innerHTML = '' })
				others.forEach(function (i) { i.style.display = 'block' });
				if (vm.responsesNeedCleanup) {
					Array.from(document.querySelectorAll('.responses')).forEach(function (i) { i.style.display = 'block' })
					vm.responsesNeedCleanup = false;
					vm.toggleResponseView = false;
					vm.convo = null;
				};
				selected[0].classList.remove('focus');
				expandingNodes.forEach(function (e) { e.className = "expandingArea" });
				fakeSpans.forEach(function (e) { e.textContent = '' });
				textAreas.forEach(function (e) { e.value = '' });
			};
		}

		vm.removePost = function (id) {
			FilmPostService.deletePost(id).then(function () {
				$route.reload();
			});
		}

		vm.checkId = function (post) {
			return localStorage.length > 0 && post.third_party_user_id === JSON.parse(localStorage.profile).user_id
		}

		var map;
		vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBtNoaazwyeqMuiXN9zNkWAW8y-WdCGp40&v=3&";
		x = NgMap.getMap('map');
		vm.comment = {};
		vm.addFilmPostComment = function (id, newFilmPostComment) {
			vm.comment.user_id = JSON.parse(localStorage.profile).user_id
			vm.comment.post_id = id;
			vm.comment.category = 'film';
			var req = { post: newFilmPostComment };
			FilmPostCommentsService.createPost(req).then(function (res) {
				filmHistory.data.push(res.data[0])
				vm.show(vm.tempIndex)
			}, vm)
		};
	};

		function NewFilmPostController(FilmPostService,UsersService,$location, store){
			var vm = this;
			vm.post = {};
			vm.post.user_id = JSON.parse(localStorage.profile).user_id
			
			document.getElementsByClassName('newPostTopicArea')[0].focus();

			vm.goBackToFilmIndex = function(){
				$location.path('/filmPosts')
			}
			vm.addFilmPost = function(newFilmPost){
				var req = {post: newFilmPost};
				FilmPostService.createPost(req).then(function(res){
						location.href ='/filmPosts';
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
		CodingPostsController.$inject = ['$scope','CodingPostService','CodingPostCommentsService','UsersService','posts','$location','$route', 'NgMap', 'codingMail', 'codingHistory', '$timeout', '$scope','CodingPostConversationsService'];
		NewCodingPostController.$inject = ['CodingPostService','UsersService','$location','store'] 
		EditCodingPostController.$inject = ['CodingPostService', 'post', '$location']

		FilmPostsController.$inject = ['FilmPostService','FilmPostCommentsService','UsersService','posts','$location','$route', 'NgMap', 'filmMail','filmHistory', '$timeout', '$scope','FilmPostConversationsService'];
		NewFilmPostController.$inject = ['FilmPostService','UsersService','$location','store'] 
		EditFilmPostController.$inject = ['FilmPostService', 'post', '$location']

		MusicPostsController.$inject = ['MusicPostService', 'MusicPostCommentsService', 'UsersService', 'posts', '$location', '$route', 'NgMap', 'musicMail', 'musicHistory', '$timeout', '$scope', 'MusicPostConversationsService'];
		NewMusicPostController.$inject = ['MusicPostService','UsersService','$location','store'] 
		EditMusicPostController.$inject = ['MusicPostService', 'post', '$location']

		LandingCtrl.$inject = ['$location', 'auth', 'store','$timeout','$rootScope','UsersService']


		MiscCtrl.$inject = ['$location']

		HomeCtrl.$inject = ['$location', 'auth', 'store','$timeout','$rootScope','UsersService']
		LoginHomeCtrl.$inject = ['$location','auth','store','$timeout','$rootScope','UsersService']
	MailCtrl.$inject = ['$scope','filmMail', 'musicMail', 'codingMail', 'filmConvos', 'musicConvos', 'codingConvos', '$location', 'auth', 'store', '$timeout', '$rootScope', 'UsersService', 'FilmPostCommentsService', 'FilmPostService', 'ConvoRepoService', 'CodingPostConversationsService', 'CodingPostCommentsService', 'FilmPostConversationsService', 'FilmPostCommentsService', 'MusicPostConversationsService','MusicPostCommentsService']
		// SettingsCtrl.$inject = ['$location','auth', 'store']
		EditUserController.$inject = ['UsersService', '$location','auth','store','user']

})()

