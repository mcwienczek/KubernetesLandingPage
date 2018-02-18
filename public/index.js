$(document).ready(function(){

    $("button").click(function() {
        if($("#workshop").is(':checked') || $("#course").is(':checked')) {           
            var email = $("#email").val();
            var workshop = $("#workshop").is(':checked');
            var course = $("#course").is(':checked');
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (filter.test(email) == true) {
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
                    dataType: "json"
                })
                .done(function(response) {
                    console.log(response);
                    $(".thanks").css("display", "block"); 
                    $("button").css("display", "none");
                })
                .fail(function(data) {
                    console.log(data);
                    $.confirm({
                        title: 'Encountered an error!',
                        content: 'Something went downhill, please try again in a few seconds',
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
                    content: 'Your email address is not valid.',
                    type: 'red', 
                    typeAnimated: true,
                    icon: 'fa fa-warning',
    
                });
            }   
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