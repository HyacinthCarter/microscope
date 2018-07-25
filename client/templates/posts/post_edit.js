Template.postEdit.onCreated(function(){
    Session.set('postEditErrors', {});
});

Template.postEdit.events({
    'submit form': function(event){
        event.preventDefault();
        const target = event.target;

        var currentPostId = this._id;

        var postProperties = {
            url: target.url.value,
            title: target.title.value
        };

        Posts.update(currentPostId, {$set: postProperties}, function(error){
            if(error){
                throwError(error.reason);
            }else{
                Router.go('postPage', { _id: curentPostId})
            }
        })
    },

    'click .delete': function(event){
        event.preventDefault();

        if(confirm('Delete this post?')){
            var currentPostId = this._id;
            console.log(currentPostId);
            Posts.remove(currentPostId);
            Router.go('postsList')
        }
    }
});

Template.postEdit.helpers({
    errorMessage:function(field){
        let val = Session.get("postEditErrors")[field];
    },
    errorClass: function(field){
        return !!Session.get('postEditErrors')[field] ?  'has-error': '';
    }
})