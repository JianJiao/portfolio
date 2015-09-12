var LayerView = require('./LayerView.js');
var ProjectsView = require('./ProjectsView.js');

// el will be passed when initializing
var GroupView = Backbone.View.extend({
  initialize: function(){
    this.subviews = [];
  },

  // options.className, options.model
  addLayer: function(options){
    var layerView = new LayerView(options);
    this.subviews.push(layerView);
    this.$el.append(layerView.render().el);
  },

  render: function(){
    return this;
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

module.exports = {
  GroupView: GroupView,
  IntroGroup: IntroGroup,
};