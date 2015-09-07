var Project = require('../models/Project');
var Projects = Backbone.Collection.extend({
  model: Project,

  initialize: function(){
    // each time only allow one pair of anchors to be animated
    this.animating = false;
    this.counter = 0;
    // store the current model
    this.current = null;
    this.timerID = null;

    // events on other events
    this.listenTo(Backbone.Events, 'finish', this.onFinish);

    // events on self
    this.on('requestShow', this.showOne, this);
  },

  /**
  * The normal routine if no requests are made.
  * Start from the first model in the collection.
  */
  initRoutine: function(){
    var first = this.at(0);
    this.showOne(first);
  },

  /**
  * Process a show request with a model
  * If a new animation starts, start the timer.
  */
  showOne: function(model){
    // if the model is alread visible, do nothing
    if(this.animating || model === this.current){
      return;
    }
    // clear the previous timer: if not fired yet, clear it;
    // if already fired or null, no harm
    clearTimeout(this.timerID);
    this.animating = true;
    // check for the first time initiating an animation
    if(this.current){
      this.counter = 0;
      this.current.hide();
    }else{
      this.counter = 1;
    }
    this.current = model;
    this.current.show();
    // if no request made after 5s, make a new reqeust to show the next one
    this.timerID = setTimeout(_.bind(this.showNext, this), 5000);

  },

  /**
  * Show the next model in the collection. Show first one if this is already
  * the last one
  */
  showNext: function(){
    var idx = this.indexOf(this.current);
    idx++;
    if(idx >= this.length){
      idx = 0;
    }
    console.log(idx);
    var next = this.at(idx);
    this.showOne(next);
  },

  /**
  * When one animation finished, determine if all finish
  */
  onFinish: function(){
    this.counter++;
    // if both in and out finishes, animation ends
    if(this.counter == 2){
      this.animating = false;
      this.counter = 0;
    }
  },



});


module.exports = Projects;