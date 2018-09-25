Template.layout.onRendered(function(){
    // ensure main position is relative & the .page's div position is absolute
    this.find('#main')._uihooks = {
        insertElement: function(node, next){
            $(node)
            .hide()
            .insertBefore(next)
            .fadeIn();
        },
        removeElement: function(node){
            $(node).fadeOut(function(){
                $(this).remove();
            })
        }
    }
})

// var curl = require('curlrequest');
// var options =  { url: 'https://api.vista.co.nz',
//         header: { 'connectapitoken': '665754656565-76768'},
//         verbose: true,
//         stderr: true
//     };