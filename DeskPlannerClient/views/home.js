window.HomeView = Backbone.View.extend({
	initialize:function () {
		this.template = _.template(tpl.get('home'));
	},
	
	render:function (eventName) {
		$(this.el).html(this.template());
		return this;
	}
})