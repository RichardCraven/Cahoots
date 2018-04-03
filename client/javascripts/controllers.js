
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
			if(localStorage.length > 0){
		  		location.href = '/loggedinHome';
		  	}
	  		else {
	  			localStorage.clear()
	  			var fadeOut = $timeout(fadeOut,6900)
	  		}

		};
		function MailCtrl(filmMail,musicMail,codingMail,$location,auth, store,$timeout,$rootScope, UsersService,FilmPostCommentsService,FilmPostService,ConvoRepoService){
			var vm=this;
			vm.auth = auth;

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
					FilmPostService.getPost(id).then(function(res){
					filmMail.data[i].recipient = res.data.display_name
						if(res.data.display_name===myDisplayName){
							filmMail.data[i].recipient = 'You'
						}
					})
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
				vm.post = {}
				vm.post.category = category
				vm.post.message = message
				vm.post.original_comment_id = postId
				vm.post.user_id = JSON.parse(localStorage.profile).user_id
				var req = {post: vm.post};
				ConvoRepoService.createMessage(req);
			}

			vm.deleteConvo = function(postId, comment, category){
			};


			var bool = true
			vm.respondFilm = function(idx){
				vm.messages = []
				var eyedee = vm.filmCommentPosts[idx].id
				ConvoRepoService.getMessages('film',eyedee).then(function(res){
					res.data.forEach(function(e){
						vm.messages.push({user:e.display_name,message:e.message})
					})
		  		})

				vm.showFilmResponseField = !vm.showFilmResponseField
				if(vm.showFilmResponseField === true){


				var selected = Array.from(document.querySelectorAll('.postFilmResponseArea')).filter((v,i) => i == idx);
				var selectedChatbox = Array.from(document.querySelectorAll('.chatbox')).filter((v,i) => i == idx);
				var others = Array.from(document.querySelectorAll('.postFilmResponseArea')).filter((v,i) => i !== idx);		  		
				others.forEach(function(i){i.style.display = 'none'})
				selectedChatbox[0].style.display = 'block'

				}
				if(vm.showFilmResponseField === false){
					var selected = Array.from(document.querySelectorAll('.postFilmResponseArea')).filter((v,i) => i == idx)		  			
					var selectedChatbox = Array.from(document.querySelectorAll('.chatbox')).filter((v,i) => i == idx)	
					var others = Array.from(document.querySelectorAll('.postFilmResponseArea')).filter((v,i) => i !== idx)
					selectedChatbox[0].style.display = 'none'
					others.forEach(function(i){i.style.display = 'block'})

				};
			}
			vm.respondMusic = function(idx){
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
			var vm=this;
			vm.auth = auth;
			

			if(localStorage.profile){
		  		$location.path('/loggedinHome');
		  	} else {
		  		localStorage.clear();
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
			var vm=this,
				facebook = /^(facebook)/,
				numberPattern = /\d+/g,
			    fbUserId, userName;
			vm.auth = auth;
			vm.welcome = 'Hey, beautiful';
			
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
				var user = JSON.parse(localStorage.profile)
				vm.name = user.given_name
				vm.picture = user.picture

				console.log('got here, user.third party id is ', user.user_id, user)
				if(facebook.test(user.user_id)){
					console.log('aaaaand  here')
					fbUserId = user.user_id.match(numberPattern)[0];
					vm.picture = 'http://graph.facebook.com/'+ fbUserId +'/picture?type=large'
				}

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
			vm.user = user.data;
			// vm.show
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
		function CodingPostsController(CodingPostService,CodingPostCommentsService,UsersService,posts,$location,$route, NgMap, codingMail, codingHistory, $timeout, $rootScope, CodingPostConversationsService){

			var vm = this, span, area, cursor;

			vm.showMap = false
			vm.showChat = false;
			vm.showVid = true
			vm.toggleView = false
			vm.toggleResponseView = false
		  	vm.showText = false;
		  	vm.waitingResponse = false;
		  	vm.showCommentInput = true;
		  	vm.showResponses = false;
			vm.posts = posts.data;
			vm.backButton = 'home'
			vm.tempIndex = null;
			vm.test = false;
			vm.currentUser = null;
			vm.leftPanel = 'CONNECT'
			vm.loggedIn = false;
			vm.responsesNeedCleanup = false;
			vm.responses; 
			vm.convo = null;
			vm.convoBegun = true;
			vm.theyResponded = false;
			vm.showCrickets = false;
			vm.rightColumnHeader = 'PROXIMITY';
			vm.showOwl = true;
			vm.leftWidth = 50;

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
			posts.data.forEach(function(i){
				var facebook = /^(facebook)/,
					numberPattern = /\d+/g,
					fbUserId;
				if(facebook.test(i.third_party_user_id)){
					fbUserId = i.third_party_user_id.match(numberPattern)[0];
					i.user_pic = 'http://graph.facebook.com/'+ fbUserId +'/picture?type=large'
				}
			})

			//handles the back button
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
	  		 vm.toggleView = !vm.toggleView
	  		 vm.showText = !vm.showText
	  		 vm.showVid = !vm.showVid


	  		 
	  		 var selected = Array.from(document.querySelectorAll('md-list-item')).filter((v,i) => i == idx),
	  		 	 others = Array.from(document.querySelectorAll('md-list-item')).filter((v,i) => i !== idx);

	  		 	if(vm.toggleView === true){
				  vm.backButton = 'codingIndex';
				  if(vm.leftWidth === 50){
				  	vm.leftWidth = 100;
				  	vm.showOwl = false;
				  };
				  console.log('selected is ', selected[0])
		  		  selected[0].classList.add('focus')	  	;	
		  		  others.forEach(function(i){i.style.display = 'none'});
    		  	  if(localStorage.length > 0 && posts.data[idx].third_party_user_id === JSON.parse(localStorage.profile).user_id){
  			  	    vm.showResponses = true;
  			  	    vm.showCommentInput = false;
  			  	    vm.leftPanel = 'RESPONSES'
  			  	    vm.responses = codingMail.data.filter((v,i) => codingMail.data[i].framework === posts.data[idx].framework);
  			  	    vm.responses.forEach(function(i){
  			  	    	var facebook = /^(facebook)/,
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
  			  	    	var convoStarted = false,
  			  	    	    responseContainer = Array.from(document.querySelectorAll('.messageContainer')).filter((v, i) => v.dataset.parentidx === idx.toString()),
  			  	    		selectedResponse = Array.from(document.querySelectorAll('.responses')).filter((v, i) => v.dataset.userid === response.user_id && v.dataset.comment === response.comment),
  			  	    		nonselectedResponses = Array.from(document.querySelectorAll('.responses')).filter((v, i) => v.dataset.comment !== response.comment),
  			  	    		responseHeader = selectedResponse[idx].parentElement.children[0],
  			  	    		conversationArea = selectedResponse[idx].parentElement.children[1],
  			  	    	    req = {post: vm.msg};
  			  	    	CodingPostConversationsService.getConvos(vm.responses[index].id).then(function(res){
  			  	    		if(!res.data.length){
		  			  	    	if(vm.toggleResponseView){
		  			  	    		nonselectedResponses.forEach(function(i){i.style.display = 'none'});
		  			  	    		vm.convo = index;
		  			  	    		conversationArea.style.height = responseContainer[0].clientHeight + 'px';
		  			  	    		if(selectedResponse[idx].parentElement.classList.contains('odd2')){
		  			  	    			conversationArea.style.background = '#ccceff';
		  			  	    		} else {conversationArea.style.background = '#E6FFCC'};

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
		  			  	    		beginConvoButton.onmouseenter = function(){beginConvoButton.style.backgroundColor = '#a7d37a'};
		  			  	    		beginConvoButton.onmouseleave = function(){beginConvoButton.style.backgroundColor = '#beed90'};
		  			  	    		beginConvoButton.onmousedown = function(){
		  			  	    			beginConvoButton.style.backgroundColor = '#ffffff';
		  			  	    			vm.convoBegun = true;
		  			  	    			vm.showMap = false;
		  			  	    			vm.showChat = true;
		  			  	    			var li = document.createElement('li'),
		  			  	    			response = vm.responses[index];
		  			  	    			li.innerHTML = response.display_name + ':  &nbsp;' + response.comment;
		  			  	    			var chatbox = document.getElementsByClassName('chatboxText')[idx];
		  			  	    			chatbox.appendChild(li);
		  			  	    		};
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
		  			  	    				console.log(conversationArea)
		  			  	    				conversationArea.removeChild(beginConvoButton)
			  	    			   		}, vm);
		  			  	    		}
		  			  	    	} else {
			  			  	    		nonselectedResponses.forEach(function(i){i.style.display = 'block'})
			  			  	    		vm.convo = null;
			  			  	    		var chatbox = document.getElementsByClassName('chatboxText')[idx]
			  			  	    		chatbox.innerHTML = ''
			  			  	    		vm.showMap = true;
			  			  	    		vm.showChat = false;
			  			  	    		var convoAreas = Array.from(document.getElementsByClassName('conversationArea'));
			  			  	    		convoAreas.forEach(function(e){ e.innerHTML = '' });
			  			  	    } 
  			  	    		} else {
  			  	    			console.log('convo started, res is ', res.data)
  			  	    			console.log('vm.toggleResponseView is ', vm.toggleResponseView)
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
				    		  	  	}) 
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
	  	  			  	    		}

  			  	    			} else {
  			  	    				var mapContainers = document.getElementsByClassName('mapContainer')
  			  	    					mapContainers[idx].classList.remove('animated','slideOutRight');
  			  	    					mapContainers[idx].classList.add('animated', 'slideInRight');

  			  	    				nonselectedResponses.forEach(function(i){i.style.display = 'block'})
  			  	    				vm.convo = null;
  			  	    				var chatbox = document.getElementsByClassName('chatboxText')[idx]
  			  	    				chatbox.innerHTML = ''
  			  	    				console.log('no way its getting here')
  			  	    				vm.showMap = true;
  			  	    				vm.showChat = false;
  			  	    				var convoAreas = Array.from(document.getElementsByClassName('conversationArea'));
  			  	    				convoAreas.forEach(function(e){ e.innerHTML = '' });
  			  	    			};
  			  	    		}
  			  	    	}, vm);
  			  	    }
    		  	  } else {
    		  	    vm.history = {};
  			  	 	vm.history.comment;
    		  	  	codingHistory.data.forEach(function(v){
    		  	  		if(v.post_id === posts.data[idx].id){
    		  	  			vm.showCommentInput = false;
    		  	  			vm.waitingResponse = true;
    		  	  			vm.history.comment = v.comment;
    		  	  			var yourCommentMsg = v.comment;
    		  	  			CodingPostConversationsService.getConvos(v.id).then(function(res){
    		  	  				if(res.data.length){
    		  	  					vm.waitingResponse = false;
	  			  	    			vm.showChat = true;
    		  	  					vm.showCommentInput = false;
    		  	  					vm.theyResponded = true;
    		  	  					vm.rightColumnHeader = 'CONVERSATION'
    		  	  					// *****

    		  	  					var chatbox = document.getElementsByClassName('chatboxText')[idx],
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
		  			  	    			console.log('got here niggaaa, v.id is ', v.id)

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
    		  	  }

  		 		  $timeout(function() {
  		 		  	if(vm.showChat){
  		 		  		console.log('ha! it worked')
  		 		  		return
  		 		  	}
	  		 		vm.showMap = true;

	  		 		myArrayFromNodeList = Array.from(document.querySelectorAll('md-input-container'))
	  		 		myArrayFromNodeList.forEach(function (e){
	  		 			e.classList.remove('md-input-invalid')
	  		 			e.classList.remove('md-input-focused')
	  		 			e.classList.remove('md-input-has-value')
	  		 		});

		  		 	function makeExpandingArea(container) {
		  		 	 var area = container.querySelector('textarea'),
		  		 	 	 span = container.querySelector('#fakespan'),
		  		 	     cursor = container.querySelector('.blinking-cursor'), areas;

		  		 	 if(area.addEventListener) {
		  		 	   area.addEventListener('focus', function(){
		  		 	     cursor.style.visibility = 'visible'
		  		 	   })
		  		 	   area.addEventListener('focusout', function(){
		  		 	     cursor.style.visibility = 'hidden'
		  		 	   })

		  		 	   area.addEventListener('input', function() {
		  		 	     span.textContent = area.value;
		  		 	   });
		  		 	   span.textContent = area.value;
		  		 	 } else if (area.attachEvent) {
		  		 	   // IE8 compatibility
		  		 	   area.attachEvent('onpropertychange', function() {
		  		 	     span.innerText = area.value;
		  		 	   });
		  		 	   span.innerText = area.value;
		  		 	 }
		  		 	   // Enable extra CSS
		  		 		container.className += "active";
		  		 	}

		  		 	areas = document.querySelectorAll('.expandingArea');
		  		 	makeExpandingArea(areas[idx])
	  		 	  }, 500);
		  		}

		  		if(vm.toggleView === false){
		  			vm.theyResponded = false;
		  			vm.waitingResponse = false;
		  			vm.showCommentInput = true;
		  			vm.showResponses = false;
		  			vm.leftPanel = 'CONNECT';
		  		 	vm.showMap = false;
		  		 	vm.showChat = false;
		  		 	vm.showCrickets = false;
		  		 	vm.backButton = 'home';
		  		 	vm.rightColumnHeader = 'PROXIMITY'
					expandingNodes = Array.from(document.querySelectorAll('.expandingAreaactive')),
	  				fakeSpans = Array.from(document.querySelectorAll('#fakespan')),
	  				textAreas = Array.from(document.querySelectorAll('textarea')),
	  				containers = Array.from(document.querySelectorAll('.messageContainer')),		  		
	  				convoAreas = Array.from(document.getElementsByClassName('conversationArea'));

  			  	    if($(window).width() > 1200){
  			  	    	vm.leftWidth = 50;
  			  	    	vm.showOwl = true;
  			  	    };
		  			convoAreas.forEach(function(e){ e.innerHTML = '' })
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
		  		vm.comment.post_id = id
		  		var req = {post: newCodingPostComment};
		  		CodingPostCommentsService.createPost(req).then(function(res){
		  			codingHistory.data.push({
						comment : newCodingPostComment,
						display_name : "user",
						post_id : posts.data[vm.tempIndex].id, 
						user_id : "google-oauth2|118441111248082986291",
						user_pic : "https://lh5.googleusercontent.com/-7zq80lVi4As/AAAAAAAAAAI/AAAAAAAAAAw/uOSgeu2eTVU/photo.jpg"
					})

		  			vm.show(vm.tempIndex)
		  		}, vm)
		  	};
		};
		function NewCodingPostController(CodingPostService,UsersService,$location,store){
			var vm = this;
			vm.post = {};
			vm.goBackToCodingIndex = function(){
				$location.path('/codingPosts')
			}
			vm.post.user_id = JSON.parse(localStorage.profile).user_id

			function makeExpandingArea(container) {
			 var area = container.querySelector('textarea');
			 var span = container.querySelector('#fakespan');
			 var cursor = container.querySelector('.blinking-cursor');

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
			   		span.appendChild(carriage);
			   	};
			     span.textContent = area.value;
			   }, false);
			   span.textContent = area.value;
			 } else if (area.attachEvent) {
			   // IE8 compatibility
			   area.attachEvent('onpropertychange', function() {
			     span.innerText = area.value;
			   });
			   span.innerText = area.value;
			 }
			// Enable extra CSS
				container.className += "active";
			}var areas = document.querySelectorAll('.expandingArea');
			var l = areas.length;while (l--) {
			 makeExpandingArea(areas[l]);
			}

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
		  	// vm.checkId = function(post){
	  		//   	if(localStorage.length > 0){
				 //  if(post.third_party_user_id === JSON.parse(localStorage.profile).user_id){
				 //  	return true		  			
				 //  }
	  		//   	}
	  		//   	else{
	  		//   		return false
	  		//   	}
		  	// }
  		  	vm.checkId = function(post){
  	  		  return localStorage.length > 0 && post.third_party_user_id === JSON.parse(localStorage.profile).user_id ? true : false
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
			vm.showMap = false;
			vm.showVid = true;
			vm.posts = posts.data;
			for(var i = 0; i < vm.posts.length; i++){
				if(!vm.posts[i].display_name){
					var userId = vm.posts[i].user_id;
					UsersService.getUser(userId).then(function(user){
						if(!user.data.display_name || user.data.display_name == undefined || user.data.display_name == null){
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
	  		  return localStorage.length > 0 && post.third_party_user_id === JSON.parse(localStorage.profile).user_id ? true : false
		  	}
		  	vm.toggleView = false
		  	vm.showText = false
		  	vm.show = function(idx){
		  		vm.toggleView = !vm.toggleView;
		  		vm.showText = !vm.showText;
		  		vm.showMap = !vm.showMap;
		  		vm.showVid = !vm.showVid;

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
		CodingPostsController.$inject = ['CodingPostService','CodingPostCommentsService','UsersService','posts','$location','$route', 'NgMap', 'codingMail', 'codingHistory', '$timeout', '$scope','CodingPostConversationsService'];
		NewCodingPostController.$inject = ['CodingPostService','UsersService','$location','store'] 
		EditCodingPostController.$inject = ['CodingPostService', 'post', '$location']

		FilmPostsController.$inject = ['FilmPostService','FilmPostCommentsService','UsersService','posts','$location','$route', 'NgMap', 'filmMail'];
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

