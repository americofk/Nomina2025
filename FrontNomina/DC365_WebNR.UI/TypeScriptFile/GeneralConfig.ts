//guardar información
$("#SaveGeneralConfig").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        $.ajax({
            url: "/generalconfig/guardar",
            type: "POST",
            data: $(this).serialize(),
            async: true,
            success: function (data: ResponseUI) {
                $('.progreso').modal('hide');
                if (data.Type == "error") {
                    FormatErrors(data);
                }
                else {
                    windows_message(data.Message, data.Type);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
});

//Abrir modal de configuracion de correo
$('.Config-email').on('click', function () {
    $.ajax({
        url: `/generalconfig`,
        type: "GET",
        async: true,
        success: function (data) {
            if (data.length > 0) {
                $(".info-modal-generalconfig").html('');
                $(".info-modal-generalconfig").append(data);
            }
        }, error: function (xhr) {
            redireccionaralLogin(xhr);
        }
    });
    $(".modal-configurationEmail").modal("show");
});

//cerrar modal de configuracion de correo
$('.close-modal-config').on('click', function () {
    $(".modal-configurationEmail").modal("hide");
});