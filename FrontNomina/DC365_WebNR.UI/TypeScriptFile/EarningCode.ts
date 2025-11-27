/**
 * @file EarningCode.ts
 * @description Módulo de gestión de códigos de ganancia. Permite crear, editar,
 *              eliminar y administrar los conceptos de ingresos en nómina.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module CodigosGanancia
 */

variables: {
    var option: number;
}

const fn = {
    //funcion abrir formulario para nuevo codigo dee ganancia
    funtionNewEarningCode: function (_opcion) {
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
    SaveEarningCode: function (_isversion: boolean) {
        $('.progreso').modal({ backdrop: 'static', keyboard: false })
        $.ajax({
            url: "/codigosganancias/guardar",
            type: "POST",
            data: $('#NewAndEditEarningCode').serialize() + `&operacion=${option}`+ `&isversion=${_isversion}`,
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
                            $('.tblEarningCode').replaceWith($('.tblEarningCode', newDom));
                        });

                    fn.funtionNewEarningCode("close");
                    windows_message(data.Message, data.Type);

                }


            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
}

escuchadores: {
    //eliminar
    $("#DeleteEarningCode").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectEarningCode[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "EarningCodeId");
                    input.attr("class", "EarningCodeId");
                    input.val($(this).parent().parent().find(".EarningCodeIdtbl").html().trim());
                    $(".DeleteEarningCode").append(input);

                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");

            }
            else {
                windows_message("¿Desea eliminar los códigos de ingreso seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/codigosganancias/eliminar",
                            type: "POST",
                            data: $("#DeleteEarningCode").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".EarningCodeId").remove();
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
                                            $('.tblEarningCode').replaceWith($('.tblEarningCode', newDom));
                                        });
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".selectEarningCode[type=checkbox]").prop('checked', false);
                        $(".EarningCodeId").remove();

                    }
                });//, {Ok: "Si", Cancel: "No"}

            }
        }
    });

    //abrir nuevo
    $('.NewEarningCode').on('click', function () {
        let form = document.getElementById("NewAndEditEarningCode") as HTMLFormElement;
        form.reset();
        option = 1;
        $('.Showid').addClass('collapse');
        $('.seteartitulo').text('Nuevo código de ingreso');
        fn.funtionNewEarningCode("open");
    });

    //save
    $("#NewAndEditEarningCode").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            if (option==2) {
                windows_message("¿Desea crear una nueva versión de código de ingreso?", "confirm", {
                    onOk: function () {
                        fn.SaveEarningCode(true);
                    },
                    onCancel: function () {
                        fn.SaveEarningCode(false);
                    }

                }, { Ok: "Si", Cancel: "No" });
            } else {
                fn.SaveEarningCode(false);
            }
        }
    });

    //editar
    $('.EditEarningCode').on('click', function () {

        let _id: string;
        var contador = 0;
        $(".selectEarningCode[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".EarningCodeIdtbl").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");

        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo Registro!", "info");
        } else {
            $.ajax({

                url: `/codigosganancias/${_id}`,
                type: "GET",
                async: true,
                success: function (data: IEarningCode) {
                    if (data != null) {
                        option = 2;
                        AutomaticBinding(data, "#NewAndEditEarningCode");
                        $('.seteartitulo').text('Editar código de ingreso');
                        $('.Showid').removeClass('collapse');
                        fn.funtionNewEarningCode("open");

                        //Plugin de numeros
                        UsePluginNumberFormat("#NewAndEditEarningCode");
                    } else {
                        windows_message("No se encontró el código de ingreso", "error");
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
        fn.funtionNewEarningCode("close");
    });

    //dehabilitar codigo de ganancia
    $('#DisebleEarningCode').on('click', function () {
        if (!$(this).is(":checked")) {
            var ListId = [];
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectEarningCode[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "EarCodeId");
                    input.attr("class", "EarCodeId");
                    input.val($(this).parent().parent().find(".EarningCodeIdtbl").html().trim());
                    $(".disabledEarningCode").append(input);

                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#DisebleEarningCode").prop('checked', true);
            }
            else {
                windows_message("¿Desea inhabilitar los códigos de ingreso seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/codigosganancias/actualizarestatus",
                            type: "POST",
                            data: $("#disabledEarningCode").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".EarCodeId").remove();
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
                                            $('.tblEarningCode').replaceWith($('.tblEarningCode', newDom));
                                        });
                                    $("#DisebleEarningCode").prop('checked', true);
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectEarningCode[type=checkbox]").prop('checked', false);
                        $("#DisebleEarningCode").prop('checked', true);
                        $(".EarCodeId").remove();
                    }
                });

            }
        }

    });

    //habilitar codigo de ganancia
    $('#EnabledEarningCode').on('click', function () {
        if ($(this).is(":checked")) {
            var ListId = [];
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectEarningCode[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "EarCodeId");
                    input.attr("class", "EarCodeId");
                    input.val($(this).parent().parent().find(".EarningCodeIdtbl").html().trim());
                    $(".EnableEarningCode").append(input);

                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#EnabledEarningCode").prop('checked', false);
            }
            else {
                windows_message("¿Desea habilitar los códigos de ingreso seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/codigosgananciainactivos/actualizarestatus",
                            type: "POST",
                            data: $("#EnableEarningCode").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".EarCodeId").remove();
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
                                            $('.tblEarningCode').replaceWith($('.tblEarningCode', newDom));
                                        });
                                    $("#EnabledEarningCode").prop('checked', false);
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectEarningCode[type=checkbox]").prop('checked', false);
                        $("#EnabledEarningCode").prop('checked', false);

                        $(".EarCodeId").remove();
                    }
                });

            }
        }

    });

    //ir a codigos inactivos
    $('.DisabledEarningCode').on('click', function () {
        window.location.href = "/codigosgananciainactivos";
    });

    //cerrar codigos de ganancias inhabilitados
    $('.close-EarningCode').on('click', function () {
        window.location.href = "/codigosganancias";
    });

    //Navegar a versiones
    $(".ec-versions").on("click", function () {
        let _id: string;
        var contador = 0;
        $(".selectEarningCode[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".EarningCodeIdtbl").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
        } else {

            window.location.href = `/codigosganancias?version=true&id=${_id}`;
        }
    });

    $(".ec-versions-form").on("click", function () {
        if ($("#EarningCodeId").val() == "")
            windows_message("¡Debe guardar primero el registro!", "error");
        else
            window.location.href = `/codigosganancias?version=true&id=${$("#EarningCodeId").val()}`;
    });

    //filtro
    $('.optionFilter').on('change', function () {
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-EarningCode", "/codigosganancias/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-EarningCode", "/codigosganancias/FilterOrMoreData");

        }
    });

    //eliminar codigo de version
    $("#Delete-Earning-CodeVersion").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: number = 0;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectEarningCode[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador++;
                    let input = $(document.createElement('input'));
                    input.attr("name", "EarningCodeId");
                    input.attr("class", "EarningCodeId");
                    input.val($(this).parent().parent().find(".EarningCodeIdtbl").html().trim());
                    $(".DeleteEarningCodeVersion").append(input);

                    input = $(document.createElement('input'));
                    input.attr("name", "EarningCodeInternalId");
                    input.attr("class", "EarningCodeId");
                    input.val($(this).parent().parent().find(".Internalid-Ec").html().trim());
                    $(".DeleteEarningCodeVersion").append(input);

                }

            });

            if (contador == 0) {
                windows_message("¡Debe seleccionar un registro!", "error");

            } else if (contador > 1) {
                windows_message("¡Debe seleccionar un solo registro!", "error");

            }
            else {
                windows_message("¿Desea eliminar la version de código de ingreso seleccionado?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/codigosganancias/eliminarVersion",
                            type: "POST",
                            data: $("#Delete-Earning-CodeVersion").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".EarningCodeId").remove();
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
                                            $('.tblEarningCode').replaceWith($('.tblEarningCode', newDom));
                                        });
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".selectEarningCode[type=checkbox]").prop('checked', false);
                        $(".EarningCodeId").remove();

                    }
                });//, {Ok: "Si", Cancel: "No"}

            }
        }
    });

    //paginacion
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblEarningCode").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                if ($('.title-for-pagination').text() == "Códigos de ingreso") {

                    moredata(maxscroll, "codigosganancias", ".tbody-Table-EarningCode");

                } else {
                    moredata(maxscroll, "codigosganancias", ".tbody-Table-EarningCode", "", true, $('.id-version').val().toString());


                }

            }
        }
    });

    // Habilitar doble clic en filas para editar
    enableRowDoubleClick(
        '.tbody-Table-EarningCode',
        '.EarningCodeIdtbl',
        '/codigosganancias/{id}',
        function (data: IEarningCode) {
            option = 2;
            AutomaticBinding(data, "#NewAndEditEarningCode");
            $('.seteartitulo').text('Editar código de ingreso');
            $('.Showid').removeClass('collapse');
            fn.funtionNewEarningCode("open");
        }
    );
}
export { }