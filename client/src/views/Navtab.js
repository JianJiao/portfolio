var Navtab = Backbone.View.extend({
  tagName: 'span',

  events: function(){
    return {
      'click': 'onClick'
    };
  },

  onClick: function(){
    console.log('clicked');
  },

  render: function(){
    return this;
  },

});

module.exports = Navtab;