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
                        if (option == 1) {
                            $('.PayrollId').val(a.PayrollId);
                            fn.SettingsNewAndEdit("edit");
                        }
                        windows_message(data.Message, data.Type);
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
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
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5cm9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL1BheXJvbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILFNBQVMsRUFBRSxDQUFDO0lBQ1IsSUFBSSxNQUFjLENBQUM7SUFDbkIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsSUFBSSxNQUFNLEdBQVksS0FBSyxDQUFDO0lBQzVCLElBQUksT0FBTyxHQUFZLEtBQUssQ0FBQztBQUVqQyxDQUFDO0FBRUQsTUFBTSxFQUFFLEdBQUc7SUFDUCwwQkFBMEI7SUFDMUIsaUJBQWlCLEVBQUUsVUFBVSxNQUFNO1FBQy9CLElBQUksTUFBTSxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RCxDQUFDO2FBQU0sQ0FBQztZQUNKLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxRQUFRLENBQUMs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QUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQ0osQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgUGF5cm9sbC50c1xyXG4gKiBAZGVzY3JpcHRpb24gTcOzZHVsbyBkZSBnZXN0acOzbiBkZSBwZXLDrW9kb3MgZGUgbsOzbWluYS4gUGVybWl0ZSBjcmVhciwgZWRpdGFyXHJcbiAqICAgICAgICAgICAgICB5IGFkbWluaXN0cmFyIGxvcyBwZXLDrW9kb3MgZGUgcGFnbyBkZSBsYSBvcmdhbml6YWNpw7NuLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBOb21pbmFcclxuICovXHJcblxyXG52YXJpYWJsZXM6IHtcclxuICAgIHZhciBvcHRpb246IG51bWJlcjtcclxuICAgIHZhciBwYWdlID0gMTtcclxuICAgIHZhciBpc0J1c3k6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHZhciBpc2VtcHR5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG59XHJcblxyXG5jb25zdCBmbiA9IHtcclxuICAgIC8vZnVuY2lvbiBhYnJpciBmb3JtdWxhcmlvXHJcbiAgICBmdW50aW9uTmV3UGF5cm9sbDogZnVuY3Rpb24gKG9wdGlvbikge1xyXG4gICAgICAgIGlmIChvcHRpb24gPT0gXCJvcGVuXCIpIHtcclxuICAgICAgICAgICAgJCgnLkNvbnRlbmVkb3JMaXN0RW50aXR5JykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5jb250TmV3RW50eXRpJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5vcGNpb25lc2xpc3RwYWdlRm9ybScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnRlbmVkb3ItcGF5Y3ljbGUnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNob3dwYXljeWNsZTogZnVuY3Rpb24gKG9wdGlvbikge1xyXG4gICAgICAgIGlmIChvcHRpb24gPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgJCgnI3RvZ2dsZS10aXRsZScpLmF0dHIoXCJkYXRhLXZhbHVlXCIsIFwiMlwiKTtcclxuICAgICAgICAgICAgJCgnI3RvZ2dsZS10aXRsZScpLnJlbW92ZUNsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICQoJyN0b2dnbGUtdGl0bGUnKS5hZGRDbGFzcyhcImZhLWFuZ2xlLWRvd25cIik7XHJcbiAgICAgICAgICAgICQoXCIjTmV3QW5kRWRpdFBheXJvbGxzXCIpLnJlbW92ZUNsYXNzKFwic2hvdy1oZWFkZXJcIik7XHJcbiAgICAgICAgICAgICQoXCIjTmV3QW5kRWRpdFBheXJvbGxzXCIpLmFkZENsYXNzKFwiaGlkZS1oZWFkZXJcIik7XHJcbiAgICAgICAgICAgICQoXCIuY29udGVuZWRvci1wYXljeWNsZSA+IC5UaXR1bG9Gb3JtdWxhcmlvc1wiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAkKFwiLnNldGVhcnRpdHVsb1wiKS50ZXh0KFwiRWRpdGFyIG7Ds21pbmEgLSBDaWNsb3MgZGUgcGFnb1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyN0b2dnbGUtdGl0bGUnKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCBcIjFcIik7XHJcbiAgICAgICAgICAgICQoJyN0b2dnbGUtdGl0bGUnKS5hZGRDbGFzcyhcImZhLWFuZ2xlLXVwXCIpO1xyXG4gICAgICAgICAgICAkKCcjdG9nZ2xlLXRpdGxlJykucmVtb3ZlQ2xhc3MoXCJmYS1hbmdsZS1kb3duXCIpO1xyXG4gICAgICAgICAgICAkKFwiI05ld0FuZEVkaXRQYXlyb2xsc1wiKS5yZW1vdmVDbGFzcyhcImhpZGUtaGVhZGVyXCIpO1xyXG4gICAgICAgICAgICAkKFwiI05ld0FuZEVkaXRQYXlyb2xsc1wiKS5hZGRDbGFzcyhcInNob3ctaGVhZGVyXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmNvbnRlbmVkb3ItcGF5Y3ljbGUgPiAuVGl0dWxvRm9ybXVsYXJpb3NcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgJChcIi5zZXRlYXJ0aXR1bG9cIikudGV4dChcIkVkaXRhciBuw7NtaW5hXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy9CdXNjYXIgbGlzdGEgZGUgY2xpY2xvcyBkZSBwYWdvXHJcbiAgICBTZWFyY2hMaXN0UGF5Q3ljbGU6IGZ1bmN0aW9uIChfcGF5cm9sbElkOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGBjaWNsb3BhZ29zLyR7X3BheXJvbGxJZH1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc3RheDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnRib2R5VGFibGVDeWNsZVBheVwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi50Ym9keVRhYmxlQ3ljbGVQYXlcIikuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9NYXJjYXIgY29tbyBpbXB1ZXN0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmlzZm9ydGF4XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUGF5cm9sbElkVGF4XCIpLnZhbCgkKFwiI1BheXJvbGxJZFwiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuUGF5Q3ljbGVJZFRheFwiKS52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBheUN5Y2xlSWR0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLklzRm9yVGF4VGF4XCIpLnByb3AoJ2NoZWNrZWQnLCAkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5Jc0ZvclRheFRheFwiKS52YWwoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aGF0ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9jaWNsb3BhZ29zL21hcmNhcmltcHVlc3RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNGb3JtTWFya0lzRm9yVGF4XCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFyayA9IHRoYXQuaXMoXCI6Y2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJvcChcImNoZWNrZWRcIiwgIW1hcmspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9NYXJjYXIgY29tbyB0c3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5pc2ZvcnRzc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLlBheXJvbGxJZFRzc1wiKS52YWwoJChcIiNQYXlyb2xsSWRcIikudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLlBheUN5Y2xlSWRUc3NcIikudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5QYXlDeWNsZUlkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5Jc0ZvclRzc1wiKS5wcm9wKFwiY2hlY2tlZFwiLCAkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5Jc0ZvclRzc1wiKS52YWwoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aGF0ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9jaWNsb3BhZ29zL21hcmNhcnRzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjRm9ybU1hcmtJc0ZvclRzc1wiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1hcmsgPSB0aGF0LmlzKFwiOmNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByb3AoXCJjaGVja2VkXCIsICFtYXJrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuQnVzY2FydGJsQ3ljbGVQYXlcIikua2V5dXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNob3cgb25seSBtYXRjaGluZyBUUiwgaGlkZSByZXN0IG9mIHRoZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaCgkKFwiLnRibEN5Y2xlUGF5IHRib2R5IHRyXCIpLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudGV4dCgpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigkKF90aGlzKS52YWwoKS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpID09PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldHRpbmdzTmV3QW5kRWRpdDogZnVuY3Rpb24gKHZpZXdtb2RlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodmlld21vZGUgPT0gXCJlZGl0XCIpIHtcclxuICAgICAgICAgICAgJCgnLnNldGVhcnRpdHVsbycpLnRleHQoJ0VkaXRhciBuw7NtaW5hJyk7XHJcbiAgICAgICAgICAgICQoJy5jb250ZW5lZG9yLXBheWN5Y2xlJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5TaG93aWQnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgZm4uU2hvd3BheWN5Y2xlKCcyJyk7XHJcbiAgICAgICAgICAgICQoXCIjQ3VycmVuY3lJZFwiKS5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoXCIjUGF5RnJlY3VlbmN5XCIpLnByb3AoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiI1ZhbGlkRnJvbVwiKS5wcm9wKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgJChcIiNWYWxpZEZyb21cIikuYWRkQ2xhc3MoXCJkaXNhYmxlZERhdGVcIik7XHJcbiAgICAgICAgICAgICQoXCIjdG9nZ2xlLXRpdGxlXCIpLmF0dHIoXCJkYXRhLXZhbHVlXCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgJChcIiN0b2dnbGUtdGl0bGVcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgZm4uZnVudGlvbk5ld1BheXJvbGwoXCJvcGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTmV3QW5kRWRpdFBheXJvbGxzJykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIG9wdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICQoXCIudGJvZHlUYWJsZUN5Y2xlUGF5XCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAkKCcuU2hvd2lkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5zZXRlYXJ0aXR1bG8nKS50ZXh0KCdOdWV2YSBuw7NtaW5hJyk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI0N1cnJlbmN5SWRcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiI0lzUm95YWx0eVBheXJvbGxcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiI1BheUZyZWN1ZW5jeVwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICQoXCIjVmFsaWRGcm9tXCIpLnJlbW92ZUF0dHIoXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgJChcIiNWYWxpZEZyb21cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZERhdGVcIik7XHJcbiAgICAgICAgICAgICQoXCIjdG9nZ2xlLXRpdGxlXCIpLmF0dHIoXCJkYXRhLXZhbHVlXCIsIFwiMlwiKTtcclxuICAgICAgICAgICAgJChcIiN0b2dnbGUtdGl0bGVcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGZuLmZ1bnRpb25OZXdQYXlyb2xsKFwib3BlblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vcmVkYXRhX3RibDogZnVuY3Rpb24gKF9tYXhzY3JvbGw6IG51bWJlciwgX25hbWVzY3JvbGw6IHN0cmluZywgX25hbWVib2R5OiBzdHJpbmcsIF9tb3JlUGFyYW1ldGVyOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbW9yZVBhcmFtZXRlcjogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBpZiAoX21vcmVQYXJhbWV0ZXIgIT0gXCJcIilcclxuICAgICAgICAgICAgbW9yZVBhcmFtZXRlciA9IGAmaWQ9JHtfbW9yZVBhcmFtZXRlcn1gO1xyXG5cclxuICAgICAgICBwYWdlKys7XHJcbiAgICAgICAgaXNCdXN5ID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIWlzZW1wdHkpIHtcclxuICAgICAgICAgICAgJC5nZXQoXCIvY2ljbG9wYWdvcy9tb3JlZGF0YT9wYWdlbnVtYmVyPVwiICsgcGFnZSArIG1vcmVQYXJhbWV0ZXIsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoX25hbWVib2R5KS5jaGlsZHJlbigpLmxhc3QoKS5hZnRlcihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChgIyR7X25hbWVzY3JvbGx9YCkuc2Nyb2xsVG9wKF9tYXhzY3JvbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzZW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5lc2N1Y2hhZG9yZXM6IHtcclxuICAgIC8vVG9nZ2xlXHJcbiAgICAkKFwiI3RvZ2dsZS10aXRsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIGZuLlNob3dwYXljeWNsZSh2YWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VsaW1pbmFyXHJcbiAgICAkKFwiI2RlbGV0ZVBheXJvbGxcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChcIi5zZWxlY3RQYXlyb2xsW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiSWRQYXlyb2xsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcIklkUGF5cm9sbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBheXJvbGxJZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmRlbGV0ZVBheXJvbGxcIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGxvcyBjw7NkaWdvcyBkZSBuw7NtaW5hIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvbm9taW5hL2VsaW1pbmFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjZGVsZXRlUGF5cm9sbFwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuSWRQYXlyb2xsXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsUGF5cm9sbHMnKS5yZXBsYWNlV2l0aCgkKCcudGJsUGF5cm9sbHMnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0UGF5cm9sbFt0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLklkUGF5cm9sbFwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9hYnJpciBudWV2b1xyXG4gICAgJCgnLk5ld1BheXJvbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNOZXdBbmRFZGl0UGF5cm9sbHNcIikucmVtb3ZlQ2xhc3MoXCJoaWRlLWhlYWRlclwiKTtcclxuICAgICAgICAkKFwiI05ld0FuZEVkaXRQYXlyb2xsc1wiKS5hZGRDbGFzcyhcInNob3ctaGVhZGVyXCIpO1xyXG5cclxuICAgICAgICBmbi5TZXR0aW5nc05ld0FuZEVkaXQoXCJuZXdcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3NhdmVcclxuICAgICQoXCIjTmV3QW5kRWRpdFBheXJvbGxzXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKFwiI0N1cnJlbmN5SWRcIikucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9ub21pbmEvZ3VhcmRhclwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpICsgYCZvcGVyYWNpb249JHtvcHRpb259YCxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUlHZW5lcmljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNDdXJyZW5jeUlkXCIpLnByb3AoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYSA9IGRhdGEuT2JqIGFzIElQYXlyb2xsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsUGF5cm9sbHMnKS5yZXBsYWNlV2l0aCgkKCcudGJsUGF5cm9sbHMnLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5QYXlyb2xsSWQnKS52YWwoYS5QYXlyb2xsSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNldHRpbmdzTmV3QW5kRWRpdChcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VkaXRhclxyXG4gICAgJCgnLkVkaXRQYXlyb2xsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yID0gMDtcclxuICAgICAgICAkKFwiLnNlbGVjdFBheXJvbGxbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcbiAgICAgICAgICAgICAgICBfaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuUGF5cm9sbElkdGJsXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyByZWdpc3RybyFcIiwgXCJpbmZvXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgdXJsOiBgL25vbWluYS8ke19pZH1gLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IElFYXJuaW5nQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhkYXRhLCBcIiNOZXdBbmRFZGl0UGF5cm9sbHNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaExpc3RQYXlDeWNsZSgkKCcuUGF5cm9sbElkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNldHRpbmdzTmV3QW5kRWRpdChcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2NlcnJhciBudWV2b1xyXG4gICAgJCgnLk9wQ2xvc2Vmb3JtJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5TaG93aWQnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICBmbi5mdW50aW9uTmV3UGF5cm9sbChcImNsb3NlXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcbiAgICAvL2lyIGEgY29kaWdvcyBpbmFjdGl2b3NcclxuICAgICQoJy5QYXlyb2xsLWRpc2FibGVkJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvbm9taW5hc2luYWN0aXZhc1wiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9kZWhhYmlsaXRhciBuw7NtaW5hXHJcbiAgICAkKCcjRGlzZWJsZVBheXJvbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgdmFyIExpc3RJZCA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgICAgICQoXCIuc2VsZWN0UGF5cm9sbFt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcInBheXJvbGxJZE9wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcInBheXJvbGxJZE9wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuUGF5cm9sbElkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuZGlzYWJsZWRQYXlyb2xsc1wiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0Rpc2VibGVQYXlyb2xsXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgaW5oYWJpbGl0YXIgbsOzbWluYXMgc2VsZWNjaW9uYWRhcz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvbm9taW5hL2FjdHVhbGl6YXJlc3RhdHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjZGlzYWJsZWRQYXlyb2xsc1wiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIucGF5cm9sbElkT3BcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZ2V0KGxvY2F0aW9uLmhyZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy50YmxQYXlyb2xscycpLnJlcGxhY2VXaXRoKCQoJy50YmxQYXlyb2xscycsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRGlzZWJsZVBheXJvbGxcIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RQYXlyb2xsW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRGlzZWJsZVBheXJvbGxcIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnBheXJvbGxJZE9wXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1Byb2Nlc28gZGUgZGV0ZWNjacOzbiBkZWwgbW92aW1pZW50byBkZWwgc2Nyb2xsIHBhcmEgYXBsaWNhciBsYSBwYWdpbmFjacOzblxyXG4gICAgJChcIiNjb250ZW50LXNjcm9sbC1jaGlsZFwiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50c2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgbGV0IG1heHNjcm9sbCA9ICQoXCIudGJsQ3ljbGVQYXlcIikub3V0ZXJIZWlnaHQodHJ1ZSkgLSAkKHRoaXMpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIGlmIChjdXJyZW50c2Nyb2xsID09IE1hdGgucm91bmQobWF4c2Nyb2xsKSkge1xyXG4gICAgICAgICAgICBpZiAoIWlzQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgbW9yZWRhdGEobWF4c2Nyb2xsLCBcImNpY2xvcGFnb3NcIiwgXCIudGJvZHlUYWJsZUN5Y2xlUGF5XCIsXCJcIixmYWxzZSwkKCcjUGF5cm9sbElkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9mbi5tb3JlZGF0YV90YmwobWF4c2Nyb2xsLCB0aGlzLmlkLCBcIi50Ym9keVRhYmxlQ3ljbGVQYXlcIiwgJCgnI1BheXJvbGxJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLm9wdGlvbkZpbHRlcicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgb3B0aW9uRmlsdGVyRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgaWYgKCQoJy50ZXh0RmlsdGVyJykudmFsKCkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLVBheXJvbGxcIiwgXCIvbm9taW5hL0ZpbHRlck9yTW9yZURhdGFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnRleHRGaWx0ZXJNYXNrJykub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIga2V5Y29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG4gICAgICAgIGlmIChrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgIHRleHRGaWx0ZXJNYXNrRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtUGF5cm9sbFwiLCBcIi9ub21pbmEvRmlsdGVyT3JNb3JlRGF0YVwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9wYWdpbmFjacOzblxyXG4gICAgJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50c2Nyb2xsID0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgbGV0IG1heHNjcm9sbCA9ICQoXCIudGJsUGF5cm9sbHNcIikub3V0ZXJIZWlnaHQodHJ1ZSkgLSAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIGlmIChjdXJyZW50c2Nyb2xsID09IE1hdGgucm91bmQobWF4c2Nyb2xsKSkge1xyXG4gICAgICAgICAgICBpZiAoIWlzQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgbW9yZWRhdGEobWF4c2Nyb2xsLCBcIm5vbWluYVwiLCBcIi50Ym9keS1UYWJsZS1QYXlyb2xsXCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhYmlsaXRhciBkb2JsZSBjbGljIGVuIGZpbGFzIHBhcmEgZWRpdGFyXHJcbiAgICBlbmFibGVSb3dEb3VibGVDbGljayhcclxuICAgICAgICAnLnRib2R5LVRhYmxlLVBheXJvbGwnLFxyXG4gICAgICAgICcuUGF5cm9sbElkdGJsJyxcclxuICAgICAgICAnL25vbWluYS97aWR9JyxcclxuICAgICAgICBmdW5jdGlvbiAoZGF0YTogSVBheXJvbGwpIHtcclxuICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhkYXRhLCBcIiNOZXdBbmRFZGl0UGF5cm9sbHNcIik7XHJcbiAgICAgICAgICAgIGZuLlNlYXJjaExpc3RQYXlDeWNsZSgkKCcuUGF5cm9sbElkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGZuLlNldHRpbmdzTmV3QW5kRWRpdChcImVkaXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IHsgfSJdfQ==