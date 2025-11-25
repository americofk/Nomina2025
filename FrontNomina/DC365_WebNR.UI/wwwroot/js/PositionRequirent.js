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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zaXRpb25SZXF1aXJlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UeXBlU2NyaXB0RmlsZS9Qb3NpdGlvblJlcXVpcmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLEVBQUUsQ0FBQztJQUNSLElBQUksd0JBQWdDLENBQUM7SUFDckMsSUFBSSxTQUFpQixDQUFDO0FBQzFCLENBQUM7QUFFRCxZQUFZLEVBQUUsQ0FBQztJQUNYLHFEQUFxRDtJQUNyRCxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxjQUFjLEdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pELElBQUksY0FBYyxHQUFHLENBQUM7WUFDbEIsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztZQUVoRCxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFDSCwyQkFBMkI7SUFDM0IsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7UUFDMUIsd0JBQXdCLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQix3RUFBd0U7UUFDeEUsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN6QixRQUFRLEVBQUUsQ0FBQztnQkFDWCx3QkFBd0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxF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QUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUN2QyxDQUFDLENBQUMsQ0FBQztvQkFDSCxpQ0FBaUM7b0JBQ2pDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQzVDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7NEJBQ2xCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs0QkFDbkIsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQUE7d0JBQ3hDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBRUgsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUNwQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7b0JBQzVDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekQsQ0FBQztZQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHO2dCQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDO1NBRUosQ0FBQyxDQUFDO0lBRVAsQ0FBQztBQUdMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXJpYWJsZXM6IHtcclxuICAgIHZhciBpZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQ6IHN0cmluZztcclxuICAgIHZhciBvcHRpb25yZXE6IG51bWJlcjtcclxufVxyXG5cclxuZXNjdWNoYWRvcmVzOiB7XHJcbiAgICAvL1BhcmEgZGlzZcOxbywgc2Ugb2N1bHRhIGVsIGluZGljYWRvciBhbCBoYWNlciBzY3JvbGxcclxuICAgICQoXCIuY29udGFpbmVyLW1vZGFsLXNjcm9sbGluZ1wiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBwb3NpdGlvblNjcm9sbDogbnVtYmVyID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBpZiAocG9zaXRpb25TY3JvbGwgPiAwKVxyXG4gICAgICAgICAgICAkKCcuZm9yLWVtcGxveWVlLWFkZHJlc3MnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQoJy5mb3ItZW1wbG95ZWUtYWRkcmVzcycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgfSk7XHJcbiAgICAvL2FicmlyIG1vZGFsIGRlIHJlcXVpc2l0b3NcclxuICAgICQoJy5SZXF1aXJlbWVudCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQgPSBcIlwiO1xyXG4gICAgICAgIHZhciBjb250YWRvciA9IDA7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIGlkcG9zaXRpb25mb3JSZXF1aXJlbWVudCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5Qb3NpdGlvbklkdGJscG9zXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIFJlZ2lzdHJvISFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIHNvbG8gUmVnaXN0cm8hIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlYXJjaFBvc2l0aW9uUmVxdWlyZW1lbnQoaWRwb3NpdGlvbmZvclJlcXVpcmVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICQoJy5yZXF1aXNpdG9wdWVzdG9zJykubW9kYWwoXCJzaG93XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vbnVldm8gcmVxdWlzaXRvcyBwYXJhIHB1ZXN0b1xyXG4gICAgJCgnLk5ld1JlcXVpcmVuVHdvJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbnJlcSA9IDE7XHJcbiAgICAgICAgc2VhcmNoUmVxdWlyZW1lbnRGb3JtKGlkcG9zaXRpb25mb3JSZXF1aXJlbWVudCk7XHJcbiAgICAgICAgLy9GdW5jaW9uIHBhcmEgbW92ZXIgZWwgc2Nyb2xsLCBwYXJhIG1lam9yIGRpc2XDsW9cclxuICAgICAgICAkKCcuY29udGFpbmVyLW1vZGFsLXNjcm9sbGluZycpLnNjcm9sbFRvcCgwKTtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9jZXJyYXIgbW9kYWwgZGUgcmVxdWlzaXRvcyBkZSBwdWVzdG9zXHJcbiAgICAkKCcuY2VycmFyTW9kUmVxdWlyZW1lbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICQoJy5TYXZlUmVxdWlyZW1lbnQnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAkKCcuRGF0b3NMaW5lYXMnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAkKCcucmVxdWlzaXRvcHVlc3RvcycpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICBpZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQgPSBcIlwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9lbGltaW5hciByZXF1aXNpdG9zIGRlIHB1ZXN0b1xyXG4gICAgJChcIiNEZWxldGVQb3NpdGlvblJlcXVpcmVtZW50XCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgTGlzdElkID0gW107XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblJlcXVpcmVtZW50W3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiTGlzdFBvc2l0aW9uUmVxdWlyZW1lbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiTGlzdFBvc2l0aW9uUmVxdWlyZW1lbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5OYW1lUG9zaXRpb25SZXF1aXJlbWVudFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLkRlbGV0ZVBvc2l0aW9uUmVxdWlyZW1lbnRcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBSZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGxvcyByZXF1aXNpdG9zIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcmVxdWlzaXRvc3B1ZXN0b3MvZWxpbWluYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNEZWxldGVQb3NpdGlvblJlcXVpcmVtZW50XCIpLnNlcmlhbGl6ZSgpICsgYCZwb3NpdGlvbmlkPSR7aWRwb3NpdGlvbmZvclJlcXVpcmVtZW50fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkxpc3RQb3NpdGlvblJlcXVpcmVtZW50XCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFBvc2l0aW9uUmVxdWlyZW1lbnQoaWRwb3NpdGlvbmZvclJlcXVpcmVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblJlcXVpcmVtZW50W3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuTGlzdFBvc2l0aW9uUmVxdWlyZW1lbnRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgXHJcblxyXG59XHJcblxyXG5mdW5jaW9uZXM6IHtcclxuXHJcbiAgICAvL2J1c2NhciBlbCBmb3JtdWxhcmlvIHBhcmEgY3JlYXIgbyBlZGl0YXIgcmVxdWlzaXRvc1xyXG4gICAgZnVuY3Rpb24gc2VhcmNoUmVxdWlyZW1lbnRGb3JtKF9pZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQ6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvcmVxdWlzaXRvc3B1ZXN0b3MvZm9ybXVsYXJpb05ld1JlcXVpcmVtZW50XCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmNvbnQtZm9ybS1uZXdSZXF1aXJlbnRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5jb250LWZvcm0tbmV3UmVxdWlyZW50XCIpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NlcnJhciBmb3JtdWxhcmlvIGRlIG51ZXZvIHJlcXVpc2l0byBkZSBwdWVzdG9cclxuICAgICAgICAgICAgICAgICAgICAkKCcuYnRuY2FuY2VsYXJfbmV3X1Bvc2l0aW9uUmVxdWlyZW1lbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb250LWZvcm0tbmV3UmVxdWlyZW50JykuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld1JlcXVpcmVudCcpLnRleHQoXCJOdWV2b1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2F2ZSBuZXcgcmVxdWlyZW50bWVudCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbmV3X1Bvc2l0aW9uUmVxdWlyZW1lbnRcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVQb3NpdGlvblJlcXVpcmVtZW50KF9pZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy92YWxpZGFyIGNhbXBvIG5vbWJyZSBkZWwgcmVxdWlzaXRvXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNOYW1lXCIpLmtleXVwKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpbWVudGlvbiA9ICQodGhpcykudmFsKCkudG9TdHJpbmcoKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaW1lbnRpb24gPT0gNTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhU29sbyA1MCBjYXJhY3RlcmVzIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcjUG9zaXRpb25JZFJlcXVpcmVtZW50JykudmFsKF9pZHBvc2l0aW9uZm9yUmVxdWlyZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnQtZm9ybS1uZXdSZXF1aXJlbnQnKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL3NhdmUgQWRkcmVzIGVtcGxveWVlXHJcbiAgICBmdW5jdGlvbiBzYXZlUG9zaXRpb25SZXF1aXJlbWVudChfaWRwb3NpdGlvbmZvclJlcXVpcmVtZW50OiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL3JlcXVpc2l0b3NwdWVzdG9zL2d1YXJkYXJcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6ICQoXCIjbmV3X1Bvc2l0aW9uUmVxdWlyZW1lbnRcIikuc2VyaWFsaXplKCkgKyBgJm9wZXJhY2lvbj0ke29wdGlvbnJlcX1gLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFBvc2l0aW9uUmVxdWlyZW1lbnQoX2lkcG9zaXRpb25mb3JSZXF1aXJlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ld19Qb3NpdGlvblJlcXVpcmVtZW50XCIpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnQtZm9ybS1uZXdSZXF1aXJlbnQnKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5idG5uZXdSZXF1aXJlbnQnKS50ZXh0KFwiTnVldm9cIilcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAgIC8vYnVzY2FyIGxvcyByZXF1aXNpdG9zIGRlIHVuIHB1ZXN0b1xyXG4gICAgZnVuY3Rpb24gc2VhcmNoUG9zaXRpb25SZXF1aXJlbWVudChfaWRwb3NpdGlvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgL3JlcXVpc2l0b3NwdWVzdG9zLyR7X2lkcG9zaXRpb259YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5kYXRhdGFibGUtUmVxdWlyZW1lbnRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5kYXRhdGFibGUtUmVxdWlyZW1lbnRcIikuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2RvYmxlIGNsaWsgZW4gbGEgbGluZWEgcGFyYSBlZGl0YXIgXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5MaW5lVGFibGVQb3NpdGlvblJlcXVpcmVtZW50XCIpLmRibGNsaWNrKGZ1bmN0aW9uIG15ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlcXVpcmVtZW50SWQoX2lkcG9zaXRpb24sICQodGhpcykuZmluZChcIi5OYW1lUG9zaXRpb25SZXF1aXJlbWVudFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYnVzY2FyIHVuIHJlcXVpc2l0byBwYXJhIGVkaXRhclxyXG4gICAgZnVuY3Rpb24gc2VhcmNoUmVxdWlyZW1lbnRJZChfaWRwb3NpdGlvbjogc3RyaW5nLCBfaW50ZXJuYWxJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgIHVybDogYC9yZXF1aXNpdG9zcHVlc3Rvcy8ke19pZHBvc2l0aW9ufS8ke19pbnRlcm5hbElkfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnJlcSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5jb250LWZvcm0tbmV3UmVxdWlyZW50XCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuY29udC1mb3JtLW5ld1JlcXVpcmVudFwiKS5hcHBlbmQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZXJyYXIgZm9ybXVsYXJpbyBkZSBudWV2YSBkaXJlY2Npb25cclxuICAgICAgICAgICAgICAgICAgICAkKCcuYnRuY2FuY2VsYXJfbmV3X1Bvc2l0aW9uUmVxdWlyZW1lbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb250LWZvcm0tbmV3UmVxdWlyZW50JykuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld1JlcXVpcmVudCcpLnRleHQoXCJOdWV2b1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2F2ZSBuZXcgcmVxdWlyZW50bWVudCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbmV3X1Bvc2l0aW9uUmVxdWlyZW1lbnRcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVQb3NpdGlvblJlcXVpcmVtZW50KF9pZHBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5idG5uZXdSZXF1aXJlbnQnKS50ZXh0KFwiRWRpdGFyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI1Bvc2l0aW9uSWRSZXF1aXJlbWVudCcpLnZhbChfaWRwb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAkKCcuY29udC1mb3JtLW5ld1JlcXVpcmVudCcpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=