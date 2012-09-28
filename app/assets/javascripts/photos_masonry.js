/* Masonry/InfiniteScroll for Pinterest-like Layout */

$(function () {

  var $container = $('#photos_container');

  $container.imagesLoaded(function(){
    $container.masonry({
     itemSelector : '.each_photo_container',
    });
  });
        
        
 
  $container.infinitescroll({
    navSelector  : '#page_navigation',            
            // selector for the paged navigation (it will be hidden)
    nextSelector : '#next_button a',    
            // selector for the NEXT link (to page 2)
    itemSelector : '.each_photo_container'          
             // selector for all items you'll retrieve

  },
  //trigger masonry on infinitescroll callback and add id to div
    function(newElements){
      var $newElems = $(newElements).css({ opacity: 0 });
      $newElems.imagesLoaded(function(){
        $newElems.attr('id', this.id);
        $newElems.attr('data-id', this.id);
        $newElems.attr('data-secret', this.secret);
        $newElems.attr('data-server', this.server);
        $newElems.attr('data-farm', this.farm);

        //reload photos_modal.js to add click listener on new elements
        $.ajax({
          url: 'assets/photos_modal.js',
          dataType: "script",
        });

        $newElems.animate({ opacity: 1 });
        $container.masonry('appended', $newElems, true);

      });
    }

  );
 
});
