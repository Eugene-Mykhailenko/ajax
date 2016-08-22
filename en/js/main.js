$(document).ready(function() {

         //$(window).on('load', function () {
        var preloader = $('#page-preloader');
        preloader.delay(300).fadeOut('slow');
         //});
        var deviceAgent = navigator.userAgent.toLowerCase();
        var isTouchDevice = (deviceAgent.match(/(iphone|ipod|ipad)/) ||
        deviceAgent.match(/(android)/)  ||
        deviceAgent.match(/(iemobile)/) ||
        deviceAgent.match(/iphone/i) ||
        deviceAgent.match(/ipad/i) ||
        deviceAgent.match(/ipod/i) ||
        deviceAgent.match(/blackberry/i) ||
        deviceAgent.match(/bada/i));
        var isTouch =isTouchDevice;
        var once =true;
        var prevdef = function(e) { e.preventDefault(); }
            function ipadres () {
                if (isTouch) {
                        console.log('its touch!');
                        var isiPad = deviceAgent.match(/(iphone|ipod|ipad)/) || deviceAgent.match(/iphone/i) || deviceAgent.match(/ipad/i) || deviceAgent.match(/ipod/i) ;
                        // var ua = navigator.userAgent;
                        // var isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
                        //alert(isiPad)
                        if(isiPad && (Math.abs(window.orientation) === 90)){
                            document.addEventListener('touchmove', prevdef, false);

                           // alert(' landspace ');
                        } else if(isiPad && (window.orientation) === 0 || isiPad && ((window.orientation) === 180 )){
                            document.removeEventListener('touchmove', prevdef, false);
                             if (currentSlide === 0 || once){
                                once = false;
                                document.addEventListener('touchmove', prevdef, false);
                                //alert(' currentSlide === 0 '+ currentSlide + "  "+once);

                             }
                            //alert(' portrait ');
                        } else {
                           // alert(' ops ');
                        }
                        //$('.btn-down').removeClass("hidden-btn");
                }
            };
            ipadres();


                 //убрать кружок при занрузки девайса
                if(isTouch){
                setTimeout(function(){
                    $($( ".tab.active  .rotate-pic")).fadeOut();;
                }, 5000)
                }

        function pageSettings(){
            var mainContHaight = $(window).height() - $('.header-container').height();
            var tutorialLoadBarHaight = $(".step-bar").height();
            var mainTabHaight = mainContHaight - 75;
            var footerHaight = $('footer').height();
            $('.tutorial.main-container').css('height', mainContHaight - tutorialLoadBarHaight);
            $('.main-tab').css('height', mainTabHaight);
            $('.hub-settings-block').css('height', mainTabHaight);
            $('.room-col-inner').css('height', mainTabHaight);
            $('.device-col').css('height', mainTabHaight);
            $('.header-container').css('width', $(window).width());
            $('.products-characteristics-list').css('height',mainContHaight - 71);
            $('.products-characteristics-list section').css('height',mainContHaight - 71 - $('.product-page > header').outerHeight()).css('margin-top', $('.product-page > header').outerHeight());

            if ($(window).width()<1400) {
                $('.products-characteristics-list').css('height', mainContHaight - 61);
                $('.products-characteristics-list section').css('height',mainContHaight - 61 - $('.product-page > header').outerHeight()).css('margin-top', $('.product-page > header').outerHeight());

            };
            $('.owl-carousel div.owl-item').css('height', mainContHaight);
            $('.products-list.owl-carousel .owl-stage').css('height', mainContHaight);
            $('.products-list.owl-carousel div.owl-item').css('height',mainContHaight);
            $('#tab-container ').css('height', mainContHaight).css('top', $('.header-container').height());
            $('.product-page>header').css('top', $('.header-container').height());
            if ($(window).width() < 768) {
                $('.product-page .owl-carousel div.owl-item').css('height',mainContHaight - 50);
            };

        };
            pageSettings();
            var resTimer;
            var action = function() {
                pageSettings();
                addNeededClass();
                ipadres();
            };
            $(window).resize(function() {
                    pageSettings();
                    addNeededClass();
                    clearTimeout(resTimer);
                    resTimer = setTimeout(ipadres , 50);
            });

            function addNeededClass(){
            if ($(window).width() <= 768) {
                $('.owl-item.active.center').prev().addClass('prev-item');
                $('.owl-item.active.center').next().addClass('next-item');
                $(document).on('click', 'div.owl-item:not(.center)', function(){
                    $('.owl-item').removeClass('prev-item next-item');
                    $('.owl-item.active.center').prev().addClass('prev-item');
                    $('.owl-item.active.center').next().addClass('next-item');
                });
                $(".footer-container .subscribe").slideUp();
            } else{
                $(".footer-container .subscribe").css("display",""); // this work with little bug
            }

            };
            addNeededClass();


    $(document).on('click', '.product-page > header', function(){
        $(".product-page .owl-carousel").removeClass("active");
        $('.product-details').removeClass('active');
        $('.product-details .products-characteristics.active').fadeOut(500);
        $('.product-page > header').removeClass("active");
        $(".products-characteristics section").removeClass("active");
        $(".products-characteristics section").removeClass("top-position");
        $(".products-characteristics section").removeClass("bottom-position");
        $('.dotstyle li').removeClass("current");
        $('.dotstyle li:first-child').addClass("current");
        $('.btn-down').removeClass("active");
        $('.btn-down').removeClass("hidden-btn");
        //$(".product-details").slideUp(400);
        currentSlide = 0;
    });

    var currentSlide = 0;
    var scrollDelay = false;
    var scrollWorks = function(dir){
            var slideNum = $(".products-characteristics.active section").length;
            var slideli = $(".dotstyle li");
            var textAdded = false;

        if(dir == 'down') {

            // ALEX
            if( slideNum > currentSlide){
                slideli.eq(currentSlide).removeClass('current');
                slideli.eq(currentSlide+1).addClass('current');
             }
             // ALEX



            $('.btn-down').addClass("active"); //  стрелку поднять
            if (currentSlide == slideNum) {   // если последний слайд -> спрятать стрелку
                 //$('.btn-down').addClass("hidden-btn");
                return;
            }
            if ($(window).width() <= 768) {
                    $('.btn-down').addClass("hidden-btn"); //  начиная с планшета , стрелки нет
                    if(currentSlide===0) $('.products-characteristics.active .products-characteristics-list').animate({scrollTop:10}, '500');
            }
            if (currentSlide == (slideNum - 1)) {
                $('.btn-down').addClass("hidden-btn");
            }
            $(".product-page .owl-carousel").addClass("active");
            //$(".product-details").fadeTo(200,1).addClass("active");
            $(".product-details").addClass("active");
            $('.product-details.active .products-characteristics.active').fadeIn(500);
            $(".products-characteristics.active section").removeClass("active");
            if(!textAdded) {
                $('.product-page > header span').text($('div.owl-item.center .product-title').text());
                textAdded != textAdded;
            }
            $('.product-page > header').addClass("active");
            $(".products-characteristics.active section").eq(currentSlide).addClass("active").removeClass("bottom-position").prev().addClass('top-position');
            currentSlide += 1;

             ipadres();
        } else
        if(dir == 'up') {
            // ALEX
            if( currentSlide !== 0){
                slideli.eq(currentSlide).removeClass('current');
                slideli.eq(currentSlide-1).addClass('current');
                $('.btn-down').hide().show().removeClass("hidden-btn");
            }

        // ALEX
            if (currentSlide !== 0) {
                currentSlide -= 1;
                ipadres();
            }
            if (currentSlide == 0) {
                $(".product-page .owl-carousel").removeClass("active");
                $('.product-details').removeClass('active');
                $('.product-details .products-characteristics.active').fadeOut(500);
                $('.product-page > header').removeClass("active");
                 $('.btn-down').hide().show().removeClass("active");
                $(".products-characteristics section").removeClass("active");
                $(".products-characteristics section").removeClass("top-position");
                $(".products-characteristics section").removeClass("bottom-position");

                $(".mobile-menu-btn").hide.show();
                $(".mobile-menu").hide.show();

                return;
            }
            $(".products-characteristics.active section").eq(currentSlide).removeClass("active").addClass('bottom-position').prev().addClass("active").removeClass("top-position");
            if ($(window).width() <= 768) {
                    $('.btn-down').addClass("hidden-btn");
            }

        }

    }
        document.scrollWorks = scrollWorks;
        $('.btn-down').on("click",function(e) {
            e.preventDefault();
            scrollWorks("down");
        });


// ALEX

    liNum = "<li><a href='#'></a></li>";
    ////// Do stuff on owl

    function owlchange (){
        var slideNum = $(".products-characteristics.active section").length;

        $(".dotstyle").empty();
        for (i = 0; i <= slideNum; i++) {
                    $(".dotstyle").append(liNum);
        }
        $(".dotstyle li").eq(0).addClass('current');
    };

    owlchange ();


    document.sc = function clickscroll() {
        var togo = $(this).index();
        var cSlide = $(".dotstyle").find('.current').index();
        var time = 0
        if (cSlide > togo){
             while(cSlide !== togo) {

                setTimeout(function() {
                    scrollWorks('up');
                }, time);

                time+=500;
                cSlide--;
             }
        }
        else{
             while(cSlide !== togo) {

                setTimeout(function() {
                  scrollWorks('down');
                },time);

                time+=500;
                cSlide++;
             }
         }

        cSlide = togo;
    };

    $("body").delegate(".dotstyle li", "click", document.sc);

    document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:

            break;
        case 38:
            scrollWorks('up');
            break;
        case 39:

            break;
        case 40:
             scrollWorks('down');
            break;
    }
    };

    $('.js-owl-carousel').on('changed.owl.carousel', function(event) {
                owlchange ();
    });

