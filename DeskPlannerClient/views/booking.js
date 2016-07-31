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
                console.log('Booking deleted successfully');
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
			notes:$('#notes').val()
		}
		
		this.model.set(bookingDetails)
		
		if(that.model.bookingValidate()){
			this.model.save(bookingDetails,{
				success: function (booking){
					console.log("booking saved")						
					app.navigate('bookinglist', {trigger:true});
				},
				error: function(model, response) {
					console.log("booking error")
					console.log(response);
				}
			});
		}
		else{
			$( "#bookingerror" ).dialog( "open" );
		}
	
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
	
		var that=this
	
		var bookingDetails = {
			personId:$('#personId').val(),
			deskId:$('#deskId').val(),
			startDate:$('#startDate').datepicker( "getDate" ),
			endDate:$('#endDate').datepicker( "getDate" ),
			status:"pending",
			notes:$('#notes').val()
		}
		
		this.model.set(bookingDetails)
		
		if(that.model.bookingValidate()){
			this.model.save(bookingDetails,{
				success: function (booking){
					console.log("booking saved")						
					app.navigate('bookinglist', {trigger:true});
				},
				error: function(model, response) {
					console.log("booking error")
					console.log(response);
				}
			});
		}
		else{
			$( "#bookingerror" ).dialog( "open" );
		}
	}

});

var BookingProcessView = Backbone.View.extend({
	events:{
		'click #save1': 'save1',
		'click #save2': 'save2',
		'click #save3': 'save3',
		'click #newperson': 'newperson',
		'click #save': 'saveperson'
    },
	
	
	initialize:function () {
		
		if(!this.model.get("personId")){
			this.stage=1
		}
		else if(!this.model.get("startDate")){
			this.stage=2
		}
		else{
			this.stage=3
		}
	
		console.log("MB1", this.model, this.stage)
		this.template1 = _.template(tpl.get('bookingProcess1'));
		this.template2 = _.template(tpl.get('bookingProcess2'));
		this.template3 = _.template(tpl.get('bookingProcess3'));
	},
	
	render:function (eventName) {		
		
		console.log("MB2", this.model, this.stage)
		
		if(this.stage==1){
			$(this.el).html(this.template1({booking:false}));
			return this;
		}
		else if(this.stage==2){
			$(this.el).html(this.template2({booking:false}));
			return this;
		}		
		else if(this.stage==3){
			$(this.el).html(this.template3({booking:false}));
			return this;
		}
	},
	
	newperson:function (eventName) {
		this.template = _.template(tpl.get('personEdit'));
		var that = this
		
		this.model = new Person();
		
		$(that.el).html(that.template({person:false}));
		return that;
	},
	
	saveperson:function (eventName) {
	
		var personDetails = {
			name:$('#name').val(),
			status:$('#status').val(),
			manager:$('#manager').val(),
			contact:$('#contact').val(),
			notes:$('#notes').val(),
		}
		
		this.model.save(personDetails,{
			success: function (person){
				console.log("person saved")
				var bookingDetails = {
					personId:person.id,
				}
							
				app.makeBooking(bookingDetails);
			},
			error: function(model, response) {
				console.log("person error")
				console.log(response);
			}
		});	
	},
	

	
	save1:function (eventName) {
		var that=this
	
		var bookingDetails = {
			personId:$('#personId').val(),
		}
		
		this.model.set(bookingDetails)
		console.log("model",this.model.toJSON())
		app.makeBooking(bookingDetails);	
	},
	
	save2:function (eventName) {
		var that=this
	
		var bookingDetails = {
			startDate:$('#startDate').datepicker( "getDate" ),
			endDate:$('#endDate').datepicker( "getDate" ),
		}
		
		this.model.set(bookingDetails)
		console.log("model",this.model.toJSON())
		app.makeBooking(this.model.attributes);	
	},
	
	save3:function (eventName) {
		var that=this
	
		var bookingDetails = {
			notes:$('#notes').val(),
			status:"pending"
		}
		
		this.model.set(bookingDetails)
		console.log("model",this.model.toJSON())
		
		this.model.save(bookingDetails,{
			success: function (booking){
				console.log("booking saved 3")
				app.navigate('', {trigger:true});
			},
			error: function(model, response) {
				console.log("booking error")
				console.log(response);
			}
		});	
	}	
});