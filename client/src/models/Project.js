var Project = Backbone.Model.extend({
  defaults: function(){
    return {
      title: '',
      description: '',
    };
  },

  show: function(){
    this.trigger('show');
  },

  hide: function(){
    this.trigger('hide');
  },

  requestShow: function(){
    this.trigger('requestShow', this);
  },

});

module.exports = Project;