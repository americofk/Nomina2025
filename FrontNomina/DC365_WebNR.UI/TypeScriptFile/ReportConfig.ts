/**
 * @file ReportConfig.ts
 * @description Módulo de configuración de reportes. Permite personalizar
 *              y configurar los parámetros de los reportes del sistema.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module ConfiguracionReportes
 */

//guardar información
$("#FormReportConfig").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
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