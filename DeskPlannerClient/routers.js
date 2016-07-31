Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

var AppRouter = Backbone.Router.extend({

    initialize:function () {
       
    },

    routes:{
		'':'home',
		'person/:id':'viewPerson',
		'editperson/:id':'editPerson',
		'createperson':'createPerson',
		'personlist':'viewPersonList',
		'desk/:id':'viewDesk',
		'editdesk/:id':'editDesk',
		'createdesk':'createDesk',
		'desklist':'viewDeskList',
		'booking/:id':'viewBooking',
		'editbooking/:id':'editBooking',
		'createbooking':'createBooking',
		'bookinglist':'viewBookingList',
		'makebooking':'makeBooking',
		'deskmap/:id':'viewDeskMap',
		'deskmap':'viewDeskMapList'
	},

    list:function () {
        this.before();
    },
	
	
	home:function(){
		console.log('Home Route');
		bookingStage=0
		this.before(function () {
            app.showView('#page', new HomeView());
        });
	},

	viewPerson:function(id){
		console.log('View Person Route');
		this.before(function () {
            var person = app.personList.get(id);
            app.showView('#page', new PersonView({model:person}));
        });
	},

	editPerson:function(id){
		console.log('Edit Person Route');
		this.before(function () {
            var person = app.personList.get(id);
            app.showView('#page', new PersonEditView({model:person}));
        });
	},

	createPerson:function(){
		console.log('Create Person Route');
		this.before(function () {
            app.showView('#page', new PersonCreateView());
        });
	},

	viewPersonList:function(){
		console.log('View Person List Route');
		this.before(function () {
            app.showView('#page', new PersonListView({model:app.personList}));
        });
	},

	viewDesk:function(id){
		console.log('View Desk Route');
		this.before(function () {
            var desk = app.deskList.get(id);
            app.showView('#page', new DeskView({model:desk}));
        });
	},

	editDesk:function(id){
		console.log('Edit Desk Route');
		this.before(function () {
            var desk = app.deskList.get(id);
            app.showView('#page', new DeskEditView({model:desk}));
        });
	},

	createDesk:function(){
		console.log('Create Desk Route');
		this.before(function () {
            app.showView('#page', new DeskCreateView());
        });
	},

	viewDeskList:function(){
		console.log('View Desk List Route');
		this.before(function () {
			console.log(app.bookingList)
            app.showView('#page', new DeskListView({model:app.deskList}));
        });
	},

	viewBooking:function(id){
		console.log('View Booking Route');
		this.before(function () {
            var booking = app.bookingList.get(id);
            app.showView('#page', new BookingView({model:booking}));
        });
	},

	editBooking:function(id){
		console.log('Edit Booking Route');
		this.before(function () {
            var booking = app.bookingList.get(id);
            app.showView('#page', new BookingEditView({model:booking}));
        });
	},

	createBooking:function(){
		console.log('Create Booking Route');
		this.before(function () {
            app.showView('#page', new BookingCreateView());
        });
	},

	viewBookingList:function(){
		console.log('View Booking List Route');
		this.before(function () {
            app.showView('#page', new BookingListView({model:app.bookingList}));
        });
	},
	
	makeBooking:function(b){
		console.log('Make Booking');
		this.before(function () {
			var booking = new Booking();
			if(b){
				booking.set(b)
			}
			console.log("TEST",b, booking)
            app.showView('#page', new BookingProcessView({model:booking}));
        });
	},

	viewDeskMap:function(id){
		console.log('View DeskMap Route');
	},

	viewDeskMapList:function(){
		console.log('View DeskMap List Route');
	},

    showView:function (selector, view) {
        if (this.currentView)
            this.currentView.close();
		console.log(view)
        $(selector).html(view.render().el);
        this.currentView = view;
        return view;
    },

    before:function (callback) {
        if (this.personList&&this.deskList&&this.bookingList&&this.deskMapList) {
            if (callback) callback();
        } else {
            app.personList = new PersonList();
            app.personList.fetch({success:function () {
				console.log("Person list fetched")
				app.deskList = new DeskList();
				app.deskList.fetch({success:function () {
					console.log("Desk list fetched")
					app.bookingList = new BookingList();
					app.bookingList.fetch({success:function () {
						console.log("Booking list fetched")
						app.deskMapList = new DeskMapList();
						app.deskMapList.fetch({success:function () {
							console.log("Desk Map list fetched")
						    if (callback) callback();							
						}});						
					}});					
				}});				
            }});
        }
    }

});

tpl.loadTemplates(['home','person','personListItem','personEdit','desk','deskListItem','deskEdit','booking','bookingListItem','bookingEdit','deskmap','deskmapListItem','deskmapEdit','bookingProcess1','bookingProcess2','bookingProcess3'], function () {
    app = new AppRouter();
    Backbone.history.start();
});
