/**
 * @file DeductionCode.ts
 * @description Módulo de gestión de códigos de deducción. Permite crear, editar,
 *              eliminar y administrar los conceptos de deducciones en nómina.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module CodigosDeduccion
 */

variables: {
    var option: number;
}

escuchadores: {
    //eliminar
    $("#DeleteDeductionCode").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectDeductionCode[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
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
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/codigosdeduccion/eliminar",
                            type: "POST",
                            data: $("#DeleteDeductionCode").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".DeductionCodeId").remove();
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
            if (option == 2) {
                windows_message("¿Desea crear una nueva versión de código de descuento?", "confirm", {
                    onOk: function () {
                        fn.SaveDeductionCode(true);
                    },
                    onCancel: function () {
                        fn.SaveDeductionCode(false);
                    }

                }, { Ok: "Si", Cancel: "No" });
            } else {
                fn.SaveDeductionCode(false);
            }
        }
    });


    //editar
    $('.EditDeductionCode').on('click', function () {

        let _id: string;
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
        } else {
            $.ajax({

                url: `/codigosdeduccion/${_id}`,
                type: "GET",
                async: true,
                success: function (data: IDeductionCode) {
                    if (data != null) {
                        AutomaticBinding(data, "#NewAndEditDeductionCode");
                        fn.SettingNewAndEdit("edit");

                    } else {
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
            
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectDeductionCode[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
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
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/codigosdeduccion/actualizarestatus",
                            type: "POST",
                            data: $("#DisabledDeductionCode").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".DeductionCodeIddc").remove();
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
            
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectDeductionCode[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
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
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/codigosdeduccioninactivos/actualizarestatus",
                            type: "POST",
                            data: $("#enable-deductionCode").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".DeductionCodeId").remove();
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
        let _id: string;
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
        } else {

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
        let _id: string;
        let _internalId: string;
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
        } else {
            $.ajax({

                url: `/codigosdeduccion/${_id}?version=true&internalid=${_internalId}`,
                type: "GET",
                async: true,
                success: function (data: IDeductionCode) {
                    
                    if (data != null) {
                        AutomaticBinding(data, "#NewAndEditDeductionCode");
                        fn.SettingNewAndEdit("edit");

                        //Plugin de numeros
                        UsePluginNumberFormat("#NewAndEditDeductionCode");

                    } else {
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
            var contador: number = 0;
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

            } else if (contador > 1) {
                windows_message("¡Debe seleccionar un solo registro!", "error");

            }
            else {
                windows_message("¿Desea eliminar la version de código de descuento seleccionado?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/codigosdeduccion/eliminarVersion",
                            type: "POST",
                            data: $("#Delete-Deduction-CodeVersion").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".DeductionCodeId").remove();
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

                } else {
                    moredata(maxscroll, "codigosdeduccion", ".tbody-Table-deductionCode", "", true, $('.id-version').val().toString());


                }

            }
        }
    });

    // Habilitar doble clic en filas para editar
    enableRowDoubleClick(
        '.tbody-Table-deductionCode',
        '.DeductionCodeId-dc',
        '/codigosdeduccion/{id}',
        function (data: IDeductionCode) {
            AutomaticBinding(data, "#NewAndEditDeductionCode");
            fn.SettingNewAndEdit("edit");
        }
    );
}

const fn= {
    //funcion abrir formulario para nuevo codigo dee ganancia
    funtionNewDeductionCode: function(_opcion) {
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

    SaveDeductionCode: function (_isversion: boolean) {
        $('.progreso').modal({ backdrop: 'static', keyboard: false })
        $.ajax({
            url: "/codigosdeduccion/guardar",
            type: "POST",
            data: $('#NewAndEditDeductionCode').serialize() + `&operacion=${option}` + `&isversion=${_isversion}`,
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
                    windows_message(data.Message, data.Type);
                    $.get(location.href)
                        .done(function (r) {
                            var newDom = $(r);
                            $('.tblDeductionCode').replaceWith($('.tblDeductionCode', newDom));
                        });
                    let form = document.getElementById("NewAndEditDeductionCode") as HTMLFormElement;
                    form.reset();
                    fn.funtionNewDeductionCode("close");

                }


            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    SettingNewAndEdit: function (viewmode: string) {
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
            let form = document.getElementById('NewAndEditDeductionCode') as HTMLFormElement;
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
}

export { }