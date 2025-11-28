/**
 * @file M_Department.ts
 * @description Módulo de gestión de departamentos. Permite crear, editar,
 *              eliminar y listar departamentos de la organización.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Departamentos
 */

variables: {
    var page = 1;
    var isBusy: boolean = false;
    var option: number;
    var isempty: boolean = false;
}

const fn = {
    //funcion abrir nuevo usuario
    funtionNewDepartment :function (_opcion) {
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
    },

    //moredata :function (_maxscroll: number) {
    //    page++;
    //    isBusy = true;
    //    if (!isempty) {
    //        $.ajax({
    //            url: "/departamentosactivos/FilterOrMoreData?_PageNumber=" + page,
    //            type: "GET",
    //            async: true,
    //            success: function (data) {
    //                if (data != "") {

    //                    $(".tbody-Table-Department").children().last().after(data);
    //                    $("#content-scroll").scrollTop(_maxscroll);
    //                }
    //                else {
    //                    isempty = true;
    //                }
    //                isBusy = false;
    //            }, error: function (xhr) {
    //                redireccionaralLogin(xhr);
    //            }
    //        });

    //    }

        
       
    //},

    helpercreatetable :function (dataTable, properties, classCheck, nameHeader, prefix) {
        var filas = dataTable.length;
        var allnewColumn = "";
        var allnewRow = "";
        var index = 0;

        for (var i = 0; i < filas; i++) {
            allnewRow += "<tr class='row-app'>";
            index++;
            //var idcheck = "check-table-" + index;
            var idcheck = `${prefix}check-table-${index}`;
            var columnCheck = "<td class='cell-app check-cell-app'><input id=" + idcheck + " type='checkbox' class='check-table-app " + classCheck + "'>" +
                "<label for=" + idcheck + " class='label-cell'></label></td>";

            for (var j = 0; j < properties.length; j++) {

                var newColumn = "<td class='cell-app cell-principal " + prefix + properties[j] + "' data-title='" + nameHeader[j] + "'>" + dataTable[i][properties[j]] + "</td>";
                allnewColumn += newColumn;
            }

            allnewRow += columnCheck + allnewColumn + "</tr>";
            allnewColumn = "";
        }

        return allnewRow;
    },

    SettingNewAndEdit :function (type: string) {
        if (type == "Edit") {
            option = 2;
            $('.TituloFormularios').text('Editar departamento');
            $('.Showid').removeClass('collapse');
        }
        else {
            option = 1;
            $('.TituloFormularios').text('Nuevo departamento');
            $('.Showid').addClass('collapse');

            let form = document.getElementById("createAndEditDepartment") as HTMLFormElement;
            form.reset();
        }
    }
}

escuchadores: {
    //cerrar nuevo departamento
    $('.OpCloseform').on('click', function () {
        $('.Showid').addClass('collapse');
        fn.funtionNewDepartment("close");
    });

    //Crear nueva departamento
    $('.NewDepartment').on('click', function () {        
        fn.SettingNewAndEdit("New");
        fn.funtionNewDepartment("open");
    });

    // Variable para controlar si debe cerrar después de guardar
    var shouldCloseAfterSave = false;

    //save departamento
    $("#createAndEditDepartment").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            $.ajax({
                url: "/departamentosactivos/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
                async: true,
                success: function (data: ResponseUI) {
                    $('.progreso').modal('hide');
                    if (data.Type == "error") {
                        FormatErrors(data);
                    } else {
                        windows_message(data.Message, data.Type, {});
                        $.get(location.href)
                            .done(function (r) {
                                var newDom = $(r);
                                $('.tblDepartment').replaceWith($('.tblDepartment', newDom));
                            });
                        if (shouldCloseAfterSave) {
                            fn.funtionNewDepartment("close");
                            shouldCloseAfterSave = false;
                        }
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });

    // Guardar y cerrar
    $('.btnSaveAndClose').on('click', function () {
        shouldCloseAfterSave = true;
        $("#createAndEditDepartment").submit();
    });

    //funcion para editar departamento
    $('.EditDepartment').on('click', function () {
        let _id: string;
        var contador = 0;
        $(".selectDepartment[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".DepartmentIdtbl").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }

        else if (contador > 1) {
            windows_message("¡Debe seleccionar un registro!", "info");
        } else {
            $.ajax({

                url: "/departamentosactivos/getbyid",
                type: "GET",
                data:
                {
                    Id: _id
                },
                async: true,
                success: function (data: IDepartment) {
                    $('.progreso').modal('hide');
                    if (data != null) {
                        AutomaticBinding(data, "#createAndEditDepartment");
                        fn.SettingNewAndEdit("Edit");
                        fn.funtionNewDepartment("open");
                    } else {
                        windows_message("Error buscando datos", "error");
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });

    //eliminar departamento
    $("#deleteDepartment").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectDepartment[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "ListIdDepartment");
                    input.attr("class", "ListIdDepartment");
                    input.val($(this).parent().parent().find(".DepartmentIdtbl").html().trim());
                    $(".deleteDepartment").append(input);
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar al menos un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los departamentos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/departamentosactivos/eliminar",
                            type: "POST",
                            data: $("#deleteDepartment").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                if (data.Type == "error") {
                                    FormatErrors(data);
                                    $(".ListIdDepartment").remove();
                                } else {
                                    $(".ListIdDepartment").remove();
                                    $.get(location.href)
                                        .done(function (r) {
                                            var newDom = $(r);
                                            $('.tblDepartment').replaceWith($('.tblDepartment', newDom));
                                        });
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectDepartment[type=checkbox]").prop('checked', false);
                        $(".ListIdDepartment").remove();
                    }
                });
            }
        }
    });

    //Proceso de detección del movimiento del scroll para aplicar la paginación
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblDepartment").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "departamentosactivos",".tbody-Table-Department");
            }
        }
    });

    //dehabilitar departamento departamento
    $('#DisebleDepartment').on('click', function () {
        if (!$(this).is(":checked")) {
            var ListId = [];
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectDepartment[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "DepartmentId");
                    input.attr("class", "DepartmentId");
                    input.val($(this).parent().parent().find(".DepartmentIdtbl").html().trim());
                    $(".updateStatusDepartment").append(input);

                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#DisebleDepartment").prop('checked', true);
            }
            else {
                windows_message("¿Desea inhabilitar los departamentos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/departamentosactivos/actualizarestatus",
                            type: "POST",
                            data: $("#updateStatusDepartment").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".DepartmentId").remove();
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
                                            $('.tblDepartment').replaceWith($('.tblDepartment', newDom));
                                        });
                                    windows_message(data.Message, data.Type);
                                    $("#DisebleDepartment").prop('checked', true);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectDepartment[type=checkbox]").prop('checked', false);
                        $("#DisebleDepartment").prop('checked', true);
                        $(".DepartmentId").remove();
                    }
                });

            }
        }

    });

    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilterMask').val() != "") {
            Datafilter(".tbody-Table-Department", "/departamentosactivos/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Department", "/departamentosactivos/FilterOrMoreData");

        }
    });

    // Habilitar doble clic en filas para editar
    enableRowDoubleClick(
        '.tbody-Table-Department',
        '.DepartmentIdtbl',
        '/departamentosactivos/getbyid',
        function (data: IDepartment) {
            AutomaticBinding(data, "#createAndEditDepartment");
            fn.SettingNewAndEdit("Edit");
            fn.funtionNewDepartment("open");
        },
        'Id'
    );

    // Inicializar modal de auditoría
    initAuditListPage('.selectDepartment', '.DepartmentIdtbl', '/departamentosactivos/getbyid', 'Id');
}

export { }