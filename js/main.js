"use strict";

$(function () {

    /* Smooth scroll for nav  */

    $('#js-nav-home').on('click', function (e) {

        e.preventDefault();
        var homeOffset = $('header').offset().top;

        $('html, body').animate({
            scrollTop: homeOffset
        }, 600);
    });

    $('#js-nav-about').on('click', function (e) {

        e.preventDefault();
        var toolsOffset = $('.main-tools').offset().top;

        $('html, body').animate({
            scrollTop: toolsOffset
        }, 600);
    });

    $('#js-nav-tech').on('click', function (e) {

        e.preventDefault();
        var techOffset = $('.main-techno').offset().top;

        $('html, body').animate({
            scrollTop: techOffset
        }, 600);
    });

    $('#js-nav-works').on('click', function (e) {

        e.preventDefault();
        var worksOffset = $('.main-works').offset().top;

        $('html, body').animate({
            scrollTop: worksOffset
        }, 600);
    });

    $('#js-nav-contacts').on('click', function (e) {

        e.preventDefault();
        var contactsOffset = $('.logos').offset().top;

        $('html, body').animate({
            scrollTop: contactsOffset
        }, 600);
    });


    /* Fix nav then scroll */

    var headerH = $('header').height(),
        navH = $('header > .inner-container').height();

    $(document).on('scroll', function () {

        var docScroll = $(this).scrollTop();

        if (docScroll > headerH) {
            $('header > .inner-container').addClass('fixed');
            $('header').css('height',navH);
            $('#js-to-home').css('display', 'block');
        } else {
            $('header > .inner-container').removeClass('fixed');
            $('#js-to-home').css('display', 'none');
        }
    });

    /* To Home button  */

    $('#js-to-home').on('click', function (e) {

        e.preventDefault();
        var homeOffset = $('header').offset().top;

        $('html, body').animate({
            scrollTop: homeOffset
        }, 600);
    });
});