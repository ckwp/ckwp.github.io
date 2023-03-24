$(function(){
    $('.contentsNav a').on('click',function(){
        var target =$($(this).attr('href'));
        target.addClass('active');
        setTimeout(function(){
            target.removeClass('active')
        },1000)
    })
})