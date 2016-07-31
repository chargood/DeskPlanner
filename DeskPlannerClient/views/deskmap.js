window.DeskMapListView = Backbone.View.extend({

	tagName:'table',
	
	events:{
		'click #create': 'create',
    },
	
	initialize:function () {
		this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (deskmap) {
            $(self.el).append(new DeskMapListItemView({model:deskmap}).render().el);
        });
	},
	
	render:function (eventName) {
		$(this.el).append("<h3>DeskMap List</h3>")
		_.each(app.deskmapList.models, function (deskmap) {
			console.log("p",deskmap)
			$(this.el).append(new DeskMapListItemView({model:deskmap}).render().el);
		}, this);
		$(this.el).append("<button id='create'>Create</button>")
		return this;				

	},
	
	create:function (){
		app.navigate('createdeskmap', {trigger:true});
	},
});

window.DeskMapListItemView = Backbone.View.extend({

	tagName:'tr',
	
	events:{
		'click .edit': 'edit',
		'click .delete': 'delete'
    },
	
	initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
		this.template = _.template(tpl.get('deskmapListItem'));
	},
	
	render:function (eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	
	edit:function (){
		app.navigate('editdeskmap/' + this.model.toJSON().id, {trigger:true});
	},
	
	delete:function(){
		this.model.destroy({
            success:function () {
                console.log('DeskMap deleted successfully');
            }
        });
        return false;
	}

});

window.DeskMapView = Backbone.View.extend({
	
	events:{
    },
	
	initialize:function () {
		
	},
	
	render:function (eventName) {
		
		this.template = _.template(tpl.get('deskmap'));
		
		var that = this

		$(that.el).html(that.template({deskmap:this.model}));
		return that;				


	}

});

var DeskMapEditView = Backbone.View.extend({
	
	events:{
		'click #save': 'save'
    },
	
	initialize:function () {
		this.template = _.template(tpl.get('deskmapEdit'));
        this.model.bind("change", this.render, this);
	},
	
	render:function (eventName) {
		
		var that = this

		$(that.el).html(that.template({deskmap:this.model}));
		return that;
	},
	
	save:function (eventName) {
	
		var deskmapDetails = {

		}
		
		this.model.save(deskmapDetails,{
			success: function (reading){
				console.log("deskmap saved")						
				app.navigate('deskmaplist', {trigger:true});
			},
			error: function(model, response) {
				console.log("reading error")
				console.log(response);
			}
		});
	
	}

});

var DeskMapCreateView = Backbone.View.extend({
	
	events:{
		'click #save': 'save'
    },
	
	initialize:function () {
		this.template = _.template(tpl.get('deskmapEdit'));
	},
	
	render:function (eventName) {		
		var that = this
		
		this.model = new DeskMap();
		
		$(that.el).html(that.template({deskmap:false}));
		return that;				
		

	},
	
	save:function (eventName) {
	
		var deskmapDetails = {

		}
		
		this.model.save(deskmapDetails,{
			success: function (reading){
				console.log("deskmap saved")						
				 app.navigate('deskmaplist', {trigger:true});
			},
			error: function(model, response) {
				console.log("reading error")
				console.log(response);
			}
		});
	
	}

});