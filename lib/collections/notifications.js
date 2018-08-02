Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    update: function (userId, doc, fieldNames) {
        return ownsDocument(userId, doc) &&
            fieldNames.length === 1 && fieldNames[0] === 'read';
    }
});

createCommentNotification = function (comment) {
    var post = Posts.findOne(comment.postId);
    Notifications.insert({
        userId: Meteor.userId(),
        postId: post._id,
        commentId: comment._id,
        commenterName: comment.author,
        read: false
    });
    console.log("COmmrhiwfi");
  
};