// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')

var $ = require('jquery'),
	Backbone = require('backbone')

	console.log('loaded dist file')


var WeatherModel = Backbone.Model.extend({
	url: function(){
		return "https://api.forecast.io/forecast/55fd4415dbaf5029ad9b6cb7d69c60f5/" + this.city
	},
	

	parse: function(responseData) {
		console.log(responseData)
		return responseData
	}
})

// Views

var CurrentView = Backbone.View.extend({
	
	el: "#weatherContainer",

	events: {
		"keypress input": "getUserQuery",
		"click button": "handleButtonClick"
	},

	getApparentTemp: function(){
		var apparentTemperature = this.model.attributes.currently.apparentTemperature
		var tempString = `Current Temperature: ${apparentTemperature} Degrees Fahrenheit`
		return tempString
	},

	getHumidity: function() {
		var humidity = this.model.attributes.currently.humidity
		var humidString = `Humidity: ${humidity}%`
		return humidString
	},

	getIcon: function() {
		var icon = this.model.attributes.currently.icon
		return icon
	},

	getPrec: function() {
		var precipProbability = this.model.attributes.currently.precipProbability
		var precProbString = `Chance of Precipitation: ${precipProbability}%`
		return precProbString
	},

	getSummary: function() {
		var summary = this.model.attributes.currently.summary
		var summaryString = `Summary: ${summary}`
		return	summaryString
	},

	getWindSpeed: function() {
		var windSpeed = this.model.attributes.currently.windSpeed
		var windString = `Wind Speed: ${windSpeed} mph`
		return windString
	},

	getUserQuery: function(event){
		console.log('event triggered')
		if (event.keyCode === 13){
			var inputEl = event.target,
				city = inputEl.value
			location.hash = `weather/${city}`
		}
	},

	handleButtonClick: function(event){
		console.log('button clicked')
		location.hash.split('/')[1]
		var buttonElement = event.target,
			viewType = buttonElement.value
		location.hash = `${location.hash}/${viewType}`
		console.log(location.hash)
	},

	render: function(){
		console.log('here comes the weather method in render method')
		console.log(this.model)
		this.$el.html(
			`<input type="text" placeholder="Please Enter Your City"></input>
			<div id="currentView">
			<button type="button" value="hourly">Hourly</button>
			<button type="button" value="daily">Daily</button>
				<p>${this.getSummary()}</p>
				<p>${this.getApparentTemp()}</p>
				<p>${this.getHumidity()}</p>
				<p>${this.getPrec()}</p>
				<p>${this.getWindSpeed()}</p>
			</div>`)

	},

	initialize: function(){
		this.listenTo(this.model, 'sync', this.render)
	}
})

var DailyView = Backbone.View.extend({
	
	el: "#weatherContainer",


	getDailyDiv: function(dayObj){
		var htmlString_day = `
		<div id="dailyView">
			<ul>
				<li> Summary: ${dayObj.summary}</li>
				<li> High: ${dayObj.temperatureMax}</li>
				<li> Low: ${dayObj.temperatureMin}</li>
				<li> Humidity: ${dayObj.humidity}</li>
				<li> Precipitation: ${dayObj.precipProbability}</li>
				<li> Wind Speed: ${dayObj.windSpeed}</li>
			</ul>
		</div>`
		return htmlString_day
	},

	render: function(){
		console.log('here comes the weather')
		console.log(this.model)
		var htmlString = "<div>",
			days = this.model.attributes.daily.data
			days.forEach((obj) => {
				htmlString += this.getDailyDiv(obj)
			})
		htmlString += "</div>"
		this.$el.html(htmlString)		
	},

	initialize: function(){
		
	}
})

var HourlyView = Backbone.View.extend({
	el: "#weatherContainer",

	getHourlyDiv: function(hourlyObj){
		var htmlString_hour = `
		<div id="hourlyView">
			<ul>
				<li> Time: (${hourlyObj.time}/100)</li>
				<li> Summary: ${hourlyObj.summary}</li>
				<li> Temperature: ${hourlyObj.temperature}</li>
				<li> Precipitation: ${hourlyObj.precipProbability}</li>
			</ul>
		</div>`
		return htmlString_hour
	},

	render: function(){
		console.log('here comes hourly weather')
		var htmlString = "<div>",
			hours = this.model.attributes.hourly.data
			hours.forEach((obj) => {
				htmlString += this.getHourlyDiv(obj)
			})
		htmlString += "</div>"
		this.$el.html(htmlString)
	},

	initialize: function(){

	}
})


// Routing 

var WeatherRouter = Backbone.Router.extend({
	routes: {
		'weather/:city/daily': 'showDailyResults',
		'weather/:city/hourly': 'showHourlyResults',
		'weather/:city': 'showSearchResults',
		'*anyroute': 'showDefault'
	},

	showDefault: function() {
		this.wm.city = "29.7604,-95.3698"
		this.wm.fetch({
			processData: true,
			dataType: 'jsonp'
		})
	},

	showSearchResults: function(city) {
		console.log('responding to hash in showSearchResults')
		this.wm.city = city
		this.wm.fetch({
			processData: true,
			dataType: 'jsonp'
		})
	},

	showDailyResults: function(city, daily){
		console.log('responding to hash')
		this.dv.render()
	},

	showHourlyResults: function(city, hourly){
		console.log('responding to hash for hourly')
		this.hv.render()
	},

	initialize: function() {
		this.wm = new WeatherModel()
		this.cv = new CurrentView({model:this.wm})
		this.dv = new DailyView({model:this.wm})
		this.hv = new HourlyView({model:this.wm})
		Backbone.history.start()
	}
})

var thisRouter = new WeatherRouter()


// window.DailyView = DailyView









