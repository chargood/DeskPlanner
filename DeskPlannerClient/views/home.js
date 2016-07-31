window.HomeView = Backbone.View.extend({
	initialize:function () {
		this.template = _.template(tpl.get('home'));
	},
	
	render:function (eventName) {
		$(this.el).html(this.template());
		return this;
	}
})

window.AdminHomeView = Backbone.View.extend({
	initialize:function () {
		this.template = _.template(tpl.get('adminhome'));
	},
	
	render:function (eventName) {
		$(this.el).html(this.template());
		return this;
	}
})