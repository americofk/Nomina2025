/**
 * @file Jobs.ts
 * @description Módulo de gestión de cargos activos. Permite crear, editar,
 *              eliminar, inhabilitar y listar cargos de la organización.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Cargos
 */

variables: {
    var option: number;
}


escuchadores: {
    //cerrar nuevo  cargo
    $('.OpCloseform').on('click', function () {
        funtionNewJob("close");
    });

    //Crear nuevo  cargo
    $('.NewJob').on('click', function () {
        option = 1;
        let form = document.getElementById("createAndEditJobs") as HTMLFormElement;
        form.reset();
        $('.Showid').addClass('collapse');
        $('.seteartitulo').text('Nuevo cargo');
        funtionNewJob("open");
    });

    // Variable para controlar si debe cerrar después de guardar
    var shouldCloseAfterSave = false;

    //save cargo
    $("#createAndEditJobs").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            $('.progreso').modal({ backdrop: 'static', keyboard: false })

            $.ajax({
                url: "/cargosactivos/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
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
                                $('.tblCargosActivos').replaceWith($('.tblCargosActivos', newDom));
                            });
                        windows_message(data.Message, data.Type);
                        if (shouldCloseAfterSave) {
                            let form = document.getElementById("createAndEditJobs") as HTMLFormElement;
                            form.reset();
                            funtionNewJob("close");
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
        $("#createAndEditJobs").submit();
    });

    //eliminar cargo
    $("#DeleteJobs").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            $(".selectJobs[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "IdJobs");
                    input.attr("class", "IdJobs");
                    input.val($(this).parent().parent().find(".JobIdtblpos").html().trim());
                    $(".DeleteJobs").append(input);

                }

            });
        }
        if (!contador) {
            windows_message("Debe seleccionar un Registro!!", "error");

        }
        else {
            windows_message("¿Desea eliminar los cargos seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                    $.ajax({
                        url: "/cargosactivos/eliminar",
                        type: "POST",
                        data: $("#DeleteJobs").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                var _errors: string = "";
                                data.Errors.forEach(function (x: string) {
                                    _errors += `${x}<br>`;
                                });
                                $(".IdJobs").remove();
                                windows_message(_errors, data.Type);
                            } else {

                                $(".IdJobs").remove();
                                $.get(location.href)
                                    .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblCargosActivos').replaceWith($('.tblCargosActivos', newDom));
                                    });
                                windows_message(data.Message, data.Type);
                            }

                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }

                    });
                },
                onCancel: function () {
                    $(".selectJobs[type=checkbox]").prop('checked', false);
                    $(".IdJobs").remove();
                }
            });

        }

    });

    //editar un cargo
    $('.EditJob').on('click', function () {

        let Id: string;
        var contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectJobs[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                Id = $(this).parent().parent().find(".JobIdtblpos").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");

        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
        } else {
            $.ajax({

                url: `/cargosactivos/${Id}`,
                type: "GET",
                async: true,
                success: function (data: IJob) {
                    $('.progreso').modal('hide');
                    if (data != null) {
                        option = 2;
                        $('.Showid').removeClass('collapse');
                        $('.seteartitulo').text('Editar cargo');
                        AutomaticBinding(data, "#createAndEditJobs");
                        funtionNewJob("open");

                    } else {
                        windows_message("No se encontró el cargo", "error");
                    }

                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }

            });


        }

    });

    //dehabilitar cargo
    $('#Diseblejob').on('click', function () {
        if (!$(this).is(":checked")) {

            let contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectJobs[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "JobIdpos");
                    input.attr("class", "JobIdpos");
                    input.val($(this).parent().parent().find(".JobIdtblpos").html().trim());
                    $(".form-Diseblejob").append(input);
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#Diseblejob").prop('checked', true);
            }
            else {
                windows_message("¿Desea inhabilitar los cargos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/cargosactivos/actualizarestatus",
                            type: "POST",
                            data: $("#form-Diseblejob").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".JobIdpos").remove();
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
                                    $("#Diseblejob").prop('checked', true);
                                    windows_message(data.Message, data.Type);
                                   
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".selectJobs[type=checkbox]").prop('checked', false);
                        $("#Diseblejob").prop('checked', true);
                        $(".JobIdpos").remove();

                    }
                });

            }
        }

    });

    //ir a cargos inactivos
    $('.JobDisebled').on('click', function () {
        window.location.href = "/cargosinactivos";

    });

    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-job", "/cargosactivos/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-job", "/cargosactivos/FilterOrMoreData");

        }
    });

    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblCargosActivos").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "cargosactivos", ".tbody-Table-job");

            }
        }
    });

    // Habilitar doble clic en filas para editar
    enableRowDoubleClick(
        '.tbody-Table-job',
        '.JobIdtblpos',
        '/cargosactivos/{id}',
        function (data: IJob) {
            option = 2;
            AutomaticBinding(data, "#createAndEditJobs");
            $('.Showid').removeClass('collapse');
            $('.seteartitulo').text('Editar cargo');
            funtionNewJob("open");
        }
    );

    // Inicializar modal de auditoría
    initAuditListPage('.selectJobs', '.JobIdtblpos', '/cargosactivos/getbyid', 'Id');
}

funciones: {
    //funcion abrir nuevo cargo
    function funtionNewJob(_opcion: string) {
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
    }
}



