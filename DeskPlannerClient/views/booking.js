window.BookingListView = Backbone.View.extend({

	tagName:'table',
	
	events:{
		'click #create': 'create',
    },
	
	initialize:function () {
		this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (booking) {
            $(self.el).append(new BookingListItemView({model:booking}).render().el);
        });
	},
	
	render:function (eventName) {
		$(this.el).append("<h3>Booking List</h3>")
		_.each(app.bookingList.models, function (booking) {
			console.log("p",booking)
			$(this.el).append(new BookingListItemView({model:booking}).render().el);
		}, this);
		$(this.el).append("<button id='create'>Create</button>")
		return this;				

	},
	
	create:function (){
		app.navigate('createbooking', {trigger:true});
	},
});

window.BookingListItemView = Backbone.View.extend({

	tagName:'tr',
	
	events:{
		'click .edit': 'edit',
		'click .delete': 'delete'
    },
	
	initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
		this.template = _.template(tpl.get('bookingListItem'));
	},
	
	render:function (eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	
	edit:function (){
		app.navigate('editbooking/' + this.model.toJSON().id, {trigger:true});
	},
	
	delete:function(){
		this.model.destroy({
            success:function () {
                alert('Booking deleted successfully');
            }
        });
        return false;
	}

});

window.BookingView = Backbone.View.extend({
	
	events:{
    },
	
	initialize:function () {
		
	},
	
	render:function (eventName) {
		
		this.template = _.template(tpl.get('booking'));
		
		var that = this

		$(that.el).html(that.template({booking:this.model}));
		return that;				


	}

});

var BookingEditView = Backbone.View.extend({
	
	events:{
		'click #save': 'save'
    },
	
	initialize:function () {
		this.template = _.template(tpl.get('bookingEdit'));
        this.model.bind("change", this.render, this);
	},
	
	render:function (eventName) {
		
		var that = this

		$(that.el).html(that.template({booking:this.model}));
		return that;
	},
	
	save:function (eventName) {
	
		var bookingDetails = {
			personId:$('#personId').val(),
			deskId:$('#deskId').val(),
			startDate:$('#startDate').datepicker( "getDate" ),
			endDate:$('#endDate').datepicker( "getDate" ),
			status:$('#status').val(),
		}
		
		this.model.save(bookingDetails,{
			success: function (reading){
				console.log("booking saved")						
				app.navigate('bookinglist', {trigger:true});
			},
			error: function(model, response) {
				console.log("reading error")
				console.log(response);
			}
		});
	
	}

});

var BookingCreateView = Backbone.View.extend({
	
	events:{
		'click #save': 'save'
    },
	
	initialize:function () {
		this.template = _.template(tpl.get('bookingEdit'));
	},
	
	render:function (eventName) {		
		var that = this
		
		this.model = new Booking();
		
		$(that.el).html(that.template({booking:false}));
		return that;				
		

	},
	
	save:function (eventName) {
	
		var bookingDetails = {
			personId:$('#personId').val(),
			deskId:$('#deskId').val(),
			startDate:$('#startDate').datepicker( "getDate" ),
			endDate:$('#endDate').datepicker( "getDate" ),
			status:"pending",
		}
		
		this.model.save(bookingDetails,{
			success: function (reading){
				console.log("booking saved")						
				 app.navigate('bookinglist', {trigger:true});
			},
			error: function(model, response) {
				console.log("reading error")
				console.log(response);
			}
		});
	
	}

});