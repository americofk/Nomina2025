/**
 * @file DeductionCodeEmployee.ts
 * @description Módulo de gestión de códigos de deducción por empleado. Permite asignar,
 *              editar y eliminar deducciones específicas para cada empleado.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module DeduccionesEmpleados
 */
variables: {
    var operation = 0;
    var dom_element = {
        form: "#new_Employee-DeductionCode",
        url_buscar_form: "/codigosdeduccionesempleados/FormNewEmployeeDeductionCode",
        url_buscar: "/codigosdeduccionesempleados",
        div_table: ".datatable-DeductionCode",
        row_table: ".rowtable-DeductionCode",
        cont_form: ".cont-form-newDeductionCode",
        btn_cancelar: '.btncancelar_new_DeductionCode',
        id_principal: '#EmployeeIdDeductionCode',
        url_guardar: "/codigosdeduccionesempleados/guardar",
        btn_abrir: '.open-employee-deductionCode',
        modal: '.modal-employee-DeductionCode',
        btn_cerrar: '.close-modal-DeductionCode',
        class_name_delete: "listid_DeductionCode",
        form_delete: "#form-deleteDeductionCode",
        class_check: ".select-EmployeeDeductionCode",
        url_eliminar: "/codigosdeduccionesempleados/eliminar",
        btn_nuevo: '.new-DeductionCode'
    };
}
//Arreglo de funciones
const fn = {
    //Buscar informaciones de codigo de deduccion del empleado
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
                        fn.SearchEmployeeEarningCodeId(_idEmployee, $(this).find(".DeductionCodeId").html().trim());
                        $('.container-modal-scrolling').scrollTop(0);
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
    //Buscar codigo de deduccion para editar
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
    SaveEmployeeEarningCode: function () {
        $.ajax({
            url: dom_element.url_guardar,
            type: "POST",
            data: $(dom_element.form).serialize() + `&operation=${operation}`,
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
        //cerrar formulario de nueva direccion
        $(dom_element.btn_cancelar).on('click', function () {
            $('.btnnewAdreesli').text("Nuevo");
            $(dom_element.cont_form).addClass("collapse");
        });
        //save contact info employee
        $(dom_element.form).submit(function (e) {
            e.preventDefault(); // Siempre prevenir el envío nativo del formulario
            if ($(this).valid()) {
                fn.SaveEmployeeEarningCode();
            }
        });
        $(dom_element.id_principal).val($('#EmployeeId').val().toString());
        $(dom_element.cont_form).removeClass("collapse");
        fn.SearchListDeductionCode();
        $('#ContactType').on('change', function () {
            //Asignar texto dinámico a la información de contacto
            if ($(this).val() == "1") {
                $(".lblInfoContact").text("Dirección");
            }
            else {
                $(".lblInfoContact").text("Número");
            }
        });
        //Plugin de fecha
        InstaciateListener();
        //Plugin de numeros
        UsePluginNumberFormat("#NewAndEditEarningCode");
        //Buscar ciclos de pagos al cambiar el código de la nómina//
        $("#PayrollId").on("change", function () {
            $.ajax({
                url: `/codigosgananciaempleados/ciclospago/${$("#PayrollId").val()}`,
                type: "Get",
                async: true,
                success: function (data) {
                    if (data.length > 0) {
                        $("#StartPeriodForPaid").html('');
                        $(`#PayFrecuency option[value=${data[0].PayFrecuency}]`).attr('selected', 'selected');
                        //$("#PayFrecuency").val(data[0].PayFrecuency);
                        //fn.CalcAmount();
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
    },
    SearchListDeductionCode: function () {
        if ($("#DeductionCodeId")[0].children.length == 0) {
            $.ajax({
                url: "/codigosdeduccionesempleados/Buscarcodigosdeducciones",
                type: "Get",
                async: false,
                success: function (data) {
                    if (data.length > 0) {
                        $("#DeductionCodeId").html('');
                        $(data).each(function () {
                            var option = $(document.createElement('option'));
                            option.text(this.Name);
                            option.val(this.DeductionCodeId);
                            $("#DeductionCodeId").append(option);
                        });
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
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
                    input.val($(this).parent().parent().find(".DeductionCodeId").html().trim());
                    $(dom_element.form_delete).append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los códigos de deducciones seleccionados?", "confirm", {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVkdWN0aW9uQ29kZUVtcGxveWVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vVHlwZVNjcmlwdEZpbGUvRW1wbG95ZWVzL0RlZHVjdGlvbkNvZGVFbXBsb3llZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBRUgsU0FBUyxFQUFFLENBQUM7SUFxQlIsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDO0lBQzFCLElBQUksV0FBVyxHQUFzQjtRQUNqQyxJQUFJLEVBQUUsNkJBQTZCO1FBQ25DLGVBQWUsRUFBRSwyREFBMkQ7UUFDNUUsVUFBVSxFQUFFLDhCQUE4QjtRQUMxQyxTQUFTLEVBQUUsMEJBQTBCO1FBQ3JDLFNBQVMsRUFBRSx5QkFBeUI7UUFDcEMsU0FBUyxFQUFFLDZCQUE2QjtRQUN4QyxZQUFZLEVBQUUsZ0NBQWdDO1FBQzlDLFlBQVksRUFBRSwwQkFBMEI7UUFDeEMsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsOEJBQThCO1FBQ3pDLEtBQUssRUFBRSwrQkFBK0I7UUFDdEMsVUFBVSxFQUFFLDRCQUE0QjtRQUN4QyxpQkFBaUIsRUFBRSxzQkFBc0I7UUFDekMsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxXQUFXLEVBQUUsK0JBQStCO1FBQzVDLFlBQVksRUFBRSx1Q0FBdUM7UUFDckQsU0FBUyxFQUFFLG9CQUFvQjtLQUNsQyxDQUFBO0FBQ0wsQ0FBQztBQUVELHNCQUFzQjtBQUN0QixNQUFNLEVBQUUsR0FBRztJQUNQLDBEQUEwRDtJQUMxRCxpQkFBaUIsRUFBRSxVQUFVLFdBQW1CO1FBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsVUFBVSxJQUFJLFdBQVcsRUFBRTtZQUMvQyxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtnQkFDbkIsSUFBSSxJQUFJLENBQUMs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Q0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0NBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUM5QixDQUFDO3lCQUVKLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUNELFFBQVEsRUFBRTt3QkFDTixDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsV0FBVyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ3RFLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3BELENBQUM7aUJBQ0osQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILHFEQUFxRDtJQUNyRCxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxjQUFjLEdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pELElBQUksY0FBYyxHQUFHLENBQUM7WUFDbEIsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztZQUVwRCxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0QsQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIERlZHVjdGlvbkNvZGVFbXBsb3llZS50c1xyXG4gKiBAZGVzY3JpcHRpb24gTcOzZHVsbyBkZSBnZXN0acOzbiBkZSBjw7NkaWdvcyBkZSBkZWR1Y2Npw7NuIHBvciBlbXBsZWFkby4gUGVybWl0ZSBhc2lnbmFyLFxyXG4gKiAgICAgICAgICAgICAgZWRpdGFyIHkgZWxpbWluYXIgZGVkdWNjaW9uZXMgZXNwZWPDrWZpY2FzIHBhcmEgY2FkYSBlbXBsZWFkby5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgRGVkdWNjaW9uZXNFbXBsZWFkb3NcclxuICovXHJcblxyXG52YXJpYWJsZXM6IHtcclxuICAgIGludGVyZmFjZSBJRG9tRWxlbWVudF9Nb2RhbCB7XHJcbiAgICAgICAgZm9ybTogc3RyaW5nXHJcbiAgICAgICAgdXJsX2J1c2Nhcl9mb3JtOiBzdHJpbmcgLy8gYnVzY2FyIGZvcm11bGFyaW9cclxuICAgICAgICB1cmxfYnVzY2FyOiBzdHJpbmcgLy8gYnVzY2FyIGxpc3RhXHJcbiAgICAgICAgdXJsX2d1YXJkYXI6IHN0cmluZyAvLyBndWFyZGFyXHJcbiAgICAgICAgdXJsX2VsaW1pbmFyOiBzdHJpbmcgLy9lbGltaW5hclxyXG4gICAgICAgIGRpdl90YWJsZTogc3RyaW5nIC8vRGl2IGRvbmRlIHZhIGxhIHRhYmxhIGNvbiBsYSBsaXN0YVxyXG4gICAgICAgIHJvd190YWJsZTogc3RyaW5nIC8vUGFyYSBlbCBldmVudG8gZG9ibGVjbGljayBhbCBlZGl0YXJcclxuICAgICAgICBjb250X2Zvcm06IHN0cmluZyAvL0NvbnRlbmVkb3IgZGVsIGZvcm11bGFyaW8gbnVldm8geSBlZGl0YXIgcXVlIHNlIG9jdWx0YVxyXG4gICAgICAgIGJ0bl9jYW5jZWxhcjogc3RyaW5nIC8vQm90w7NuIGRlIGNhbmNlbGFyXHJcbiAgICAgICAgaWRfcHJpbmNpcGFsOiBzdHJpbmcgLy9JZCBwcmluY2lwYWwgZGUgZW1wbGVhZG9cclxuICAgICAgICBidG5fYWJyaXI6IHN0cmluZyAvL0JvdMOzbiBkZSBhYnJpciBlbCBtb2RhbFxyXG4gICAgICAgIG1vZGFsOiBzdHJpbmcgLy9Nb2RhbFxyXG4gICAgICAgIGJ0bl9jZXJyYXI6IHN0cmluZyAvLyBib3RvbiBkZSBjZXJyYXIgbW9kYWxcclxuICAgICAgICBjbGFzc19uYW1lX2RlbGV0ZTogc3RyaW5nIC8vIG5vbWJyZSBkZSBsYSBjbGFzZSBwYXJhIGVsaW1pbmFyXHJcbiAgICAgICAgZm9ybV9kZWxldGU6IHN0cmluZyAvLyBmb3JtdWxhcmlvIHBhcmEgZWxpbWluYXIsXHJcbiAgICAgICAgY2xhc3NfY2hlY2s6IHN0cmluZyAvLyBDaGVja2JveHggZGUgbGEgdGFibGFcclxuICAgICAgICBidG5fbnVldm86IHN0cmluZyAvL0JvdMOzbiBkZSBudWV2b1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBvcGVyYXRpb246IG51bWJlciA9IDA7XHJcbiAgICB2YXIgZG9tX2VsZW1lbnQ6IElEb21FbGVtZW50X01vZGFsID0ge1xyXG4gICAgICAgIGZvcm06IFwiI25ld19FbXBsb3llZS1EZWR1Y3Rpb25Db2RlXCIsXHJcbiAgICAgICAgdXJsX2J1c2Nhcl9mb3JtOiBcIi9jb2RpZ29zZGVkdWNjaW9uZXNlbXBsZWFkb3MvRm9ybU5ld0VtcGxveWVlRGVkdWN0aW9uQ29kZVwiLFxyXG4gICAgICAgIHVybF9idXNjYXI6IFwiL2NvZGlnb3NkZWR1Y2Npb25lc2VtcGxlYWRvc1wiLFxyXG4gICAgICAgIGRpdl90YWJsZTogXCIuZGF0YXRhYmxlLURlZHVjdGlvbkNvZGVcIixcclxuICAgICAgICByb3dfdGFibGU6IFwiLnJvd3RhYmxlLURlZHVjdGlvbkNvZGVcIixcclxuICAgICAgICBjb250X2Zvcm06IFwiLmNvbnQtZm9ybS1uZXdEZWR1Y3Rpb25Db2RlXCIsXHJcbiAgICAgICAgYnRuX2NhbmNlbGFyOiAnLmJ0bmNhbmNlbGFyX25ld19EZWR1Y3Rpb25Db2RlJyxcclxuICAgICAgICBpZF9wcmluY2lwYWw6ICcjRW1wbG95ZWVJZERlZHVjdGlvbkNvZGUnLFxyXG4gICAgICAgIHVybF9ndWFyZGFyOiBcIi9jb2RpZ29zZGVkdWNjaW9uZXNlbXBsZWFkb3MvZ3VhcmRhclwiLFxyXG4gICAgICAgIGJ0bl9hYnJpcjogJy5vcGVuLWVtcGxveWVlLWRlZHVjdGlvbkNvZGUnLFxyXG4gICAgICAgIG1vZGFsOiAnLm1vZGFsLWVtcGxveWVlLURlZHVjdGlvbkNvZGUnLFxyXG4gICAgICAgIGJ0bl9jZXJyYXI6ICcuY2xvc2UtbW9kYWwtRGVkdWN0aW9uQ29kZScsXHJcbiAgICAgICAgY2xhc3NfbmFtZV9kZWxldGU6IFwibGlzdGlkX0RlZHVjdGlvbkNvZGVcIixcclxuICAgICAgICBmb3JtX2RlbGV0ZTogXCIjZm9ybS1kZWxldGVEZWR1Y3Rpb25Db2RlXCIsXHJcbiAgICAgICAgY2xhc3NfY2hlY2s6IFwiLnNlbGVjdC1FbXBsb3llZURlZHVjdGlvbkNvZGVcIixcclxuICAgICAgICB1cmxfZWxpbWluYXI6IFwiL2NvZGlnb3NkZWR1Y2Npb25lc2VtcGxlYWRvcy9lbGltaW5hclwiLFxyXG4gICAgICAgIGJ0bl9udWV2bzogJy5uZXctRGVkdWN0aW9uQ29kZSdcclxuICAgIH1cclxufVxyXG5cclxuLy9BcnJlZ2xvIGRlIGZ1bmNpb25lc1xyXG5jb25zdCBmbiA9IHtcclxuICAgIC8vQnVzY2FyIGluZm9ybWFjaW9uZXMgZGUgY29kaWdvIGRlIGRlZHVjY2lvbiBkZWwgZW1wbGVhZG9cclxuICAgIFNlYXJjaEVhcm5pbmdDb2RlOiBmdW5jdGlvbiAoX2lkRW1wbG95ZWU6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYCR7ZG9tX2VsZW1lbnQudXJsX2J1c2Nhcn0vJHtfaWRFbXBsb3llZX1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmRpdl90YWJsZSkuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5kaXZfdGFibGUpLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5yb3dfdGFibGUpLmRibGNsaWNrKGZ1bmN0aW9uIG15ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5idG5uZXdBZHJlZXNsaScpLnRleHQoXCJFZGl0YXJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUlkKF9pZEVtcGxveWVlLCAkKHRoaXMpLmZpbmQoXCIuRGVkdWN0aW9uQ29kZUlkXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY29udGFpbmVyLW1vZGFsLXNjcm9sbGluZycpLnNjcm9sbFRvcCgwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vQnVzY2FyIGZvcm11bGFyaW8gZGUgbnVldm8geSBlZGl0YXJcclxuICAgIFNlYXJjaEVtcGxveWVlRWFybmluZ0NvZGVGb3JtOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBkb21fZWxlbWVudC51cmxfYnVzY2FyX2Zvcm0sXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmbi5TaG93Rm9ybShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9CdXNjYXIgY29kaWdvIGRlIGRlZHVjY2lvbiBwYXJhIGVkaXRhclxyXG4gICAgU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUlkOiBmdW5jdGlvbiAoX2lkRW1wbG95ZWU6IHN0cmluZywgX2ludGVybmFsSWQ6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYCR7ZG9tX2VsZW1lbnQudXJsX2J1c2Nhcn0vJHtfaWRFbXBsb3llZX0vJHtfaW50ZXJuYWxJZH1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNob3dGb3JtKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9TYXZlIEVtcGxveWVlIGVhcm5pbmcgY29kZVxyXG4gICAgU2F2ZUVtcGxveWVlRWFybmluZ0NvZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9ndWFyZGFyLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogJChkb21fZWxlbWVudC5mb3JtKS5zZXJpYWxpemUoKSArIGAmb3BlcmF0aW9uPSR7b3BlcmF0aW9ufWAsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld0FkcmVlc2xpJykudGV4dChcIk51ZXZvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRWFybmluZ0NvZGUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZG9tX2VsZW1lbnQuZm9ybSkgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vTW9zdHJhciB5IGNvbmZpZ3VyYXIgZWwgbnVldm8gZm9ybXVsYXJpbyBlbiBlbCBkb21cclxuICAgIFNob3dGb3JtOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5odG1sKCcnKTtcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAvL2NlcnJhciBmb3JtdWxhcmlvIGRlIG51ZXZhIGRpcmVjY2lvblxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuYnRuX2NhbmNlbGFyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5idG5uZXdBZHJlZXNsaScpLnRleHQoXCJOdWV2b1wiKVxyXG4gICAgICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3NhdmUgY29udGFjdCBpbmZvIGVtcGxveWVlXHJcbiAgICAgICAgJChkb21fZWxlbWVudC5mb3JtKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFNpZW1wcmUgcHJldmVuaXIgZWwgZW52w61vIG5hdGl2byBkZWwgZm9ybXVsYXJpb1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIGZuLlNhdmVFbXBsb3llZUVhcm5pbmdDb2RlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvbV9lbGVtZW50LmlkX3ByaW5jaXBhbCkudmFsKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSlcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICBmbi5TZWFyY2hMaXN0RGVkdWN0aW9uQ29kZSgpO1xyXG4gICAgICAgICQoJyNDb250YWN0VHlwZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vQXNpZ25hciB0ZXh0byBkaW7DoW1pY28gYSBsYSBpbmZvcm1hY2nDs24gZGUgY29udGFjdG9cclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgICQoXCIubGJsSW5mb0NvbnRhY3RcIikudGV4dChcIkRpcmVjY2nDs25cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmxibEluZm9Db250YWN0XCIpLnRleHQoXCJOw7ptZXJvXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vUGx1Z2luIGRlIGZlY2hhXHJcbiAgICAgICAgSW5zdGFjaWF0ZUxpc3RlbmVyKCk7XHJcblxyXG4gICAgICAgIC8vUGx1Z2luIGRlIG51bWVyb3NcclxuICAgICAgICBVc2VQbHVnaW5OdW1iZXJGb3JtYXQoXCIjTmV3QW5kRWRpdEVhcm5pbmdDb2RlXCIpO1xyXG5cclxuICAgICAgICAvL0J1c2NhciBjaWNsb3MgZGUgcGFnb3MgYWwgY2FtYmlhciBlbCBjw7NkaWdvIGRlIGxhIG7Ds21pbmEvL1xyXG4gICAgICAgICQoXCIjUGF5cm9sbElkXCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogYC9jb2RpZ29zZ2FuYW5jaWFlbXBsZWFkb3MvY2ljbG9zcGFnby8keyQoXCIjUGF5cm9sbElkXCIpLnZhbCgpfWAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdldFwiLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTdGFydFBlcmlvZEZvclBhaWRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoYCNQYXlGcmVjdWVuY3kgb3B0aW9uW3ZhbHVlPSR7ZGF0YVswXS5QYXlGcmVjdWVuY3l9XWApLmF0dHIoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcIiNQYXlGcmVjdWVuY3lcIikudmFsKGRhdGFbMF0uUGF5RnJlY3VlbmN5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mbi5DYWxjQW1vdW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dChgWyAkeyhGb3JtYXREYXRlQXV0b0JpbmRpbmcodGhpcy5QZXJpb2RTdGFydERhdGUpKX0gXSAtIFsgJHsoRm9ybWF0RGF0ZUF1dG9CaW5kaW5nKHRoaXMuUGVyaW9kRW5kRGF0ZSkpfSBdYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKHRoaXMuUGF5Q3ljbGVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1N0YXJ0UGVyaW9kRm9yUGFpZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNlYXJjaExpc3REZWR1Y3Rpb25Db2RlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQoXCIjRGVkdWN0aW9uQ29kZUlkXCIpWzBdLmNoaWxkcmVuLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL2NvZGlnb3NkZWR1Y2Npb25lc2VtcGxlYWRvcy9CdXNjYXJjb2RpZ29zZGVkdWNjaW9uZXNcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR2V0XCIsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRGVkdWN0aW9uQ29kZUlkXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGRhdGEpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWwodGhpcy5EZWR1Y3Rpb25Db2RlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNEZWR1Y3Rpb25Db2RlSWRcIikuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmVzY3VjaGFkb3Jlczoge1xyXG4gICAgLy9BYnJpciBpbmZvcm1hY2nDs24gY29kaWdvIGRlIGNhbmFuY2lhXHJcbiAgICAkKGRvbV9lbGVtZW50LmJ0bl9hYnJpcikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZuLlNlYXJjaEVhcm5pbmdDb2RlKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5tb2RhbCkubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ2VycmFyIG1vZGFsIGRlIGluZm9ybWFjacOzbiBkZSBjb250YWN0b1xyXG4gICAgJChkb21fZWxlbWVudC5idG5fY2VycmFyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5tb2RhbCkubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9BYnJpciBmb3JtdWxhcmlvIGRlIG51ZXZvXHJcbiAgICAkKGRvbV9lbGVtZW50LmJ0bl9udWV2bykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wZXJhdGlvbiA9IDE7XHJcbiAgICAgICAgZm4uU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUZvcm0oKTtcclxuICAgICAgICAvL0Z1bmNpb24gcGFyYSBtb3ZlciBlbCBzY3JvbGwsIHBhcmEgbWVqb3IgZGlzZcOxb1xyXG4gICAgICAgICQoJy5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nJykuc2Nyb2xsVG9wKDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9lbGltaW5hciBpbmZvcm1hY2lvbiBkZSBjb250YWN0b1xyXG4gICAgJChkb21fZWxlbWVudC5mb3JtX2RlbGV0ZSkuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBTaWVtcHJlIHByZXZlbmlyIGVsIGVudsOtbyBuYXRpdm8gZGVsIGZvcm11bGFyaW9cclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChgJHtkb21fZWxlbWVudC5jbGFzc19jaGVja31bdHlwZT1jaGVja2JveF1gKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIGRvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuRGVkdWN0aW9uQ29kZUlkXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZm9ybV9kZWxldGUpLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgbG9zIGPDs2RpZ29zIGRlIGRlZHVjY2lvbmVzIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogZG9tX2VsZW1lbnQudXJsX2VsaW1pbmFyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKGRvbV9lbGVtZW50LmZvcm1fZGVsZXRlKS5zZXJpYWxpemUoKSArIGAmZW1wbG95ZWVpZD0keyQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKS50cmltKCl9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoYC4ke2RvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlfWApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hFYXJuaW5nQ29kZSgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoYC4ke2RvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlfWApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChgJHtkb21fZWxlbWVudC5jbGFzc19jaGVja31bdHlwZT1jaGVja2JveF1gKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGAuJHtkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZX1gKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vUGFyYSBkaXNlw7FvLCBzZSBvY3VsdGEgZWwgaW5kaWNhZG9yIGFsIGhhY2VyIHNjcm9sbFxyXG4gICAgJChcIi5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nXCIpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uU2Nyb2xsOiBudW1iZXIgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmIChwb3NpdGlvblNjcm9sbCA+IDApXHJcbiAgICAgICAgICAgICQoJy5mb3ItZW1wbG95ZWUtY29udGFjdGluZm8nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQoJy5mb3ItZW1wbG95ZWUtY29udGFjdGluZm8nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IHsgfSJdfQ==