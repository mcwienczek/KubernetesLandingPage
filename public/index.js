$(document).ready(function(){

    $("button").click(function() {
        var email = $("#email").val();  
        var dataToSend = {
            email: email
        };
        $.ajax({
            type: "POST",
            url: "/registration",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(dataToSend),
            contentType: "application/json; charset=utf-8",
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