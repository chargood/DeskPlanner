var PersonListView = Backbone.View.extend({
	el: $('#page'),
	tagName:'table',
	
	events:{
		
    },
	
	initialize:function () {
	
	},
	
	render:function (eventName) {
		var that = this;
		var personlist = new PersonList();
		personlist.fetch({
			success: function(personlist){
				_.each(personlist.models, function (person) {
					$(this.el).append(new PersonListItemView({model:person}).render().el);
				}, this);
				return this;				
			}
		})		
	}
});

var PersonListItemView = Backbone.View.extend({
	el: $('#page'),
	tagName:'tr',
	
	events:{
		'click .edit': 'edit',
		'click .delete': 'delete'
    },
	
	initialize:function () {
		this.template = _.template(tpl.get('personListItem'));
	},
	
	render:function (eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		console.log(this.el)
        return this;
	},
	
	edit:function (){
		console.log("edit",this.model.toJSON().name)
	},
	
	delete:function(){
		console.log("delete",this.model.toJSON().name)
	}

});

var PersonView = Backbone.View.extend({

	events:{
    },
	
	initialize:function () {
	
	},
	
	render:function (eventName) {
	 
	}

});