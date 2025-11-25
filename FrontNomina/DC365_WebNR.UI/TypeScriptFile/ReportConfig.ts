//guardar información
$("#FormReportConfig").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        $.ajax({
            url: "/configuracionreportes/guardar",
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