(function(){
	angular 
		.module('collaboApp')
		.component('ngPostShow', {
			bindings: {
				post: '<'
			},
			controller: 'ShowPostController',
			controllerAs: 'vm',
			templateUrl: '../views/posts/show.html'
			
		})
		.component('ngFilmPostShow',{
			bindings:{
				post: '<post'
			//			^ comes from the index.html 	
			//  ^ this goes to the show.html
			},
			controller: 'ShowFilmPostController',
			controllerAs: 'vm',
			templateUrl: '../views/categories/film/index.html'
		})
		.component('ngMusicPostShow',{
			bindings:{
				post: '<post'
			},
			controller: 'ShowMusicPostController',
			controllerAs: 'vm',
			templateUrl: '../views/categories/music/show.html'
		})
		.component('ngUsersShow',{
			bindings:{
				post: '<post'
			},
			controller: 'UsersController',
			controllerAs: 'vm',
			templateUrl: '../views/users/usersShow.html'
		})
		.component('tfCarousel', {
		  bindings: {

		  },
		  controller: 'carouselController',
		  controllerAs: 'carousel',
		  templateUrl: '../views/layout.html',
		  transclude:true,
		  replace: true
		})

})()






// (function(){

// 	angular 
// 		.module('piratesApp')
// 		.directive('ngPirateShow', function(){
// 			return {
// 				scope: {
// 					pirate: '<'
// 				},
// 				controller: 'ShowPirateController',
// 				controllerAs: 'vm',
// 				templateUrl: '../views/pirates/show.html'
// 			}
// 		})

// })()
// ^ this is how it's done with directive instead of component