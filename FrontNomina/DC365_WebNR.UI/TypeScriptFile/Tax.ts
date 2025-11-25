
variables: {

    var option: number;
    var optiondetail: number;
}

//Funciones
const fn = {
    //Formulario de nuevo y editar
    SearchFormNewAndEdit: function (_id: string = "", viewmode: string = "new") {
        let url: string

        if (_id == "")
            url = `/impuestos/ObtenerFormNuevo`;
        else
            url = `/impuestos/ObtenerFormNuevo?taxid=${_id}`;

        $.ajax({
            url: url,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    fn.ShowForm(data, viewmode);
                    fn.OpenCloseNewAndEdit("open");
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    /*
    * Método para mostrar el formulario, 
    * contiene el event para cerrar el formulario y guardar la data
    */
    ShowForm: function (data, viewmode: string) {

        $("#ContNewAndEditTax").html('');

        $("#ContNewAndEditTax").append(data);

        //cerrar formulario de nuevo y editar
        $(".OpCloseform").on('click', function () {
            $("#ContNewAndEditTax").addClass("collapse");
            fn.OpenCloseNewAndEdit("close");
        });

        //Mostrar contenedor
        $("#ContNewAndEditTax").removeClass("collapse");

        fn.SettingNewAndEdit(viewmode);

        InstaciateListener();
        //guardar información
        $("#FormNewAndEdiTax").submit(function (e) {
            if ($(this).valid()) {
                e.preventDefault();
                $.ajax({
                    url: "/impuestos/guardar",
                    type: "POST",
                    data: $(this).serialize() + `&operation=${option}`,
                    async: true,
                    success: function (data: ResponseUI) {
                        $('.progreso').modal('hide');
                        if (data.Type == "error") {
                            FormatErrors(data);
                        }
                        else {
                            windows_message(data.Message, data.Type);
                            $(".contenedor-paycycle ").removeClass("collapse");

                            //Refrescamos la tabla con la información guardada
                            fn.RefreshTable();
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        });

        $(".NewTaxDetail").on("click", function () {
            fnDetail.SearchFormNewAndEditDetail();
        });

        //eliminar configuracion de impuesto
        $("#deleteTaxDetail").submit(function (e) {
            if ($(this).valid()) {
                e.preventDefault();
                var contador: boolean = false;
                // Recorremos todos los checkbox para contar los que estan seleccionados
                $(".selectTaxDetail[type=checkbox]").each(function () {
                    if ($(this).is(":checked")) {
                        contador = true
                        let input = $(document.createElement('input'));
                        input.attr("name", "TaxDetailid");
                        input.attr("class", "TaxDetailid");
                        input.val($(this).parent().parent().find(".InternalIdtbltax").html().trim());
                        $(".deleteTaxDetail").append(input);
                    }

                });

                if (!contador) {
                    windows_message("¡Debe seleccionar un registro!", "error");
                }
                else {
                    windows_message("¿Desea eliminar las configuraciones seleccionadas?", "confirm", {
                        onOk: function () {
                            $('.progreso').modal({ backdrop: 'static', keyboard: false })

                            $.ajax({

                                url: "detalleimpuestos/eliminar",
                                type: "POST",
                                data: $("#deleteTaxDetail").serialize() + `&Taxid=${$('#TaxId').val().toString().trim()}`,
                                async: true,
                                success: function (data: ResponseUI) {
                                    $('.progreso').modal('hide');
                                    $(".TaxDetailid").remove();

                                    if (data.Type == "error") {
                                        var _errors: string = "";
                                        data.Errors.forEach(function (x: string) {
                                            _errors += `${x}<br>`;
                                        });
                                        windows_message(_errors, data.Type);
                                    } else {
                                        fnDetail.SearchTaxDetail();
                                        windows_message(data.Message, data.Type);
                                    }
                                }, error: function (xhr) {
                                    redireccionaralLogin(xhr);
                                }

                            });
                        },
                        onCancel: function () {
                            $(".selectTaxDetail[type=checkbox]").prop('checked', false);
                            $(".TaxDetailid").remove();

                        }
                    });
                }
            }
        });

    },



    //Refrescar lista principal
    RefreshTable: function () {
        $.get(location.href)
            .done(function (r) {
                var newDom = $(r);
                $('.TblTax').replaceWith($('.TblTax', newDom));
            });
    },

    //Opciones del formulario si es nuevo o editar
    SettingNewAndEdit: function (viewmode: string) {
        if (viewmode == "new") {
            option = 1;
            $(".showid").addClass("collapse");
            $(".contenedor-paycycle ").addClass("collapse");

        }
        else {
            option = 2;
            $(".showid").removeClass("collapse");
            $(".contenedor-paycycle ").removeClass("collapse");
            fnDetail.SearchTaxDetail();
        }
    },

    //lista detalle de impuestos
    SearchTaxDetail: function () {
        $.ajax({
            url: "detalleimpuestos",
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".tbodyTableTaxDetail").html('');
                    $(".tbodyTableTaxDetail").append(data);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    //funcion abrir nuevo formulario
    OpenCloseNewAndEdit: function (_opcion) {
        if (_opcion == "open") {
            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');


        } else {
            $('.contendorRolandCompaies').addClass('collapse');
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');

        }
    },

}

const fnDetail = {
    //Formulario de nuevo y editar
    SearchFormNewAndEditDetail: function (_id: string = "", viewmode: string = "new") {
        let url: string

        if (_id == "")
            url = `/detalleimpuestos/ObtenerFormNuevo`;
        else
            url = `/detalleimpuestos/ObtenerFormNuevo?TaxDetailid=${_id}`;

        $.ajax({
            url: url,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    fnDetail.ShowForm(data, viewmode);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    //Buscar formulario de configuracion de tasa
    SearchListRateConfig: function (_id: string = "", viewmode: string = "new") {
        let url: string

        if (_id == "")
            url = `/detalleimpuestos/ObtenerFormNuevo`;
        else
            url = `/detalleimpuestos/ObtenerFormNuevo?TaxDetailid=${_id}`;
        $.ajax({
            url: url,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".cont-form-new-config-isr").html('');
                    $("cont-form-new-config-isr").append(data);

                    //cerrar formulario de nueva direccion
                    $(".btncancelar_new_TaxDetail").on('click', function () {
                        $(".cont-form-new-config-isr").addClass("collapse");
                    });

                    $(".cont-form-new-config-isr").removeClass("collapse");

                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },


    ShowForm: function (data, viewmode: string) {

        $(".cont-form-new-config-isr").html('');
        $(".cont-form-new-config-isr").append(data);

        //cerrar formulario de nuevo y editar
        $(".btncancelar_new_TaxDetail").on('click', function () {
            $(".cont-form-new-config-isr").addClass("collapse");
        });

        //Mostrar contenedor
        $(".cont-form-new-config-isr").removeClass("collapse");

        //guardar nuevo taxdetail
        $("#new_TaxDetail").submit(function (e) {
            if ($(this).valid()) {
                e.preventDefault();
                $.ajax({
                    url: "/detalleimpuestos/guardar",
                    type: "POST",
                    data: $(this).serialize() + `&operation=${optiondetail}`,
                    async: true,
                    success: function (data: ResponseUI) {
                        $('.progreso').modal('hide');
                        if (data.Type == "error") {
                            FormatErrors(data);
                        }
                        else {
                            windows_message(data.Message, data.Type);
                            $(".cont-form-new-config-isr").addClass("collapse");

                            //Refrescamos la tabla con la información guardada
                            fnDetail.SearchTaxDetail();
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        });

        $(".TaxIddetail").val($("#TaxId").val().toString().trim());
        fnDetail.SettingNewAndEdit(viewmode);

        //Plugin de numeros
        UsePluginNumberFormat("#new_TaxDetail");
    },

    SettingNewAndEdit: function (viewmode: string) {
        if (viewmode == "new") {
            optiondetail = 1;
            $(".showid").addClass("collapse");
        }
        else {
            optiondetail = 2;
            $(".showid").removeClass("collapse");
        }
    },

    //lista detalle de impuestos
    SearchTaxDetail: function () {

        $.ajax({
            url: `detalleimpuestos/${$("#TaxId").val().toString().trim()}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".tbodyTableTaxDetail").html('');
                    $(".tbodyTableTaxDetail").append(data);

                    $(".rowtable-TaxDetail").dblclick(function myfunction() {
                        let dato = $(this).find(".InternalIdtbltax").html().trim();
                        fnDetail.SearchFormNewAndEditDetail($(this).find(".InternalIdtbltax").html().trim(), "edit");
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

}

esuchadores: {
    $(".NewTax").on("click", function () {
        fn.SearchFormNewAndEdit();
    });

    $(".EditTax").on("click", function () {
        let _id: string;
        var contador = 0;
        $(".selectTax[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".TaxIdTbl").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }

        else if (contador > 1) {
            windows_message("¡Debe seleccionar un registro!", "info");
        }
        else {
            fn.SearchFormNewAndEdit(_id, "edit");
        }
    });

    //Eliminar
    $("#DeleteTax").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectTax[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "listid_Tax");
                    input.attr("class", "listid_Tax");
                    input.val($(this).parent().parent().find(".TaxIdTbl").html().trim());
                    $("#DeleteTax").append(input);
                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los impuestos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/impuestos/eliminar",
                            type: "POST",
                            data: $("#DeleteTax").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".listid_Tax").remove();
                                if (data.Type == "error") {
                                    FormatErrors(data);
                                }
                                else {
                                    windows_message(data.Message, data.Type);
                                    fn.RefreshTable();
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectTax[type=checkbox]").prop('checked', false);
                        $(".listid_Tax").remove();

                    }
                });
            }
        }
    });

    //dehabilitar
    $('#DisebleTax').on('click', function () {
        if (!$(this).is(":checked")) {

            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectTax[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "listid_Tax");
                    input.attr("class", "listid_Tax");
                    input.val($(this).parent().parent().find(".TaxIdTbl").html().trim());
                    $(".updateStatusTax").append(input);

                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#DisebleTax").prop('checked', true);
            }
            else {
                windows_message("¿Desea inhabilitar los impuestos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/impuestos/actualizarestatus",
                            type: "POST",
                            data: $("#updateStatusTax").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".listid_Tax").remove();
                                $("#DisebleTax").prop('checked', true);
                                if (data.Type == "error") {
                                    var _errors: string = "";
                                    data.Errors.forEach(function (x: string) {
                                        _errors += `${x}<br>`;
                                    });
                                    windows_message(_errors, data.Type);
                                } else {

                                    fn.RefreshTable();
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectTax[type=checkbox]").prop('checked', false);
                        $("#DisebleTax").prop('checked', true);
                        $(".listid_Tax").remove();

                    }
                });

            }
        }

    });

    //habilitar
    $('#EnableTax').on('click', function () {
        if ($(this).is(":checked")) {

            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectTax[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "listid_Tax");
                    input.attr("class", "listid_Tax");
                    input.val($(this).parent().parent().find(".TaxIdTbl").html().trim());
                    $(".updateStatusTax").append(input);

                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#EnableTax").prop('checked', false);
            }
            else {
                windows_message("¿Desea habilitar los impuestos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/impuestosinactivos/actualizarestatus",
                            type: "POST",
                            data: $("#updateStatusTax").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".listid_Tax").remove();
                                $("#EnableTax").prop('checked', false);
                                if (data.Type == "error") {
                                    var _errors: string = "";
                                    data.Errors.forEach(function (x: string) {
                                        _errors += `${x}<br>`;
                                    });
                                    windows_message(_errors, data.Type);
                                } else {

                                    fn.RefreshTable();
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectTax[type=checkbox]").prop('checked', false);
                        $("#EnableTax").prop('checked', false);
                        $(".listid_Tax").remove();

                    }
                });

            }
        }

    });

    $('.Tax-Disabled').on('click', function () {
        window.location.href = "/impuestosinactivos";

    });

    $('.Close-tax-disabled').on('click', function () {
        window.location.href = "/impuestos";
    });


    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);

        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Tax", "/impuestos/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Tax", "/impuestos/FilterOrMoreData");

        }
    });

    //paginacion
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".TblTax").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                if ($('.title-for-pagination').text() == "Impuestos") {

                    moredata(maxscroll, "impuestos", ".tbody-Table-Tax");
                } else {
                    moredata(maxscroll, "impuestosinactivos", ".tbody-Table-Tax");

                }

            }
        }
    });

}

export { }
