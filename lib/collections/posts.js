Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function(userId, post){
        return ownsDocument(userId, post);
    },
    remove: function(userId, post){
        return ownsDocument(userId, post);
    }
});

Posts.deny({
    update: function(userId, post, fieldNames){
        // the following line of code uses underscore's without() method to check that only allowed fields are being edited and returns a subray array
        // if a user tries to edit anything besides the allowed fields, the length of the array becomes 1 or more and the callback would return true and terminate the execution of the update
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Posts.deny({
    update: function(userId, post, fieldNames, modifier){
        var errors = validatePost(modifier.$set);
        return errors.title || errors.url;
    }
});

validatePost = function(post){
    var errors = {};

    if(!post.title){
        errors.title = "Please fill in a headline";
    }
    if(!post.url){
        errors.url = "Please fill in a url"
    }
    return errors;
}

Meteor.methods({
    postInsert: function(postAttributes){
        check(Meteor.userId(), String );
        check(postAttributes, {
            title: String,
            url: String
        });

        var errors = validatePost(postAttributes);
        if (errors.title || errors.url){
            throw new Meteor.Error('invalid-post', "You must set a title and url for your post");
        }

        var postWithSameLink = Posts.findOne({ url: postAttributes.url });
        if (postWithSameLink){
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        } 
        
        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });

        var postId = Posts.insert(post);

        return {
            _id: postId
        };

    },
    upvote: function(postId){
        check(this.userId, String);
        check(postId, String);

        var post = Posts.findOne(postId);
        if (!post)
            throw new Meteor.Error('invalid', 'Post not found');

        if(_.include(post.upvoters, this.userId ))
        throw new Meteor.Error('invalid', 'Already upvoted this post');

        Posts.update(post._id, {
            $addToSet: { upvoters: this.userId },
            $inc: { votes: 1 }
        });
        
    }
})