/**
 * @file Payroll.ts
 * @description Módulo de gestión de períodos de nómina. Permite crear, editar
 *              y administrar los períodos de pago de la organización.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Nomina
 */

variables: {
    var option: number;
    var page = 1;
    var isBusy: boolean = false;
    var isempty: boolean = false;

}

const fn = {
    //funcion abrir formulario
    funtionNewPayroll: function (option) {
        if (option == "open") {
            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');
        } else {
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
            $('.contenedor-paycycle').addClass('collapse');
        }
    },

    Showpaycycle: function (option) {
        if (option == "1") {
            $('#toggle-title').attr("data-value", "2");
            $('#toggle-title').removeClass("fa-angle-up");
            $('#toggle-title').addClass("fa-angle-down");
            $("#NewAndEditPayrolls").removeClass("show-header");
            $("#NewAndEditPayrolls").addClass("hide-header");
            $(".contenedor-paycycle > .TituloFormularios").addClass("collapse");
            $(".seteartitulo").text("Editar nómina - Ciclos de pago");
        }
        else {
            $('#toggle-title').attr("data-value", "1");
            $('#toggle-title').addClass("fa-angle-up");
            $('#toggle-title').removeClass("fa-angle-down");
            $("#NewAndEditPayrolls").removeClass("hide-header");
            $("#NewAndEditPayrolls").addClass("show-header");
            $(".contenedor-paycycle > .TituloFormularios").removeClass("collapse");
            $(".seteartitulo").text("Editar nómina");
        }
    },

    //Buscar lista de cliclos de pago
    SearchListPayCycle: function (_payrollId: string) {
        $.ajax({
            url: `ciclopagos/${_payrollId}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    if (data.length > 0) {
                        let istax: boolean = false;
                        $(".tbodyTableCyclePay").html('');
                        $(".tbodyTableCyclePay").append(data);

                        //Marcar como impuesto
                        $(".isfortax").on('click', function () {
                            $(".PayrollIdTax").val($("#PayrollId").val().toString());
                            $(".PayCycleIdTax").val($(this).parent().parent().parent().find(".PayCycleIdtbl").html().trim());
                            $(".IsForTaxTax").prop('checked', $(this).is(":checked"));
                            $(".IsForTaxTax").val($(this).is(":checked").toString());

                            let that = $(this);
                            $('.progreso').modal({ backdrop: 'static', keyboard: false })
                            $.ajax({
                                url: "/ciclopagos/marcarimpuesto",
                                type: "POST",
                                data: $("#FormMarkIsForTax").serialize(),
                                async: true,
                                success: function (data: ResponseUI) {
                                    $('.progreso').modal('hide');
                                    if (data.Type == "error") {
                                        FormatErrors(data);
                                        let mark = that.is(":checked");
                                        that.prop("checked", !mark);
                                    } else {
                                        windows_message(data.Message, data.Type);
                                    }
                                }, error: function (xhr) {
                                    redireccionaralLogin(xhr);
                                }
                            });
                        });

                        //Marcar como tss
                        $(".isfortss").on('click', function () {
                            $(".PayrollIdTss").val($("#PayrollId").val().toString());
                            $(".PayCycleIdTss").val($(this).parent().parent().parent().find(".PayCycleIdtbl").html().trim());
                            $(".IsForTss").prop("checked", $(this).is(":checked"));
                            $(".IsForTss").val($(this).is(":checked").toString());

                            let that = $(this);
                            $('.progreso').modal({ backdrop: 'static', keyboard: false })
                            $.ajax({
                                url: "/ciclopagos/marcartss",
                                type: "POST",
                                data: $("#FormMarkIsForTss").serialize(),
                                async: true,
                                success: function (data: ResponseUI) {
                                    $('.progreso').modal('hide');
                                    if (data.Type == "error") {
                                        FormatErrors(data);
                                        let mark = that.is(":checked");
                                        that.prop("checked", !mark);
                                    } else {
                                        windows_message(data.Message, data.Type);
                                    }
                                }, error: function (xhr) {
                                    redireccionaralLogin(xhr);
                                }
                            });
                        });

                        $(".BuscartblCyclePay").keyup(function () {
                            let _this = this;
                            // Show only matching TR, hide rest of them
                            $.each($(".tblCyclePay tbody tr"), function () {
                                if ($(this).text().toLowerCase().indexOf($(_this).val().toString().toLowerCase()) === -1)
                                    $(this).hide();
                                else
                                    $(this).show();
                            });
                        });
                    }
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    SettingsNewAndEdit: function (viewmode: string) {
        if (viewmode == "edit") {
            $('.seteartitulo').text('Editar nómina');
            $('.contenedor-paycycle').removeClass('collapse');
            $('.Showid').removeClass('collapse');
            option = 2;
            fn.Showpaycycle('2');
            $("#CurrencyId").prop("disabled", true);
            $("#PayFrecuency").prop("disabled", "disabled");
            $("#ValidFrom").prop("readonly", "readonly");
            $("#ValidFrom").addClass("disabledDate");
            $("#toggle-title").attr("data-value", "1");
            $("#toggle-title").removeClass("collapse");
            fn.funtionNewPayroll("open");
        }
        else {
            let form = document.getElementById('NewAndEditPayrolls') as HTMLFormElement;
            form.reset();
            option = 1;
            $(".tbodyTableCyclePay").html('');
            $('.Showid').addClass('collapse');
            $('.seteartitulo').text('Nueva nómina');

            $("#CurrencyId").removeAttr("disabled");
            $("#IsRoyaltyPayroll").removeAttr("disabled");
            $("#PayFrecuency").removeAttr("disabled");
            $("#ValidFrom").removeAttr("readonly");
            $("#ValidFrom").removeClass("disabledDate");
            $("#toggle-title").attr("data-value", "2");
            $("#toggle-title").addClass("collapse");

            fn.funtionNewPayroll("open");
        }
    },

    moredata_tbl: function (_maxscroll: number, _namescroll: string, _namebody: string, _moreParameter: string) {
        let moreParameter: string = "";
        if (_moreParameter != "")
            moreParameter = `&id=${_moreParameter}`;

        page++;
        isBusy = true;
        if (!isempty) {
            $.get("/ciclopagos/moredata?pagenumber=" + page + moreParameter,
                function (data) {

                    if (data != "") {
                        $(_namebody).children().last().after(data);
                        $(`#${_namescroll}`).scrollTop(_maxscroll);
                    } else {
                        isempty = true;
                    }
                    isBusy = false;
                });
        }

    }

}

