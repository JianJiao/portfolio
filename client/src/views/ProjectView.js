var ProjectView = Backbone.View.extend({
  tagName: 'li',

  template: require('../../templates/project.tmpl.hbs'),

  initialize: function(){
    this.animating = false;
  },

  render: function(){
    var html = this.template(this.model.toJSON());
    this.$el.append(html);
    return this;
  },

  show: function(){

    if(this.animating){
      return;
    }else{
      this.animating = true;
    }

    setTimeout(_.bind(function(){
      this.$el.removeClass('hide');
      this.$el.addClass('show');
      this.$el.addClass('moveUpIn');
    }, this), 0);

    this.$el.one('animationend', _.bind(function(){
      this.$el.removeClass('moveUpIn');
      this.animating = false;
    }, this));

  },

  hide: function(){
    if(this.animating){
      return;
    }else{
      this.animating = true;
    }

    setTimeout(_.bind(function(){
      this.$el.addClass('hide');
      this.$el.addClass('moveUpOut');
    }, this), 0);

    this.$el.one('animationend', _.bind(function(){
      this.$el.removeClass('show');
      this.$el.removeClass('moveUpOut');
      this.animating = false;
    }, this));
  },

},{
  animIn: ['moveUpIn','moveDownIn','slideUpIn','slideDownIn','slideLeftIn','slideRightIn'],
});

module.exports = ProjectView;