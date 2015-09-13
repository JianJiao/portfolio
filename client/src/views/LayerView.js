// model and className should be passed when initializing
var LayerView = Backbone.View.extend({
  tagName: 'div',

  render: function(){
    return this;
  },

});

// model should be passed to constructor
var DataLayer = LayerView.extend({
  render: function(){
    var html = this.template(this.model.toJSON());
    this.$el.append(html);
    return this;
  },
});

// use Project as the model
var DescLayer = DataLayer.extend({
  template: require('../../templates/desc.tmpl.hbs'),
});

var PicLayer = DataLayer.extend({
  template: require('../../templates/pic.tmpl.hbs'),
});

module.exports = {
  LayerView: LayerView,
  DescLayer: DescLayer,
  PicLayer: PicLayer,
};