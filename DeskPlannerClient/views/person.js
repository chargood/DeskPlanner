window.PersonListView = Backbone.View.extend({

	tagName:'table',
	
	events:{
		'click #create': 'create',
    },
	
	initialize:function () {
		this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (person) {
            $(self.el).append(new PersonListItemView({model:person}).render().el);
        });
	},
	
	render:function (eventName) {
		$(this.el).append("<h3>Person List</h3>")
		_.each(app.personList.models, function (person) {
			console.log("p",person)
			$(this.el).append(new PersonListItemView({model:person}).render().el);
		}, this);
		$(this.el).append("<button id='create'>Create</button>")
		return this;				

	},
	
	create:function (){
		app.navigate('createperson', {trigger:true});
	},
});

window.PersonListItemView = Backbone.View.extend({

	tagName:'tr',
	
	events:{
		'click .edit': 'edit',
		'click .delete': 'delete'
    },
	
	initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
		this.template = _.template(tpl.get('personListItem'));
	},
	
	render:function (eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	
	edit:function (){
		app.navigate('editperson/' + this.model.toJSON().id, {trigger:true});
	},
	
	delete:function(){
		this.model.destroy({
            success:function () {
                alert('Person deleted successfully');
            }
        });
        return false;
	}

});

window.PersonView = Backbone.View.extend({
	
	events:{
    },
	
	initialize:function () {
		
	},
	
	render:function (eventName) {
		
		this.template = _.template(tpl.get('person'));
		
		var that = this

		$(that.el).html(that.template({person:this.model}));
		return that;				


	}

});

var PersonEditView = Backbone.View.extend({
	
	events:{
		'click #save': 'save'
    },
	
	initialize:function () {
		this.template = _.template(tpl.get('personEdit'));
        this.model.bind("change", this.render, this);
	},
	
	render:function (eventName) {
		
		var that = this

		$(that.el).html(that.template({person:this.model}));
		return that;
	},
	
	save:function (eventName) {
	
		var personDetails = {
			name:$('#name').val(),
			status:$('#status').val(),
			manager:$('#manager').val(),
			contact:$('#contact').val(),
			notes:$('#notes').val(),
		}
		
		this.model.save(personDetails,{
			success: function (reading){
				console.log("person saved")						
				app.navigate('personlist', {trigger:true});
			},
			error: function(model, response) {
				console.log("reading error")
				console.log(response);
			}
		});
	
	}

});

var PersonCreateView = Backbone.View.extend({
	
	events:{
		'click #save': 'save'
    },
	
	initialize:function () {
		this.template = _.template(tpl.get('personEdit'));
	},
	
	render:function (eventName) {		
		var that = this
		
		this.model = new Person();
		
		$(that.el).html(that.template({person:false}));
		return that;				
		

	},
	
	save:function (eventName) {
	
		var personDetails = {
			name:$('#name').val(),
			status:$('#status').val(),
			manager:$('#manager').val(),
			contact:$('#contact').val(),
			notes:$('#notes').val(),
		}
		
		this.model.save(personDetails,{
			success: function (reading){
				console.log("person saved")						
				 app.navigate('personlist', {trigger:true});
			},
			error: function(model, response) {
				console.log("reading error")
				console.log(response);
			}
		});
	
	}

});