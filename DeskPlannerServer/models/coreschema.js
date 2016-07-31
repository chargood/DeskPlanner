var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Person = new Schema({
	name: String,
	status: String,
	manager: String,
	contact: String,
	notes: String
});
Person.virtual('id').get(function(){
    return this._id.toHexString();
});
Person.set('toJSON', {
    virtuals: true
});

var Desk = new Schema({
	list: String,
	bay: String,
	desk: String
});
Desk.virtual('id').get(function(){
    return this._id.toHexString();
});
Desk.set('toJSON', {
    virtuals: true
});

var DeskMap = new Schema({
	name: String,
	deskMappings: [DeskMapping],
	objects: [Schema.Types.Mixed]
});
DeskMap.virtual('id').get(function(){
    return this._id.toHexString();
});
DeskMap.set('toJSON', {
    virtuals: true
});

var DeskMapping = new Schema({
	pos: [Number],
	size: [Number],
	deskId: String
});
DeskMapping.virtual('id').get(function(){
    return this._id.toHexString();
});
DeskMapping.set('toJSON', {
    virtuals: true
});

var Booking = new Schema({
	personId: String,
	deskId: String,
	startDate: Date,
	endDate: Date,
	status: String,
	notes: String
});
Booking.virtual('id').get(function(){
    return this._id.toHexString();
});
Booking.set('toJSON', {
    virtuals: true
});


module.exports = {
	Person: mongoose.model('Person', Person),
	Desk: mongoose.model('Desk', Desk),
	DeskMap: mongoose.model('DeskMap', DeskMap),
	DeskMapping: mongoose.model('DeskMapping', DeskMapping),
	Booking: mongoose.model('Booking', Booking)
}

