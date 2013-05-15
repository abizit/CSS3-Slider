$(document).ready(function(){

  $('.slider').abSlider({
    pause : 4000,
    effect :'flipInY'

  });

  
});

(function($) {
  $.fn.abSlider = function(options) {
    var defaults = {
    pause: 5000,
    effect: 'fadeIn',

      }; 
        var variables = $.extend(defaults, options);
        var len;
        var infiniteLoop;  
        var currentItem = 0;
        var selector;
        var numberOfItems;
        var pager;


    return this.each(function() {
    selector = $(this);             //Main Slider Selector
    selector.wrap('<div class="ab-wrapper"></div>');

    selector.children().each(function(i, elem){
              $(this).attr('id', 'slide-' + i).addClass('slide-item').css({'display' : 'none'});
              
            });//assign ID to each slide            

            //count number of slide          
            selector.each(function(i, elem){        
              len = $(this).children().length;
                 });
            numberOfItems = len;
            
            //generate pagination and slider navigation
            $('.ab-wrapper').append('<div class="slidepagers"></div>');
            $('.ab-wrapper').append('<div class="slide-nav"><a href="" class="slide-prev">previous</a><a href="" class="slide-next">next</a></div>');
            for (var i=0; i<len; i++){
              $('.slidepagers').append('<a href="'+'#slide-'+i+'" class="slidepage">'+i+'</a>');
            }
            pager =$('.slidepage');
            
            
            selector.find('.slide-item').eq(0).addClass('current-slide animated').addClass(variables.effect).css({'display' : 'block'});
            $(pager).eq(0).addClass("active");

            //Slide Loop
            loop();

            // Page Control 
            pagerControl();

            //Previous Next Button
            prevNextControl();  
              
           
    });

//The slide Looper
function loop(){
          infiniteLoop = setInterval(function(){
                selector.find('.slide-item').eq(currentItem).removeClass(variables.effect).removeClass('current-slide animated').css({'display' : 'none'});
                 pager.eq(currentItem).removeClass("active");
                if(currentItem == numberOfItems -1){
                    currentItem = 0;
                }else{
                    currentItem++;
                }
                selector.find('.slide-item').eq(currentItem).addClass('current-slide animated').addClass(variables.effect).css({'display' : 'block'});
                pager.eq(currentItem).addClass("active");
                
 
            }, variables.pause);
}//loop

function pagerControl(){
    pager.click(function(){
                  var id =$(this).attr('href');
                  selector.find('.slide-item').removeClass(variables.effect).removeClass('current-slide animated').css({'display' : 'none'});
                  $(id).addClass('current-slide animated').addClass(variables.effect).css({'display' : 'block'});
                  $(pager).removeClass('active');
                  $(this).addClass('active');
                   clearInterval(infiniteLoop);
                  return false;
                  });
            

}//pagerControl


function prevNextControl(){


      $('.slide-next').click(function(){
        var firstSlide = $('.slide-item:first');
       if($('.slide-item:last').hasClass('current-slide')){
          $('.slide-item:last').removeClass(variables.effect).removeClass('current-slide animated').css({'display' : 'none'});
            firstSlide.addClass('current-slide animated').addClass(variables.effect).css({'display' : 'block'});

        } else {

          $('.current-slide').removeClass(variables.effect).removeClass('current-slide animated').css({'display' : 'none'}).next().addClass('current-slide animated').addClass(variables.effect).css({'display' : 'block'});
        }
        
          clearInterval(infiniteLoop);
          return false;
      });


      $('.slide-prev').click(function(){
        var lastSlide = $('.slide-item:last');
        
          if($('.slide-item:first').hasClass('current-slide')){
            $('.slide-item:first').removeClass(variables.effect).removeClass('current-slide animated').css({'display' : 'none'});
            lastSlide.addClass('current-slide animated').addClass(variables.effect).css({'display' : 'block'});

          } else {

          $('.current-slide').removeClass(variables.effect).removeClass('current-slide animated').css({'display' : 'none'}).prev().addClass('current-slide animated').addClass(variables.effect).css({'display' : 'block'});
        }
          
          clearInterval(infiniteLoop);
          return false;
        
        });

}//prevNextControl
  


  }
})(jQuery);