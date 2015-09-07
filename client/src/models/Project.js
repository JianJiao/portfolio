var Project = Backbone.Model.extend({
  defaults: function(){
    return {
      title: '',
      description: '',
    };
  },

  show: function(anim){
    this.trigger('show', anim);
  },

  hide: function(anim){
    this.trigger('hide', anim);
  },

  requestShow: function(){
    this.trigger('requestShow', this);
  },

});

module.exports = Project;