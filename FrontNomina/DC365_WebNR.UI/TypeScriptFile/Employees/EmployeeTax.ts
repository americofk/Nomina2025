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
        form: "#new_TaxEmployee",
        url_buscar_form: "/impuestosempleado/FormNewEmployeeTaxs",
        url_buscar: "/impuestosempleado",
        div_table: ".datatable-Tax",
        row_table: ".rowtable-tax",
        cont_form: ".cont-form-newTax",
        btn_cancelar: '.btncancelar_new_Tax',
        id_principal: '#EmployeeIdTax',
        url_guardar: "/impuestosempleado/guardar",
        btn_abrir: '.open-employee-tax',
        modal: '.modal-employee-Tax',
        btn_cerrar: '.close-modal-Tax',
        class_name_delete: "listid_EmployeeTaxs",
        form_delete: "#form-delete-Tax",
        class_check: ".select-tax-Employe",
        url_eliminar: "/impuestosempleado/eliminar",
        btn_nuevo: '.new-tax'
    }
}

//Arreglo de funciones
const fn = {
    //Buscar informaciones de impuestos de empleados
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
                        fn.SearchEmployeeTax(_idEmployee, $(this).find(".TaxIdtbl").html().trim());
                    });
                    $('.container-modal-scrolling').scrollTop(0);

                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

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

    //Buscar codigo de canancia para editar
    SearchEmployeeTax: function (_idEmployee: string, _internalId: string) {
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



        //submit save
        $(dom_element.form).submit(function (e) {
            if ($(this).valid()) {
                e.preventDefault();
                fn.SaveEmployeeTax()
            }
        });

        $(dom_element.id_principal).val($('#EmployeeId').val().toString())
        $(dom_element.cont_form).removeClass("collapse");
        InstaciateListener();
       
    },

}

escuchadores: {
    //Abrir información de impuesto
    $(dom_element.btn_abrir).on('click', function () {
        fn.SearchType($('#EmployeeId').val().toString());
        $(dom_element.modal).modal("show");
    });

    //Cerrar modal de impuesto
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

    //eliminar impuestos de empleados
    $(dom_element.form_delete).submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(`${dom_element.class_check}[type=checkbox]`).each(function () {
                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", dom_element.class_name_delete);
                    input.attr("class", dom_element.class_name_delete);
                    input.val($(this).parent().parent().find(".TaxIdtbl").html().trim());
                    $(dom_element.form_delete).append(input);
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los impuestos seleccionados?", "confirm", {
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
                                    fn.SearchType($('#EmployeeId').val().toString())
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