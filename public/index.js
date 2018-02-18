$(document).ready(function(){

    $("button").click(function() {
        var email = $("#email").val();
        var workshop = $("#workshop").is(':checked');
        var course = $("#course").is(':checked');

        var dataToSend = {
            email: email,
            workshop: workshop,
            course: course
        };
        $.ajax({
            type: "POST",
            url: "/registration",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(dataToSend),
            contentType: "application/json",
            dataType: "json",
            success: function(data) {
                console.log(data);
            },
            failure: function(errMsg) {
                console.log(errMsg);
            }
        });
    });
}); 