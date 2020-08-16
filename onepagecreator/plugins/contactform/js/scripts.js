/**
 * Created by Florian Moser on 29.12.2015.
 */

var formSelector;
//noinspection JSUnusedGlobalSymbols
function MakeSubmitForm($formSelector) {
    formSelector = $formSelector;
    $(formSelector).bind("submit", function (e) {
        e.preventDefault();
        var $form = $(this);
        if ($form.hasClass("submitting"))
            return;
        $form.addClass("submitting");

        var method = $(this).attr('method');
        var action = $(this).attr('action');
        var formData = new FormData($(this)[0]);

        $.ajax({
            type: method,
            url: action,
            data: formData,
            async: true,
            success: function (data) {
                $form.removeClass("submitting");
                if (data == true) {
                    $(':input', $form)
                        .removeAttr('checked')
                        .removeAttr('selected')
                        .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
                        .val('');
                    displayMessage("Nachricht wurde versendet");
                } else {
                    console.log(data);
                    displayMessage("Es ist ein Fehler aufgetreten, die Nachricht konnte nicht versendet werden.");
                }
            },
            cache: false,
            contentType: false,
            processData: false
        }).fail(function (e) {
            console.log(e.status + ': ' + e.statusText + '. Submit of form ' + $(this).id + ' Failed');
            displayMessage("Es ist ein Fehler aufgetreten, die Nachricht konnte nicht versendet werden.");
        });

        return false; // avoid to execute the actual submit of the form.
    });
}

function displayMessage($message) {
    $(formSelector).prepend("<p>" + $message + "</p>");
}