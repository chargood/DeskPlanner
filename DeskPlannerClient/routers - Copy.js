var Router = Backbone.Router.extend({
	
	routes:{
		'':'home',
		'person/:id':'viewPerson',
		'editperson/:id':'editPerson',
		'createperson':'createPerson',
		'personlist':'viewPersonList',
		'desk/:id':'viewDesk',
		'desk':'viewDeskList',
		'booking/:id':'viewBooking',
		'booking':'viewBookingList',
		'deskmap/:id':'viewDeskMap',
		'deskmap':'viewDeskMapList'
	}	
});

var router = new Router();

tpl.loadTemplates(['person','personListItem','personEdit','desk','deskListItem','booking','bookingListItem','deskMap','deskMapListItem'], function () {
    Backbone.history.start();
});

var PersonView = new PersonView();
var PersonListView = new PersonListView();
var PersonEditView = new PersonEditView();
var DeskView = new DeskView();
var DeskListView = new DeskListView();
var BookingView = new BookingView();
var BookingListView = new BookingListView();
var DeskMapView = new DeskMapView();
var DeskMapListView = new DeskMapListView();


router.on('route:home', function(){
	console.log('Home Route');
	PersonListView.render();
});

router.on('route:viewPerson', function(id){
	console.log('View Person Route');
	PersonView.render({id:id});
});

router.on('route:editPerson', function(id){
	console.log('Edit Person Route');
	PersonEditView.renderEdit({id:id});
});

router.on('route:createPerson', function(){
	console.log('Create Person Route');
	PersonEditView.renderCreate();
});

router.on('route:viewPersonList', function(){
	console.log('View Person List Route');
	PersonListView.render();
});

router.on('route:viewDesk', function(id){
	console.log('View Desk Route');
	DeskView.render({id:id});
});

router.on('route:viewDeskList', function(){
	console.log('View Desk List Route');
	DeskListView.render();
});

router.on('route:viewBooking', function(id){
	console.log('View Booking Route');
	BookingView.render({id:id});
});

router.on('route:viewBookingList', function(){
	console.log('View Booking List Route');
	BookingListView.render();
});

router.on('route:viewDeskMap', function(id){
	console.log('View DeskMap Route');
	DeskMapView.render({id:id});
});

router.on('route:viewDeskMapList', function(){
	console.log('View DeskMap List Route');
	DeskMapListView.render();
});


