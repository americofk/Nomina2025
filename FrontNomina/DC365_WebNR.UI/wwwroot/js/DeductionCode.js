/**
 * @file DeductionCode.ts
 * @description Módulo de gestión de códigos de deducción. Permite crear, editar,
 *              eliminar y administrar los conceptos de deducciones en nómina.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module CodigosDeduccion
 */
variables: {
    var option;
}
// Variable para controlar si debe cerrar después de guardar
var shouldCloseAfterSave = false;
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
                windows_message("¿Desea eliminar códigos de descuento seleccionados?", "confirm", {
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
            let closeAfter = shouldCloseAfterSave;
            shouldCloseAfterSave = false;
            if (option == 2) {
                windows_message("¿Desea crear una nueva versión de código de descuento?", "confirm", {
                    onOk: function () {
                        fn.SaveDeductionCode(true, closeAfter);
                    },
                    onCancel: function () {
                        fn.SaveDeductionCode(false, closeAfter);
                    }
                }, { Ok: "Si", Cancel: "No" });
            }
            else {
                fn.SaveDeductionCode(false, closeAfter);
            }
        }
    });
    // Guardar y cerrar
    $('.btnSaveAndClose').on('click', function () {
        shouldCloseAfterSave = true;
        $("#NewAndEditDeductionCode").submit();
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
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-deductionCode", "/codigosdeduccion/FilterOrMoreData");
        }
    });
    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-deductionCode", "/codigosdeduccion/FilterOrMoreData");
        }
    });
    //eliminar codigo de version
    $("#Delete-Deduction-CodeVersion").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador = 0;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectDeductionCode[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador++;
                    let input = $(document.createElement('input'));
                    input.attr("name", "DeductionCodeId");
                    input.attr("class", "DeductionCodeId");
                    input.val($(this).parent().parent().find(".DeductionCodeId-dc").html().trim());
                    $(".Delete-Deduction-CodeVersion").append(input);
                    input = $(document.createElement('input'));
                    input.attr("name", "DeductionCodeInternalId");
                    input.attr("class", "DeductionCodeId");
                    input.val($(this).parent().parent().find(".InternalDeductionCode").html().trim());
                    $(".Delete-Deduction-CodeVersion").append(input);
                }
            });
            if (contador == 0) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else if (contador > 1) {
                windows_message("¡Debe seleccionar un solo registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar la version de código de descuento seleccionado?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/codigosdeduccion/eliminarVersion",
                            type: "POST",
                            data: $("#Delete-Deduction-CodeVersion").serialize(),
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
    //paginacion
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();
        let maxscroll = $(".tblDeductionCode").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                if ($('.title-for-pagination').text() == "Códigos de descuento") {
                    moredata(maxscroll, "codigosdeduccion", ".tbody-Table-deductionCode");
                }
                else {
                    moredata(maxscroll, "codigosdeduccion", ".tbody-Table-deductionCode", "", true, $('.id-version').val().toString());
                }
            }
        }
    });
    // Habilitar doble clic en filas para editar
    enableRowDoubleClick('.tbody-Table-deductionCode', '.DeductionCodeId-dc', '/codigosdeduccion/{id}', function (data) {
        AutomaticBinding(data, "#NewAndEditDeductionCode");
        fn.SettingNewAndEdit("edit");
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
    SaveDeductionCode: function (_isversion, shouldClose) {
        $('.progreso').modal({ backdrop: 'static', keyboard: false });
        $.ajax({
            url: "/codigosdeduccion/guardar",
            type: "POST",
            data: $('#NewAndEditDeductionCode').serialize() + `&operacion=${option}` + `&isversion=${_isversion}`,
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
                    if (shouldClose) {
                        let form = document.getElementById("NewAndEditDeductionCode");
                        form.reset();
                        fn.funtionNewDeductionCode("close");
                    }
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
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
        //Plugin de numeros
        UsePluginNumberFormat("#NewAndEditDeductionCode");
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
// Inicializar modal de auditoría
initAuditListPage('.selectDeductionCode', '.DeductionCodeId-dc', '/codigosdeduccion/getbyid', 'DeductionCodeId');
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVkdWN0aW9uQ29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL0RlZHVjdGlvbkNvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILFNBQVMsRUFBRSxDQUFDO0lBQ1IsSUFBSSxNQUFjLENBQUM7QUFDdkIsQ0FBQztBQUVELDREQUE0RDtBQUM1RCxJQUFJLG9CQUFvQixHQUFHLEtBQUssQ0FBQztBQUVqQyxZQUFZLEVBQUUsQ0FBQztJQUNYLFVBQVU7SUFDVixDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLElBQUksUUFBUSxHQUFZLEtBQUssQ0FBQztZQUM5Qix3RUFBd0U7WUFDeEUsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUUxQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDekIsUUFBUSxHQUFHLElBQUksQ0FBQTtvQkFDZixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO29CQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO29CQUN2QyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJ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LENBQUM7WUFDM0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQyxPQUFPO1FBQ1gsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hDLE9BQU87UUFDWCxDQUFDO0lBRUwsQ0FBQztDQUNKLENBQUE7QUFFRCxpQ0FBaUM7QUFDakMsaUJBQWlCLENBQUMsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsMkJBQTJCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZSBEZWR1Y3Rpb25Db2RlLnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBNw7NkdWxvIGRlIGdlc3Rpw7NuIGRlIGPDs2RpZ29zIGRlIGRlZHVjY2nDs24uIFBlcm1pdGUgY3JlYXIsIGVkaXRhcixcclxuICogICAgICAgICAgICAgIGVsaW1pbmFyIHkgYWRtaW5pc3RyYXIgbG9zIGNvbmNlcHRvcyBkZSBkZWR1Y2Npb25lcyBlbiBuw7NtaW5hLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBDb2RpZ29zRGVkdWNjaW9uXHJcbiAqL1xyXG5cclxudmFyaWFibGVzOiB7XHJcbiAgICB2YXIgb3B0aW9uOiBudW1iZXI7XHJcbn1cclxuXHJcbi8vIFZhcmlhYmxlIHBhcmEgY29udHJvbGFyIHNpIGRlYmUgY2VycmFyIGRlc3B1w6lzIGRlIGd1YXJkYXJcclxudmFyIHNob3VsZENsb3NlQWZ0ZXJTYXZlID0gZmFsc2U7XHJcblxyXG5lc2N1Y2hhZG9yZXM6IHtcclxuICAgIC8vZWxpbWluYXJcclxuICAgICQoXCIjRGVsZXRlRGVkdWN0aW9uQ29kZVwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdERlZHVjdGlvbkNvZGVbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJEZWR1Y3Rpb25Db2RlSWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiRGVkdWN0aW9uQ29kZUlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRGVkdWN0aW9uQ29kZUlkLWRjXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuRGVsZXRlRGVkdWN0aW9uQ29kZVwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgY8OzZGlnb3MgZGUgZGVzY3VlbnRvIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvY29kaWdvc2RlZHVjY2lvbi9lbGltaW5hclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0RlbGV0ZURlZHVjdGlvbkNvZGVcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkRlZHVjdGlvbkNvZGVJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibERlZHVjdGlvbkNvZGUnKS5yZXBsYWNlV2l0aCgkKCcudGJsRGVkdWN0aW9uQ29kZScsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3REZWR1Y3Rpb25Db2RlW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuRGVkdWN0aW9uQ29kZUlkXCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2FicmlyIG51ZXZvXHJcbiAgICAkKCcuTmV3RGVkdWN0aW9uQ29kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5TZXR0aW5nTmV3QW5kRWRpdChcIm5ld1wiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vc2F2ZVxyXG4gICAgJChcIiNOZXdBbmRFZGl0RGVkdWN0aW9uQ29kZVwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbGV0IGNsb3NlQWZ0ZXIgPSBzaG91bGRDbG9zZUFmdGVyU2F2ZTtcclxuICAgICAgICAgICAgc2hvdWxkQ2xvc2VBZnRlclNhdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbiA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGNyZWFyIHVuYSBudWV2YSB2ZXJzacOzbiBkZSBjw7NkaWdvIGRlIGRlc2N1ZW50bz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNhdmVEZWR1Y3Rpb25Db2RlKHRydWUsIGNsb3NlQWZ0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2F2ZURlZHVjdGlvbkNvZGUoZmFsc2UsIGNsb3NlQWZ0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LCB7IE9rOiBcIlNpXCIsIENhbmNlbDogXCJOb1wiIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm4uU2F2ZURlZHVjdGlvbkNvZGUoZmFsc2UsIGNsb3NlQWZ0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gR3VhcmRhciB5IGNlcnJhclxyXG4gICAgJCgnLmJ0blNhdmVBbmRDbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzaG91bGRDbG9zZUFmdGVyU2F2ZSA9IHRydWU7XHJcbiAgICAgICAgJChcIiNOZXdBbmRFZGl0RGVkdWN0aW9uQ29kZVwiKS5zdWJtaXQoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL2VkaXRhclxyXG4gICAgJCgnLkVkaXREZWR1Y3Rpb25Db2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yID0gMDtcclxuICAgICAgICAkKFwiLnNlbGVjdERlZHVjdGlvbkNvZGVbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcbiAgICAgICAgICAgICAgICBfaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRGVkdWN0aW9uQ29kZUlkLWRjXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBSZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyBSZWdpc3RybyFcIiwgXCJpbmZvXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgdXJsOiBgL2NvZGlnb3NkZWR1Y2Npb24vJHtfaWR9YCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBJRGVkdWN0aW9uQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhkYXRhLCBcIiNOZXdBbmRFZGl0RGVkdWN0aW9uQ29kZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2V0dGluZ05ld0FuZEVkaXQoXCJlZGl0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJObyBzZSBlbmNvbnRyw7MgZWwgY8OzZGlnbyBkZSBkZXNjdWVudG9cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9jZXJyYXIgbnVldm8gXHJcbiAgICAkKCcuT3BDbG9zZWZvcm0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLlNob3dpZCcpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIGZuLmZ1bnRpb25OZXdEZWR1Y3Rpb25Db2RlKFwiY2xvc2VcIik7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9DYW1iaWFyIGRpc2XDsW9cclxuICAgICQoXCIjUGF5cm9sbEFjdGlvblwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZuLkNoYW5nZU9wdGlvbnNEZXNpZ24oKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL2RlaGFiaWxpdGFyIGNvZGlnbyBkZSAgZGVkdWNjaW9uXHJcbiAgICAkKCcjRGlzZWJsZURlZHVjdGlvbkNvZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChcIi5zZWxlY3REZWR1Y3Rpb25Db2RlW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiRGVkdWN0aW9uQ29kZUlkZGNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiRGVkdWN0aW9uQ29kZUlkZGNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5EZWR1Y3Rpb25Db2RlSWQtZGNcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5EaXNhYmxlZERlZHVjdGlvbkNvZGVcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNEaXNlYmxlRGVkdWN0aW9uQ29kZVwiKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGluaGFiaWxpdGFyIGxvcyBjw7NkaWdvcyBkZSBkZWR1Y2Npb25lcyBzZWxlY2Npb25hZG9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9jb2RpZ29zZGVkdWNjaW9uL2FjdHVhbGl6YXJlc3RhdHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjRGlzYWJsZWREZWR1Y3Rpb25Db2RlXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5EZWR1Y3Rpb25Db2RlSWRkY1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibERlZHVjdGlvbkNvZGUnKS5yZXBsYWNlV2l0aCgkKCcudGJsRGVkdWN0aW9uQ29kZScsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRGlzZWJsZURlZHVjdGlvbkNvZGVcIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3REZWR1Y3Rpb25Db2RlW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRGlzZWJsZURlZHVjdGlvbkNvZGVcIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkRlZHVjdGlvbkNvZGVJZGRjXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2hhYmlsaXRhciBjb2RpZ28gZGUgZGVkdWNjaW9uXHJcbiAgICAkKCcjRW5hYmxlRGVkdWN0aW9uQ29kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgICAgICQoXCIuc2VsZWN0RGVkdWN0aW9uQ29kZVt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIkRlZHVjdGlvbkNvZGVJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJEZWR1Y3Rpb25Db2RlSWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5EZWR1Y3Rpb25Db2RlSWQtZGNcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5lbmFibGUtZGVkdWN0aW9uQ29kZVwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0VuYWJsZURlZHVjdGlvbkNvZGVcIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgaGFiaWxpdGFyIGxvcyBjw7NkaWdvcyBkZSBkZWR1Y2Npb25lcyBzZWxlY2Npb25hZG9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9jb2RpZ29zZGVkdWNjaW9uaW5hY3Rpdm9zL2FjdHVhbGl6YXJlc3RhdHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjZW5hYmxlLWRlZHVjdGlvbkNvZGVcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkRlZHVjdGlvbkNvZGVJZFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibERlZHVjdGlvbkNvZGUnKS5yZXBsYWNlV2l0aCgkKCcudGJsRGVkdWN0aW9uQ29kZScsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRW5hYmxlRGVkdWN0aW9uQ29kZVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3REZWR1Y3Rpb25Db2RlW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRW5hYmxlRGVkdWN0aW9uQ29kZVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5EZWR1Y3Rpb25Db2RlSWRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vaXIgYSBjb2RpZ29zIGluYWN0aXZvc1xyXG4gICAgJCgnLkRpc2FibGVkLWRlZHVjdGlvbkNvZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9jb2RpZ29zZGVkdWNjaW9uaW5hY3Rpdm9zXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2NlcnJhciBjb2RpZ29zIGRlIGdhbmFuY2lhcyBpbmhhYmlsaXRhZG9zXHJcbiAgICAkKCcuY2xvc2UtZGVkdWN0aW9uQ29kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2NvZGlnb3NkZWR1Y2Npb25cIjtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vTmF2ZWdhciBhIHZlcnNpb25lc1xyXG4gICAgJChcIi5kYy12ZXJzaW9uc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yID0gMDtcclxuICAgICAgICAkKFwiLnNlbGVjdERlZHVjdGlvbkNvZGVbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcbiAgICAgICAgICAgICAgICBfaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRGVkdWN0aW9uQ29kZUlkLWRjXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBzb2xvIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvY29kaWdvc2RlZHVjY2lvbj92ZXJzaW9uPXRydWUmaWQ9JHtfaWR9YDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmRjLXZlcnNpb25zLWZvcm1cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQoXCIjRGVkdWN0aW9uQ29kZUlkXCIpLnZhbCgpID09IFwiXCIpXHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBndWFyZGFyIGVsIHJlZ2lzdHJvIHByaW1lcm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvY29kaWdvc2RlZHVjY2lvbj92ZXJzaW9uPXRydWUmaWQ9JHskKFwiI0RlZHVjdGlvbkNvZGVJZFwiKS52YWwoKX1gO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5kYy12ZXJzaW9ucy1kZXRhaWxzXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBfaWQ6IHN0cmluZztcclxuICAgICAgICBsZXQgX2ludGVybmFsSWQ6IHN0cmluZztcclxuICAgICAgICB2YXIgY29udGFkb3IgPSAwO1xyXG4gICAgICAgICQoXCIuc2VsZWN0RGVkdWN0aW9uQ29kZVt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIF9pbnRlcm5hbElkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkludGVybmFsRGVkdWN0aW9uQ29kZVwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgX2lkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkRlZHVjdGlvbkNvZGVJZC1kY1wiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgIHVybDogYC9jb2RpZ29zZGVkdWNjaW9uLyR7X2lkfT92ZXJzaW9uPXRydWUmaW50ZXJuYWxpZD0ke19pbnRlcm5hbElkfWAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogSURlZHVjdGlvbkNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9tYXRpY0JpbmRpbmcoZGF0YSwgXCIjTmV3QW5kRWRpdERlZHVjdGlvbkNvZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNldHRpbmdOZXdBbmRFZGl0KFwiZWRpdFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUGx1Z2luIGRlIG51bWVyb3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXNlUGx1Z2luTnVtYmVyRm9ybWF0KFwiI05ld0FuZEVkaXREZWR1Y3Rpb25Db2RlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJObyBzZSBlbmNvbnRyw7MgZWwgY8OzZGlnbyBkZSBkZXNjdWVudG9cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3BhcmEgZmlsdHJhclxyXG4gICAgJCgnLm9wdGlvbkZpbHRlcicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQoJy50ZXh0RmlsdGVyJykudmFsKCkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLWRlZHVjdGlvbkNvZGVcIiwgXCIvY29kaWdvc2RlZHVjY2lvbi9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy50ZXh0RmlsdGVyTWFzaycpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICB0ZXh0RmlsdGVyTWFza0Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLWRlZHVjdGlvbkNvZGVcIiwgXCIvY29kaWdvc2RlZHVjY2lvbi9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VsaW1pbmFyIGNvZGlnbyBkZSB2ZXJzaW9uXHJcbiAgICAkKFwiI0RlbGV0ZS1EZWR1Y3Rpb24tQ29kZVZlcnNpb25cIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgICAgICQoXCIuc2VsZWN0RGVkdWN0aW9uQ29kZVt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiRGVkdWN0aW9uQ29kZUlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcIkRlZHVjdGlvbkNvZGVJZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkRlZHVjdGlvbkNvZGVJZC1kY1wiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLkRlbGV0ZS1EZWR1Y3Rpb24tQ29kZVZlcnNpb25cIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiRGVkdWN0aW9uQ29kZUludGVybmFsSWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiRGVkdWN0aW9uQ29kZUlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuSW50ZXJuYWxEZWR1Y3Rpb25Db2RlXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuRGVsZXRlLURlZHVjdGlvbi1Db2RlVmVyc2lvblwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRhZG9yID09IDApIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGxhIHZlcnNpb24gZGUgY8OzZGlnbyBkZSBkZXNjdWVudG8gc2VsZWNjaW9uYWRvP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL2NvZGlnb3NkZWR1Y2Npb24vZWxpbWluYXJWZXJzaW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjRGVsZXRlLURlZHVjdGlvbi1Db2RlVmVyc2lvblwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuRGVkdWN0aW9uQ29kZUlkXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsRGVkdWN0aW9uQ29kZScpLnJlcGxhY2VXaXRoKCQoJy50YmxEZWR1Y3Rpb25Db2RlJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdERlZHVjdGlvbkNvZGVbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5EZWR1Y3Rpb25Db2RlSWRcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vcGFnaW5hY2lvblxyXG4gICAgJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50c2Nyb2xsID0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgbGV0IG1heHNjcm9sbCA9ICQoXCIudGJsRGVkdWN0aW9uQ29kZVwiKS5vdXRlckhlaWdodCh0cnVlKSAtICQoXCIjY29udGVudC1zY3JvbGxcIikub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRzY3JvbGwgPT0gTWF0aC5yb3VuZChtYXhzY3JvbGwpKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnLnRpdGxlLWZvci1wYWdpbmF0aW9uJykudGV4dCgpID09IFwiQ8OzZGlnb3MgZGUgZGVzY3VlbnRvXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbW9yZWRhdGEobWF4c2Nyb2xsLCBcImNvZGlnb3NkZWR1Y2Npb25cIiwgXCIudGJvZHktVGFibGUtZGVkdWN0aW9uQ29kZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vcmVkYXRhKG1heHNjcm9sbCwgXCJjb2RpZ29zZGVkdWNjaW9uXCIsIFwiLnRib2R5LVRhYmxlLWRlZHVjdGlvbkNvZGVcIiwgXCJcIiwgdHJ1ZSwgJCgnLmlkLXZlcnNpb24nKS52YWwoKS50b1N0cmluZygpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhYmlsaXRhciBkb2JsZSBjbGljIGVuIGZpbGFzIHBhcmEgZWRpdGFyXHJcbiAgICBlbmFibGVSb3dEb3VibGVDbGljayhcclxuICAgICAgICAnLnRib2R5LVRhYmxlLWRlZHVjdGlvbkNvZGUnLFxyXG4gICAgICAgICcuRGVkdWN0aW9uQ29kZUlkLWRjJyxcclxuICAgICAgICAnL2NvZGlnb3NkZWR1Y2Npb24ve2lkfScsXHJcbiAgICAgICAgZnVuY3Rpb24gKGRhdGE6IElEZWR1Y3Rpb25Db2RlKSB7XHJcbiAgICAgICAgICAgIEF1dG9tYXRpY0JpbmRpbmcoZGF0YSwgXCIjTmV3QW5kRWRpdERlZHVjdGlvbkNvZGVcIik7XHJcbiAgICAgICAgICAgIGZuLlNldHRpbmdOZXdBbmRFZGl0KFwiZWRpdFwiKTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59XHJcblxyXG5jb25zdCBmbj0ge1xyXG4gICAgLy9mdW5jaW9uIGFicmlyIGZvcm11bGFyaW8gcGFyYSBudWV2byBjb2RpZ28gZGVlIGdhbmFuY2lhXHJcbiAgICBmdW50aW9uTmV3RGVkdWN0aW9uQ29kZTogZnVuY3Rpb24oX29wY2lvbikge1xyXG4gICAgICAgIGlmIChfb3BjaW9uID09IFwib3BlblwiKSB7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuQ29udGVuZWRvckxpc3RFbnRpdHknKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnROZXdFbnR5dGknKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2UnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2VGb3JtJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTYXZlRGVkdWN0aW9uQ29kZTogZnVuY3Rpb24gKF9pc3ZlcnNpb246IGJvb2xlYW4sIHNob3VsZENsb3NlOiBib29sZWFuKSB7XHJcbiAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvY29kaWdvc2RlZHVjY2lvbi9ndWFyZGFyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiAkKCcjTmV3QW5kRWRpdERlZHVjdGlvbkNvZGUnKS5zZXJpYWxpemUoKSArIGAmb3BlcmFjaW9uPSR7b3B0aW9ufWAgKyBgJmlzdmVyc2lvbj0ke19pc3ZlcnNpb259YCxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsRGVkdWN0aW9uQ29kZScpLnJlcGxhY2VXaXRoKCQoJy50YmxEZWR1Y3Rpb25Db2RlJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRDbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiTmV3QW5kRWRpdERlZHVjdGlvbkNvZGVcIikgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLmZ1bnRpb25OZXdEZWR1Y3Rpb25Db2RlKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldHRpbmdOZXdBbmRFZGl0OiBmdW5jdGlvbiAodmlld21vZGU6IHN0cmluZykge1xyXG4gICAgICAgIGZuLkNoYW5nZU9wdGlvbnNEZXNpZ24oKTtcclxuICAgICAgICBpZiAodmlld21vZGUgPT0gXCJlZGl0XCIpIHtcclxuICAgICAgICAgICAgJCgnLnNldGVhcnRpdHVsbycpLnRleHQoJ0VkaXRhciBjw7NkaWdvIGRlIGRlc2N1ZW50bycpO1xyXG4gICAgICAgICAgICAkKCcuU2hvd2lkJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgIG9wdGlvbiA9IDI7XHJcbiAgICAgICAgICAgIGZuLmZ1bnRpb25OZXdEZWR1Y3Rpb25Db2RlKFwib3BlblwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICgkKFwiLnRpdGxlLXZlcnNpb25cIikubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICQoXCIuZGMtdmVyc2lvbnMtZm9ybVwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5saS1zZXBhcmFkb3JcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCIuZGMtdmVyc2lvbnMtZm9ybVwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5saS1zZXBhcmFkb3JcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdOZXdBbmRFZGl0RGVkdWN0aW9uQ29kZScpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAkKCcuU2hvd2lkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgIG9wdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICQoJy5zZXRlYXJ0aXR1bG8nKS50ZXh0KCdOdWV2byBjw7NkaWdvIGRlIGRlc2N1ZW50bycpO1xyXG4gICAgICAgICAgICBmbi5mdW50aW9uTmV3RGVkdWN0aW9uQ29kZShcIm9wZW5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1BsdWdpbiBkZSBudW1lcm9zXHJcbiAgICAgICAgVXNlUGx1Z2luTnVtYmVyRm9ybWF0KFwiI05ld0FuZEVkaXREZWR1Y3Rpb25Db2RlXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBDaGFuZ2VPcHRpb25zRGVzaWduOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8wLURlZHVjdGlvbnMsIDEtQ29udHJidXRpb25zLCAyLUFtYm9zXHJcbiAgICAgICAgbGV0IGEgPSAkKFwiI1BheXJvbGxBY3Rpb25cIikudmFsKCkudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAoYSA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICAkKFwiI0NvbnRyaWJ1dGlvblwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAkKFwiI0RlZHVjdGlvblwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYSA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAkKFwiI0NvbnRyaWJ1dGlvblwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAkKFwiI0RlZHVjdGlvblwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYSA9PSBcIjJcIikge1xyXG4gICAgICAgICAgICAkKFwiI0NvbnRyaWJ1dGlvblwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAkKFwiI0RlZHVjdGlvblwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuLy8gSW5pY2lhbGl6YXIgbW9kYWwgZGUgYXVkaXRvcsOtYVxyXG5pbml0QXVkaXRMaXN0UGFnZSgnLnNlbGVjdERlZHVjdGlvbkNvZGUnLCAnLkRlZHVjdGlvbkNvZGVJZC1kYycsICcvY29kaWdvc2RlZHVjY2lvbi9nZXRieWlkJywgJ0RlZHVjdGlvbkNvZGVJZCcpO1xyXG5cclxuZXhwb3J0IHsgfSJdfQ==