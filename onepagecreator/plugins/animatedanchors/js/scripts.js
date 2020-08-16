//noinspection JSUnusedGlobalSymbols
/**
 * Created by Florian Moser on 25.12.2015.
 */

function animateAnchors($selector) {
    $($selector).bind("click", function (e) {
        e.preventDefault();
        var anchor = $(this).attr("href");
        var id = anchor.substr(1);
        $('body').animate({scrollTop: ($("#" + id).offset().top)}, 'slow');
    });
}