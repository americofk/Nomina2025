/**
 * @file GeneralConfig.ts
 * @description Módulo de configuración general del sistema. Permite administrar
 *              parámetros globales y opciones de configuración de la aplicación.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module ConfiguracionGeneral
 */
//guardar información
$("#SaveGeneralConfig").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        $.ajax({
            url: "/generalconfig/guardar",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhbENvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL0dlbmVyYWxDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILHFCQUFxQjtBQUNyQixDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3RDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsd0JBQXdCO1lBQzdCLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7WUFDekIsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFnQjtnQkFDL0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO29CQUN2QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLENBQUM7cUJBQ0ksQ0FBQztvQkFDRixlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdDLENBQUM7WUFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztnQkFDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILHdDQUF3QztBQUN4QyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtJQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ0gsR0FBRyxFQUFFLGdCQUFnQjtRQUNyQixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxJQUFJO1FBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtZQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELENBQUM7UUFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztZQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQ0osQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQyxDQUFDO0FBRUgseUNBQXlDO0FBQ3pDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDakMsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIEdlbmVyYWxDb25maWcudHNcclxuICogQGRlc2NyaXB0aW9uIE3Ds2R1bG8gZGUgY29uZmlndXJhY2nDs24gZ2VuZXJhbCBkZWwgc2lzdGVtYS4gUGVybWl0ZSBhZG1pbmlzdHJhclxyXG4gKiAgICAgICAgICAgICAgcGFyw6FtZXRyb3MgZ2xvYmFsZXMgeSBvcGNpb25lcyBkZSBjb25maWd1cmFjacOzbiBkZSBsYSBhcGxpY2FjacOzbi5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgQ29uZmlndXJhY2lvbkdlbmVyYWxcclxuICovXHJcblxyXG4vL2d1YXJkYXIgaW5mb3JtYWNpw7NuXHJcbiQoXCIjU2F2ZUdlbmVyYWxDb25maWdcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvZ2VuZXJhbGNvbmZpZy9ndWFyZGFyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy9BYnJpciBtb2RhbCBkZSBjb25maWd1cmFjaW9uIGRlIGNvcnJlb1xyXG4kKCcuQ29uZmlnLWVtYWlsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IGAvZ2VuZXJhbGNvbmZpZ2AsXHJcbiAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmluZm8tbW9kYWwtZ2VuZXJhbGNvbmZpZ1wiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaW5mby1tb2RhbC1nZW5lcmFsY29uZmlnXCIpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiLm1vZGFsLWNvbmZpZ3VyYXRpb25FbWFpbFwiKS5tb2RhbChcInNob3dcIik7XHJcbn0pO1xyXG5cclxuLy9jZXJyYXIgbW9kYWwgZGUgY29uZmlndXJhY2lvbiBkZSBjb3JyZW9cclxuJCgnLmNsb3NlLW1vZGFsLWNvbmZpZycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIubW9kYWwtY29uZmlndXJhdGlvbkVtYWlsXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxufSk7Il19