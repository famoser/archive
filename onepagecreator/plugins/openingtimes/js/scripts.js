//noinspection JSUnusedGlobalSymbols
/**
 * Created by Florian Moser on 25.12.2015.
 */
function MarkTodaysDay($selector) {
    var d = new Date();
    var day = d.getDay();
    if (day == 0)
        day = 7;
    $($selector + " tbody tr:nth-child(" + day + ")").addClass("activeRow");
}