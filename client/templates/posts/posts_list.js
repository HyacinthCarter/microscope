
Template.postsList.helpers({
    posts: function(){
        return Posts.find({}, {sort: {submitted: -1 }});
    }
});

Template.postsList.onRendered(function(){
//   var selected = document.getElementById('sel'), Opt, i;
//   console.log(selected);
//   for( var i = 0; i < selected.length; i++){
//       Opt = selected[i]; 
//       console.log(Opt);
//       if( Opt.value % 2 == 0){
//           console.log('even'); 
//           alert('even');
//         }else{
//           console.log('odd');
//           alert('odd number');
//         }
//   }
})
   