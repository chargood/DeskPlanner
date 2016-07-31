window.DeskListView = Backbone.View.extend({

	tagName:'table',
	
	events:{
		'click #create': 'create',
    },
	
	initialize:function () {
		this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (desk) {
            $(self.el).append(new DeskListItemView({model:desk}).render().el);
        });
	},
	
	render:function (eventName) {
		$(this.el).append("<h3>Desk List</h3>")
		_.each(app.deskList.models, function (desk) {
			console.log("p",desk)
			$(this.el).append(new DeskListItemView({model:desk}).render().el);
		}, this);
		$(this.el).append("<button id='create'>Create</button>")
		return this;				

	},
	
	create:function (){
		app.navigate('createdesk', {trigger:true});
	},
});

window.DeskListItemView = Backbone.View.extend({

	tagName:'tr',
	
	events:{
		'click .edit': 'edit',
		'click .delete': 'delete'
    },
	
	initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
		this.template = _.template(tpl.get('deskListItem'));
	},
	
	render:function (eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	
	edit:function (){
		app.navigate('editdesk/' + this.model.toJSON().id, {trigger:true});
	},
	
	delete:function(){
		this.model.destroy({
            success:function () {
                console.log('Desk deleted successfully');
            }
        });
        return false;
	}

});

window.DeskView = Backbone.View.extend({
	
	events:{
    },
	
	initialize:function () {
		
	},
	
	render:function (eventName) {
		
		this.template = _.template(tpl.get('desk'));
		
		var that = this

		$(that.el).html(that.template({desk:this.model}));
		return that;				


	}

});

var DeskEditView = Backbone.View.extend({
	
	events:{
		'click #save': 'save'
    },
	
	initialize:function () {
		this.template = _.template(tpl.get('deskEdit'));
        this.model.bind("change", this.render, this);
	},
	
	render:function (eventName) {
		
		var that = this

		$(that.el).html(that.template({desk:this.model}));
		return that;
	},
	
	save:function (eventName) {
	
		var deskDetails = {
			list:$('#list').val(),
			bay:$('#bay').val(),
			desk:$('#desk').val(),
		}
		
		this.model.save(deskDetails,{
			success: function (reading){
				console.log("desk saved")						
				app.navigate('desklist', {trigger:true});
			},
			error: function(model, response) {
				console.log("reading error")
				console.log(response);
			}
		});
	
	}

});

var DeskCreateView = Backbone.View.extend({
	
	events:{
		'click #save': 'save'
    },
	
	initialize:function () {
		this.template = _.template(tpl.get('deskEdit'));
	},
	
	render:function (eventName) {		
		var that = this
		
		this.model = new Desk();
		
		$(that.el).html(that.template({desk:false}));
		return that;				
		

	},
	
	save:function (eventName) {
	
		var deskDetails = {
			list:$('#list').val(),
			bay:$('#bay').val(),
			desk:$('#desk').val(),
		}
		
		this.model.save(deskDetails,{
			success: function (reading){
				console.log("desk saved")						
				 app.navigate('desklist', {trigger:true});
			},
			error: function(model, response) {
				console.log("reading error")
				console.log(response);
			}
		});
	
	}

});