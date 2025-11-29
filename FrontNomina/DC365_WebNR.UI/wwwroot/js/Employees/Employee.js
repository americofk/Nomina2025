/**
 * @file Employee.ts
 * @description Módulo principal de gestión de empleados. Permite crear, editar,
 *              eliminar y administrar toda la información de los empleados.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Empleados
 */
$(document).ready(function () {
    if ($('.idemployee-process-payrol').val().toString() != "") {
        $.ajax({
            url: `/empleadosactivos/${$('.idemployee-process-payrol').val().toString()}/${2}`,
            type: "GET",
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                if (data != null) {
                    option = 2;
                    $('.hire-employee-inside').show();
                    MostrarOpciones("Edit");
                    AutomaticBinding(data, "#createAndEditEmployee");
                    SearchImageEmploye($('#EmployeeId').val().toString());
                    if ($("#ApplyforOvertime").is(":checked")) {
                        $(".option-extra-hour").removeClass("collapse");
                    }
                    funtionNewEmployee("open");
                }
                else {
                    windows_message("No se encontró el empleado", "error");
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
});
variables: {
    var defaultimage = "/Images/Dashboard/default_perfil.png";
    var option;
    var shouldCloseAfterSave = false;
}
funciones: {
    //funcion abrir formulario para nuevo empleado
    function funtionNewEmployee(_opcion) {
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
    }
    function MostrarOpciones(typeview) {
        if (typeview == "Edit") {
            $('.Showid').removeClass('collapse');
            $('.contImputDatosPersonalesFoto').removeClass('collapse');
            $('.contenstatusEmploye').removeClass('collapse');
            $('.optionform').removeClass('collapse');
            $('.TitleEmploye').text('Editar empleado');
        }
        else {
            $('.Showid').addClass('collapse');
            $('.contImputDatosPersonalesFoto').addClass('collapse');
            $('.contenstatusEmploye').addClass('collapse');
            $('.optionform').addClass('collapse');
            $('.TitleEmploye').text('Nuevo empleado');
        }
    }
    //buscar imagen de empleado
    function SearchImageEmploye(_IdEmployee) {
        $.ajax({
            url: `/empleadosactivos/descargarimagen/${_IdEmployee}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.Message != null && data.Message != "") {
                    $("#FotoperfilEP").attr("src", data.Message);
                }
                else {
                    $("#FotoperfilEP").attr("src", defaultimage);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
    //funcion para buscar formulario de contratar
    function FuntionHireEmployee(call, idemploye) {
        $.ajax({
            url: 'empleadosactivos/FormHireEmployee',
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(call).html('');
                    $(call).append(data);
                    $(call).removeClass("collapse");
                    //contratar empleado prospecto
                    $("#Form-hire-employee").submit(function (e) {
                        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
                        if ($(this).valid()) {
                            windows_message("¿Desea contratar prospecto seleccionado?", "confirm", {
                                onOk: function () {
                                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                                    $.ajax({
                                        url: "/empleadosactivos/hireemployee",
                                        type: "POST",
                                        data: $("#Form-hire-employee").serialize(),
                                        async: true,
                                        success: function (data) {
                                            $('.progreso').modal('hide');
                                            if (data.Type == "error") {
                                                FormatErrors(data);
                                            }
                                            else {
                                                windows_message(data.Message, data.Type);
                                                $(call).addClass("collapse");
                                                $.get(location.href)
                                                    .done(function (r) {
                                                    var newDom = $(r);
                                                    $('.tblEmpleyee').replaceWith($('.tblEmpleyee', newDom));
                                                });
                                            }
                                        }, error: function (xhr) {
                                            redireccionaralLogin(xhr);
                                        }
                                    });
                                },
                                onCancel: function () {
                                }
                            });
                        }
                    });
                    //Cerrar formulario de contratar
                    $(".btncancelar-hire-employee").on("click", function () {
                        $(call).addClass("collapse");
                    });
                    $(".EmployeeIdhire").val(idemploye);
                    //Plugin de fecha
                    InstaciateListener();
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
    //funcion para buscar formulario para desvincular empleado
    function FuntionDissmisEmployee(call, idemploye) {
        $.ajax({
            url: 'empleadosactivos/FormdissmisEmployee',
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(call).html('');
                    $(call).append(data);
                    $(call).removeClass("collapse");
                    //contratar empleado prospecto
                    $("#Form-dissmis-employee").submit(function (e) {
                        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
                        if ($(this).valid()) {
                            windows_message("¿Desea desvincular al empleado seleccionado?", "confirm", {
                                onOk: function () {
                                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                                    $.ajax({
                                        url: "/empleadosactivos/dissmisemployee",
                                        type: "POST",
                                        data: $("#Form-dissmis-employee").serialize(),
                                        async: true,
                                        success: function (data) {
                                            $('.progreso').modal('hide');
                                            if (data.Type == "error") {
                                                FormatErrors(data);
                                            }
                                            else {
                                                windows_message(data.Message, data.Type);
                                                $(call).addClass("collapse");
                                                $.get(location.href)
                                                    .done(function (r) {
                                                    var newDom = $(r);
                                                    $('.tblEmpleyee').replaceWith($('.tblEmpleyee', newDom));
                                                });
                                            }
                                        }, error: function (xhr) {
                                            redireccionaralLogin(xhr);
                                        }
                                    });
                                },
                                onCancel: function () {
                                }
                            });
                        }
                    });
                    //Cerrar formulario de contratar
                    $(".btncancelar-dissmis-employee").on("click", function () {
                        $(call).addClass("collapse");
                    });
                    $(".EmployeeIddissmis").val(idemploye);
                    //Plugin de fecha
                    InstaciateListener();
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
    //funcion para deshabilitar empleado
    function SaveEmployeeStatus(_isforDgt) {
        $('#idEmployeeDesh').val($('#EmployeeId').val().toString());
        $('.progreso').modal({ backdrop: 'static', keyboard: false });
        $.ajax({
            url: "/empleadosactivos/actualizarestatus",
            type: "POST",
            data: $("#form-EmployeeStatus").serialize() + `&optionDesh=1` + `&_isforDgt=${_isforDgt}`,
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                let form = document.getElementById('form-EmployeeStatus');
                form.reset();
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
                        $('.tblEmpleyee').replaceWith($('.tblEmpleyee', newDom));
                    });
                    funtionNewEmployee("close");
                    windows_message(data.Message, data.Type);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
    ////funcion si desea deshabilitar al empleado
    //function DisableEmployee() {
    //    windows_message("¿Desea guardar cambio para el DGT?", "confirm", {
    //        onOk: function () {
    //            SaveEmployeeStatus(true);
    //        },
    //        onCancel: function () {
    //            SaveEmployeeStatus(false);
    //        }
    //    }, { Ok: "Si", Cancel: "No" });
    //}
    //funcion para buscar datos del empleado al editar
    function FindEmployeeId(_id) {
        $.ajax({
            url: `/empleadosactivos/${_id}/${$('#WorkStatus').val().toString()}`,
            type: "GET",
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                if (data != null) {
                    option = 2;
                    $('.hire-employee-inside').show();
                    MostrarOpciones("Edit");
                    AutomaticBinding(data, "#createAndEditEmployee");
                    if ($("#ApplyforOvertime").is(":checked")) {
                        $(".option-extra-hour").removeClass("collapse");
                    }
                    else {
                        $(".option-extra-hour").addClass("collapse");
                    }
                    if ($("#IsFixedWorkCalendar").is(":checked")) {
                        $(".option-workcalendars").addClass("collapse");
                        $(".cont-calendar-work").removeClass("collapse");
                    }
                    else {
                        $(".option-workcalendars").removeClass("collapse");
                        $(".cont-calendar-work").addClass("collapse");
                    }
                    SearchImageEmploye($('#EmployeeId').val().toString());
                    /*ListCountries(".Countries");*/
                    funtionNewEmployee("open");
                }
                else {
                    windows_message("No se encontró el empleado", "error");
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
}
escuchadores: {
    //Mostrar formulario de contratar
    $(".hire-employee-outside").on("click", function () {
        var contador = 0;
        let id;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $('.selectEmployees[type=checkbox]').each(function () {
            if ($(this).is(":checked")) {
                contador++;
                id = $(this).parent().parent().find(".EmployeeIdtbl").html().trim();
            }
        });
        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
        }
        else {
            FuntionHireEmployee(".contenedor-uno-contratar", id);
        }
    });
    $(".hire-dissmis-outside").on("click", function () {
        var contador = 0;
        let id;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $('.selectEmployees[type=checkbox]').each(function () {
            if ($(this).is(":checked")) {
                contador++;
                id = $(this).parent().parent().find(".EmployeeIdtbl").html().trim();
            }
        });
        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
        }
        else {
            FuntionHireEmployee(".contenedor-desvinculados-contratar", id);
        }
    });
    $(".hire-employee-inside").on("click", function () {
        FuntionHireEmployee(".contenedor-dos-contratar", $('#EmployeeId').val().toString());
    });
    //Mostrar formulario para desvincular empleados
    $(".dissmis-employee-outside").on("click", function () {
        var contador = 0;
        let id;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $('.selectEmployees[type=checkbox]').each(function () {
            if ($(this).is(":checked")) {
                contador++;
                id = $(this).parent().parent().find(".EmployeeIdtbl").html().trim();
            }
        });
        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
        }
        else {
            FuntionDissmisEmployee(".contenedor-uno-contratar", id);
        }
    });
    $(".dissmis-employee-inside").on("click", function () {
        FuntionDissmisEmployee(".contenedor-dos-contratar", $('#EmployeeId').val().toString());
    });
    //eliminar empleado
    $("#deleteEmployees").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            var contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectEmployees[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "ObjEmployees");
                    input.attr("class", "ObjEmployees");
                    input.val($(this).parent().parent().find(".EmployeeIdtbl").html().trim());
                    $(".deleteEmployees").append(input);
                }
            });
            if (!contador) {
                windows_message("Debe seleccionar un Registro!!", "error");
            }
            else {
                windows_message("¿Desea eliminar empleados seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/empleadosactivos/eliminar",
                            type: "POST",
                            data: $("#deleteEmployees").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                if (data.Type == "error") {
                                    var _errors = "";
                                    data.Errors.forEach(function (x) {
                                        _errors += `${x}<br>`;
                                    });
                                    $(".ObjEmployees").remove();
                                    windows_message(_errors, data.Type);
                                }
                                else {
                                    $(".ObjEmployees").remove();
                                    $.get(location.href)
                                        .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblEmpleyee').replaceWith($('.tblEmpleyee', newDom));
                                    });
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectAddres[type=checkbox]").prop('checked', false);
                        $(".ObjEmployees").remove();
                    }
                });
            }
        }
    });
    //cargar foto de empleado
    $(".Image").change(function (e) {
        let _dato = this;
        if (_dato.files != null) {
            let originalform;
            originalform = document.querySelector("#save-employeesimages-form");
            let dataform = new FormData(originalform);
            dataform.append("IdEmpleyee", $('#EmployeeId').val().toString());
            $.ajax({
                url: "/empleadosactivos/cargarimagen",
                type: "POST",
                data: dataform,
                contentType: false,
                processData: false,
                async: true,
                success: function (data) {
                    if (data.Type == "error") {
                        $('.progreso').modal('hide');
                        var _errors = "";
                        data.Errors.forEach(function (x) {
                            _errors += `${x}<br>`;
                        });
                        windows_message(_errors, data.Type, {
                            onOk: function () {
                                $('.progreso').modal('hide');
                            }
                        });
                    }
                    else {
                        $("#FotoperfilEP").attr("src", data.Message);
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    //formatiar campo nombre del empleado
    $("#Name").change(function (e) {
        $(this).val(Firtscapitalletter($(this).val().toString()));
    });
    $("#LastName").change(function (e) {
        $(this).val(Firtscapitalletter($(this).val().toString()));
    });
    $("#BirthDate").change(function (e) {
        $("#Age").val(calcularEdad($(this).val()));
    });
    $("#Country").change(function (e) {
        var Nacionaliti = $('#Country option:selected').text().split("-");
        $("#Nationality").val(Nacionaliti[1].trim());
    });
    //abrir nuevo empleado
    $('.NewEmpleyee').on('click', function () {
        let form = document.getElementById('createAndEditEmployee');
        form.reset();
        $('.hire-employee-inside').hide();
        option = 1;
        $('.margenFormmularios').removeClass('ContenedorNewemploye-two');
        $('.margenFormmularios').addClass('clasdynamicsforcontenemploye');
        /*  ListCountries(".Countries");*/
        funtionNewEmployee("open");
        MostrarOpciones("New");
    });
    // Guardar y cerrar
    $('.btnSaveAndClose').on('click', function () {
        shouldCloseAfterSave = true;
        $("#createAndEditEmployee").submit();
    });
    //save employee
    $("#createAndEditEmployee").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            $('.progreso').modal({ backdrop: 'static', keyboard: false });
            $.ajax({
                url: "/empleadosactivos/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
                async: true,
                success: function (data) {
                    if (data.Type == "error") {
                        $('.progreso').modal('hide');
                        var _errors = "";
                        data.Errors.forEach(function (x) {
                            _errors += `${x}<br>`;
                        });
                        windows_message(_errors, data.Type, {
                            onOk: function () {
                            }
                        });
                        $('.progreso').modal('hide');
                    }
                    else {
                        $('.progreso').modal('hide');
                        windows_message(data.Message, data.Type, {});
                        $.get(location.href)
                            .done(function (r) {
                            var newDom = $(r);
                            $('.tbody-Table-Employee').replaceWith($('.tbody-Table-Employee', newDom));
                        });
                        // Si debe cerrar después de guardar
                        if (shouldCloseAfterSave) {
                            let form = document.getElementById("createAndEditEmployee");
                            form.reset();
                            funtionNewEmployee("close");
                            shouldCloseAfterSave = false;
                        }
                        else {
                            // Cambiar a modo edición
                            if (option == 1)
                                FindEmployeeId(data.IdType);
                            else
                                FindEmployeeId($("#EmployeeId").val().toString());
                        }
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    //funcion para editar employe
    $('.EditEmployee').on('click', function () {
        let _id;
        var contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectEmployees[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".EmployeeIdtbl").html().trim();
            }
        });
        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
            $(".selectEmployees[type=checkbox]").prop('checked', false);
        }
        else {
            FindEmployeeId(_id);
        }
    });
    //cerrar nuevo empleados
    $('.OpCloseform').on('click', function () {
        $('.Showid').addClass('collapse');
        $('.margenFormmularios').addClass('ContenedorNewemploye');
        $('.margenFormmularios').removeClass('clasdynamicsforcontenemploye');
        funtionNewEmployee("close");
    });
    //deshabilitar
    $('#EmployeeStatus').on('click', function () {
        if (!$(this).is(":checked")) {
            windows_message("¿Desea Inhabilitar el empleado?", "confirm", {
                onOk: function () {
                    SaveEmployeeStatus(true);
                },
                onCancel: function () {
                    $("#EmployeeStatus").prop('checked', true);
                }
            });
        }
        else {
            windows_message("¿Desea habilitar el empleado?", "confirm", {
                onOk: function () {
                    $('#idEmployeeDesh').val($('#EmployeeId').val().toString());
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $.ajax({
                        url: "/empleadosactivos/actualizarestatus",
                        type: "POST",
                        data: $("#form-EmployeeStatus").serialize() + `&optionDesh=2`,
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            let form = document.getElementById('form-EmployeeStatus');
                            form.reset();
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
                                    $('.tblEmpleyee').replaceWith($('.tblEmpleyee', newDom));
                                });
                                funtionNewEmployee("close");
                                windows_message(data.Message, data.Type);
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                },
                onCancel: function () {
                    $("#EmployeeStatus").prop('checked', false);
                }
            });
        }
    });
    //employe inactivos
    $('.Employee-Disabled').on('click', function () {
        window.location.href = "/empleadosactivos/inactivo";
    });
    //cerrar
    $('.close-employee-disabled').on('click', function () {
        window.location.href = "/empleadosactivos";
    });
    //filtro employee
    $('.optionFilter-employee').on('change', function () {
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Employee", "/empleadosactivos/FilterOrMoreData", "Employ", '.optionFilter-employee', '.textFilter-employee');
        }
    });
    $('.textFilter-employee').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            Datafilter(".tbody-Table-Employee", "/empleadosactivos/FilterOrMoreData", "Employ", '.optionFilter-employee', '.textFilter-employee');
        }
    });
    //filtro prospecto
    $('.optionFilter-prospect').on('change', function () {
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Employee", "/empleadosactivos/FilterOrMoreData", "Candidate", '.optionFilter-prospect', '.textFilter-prospect');
        }
    });
    $('.textFilter-prospect').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            Datafilter(".tbody-Table-Employee", "/empleadosactivos/FilterOrMoreData", "Candidate", '.optionFilter-prospect', '.textFilter-prospect');
        }
    });
    //filtro desvinculados
    $('.optionFilter').on('change', function () {
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Employee", "/empleadosactivos/FilterOrMoreData", "Dismissed");
        }
    });
    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            Datafilter(".tbody-Table-Employee", "/empleadosactivos/FilterOrMoreData", "Dismissed");
        }
    });
    //filtro inactivos
    $('.optionFilter-disabled').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Employee", "/empleadosactivos/FilterOrMoreData", "Dismissed", '.optionFilter-disabled', '.textFilter-disabled');
        }
    });
    $('.textFilter-disabled').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Employee", "/empleadosactivos/FilterOrMoreData", "Dismissed", '.optionFilter-disabled', '.textFilter-disabled');
        }
    });
    //paginacion
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();
        let maxscroll = $(".tblEmpleyee").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                switch ($('.title-for-pagination').text()) {
                    case "Empleados":
                        moredata(maxscroll, "empleadosactivos", ".tbody-Table-Employee", "Employ");
                        break;
                    case "Prospectos a empleado":
                        moredata(maxscroll, "empleadosactivos", ".tbody-Table-Employee");
                        break;
                    case "Dados de baja":
                        moredata(maxscroll, "empleadosactivos", ".tbody-Table-Employee", "Dismissed");
                        break;
                    case "Empleados inactivos":
                        moredata(maxscroll, "empleadosactivos", ".tbody-Table-Employee", "inactivos");
                        break;
                }
            }
        }
    });
    //ver historial de empleado
    $('.employee-history').on('click', function () {
        let _id;
        let _name;
        var contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectEmployees[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".EmployeeIdtbl").html().trim();
                _name = `${$(this).parent().parent().find(".Nametbl").html().trim()} ${$(this).parent().parent().find(".LastNametbl").html().trim()}`;
            }
        });
        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
            $(".selectEmployees[type=checkbox]").prop('checked', false);
        }
        else {
            window.location.href = `/historialempleado?employeeid=${_id}&name=${_name}`;
        }
    });
    // Habilitar doble clic en filas para editar
    $(document).on('dblclick', '.tbody-Table-Employee .row-app', function (e) {
        var _a;
        if ($(e.target).is('input[type="checkbox"]') || $(e.target).is('label')) {
            return;
        }
        const rowId = $(this).find('.EmployeeIdtbl').text().trim();
        if (!rowId) {
            return;
        }
        // Obtener WorkStatus dinámicamente al momento del clic
        const workStatus = ((_a = $('#WorkStatus').val()) === null || _a === void 0 ? void 0 : _a.toString()) || '1';
        $('.progreso').modal({ backdrop: 'static', keyboard: false });
        $.ajax({
            url: `/empleadosactivos/${rowId}/${workStatus}`,
            type: "GET",
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                if (data != null) {
                    option = 2;
                    $('.hire-employee-inside').show();
                    MostrarOpciones("Edit");
                    AutomaticBinding(data, "#createAndEditEmployee");
                    if ($("#ApplyforOvertime").is(":checked")) {
                        $(".option-extra-hour").removeClass("collapse");
                    }
                    else {
                        $(".option-extra-hour").addClass("collapse");
                    }
                    if ($("#IsFixedWorkCalendar").is(":checked")) {
                        $(".option-workcalendars").addClass("collapse");
                        $(".cont-calendar-work").removeClass("collapse");
                    }
                    else {
                        $(".option-workcalendars").removeClass("collapse");
                        $(".cont-calendar-work").addClass("collapse");
                    }
                    SearchImageEmploye($('#EmployeeId').val().toString());
                    funtionNewEmployee("open");
                }
                else {
                    windows_message("No se encontró el empleado", "error");
                }
            },
            error: function (xhr) {
                $('.progreso').modal('hide');
                redireccionaralLogin(xhr);
            }
        });
    });
    // Aplicar estilo clickable a las filas
    $('.tbody-Table-Employee .row-app').addClass('row-clickable');
}
// Inicializar modal de auditoría con tipo de empleado
var employeeType = $('#employee-page').data('employee-type') || 'Empleados';
$('.AuditInfo').on('click', function () {
    var _id;
    var contador = 0;
    $(".selectEmployees[type=checkbox]").each(function () {
        if ($(this).is(":checked")) {
            contador++;
            _id = $(this).parent().parent().find('.EmployeeIdtbl').html().trim();
        }
    });
    if (contador === 0) {
        windows_message("¡Debe seleccionar un registro para ver la información de auditoría!", "error");
        return;
    }
    if (contador > 1) {
        windows_message("¡Debe seleccionar solo un registro!", "info");
        return;
    }
    $.ajax({
        url: '/empleadosactivos/getbyid',
        type: "GET",
        data: { Id: _id, type: employeeType },
        async: true,
        success: function (data) {
            if (data != null) {
                showAuditModal(data);
            }
            else {
                windows_message("Error obteniendo datos de auditoría", "error");
            }
        },
        error: function (xhr) {
            redireccionaralLogin(xhr);
        }
    });
});
// Evento para el formulario de edición
$('.AuditInfoForm').on('click', function () {
    showAuditModalFromForm();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wbG95ZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9UeXBlU2NyaXB0RmlsZS9FbXBsb3llZXMvRW1wbG95ZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDZCxJQUFJLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFSCxHQUFHLEVBQUUscUJBQXFCLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNqRixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBZTtnQkFDOUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFN0IsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ2YsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDWCxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDbEMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QixnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztvQkFDakQsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ3RELElBQUksQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7d0JBQ3hDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMs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KlxyXG4gKiBAZmlsZSBFbXBsb3llZS50c1xyXG4gKiBAZGVzY3JpcHRpb24gTcOzZHVsbyBwcmluY2lwYWwgZGUgZ2VzdGnDs24gZGUgZW1wbGVhZG9zLiBQZXJtaXRlIGNyZWFyLCBlZGl0YXIsXHJcbiAqICAgICAgICAgICAgICBlbGltaW5hciB5IGFkbWluaXN0cmFyIHRvZGEgbGEgaW5mb3JtYWNpw7NuIGRlIGxvcyBlbXBsZWFkb3MuXHJcbiAqIEBhdXRob3IgRXF1aXBvIGRlIERlc2Fycm9sbG9cclxuICogQGRhdGUgMjAyNVxyXG4gKiBAbW9kdWxlIEVtcGxlYWRvc1xyXG4gKi9cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgkKCcuaWRlbXBsb3llZS1wcm9jZXNzLXBheXJvbCcpLnZhbCgpLnRvU3RyaW5nKCkgIT0gXCJcIikge1xyXG4gICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICB1cmw6IGAvZW1wbGVhZG9zYWN0aXZvcy8keyQoJy5pZGVtcGxveWVlLXByb2Nlc3MtcGF5cm9sJykudmFsKCkudG9TdHJpbmcoKX0vJHsyfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogSUVtcGxveWVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5oaXJlLWVtcGxveWVlLWluc2lkZScpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICBNb3N0cmFyT3BjaW9uZXMoXCJFZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEF1dG9tYXRpY0JpbmRpbmcoZGF0YSwgXCIjY3JlYXRlQW5kRWRpdEVtcGxveWVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIFNlYXJjaEltYWdlRW1wbG95ZSgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI0FwcGx5Zm9yT3ZlcnRpbWVcIikuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLm9wdGlvbi1leHRyYS1ob3VyXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bnRpb25OZXdFbXBsb3llZShcIm9wZW5cIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIk5vIHNlIGVuY29udHLDsyBlbCBlbXBsZWFkb1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxudmFyaWFibGVzOiB7XHJcbiAgICB2YXIgZGVmYXVsdGltYWdlOiBzdHJpbmcgPSBcIi9JbWFnZXMvRGFzaGJvYXJkL2RlZmF1bHRfcGVyZmlsLnBuZ1wiO1xyXG4gICAgdmFyIG9wdGlvbjogbnVtYmVyO1xyXG4gICAgdmFyIHNob3VsZENsb3NlQWZ0ZXJTYXZlOiBib29sZWFuID0gZmFsc2U7XHJcbn1cclxuZnVuY2lvbmVzOiB7XHJcbiAgICAvL2Z1bmNpb24gYWJyaXIgZm9ybXVsYXJpbyBwYXJhIG51ZXZvIGVtcGxlYWRvXHJcbiAgICBmdW5jdGlvbiBmdW50aW9uTmV3RW1wbG95ZWUoX29wY2lvbikge1xyXG4gICAgICAgIGlmIChfb3BjaW9uID09IFwib3BlblwiKSB7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuQ29udGVuZWRvckxpc3RFbnRpdHknKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnROZXdFbnR5dGknKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2UnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2VGb3JtJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIE1vc3RyYXJPcGNpb25lcyh0eXBldmlldzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHR5cGV2aWV3ID09IFwiRWRpdFwiKSB7XHJcbiAgICAgICAgICAgICQoJy5TaG93aWQnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnRJbXB1dERhdG9zUGVyc29uYWxlc0ZvdG8nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnRlbnN0YXR1c0VtcGxveWUnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wdGlvbmZvcm0nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLlRpdGxlRW1wbG95ZScpLnRleHQoJ0VkaXRhciBlbXBsZWFkbycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5TaG93aWQnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnRJbXB1dERhdG9zUGVyc29uYWxlc0ZvdG8nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnRlbnN0YXR1c0VtcGxveWUnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wdGlvbmZvcm0nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLlRpdGxlRW1wbG95ZScpLnRleHQoJ051ZXZvIGVtcGxlYWRvJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vYnVzY2FyIGltYWdlbiBkZSBlbXBsZWFkb1xyXG4gICAgZnVuY3Rpb24gU2VhcmNoSW1hZ2VFbXBsb3llKF9JZEVtcGxveWVlOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgL2VtcGxlYWRvc2FjdGl2b3MvZGVzY2FyZ2FyaW1hZ2VuLyR7X0lkRW1wbG95ZWV9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuTWVzc2FnZSAhPSBudWxsICYmIGRhdGEuTWVzc2FnZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNGb3RvcGVyZmlsRVBcIikuYXR0cihcInNyY1wiLCBkYXRhLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNGb3RvcGVyZmlsRVBcIikuYXR0cihcInNyY1wiLCBkZWZhdWx0aW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vZnVuY2lvbiBwYXJhIGJ1c2NhciBmb3JtdWxhcmlvIGRlIGNvbnRyYXRhclxyXG4gICAgZnVuY3Rpb24gRnVudGlvbkhpcmVFbXBsb3llZShjYWxsOiBzdHJpbmcsIGlkZW1wbG95ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnZW1wbGVhZG9zYWN0aXZvcy9Gb3JtSGlyZUVtcGxveWVlJyxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjYWxsKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGNhbGwpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGNhbGwpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb250cmF0YXIgZW1wbGVhZG8gcHJvc3BlY3RvXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNGb3JtLWhpcmUtZW1wbG95ZWVcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBTaWVtcHJlIHByZXZlbmlyIGVsIGVudsOtbyBuYXRpdm8gZGVsIGZvcm11bGFyaW9cclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGNvbnRyYXRhciBwcm9zcGVjdG8gc2VsZWNjaW9uYWRvP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL2VtcGxlYWRvc2FjdGl2b3MvaGlyZWVtcGxveWVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjRm9ybS1oaXJlLWVtcGxveWVlXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoY2FsbCkuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibEVtcGxleWVlJykucmVwbGFjZVdpdGgoJCgnLnRibEVtcGxleWVlJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vQ2VycmFyIGZvcm11bGFyaW8gZGUgY29udHJhdGFyXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5idG5jYW5jZWxhci1oaXJlLWVtcGxveWVlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGNhbGwpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuRW1wbG95ZWVJZGhpcmVcIikudmFsKGlkZW1wbG95ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vUGx1Z2luIGRlIGZlY2hhXHJcbiAgICAgICAgICAgICAgICAgICAgSW5zdGFjaWF0ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9mdW5jaW9uIHBhcmEgYnVzY2FyIGZvcm11bGFyaW8gcGFyYSBkZXN2aW5jdWxhciBlbXBsZWFkb1xyXG4gICAgZnVuY3Rpb24gRnVudGlvbkRpc3NtaXNFbXBsb3llZShjYWxsOiBzdHJpbmcsIGlkZW1wbG95ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnZW1wbGVhZG9zYWN0aXZvcy9Gb3JtZGlzc21pc0VtcGxveWVlJyxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjYWxsKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGNhbGwpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGNhbGwpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb250cmF0YXIgZW1wbGVhZG8gcHJvc3BlY3RvXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNGb3JtLWRpc3NtaXMtZW1wbG95ZWVcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBTaWVtcHJlIHByZXZlbmlyIGVsIGVudsOtbyBuYXRpdm8gZGVsIGZvcm11bGFyaW9cclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGRlc3ZpbmN1bGFyIGFsIGVtcGxlYWRvIHNlbGVjY2lvbmFkbz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvZW1wbGVhZG9zYWN0aXZvcy9kaXNzbWlzZW1wbG95ZWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNGb3JtLWRpc3NtaXMtZW1wbG95ZWVcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChjYWxsKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsRW1wbGV5ZWUnKS5yZXBsYWNlV2l0aCgkKCcudGJsRW1wbGV5ZWUnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9DZXJyYXIgZm9ybXVsYXJpbyBkZSBjb250cmF0YXJcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmJ0bmNhbmNlbGFyLWRpc3NtaXMtZW1wbG95ZWVcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY2FsbCkuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5FbXBsb3llZUlkZGlzc21pc1wiKS52YWwoaWRlbXBsb3llKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9QbHVnaW4gZGUgZmVjaGFcclxuICAgICAgICAgICAgICAgICAgICBJbnN0YWNpYXRlTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL2Z1bmNpb24gcGFyYSBkZXNoYWJpbGl0YXIgZW1wbGVhZG9cclxuICAgIGZ1bmN0aW9uIFNhdmVFbXBsb3llZVN0YXR1cyhfaXNmb3JEZ3Q6IGJvb2xlYW4pIHtcclxuICAgICAgICAkKCcjaWRFbXBsb3llZURlc2gnKS52YWwoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9lbXBsZWFkb3NhY3Rpdm9zL2FjdHVhbGl6YXJlc3RhdHVzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiAkKFwiI2Zvcm0tRW1wbG95ZWVTdGF0dXNcIikuc2VyaWFsaXplKCkgKyBgJm9wdGlvbkRlc2g9MWAgKyBgJl9pc2ZvckRndD0ke19pc2ZvckRndH1gLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLUVtcGxveWVlU3RhdHVzJykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsRW1wbGV5ZWUnKS5yZXBsYWNlV2l0aCgkKCcudGJsRW1wbGV5ZWUnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVudGlvbk5ld0VtcGxveWVlKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy9mdW5jaW9uIHNpIGRlc2VhIGRlc2hhYmlsaXRhciBhbCBlbXBsZWFkb1xyXG4gICAgLy9mdW5jdGlvbiBEaXNhYmxlRW1wbG95ZWUoKSB7XHJcbiAgICAvLyAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGd1YXJkYXIgY2FtYmlvIHBhcmEgZWwgREdUP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgLy8gICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgIFNhdmVFbXBsb3llZVN0YXR1cyh0cnVlKTtcclxuICAgIC8vICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICBTYXZlRW1wbG95ZWVTdGF0dXMoZmFsc2UpO1xyXG4gICAgLy8gICAgICAgIH1cclxuXHJcbiAgICAvLyAgICB9LCB7IE9rOiBcIlNpXCIsIENhbmNlbDogXCJOb1wiIH0pO1xyXG4gICAgLy99XHJcblxyXG4gICAgLy9mdW5jaW9uIHBhcmEgYnVzY2FyIGRhdG9zIGRlbCBlbXBsZWFkbyBhbCBlZGl0YXJcclxuICAgIGZ1bmN0aW9uIEZpbmRFbXBsb3llZUlkKF9pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgIHVybDogYC9lbXBsZWFkb3NhY3Rpdm9zLyR7X2lkfS8keyQoJyNXb3JrU3RhdHVzJykudmFsKCkudG9TdHJpbmcoKX1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IElFbXBsb3llZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuaGlyZS1lbXBsb3llZS1pbnNpZGUnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTW9zdHJhck9wY2lvbmVzKFwiRWRpdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBBdXRvbWF0aWNCaW5kaW5nKGRhdGEsIFwiI2NyZWF0ZUFuZEVkaXRFbXBsb3llZVwiKTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI0FwcGx5Zm9yT3ZlcnRpbWVcIikuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLm9wdGlvbi1leHRyYS1ob3VyXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5vcHRpb24tZXh0cmEtaG91clwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIjSXNGaXhlZFdvcmtDYWxlbmRhclwiKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIub3B0aW9uLXdvcmtjYWxlbmRhcnNcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5jb250LWNhbGVuZGFyLXdvcmtcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLm9wdGlvbi13b3JrY2FsZW5kYXJzXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuY29udC1jYWxlbmRhci13b3JrXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBTZWFyY2hJbWFnZUVtcGxveWUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAvKkxpc3RDb3VudHJpZXMoXCIuQ291bnRyaWVzXCIpOyovXHJcbiAgICAgICAgICAgICAgICAgICAgZnVudGlvbk5ld0VtcGxveWVlKFwib3BlblwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiTm8gc2UgZW5jb250csOzIGVsIGVtcGxlYWRvXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuZXNjdWNoYWRvcmVzOiB7XHJcbiAgICAvL01vc3RyYXIgZm9ybXVsYXJpbyBkZSBjb250cmF0YXJcclxuICAgICQoXCIuaGlyZS1lbXBsb3llZS1vdXRzaWRlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb250YWRvcjogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZztcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKCcuc2VsZWN0RW1wbG95ZWVzW3R5cGU9Y2hlY2tib3hdJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIEZ1bnRpb25IaXJlRW1wbG95ZWUoXCIuY29udGVuZWRvci11bm8tY29udHJhdGFyXCIsIGlkKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5oaXJlLWRpc3NtaXMtb3V0c2lkZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29udGFkb3I6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IGlkOiBzdHJpbmc7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJCgnLnNlbGVjdEVtcGxveWVlc1t0eXBlPWNoZWNrYm94XScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkVtcGxveWVlSWR0YmxcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY29udGFkb3IgPT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb250YWRvciA+IDEpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHNvbG8gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBGdW50aW9uSGlyZUVtcGxveWVlKFwiLmNvbnRlbmVkb3ItZGVzdmluY3VsYWRvcy1jb250cmF0YXJcIiwgaWQpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmhpcmUtZW1wbG95ZWUtaW5zaWRlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBGdW50aW9uSGlyZUVtcGxveWVlKFwiLmNvbnRlbmVkb3ItZG9zLWNvbnRyYXRhclwiLCAkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9Nb3N0cmFyIGZvcm11bGFyaW8gcGFyYSBkZXN2aW5jdWxhciBlbXBsZWFkb3NcclxuICAgICQoXCIuZGlzc21pcy1lbXBsb3llZS1vdXRzaWRlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb250YWRvcjogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZztcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKCcuc2VsZWN0RW1wbG95ZWVzW3R5cGU9Y2hlY2tib3hdJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIEZ1bnRpb25EaXNzbWlzRW1wbG95ZWUoXCIuY29udGVuZWRvci11bm8tY29udHJhdGFyXCIsIGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmRpc3NtaXMtZW1wbG95ZWUtaW5zaWRlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEZ1bnRpb25EaXNzbWlzRW1wbG95ZWUoXCIuY29udGVuZWRvci1kb3MtY29udHJhdGFyXCIsICQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VsaW1pbmFyIGVtcGxlYWRvXHJcbiAgICAkKFwiI2RlbGV0ZUVtcGxveWVlc1wiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFNpZW1wcmUgcHJldmVuaXIgZWwgZW52w61vIG5hdGl2byBkZWwgZm9ybXVsYXJpb1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdEVtcGxveWVlc1t0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIk9iakVtcGxveWVlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJPYmpFbXBsb3llZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5FbXBsb3llZUlkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuZGVsZXRlRW1wbG95ZWVzXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIFJlZ2lzdHJvISFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGVtcGxlYWRvcyBzZWxlY2Npb25hZG9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL2VtcGxlYWRvc2FjdGl2b3MvZWxpbWluYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNkZWxldGVFbXBsb3llZXNcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLk9iakVtcGxveWVlc1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuT2JqRW1wbG95ZWVzXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsRW1wbGV5ZWUnKS5yZXBsYWNlV2l0aCgkKCcudGJsRW1wbGV5ZWUnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0QWRkcmVzW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuT2JqRW1wbG95ZWVzXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vY2FyZ2FyIGZvdG8gZGUgZW1wbGVhZG9cclxuICAgICQoXCIuSW1hZ2VcIikuY2hhbmdlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IF9kYXRvID0gdGhpcyBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgIGlmIChfZGF0by5maWxlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbGZvcm06IEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgb3JpZ2luYWxmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlLWVtcGxveWVlc2ltYWdlcy1mb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFmb3JtID0gbmV3IEZvcm1EYXRhKG9yaWdpbmFsZm9ybSk7XHJcbiAgICAgICAgICAgIGRhdGFmb3JtLmFwcGVuZChcIklkRW1wbGV5ZWVcIiwgJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL2VtcGxlYWRvc2FjdGl2b3MvY2FyZ2FyaW1hZ2VuXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFmb3JtLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNGb3RvcGVyZmlsRVBcIikuYXR0cihcInNyY1wiLCBkYXRhLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9mb3JtYXRpYXIgY2FtcG8gbm9tYnJlIGRlbCBlbXBsZWFkb1xyXG5cclxuICAgICQoXCIjTmFtZVwiKS5jaGFuZ2UoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkKHRoaXMpLnZhbChGaXJ0c2NhcGl0YWxsZXR0ZXIoJCh0aGlzKS52YWwoKS50b1N0cmluZygpKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI0xhc3ROYW1lXCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQodGhpcykudmFsKEZpcnRzY2FwaXRhbGxldHRlcigkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCkpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjQmlydGhEYXRlXCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQoXCIjQWdlXCIpLnZhbChjYWxjdWxhckVkYWQoJCh0aGlzKS52YWwoKSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNDb3VudHJ5XCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBOYWNpb25hbGl0aSA9ICQoJyNDb3VudHJ5IG9wdGlvbjpzZWxlY3RlZCcpLnRleHQoKS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgJChcIiNOYXRpb25hbGl0eVwiKS52YWwoTmFjaW9uYWxpdGlbMV0udHJpbSgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYWJyaXIgbnVldm8gZW1wbGVhZG9cclxuICAgICQoJy5OZXdFbXBsZXllZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGVBbmRFZGl0RW1wbG95ZWUnKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICQoJy5oaXJlLWVtcGxveWVlLWluc2lkZScpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgb3B0aW9uID0gMTtcclxuICAgICAgICAkKCcubWFyZ2VuRm9ybW11bGFyaW9zJykucmVtb3ZlQ2xhc3MoJ0NvbnRlbmVkb3JOZXdlbXBsb3llLXR3bycpO1xyXG4gICAgICAgICQoJy5tYXJnZW5Gb3JtbXVsYXJpb3MnKS5hZGRDbGFzcygnY2xhc2R5bmFtaWNzZm9yY29udGVuZW1wbG95ZScpO1xyXG4gICAgICAgIC8qICBMaXN0Q291bnRyaWVzKFwiLkNvdW50cmllc1wiKTsqL1xyXG4gICAgICAgIGZ1bnRpb25OZXdFbXBsb3llZShcIm9wZW5cIik7XHJcbiAgICAgICAgTW9zdHJhck9wY2lvbmVzKFwiTmV3XCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gR3VhcmRhciB5IGNlcnJhclxyXG4gICAgJCgnLmJ0blNhdmVBbmRDbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzaG91bGRDbG9zZUFmdGVyU2F2ZSA9IHRydWU7XHJcbiAgICAgICAgJChcIiNjcmVhdGVBbmRFZGl0RW1wbG95ZWVcIikuc3VibWl0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3NhdmUgZW1wbG95ZWVcclxuICAgICQoXCIjY3JlYXRlQW5kRWRpdEVtcGxveWVlXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gU2llbXByZSBwcmV2ZW5pciBlbCBlbnbDrW8gbmF0aXZvIGRlbCBmb3JtdWxhcmlvXHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL2VtcGxlYWRvc2FjdGl2b3MvZ3VhcmRhclwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpICsgYCZvcGVyYWNpb249JHtvcHRpb259YCxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUsIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJvZHktVGFibGUtRW1wbG95ZWUnKS5yZXBsYWNlV2l0aCgkKCcudGJvZHktVGFibGUtRW1wbG95ZWUnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2kgZGViZSBjZXJyYXIgZGVzcHXDqXMgZGUgZ3VhcmRhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2xvc2VBZnRlclNhdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGVBbmRFZGl0RW1wbG95ZWVcIikgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVudGlvbk5ld0VtcGxveWVlKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRDbG9zZUFmdGVyU2F2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FtYmlhciBhIG1vZG8gZWRpY2nDs25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaW5kRW1wbG95ZWVJZChkYXRhLklkVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRmluZEVtcGxveWVlSWQoJChcIiNFbXBsb3llZUlkXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2Z1bmNpb24gcGFyYSBlZGl0YXIgZW1wbG95ZVxyXG4gICAgJCgnLkVkaXRFbXBsb3llZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IF9pZDogc3RyaW5nO1xyXG4gICAgICAgIHZhciBjb250YWRvciA9IDA7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChcIi5zZWxlY3RFbXBsb3llZXNbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcbiAgICAgICAgICAgICAgICBfaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgJChcIi5zZWxlY3RFbXBsb3llZXNbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBGaW5kRW1wbG95ZWVJZChfaWQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9jZXJyYXIgbnVldm8gZW1wbGVhZG9zXHJcbiAgICAkKCcuT3BDbG9zZWZvcm0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLlNob3dpZCcpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICQoJy5tYXJnZW5Gb3JtbXVsYXJpb3MnKS5hZGRDbGFzcygnQ29udGVuZWRvck5ld2VtcGxveWUnKTtcclxuICAgICAgICAkKCcubWFyZ2VuRm9ybW11bGFyaW9zJykucmVtb3ZlQ2xhc3MoJ2NsYXNkeW5hbWljc2ZvcmNvbnRlbmVtcGxveWUnKTtcclxuICAgICAgICBmdW50aW9uTmV3RW1wbG95ZWUoXCJjbG9zZVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vZGVzaGFiaWxpdGFyXHJcbiAgICAkKCcjRW1wbG95ZWVTdGF0dXMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgSW5oYWJpbGl0YXIgZWwgZW1wbGVhZG8/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFNhdmVFbXBsb3llZVN0YXR1cyh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0VtcGxveWVlU3RhdHVzXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBoYWJpbGl0YXIgZWwgZW1wbGVhZG8/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2lkRW1wbG95ZWVEZXNoJykudmFsKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvZW1wbGVhZG9zYWN0aXZvcy9hY3R1YWxpemFyZXN0YXR1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNmb3JtLUVtcGxveWVlU3RhdHVzXCIpLnNlcmlhbGl6ZSgpICsgYCZvcHRpb25EZXNoPTJgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLUVtcGxveWVlU3RhdHVzJykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsRW1wbGV5ZWUnKS5yZXBsYWNlV2l0aCgkKCcudGJsRW1wbGV5ZWUnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVudGlvbk5ld0VtcGxveWVlKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNFbXBsb3llZVN0YXR1c1wiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VtcGxveWUgaW5hY3Rpdm9zXHJcbiAgICAkKCcuRW1wbG95ZWUtRGlzYWJsZWQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9lbXBsZWFkb3NhY3Rpdm9zL2luYWN0aXZvXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2NlcnJhclxyXG4gICAgJCgnLmNsb3NlLWVtcGxveWVlLWRpc2FibGVkJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvZW1wbGVhZG9zYWN0aXZvc1wiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9maWx0cm8gZW1wbG95ZWVcclxuICAgICQoJy5vcHRpb25GaWx0ZXItZW1wbG95ZWUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKCcudGV4dEZpbHRlcicpLnZhbCgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1FbXBsb3llZVwiLCBcIi9lbXBsZWFkb3NhY3Rpdm9zL0ZpbHRlck9yTW9yZURhdGFcIiwgXCJFbXBsb3lcIiwgJy5vcHRpb25GaWx0ZXItZW1wbG95ZWUnLCAnLnRleHRGaWx0ZXItZW1wbG95ZWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcudGV4dEZpbHRlci1lbXBsb3llZScpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLUVtcGxveWVlXCIsIFwiL2VtcGxlYWRvc2FjdGl2b3MvRmlsdGVyT3JNb3JlRGF0YVwiLCBcIkVtcGxveVwiLCAnLm9wdGlvbkZpbHRlci1lbXBsb3llZScsICcudGV4dEZpbHRlci1lbXBsb3llZScpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9maWx0cm8gcHJvc3BlY3RvXHJcbiAgICAkKCcub3B0aW9uRmlsdGVyLXByb3NwZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCgnLnRleHRGaWx0ZXInKS52YWwoKSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtRW1wbG95ZWVcIiwgXCIvZW1wbGVhZG9zYWN0aXZvcy9GaWx0ZXJPck1vcmVEYXRhXCIsIFwiQ2FuZGlkYXRlXCIsICcub3B0aW9uRmlsdGVyLXByb3NwZWN0JywgJy50ZXh0RmlsdGVyLXByb3NwZWN0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnRleHRGaWx0ZXItcHJvc3BlY3QnKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBrZXljb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XHJcbiAgICAgICAgaWYgKGtleWNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1FbXBsb3llZVwiLCBcIi9lbXBsZWFkb3NhY3Rpdm9zL0ZpbHRlck9yTW9yZURhdGFcIiwgXCJDYW5kaWRhdGVcIiwgJy5vcHRpb25GaWx0ZXItcHJvc3BlY3QnLCAnLnRleHRGaWx0ZXItcHJvc3BlY3QnKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9maWx0cm8gZGVzdmluY3VsYWRvc1xyXG4gICAgJCgnLm9wdGlvbkZpbHRlcicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQoJy50ZXh0RmlsdGVyJykudmFsKCkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLUVtcGxveWVlXCIsIFwiL2VtcGxlYWRvc2FjdGl2b3MvRmlsdGVyT3JNb3JlRGF0YVwiLCBcIkRpc21pc3NlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcudGV4dEZpbHRlck1hc2snKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBrZXljb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XHJcbiAgICAgICAgaWYgKGtleWNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1FbXBsb3llZVwiLCBcIi9lbXBsZWFkb3NhY3Rpdm9zL0ZpbHRlck9yTW9yZURhdGFcIiwgXCJEaXNtaXNzZWRcIilcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9maWx0cm8gaW5hY3Rpdm9zXHJcbiAgICAkKCcub3B0aW9uRmlsdGVyLWRpc2FibGVkJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcHRpb25GaWx0ZXJGdW5jdGlvbih0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKCQoJy50ZXh0RmlsdGVyJykudmFsKCkgIT0gXCJcIikge1xyXG5cclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1FbXBsb3llZVwiLCBcIi9lbXBsZWFkb3NhY3Rpdm9zL0ZpbHRlck9yTW9yZURhdGFcIiwgXCJEaXNtaXNzZWRcIiwgJy5vcHRpb25GaWx0ZXItZGlzYWJsZWQnLCAnLnRleHRGaWx0ZXItZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcudGV4dEZpbHRlci1kaXNhYmxlZCcpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICB0ZXh0RmlsdGVyTWFza0Z1bmN0aW9uKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1FbXBsb3llZVwiLCBcIi9lbXBsZWFkb3NhY3Rpdm9zL0ZpbHRlck9yTW9yZURhdGFcIiwgXCJEaXNtaXNzZWRcIiwgJy5vcHRpb25GaWx0ZXItZGlzYWJsZWQnLCAnLnRleHRGaWx0ZXItZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9wYWdpbmFjaW9uXHJcbiAgICAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRzY3JvbGwgPSAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICBsZXQgbWF4c2Nyb2xsID0gJChcIi50YmxFbXBsZXllZVwiKS5vdXRlckhlaWdodCh0cnVlKSAtICQoXCIjY29udGVudC1zY3JvbGxcIikub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRzY3JvbGwgPT0gTWF0aC5yb3VuZChtYXhzY3JvbGwpKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKCQoJy50aXRsZS1mb3ItcGFnaW5hdGlvbicpLnRleHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJFbXBsZWFkb3NcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9yZWRhdGEobWF4c2Nyb2xsLCBcImVtcGxlYWRvc2FjdGl2b3NcIiwgXCIudGJvZHktVGFibGUtRW1wbG95ZWVcIiwgXCJFbXBsb3lcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlByb3NwZWN0b3MgYSBlbXBsZWFkb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JlZGF0YShtYXhzY3JvbGwsIFwiZW1wbGVhZG9zYWN0aXZvc1wiLCBcIi50Ym9keS1UYWJsZS1FbXBsb3llZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiRGFkb3MgZGUgYmFqYVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JlZGF0YShtYXhzY3JvbGwsIFwiZW1wbGVhZG9zYWN0aXZvc1wiLCBcIi50Ym9keS1UYWJsZS1FbXBsb3llZVwiLCBcIkRpc21pc3NlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJFbXBsZWFkb3MgaW5hY3Rpdm9zXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcmVkYXRhKG1heHNjcm9sbCwgXCJlbXBsZWFkb3NhY3Rpdm9zXCIsIFwiLnRib2R5LVRhYmxlLUVtcGxveWVlXCIsIFwiaW5hY3Rpdm9zXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vdmVyIGhpc3RvcmlhbCBkZSBlbXBsZWFkb1xyXG4gICAgJCgnLmVtcGxveWVlLWhpc3RvcnknKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBfaWQ6IHN0cmluZztcclxuICAgICAgICBsZXQgX25hbWU6IHN0cmluZztcclxuICAgICAgICB2YXIgY29udGFkb3IgPSAwO1xyXG4gICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICQoXCIuc2VsZWN0RW1wbG95ZWVzW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICAgICAgX2lkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkVtcGxveWVlSWR0YmxcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIF9uYW1lID0gYCR7JCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLk5hbWV0YmxcIikuaHRtbCgpLnRyaW0oKX0gJHskKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuTGFzdE5hbWV0YmxcIikuaHRtbCgpLnRyaW0oKX1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgJChcIi5zZWxlY3RFbXBsb3llZXNbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvaGlzdG9yaWFsZW1wbGVhZG8/ZW1wbG95ZWVpZD0ke19pZH0mbmFtZT0ke19uYW1lfWA7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYWJpbGl0YXIgZG9ibGUgY2xpYyBlbiBmaWxhcyBwYXJhIGVkaXRhclxyXG4gICAgJChkb2N1bWVudCkub24oJ2RibGNsaWNrJywgJy50Ym9keS1UYWJsZS1FbXBsb3llZSAucm93LWFwcCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSB8fCAkKGUudGFyZ2V0KS5pcygnbGFiZWwnKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJvd0lkID0gJCh0aGlzKS5maW5kKCcuRW1wbG95ZWVJZHRibCcpLnRleHQoKS50cmltKCk7XHJcbiAgICAgICAgaWYgKCFyb3dJZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gT2J0ZW5lciBXb3JrU3RhdHVzIGRpbsOhbWljYW1lbnRlIGFsIG1vbWVudG8gZGVsIGNsaWNcclxuICAgICAgICBjb25zdCB3b3JrU3RhdHVzID0gJCgnI1dvcmtTdGF0dXMnKS52YWwoKT8udG9TdHJpbmcoKSB8fCAnMSc7XHJcblxyXG4gICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgL2VtcGxlYWRvc2FjdGl2b3MvJHtyb3dJZH0vJHt3b3JrU3RhdHVzfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogSUVtcGxveWVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmhpcmUtZW1wbG95ZWUtaW5zaWRlJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIE1vc3RyYXJPcGNpb25lcyhcIkVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhkYXRhLCBcIiNjcmVhdGVBbmRFZGl0RW1wbG95ZWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI0FwcGx5Zm9yT3ZlcnRpbWVcIikuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLm9wdGlvbi1leHRyYS1ob3VyXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5vcHRpb24tZXh0cmEtaG91clwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIjSXNGaXhlZFdvcmtDYWxlbmRhclwiKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIub3B0aW9uLXdvcmtjYWxlbmRhcnNcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5jb250LWNhbGVuZGFyLXdvcmtcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLm9wdGlvbi13b3JrY2FsZW5kYXJzXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuY29udC1jYWxlbmRhci13b3JrXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBTZWFyY2hJbWFnZUVtcGxveWUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBmdW50aW9uTmV3RW1wbG95ZWUoXCJvcGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJObyBzZSBlbmNvbnRyw7MgZWwgZW1wbGVhZG9cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBcGxpY2FyIGVzdGlsbyBjbGlja2FibGUgYSBsYXMgZmlsYXNcclxuICAgICQoJy50Ym9keS1UYWJsZS1FbXBsb3llZSAucm93LWFwcCcpLmFkZENsYXNzKCdyb3ctY2xpY2thYmxlJyk7XHJcbn1cclxuXHJcbi8vIEluaWNpYWxpemFyIG1vZGFsIGRlIGF1ZGl0b3LDrWEgY29uIHRpcG8gZGUgZW1wbGVhZG9cclxudmFyIGVtcGxveWVlVHlwZSA9ICQoJyNlbXBsb3llZS1wYWdlJykuZGF0YSgnZW1wbG95ZWUtdHlwZScpIHx8ICdFbXBsZWFkb3MnO1xyXG4kKCcuQXVkaXRJbmZvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgX2lkO1xyXG4gICAgdmFyIGNvbnRhZG9yID0gMDtcclxuICAgICQoXCIuc2VsZWN0RW1wbG95ZWVzW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICBfaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5FbXBsb3llZUlkdGJsJykuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoY29udGFkb3IgPT09IDApIHtcclxuICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8gcGFyYSB2ZXIgbGEgaW5mb3JtYWNpw7NuIGRlIGF1ZGl0b3LDrWEhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb250YWRvciA+IDEpIHtcclxuICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgc29sbyB1biByZWdpc3RybyFcIiwgXCJpbmZvXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9lbXBsZWFkb3NhY3Rpdm9zL2dldGJ5aWQnLFxyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgZGF0YTogeyBJZDogX2lkLCB0eXBlOiBlbXBsb3llZVR5cGUgfSxcclxuICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHNob3dBdWRpdE1vZGFsKGRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiRXJyb3Igb2J0ZW5pZW5kbyBkYXRvcyBkZSBhdWRpdG9yw61hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIpIHtcclxuICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4vLyBFdmVudG8gcGFyYSBlbCBmb3JtdWxhcmlvIGRlIGVkaWNpw7NuXHJcbiQoJy5BdWRpdEluZm9Gb3JtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBzaG93QXVkaXRNb2RhbEZyb21Gb3JtKCk7XHJcbn0pO1xyXG5cclxuIl19