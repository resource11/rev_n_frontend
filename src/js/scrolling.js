/* ========================================================================
 * Omega: theme.js
 * Main Theme Javascript file
 * ========================================================================
 * Copyright 2014 Oxygenna LTD
 * ======================================================================== */

'use strict';


jQuery(document).ready(function( $ ) {

    // TOC, shows how to scroll the whole window

    $('.bullet-nav a').click(function() {
        var id = this.hash;
        var slideTo = $(id).position().top;
        // var easing = $("#easing").val();
        // var time =  $("#time").val();

        // var timeMillisecs = 1000 * toNumber(time);
        // slide button

        $('html,body').animate({
            scrollTop:slideTo + 'px'
        }, 600, "swing");
        return false;
        $id.velocity("scroll", { axis: "x" });
        // TweenLite.to(id, 2, {scrollTo:{y:400, autoKill:false}, ease:Power2.easeOut});
    });

    var toNumber = function (numeric, fallback) {
        return isNaN(numeric) ? (fallback || 1) : Number(numeric);
    };


});



