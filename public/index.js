$(document).ready(function(){

    $("button").click(function() {
        if($("#workshop").is(':checked') || $("#video").is(':checked')) {
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
                $(".thanks").css("display", "block"); 
                $("button").css("display", "none");
            })
            .fail(function(data) {
                $.confirm({
                    title: 'Encountered an error!',
                    content: 'Something went downhill, this may be serious',
                    type: 'red',
                    typeAnimated: true,
                    buttons: {
                        tryAgain: {
                            text: 'Try again',
                            btnClass: 'btn-red',
                            action: function(){
                            }
                        },
                        close: function () {
                        }
                    }
                });
            })
            .always(function() {
                console.log("completed");
            });
        } else {
            $.alert({
                title: "Holy guacamole!",
                content: 'Choose at least one option',
                type: 'red', 
                typeAnimated: true,
                icon: 'fa fa-warning',

            });
        }

    });
}); 