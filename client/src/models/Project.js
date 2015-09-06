var Project = Backbone.Model.extend({
  defaults: function(){
    return {
      title: '',
      description: '',
    };
  }
});

module.exports = Project;