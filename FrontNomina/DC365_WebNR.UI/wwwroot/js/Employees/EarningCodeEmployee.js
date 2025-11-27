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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWFybmluZ0NvZGVFbXBsb3llZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1R5cGVTY3JpcHRGaWxlL0VtcGxveWVlcy9FYXJuaW5nQ29kZUVtcGxveWVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFFSCxTQUFTLEVBQUUsQ0FBQztJQXFCUixJQUFJLFNBQVMsR0FBVyxDQUFDLENBQUM7SUFDMUIsSUFBSSxXQUFXLEdBQXNCO1FBQ2pDLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsZUFBZSxFQUFFLDhDQUE4QztRQUMvRCxVQUFVLEVBQUUsMkJBQTJCO1FBQ3ZDLFNBQVMsRUFBRSx3QkFBd0I7UUFDbkMsU0FBUyxFQUFFLHVCQUF1QjtRQUNsQyxTQUFTLEVBQUUsMkJBQTJCO1FBQ3RDLFlBQVksRUFBRSw4QkFBOEI7UUFDNUMsWUFBWSxFQUFFLHdCQUF3QjtRQUN0QyxXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELFNBQVMsRUFBRSw0QkFBNEI7UUFDdkMsS0FBSyxFQUFFLDZCQUE2QjtRQUNwQyxVQUFVLEVBQUUsMEJBQTBCO1FBQ3RDLGlCQUFpQixFQUFFLG9CQUFvQjtRQUN2QyxXQUFXLEVBQUUseUJBQXlCO1FBQ3RDLFdBQVcsRUFBRSxxQkFBcUI7UUFDbEMsWUFBWSxFQUFFLG9DQUFvQztRQUNsRCxTQUFTLEVBQUUsa0JBQWtCO0tBQ2hDLENBQUE7QUFHTCxDQUFDO0FBRUQsc0JBQXNCO0FBQ3RCLE1BQU0sRUFBRSxHQUFHO0lBRVAseURBQXlEO0lBQ3pELGlCQUFpQixFQUFFLFVBQVUsV0FBbUI7UUFDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxVQUFVLElBQUksV0FBVyxFQUFFO1lBQy9DLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFJO2dCQUNuQixJQUFJLElBQUksQ0FBQyxNQUFN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QUMsTUFBTSxFQUFFLENBQUM7b0NBQ2hELGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDN0MsQ0FBQzs0QkFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztnQ0FDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzlCLENBQUM7eUJBRUosQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBQ0QsUUFBUSxFQUFFO3dCQUNOLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDdEUsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDcEQsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgscURBQXFEO0lBQ3JELENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLGNBQWMsR0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakQsSUFBSSxjQUFjLEdBQUcsQ0FBQztZQUNsQixDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7O1lBRXBELENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvRCxDQUFDLENBQUMsQ0FBQztBQUVQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgRWFybmluZ0NvZGVFbXBsb3llZS50c1xyXG4gKiBAZGVzY3JpcHRpb24gTcOzZHVsbyBkZSBnZXN0acOzbiBkZSBjw7NkaWdvcyBkZSBnYW5hbmNpYSBwb3IgZW1wbGVhZG8uIFBlcm1pdGUgYXNpZ25hcixcclxuICogICAgICAgICAgICAgIGVkaXRhciB5IGVsaW1pbmFyIGdhbmFuY2lhcyBlc3BlY8OtZmljYXMgcGFyYSBjYWRhIGVtcGxlYWRvLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBHYW5hbmNpYXNFbXBsZWFkb3NcclxuICovXHJcblxyXG52YXJpYWJsZXM6IHtcclxuICAgIGludGVyZmFjZSBJRG9tRWxlbWVudF9Nb2RhbCB7XHJcbiAgICAgICAgZm9ybTogc3RyaW5nXHJcbiAgICAgICAgdXJsX2J1c2Nhcl9mb3JtOiBzdHJpbmcgLy8gYnVzY2FyIGZvcm11bGFyaW9cclxuICAgICAgICB1cmxfYnVzY2FyOiBzdHJpbmcgLy8gYnVzY2FyIGxpc3RhXHJcbiAgICAgICAgdXJsX2d1YXJkYXI6IHN0cmluZyAvLyBndWFyZGFyXHJcbiAgICAgICAgdXJsX2VsaW1pbmFyOiBzdHJpbmcgLy9lbGltaW5hclxyXG4gICAgICAgIGRpdl90YWJsZTogc3RyaW5nIC8vRGl2IGRvbmRlIHZhIGxhIHRhYmxhIGNvbiBsYSBsaXN0YVxyXG4gICAgICAgIHJvd190YWJsZTogc3RyaW5nIC8vUGFyYSBlbCBldmVudG8gZG9ibGVjbGljayBhbCBlZGl0YXJcclxuICAgICAgICBjb250X2Zvcm06IHN0cmluZyAvL0NvbnRlbmVkb3IgZGVsIGZvcm11bGFyaW8gbnVldm8geSBlZGl0YXIgcXVlIHNlIG9jdWx0YVxyXG4gICAgICAgIGJ0bl9jYW5jZWxhcjogc3RyaW5nIC8vQm90w7NuIGRlIGNhbmNlbGFyXHJcbiAgICAgICAgaWRfcHJpbmNpcGFsOiBzdHJpbmcgLy9JZCBwcmluY2lwYWwgZGUgZW1wbGVhZG9cclxuICAgICAgICBidG5fYWJyaXI6IHN0cmluZyAvL0JvdMOzbiBkZSBhYnJpciBlbCBtb2RhbFxyXG4gICAgICAgIG1vZGFsOiBzdHJpbmcgLy9Nb2RhbFxyXG4gICAgICAgIGJ0bl9jZXJyYXI6IHN0cmluZyAvLyBib3RvbiBkZSBjZXJyYXIgbW9kYWxcclxuICAgICAgICBjbGFzc19uYW1lX2RlbGV0ZTogc3RyaW5nIC8vIG5vbWJyZSBkZSBsYSBjbGFzZSBwYXJhIGVsaW1pbmFyXHJcbiAgICAgICAgZm9ybV9kZWxldGU6IHN0cmluZyAvLyBmb3JtdWxhcmlvIHBhcmEgZWxpbWluYXIsXHJcbiAgICAgICAgY2xhc3NfY2hlY2s6IHN0cmluZyAvLyBDaGVja2JveHggZGUgbGEgdGFibGFcclxuICAgICAgICBidG5fbnVldm86IHN0cmluZyAvL0JvdMOzbiBkZSBudWV2b1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBvcGVyYXRpb246IG51bWJlciA9IDA7XHJcbiAgICB2YXIgZG9tX2VsZW1lbnQ6IElEb21FbGVtZW50X01vZGFsID0ge1xyXG4gICAgICAgIGZvcm06IFwiI25ld19FYXJuaW5nQ29kZVwiLFxyXG4gICAgICAgIHVybF9idXNjYXJfZm9ybTogXCIvY29kaWdvc2dhbmFuY2lhZW1wbGVhZG9zL0Zvcm1OZXdFYXJuaW5nQ29kZVwiLFxyXG4gICAgICAgIHVybF9idXNjYXI6IFwiL2NvZGlnb3NnYW5hbmNpYWVtcGxlYWRvc1wiLFxyXG4gICAgICAgIGRpdl90YWJsZTogXCIuZGF0YXRhYmxlLUVhcm5pbmdDb2RlXCIsXHJcbiAgICAgICAgcm93X3RhYmxlOiBcIi5yb3d0YWJsZS1FYXJuaW5nQ29kZVwiLFxyXG4gICAgICAgIGNvbnRfZm9ybTogXCIuY29udC1mb3JtLW5ld0Vhcm5pbmdDb2RlXCIsXHJcbiAgICAgICAgYnRuX2NhbmNlbGFyOiAnLmJ0bmNhbmNlbGFyX25ld19FYXJuaW5nQ29kZScsXHJcbiAgICAgICAgaWRfcHJpbmNpcGFsOiAnI0VtcGxveWVlSWRFYXJuaW5nQ29kZScsXHJcbiAgICAgICAgdXJsX2d1YXJkYXI6IFwiL2NvZGlnb3NnYW5hbmNpYWVtcGxlYWRvcy9ndWFyZGFyXCIsXHJcbiAgICAgICAgYnRuX2FicmlyOiAnLm9wZW4tZW1wbG95ZWUtZWFybmluZ0NvZGUnLFxyXG4gICAgICAgIG1vZGFsOiAnLm1vZGFsLWVtcGxveWVlLUVhcm5pbmdDb2RlJyxcclxuICAgICAgICBidG5fY2VycmFyOiAnLmNsb3NlLW1vZGFsLUVhcm5pbmdDb2RlJyxcclxuICAgICAgICBjbGFzc19uYW1lX2RlbGV0ZTogXCJsaXN0aWRfRWFybmluZ0NvZGVcIixcclxuICAgICAgICBmb3JtX2RlbGV0ZTogXCIjZm9ybS1kZWxldGVFYXJuaW5nQ29kZVwiLFxyXG4gICAgICAgIGNsYXNzX2NoZWNrOiBcIi5zZWxlY3QtRWFybmluZ0NvZGVcIixcclxuICAgICAgICB1cmxfZWxpbWluYXI6IFwiL2NvZGlnb3NnYW5hbmNpYWVtcGxlYWRvcy9lbGltaW5hclwiLFxyXG4gICAgICAgIGJ0bl9udWV2bzogJy5uZXctRWFybmluZ0NvZGUnXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn1cclxuXHJcbi8vQXJyZWdsbyBkZSBmdW5jaW9uZXNcclxuY29uc3QgZm4gPSB7XHJcblxyXG4gICAgLy9CdXNjYXIgaW5mb3JtYWNpb25lcyBkZSBjb2RpZ28gZGUgZ2FuYW5jaWEgZGVsIGVtcGxlYWRvXHJcbiAgICBTZWFyY2hFYXJuaW5nQ29kZTogZnVuY3Rpb24gKF9pZEVtcGxveWVlOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAke2RvbV9lbGVtZW50LnVybF9idXNjYXJ9LyR7X2lkRW1wbG95ZWV9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5kaXZfdGFibGUpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZGl2X3RhYmxlKS5hcHBlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQucm93X3RhYmxlKS5kYmxjbGljayhmdW5jdGlvbiBteWZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24gPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuYnRubmV3QWRyZWVzbGknKS50ZXh0KFwiRWRpdGFyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEVtcGxveWVlRWFybmluZ0NvZGVJZChfaWRFbXBsb3llZSwgJCh0aGlzKS5maW5kKFwiLkVhcm5pbmdDb2RlSWR0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nJykuc2Nyb2xsVG9wKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcub3B0aW9uRmlsdGVyTW9kYWwnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCgnLnRleHRGaWx0ZXJNb2RhbCcpLnZhbCgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGFmaWx0ZXJNb2RhbHMoXCIuVGFibGUtRW1wbG95ZWVFYXJuaW5nQ29kZVwiLCBcIi9jb2RpZ29zZ2FuYW5jaWFlbXBsZWFkb3MvRmlsdGVyT3JNb3JlRGF0YVwiLCAkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcudGV4dEZpbHRlck1vZGFsJykub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleWNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGFmaWx0ZXJNb2RhbHMoXCIuVGFibGUtRW1wbG95ZWVFYXJuaW5nQ29kZVwiLCBcIi9jb2RpZ29zZ2FuYW5jaWFlbXBsZWFkb3MvRmlsdGVyT3JNb3JlRGF0YVwiLCAkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkudHJpbSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9CdXNjYXIgZm9ybXVsYXJpbyBkZSBudWV2byB5IGVkaXRhclxyXG4gICAgU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUZvcm06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9idXNjYXJfZm9ybSxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLlNob3dGb3JtKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL0J1c2NhciBjb2RpZ28gZGUgZ2FuYW5jaWEgcGFyYSBlZGl0YXJcclxuICAgIFNlYXJjaEVtcGxveWVlRWFybmluZ0NvZGVJZDogZnVuY3Rpb24gKF9pZEVtcGxveWVlOiBzdHJpbmcsIF9pbnRlcm5hbElkOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAke2RvbV9lbGVtZW50LnVybF9idXNjYXJ9LyR7X2lkRW1wbG95ZWV9LyR7X2ludGVybmFsSWR9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TaG93Rm9ybShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vU2F2ZSBFbXBsb3llZSBlYXJuaW5nIGNvZGVcclxuICAgIFNhdmVFbXBsb3llZUVhcm5pbmdDb2RlOiBmdW5jdGlvbiAoX0lzRm9yREdUOmJvb2xlYW4pIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9ndWFyZGFyLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogJChkb21fZWxlbWVudC5mb3JtKS5zZXJpYWxpemUoKSArIGAmb3BlcmF0aW9uPSR7b3BlcmF0aW9ufSZfSXNGb3JER1Q9JHtfSXNGb3JER1R9YCxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld0FkcmVlc2xpJykudGV4dChcIk51ZXZvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRWFybmluZ0NvZGUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZG9tX2VsZW1lbnQuZm9ybSkgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vTW9zdHJhciB5IGNvbmZpZ3VyYXIgZWwgbnVldm8gZm9ybXVsYXJpbyBlbiBlbCBkb21cclxuICAgIFNob3dGb3JtOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5odG1sKCcnKTtcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAvL2NlcnJhciBmb3JtdWxhcmlvIGRlIG51ZXZvXHJcbiAgICAgICAgJChkb21fZWxlbWVudC5idG5fY2FuY2VsYXIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmJ0bm5ld0FkcmVlc2xpJykudGV4dChcIk51ZXZvXCIpXHJcbiAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL0J1c2NhciBjaWNsb3MgZGUgcGFnb3MgYWwgY2FtYmlhciBlbCBjw7NkaWdvIGRlIGxhIG7Ds21pbmEvL1xyXG4gICAgICAgICQoXCIjUGF5cm9sbElkXCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogYC9jb2RpZ29zZ2FuYW5jaWFlbXBsZWFkb3MvY2ljbG9zcGFnby8keyQoXCIjUGF5cm9sbElkXCIpLnZhbCgpfWAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdldFwiLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTdGFydFBlcmlvZEZvclBhaWRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjUGF5RnJlY3VlbmN5XCIpLnZhbChkYXRhWzBdLlBheUZyZWN1ZW5jeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLkNhbGNBbW91bnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChkYXRhKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0KGBbICR7KEZvcm1hdERhdGVBdXRvQmluZGluZyh0aGlzLlBlcmlvZFN0YXJ0RGF0ZSkpfSBdIC0gWyAkeyhGb3JtYXREYXRlQXV0b0JpbmRpbmcodGhpcy5QZXJpb2RFbmREYXRlKSl9IF1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWwodGhpcy5QYXlDeWNsZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjU3RhcnRQZXJpb2RGb3JQYWlkXCIpLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnI0luZGV4RWFybmluZ01vbnRobHknKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmbi5DYWxjQW1vdW50KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vc2F2ZVxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuZm9ybSkuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKCQoJyNJbmRleEVhcm5pbmdNb250aGx5VmFsaWRhdGUnKS52YWwoKS50b1N0cmluZygpICE9ICQoJyNJbmRleEVhcm5pbmdNb250aGx5JykudmFsKCkudG9TdHJpbmcoKSAmJiAkKCcjSXNVc2VER1QnKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBxdWUgZWwgY2FtYmlvIHNlIGd1YXJkYXIgcGFyYSBlbCBER1Q/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNhdmVFbXBsb3llZUVhcm5pbmdDb2RlKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNhdmVFbXBsb3llZUVhcm5pbmdDb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCB7IE9rOiBcIlNpXCIsIENhbmNlbDogXCJOb1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmbi5TYXZlRW1wbG95ZWVFYXJuaW5nQ29kZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvbV9lbGVtZW50LmlkX3ByaW5jaXBhbCkudmFsKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSlcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuXHJcbiAgICAgICAgSW5zdGFjaWF0ZUxpc3RlbmVyKCk7XHJcblxyXG4gICAgICAgICQoJy5tZXNzYWdlLWhlbHAnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmbi5oZWxwX21lc3NhZ2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm4uaGVscF9tZXNzYWdlKCk7XHJcblxyXG4gICAgICAgIC8vUGx1Z2luIGRlIG51bWVyb3NcclxuICAgICAgICBVc2VQbHVnaW5OdW1iZXJGb3JtYXQoZG9tX2VsZW1lbnQuZm9ybSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhlbHBfbWVzc2FnZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBxdHkgPSAkKFwiI1F0eVBlcmlvZEZvclBhaWRcIikudmFsKCkudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgcGVyaW9kID0gJCgnc2VsZWN0W2lkPVwiU3RhcnRQZXJpb2RGb3JQYWlkXCJdIG9wdGlvbjpzZWxlY3RlZCcpLnRleHQoKTtcclxuXHJcbiAgICAgICAgaWYgKHF0eSAhPSBcIjBcIikge1xyXG4gICAgICAgICAgICBjb25zdCBoZWxwID0gYEVzdGUgY8OzZGlnbyBkZSBnYW5hY2lhIHNlIGNhbGN1bGFyw6EgY2FkYSAke3F0eX0gcGVyw61vZG8vcyBhIHBhcnRpciBkZSBsYXMgZmVjaGFzICR7cGVyaW9kfWA7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGhlbHApO1xyXG4gICAgICAgICAgICAkKFwiI2FsZXJ0LWhlbHBcIikudGV4dChoZWxwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBDYWxjQW1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGZyZWN1ZW5jeSA9ICQoXCIjUGF5RnJlY3VlbmN5XCIpLnZhbCgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IGFtb3VudDogbnVtYmVyID0gRm9ybWF0b051bWVyaWNvc19DYWxjdWxhcigkKFwiI0luZGV4RWFybmluZ01vbnRobHlcIikudmFsKCkudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIGxldCBuZXdhbW91bnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IG5ld2Ftb3VudERhaWx5OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIC8vSW5kZXhFYXJuaW5nTW91bnRseVxyXG4gICAgICAgIHN3aXRjaCAoZnJlY3VlbmN5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwXCI6XHJcbiAgICAgICAgICAgICAgICBuZXdhbW91bnQgPSBhbW91bnQgLyAyMy44MztcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudERhaWx5ID0gbmV3YW1vdW50O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiMVwiOiAvL1NlbWFuYWxcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudCA9IGFtb3VudCAvIDQ7XHJcbiAgICAgICAgICAgICAgICBuZXdhbW91bnREYWlseSA9IGFtb3VudCAvIDIzLjgzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiMlwiOiAvL0JpIHNlbWFuYWxcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudCA9IGFtb3VudCAvIDI7XHJcbiAgICAgICAgICAgICAgICBuZXdhbW91bnREYWlseSA9IGFtb3VudCAvIDIzLjgzO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcIjNcIjogLy9RdWluY2VuYWxcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudCA9IGFtb3VudCAvIDI7XHJcbiAgICAgICAgICAgICAgICBuZXdhbW91bnREYWlseSA9IGFtb3VudCAvIDIzLjgzO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcIjRcIjogLy9NZW5zdWFsXHJcbiAgICAgICAgICAgICAgICBuZXdhbW91bnQgPSBhbW91bnQgLyAxO1xyXG4gICAgICAgICAgICAgICAgbmV3YW1vdW50RGFpbHkgPSBhbW91bnQgLyAyMy44MztcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCI1XCI6IC8vVHJpbWVzdHJhbFxyXG4gICAgICAgICAgICAgICAgbmV3YW1vdW50ID0gYW1vdW50ICogMztcclxuICAgICAgICAgICAgICAgIG5ld2Ftb3VudERhaWx5ID0gYW1vdW50IC8gMjMuODM7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiI0luZGV4RWFybmluZ1wiKS52YWwoRm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKG5ld2Ftb3VudC50b1N0cmluZygpLCB0cnVlKSk7XHJcbiAgICAgICAgJChcIiNJbmRleEVhcm5pbmdEaWFyeVwiKS52YWwoRm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKG5ld2Ftb3VudERhaWx5LnRvU3RyaW5nKCksIHRydWUpKTtcclxuICAgICAgICBsZXQgYW1vdW50SG91cjogbnVtYmVyID0gbmV3YW1vdW50RGFpbHkgLyA4O1xyXG5cclxuICAgICAgICAkKFwiI0luZGV4RWFybmluZ0hvdXJcIikudmFsKEZvcm1hdG9OdW1lcmljb3NfTW9zdHJhcihhbW91bnRIb3VyLnRvU3RyaW5nKCksIHRydWUpKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5lc2N1Y2hhZG9yZXM6IHtcclxuXHJcbiAgICAvL0FicmlyIGluZm9ybWFjacOzbiBjb2RpZ28gZGUgY2FuYW5jaWFcclxuICAgICQoZG9tX2VsZW1lbnQuYnRuX2FicmlyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm4uU2VhcmNoRWFybmluZ0NvZGUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAkKGRvbV9lbGVtZW50Lm1vZGFsKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DZXJyYXIgbW9kYWwgZGUgaW5mb3JtYWNpw7NuIGRlIGNvbnRhY3RvXHJcbiAgICAkKGRvbV9lbGVtZW50LmJ0bl9jZXJyYXIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuaHRtbCgnJyk7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5tb2RhbCkubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9BYnJpciBmb3JtdWxhcmlvIGRlIG51ZXZvXHJcbiAgICAkKGRvbV9lbGVtZW50LmJ0bl9udWV2bykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wZXJhdGlvbiA9IDE7XHJcbiAgICAgICAgZm4uU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUZvcm0oKTtcclxuICAgICAgICAvL0Z1bmNpb24gcGFyYSBtb3ZlciBlbCBzY3JvbGwsIHBhcmEgbWVqb3IgZGlzZcOxb1xyXG4gICAgICAgICQoJy5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nJykuc2Nyb2xsVG9wKDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9lbGltaW5hciBpbmZvcm1hY2lvbiBkZSBjb250YWN0b1xyXG4gICAgJChkb21fZWxlbWVudC5mb3JtX2RlbGV0ZSkuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChgJHtkb21fZWxlbWVudC5jbGFzc19jaGVja31bdHlwZT1jaGVja2JveF1gKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIGRvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRWFybmluZ0NvZGVJZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmZvcm1fZGVsZXRlKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGxvcyBjw7NkaWdvcyBkZSBnYW5hbmNpYXMgc2VsZWNjaW9uYWRvcz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBkb21fZWxlbWVudC51cmxfZWxpbWluYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoZG9tX2VsZW1lbnQuZm9ybV9kZWxldGUpLnNlcmlhbGl6ZSgpICsgYCZlbXBsb3llZWlkPSR7JCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpLnRyaW0oKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoYC4ke2RvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlfWApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hFYXJuaW5nQ29kZSgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoYC4ke2RvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlfWApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChgJHtkb21fZWxlbWVudC5jbGFzc19jaGVja31bdHlwZT1jaGVja2JveF1gKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGAuJHtkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZX1gKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vUGFyYSBkaXNlw7FvLCBzZSBvY3VsdGEgZWwgaW5kaWNhZG9yIGFsIGhhY2VyIHNjcm9sbFxyXG4gICAgJChcIi5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nXCIpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uU2Nyb2xsOiBudW1iZXIgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmIChwb3NpdGlvblNjcm9sbCA+IDApXHJcbiAgICAgICAgICAgICQoJy5mb3ItZW1wbG95ZWUtY29udGFjdGluZm8nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQoJy5mb3ItZW1wbG95ZWUtY29udGFjdGluZm8nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCB7IH0iXX0=