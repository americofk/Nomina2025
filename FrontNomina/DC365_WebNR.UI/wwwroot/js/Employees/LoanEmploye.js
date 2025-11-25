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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hbkVtcGxveWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9UeXBlU2NyaXB0RmlsZS9FbXBsb3llZXMvTG9hbkVtcGxveWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxFQUFFLENBQUM7SUFxQlIsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDO0lBQzFCLElBQUksV0FBVyxHQUFzQjtRQUNqQyxJQUFJLEVBQUUsbUJBQW1CO1FBQ3pCLGVBQWUsRUFBRSwwQ0FBMEM7UUFDM0QsVUFBVSxFQUFFLHFCQUFxQjtRQUNqQyxTQUFTLEVBQUUsaUJBQWlCO1FBQzVCLFNBQVMsRUFBRSxnQkFBZ0I7UUFDM0IsU0FBUyxFQUFFLG9CQUFvQjtRQUMvQixZQUFZLEVBQUUsdUJBQXVCO1FBQ3JDLFlBQVksRUFBRSxpQkFBaUI7UUFDL0IsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxTQUFTLEVBQUUscUJBQXFCO1FBQ2hDLEtBQUssRUFBRSxzQkFBc0I7UUFDN0IsVUFBVSxFQUFFLG1CQUFtQjtRQUMvQixpQkFBaUIsRUFBRSxxQkFBcUI7UUFDeEMsV0FBVyxFQUFFLGtCQUFrQjtRQUMvQixXQUFXLEVBQUUsc0JBQXNCO1FBQ25DLFlBQVksRUFBRSw4QkFBOEI7UUFDNUMsU0FBUyxFQUFFLFdBQVc7S0FDekIsQ0FBQTtBQUNMLENBQUM7QUFFRCxzQkFBc0I7QUFDdEIsTUFBTSxFQUFFLEdBQUc7SUFDUCxnREFBZ0Q7SUFDaEQsVUFBVSxFQUFFLFVBQVUsV0FBbUI7UUFDckMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxVQUFVLElBQUksV0FBVyxFQUFFO1lBQy9DLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFJO2dCQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2xCLENBQUMsQ0FB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LFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFL0MsQ0FBQztnQkFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztvQkFDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRXJCLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV6QyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWpELENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbInZhcmlhYmxlczoge1xyXG4gICAgaW50ZXJmYWNlIElEb21FbGVtZW50X01vZGFsIHtcclxuICAgICAgICBmb3JtOiBzdHJpbmdcclxuICAgICAgICB1cmxfYnVzY2FyX2Zvcm06IHN0cmluZyAvLyBidXNjYXIgZm9ybXVsYXJpb1xyXG4gICAgICAgIHVybF9idXNjYXI6IHN0cmluZyAvLyBidXNjYXIgbGlzdGFcclxuICAgICAgICB1cmxfZ3VhcmRhcjogc3RyaW5nIC8vIGd1YXJkYXJcclxuICAgICAgICB1cmxfZWxpbWluYXI6IHN0cmluZyAvL2VsaW1pbmFyXHJcbiAgICAgICAgZGl2X3RhYmxlOiBzdHJpbmcgLy9EaXYgZG9uZGUgdmEgbGEgdGFibGEgY29uIGxhIGxpc3RhXHJcbiAgICAgICAgcm93X3RhYmxlOiBzdHJpbmcgLy9QYXJhIGVsIGV2ZW50byBkb2JsZWNsaWNrIGFsIGVkaXRhclxyXG4gICAgICAgIGNvbnRfZm9ybTogc3RyaW5nIC8vQ29udGVuZWRvciBkZWwgZm9ybXVsYXJpbyBudWV2byB5IGVkaXRhciBxdWUgc2Ugb2N1bHRhXHJcbiAgICAgICAgYnRuX2NhbmNlbGFyOiBzdHJpbmcgLy9Cb3TDs24gZGUgY2FuY2VsYXJcclxuICAgICAgICBpZF9wcmluY2lwYWw6IHN0cmluZyAvL0lkIHByaW5jaXBhbCBkZSBlbXBsZWFkb1xyXG4gICAgICAgIGJ0bl9hYnJpcjogc3RyaW5nIC8vQm90w7NuIGRlIGFicmlyIGVsIG1vZGFsXHJcbiAgICAgICAgbW9kYWw6IHN0cmluZyAvL01vZGFsXHJcbiAgICAgICAgYnRuX2NlcnJhcjogc3RyaW5nIC8vIGJvdG9uIGRlIGNlcnJhciBtb2RhbFxyXG4gICAgICAgIGNsYXNzX25hbWVfZGVsZXRlOiBzdHJpbmcgLy8gbm9tYnJlIGRlIGxhIGNsYXNlIHBhcmEgZWxpbWluYXJcclxuICAgICAgICBmb3JtX2RlbGV0ZTogc3RyaW5nIC8vIGZvcm11bGFyaW8gcGFyYSBlbGltaW5hcixcclxuICAgICAgICBjbGFzc19jaGVjazogc3RyaW5nIC8vIENoZWNrYm94eCBkZSBsYSB0YWJsYVxyXG4gICAgICAgIGJ0bl9udWV2bzogc3RyaW5nIC8vQm90w7NuIGRlIG51ZXZvXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9wZXJhdGlvbjogbnVtYmVyID0gMDtcclxuICAgIHZhciBkb21fZWxlbWVudDogSURvbUVsZW1lbnRfTW9kYWwgPSB7XHJcbiAgICAgICAgZm9ybTogXCIjbmV3X0xvYW5FbXBsb3llZVwiLFxyXG4gICAgICAgIHVybF9idXNjYXJfZm9ybTogXCIvcHJlc3RhbW9zZW1wbGVhZG9zL0Zvcm1OZXdFbXBsb3llZUxvYW5zXCIsXHJcbiAgICAgICAgdXJsX2J1c2NhcjogXCIvcHJlc3RhbW9zZW1wbGVhZG9zXCIsXHJcbiAgICAgICAgZGl2X3RhYmxlOiBcIi5kYXRhdGFibGUtTG9hblwiLFxyXG4gICAgICAgIHJvd190YWJsZTogXCIucm93dGFibGUtbG9hblwiLFxyXG4gICAgICAgIGNvbnRfZm9ybTogXCIuY29udC1mb3JtLW5ld0xvYW5cIixcclxuICAgICAgICBidG5fY2FuY2VsYXI6ICcuYnRuY2FuY2VsYXJfbmV3X0xvYW4nLFxyXG4gICAgICAgIGlkX3ByaW5jaXBhbDogJyNFbXBsb3llZUlkTG9hbicsXHJcbiAgICAgICAgdXJsX2d1YXJkYXI6IFwiL3ByZXN0YW1vc2VtcGxlYWRvcy9ndWFyZGFyXCIsXHJcbiAgICAgICAgYnRuX2FicmlyOiAnLm9wZW4tZW1wbG95ZWUtbG9hbicsXHJcbiAgICAgICAgbW9kYWw6ICcubW9kYWwtZW1wbG95ZWUtTG9hbicsXHJcbiAgICAgICAgYnRuX2NlcnJhcjogJy5jbG9zZS1tb2RhbC1Mb2FuJyxcclxuICAgICAgICBjbGFzc19uYW1lX2RlbGV0ZTogXCJsaXN0aWRfRW1wbG95ZWVMb2FuXCIsXHJcbiAgICAgICAgZm9ybV9kZWxldGU6IFwiI2Zvcm0tZGVsZXRlTG9hblwiLFxyXG4gICAgICAgIGNsYXNzX2NoZWNrOiBcIi5zZWxlY3QtbG9hbi1FbXBsb3llXCIsXHJcbiAgICAgICAgdXJsX2VsaW1pbmFyOiBcIi9wcmVzdGFtb3NlbXBsZWFkb3MvZWxpbWluYXJcIixcclxuICAgICAgICBidG5fbnVldm86ICcubmV3LUxvYW4nXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vQXJyZWdsbyBkZSBmdW5jaW9uZXNcclxuY29uc3QgZm4gPSB7XHJcbiAgICAvL0J1c2NhciBpbmZvcm1hY2lvbmVzIGRlIHByZXN0YW1vcyBkZSBlbXBsZWFkb3NcclxuICAgIFNlYXJjaExvYW46IGZ1bmN0aW9uIChfaWRFbXBsb3llZTogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgJHtkb21fZWxlbWVudC51cmxfYnVzY2FyfS8ke19pZEVtcGxveWVlfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZGl2X3RhYmxlKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmRpdl90YWJsZSkuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LnJvd190YWJsZSkuZGJsY2xpY2soZnVuY3Rpb24gbXlmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRW1wbG95ZWVMb2FuKF9pZEVtcGxveWVlLCAkKHRoaXMpLmZpbmQoXCIuTG9hbklkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nJykuc2Nyb2xsVG9wKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL0J1c2NhciBmb3JtdWxhcmlvIGRlIG51ZXZvIHkgZWRpdGFyXHJcbiAgICBTZWFyY2hFbXBsb3llZUxvYW5Gb3JtOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBkb21fZWxlbWVudC51cmxfYnVzY2FyX2Zvcm0sXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmbi5TaG93Rm9ybShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9CdXNjYXIgcGFyYSBlZGl0YXJcclxuICAgIFNlYXJjaEVtcGxveWVlTG9hbjogZnVuY3Rpb24gKF9pZEVtcGxveWVlOiBzdHJpbmcsIF9pbnRlcm5hbElkOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAke2RvbV9lbGVtZW50LnVybF9idXNjYXJ9LyR7X2lkRW1wbG95ZWV9LyR7X2ludGVybmFsSWR9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TaG93Rm9ybShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vU2F2ZVxyXG4gICAgU2F2ZUVtcGxveWVlTG9hbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZG9tX2VsZW1lbnQudXJsX2d1YXJkYXIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiAkKGRvbV9lbGVtZW50LmZvcm0pLnNlcmlhbGl6ZSgpICsgYCZvcGVyYXRpb249JHtvcGVyYXRpb259YCxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hMb2FuKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRvbV9lbGVtZW50LmZvcm0pIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL01vc3RyYXIgeSBjb25maWd1cmFyIGVsIG51ZXZvIGZvcm11bGFyaW8gZW4gZWwgZG9tXHJcbiAgICBTaG93Rm9ybTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuaHRtbCgnJyk7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgLy9jZXJyYXIgZm9ybXVsYXJpb1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuYnRuX2NhbmNlbGFyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL0J1c2NhciBjaWNsb3MgZGUgcGFnbyBhbCBjYW1iaWFyIGVsIGPDs2RpZ28gZGUgbGEgbsOzbWluYS8vXHJcbiAgICAgICAgJChcIiNQYXlyb2xsSWRcIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBgL3ByZXN0YW1vc2VtcGxlYWRvcy9jaWNsb3NwYWdvLyR7JChcIiNQYXlyb2xsSWRcIikudmFsKCl9YCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR2V0XCIsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1N0YXJ0UGVyaW9kRm9yUGFpZFwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNQYXlGcmVjdWVuY3lcIikudmFsKGRhdGFbMF0uUGF5RnJlY3VlbmN5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChkYXRhKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0KGBbICR7KEZvcm1hdERhdGVBdXRvQmluZGluZyh0aGlzLlBlcmlvZFN0YXJ0RGF0ZSkpfSBdIC0gWyAkeyhGb3JtYXREYXRlQXV0b0JpbmRpbmcodGhpcy5QZXJpb2RFbmREYXRlKSl9IF1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWwodGhpcy5QYXlDeWNsZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjU3RhcnRQZXJpb2RGb3JQYWlkXCIpLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjU3RhcnRQZXJpb2RGb3JQYWlkXCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgL3ByZXN0YW1vc2VtcGxlYWRvcy9jaWNsb3NwYWdvLyR7JChcIiNQYXlyb2xsSWRcIikudmFsKCl9LyR7JChcIiNTdGFydFBlcmlvZEZvclBhaWRcIikudmFsKCl9LyR7JChcIiNQYXlGcmVjdWVuY3lcIikudmFsKCl9LyR7JChcIiNRdHlQZXJpb2RGb3JQYWlkXCIpLnZhbCgpfS8keyQoXCIjVG90YWxEdWVzXCIpLnZhbCgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHZXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1ZhbGlkRnJvbVwiKS52YWwoRm9ybWF0RGF0ZUF1dG9CaW5kaW5nKGRhdGFbMF0uUGVyaW9kU3RhcnREYXRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1ZhbGlkVG9cIikudmFsKEZvcm1hdERhdGVBdXRvQmluZGluZyhkYXRhWzBdLlBheURhdGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vc2F2ZVxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuZm9ybSkuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgZm4uU2F2ZUVtcGxveWVlTG9hbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb21fZWxlbWVudC5pZF9wcmluY2lwYWwpLnZhbCgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgSW5zdGFjaWF0ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgZm4uQ2FsY19BbW91bnQoKTtcclxuXHJcbiAgICAgICAgLy9QbHVnaW4gZGUgbnVtZXJvc1xyXG4gICAgICAgIFVzZVBsdWdpbk51bWJlckZvcm1hdChkb21fZWxlbWVudC5mb3JtKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2FsY19BbW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL0VzY3VjaGFkb3IgcGFyYSBlbCBjYWxjdWxvIGRlIGxvcyBwcmVzdGFtb3NcclxuICAgICAgICAkKFwiLmFtb3VudC10by1jYWxjXCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGxldCB0b3RhbDogbnVtYmVyID0gRm9ybWF0b051bWVyaWNvc19DYWxjdWxhcigkKFwiI0xvYW5BbW91bnRcIikudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGxldCBjdW90YXM6IG51bWJlciA9IEZvcm1hdG9OdW1lcmljb3NfQ2FsY3VsYXIoJChcIiNUb3RhbER1ZXNcIikudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGxldCBtb250b2N1b3RhOiBudW1iZXIgPSBGb3JtYXRvTnVtZXJpY29zX0NhbGN1bGFyKCQoXCIjQW1vdW50QnlEdWVzXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBsZXQgcGFnYWRvOiBudW1iZXIgPSBGb3JtYXRvTnVtZXJpY29zX0NhbGN1bGFyKCQoXCIjUGFpZEFtb3VudFwiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgbGV0IHBlbmRpZW50ZTogbnVtYmVyID0gRm9ybWF0b051bWVyaWNvc19DYWxjdWxhcigkKFwiI1BlbmRpbmdBbW91bnRcIikudmFsKCkudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IGUuY3VycmVudFRhcmdldDtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQuaWQgPT0gXCJUb3RhbER1ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgJChcIiNBbW91bnRCeUR1ZXNcIikudmFsKEZvcm1hdG9OdW1lcmljb3NfTW9zdHJhcigodG90YWwgLyBjdW90YXMpLnRvU3RyaW5nKCksIHRydWUpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQuaWQgPT0gXCJBbW91bnRCeUR1ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgJChcIiNUb3RhbER1ZXNcIikudmFsKEZvcm1hdG9OdW1lcmljb3NfTW9zdHJhcigodG90YWwgLyBtb250b2N1b3RhKS50b1N0cmluZygpLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50LmlkID09IFwiUGFpZEFtb3VudFwiKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1BlbmRpbmdBbW91bnRcIikudmFsKEZvcm1hdG9OdW1lcmljb3NfTW9zdHJhcigodG90YWwgLSBwYWdhZG8pLnRvU3RyaW5nKCksIHRydWUpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQuaWQgPT0gXCJQZW5kaW5nQW1vdW50XCIpIHtcclxuICAgICAgICAgICAgICAgICQoXCIjUGFpZEFtb3VudFwiKS52YWwoRm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKCh0b3RhbCAtIHBlbmRpZW50ZSkudG9TdHJpbmcoKSwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmVzY3VjaGFkb3Jlczoge1xyXG4gICAgLy9BYnJpciBpbmZvcm1hY2nDs24gZGUgcHJlc3RhbW9cclxuICAgICQoZG9tX2VsZW1lbnQuYnRuX2FicmlyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm4uU2VhcmNoTG9hbigkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQubW9kYWwpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NlcnJhciBtb2RhbCBkZSBwcmVzdGFtb1xyXG4gICAgJChkb21fZWxlbWVudC5idG5fY2VycmFyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5tb2RhbCkubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9BYnJpciBmb3JtdWxhcmlvIG51ZXZvXHJcbiAgICAkKGRvbV9lbGVtZW50LmJ0bl9udWV2bykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wZXJhdGlvbiA9IDE7XHJcbiAgICAgICAgZm4uU2VhcmNoRW1wbG95ZWVMb2FuRm9ybSgpO1xyXG4gICAgICAgIC8vRnVuY2lvbiBwYXJhIG1vdmVyIGVsIHNjcm9sbCwgcGFyYSBtZWpvciBkaXNlw7FvXHJcbiAgICAgICAgJCgnLmNvbnRhaW5lci1tb2RhbC1zY3JvbGxpbmcnKS5zY3JvbGxUb3AoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VsaW1pbmFyIHByZXN0YW1vcyBkZSBlbXBsZWFkb3NcclxuICAgICQoZG9tX2VsZW1lbnQuZm9ybV9kZWxldGUpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgICAgICQoYCR7ZG9tX2VsZW1lbnQuY2xhc3NfY2hlY2t9W3R5cGU9Y2hlY2tib3hdYCkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIGRvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkxvYW5JZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmZvcm1fZGVsZXRlKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGxvcyBwcmVzdGFtb3Mgc2VsZWNjaW9uYWRvcz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBkb21fZWxlbWVudC51cmxfZWxpbWluYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoZG9tX2VsZW1lbnQuZm9ybV9kZWxldGUpLnNlcmlhbGl6ZSgpICsgYCZlbXBsb3llZWlkPSR7JCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpLnRyaW0oKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaExvYW4oJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGAuJHtkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZX1gKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoYCR7ZG9tX2VsZW1lbnQuY2xhc3NfY2hlY2t9W3R5cGU9Y2hlY2tib3hdYCkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1BhcmEgZGlzZcOxbywgc2Ugb2N1bHRhIGVsIGluZGljYWRvciBhbCBoYWNlciBzY3JvbGxcclxuICAgICQoXCIuY29udGFpbmVyLW1vZGFsLXNjcm9sbGluZ1wiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBwb3NpdGlvblNjcm9sbDogbnVtYmVyID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBpZiAocG9zaXRpb25TY3JvbGwgPiAwKVxyXG4gICAgICAgICAgICAkKCcuZm9yLWVtcGxveWVlLWNvbnRhY3RpbmZvJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkKCcuZm9yLWVtcGxveWVlLWNvbnRhY3RpbmZvJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgJCgnLkhpc3RvcmktZW1wbG95ZS1sb2FucycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29udGFkb3I6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IEludGVybmFsSWQ6IHN0cmluZztcclxuICAgICAgICBsZXQgTG9hbklkOiBzdHJpbmc7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChgJHtkb21fZWxlbWVudC5jbGFzc19jaGVja31bdHlwZT1jaGVja2JveF1gKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuXHJcbiAgICAgICAgICAgICAgICAvKiAgIEludGVybmFsSWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuSW50ZXJuYWxJZHRibFwiKS5odG1sKCkudHJpbSgpOyAqL1xyXG4gICAgICAgICAgICAgICAgSW50ZXJuYWxJZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5Mb2FuSWR0YmxcIikuaHRtbCgpLnRyaW0oKTsvLyBlc3RlIGVzIGVsIGludGVybmFsIGlkIGRlbCBwcmVzdGFtb1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY29udGFkb3IgPT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb250YWRvciA+IDEpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHNvbG8gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBgcHJlc3RhbW9zZW1wbGVhZG9zL0dldGhpc3RvcmlMb2FuYCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbXBsb3llZWlkOiAkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJuYWxJZDogSW50ZXJuYWxJZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zZXQtdGl0bGUtbW9kbG9hblwiKS50ZXh0KFwiSGlzdG9yaWFsIGRlIHByw6lzdGFtb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmRhdGF0YWJsZS1Mb2FuLWhpc3RvcnlcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuZGF0YXRhYmxlLUxvYW4taGlzdG9yeVwiKS5hcHBlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmRhdGF0YWJsZS1Mb2FuXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuZGF0YXRhYmxlLUxvYW4taGlzdG9yeVwiKS5yZW1vdmVDbGFzcyhcImNvbGxwYXNlLW1vZGFsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmZvcndhcmRcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5iYWNrd2FyZC1idG5cIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuYmFja3dhcmQtYnRuJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAkKFwiLmRhdGF0YWJsZS1Mb2FuLWhpc3RvcnlcIikuYWRkQ2xhc3MoXCJjb2xscGFzZS1tb2RhbFwiKTtcclxuICAgICAgICAkKFwiLnNldC10aXRsZS1tb2Rsb2FuXCIpLnRleHQoXCJQcsOpc3RhbW9cIik7XHJcblxyXG4gICAgICAgICQoXCIuZm9yd2FyZFwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICQoXCIuYmFja3dhcmQtYnRuXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgJChcIi5kYXRhdGFibGUtTG9hblwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG5cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IHsgfSJdfQ==