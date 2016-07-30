var PersonList = Backbone.Collection.extend({
	url: '/deskplanner/person'
})

var Person = Backbone.Model.extend({
	urlRoot: '/deskplanner/person'	
})

var DeskList = Backbone.Collection.extend({
	url: '/deskplanner/desk'
})

var Desk = Backbone.Model.extend({
	urlRoot: '/deskplanner/desk'	
})

var BookingList = Backbone.Collection.extend({
	url: '/deskplanner/booking'
})

var Booking = Backbone.Model.extend({
	urlRoot: '/deskplanner/booking'	
})

var DeskMapList = Backbone.Collection.extend({
	url: '/deskplanner/deskmap'
})

var DeskMap = Backbone.Model.extend({
	urlRoot: '/deskplanner/deskmap'	
})