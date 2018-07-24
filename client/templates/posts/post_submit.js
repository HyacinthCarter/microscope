Template.postSubmit.events({
    'submit form': function (event) {
        event.preventDefault();
        const target = event.target;

        var post = {
            url: target.url.value,
            title: target.title.value,
        };

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