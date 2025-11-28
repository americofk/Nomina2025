/**
 * @file Vacants.ts
 * @description Módulo de gestión de puestos vacantes. Permite crear, editar,
 *              eliminar y administrar vacantes disponibles en la organización.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module PuestosVacantes
 */
variables: {
    var option;
}
escuchadores: {
    //eliminar position
    $("#DeleteVacants").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador = false;
            $(".selectPosition[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "IdPositionVacants");
                    input.attr("class", "IdPositionVacants");
                    input.val($(this).parent().parent().find(".PositionIdtblpos").html().trim());
                    $(".DeleteVacants").append(input);
                }
            });
        }
        if (!contador) {
            windows_message("Debe seleccionar un Registro!!", "error");
        }
        else {
            windows_message("¿Desea eliminar cargos seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $.ajax({
                        url: "/vacantes/eliminar",
                        type: "POST",
                        data: $("#DeleteVacants").serialize(),
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            $(".IdPositionVacants").remove();
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
                                    $('.tblCargosVcantes').replaceWith($('.tblCargosVcantes', newDom));
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
                    $(".IdPositionVacants").remove();
                }
            });
        }
    });
    //deshabilitar vacante
    $('#Diseblevacants').on('click', function () {
        if (!$(this).is(":checked")) {
            let contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPosition[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "PositionidVacant");
                    input.attr("class", "PositionidVacant");
                    input.val($(this).parent().parent().find(".PositionIdtblpos").html().trim());
                    $(".form-Diseblevacants").append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#Diseblevacants").prop('checked', true);
            }
            else {
                windows_message("¿Desea Inhabilitar vacante?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/vacantes/actualizarestatus",
                            type: "POST",
                            data: $("#form-Diseblevacants").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".PositionidVacant").remove();
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
                                        $('.tblCargosVcantes').replaceWith($('.tblCargosVcantes', newDom));
                                    });
                                    $("#Diseblevacants").prop('checked', true);
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectPosition[type=checkbox]").prop('checked', false);
                        $("#Diseblevacants").prop('checked', true);
                        $(".PositionidVacant").remove();
                    }
                });
            }
        }
    });
    // Variable para controlar si debe cerrar después de guardar
    var shouldCloseAfterSave = false;
    //save vacants
    $("#createAndEditVacants").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            if ($('#NotifyPositionId').val() == $('#PositionId').val()) {
                windows_message("!El puesto al que notifica no puede ser el mismo al que esta editando!", "error");
                $('#NotifyPositionId').focus();
            }
            else {
                $.ajax({
                    url: "/vacantes/guardar",
                    type: "POST",
                    data: $(this).serialize() + `&operacion=${option}`,
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
                                $('.tblCargosVcantes').replaceWith($('.tblCargosVcantes', newDom));
                            });
                            windows_message(data.Message, data.Type);
                            if (shouldCloseAfterSave) {
                                let form = document.getElementById("createAndEditVacants");
                                form.reset();
                                funtionNewVacant("close");
                                shouldCloseAfterSave = false;
                            }
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        }
    });
    // Guardar y cerrar
    $('.btnSaveAndClose').on('click', function () {
        shouldCloseAfterSave = true;
        $("#createAndEditVacants").submit();
    });
    //Crear nueva vacante
    $('.NewVacants').on('click', function () {
        option = 1;
        let form = document.getElementById("createAndEditVacants");
        form.reset();
        $('.Showid').addClass('collapse');
        $('.setiartitulo').text('Nuevo puesto vacante');
        loadlistsSelect();
        funtionNewVacant("open");
    });
    //cerrar nueva vacante
    $('.OpCloseform').on('click', function () {
        funtionNewVacant("close");
    });
    //editar position
    $('.EditVacants').on('click', function () {
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
            windows_message("Debe seleccionar un Registro!!", "error");
        }
        else if (contador > 1) {
            windows_message("Debe seleccionar un solo Registro!!", "error");
        }
        else {
            $.ajax({
                url: `/vacantes/${id}`,
                type: "GET",
                async: true,
                success: function (data) {
                    $('.progreso').modal('hide');
                    if (data != null) {
                        option = 2;
                        loadlistsSelect();
                        $('.Showid').removeClass('collapse');
                        $('.setiartitulo').text('Editar puesto');
                        AutomaticBinding(data, "#createAndEditVacants");
                        funtionNewVacant("open");
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
    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Vacants", "/vacantes/FilterOrMoreData");
        }
    });
    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Vacants", "/vacantes/FilterOrMoreData");
        }
    });
    //paginacion
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();
        let maxscroll = $(".tblCargosVcantes").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "vacantes", ".tbody-Table-Vacants");
            }
        }
    });
    // Habilitar doble clic en filas para editar
    enableRowDoubleClick('.tbody-Table-Vacants', '.PositionIdtblpos', '/vacantes/{id}', function (data) {
        option = 2;
        loadlistsSelect();
        AutomaticBinding(data, "#createAndEditVacants");
        $('.Showid').removeClass('collapse');
        $('.setiartitulo').text('Editar puesto vacante');
        funtionNewVacant("open");
    });
    // Inicializar modal de auditoría
    initAuditListPage('.selectPosition', '.PositionIdtblpos', '/vacantes/getbyid', 'Id');
}
funciones: {
    //funcion abrir nueva vacante
    function funtionNewVacant(_opcion) {
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
    }
    //cargar lista de select en formularios 
    function loadlistsSelect() {
        ListDeparment();
        ListJobs();
        ListPosition();
    }
    //funcion para editar position
    function EditVacants(Obj) {
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
            windows_message("¡Debe seleccionar un Registro!", "info");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo Registro!", "info");
        }
        else {
            loadlistsSelect();
            var obj = Obj.find(selected => selected.PositionId == id);
            option = 2;
            $('.Showid').removeClass('collapse');
            $('.setiartitulo').text('Editar puesto vacante');
            AutomaticBinding(obj, "#createAndEditVacants");
            funtionNewVacant("open");
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFjYW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL1ZhY2FudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILFNBQVMsRUFBRSxDQUFDO0lBQ1IsSUFBSSxNQUFjLENBQUM7QUFFdkIsQ0FBQztBQUVELFlBQVksRUFBRSxDQUFDO0lBQ1gsbUJBQW1CO0lBQ25CLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDbEMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUNsQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsSUFBSSxRQUFRLEdBQVksS0FBSyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFFckMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ3pCLFFBQVEsR0FBRyxJQUFJLENBQUE7b0JBQ2YsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDL0MsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztvQkFDeEMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztvQkFDekMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDN0UsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FB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O2FBQU0sQ0FBQztZQUNKLGVBQWUsRUFBRSxDQUFDO1lBQ2xCLElBQUksR0FBRyxHQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUVqRCxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztZQUMvQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBRUwsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgVmFjYW50cy50c1xyXG4gKiBAZGVzY3JpcHRpb24gTcOzZHVsbyBkZSBnZXN0acOzbiBkZSBwdWVzdG9zIHZhY2FudGVzLiBQZXJtaXRlIGNyZWFyLCBlZGl0YXIsXHJcbiAqICAgICAgICAgICAgICBlbGltaW5hciB5IGFkbWluaXN0cmFyIHZhY2FudGVzIGRpc3BvbmlibGVzIGVuIGxhIG9yZ2FuaXphY2nDs24uXHJcbiAqIEBhdXRob3IgRXF1aXBvIGRlIERlc2Fycm9sbG9cclxuICogQGRhdGUgMjAyNVxyXG4gKiBAbW9kdWxlIFB1ZXN0b3NWYWNhbnRlc1xyXG4gKi9cclxuXHJcbnZhcmlhYmxlczoge1xyXG4gICAgdmFyIG9wdGlvbjogbnVtYmVyO1xyXG5cclxufVxyXG5cclxuZXNjdWNoYWRvcmVzOiB7XHJcbiAgICAvL2VsaW1pbmFyIHBvc2l0aW9uXHJcbiAgICAkKFwiI0RlbGV0ZVZhY2FudHNcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdFBvc2l0aW9uW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiSWRQb3NpdGlvblZhY2FudHNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiSWRQb3NpdGlvblZhY2FudHNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5Qb3NpdGlvbklkdGJscG9zXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuRGVsZXRlVmFjYW50c1wiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkRlYmUgc2VsZWNjaW9uYXIgdW4gUmVnaXN0cm8hIVwiLCBcImVycm9yXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgY2FyZ29zIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3ZhY2FudGVzL2VsaW1pbmFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0RlbGV0ZVZhY2FudHNcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuSWRQb3NpdGlvblZhY2FudHNcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZ2V0KGxvY2F0aW9uLmhyZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy50YmxDYXJnb3NWY2FudGVzJykucmVwbGFjZVdpdGgoJCgnLnRibENhcmdvc1ZjYW50ZXMnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuSWRQb3NpdGlvblZhY2FudHNcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vZGVzaGFiaWxpdGFyIHZhY2FudGVcclxuICAgICQoJyNEaXNlYmxldmFjYW50cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoISQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdFBvc2l0aW9uW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJQb3NpdGlvbmlkVmFjYW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcIlBvc2l0aW9uaWRWYWNhbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5Qb3NpdGlvbklkdGJscG9zXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuZm9ybS1EaXNlYmxldmFjYW50c1wiKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0Rpc2VibGV2YWNhbnRzXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgSW5oYWJpbGl0YXIgdmFjYW50ZT9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvdmFjYW50ZXMvYWN0dWFsaXphcmVzdGF0dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNmb3JtLURpc2VibGV2YWNhbnRzXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5Qb3NpdGlvbmlkVmFjYW50XCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZ2V0KGxvY2F0aW9uLmhyZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy50YmxDYXJnb3NWY2FudGVzJykucmVwbGFjZVdpdGgoJCgnLnRibENhcmdvc1ZjYW50ZXMnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0Rpc2VibGV2YWNhbnRzXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdFBvc2l0aW9uW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRGlzZWJsZXZhY2FudHNcIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLlBvc2l0aW9uaWRWYWNhbnRcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBWYXJpYWJsZSBwYXJhIGNvbnRyb2xhciBzaSBkZWJlIGNlcnJhciBkZXNwdcOpcyBkZSBndWFyZGFyXHJcbiAgICB2YXIgc2hvdWxkQ2xvc2VBZnRlclNhdmUgPSBmYWxzZTtcclxuXHJcbiAgICAvL3NhdmUgdmFjYW50c1xyXG4gICAgJChcIiNjcmVhdGVBbmRFZGl0VmFjYW50c1wiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKCQoJyNOb3RpZnlQb3NpdGlvbklkJykudmFsKCkgPT0gJCgnI1Bvc2l0aW9uSWQnKS52YWwoKSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiIUVsIHB1ZXN0byBhbCBxdWUgbm90aWZpY2Egbm8gcHVlZGUgc2VyIGVsIG1pc21vIGFsIHF1ZSBlc3RhIGVkaXRhbmRvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI05vdGlmeVBvc2l0aW9uSWQnKS5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi92YWNhbnRlcy9ndWFyZGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSArIGAmb3BlcmFjaW9uPSR7b3B0aW9ufWAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsQ2FyZ29zVmNhbnRlcycpLnJlcGxhY2VXaXRoKCQoJy50YmxDYXJnb3NWY2FudGVzJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNob3VsZENsb3NlQWZ0ZXJTYXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWF0ZUFuZEVkaXRWYWNhbnRzXCIpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVudGlvbk5ld1ZhY2FudChcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZENsb3NlQWZ0ZXJTYXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gR3VhcmRhciB5IGNlcnJhclxyXG4gICAgJCgnLmJ0blNhdmVBbmRDbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzaG91bGRDbG9zZUFmdGVyU2F2ZSA9IHRydWU7XHJcbiAgICAgICAgJChcIiNjcmVhdGVBbmRFZGl0VmFjYW50c1wiKS5zdWJtaXQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ3JlYXIgbnVldmEgdmFjYW50ZVxyXG4gICAgJCgnLk5ld1ZhY2FudHMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgb3B0aW9uID0gMTtcclxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlQW5kRWRpdFZhY2FudHNcIikgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAkKCcuU2hvd2lkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgJCgnLnNldGlhcnRpdHVsbycpLnRleHQoJ051ZXZvIHB1ZXN0byB2YWNhbnRlJyk7XHJcbiAgICAgICAgbG9hZGxpc3RzU2VsZWN0KCk7XHJcbiAgICAgICAgZnVudGlvbk5ld1ZhY2FudChcIm9wZW5cIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2NlcnJhciBudWV2YSB2YWNhbnRlXHJcbiAgICAkKCcuT3BDbG9zZWZvcm0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGZ1bnRpb25OZXdWYWNhbnQoXCJjbG9zZVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vZWRpdGFyIHBvc2l0aW9uXHJcbiAgICAkKCcuRWRpdFZhY2FudHMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBpZDogc3RyaW5nO1xyXG4gICAgICAgIHZhciBjb250YWRvciA9IDA7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIGlkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBvc2l0aW9uSWR0Ymxwb3NcIikuaHRtbCgpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIFJlZ2lzdHJvISFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG5cclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiRGViZSBzZWxlY2Npb25hciB1biBzb2xvIFJlZ2lzdHJvISFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgIHVybDogYC92YWNhbnRlcy8ke2lkfWAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogSVBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRsaXN0c1NlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuU2hvd2lkJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zZXRpYXJ0aXR1bG8nKS50ZXh0KCdFZGl0YXIgcHVlc3RvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9tYXRpY0JpbmRpbmcoZGF0YSwgXCIjY3JlYXRlQW5kRWRpdFZhY2FudHNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bnRpb25OZXdWYWNhbnQoXCJvcGVuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJObyBzZSBlbmNvbnRyw7MgZWwgY2FyZ29cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5vcHRpb25GaWx0ZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbkZpbHRlckZ1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgIGlmICgkKCcudGV4dEZpbHRlcicpLnZhbCgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1WYWNhbnRzXCIsIFwiL3ZhY2FudGVzL0ZpbHRlck9yTW9yZURhdGFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnRleHRGaWx0ZXJNYXNrJykub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIga2V5Y29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG4gICAgICAgIGlmIChrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgIHRleHRGaWx0ZXJNYXNrRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtVmFjYW50c1wiLCBcIi92YWNhbnRlcy9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3BhZ2luYWNpb25cclxuICAgICQoXCIjY29udGVudC1zY3JvbGxcIikuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgY3VycmVudHNjcm9sbCA9ICQoXCIjY29udGVudC1zY3JvbGxcIikuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgIGxldCBtYXhzY3JvbGwgPSAkKFwiLnRibENhcmdvc1ZjYW50ZXNcIikub3V0ZXJIZWlnaHQodHJ1ZSkgLSAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIGlmIChjdXJyZW50c2Nyb2xsID09IE1hdGgucm91bmQobWF4c2Nyb2xsKSkge1xyXG4gICAgICAgICAgICBpZiAoIWlzQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgbW9yZWRhdGEobWF4c2Nyb2xsLCBcInZhY2FudGVzXCIsIFwiLnRib2R5LVRhYmxlLVZhY2FudHNcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFiaWxpdGFyIGRvYmxlIGNsaWMgZW4gZmlsYXMgcGFyYSBlZGl0YXJcclxuICAgIGVuYWJsZVJvd0RvdWJsZUNsaWNrKFxyXG4gICAgICAgICcudGJvZHktVGFibGUtVmFjYW50cycsXHJcbiAgICAgICAgJy5Qb3NpdGlvbklkdGJscG9zJyxcclxuICAgICAgICAnL3ZhY2FudGVzL3tpZH0nLFxyXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhOiBJUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgbG9hZGxpc3RzU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIEF1dG9tYXRpY0JpbmRpbmcoZGF0YSwgXCIjY3JlYXRlQW5kRWRpdFZhY2FudHNcIik7XHJcbiAgICAgICAgICAgICQoJy5TaG93aWQnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLnNldGlhcnRpdHVsbycpLnRleHQoJ0VkaXRhciBwdWVzdG8gdmFjYW50ZScpO1xyXG4gICAgICAgICAgICBmdW50aW9uTmV3VmFjYW50KFwib3BlblwiKTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIEluaWNpYWxpemFyIG1vZGFsIGRlIGF1ZGl0b3LDrWFcclxuICAgIGluaXRBdWRpdExpc3RQYWdlKCcuc2VsZWN0UG9zaXRpb24nLCAnLlBvc2l0aW9uSWR0Ymxwb3MnLCAnL3ZhY2FudGVzL2dldGJ5aWQnLCAnSWQnKTtcclxufVxyXG5cclxuZnVuY2lvbmVzOiB7XHJcbiAgICAvL2Z1bmNpb24gYWJyaXIgbnVldmEgdmFjYW50ZVxyXG4gICAgZnVuY3Rpb24gZnVudGlvbk5ld1ZhY2FudChfb3BjaW9uKSB7XHJcbiAgICAgICAgaWYgKF9vcGNpb24gPT0gXCJvcGVuXCIpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuQ29udGVuZWRvckxpc3RFbnRpdHknKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnROZXdFbnR5dGknKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2UnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2VGb3JtJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5TaG93aWQnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9jYXJnYXIgbGlzdGEgZGUgc2VsZWN0IGVuIGZvcm11bGFyaW9zIFxyXG4gICAgZnVuY3Rpb24gbG9hZGxpc3RzU2VsZWN0KCkge1xyXG4gICAgICAgIExpc3REZXBhcm1lbnQoKTtcclxuICAgICAgICBMaXN0Sm9icygpO1xyXG4gICAgICAgIExpc3RQb3NpdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vZnVuY2lvbiBwYXJhIGVkaXRhciBwb3NpdGlvblxyXG4gICAgZnVuY3Rpb24gRWRpdFZhY2FudHMoT2JqKSB7XHJcblxyXG4gICAgICAgIGxldCBpZDogc3RyaW5nO1xyXG4gICAgICAgIHZhciBjb250YWRvciA9IDA7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIGlkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBvc2l0aW9uSWR0Ymxwb3NcIikuaHRtbCgpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gUmVnaXN0cm8hXCIsIFwiaW5mb1wiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG5cclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHNvbG8gUmVnaXN0cm8hXCIsIFwiaW5mb1wiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsb2FkbGlzdHNTZWxlY3QoKTtcclxuICAgICAgICAgICAgdmFyIG9iajogSVBvc2l0aW9uID0gT2JqLmZpbmQoc2VsZWN0ZWQgPT4gc2VsZWN0ZWQuUG9zaXRpb25JZCA9PSBpZCk7XHJcbiAgICAgICAgICAgIG9wdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICQoJy5TaG93aWQnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLnNldGlhcnRpdHVsbycpLnRleHQoJ0VkaXRhciBwdWVzdG8gdmFjYW50ZScpO1xyXG5cclxuICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhvYmosIFwiI2NyZWF0ZUFuZEVkaXRWYWNhbnRzXCIpO1xyXG4gICAgICAgICAgICBmdW50aW9uTmV3VmFjYW50KFwib3BlblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19