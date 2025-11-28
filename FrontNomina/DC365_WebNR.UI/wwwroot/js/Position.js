/**
 * @file Position.ts
 * @description Módulo de gestión de puestos. Permite crear, editar,
 *              eliminar y listar puestos de trabajo en la organización.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Puestos
 */
variables: {
    var option;
}
const fn = {
    //funcion abrir nuevo cargo
    funtionNewPosition: function (_opcion) {
        if (_opcion == "open") {
            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');
        }
        else {
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
            $('.Showid').addClass('collapse');
        }
    },
    //cargar lista de select en formularios 
    loadlistsPosition: function () {
        ListDeparment();
        ListJobs();
    },
    CreateAndEditPosition: function (shouldClose) {
        $.ajax({
            url: "/puestosactivos/guardar",
            type: "POST",
            data: $("#createAndEditPosition").serialize() + `&operacion=${option}`,
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
                    $.get(location.href)
                        .done(function (r) {
                        var newDom = $(r);
                        $('.tblPuestoActivos').replaceWith($('.tblPuestoActivos', newDom));
                        var newDomOne = $(r);
                        $('#NotifyPositionId').replaceWith($('#NotifyPositionId', newDomOne));
                    });
                    windows_message(data.Message, data.Type);
                    if (shouldClose) {
                        let form = document.getElementById("createAndEditPosition");
                        form.reset();
                        fn.funtionNewPosition("close");
                    }
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
};
// Variable para controlar si debe cerrar después de guardar
var shouldCloseAfterSave = false;
escuchadores: {
    //save position
    $("#createAndEditPosition").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            if (option == 2) {
                if ($('#NotifyPositionId').val() == $('#PositionId').val()) {
                    windows_message("¿El puesto al que notifica no puede ser el mismo al que esta editando?", "error");
                    $('#NotifyPositionId').focus();
                }
                else {
                    fn.CreateAndEditPosition(shouldCloseAfterSave);
                    shouldCloseAfterSave = false;
                }
            }
            else {
                fn.CreateAndEditPosition(shouldCloseAfterSave);
                shouldCloseAfterSave = false;
            }
        }
    });
    // Guardar y cerrar
    $('.btnSaveAndClose').on('click', function () {
        shouldCloseAfterSave = true;
        $("#createAndEditPosition").submit();
    });
    //eliminar position
    $("#DeletePosition").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador = false;
            $(".selectPosition[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "IdPosition");
                    input.attr("class", "IdPosition");
                    input.val($(this).parent().parent().find(".PositionIdtblpos").html().trim());
                    $(".DeletePosition").append(input);
                }
            });
        }
        if (!contador) {
            windows_message("!Debe seleccionar un registro!", "error");
        }
        else {
            windows_message("¿Desea eliminar los puestos seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $.ajax({
                        url: "/puestosactivos/eliminar",
                        type: "POST",
                        data: $("#DeletePosition").serialize(),
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            $(".IdPosition").remove();
                            if (data.Type == "error") {
                                var _errors = "";
                                data.Errors.forEach(function (x) {
                                    _errors += `${x}<br>`;
                                });
                                windows_message(_errors, data.Type);
                            }
                            else {
                                $.get(location.href)
                                    .done(function (r) {
                                    var newDom = $(r);
                                    $('.tblPuestoActivos').replaceWith($('.tblPuestoActivos', newDom));
                                });
                                windows_message(data.Message, data.Type);
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                },
                onCancel: function () {
                    $(".selectPosition[type=checkbox]").prop('checked', false);
                    $(".IdPosition").remove();
                }
            });
        }
    });
    //dehabilitar puesto
    $('#Disebleposition').on('click', function () {
        if (!$(this).is(":checked")) {
            let contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPosition[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "PositionIdpos");
                    input.attr("class", "PositionIdpos");
                    input.val($(this).parent().parent().find(".PositionIdtblpos").html().trim());
                    $(".form-Disebleposition").append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#Disebleposition").prop('checked', true);
            }
            else {
                windows_message("¿Desea Inhabilitar puesto?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/puestosactivos/actualizarestatus",
                            type: "POST",
                            data: $("#form-Disebleposition").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".PositionIdpos").remove();
                                if (data.Type == "error") {
                                    var _errors = "";
                                    data.Errors.forEach(function (x) {
                                        _errors += `${x}<br>`;
                                    });
                                    windows_message(_errors, data.Type);
                                }
                                else {
                                    $.get(location.href)
                                        .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblPuestoActivos').replaceWith($('.tblPuestoActivos', newDom));
                                    });
                                    windows_message(data.Message, data.Type);
                                }
                                $("#Disebleposition").prop('checked', true);
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectPosition[type=checkbox]").prop('checked', false);
                        $("#Disebleposition").prop('checked', true);
                        $(".PositionIdpos").remove();
                    }
                });
            }
        }
    });
    //Habilitar puesto
    $('#Enabledposition').on('click', function () {
        if ($(this).is(":checked")) {
            let contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPosition[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "PositionIdpos");
                    input.attr("class", "PositionIdpos");
                    input.val($(this).parent().parent().find(".PositionIdtblpos").html().trim());
                    $(".form-Enabledposition").append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#Enabledposition").prop('checked', false);
            }
            else {
                windows_message("¿Desea habilitar puesto?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/puestosinactivos/actualizarestatus",
                            type: "POST",
                            data: $("#form-Enabledposition").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".PositionIdpos").remove();
                                if (data.Type == "error") {
                                    var _errors = "";
                                    data.Errors.forEach(function (x) {
                                        _errors += `${x}<br>`;
                                    });
                                    windows_message(_errors, data.Type);
                                }
                                else {
                                    $.get(location.href)
                                        .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblCargosActivos').replaceWith($('.tblCargosActivos', newDom));
                                    });
                                    $("#Enabledposition").prop('checked', false);
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectPosition[type=checkbox]").prop('checked', false);
                        $("#Enabledposition").prop('checked', false);
                        $(".PositionIdpos").remove();
                    }
                });
            }
        }
    });
    //Nuevo
    $('.NewPosition').on('click', function () {
        option = 1;
        let form = document.getElementById("createAndEditPosition");
        form.reset();
        $('.Showid').addClass('collapse');
        $('.setiartitulo').text('Nuevo puesto');
        /* loadlistsPosition();*/
        fn.funtionNewPosition("open");
    });
    //cerrar nuevo  cargo
    $('.OpCloseform').on('click', function () {
        fn.funtionNewPosition("close");
    });
    //editar position
    $('.EditPosition').on('click', function () {
        let id;
        var contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectPosition[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                id = $(this).parent().parent().find(".PositionIdtblpos").html().trim();
            }
        });
        if (contador === 0) {
            windows_message("!Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("Debe seleccionar un solo Registro!!", "error");
        }
        else {
            $.ajax({
                url: `/puestosactivos/${id}`,
                type: "GET",
                async: true,
                success: function (data) {
                    $('.progreso').modal('hide');
                    if (data != null) {
                        option = 2;
                        /*loadlistsPosition();*/
                        $('.Showid').removeClass('collapse');
                        $('.setiartitulo').text('Editar puesto');
                        AutomaticBinding(data, "#createAndEditPosition");
                        fn.funtionNewPosition("open");
                    }
                    else {
                        windows_message("No se encontró el cargo", "error");
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    //cerrar opciones de puestos inhabilitados
    $('.Cerrar-PositionDisebled').on('click', function () {
        window.location.href = "/puestosactivos";
    });
    //marcar puesto como vacante
    $('#IsVacant').on('click', function () {
        if ($(this).is(":checked")) {
            let contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPosition[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "PositionIdIsVacant");
                    input.attr("class", "PositionIdIsVacant");
                    input.val($(this).parent().parent().find(".PositionIdtblpos").html().trim());
                    $(".form-IsVacant").append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#IsVacant").prop('checked', false);
            }
            else {
                windows_message("¿Desea marcar puesto como vacante?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/puestosactivos/marcarpuestovacante",
                            type: "POST",
                            data: $("#form-IsVacant").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".PositionIdIsVacant").remove();
                                if (data.Type == "error") {
                                    var _errors = "";
                                    data.Errors.forEach(function (x) {
                                        _errors += `${x}<br>`;
                                    });
                                    windows_message(_errors, data.Type);
                                }
                                else {
                                    $.get(location.href)
                                        .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblPuestoActivos').replaceWith($('.tblPuestoActivos', newDom));
                                    });
                                    $("#IsVacant").prop('checked', false);
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectPosition[type=checkbox]").prop('checked', false);
                        $("#IsVacant").prop('checked', false);
                        $(".PositionIdIsVacant").remove();
                    }
                });
            }
        }
    });
    //validar campo nombre del puesto
    $("#PositionName").keyup(function () {
        let dimention = $(this).val().toString().length;
        if (dimention == 50) {
            windows_message("¡Solo 50 caracteres!", "error");
        }
        ;
    });
    //filtro
    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Position", "/puestosactivos/FilterOrMoreData");
        }
    });
    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Position", "/puestosactivos/FilterOrMoreData");
        }
    });
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();
        let maxscroll = $(".tblPuestoActivos").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "puestosactivos", ".tbody-Table-Position");
            }
        }
    });
    // Habilitar doble clic en filas para editar
    enableRowDoubleClick('.tbody-Table-Position', '.PositionIdtblpos', '/puestosactivos/{id}', function (data) {
        option = 2;
        AutomaticBinding(data, "#createAndEditPosition");
        $('.Showid').removeClass('collapse');
        $('.setiartitulo').text('Editar puesto');
        fn.funtionNewPosition("open");
    });
    // Inicializar modal de auditoría
    initAuditListPage('.selectPosition', '.PositionIdtblpos', '/puestosactivos/getbyid', 'Id');
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UeXBlU2NyaXB0RmlsZS9Qb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBRUgsU0FBUyxFQUFFLENBQUM7SUFDUixJQUFJLE1BQWMsQ0FBQztBQUN2QixDQUFDO0FBQ0QsTUFBTSxFQUFFLEdBQUc7SUFDUCwyQkFBMkI7SUFDM0Isa0JBQWtCLEVBQUUsVUFBVSxPQUFPO1FBQ2pDLElBQUksT0FBTyxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBRXBCLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RCxDQUFDO2FBQU0sQ0FBQztZQUNKLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7SUFDTCxDQUFDO0lBR0Qsd0NBQXdDO0lBQ3hDLGlCQUFpQixFQUFFO1FBQ2YsYUFBYSxFQUFFLENBQUM7UUFDaEIs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Q1gsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQ0osQ0FBQztJQUVGLGlDQUFpQztJQUNqQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSx5QkFBeUIsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIFBvc2l0aW9uLnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBNw7NkdWxvIGRlIGdlc3Rpw7NuIGRlIHB1ZXN0b3MuIFBlcm1pdGUgY3JlYXIsIGVkaXRhcixcclxuICogICAgICAgICAgICAgIGVsaW1pbmFyIHkgbGlzdGFyIHB1ZXN0b3MgZGUgdHJhYmFqbyBlbiBsYSBvcmdhbml6YWNpw7NuLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBQdWVzdG9zXHJcbiAqL1xyXG5cclxudmFyaWFibGVzOiB7XHJcbiAgICB2YXIgb3B0aW9uOiBudW1iZXI7XHJcbn1cclxuY29uc3QgZm4gPSB7XHJcbiAgICAvL2Z1bmNpb24gYWJyaXIgbnVldm8gY2FyZ29cclxuICAgIGZ1bnRpb25OZXdQb3NpdGlvbjogZnVuY3Rpb24gKF9vcGNpb24pIHtcclxuICAgICAgICBpZiAoX29wY2lvbiA9PSBcIm9wZW5cIikge1xyXG5cclxuICAgICAgICAgICAgJCgnLkNvbnRlbmVkb3JMaXN0RW50aXR5JykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5jb250TmV3RW50eXRpJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlRm9ybScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLlNob3dpZCcpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8vY2FyZ2FyIGxpc3RhIGRlIHNlbGVjdCBlbiBmb3JtdWxhcmlvcyBcclxuICAgIGxvYWRsaXN0c1Bvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgTGlzdERlcGFybWVudCgpO1xyXG4gICAgICAgIExpc3RKb2JzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENyZWF0ZUFuZEVkaXRQb3NpdGlvbjogZnVuY3Rpb24gKHNob3VsZENsb3NlOiBib29sZWFuKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9wdWVzdG9zYWN0aXZvcy9ndWFyZGFyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiAkKFwiI2NyZWF0ZUFuZEVkaXRQb3NpdGlvblwiKS5zZXJpYWxpemUoKSArIGAmb3BlcmFjaW9uPSR7b3B0aW9ufWAsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibFB1ZXN0b0FjdGl2b3MnKS5yZXBsYWNlV2l0aCgkKCcudGJsUHVlc3RvQWN0aXZvcycsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbU9uZSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjTm90aWZ5UG9zaXRpb25JZCcpLnJlcGxhY2VXaXRoKCQoJyNOb3RpZnlQb3NpdGlvbklkJywgbmV3RG9tT25lKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRDbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlQW5kRWRpdFBvc2l0aW9uXCIpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5mdW50aW9uTmV3UG9zaXRpb24oXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gVmFyaWFibGUgcGFyYSBjb250cm9sYXIgc2kgZGViZSBjZXJyYXIgZGVzcHXDqXMgZGUgZ3VhcmRhclxyXG52YXIgc2hvdWxkQ2xvc2VBZnRlclNhdmUgPSBmYWxzZTtcclxuZXNjdWNoYWRvcmVzOiB7XHJcbiAgICAvL3NhdmUgcG9zaXRpb25cclxuICAgICQoXCIjY3JlYXRlQW5kRWRpdFBvc2l0aW9uXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKCcjTm90aWZ5UG9zaXRpb25JZCcpLnZhbCgpID09ICQoJyNQb3NpdGlvbklkJykudmFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0VsIHB1ZXN0byBhbCBxdWUgbm90aWZpY2Egbm8gcHVlZGUgc2VyIGVsIG1pc21vIGFsIHF1ZSBlc3RhIGVkaXRhbmRvP1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNOb3RpZnlQb3NpdGlvbklkJykuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLkNyZWF0ZUFuZEVkaXRQb3NpdGlvbihzaG91bGRDbG9zZUFmdGVyU2F2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkQ2xvc2VBZnRlclNhdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZuLkNyZWF0ZUFuZEVkaXRQb3NpdGlvbihzaG91bGRDbG9zZUFmdGVyU2F2ZSk7XHJcbiAgICAgICAgICAgICAgICBzaG91bGRDbG9zZUFmdGVyU2F2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEd1YXJkYXIgeSBjZXJyYXJcclxuICAgICQoJy5idG5TYXZlQW5kQ2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2hvdWxkQ2xvc2VBZnRlclNhdmUgPSB0cnVlO1xyXG4gICAgICAgICQoXCIjY3JlYXRlQW5kRWRpdFBvc2l0aW9uXCIpLnN1Ym1pdCgpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAvL2VsaW1pbmFyIHBvc2l0aW9uXHJcbiAgICAkKFwiI0RlbGV0ZVBvc2l0aW9uXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIklkUG9zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiSWRQb3NpdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBvc2l0aW9uSWR0Ymxwb3NcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5EZWxldGVQb3NpdGlvblwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIiFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgbG9zIHB1ZXN0b3Mgc2VsZWNjaW9uYWRvcz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHVlc3Rvc2FjdGl2b3MvZWxpbWluYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjRGVsZXRlUG9zaXRpb25cIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuSWRQb3NpdGlvblwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibFB1ZXN0b0FjdGl2b3MnKS5yZXBsYWNlV2l0aCgkKCcudGJsUHVlc3RvQWN0aXZvcycsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdFBvc2l0aW9uW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5JZFBvc2l0aW9uXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vZGVoYWJpbGl0YXIgcHVlc3RvXHJcbiAgICAkKCcjRGlzZWJsZXBvc2l0aW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgICAgICQoXCIuc2VsZWN0UG9zaXRpb25bdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIlBvc2l0aW9uSWRwb3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiUG9zaXRpb25JZHBvc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBvc2l0aW9uSWR0Ymxwb3NcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5mb3JtLURpc2VibGVwb3NpdGlvblwiKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0Rpc2VibGVwb3NpdGlvblwiKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIEluaGFiaWxpdGFyIHB1ZXN0bz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHVlc3Rvc2FjdGl2b3MvYWN0dWFsaXphcmVzdGF0dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNmb3JtLURpc2VibGVwb3NpdGlvblwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUG9zaXRpb25JZHBvc1wiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibFB1ZXN0b0FjdGl2b3MnKS5yZXBsYWNlV2l0aCgkKCcudGJsUHVlc3RvQWN0aXZvcycsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNEaXNlYmxlcG9zaXRpb25cIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdFBvc2l0aW9uW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRGlzZWJsZXBvc2l0aW9uXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5Qb3NpdGlvbklkcG9zXCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9IYWJpbGl0YXIgcHVlc3RvXHJcbiAgICAkKCcjRW5hYmxlZHBvc2l0aW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJQb3NpdGlvbklkcG9zXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcIlBvc2l0aW9uSWRwb3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5Qb3NpdGlvbklkdGJscG9zXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuZm9ybS1FbmFibGVkcG9zaXRpb25cIikuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNFbmFibGVkcG9zaXRpb25cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgaGFiaWxpdGFyIHB1ZXN0bz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHVlc3Rvc2luYWN0aXZvcy9hY3R1YWxpemFyZXN0YXR1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI2Zvcm0tRW5hYmxlZHBvc2l0aW9uXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5Qb3NpdGlvbklkcG9zXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZ2V0KGxvY2F0aW9uLmhyZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy50YmxDYXJnb3NBY3Rpdm9zJykucmVwbGFjZVdpdGgoJCgnLnRibENhcmdvc0FjdGl2b3MnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0VuYWJsZWRwb3NpdGlvblwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdFBvc2l0aW9uW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRW5hYmxlZHBvc2l0aW9uXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUG9zaXRpb25JZHBvc1wiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vTnVldm9cclxuICAgICQoJy5OZXdQb3NpdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcHRpb24gPSAxO1xyXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGVBbmRFZGl0UG9zaXRpb25cIikgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAkKCcuU2hvd2lkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgJCgnLnNldGlhcnRpdHVsbycpLnRleHQoJ051ZXZvIHB1ZXN0bycpO1xyXG4gICAgICAgIC8qIGxvYWRsaXN0c1Bvc2l0aW9uKCk7Ki9cclxuICAgICAgICBmbi5mdW50aW9uTmV3UG9zaXRpb24oXCJvcGVuXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9jZXJyYXIgbnVldm8gIGNhcmdvXHJcbiAgICAkKCcuT3BDbG9zZWZvcm0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGZuLmZ1bnRpb25OZXdQb3NpdGlvbihcImNsb3NlXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9lZGl0YXIgcG9zaXRpb25cclxuICAgICQoJy5FZGl0UG9zaXRpb24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBpZDogc3RyaW5nO1xyXG4gICAgICAgIHZhciBjb250YWRvciA9IDA7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIGlkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBvc2l0aW9uSWR0Ymxwb3NcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIiFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIHNvbG8gUmVnaXN0cm8hIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgdXJsOiBgL3B1ZXN0b3NhY3Rpdm9zLyR7aWR9YCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBJUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLypsb2FkbGlzdHNQb3NpdGlvbigpOyovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5TaG93aWQnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNldGlhcnRpdHVsbycpLnRleHQoJ0VkaXRhciBwdWVzdG8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhkYXRhLCBcIiNjcmVhdGVBbmRFZGl0UG9zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLmZ1bnRpb25OZXdQb3NpdGlvbihcIm9wZW5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIk5vIHNlIGVuY29udHLDsyBlbCBjYXJnb1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9jZXJyYXIgb3BjaW9uZXMgZGUgcHVlc3RvcyBpbmhhYmlsaXRhZG9zXHJcbiAgICAkKCcuQ2VycmFyLVBvc2l0aW9uRGlzZWJsZWQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9wdWVzdG9zYWN0aXZvc1wiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9tYXJjYXIgcHVlc3RvIGNvbW8gdmFjYW50ZVxyXG4gICAgJCgnI0lzVmFjYW50Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIlBvc2l0aW9uSWRJc1ZhY2FudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJQb3NpdGlvbklkSXNWYWNhbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5Qb3NpdGlvbklkdGJscG9zXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuZm9ybS1Jc1ZhY2FudFwiKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0lzVmFjYW50XCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIG1hcmNhciBwdWVzdG8gY29tbyB2YWNhbnRlP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9wdWVzdG9zYWN0aXZvcy9tYXJjYXJwdWVzdG92YWNhbnRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjZm9ybS1Jc1ZhY2FudFwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUG9zaXRpb25JZElzVmFjYW50XCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZ2V0KGxvY2F0aW9uLmhyZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy50YmxQdWVzdG9BY3Rpdm9zJykucmVwbGFjZVdpdGgoJCgnLnRibFB1ZXN0b0FjdGl2b3MnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0lzVmFjYW50XCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0lzVmFjYW50XCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUG9zaXRpb25JZElzVmFjYW50XCIpLnJlbW92ZSgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vdmFsaWRhciBjYW1wbyBub21icmUgZGVsIHB1ZXN0b1xyXG4gICAgJChcIiNQb3NpdGlvbk5hbWVcIikua2V5dXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBkaW1lbnRpb24gPSAkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCkubGVuZ3RoO1xyXG4gICAgICAgIGlmIChkaW1lbnRpb24gPT0gNTApIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFTb2xvIDUwIGNhcmFjdGVyZXMhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vZmlsdHJvXHJcbiAgICBcclxuXHJcbiAgICAkKCcub3B0aW9uRmlsdGVyJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcHRpb25GaWx0ZXJGdW5jdGlvbih0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKCQoJy50ZXh0RmlsdGVyJykudmFsKCkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLVBvc2l0aW9uXCIsIFwiL3B1ZXN0b3NhY3Rpdm9zL0ZpbHRlck9yTW9yZURhdGFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnRleHRGaWx0ZXJNYXNrJykub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIga2V5Y29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG4gICAgICAgIGlmIChrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgIHRleHRGaWx0ZXJNYXNrRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtUG9zaXRpb25cIiwgXCIvcHVlc3Rvc2FjdGl2b3MvRmlsdGVyT3JNb3JlRGF0YVwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50c2Nyb2xsID0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgbGV0IG1heHNjcm9sbCA9ICQoXCIudGJsUHVlc3RvQWN0aXZvc1wiKS5vdXRlckhlaWdodCh0cnVlKSAtICQoXCIjY29udGVudC1zY3JvbGxcIikub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRzY3JvbGwgPT0gTWF0aC5yb3VuZChtYXhzY3JvbGwpKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICBtb3JlZGF0YShtYXhzY3JvbGwsIFwicHVlc3Rvc2FjdGl2b3NcIiwgXCIudGJvZHktVGFibGUtUG9zaXRpb25cIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFiaWxpdGFyIGRvYmxlIGNsaWMgZW4gZmlsYXMgcGFyYSBlZGl0YXJcclxuICAgIGVuYWJsZVJvd0RvdWJsZUNsaWNrKFxyXG4gICAgICAgICcudGJvZHktVGFibGUtUG9zaXRpb24nLFxyXG4gICAgICAgICcuUG9zaXRpb25JZHRibHBvcycsXHJcbiAgICAgICAgJy9wdWVzdG9zYWN0aXZvcy97aWR9JyxcclxuICAgICAgICBmdW5jdGlvbiAoZGF0YTogSVBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbiA9IDI7XHJcbiAgICAgICAgICAgIEF1dG9tYXRpY0JpbmRpbmcoZGF0YSwgXCIjY3JlYXRlQW5kRWRpdFBvc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICAkKCcuU2hvd2lkJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5zZXRpYXJ0aXR1bG8nKS50ZXh0KCdFZGl0YXIgcHVlc3RvJyk7XHJcbiAgICAgICAgICAgIGZuLmZ1bnRpb25OZXdQb3NpdGlvbihcIm9wZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBJbmljaWFsaXphciBtb2RhbCBkZSBhdWRpdG9yw61hXHJcbiAgICBpbml0QXVkaXRMaXN0UGFnZSgnLnNlbGVjdFBvc2l0aW9uJywgJy5Qb3NpdGlvbklkdGJscG9zJywgJy9wdWVzdG9zYWN0aXZvcy9nZXRieWlkJywgJ0lkJyk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=