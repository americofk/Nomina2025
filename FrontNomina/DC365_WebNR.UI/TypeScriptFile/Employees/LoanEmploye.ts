/**
 * @file LoanEmploye.ts
 * @description Módulo de gestión de préstamos por empleado. Permite asignar,
 *              editar y eliminar préstamos para cada empleado.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module PrestamosEmpleados
 */

variables: {
    interface IDomElement_Modal {
        form: string
        url_buscar_form: string // buscar formulario
        url_buscar: string // buscar lista
        url_guardar: string // guardar
        url_eliminar: string //eliminar
        div_table: string //Div donde va la tabla con la lista
        row_table: string //Para el evento dobleclick al editar
        cont_form: string //Contenedor del formulario nuevo y editar que se oculta
        btn_cancelar: string //Botón de cancelar
        id_principal: string //Id principal de empleado
        btn_abrir: string //Botón de abrir el modal
        modal: string //Modal
        btn_cerrar: string // boton de cerrar modal
        class_name_delete: string // nombre de la clase para eliminar
        form_delete: string // formulario para eliminar,
        class_check: string // Checkboxx de la tabla
        btn_nuevo: string //Botón de nuevo
    }

    var operation: number = 0;
    var dom_element: IDomElement_Modal = {
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
    }
}

//Arreglo de funciones
const fn = {
    //Buscar informaciones de prestamos de empleados
    SearchLoan: function (_idEmployee: string) {
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
    SearchEmployeeLoan: function (_idEmployee: string, _internalId: string) {
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
            success: function (data: ResponseUI) {
                $('.progreso').modal('hide');
                if (data.Type == "error") {
                    var _errors: string = "";
                    data.Errors.forEach(function (x: string) {
                        _errors += `${x}<br>`;
                    });
                    windows_message(_errors, data.Type);
                } else {
                    fn.SearchLoan($('#EmployeeId').val().toString());
                    let form = document.querySelector(dom_element.form) as HTMLFormElement;
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
                fn.SaveEmployeeLoan()
            }
        });

        $(dom_element.id_principal).val($('#EmployeeId').val().toString())
        $(dom_element.cont_form).removeClass("collapse");
        InstaciateListener();
        fn.Calc_Amount();

        //Plugin de numeros
        UsePluginNumberFormat(dom_element.form);
    },

    Calc_Amount: function () {
        //Escuchador para el calculo de los prestamos
        $(".amount-to-calc").on("change", function (e) {
            let total: number = FormatoNumericos_Calcular($("#LoanAmount").val().toString());
            let cuotas: number = FormatoNumericos_Calcular($("#TotalDues").val().toString());
            let montocuota: number = FormatoNumericos_Calcular($("#AmountByDues").val().toString());
            let pagado: number = FormatoNumericos_Calcular($("#PaidAmount").val().toString());
            let pendiente: number = FormatoNumericos_Calcular($("#PendingAmount").val().toString());

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

}




escuchadores: {
    //Abrir información de prestamo
    $(dom_element.btn_abrir).on('click', function () {
        fn.SearchLoan($('#EmployeeId').val().toString());
        $(dom_element.modal).modal({ backdrop: 'static', keyboard: false })

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
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(`${dom_element.class_check}[type=checkbox]`).each(function () {
                if ($(this).is(":checked")) {
                    contador = true
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
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: dom_element.url_eliminar,
                            type: "POST",
                            data: $(dom_element.form_delete).serialize() + `&employeeid=${$('#EmployeeId').val().toString().trim()}`,
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                if (data.Type == "error") {
                                    var _errors: string = "";
                                    data.Errors.forEach(function (x: string) {
                                        _errors += `${x}<br>`;
                                    });
                                    $(`.${dom_element.class_name_delete}`).remove();
                                    windows_message(_errors, data.Type);
                                } else {
                                    fn.SearchLoan($('#EmployeeId').val().toString())
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
        let positionScroll: number = $(this).scrollTop();
        if (positionScroll > 0)
            $('.for-employee-contactinfo').addClass('collapse');
        else
            $('.for-employee-contactinfo').removeClass('collapse');
    });


    $('.Histori-employe-loans').click(function () {
        var contador: number = 0;
        let InternalId: string;
        let LoanId: string;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(`${dom_element.class_check}[type=checkbox]`).each(function () {
            if ($(this).is(":checked")) {
                contador++;

                /*   InternalId = $(this).parent().parent().find(".InternalIdtbl").html().trim(); */
                InternalId = $(this).parent().parent().find(".LoanIdtbl").html().trim();// este es el internal id del prestamo
            }

        });

        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        } else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");

        } else {

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

export { }