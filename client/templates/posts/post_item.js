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
    // },
    upvotedClass: function(){
        var userId = Meteor.userId();
        if ( userId && !_.include(this.upvoters, userId)){
            return 'btn-primary upvotable';
        } else{
            return 'disabled';
        }
    }
})
Template.postItem.events({
    'click .upvotable': function(event){
        event.preventDefault();
        Meteor.call('upvote', this._id);
    }
})