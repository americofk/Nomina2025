/**
 * @file EarningCodeEmployee.ts
 * @description Módulo de gestión de códigos de ganancia por empleado. Permite asignar,
 *              editar y eliminar ganancias específicas para cada empleado.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module GananciasEmpleados
 */
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
            e.preventDefault(); // Siempre prevenir el envío nativo del formulario
            if ($(this).valid()) {
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
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWFybmluZ0NvZGVFbXBsb3llZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1R5cGVTY3JpcHRGaWxlL0VtcGxveWVlcy9FYXJuaW5nQ29kZUVtcGxveWVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFFSCxTQUFTLEVBQUUsQ0FBQztJQXFCUixJQUFJLFNBQVMsR0FBVyxDQUFDLENBQUM7SUFDMUIsSUFBSSxXQUFXLEdBQXNCO1FBQ2pDLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsZUFBZSxFQUFFLDhDQUE4QztRQUMvRCxVQUFVLEVBQUUsMkJBQTJCO1FBQ3ZDLFNBQVMsRUFBRSx3QkFBd0I7UUFDbkMsU0FBUyxFQUFFLHVCQUF1QjtRQUNsQyxTQUFTLEVBQUUsMkJBQTJCO1FBQ3RDLFlBQVksRUFBRSw4QkFBOEI7UUFDNUMsWUFBWSxFQUFFLHdCQUF3QjtRQUN0QyxXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELFNBQVMsRUFBRSw0QkFBNEI7UUFDdkMsS0FBSyxFQUFFLDZCQUE2QjtRQUNwQyxVQUFVLEVBQUUsMEJBQTBCO1FBQ3RDLGlCQUFpQixFQUFFLG9CQUFvQjtRQUN2QyxXQUFXLEVBQUUseUJBQXlCO1FBQ3RDLFdBQVcsRUFBRSxxQkFBcUI7UUFDbEMsWUFBWSxFQUFFLG9DQUFvQztRQUNsRCxTQUFTLEVBQUUsa0JBQWtCO0tBQ2hDLENBQUE7QUFHTCxDQUFDO0FBRUQsc0JBQXNCO0FBQ3RCLE1BQU0sRUFBRSxHQUFHO0lBRVAseURBQXlEO0lBQ3pELGlCQUFpQixFQUFFLFVBQVUsV0FBbUI7UUFDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxVQUFVLElBQUksV0FBVyxFQUFFO1lBQy9DLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFJO2dCQUNuQixJQUFJLElBQUksQ0FBQyxNQUFN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QUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO29DQUNoRCxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQzdDLENBQUM7NEJBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0NBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUM5QixDQUFDO3lCQUVKLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUNELFFBQVEsRUFBRTt3QkFDTixDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsV0FBVyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ3RFLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3BELENBQUM7aUJBQ0osQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILHFEQUFxRDtJQUNyRCxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxjQUFjLEdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pELElBQUksY0FBYyxHQUFHLENBQUM7WUFDbEIsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztZQUVwRCxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0QsQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIEVhcm5pbmdDb2RlRW1wbG95ZWUudHNcclxuICogQGRlc2NyaXB0aW9uIE3Ds2R1bG8gZGUgZ2VzdGnDs24gZGUgY8OzZGlnb3MgZGUgZ2FuYW5jaWEgcG9yIGVtcGxlYWRvLiBQZXJtaXRlIGFzaWduYXIsXHJcbiAqICAgICAgICAgICAgICBlZGl0YXIgeSBlbGltaW5hciBnYW5hbmNpYXMgZXNwZWPDrWZpY2FzIHBhcmEgY2FkYSBlbXBsZWFkby5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgR2FuYW5jaWFzRW1wbGVhZG9zXHJcbiAqL1xyXG5cclxudmFyaWFibGVzOiB7XHJcbiAgICBpbnRlcmZhY2UgSURvbUVsZW1lbnRfTW9kYWwge1xyXG4gICAgICAgIGZvcm06IHN0cmluZ1xyXG4gICAgICAgIHVybF9idXNjYXJfZm9ybTogc3RyaW5nIC8vIGJ1c2NhciBmb3JtdWxhcmlvXHJcbiAgICAgICAgdXJsX2J1c2Nhcjogc3RyaW5nIC8vIGJ1c2NhciBsaXN0YVxyXG4gICAgICAgIHVybF9ndWFyZGFyOiBzdHJpbmcgLy8gZ3VhcmRhclxyXG4gICAgICAgIHVybF9lbGltaW5hcjogc3RyaW5nIC8vZWxpbWluYXJcclxuICAgICAgICBkaXZfdGFibGU6IHN0cmluZyAvL0RpdiBkb25kZSB2YSBsYSB0YWJsYSBjb24gbGEgbGlzdGFcclxuICAgICAgICByb3dfdGFibGU6IHN0cmluZyAvL1BhcmEgZWwgZXZlbnRvIGRvYmxlY2xpY2sgYWwgZWRpdGFyXHJcbiAgICAgICAgY29udF9mb3JtOiBzdHJpbmcgLy9Db250ZW5lZG9yIGRlbCBmb3JtdWxhcmlvIG51ZXZvIHkgZWRpdGFyIHF1ZSBzZSBvY3VsdGFcclxuICAgICAgICBidG5fY2FuY2VsYXI6IHN0cmluZyAvL0JvdMOzbiBkZSBjYW5jZWxhclxyXG4gICAgICAgIGlkX3ByaW5jaXBhbDogc3RyaW5nIC8vSWQgcHJpbmNpcGFsIGRlIGVtcGxlYWRvXHJcbiAgICAgICAgYnRuX2FicmlyOiBzdHJpbmcgLy9Cb3TDs24gZGUgYWJyaXIgZWwgbW9kYWxcclxuICAgICAgICBtb2RhbDogc3RyaW5nIC8vTW9kYWxcclxuICAgICAgICBidG5fY2VycmFyOiBzdHJpbmcgLy8gYm90b24gZGUgY2VycmFyIG1vZGFsXHJcbiAgICAgICAgY2xhc3NfbmFtZV9kZWxldGU6IHN0cmluZyAvLyBub21icmUgZGUgbGEgY2xhc2UgcGFyYSBlbGltaW5hclxyXG4gICAgICAgIGZvcm1fZGVsZXRlOiBzdHJpbmcgLy8gZm9ybXVsYXJpbyBwYXJhIGVsaW1pbmFyLFxyXG4gICAgICAgIGNsYXNzX2NoZWNrOiBzdHJpbmcgLy8gQ2hlY2tib3h4IGRlIGxhIHRhYmxhXHJcbiAgICAgICAgYnRuX251ZXZvOiBzdHJpbmcgLy9Cb3TDs24gZGUgbnVldm9cclxuICAgIH1cclxuXHJcbiAgICB2YXIgb3BlcmF0aW9uOiBudW1iZXIgPSAwO1xyXG4gICAgdmFyIGRvbV9lbGVtZW50OiBJRG9tRWxlbWVudF9Nb2RhbCA9IHtcclxuICAgICAgICBmb3JtOiBcIiNuZXdfRWFybmluZ0NvZGVcIixcclxuICAgICAgICB1cmxfYnVzY2FyX2Zvcm06IFwiL2NvZGlnb3NnYW5hbmNpYWVtcGxlYWRvcy9Gb3JtTmV3RWFybmluZ0NvZGVcIixcclxuICAgICAgICB1cmxfYnVzY2FyOiBcIi9jb2RpZ29zZ2FuYW5jaWFlbXBsZWFkb3NcIixcclxuICAgICAgICBkaXZfdGFibGU6IFwiLmRhdGF0YWJsZS1FYXJuaW5nQ29kZVwiLFxyXG4gICAgICAgIHJvd190YWJsZTogXCIucm93dGFibGUtRWFybmluZ0NvZGVcIixcclxuICAgICAgICBjb250X2Zvcm06IFwiLmNvbnQtZm9ybS1uZXdFYXJuaW5nQ29kZVwiLFxyXG4gICAgICAgIGJ0bl9jYW5jZWxhcjogJy5idG5jYW5jZWxhcl9uZXdfRWFybmluZ0NvZGUnLFxyXG4gICAgICAgIGlkX3ByaW5jaXBhbDogJyNFbXBsb3llZUlkRWFybmluZ0NvZGUnLFxyXG4gICAgICAgIHVybF9ndWFyZGFyOiBcIi9jb2RpZ29zZ2FuYW5jaWFlbXBsZWFkb3MvZ3VhcmRhclwiLFxyXG4gICAgICAgIGJ0bl9hYnJpcjogJy5vcGVuLWVtcGxveWVlLWVhcm5pbmdDb2RlJyxcclxuICAgICAgICBtb2RhbDogJy5tb2RhbC1lbXBsb3llZS1FYXJuaW5nQ29kZScsXHJcbiAgICAgICAgYnRuX2NlcnJhcjogJy5jbG9zZS1tb2RhbC1FYXJuaW5nQ29kZScsXHJcbiAgICAgICAgY2xhc3NfbmFtZV9kZWxldGU6IFwibGlzdGlkX0Vhcm5pbmdDb2RlXCIsXHJcbiAgICAgICAgZm9ybV9kZWxldGU6IFwiI2Zvcm0tZGVsZXRlRWFybmluZ0NvZGVcIixcclxuICAgICAgICBjbGFzc19jaGVjazogXCIuc2VsZWN0LUVhcm5pbmdDb2RlXCIsXHJcbiAgICAgICAgdXJsX2VsaW1pbmFyOiBcIi9jb2RpZ29zZ2FuYW5jaWFlbXBsZWFkb3MvZWxpbWluYXJcIixcclxuICAgICAgICBidG5fbnVldm86ICcubmV3LUVhcm5pbmdDb2RlJ1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG59XHJcblxyXG4vL0FycmVnbG8gZGUgZnVuY2lvbmVzXHJcbmNvbnN0IGZuID0ge1xyXG5cclxuICAgIC8vQnVzY2FyIGluZm9ybWFjaW9uZXMgZGUgY29kaWdvIGRlIGdhbmFuY2lhIGRlbCBlbXBsZWFkb1xyXG4gICAgU2VhcmNoRWFybmluZ0NvZGU6IGZ1bmN0aW9uIChfaWRFbXBsb3llZTogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgJHtkb21fZWxlbWVudC51cmxfYnVzY2FyfS8ke19pZEVtcGxveWVlfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZGl2X3RhYmxlKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmRpdl90YWJsZSkuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LnJvd190YWJsZSkuZGJsY2xpY2soZnVuY3Rpb24gbXlmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld0FkcmVlc2xpJykudGV4dChcIkVkaXRhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hFbXBsb3llZUVhcm5pbmdDb2RlSWQoX2lkRW1wbG95ZWUsICQodGhpcykuZmluZChcIi5FYXJuaW5nQ29kZUlkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY29udGFpbmVyLW1vZGFsLXNjcm9sbGluZycpLnNjcm9sbFRvcCgwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLm9wdGlvbkZpbHRlck1vZGFsJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoJy50ZXh0RmlsdGVyTW9kYWwnKS52YWwoKSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhZmlsdGVyTW9kYWxzKFwiLlRhYmxlLUVtcGxveWVlRWFybmluZ0NvZGVcIiwgXCIvY29kaWdvc2dhbmFuY2lhZW1wbGVhZG9zL0ZpbHRlck9yTW9yZURhdGFcIiwgJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnRleHRGaWx0ZXJNb2RhbCcpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXljb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhZmlsdGVyTW9kYWxzKFwiLlRhYmxlLUVtcGxveWVlRWFybmluZ0NvZGVcIiwgXCIvY29kaWdvc2dhbmFuY2lhZW1wbGVhZG9zL0ZpbHRlck9yTW9yZURhdGFcIiwgJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpLnRyaW0oKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vQnVzY2FyIGZvcm11bGFyaW8gZGUgbnVldm8geSBlZGl0YXJcclxuICAgIFNlYXJjaEVtcGxveWVlRWFybmluZ0NvZGVGb3JtOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBkb21fZWxlbWVudC51cmxfYnVzY2FyX2Zvcm0sXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmbi5TaG93Rm9ybShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9CdXNjYXIgY29kaWdvIGRlIGdhbmFuY2lhIHBhcmEgZWRpdGFyXHJcbiAgICBTZWFyY2hFbXBsb3llZUVhcm5pbmdDb2RlSWQ6IGZ1bmN0aW9uIChfaWRFbXBsb3llZTogc3RyaW5nLCBfaW50ZXJuYWxJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgJHtkb21fZWxlbWVudC51cmxfYnVzY2FyfS8ke19pZEVtcGxveWVlfS8ke19pbnRlcm5hbElkfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2hvd0Zvcm0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL1NhdmUgRW1wbG95ZWUgZWFybmluZyBjb2RlXHJcbiAgICBTYXZlRW1wbG95ZWVFYXJuaW5nQ29kZTogZnVuY3Rpb24gKF9Jc0ZvckRHVDpib29sZWFuKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBkb21fZWxlbWVudC51cmxfZ3VhcmRhcixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6ICQoZG9tX2VsZW1lbnQuZm9ybSkuc2VyaWFsaXplKCkgKyBgJm9wZXJhdGlvbj0ke29wZXJhdGlvbn0mX0lzRm9yREdUPSR7X0lzRm9yREdUfWAsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5idG5uZXdBZHJlZXNsaScpLnRleHQoXCJOdWV2b1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEVhcm5pbmdDb2RlKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRvbV9lbGVtZW50LmZvcm0pIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL01vc3RyYXIgeSBjb25maWd1cmFyIGVsIG51ZXZvIGZvcm11bGFyaW8gZW4gZWwgZG9tXHJcbiAgICBTaG93Rm9ybTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuaHRtbCgnJyk7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgLy9jZXJyYXIgZm9ybXVsYXJpbyBkZSBudWV2b1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuYnRuX2NhbmNlbGFyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5idG5uZXdBZHJlZXNsaScpLnRleHQoXCJOdWV2b1wiKVxyXG4gICAgICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9CdXNjYXIgY2ljbG9zIGRlIHBhZ29zIGFsIGNhbWJpYXIgZWwgY8OzZGlnbyBkZSBsYSBuw7NtaW5hLy9cclxuICAgICAgICAkKFwiI1BheXJvbGxJZFwiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGAvY29kaWdvc2dhbmFuY2lhZW1wbGVhZG9zL2NpY2xvc3BhZ28vJHskKFwiI1BheXJvbGxJZFwiKS52YWwoKX1gLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHZXRcIixcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjU3RhcnRQZXJpb2RGb3JQYWlkXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1BheUZyZWN1ZW5jeVwiKS52YWwoZGF0YVswXS5QYXlGcmVjdWVuY3kpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5DYWxjQW1vdW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dChgWyAkeyhGb3JtYXREYXRlQXV0b0JpbmRpbmcodGhpcy5QZXJpb2RTdGFydERhdGUpKX0gXSAtIFsgJHsoRm9ybWF0RGF0ZUF1dG9CaW5kaW5nKHRoaXMuUGVyaW9kRW5kRGF0ZSkpfSBdYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKHRoaXMuUGF5Q3ljbGVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1N0YXJ0UGVyaW9kRm9yUGFpZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJyNJbmRleEVhcm5pbmdNb250aGx5Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm4uQ2FsY0Ftb3VudCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3NhdmVcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmZvcm0pLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gU2llbXByZSBwcmV2ZW5pciBlbCBlbnbDrW8gbmF0aXZvIGRlbCBmb3JtdWxhcmlvXHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnI0luZGV4RWFybmluZ01vbnRobHlWYWxpZGF0ZScpLnZhbCgpLnRvU3RyaW5nKCkgIT0gJCgnI0luZGV4RWFybmluZ01vbnRobHknKS52YWwoKS50b1N0cmluZygpICYmICQoJyNJc1VzZURHVCcpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIHF1ZSBlbCBjYW1iaW8gc2UgZ3VhcmRhciBwYXJhIGVsIERHVD9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2F2ZUVtcGxveWVlRWFybmluZ0NvZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2F2ZUVtcGxveWVlRWFybmluZ0NvZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHsgT2s6IFwiU2lcIiwgQ2FuY2VsOiBcIk5vXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLlNhdmVFbXBsb3llZUVhcm5pbmdDb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuaWRfcHJpbmNpcGFsKS52YWwoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKVxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG5cclxuICAgICAgICBJbnN0YWNpYXRlTGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgJCgnLm1lc3NhZ2UtaGVscCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZuLmhlbHBfbWVzc2FnZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbi5oZWxwX21lc3NhZ2UoKTtcclxuXHJcbiAgICAgICAgLy9QbHVnaW4gZGUgbnVtZXJvc1xyXG4gICAgICAgIFVzZVBsdWdpbk51bWJlckZvcm1hdChkb21fZWxlbWVudC5mb3JtKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGVscF9tZXNzYWdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHF0eSA9ICQoXCIjUXR5UGVyaW9kRm9yUGFpZFwiKS52YWwoKS50b1N0cmluZygpO1xyXG4gICAgICAgIGxldCBwZXJpb2QgPSAkKCdzZWxlY3RbaWQ9XCJTdGFydFBlcmlvZEZvclBhaWRcIl0gb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xyXG5cclxuICAgICAgICBpZiAocXR5ICE9IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlbHAgPSBgRXN0ZSBjw7NkaWdvIGRlIGdhbmFjaWEgc2UgY2FsY3VsYXLDoSBjYWRhICR7cXR5fSBwZXLDrW9kby9zIGEgcGFydGlyIGRlIGxhcyBmZWNoYXMgJHtwZXJpb2R9YDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaGVscCk7XHJcbiAgICAgICAgICAgICQoXCIjYWxlcnQtaGVscFwiKS50ZXh0KGhlbHApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIENhbGNBbW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZnJlY3VlbmN5ID0gJChcIiNQYXlGcmVjdWVuY3lcIikudmFsKCkudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgYW1vdW50OiBudW1iZXIgPSBGb3JtYXRvTnVtZXJpY29zX0NhbGN1bGFyKCQoXCIjSW5kZXhFYXJuaW5nTW9udGhseVwiKS52YWwoKS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgbGV0IG5ld2Ftb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgbmV3YW1vdW50RGFpbHk6IG51bWJlciA9IDA7XHJcbiAgICAgICAgLy9JbmRleEVhcm5pbmdNb3VudGx5XHJcbiAgICAgICAgc3dpdGNoIChmcmVjdWVuY3kpIHtcclxuICAgICAgICAgICAgY2FzZSBcIjBcIjpcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudCA9IGFtb3VudCAvIDIzLjgzO1xyXG4gICAgICAgICAgICAgICAgbmV3YW1vdW50RGFpbHkgPSBuZXdhbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCIxXCI6IC8vU2VtYW5hbFxyXG4gICAgICAgICAgICAgICAgbmV3YW1vdW50ID0gYW1vdW50IC8gNDtcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudERhaWx5ID0gYW1vdW50IC8gMjMuODM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCIyXCI6IC8vQmkgc2VtYW5hbFxyXG4gICAgICAgICAgICAgICAgbmV3YW1vdW50ID0gYW1vdW50IC8gMjtcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudERhaWx5ID0gYW1vdW50IC8gMjMuODM7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiM1wiOiAvL1F1aW5jZW5hbFxyXG4gICAgICAgICAgICAgICAgbmV3YW1vdW50ID0gYW1vdW50IC8gMjtcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudERhaWx5ID0gYW1vdW50IC8gMjMuODM7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiNFwiOiAvL01lbnN1YWxcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudCA9IGFtb3VudCAvIDE7XHJcbiAgICAgICAgICAgICAgICBuZXdhbW91bnREYWlseSA9IGFtb3VudCAvIDIzLjgzO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcIjVcIjogLy9UcmltZXN0cmFsXHJcbiAgICAgICAgICAgICAgICBuZXdhbW91bnQgPSBhbW91bnQgKiAzO1xyXG4gICAgICAgICAgICAgICAgbmV3YW1vdW50RGFpbHkgPSBhbW91bnQgLyAyMy44MztcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjSW5kZXhFYXJuaW5nXCIpLnZhbChGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIobmV3YW1vdW50LnRvU3RyaW5nKCksIHRydWUpKTtcclxuICAgICAgICAkKFwiI0luZGV4RWFybmluZ0RpYXJ5XCIpLnZhbChGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIobmV3YW1vdW50RGFpbHkudG9TdHJpbmcoKSwgdHJ1ZSkpO1xyXG4gICAgICAgIGxldCBhbW91bnRIb3VyOiBudW1iZXIgPSBuZXdhbW91bnREYWlseSAvIDg7XHJcblxyXG4gICAgICAgICQoXCIjSW5kZXhFYXJuaW5nSG91clwiKS52YWwoRm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKGFtb3VudEhvdXIudG9TdHJpbmcoKSwgdHJ1ZSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmVzY3VjaGFkb3Jlczoge1xyXG5cclxuICAgIC8vQWJyaXIgaW5mb3JtYWNpw7NuIGNvZGlnbyBkZSBjYW5hbmNpYVxyXG4gICAgJChkb21fZWxlbWVudC5idG5fYWJyaXIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5TZWFyY2hFYXJuaW5nQ29kZSgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQubW9kYWwpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NlcnJhciBtb2RhbCBkZSBpbmZvcm1hY2nDs24gZGUgY29udGFjdG9cclxuICAgICQoZG9tX2VsZW1lbnQuYnRuX2NlcnJhcikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5odG1sKCcnKTtcclxuICAgICAgICAkKGRvbV9lbGVtZW50Lm1vZGFsKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0FicmlyIGZvcm11bGFyaW8gZGUgbnVldm9cclxuICAgICQoZG9tX2VsZW1lbnQuYnRuX251ZXZvKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgb3BlcmF0aW9uID0gMTtcclxuICAgICAgICBmbi5TZWFyY2hFbXBsb3llZUVhcm5pbmdDb2RlRm9ybSgpO1xyXG4gICAgICAgIC8vRnVuY2lvbiBwYXJhIG1vdmVyIGVsIHNjcm9sbCwgcGFyYSBtZWpvciBkaXNlw7FvXHJcbiAgICAgICAgJCgnLmNvbnRhaW5lci1tb2RhbC1zY3JvbGxpbmcnKS5zY3JvbGxUb3AoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VsaW1pbmFyIGluZm9ybWFjaW9uIGRlIGNvbnRhY3RvXHJcbiAgICAkKGRvbV9lbGVtZW50LmZvcm1fZGVsZXRlKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFNpZW1wcmUgcHJldmVuaXIgZWwgZW52w61vIG5hdGl2byBkZWwgZm9ybXVsYXJpb1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5FYXJuaW5nQ29kZUlkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZm9ybV9kZWxldGUpLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgbG9zIGPDs2RpZ29zIGRlIGdhbmFuY2lhcyBzZWxlY2Npb25hZG9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9lbGltaW5hcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChkb21fZWxlbWVudC5mb3JtX2RlbGV0ZSkuc2VyaWFsaXplKCkgKyBgJmVtcGxveWVlaWQ9JHskKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkudHJpbSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEVhcm5pbmdDb2RlKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoYC4ke2RvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlfWApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9QYXJhIGRpc2XDsW8sIHNlIG9jdWx0YSBlbCBpbmRpY2Fkb3IgYWwgaGFjZXIgc2Nyb2xsXHJcbiAgICAkKFwiLmNvbnRhaW5lci1tb2RhbC1zY3JvbGxpbmdcIikuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgcG9zaXRpb25TY3JvbGw6IG51bWJlciA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uU2Nyb2xsID4gMClcclxuICAgICAgICAgICAgJCgnLmZvci1lbXBsb3llZS1jb250YWN0aW5mbycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJCgnLmZvci1lbXBsb3llZS1jb250YWN0aW5mbycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgfSk7XHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IHsgfSJdfQ==