// ALEX



    $(document).on('click', 'div.owl-item:not(.center)', function(){

    });



    $(document).on('click', '.dotstyle li:not(.current)', function(){
        $(".dotstyle li").removeClass("current");
        $(this).addClass("current");
        slideNum = $(".products-characteristics.active section").length;
        var liLength = $(".dotstyle li").length;
        var liNum = $(".dotstyle li.current").index();

        currentSlide == liNum;
        console.log(liNum);
        console.log(currentSlide);

        var textAdded = false;
        $('.btn-down').addClass("active");
        if (currentSlide == slideNum) {
            $('.btn-down').addClass("hidden-btn");
            return;
        }
            if (currentSlide == (slideNum - 1)) {
            $('.btn-down').addClass("hidden-btn");
        }
        $(".product-page .owl-carousel").addClass("active");
        $(".product-details").addClass("active");
        $('.product-details.active .products-characteristics.active').fadeIn(500);
        $(".products-characteristics.active section").removeClass("active");
        if(!textAdded) {
            $('.product-page > header span').text($('div.owl-item.center .product-title').text());
            textAdded != textAdded;
        }
        $('.product-page > header').addClass("active");

    });

    var current_time_Scroll = 0, lastDirection = '', direction = '';
    var last_time_Scroll = new Date().getTime();
    var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

    // var debounceCallback = function(e){


    //         var evt = window.event || e; //equalize event object
    //         evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
    //         var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta; //check for detail first, because it is used by Opera and FF

    //         if(delta > 0) {
    //           scrollWorks('up');
    //       }
    //       else{
    //        scrollWorks('down');
    //    }

    //         // console.log(new Date().getTime() - current_time_Scroll);
    //         // current_time_Scroll = new Date().getTime();
    //         return false;


    //     };
    //$('body').on(mousewheelevt, $.debounce( 70, true, debounceCallback));
    var prevTime = new Date().getTime();
    var canScroll =true;
    var scrollings=[];
    var that = this;
    $('body').bind(mousewheelevt, $.proxy(MouseWheelHandler,that));


    function getAverage(elements, number){
       var sum = 0;
             //taking `number` elements from the end to make the average, if there are not enought, 1
             var lastElements = elements.slice(Math.max(elements.length - number, 1));

             for(var i = 0; i < lastElements.length; i++){
               sum = sum + lastElements[i];
           }

           return Math.ceil(sum/number);
       };

    function MouseWheelHandler(e) {
         var curTime = new Date().getTime();

             // cross-browser wheel delta
             e = e.originalEvent  || window.event;
             var evt = window.event || e; //equalize event object
             evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
             var value = evt.detail ? evt.detail*(-40) : evt.wheelDelta; //check for detail first, because it is used by Opera and FF
             var delta = Math.max(-1, Math.min(1, value));


             //Limiting the array to 150 (lets not waste memory!)
             if(scrollings.length > 149){
                 scrollings.shift();
             }

             //keeping record of the previous scrollings
             scrollings.push(Math.abs(value));

             //time difference between the last scroll and the current one
             var timeDiff = curTime-prevTime;
             prevTime = curTime;

             //haven't they scrolled in a while?
             //(enough to be consider a different scrolling action to scroll another section)
             if(timeDiff > 200) {
                 //emptying the array, we dont care about old scrollings for our averages
                 scrollings = [];
             }

             if(canScroll) {
                 var averageEnd = getAverage(scrollings, 10);
                 var averageMiddle = getAverage(scrollings, 70);
                 var isAccelerating = averageEnd >= averageMiddle;
                 console.log('isAccelerating');
                 console.log(isAccelerating);
                 //to avoid double swipes...
                 if(isAccelerating){
                     //scrolling down?
                    if(delta > 0) {
                        scrollWorks('up');
                        canScroll =false;
                    }
                    else{
                       scrollWorks('down');
                       canScroll =false;
                    }
                    setTimeout(function() {
                        canScroll = true;
                        console.log('canScroll');
                        console.log(canScroll);
                    },550);
                 }
             }


             return true;
     };


    // $(window).on("mousewheel DOMMouseScroll",{ mousewheel: { intent: { delay: 300, sensitivity: 7 } }}, function(event) {
    //     //Sevent.preventDefault();
    //      var evt = window.event || e;//equalize event object
    //     evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
    //     var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta; //check for detail first, because it is used by

    //     if (delta >= 0) {
    //         direction = 'up';
    //     } else {
    //         direction = 'down';
    //     }

    //     // current_time_Scroll = new Date().getTime();

    //      if(scrollDelay) { console.log("scroll prevent"); return;}
    //      scrollWorks(direction);
    //     // if((current_time_Scroll - last_time_Scroll) < 100 ){
    //     //     scrollDelay = true;
    //     //     console.log("time no to scroll");

    //     // }
    //     // last_time_Scroll = new Date().getTime();
    //      scrollDelay = true;
    //     //  lastDirection = direction;
    //     //  console.log("really scroll");
    //     setTimeout(function() {
    //         scrollDelay = false;
    //     },500);

    // });
    
    // lang swich
    $(document).on('click', '.lang-swich', function(){
        $(".lang-popup").toggleClass("active");
    });
    

    // partner
    $(document).on('click', '.to-partner', function(){
        $(".partner , .partner-close, .main-container").addClass("active");
    });
    // var $partnerClose = $('.partner-close');

    $('.partner-close').click(function() {
        $(".partner, .main-container").removeClass("active");
        $(this).removeClass("active");
    });
    $(document).on('click', '.partner .close-partner i', function(){
        $(".partner , .partner-close, .main-container").removeClass("active");
    });

    // contacts
    $(document).on('click', '.contacts-btn', function(e){
         e.preventDefault();
        $(".contacts-popup , .contacts-popup-close").toggleClass("active");
        $(".main-container").toggleClass("blur-contacts");
        $(this).toggleClass("active");
        $(" .buy-btn , .buy-popup , .buy-popup-close").removeClass("active");
        $(".main-container").removeClass("blur-buy");
        if($(".mobile-menu .buy-btn").hasClass('active') || $(".mobile-menu .contacts-btn").hasClass('active')) $(".mobile-menu").addClass("clicked");
        else $(".mobile-menu").removeClass("clicked");
        return false;
    });
    $('.contacts-popup-close').click(function() {

        $(".contacts-popup , .contacts-btn, .main-container").removeClass("active");
        $(this).removeClass("active");
        $(".main-container").removeClass("blur-contacts blur-buy");
        $(" .buy-btn , .buy-popup , buy-popup-close").removeClass("active");
        if( !$(".mobile-menu .buy-btn").hasClass('active') && !$(".mobile-menu .buy-btn").hasClass('active') ) $(".mobile-menu").removeClass("clicked");
        return false;
    });

    // buy
    $(document).on('click', '.buy-btn', function(e){
        e.preventDefault();
        $(".buy-popup , .buy-popup-close").toggleClass("active");
        $(".main-container").toggleClass("blur-buy");
        $(this).toggleClass("active");
        $(".contacts-btn , .contacts-popup , .contacts-popup-close").removeClass("active");
        $(".main-container").removeClass("blur-contacts");
        if($(".mobile-menu .buy-btn").hasClass('active') || $(".mobile-menu .contacts-btn").hasClass('active')) $(".mobile-menu").addClass("clicked");
        else $(".mobile-menu").removeClass("clicked");
        return false;
    });
    $('.buy-popup-close').click(function(){
        $(".buy-popup , .buy-btn, .head-left a.active").removeClass("active");
        $(this).removeClass("active");
        $(".main-container").removeClass("blur-contacts blur-buy");
        $(" .contacts-btn , .contacts-popup , .contacts-popup-close").removeClass("active");
        if( !$(".mobile-menu .buy-btn").hasClass('active') && !$(".mobile-menu .contacts-btn").hasClass('active') ) $(".mobile-menu").removeClass("clicked");
        return false;
    });
    $('.tab-container, .main-container_index').click(function(event) {
        e = event || window.event;
        if(isTouch){
             $(".mobile-menu").removeClass("active");
             $(".mobile-menu-btn").removeClass("active");
             if($(e.target).hasClass("open-footer")){
                 $(".footer-container .subscribe").slideToggle();
                 $('.footer-container .open-footer').toggleClass("active");
             }
            if($(e.target).closest(".footer-container").length>0){}else{
                if($('.footer-container .open-footer').hasClass("active")){
                     $(".footer-container .subscribe").slideUp();
                     $('.footer-container .open-footer').removeClass("active");
                 }
            }

        }
        if(!isTouch && $(window).width()<768){
             $(".mobile-menu").removeClass("active");
             $(".mobile-menu-btn").removeClass("active");
            if($(e.target).hasClass("open-footer")){
                 $(".footer-container .subscribe").slideToggle();
                 $('.footer-container .open-footer').toggleClass("active");
            }

        }

    });
    $('.main-container_index ~ .footer-container').click(function(event) {
            e = event || window.event;
            if($(e.target).hasClass("open-footer")){
                $(".footer-container .subscribe").slideToggle();
                 $('.footer-container .open-footer').toggleClass("active");
             }

    });

    $('.mobile-menu-btn').click( function(){
        if( $(".mobile-menu .buy-btn").hasClass('active') || $(".mobile-menu .contacts-btn").hasClass('active') ) $(".mobile-menu").removeClass("clicked");
        $(this).toggleClass("active");
        $(".mobile-menu").toggleClass("active");
        $(".contacts-btn , .contacts-popup , .contacts-popup-close").removeClass("active");
        $(".contacts-popup , .contacts-btn, .main-container").removeClass("active");
        $(".main-container").removeClass("blur-contacts blur-buy");
        $(".buy-btn , .buy-popup , .buy-popup-close").removeClass("active");
         return false;
    });

    var mouseStart,
    slideContainer = document.querySelectorAll('.products-characteristics-list'),
    owlContainer = document.querySelector('.main-container'),
    mouseY,
    SWIPE_SENSITIVITY = 40,
    SWIPE_SENSITIVITYUP;

    for (var i = 0; i < slideContainer.length; i++) {
                // click calls pooFunction
                slideContainer[i].addEventListener('touchstart', function (event) {
                    mouseStart = event.touches[0].clientY || event.touches[0].pageY;
                }, false);

                slideContainer[i].addEventListener('touchend', function (event) {
                    SWIPE_SENSITIVITYUP = (currentSlide === 1 && ($('.products-characteristics.active .products-characteristics-list').scrollTop() === 0)) ? 50 : 40;
                    if (mouseY && mouseStart - mouseY  > SWIPE_SENSITIVITY) {
                                //console.log(currentSlide);
                                scrollWorks("down");
                            }
                            if(mouseY && mouseY -mouseStart > SWIPE_SENSITIVITYUP){
                                if(currentSlide !==1){
                                    scrollWorks("up");
                                    console.log(currentSlide);
                                    console.log(SWIPE_SENSITIVITYUP);
                                } else{
                                    if (($('.products-characteristics.active .products-characteristics-list').scrollTop() === 0)) { scrollWorks("up"); };
                                }
                                }
                                mouseStart = 0;
                                mouseY = null;
                            }, false);
                slideContainer[i].addEventListener('touchmove', function (event) {
                    mouseY = event.touches[0].clientY || event.touches[0].pageY;
                }, false);
    }
    owlContainer.addEventListener('touchstart', function (event) {
        mouseStart = event.touches[0].clientY || event.touches[0].pageY;
         }, false);
    owlContainer.addEventListener('touchend', function (event) {
        if (mouseY && mouseStart - mouseY  > SWIPE_SENSITIVITY) {
           scrollWorks("down");
       }
       mouseStart = 0;
       mouseY = null;
        }, false);
    owlContainer.addEventListener('touchmove', function (event) {
        mouseY = event.touches[0].clientY || event.touches[0].pageY;
        }, false);

    });



