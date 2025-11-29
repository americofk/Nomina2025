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
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
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
                        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
                        if ($(this).valid()) {
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
                        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
                        if ($(this).valid()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zaXRpb25SZXF1aXJlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UeXBlU2NyaXB0RmlsZS9Qb3NpdGlvblJlcXVpcmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBRUgsU0FBUyxFQUFFLENBQUM7SUFDUixJQUFJLHdCQUFnQyxDQUFDO0lBQ3JDLElBQUksU0FBaUIsQ0FBQztBQUMxQixDQUFDO0FBRUQsWUFBWSxFQUFFLENBQUM7SUFDWCxxREFBcUQ7SUFDckQsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksY0FBYyxHQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqRCxJQUFJLGNBQWMsR0FBRyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7WUFFaEQsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ0gsMkJBQTJCO0lBQzNCLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQzFCLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsd0VBQXdFO1FBQ3hFLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDekIsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsd0JBQXdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUks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QUMsQ0FBQzt3QkFDbEQsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUN2QyxDQUFDLENBQUMsQ0FBQztvQkFDSCxpQ0FBaUM7b0JBQ2pDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQzVELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLGtEQUFrRDt3QkFDdEUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzs0QkFDRix1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQTt3QkFDeEMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFFSCxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7b0JBQ3BDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtvQkFDNUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN6RCxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FFSixDQUFDLENBQUM7SUFFUCxDQUFDO0FBR0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZSBQb3NpdGlvblJlcXVpcmVudC50c1xyXG4gKiBAZGVzY3JpcHRpb24gTcOzZHVsbyBkZSBnZXN0acOzbiBkZSByZXF1aXNpdG9zIGRlIHB1ZXN0b3MuIFBlcm1pdGUgY3JlYXIsIGVkaXRhclxyXG4gKiAgICAgICAgICAgICAgeSBhZG1pbmlzdHJhciBsb3MgcmVxdWlzaXRvcyBuZWNlc2FyaW9zIHBhcmEgY2FkYSBwdWVzdG8gdmFjYW50ZS5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgUmVxdWlzaXRvc1B1ZXN0b3NcclxuICovXHJcblxyXG52YXJpYWJsZXM6IHtcclxuICAgIHZhciBpZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQ6IHN0cmluZztcclxuICAgIHZhciBvcHRpb25yZXE6IG51bWJlcjtcclxufVxyXG5cclxuZXNjdWNoYWRvcmVzOiB7XHJcbiAgICAvL1BhcmEgZGlzZcOxbywgc2Ugb2N1bHRhIGVsIGluZGljYWRvciBhbCBoYWNlciBzY3JvbGxcclxuICAgICQoXCIuY29udGFpbmVyLW1vZGFsLXNjcm9sbGluZ1wiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBwb3NpdGlvblNjcm9sbDogbnVtYmVyID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBpZiAocG9zaXRpb25TY3JvbGwgPiAwKVxyXG4gICAgICAgICAgICAkKCcuZm9yLWVtcGxveWVlLWFkZHJlc3MnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQoJy5mb3ItZW1wbG95ZWUtYWRkcmVzcycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgfSk7XHJcbiAgICAvL2FicmlyIG1vZGFsIGRlIHJlcXVpc2l0b3NcclxuICAgICQoJy5SZXF1aXJlbWVudCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQgPSBcIlwiO1xyXG4gICAgICAgIHZhciBjb250YWRvciA9IDA7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIGlkcG9zaXRpb25mb3JSZXF1aXJlbWVudCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5Qb3NpdGlvbklkdGJscG9zXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIFJlZ2lzdHJvISFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIHNvbG8gUmVnaXN0cm8hIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlYXJjaFBvc2l0aW9uUmVxdWlyZW1lbnQoaWRwb3NpdGlvbmZvclJlcXVpcmVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICQoJy5yZXF1aXNpdG9wdWVzdG9zJykubW9kYWwoXCJzaG93XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vbnVldm8gcmVxdWlzaXRvcyBwYXJhIHB1ZXN0b1xyXG4gICAgJCgnLk5ld1JlcXVpcmVuVHdvJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbnJlcSA9IDE7XHJcbiAgICAgICAgc2VhcmNoUmVxdWlyZW1lbnRGb3JtKGlkcG9zaXRpb25mb3JSZXF1aXJlbWVudCk7XHJcbiAgICAgICAgLy9GdW5jaW9uIHBhcmEgbW92ZXIgZWwgc2Nyb2xsLCBwYXJhIG1lam9yIGRpc2XDsW9cclxuICAgICAgICAkKCcuY29udGFpbmVyLW1vZGFsLXNjcm9sbGluZycpLnNjcm9sbFRvcCgwKTtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9jZXJyYXIgbW9kYWwgZGUgcmVxdWlzaXRvcyBkZSBwdWVzdG9zXHJcbiAgICAkKCcuY2VycmFyTW9kUmVxdWlyZW1lbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICQoJy5TYXZlUmVxdWlyZW1lbnQnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAkKCcuRGF0b3NMaW5lYXMnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAkKCcucmVxdWlzaXRvcHVlc3RvcycpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICBpZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQgPSBcIlwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9lbGltaW5hciByZXF1aXNpdG9zIGRlIHB1ZXN0b1xyXG4gICAgJChcIiNEZWxldGVQb3NpdGlvblJlcXVpcmVtZW50XCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gU2llbXByZSBwcmV2ZW5pciBlbCBlbnbDrW8gbmF0aXZvIGRlbCBmb3JtdWxhcmlvXHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICB2YXIgTGlzdElkID0gW107XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblJlcXVpcmVtZW50W3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiTGlzdFBvc2l0aW9uUmVxdWlyZW1lbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiTGlzdFBvc2l0aW9uUmVxdWlyZW1lbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5OYW1lUG9zaXRpb25SZXF1aXJlbWVudFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLkRlbGV0ZVBvc2l0aW9uUmVxdWlyZW1lbnRcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBSZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGxvcyByZXF1aXNpdG9zIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcmVxdWlzaXRvc3B1ZXN0b3MvZWxpbWluYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNEZWxldGVQb3NpdGlvblJlcXVpcmVtZW50XCIpLnNlcmlhbGl6ZSgpICsgYCZwb3NpdGlvbmlkPSR7aWRwb3NpdGlvbmZvclJlcXVpcmVtZW50fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkxpc3RQb3NpdGlvblJlcXVpcmVtZW50XCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFBvc2l0aW9uUmVxdWlyZW1lbnQoaWRwb3NpdGlvbmZvclJlcXVpcmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblJlcXVpcmVtZW50W3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuTGlzdFBvc2l0aW9uUmVxdWlyZW1lbnRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgXHJcblxyXG59XHJcblxyXG5mdW5jaW9uZXM6IHtcclxuXHJcbiAgICAvL2J1c2NhciBlbCBmb3JtdWxhcmlvIHBhcmEgY3JlYXIgbyBlZGl0YXIgcmVxdWlzaXRvc1xyXG4gICAgZnVuY3Rpb24gc2VhcmNoUmVxdWlyZW1lbnRGb3JtKF9pZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQ6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvcmVxdWlzaXRvc3B1ZXN0b3MvZm9ybXVsYXJpb05ld1JlcXVpcmVtZW50XCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmNvbnQtZm9ybS1uZXdSZXF1aXJlbnRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5jb250LWZvcm0tbmV3UmVxdWlyZW50XCIpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NlcnJhciBmb3JtdWxhcmlvIGRlIG51ZXZvIHJlcXVpc2l0byBkZSBwdWVzdG9cclxuICAgICAgICAgICAgICAgICAgICAkKCcuYnRuY2FuY2VsYXJfbmV3X1Bvc2l0aW9uUmVxdWlyZW1lbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb250LWZvcm0tbmV3UmVxdWlyZW50JykuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld1JlcXVpcmVudCcpLnRleHQoXCJOdWV2b1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2F2ZSBuZXcgcmVxdWlyZW50bWVudCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbmV3X1Bvc2l0aW9uUmVxdWlyZW1lbnRcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBTaWVtcHJlIHByZXZlbmlyIGVsIGVudsOtbyBuYXRpdm8gZGVsIGZvcm11bGFyaW9cclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlUG9zaXRpb25SZXF1aXJlbWVudChfaWRwb3NpdGlvbmZvclJlcXVpcmVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFsaWRhciBjYW1wbyBub21icmUgZGVsIHJlcXVpc2l0b1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjTmFtZVwiKS5rZXl1cChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaW1lbnRpb24gPSAkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGltZW50aW9uID09IDUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoVNvbG8gNTAgY2FyYWN0ZXJlcyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI1Bvc2l0aW9uSWRSZXF1aXJlbWVudCcpLnZhbChfaWRwb3NpdGlvbmZvclJlcXVpcmVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jb250LWZvcm0tbmV3UmVxdWlyZW50JykucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9zYXZlIEFkZHJlcyBlbXBsb3llZVxyXG4gICAgZnVuY3Rpb24gc2F2ZVBvc2l0aW9uUmVxdWlyZW1lbnQoX2lkcG9zaXRpb25mb3JSZXF1aXJlbWVudDogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9yZXF1aXNpdG9zcHVlc3Rvcy9ndWFyZGFyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiAkKFwiI25ld19Qb3NpdGlvblJlcXVpcmVtZW50XCIpLnNlcmlhbGl6ZSgpICsgYCZvcGVyYWNpb249JHtvcHRpb25yZXF9YCxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hQb3NpdGlvblJlcXVpcmVtZW50KF9pZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXdfUG9zaXRpb25SZXF1aXJlbWVudFwiKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jb250LWZvcm0tbmV3UmVxdWlyZW50JykuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYnRubmV3UmVxdWlyZW50JykudGV4dChcIk51ZXZvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgICAvL2J1c2NhciBsb3MgcmVxdWlzaXRvcyBkZSB1biBwdWVzdG9cclxuICAgIGZ1bmN0aW9uIHNlYXJjaFBvc2l0aW9uUmVxdWlyZW1lbnQoX2lkcG9zaXRpb246IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYC9yZXF1aXNpdG9zcHVlc3Rvcy8ke19pZHBvc2l0aW9ufWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuZGF0YXRhYmxlLVJlcXVpcmVtZW50XCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuZGF0YXRhYmxlLVJlcXVpcmVtZW50XCIpLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kb2JsZSBjbGlrIGVuIGxhIGxpbmVhIHBhcmEgZWRpdGFyIFxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuTGluZVRhYmxlUG9zaXRpb25SZXF1aXJlbWVudFwiKS5kYmxjbGljayhmdW5jdGlvbiBteWZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXF1aXJlbWVudElkKF9pZHBvc2l0aW9uLCAkKHRoaXMpLmZpbmQoXCIuTmFtZVBvc2l0aW9uUmVxdWlyZW1lbnRcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL2J1c2NhciB1biByZXF1aXNpdG8gcGFyYSBlZGl0YXJcclxuICAgIGZ1bmN0aW9uIHNlYXJjaFJlcXVpcmVtZW50SWQoX2lkcG9zaXRpb246IHN0cmluZywgX2ludGVybmFsSWQ6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICB1cmw6IGAvcmVxdWlzaXRvc3B1ZXN0b3MvJHtfaWRwb3NpdGlvbn0vJHtfaW50ZXJuYWxJZH1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25yZXEgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuY29udC1mb3JtLW5ld1JlcXVpcmVudFwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmNvbnQtZm9ybS1uZXdSZXF1aXJlbnRcIikuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY2VycmFyIGZvcm11bGFyaW8gZGUgbnVldmEgZGlyZWNjaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bmNhbmNlbGFyX25ld19Qb3NpdGlvblJlcXVpcmVtZW50Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY29udC1mb3JtLW5ld1JlcXVpcmVudCcpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5idG5uZXdSZXF1aXJlbnQnKS50ZXh0KFwiTnVldm9cIilcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3NhdmUgbmV3IHJlcXVpcmVudG1lbnQgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICAkKFwiI25ld19Qb3NpdGlvblJlcXVpcmVtZW50XCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gU2llbXByZSBwcmV2ZW5pciBlbCBlbnbDrW8gbmF0aXZvIGRlbCBmb3JtdWxhcmlvXHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZVBvc2l0aW9uUmVxdWlyZW1lbnQoX2lkcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld1JlcXVpcmVudCcpLnRleHQoXCJFZGl0YXJcIilcclxuICAgICAgICAgICAgICAgICAgICAkKCcjUG9zaXRpb25JZFJlcXVpcmVtZW50JykudmFsKF9pZHBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jb250LWZvcm0tbmV3UmVxdWlyZW50JykucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==