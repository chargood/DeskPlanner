window.DeskPoolListView = Backbone.View.extend({

	tagName:'table',
	
	events:{
		'click #create': 'create',
    },
	
	initialize:function () {
		this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (deskpool) {
            $(self.el).append(new DeskPoolListItemView({model:deskpool}).render().el);
        });
	},
	
	render:function (eventName) {
		$(this.el).append("<h3>DeskPool List</h3>")
		_.each(app.deskpoolList.models, function (deskpool) {
			console.log("p",deskpool)
			$(this.el).append(new DeskPoolListItemView({model:deskpool}).render().el);
		}, this);
		$(this.el).append("<button id='create'>Create</button>")
		return this;				

	},
	
	create:function (){
		app.navigate('createdeskpool', {trigger:true});
	},
});

window.DeskPoolListItemView = Backbone.View.extend({

	tagName:'tr',
	
	events:{
		'click .edit': 'edit',
		'click .delete': 'delete'
    },
	
	initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
		this.template = _.template(tpl.get('deskpoolListItem'));
	},
	
	render:function (eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	
	edit:function (){
		app.navigate('editdeskpool/' + this.model.toJSON().id, {trigger:true});
	},
	
	delete:function(){
		this.model.destroy({
            success:function () {
                console.log('DeskPool deleted successfully');
            }
        });
        return false;
	}

});

window.DeskPoolView = Backbone.View.extend({
	
	events:{
    },
	
	initialize:function () {
		
	},
	
	render:function (eventName) {
		
		this.template = _.template(tpl.get('deskpool'));
		
		var that = this

		$(that.el).html(that.template({deskpool:this.model}));
		return that;				


	}

});

var DeskPoolEditView = Backbone.View.extend({
	
	events:{
		'click #save': 'save'
    },
	
	initialize:function () {
		this.template = _.template(tpl.get('deskpoolEdit'));
        this.model.bind("change", this.render, this);
	},
	
	render:function (eventName) {
		
		var that = this

		$(that.el).html(that.template({deskpool:this.model}));
		return that;
	},
	
	save:function (eventName) {
	
		var deskpoolDetails = {
			
		}
		
		this.model.save(deskpoolDetails,{
			success: function (reading){
				console.log("deskpool saved")						
				app.navigate('deskpoollist', {trigger:true});
			},
			error: function(model, response) {
				console.log("reading error")
				console.log(response);
			}
		});
	
	}

});

var DeskPoolCreateView = Backbone.View.extend({
	
	events:{
		'click #save': 'save'
    },
	
	initialize:function () {
		this.template = _.template(tpl.get('deskpoolEdit'));
	},
	
	render:function (eventName) {		
		var that = this
		
		this.model = new DeskPool();
		
		$(that.el).html(that.template({deskpool:false}));
		return that;				
		

	},
	
	save:function (eventName) {
	
		var deskpoolDetails = {
			
		}
		
		this.model.save(deskpoolDetails,{
			success: function (reading){
				console.log("deskpool saved")						
				 app.navigate('deskpoollist', {trigger:true});
			},
			error: function(model, response) {
				console.log("reading error")
				console.log(response);
			}
		});
	
	}

});