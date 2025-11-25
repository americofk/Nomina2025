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
                        if ($(this).valid()) {
                            e.preventDefault();
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
                        if ($(this).valid()) {
                            e.preventDefault();
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
        if ($(this).valid()) {
            e.preventDefault();
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
    //save employee
    $("#createAndEditEmployee").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
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
                        //let form = document.getElementById("createAndEditEmployee") as HTMLFormElement;
                        //form.reset();
                        //funtionNewEmployee("close");
                        if (option == 1)
                            FindEmployeeId(data.IdType);
                        else
                            FindEmployeeId($("#EmployeeId").val().toString());
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wbG95ZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9UeXBlU2NyaXB0RmlsZS9FbXBsb3llZXMvRW1wbG95ZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNkLElBQUksQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7UUFDekQsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUVILEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2pGLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFlO2dCQUM5QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUU3QixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDZixNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUNYLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNsQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3hCLGdCQUFnQixDQUFDLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO29CQUNqRCxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQzt3QkFDeEMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNwRCxDQUFD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RSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pCLFFBQVEsRUFBRSxDQUFDO2dCQUNYLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JFLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQzFJLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2hCLGVBQWUsQ0FBQyxnQ0FBZ0MsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUvRCxDQUFDO2FBQ0ksSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDcEIsZUFBZSxDQUFDLHFDQUFxQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEUsQ0FBQzthQUFNLENBQUM7WUFDSixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxpQ0FBaUMsR0FBRyxTQUFTLEtBQUssRUFBRSxDQUFDO1FBRWhGLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUdQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoJCgnLmlkZW1wbG95ZWUtcHJvY2Vzcy1wYXlyb2wnKS52YWwoKS50b1N0cmluZygpICE9IFwiXCIpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgdXJsOiBgL2VtcGxlYWRvc2FjdGl2b3MvJHskKCcuaWRlbXBsb3llZS1wcm9jZXNzLXBheXJvbCcpLnZhbCgpLnRvU3RyaW5nKCl9LyR7Mn1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IElFbXBsb3llZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuaGlyZS1lbXBsb3llZS1pbnNpZGUnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTW9zdHJhck9wY2lvbmVzKFwiRWRpdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBBdXRvbWF0aWNCaW5kaW5nKGRhdGEsIFwiI2NyZWF0ZUFuZEVkaXRFbXBsb3llZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBTZWFyY2hJbWFnZUVtcGxveWUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJChcIiNBcHBseWZvck92ZXJ0aW1lXCIpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5vcHRpb24tZXh0cmEtaG91clwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmdW50aW9uTmV3RW1wbG95ZWUoXCJvcGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJObyBzZSBlbmNvbnRyw7MgZWwgZW1wbGVhZG9cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhcmlhYmxlczoge1xyXG4gICAgdmFyIGRlZmF1bHRpbWFnZTogc3RyaW5nID0gXCIvSW1hZ2VzL0Rhc2hib2FyZC9kZWZhdWx0X3BlcmZpbC5wbmdcIjtcclxuICAgIHZhciBvcHRpb246IG51bWJlcjtcclxufVxyXG5mdW5jaW9uZXM6IHtcclxuICAgIC8vZnVuY2lvbiBhYnJpciBmb3JtdWxhcmlvIHBhcmEgbnVldm8gZW1wbGVhZG9cclxuICAgIGZ1bmN0aW9uIGZ1bnRpb25OZXdFbXBsb3llZShfb3BjaW9uKSB7XHJcbiAgICAgICAgaWYgKF9vcGNpb24gPT0gXCJvcGVuXCIpIHtcclxuICAgICAgICAgICAgJCgnLkNvbnRlbmVkb3JMaXN0RW50aXR5JykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5jb250TmV3RW50eXRpJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlRm9ybScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gTW9zdHJhck9wY2lvbmVzKHR5cGV2aWV3OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodHlwZXZpZXcgPT0gXCJFZGl0XCIpIHtcclxuICAgICAgICAgICAgJCgnLlNob3dpZCcpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udEltcHV0RGF0b3NQZXJzb25hbGVzRm90bycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udGVuc3RhdHVzRW1wbG95ZScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3B0aW9uZm9ybScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuVGl0bGVFbXBsb3llJykudGV4dCgnRWRpdGFyIGVtcGxlYWRvJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgJCgnLlNob3dpZCcpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udEltcHV0RGF0b3NQZXJzb25hbGVzRm90bycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udGVuc3RhdHVzRW1wbG95ZScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3B0aW9uZm9ybScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuVGl0bGVFbXBsb3llJykudGV4dCgnTnVldm8gZW1wbGVhZG8nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9idXNjYXIgaW1hZ2VuIGRlIGVtcGxlYWRvXHJcbiAgICBmdW5jdGlvbiBTZWFyY2hJbWFnZUVtcGxveWUoX0lkRW1wbG95ZWU6IHN0cmluZykge1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAvZW1wbGVhZG9zYWN0aXZvcy9kZXNjYXJnYXJpbWFnZW4vJHtfSWRFbXBsb3llZX1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG5cclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5NZXNzYWdlICE9IG51bGwgJiYgZGF0YS5NZXNzYWdlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0ZvdG9wZXJmaWxFUFwiKS5hdHRyKFwic3JjXCIsIGRhdGEuTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0ZvdG9wZXJmaWxFUFwiKS5hdHRyKFwic3JjXCIsIGRlZmF1bHRpbWFnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9mdW5jaW9uIHBhcmEgYnVzY2FyIGZvcm11bGFyaW8gZGUgY29udHJhdGFyXHJcbiAgICBmdW5jdGlvbiBGdW50aW9uSGlyZUVtcGxveWVlKGNhbGw6IHN0cmluZywgaWRlbXBsb3llOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6ICdlbXBsZWFkb3NhY3Rpdm9zL0Zvcm1IaXJlRW1wbG95ZWUnLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGNhbGwpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoY2FsbCkuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoY2FsbCkucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnRyYXRhciBlbXBsZWFkbyBwcm9zcGVjdG9cclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0Zvcm0taGlyZS1lbXBsb3llZVwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBjb250cmF0YXIgcHJvc3BlY3RvIHNlbGVjY2lvbmFkbz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9lbXBsZWFkb3NhY3Rpdm9zL2hpcmVlbXBsb3llZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0Zvcm0taGlyZS1lbXBsb3llZVwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGNhbGwpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZ2V0KGxvY2F0aW9uLmhyZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy50YmxFbXBsZXllZScpLnJlcGxhY2VXaXRoKCQoJy50YmxFbXBsZXllZScsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0NlcnJhciBmb3JtdWxhcmlvIGRlIGNvbnRyYXRhclxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuYnRuY2FuY2VsYXItaGlyZS1lbXBsb3llZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChjYWxsKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLkVtcGxveWVlSWRoaXJlXCIpLnZhbChpZGVtcGxveWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1BsdWdpbiBkZSBmZWNoYVxyXG4gICAgICAgICAgICAgICAgICAgIEluc3RhY2lhdGVMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vZnVuY2lvbiBwYXJhIGJ1c2NhciBmb3JtdWxhcmlvIHBhcmEgZGVzdmluY3VsYXIgZW1wbGVhZG9cclxuICAgIGZ1bmN0aW9uIEZ1bnRpb25EaXNzbWlzRW1wbG95ZWUoY2FsbDogc3RyaW5nLCBpZGVtcGxveWU6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJ2VtcGxlYWRvc2FjdGl2b3MvRm9ybWRpc3NtaXNFbXBsb3llZScsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoY2FsbCkuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjYWxsKS5hcHBlbmQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjYWxsKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29udHJhdGFyIGVtcGxlYWRvIHByb3NwZWN0b1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjRm9ybS1kaXNzbWlzLWVtcGxveWVlXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGRlc3ZpbmN1bGFyIGFsIGVtcGxlYWRvIHNlbGVjY2lvbmFkbz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvZW1wbGVhZG9zYWN0aXZvcy9kaXNzbWlzZW1wbG95ZWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNGb3JtLWRpc3NtaXMtZW1wbG95ZWVcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChjYWxsKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsRW1wbGV5ZWUnKS5yZXBsYWNlV2l0aCgkKCcudGJsRW1wbGV5ZWUnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9DZXJyYXIgZm9ybXVsYXJpbyBkZSBjb250cmF0YXJcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmJ0bmNhbmNlbGFyLWRpc3NtaXMtZW1wbG95ZWVcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY2FsbCkuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5FbXBsb3llZUlkZGlzc21pc1wiKS52YWwoaWRlbXBsb3llKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9QbHVnaW4gZGUgZmVjaGFcclxuICAgICAgICAgICAgICAgICAgICBJbnN0YWNpYXRlTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL2Z1bmNpb24gcGFyYSBkZXNoYWJpbGl0YXIgZW1wbGVhZG9cclxuICAgIGZ1bmN0aW9uIFNhdmVFbXBsb3llZVN0YXR1cyhfaXNmb3JEZ3Q6IGJvb2xlYW4pIHtcclxuICAgICAgICAkKCcjaWRFbXBsb3llZURlc2gnKS52YWwoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9lbXBsZWFkb3NhY3Rpdm9zL2FjdHVhbGl6YXJlc3RhdHVzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiAkKFwiI2Zvcm0tRW1wbG95ZWVTdGF0dXNcIikuc2VyaWFsaXplKCkgKyBgJm9wdGlvbkRlc2g9MWAgKyBgJl9pc2ZvckRndD0ke19pc2ZvckRndH1gLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLUVtcGxveWVlU3RhdHVzJykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsRW1wbGV5ZWUnKS5yZXBsYWNlV2l0aCgkKCcudGJsRW1wbGV5ZWUnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVudGlvbk5ld0VtcGxveWVlKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy9mdW5jaW9uIHNpIGRlc2VhIGRlc2hhYmlsaXRhciBhbCBlbXBsZWFkb1xyXG4gICAgLy9mdW5jdGlvbiBEaXNhYmxlRW1wbG95ZWUoKSB7XHJcbiAgICAvLyAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGd1YXJkYXIgY2FtYmlvIHBhcmEgZWwgREdUP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgLy8gICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgIFNhdmVFbXBsb3llZVN0YXR1cyh0cnVlKTtcclxuICAgIC8vICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICBTYXZlRW1wbG95ZWVTdGF0dXMoZmFsc2UpO1xyXG4gICAgLy8gICAgICAgIH1cclxuXHJcbiAgICAvLyAgICB9LCB7IE9rOiBcIlNpXCIsIENhbmNlbDogXCJOb1wiIH0pO1xyXG4gICAgLy99XHJcblxyXG4gICAgLy9mdW5jaW9uIHBhcmEgYnVzY2FyIGRhdG9zIGRlbCBlbXBsZWFkbyBhbCBlZGl0YXJcclxuICAgIGZ1bmN0aW9uIEZpbmRFbXBsb3llZUlkKF9pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgIHVybDogYC9lbXBsZWFkb3NhY3Rpdm9zLyR7X2lkfS8keyQoJyNXb3JrU3RhdHVzJykudmFsKCkudG9TdHJpbmcoKX1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IElFbXBsb3llZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuaGlyZS1lbXBsb3llZS1pbnNpZGUnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTW9zdHJhck9wY2lvbmVzKFwiRWRpdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBBdXRvbWF0aWNCaW5kaW5nKGRhdGEsIFwiI2NyZWF0ZUFuZEVkaXRFbXBsb3llZVwiKTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKFwiI0FwcGx5Zm9yT3ZlcnRpbWVcIikuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLm9wdGlvbi1leHRyYS1ob3VyXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5vcHRpb24tZXh0cmEtaG91clwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIjSXNGaXhlZFdvcmtDYWxlbmRhclwiKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIub3B0aW9uLXdvcmtjYWxlbmRhcnNcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5jb250LWNhbGVuZGFyLXdvcmtcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLm9wdGlvbi13b3JrY2FsZW5kYXJzXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuY29udC1jYWxlbmRhci13b3JrXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBTZWFyY2hJbWFnZUVtcGxveWUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAvKkxpc3RDb3VudHJpZXMoXCIuQ291bnRyaWVzXCIpOyovXHJcbiAgICAgICAgICAgICAgICAgICAgZnVudGlvbk5ld0VtcGxveWVlKFwib3BlblwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiTm8gc2UgZW5jb250csOzIGVsIGVtcGxlYWRvXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuZXNjdWNoYWRvcmVzOiB7XHJcbiAgICAvL01vc3RyYXIgZm9ybXVsYXJpbyBkZSBjb250cmF0YXJcclxuICAgICQoXCIuaGlyZS1lbXBsb3llZS1vdXRzaWRlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb250YWRvcjogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZztcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKCcuc2VsZWN0RW1wbG95ZWVzW3R5cGU9Y2hlY2tib3hdJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIEZ1bnRpb25IaXJlRW1wbG95ZWUoXCIuY29udGVuZWRvci11bm8tY29udHJhdGFyXCIsIGlkKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5oaXJlLWRpc3NtaXMtb3V0c2lkZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29udGFkb3I6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IGlkOiBzdHJpbmc7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJCgnLnNlbGVjdEVtcGxveWVlc1t0eXBlPWNoZWNrYm94XScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkVtcGxveWVlSWR0YmxcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY29udGFkb3IgPT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb250YWRvciA+IDEpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHNvbG8gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBGdW50aW9uSGlyZUVtcGxveWVlKFwiLmNvbnRlbmVkb3ItZGVzdmluY3VsYWRvcy1jb250cmF0YXJcIiwgaWQpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmhpcmUtZW1wbG95ZWUtaW5zaWRlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBGdW50aW9uSGlyZUVtcGxveWVlKFwiLmNvbnRlbmVkb3ItZG9zLWNvbnRyYXRhclwiLCAkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9Nb3N0cmFyIGZvcm11bGFyaW8gcGFyYSBkZXN2aW5jdWxhciBlbXBsZWFkb3NcclxuICAgICQoXCIuZGlzc21pcy1lbXBsb3llZS1vdXRzaWRlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb250YWRvcjogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZztcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKCcuc2VsZWN0RW1wbG95ZWVzW3R5cGU9Y2hlY2tib3hdJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIEZ1bnRpb25EaXNzbWlzRW1wbG95ZWUoXCIuY29udGVuZWRvci11bm8tY29udHJhdGFyXCIsIGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmRpc3NtaXMtZW1wbG95ZWUtaW5zaWRlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEZ1bnRpb25EaXNzbWlzRW1wbG95ZWUoXCIuY29udGVuZWRvci1kb3MtY29udHJhdGFyXCIsICQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VsaW1pbmFyIGVtcGxlYWRvXHJcbiAgICAkKFwiI2RlbGV0ZUVtcGxveWVlc1wiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdEVtcGxveWVlc1t0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcIk9iakVtcGxveWVlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJPYmpFbXBsb3llZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5FbXBsb3llZUlkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuZGVsZXRlRW1wbG95ZWVzXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIFJlZ2lzdHJvISFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGVtcGxlYWRvcyBzZWxlY2Npb25hZG9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL2VtcGxlYWRvc2FjdGl2b3MvZWxpbWluYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNkZWxldGVFbXBsb3llZXNcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLk9iakVtcGxveWVlc1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuT2JqRW1wbG95ZWVzXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsRW1wbGV5ZWUnKS5yZXBsYWNlV2l0aCgkKCcudGJsRW1wbGV5ZWUnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0QWRkcmVzW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuT2JqRW1wbG95ZWVzXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vY2FyZ2FyIGZvdG8gZGUgZW1wbGVhZG9cclxuICAgICQoXCIuSW1hZ2VcIikuY2hhbmdlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IF9kYXRvID0gdGhpcyBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgIGlmIChfZGF0by5maWxlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbGZvcm06IEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgb3JpZ2luYWxmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlLWVtcGxveWVlc2ltYWdlcy1mb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFmb3JtID0gbmV3IEZvcm1EYXRhKG9yaWdpbmFsZm9ybSk7XHJcbiAgICAgICAgICAgIGRhdGFmb3JtLmFwcGVuZChcIklkRW1wbGV5ZWVcIiwgJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL2VtcGxlYWRvc2FjdGl2b3MvY2FyZ2FyaW1hZ2VuXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFmb3JtLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNGb3RvcGVyZmlsRVBcIikuYXR0cihcInNyY1wiLCBkYXRhLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9mb3JtYXRpYXIgY2FtcG8gbm9tYnJlIGRlbCBlbXBsZWFkb1xyXG5cclxuICAgICQoXCIjTmFtZVwiKS5jaGFuZ2UoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkKHRoaXMpLnZhbChGaXJ0c2NhcGl0YWxsZXR0ZXIoJCh0aGlzKS52YWwoKS50b1N0cmluZygpKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI0xhc3ROYW1lXCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQodGhpcykudmFsKEZpcnRzY2FwaXRhbGxldHRlcigkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCkpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjQmlydGhEYXRlXCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQoXCIjQWdlXCIpLnZhbChjYWxjdWxhckVkYWQoJCh0aGlzKS52YWwoKSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNDb3VudHJ5XCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBOYWNpb25hbGl0aSA9ICQoJyNDb3VudHJ5IG9wdGlvbjpzZWxlY3RlZCcpLnRleHQoKS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgJChcIiNOYXRpb25hbGl0eVwiKS52YWwoTmFjaW9uYWxpdGlbMV0udHJpbSgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYWJyaXIgbnVldm8gZW1wbGVhZG9cclxuICAgICQoJy5OZXdFbXBsZXllZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGVBbmRFZGl0RW1wbG95ZWUnKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICQoJy5oaXJlLWVtcGxveWVlLWluc2lkZScpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgb3B0aW9uID0gMTtcclxuICAgICAgICAkKCcubWFyZ2VuRm9ybW11bGFyaW9zJykucmVtb3ZlQ2xhc3MoJ0NvbnRlbmVkb3JOZXdlbXBsb3llLXR3bycpO1xyXG4gICAgICAgICQoJy5tYXJnZW5Gb3JtbXVsYXJpb3MnKS5hZGRDbGFzcygnY2xhc2R5bmFtaWNzZm9yY29udGVuZW1wbG95ZScpO1xyXG4gICAgICAgIC8qICBMaXN0Q291bnRyaWVzKFwiLkNvdW50cmllc1wiKTsqL1xyXG4gICAgICAgIGZ1bnRpb25OZXdFbXBsb3llZShcIm9wZW5cIik7XHJcbiAgICAgICAgTW9zdHJhck9wY2lvbmVzKFwiTmV3XCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9zYXZlIGVtcGxveWVlXHJcbiAgICAkKFwiI2NyZWF0ZUFuZEVkaXRFbXBsb3llZVwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9lbXBsZWFkb3NhY3Rpdm9zL2d1YXJkYXJcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSArIGAmb3BlcmFjaW9uPSR7b3B0aW9ufWAsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlLCB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRib2R5LVRhYmxlLUVtcGxveWVlJykucmVwbGFjZVdpdGgoJCgnLnRib2R5LVRhYmxlLUVtcGxveWVlJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlQW5kRWRpdEVtcGxveWVlXCIpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZnVudGlvbk5ld0VtcGxveWVlKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZpbmRFbXBsb3llZUlkKGRhdGEuSWRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRmluZEVtcGxveWVlSWQoJChcIiNFbXBsb3llZUlkXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vZnVuY2lvbiBwYXJhIGVkaXRhciBlbXBsb3llXHJcbiAgICAkKCcuRWRpdEVtcGxveWVlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yID0gMDtcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKFwiLnNlbGVjdEVtcGxveWVlc1t0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIF9pZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5FbXBsb3llZUlkdGJsXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09IDApIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBzb2xvIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdEVtcGxveWVlc1t0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEZpbmRFbXBsb3llZUlkKF9pZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2NlcnJhciBudWV2byBlbXBsZWFkb3NcclxuICAgICQoJy5PcENsb3NlZm9ybScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcuU2hvd2lkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgJCgnLm1hcmdlbkZvcm1tdWxhcmlvcycpLmFkZENsYXNzKCdDb250ZW5lZG9yTmV3ZW1wbG95ZScpO1xyXG4gICAgICAgICQoJy5tYXJnZW5Gb3JtbXVsYXJpb3MnKS5yZW1vdmVDbGFzcygnY2xhc2R5bmFtaWNzZm9yY29udGVuZW1wbG95ZScpO1xyXG4gICAgICAgIGZ1bnRpb25OZXdFbXBsb3llZShcImNsb3NlXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9kZXNoYWJpbGl0YXJcclxuICAgICQoJyNFbXBsb3llZVN0YXR1cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoISQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG5cclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBJbmhhYmlsaXRhciBlbCBlbXBsZWFkbz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZUVtcGxveWVlU3RhdHVzKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjRW1wbG95ZWVTdGF0dXNcIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGhhYmlsaXRhciBlbCBlbXBsZWFkbz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjaWRFbXBsb3llZURlc2gnKS52YWwoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9lbXBsZWFkb3NhY3Rpdm9zL2FjdHVhbGl6YXJlc3RhdHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI2Zvcm0tRW1wbG95ZWVTdGF0dXNcIikuc2VyaWFsaXplKCkgKyBgJm9wdGlvbkRlc2g9MmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tRW1wbG95ZWVTdGF0dXMnKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZ2V0KGxvY2F0aW9uLmhyZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy50YmxFbXBsZXllZScpLnJlcGxhY2VXaXRoKCQoJy50YmxFbXBsZXllZScsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW50aW9uTmV3RW1wbG95ZWUoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0VtcGxveWVlU3RhdHVzXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vZW1wbG95ZSBpbmFjdGl2b3NcclxuICAgICQoJy5FbXBsb3llZS1EaXNhYmxlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2VtcGxlYWRvc2FjdGl2b3MvaW5hY3Rpdm9cIjtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vY2VycmFyXHJcbiAgICAkKCcuY2xvc2UtZW1wbG95ZWUtZGlzYWJsZWQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9lbXBsZWFkb3NhY3Rpdm9zXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2ZpbHRybyBlbXBsb3llZVxyXG4gICAgJCgnLm9wdGlvbkZpbHRlci1lbXBsb3llZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQoJy50ZXh0RmlsdGVyJykudmFsKCkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLUVtcGxveWVlXCIsIFwiL2VtcGxlYWRvc2FjdGl2b3MvRmlsdGVyT3JNb3JlRGF0YVwiLCBcIkVtcGxveVwiLCAnLm9wdGlvbkZpbHRlci1lbXBsb3llZScsICcudGV4dEZpbHRlci1lbXBsb3llZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy50ZXh0RmlsdGVyLWVtcGxveWVlJykub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIga2V5Y29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG4gICAgICAgIGlmIChrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtRW1wbG95ZWVcIiwgXCIvZW1wbGVhZG9zYWN0aXZvcy9GaWx0ZXJPck1vcmVEYXRhXCIsIFwiRW1wbG95XCIsICcub3B0aW9uRmlsdGVyLWVtcGxveWVlJywgJy50ZXh0RmlsdGVyLWVtcGxveWVlJyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL2ZpbHRybyBwcm9zcGVjdG9cclxuICAgICQoJy5vcHRpb25GaWx0ZXItcHJvc3BlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKCcudGV4dEZpbHRlcicpLnZhbCgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1FbXBsb3llZVwiLCBcIi9lbXBsZWFkb3NhY3Rpdm9zL0ZpbHRlck9yTW9yZURhdGFcIiwgXCJDYW5kaWRhdGVcIiwgJy5vcHRpb25GaWx0ZXItcHJvc3BlY3QnLCAnLnRleHRGaWx0ZXItcHJvc3BlY3QnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcudGV4dEZpbHRlci1wcm9zcGVjdCcpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLUVtcGxveWVlXCIsIFwiL2VtcGxlYWRvc2FjdGl2b3MvRmlsdGVyT3JNb3JlRGF0YVwiLCBcIkNhbmRpZGF0ZVwiLCAnLm9wdGlvbkZpbHRlci1wcm9zcGVjdCcsICcudGV4dEZpbHRlci1wcm9zcGVjdCcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2ZpbHRybyBkZXN2aW5jdWxhZG9zXHJcbiAgICAkKCcub3B0aW9uRmlsdGVyJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCgnLnRleHRGaWx0ZXInKS52YWwoKSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtRW1wbG95ZWVcIiwgXCIvZW1wbGVhZG9zYWN0aXZvcy9GaWx0ZXJPck1vcmVEYXRhXCIsIFwiRGlzbWlzc2VkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy50ZXh0RmlsdGVyTWFzaycpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLUVtcGxveWVlXCIsIFwiL2VtcGxlYWRvc2FjdGl2b3MvRmlsdGVyT3JNb3JlRGF0YVwiLCBcIkRpc21pc3NlZFwiKVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2ZpbHRybyBpbmFjdGl2b3NcclxuICAgICQoJy5vcHRpb25GaWx0ZXItZGlzYWJsZWQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbkZpbHRlckZ1bmN0aW9uKHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAoJCgnLnRleHRGaWx0ZXInKS52YWwoKSAhPSBcIlwiKSB7XHJcblxyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLUVtcGxveWVlXCIsIFwiL2VtcGxlYWRvc2FjdGl2b3MvRmlsdGVyT3JNb3JlRGF0YVwiLCBcIkRpc21pc3NlZFwiLCAnLm9wdGlvbkZpbHRlci1kaXNhYmxlZCcsICcudGV4dEZpbHRlci1kaXNhYmxlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy50ZXh0RmlsdGVyLWRpc2FibGVkJykub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIga2V5Y29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG4gICAgICAgIGlmIChrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgIHRleHRGaWx0ZXJNYXNrRnVuY3Rpb24odGhpcyk7XHJcblxyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLUVtcGxveWVlXCIsIFwiL2VtcGxlYWRvc2FjdGl2b3MvRmlsdGVyT3JNb3JlRGF0YVwiLCBcIkRpc21pc3NlZFwiLCAnLm9wdGlvbkZpbHRlci1kaXNhYmxlZCcsICcudGV4dEZpbHRlci1kaXNhYmxlZCcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3BhZ2luYWNpb25cclxuICAgICQoXCIjY29udGVudC1zY3JvbGxcIikuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgY3VycmVudHNjcm9sbCA9ICQoXCIjY29udGVudC1zY3JvbGxcIikuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgIGxldCBtYXhzY3JvbGwgPSAkKFwiLnRibEVtcGxleWVlXCIpLm91dGVySGVpZ2h0KHRydWUpIC0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBpZiAoY3VycmVudHNjcm9sbCA9PSBNYXRoLnJvdW5kKG1heHNjcm9sbCkpIHtcclxuICAgICAgICAgICAgaWYgKCFpc0J1c3kpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoJCgnLnRpdGxlLWZvci1wYWdpbmF0aW9uJykudGV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkVtcGxlYWRvc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JlZGF0YShtYXhzY3JvbGwsIFwiZW1wbGVhZG9zYWN0aXZvc1wiLCBcIi50Ym9keS1UYWJsZS1FbXBsb3llZVwiLCBcIkVtcGxveVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiUHJvc3BlY3RvcyBhIGVtcGxlYWRvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcmVkYXRhKG1heHNjcm9sbCwgXCJlbXBsZWFkb3NhY3Rpdm9zXCIsIFwiLnRib2R5LVRhYmxlLUVtcGxveWVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJEYWRvcyBkZSBiYWphXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcmVkYXRhKG1heHNjcm9sbCwgXCJlbXBsZWFkb3NhY3Rpdm9zXCIsIFwiLnRib2R5LVRhYmxlLUVtcGxveWVlXCIsIFwiRGlzbWlzc2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkVtcGxlYWRvcyBpbmFjdGl2b3NcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9yZWRhdGEobWF4c2Nyb2xsLCBcImVtcGxlYWRvc2FjdGl2b3NcIiwgXCIudGJvZHktVGFibGUtRW1wbG95ZWVcIiwgXCJpbmFjdGl2b3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy92ZXIgaGlzdG9yaWFsIGRlIGVtcGxlYWRvXHJcbiAgICAkKCcuZW1wbG95ZWUtaGlzdG9yeScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IF9pZDogc3RyaW5nO1xyXG4gICAgICAgIGxldCBfbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHZhciBjb250YWRvciA9IDA7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChcIi5zZWxlY3RFbXBsb3llZXNbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcbiAgICAgICAgICAgICAgICBfaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRW1wbG95ZWVJZHRibFwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgX25hbWUgPSBgJHskKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuTmFtZXRibFwiKS5odG1sKCkudHJpbSgpfSAkeyQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5MYXN0TmFtZXRibFwiKS5odG1sKCkudHJpbSgpfWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09IDApIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBzb2xvIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdEVtcGxveWVlc1t0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9oaXN0b3JpYWxlbXBsZWFkbz9lbXBsb3llZWlkPSR7X2lkfSZuYW1lPSR7X25hbWV9YDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG59XHJcblxyXG5cclxuIl19