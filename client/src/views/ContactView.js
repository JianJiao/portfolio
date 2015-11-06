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
      },
      submitHandler: function(form) {
        $(form).ajaxSubmit({
          url: '/comments',
          type: 'POST',
          success: function(msg) {
            console.log(msg);
          }
        });
        form.reset();
        $(form).find('button').blur();
      }
    });
  },

});

module.exports = ContactView;
