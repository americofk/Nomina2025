/**
 * @file Position.ts
 * @description Módulo de gestión de puestos. Permite crear, editar,
 *              eliminar y listar puestos de trabajo en la organización.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Puestos
 */

variables: {
    var option: number;
}
const fn = {
    //funcion abrir nuevo cargo
    funtionNewPosition: function (_opcion) {
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
            $('.Showid').addClass('collapse');
        }
    },


    //cargar lista de select en formularios 
    loadlistsPosition: function () {
        ListDeparment();
        ListJobs();
    },

    CreateAndEditPosition: function (shouldClose: boolean) {
        $.ajax({
            url: "/puestosactivos/guardar",
            type: "POST",
            data: $("#createAndEditPosition").serialize() + `&operacion=${option}`,
            async: true,
            success: function (data: ResponseUI) {
                $('.progreso').modal('hide');
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
                            $('.tblPuestoActivos').replaceWith($('.tblPuestoActivos', newDom));
                            var newDomOne = $(r);
                            $('#NotifyPositionId').replaceWith($('#NotifyPositionId', newDomOne));
                        });

                    windows_message(data.Message, data.Type);

                        // Si era creacion y se devolvio el ID, cambiar a modo edicion
                        if (option === 1 && data.IdType) {
                            $('#PositionId').val(data.IdType);
                            option = 2;
                            $('.Showid').removeClass('collapse');
                            $('.seteartitulo').text('Editar puesto');
                        }

                    if (shouldClose) {
                        let form = document.getElementById("createAndEditPosition") as HTMLFormElement;
                        form.reset();
                        fn.funtionNewPosition("close");
                    }
                }


            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
}

// Variable para controlar si debe cerrar después de guardar
var shouldCloseAfterSave = false;
escuchadores: {
    //save position
    $("#createAndEditPosition").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            if (option == 2) {
                if ($('#NotifyPositionId').val() == $('#PositionId').val()) {
                    windows_message("¿El puesto al que notifica no puede ser el mismo al que esta editando?", "error");
                    $('#NotifyPositionId').focus();

                } else {
                    fn.CreateAndEditPosition(shouldCloseAfterSave);
                    shouldCloseAfterSave = false;
                }
            } else {
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
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            var contador: boolean = false;
            $(".selectPosition[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "IdPosition");
                    input.attr("class", "IdPosition");
                    input.val($(this).parent().parent().find(".PositionIdtbl").html().trim());
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
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                    $.ajax({
                        url: "/puestosactivos/eliminar",
                        type: "POST",
                        data: $("#DeletePosition").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            $(".IdPosition").remove();
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

            let contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPosition[type=checkbox]").each(function () {


                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "PositionIdpos");
                    input.attr("class", "PositionIdpos");
                    input.val($(this).parent().parent().find(".PositionIdtbl").html().trim());
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
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/puestosactivos/actualizarestatus",
                            type: "POST",
                            data: $("#form-Disebleposition").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".PositionIdpos").remove();

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

            let contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPosition[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "PositionIdpos");
                    input.attr("class", "PositionIdpos");
                    input.val($(this).parent().parent().find(".PositionIdtbl").html().trim());
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
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/puestosinactivos/actualizarestatus",
                            type: "POST",
                            data: $("#form-Enabledposition").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".PositionIdpos").remove();
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
        let form = document.getElementById("createAndEditPosition") as HTMLFormElement;
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

        let id: string;
        var contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectPosition[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                id = $(this).parent().parent().find(".PositionIdtbl").html().trim();
            }

        });

        if (contador === 0) {
            windows_message("!Debe seleccionar un registro!", "error");

        }
        else if (contador > 1) {

            windows_message("Debe seleccionar un solo Registro!!", "error");
        } else {
            $.ajax({

                url: `/puestosactivos/${id}`,
                type: "GET",
                async: true,
                success: function (data: IPosition) {
                    $('.progreso').modal('hide');
                    if (data != null) {
                        option = 2;
                        /*loadlistsPosition();*/
                        $('.Showid').removeClass('collapse');
                        $('.setiartitulo').text('Editar puesto');
                        AutomaticBinding(data, "#createAndEditPosition");
                        fn.funtionNewPosition("open");

                    } else {
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

            let contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPosition[type=checkbox]").each(function () {


                if ($(this).is(":checked")) {

                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "PositionIdIsVacant");
                    input.attr("class", "PositionIdIsVacant");
                    input.val($(this).parent().parent().find(".PositionIdtbl").html().trim());
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
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/puestosactivos/marcarpuestovacante",
                            type: "POST",
                            data: $("#form-IsVacant").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".PositionIdIsVacant").remove();
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
        };
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
    enableRowDoubleClick(
        '.tbody-Table-Position',
        '.PositionIdtbl',
        '/puestosactivos/{id}',
        function (data: IPosition) {
            option = 2;
            AutomaticBinding(data, "#createAndEditPosition");
            $('.Showid').removeClass('collapse');
            $('.setiartitulo').text('Editar puesto');
            fn.funtionNewPosition("open");
        }
    );

    // Inicializar modal de auditoría
    initAuditListPage('.selectPosition', '.PositionIdtbl', '/puestosactivos/getbyid', 'Id');
}

export { }





