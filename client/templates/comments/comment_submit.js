Template.commentSubmit.helpers({
    errorMessage: function(field){
        return Session.get('commentSubmitErrors')[field];
    },
    errorClass: function(field){
        return !!Session.get('commentSubmitErros')[field] ? 'has-error' : '';
    }
});

Template.commentSubmit.events({
    'submit form': function(event, template){
        event.preventDefault();

        let body = event.target.body.value;
        console.log(body);
        let comment = {
            body: body,
            postId: template.data._id
        };
        
        let errors = {};
        if(! (comment.body) ){
            errors.body = 'Please write some content';
            return Session.set('commentSubmitErrors', errors);
        }

        Meteor.call('commentInsert', comment, function(error, commentId) {
            if (error) {
                throwError(error.reason);
            }else{
                body.value = '';
            }
        })
    }
})