variables: {
    var operation = 0;
    var dom_element = {
        form: "#new_EarningCode",
        url_buscar_form: "/codigosgananciaempleados/FormNewEarningCode",
        url_buscar: "/codigosgananciaempleados",
        div_table: ".datatable-EarningCode",
        row_table: ".rowtable-EarningCode",
        cont_form: ".cont-form-newEarningCode",
        btn_cancelar: '.btncancelar_new_EarningCode',
        id_principal: '#EmployeeIdEarningCode',
        url_guardar: "/codigosgananciaempleados/guardar",
        btn_abrir: '.open-employee-earningCode',
        modal: '.modal-employee-EarningCode',
        btn_cerrar: '.close-modal-EarningCode',
        class_name_delete: "listid_EarningCode",
        form_delete: "#form-deleteEarningCode",
        class_check: ".select-EarningCode",
        url_eliminar: "/codigosgananciaempleados/eliminar",
        btn_nuevo: '.new-EarningCode'
    };
}
//Arreglo de funciones
const fn = {
    //Buscar informaciones de codigo de ganancia del empleado
    SearchEarningCode: function (_idEmployee) {
        $.ajax({
            url: `${dom_element.url_buscar}/${_idEmployee}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(dom_element.div_table).html('');
                    $(dom_element.div_table).append(data);
                    $(dom_element.row_table).dblclick(function myfunction() {
                        operation = 2;
                        $('.btnnewAdreesli').text("Editar");
                        fn.SearchEmployeeEarningCodeId(_idEmployee, $(this).find(".EarningCodeIdtbl").html().trim());
                        $('.container-modal-scrolling').scrollTop(0);
                    });
                    $('.optionFilterModal').on('change', function () {
                        if ($('.textFilterModal').val() != "") {
                            DatafilterModals(".Table-EmployeeEarningCode", "/codigosgananciaempleados/FilterOrMoreData", $('#EmployeeId').val().toString().trim());
                        }
                    });
                    $('.textFilterModal').on('keyup', function (e) {
                        var keycode = e.keyCode || e.which;
                        if (keycode == 13) {
                            DatafilterModals(".Table-EmployeeEarningCode", "/codigosgananciaempleados/FilterOrMoreData", $('#EmployeeId').val().toString().trim());
                        }
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    //Buscar formulario de nuevo y editar
    SearchEmployeeEarningCodeForm: function () {
        $.ajax({
            url: dom_element.url_buscar_form,
            type: "GET",
            async: false,
            success: function (data) {
                if (data.length > 0) {
                    fn.ShowForm(data);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    //Buscar codigo de ganancia para editar
    SearchEmployeeEarningCodeId: function (_idEmployee, _internalId) {
        $.ajax({
            url: `${dom_element.url_buscar}/${_idEmployee}/${_internalId}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    if (data.length > 0) {
                        fn.ShowForm(data);
                    }
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    //Save Employee earning code
    SaveEmployeeEarningCode: function (_IsForDGT) {
        $.ajax({
            url: dom_element.url_guardar,
            type: "POST",
            data: $(dom_element.form).serialize() + `&operation=${operation}&_IsForDGT=${_IsForDGT}`,
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                if (data.Type == "error") {
                    var _errors = "";
                    data.Errors.forEach(function (x) {
                        _errors += `${x}<br>`;
                    });
                    windows_message(_errors, data.Type);
                }
                else {
                    $('.btnnewAdreesli').text("Nuevo");
                    fn.SearchEarningCode($('#EmployeeId').val().toString());
                    let form = document.querySelector(dom_element.form);
                    form.reset();
                    $(dom_element.cont_form).addClass("collapse");
                    windows_message(data.Message, data.Type);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    //Mostrar y configurar el nuevo formulario en el dom
    ShowForm: function (data) {
        $(dom_element.cont_form).html('');
        $(dom_element.cont_form).append(data);
        //cerrar formulario de nuevo
        $(dom_element.btn_cancelar).on('click', function () {
            $('.btnnewAdreesli').text("Nuevo");
            $(dom_element.cont_form).addClass("collapse");
        });
        //Buscar ciclos de pagos al cambiar el código de la nómina//
        $("#PayrollId").on("change", function () {
            $.ajax({
                url: `/codigosgananciaempleados/ciclospago/${$("#PayrollId").val()}`,
                type: "Get",
                async: true,
                success: function (data) {
                    if (data.length > 0) {
                        $("#StartPeriodForPaid").html('');
                        $("#PayFrecuency").val(data[0].PayFrecuency);
                        fn.CalcAmount();
                        $(data).each(function () {
                            var option = $(document.createElement('option'));
                            option.text(`[ ${(FormatDateAutoBinding(this.PeriodStartDate))} ] - [ ${(FormatDateAutoBinding(this.PeriodEndDate))} ]`);
                            option.val(this.PayCycleId);
                            $("#StartPeriodForPaid").append(option);
                        });
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        });
        $('#IndexEarningMonthly').on('change', function () {
            fn.CalcAmount();
        });
        //save
        $(dom_element.form).submit(function (e) {
            if ($(this).valid()) {
                e.preventDefault();
                if ($('#IndexEarningMonthlyValidate').val().toString() != $('#IndexEarningMonthly').val().toString() && $('#IsUseDGT').is(":checked")) {
                    windows_message("¿Desea que el cambio se guardar para el DGT?", "confirm", {
                        onOk: function () {
                            fn.SaveEmployeeEarningCode(true);
                        },
                        onCancel: function () {
                            fn.SaveEmployeeEarningCode(false);
                        }
                    }, { Ok: "Si", Cancel: "No" });
                }
                else {
                    fn.SaveEmployeeEarningCode(false);
                }
            }
        });
        $(dom_element.id_principal).val($('#EmployeeId').val().toString());
        $(dom_element.cont_form).removeClass("collapse");
        InstaciateListener();
        $('.message-help').on('change', function () {
            fn.help_message();
        });
        fn.help_message();
        //Plugin de numeros
        UsePluginNumberFormat(dom_element.form);
    },
    help_message: function () {
        let qty = $("#QtyPeriodForPaid").val().toString();
        let period = $('select[id="StartPeriodForPaid"] option:selected').text();
        if (qty != "0") {
            const help = `Este código de ganacia se calculará cada ${qty} período/s a partir de las fechas ${period}`;
            console.log(help);
            $("#alert-help").text(help);
        }
    },
    CalcAmount: function () {
        let frecuency = $("#PayFrecuency").val().toString();
        let amount = FormatoNumericos_Calcular($("#IndexEarningMonthly").val().toString());
        let newamount = 0;
        let newamountDaily = 0;
        //IndexEarningMountly
        switch (frecuency) {
            case "0":
                newamount = amount / 23.83;
                newamountDaily = newamount;
                break;
            case "1": //Semanal
                newamount = amount / 4;
                newamountDaily = amount / 23.83;
                break;
            case "2": //Bi semanal
                newamount = amount / 2;
                newamountDaily = amount / 23.83;
                break;
            case "3": //Quincenal
                newamount = amount / 2;
                newamountDaily = amount / 23.83;
                break;
            case "4": //Mensual
                newamount = amount / 1;
                newamountDaily = amount / 23.83;
                break;
            case "5": //Trimestral
                newamount = amount * 3;
                newamountDaily = amount / 23.83;
                break;
        }
        $("#IndexEarning").val(FormatoNumericos_Mostrar(newamount.toString(), true));
        $("#IndexEarningDiary").val(FormatoNumericos_Mostrar(newamountDaily.toString(), true));
        let amountHour = newamountDaily / 8;
        $("#IndexEarningHour").val(FormatoNumericos_Mostrar(amountHour.toString(), true));
    }
};
escuchadores: {
    //Abrir información codigo de canancia
    $(dom_element.btn_abrir).on('click', function () {
        fn.SearchEarningCode($('#EmployeeId').val().toString());
        $(dom_element.modal).modal({ backdrop: 'static', keyboard: false });
    });
    //Cerrar modal de información de contacto
    $(dom_element.btn_cerrar).on('click', function () {
        $(dom_element.cont_form).html('');
        $(dom_element.modal).modal("hide");
    });
    //Abrir formulario de nuevo
    $(dom_element.btn_nuevo).on('click', function () {
        operation = 1;
        fn.SearchEmployeeEarningCodeForm();
        //Funcion para mover el scroll, para mejor diseño
        $('.container-modal-scrolling').scrollTop(0);
    });
    //eliminar informacion de contacto
    $(dom_element.form_delete).submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(`${dom_element.class_check}[type=checkbox]`).each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", dom_element.class_name_delete);
                    input.attr("class", dom_element.class_name_delete);
                    input.val($(this).parent().parent().find(".EarningCodeIdtbl").html().trim());
                    $(dom_element.form_delete).append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los códigos de ganancias seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: dom_element.url_eliminar,
                            type: "POST",
                            data: $(dom_element.form_delete).serialize() + `&employeeid=${$('#EmployeeId').val().toString().trim()}`,
                            async: true,
                            success: function (data) {
                                $('.progreso').modal('hide');
                                if (data.Type == "error") {
                                    var _errors = "";
                                    data.Errors.forEach(function (x) {
                                        _errors += `${x}<br>`;
                                    });
                                    $(`.${dom_element.class_name_delete}`).remove();
                                    windows_message(_errors, data.Type);
                                }
                                else {
                                    fn.SearchEarningCode($('#EmployeeId').val().toString());
                                    $(`.${dom_element.class_name_delete}`).remove();
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(`${dom_element.class_check}[type=checkbox]`).prop('checked', false);
                        $(`.${dom_element.class_name_delete}`).remove();
                    }
                });
            }
        }
    });
    //Para diseño, se oculta el indicador al hacer scroll
    $(".container-modal-scrolling").scroll(function () {
        let positionScroll = $(this).scrollTop();
        if (positionScroll > 0)
            $('.for-employee-contactinfo').addClass('collapse');
        else
            $('.for-employee-contactinfo').removeClass('collapse');
    });
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWFybmluZ0NvZGVFbXBsb3llZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1R5cGVTY3JpcHRGaWxlL0VtcGxveWVlcy9FYXJuaW5nQ29kZUVtcGxveWVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsRUFBRSxDQUFDO0lBcUJSLElBQUksU0FBUyxHQUFXLENBQUMsQ0FBQztJQUMxQixJQUFJLFdBQVcsR0FBc0I7UUFDakMsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixlQUFlLEVBQUUsOENBQThDO1FBQy9ELFVBQVUsRUFBRSwyQkFBMkI7UUFDdkMsU0FBUyxFQUFFLHdCQUF3QjtRQUNuQyxTQUFTLEVBQUUsdUJBQXVCO1FBQ2xDLFNBQVMsRUFBRSwyQkFBMkI7UUFDdEMsWUFBWSxFQUFFLDhCQUE4QjtRQUM1QyxZQUFZLEVBQUUsd0JBQXdCO1FBQ3RDLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsU0FBUyxFQUFFLDRCQUE0QjtRQUN2QyxLQUFLLEVBQUUsNkJBQTZCO1FBQ3BDLFVBQVUsRUFBRSwwQkFBMEI7UUFDdEMsaUJBQWlCLEVBQUUsb0JBQW9CO1FBQ3ZDLFdBQVcsRUFBRSx5QkFBeUI7UUFDdEMsV0FBVyxFQUFFLHFCQUFxQjtRQUNsQyxZQUFZLEVBQUUsb0NBQW9DO1FBQ2xELFNBQVMsRUFBRSxrQkFBa0I7S0FDaEMsQ0FBQTtBQUdMLENBQUM7QUFFRCxzQkFBc0I7QUFDdEIsTUFBTSxFQUFFLEdBQUc7SUFFUCx5REFBeUQ7SUFDekQsaUJBQWlCLEVBQUUsVUFBVSxXQUFtQjtRQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsR0FBRyxFQUFFLEdBQUcsV0FBVyxDQUFDLFVBQVUsSUFBSSxXQUFXLEVBQUU7WUFDL0MsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsSUFBSTtZQUNYLE9BQU8sRUFBRSxVQUFVLElBQUk7Z0JBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUs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QztvQ0FDaEQsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUM3QyxDQUFDOzRCQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHO2dDQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDOUIsQ0FBQzt5QkFFSixDQUFDLENBQUM7b0JBQ1AsQ0FBQztvQkFDRCxRQUFRLEVBQUU7d0JBQ04sQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLFdBQVcsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUN0RSxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNwRCxDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxxREFBcUQ7SUFDckQsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksY0FBYyxHQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqRCxJQUFJLGNBQWMsR0FBRyxDQUFDO1lBQ2xCLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7WUFFcEQsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9ELENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbInZhcmlhYmxlczoge1xyXG4gICAgaW50ZXJmYWNlIElEb21FbGVtZW50X01vZGFsIHtcclxuICAgICAgICBmb3JtOiBzdHJpbmdcclxuICAgICAgICB1cmxfYnVzY2FyX2Zvcm06IHN0cmluZyAvLyBidXNjYXIgZm9ybXVsYXJpb1xyXG4gICAgICAgIHVybF9idXNjYXI6IHN0cmluZyAvLyBidXNjYXIgbGlzdGFcclxuICAgICAgICB1cmxfZ3VhcmRhcjogc3RyaW5nIC8vIGd1YXJkYXJcclxuICAgICAgICB1cmxfZWxpbWluYXI6IHN0cmluZyAvL2VsaW1pbmFyXHJcbiAgICAgICAgZGl2X3RhYmxlOiBzdHJpbmcgLy9EaXYgZG9uZGUgdmEgbGEgdGFibGEgY29uIGxhIGxpc3RhXHJcbiAgICAgICAgcm93X3RhYmxlOiBzdHJpbmcgLy9QYXJhIGVsIGV2ZW50byBkb2JsZWNsaWNrIGFsIGVkaXRhclxyXG4gICAgICAgIGNvbnRfZm9ybTogc3RyaW5nIC8vQ29udGVuZWRvciBkZWwgZm9ybXVsYXJpbyBudWV2byB5IGVkaXRhciBxdWUgc2Ugb2N1bHRhXHJcbiAgICAgICAgYnRuX2NhbmNlbGFyOiBzdHJpbmcgLy9Cb3TDs24gZGUgY2FuY2VsYXJcclxuICAgICAgICBpZF9wcmluY2lwYWw6IHN0cmluZyAvL0lkIHByaW5jaXBhbCBkZSBlbXBsZWFkb1xyXG4gICAgICAgIGJ0bl9hYnJpcjogc3RyaW5nIC8vQm90w7NuIGRlIGFicmlyIGVsIG1vZGFsXHJcbiAgICAgICAgbW9kYWw6IHN0cmluZyAvL01vZGFsXHJcbiAgICAgICAgYnRuX2NlcnJhcjogc3RyaW5nIC8vIGJvdG9uIGRlIGNlcnJhciBtb2RhbFxyXG4gICAgICAgIGNsYXNzX25hbWVfZGVsZXRlOiBzdHJpbmcgLy8gbm9tYnJlIGRlIGxhIGNsYXNlIHBhcmEgZWxpbWluYXJcclxuICAgICAgICBmb3JtX2RlbGV0ZTogc3RyaW5nIC8vIGZvcm11bGFyaW8gcGFyYSBlbGltaW5hcixcclxuICAgICAgICBjbGFzc19jaGVjazogc3RyaW5nIC8vIENoZWNrYm94eCBkZSBsYSB0YWJsYVxyXG4gICAgICAgIGJ0bl9udWV2bzogc3RyaW5nIC8vQm90w7NuIGRlIG51ZXZvXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9wZXJhdGlvbjogbnVtYmVyID0gMDtcclxuICAgIHZhciBkb21fZWxlbWVudDogSURvbUVsZW1lbnRfTW9kYWwgPSB7XHJcbiAgICAgICAgZm9ybTogXCIjbmV3X0Vhcm5pbmdDb2RlXCIsXHJcbiAgICAgICAgdXJsX2J1c2Nhcl9mb3JtOiBcIi9jb2RpZ29zZ2FuYW5jaWFlbXBsZWFkb3MvRm9ybU5ld0Vhcm5pbmdDb2RlXCIsXHJcbiAgICAgICAgdXJsX2J1c2NhcjogXCIvY29kaWdvc2dhbmFuY2lhZW1wbGVhZG9zXCIsXHJcbiAgICAgICAgZGl2X3RhYmxlOiBcIi5kYXRhdGFibGUtRWFybmluZ0NvZGVcIixcclxuICAgICAgICByb3dfdGFibGU6IFwiLnJvd3RhYmxlLUVhcm5pbmdDb2RlXCIsXHJcbiAgICAgICAgY29udF9mb3JtOiBcIi5jb250LWZvcm0tbmV3RWFybmluZ0NvZGVcIixcclxuICAgICAgICBidG5fY2FuY2VsYXI6ICcuYnRuY2FuY2VsYXJfbmV3X0Vhcm5pbmdDb2RlJyxcclxuICAgICAgICBpZF9wcmluY2lwYWw6ICcjRW1wbG95ZWVJZEVhcm5pbmdDb2RlJyxcclxuICAgICAgICB1cmxfZ3VhcmRhcjogXCIvY29kaWdvc2dhbmFuY2lhZW1wbGVhZG9zL2d1YXJkYXJcIixcclxuICAgICAgICBidG5fYWJyaXI6ICcub3Blbi1lbXBsb3llZS1lYXJuaW5nQ29kZScsXHJcbiAgICAgICAgbW9kYWw6ICcubW9kYWwtZW1wbG95ZWUtRWFybmluZ0NvZGUnLFxyXG4gICAgICAgIGJ0bl9jZXJyYXI6ICcuY2xvc2UtbW9kYWwtRWFybmluZ0NvZGUnLFxyXG4gICAgICAgIGNsYXNzX25hbWVfZGVsZXRlOiBcImxpc3RpZF9FYXJuaW5nQ29kZVwiLFxyXG4gICAgICAgIGZvcm1fZGVsZXRlOiBcIiNmb3JtLWRlbGV0ZUVhcm5pbmdDb2RlXCIsXHJcbiAgICAgICAgY2xhc3NfY2hlY2s6IFwiLnNlbGVjdC1FYXJuaW5nQ29kZVwiLFxyXG4gICAgICAgIHVybF9lbGltaW5hcjogXCIvY29kaWdvc2dhbmFuY2lhZW1wbGVhZG9zL2VsaW1pbmFyXCIsXHJcbiAgICAgICAgYnRuX251ZXZvOiAnLm5ldy1FYXJuaW5nQ29kZSdcclxuICAgIH1cclxuXHJcbiAgICBcclxufVxyXG5cclxuLy9BcnJlZ2xvIGRlIGZ1bmNpb25lc1xyXG5jb25zdCBmbiA9IHtcclxuXHJcbiAgICAvL0J1c2NhciBpbmZvcm1hY2lvbmVzIGRlIGNvZGlnbyBkZSBnYW5hbmNpYSBkZWwgZW1wbGVhZG9cclxuICAgIFNlYXJjaEVhcm5pbmdDb2RlOiBmdW5jdGlvbiAoX2lkRW1wbG95ZWU6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYCR7ZG9tX2VsZW1lbnQudXJsX2J1c2Nhcn0vJHtfaWRFbXBsb3llZX1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmRpdl90YWJsZSkuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5kaXZfdGFibGUpLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5yb3dfdGFibGUpLmRibGNsaWNrKGZ1bmN0aW9uIG15ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5idG5uZXdBZHJlZXNsaScpLnRleHQoXCJFZGl0YXJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUlkKF9pZEVtcGxveWVlLCAkKHRoaXMpLmZpbmQoXCIuRWFybmluZ0NvZGVJZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnRhaW5lci1tb2RhbC1zY3JvbGxpbmcnKS5zY3JvbGxUb3AoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5vcHRpb25GaWx0ZXJNb2RhbCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKCcudGV4dEZpbHRlck1vZGFsJykudmFsKCkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YWZpbHRlck1vZGFscyhcIi5UYWJsZS1FbXBsb3llZUVhcm5pbmdDb2RlXCIsIFwiL2NvZGlnb3NnYW5hbmNpYWVtcGxlYWRvcy9GaWx0ZXJPck1vcmVEYXRhXCIsICQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy50ZXh0RmlsdGVyTW9kYWwnKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5Y29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YWZpbHRlck1vZGFscyhcIi5UYWJsZS1FbXBsb3llZUVhcm5pbmdDb2RlXCIsIFwiL2NvZGlnb3NnYW5hbmNpYWVtcGxlYWRvcy9GaWx0ZXJPck1vcmVEYXRhXCIsICQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKS50cmltKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL0J1c2NhciBmb3JtdWxhcmlvIGRlIG51ZXZvIHkgZWRpdGFyXHJcbiAgICBTZWFyY2hFbXBsb3llZUVhcm5pbmdDb2RlRm9ybTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZG9tX2VsZW1lbnQudXJsX2J1c2Nhcl9mb3JtLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogZmFsc2UsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4uU2hvd0Zvcm0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vQnVzY2FyIGNvZGlnbyBkZSBnYW5hbmNpYSBwYXJhIGVkaXRhclxyXG4gICAgU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUlkOiBmdW5jdGlvbiAoX2lkRW1wbG95ZWU6IHN0cmluZywgX2ludGVybmFsSWQ6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYCR7ZG9tX2VsZW1lbnQudXJsX2J1c2Nhcn0vJHtfaWRFbXBsb3llZX0vJHtfaW50ZXJuYWxJZH1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNob3dGb3JtKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9TYXZlIEVtcGxveWVlIGVhcm5pbmcgY29kZVxyXG4gICAgU2F2ZUVtcGxveWVlRWFybmluZ0NvZGU6IGZ1bmN0aW9uIChfSXNGb3JER1Q6Ym9vbGVhbikge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZG9tX2VsZW1lbnQudXJsX2d1YXJkYXIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiAkKGRvbV9lbGVtZW50LmZvcm0pLnNlcmlhbGl6ZSgpICsgYCZvcGVyYXRpb249JHtvcGVyYXRpb259Jl9Jc0ZvckRHVD0ke19Jc0ZvckRHVH1gLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYnRubmV3QWRyZWVzbGknKS50ZXh0KFwiTnVldm9cIilcclxuICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hFYXJuaW5nQ29kZSgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihkb21fZWxlbWVudC5mb3JtKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9Nb3N0cmFyIHkgY29uZmlndXJhciBlbCBudWV2byBmb3JtdWxhcmlvIGVuIGVsIGRvbVxyXG4gICAgU2hvd0Zvcm06IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmh0bWwoJycpO1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5hcHBlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgIC8vY2VycmFyIGZvcm11bGFyaW8gZGUgbnVldm9cclxuICAgICAgICAkKGRvbV9lbGVtZW50LmJ0bl9jYW5jZWxhcikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcuYnRubmV3QWRyZWVzbGknKS50ZXh0KFwiTnVldm9cIilcclxuICAgICAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vQnVzY2FyIGNpY2xvcyBkZSBwYWdvcyBhbCBjYW1iaWFyIGVsIGPDs2RpZ28gZGUgbGEgbsOzbWluYS8vXHJcbiAgICAgICAgJChcIiNQYXlyb2xsSWRcIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBgL2NvZGlnb3NnYW5hbmNpYWVtcGxlYWRvcy9jaWNsb3NwYWdvLyR7JChcIiNQYXlyb2xsSWRcIikudmFsKCl9YCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR2V0XCIsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1N0YXJ0UGVyaW9kRm9yUGFpZFwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNQYXlGcmVjdWVuY3lcIikudmFsKGRhdGFbMF0uUGF5RnJlY3VlbmN5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uQ2FsY0Ftb3VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGRhdGEpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQoYFsgJHsoRm9ybWF0RGF0ZUF1dG9CaW5kaW5nKHRoaXMuUGVyaW9kU3RhcnREYXRlKSl9IF0gLSBbICR7KEZvcm1hdERhdGVBdXRvQmluZGluZyh0aGlzLlBlcmlvZEVuZERhdGUpKX0gXWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLlBheUN5Y2xlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTdGFydFBlcmlvZEZvclBhaWRcIikuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcjSW5kZXhFYXJuaW5nTW9udGhseScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLkNhbGNBbW91bnQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9zYXZlXHJcbiAgICAgICAgJChkb21fZWxlbWVudC5mb3JtKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnI0luZGV4RWFybmluZ01vbnRobHlWYWxpZGF0ZScpLnZhbCgpLnRvU3RyaW5nKCkgIT0gJCgnI0luZGV4RWFybmluZ01vbnRobHknKS52YWwoKS50b1N0cmluZygpICYmICQoJyNJc1VzZURHVCcpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIHF1ZSBlbCBjYW1iaW8gc2UgZ3VhcmRhciBwYXJhIGVsIERHVD9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2F2ZUVtcGxveWVlRWFybmluZ0NvZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2F2ZUVtcGxveWVlRWFybmluZ0NvZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHsgT2s6IFwiU2lcIiwgQ2FuY2VsOiBcIk5vXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLlNhdmVFbXBsb3llZUVhcm5pbmdDb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuaWRfcHJpbmNpcGFsKS52YWwoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKVxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG5cclxuICAgICAgICBJbnN0YWNpYXRlTGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgJCgnLm1lc3NhZ2UtaGVscCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLmhlbHBfbWVzc2FnZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbi5oZWxwX21lc3NhZ2UoKTtcclxuXHJcbiAgICAgICAgLy9QbHVnaW4gZGUgbnVtZXJvc1xyXG4gICAgICAgIFVzZVBsdWdpbk51bWJlckZvcm1hdChkb21fZWxlbWVudC5mb3JtKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGVscF9tZXNzYWdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHF0eSA9ICQoXCIjUXR5UGVyaW9kRm9yUGFpZFwiKS52YWwoKS50b1N0cmluZygpO1xyXG4gICAgICAgIGxldCBwZXJpb2QgPSAkKCdzZWxlY3RbaWQ9XCJTdGFydFBlcmlvZEZvclBhaWRcIl0gb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xyXG5cclxuICAgICAgICBpZiAocXR5ICE9IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlbHAgPSBgRXN0ZSBjw7NkaWdvIGRlIGdhbmFjaWEgc2UgY2FsY3VsYXLDoSBjYWRhICR7cXR5fSBwZXLDrW9kby9zIGEgcGFydGlyIGRlIGxhcyBmZWNoYXMgJHtwZXJpb2R9YDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaGVscCk7XHJcbiAgICAgICAgICAgICQoXCIjYWxlcnQtaGVscFwiKS50ZXh0KGhlbHApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIENhbGNBbW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZnJlY3VlbmN5ID0gJChcIiNQYXlGcmVjdWVuY3lcIikudmFsKCkudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgYW1vdW50OiBudW1iZXIgPSBGb3JtYXRvTnVtZXJpY29zX0NhbGN1bGFyKCQoXCIjSW5kZXhFYXJuaW5nTW9udGhseVwiKS52YWwoKS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgbGV0IG5ld2Ftb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgbmV3YW1vdW50RGFpbHk6IG51bWJlciA9IDA7XHJcbiAgICAgICAgLy9JbmRleEVhcm5pbmdNb3VudGx5XHJcbiAgICAgICAgc3dpdGNoIChmcmVjdWVuY3kpIHtcclxuICAgICAgICAgICAgY2FzZSBcIjBcIjpcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudCA9IGFtb3VudCAvIDIzLjgzO1xyXG4gICAgICAgICAgICAgICAgbmV3YW1vdW50RGFpbHkgPSBuZXdhbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCIxXCI6IC8vU2VtYW5hbFxyXG4gICAgICAgICAgICAgICAgbmV3YW1vdW50ID0gYW1vdW50IC8gNDtcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudERhaWx5ID0gYW1vdW50IC8gMjMuODM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCIyXCI6IC8vQmkgc2VtYW5hbFxyXG4gICAgICAgICAgICAgICAgbmV3YW1vdW50ID0gYW1vdW50IC8gMjtcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudERhaWx5ID0gYW1vdW50IC8gMjMuODM7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiM1wiOiAvL1F1aW5jZW5hbFxyXG4gICAgICAgICAgICAgICAgbmV3YW1vdW50ID0gYW1vdW50IC8gMjtcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudERhaWx5ID0gYW1vdW50IC8gMjMuODM7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiNFwiOiAvL01lbnN1YWxcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudCA9IGFtb3VudCAvIDE7XHJcbiAgICAgICAgICAgICAgICBuZXdhbW91bnREYWlseSA9IGFtb3VudCAvIDIzLjgzO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcIjVcIjogLy9UcmltZXN0cmFsXHJcbiAgICAgICAgICAgICAgICBuZXdhbW91bnQgPSBhbW91bnQgKiAzO1xyXG4gICAgICAgICAgICAgICAgbmV3YW1vdW50RGFpbHkgPSBhbW91bnQgLyAyMy44MztcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjSW5kZXhFYXJuaW5nXCIpLnZhbChGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIobmV3YW1vdW50LnRvU3RyaW5nKCksIHRydWUpKTtcclxuICAgICAgICAkKFwiI0luZGV4RWFybmluZ0RpYXJ5XCIpLnZhbChGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIobmV3YW1vdW50RGFpbHkudG9TdHJpbmcoKSwgdHJ1ZSkpO1xyXG4gICAgICAgIGxldCBhbW91bnRIb3VyOiBudW1iZXIgPSBuZXdhbW91bnREYWlseSAvIDg7XHJcblxyXG4gICAgICAgICQoXCIjSW5kZXhFYXJuaW5nSG91clwiKS52YWwoRm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKGFtb3VudEhvdXIudG9TdHJpbmcoKSwgdHJ1ZSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmVzY3VjaGFkb3Jlczoge1xyXG5cclxuICAgIC8vQWJyaXIgaW5mb3JtYWNpw7NuIGNvZGlnbyBkZSBjYW5hbmNpYVxyXG4gICAgJChkb21fZWxlbWVudC5idG5fYWJyaXIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5TZWFyY2hFYXJuaW5nQ29kZSgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQubW9kYWwpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NlcnJhciBtb2RhbCBkZSBpbmZvcm1hY2nDs24gZGUgY29udGFjdG9cclxuICAgICQoZG9tX2VsZW1lbnQuYnRuX2NlcnJhcikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5odG1sKCcnKTtcclxuICAgICAgICAkKGRvbV9lbGVtZW50Lm1vZGFsKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0FicmlyIGZvcm11bGFyaW8gZGUgbnVldm9cclxuICAgICQoZG9tX2VsZW1lbnQuYnRuX251ZXZvKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgb3BlcmF0aW9uID0gMTtcclxuICAgICAgICBmbi5TZWFyY2hFbXBsb3llZUVhcm5pbmdDb2RlRm9ybSgpO1xyXG4gICAgICAgIC8vRnVuY2lvbiBwYXJhIG1vdmVyIGVsIHNjcm9sbCwgcGFyYSBtZWpvciBkaXNlw7FvXHJcbiAgICAgICAgJCgnLmNvbnRhaW5lci1tb2RhbC1zY3JvbGxpbmcnKS5zY3JvbGxUb3AoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VsaW1pbmFyIGluZm9ybWFjaW9uIGRlIGNvbnRhY3RvXHJcbiAgICAkKGRvbV9lbGVtZW50LmZvcm1fZGVsZXRlKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5FYXJuaW5nQ29kZUlkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZm9ybV9kZWxldGUpLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgbG9zIGPDs2RpZ29zIGRlIGdhbmFuY2lhcyBzZWxlY2Npb25hZG9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9lbGltaW5hcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChkb21fZWxlbWVudC5mb3JtX2RlbGV0ZSkuc2VyaWFsaXplKCkgKyBgJmVtcGxveWVlaWQ9JHskKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkudHJpbSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEVhcm5pbmdDb2RlKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoYC4ke2RvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlfWApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9QYXJhIGRpc2XDsW8sIHNlIG9jdWx0YSBlbCBpbmRpY2Fkb3IgYWwgaGFjZXIgc2Nyb2xsXHJcbiAgICAkKFwiLmNvbnRhaW5lci1tb2RhbC1zY3JvbGxpbmdcIikuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgcG9zaXRpb25TY3JvbGw6IG51bWJlciA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uU2Nyb2xsID4gMClcclxuICAgICAgICAgICAgJCgnLmZvci1lbXBsb3llZS1jb250YWN0aW5mbycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJCgnLmZvci1lbXBsb3llZS1jb250YWN0aW5mbycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgfSk7XHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IHsgfSJdfQ==