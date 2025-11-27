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
    if ($(this).valid()) {
        e.preventDefault();
        $.ajax({
            url: "/configuracionreportes/guardar",
            type: "POST",
            data: $(this).serialize(),
            async: true,
            success: function (data) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3J0Q29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvUmVwb3J0Q29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFFSCxxQkFBcUI7QUFDckIsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNyQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsR0FBRyxFQUFFLGdDQUFnQztZQUNyQyxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBZ0I7Z0JBQy9CLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzdCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQztvQkFDdkIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixDQUFDO3FCQUNJLENBQUM7b0JBQ0YsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgUmVwb3J0Q29uZmlnLnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBNw7NkdWxvIGRlIGNvbmZpZ3VyYWNpw7NuIGRlIHJlcG9ydGVzLiBQZXJtaXRlIHBlcnNvbmFsaXphclxyXG4gKiAgICAgICAgICAgICAgeSBjb25maWd1cmFyIGxvcyBwYXLDoW1ldHJvcyBkZSBsb3MgcmVwb3J0ZXMgZGVsIHNpc3RlbWEuXHJcbiAqIEBhdXRob3IgRXF1aXBvIGRlIERlc2Fycm9sbG9cclxuICogQGRhdGUgMjAyNVxyXG4gKiBAbW9kdWxlIENvbmZpZ3VyYWNpb25SZXBvcnRlc1xyXG4gKi9cclxuXHJcbi8vZ3VhcmRhciBpbmZvcm1hY2nDs25cclxuJChcIiNGb3JtUmVwb3J0Q29uZmlnXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL2NvbmZpZ3VyYWNpb25yZXBvcnRlcy9ndWFyZGFyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pOyJdfQ==