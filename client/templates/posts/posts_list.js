var postsData = [
    {
        title: 'introducing telescope',
        url: 'http://sachagreif.com/introducing-telescope/'
    },
    {
        title: 'Meteor',
        url: 'http://meteor.com'
    },
    {
        title: 'the meteor book',
        url: 'http://themeteorbook.com'
    }
];

Template.postsList.helpers({
    posts: postsData
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
   