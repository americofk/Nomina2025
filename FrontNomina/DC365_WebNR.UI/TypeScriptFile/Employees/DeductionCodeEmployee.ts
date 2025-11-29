/**
 * @file DeductionCodeEmployee.ts
 * @description Módulo de gestión de códigos de deducción por empleado. Permite asignar,
 *              editar y eliminar deducciones específicas para cada empleado.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module DeduccionesEmpleados
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
    }
}

//Arreglo de funciones
const fn = {
    //Buscar informaciones de codigo de deduccion del empleado
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
    SaveEmployeeEarningCode: function () {
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

        //cerrar formulario de nueva direccion
        $(dom_element.btn_cancelar).on('click', function () {
            $('.btnnewAdreesli').text("Nuevo")
            $(dom_element.cont_form).addClass("collapse");
        });
        //save contact info employee
        $(dom_element.form).submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
                fn.SaveEmployeeEarningCode()
            }
        });

        $(dom_element.id_principal).val($('#EmployeeId').val().toString())
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
}




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
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(`${dom_element.class_check}[type=checkbox]`).each(function () {
                if ($(this).is(":checked")) {
                    contador = true
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