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
		.controller('PanelDialogCtrl', PanelDialogCtrl)
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
	function PanelDialogCtrl(mdPanelRef) {
		console.log('new shit');
		
		this._mdPanelRef = mdPanelRef;

		this.closeDialog = function () {
			var panelRef = this._mdPanelRef;
			// console.log('oanel ref is ', panelRef);
			
			panelRef && panelRef.close().then(function () {
				angular.element(document.querySelector('.demo-dialog-open-button')).focus();
				panelRef.destroy();
			});
		};
	}	
	function HomeCtrl($location, auth, store, $timeout, $rootScope, UsersService, $mdPanel) {
			// console.log('panel is', $mdPanel);
			
			var vm = this;
			vm._mdPanel = $mdPanel;
			vm.isOpen = false;
			
			localStorage.clear()
			if (localStorage.profile) {
				location.href = '/loggedinHome';
			} else {
				localStorage.clear();
			};
			vm.go = function (path) {
				location.href = path;
			};
			vm.whatIsPanel = function(){
				if(!vm.isOpen){
					vm.animationType = 'scale';
					vm.duration = 300;
					vm.separateDurations = {
						open: vm.duration,
						close: vm.duration
					};
					var position = this._mdPanel.newPanelPosition()
						.absolute()
						.top('50%')
						.left('50%');
					var animation = vm._mdPanel.newPanelAnimation();
					var config = {
						attachTo: angular.element(document.getElementById('panel-anchor')),
						panelClass: 'overview-panel',
						templateUrl: '../views/panels/whatIs.html',
						controller: 'PanelDialogCtrl',
						controllerAs: 'vm',
						position: position,
						trapFocus: false,
						clickOutsideToClose: true,
						clickEscapeToClose: true,
						hasBackdrop: true,
						onCloseSuccess: function (panelRef) {
							vm.isOpen = false;
						}.bind(this)
					};
					vm._mdPanel.open(config);
					vm.isOpen = true;
				}
			};
			vm.login = function () {
				auth.signin({ popup: true }, function (profile, token) {
				});
			}
			vm.logout = function () {
				store.remove('profile');
				store.remove('token');
				localStorage.clear();
			}
		};
		function MiscCtrl($location) {
			var vm = this;
			vm.goBack = function () {
				if (localStorage.length === 0) {
					$location.path('/home');
				} else if (localStorage.length > 0) {
					$location.path('/loggedinHome');
				};
			};
		};
		function LoginHomeCtrl($location, auth, store, $timeout, $rootScope, UsersService, $mdDialog, $http) {
			var vm = this,
				facebook = /^(facebook)/,
				numberPattern = /\d+/g,
				fbUserId, userName;
				console.log($mdDialog);
				
			vm.hasMail = false;
			vm.showLoginButton = false;
			vm.user_id = JSON.parse(localStorage.profile).user_id;
			vm.go = function (path) {
				$location.path(path);
			};
			vm.picture = JSON.parse(localStorage.profile).picture

			if (facebook.test(JSON.parse(localStorage.profile).user_id)) {
				fbUserId = JSON.parse(localStorage.profile).user_id.match(numberPattern)[0];
				vm.picture = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
			}
			UsersService.getUser(vm.user_id).then(function (user) {
				// console.log('USER IS ', user);

				// $http.get("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU")
				// 	.then(function (response) {
				// 		console.log('oh shit it worked', response);
						
				// 	});

				// jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function (success) {
				// 	apiGeolocationSuccess({ coords: { latitude: success.location.lat, longitude: success.location.lng } });
				// })
				// 	.fail(function (err) {
				// 		alert("API Geolocation error! \n\n" + err);
				// 	});


				// if(user.data.first_time){
				// 	var confirm = $mdDialog.confirm()
				// 		.title('This app will require your geolocation')
				// 		.textContent('In order to find local collaborators, Cahoots will use your location. We do not share your data with anyone. Please see our term sheet in the settings menu (gear icon) for more information')
				// 		.ariaLabel('Lucky day')
				// 		.ok('Got it!')
				// 		.cancel('No thanks');

				// 	$mdDialog.show(confirm).then(function () {

				// 		jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function (success) {
				// 			apiGeolocationSuccess({ coords: { latitude: success.location.lat, longitude: success.location.lng } });
				// 		})
				// 			.fail(function (err) {
				// 				alert("API Geolocation error! \n\n" + err);
				// 			});


				// 		if (navigator.geolocation) {
				// 			navigator.geolocation.getCurrentPosition(function(position){
				// 				var lat = position.coords.latitude;
				// 				var long = position.coords.longitude;
				// 				var point = new google.maps.LatLng(lat, long);
				// 				var latlong = position.coords.latitude + "," + position.coords.longitude;
				// 				user.data.latlong = latlong;
				// 				new google.maps.Geocoder().geocode(
				// 					{ 'latLng': point },
				// 					function (res, status) {
				// 						var zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);
				// 						user.data.zip_code = zip[1];
				// 						user.data.first_time = false;
				// 						var req = { user: user.data };
				// 						UsersService.updateUser(req).then(function (res) {
				// 							console.log('res is ', res);
				// 						})
				// 					}
				// 				);
				// 			});
				// 		}
				// 	}, function () {
				// 		console.log('You decided to keep your debt.');
				// 	});
				// }

				if (!user.data.display_name || user.data.display_name == undefined || user.data.display_name == null) {
					vm.welcome = 'Welcome'
				} else {
					userName = user.data.display_name
					vm.welcome = ('Welcome ' + user.data.display_name + '!')
				};
				console.log('vm.welcome is ', vm.welcome);
				
				if (user.data.has_mail) {
					vm.hasMail = true;
				}
				vm.name = user.data.display_name || JSON.parse(localStorage.profile).given_name;
				vm.picture = user.data.user_pic;
				if (facebook.test(vm.user_id)) {
					fbUserId = user.data.third_party_user_id.match(numberPattern)[0];
					vm.picture = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large';
				};
			}, vm);
			if (localStorage.length > 0) {
				var user = JSON.parse(localStorage.profile)
			}
			vm.goToMail = function () {
				location.href = '/mailbox'
			}

			vm.logout = function () {
				localStorage.clear()
				location.href = '/home';
			}
		}
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
			vm.showChatPane = false;
			vm.chatbox_toggle_boolean = true;
			vm.user_profile = {};
			vm.convoWithUser = null;
			vm.chatbox_profile_toggle_label = 'Show User Profile';
			vm.codingThreads = {};
			vm.musicThreads = {};
			vm.filmThreads = {};
			vm.showButtons = function(post){
				vm.isVisible = post.id;
			};
			
			vm.hideButtons = function(post){vm.isVisible = false}
			var myDisplayName, post_id, fbUserId, facebook = /^(facebook)/,
			numberPattern = /\d+/g;
			if(facebook.test(vm.user_id)){
				fbUserId = vm.user_id.match(numberPattern)[0];
				vm.navpicture = 'http://graph.facebook.com/'+ fbUserId +'/picture?type=large'
			};
			UsersService.getUser(vm.user_id).then(function(res){
				myDisplayName = res.data.display_name;
				vm.displayName = res.data.display_name;
			});
			vm.chatbox_toggle = function () {
				vm.chatbox_toggle_boolean = !vm.chatbox_toggle_boolean
				if (vm.chatbox_toggle_boolean) {
					vm.chatbox_profile_toggle_label = 'Show User Profile';
					vm.showChatPane = true;
					vm.showProfilePane = false;
				} else {
					vm.showChatPane = false;
					vm.showProfilePane = true;
					vm.chatbox_profile_toggle_label = 'Show Chatbox';
					let profilePane = document.getElementsByClassName('user-profile-pane')[0];
					vm.user_profile.display_name = vm.convoWithUser.user_name;
					vm.user_profile.pic = vm.convoWithUser.user_pic;
					if (vm.convoWithUser.user_bio == null || !vm.convoWithUser.user_bio.length){
						vm.user_profile.bio = 'This user has not filled out a bio'
					} else {
						vm.user_profile.bio = vm.convoWithUser.user_bio;
					}
				}
			}
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
			
			// posters messages
			if(codingConvos.data.posters_messages.length){
				let messages = codingConvos.data.posters_messages;
				for (var i = 0; i < messages.length; i++) {
					let thread_id = messages[i].first_comment_id;
					if (facebook.test(messages[i].user_id)) {
						fbUserId = messages[i].user_id.match(numberPattern)[0];
						messages[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
					};
					messages[i].category = 'coding';
					if(!vm.codingThreads[thread_id]){
						let newThread = {};
						newThread.latest_message = '';
						newThread.last_modified = '';
						newThread.latest_user = '';
						newThread.conversation_with = {};
						newThread.history = [];
						newThread.history.push(messages[i]);
						vm.codingThreads[thread_id] = newThread
					} else {
						vm.codingThreads[thread_id].history.push(messages[i])
					};
					if (messages[i].user_id !== vm.user_id) {
						vm.codingThreads[thread_id].conversation_with.id = messages[i].user_id;
						vm.codingThreads[thread_id].conversation_with.user_pic = messages[i].user_pic;
						vm.codingThreads[thread_id].conversation_with.user_bio = messages[i].bio;
						vm.codingThreads[thread_id].conversation_with.user_name = messages[i].display_name;
					};
				};
			};
			//commentors messages
			if(codingConvos.data.commentors_messages.length) {
				let messages = codingConvos.data.commentors_messages;
				for (var i = 0; i < messages.length; i++) {
					let thread_id = messages[i].first_comment_id;
					if (facebook.test(messages[i].user_id)) {
						fbUserId = messages[i].user_id.match(numberPattern)[0];
						messages[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
					};
					messages[i].category = 'coding';
					if (!vm.codingThreads[thread_id]) {
						let newThread = {};
						newThread.latest_message = '';
						newThread.last_modified = '';
						newThread.latest_user = '';
						newThread.conversation_with = {};
						newThread.history = [];
						newThread.history.push(messages[i]);
						vm.codingThreads[thread_id] = newThread
					} else{
						vm.codingThreads[thread_id].history.push(messages[i])
					};
					if (messages[i].user_id !== vm.user_id) {
						vm.codingThreads[thread_id].conversation_with.id = messages[i].user_id;
						vm.codingThreads[thread_id].conversation_with.user_pic = messages[i].user_pic;
						vm.codingThreads[thread_id].conversation_with.user_bio = messages[i].bio;
						vm.codingThreads[thread_id].conversation_with.user_name = messages[i].display_name;
					};
				};
			};
			//push threads to convos
			for (var c in vm.codingThreads) {
				vm.codingThreads[c].history.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
				let latestMessage = vm.codingThreads[c].history[vm.codingThreads[c].history.length - 1];
				vm.codingThreads[c].latest_message = latestMessage.message;
				vm.codingThreads[c].last_modified = latestMessage.created_at;
				if (latestMessage.user_id === JSON.parse(localStorage.profile).user_id) {
					vm.codingThreads[c].latest_user = 'You';
				} else {
					vm.codingThreads[c].latest_user = 'They';
				};
				vm.codingThreads[c].latest_user_pic = vm.codingThreads[c].conversation_with.user_pic;
				vm.codingConvos.push(vm.codingThreads[c]);
			};
			// posters messages
			if (musicConvos.data.posters_messages.length) {
				let messages = musicConvos.data.posters_messages;
				for (var i = 0; i < messages.length; i++) {
					let thread_id = messages[i].first_comment_id;
					if (facebook.test(messages[i].user_id)) {
						fbUserId = messages[i].user_id.match(numberPattern)[0];
						messages[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
					};
					messages[i].category = 'music';
					if (!vm.musicThreads[thread_id]) {
						let newThread = {};
						newThread.latest_message = '';
						newThread.last_modified = '';
						newThread.latest_user = '';
						newThread.conversation_with = {};
						newThread.history = [];
						newThread.history.push(messages[i]);
						vm.musicThreads[thread_id] = newThread
					} else {
						vm.musicThreads[thread_id].history.push(messages[i])
					};
					if (messages[i].user_id !== vm.user_id) {
						vm.musicThreads[thread_id].conversation_with.id = messages[i].user_id;
						vm.musicThreads[thread_id].conversation_with.user_pic = messages[i].user_pic;
						vm.musicThreads[thread_id].conversation_with.user_bio = messages[i].bio;
						vm.musicThreads[thread_id].conversation_with.user_name = messages[i].display_name;
					};
				};
			};
			//commentors messages
			if (musicConvos.data.commentors_messages.length) {
				let messages = musicConvos.data.commentors_messages;
				for (var i = 0; i < messages.length; i++) {
					let thread_id = messages[i].first_comment_id;
					if (facebook.test(messages[i].user_id)) {
						fbUserId = messages[i].user_id.match(numberPattern)[0];
						messages[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
					};
					messages[i].category = 'music';
					if (!vm.musicThreads[thread_id]) {
						let newThread = {};
						newThread.latest_message = '';
						newThread.last_modified = '';
						newThread.latest_user = '';
						newThread.conversation_with = {};
						newThread.history = [];
						newThread.history.push(messages[i]);
						vm.musicThreads[thread_id] = newThread
					} else {
						vm.musicThreads[thread_id].history.push(messages[i])
					};
					if (messages[i].user_id !== vm.user_id) {
						vm.musicThreads[thread_id].conversation_with.id = messages[i].user_id;
						vm.musicThreads[thread_id].conversation_with.user_pic = messages[i].user_pic;
						vm.musicThreads[thread_id].conversation_with.user_bio = messages[i].bio;
						vm.musicThreads[thread_id].conversation_with.user_name = messages[i].display_name;
					};
				};
			};
			//push threads to convos
			for (var c in vm.musicThreads) {
				vm.musicThreads[c].history.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
				let latestMessage = vm.musicThreads[c].history[vm.musicThreads[c].history.length - 1];
				vm.musicThreads[c].latest_message = latestMessage.message;
				vm.musicThreads[c].last_modified = latestMessage.created_at;
				if (latestMessage.user_id === JSON.parse(localStorage.profile).user_id) {
					vm.musicThreads[c].latest_user = 'You'
				} else {
					vm.musicThreads[c].latest_user = 'They';
					// latestMessage.display_name
				};
				vm.musicThreads[c].latest_user_pic = latestMessage.user_pic;
				vm.musicConvos.push(vm.musicThreads[c]);
			};

			// posters messages
			if (filmConvos.data.posters_messages.length) {
				let messages = filmConvos.data.posters_messages;
				for (var i = 0; i < messages.length; i++) {
					let thread_id = messages[i].first_comment_id;
					if (facebook.test(messages[i].user_id)) {
						fbUserId = messages[i].user_id.match(numberPattern)[0];
						messages[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
					};
					messages[i].category = 'film';
					if (!vm.filmThreads[thread_id]) {
						let newThread = {};
						newThread.latest_message = '';
						newThread.last_modified = '';
						newThread.latest_user = '';
						newThread.conversation_with = {};
						newThread.history = [];
						newThread.history.push(messages[i]);
						vm.filmThreads[thread_id] = newThread
					} else {
						vm.filmThreads[thread_id].history.push(messages[i])
					};
					if (messages[i].user_id !== vm.user_id) {
						vm.filmThreads[thread_id].conversation_with.id = messages[i].user_id;
						vm.filmThreads[thread_id].conversation_with.user_pic = messages[i].user_pic;
						vm.filmThreads[thread_id].conversation_with.user_bio = messages[i].bio;
						vm.filmThreads[thread_id].conversation_with.user_name = messages[i].display_name;
					};
				};
			};
			//commentors messages
			if (filmConvos.data.commentors_messages.length) {
				let messages = filmConvos.data.commentors_messages;
				for (var i = 0; i < messages.length; i++) {
					let thread_id = messages[i].first_comment_id;
					if(facebook.test(messages[i].user_id)) {
						fbUserId = messages[i].user_id.match(numberPattern)[0];
						messages[i].user_pic = 'http://graph.facebook.com/' + fbUserId + '/picture?type=large'
					};
					if (messages[i].user_id !== vm.user_id){
						
					}
					messages[i].category = 'film';
					if (!vm.filmThreads[thread_id]) {
						let newThread = {};
						newThread.latest_message = '';
						newThread.last_modified = '';
						newThread.latest_user = '';
						newThread.conversation_with = {};
						newThread.history = [];
						newThread.history.push(messages[i]);
						vm.filmThreads[thread_id] = newThread
					} else {
						vm.filmThreads[thread_id].history.push(messages[i])
					}
					if (messages[i].user_id !== vm.user_id) {
						vm.filmThreads[thread_id].conversation_with.id = messages[i].user_id;
						vm.filmThreads[thread_id].conversation_with.user_pic = messages[i].user_pic;
						vm.filmThreads[thread_id].conversation_with.user_bio = messages[i].bio;
						vm.filmThreads[thread_id].conversation_with.user_name = messages[i].display_name;
					}
				};
			};
			for (var c in vm.filmThreads) {
				vm.filmThreads[c].history.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
				let latestMessage = vm.filmThreads[c].history[vm.filmThreads[c].history.length - 1];
				vm.filmThreads[c].latest_message = latestMessage.message;
				vm.filmThreads[c].last_modified = latestMessage.created_at;
				if (latestMessage.user_id === JSON.parse(localStorage.profile).user_id){
					vm.filmThreads[c].latest_user = 'You'
				}else{
					vm.filmThreads[c].latest_user = 'They';
				};
				vm.filmThreads[c].latest_user_pic = latestMessage.user_pic;
				vm.filmConvos.push(vm.filmThreads[c]);
			};
			let addToActives = function (obj) {
				Object.keys(obj).map(function (key, index) {
					vm.activeConvos.push(obj[key])
				});
			};
			addToActives(vm.codingConvos);
			addToActives(vm.musicConvos);
			addToActives(vm.filmConvos);
			
			vm.activeConvos.sort((a, b) => Date.parse(b.last_modified) - Date.parse(a.last_modified));
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
					
					let req = {
						user: {
							third_party_id: vm.user_id,
							has_mail: false
						}
					};
					UsersService.updateUser(req);
					
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
				console.log('post is ', post);
				
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
							post.first_comment_id = post.id;
							post.coding_post_id = post.post_id;

							let newThread = {};
							newThread.latest_message = post.comment;
							newThread.last_modified = res.data[0].created_at;
							newThread.latest_user = post.display_name;
							newThread.latest_user_pic = post.user_pic;
							newThread.history = [];

							newThread.conversation_with = {
								id: post.user_id,
								user_pic: post.user_pic,
								user_bio: post.bio,
								user_name : post.display_name
							}
							// newThread.conversation_with.id = post.user_id;
							// newThread.conversation_with.user_pic = post.user_pic;
							// newThread.conversation_with.user_bio = post.bio;
							// newThread.conversation_with.user_name = post.display_name;

							newThread.history.push(post);

							
							

							vm.activeConvos.unshift(newThread);	
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
							post.first_comment_id = post.id;
							post.music_post_id = post.post_id;
							let newThread = {};
							newThread.latest_message = post.comment;
							newThread.last_modified = res.data[0].created_at;
							newThread.latest_user = post.display_name;
							newThread.latest_user_pic = post.user_pic;
							newThread.history = [];
							newThread.history.push(post);
							newThread.conversation_with = {
								id: post.user_id,
								user_pic: post.user_pic,
								user_bio: post.bio,
								user_name: post.display_name
							}
							vm.activeConvos.unshift(newThread);	
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
							post.first_comment_id = post.id;
							post.film_post_id = post.post_id;

							let newThread = {};
							newThread.latest_message = post.comment;
							newThread.last_modified = res.data[0].created_at;
							newThread.latest_user = post.display_name;
							newThread.latest_user_pic = post.user_pic;
							newThread.history = [];
							newThread.history.push(post);
							newThread.conversation_with = {
								id: post.user_id,
								user_pic: post.user_pic,
								user_bio: post.bio,
								user_name: post.display_name
							}
							vm.activeConvos.unshift(newThread);	
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
				vm.showChatPane = true;
				vm.convoWithUser = convoPost.conversation_with;
				vm.chatbox_profile_toggle_label = 'Show User Profile';
				for(let i = 0; i < highlightables.length; i++){
					highlightables[i].style.backgroundColor = 'white';
				};
				highlightables[idx].style.backgroundColor = 'beige';
				
				let chatbox = document.getElementsByClassName('chatboxText')[0];
				let firstLi = document.createElement('li');
				chatbox.innerHTML = '';
				//vm.activeConvos[idx].history[0] undefined??
				firstLi.innerHTML = 'Responding to:  &nbsp;' + vm.activeConvos[idx].history[0].descriptive_title;
				firstLi.style.backgroundColor = 'white';
				firstLi.style.paddingLeft = '15px';
				firstLi.style.paddingRight = '15px';
				firstLi.style.textAlign = 'center';
				chatbox.appendChild(firstLi);
				for (var i = 0; i < vm.activeConvos[idx].history.length; i++) {
					let current = vm.activeConvos[idx].history[i],
						newLi = document.createElement('li'),
						msg = current.message;

					if (current.display_name === vm.displayName){
						newLi.innerHTML = 'You:  &nbsp;' + msg;
						newLi.style.backgroundColor = '#dce2e4';
						newLi.style.textAlign = 'left';
					} else {
						newLi.innerHTML = current.display_name + ':  &nbsp;' + msg;
						newLi.style.backgroundColor = '#d9ecfb';
						newLi.style.textAlign = 'left';
					}
					newLi.style.paddingLeft = '15px';
					newLi.style.paddingRight = '15px';
						chatbox.appendChild(newLi);
				};
				vm.selectedConvo = vm.activeConvos[idx];
				vm.selectedConvo.masterIndex = idx;
			};
			vm.newMessage = function(msg){
				let chatbox = document.getElementsByClassName('chatboxText')[0];
				let messageInput = document.getElementById('usermsg');
				let post = {};
				let req = {};
				let otherPersonsId;
				post.message = msg;
				post.user_id = vm.user_id;
				post.first_comment_id = vm.selectedConvo.history[0].first_comment_id;
				for (let i = 0; i < vm.selectedConvo.history.length; i++){
					if(vm.selectedConvo.history[i].user_id !== vm.user_id){
						otherPersonsId = vm.selectedConvo.history[i].user_id;
					}
				}
				switch(vm.selectedConvo.history[0].category){
					case 'film':
						post.film_post_id = vm.selectedConvo.history[0].film_post_id;
						req.post = post;
						vm.activeConvos[vm.selectedConvo.masterIndex].history.push({
							display_name : vm.displayName,
							message : msg
						})
						//could also try to do vm.activeConvos indexof (vm.selectedConvo) see if that holds the reference
						// message and display_name
						FilmPostConversationsService.createMessage(req).then(function(res){
							let name = vm.displayName;
							let newLi = document.createElement('li');
							newLi.innerHTML = 'You :  &nbsp;' + msg;
							newLi.style.paddingLeft = '15px';
							newLi.style.paddingRight = '15px';
							newLi.style.backgroundColor = '#dce2e4';
							newLi.style.textAlign = 'left';
							chatbox.appendChild(newLi);
							vm.convoMessage = '';
							if(otherPersonsId){
								let userReq = {
									user: {
										third_party_id: otherPersonsId,
										has_mail: true
									}
								};
								UsersService.updateUser(userReq);
							}
						})
					break;
					case 'music':
						post.music_post_id = vm.selectedConvo.history[0].music_post_id;
						req.post = post;
						vm.activeConvos[vm.selectedConvo.masterIndex].history.push({
							display_name: vm.displayName,
							message: msg
						})
						MusicPostConversationsService.createMessage(req).then(function (res) {
							let name = vm.displayName;
							let newLi = document.createElement('li');
							newLi.innerHTML = 'You :  &nbsp;' + msg;
							newLi.style.paddingLeft = '15px';
							newLi.style.paddingRight = '15px';
							newLi.style.backgroundColor = '#dce2e4';
							newLi.style.textAlign = 'left';
							chatbox.appendChild(newLi);
							vm.convoMessage = '';
							if (otherPersonsId) {
								let userReq = {
									user: {
										third_party_id: otherPersonsId,
										has_mail: true
									}
								};
								UsersService.updateUser(userReq);
							}
						})
					break;
					case 'coding':
						post.coding_post_id = vm.selectedConvo.history[0].coding_post_id;
						req.post = post;
						vm.activeConvos[vm.selectedConvo.masterIndex].history.push({
							display_name: vm.displayName,
							message: msg
						})
						CodingPostConversationsService.createMessage(req).then(function (res) {
							let name = vm.displayName;
							let newLi = document.createElement('li');
							newLi.innerHTML = 'You :  &nbsp;' + msg;
							newLi.style.paddingLeft = '15px';
							newLi.style.paddingRight = '15px';
							newLi.style.backgroundColor = '#dce2e4';
							newLi.style.textAlign = 'left';
							chatbox.appendChild(newLi);
							vm.convoMessage = '';
							if (otherPersonsId) {
								let userReq = {
									user: {
										third_party_id: otherPersonsId,
										has_mail: true
									}
								};
								UsersService.updateUser(userReq);
							}
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
			// vm.user.zip_code = ' ';

			
			console.log('in USERS 	controller ', vm.user);
			
			if(vm.user.display_name==null||vm.user.display_name==undefined){
				vm.user.display_name = ' ';
			};
			if(vm.user.zip_code==null){
				vm.user.zip_code = ' ';
			};
			if(vm.user.bio===null){
				vm.user.bio = ' ';
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
		//codingBookmark
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
			
			vm.backButton = 'home'
			vm.leftPanel = 'CONNECT'
			vm.responses; 
			vm.rightColumnHeader = 'PROXIMITY';
			vm.leftWidth = 50;
			vm.showLoginToRespond = true;
			vm.showResponse = null;
			vm.pendingResponseText = null;
			vm.showActiveConvos = false;
			posts.data.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
			vm.posts = posts.data;
			for (let i = 0; i < vm.posts.length; i++) {
				const e = vm.posts[i];
				var dateString = Date.parse(e.created_at)
				var dx = new Date(parseInt(dateString));;

				var dd = dx.getDate();
				
				var mm = dx.getMonth() + 1;
				var yy = dx.getFullYear();

				var displayDate = mm + "." + dd + "." + yy;
				e.displayDate = displayDate
			};

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
								};
								convoReq = { post: msg };
								$timeout(function () {
									CodingPostCommentsService.updatePost(commentReq);
									CodingPostConversationsService.createMessage(convoReq);
									UsersService.updateUser(userReq);
									for(let i = 0 ; i < codingMail.data.length; i++){
										if(codingMail.data[i].id === response.id)
										codingMail.data.splice(i, 1)
									};
								}, 300);
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
						 //codingMap
  		 		  	if(vm.showChat){
  		 		  		return
  		 		  	}
					vm.showMap = true;
					// var coordinates = vm.posts[idx].latlong.split(',');
					var coordinates = [37.75, -122.394]
					// var gMap = new google.maps.Map(document.getElementById('map'));
					var gMap = new google.maps.Map(document.getElementsByClassName('mapContainer')[idx].children[0]);
					gMap.setZoom(13);     
					gMap.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]));
					var circleOptions = {
						id : 'circle',
						strokeColor : '#FF0000',
						strokeOpacity : "0.8",
						strokeWeight : "1",
						center: new google.maps.LatLng(coordinates[0], coordinates[1]),
						radius: 2000,
						map: gMap,
						editable: false
					};
					var circle = new google.maps.Circle(circleOptions);
	  		 		myArrayFromNodeList = Array.from(document.querySelectorAll('md-input-container'))
	  		 		myArrayFromNodeList.forEach(function (e){
	  		 			e.classList.remove('md-input-invalid')
	  		 			e.classList.remove('md-input-focused')
	  		 			e.classList.remove('md-input-has-value')
	  		 		});
	  		 	  }, 0);
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
				vm.addCodingPostComment = function (id, newCodingPostComment) {
					vm.comment.user_id = JSON.parse(localStorage.profile).user_id
					vm.comment.post_id = id;
					vm.comment.category = 'coding';
					let req = { post: newCodingPostComment };
					userReq = {
						user: {
							third_party_id: posts.data[idx].third_party_user_id,
							has_mail: true
						}
					};
					UsersService.updateUser(userReq);

					CodingPostCommentsService.createPost(req).then(function (res) {
						codingHistory.data.push(res.data[0])
						vm.show(vm.tempIndex)
					}, vm)
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

		  	// var map;
		  	// vm.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtNoaazwyeqMuiXN9zNkWAW8y-WdCGp40&v=3&";	
			//   x = NgMap.getMap('map')
			  
			  ;
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
	function EditCodingPostController($scope,$timeout,CodingPostService, post, $location){ //$routeParams is  Angular's version of req.params in express
			
			var vm = this;
				vm.post = post.data
				if(!vm.post) {$location.path('/codingPosts')}
			vm.goBackToCodingIndex = function () {
				$location.path('/codingPosts')
			}
			vm.updatePost = function(post){
				var req = {post: post}
				CodingPostService.updatePost(req).then(function(res){					
				$location.path('/codingPosts');
				})
			}
		}
	//~~~~~~MUSIC POSTS CONTROLLER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//musicBookmark
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
			vm.backButton = 'home'
			vm.leftPanel = 'CONNECT'
			vm.responses;
			vm.rightColumnHeader = 'PROXIMITY';
			vm.leftWidth = 50;
			vm.showLoginToRespond = true;
			vm.showResponse = null;
			vm.pendingResponseText = null;
			vm.showActiveConvos = false;
			posts.data.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
			vm.posts = posts.data;
			for (let i = 0; i < vm.posts.length; i++) {
				const e = vm.posts[i];
				var dateString = Date.parse(e.created_at)
				var dx = new Date(parseInt(dateString));;

				var dd = dx.getDate();

				var mm = dx.getMonth() + 1;
				var yy = dx.getFullYear();

				var displayDate = mm + "." + dd + "." + yy;
				e.displayDate = displayDate
			};
			if ($(window).width() < 1200) {
				vm.leftWidth = 100;
				vm.showOwl = false;
			};
			if (localStorage.length > 0) {
				vm.loggedIn = true
			};
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
								msg.coding_post_id = response.post_id;

								userReq = {
									user: {
										third_party_id: response.user_id,
										has_mail: true
									}
								};
								convoReq = { post: msg };
								$timeout(function () {
									MusicPostCommentsService.updatePost(commentReq);
									MusicPostConversationsService.createMessage(convoReq);
									UsersService.updateUser(userReq);
									for (let i = 0; i < codingMail.data.length; i++) {
										if (codingMail.data[i].id === response.id)
											codingMail.data.splice(i, 1)
									};
								}, 300);
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
						//musicMap
						if (vm.showChat) {
							return
						}
						vm.showMap = true;
						// var coordinates = vm.posts[idx].latlong.split(',');
						var coordinates = [37.75, -122.394]
						// var gMap = new google.maps.Map(document.getElementById('map'));
						var gMap = new google.maps.Map(document.getElementsByClassName('mapContainer')[idx].children[0]);
						gMap.setZoom(13);
						// console.log('COORDS', coordinates);
						
						gMap.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]));
						// gMap.setCenter(new google.maps.LatLng(37.7, -122.4));
						var circleOptions = {
							id: 'circle',
							strokeColor: '#FF0000',
							strokeOpacity: "0.8",
							strokeWeight: "1",
							center: new google.maps.LatLng(coordinates[0], coordinates[1]),
							radius: 2000,
							map: gMap,
							editable: false
						};
						var circle = new google.maps.Circle(circleOptions);
						myArrayFromNodeList = Array.from(document.querySelectorAll('md-input-container'))
						myArrayFromNodeList.forEach(function (e) {
							e.classList.remove('md-input-invalid')
							e.classList.remove('md-input-focused')
							e.classList.remove('md-input-has-value')
						});
					}, 0);
				};
				if (vm.toggleView === false) {
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
				vm.addMusicPostComment = function (id, newMusicPostComment) {
					vm.comment.user_id = JSON.parse(localStorage.profile).user_id
					vm.comment.post_id = id;
					vm.comment.category = 'music';
					let req = { post: newMusicPostComment };
					userReq = {
						user: {
							third_party_id: posts.data[idx].third_party_user_id,
							has_mail: true
						}
					};
					UsersService.updateUser(userReq);

					MusicPostCommentsService.createPost(req).then(function (res) {
						musicHistory.data.push(res.data[0])
						vm.show(vm.tempIndex)
					}, vm)
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
			vm.goBackToMusicIndex = function () {
				$location.path('/musicPosts')
			}
			vm.updatePost = function(post){
				var req = {post: post}
				MusicPostService.updatePost(req).then(function(res){					
				$location.path('/musicPosts');
				})
			}
		}
//~~~~~~FILMposts controller~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~			
//filmBookmark
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
		vm.backButton = 'home'
		vm.leftPanel = 'CONNECT'
		vm.responses;
		vm.rightColumnHeader = 'PROXIMITY';
		vm.leftWidth = 50;
		vm.showLoginToRespond = true;
		vm.showResponse = null;
		vm.pendingResponseText = null;
		vm.showActiveConvos = false;
		posts.data.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
		vm.posts = posts.data;
		for (let i = 0; i < vm.posts.length; i++) {
			const e = vm.posts[i];
			var dateString = Date.parse(e.created_at)
			var dx = new Date(parseInt(dateString));;

			var dd = dx.getDate();

			var mm = dx.getMonth() + 1;
			var yy = dx.getFullYear();

			var displayDate = mm + "." + dd + "." + yy;
			e.displayDate = displayDate
		};
		if ($(window).width() < 1200) {
			vm.leftWidth = 100;
			vm.showOwl = false;
		};
		if (localStorage.length > 0) {
			vm.loggedIn = true
		};
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
							userReq = {
								user: {
									third_party_id: response.user_id,
									has_mail: true
								}
							};
							convoReq = { post: msg };
							$timeout(function () {
								FilmPostCommentsService.updatePost(commentReq);
								FilmPostConversationsService.createMessage(convoReq);
								UsersService.updateUser(userReq);
								for (let i = 0; i < filmMail.data.length; i++) {
									if (filmMail.data[i].id === response.id)
										filmMail.data.splice(i, 1)
								};
							}, 300);
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
					//filmMap
					if (vm.showChat) {
						return
					}
					vm.showMap = true;
					// var coordinates = vm.posts[idx].latlong.split(',');
					var coordinates = [37.75, -122.394]
					var gMap = new google.maps.Map(document.getElementsByClassName('mapContainer')[idx].children[0]);
					console.log(document.getElementsByClassName('mapContainer')[idx].children[0]);
					
					gMap.setZoom(13);
					gMap.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]));
					var circleOptions = {
						id: 'circle',
						strokeColor: '#FF0000',
						strokeOpacity: "0.8",
						strokeWeight: "1",
						center: new google.maps.LatLng(coordinates[0], coordinates[1]),
						radius: 2000,
						map: gMap,
						editable: false
					};
					var circle = new google.maps.Circle(circleOptions);
					myArrayFromNodeList = Array.from(document.querySelectorAll('md-input-container'))
					myArrayFromNodeList.forEach(function (e) {
						e.classList.remove('md-input-invalid')
						e.classList.remove('md-input-focused')
						e.classList.remove('md-input-has-value')
					});
				}, 0);
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
			vm.addFilmPostComment = function (id, newFilmPostComment) {
				vm.comment.user_id = JSON.parse(localStorage.profile).user_id
				vm.comment.post_id = id;
				vm.comment.category = 'film';
				var req = { post: newFilmPostComment };

				userReq = {
					user: {
						third_party_id: posts.data[idx].third_party_user_id,
						has_mail: true
					}
				};
				UsersService.updateUser(userReq);

				FilmPostCommentsService.createPost(req).then(function (res) {
					filmHistory.data.push(res.data[0])
					vm.show(vm.tempIndex)
				}, vm)
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
			vm.goBackToFilmIndex = function () {
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
	EditCodingPostController.$inject = ['$scope','$timeout','CodingPostService', 'post', '$location']

	FilmPostsController.$inject = ['$scope','FilmPostService','FilmPostCommentsService','UsersService','posts','$location','$route', 'NgMap', 'filmMail','filmHistory', '$timeout', '$scope','FilmPostConversationsService'];
		NewFilmPostController.$inject = ['FilmPostService','UsersService','$location','store'] 
		EditFilmPostController.$inject = ['FilmPostService', 'post', '$location']

	MusicPostsController.$inject = ['$scope','MusicPostService', 'MusicPostCommentsService', 'UsersService', 'posts', '$location', '$route', 'NgMap', 'musicMail', 'musicHistory', '$timeout', '$scope', 'MusicPostConversationsService'];
		NewMusicPostController.$inject = ['MusicPostService','UsersService','$location','store'] 
		EditMusicPostController.$inject = ['MusicPostService', 'post', '$location']

		LandingCtrl.$inject = ['$location', 'auth', 'store','$timeout','$rootScope','UsersService']


		MiscCtrl.$inject = ['$location']

	HomeCtrl.$inject = ['$location', 'auth', 'store', '$timeout', '$rootScope', 'UsersService', '$mdPanel']
	LoginHomeCtrl.$inject = ['$location', 'auth', 'store', '$timeout', '$rootScope', 'UsersService','$mdDialog', '$http']
	MailCtrl.$inject = ['$scope','filmMail', 'musicMail', 'codingMail', 'filmConvos', 'musicConvos', 'codingConvos', '$location', 'auth', 'store', '$timeout', '$rootScope', 'UsersService', 'FilmPostCommentsService', 'FilmPostService', 'ConvoRepoService', 'CodingPostConversationsService', 'CodingPostCommentsService', 'FilmPostConversationsService', 'FilmPostCommentsService', 'MusicPostConversationsService','MusicPostCommentsService']
		// SettingsCtrl.$inject = ['$location','auth', 'store']
		EditUserController.$inject = ['UsersService', '$location','auth','store','user']

})()

