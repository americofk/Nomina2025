/**
 * @file PositionRequirent.ts
 * @description Módulo de gestión de requisitos de puestos. Permite crear, editar
 *              y administrar los requisitos necesarios para cada puesto vacante.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module RequisitosPuestos
 */
variables: {
    var idpositionforRequirement;
    var optionreq;
}
escuchadores: {
    //Para diseño, se oculta el indicador al hacer scroll
    $(".container-modal-scrolling").scroll(function () {
        let positionScroll = $(this).scrollTop();
        if (positionScroll > 0)
            $('.for-employee-address').addClass('collapse');
        else
            $('.for-employee-address').removeClass('collapse');
    });
    //abrir modal de requisitos
    $('.Requirement').on('click', function () {
        idpositionforRequirement = "";
        var contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectPosition[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                idpositionforRequirement = $(this).parent().parent().find(".PositionIdtblpos").html().trim();
            }
        });
        if (contador === 0) {
            windows_message("Debe seleccionar un Registro!!", "error");
        }
        else if (contador > 1) {
            windows_message("Debe seleccionar un solo Registro!!", "error");
        }
        else {
            searchPositionRequirement(idpositionforRequirement);
            $('.requisitopuestos').modal("show");
        }
    });
    //nuevo requisitos para puesto
    $('.NewRequirenTwo').on('click', function () {
        optionreq = 1;
        searchRequirementForm(idpositionforRequirement);
        //Funcion para mover el scroll, para mejor diseño
        $('.container-modal-scrolling').scrollTop(0);
    });
    //cerrar modal de requisitos de puestos
    $('.cerrarModRequirement').on('click', function () {
        $('.SaveRequirement').addClass('collapse');
        $('.DatosLineas').addClass('collapse');
        $('.requisitopuestos').modal("hide");
        idpositionforRequirement = "";
    });
    //eliminar requisitos de puesto
    $("#DeletePositionRequirement").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var ListId = [];
            var contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPositionRequirement[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "ListPositionRequirement");
                    input.attr("class", "ListPositionRequirement");
                    input.val($(this).parent().parent().find(".NamePositionRequirement").html().trim());
                    $(".DeletePositionRequirement").append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un Registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los requisitos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/requisitospuestos/eliminar",
                            type: "POST",
                            data: $("#DeletePositionRequirement").serialize() + `&positionid=${idpositionforRequirement}`,
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".ListPositionRequirement").remove();
                                if (data.Type == "error") {
                                    var _errors = "";
                                    data.Errors.forEach(function (x) {
                                        _errors += `${x}<br>`;
                                    });
                                    windows_message(_errors, data.Type);
                                }
                                else {
                                    searchPositionRequirement(idpositionforRequirement);
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectPositionRequirement[type=checkbox]").prop('checked', false);
                        $(".ListPositionRequirement").remove();
                    }
                });
            }
        }
    });
}
funciones: {
    //buscar el formulario para crear o editar requisitos
    function searchRequirementForm(_idpositionforRequirement) {
        $.ajax({
            url: "/requisitospuestos/formularioNewRequirement",
            type: "GET",
            async: false,
            success: function (data) {
                if (data.length > 0) {
                    $(".cont-form-newRequirent").html('');
                    $(".cont-form-newRequirent").append(data);
                    //cerrar formulario de nuevo requisito de puesto
                    $('.btncancelar_new_PositionRequirement').on('click', function () {
                        $('.cont-form-newRequirent').addClass("collapse");
                        $('.btnnewRequirent').text("Nuevo");
                    });
                    //save new requirentment position
                    $("#new_PositionRequirement").submit(function (e) {
                        if ($(this).valid()) {
                            e.preventDefault();
                            savePositionRequirement(_idpositionforRequirement);
                        }
                    });
                    //validar campo nombre del requisito
                    $("#Name").keyup(function () {
                        let dimention = $(this).val().toString().length;
                        if (dimention == 50) {
                            windows_message("¡Solo 50 caracteres!", "error");
                        }
                        ;
                    });
                    $('#PositionIdRequirement').val(_idpositionforRequirement);
                    $('.cont-form-newRequirent').removeClass("collapse");
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
    //save Addres employee
    function savePositionRequirement(_idpositionforRequirement) {
        $.ajax({
            url: "/requisitospuestos/guardar",
            type: "POST",
            data: $("#new_PositionRequirement").serialize() + `&operacion=${optionreq}`,
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                if (data.Type == "error") {
                    var _errors = "";
                    data.Errors.forEach(function (x) {
                        _errors += `${x}<br>`;
                    });
                    windows_message(_errors, data.Type);
                }
                else {
                    searchPositionRequirement(_idpositionforRequirement);
                    let form = document.getElementById("new_PositionRequirement");
                    form.reset();
                    $('.cont-form-newRequirent').addClass("collapse");
                    $('.btnnewRequirent').text("Nuevo");
                    windows_message(data.Message, data.Type);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
    //buscar los requisitos de un puesto
    function searchPositionRequirement(_idposition) {
        $.ajax({
            url: `/requisitospuestos/${_idposition}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".datatable-Requirement").html('');
                    $(".datatable-Requirement").append(data);
                    //doble clik en la linea para editar 
                    $(".LineTablePositionRequirement").dblclick(function myfunction() {
                        searchRequirementId(_idposition, $(this).find(".NamePositionRequirement").html().trim());
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
    //buscar un requisito para editar
    function searchRequirementId(_idposition, _internalId) {
        $.ajax({
            url: `/requisitospuestos/${_idposition}/${_internalId}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    optionreq = 2;
                    $(".cont-form-newRequirent").html('');
                    $(".cont-form-newRequirent").append(data);
                    //cerrar formulario de nueva direccion
                    $('.btncancelar_new_PositionRequirement').on('click', function () {
                        $('.cont-form-newRequirent').addClass("collapse");
                        $('.btnnewRequirent').text("Nuevo");
                    });
                    //save new requirentment position
                    $("#new_PositionRequirement").submit(function (e) {
                        if ($(this).valid()) {
                            e.preventDefault();
                            savePositionRequirement(_idposition);
                        }
                    });
                    $('.btnnewRequirent').text("Editar");
                    $('#PositionIdRequirement').val(_idposition);
                    $('.cont-form-newRequirent').removeClass("collapse");
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zaXRpb25SZXF1aXJlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UeXBlU2NyaXB0RmlsZS9Qb3NpdGlvblJlcXVpcmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBRUgsU0FBUyxFQUFFLENBQUM7SUFDUixJQUFJLHdCQUFnQyxDQUFDO0lBQ3JDLElBQUksU0FBaUIsQ0FBQztBQUMxQixDQUFDO0FBRUQsWUFBWSxFQUFFLENBQUM7SUFDWCxxREFBcUQ7SUFDckQsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksY0FBYyxHQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqRCxJQUFJLGNBQWMsR0FBRyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7WUFFaEQsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ0gsMkJBQTJCO0lBQzNCLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQzFCLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsd0VBQXdFO1FBQ3hFLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDekIsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsd0JBQXdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUks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QyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQkFDdkMsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsaUNBQWlDO29CQUNqQyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO3dCQUM1QyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOzRCQUNsQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7NEJBQ25CLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFBO3dCQUN4QyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUVILENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtvQkFDcEMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO29CQUM1QyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3pELENBQUM7WUFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztnQkFDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsQ0FBQztTQUVKLENBQUMsQ0FBQztJQUVQLENBQUM7QUFHTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIFBvc2l0aW9uUmVxdWlyZW50LnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBNw7NkdWxvIGRlIGdlc3Rpw7NuIGRlIHJlcXVpc2l0b3MgZGUgcHVlc3Rvcy4gUGVybWl0ZSBjcmVhciwgZWRpdGFyXHJcbiAqICAgICAgICAgICAgICB5IGFkbWluaXN0cmFyIGxvcyByZXF1aXNpdG9zIG5lY2VzYXJpb3MgcGFyYSBjYWRhIHB1ZXN0byB2YWNhbnRlLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBSZXF1aXNpdG9zUHVlc3Rvc1xyXG4gKi9cclxuXHJcbnZhcmlhYmxlczoge1xyXG4gICAgdmFyIGlkcG9zaXRpb25mb3JSZXF1aXJlbWVudDogc3RyaW5nO1xyXG4gICAgdmFyIG9wdGlvbnJlcTogbnVtYmVyO1xyXG59XHJcblxyXG5lc2N1Y2hhZG9yZXM6IHtcclxuICAgIC8vUGFyYSBkaXNlw7FvLCBzZSBvY3VsdGEgZWwgaW5kaWNhZG9yIGFsIGhhY2VyIHNjcm9sbFxyXG4gICAgJChcIi5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nXCIpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uU2Nyb2xsOiBudW1iZXIgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmIChwb3NpdGlvblNjcm9sbCA+IDApXHJcbiAgICAgICAgICAgICQoJy5mb3ItZW1wbG95ZWUtYWRkcmVzcycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJCgnLmZvci1lbXBsb3llZS1hZGRyZXNzJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICB9KTtcclxuICAgIC8vYWJyaXIgbW9kYWwgZGUgcmVxdWlzaXRvc1xyXG4gICAgJCgnLlJlcXVpcmVtZW50Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlkcG9zaXRpb25mb3JSZXF1aXJlbWVudCA9IFwiXCI7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yID0gMDtcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKFwiLnNlbGVjdFBvc2l0aW9uW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICAgICAgaWRwb3NpdGlvbmZvclJlcXVpcmVtZW50ID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBvc2l0aW9uSWR0Ymxwb3NcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkRlYmUgc2VsZWNjaW9uYXIgdW4gUmVnaXN0cm8hIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb250YWRvciA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkRlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyBSZWdpc3RybyEhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VhcmNoUG9zaXRpb25SZXF1aXJlbWVudChpZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgJCgnLnJlcXVpc2l0b3B1ZXN0b3MnKS5tb2RhbChcInNob3dcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9udWV2byByZXF1aXNpdG9zIHBhcmEgcHVlc3RvXHJcbiAgICAkKCcuTmV3UmVxdWlyZW5Ud28nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgb3B0aW9ucmVxID0gMTtcclxuICAgICAgICBzZWFyY2hSZXF1aXJlbWVudEZvcm0oaWRwb3NpdGlvbmZvclJlcXVpcmVtZW50KTtcclxuICAgICAgICAvL0Z1bmNpb24gcGFyYSBtb3ZlciBlbCBzY3JvbGwsIHBhcmEgbWVqb3IgZGlzZcOxb1xyXG4gICAgICAgICQoJy5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nJykuc2Nyb2xsVG9wKDApO1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL2NlcnJhciBtb2RhbCBkZSByZXF1aXNpdG9zIGRlIHB1ZXN0b3NcclxuICAgICQoJy5jZXJyYXJNb2RSZXF1aXJlbWVudCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJCgnLlNhdmVSZXF1aXJlbWVudCcpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICQoJy5EYXRvc0xpbmVhcycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICQoJy5yZXF1aXNpdG9wdWVzdG9zJykubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgIGlkcG9zaXRpb25mb3JSZXF1aXJlbWVudCA9IFwiXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VsaW1pbmFyIHJlcXVpc2l0b3MgZGUgcHVlc3RvXHJcbiAgICAkKFwiI0RlbGV0ZVBvc2l0aW9uUmVxdWlyZW1lbnRcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBMaXN0SWQgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdFBvc2l0aW9uUmVxdWlyZW1lbnRbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJMaXN0UG9zaXRpb25SZXF1aXJlbWVudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJMaXN0UG9zaXRpb25SZXF1aXJlbWVudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLk5hbWVQb3NpdGlvblJlcXVpcmVtZW50XCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuRGVsZXRlUG9zaXRpb25SZXF1aXJlbWVudFwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIFJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgbG9zIHJlcXVpc2l0b3Mgc2VsZWNjaW9uYWRvcz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9yZXF1aXNpdG9zcHVlc3Rvcy9lbGltaW5hclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0RlbGV0ZVBvc2l0aW9uUmVxdWlyZW1lbnRcIikuc2VyaWFsaXplKCkgKyBgJnBvc2l0aW9uaWQ9JHtpZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnR9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuTGlzdFBvc2l0aW9uUmVxdWlyZW1lbnRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUG9zaXRpb25SZXF1aXJlbWVudChpZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdFBvc2l0aW9uUmVxdWlyZW1lbnRbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5MaXN0UG9zaXRpb25SZXF1aXJlbWVudFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICBcclxuXHJcbn1cclxuXHJcbmZ1bmNpb25lczoge1xyXG5cclxuICAgIC8vYnVzY2FyIGVsIGZvcm11bGFyaW8gcGFyYSBjcmVhciBvIGVkaXRhciByZXF1aXNpdG9zXHJcbiAgICBmdW5jdGlvbiBzZWFyY2hSZXF1aXJlbWVudEZvcm0oX2lkcG9zaXRpb25mb3JSZXF1aXJlbWVudDogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9yZXF1aXNpdG9zcHVlc3Rvcy9mb3JtdWxhcmlvTmV3UmVxdWlyZW1lbnRcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuY29udC1mb3JtLW5ld1JlcXVpcmVudFwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmNvbnQtZm9ybS1uZXdSZXF1aXJlbnRcIikuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY2VycmFyIGZvcm11bGFyaW8gZGUgbnVldm8gcmVxdWlzaXRvIGRlIHB1ZXN0b1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5idG5jYW5jZWxhcl9uZXdfUG9zaXRpb25SZXF1aXJlbWVudCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnQtZm9ybS1uZXdSZXF1aXJlbnQnKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuYnRubmV3UmVxdWlyZW50JykudGV4dChcIk51ZXZvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zYXZlIG5ldyByZXF1aXJlbnRtZW50IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNuZXdfUG9zaXRpb25SZXF1aXJlbWVudFwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZVBvc2l0aW9uUmVxdWlyZW1lbnQoX2lkcG9zaXRpb25mb3JSZXF1aXJlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXIgY2FtcG8gbm9tYnJlIGRlbCByZXF1aXNpdG9cclxuICAgICAgICAgICAgICAgICAgICAkKFwiI05hbWVcIikua2V5dXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGltZW50aW9uID0gJCh0aGlzKS52YWwoKS50b1N0cmluZygpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpbWVudGlvbiA9PSA1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFTb2xvIDUwIGNhcmFjdGVyZXMhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJyNQb3NpdGlvbklkUmVxdWlyZW1lbnQnKS52YWwoX2lkcG9zaXRpb25mb3JSZXF1aXJlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAkKCcuY29udC1mb3JtLW5ld1JlcXVpcmVudCcpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vc2F2ZSBBZGRyZXMgZW1wbG95ZWVcclxuICAgIGZ1bmN0aW9uIHNhdmVQb3NpdGlvblJlcXVpcmVtZW50KF9pZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQ6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvcmVxdWlzaXRvc3B1ZXN0b3MvZ3VhcmRhclwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogJChcIiNuZXdfUG9zaXRpb25SZXF1aXJlbWVudFwiKS5zZXJpYWxpemUoKSArIGAmb3BlcmFjaW9uPSR7b3B0aW9ucmVxfWAsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUG9zaXRpb25SZXF1aXJlbWVudChfaWRwb3NpdGlvbmZvclJlcXVpcmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3X1Bvc2l0aW9uUmVxdWlyZW1lbnRcIikgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuY29udC1mb3JtLW5ld1JlcXVpcmVudCcpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld1JlcXVpcmVudCcpLnRleHQoXCJOdWV2b1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICAgLy9idXNjYXIgbG9zIHJlcXVpc2l0b3MgZGUgdW4gcHVlc3RvXHJcbiAgICBmdW5jdGlvbiBzZWFyY2hQb3NpdGlvblJlcXVpcmVtZW50KF9pZHBvc2l0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAvcmVxdWlzaXRvc3B1ZXN0b3MvJHtfaWRwb3NpdGlvbn1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmRhdGF0YWJsZS1SZXF1aXJlbWVudFwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmRhdGF0YWJsZS1SZXF1aXJlbWVudFwiKS5hcHBlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vZG9ibGUgY2xpayBlbiBsYSBsaW5lYSBwYXJhIGVkaXRhciBcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLkxpbmVUYWJsZVBvc2l0aW9uUmVxdWlyZW1lbnRcIikuZGJsY2xpY2soZnVuY3Rpb24gbXlmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVxdWlyZW1lbnRJZChfaWRwb3NpdGlvbiwgJCh0aGlzKS5maW5kKFwiLk5hbWVQb3NpdGlvblJlcXVpcmVtZW50XCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9idXNjYXIgdW4gcmVxdWlzaXRvIHBhcmEgZWRpdGFyXHJcbiAgICBmdW5jdGlvbiBzZWFyY2hSZXF1aXJlbWVudElkKF9pZHBvc2l0aW9uOiBzdHJpbmcsIF9pbnRlcm5hbElkOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgdXJsOiBgL3JlcXVpc2l0b3NwdWVzdG9zLyR7X2lkcG9zaXRpb259LyR7X2ludGVybmFsSWR9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucmVxID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmNvbnQtZm9ybS1uZXdSZXF1aXJlbnRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5jb250LWZvcm0tbmV3UmVxdWlyZW50XCIpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NlcnJhciBmb3JtdWxhcmlvIGRlIG51ZXZhIGRpcmVjY2lvblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5idG5jYW5jZWxhcl9uZXdfUG9zaXRpb25SZXF1aXJlbWVudCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnQtZm9ybS1uZXdSZXF1aXJlbnQnKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuYnRubmV3UmVxdWlyZW50JykudGV4dChcIk51ZXZvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zYXZlIG5ldyByZXF1aXJlbnRtZW50IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNuZXdfUG9zaXRpb25SZXF1aXJlbWVudFwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZVBvc2l0aW9uUmVxdWlyZW1lbnQoX2lkcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld1JlcXVpcmVudCcpLnRleHQoXCJFZGl0YXJcIilcclxuICAgICAgICAgICAgICAgICAgICAkKCcjUG9zaXRpb25JZFJlcXVpcmVtZW50JykudmFsKF9pZHBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jb250LWZvcm0tbmV3UmVxdWlyZW50JykucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==