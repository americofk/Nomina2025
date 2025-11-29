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
    e.preventDefault(); // Siempre prevenir el envío nativo del formulario
    if ($(this).valid()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhbENvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL0dlbmVyYWxDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILHFCQUFxQjtBQUNyQixDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLGtEQUFrRDtJQUN0RSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsd0JBQXdCO1lBQzdCLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7WUFDekIsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFnQjtnQkFDL0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO29CQUN2QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLENBQUM7cUJBQ0ksQ0FBQztvQkFDRixlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdDLENBQUM7WUFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztnQkFDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILHdDQUF3QztBQUN4QyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtJQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ0gsR0FBRyxFQUFFLGdCQUFnQjtRQUNyQixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxJQUFJO1FBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtZQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELENBQUM7UUFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztZQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQ0osQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQyxDQUFDO0FBRUgseUNBQXlDO0FBQ3pDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDakMsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIEdlbmVyYWxDb25maWcudHNcclxuICogQGRlc2NyaXB0aW9uIE3Ds2R1bG8gZGUgY29uZmlndXJhY2nDs24gZ2VuZXJhbCBkZWwgc2lzdGVtYS4gUGVybWl0ZSBhZG1pbmlzdHJhclxyXG4gKiAgICAgICAgICAgICAgcGFyw6FtZXRyb3MgZ2xvYmFsZXMgeSBvcGNpb25lcyBkZSBjb25maWd1cmFjacOzbiBkZSBsYSBhcGxpY2FjacOzbi5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgQ29uZmlndXJhY2lvbkdlbmVyYWxcclxuICovXHJcblxyXG4vL2d1YXJkYXIgaW5mb3JtYWNpw7NuXHJcbiQoXCIjU2F2ZUdlbmVyYWxDb25maWdcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBTaWVtcHJlIHByZXZlbmlyIGVsIGVudsOtbyBuYXRpdm8gZGVsIGZvcm11bGFyaW9cclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9nZW5lcmFsY29uZmlnL2d1YXJkYXJcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL0FicmlyIG1vZGFsIGRlIGNvbmZpZ3VyYWNpb24gZGUgY29ycmVvXHJcbiQoJy5Db25maWctZW1haWwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogYC9nZW5lcmFsY29uZmlnYCxcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICQoXCIuaW5mby1tb2RhbC1nZW5lcmFsY29uZmlnXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5pbmZvLW1vZGFsLWdlbmVyYWxjb25maWdcIikuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIubW9kYWwtY29uZmlndXJhdGlvbkVtYWlsXCIpLm1vZGFsKFwic2hvd1wiKTtcclxufSk7XHJcblxyXG4vL2NlcnJhciBtb2RhbCBkZSBjb25maWd1cmFjaW9uIGRlIGNvcnJlb1xyXG4kKCcuY2xvc2UtbW9kYWwtY29uZmlnJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIi5tb2RhbC1jb25maWd1cmF0aW9uRW1haWxcIikubW9kYWwoXCJoaWRlXCIpO1xyXG59KTsiXX0=