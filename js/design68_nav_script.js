$(function(){


    $(window).scroll(function() {
        
        var $scroll = $(window).scrollTop();
        var point = $(window).height();

        if ($scroll >= point) {
            $('body').addClass('view');
        } else {
            $('body').removeClass('view');
        }
    });

    $('a[href^="#link_"]').click(function(){
        var href = $(this).attr('href');
        var position = $(href).offset().top - 80;

        $('html, body').animate({scrollTop:position}, 800, 'swing');
        return false;
    })
    
    $('#mainNav > ul').clone(true).appendTo('#mainNavClone');
})