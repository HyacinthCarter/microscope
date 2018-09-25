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