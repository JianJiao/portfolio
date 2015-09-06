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

  /**
  * @private
  */
  getAnim: function(animIn){
    var array = animIn ? ProjectView.animIn : ProjectView.animOut;
    var index = Math.floor(Math.random() * array.length);
    return array[index];
  },


  show: function(anim){
    if(this.animating){
      return;
    }else{
      this.animating = true;
    }

    anim = anim || this.getAnim(true);
    console.log(anim);
    this.$el.removeClass('hide');
    this.$el.addClass('show');
    this.$el.addClass(anim);

    var counter = 0;

    this.$el.on('animationend', _.bind(function(){
      counter++;
      if(counter === 2){
        this.onAnimEnd(anim);
      }
    }, this));

  },

  /**
  * @private
  */
  onAnimEnd: function(anim){
    this.$el.removeClass(anim);
    this.animating = false;
  },

  hide: function(anim){
    if(this.animating){
      return;
    }else{
      this.animating = true;
    }

    anim = anim || this.getAnim(false);
    this.$el.addClass('hide');
    this.$el.addClass(anim);

    this.$el.one('animationend', _.bind(function(){
      this.$el.removeClass('show');
      this.$el.removeClass(anim);
      this.animating = false;
    }, this));
  },

},{
  animIn: ['moveUpIn','moveDownIn','slideUpIn','slideDownIn','slideLeftIn','slideRightIn'],
});

module.exports = ProjectView;