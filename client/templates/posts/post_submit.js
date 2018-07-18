Template.postSubmit.events({
   'submit form': function(event){
      event.preventDefault();
      const target = event.target;

      var post = {
          url: target.url.value,
          title: target.title.value,
        };

      Meteor.call('postInsert', post, function(error, result){
          if (error){
              return alert(error.reason);
              if (result.postExists){
                  alert('This link has already been posted');
                }
            }else{
              Router.go('postPage', { _id: result._id } );
            }
        });
     
    }
});