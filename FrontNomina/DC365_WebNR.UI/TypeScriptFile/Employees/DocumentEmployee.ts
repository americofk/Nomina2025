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
        form: "#new_EmployeeDocument",
        url_buscar_form: "/documentosempleados/FormNewEmployeeDocument",
        url_buscar: "/documentosempleados",
        div_table: ".datatable-EmployeeDocument",
        row_table: ".rowtable-EmployeeDocument",
        cont_form: ".cont-form-EmployeeDocument",
        btn_cancelar: '.btncancelar_new_EmployeeDocument',
        id_principal: '#EmployeeIdDocument',
        url_guardar: "/documentosempleados/guardar",
        btn_abrir: '.open-employee-document',
        modal: '.modal-employee-document',
        btn_cerrar: '.close-modal-EmployeeDocument',
        class_name_delete: "listid_Document",
        form_delete: "#form-deleteEmployeeDocument",
        class_check: ".select-EmployeeDocument",
        url_eliminar: "/documentosempleados/eliminar",
        btn_nuevo: '.new-EmployeeDocument'
    }
}

//Arreglo de funciones
const fn = {
    //Buscar información de tabla
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
                        fn.SearchEmployeeEarningCodeId(_idEmployee, $(this).find(".InternalIdtblEd").html().trim());
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

    //Buscar datos por id
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

    //Save
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
            if ($(this).valid()) {
                e.preventDefault();
                fn.SaveEmployeeEarningCode()
            }
        });

        $(dom_element.id_principal).val($('#EmployeeId').val().toString())
        $(dom_element.cont_form).removeClass("collapse");
        InstaciateListener();
        $('#ContactType').on('change', function () {
            //Asignar texto dinámico a la información de contacto
            if ($(this).val() == "1") {
                $(".lblInfoContact").text("Dirección");
            }
            else {
                $(".lblInfoContact").text("Número");
            }
        });
    },

   
}

escuchadores: {
    //Abrir modal
    $(dom_element.btn_abrir).on('click', function () {
        fn.SearchEarningCode($('#EmployeeId').val().toString());
        $(dom_element.modal).modal("show");
    });

    //Cerrar modal
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

    //eliminar
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
                    input.val($(this).parent().parent().find(".InternalIdtblEd").html().trim());
                    $(dom_element.form_delete).append(input);
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los documentos seleccionados?", "confirm", {
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


    //cargar documento
    $(".Document").change(function (e) {
        let contador: number = 0;
        let internalid: string = "";
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(`${dom_element.class_check}[type=checkbox]`).each(function () {
            if ($(this).is(":checked")) {
                contador++;                
                internalid = $(this).parent().parent().find(".InternalIdtblEd").html().trim();
            }
        });

        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar solo un registro!", "error");
        }
        else {
            let _dato = this as HTMLInputElement;
            if (_dato.files != null) {
                let originalform: HTMLFormElement;
                originalform = document.querySelector("#save-empdoc-form");

                let dataform = new FormData(originalform);
                dataform.append("IdEmpleyee", $('#EmployeeId').val().toString());
                dataform.append("internalid", internalid);

                $.ajax({
                    url: "/documentosempleados/cargardocumento",
                    type: "POST",
                    data: dataform,
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function (data: ResponseUI) {
                        if (data.Type == "error") {
                            FormatErrors(data);
                        } else {
                            windows_message(data.Message, data.Type);
                            fn.SearchEarningCode($('#EmployeeId').val().toString());
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        }
    });

}

export { }