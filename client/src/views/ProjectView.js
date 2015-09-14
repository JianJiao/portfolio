var ProjectView = Backbone.View.extend({
  tagName: 'li',

  template: require('../../templates/project.tmpl.hbs'),

  initialize: function(){
    this.listenTo(this.model, 'show', this.show);
    this.listenTo(this.model, 'hide', this.hide);
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
    anim = anim || this.getAnim(true);
    // console.log('show is triggered ' + anim);
    this.$el.removeClass('hide');
    this.$el.addClass('show');
    var counter = 0;
    this.$el.addClass(anim);

    this.$el.on('animationend', _.bind(function(){
      counter++;
      if(counter === 2){
        this.onAnimEnd(anim);
      }
    }, this));
  },

  /**
  * Clean up when all animation on el ends
  * @private
  */
  onAnimEnd: function(anim){
    this.$el.removeClass(anim);
    this.$el.off('animationend');
    Backbone.Events.trigger('finish');
  },

  hide: function(anim){
    anim = anim || this.getAnim(false);
    // console.log('hide is triggered ' + anim);
    this.$el.addClass('hide');
    var counter = 0;
    this.$el.addClass(anim);

    this.$el.on('animationend', _.bind(function(){
      counter++;
      if(counter === 2){
        this.$el.removeClass('show');
        this.onAnimEnd(anim);
      }
    }, this));
  },

},{
  anims: [
  ['moveUpIn', 'moveUpOut'],
  ['moveDownIn', 'moveDownOut'],
  ['slideUpIn', 'slideUpOut'],
  ['slideDownIn', 'slideDownOut'],
  ['slideLeftIn', 'slideLeftOut'],
  ['slideRightIn', 'slideRightOut'],
  ],
  animIn: ['moveUpIn','moveDownIn','slideUpIn','slideDownIn','slideLeftIn','slideRightIn'],
  animOut: ['moveUpOut', 'moveDownOut', 'slideUpOut', 'slideDownOut', 'slideLeftOut',
   'slideRightOut'],
  /**
  * Class level method
  * @return {[]} animation pair
  */
  getAnim: function(){
    var idx = Math.floor(Math.random() * ProjectView.anims.length);
    return ProjectView.anims[idx];
  },
});

module.exports = ProjectView;