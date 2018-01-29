$(document).ready(function(){

    $("button").click(function() {
        var email = $("#email").val();
        var workshop = $("#workshop").is(':checked');
        var video = $("#video").is(':checked');

        var dataToSend = {
            email: email,
            workshop: workshop,
            video: video
        };
        $.ajax({
            type: "POST",
            url: "/registration",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(dataToSend),
            contentType: "application/json",
            dataType: "json"
        })
        .done(function() {
            alert( "success" );
        })
        .fail(function(data) {
            console.log(data);
        })
        .always(function() {
            console.log("completed");
        });
    });
}); 