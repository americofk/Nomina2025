/**
 * @file DeductionCodeDisabled.ts
 * @description Módulo de gestión de códigos de deducción inactivos. Permite eliminar,
 *              habilitar y listar códigos de deducción que han sido deshabilitados.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module CodigosDeduccionInactivos
 */
variables: {
    var option;
}
escuchadores: {
    //eliminar
    $("#DeleteDeductionCode").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectDeductionCode[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "DeductionCodeId");
                    input.attr("class", "DeductionCodeId");
                    input.val($(this).parent().parent().find(".DeductionCodeId-dc").html().trim());
                    $(".DeleteDeductionCode").append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar códigos de deducción seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/codigosdeduccion/eliminar",
                            type: "POST",
                            data: $("#DeleteDeductionCode").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".DeductionCodeId").remove();
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
                                        $('.tblDeductionCode').replaceWith($('.tblDeductionCode', newDom));
                                    });
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectDeductionCode[type=checkbox]").prop('checked', false);
                        $(".DeductionCodeId").remove();
                    }
                });
            }
        }
    });
    //abrir nuevo
    $('.NewDeductionCode').on('click', function () {
        fn.SettingNewAndEdit("new");
    });
    //save
    $("#NewAndEditDeductionCode").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            $('.progreso').modal({ backdrop: 'static', keyboard: false });
            $.ajax({
                url: "/codigosdeduccion/guardar",
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
                        windows_message(data.Message, data.Type);
                        $.get(location.href)
                            .done(function (r) {
                            var newDom = $(r);
                            $('.tblDeductionCode').replaceWith($('.tblDeductionCode', newDom));
                        });
                        let form = document.getElementById("NewAndEditDeductionCode");
                        form.reset();
                        fn.funtionNewDeductionCode("close");
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    //editar
    $('.EditDeductionCode').on('click', function () {
        let _id;
        var contador = 0;
        $(".selectDeductionCode[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".DeductionCodeId-dc").html().trim();
            }
        });
        if (contador === 0) {
            windows_message("¡Debe seleccionar un Registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo Registro!", "info");
        }
        else {
            $.ajax({
                url: `/codigosdeduccion/${_id}`,
                type: "GET",
                async: true,
                success: function (data) {
                    if (data != null) {
                        AutomaticBinding(data, "#NewAndEditDeductionCode");
                        fn.SettingNewAndEdit("edit");
                        //Plugin de numeros
                        UsePluginNumberFormat("#NewAndEditDeductionCode");
                    }
                    else {
                        windows_message("No se encontró el código de descuento", "error");
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    //cerrar nuevo 
    $('.OpCloseform').on('click', function () {
        $('.Showid').addClass('collapse');
        fn.funtionNewDeductionCode("close");
    });
    //Cambiar diseño
    $("#PayrollAction").on('change', function () {
        fn.ChangeOptionsDesign();
    });
    //dehabilitar codigo de  deduccion
    $('#DisebleDeductionCode').on('click', function () {
        if (!$(this).is(":checked")) {
            var contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectDeductionCode[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "DeductionCodeIddc");
                    input.attr("class", "DeductionCodeIddc");
                    input.val($(this).parent().parent().find(".DeductionCodeId-dc").html().trim());
                    $(".DisabledDeductionCode").append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#DisebleDeductionCode").prop('checked', true);
            }
            else {
                windows_message("¿Desea inhabilitar los códigos de deducciones seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/codigosdeduccion/actualizarestatus",
                            type: "POST",
                            data: $("#DisabledDeductionCode").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".DeductionCodeIddc").remove();
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
                                        $('.tblDeductionCode').replaceWith($('.tblDeductionCode', newDom));
                                    });
                                    $("#DisebleDeductionCode").prop('checked', true);
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectDeductionCode[type=checkbox]").prop('checked', false);
                        $("#DisebleDeductionCode").prop('checked', true);
                        $(".DeductionCodeIddc").remove();
                    }
                });
            }
        }
    });
    //habilitar codigo de deduccion
    $('#EnableDeductionCode').on('click', function () {
        if ($(this).is(":checked")) {
            var contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectDeductionCode[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "DeductionCodeId");
                    input.attr("class", "DeductionCodeId");
                    input.val($(this).parent().parent().find(".DeductionCodeId-dc").html().trim());
                    $(".enable-deductionCode").append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#EnableDeductionCode").prop('checked', false);
            }
            else {
                windows_message("¿Desea habilitar los códigos de deducciones seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/codigosdeduccioninactivos/actualizarestatus",
                            type: "POST",
                            data: $("#enable-deductionCode").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".DeductionCodeId").remove();
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
                                        $('.tblDeductionCode').replaceWith($('.tblDeductionCode', newDom));
                                    });
                                    $("#EnableDeductionCode").prop('checked', false);
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectDeductionCode[type=checkbox]").prop('checked', false);
                        $("#EnableDeductionCode").prop('checked', false);
                        $(".DeductionCodeId").remove();
                    }
                });
            }
        }
    });
    //ir a codigos inactivos
    $('.Disabled-deductionCode').on('click', function () {
        window.location.href = "/codigosdeduccioninactivos";
    });
    //cerrar codigos de ganancias inhabilitados
    $('.close-deductionCode').on('click', function () {
        window.location.href = "/codigosdeduccion";
    });
    //Navegar a versiones
    $(".dc-versions").on("click", function () {
        let _id;
        var contador = 0;
        $(".selectDeductionCode[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".DeductionCodeId-dc").html().trim();
            }
        });
        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
        }
        else {
            window.location.href = `/codigosdeduccion?version=true&id=${_id}`;
        }
    });
    $(".dc-versions-form").on("click", function () {
        if ($("#DeductionCodeId").val() == "")
            windows_message("¡Debe guardar el registro primero!", "error");
        else
            window.location.href = `/codigosdeduccion?version=true&id=${$("#DeductionCodeId").val()}`;
    });
    $(".dc-versions-details").on("click", function () {
        let _id;
        let _internalId;
        var contador = 0;
        $(".selectDeductionCode[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _internalId = $(this).parent().parent().find(".InternalDeductionCode").html().trim();
                _id = $(this).parent().parent().find(".DeductionCodeId-dc").html().trim();
            }
        });
        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
        }
        else {
            $.ajax({
                url: `/codigosdeduccion/${_id}?version=true&internalid=${_internalId}`,
                type: "GET",
                async: true,
                success: function (data) {
                    if (data != null) {
                        AutomaticBinding(data, "#NewAndEditDeductionCode");
                        fn.SettingNewAndEdit("edit");
                        //Plugin de numeros
                        UsePluginNumberFormat("#NewAndEditDeductionCode");
                    }
                    else {
                        windows_message("No se encontró el código de descuento", "error");
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    //para filtrar
    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-deductionCode-Disabled", "/codigosdeduccioninactivos/FilterOrMoreData");
        }
    });
    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-deductionCode-Disabled", "/codigosdeduccioninactivos/FilterOrMoreData");
        }
    });
    //paginacion
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();
        let maxscroll = $(".tblDeductionCode").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "codigosdeduccioninactivos", ".tbody-Table-deductionCode-Disabled");
            }
        }
    });
}
const fn = {
    //funcion abrir formulario para nuevo codigo dee ganancia
    funtionNewDeductionCode: function (_opcion) {
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
        }
    },
    SettingNewAndEdit: function (viewmode) {
        fn.ChangeOptionsDesign();
        if (viewmode == "edit") {
            $('.seteartitulo').text('Editar código de descuento');
            $('.Showid').removeClass('collapse');
            option = 2;
            fn.funtionNewDeductionCode("open");
            if ($(".title-version").length == 1) {
                $(".dc-versions-form").addClass("collapse");
                $(".li-separador").addClass("collapse");
            }
            else {
                $(".dc-versions-form").removeClass("collapse");
                $(".li-separador").removeClass("collapse");
            }
        }
        else {
            let form = document.getElementById('NewAndEditDeductionCode');
            form.reset();
            $('.Showid').addClass('collapse');
            option = 1;
            $('.seteartitulo').text('Nuevo código de descuento');
            fn.funtionNewDeductionCode("open");
        }
    },
    ChangeOptionsDesign: function () {
        //0-Deductions, 1-Contrbutions, 2-Ambos
        let a = $("#PayrollAction").val().toString();
        if (a == "0") {
            $("#Contribution").addClass("collapse");
            $("#Deduction").removeClass("collapse");
            return;
        }
        if (a == "1") {
            $("#Contribution").removeClass("collapse");
            $("#Deduction").addClass("collapse");
            return;
        }
        if (a == "2") {
            $("#Contribution").removeClass("collapse");
            $("#Deduction").removeClass("collapse");
            return;
        }
    }
};
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVkdWN0aW9uQ29kZURpc2FibGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvRGVkdWN0aW9uQ29kZURpc2FibGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFFSCxTQUFTLEVBQUUsQ0FBQztJQUNSLElBQUksTUFBYyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxZQUFZLEVBQUUsQ0FBQztJQUNYLFVBQVU7SUFDVixDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLElBQUksUUFBUSxHQUFZLEtBQUssQ0FBQztZQUM5Qix3RUFBd0U7WUFDeEUsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUUxQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDekIsUUFBUSxHQUFHLElBQUksQ0FBQTtvQkFDZixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO29CQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO29CQUN2QyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUMvRSxDQUFDLENB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QUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hDLE9BQU87UUFDWCxDQUFDO0lBRUwsQ0FBQztDQUVKLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgRGVkdWN0aW9uQ29kZURpc2FibGVkLnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBNw7NkdWxvIGRlIGdlc3Rpw7NuIGRlIGPDs2RpZ29zIGRlIGRlZHVjY2nDs24gaW5hY3Rpdm9zLiBQZXJtaXRlIGVsaW1pbmFyLFxyXG4gKiAgICAgICAgICAgICAgaGFiaWxpdGFyIHkgbGlzdGFyIGPDs2RpZ29zIGRlIGRlZHVjY2nDs24gcXVlIGhhbiBzaWRvIGRlc2hhYmlsaXRhZG9zLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBDb2RpZ29zRGVkdWNjaW9uSW5hY3Rpdm9zXHJcbiAqL1xyXG5cclxudmFyaWFibGVzOiB7XHJcbiAgICB2YXIgb3B0aW9uOiBudW1iZXI7XHJcbn1cclxuXHJcbmVzY3VjaGFkb3Jlczoge1xyXG4gICAgLy9lbGltaW5hclxyXG4gICAgJChcIiNEZWxldGVEZWR1Y3Rpb25Db2RlXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgICAgICQoXCIuc2VsZWN0RGVkdWN0aW9uQ29kZVt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIkRlZHVjdGlvbkNvZGVJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJEZWR1Y3Rpb25Db2RlSWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5EZWR1Y3Rpb25Db2RlSWQtZGNcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5EZWxldGVEZWR1Y3Rpb25Db2RlXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBlbGltaW5hciBjw7NkaWdvcyBkZSBkZWR1Y2Npw7NuIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvY29kaWdvc2RlZHVjY2lvbi9lbGltaW5hclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0RlbGV0ZURlZHVjdGlvbkNvZGVcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkRlZHVjdGlvbkNvZGVJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibERlZHVjdGlvbkNvZGUnKS5yZXBsYWNlV2l0aCgkKCcudGJsRGVkdWN0aW9uQ29kZScsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3REZWR1Y3Rpb25Db2RlW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuRGVkdWN0aW9uQ29kZUlkXCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2FicmlyIG51ZXZvXHJcbiAgICAkKCcuTmV3RGVkdWN0aW9uQ29kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5TZXR0aW5nTmV3QW5kRWRpdChcIm5ld1wiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vc2F2ZVxyXG4gICAgJChcIiNOZXdBbmRFZGl0RGVkdWN0aW9uQ29kZVwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9jb2RpZ29zZGVkdWNjaW9uL2d1YXJkYXJcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSArIGAmb3BlcmFjaW9uPSR7b3B0aW9ufWAsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibERlZHVjdGlvbkNvZGUnKS5yZXBsYWNlV2l0aCgkKCcudGJsRGVkdWN0aW9uQ29kZScsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJOZXdBbmRFZGl0RGVkdWN0aW9uQ29kZVwiKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uZnVudGlvbk5ld0RlZHVjdGlvbkNvZGUoXCJjbG9zZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL2VkaXRhclxyXG4gICAgJCgnLkVkaXREZWR1Y3Rpb25Db2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yID0gMDtcclxuICAgICAgICAkKFwiLnNlbGVjdERlZHVjdGlvbkNvZGVbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcbiAgICAgICAgICAgICAgICBfaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRGVkdWN0aW9uQ29kZUlkLWRjXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBSZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyBSZWdpc3RybyFcIiwgXCJpbmZvXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgdXJsOiBgL2NvZGlnb3NkZWR1Y2Npb24vJHtfaWR9YCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBJRGVkdWN0aW9uQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhkYXRhLCBcIiNOZXdBbmRFZGl0RGVkdWN0aW9uQ29kZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2V0dGluZ05ld0FuZEVkaXQoXCJlZGl0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9QbHVnaW4gZGUgbnVtZXJvc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVc2VQbHVnaW5OdW1iZXJGb3JtYXQoXCIjTmV3QW5kRWRpdERlZHVjdGlvbkNvZGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIk5vIHNlIGVuY29udHLDsyBlbCBjw7NkaWdvIGRlIGRlc2N1ZW50b1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2NlcnJhciBudWV2byBcclxuICAgICQoJy5PcENsb3NlZm9ybScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcuU2hvd2lkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgZm4uZnVudGlvbk5ld0RlZHVjdGlvbkNvZGUoXCJjbG9zZVwiKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL0NhbWJpYXIgZGlzZcOxb1xyXG4gICAgJChcIiNQYXlyb2xsQWN0aW9uXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm4uQ2hhbmdlT3B0aW9uc0Rlc2lnbigpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vZGVoYWJpbGl0YXIgY29kaWdvIGRlICBkZWR1Y2Npb25cclxuICAgICQoJyNEaXNlYmxlRGVkdWN0aW9uQ29kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoISQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdERlZHVjdGlvbkNvZGVbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJEZWR1Y3Rpb25Db2RlSWRkY1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJEZWR1Y3Rpb25Db2RlSWRkY1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkRlZHVjdGlvbkNvZGVJZC1kY1wiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLkRpc2FibGVkRGVkdWN0aW9uQ29kZVwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0Rpc2VibGVEZWR1Y3Rpb25Db2RlXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgaW5oYWJpbGl0YXIgbG9zIGPDs2RpZ29zIGRlIGRlZHVjY2lvbmVzIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL2NvZGlnb3NkZWR1Y2Npb24vYWN0dWFsaXphcmVzdGF0dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNEaXNhYmxlZERlZHVjdGlvbkNvZGVcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkRlZHVjdGlvbkNvZGVJZGRjXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsRGVkdWN0aW9uQ29kZScpLnJlcGxhY2VXaXRoKCQoJy50YmxEZWR1Y3Rpb25Db2RlJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNEaXNlYmxlRGVkdWN0aW9uQ29kZVwiKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdERlZHVjdGlvbkNvZGVbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNEaXNlYmxlRGVkdWN0aW9uQ29kZVwiKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuRGVkdWN0aW9uQ29kZUlkZGNcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vaGFiaWxpdGFyIGNvZGlnbyBkZSBkZWR1Y2Npb25cclxuICAgICQoJyNFbmFibGVEZWR1Y3Rpb25Db2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChcIi5zZWxlY3REZWR1Y3Rpb25Db2RlW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiRGVkdWN0aW9uQ29kZUlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcIkRlZHVjdGlvbkNvZGVJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkRlZHVjdGlvbkNvZGVJZC1kY1wiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmVuYWJsZS1kZWR1Y3Rpb25Db2RlXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjRW5hYmxlRGVkdWN0aW9uQ29kZVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBoYWJpbGl0YXIgbG9zIGPDs2RpZ29zIGRlIGRlZHVjY2lvbmVzIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL2NvZGlnb3NkZWR1Y2Npb25pbmFjdGl2b3MvYWN0dWFsaXphcmVzdGF0dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNlbmFibGUtZGVkdWN0aW9uQ29kZVwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuRGVkdWN0aW9uQ29kZUlkXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsRGVkdWN0aW9uQ29kZScpLnJlcGxhY2VXaXRoKCQoJy50YmxEZWR1Y3Rpb25Db2RlJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNFbmFibGVEZWR1Y3Rpb25Db2RlXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdERlZHVjdGlvbkNvZGVbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNFbmFibGVEZWR1Y3Rpb25Db2RlXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkRlZHVjdGlvbkNvZGVJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9pciBhIGNvZGlnb3MgaW5hY3Rpdm9zXHJcbiAgICAkKCcuRGlzYWJsZWQtZGVkdWN0aW9uQ29kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2NvZGlnb3NkZWR1Y2Npb25pbmFjdGl2b3NcIjtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vY2VycmFyIGNvZGlnb3MgZGUgZ2FuYW5jaWFzIGluaGFiaWxpdGFkb3NcclxuICAgICQoJy5jbG9zZS1kZWR1Y3Rpb25Db2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY29kaWdvc2RlZHVjY2lvblwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9OYXZlZ2FyIGEgdmVyc2lvbmVzXHJcbiAgICAkKFwiLmRjLXZlcnNpb25zXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBfaWQ6IHN0cmluZztcclxuICAgICAgICB2YXIgY29udGFkb3IgPSAwO1xyXG4gICAgICAgICQoXCIuc2VsZWN0RGVkdWN0aW9uQ29kZVt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIF9pZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5EZWR1Y3Rpb25Db2RlSWQtZGNcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY29udGFkb3IgPT09IDApIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb250YWRvciA+IDEpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHNvbG8gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9jb2RpZ29zZGVkdWNjaW9uP3ZlcnNpb249dHJ1ZSZpZD0ke19pZH1gO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIuZGMtdmVyc2lvbnMtZm9ybVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJChcIiNEZWR1Y3Rpb25Db2RlSWRcIikudmFsKCkgPT0gXCJcIilcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIGd1YXJkYXIgZWwgcmVnaXN0cm8gcHJpbWVybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9jb2RpZ29zZGVkdWNjaW9uP3ZlcnNpb249dHJ1ZSZpZD0keyQoXCIjRGVkdWN0aW9uQ29kZUlkXCIpLnZhbCgpfWA7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmRjLXZlcnNpb25zLWRldGFpbHNcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IF9pZDogc3RyaW5nO1xyXG4gICAgICAgIGxldCBfaW50ZXJuYWxJZDogc3RyaW5nO1xyXG4gICAgICAgIHZhciBjb250YWRvciA9IDA7XHJcbiAgICAgICAgJChcIi5zZWxlY3REZWR1Y3Rpb25Db2RlW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICAgICAgX2ludGVybmFsSWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuSW50ZXJuYWxEZWR1Y3Rpb25Db2RlXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBfaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRGVkdWN0aW9uQ29kZUlkLWRjXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBzb2xvIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgdXJsOiBgL2NvZGlnb3NkZWR1Y2Npb24vJHtfaWR9P3ZlcnNpb249dHJ1ZSZpbnRlcm5hbGlkPSR7X2ludGVybmFsSWR9YCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBJRGVkdWN0aW9uQ29kZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9tYXRpY0JpbmRpbmcoZGF0YSwgXCIjTmV3QW5kRWRpdERlZHVjdGlvbkNvZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNldHRpbmdOZXdBbmRFZGl0KFwiZWRpdFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUGx1Z2luIGRlIG51bWVyb3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXNlUGx1Z2luTnVtYmVyRm9ybWF0KFwiI05ld0FuZEVkaXREZWR1Y3Rpb25Db2RlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJObyBzZSBlbmNvbnRyw7MgZWwgY8OzZGlnbyBkZSBkZXNjdWVudG9cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3BhcmEgZmlsdHJhclxyXG5cclxuICAgICQoJy5vcHRpb25GaWx0ZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbkZpbHRlckZ1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgIGlmICgkKCcudGV4dEZpbHRlcicpLnZhbCgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1kZWR1Y3Rpb25Db2RlLURpc2FibGVkXCIsIFwiL2NvZGlnb3NkZWR1Y2Npb25pbmFjdGl2b3MvRmlsdGVyT3JNb3JlRGF0YVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcudGV4dEZpbHRlck1hc2snKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBrZXljb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XHJcbiAgICAgICAgaWYgKGtleWNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgdGV4dEZpbHRlck1hc2tGdW5jdGlvbih0aGlzKTtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1kZWR1Y3Rpb25Db2RlLURpc2FibGVkXCIsIFwiL2NvZGlnb3NkZWR1Y2Npb25pbmFjdGl2b3MvRmlsdGVyT3JNb3JlRGF0YVwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9wYWdpbmFjaW9uXHJcbiAgICAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRzY3JvbGwgPSAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICBsZXQgbWF4c2Nyb2xsID0gJChcIi50YmxEZWR1Y3Rpb25Db2RlXCIpLm91dGVySGVpZ2h0KHRydWUpIC0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBpZiAoY3VycmVudHNjcm9sbCA9PSBNYXRoLnJvdW5kKG1heHNjcm9sbCkpIHtcclxuICAgICAgICAgICAgaWYgKCFpc0J1c3kpIHtcclxuICAgICAgICAgICAgICAgIG1vcmVkYXRhKG1heHNjcm9sbCwgXCJjb2RpZ29zZGVkdWNjaW9uaW5hY3Rpdm9zXCIsIFwiLnRib2R5LVRhYmxlLWRlZHVjdGlvbkNvZGUtRGlzYWJsZWRcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxufVxyXG5cclxuY29uc3QgZm4gPSB7XHJcbiAgICAvL2Z1bmNpb24gYWJyaXIgZm9ybXVsYXJpbyBwYXJhIG51ZXZvIGNvZGlnbyBkZWUgZ2FuYW5jaWFcclxuICAgIGZ1bnRpb25OZXdEZWR1Y3Rpb25Db2RlOiBmdW5jdGlvbiAoX29wY2lvbikge1xyXG4gICAgICAgIGlmIChfb3BjaW9uID09IFwib3BlblwiKSB7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuQ29udGVuZWRvckxpc3RFbnRpdHknKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnROZXdFbnR5dGknKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2UnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2VGb3JtJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTZXR0aW5nTmV3QW5kRWRpdDogZnVuY3Rpb24gKHZpZXdtb2RlOiBzdHJpbmcpIHtcclxuICAgICAgICBmbi5DaGFuZ2VPcHRpb25zRGVzaWduKCk7XHJcbiAgICAgICAgaWYgKHZpZXdtb2RlID09IFwiZWRpdFwiKSB7XHJcbiAgICAgICAgICAgICQoJy5zZXRlYXJ0aXR1bG8nKS50ZXh0KCdFZGl0YXIgY8OzZGlnbyBkZSBkZXNjdWVudG8nKTtcclxuICAgICAgICAgICAgJCgnLlNob3dpZCcpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICBvcHRpb24gPSAyO1xyXG4gICAgICAgICAgICBmbi5mdW50aW9uTmV3RGVkdWN0aW9uQ29kZShcIm9wZW5cIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoJChcIi50aXRsZS12ZXJzaW9uXCIpLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmRjLXZlcnNpb25zLWZvcm1cIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIubGktc2VwYXJhZG9yXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmRjLXZlcnNpb25zLWZvcm1cIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIubGktc2VwYXJhZG9yXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ05ld0FuZEVkaXREZWR1Y3Rpb25Db2RlJykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICQoJy5TaG93aWQnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgb3B0aW9uID0gMTtcclxuICAgICAgICAgICAgJCgnLnNldGVhcnRpdHVsbycpLnRleHQoJ051ZXZvIGPDs2RpZ28gZGUgZGVzY3VlbnRvJyk7XHJcbiAgICAgICAgICAgIGZuLmZ1bnRpb25OZXdEZWR1Y3Rpb25Db2RlKFwib3BlblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENoYW5nZU9wdGlvbnNEZXNpZ246IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy8wLURlZHVjdGlvbnMsIDEtQ29udHJidXRpb25zLCAyLUFtYm9zXHJcbiAgICAgICAgbGV0IGEgPSAkKFwiI1BheXJvbGxBY3Rpb25cIikudmFsKCkudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAoYSA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICAkKFwiI0NvbnRyaWJ1dGlvblwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAkKFwiI0RlZHVjdGlvblwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYSA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAkKFwiI0NvbnRyaWJ1dGlvblwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAkKFwiI0RlZHVjdGlvblwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYSA9PSBcIjJcIikge1xyXG4gICAgICAgICAgICAkKFwiI0NvbnRyaWJ1dGlvblwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAkKFwiI0RlZHVjdGlvblwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IH0iXX0=