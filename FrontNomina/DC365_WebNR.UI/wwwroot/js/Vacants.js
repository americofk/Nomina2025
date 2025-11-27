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
                            let form = document.getElementById("createAndEditVacants");
                            form.reset();
                            funtionNewVacant("close");
                            windows_message(data.Message, data.Type);
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFjYW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL1ZhY2FudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILFNBQVMsRUFBRSxDQUFDO0lBQ1IsSUFBSSxNQUFjLENBQUM7QUFFdkIsQ0FBQztBQUVELFlBQVksRUFBRSxDQUFDO0lBQ1gsbUJBQW1CO0lBQ25CLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDbEMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUNsQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsSUFBSSxRQUFRLEdBQVksS0FBSyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFFckMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ3pCLFFBQVEsR0FBRyxJQUFJLENBQUE7b0JBQ2YsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDL0MsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztvQkFDeEMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztvQkFDekMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDN0UsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FB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LENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIFZhY2FudHMudHNcclxuICogQGRlc2NyaXB0aW9uIE3Ds2R1bG8gZGUgZ2VzdGnDs24gZGUgcHVlc3RvcyB2YWNhbnRlcy4gUGVybWl0ZSBjcmVhciwgZWRpdGFyLFxyXG4gKiAgICAgICAgICAgICAgZWxpbWluYXIgeSBhZG1pbmlzdHJhciB2YWNhbnRlcyBkaXNwb25pYmxlcyBlbiBsYSBvcmdhbml6YWNpw7NuLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBQdWVzdG9zVmFjYW50ZXNcclxuICovXHJcblxyXG52YXJpYWJsZXM6IHtcclxuICAgIHZhciBvcHRpb246IG51bWJlcjtcclxuXHJcbn1cclxuXHJcbmVzY3VjaGFkb3Jlczoge1xyXG4gICAgLy9lbGltaW5hciBwb3NpdGlvblxyXG4gICAgJChcIiNEZWxldGVWYWNhbnRzXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIklkUG9zaXRpb25WYWNhbnRzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcIklkUG9zaXRpb25WYWNhbnRzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuUG9zaXRpb25JZHRibHBvc1wiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLkRlbGV0ZVZhY2FudHNcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIFJlZ2lzdHJvISFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGNhcmdvcyBzZWxlY2Npb25hZG9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi92YWNhbnRlcy9lbGltaW5hclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNEZWxldGVWYWNhbnRzXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLklkUG9zaXRpb25WYWNhbnRzXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsQ2FyZ29zVmNhbnRlcycpLnJlcGxhY2VXaXRoKCQoJy50YmxDYXJnb3NWY2FudGVzJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0UG9zaXRpb25bdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLklkUG9zaXRpb25WYWNhbnRzXCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2Rlc2hhYmlsaXRhciB2YWNhbnRlXHJcbiAgICAkKCcjRGlzZWJsZXZhY2FudHMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiUG9zaXRpb25pZFZhY2FudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJQb3NpdGlvbmlkVmFjYW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuUG9zaXRpb25JZHRibHBvc1wiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmZvcm0tRGlzZWJsZXZhY2FudHNcIikuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNEaXNlYmxldmFjYW50c1wiKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIEluaGFiaWxpdGFyIHZhY2FudGU/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3ZhY2FudGVzL2FjdHVhbGl6YXJlc3RhdHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjZm9ybS1EaXNlYmxldmFjYW50c1wiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUG9zaXRpb25pZFZhY2FudFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsQ2FyZ29zVmNhbnRlcycpLnJlcGxhY2VXaXRoKCQoJy50YmxDYXJnb3NWY2FudGVzJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNEaXNlYmxldmFjYW50c1wiKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0Rpc2VibGV2YWNhbnRzXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5Qb3NpdGlvbmlkVmFjYW50XCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9zYXZlIHZhY2FudHNcclxuICAgICQoXCIjY3JlYXRlQW5kRWRpdFZhY2FudHNcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmICgkKCcjTm90aWZ5UG9zaXRpb25JZCcpLnZhbCgpID09ICQoJyNQb3NpdGlvbklkJykudmFsKCkpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIiFFbCBwdWVzdG8gYWwgcXVlIG5vdGlmaWNhIG5vIHB1ZWRlIHNlciBlbCBtaXNtbyBhbCBxdWUgZXN0YSBlZGl0YW5kbyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICQoJyNOb3RpZnlQb3NpdGlvbklkJykuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIvdmFjYW50ZXMvZ3VhcmRhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCkgKyBgJm9wZXJhY2lvbj0ke29wdGlvbn1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibENhcmdvc1ZjYW50ZXMnKS5yZXBsYWNlV2l0aCgkKCcudGJsQ2FyZ29zVmNhbnRlcycsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWF0ZUFuZEVkaXRWYWNhbnRzXCIpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bnRpb25OZXdWYWNhbnQoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ3JlYXIgbnVldmEgdmFjYW50ZVxyXG4gICAgJCgnLk5ld1ZhY2FudHMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgb3B0aW9uID0gMTtcclxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlQW5kRWRpdFZhY2FudHNcIikgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAkKCcuU2hvd2lkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgJCgnLnNldGlhcnRpdHVsbycpLnRleHQoJ051ZXZvIHB1ZXN0byB2YWNhbnRlJyk7XHJcbiAgICAgICAgbG9hZGxpc3RzU2VsZWN0KCk7XHJcbiAgICAgICAgZnVudGlvbk5ld1ZhY2FudChcIm9wZW5cIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2NlcnJhciBudWV2YSB2YWNhbnRlXHJcbiAgICAkKCcuT3BDbG9zZWZvcm0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGZ1bnRpb25OZXdWYWNhbnQoXCJjbG9zZVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vZWRpdGFyIHBvc2l0aW9uXHJcbiAgICAkKCcuRWRpdFZhY2FudHMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBpZDogc3RyaW5nO1xyXG4gICAgICAgIHZhciBjb250YWRvciA9IDA7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChcIi5zZWxlY3RQb3NpdGlvblt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIGlkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBvc2l0aW9uSWR0Ymxwb3NcIikuaHRtbCgpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIFJlZ2lzdHJvISFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG5cclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiRGViZSBzZWxlY2Npb25hciB1biBzb2xvIFJlZ2lzdHJvISFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgIHVybDogYC92YWNhbnRlcy8ke2lkfWAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogSVBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRsaXN0c1NlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuU2hvd2lkJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zZXRpYXJ0aXR1bG8nKS50ZXh0KCdFZGl0YXIgcHVlc3RvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9tYXRpY0JpbmRpbmcoZGF0YSwgXCIjY3JlYXRlQW5kRWRpdFZhY2FudHNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bnRpb25OZXdWYWNhbnQoXCJvcGVuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJObyBzZSBlbmNvbnRyw7MgZWwgY2FyZ29cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5vcHRpb25GaWx0ZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbkZpbHRlckZ1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgIGlmICgkKCcudGV4dEZpbHRlcicpLnZhbCgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1WYWNhbnRzXCIsIFwiL3ZhY2FudGVzL0ZpbHRlck9yTW9yZURhdGFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnRleHRGaWx0ZXJNYXNrJykub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIga2V5Y29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG4gICAgICAgIGlmIChrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgIHRleHRGaWx0ZXJNYXNrRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtVmFjYW50c1wiLCBcIi92YWNhbnRlcy9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3BhZ2luYWNpb25cclxuICAgICQoXCIjY29udGVudC1zY3JvbGxcIikuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgY3VycmVudHNjcm9sbCA9ICQoXCIjY29udGVudC1zY3JvbGxcIikuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgIGxldCBtYXhzY3JvbGwgPSAkKFwiLnRibENhcmdvc1ZjYW50ZXNcIikub3V0ZXJIZWlnaHQodHJ1ZSkgLSAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIGlmIChjdXJyZW50c2Nyb2xsID09IE1hdGgucm91bmQobWF4c2Nyb2xsKSkge1xyXG4gICAgICAgICAgICBpZiAoIWlzQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgbW9yZWRhdGEobWF4c2Nyb2xsLCBcInZhY2FudGVzXCIsIFwiLnRib2R5LVRhYmxlLVZhY2FudHNcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFiaWxpdGFyIGRvYmxlIGNsaWMgZW4gZmlsYXMgcGFyYSBlZGl0YXJcclxuICAgIGVuYWJsZVJvd0RvdWJsZUNsaWNrKFxyXG4gICAgICAgICcudGJvZHktVGFibGUtVmFjYW50cycsXHJcbiAgICAgICAgJy5Qb3NpdGlvbklkdGJscG9zJyxcclxuICAgICAgICAnL3ZhY2FudGVzL3tpZH0nLFxyXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhOiBJUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgbG9hZGxpc3RzU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIEF1dG9tYXRpY0JpbmRpbmcoZGF0YSwgXCIjY3JlYXRlQW5kRWRpdFZhY2FudHNcIik7XHJcbiAgICAgICAgICAgICQoJy5TaG93aWQnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLnNldGlhcnRpdHVsbycpLnRleHQoJ0VkaXRhciBwdWVzdG8gdmFjYW50ZScpO1xyXG4gICAgICAgICAgICBmdW50aW9uTmV3VmFjYW50KFwib3BlblwiKTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59XHJcblxyXG5mdW5jaW9uZXM6IHtcclxuICAgIC8vZnVuY2lvbiBhYnJpciBudWV2YSB2YWNhbnRlXHJcbiAgICBmdW5jdGlvbiBmdW50aW9uTmV3VmFjYW50KF9vcGNpb24pIHtcclxuICAgICAgICBpZiAoX29wY2lvbiA9PSBcIm9wZW5cIikge1xyXG5cclxuICAgICAgICAgICAgJCgnLkNvbnRlbmVkb3JMaXN0RW50aXR5JykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5jb250TmV3RW50eXRpJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlRm9ybScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLlNob3dpZCcpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2NhcmdhciBsaXN0YSBkZSBzZWxlY3QgZW4gZm9ybXVsYXJpb3MgXHJcbiAgICBmdW5jdGlvbiBsb2FkbGlzdHNTZWxlY3QoKSB7XHJcbiAgICAgICAgTGlzdERlcGFybWVudCgpO1xyXG4gICAgICAgIExpc3RKb2JzKCk7XHJcbiAgICAgICAgTGlzdFBvc2l0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9mdW5jaW9uIHBhcmEgZWRpdGFyIHBvc2l0aW9uXHJcbiAgICBmdW5jdGlvbiBFZGl0VmFjYW50cyhPYmopIHtcclxuXHJcbiAgICAgICAgbGV0IGlkOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yID0gMDtcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKFwiLnNlbGVjdFBvc2l0aW9uW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICAgICAgaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuUG9zaXRpb25JZHRibHBvc1wiKS5odG1sKCkudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBSZWdpc3RybyFcIiwgXCJpbmZvXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyBSZWdpc3RybyFcIiwgXCJpbmZvXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvYWRsaXN0c1NlbGVjdCgpO1xyXG4gICAgICAgICAgICB2YXIgb2JqOiBJUG9zaXRpb24gPSBPYmouZmluZChzZWxlY3RlZCA9PiBzZWxlY3RlZC5Qb3NpdGlvbklkID09IGlkKTtcclxuICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgJCgnLlNob3dpZCcpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuc2V0aWFydGl0dWxvJykudGV4dCgnRWRpdGFyIHB1ZXN0byB2YWNhbnRlJyk7XHJcblxyXG4gICAgICAgICAgICBBdXRvbWF0aWNCaW5kaW5nKG9iaiwgXCIjY3JlYXRlQW5kRWRpdFZhY2FudHNcIik7XHJcbiAgICAgICAgICAgIGZ1bnRpb25OZXdWYWNhbnQoXCJvcGVuXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=