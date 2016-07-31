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
	urlRoot: '/deskplanner/booking',

	bookingValidate:function(){
		
		var that = this;
		var res = true;
		
		if(new Date(this.get("endDate"))<new Date(this.get("startDate"))){
			res=false
			$( "#bookingerror" ).text("This Booking is invalid. The end date is before the start date.");
			return false
		}
		else{		
			app.bookingList.each(function(booking){
				if(booking.get("id")!=that.get("id")){
					if(booking.get("deskId")==that.get("deskId")){
						if(new Date(booking.get("endDate"))<new Date(that.get("startDate"))||new Date(booking.get("startDate"))>new Date(that.get("endDate"))){
							
						}
						else{
							res=false
							$( "#bookingerror" ).text("This Booking is invalid. It clashes with another booking using this desk at this time.");
							return false
						}
					}
				}
			
			})
		}
		return res;
	}
})

var DeskMapList = Backbone.Collection.extend({
	url: '/deskplanner/deskmap'
})

var DeskMap = Backbone.Model.extend({
	urlRoot: '/deskplanner/deskmap'	
})