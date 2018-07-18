Template.postEdit.events({
    'submit form': function(event){
        event.preventDefault();
        const target = event.target;

        var currentPostId = this._id;

        var postProperties = {
            url: target.url.value,
            title: target.title.value
        }

        Posts.update(currentPostId, {$set: postProperties}, function(error, result){
            if(error){
                alert(error.reason)
            }else{
                Router.go('postPage', { _id: curentPostId})
            }
        })
    },

    'click .delete': function(event){
        event.preventDefault();

        if(confirm('Delete this post?')){
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postList')
        }
    }
})