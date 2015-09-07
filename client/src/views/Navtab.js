var Navtab = Backbone.View.extend({
  tagName: 'span',

  initialize: function(){
    this.listenTo(this.model, 'show', this.show);
    this.listenTo(this.model, 'hide', this.hide);
  },

  events: function(){
    return {
      'click': 'onClick'
    };
  },

  onClick: function(){
    this.model.requestShow();
  },

  show: function(){
    this.$el.addClass('current');
  },

  hide: function(){
    this.$el.removeClass('current');
  },

  render: function(){
    return this;
  },

});

module.exports = Navtab;