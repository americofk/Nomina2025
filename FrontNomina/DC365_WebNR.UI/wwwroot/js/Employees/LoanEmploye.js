/**
 * @file LoanEmploye.ts
 * @description Módulo de gestión de préstamos por empleado. Permite asignar,
 *              editar y eliminar préstamos para cada empleado.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module PrestamosEmpleados
 */
variables: {
    var operation = 0;
    var dom_element = {
        form: "#new_LoanEmployee",
        url_buscar_form: "/prestamosempleados/FormNewEmployeeLoans",
        url_buscar: "/prestamosempleados",
        div_table: ".datatable-Loan",
        row_table: ".rowtable-loan",
        cont_form: ".cont-form-newLoan",
        btn_cancelar: '.btncancelar_new_Loan',
        id_principal: '#EmployeeIdLoan',
        url_guardar: "/prestamosempleados/guardar",
        btn_abrir: '.open-employee-loan',
        modal: '.modal-employee-Loan',
        btn_cerrar: '.close-modal-Loan',
        class_name_delete: "listid_EmployeeLoan",
        form_delete: "#form-deleteLoan",
        class_check: ".select-loan-Employe",
        url_eliminar: "/prestamosempleados/eliminar",
        btn_nuevo: '.new-Loan'
    };
}
//Arreglo de funciones
const fn = {
    //Buscar informaciones de prestamos de empleados
    SearchLoan: function (_idEmployee) {
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
                        fn.SearchEmployeeLoan(_idEmployee, $(this).find(".LoanIdtbl").html().trim());
                    });
                    $('.container-modal-scrolling').scrollTop(0);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    //Buscar formulario de nuevo y editar
    SearchEmployeeLoanForm: function () {
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
    //Buscar para editar
    SearchEmployeeLoan: function (_idEmployee, _internalId) {
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
    //Save
    SaveEmployeeLoan: function () {
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
                    fn.SearchLoan($('#EmployeeId').val().toString());
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
        //cerrar formulario
        $(dom_element.btn_cancelar).on('click', function () {
            $(dom_element.cont_form).addClass("collapse");
        });
        //Buscar ciclos de pago al cambiar el código de la nómina//
        $("#PayrollId").on("change", function () {
            $.ajax({
                url: `/prestamosempleados/ciclospago/${$("#PayrollId").val()}`,
                type: "Get",
                async: true,
                success: function (data) {
                    if (data.length > 0) {
                        $("#StartPeriodForPaid").html('');
                        $("#PayFrecuency").val(data[0].PayFrecuency);
                        $(data).each(function () {
                            var option = $(document.createElement('option'));
                            option.text(`[ ${(FormatDateAutoBinding(this.PeriodStartDate))} ] - [ ${(FormatDateAutoBinding(this.PeriodEndDate))} ]`);
                            option.val(this.PayCycleId);
                            $("#StartPeriodForPaid").append(option);
                        });
                        $("#StartPeriodForPaid").on("change", function () {
                            $.ajax({
                                url: `/prestamosempleados/ciclospago/${$("#PayrollId").val()}/${$("#StartPeriodForPaid").val()}/${$("#PayFrecuency").val()}/${$("#QtyPeriodForPaid").val()}/${$("#TotalDues").val()}`,
                                type: "Get",
                                async: true,
                                success: function (data) {
                                    if (data.length > 0) {
                                        $("#ValidFrom").val(FormatDateAutoBinding(data[0].PeriodStartDate));
                                        $("#ValidTo").val(FormatDateAutoBinding(data[0].PayDate));
                                    }
                                }, error: function (xhr) {
                                    redireccionaralLogin(xhr);
                                }
                            });
                        });
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        });
        //save
        $(dom_element.form).submit(function (e) {
            e.preventDefault();
            if ($(this).valid()) {
                fn.SaveEmployeeLoan();
            }
        });
        $(dom_element.id_principal).val($('#EmployeeId').val().toString());
        $(dom_element.cont_form).removeClass("collapse");
        InstaciateListener();
        fn.Calc_Amount();
        //Plugin de numeros
        UsePluginNumberFormat(dom_element.form);
    },
    Calc_Amount: function () {
        //Escuchador para el calculo de los prestamos
        $(".amount-to-calc").on("change", function (e) {
            let total = FormatoNumericos_Calcular($("#LoanAmount").val().toString());
            let cuotas = FormatoNumericos_Calcular($("#TotalDues").val().toString());
            let montocuota = FormatoNumericos_Calcular($("#AmountByDues").val().toString());
            let pagado = FormatoNumericos_Calcular($("#PaidAmount").val().toString());
            let pendiente = FormatoNumericos_Calcular($("#PendingAmount").val().toString());
            let current = e.currentTarget;
            if (current.id == "TotalDues") {
                $("#AmountByDues").val(FormatoNumericos_Mostrar((total / cuotas).toString(), true));
                return;
            }
            if (current.id == "AmountByDues") {
                $("#TotalDues").val(FormatoNumericos_Mostrar((total / montocuota).toString(), true));
                return;
            }
            if (current.id == "PaidAmount") {
                $("#PendingAmount").val(FormatoNumericos_Mostrar((total - pagado).toString(), true));
                return;
            }
            if (current.id == "PendingAmount") {
                $("#PaidAmount").val(FormatoNumericos_Mostrar((total - pendiente).toString(), true));
                return;
            }
        });
    }
};
escuchadores: {
    //Abrir información de prestamo
    $(dom_element.btn_abrir).on('click', function () {
        fn.SearchLoan($('#EmployeeId').val().toString());
        $(dom_element.modal).modal({ backdrop: 'static', keyboard: false });
    });
    //Cerrar modal de prestamo
    $(dom_element.btn_cerrar).on('click', function () {
        $(dom_element.modal).modal("hide");
    });
    //Abrir formulario nuevo
    $(dom_element.btn_nuevo).on('click', function () {
        operation = 1;
        fn.SearchEmployeeLoanForm();
        //Funcion para mover el scroll, para mejor diseño
        $('.container-modal-scrolling').scrollTop(0);
    });
    //eliminar prestamos de empleados
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
                    input.val($(this).parent().parent().find(".LoanIdtbl").html().trim());
                    $(dom_element.form_delete).append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los prestamos seleccionados?", "confirm", {
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
                                    fn.SearchLoan($('#EmployeeId').val().toString());
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
    $('.Histori-employe-loans').click(function () {
        var contador = 0;
        let InternalId;
        let LoanId;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(`${dom_element.class_check}[type=checkbox]`).each(function () {
            if ($(this).is(":checked")) {
                contador++;
                /*   InternalId = $(this).parent().parent().find(".InternalIdtbl").html().trim(); */
                InternalId = $(this).parent().parent().find(".LoanIdtbl").html().trim(); // este es el internal id del prestamo
            }
        });
        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
        }
        else {
            $.ajax({
                url: `prestamosempleados/GethistoriLoan`,
                data: {
                    employeeid: $('#EmployeeId').val().toString(),
                    internalId: InternalId
                },
                type: "GET",
                async: true,
                success: function (data) {
                    $(".set-title-modloan").text("Historial de préstamo");
                    if (data.length > 0) {
                        $(".datatable-Loan-history").html('');
                        $(".datatable-Loan-history").append(data);
                        $(".datatable-Loan").addClass("collapse");
                        $(".datatable-Loan-history").removeClass("collpase-modal");
                        $(".forward").addClass("collapse");
                        $(".backward-btn").removeClass("collapse");
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    $('.backward-btn').click(function () {
        $(".datatable-Loan-history").addClass("collpase-modal");
        $(".set-title-modloan").text("Préstamo");
        $(".forward").removeClass("collapse");
        $(".backward-btn").addClass("collapse");
        $(".datatable-Loan").removeClass("collapse");
    });
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hbkVtcGxveWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9UeXBlU2NyaXB0RmlsZS9FbXBsb3llZXMvTG9hbkVtcGxveWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILFNBQVMsRUFBRSxDQUFDO0lBcUJSLElBQUksU0FBUyxHQUFXLENBQUMsQ0FBQztJQUMxQixJQUFJLFdBQVcsR0FBc0I7UUFDakMsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixlQUFlLEVBQUUsMENBQTBDO1FBQzNELFVBQVUsRUFBRSxxQkFBcUI7UUFDakMsU0FBUyxFQUFFLGlCQUFpQjtRQUM1QixTQUFTLEVBQUUsZ0JBQWdCO1FBQzNCLFNBQVMsRUFBRSxvQkFBb0I7UUFDL0IsWUFBWSxFQUFFLHVCQUF1QjtRQUNyQyxZQUFZLEVBQUUsaUJBQWlCO1FBQy9CLFdBQVcsRUFBRSw2QkFBNkI7UUFDMUMsU0FBUyxFQUFFLHFCQUFxQjtRQUNoQyxLQUFLLEVBQUUsc0JBQXNCO1FBQzdCLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsaUJBQWlCLEVBQUUscUJBQXFCO1FBQ3hDLFdBQVcsRUFBRSxrQkFBa0I7UUFDL0IsV0FBVyxFQUFFLHNCQUFzQjtRQUNuQyxZQUFZLEVBQUUsOEJBQThCO1FBQzVDLFNBQVMsRUFBRSxXQUFXO0tBQ3pCLENBQUE7QUFDTCxDQUFDO0FBRUQsc0JBQXNCO0FBQ3RCLE1BQU0sRUFBRSxHQUFHO0lBQ1AsZ0RBQWdEO0lBQ2hELFVBQVUsRUFBRSxVQUFVLFdBQW1CO1FBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsVUFBVSxJQUFJLFdBQVcsRUFBRTtZQUMvQyxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtnQkFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNsQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDbEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRXRDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsVUFBVTt3QkFDakQsU0FBUyxHQUFHLENBQUMsQ0FBQzt3QkFDZCxFQUFFLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDakYsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLHNCQUFzQixFQUFFO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsV0FBVyxDQUFDLGVBQWU7WUFDaEMsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxVQUFVLElBQUk7Z0JBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDbEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsQ0FBQztZQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHO2dCQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG9CQUFvQjtJQUNwQixrQkFBa0IsRUFBRSxVQUFVLFdBQW1CLEVBQUUsV0FBbUI7UUFDbEUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxVQUFVLElBQUksV0FBVyxJQUFJLFdBQVcsRUFBRTtZQUM5RCxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtnQkFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQ2xCLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHO2dCQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU07SUFDTixnQkFBZ0IsRUFBRTtRQUNkLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsV0FBVyxDQUFDLFdBQVc7WUFDNUIsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxjQUFjLFNBQVMsRUFBRTtZQUNqRSxLQUFLLEVBQUUsSUFBSTtZQUNYLE9BQU8sRUFBRSxVQUFVLElBQWdCO2dCQUMvQixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ3ZCLElBQUksT0FBTyxHQUFXLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFTO3dCQUNuQyxPQUFPLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQztvQkFDMUIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7cUJBQU0sQ0FBQztvQkFDSixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQW9CLENBQUM7b0JBQ3ZFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDYixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO1lBR0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0RBQW9EO0lBQ3BELFFBQVEsRUFBRSxVQUFVLElBQUk7UUFDcEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEMsbUJBQW1CO1FBQ25CLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUNwQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztRQUVILDJEQUEyRDtRQUMzRCxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNILEdBQUcsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUM5RCxJQUFJLEVBQUUsS0FBSztnQkFDWCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxPQUFPLEVBQUUsVUFBVSxJQUFJO29CQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQ2xCLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDbEMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQ1QsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3pILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUM1QixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzVDLENBQUMsQ0FBQyxDQUFDO3dCQUVILENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7NEJBQ2xDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0NBQ0gsR0FBRyxFQUFFLGtDQUFrQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQ0FDckwsSUFBSSxFQUFFLEtBQUs7Z0NBQ1gsS0FBSyxFQUFFLElBQUk7Z0NBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtvQ0FDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO3dDQUNsQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO3dDQUNwRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29DQUM5RCxDQUFDO2dDQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHO29DQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDOUIsQ0FBQzs2QkFDSixDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQztnQkFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztvQkFDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU07UUFDTixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDbEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1lBQ3pCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ2xFLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELGtCQUFrQixFQUFFLENBQUM7UUFDckIsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpCLG1CQUFtQjtRQUNuQixxQkFBcUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFdBQVcsRUFBRTtRQUNULDZDQUE2QztRQUM3QyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQztZQUN6QyxJQUFJLEtBQUssR0FBVyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNqRixJQUFJLE1BQU0sR0FBVyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNqRixJQUFJLFVBQVUsR0FBVyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN4RixJQUFJLE1BQU0sR0FBVyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNsRixJQUFJLFNBQVMsR0FBVyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRXhGLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDOUIsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUM1QixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BGLE9BQU87WUFDWCxDQUFDO1lBRUQsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUMvQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JGLE9BQU87WUFDWCxDQUFDO1lBRUQsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLFlBQVksRUFBRSxDQUFDO2dCQUM3QixDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckYsT0FBTztZQUNYLENBQUM7WUFFRCxJQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksZUFBZSxFQUFFLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckYsT0FBTztZQUNYLENBQUM7UUFHTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSixDQUFBO0FBS0QsWUFBWSxFQUFFLENBQUM7SUFDWCwrQkFBK0I7SUFDL0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ2pDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBRXZFLENBQUMsQ0FBQyxDQUFDO0lBRUgsMEJBQTBCO0lBQzFCLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUNsQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUVILHdCQUF3QjtJQUN4QixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7UUFDakMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzVCLGlEQUFpRDtRQUNqRCxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxpQ0FBaUM7SUFDakMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLGtEQUFrRDtRQUN0RSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQ2xCLElBQUksUUFBUSxHQUFZLEtBQUssQ0FBQztZQUM5Qix3RUFBd0U7WUFDeEUsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLFdBQVcsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO29CQUN6QixRQUFRLEdBQUcsSUFBSSxDQUFBO29CQUNmLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQy9DLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUNsRCxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDbkQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ3RFLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ1osZUFBZSxDQUFDLGdDQUFnQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQy9ELENBQUM7aUJBQ0ksQ0FBQztnQkFDRixlQUFlLENBQUMsOENBQThDLEVBQUUsU0FBUyxFQUFFO29CQUN2RSxJQUFJLEVBQUU7d0JBQ0YsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7d0JBRTdELENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBRUgsR0FBRyxFQUFFLFdBQVcsQ0FBQyxZQUFZOzRCQUM3QixJQUFJLEVBQUUsTUFBTTs0QkFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDeEcsS0FBSyxFQUFFLElBQUk7NEJBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBZ0I7Z0NBQy9CLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzdCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQztvQ0FDdkIsSUFBSSxPQUFPLEdBQVcsRUFBRSxDQUFDO29DQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQVM7d0NBQ25DLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDO29DQUMxQixDQUFDLENBQUMsQ0FBQztvQ0FDSCxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO29DQUNoRCxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDeEMsQ0FBQztxQ0FBTSxDQUFDO29DQUNKLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7b0NBQ2hELENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7b0NBQ2hELGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDN0MsQ0FBQzs0QkFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztnQ0FDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzlCLENBQUM7eUJBRUosQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBQ0QsUUFBUSxFQUFFO3dCQUNOLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDdEUsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDcEQsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgscURBQXFEO0lBQ3JELENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLGNBQWMsR0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakQsSUFBSSxjQUFjLEdBQUcsQ0FBQztZQUNsQixDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7O1lBRXBELENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvRCxDQUFDLENBQUMsQ0FBQztJQUdILENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLFFBQVEsR0FBVyxDQUFDLENBQUM7UUFDekIsSUFBSSxVQUFrQixDQUFDO1FBQ3ZCLElBQUksTUFBYyxDQUFDO1FBQ25CLHdFQUF3RTtRQUN4RSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsV0FBVyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNoRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDekIsUUFBUSxFQUFFLENBQUM7Z0JBRVgsb0ZBQW9GO2dCQUNwRixVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBLHNDQUFzQztZQUNsSCxDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNoQixlQUFlLENBQUMsZ0NBQWdDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0QsQ0FBQzthQUFNLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3RCLGVBQWUsQ0FBQyxxQ0FBcUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVwRSxDQUFDO2FBQU0sQ0FBQztZQUVKLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ0gsR0FBRyxFQUFFLG1DQUFtQztnQkFDeEMsSUFBSSxFQUFFO29CQUNGLFVBQVUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFO29CQUM3QyxVQUFVLEVBQUUsVUFBVTtpQkFDekI7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtvQkFDbkIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7b0JBQ3RELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFFbEIsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUN0QyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBRTFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDMUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7d0JBQzNELENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ25DLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRS9DLENBQUM7Z0JBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7b0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixDQUFDO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUVyQixDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFekMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVqRCxDQUFDLENBQUMsQ0FBQztBQUVQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgTG9hbkVtcGxveWUudHNcclxuICogQGRlc2NyaXB0aW9uIE3Ds2R1bG8gZGUgZ2VzdGnDs24gZGUgcHLDqXN0YW1vcyBwb3IgZW1wbGVhZG8uIFBlcm1pdGUgYXNpZ25hcixcclxuICogICAgICAgICAgICAgIGVkaXRhciB5IGVsaW1pbmFyIHByw6lzdGFtb3MgcGFyYSBjYWRhIGVtcGxlYWRvLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBQcmVzdGFtb3NFbXBsZWFkb3NcclxuICovXHJcblxyXG52YXJpYWJsZXM6IHtcclxuICAgIGludGVyZmFjZSBJRG9tRWxlbWVudF9Nb2RhbCB7XHJcbiAgICAgICAgZm9ybTogc3RyaW5nXHJcbiAgICAgICAgdXJsX2J1c2Nhcl9mb3JtOiBzdHJpbmcgLy8gYnVzY2FyIGZvcm11bGFyaW9cclxuICAgICAgICB1cmxfYnVzY2FyOiBzdHJpbmcgLy8gYnVzY2FyIGxpc3RhXHJcbiAgICAgICAgdXJsX2d1YXJkYXI6IHN0cmluZyAvLyBndWFyZGFyXHJcbiAgICAgICAgdXJsX2VsaW1pbmFyOiBzdHJpbmcgLy9lbGltaW5hclxyXG4gICAgICAgIGRpdl90YWJsZTogc3RyaW5nIC8vRGl2IGRvbmRlIHZhIGxhIHRhYmxhIGNvbiBsYSBsaXN0YVxyXG4gICAgICAgIHJvd190YWJsZTogc3RyaW5nIC8vUGFyYSBlbCBldmVudG8gZG9ibGVjbGljayBhbCBlZGl0YXJcclxuICAgICAgICBjb250X2Zvcm06IHN0cmluZyAvL0NvbnRlbmVkb3IgZGVsIGZvcm11bGFyaW8gbnVldm8geSBlZGl0YXIgcXVlIHNlIG9jdWx0YVxyXG4gICAgICAgIGJ0bl9jYW5jZWxhcjogc3RyaW5nIC8vQm90w7NuIGRlIGNhbmNlbGFyXHJcbiAgICAgICAgaWRfcHJpbmNpcGFsOiBzdHJpbmcgLy9JZCBwcmluY2lwYWwgZGUgZW1wbGVhZG9cclxuICAgICAgICBidG5fYWJyaXI6IHN0cmluZyAvL0JvdMOzbiBkZSBhYnJpciBlbCBtb2RhbFxyXG4gICAgICAgIG1vZGFsOiBzdHJpbmcgLy9Nb2RhbFxyXG4gICAgICAgIGJ0bl9jZXJyYXI6IHN0cmluZyAvLyBib3RvbiBkZSBjZXJyYXIgbW9kYWxcclxuICAgICAgICBjbGFzc19uYW1lX2RlbGV0ZTogc3RyaW5nIC8vIG5vbWJyZSBkZSBsYSBjbGFzZSBwYXJhIGVsaW1pbmFyXHJcbiAgICAgICAgZm9ybV9kZWxldGU6IHN0cmluZyAvLyBmb3JtdWxhcmlvIHBhcmEgZWxpbWluYXIsXHJcbiAgICAgICAgY2xhc3NfY2hlY2s6IHN0cmluZyAvLyBDaGVja2JveHggZGUgbGEgdGFibGFcclxuICAgICAgICBidG5fbnVldm86IHN0cmluZyAvL0JvdMOzbiBkZSBudWV2b1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBvcGVyYXRpb246IG51bWJlciA9IDA7XHJcbiAgICB2YXIgZG9tX2VsZW1lbnQ6IElEb21FbGVtZW50X01vZGFsID0ge1xyXG4gICAgICAgIGZvcm06IFwiI25ld19Mb2FuRW1wbG95ZWVcIixcclxuICAgICAgICB1cmxfYnVzY2FyX2Zvcm06IFwiL3ByZXN0YW1vc2VtcGxlYWRvcy9Gb3JtTmV3RW1wbG95ZWVMb2Fuc1wiLFxyXG4gICAgICAgIHVybF9idXNjYXI6IFwiL3ByZXN0YW1vc2VtcGxlYWRvc1wiLFxyXG4gICAgICAgIGRpdl90YWJsZTogXCIuZGF0YXRhYmxlLUxvYW5cIixcclxuICAgICAgICByb3dfdGFibGU6IFwiLnJvd3RhYmxlLWxvYW5cIixcclxuICAgICAgICBjb250X2Zvcm06IFwiLmNvbnQtZm9ybS1uZXdMb2FuXCIsXHJcbiAgICAgICAgYnRuX2NhbmNlbGFyOiAnLmJ0bmNhbmNlbGFyX25ld19Mb2FuJyxcclxuICAgICAgICBpZF9wcmluY2lwYWw6ICcjRW1wbG95ZWVJZExvYW4nLFxyXG4gICAgICAgIHVybF9ndWFyZGFyOiBcIi9wcmVzdGFtb3NlbXBsZWFkb3MvZ3VhcmRhclwiLFxyXG4gICAgICAgIGJ0bl9hYnJpcjogJy5vcGVuLWVtcGxveWVlLWxvYW4nLFxyXG4gICAgICAgIG1vZGFsOiAnLm1vZGFsLWVtcGxveWVlLUxvYW4nLFxyXG4gICAgICAgIGJ0bl9jZXJyYXI6ICcuY2xvc2UtbW9kYWwtTG9hbicsXHJcbiAgICAgICAgY2xhc3NfbmFtZV9kZWxldGU6IFwibGlzdGlkX0VtcGxveWVlTG9hblwiLFxyXG4gICAgICAgIGZvcm1fZGVsZXRlOiBcIiNmb3JtLWRlbGV0ZUxvYW5cIixcclxuICAgICAgICBjbGFzc19jaGVjazogXCIuc2VsZWN0LWxvYW4tRW1wbG95ZVwiLFxyXG4gICAgICAgIHVybF9lbGltaW5hcjogXCIvcHJlc3RhbW9zZW1wbGVhZG9zL2VsaW1pbmFyXCIsXHJcbiAgICAgICAgYnRuX251ZXZvOiAnLm5ldy1Mb2FuJ1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0FycmVnbG8gZGUgZnVuY2lvbmVzXHJcbmNvbnN0IGZuID0ge1xyXG4gICAgLy9CdXNjYXIgaW5mb3JtYWNpb25lcyBkZSBwcmVzdGFtb3MgZGUgZW1wbGVhZG9zXHJcbiAgICBTZWFyY2hMb2FuOiBmdW5jdGlvbiAoX2lkRW1wbG95ZWU6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYCR7ZG9tX2VsZW1lbnQudXJsX2J1c2Nhcn0vJHtfaWRFbXBsb3llZX1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmRpdl90YWJsZSkuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5kaXZfdGFibGUpLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5yb3dfdGFibGUpLmRibGNsaWNrKGZ1bmN0aW9uIG15ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEVtcGxveWVlTG9hbihfaWRFbXBsb3llZSwgJCh0aGlzKS5maW5kKFwiLkxvYW5JZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuY29udGFpbmVyLW1vZGFsLXNjcm9sbGluZycpLnNjcm9sbFRvcCgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9CdXNjYXIgZm9ybXVsYXJpbyBkZSBudWV2byB5IGVkaXRhclxyXG4gICAgU2VhcmNoRW1wbG95ZWVMb2FuRm9ybTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZG9tX2VsZW1lbnQudXJsX2J1c2Nhcl9mb3JtLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogZmFsc2UsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4uU2hvd0Zvcm0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vQnVzY2FyIHBhcmEgZWRpdGFyXHJcbiAgICBTZWFyY2hFbXBsb3llZUxvYW46IGZ1bmN0aW9uIChfaWRFbXBsb3llZTogc3RyaW5nLCBfaW50ZXJuYWxJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgJHtkb21fZWxlbWVudC51cmxfYnVzY2FyfS8ke19pZEVtcGxveWVlfS8ke19pbnRlcm5hbElkfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2hvd0Zvcm0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL1NhdmVcclxuICAgIFNhdmVFbXBsb3llZUxvYW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9ndWFyZGFyLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogJChkb21fZWxlbWVudC5mb3JtKS5zZXJpYWxpemUoKSArIGAmb3BlcmF0aW9uPSR7b3BlcmF0aW9ufWAsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoTG9hbigkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihkb21fZWxlbWVudC5mb3JtKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9Nb3N0cmFyIHkgY29uZmlndXJhciBlbCBudWV2byBmb3JtdWxhcmlvIGVuIGVsIGRvbVxyXG4gICAgU2hvd0Zvcm06IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmh0bWwoJycpO1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5hcHBlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgIC8vY2VycmFyIGZvcm11bGFyaW9cclxuICAgICAgICAkKGRvbV9lbGVtZW50LmJ0bl9jYW5jZWxhcikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9CdXNjYXIgY2ljbG9zIGRlIHBhZ28gYWwgY2FtYmlhciBlbCBjw7NkaWdvIGRlIGxhIG7Ds21pbmEvL1xyXG4gICAgICAgICQoXCIjUGF5cm9sbElkXCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogYC9wcmVzdGFtb3NlbXBsZWFkb3MvY2ljbG9zcGFnby8keyQoXCIjUGF5cm9sbElkXCIpLnZhbCgpfWAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdldFwiLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTdGFydFBlcmlvZEZvclBhaWRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjUGF5RnJlY3VlbmN5XCIpLnZhbChkYXRhWzBdLlBheUZyZWN1ZW5jeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dChgWyAkeyhGb3JtYXREYXRlQXV0b0JpbmRpbmcodGhpcy5QZXJpb2RTdGFydERhdGUpKX0gXSAtIFsgJHsoRm9ybWF0RGF0ZUF1dG9CaW5kaW5nKHRoaXMuUGVyaW9kRW5kRGF0ZSkpfSBdYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKHRoaXMuUGF5Q3ljbGVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1N0YXJ0UGVyaW9kRm9yUGFpZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1N0YXJ0UGVyaW9kRm9yUGFpZFwiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYC9wcmVzdGFtb3NlbXBsZWFkb3MvY2ljbG9zcGFnby8keyQoXCIjUGF5cm9sbElkXCIpLnZhbCgpfS8keyQoXCIjU3RhcnRQZXJpb2RGb3JQYWlkXCIpLnZhbCgpfS8keyQoXCIjUGF5RnJlY3VlbmN5XCIpLnZhbCgpfS8keyQoXCIjUXR5UGVyaW9kRm9yUGFpZFwiKS52YWwoKX0vJHskKFwiI1RvdGFsRHVlc1wiKS52YWwoKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNWYWxpZEZyb21cIikudmFsKEZvcm1hdERhdGVBdXRvQmluZGluZyhkYXRhWzBdLlBlcmlvZFN0YXJ0RGF0ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNWYWxpZFRvXCIpLnZhbChGb3JtYXREYXRlQXV0b0JpbmRpbmcoZGF0YVswXS5QYXlEYXRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3NhdmVcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmZvcm0pLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIGZuLlNhdmVFbXBsb3llZUxvYW4oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuaWRfcHJpbmNpcGFsKS52YWwoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKVxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIEluc3RhY2lhdGVMaXN0ZW5lcigpO1xyXG4gICAgICAgIGZuLkNhbGNfQW1vdW50KCk7XHJcblxyXG4gICAgICAgIC8vUGx1Z2luIGRlIG51bWVyb3NcclxuICAgICAgICBVc2VQbHVnaW5OdW1iZXJGb3JtYXQoZG9tX2VsZW1lbnQuZm9ybSk7XHJcbiAgICB9LFxyXG5cclxuICAgIENhbGNfQW1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9Fc2N1Y2hhZG9yIHBhcmEgZWwgY2FsY3VsbyBkZSBsb3MgcHJlc3RhbW9zXHJcbiAgICAgICAgJChcIi5hbW91bnQtdG8tY2FsY1wiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBsZXQgdG90YWw6IG51bWJlciA9IEZvcm1hdG9OdW1lcmljb3NfQ2FsY3VsYXIoJChcIiNMb2FuQW1vdW50XCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBsZXQgY3VvdGFzOiBudW1iZXIgPSBGb3JtYXRvTnVtZXJpY29zX0NhbGN1bGFyKCQoXCIjVG90YWxEdWVzXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBsZXQgbW9udG9jdW90YTogbnVtYmVyID0gRm9ybWF0b051bWVyaWNvc19DYWxjdWxhcigkKFwiI0Ftb3VudEJ5RHVlc1wiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgbGV0IHBhZ2FkbzogbnVtYmVyID0gRm9ybWF0b051bWVyaWNvc19DYWxjdWxhcigkKFwiI1BhaWRBbW91bnRcIikudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGxldCBwZW5kaWVudGU6IG51bWJlciA9IEZvcm1hdG9OdW1lcmljb3NfQ2FsY3VsYXIoJChcIiNQZW5kaW5nQW1vdW50XCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50LmlkID09IFwiVG90YWxEdWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICQoXCIjQW1vdW50QnlEdWVzXCIpLnZhbChGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIoKHRvdGFsIC8gY3VvdGFzKS50b1N0cmluZygpLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50LmlkID09IFwiQW1vdW50QnlEdWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICQoXCIjVG90YWxEdWVzXCIpLnZhbChGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIoKHRvdGFsIC8gbW9udG9jdW90YSkudG9TdHJpbmcoKSwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudC5pZCA9PSBcIlBhaWRBbW91bnRcIikge1xyXG4gICAgICAgICAgICAgICAgJChcIiNQZW5kaW5nQW1vdW50XCIpLnZhbChGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIoKHRvdGFsIC0gcGFnYWRvKS50b1N0cmluZygpLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50LmlkID09IFwiUGVuZGluZ0Ftb3VudFwiKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1BhaWRBbW91bnRcIikudmFsKEZvcm1hdG9OdW1lcmljb3NfTW9zdHJhcigodG90YWwgLSBwZW5kaWVudGUpLnRvU3RyaW5nKCksIHRydWUpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5lc2N1Y2hhZG9yZXM6IHtcclxuICAgIC8vQWJyaXIgaW5mb3JtYWNpw7NuIGRlIHByZXN0YW1vXHJcbiAgICAkKGRvbV9lbGVtZW50LmJ0bl9hYnJpcikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZuLlNlYXJjaExvYW4oJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAkKGRvbV9lbGVtZW50Lm1vZGFsKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DZXJyYXIgbW9kYWwgZGUgcHJlc3RhbW9cclxuICAgICQoZG9tX2VsZW1lbnQuYnRuX2NlcnJhcikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQubW9kYWwpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQWJyaXIgZm9ybXVsYXJpbyBudWV2b1xyXG4gICAgJChkb21fZWxlbWVudC5idG5fbnVldm8pLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcGVyYXRpb24gPSAxO1xyXG4gICAgICAgIGZuLlNlYXJjaEVtcGxveWVlTG9hbkZvcm0oKTtcclxuICAgICAgICAvL0Z1bmNpb24gcGFyYSBtb3ZlciBlbCBzY3JvbGwsIHBhcmEgbWVqb3IgZGlzZcOxb1xyXG4gICAgICAgICQoJy5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nJykuc2Nyb2xsVG9wKDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9lbGltaW5hciBwcmVzdGFtb3MgZGUgZW1wbGVhZG9zXHJcbiAgICAkKGRvbV9lbGVtZW50LmZvcm1fZGVsZXRlKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFNpZW1wcmUgcHJldmVuaXIgZWwgZW52w61vIG5hdGl2byBkZWwgZm9ybXVsYXJpb1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5Mb2FuSWR0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5mb3JtX2RlbGV0ZSkuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBlbGltaW5hciBsb3MgcHJlc3RhbW9zIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogZG9tX2VsZW1lbnQudXJsX2VsaW1pbmFyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKGRvbV9lbGVtZW50LmZvcm1fZGVsZXRlKS5zZXJpYWxpemUoKSArIGAmZW1wbG95ZWVpZD0keyQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKS50cmltKCl9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoYC4ke2RvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlfWApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hMb2FuKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoYC4ke2RvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlfWApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9QYXJhIGRpc2XDsW8sIHNlIG9jdWx0YSBlbCBpbmRpY2Fkb3IgYWwgaGFjZXIgc2Nyb2xsXHJcbiAgICAkKFwiLmNvbnRhaW5lci1tb2RhbC1zY3JvbGxpbmdcIikuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgcG9zaXRpb25TY3JvbGw6IG51bWJlciA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uU2Nyb2xsID4gMClcclxuICAgICAgICAgICAgJCgnLmZvci1lbXBsb3llZS1jb250YWN0aW5mbycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJCgnLmZvci1lbXBsb3llZS1jb250YWN0aW5mbycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQoJy5IaXN0b3JpLWVtcGxveWUtbG9hbnMnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBJbnRlcm5hbElkOiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IExvYW5JZDogc3RyaW5nO1xyXG4gICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICQoYCR7ZG9tX2VsZW1lbnQuY2xhc3NfY2hlY2t9W3R5cGU9Y2hlY2tib3hdYCkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcblxyXG4gICAgICAgICAgICAgICAgLyogICBJbnRlcm5hbElkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkludGVybmFsSWR0YmxcIikuaHRtbCgpLnRyaW0oKTsgKi9cclxuICAgICAgICAgICAgICAgIEludGVybmFsSWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuTG9hbklkdGJsXCIpLmh0bWwoKS50cmltKCk7Ly8gZXN0ZSBlcyBlbCBpbnRlcm5hbCBpZCBkZWwgcHJlc3RhbW9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09IDApIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBzb2xvIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogYHByZXN0YW1vc2VtcGxlYWRvcy9HZXRoaXN0b3JpTG9hbmAsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1wbG95ZWVpZDogJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgIGludGVybmFsSWQ6IEludGVybmFsSWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc2V0LXRpdGxlLW1vZGxvYW5cIikudGV4dChcIkhpc3RvcmlhbCBkZSBwcsOpc3RhbW9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5kYXRhdGFibGUtTG9hbi1oaXN0b3J5XCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmRhdGF0YWJsZS1Mb2FuLWhpc3RvcnlcIikuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5kYXRhdGFibGUtTG9hblwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmRhdGF0YWJsZS1Mb2FuLWhpc3RvcnlcIikucmVtb3ZlQ2xhc3MoXCJjb2xscGFzZS1tb2RhbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5mb3J3YXJkXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuYmFja3dhcmQtYnRuXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmJhY2t3YXJkLWJ0bicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJChcIi5kYXRhdGFibGUtTG9hbi1oaXN0b3J5XCIpLmFkZENsYXNzKFwiY29sbHBhc2UtbW9kYWxcIik7XHJcbiAgICAgICAgJChcIi5zZXQtdGl0bGUtbW9kbG9hblwiKS50ZXh0KFwiUHLDqXN0YW1vXCIpO1xyXG5cclxuICAgICAgICAkKFwiLmZvcndhcmRcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAkKFwiLmJhY2t3YXJkLWJ0blwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICQoXCIuZGF0YXRhYmxlLUxvYW5cIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IH0iXX0=