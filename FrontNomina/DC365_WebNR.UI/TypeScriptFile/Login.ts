

$("#formulariologin1").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        $('.progreso').modal({ backdrop: 'static', keyboard: false })
        $.ajax({

            url: "/Login/ValidateEmail",
            type: "POST",
            data: $("#formulariologin1").serialize(),
            async: true,
            success: function (data: ResponseUI) {
                if (data.Type == "error") {
                    $('.progreso').modal('hide');
                    //Función para los errores
                    FormatErrors(data);
                } else {
                    $('.progreso').modal('hide');
                    $('.Usuario').toggleClass('UsuarioOculto');
                    $('.Clave').toggleClass('ClaveMostrar');
                    $('#displayName').text(`${$(".UsuarioLogin").val().toString().trim()}`);
                    $('.displayName').val(`${$(".UsuarioLogin").val().toString().trim()}`);
                    $('#Password').focus();
               
                 
                }

            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });
    }
});

//Ir a tras en el login
$('.btnAtras').on('click', function () {
    $('.Usuario').toggleClass('UsuarioOculto');
    $('.Clave').toggleClass('ClaveMostrar');
});

//ir al formulario para solicitar contraseña temporal
$(".linkOlvidoContraseña").click(function () {
    $('.EnviarContraseña').removeClass('collapse');
    $('.Clave').toggleClass('ClaveMostrar');
    $('#EmailChange_01').val($('.identity').text());
});



$("#formulariologin3").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        $('.progreso').modal({ backdrop: 'static', keyboard: false })
        $.ajax({
            url: "/Login/Requestchangepassword",
            type: "POST",
            data: $("#formulariologin3").serialize(),
            //data: {
            //    _email: $("#alias").val()
            //},
            async: true,
            success: function (data: ResponseUI) {

                if (data.Type == "error") {
                    $('.progreso').modal('hide');
                    FormatErrors(data);
                } else {
                    $('.progreso').modal('hide');
                   
                    windows_message(data.Message, data.Type);
                    setTimeout(function () {
                        $('.identity-01').text($('#EmailChange_01').val().toString());
                        $('.EnviarContraseña').addClass('collapse');
                        $('.CambiarContraseña').removeClass('collapse');
                        $('.fade-in-lightbox').removeClass('inner');
                        $('.fade-in-lightbox').addClass('inner-01');
                    }, 500);


                }

            }
        });
    }
    
});

$(".btnFormChangePassdirecto").click(function () {
    $('.Clave').toggleClass('ClaveMostrar');
    $('.CambiarContraseña').removeClass('collapse');
    $('.fade-in-lightbox').removeClass('inner');
    $('.fade-in-lightbox').addClass('inner-01');
    $('#EmailChange_01').val($('.identity').text());
    $('.identity-01').text($('#EmailChange_01').val().toString());
    ClearImputnNewPasswor();
});

$(".btnCancelarCambio").click(function () {

    $('.CambiarContraseña').addClass('collapse');
    $('.Clave').toggleClass('ClaveMostrar');

    $('.fade-in-lightbox').removeClass('inner-01');
    $('.fade-in-lightbox').addClass('inner');

    $('.logo').removeClass('imagenLogo-01');
    $('.logo').addClass('imagenLogo');
    ClearImputnNewPasswor();

});


function ClearImputnNewPasswor() {
    $("#EmailChange_02").val("");
    $("#EmailChange_03").val("");
    $("#EmailChange_04").val("");
}

$("#formulariologin4").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        $('.progreso').modal({ backdrop: 'static', keyboard: false })

        $.ajax({
            url: "/Login/Sendnewpassword",
            type: "POST",
            data: $("#formulariologin4").serialize(),
            async: true,
           
            success: function (data: ResponseUI) {
                if (data.Type == "error") {
                    $('.progreso').modal('hide');
                    FormatErrors(data);
                } else {
                    $('.progreso').modal('hide');
                    windows_message(data.Message, data.Type);
                    setTimeout(function () {
                        location.reload();
                    }, 500);
                }
            }
        });
    }
});

//model Sendnewpassword
function FuntionModelSendnewpassword() {
    var FuntionSendnewpassword: ISendnewpassword =
    {
        Email: $('#displayName').text().toString(),
        TemporaryPassword: $('#EmailChange_02').val().toString(),
        NewPassword: $('#EmailChange_03').val().toString()
    };

    return FuntionSendnewpassword;
}

$(".btnAtrasCambioClave").click(function () {
    $('.EnviarContraseña').addClass('collapse');
    $('.Clave').toggleClass('ClaveMostrar');
});

$("#alias").change(function (e) {
    $("#alias").val(Mayuscula($("#alias").val().toString()));
});

$("#formulariologin2").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        $('.progreso').modal({ backdrop: 'static', keyboard: false })
        $.ajax({
            url: "/Login/ValidartePassword",
            type: "POST",
            data: $("#formulariologin2").serialize(),
           
            async: true,
            success: function (data: ResponseUI) {

                if (data.Type == "error") {
                    $('.progreso').modal('hide');
                    windows_message(data.Message, data.Type);
                } else {

                    location.href = "/Dashboard/Principal";

                }

            }
        });
    }
    
    
});