// партнерство
    $('form#contact-form').on("submit", function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });
    $('#contact-form .button-send').on("click", function() {
       var hasError = false;
       $('form#contact-form .requiredField').removeAttr('style');
       $('form#contact-form .requiredField').each(function() {
           if($.trim($(this).val()) == '') {
                $(this).css('border', '1px solid red');
                hasError = true;
            } else if($(this).hasClass('email')) {
                var emailReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
                if(!emailReg.test($.trim($(this).val()))){
                    $(this).css('border', '1px solid red');
                    hasError = true;
                }
            }
        });

        if (!hasError) {
            $.ajax({
                type: "POST",
                url: "callback.php",
                data: $('form#contact-form').serialize(),
                dataType: "html",
                success: function(data) {
                  console.log(data);
                    $('form#contact-form, .partner p').slideUp(100);
                    $('#result').html("<h2 style='font-size: 14px;font-weight: 300;'>Спасибо!</h2><p style='font-size: 14px;font-weight: 300; margin: 0px;'>Мы свяжемся с вами!</p>");
                }
            });

            $('form#contact-form .requiredField').removeAttr('style');
        }
        return false;
    });

// подписка
    $('form#subscribe-form').on("submit", function(event) {
      event.preventDefault();
      return false;
    });
    $('form#subscribe-form .btn-send').on("click", function() {
       var hasError = false;
       $('form#subscribe-form .requiredField').removeAttr('style');
       $('form#subscribe-form .requiredField').each(function() {
           if($.trim($(this).val()) == '') {
                $(this).css('border', '1px solid red');
                hasError = true;
            } else if($(this).hasClass('email')) {
                var emailReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
                if(!emailReg.test($.trim($(this).val()))){
                    $(this).css('border', '1px solid red');
                    hasError = true;
                }
            }
        });

        if (!hasError) {
            $.ajax({
                type: "POST",
                url: "callback.php",
                data: $('form#subscribe-form').serialize(),
                dataType: "html",
                success: function(data) {
                  console.log(data);
                    $('form#subscribe-form input').val("");
                    $('.subscribe-done').html("Подписка оформлена!");
                }
            });

            $('form#contact-form .requiredField').removeAttr('style');
        }
        return false;
    });


        $('.product-details .products-characteristics').css('display','none');