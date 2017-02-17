$(function() {

    $("#inscriptionForm input,#inscriptionForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var nom = $("input#nom").val();
            var prenom = $("input#prenom").val();
            var email = $("input#email").val();
            var emailconfirmation = $("input#emailconfirmation").val();
            var motdepasse = $("input#motdepasse").val();
            var motdepasseconf = $("textarea#motdepasseconf").val();

            // Check for white space in name for Success/Fail message
            if (prenom.indexOf(' ') >= 0) {
                prenom = prenom.split(' ').slice(0, -1).join(' ');
            }
            if (nom.indexOf(' ') >= 0) {
                nom = nom.split(' ').slice(0, -1).join(' ');
            }


            $.ajax({
                url: "/inscription",
                type: "POST",
                data: {
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    motdepasse: motdepasse
                },
                cache: false,
                success: function() {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Bienvenue chez Budgup. Vous allez recevoir un mail de confirmation. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#inscriptionForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Désolé " + prenom + ", il semblerait que le serveur ne réponde pas. Réessayez plus tard!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#inscriptionForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
