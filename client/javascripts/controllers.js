
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
				if (filmMail.data[i].is_accepted !== null) continue
				if (facebook.test(filmMail.data[i].user_id)) {
					fbUserId = filmMail.data[i].user_id.match(numberPattern)[0];
					filmMail.data[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
				};
				vm.filmPostComments.push(filmMail.data[i])
			};
			for(var i = 0; i<musicMail.data.length; i++){
				if (musicMail.data[i].is_accepted !== null) continue
				if (facebook.test(musicMail.data[i].user_id)) {
					fbUserId = musicMail.data[i].user_id.match(numberPattern)[0];
					musicMail.data[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
				};
				vm.musicPostComments.push(musicMail.data[i])
			};
			for(var i = 0; i<codingMail.data.length; i++){
				if (codingMail.data[i].is_accepted !== null) continue
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
				var req = {user: user};
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
			vm.theyResponded = vm.showCrickets = 
			vm.loggedIn = false;
			vm.currentUser = false;
			vm.convoArea = false;
			vm.tempIndex = false;
			vm.tempResponseIndex = false;
			vm.posts = posts.data;
			vm.backButton = 'home'
			vm.leftPanel = 'CONNECT'
			vm.responses; 
			vm.rightColumnHeader = 'PROXIMITY';
			vm.leftWidth = 50;
			vm.showLoginToRespond = true;
			vm.showResponse = null;
			vm.pendingResponseText = null;
			vm.showActiveConvos = false;
			if($(window).width() < 1200){
				vm.leftWidth = 100;
				vm.showOwl = false;
			};
			if(localStorage.length > 0){
				vm.loggedIn = true
			};
			// vm.myTrackingFunction = function(post){ some code to put the logged-in user's posts at the top  };
			posts.data.length && posts.data.forEach(function(i){
				var facebook = /^(facebook)/,
					numberPattern = /\d+/g,
					fbUserId;
				if(facebook.test(i.third_party_user_id)){
					fbUserId = i.third_party_user_id.match(numberPattern)[0];
					i.user_pic = 'http://graph.facebook.com/'+ fbUserId +'/picture?type=large'
				};
			});
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
					selected[0].classList.add('focus');	
					selected[0].classList.add('noHover');
					others.forEach(function(i){i.style.display = 'none'});
					if(localStorage.length > 0 && posts.data[idx].third_party_user_id === JSON.parse(localStorage.profile).user_id){
						vm.showCommentInput = false;
						vm.responses = codingMail.data.filter((v, i) => codingMail.data[i].framework === posts.data[idx].framework && codingMail.data[i].is_accepted === null );
						vm.responses.forEach(function(i){
							let facebook = /^(facebook)/,
								numberPattern = /\d+/g,
								fbUserId;
							if(facebook.test(i.user_id)){
								fbUserId = i.user_id.match(numberPattern)[0];
								i.user_pic = 'http://graph.facebook.com/'+ fbUserId +'/picture?type=large'
							};
						});
						vm.activeConvos = codingMail.data.filter((v, i) => codingMail.data[i].framework === posts.data[idx].framework && codingMail.data[i].is_accepted === true);
						vm.activeConvos.forEach(function (i) {
							let facebook = /^(facebook)/,
								numberPattern = /\d+/g,
								fbUserId;
							if (facebook.test(i.user_id)) {
								fbUserId = i.user_id.match(numberPattern)[0];
								i.user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
							};
						});
						if(!vm.responses.length && !vm.activeConvos.length){
							vm.showCrickets = true;
						} else if(vm.responses.length){
							vm.showResponses = true;
						}
						if(vm.activeConvos.length){
							vm.showActiveConvos = true;
						}
						vm.showResponse = function(index, response){
							let convoStarted = false,
							selectedResponse = Array.from(document.querySelectorAll('.responses')).filter((v, i) => v.dataset.userid === response.user_id && v.dataset.comment === response.comment),
							selectedResponseButtonRow = Array.from(document.querySelectorAll('.conversationArea')).filter((v, i) => v.dataset.userid === response.user_id && v.dataset.comment === response.comment);
							vm.convoArea = index;
							if(vm.convoArea !== vm.tempResponseIndex){
								vm.tempResponseIndex = vm.convoArea;
								vm.showButtons = true;
							} else {
								vm.showButtons = false;
								vm.tempResponseIndex = false;
							};
							vm.acceptConvo = function(index){
								let msg = {},
									commentReq = {
										post: {
											id: response.id,
											is_accepted: true
										}
									},
									convoReq;
								selectedResponse[idx].style.display = 'none';
								selectedResponseButtonRow[idx].style.display = 'none';
								msg.user_id = response.user_id;
								msg.first_comment_id = response.id;
								msg.message = response.comment;
								msg.coding_post_id = response.post_id;
								
								userReq = {
									user: {
										third_party_id: response.user_id,
										has_mail: true
									}
								}

								// req = {
								// 	post: {
								// 		id: post.id,
								// 		is_accepted: true
								// 	}
								// }

								convoReq = { post: msg };
								$timeout(function () {
									CodingPostCommentsService.updatePost(commentReq);
									CodingPostConversationsService.createMessage(convoReq);
									for(let i = 0 ; i < codingMail.data.length; i++){
										if(codingMail.data[i].id === response.id)
										codingMail.data.splice(i, 1)
									};
									// UsersService.getUser(response.user_id).then(function (res) {
									// 	console.log('aw yeah update user res is ', res);

									// })
									UsersService.updateUser(userReq).then(function(res){
										console.log('aw yeah update user res is ', res);
										
									})
								}, 500);
							};
							vm.declineConvo = function (index) {
								selectedResponse[idx].style.display = 'none';
								selectedResponseButtonRow[idx].style.display = 'none';
								let commentReq = {
									post: {
										id: response.id,
										is_accepted: false
									}
								};
								$timeout(function () {
									CodingPostCommentsService.updatePost(commentReq);
									for (let i = 0; i < codingMail.data.length; i++) {
										if (codingMail.data[i].id === response.id)
											codingMail.data.splice(i, 1)
									}
								}, 500);
							};
							if (vm.showButtons) {
								vm.tempResponseIndex = vm.convoArea;
							} else {
								//hide buttons
								vm.convoArea = false;
								vm.tempResponseIndex = false;
							} 
						};
					} else {
						vm.tempResponseIndex = false;
						vm.history = {};
						vm.history.comment;
						vm.wasDeclined = false;
						vm.showActiveConvos = false;

						codingHistory && codingHistory.data.forEach(function(v){
							//If you have already commented on this post, display waiting message
							if(v.post_id === posts.data[idx].id){
									console.log('waiting response post is ', v);
									
								vm.showCommentInput = false;
									vm.waitingResponse = true;
							     	if (v.is_accepted === null){
										vm.pendingResponseText = 'has not responded yet.'
									}
									if(v.is_accepted === false){
										vm.pendingResponseText = 'declined to respond.'
									}
									if(v.is_accepted === true){
										vm.pendingResponseText = 'accepted your conversation! Check your mailbox.'
									}
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
	  		 	  }, 50);
				};        
				if(vm.toggleView === false){
					//BACK TO MAIN INDEX PAGE
					// vm.convoArea = false;
					vm.tempResponseIndex = false;
					vm.showCommentInput = true;
					vm.theyResponded = vm.waitingResponse = 
					vm.showResponses = vm.showMap = vm.showChat = 
					vm.showCrickets = false;
					vm.showActiveConvos = false;

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
		  			others.forEach(function(i){i.style.display = 'block'});
		  				Array.from(document.querySelectorAll('.responses')).forEach(function(i){i.style.display = 'block'})
		  				vm.responsesNeedCleanup = false;
						vm.toggleResponseView = false;
						selected[0].classList.remove('focus');
						selected[0].classList.remove('noHover');
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
	//~~~~~~MUSIC POSTS CONTROLLER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		function MusicPostsController($scope, MusicPostService, MusicPostCommentsService, UsersService, posts, $location, $route, NgMap, musicMail, musicHistory, $timeout, $rootScope, MusicPostConversationsService) {
			var vm = this, span, area, cursor;
			vm.showVid = vm.showCommentInput = vm.convoBegun = vm.showOwl = true;
			vm.showMap = vm.showChat = vm.toggleView = vm.toggleResponseView =
				vm.showText = vm.waitingResponse = vm.showResponses = vm.test =
				vm.theyResponded = vm.showCrickets =
				vm.loggedIn = false;
			vm.currentUser = false;
			vm.convoArea = false;
			vm.tempIndex = false;
			vm.tempResponseIndex = false;
			vm.posts = posts.data;
			vm.backButton = 'home'
			vm.leftPanel = 'CONNECT'
			vm.responses;
			vm.rightColumnHeader = 'PROXIMITY';
			vm.leftWidth = 50;
			vm.showLoginToRespond = true;
			vm.showResponse = null;
			vm.pendingResponseText = null;
			vm.showActiveConvos = false;
			if ($(window).width() < 1200) {
				vm.leftWidth = 100;
				vm.showOwl = false;
			};
			if (localStorage.length > 0) {
				vm.loggedIn = true
			};
			// vm.myTrackingFunction = function(post){ some code to put the logged-in user's posts at the top  };
			console.log('posts are ', posts);
			
			posts.data.length && posts.data.forEach(function (i) {
				var facebook = /^(facebook)/,
					numberPattern = /\d+/g,
					fbUserId;
				if (facebook.test(i.third_party_user_id)) {
					fbUserId = i.third_party_user_id.match(numberPattern)[0];
					i.user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
				};
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
				var selected = Array.from(document.querySelectorAll('md-list-item')).filter((v, i) => i == idx),
					others = Array.from(document.querySelectorAll('md-list-item')).filter((v, i) => i !== idx);
				if (vm.toggleView === true) {
					if (localStorage.length) {
						vm.showLoginToRespond = false;
					} else {
						vm.showCommentInput = false;
					}
					vm.backButton = 'musicIndex';
					if (vm.leftWidth === 50) {
						vm.leftWidth = 100;
						vm.showOwl = false;
					};
					selected[0].classList.add('focus');
					selected[0].classList.add('noHover');
					others.forEach(function (i) { i.style.display = 'none' });
					if (localStorage.length > 0 && posts.data[idx].third_party_user_id === JSON.parse(localStorage.profile).user_id) {
						vm.showCommentInput = false;
						vm.responses = musicMail.data.filter((v, i) => musicMail.data[i].framework === posts.data[idx].framework && musicMail.data[i].is_accepted === null);
						vm.responses.forEach(function (i) {
							let facebook = /^(facebook)/,
								numberPattern = /\d+/g,
								fbUserId;
							if (facebook.test(i.user_id)) {
								fbUserId = i.user_id.match(numberPattern)[0];
								i.user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
							};
						});
						vm.activeConvos = musicMail.data.filter((v, i) => musicMail.data[i].framework === posts.data[idx].framework && musicMail.data[i].is_accepted === true);
						vm.activeConvos.forEach(function (i) {
							let facebook = /^(facebook)/,
								numberPattern = /\d+/g,
								fbUserId;
							if (facebook.test(i.user_id)) {
								fbUserId = i.user_id.match(numberPattern)[0];
								i.user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
							};
						});
						if (!vm.responses.length && !vm.activeConvos.length) {
							vm.showCrickets = true;
						} else if (vm.responses.length) {
							vm.showResponses = true;
						}
						if (vm.activeConvos.length) {
							vm.showActiveConvos = true;
						}
						vm.showResponse = function (index, response) {
							let convoStarted = false,
								selectedResponse = Array.from(document.querySelectorAll('.responses')).filter((v, i) => v.dataset.userid === response.user_id && v.dataset.comment === response.comment),
								selectedResponseButtonRow = Array.from(document.querySelectorAll('.conversationArea')).filter((v, i) => v.dataset.userid === response.user_id && v.dataset.comment === response.comment);
							vm.convoArea = index;
							if (vm.convoArea !== vm.tempResponseIndex) {
								vm.tempResponseIndex = vm.convoArea;
								vm.showButtons = true;
							} else {
								vm.showButtons = false;
								vm.tempResponseIndex = false;
							};
							vm.acceptConvo = function (index) {
								let msg = {},
									commentReq = {
										post: {
											id: response.id,
											is_accepted: true
										}
									},
									convoReq;
								selectedResponse[idx].style.display = 'none';
								selectedResponseButtonRow[idx].style.display = 'none';
								msg.user_id = response.user_id;
								msg.first_comment_id = response.id;
								msg.message = response.comment;
								msg.music_post_id = response.post_id;
								convoReq = { post: msg };
								$timeout(function () {
									MusicPostCommentsService.updatePost(commentReq);
									MusicPostConversationsService.createMessage(convoReq);
									for (let i = 0; i < musicMail.data.length; i++) {
										if (musicMail.data[i].id === response.id)
											musicMail.data.splice(i, 1)
									};
								}, 500);
							};
							vm.declineConvo = function (index) {
								selectedResponse[idx].style.display = 'none';
								selectedResponseButtonRow[idx].style.display = 'none';
								let commentReq = {
									post: {
										id: response.id,
										is_accepted: false
									}
								};
								$timeout(function () {
									MusicPostCommentsService.updatePost(commentReq);
									for (let i = 0; i < musicMail.data.length; i++) {
										if (musicMail.data[i].id === response.id)
											musicMail.data.splice(i, 1)
									}
								}, 500);
							};
							if (vm.showButtons) {
								vm.tempResponseIndex = vm.convoArea;
							} else {
								//hide buttons
								vm.convoArea = false;
								vm.tempResponseIndex = false;
							}
						};
					} else {
						vm.tempResponseIndex = false;
						vm.history = {};
						vm.history.comment;
						vm.wasDeclined = false;
						vm.showActiveConvos = false;

						musicHistory && musicHistory.data.forEach(function (v) {
							//If you have already commented on this post, display waiting message
							if (v.post_id === posts.data[idx].id) {
								console.log('waiting response post is ', v);

								vm.showCommentInput = false;
								vm.waitingResponse = true;
								if (v.is_accepted === null) {
									vm.pendingResponseText = 'has not responded yet.'
								}
								if (v.is_accepted === false) {
									vm.pendingResponseText = 'declined to respond.'
								}
								if (v.is_accepted === true) {
									vm.pendingResponseText = 'accepted your conversation! Check your mailbox.'
								}
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
						vm.showMap = true;
						myArrayFromNodeList = Array.from(document.querySelectorAll('md-input-container'))
						myArrayFromNodeList.forEach(function (e) {
							e.classList.remove('md-input-invalid')
							e.classList.remove('md-input-focused')
							e.classList.remove('md-input-has-value')
						});
					}, 50);
				};
				if (vm.toggleView === false) {
					//BACK TO MAIN INDEX PAGE
					// vm.convoArea = false;
					vm.tempResponseIndex = false;
					vm.showCommentInput = true;
					vm.theyResponded = vm.waitingResponse =
						vm.showResponses = vm.showMap = vm.showChat =
						vm.showCrickets = false;
					vm.showActiveConvos = false;

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
					others.forEach(function (i) { i.style.display = 'block' });
					Array.from(document.querySelectorAll('.responses')).forEach(function (i) { i.style.display = 'block' })
					vm.responsesNeedCleanup = false;
					vm.toggleResponseView = false;
					selected[0].classList.remove('focus');
					selected[0].classList.remove('noHover');
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
	function FilmPostsController($scope, FilmPostService, FilmPostCommentsService, UsersService, posts, $location, $route, NgMap, filmMail, filmHistory, $timeout, $rootScope, FilmPostConversationsService) {
		var vm = this, span, area, cursor;
		vm.showVid = vm.showCommentInput = vm.convoBegun = vm.showOwl = true;
		vm.showMap = vm.showChat = vm.toggleView = vm.toggleResponseView =
			vm.showText = vm.waitingResponse = vm.showResponses = vm.test =
			vm.theyResponded = vm.showCrickets =
			vm.loggedIn = false;
		vm.currentUser = false;
		vm.convoArea = false;
		vm.tempIndex = false;
		vm.tempResponseIndex = false;
		vm.posts = posts.data;
		vm.backButton = 'home'
		vm.leftPanel = 'CONNECT'
		vm.responses;
		vm.rightColumnHeader = 'PROXIMITY';
		vm.leftWidth = 50;
		vm.showLoginToRespond = true;
		vm.showResponse = null;
		vm.pendingResponseText = null;
		vm.showActiveConvos = false;
		if ($(window).width() < 1200) {
			vm.leftWidth = 100;
			vm.showOwl = false;
		};
		if (localStorage.length > 0) {
			vm.loggedIn = true
		};
		// vm.myTrackingFunction = function(post){ some code to put the logged-in user's posts at the top  };
		posts.data.length && posts.data.forEach(function (i) {
			var facebook = /^(facebook)/,
				numberPattern = /\d+/g,
				fbUserId;
			if (facebook.test(i.third_party_user_id)) {
				fbUserId = i.third_party_user_id.match(numberPattern)[0];
				i.user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
			};
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
				if (localStorage.length) {
					vm.showLoginToRespond = false;
				} else {
					vm.showCommentInput = false;
				}
				vm.backButton = 'filmIndex';
				if (vm.leftWidth === 50) {
					vm.leftWidth = 100;
					vm.showOwl = false;
				};
				selected[0].classList.add('focus');
				selected[0].classList.add('noHover');
				others.forEach(function (i) { i.style.display = 'none' });
				if (localStorage.length > 0 && posts.data[idx].third_party_user_id === JSON.parse(localStorage.profile).user_id) {
					vm.showCommentInput = false;
					vm.responses = filmMail.data.filter((v, i) => filmMail.data[i].framework === posts.data[idx].framework && filmMail.data[i].is_accepted === null);
					vm.responses.forEach(function (i) {
						let facebook = /^(facebook)/,
							numberPattern = /\d+/g,
							fbUserId;
						if (facebook.test(i.user_id)) {
							fbUserId = i.user_id.match(numberPattern)[0];
							i.user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
						};
					});
					vm.activeConvos = filmMail.data.filter((v, i) => filmMail.data[i].framework === posts.data[idx].framework && filmMail.data[i].is_accepted === true);
					vm.activeConvos.forEach(function (i) {
						let facebook = /^(facebook)/,
							numberPattern = /\d+/g,
							fbUserId;
						if (facebook.test(i.user_id)) {
							fbUserId = i.user_id.match(numberPattern)[0];
							i.user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
						};
					});
					if (!vm.responses.length && !vm.activeConvos.length) {
						vm.showCrickets = true;
					} else if (vm.responses.length) {
						vm.showResponses = true;
					}
					if (vm.activeConvos.length) {
						vm.showActiveConvos = true;
					}
					vm.showResponse = function (index, response) {
						let convoStarted = false,
							selectedResponse = Array.from(document.querySelectorAll('.responses')).filter((v, i) => v.dataset.userid === response.user_id && v.dataset.comment === response.comment),
							selectedResponseButtonRow = Array.from(document.querySelectorAll('.conversationArea')).filter((v, i) => v.dataset.userid === response.user_id && v.dataset.comment === response.comment);
						vm.convoArea = index;
						if (vm.convoArea !== vm.tempResponseIndex) {
							vm.tempResponseIndex = vm.convoArea;
							vm.showButtons = true;
						} else {
							vm.showButtons = false;
							vm.tempResponseIndex = false;
						};
						vm.acceptConvo = function (index) {
							let msg = {},
								commentReq = {
									post: {
										id: response.id,
										is_accepted: true
									}
								},
								convoReq;
							selectedResponse[idx].style.display = 'none';
							selectedResponseButtonRow[idx].style.display = 'none';
							msg.user_id = response.user_id;
							msg.first_comment_id = response.id;
							msg.message = response.comment;
							msg.film_post_id = response.post_id;
							convoReq = { post: msg };
							$timeout(function () {
								FilmPostCommentsService.updatePost(commentReq);
								FilmPostConversationsService.createMessage(convoReq);
								for (let i = 0; i < filmMail.data.length; i++) {
									if (filmMail.data[i].id === response.id)
										filmMail.data.splice(i, 1)
								};
							}, 500);
						};
						vm.declineConvo = function (index) {
							selectedResponse[idx].style.display = 'none';
							selectedResponseButtonRow[idx].style.display = 'none';
							let commentReq = {
								post: {
									id: response.id,
									is_accepted: false
								}
							};
							$timeout(function () {
								FilmPostCommentsService.updatePost(commentReq);
								for (let i = 0; i < filmMail.data.length; i++) {
									if (filmMail.data[i].id === response.id)
										filmMail.data.splice(i, 1)
								}
							}, 500);
						};
						if (vm.showButtons) {
							vm.tempResponseIndex = vm.convoArea;
						} else {
							//hide buttons
							vm.convoArea = false;
							vm.tempResponseIndex = false;
						}
					};
				} else {
					vm.tempResponseIndex = false;
					vm.history = {};
					vm.history.comment;
					vm.wasDeclined = false;
					vm.showActiveConvos = false;

					filmHistory && filmHistory.data.forEach(function (v) {
						//If you have already commented on this post, display waiting message
						if (v.post_id === posts.data[idx].id) {
							console.log('waiting response post is ', v);

							vm.showCommentInput = false;
							vm.waitingResponse = true;
							if (v.is_accepted === null) {
								vm.pendingResponseText = 'has not responded yet.'
							}
							if (v.is_accepted === false) {
								vm.pendingResponseText = 'declined to respond.'
							}
							if (v.is_accepted === true) {
								vm.pendingResponseText = 'accepted your conversation! Check your mailbox.'
							}
							vm.history.comment = v.comment;
							var yourCommentMsg = v.comment;
							FilmPostConversationsService.getConvos(v.id).then(function (res) {
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
				}, 50);
			};
			if (vm.toggleView === false) {
				//BACK TO MAIN INDEX PAGE
				// vm.convoArea = false;
				vm.tempResponseIndex = false;
				vm.showCommentInput = true;
				vm.theyResponded = vm.waitingResponse =
					vm.showResponses = vm.showMap = vm.showChat =
					vm.showCrickets = false;
				vm.showActiveConvos = false;

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
				others.forEach(function (i) { i.style.display = 'block' });
				Array.from(document.querySelectorAll('.responses')).forEach(function (i) { i.style.display = 'block' })
				vm.responsesNeedCleanup = false;
				vm.toggleResponseView = false;
				selected[0].classList.remove('focus');
				selected[0].classList.remove('noHover');
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

	FilmPostsController.$inject = ['$scope','FilmPostService','FilmPostCommentsService','UsersService','posts','$location','$route', 'NgMap', 'filmMail','filmHistory', '$timeout', '$scope','FilmPostConversationsService'];
		NewFilmPostController.$inject = ['FilmPostService','UsersService','$location','store'] 
		EditFilmPostController.$inject = ['FilmPostService', 'post', '$location']

	MusicPostsController.$inject = ['$scope','MusicPostService', 'MusicPostCommentsService', 'UsersService', 'posts', '$location', '$route', 'NgMap', 'musicMail', 'musicHistory', '$timeout', '$scope', 'MusicPostConversationsService'];
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

