var LayerView = require('./LayerView.js');
var ProjectsView = require('./ProjectsView.js');

// model and el will be passed when initializing
var GroupView = Backbone.View.extend({
  initialize: function(){
    this.subviews = [];
  },

  addLayer: function(className){
    var layerView = new LayerView.LayerView({className: className});
    this.$el.append(layerView.render().el);
  },

});

var IntroGroup = GroupView.extend({
  // @param: {Projects(collection)} options.projects
  initialize: function(options){
    this.constructor.__super__.initialize.apply(this, arguments);
    this.z = -60;
    this.opacityVal = 1;
    console.log(options.projects);
    this.initSlideshow(options.projects);
  },

  initSlideshow: function(projects){
    this.projectsView = new ProjectsView({
      collection: projects,
    });
  },

  onScroll: function(yDelta){
    zDelta = yDelta / 5;
    this.z += zDelta;
    this.opacityVal -= zDelta * 0.03;
    if(this.z >= 0){
      return;
    }

    // move pseudo base on z axis
    this.$el.find('.base').css({
      transform: 'translateZ(' + this.z + 'px) scale(1.2)',
    });

    // change the bg_blur opacity
    this.$el.find('.surface').css({opacity: this.opacityVal});

  },
});

var CommonGroup = GroupView.extend({
  addAboveLayers: function(){
    this._addDataLayer('base layer', LayerView.PicLayer);
    this._addDataLayer('fore layer', LayerView.DescLayer);
  },

  addBelowLayers: function(){
    this._addDataLayer('base layer', LayerView.PicLayer);
    this._addDataLayer('deep layer', LayerView.DescLayer);
  },

  _addDataLayer: function(className, ViewClass){
    var layerView = new ViewClass({
      model: this.model,
      className: className,
    });
    this.subviews.push(layerView);
    this.$el.append(layerView.render().el);
  },

  render: function(){
    return this;
  },

});

module.exports = {
  GroupView: GroupView,
  IntroGroup: IntroGroup,
  CommonGroup: CommonGroup,
};