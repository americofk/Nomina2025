/**
 * @file Payroll.ts
 * @description Módulo de gestión de períodos de nómina. Permite crear, editar
 *              y administrar los períodos de pago de la organización.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Nomina
 */
variables: {
    var option;
    var page = 1;
    var isBusy = false;
    var isempty = false;
}
const fn = {
    //funcion abrir formulario
    funtionNewPayroll: function (option) {
        if (option == "open") {
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
    SearchListPayCycle: function (_payrollId) {
        $.ajax({
            url: `ciclopagos/${_payrollId}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    if (data.length > 0) {
                        let istax = false;
                        $(".tbodyTableCyclePay").html('');
                        $(".tbodyTableCyclePay").append(data);
                        //Marcar como impuesto
                        $(".isfortax").on('click', function () {
                            $(".PayrollIdTax").val($("#PayrollId").val().toString());
                            $(".PayCycleIdTax").val($(this).parent().parent().parent().find(".PayCycleIdtbl").html().trim());
                            $(".IsForTaxTax").prop('checked', $(this).is(":checked"));
                            $(".IsForTaxTax").val($(this).is(":checked").toString());
                            let that = $(this);
                            $('.progreso').modal({ backdrop: 'static', keyboard: false });
                            $.ajax({
                                url: "/ciclopagos/marcarimpuesto",
                                type: "POST",
                                data: $("#FormMarkIsForTax").serialize(),
                                async: true,
                                success: function (data) {
                                    $('.progreso').modal('hide');
                                    if (data.Type == "error") {
                                        FormatErrors(data);
                                        let mark = that.is(":checked");
                                        that.prop("checked", !mark);
                                    }
                                    else {
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
                            $('.progreso').modal({ backdrop: 'static', keyboard: false });
                            $.ajax({
                                url: "/ciclopagos/marcartss",
                                type: "POST",
                                data: $("#FormMarkIsForTss").serialize(),
                                async: true,
                                success: function (data) {
                                    $('.progreso').modal('hide');
                                    if (data.Type == "error") {
                                        FormatErrors(data);
                                        let mark = that.is(":checked");
                                        that.prop("checked", !mark);
                                    }
                                    else {
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
    SettingsNewAndEdit: function (viewmode) {
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
            let form = document.getElementById('NewAndEditPayrolls');
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
    moredata_tbl: function (_maxscroll, _namescroll, _namebody, _moreParameter) {
        let moreParameter = "";
        if (_moreParameter != "")
            moreParameter = `&id=${_moreParameter}`;
        page++;
        isBusy = true;
        if (!isempty) {
            $.get("/ciclopagos/moredata?pagenumber=" + page + moreParameter, function (data) {
                if (data != "") {
                    $(_namebody).children().last().after(data);
                    $(`#${_namescroll}`).scrollTop(_maxscroll);
                }
                else {
                    isempty = true;
                }
                isBusy = false;
            });
        }
    }
};
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
            var contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPayroll[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
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
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/nomina/eliminar",
                            type: "POST",
                            data: $("#deletePayroll").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".IdPayroll").remove();
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
            $('.progreso').modal({ backdrop: 'static', keyboard: false });
            $.ajax({
                url: "/nomina/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
                async: true,
                success: function (data) {
                    $("#CurrencyId").prop("disabled", true);
                    $('.progreso').modal('hide');
                    if (data.Type == "error") {
                        var _errors = "";
                        data.Errors.forEach(function (x) {
                            _errors += `${x}<br>`;
                        });
                        windows_message(_errors, data.Type);
                    }
                    else {
                        let a = data.Obj;
                        $.get(location.href)
                            .done(function (r) {
                            var newDom = $(r);
                            $('.tblPayrolls').replaceWith($('.tblPayrolls', newDom));
                        });
                        windows_message(data.Message, data.Type);
                        if (shouldCloseAfterSave) {
                            fn.funtionNewPayroll("close");
                            shouldCloseAfterSave = false;
                        }
                        else if (option == 1) {
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
        let _id;
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
        }
        else {
            $.ajax({
                url: `/nomina/${_id}`,
                type: "GET",
                async: true,
                success: function (data) {
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
            var contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPayroll[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
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
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/nomina/actualizarestatus",
                            type: "POST",
                            data: $("#disabledPayrolls").serialize(),
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                $(".payrollIdOp").remove();
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
                moredata(maxscroll, "ciclopagos", ".tbodyTableCyclePay", "", false, $('#PayrollId').val().toString());
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
    enableRowDoubleClick('.tbody-Table-Payroll', '.PayrollIdtbl', '/nomina/{id}', function (data) {
        AutomaticBinding(data, "#NewAndEditPayrolls");
        fn.SearchListPayCycle($('.PayrollId').val().toString());
        fn.SettingsNewAndEdit("edit");
    });
    // Inicializar modal de auditoría
    initAuditListPage('.selectPayroll', '.PayrollIdtbl', '/nomina/getbyid', 'PayrollId');
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5cm9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL1BheXJvbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILFNBQVMsRUFBRSxDQUFDO0lBQ1IsSUFBSSxNQUFjLENBQUM7SUFDbkIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsSUFBSSxNQUFNLEdBQVksS0FBSyxDQUFDO0lBQzVCLElBQUksT0FBTyxHQUFZLEtBQUssQ0FBQztBQUVqQyxDQUFDO0FBRUQsTUFBTSxFQUFFLEdBQUc7SUFDUCwwQkFBMEI7SUFDMUIsaUJBQWlCLEVBQUUsVUFBVSxNQUFNO1FBQy9CLElBQUksTUFBTSxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RCxDQUFDO2FBQU0sQ0FBQztZQUNKLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxRQUFRLENBQUMs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QUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNWLFFBQVEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixDQUFDLENBQUM7WUFFMUQsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILDRDQUE0QztJQUM1QyxvQkFBb0IsQ0FDaEIsc0JBQXNCLEVBQ3RCLGVBQWUsRUFDZixjQUFjLEVBQ2QsVUFBVSxJQUFjO1FBQ3BCLGdCQUFnQixDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN4RCxFQUFFLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUNKLENBQUM7SUFFRixpQ0FBaUM7SUFDakMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3pGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgUGF5cm9sbC50c1xyXG4gKiBAZGVzY3JpcHRpb24gTcOzZHVsbyBkZSBnZXN0acOzbiBkZSBwZXLDrW9kb3MgZGUgbsOzbWluYS4gUGVybWl0ZSBjcmVhciwgZWRpdGFyXHJcbiAqICAgICAgICAgICAgICB5IGFkbWluaXN0cmFyIGxvcyBwZXLDrW9kb3MgZGUgcGFnbyBkZSBsYSBvcmdhbml6YWNpw7NuLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBOb21pbmFcclxuICovXHJcblxyXG52YXJpYWJsZXM6IHtcclxuICAgIHZhciBvcHRpb246IG51bWJlcjtcclxuICAgIHZhciBwYWdlID0gMTtcclxuICAgIHZhciBpc0J1c3k6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHZhciBpc2VtcHR5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG59XHJcblxyXG5jb25zdCBmbiA9IHtcclxuICAgIC8vZnVuY2lvbiBhYnJpciBmb3JtdWxhcmlvXHJcbiAgICBmdW50aW9uTmV3UGF5cm9sbDogZnVuY3Rpb24gKG9wdGlvbikge1xyXG4gICAgICAgIGlmIChvcHRpb24gPT0gXCJvcGVuXCIpIHtcclxuICAgICAgICAgICAgJCgnLkNvbnRlbmVkb3JMaXN0RW50aXR5JykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5jb250TmV3RW50eXRpJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlRm9ybScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnRlbmVkb3ItcGF5Y3ljbGUnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNob3dwYXljeWNsZTogZnVuY3Rpb24gKG9wdGlvbikge1xyXG4gICAgICAgIGlmIChvcHRpb24gPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgJCgnI3RvZ2dsZS10aXRsZScpLmF0dHIoXCJkYXRhLXZhbHVlXCIsIFwiMlwiKTtcclxuICAgICAgICAgICAgJCgnI3RvZ2dsZS10aXRsZScpLnJlbW92ZUNsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICQoJyN0b2dnbGUtdGl0bGUnKS5hZGRDbGFzcyhcImZhLWFuZ2xlLWRvd25cIik7XHJcbiAgICAgICAgICAgICQoXCIjTmV3QW5kRWRpdFBheXJvbGxzXCIpLnJlbW92ZUNsYXNzKFwic2hvdy1oZWFkZXJcIik7XHJcbiAgICAgICAgICAgICQoXCIjTmV3QW5kRWRpdFBheXJvbGxzXCIpLmFkZENsYXNzKFwiaGlkZS1oZWFkZXJcIik7XHJcbiAgICAgICAgICAgICQoXCIuY29udGVuZWRvci1wYXljeWNsZSA+IC5UaXR1bG9Gb3JtdWxhcmlvc1wiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAkKFwiLnNldGVhcnRpdHVsb1wiKS50ZXh0KFwiRWRpdGFyIG7Ds21pbmEgLSBDaWNsb3MgZGUgcGFnb1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyN0b2dnbGUtdGl0bGUnKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCBcIjFcIik7XHJcbiAgICAgICAgICAgICQoJyN0b2dnbGUtdGl0bGUnKS5hZGRDbGFzcyhcImZhLWFuZ2xlLXVwXCIpO1xyXG4gICAgICAgICAgICAkKCcjdG9nZ2xlLXRpdGxlJykucmVtb3ZlQ2xhc3MoXCJmYS1hbmdsZS1kb3duXCIpO1xyXG4gICAgICAgICAgICAkKFwiI05ld0FuZEVkaXRQYXlyb2xsc1wiKS5yZW1vdmVDbGFzcyhcImhpZGUtaGVhZGVyXCIpO1xyXG4gICAgICAgICAgICAkKFwiI05ld0FuZEVkaXRQYXlyb2xsc1wiKS5hZGRDbGFzcyhcInNob3ctaGVhZGVyXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmNvbnRlbmVkb3ItcGF5Y3ljbGUgPiAuVGl0dWxvRm9ybXVsYXJpb3NcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgJChcIi5zZXRlYXJ0aXR1bG9cIikudGV4dChcIkVkaXRhciBuw7NtaW5hXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy9CdXNjYXIgbGlzdGEgZGUgY2xpY2xvcyBkZSBwYWdvXHJcbiAgICBTZWFyY2hMaXN0UGF5Q3ljbGU6IGZ1bmN0aW9uIChfcGF5cm9sbElkOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGBjaWNsb3BhZ29zLyR7X3BheXJvbGxJZH1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc3RheDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnRib2R5VGFibGVDeWNsZVBheVwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi50Ym9keVRhYmxlQ3ljbGVQYXlcIikuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9NYXJjYXIgY29tbyBpbXB1ZXN0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmlzZm9ydGF4XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUGF5cm9sbElkVGF4XCIpLnZhbCgkKFwiI1BheXJvbGxJZFwiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUGF5Q3ljbGVJZFRheFwiKS52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBheUN5Y2xlSWR0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLklzRm9yVGF4VGF4XCIpLnByb3AoJ2NoZWNrZWQnLCAkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5Jc0ZvclRheFRheFwiKS52YWwoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aGF0ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9jaWNsb3BhZ29zL21hcmNhcmltcHVlc3RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNGb3JtTWFya0lzRm9yVGF4XCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFyayA9IHRoYXQuaXMoXCI6Y2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJvcChcImNoZWNrZWRcIiwgIW1hcmspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9NYXJjYXIgY29tbyB0c3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5pc2ZvcnRzc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLlBheXJvbGxJZFRzc1wiKS52YWwoJChcIiNQYXlyb2xsSWRcIikudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLlBheUN5Y2xlSWRUc3NcIikudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5QYXlDeWNsZUlkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5Jc0ZvclRzc1wiKS5wcm9wKFwiY2hlY2tlZFwiLCAkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5Jc0ZvclRzc1wiKS52YWwoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aGF0ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9jaWNsb3BhZ29zL21hcmNhcnRzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjRm9ybU1hcmtJc0ZvclRzc1wiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1hcmsgPSB0aGF0LmlzKFwiOmNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByb3AoXCJjaGVja2VkXCIsICFtYXJrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuQnVzY2FydGJsQ3ljbGVQYXlcIikua2V5dXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNob3cgb25seSBtYXRjaGluZyBUUiwgaGlkZSByZXN0IG9mIHRoZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaCgkKFwiLnRibEN5Y2xlUGF5IHRib2R5IHRyXCIpLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudGV4dCgpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigkKF90aGlzKS52YWwoKS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpID09PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldHRpbmdzTmV3QW5kRWRpdDogZnVuY3Rpb24gKHZpZXdtb2RlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodmlld21vZGUgPT0gXCJlZGl0XCIpIHtcclxuICAgICAgICAgICAgJCgnLnNldGVhcnRpdHVsbycpLnRleHQoJ0VkaXRhciBuw7NtaW5hJyk7XHJcbiAgICAgICAgICAgICQoJy5jb250ZW5lZG9yLXBheWN5Y2xlJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5TaG93aWQnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgZm4uU2hvd3BheWN5Y2xlKCcyJyk7XHJcbiAgICAgICAgICAgICQoXCIjQ3VycmVuY3lJZFwiKS5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoXCIjUGF5RnJlY3VlbmN5XCIpLnByb3AoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiI1ZhbGlkRnJvbVwiKS5wcm9wKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgJChcIiNWYWxpZEZyb21cIikuYWRkQ2xhc3MoXCJkaXNhYmxlZERhdGVcIik7XHJcbiAgICAgICAgICAgICQoXCIjdG9nZ2xlLXRpdGxlXCIpLmF0dHIoXCJkYXRhLXZhbHVlXCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgJChcIiN0b2dnbGUtdGl0bGVcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgZm4uZnVudGlvbk5ld1BheXJvbGwoXCJvcGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTmV3QW5kRWRpdFBheXJvbGxzJykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIG9wdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICQoXCIudGJvZHlUYWJsZUN5Y2xlUGF5XCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAkKCcuU2hvd2lkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5zZXRlYXJ0aXR1bG8nKS50ZXh0KCdOdWV2YSBuw7NtaW5hJyk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI0N1cnJlbmN5SWRcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiI0lzUm95YWx0eVBheXJvbGxcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiI1BheUZyZWN1ZW5jeVwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICQoXCIjVmFsaWRGcm9tXCIpLnJlbW92ZUF0dHIoXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgJChcIiNWYWxpZEZyb21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZERhdGVcIik7XHJcbiAgICAgICAgICAgICQoXCIjdG9nZ2xlLXRpdGxlXCIpLmF0dHIoXCJkYXRhLXZhbHVlXCIsIFwiMlwiKTtcclxuICAgICAgICAgICAgJChcIiN0b2dnbGUtdGl0bGVcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGZuLmZ1bnRpb25OZXdQYXlyb2xsKFwib3BlblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vcmVkYXRhX3RibDogZnVuY3Rpb24gKF9tYXhzY3JvbGw6IG51bWJlciwgX25hbWVzY3JvbGw6IHN0cmluZywgX25hbWVib2R5OiBzdHJpbmcsIF9tb3JlUGFyYW1ldGVyOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbW9yZVBhcmFtZXRlcjogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBpZiAoX21vcmVQYXJhbWV0ZXIgIT0gXCJcIilcclxuICAgICAgICAgICAgbW9yZVBhcmFtZXRlciA9IGAmaWQ9JHtfbW9yZVBhcmFtZXRlcn1gO1xyXG5cclxuICAgICAgICBwYWdlKys7XHJcbiAgICAgICAgaXNCdXN5ID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIWlzZW1wdHkpIHtcclxuICAgICAgICAgICAgJC5nZXQoXCIvY2ljbG9wYWdvcy9tb3JlZGF0YT9wYWdlbnVtYmVyPVwiICsgcGFnZSArIG1vcmVQYXJhbWV0ZXIsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoX25hbWVib2R5KS5jaGlsZHJlbigpLmxhc3QoKS5hZnRlcihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChgIyR7X25hbWVzY3JvbGx9YCkuc2Nyb2xsVG9wKF9tYXhzY3JvbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzZW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5lc2N1Y2hhZG9yZXM6IHtcclxuICAgIC8vVG9nZ2xlXHJcbiAgICAkKFwiI3RvZ2dsZS10aXRsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIGZuLlNob3dwYXljeWNsZSh2YWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VsaW1pbmFyXHJcbiAgICAkKFwiI2RlbGV0ZVBheXJvbGxcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChcIi5zZWxlY3RQYXlyb2xsW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiSWRQYXlyb2xsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcIklkUGF5cm9sbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBheXJvbGxJZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmRlbGV0ZVBheXJvbGxcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGxvcyBjw7NkaWdvcyBkZSBuw7NtaW5hIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvbm9taW5hL2VsaW1pbmFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjZGVsZXRlUGF5cm9sbFwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuSWRQYXlyb2xsXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsUGF5cm9sbHMnKS5yZXBsYWNlV2l0aCgkKCcudGJsUGF5cm9sbHMnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0UGF5cm9sbFt0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLklkUGF5cm9sbFwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9hYnJpciBudWV2b1xyXG4gICAgJCgnLk5ld1BheXJvbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNOZXdBbmRFZGl0UGF5cm9sbHNcIikucmVtb3ZlQ2xhc3MoXCJoaWRlLWhlYWRlclwiKTtcclxuICAgICAgICAkKFwiI05ld0FuZEVkaXRQYXlyb2xsc1wiKS5hZGRDbGFzcyhcInNob3ctaGVhZGVyXCIpO1xyXG5cclxuICAgICAgICBmbi5TZXR0aW5nc05ld0FuZEVkaXQoXCJuZXdcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBWYXJpYWJsZSBwYXJhIGNvbnRyb2xhciBzaSBkZWJlIGNlcnJhciBkZXNwdcOpcyBkZSBndWFyZGFyXHJcbiAgICB2YXIgc2hvdWxkQ2xvc2VBZnRlclNhdmUgPSBmYWxzZTtcclxuXHJcbiAgICAvL3NhdmVcclxuICAgICQoXCIjTmV3QW5kRWRpdFBheXJvbGxzXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKFwiI0N1cnJlbmN5SWRcIikucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9ub21pbmEvZ3VhcmRhclwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpICsgYCZvcGVyYWNpb249JHtvcHRpb259YCxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUlHZW5lcmljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNDdXJyZW5jeUlkXCIpLnByb3AoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYSA9IGRhdGEuT2JqIGFzIElQYXlyb2xsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsUGF5cm9sbHMnKS5yZXBsYWNlV2l0aCgkKCcudGJsUGF5cm9sbHMnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNob3VsZENsb3NlQWZ0ZXJTYXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5mdW50aW9uTmV3UGF5cm9sbChcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkQ2xvc2VBZnRlclNhdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb24gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLlBheXJvbGxJZCcpLnZhbChhLlBheXJvbGxJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZXR0aW5nc05ld0FuZEVkaXQoXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEd1YXJkYXIgeSBjZXJyYXJcclxuICAgICQoJy5idG5TYXZlQW5kQ2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2hvdWxkQ2xvc2VBZnRlclNhdmUgPSB0cnVlO1xyXG4gICAgICAgICQoXCIjTmV3QW5kRWRpdFBheXJvbGxzXCIpLnN1Ym1pdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9lZGl0YXJcclxuICAgICQoJy5FZGl0UGF5cm9sbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IF9pZDogc3RyaW5nO1xyXG4gICAgICAgIHZhciBjb250YWRvciA9IDA7XHJcbiAgICAgICAgJChcIi5zZWxlY3RQYXlyb2xsW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICAgICAgX2lkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBheXJvbGxJZHRibFwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb250YWRvciA+IDEpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHNvbG8gcmVnaXN0cm8hXCIsIFwiaW5mb1wiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgIHVybDogYC9ub21pbmEvJHtfaWR9YCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBJRWFybmluZ0NvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9tYXRpY0JpbmRpbmcoZGF0YSwgXCIjTmV3QW5kRWRpdFBheXJvbGxzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hMaXN0UGF5Q3ljbGUoJCgnLlBheXJvbGxJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TZXR0aW5nc05ld0FuZEVkaXQoXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9jZXJyYXIgbnVldm9cclxuICAgICQoJy5PcENsb3NlZm9ybScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcuU2hvd2lkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgZm4uZnVudGlvbk5ld1BheXJvbGwoXCJjbG9zZVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG4gICAgLy9pciBhIGNvZGlnb3MgaW5hY3Rpdm9zXHJcbiAgICAkKCcuUGF5cm9sbC1kaXNhYmxlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL25vbWluYXNpbmFjdGl2YXNcIjtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vZGVoYWJpbGl0YXIgbsOzbWluYVxyXG4gICAgJCgnI0Rpc2VibGVQYXlyb2xsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBMaXN0SWQgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdFBheXJvbGxbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJwYXlyb2xsSWRPcFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJwYXlyb2xsSWRPcFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBheXJvbGxJZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmRpc2FibGVkUGF5cm9sbHNcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNEaXNlYmxlUGF5cm9sbFwiKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGluaGFiaWxpdGFyIG7Ds21pbmFzIHNlbGVjY2lvbmFkYXM/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL25vbWluYS9hY3R1YWxpemFyZXN0YXR1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI2Rpc2FibGVkUGF5cm9sbHNcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnBheXJvbGxJZE9wXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsUGF5cm9sbHMnKS5yZXBsYWNlV2l0aCgkKCcudGJsUGF5cm9sbHMnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0Rpc2VibGVQYXlyb2xsXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0UGF5cm9sbFt0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0Rpc2VibGVQYXlyb2xsXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5wYXlyb2xsSWRPcFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9Qcm9jZXNvIGRlIGRldGVjY2nDs24gZGVsIG1vdmltaWVudG8gZGVsIHNjcm9sbCBwYXJhIGFwbGljYXIgbGEgcGFnaW5hY2nDs25cclxuICAgICQoXCIjY29udGVudC1zY3JvbGwtY2hpbGRcIikuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgY3VycmVudHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgIGxldCBtYXhzY3JvbGwgPSAkKFwiLnRibEN5Y2xlUGF5XCIpLm91dGVySGVpZ2h0KHRydWUpIC0gJCh0aGlzKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBpZiAoY3VycmVudHNjcm9sbCA9PSBNYXRoLnJvdW5kKG1heHNjcm9sbCkpIHtcclxuICAgICAgICAgICAgaWYgKCFpc0J1c3kpIHtcclxuICAgICAgICAgICAgICAgIG1vcmVkYXRhKG1heHNjcm9sbCwgXCJjaWNsb3BhZ29zXCIsIFwiLnRib2R5VGFibGVDeWNsZVBheVwiLFwiXCIsZmFsc2UsJCgnI1BheXJvbGxJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vZm4ubW9yZWRhdGFfdGJsKG1heHNjcm9sbCwgdGhpcy5pZCwgXCIudGJvZHlUYWJsZUN5Y2xlUGF5XCIsICQoJyNQYXlyb2xsSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5vcHRpb25GaWx0ZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbkZpbHRlckZ1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgIGlmICgkKCcudGV4dEZpbHRlcicpLnZhbCgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS1QYXlyb2xsXCIsIFwiL25vbWluYS9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy50ZXh0RmlsdGVyTWFzaycpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICB0ZXh0RmlsdGVyTWFza0Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLVBheXJvbGxcIiwgXCIvbm9taW5hL0ZpbHRlck9yTW9yZURhdGFcIik7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vcGFnaW5hY2nDs25cclxuICAgICQoXCIjY29udGVudC1zY3JvbGxcIikuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgY3VycmVudHNjcm9sbCA9ICQoXCIjY29udGVudC1zY3JvbGxcIikuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgIGxldCBtYXhzY3JvbGwgPSAkKFwiLnRibFBheXJvbGxzXCIpLm91dGVySGVpZ2h0KHRydWUpIC0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBpZiAoY3VycmVudHNjcm9sbCA9PSBNYXRoLnJvdW5kKG1heHNjcm9sbCkpIHtcclxuICAgICAgICAgICAgaWYgKCFpc0J1c3kpIHtcclxuICAgICAgICAgICAgICAgIG1vcmVkYXRhKG1heHNjcm9sbCwgXCJub21pbmFcIiwgXCIudGJvZHktVGFibGUtUGF5cm9sbFwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYWJpbGl0YXIgZG9ibGUgY2xpYyBlbiBmaWxhcyBwYXJhIGVkaXRhclxyXG4gICAgZW5hYmxlUm93RG91YmxlQ2xpY2soXHJcbiAgICAgICAgJy50Ym9keS1UYWJsZS1QYXlyb2xsJyxcclxuICAgICAgICAnLlBheXJvbGxJZHRibCcsXHJcbiAgICAgICAgJy9ub21pbmEve2lkfScsXHJcbiAgICAgICAgZnVuY3Rpb24gKGRhdGE6IElQYXlyb2xsKSB7XHJcbiAgICAgICAgICAgIEF1dG9tYXRpY0JpbmRpbmcoZGF0YSwgXCIjTmV3QW5kRWRpdFBheXJvbGxzXCIpO1xyXG4gICAgICAgICAgICBmbi5TZWFyY2hMaXN0UGF5Q3ljbGUoJCgnLlBheXJvbGxJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBmbi5TZXR0aW5nc05ld0FuZEVkaXQoXCJlZGl0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgLy8gSW5pY2lhbGl6YXIgbW9kYWwgZGUgYXVkaXRvcsOtYVxyXG4gICAgaW5pdEF1ZGl0TGlzdFBhZ2UoJy5zZWxlY3RQYXlyb2xsJywgJy5QYXlyb2xsSWR0YmwnLCAnL25vbWluYS9nZXRieWlkJywgJ1BheXJvbGxJZCcpO1xyXG59XHJcblxyXG5leHBvcnQgeyB9Il19