$(document).ready(function () {
    if ($('.idemployee-process-payrol').val().toString() != "") {
        $.ajax({

            url: `/empleadosactivos/${$('.idemployee-process-payrol').val().toString()}/${2}`,
            type: "GET",
            async: true,
            success: function (data: IEmployee) {
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
                } else {
                    windows_message("No se encontró el empleado", "error");
                }

            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });
    }
});

variables: {
    var defaultimage: string = "/Images/Dashboard/default_perfil.png";
    var option: number;
}
funciones: {
    //funcion abrir formulario para nuevo empleado
    function funtionNewEmployee(_opcion) {
        if (_opcion == "open") {
            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');
        } else {
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
        }
    }

    function MostrarOpciones(typeview: string) {
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
    function SearchImageEmploye(_IdEmployee: string) {

        $.ajax({
            url: `/empleadosactivos/descargarimagen/${_IdEmployee}`,
            type: "GET",

            async: true,
            success: function (data: ResponseUI) {
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
    function FuntionHireEmployee(call: string, idemploye: string) {
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
                                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                                    $.ajax({

                                        url: "/empleadosactivos/hireemployee",
                                        type: "POST",
                                        data: $("#Form-hire-employee").serialize(),
                                        async: true,
                                        success: function (data: ResponseUI) {
                                            $('.progreso').modal('hide');
                                            if (data.Type == "error") {
                                                FormatErrors(data);
                                            } else {
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
    function FuntionDissmisEmployee(call: string, idemploye: string) {
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
                                    $('.progreso').modal({ backdrop: 'static', keyboard: false })
                                    $.ajax({
                                        url: "/empleadosactivos/dissmisemployee",
                                        type: "POST",
                                        data: $("#Form-dissmis-employee").serialize(),
                                        async: true,
                                        success: function (data: ResponseUI) {
                                            $('.progreso').modal('hide');
                                            if (data.Type == "error") {
                                                FormatErrors(data);
                                            } else {
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
    function SaveEmployeeStatus(_isforDgt: boolean) {
        $('#idEmployeeDesh').val($('#EmployeeId').val().toString());
        $('.progreso').modal({ backdrop: 'static', keyboard: false })
        $.ajax({
            url: "/empleadosactivos/actualizarestatus",
            type: "POST",
            data: $("#form-EmployeeStatus").serialize() + `&optionDesh=1` + `&_isforDgt=${_isforDgt}`,
            async: true,
            success: function (data: ResponseUI) {
                $('.progreso').modal('hide');
                let form = document.getElementById('form-EmployeeStatus') as HTMLFormElement;
                form.reset();
                if (data.Type == "error") {
                    var _errors: string = "";
                    data.Errors.forEach(function (x: string) {
                        _errors += `${x}<br>`;
                    });
                    windows_message(_errors, data.Type);
                } else {
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
    function FindEmployeeId(_id: string) {
        $.ajax({

            url: `/empleadosactivos/${_id}/${$('#WorkStatus').val().toString()}`,
            type: "GET",
            async: true,
            success: function (data: IEmployee) {
                $('.progreso').modal('hide');

                if (data != null) {
                    option = 2;
                    $('.hire-employee-inside').show();
                    MostrarOpciones("Edit");
                    AutomaticBinding(data, "#createAndEditEmployee");
                   
                    if ($("#ApplyforOvertime").is(":checked")) {
                        $(".option-extra-hour").removeClass("collapse");
                    } else {
                        $(".option-extra-hour").addClass("collapse");
                    }

                    if ($("#IsFixedWorkCalendar").is(":checked")) {
                        $(".option-workcalendars").addClass("collapse");
                        $(".cont-calendar-work").removeClass("collapse");
                    } else {
                        $(".option-workcalendars").removeClass("collapse");
                        $(".cont-calendar-work").addClass("collapse");
                    }

                    
                    
                    SearchImageEmploye($('#EmployeeId').val().toString());
                    /*ListCountries(".Countries");*/
                    funtionNewEmployee("open");
                } else {
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
        var contador: number = 0;
        let id: string;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $('.selectEmployees[type=checkbox]').each(function () {
            if ($(this).is(":checked")) {
                contador++;

                id = $(this).parent().parent().find(".EmployeeIdtbl").html().trim();
            }
        });

        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        } else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
        }
        else {
            FuntionHireEmployee(".contenedor-uno-contratar", id);

        }
    });

    $(".hire-dissmis-outside").on("click", function () {
        var contador: number = 0;
        let id: string;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $('.selectEmployees[type=checkbox]').each(function () {
            if ($(this).is(":checked")) {
                contador++;

                id = $(this).parent().parent().find(".EmployeeIdtbl").html().trim();
            }
        });

        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        } else if (contador > 1) {
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
        var contador: number = 0;
        let id: string;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $('.selectEmployees[type=checkbox]').each(function () {
            if ($(this).is(":checked")) {
                contador++;

                id = $(this).parent().parent().find(".EmployeeIdtbl").html().trim();
            }
        });

        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        } else if (contador > 1) {
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
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectEmployees[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
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
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/empleadosactivos/eliminar",
                            type: "POST",
                            data: $("#deleteEmployees").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                if (data.Type == "error") {
                                    var _errors: string = "";
                                    data.Errors.forEach(function (x: string) {
                                        _errors += `${x}<br>`;
                                    });
                                    $(".ObjEmployees").remove();
                                    windows_message(_errors, data.Type);
                                } else {

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
        let _dato = this as HTMLInputElement;
        if (_dato.files != null) {
            let originalform: HTMLFormElement;
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
                success: function (data: ResponseUI) {
                    if (data.Type == "error") {
                        $('.progreso').modal('hide');
                        var _errors: string = "";
                        data.Errors.forEach(function (x: string) {
                            _errors += `${x}<br>`;
                        });
                        windows_message(_errors, data.Type, {
                            onOk: function () {
                                $('.progreso').modal('hide');
                            }

                        });
                    } else {
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
        let form = document.getElementById('createAndEditEmployee') as HTMLFormElement;
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
            $('.progreso').modal({ backdrop: 'static', keyboard: false })
            $.ajax({
                url: "/empleadosactivos/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
                async: true,
                success: function (data: ResponseUI) {
                    if (data.Type == "error") {
                        $('.progreso').modal('hide');
                        var _errors: string = "";
                        data.Errors.forEach(function (x: string) {
                            _errors += `${x}<br>`;
                        });
                        windows_message(_errors, data.Type, {
                            onOk: function () {
                            }
                        });
                        $('.progreso').modal('hide');

                    } else {
                        $('.progreso').modal('hide');
                        windows_message(data.Message, data.Type, {

                        });
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

        let _id: string;
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
        } else {
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


        } else {
            windows_message("¿Desea habilitar el empleado?", "confirm", {
                onOk: function () {
                    $('#idEmployeeDesh').val($('#EmployeeId').val().toString());
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })
                    $.ajax({
                        url: "/empleadosactivos/actualizarestatus",
                        type: "POST",
                        data: $("#form-EmployeeStatus").serialize() + `&optionDesh=2`,
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            let form = document.getElementById('form-EmployeeStatus') as HTMLFormElement;
                            form.reset();
                            if (data.Type == "error") {
                                var _errors: string = "";
                                data.Errors.forEach(function (x: string) {
                                    _errors += `${x}<br>`;
                                });
                                windows_message(_errors, data.Type);
                            } else {
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
            Datafilter(".tbody-Table-Employee", "/empleadosactivos/FilterOrMoreData", "Dismissed")

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

        let _id: string;
        let _name: string;
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
        } else {
            window.location.href = `/historialempleado?employeeid=${_id}&name=${_name}`;

        }

    });

    
}