escuchadores: {
    //Toggle
    $("#toggle-title").click(function () {
        let value = $(this).attr("data-value").toString();
        fn.Showpaycycle(value);
    });

    //eliminar
    $("#deletePayroll").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPayroll[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "IdPayroll");
                    input.attr("class", "IdPayroll");
                    input.val($(this).parent().parent().find(".PayrollIdtbl").html().trim());
                    $(".deletePayroll").append(input);

                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");

            }
            else {
                windows_message("¿Desea eliminar los códigos de nómina seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/nomina/eliminar",
                            type: "POST",
                            data: $("#deletePayroll").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".IdPayroll").remove();
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
                                            $('.tblPayrolls').replaceWith($('.tblPayrolls', newDom));
                                        });
                                   
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".selectPayroll[type=checkbox]").prop('checked', false);
                        $(".IdPayroll").remove();

                    }
                });

            }
        }
    });

    //abrir nuevo
    $('.NewPayroll').on('click', function () {
        $("#NewAndEditPayrolls").removeClass("hide-header");
        $("#NewAndEditPayrolls").addClass("show-header");

        fn.SettingsNewAndEdit("new");
    });

    // Variable para controlar si debe cerrar después de guardar
    var shouldCloseAfterSave = false;

    //save
    $("#NewAndEditPayrolls").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            $("#CurrencyId").prop("disabled", false);
            $('.progreso').modal({ backdrop: 'static', keyboard: false })
            $.ajax({
                url: "/nomina/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
                async: true,
                success: function (data: ResponseUIGeneric) {
                    $("#CurrencyId").prop("disabled", true);
                    $('.progreso').modal('hide');
                    if (data.Type == "error") {
                        var _errors: string = "";
                        data.Errors.forEach(function (x: string) {
                            _errors += `${x}<br>`;
                        });
                        windows_message(_errors, data.Type);

                    } else {
                        let a = data.Obj as IPayroll;
                        $.get(location.href)
                            .done(function (r) {
                                var newDom = $(r);
                                $('.tblPayrolls').replaceWith($('.tblPayrolls', newDom));
                            });
                        windows_message(data.Message, data.Type);

                        if (shouldCloseAfterSave) {
                            fn.funtionNewPayroll("close");
                            shouldCloseAfterSave = false;
                        } else if (option == 1) {
                            $('.PayrollId').val(a.PayrollId);
                            fn.SettingsNewAndEdit("edit");
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
        $("#NewAndEditPayrolls").submit();
    });

    //editar
    $('.EditPayroll').on('click', function () {

        let _id: string;
        var contador = 0;
        $(".selectPayroll[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".PayrollIdtbl").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");

        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "info");
        } else {
            $.ajax({

                url: `/nomina/${_id}`,
                type: "GET",
                async: true,
                success: function (data: IEarningCode) {
                    if (data != null) {
                        option = 2;
                        AutomaticBinding(data, "#NewAndEditPayrolls");
                        fn.SearchListPayCycle($('.PayrollId').val().toString());
                        fn.SettingsNewAndEdit("edit");
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
        fn.funtionNewPayroll("close");
    });

    
    //ir a codigos inactivos
    $('.Payroll-disabled').on('click', function () {
        window.location.href = "/nominasinactivas";
    });

    //dehabilitar nómina
    $('#DiseblePayroll').on('click', function () {
        if (!$(this).is(":checked")) {
            var ListId = [];
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPayroll[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "payrollIdOp");
                    input.attr("class", "payrollIdOp");
                    input.val($(this).parent().parent().find(".PayrollIdtbl").html().trim());
                    $(".disabledPayrolls").append(input);

                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#DiseblePayroll").prop('checked', true);
            }
            else {
                windows_message("¿Desea inhabilitar nóminas seleccionadas?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/nomina/actualizarestatus",
                            type: "POST",
                            data: $("#disabledPayrolls").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".payrollIdOp").remove();
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
                                            $('.tblPayrolls').replaceWith($('.tblPayrolls', newDom));
                                        });
                                    $("#DiseblePayroll").prop('checked', true);
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectPayroll[type=checkbox]").prop('checked', false);
                        $("#DiseblePayroll").prop('checked', true);
                        $(".payrollIdOp").remove();
                    }
                });

            }
        }

    });

    //Proceso de detección del movimiento del scroll para aplicar la paginación
    $("#content-scroll-child").scroll(function () {
        let currentscroll = $(this).scrollTop();

        let maxscroll = $(".tblCyclePay").outerHeight(true) - $(this).outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "ciclopagos", ".tbodyTableCyclePay","",false,$('#PayrollId').val().toString());

                //fn.moredata_tbl(maxscroll, this.id, ".tbodyTableCyclePay", $('#PayrollId').val().toString());
            }
        }
    });

    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Payroll", "/nomina/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Payroll", "/nomina/FilterOrMoreData");

        }
    });

    //paginación
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblPayrolls").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "nomina", ".tbody-Table-Payroll");

            }
        }
    });

    // Habilitar doble clic en filas para editar
    enableRowDoubleClick(
        '.tbody-Table-Payroll',
        '.PayrollIdtbl',
        '/nomina/{id}',
        function (data: IPayroll) {
            AutomaticBinding(data, "#NewAndEditPayrolls");
            fn.SearchListPayCycle($('.PayrollId').val().toString());
            fn.SettingsNewAndEdit("edit");
        }
    );

    // Inicializar modal de auditoría
    initAuditListPage('.selectPayroll', '.PayrollIdtbl', '/nomina/getbyid', 'PayrollId');
}

export { }