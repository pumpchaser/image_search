    jQuery(function() {
      $('#<%=photo[:id]%>').click(function (e) {
        
        //ajax call to fetch photo info
        
        var fetch_id = '<%=photo[:id]%>';
        var fetch_secret = '<%=photo[:secret]%>';  

        $.ajax({
          type: 'GET',
          url: '/photos/fetch_info',
          dataType: 'json',
          data: { 'id' : fetch_id, 'secret' : fetch_secret },
          success: function(data){

               var google_map_url = 'http://maps.googleapis.com/maps/api/staticmap?center=' + data.location.latitude + ',' + data.location.longitude + '&zoom=14&size=400x300&sensor=false';          
             
            //edit innerHTML of basic_modal
            $('.basic_modal').html(

              "<div id='googlemap_image'>"+
                "<%# escape_javascript(image_tag google_map_url )%>"+ //THIS LINE IS BROKEN
              "</div>" +

              "<div id='modal_image'>"+
                "<%= escape_javascript(image_tag photo[:url]) %>"+
              "</div>"+

              "<div id='modal_photo_info_container'>"+
                 "<div class='modal_photo_attr'>"
                    +data.title+ 
                 "</div>"+ 
                 "<div class='modal_photo_attr'>"+
                    "By: " +data.owner.username+ 
                 "</div>"+ 
                 "<div class='modal_photo_attr'>"
                    +data.location.region._content+ ", " +data.location.country._content+ 
                 "</div>"+
              "</div>"
                 


             );

            //load modal
            $('.basic_modal').modal({
              overlayClose:true
            });

          } //end success: function(result)
        });



        return false;
      });
    });