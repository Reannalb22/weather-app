// es5 and 6 polyfills, powered by babel
// require("babel/polyfill")

// let fetch = require('./fetcher')

// var $ = require('jquery'),
// 	Backbone = require('backbone')

// 	console.log('loaded dist file')

// // other stuff that we don't really use in our own code
// // var Pace = require("../bower_components/pace/pace.js")

// // require your own libraries, too!
// // var Router = require('./app.js')

// // window.addEventListener('load', app)

// // function app() {
//     // start app
//     // new Router()
// // }
// window.onload = function(){

// var WeatherModel = Backbone.Model.extend({
// 	url: 'https://api.forecast.io/forecast/',
// 	apiKey: '55fd4415dbaf5029ad9b6cb7d69c60f5',

// 	parse: function(responseData){
// 		console.log(responseData)
// 		return responseData
// 	}

// })

// // var WeatherView = Backbone.view.extend({
// // 	render: function(){
// // 		console.log('here comes the weather method in render method')
// // 		console.log(this.collection)
// // 	}

// // })




// 	var WeatherRouter = Backbone.Router.extend({
// 		routes: {
// 			'weather/:lat/:lng': 'showSearchResults',
// 			'*anyroute': 'showDefault'
// 		},

// 		showDefault: () => {
// 			var wm = new WeatherModel()
// 			window.wm = wm
// 			wm.fetch({
// 				data: {
// 					api: wm.apiKey.replace('?api=',''),
// 					q: "29.7604/95.3698"
// 				},
// 				processData: true
// 			})
// 		},

// 		showSearchResults: (lat, lng) => {
// 			console.log('responding to hash')
// 			var wm = new WeatherModel()
// 			var lv = new ListView({model:wm})
// 			wm.fetch({
// 				data: {
// 					api: wm.apiKey.replace('?api=',''),
// 					q: lat/lng
// 				},
// 				processData: true
// 			})
// 		},

// 		initialize: () => {
// 			Backbone.history.start()
// 		}
// 	})

// 	var thisRouter = new WeatherRouter()

// }










