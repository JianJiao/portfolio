var ContactView = Backbone.View.extend({
  el: '#end',

  initialize: function() {
    this.$('form').validate({
      rules: {
        first: {
          required: true
        },
        last: {
          required: true
        },
        email: {
          required: true,
          email: true
        }
      }
    });
  },

  events: {
    'submit': 'onSubmit'
  },

  onSubmit: function(){
    console.log('submitted');
  }
});

module.exports = ContactView;
