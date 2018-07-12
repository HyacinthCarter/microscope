Template.postSubmit.events({
   'submit form': function(event){
      event.preventDefault();
      const target = event.target;
      var post = {
          url: target.url.value,
          title: target.title.value,
        //   url: $(event.target).find('[name=url]').val(),
        //   title: $(event.target).find('[name=title]').val()
      };

      post._id = Posts.insert(post);
      Router.go('postPage', post );
     
    }
    
})