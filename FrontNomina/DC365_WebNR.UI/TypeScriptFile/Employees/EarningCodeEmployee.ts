/**
 * @file EarningCodeEmployee.ts
 * @description Módulo de gestión de códigos de ganancia por empleado. Permite asignar,
 *              editar y eliminar ganancias específicas para cada empleado.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module GananciasEmpleados
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
    }

    
}

//Arreglo de funciones
const fn = {

    //Buscar informaciones de codigo de ganancia del empleado
    SearchEarningCode: function (_idEmployee: string) {
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
                        $('.btnnewAdreesli').text("Editar")
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
    SearchEmployeeEarningCodeId: function (_idEmployee: string, _internalId: string) {
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
    SaveEmployeeEarningCode: function (_IsForDGT:boolean) {
        $.ajax({
            url: dom_element.url_guardar,
            type: "POST",
            data: $(dom_element.form).serialize() + `&operation=${operation}&_IsForDGT=${_IsForDGT}`,
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
                    $('.btnnewAdreesli').text("Nuevo")
                    fn.SearchEarningCode($('#EmployeeId').val().toString());
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

        //cerrar formulario de nuevo
        $(dom_element.btn_cancelar).on('click', function () {
            $('.btnnewAdreesli').text("Nuevo")
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
                } else {
                    fn.SaveEmployeeEarningCode(false);
                  

                }
            }
        });

        $(dom_element.id_principal).val($('#EmployeeId').val().toString())
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
        let amount: number = FormatoNumericos_Calcular($("#IndexEarningMonthly").val().toString());

        let newamount: number = 0;
        let newamountDaily: number = 0;
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
        let amountHour: number = newamountDaily / 8;

        $("#IndexEarningHour").val(FormatoNumericos_Mostrar(amountHour.toString(), true));
    }
    
}

escuchadores: {

    //Abrir información codigo de canancia
    $(dom_element.btn_abrir).on('click', function () {
        fn.SearchEarningCode($('#EmployeeId').val().toString());
        $(dom_element.modal).modal({ backdrop: 'static', keyboard: false })

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
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(`${dom_element.class_check}[type=checkbox]`).each(function () {
                if ($(this).is(":checked")) {
                    contador = true
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
                                    fn.SearchEarningCode($('#EmployeeId').val().toString())
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
    
}

export { }