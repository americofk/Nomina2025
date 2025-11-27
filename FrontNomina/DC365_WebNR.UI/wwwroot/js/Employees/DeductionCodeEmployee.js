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
            if ($(this).valid()) {
                e.preventDefault();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVkdWN0aW9uQ29kZUVtcGxveWVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vVHlwZVNjcmlwdEZpbGUvRW1wbG95ZWVzL0RlZHVjdGlvbkNvZGVFbXBsb3llZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBRUgsU0FBUyxFQUFFLENBQUM7SUFxQlIsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDO0lBQzFCLElBQUksV0FBVyxHQUFzQjtRQUNqQyxJQUFJLEVBQUUsNkJBQTZCO1FBQ25DLGVBQWUsRUFBRSwyREFBMkQ7UUFDNUUsVUFBVSxFQUFFLDhCQUE4QjtRQUMxQyxTQUFTLEVBQUUsMEJBQTBCO1FBQ3JDLFNBQVMsRUFBRSx5QkFBeUI7UUFDcEMsU0FBUyxFQUFFLDZCQUE2QjtRQUN4QyxZQUFZLEVBQUUsZ0NBQWdDO1FBQzlDLFlBQVksRUFBRSwwQkFBMEI7UUFDeEMsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsOEJBQThCO1FBQ3pDLEtBQUssRUFBRSwrQkFBK0I7UUFDdEMsVUFBVSxFQUFFLDRCQUE0QjtRQUN4QyxpQkFBaUIsRUFBRSxzQkFBc0I7UUFDekMsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxXQUFXLEVBQUUsK0JBQStCO1FBQzVDLFlBQVksRUFBRSx1Q0FBdUM7UUFDckQsU0FBUyxFQUFFLG9CQUFvQjtLQUNsQyxDQUFBO0FBQ0wsQ0FBQztBQUVELHNCQUFzQjtBQUN0QixNQUFNLEVBQUUsR0FBRztJQUNQLDBEQUEwRDtJQUMxRCxpQkFBaUIsRUFBRSxVQUFVLFdBQW1CO1FBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsVUFBVSxJQUFJLFdBQVcsRUFBRTtZQUMvQyxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtnQkFDbkIsSUFBSSxJQUFJLENBQUMs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LFVBQVUsR0FBRztnQ0FDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzlCLENBQUM7eUJBRUosQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBQ0QsUUFBUSxFQUFFO3dCQUNOLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDdEUsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDcEQsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgscURBQXFEO0lBQ3JELENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLGNBQWMsR0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakQsSUFBSSxjQUFjLEdBQUcsQ0FBQztZQUNsQixDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7O1lBRXBELENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvRCxDQUFDLENBQUMsQ0FBQztBQUVQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgRGVkdWN0aW9uQ29kZUVtcGxveWVlLnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBNw7NkdWxvIGRlIGdlc3Rpw7NuIGRlIGPDs2RpZ29zIGRlIGRlZHVjY2nDs24gcG9yIGVtcGxlYWRvLiBQZXJtaXRlIGFzaWduYXIsXHJcbiAqICAgICAgICAgICAgICBlZGl0YXIgeSBlbGltaW5hciBkZWR1Y2Npb25lcyBlc3BlY8OtZmljYXMgcGFyYSBjYWRhIGVtcGxlYWRvLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBEZWR1Y2Npb25lc0VtcGxlYWRvc1xyXG4gKi9cclxuXHJcbnZhcmlhYmxlczoge1xyXG4gICAgaW50ZXJmYWNlIElEb21FbGVtZW50X01vZGFsIHtcclxuICAgICAgICBmb3JtOiBzdHJpbmdcclxuICAgICAgICB1cmxfYnVzY2FyX2Zvcm06IHN0cmluZyAvLyBidXNjYXIgZm9ybXVsYXJpb1xyXG4gICAgICAgIHVybF9idXNjYXI6IHN0cmluZyAvLyBidXNjYXIgbGlzdGFcclxuICAgICAgICB1cmxfZ3VhcmRhcjogc3RyaW5nIC8vIGd1YXJkYXJcclxuICAgICAgICB1cmxfZWxpbWluYXI6IHN0cmluZyAvL2VsaW1pbmFyXHJcbiAgICAgICAgZGl2X3RhYmxlOiBzdHJpbmcgLy9EaXYgZG9uZGUgdmEgbGEgdGFibGEgY29uIGxhIGxpc3RhXHJcbiAgICAgICAgcm93X3RhYmxlOiBzdHJpbmcgLy9QYXJhIGVsIGV2ZW50byBkb2JsZWNsaWNrIGFsIGVkaXRhclxyXG4gICAgICAgIGNvbnRfZm9ybTogc3RyaW5nIC8vQ29udGVuZWRvciBkZWwgZm9ybXVsYXJpbyBudWV2byB5IGVkaXRhciBxdWUgc2Ugb2N1bHRhXHJcbiAgICAgICAgYnRuX2NhbmNlbGFyOiBzdHJpbmcgLy9Cb3TDs24gZGUgY2FuY2VsYXJcclxuICAgICAgICBpZF9wcmluY2lwYWw6IHN0cmluZyAvL0lkIHByaW5jaXBhbCBkZSBlbXBsZWFkb1xyXG4gICAgICAgIGJ0bl9hYnJpcjogc3RyaW5nIC8vQm90w7NuIGRlIGFicmlyIGVsIG1vZGFsXHJcbiAgICAgICAgbW9kYWw6IHN0cmluZyAvL01vZGFsXHJcbiAgICAgICAgYnRuX2NlcnJhcjogc3RyaW5nIC8vIGJvdG9uIGRlIGNlcnJhciBtb2RhbFxyXG4gICAgICAgIGNsYXNzX25hbWVfZGVsZXRlOiBzdHJpbmcgLy8gbm9tYnJlIGRlIGxhIGNsYXNlIHBhcmEgZWxpbWluYXJcclxuICAgICAgICBmb3JtX2RlbGV0ZTogc3RyaW5nIC8vIGZvcm11bGFyaW8gcGFyYSBlbGltaW5hcixcclxuICAgICAgICBjbGFzc19jaGVjazogc3RyaW5nIC8vIENoZWNrYm94eCBkZSBsYSB0YWJsYVxyXG4gICAgICAgIGJ0bl9udWV2bzogc3RyaW5nIC8vQm90w7NuIGRlIG51ZXZvXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9wZXJhdGlvbjogbnVtYmVyID0gMDtcclxuICAgIHZhciBkb21fZWxlbWVudDogSURvbUVsZW1lbnRfTW9kYWwgPSB7XHJcbiAgICAgICAgZm9ybTogXCIjbmV3X0VtcGxveWVlLURlZHVjdGlvbkNvZGVcIixcclxuICAgICAgICB1cmxfYnVzY2FyX2Zvcm06IFwiL2NvZGlnb3NkZWR1Y2Npb25lc2VtcGxlYWRvcy9Gb3JtTmV3RW1wbG95ZWVEZWR1Y3Rpb25Db2RlXCIsXHJcbiAgICAgICAgdXJsX2J1c2NhcjogXCIvY29kaWdvc2RlZHVjY2lvbmVzZW1wbGVhZG9zXCIsXHJcbiAgICAgICAgZGl2X3RhYmxlOiBcIi5kYXRhdGFibGUtRGVkdWN0aW9uQ29kZVwiLFxyXG4gICAgICAgIHJvd190YWJsZTogXCIucm93dGFibGUtRGVkdWN0aW9uQ29kZVwiLFxyXG4gICAgICAgIGNvbnRfZm9ybTogXCIuY29udC1mb3JtLW5ld0RlZHVjdGlvbkNvZGVcIixcclxuICAgICAgICBidG5fY2FuY2VsYXI6ICcuYnRuY2FuY2VsYXJfbmV3X0RlZHVjdGlvbkNvZGUnLFxyXG4gICAgICAgIGlkX3ByaW5jaXBhbDogJyNFbXBsb3llZUlkRGVkdWN0aW9uQ29kZScsXHJcbiAgICAgICAgdXJsX2d1YXJkYXI6IFwiL2NvZGlnb3NkZWR1Y2Npb25lc2VtcGxlYWRvcy9ndWFyZGFyXCIsXHJcbiAgICAgICAgYnRuX2FicmlyOiAnLm9wZW4tZW1wbG95ZWUtZGVkdWN0aW9uQ29kZScsXHJcbiAgICAgICAgbW9kYWw6ICcubW9kYWwtZW1wbG95ZWUtRGVkdWN0aW9uQ29kZScsXHJcbiAgICAgICAgYnRuX2NlcnJhcjogJy5jbG9zZS1tb2RhbC1EZWR1Y3Rpb25Db2RlJyxcclxuICAgICAgICBjbGFzc19uYW1lX2RlbGV0ZTogXCJsaXN0aWRfRGVkdWN0aW9uQ29kZVwiLFxyXG4gICAgICAgIGZvcm1fZGVsZXRlOiBcIiNmb3JtLWRlbGV0ZURlZHVjdGlvbkNvZGVcIixcclxuICAgICAgICBjbGFzc19jaGVjazogXCIuc2VsZWN0LUVtcGxveWVlRGVkdWN0aW9uQ29kZVwiLFxyXG4gICAgICAgIHVybF9lbGltaW5hcjogXCIvY29kaWdvc2RlZHVjY2lvbmVzZW1wbGVhZG9zL2VsaW1pbmFyXCIsXHJcbiAgICAgICAgYnRuX251ZXZvOiAnLm5ldy1EZWR1Y3Rpb25Db2RlJ1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0FycmVnbG8gZGUgZnVuY2lvbmVzXHJcbmNvbnN0IGZuID0ge1xyXG4gICAgLy9CdXNjYXIgaW5mb3JtYWNpb25lcyBkZSBjb2RpZ28gZGUgZGVkdWNjaW9uIGRlbCBlbXBsZWFkb1xyXG4gICAgU2VhcmNoRWFybmluZ0NvZGU6IGZ1bmN0aW9uIChfaWRFbXBsb3llZTogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgJHtkb21fZWxlbWVudC51cmxfYnVzY2FyfS8ke19pZEVtcGxveWVlfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZGl2X3RhYmxlKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmRpdl90YWJsZSkuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LnJvd190YWJsZSkuZGJsY2xpY2soZnVuY3Rpb24gbXlmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld0FkcmVlc2xpJykudGV4dChcIkVkaXRhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hFbXBsb3llZUVhcm5pbmdDb2RlSWQoX2lkRW1wbG95ZWUsICQodGhpcykuZmluZChcIi5EZWR1Y3Rpb25Db2RlSWRcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nJykuc2Nyb2xsVG9wKDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9CdXNjYXIgZm9ybXVsYXJpbyBkZSBudWV2byB5IGVkaXRhclxyXG4gICAgU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUZvcm06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9idXNjYXJfZm9ybSxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLlNob3dGb3JtKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL0J1c2NhciBjb2RpZ28gZGUgZGVkdWNjaW9uIHBhcmEgZWRpdGFyXHJcbiAgICBTZWFyY2hFbXBsb3llZUVhcm5pbmdDb2RlSWQ6IGZ1bmN0aW9uIChfaWRFbXBsb3llZTogc3RyaW5nLCBfaW50ZXJuYWxJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgJHtkb21fZWxlbWVudC51cmxfYnVzY2FyfS8ke19pZEVtcGxveWVlfS8ke19pbnRlcm5hbElkfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2hvd0Zvcm0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL1NhdmUgRW1wbG95ZWUgZWFybmluZyBjb2RlXHJcbiAgICBTYXZlRW1wbG95ZWVFYXJuaW5nQ29kZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZG9tX2VsZW1lbnQudXJsX2d1YXJkYXIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiAkKGRvbV9lbGVtZW50LmZvcm0pLnNlcmlhbGl6ZSgpICsgYCZvcGVyYXRpb249JHtvcGVyYXRpb259YCxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYnRubmV3QWRyZWVzbGknKS50ZXh0KFwiTnVldm9cIilcclxuICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hFYXJuaW5nQ29kZSgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihkb21fZWxlbWVudC5mb3JtKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9Nb3N0cmFyIHkgY29uZmlndXJhciBlbCBudWV2byBmb3JtdWxhcmlvIGVuIGVsIGRvbVxyXG4gICAgU2hvd0Zvcm06IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmh0bWwoJycpO1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5hcHBlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgIC8vY2VycmFyIGZvcm11bGFyaW8gZGUgbnVldmEgZGlyZWNjaW9uXHJcbiAgICAgICAgJChkb21fZWxlbWVudC5idG5fY2FuY2VsYXIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmJ0bm5ld0FkcmVlc2xpJykudGV4dChcIk51ZXZvXCIpXHJcbiAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vc2F2ZSBjb250YWN0IGluZm8gZW1wbG95ZWVcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmZvcm0pLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBmbi5TYXZlRW1wbG95ZWVFYXJuaW5nQ29kZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb21fZWxlbWVudC5pZF9wcmluY2lwYWwpLnZhbCgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgZm4uU2VhcmNoTGlzdERlZHVjdGlvbkNvZGUoKTtcclxuICAgICAgICAkKCcjQ29udGFjdFR5cGUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL0FzaWduYXIgdGV4dG8gZGluw6FtaWNvIGEgbGEgaW5mb3JtYWNpw7NuIGRlIGNvbnRhY3RvXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmxibEluZm9Db250YWN0XCIpLnRleHQoXCJEaXJlY2Npw7NuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIi5sYmxJbmZvQ29udGFjdFwiKS50ZXh0KFwiTsO6bWVyb1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL1BsdWdpbiBkZSBmZWNoYVxyXG4gICAgICAgIEluc3RhY2lhdGVMaXN0ZW5lcigpO1xyXG5cclxuICAgICAgICAvL1BsdWdpbiBkZSBudW1lcm9zXHJcbiAgICAgICAgVXNlUGx1Z2luTnVtYmVyRm9ybWF0KFwiI05ld0FuZEVkaXRFYXJuaW5nQ29kZVwiKTtcclxuXHJcbiAgICAgICAgLy9CdXNjYXIgY2ljbG9zIGRlIHBhZ29zIGFsIGNhbWJpYXIgZWwgY8OzZGlnbyBkZSBsYSBuw7NtaW5hLy9cclxuICAgICAgICAkKFwiI1BheXJvbGxJZFwiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGAvY29kaWdvc2dhbmFuY2lhZW1wbGVhZG9zL2NpY2xvc3BhZ28vJHskKFwiI1BheXJvbGxJZFwiKS52YWwoKX1gLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHZXRcIixcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjU3RhcnRQZXJpb2RGb3JQYWlkXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGAjUGF5RnJlY3VlbmN5IG9wdGlvblt2YWx1ZT0ke2RhdGFbMF0uUGF5RnJlY3VlbmN5fV1gKS5hdHRyKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQoXCIjUGF5RnJlY3VlbmN5XCIpLnZhbChkYXRhWzBdLlBheUZyZWN1ZW5jeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm4uQ2FsY0Ftb3VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGRhdGEpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQoYFsgJHsoRm9ybWF0RGF0ZUF1dG9CaW5kaW5nKHRoaXMuUGVyaW9kU3RhcnREYXRlKSl9IF0gLSBbICR7KEZvcm1hdERhdGVBdXRvQmluZGluZyh0aGlzLlBlcmlvZEVuZERhdGUpKX0gXWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLlBheUN5Y2xlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTdGFydFBlcmlvZEZvclBhaWRcIikuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZWFyY2hMaXN0RGVkdWN0aW9uQ29kZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKFwiI0RlZHVjdGlvbkNvZGVJZFwiKVswXS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9jb2RpZ29zZGVkdWNjaW9uZXNlbXBsZWFkb3MvQnVzY2FyY29kaWdvc2RlZHVjY2lvbmVzXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdldFwiLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0RlZHVjdGlvbkNvZGVJZFwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChkYXRhKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0KHRoaXMuTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKHRoaXMuRGVkdWN0aW9uQ29kZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRGVkdWN0aW9uQ29kZUlkXCIpLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5lc2N1Y2hhZG9yZXM6IHtcclxuICAgIC8vQWJyaXIgaW5mb3JtYWNpw7NuIGNvZGlnbyBkZSBjYW5hbmNpYVxyXG4gICAgJChkb21fZWxlbWVudC5idG5fYWJyaXIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5TZWFyY2hFYXJuaW5nQ29kZSgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQubW9kYWwpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NlcnJhciBtb2RhbCBkZSBpbmZvcm1hY2nDs24gZGUgY29udGFjdG9cclxuICAgICQoZG9tX2VsZW1lbnQuYnRuX2NlcnJhcikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQubW9kYWwpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQWJyaXIgZm9ybXVsYXJpbyBkZSBudWV2b1xyXG4gICAgJChkb21fZWxlbWVudC5idG5fbnVldm8pLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcGVyYXRpb24gPSAxO1xyXG4gICAgICAgIGZuLlNlYXJjaEVtcGxveWVlRWFybmluZ0NvZGVGb3JtKCk7XHJcbiAgICAgICAgLy9GdW5jaW9uIHBhcmEgbW92ZXIgZWwgc2Nyb2xsLCBwYXJhIG1lam9yIGRpc2XDsW9cclxuICAgICAgICAkKCcuY29udGFpbmVyLW1vZGFsLXNjcm9sbGluZycpLnNjcm9sbFRvcCgwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vZWxpbWluYXIgaW5mb3JtYWNpb24gZGUgY29udGFjdG9cclxuICAgICQoZG9tX2VsZW1lbnQuZm9ybV9kZWxldGUpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgICAgICQoYCR7ZG9tX2VsZW1lbnQuY2xhc3NfY2hlY2t9W3R5cGU9Y2hlY2tib3hdYCkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIGRvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkRlZHVjdGlvbkNvZGVJZFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmZvcm1fZGVsZXRlKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGxvcyBjw7NkaWdvcyBkZSBkZWR1Y2Npb25lcyBzZWxlY2Npb25hZG9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9lbGltaW5hcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChkb21fZWxlbWVudC5mb3JtX2RlbGV0ZSkuc2VyaWFsaXplKCkgKyBgJmVtcGxveWVlaWQ9JHskKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkudHJpbSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGAuJHtkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZX1gKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRWFybmluZ0NvZGUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGAuJHtkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZX1gKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoYCR7ZG9tX2VsZW1lbnQuY2xhc3NfY2hlY2t9W3R5cGU9Y2hlY2tib3hdYCkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1BhcmEgZGlzZcOxbywgc2Ugb2N1bHRhIGVsIGluZGljYWRvciBhbCBoYWNlciBzY3JvbGxcclxuICAgICQoXCIuY29udGFpbmVyLW1vZGFsLXNjcm9sbGluZ1wiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBwb3NpdGlvblNjcm9sbDogbnVtYmVyID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBpZiAocG9zaXRpb25TY3JvbGwgPiAwKVxyXG4gICAgICAgICAgICAkKCcuZm9yLWVtcGxveWVlLWNvbnRhY3RpbmZvJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkKCcuZm9yLWVtcGxveWVlLWNvbnRhY3RpbmZvJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IH0iXX0=