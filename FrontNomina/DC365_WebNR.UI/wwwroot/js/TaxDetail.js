/**
 * @file TaxDetail.ts
 * @description Módulo de gestión de detalles de impuestos. Permite crear, editar
 *              y administrar las configuraciones específicas de cada impuesto.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module DetalleImpuestos
 */
variables: {
    var option;
}
const fn = {
    //Formulario de nuevo y editar
    SearchFormNewAndEditDetail: function (_id = "", viewmode = "new") {
        let url;
        if (_id == "")
            url = `/detalleimpuestos/ObtenerFormNuevo`;
        else
            url = `/detalleimpuestos/ObtenerFormNuevo?taxid=${_id}`;
        $.ajax({
            url: url,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    fn.ShowForm(data, viewmode);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    //Buscar formulario de configuracion de tasa
    SearchListRateConfig: function (_id = "", viewmode = "new") {
        let url;
        if (_id == "")
            url = `/detalleimpuestos/ObtenerFormNuevo`;
        else
            url = `/detalleimpuestos/ObtenerFormNuevo?TaxDetailid=${_id}`;
        $.ajax({
            url: url,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".cont-form-new-config-isr").html('');
                    $("cont-form-new-config-isr").append(data);
                    //cerrar formulario de nueva direccion
                    $(".btncancelar_new_TaxDetail").on('click', function () {
                        $(".cont-form-new-config-isr").addClass("collapse");
                    });
                    $(".cont-form-new-config-isr").removeClass("collapse");
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    ShowForm: function (data, viewmode) {
        $(".cont-form-new-config-isr").html('');
        $(".cont-form-new-config-isr").append(data);
        //cerrar formulario de nuevo y editar
        $(".btncancelar_new_TaxDetail").on('click', function () {
            $(".cont-form-new-config-isr").addClass("collapse");
        });
        //Mostrar contenedor
        $(".cont-form-new-config-isr").removeClass("collapse");
        //guardar información
        $("#new_TaxDetail").submit(function (e) {
            e.preventDefault(); // Siempre prevenir el envío nativo del formulario
            if ($(this).valid()) {
                $.ajax({
                    url: "/detalleimpuestos/guardar",
                    type: "POST",
                    data: $(this).serialize() + `&operation=${option}`,
                    async: true,
                    success: function (data) {
                        $('.progreso').modal('hide');
                        if (data.Type == "error") {
                            FormatErrors(data);
                        }
                        else {
                            windows_message(data.Message, data.Type);
                            $(".cont-form-new-config-isr").addClass("collapse");
                            //Refrescamos la tabla con la información guardada
                            fn.SearchTaxDetail();
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        });
    },
    //lista detalle de impuestos
    SearchTaxDetail: function () {
        $.ajax({
            url: "detalleimpuestos",
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".tbodyTableTaxDetail").html('');
                    $(".tbodyTableTaxDetail").append(data);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
};
export { fn };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGF4RGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvVGF4RGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFFSCxTQUFTLEVBQUUsQ0FBQztJQUVSLElBQUksTUFBYyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxNQUFNLEVBQUUsR0FBRztJQUNQLDhCQUE4QjtJQUM5QiwwQkFBMEIsRUFBRSxVQUFVLE1BQWMsRUFBRSxFQUFFLFdBQW1CLEtBQUs7UUFDNUUsSUFBSSxHQUFXLENBQUE7UUFFZixJQUFJLEdBQUcsSUFBSSxFQUFFO1lBQ1QsR0FBRyxHQUFHLG9DQUFvQyxDQUFDOztZQUUzQyxHQUFHLEdBQUcsNENBQTRDLEdBQUcsRUFBRSxDQUFDO1FBRTVELENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFJO2dCQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2xCLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNENBQTRDO0lBQzVDLG9CQUFvQixFQUFFLFVBQVUsTUFBYyxFQUFFLEVBQUUsV0FBbUIsS0FBSztRQUN0RSxJQUFJLEdBQVcsQ0FBQTtRQUVmLElBQUksR0FBRyxJQUFJLEVBQUU7WUFDVCxHQUFHLEdBQUcsb0NBQW9DLENBQUM7O1lBRTNDLEdBQUcsR0FBRyxrREFBa0QsR0FBRyxFQUFFLENBQUM7UUFDbEUsQ0FBQyxDQUFDLElB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QWUsRUFBRTtRQUNiLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsa0JBQWtCO1lBQ3ZCLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFJO2dCQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2xCLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDbkMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0NBRUosQ0FBQTtBQUdELE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZSBUYXhEZXRhaWwudHNcclxuICogQGRlc2NyaXB0aW9uIE3Ds2R1bG8gZGUgZ2VzdGnDs24gZGUgZGV0YWxsZXMgZGUgaW1wdWVzdG9zLiBQZXJtaXRlIGNyZWFyLCBlZGl0YXJcclxuICogICAgICAgICAgICAgIHkgYWRtaW5pc3RyYXIgbGFzIGNvbmZpZ3VyYWNpb25lcyBlc3BlY8OtZmljYXMgZGUgY2FkYSBpbXB1ZXN0by5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgRGV0YWxsZUltcHVlc3Rvc1xyXG4gKi9cclxuXHJcbnZhcmlhYmxlczoge1xyXG5cclxuICAgIHZhciBvcHRpb246IG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgZm4gPSB7XHJcbiAgICAvL0Zvcm11bGFyaW8gZGUgbnVldm8geSBlZGl0YXJcclxuICAgIFNlYXJjaEZvcm1OZXdBbmRFZGl0RGV0YWlsOiBmdW5jdGlvbiAoX2lkOiBzdHJpbmcgPSBcIlwiLCB2aWV3bW9kZTogc3RyaW5nID0gXCJuZXdcIikge1xyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZ1xyXG5cclxuICAgICAgICBpZiAoX2lkID09IFwiXCIpXHJcbiAgICAgICAgICAgIHVybCA9IGAvZGV0YWxsZWltcHVlc3Rvcy9PYnRlbmVyRm9ybU51ZXZvYDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHVybCA9IGAvZGV0YWxsZWltcHVlc3Rvcy9PYnRlbmVyRm9ybU51ZXZvP3RheGlkPSR7X2lkfWA7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmbi5TaG93Rm9ybShkYXRhLCB2aWV3bW9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vQnVzY2FyIGZvcm11bGFyaW8gZGUgY29uZmlndXJhY2lvbiBkZSB0YXNhXHJcbiAgICBTZWFyY2hMaXN0UmF0ZUNvbmZpZzogZnVuY3Rpb24gKF9pZDogc3RyaW5nID0gXCJcIiwgdmlld21vZGU6IHN0cmluZyA9IFwibmV3XCIpIHtcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmdcclxuXHJcbiAgICAgICAgaWYgKF9pZCA9PSBcIlwiKVxyXG4gICAgICAgICAgICB1cmwgPSBgL2RldGFsbGVpbXB1ZXN0b3MvT2J0ZW5lckZvcm1OdWV2b2A7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB1cmwgPSBgL2RldGFsbGVpbXB1ZXN0b3MvT2J0ZW5lckZvcm1OdWV2bz9UYXhEZXRhaWxpZD0ke19pZH1gO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmNvbnQtZm9ybS1uZXctY29uZmlnLWlzclwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiY29udC1mb3JtLW5ldy1jb25maWctaXNyXCIpLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZXJyYXIgZm9ybXVsYXJpbyBkZSBudWV2YSBkaXJlY2Npb25cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmJ0bmNhbmNlbGFyX25ld19UYXhEZXRhaWxcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmNvbnQtZm9ybS1uZXctY29uZmlnLWlzclwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5jb250LWZvcm0tbmV3LWNvbmZpZy1pc3JcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBTaG93Rm9ybTogZnVuY3Rpb24gKGRhdGEsIHZpZXdtb2RlOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgJChcIi5jb250LWZvcm0tbmV3LWNvbmZpZy1pc3JcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgJChcIi5jb250LWZvcm0tbmV3LWNvbmZpZy1pc3JcIikuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAvL2NlcnJhciBmb3JtdWxhcmlvIGRlIG51ZXZvIHkgZWRpdGFyXHJcbiAgICAgICAgJChcIi5idG5jYW5jZWxhcl9uZXdfVGF4RGV0YWlsXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIi5jb250LWZvcm0tbmV3LWNvbmZpZy1pc3JcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9Nb3N0cmFyIGNvbnRlbmVkb3JcclxuICAgICAgICAkKFwiLmNvbnQtZm9ybS1uZXctY29uZmlnLWlzclwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG5cclxuICAgICAgICAvL2d1YXJkYXIgaW5mb3JtYWNpw7NuXHJcbiAgICAgICAgJChcIiNuZXdfVGF4RGV0YWlsXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gU2llbXByZSBwcmV2ZW5pciBlbCBlbnbDrW8gbmF0aXZvIGRlbCBmb3JtdWxhcmlvXHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL2RldGFsbGVpbXB1ZXN0b3MvZ3VhcmRhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCkgKyBgJm9wZXJhdGlvbj0ke29wdGlvbn1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5jb250LWZvcm0tbmV3LWNvbmZpZy1pc3JcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1JlZnJlc2NhbW9zIGxhIHRhYmxhIGNvbiBsYSBpbmZvcm1hY2nDs24gZ3VhcmRhZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaFRheERldGFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvL2xpc3RhIGRldGFsbGUgZGUgaW1wdWVzdG9zXHJcbiAgICBTZWFyY2hUYXhEZXRhaWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiZGV0YWxsZWltcHVlc3Rvc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnRib2R5VGFibGVUYXhEZXRhaWxcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi50Ym9keVRhYmxlVGF4RGV0YWlsXCIpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IGZuIH0iXX0=