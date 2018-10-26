Template.postSubmit.onCreated(function(){
    Session.set('postSubmitErrors', {});
});

Template.postSubmit.events({
    'submit form': function (event) {
        event.preventDefault();
        const target = event.target;

        var post = {
            url: target.url.value,
            title: target.title.value,
        };

        var errors = validatePost(post);
        if (errors.title || errors.url){
            return Session.set('postSubmitErrors', errors);
        }

        Meteor.call('postInsert', post, function (error, result) {
            if (error) {
                return throwError(error.reason);
            }
            if (result.postExists) {
                throwError('This link has already been posted');
            }
            Router.go('postPage', { _id: result._id });
        });

    }
});

Template.postSubmit.helpers({
    errorMessage: function(field){
        return Session.get('postSubmitErrors')[field];
    },
    errorClass: function(field){
        return !!Session.get('postSubmitErrors')[field] ? 'has-error': '';
    }
})