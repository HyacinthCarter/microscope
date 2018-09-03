Template.postItem.helpers({
    ownPost: function(){
        return this.userId === Meteor.userId();
    },
    domain: function(){
        var a = document.createElement('a');
        a.href = this.url;
        console.log(a.hostname);
        return a.hostname;
    },
    // commentsCount: function(){
    //     return Comments.find({ postId: this._id }).count();
    // }
})
Template.postItem.events({
    'click .upvote': function(event){
        event.preventDefault();
        Meteor.call('upvote', this._id);
    }
})