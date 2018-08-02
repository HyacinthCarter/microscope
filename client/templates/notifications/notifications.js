Template.notifications.helpers({
notifications: function () {
    return Notifications.find({userId: Meteor.userId(), read: false });
},
notificationCount: function () {
    let count = Notifications.find({ userId: Meteor.userId(), read: false }).count();
    return count;
}
});

Template.notificationItem.helpers({
    notificationPostPath: function () {
        return Router.routes.postPage.path({ _id: this.postId});
    }
});

Template.notificationItem.events({
    'click a': function (event) {
        // event.preventDefault();
        Notifications.update(this._id, {$set: { read: true }});
    }
})