/**
 * @file EmployeeExtraHour.ts
 * @description Módulo de gestión de horas extras de empleados. Permite registrar,
 *              editar y eliminar horas extras trabajadas por cada empleado.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module HorasExtrasEmpleados
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
        form: "#new_ExtraHour",
        url_buscar_form: "/horasextrasempleado/FormNewEmployeeExtraHour",
        url_buscar: "/horasextrasempleado",
        div_table: ".datatable-ExtraHour",
        row_table: ".rowtable-ExtraHour",
        cont_form: ".cont-form-newExtraHour",
        btn_cancelar: '.btncancelar_new_ExtraHour',
        id_principal: '#EmployeeIdExtraHour',
        url_guardar: "/horasextrasempleado/guardar",
        btn_abrir: '.open-employee-extraHour',
        modal: '.modal-employee-ExtraHour',
        btn_cerrar: '.close-modal-ExtraHour',
        class_name_delete: "earningCodeId",
        form_delete: "#form-delete-ExtraHour",
        class_check: ".select-ExtraHour",
        url_eliminar: "/horasextrasempleado/eliminar",
        btn_nuevo: '.new-ExtraHour'
    }
}

//Arreglo de funciones
const fn = {
    //Buscar informaciones de horas extras de empleados
    SearchType: function (_idEmployee: string) {
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
                        

                        fn.SearchEmployeeExtraHour(
                            _idEmployee,
                            $(this).find(".ExtrahourIdtbl").html().trim(),
                            FormtFechaTipoCalendario($(this).find(".WorkedDaytbl").html().trim())
                           
                            
                        );
                        $('.container-modal-scrolling').scrollTop(0);
                    });

                    $('.optionFilterModalEH').on('change', function () {
                        if ($('.textFilterModalEH').val() != "") {
                            DatafilterModals(".tbody-Table-EmployeeExtraHour", "/horasextrasempleado/FilterOrMoreData", $('#EmployeeId').val().toString().trim(),".optionFilterModalEH", ".textFilterModalEH");
                        }
                    });

                    $('.textFilterModalEH').on('keyup', function (e) {
                        var keycode = e.keyCode || e.which;
                        if (keycode == 13) {
                            DatafilterModals(".tbody-Table-EmployeeExtraHour", "/horasextrasempleado/FilterOrMoreData", $('#EmployeeId').val().toString().trim(), ".optionFilterModalEH", ".textFilterModalEH");

                        }
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    //convertDateFormat: function (date: string) {
    //    var info = date.split('/').reverse().join('-');
    //    return info;
    //},

    //Buscar formulario de nuevo y editar
    SearchEmployeeTypeForm: function () {
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

    //Buscar horas extras para editar
    SearchEmployeeExtraHour: function (_idEmployee: string, _earningCodeId: string, _workedday: string) {
        let url = `horasextrasempleado/${_idEmployee}/${_earningCodeId}/${_workedday}`;
        $.ajax({
            url: url,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                   fn.ShowForm(data);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    //Save
    SaveEmployeeTax: function () {
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
                    fn.SearchType($('#EmployeeId').val().toString());
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
        
        //cerrar formulario de nuevo impuesto
        $(dom_element.btn_cancelar).on('click', function () {
            $(dom_element.cont_form).addClass("collapse");
        });

        $("#Quantity").on('change', function () {
            const quantity: number = Number($(this).val());
            if (quantity <= 0) {
                $(this).val("0");
            }
        });


        //submit save
        $(dom_element.form).submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
                fn.SaveEmployeeTax()
            }
        });

       

        $(dom_element.id_principal).val($('#EmployeeId').val().toString())
        $(dom_element.cont_form).removeClass("collapse");
        InstaciateListener();
    },

}

escuchadores: {
    //Abrir información de horas extras
    $(dom_element.btn_abrir).on('click', function () {
        fn.SearchType($('#EmployeeId').val().toString());
        $(dom_element.modal).modal("show");
    });

    //Cerrar modal de horas extras
    $(dom_element.btn_cerrar).on('click', function () {
        $(dom_element.modal).modal("hide");
    });

    //Abrir formulario nuevo
    $(dom_element.btn_nuevo).on('click', function () {
        operation = 1;
        fn.SearchEmployeeTypeForm();
        //Funcion para mover el scroll, para mejor diseño
        $('.container-modal-scrolling').scrollTop(0);
    });

    //eliminar horas extras
    $(dom_element.form_delete).submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            var contador: boolean = false;
            let cont: number = 0;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(`${dom_element.class_check}[type=checkbox]`).each(function () {
                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", `model[${cont}].workedDay`);
                    input.attr("class", "automatic_input");
                    input.val(FormtFechaTipoCalendario($(this).parent().parent().find(".WorkedDaytbl").html().trim()));
                    $(dom_element.form_delete).append(input);

                    input = $(document.createElement('input'));
                    input.attr("name", `model[${cont}].earningCodeId`);
                    input.attr("class", "automatic_input");
                    input.val($(this).parent().parent().find(".ExtrahourIdtbl").html().trim());
                    $(dom_element.form_delete).append(input);
                    cont++;
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar las horas extras seleccionadas?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: dom_element.url_eliminar,
                            type: "POST",
                            data: $(dom_element.form_delete).serialize() + `&employeeid=${$('#EmployeeId').val().toString().trim()}`,
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $('.automatic_input').remove();
                                if (data.Type == "error") {
                                    var _errors: string = "";
                                    data.Errors.forEach(function (x: string) {
                                        _errors += `${x}<br>`;
                                    });
                                    windows_message(_errors, data.Type);
                                } else {
                                    fn.SearchType($('#EmployeeId').val().toString())
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(`${dom_element.class_check}[type=checkbox]`).prop('checked', false);
                        $('.automatic_input').remove();

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