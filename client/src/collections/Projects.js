var Project = require('../models/Project');
var Projects = Backbone.Collection.extend({
  model: Project,
});


module.exports = Projects;