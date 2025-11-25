import { format } from "jquery";

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
        form: "#new_contactinfo",
        url_buscar_form: "/contactoinfoempleados/FormNuevoContactInfo",
        url_buscar: "/contactoinfoempleados",
        div_table: ".datatable-contactinfo",
        row_table: ".rowtable-contactinfo",
        cont_form: ".cont-form-newcontact",
        btn_cancelar: '.btncancelar_new_contactinfo',
        id_principal: '#EmployeeIdContactInf',
        url_guardar: "/contactoinfoempleados/guardar",
        btn_abrir: '.open-employee-contacts',
        modal: '.modal-employee-contact',
        btn_cerrar: '.close-modal-contacts',
        class_name_delete: "listid_contactinfo",
        form_delete: "#form-deletecontactinfo",
        class_check: ".select-contactinf",
        url_eliminar: "/contactoinfoempleados/eliminar",
        btn_nuevo: '.new-contactinfo'
    }
}

//Arreglo de funciones
const fn = {
    //Buscar informaciones de contacto del empleado
    SearchContactsInformation: function (_idEmployee: string) {
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
                        fn.SearchEmployeeContactId(_idEmployee, $(this).find(".InternalIdtbl").html().trim());
                        $('.container-modal-scrolling').scrollTop(0);

                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    //Buscar formulario de nuevo y editar
    SearchEmployeeContactInfoForm: function() {
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

    //Buscar información de contacto para editar
    SearchEmployeeContactId:function (_idEmployee: string, _internalId: string) {
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

    //Save Employee Contact Info
    SaveContactInfoEmployee: function () {
        $.ajax({
            url: dom_element.url_guardar,
            type: "POST",
            data: $(dom_element.form).serialize() + `&operation=${operation}`,
            async: true,
            success: function (data: ResponseUI) {
                $('.progreso').modal('hide');
                if (data.Type == "error") {
                    FormatErrors(data);
                } else {
                    windows_message(data.Message, data.Type);
                    fn.SearchContactsInformation($('#EmployeeId').val().toString());
                    let form = document.querySelector(dom_element.form) as HTMLFormElement;
                    form.reset();
                    $(dom_element.cont_form).addClass("collapse");
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
            $(dom_element.cont_form).addClass("collapse");
        });
        //save contact info employee
        $(dom_element.form).submit(function (e) {
            if ($(this).valid()) {
                e.preventDefault();
                fn.SaveContactInfoEmployee()
            }
        });

        $(dom_element.id_principal).val($('#EmployeeId').val().toString())
        $(dom_element.cont_form).removeClass("collapse");

        $('#ContactType').on('change', function () {
            //Asignar texto dinámico a la información de contacto
            if ($(this).val() == "1") {
                $(".lblInfoContact").text("Correo");
            }
            else {
                $(".lblInfoContact").text("Número");
            }
        });
    }
}




escuchadores: {
    //Abrir información de contacto
    $(dom_element.btn_abrir).on('click', function () {
        fn.SearchContactsInformation($('#EmployeeId').val().toString());
        $(dom_element.modal).modal({ backdrop: 'static', keyboard: false });

    });

    //Cerrar modal de información de contacto
    $(dom_element.btn_cerrar).on('click', function () {
        $(dom_element.modal).modal("hide");
    });

    //Abrir formulario de nuevo
    $(dom_element.btn_nuevo).on('click', function () {
        operation = 1;
        fn.SearchEmployeeContactInfoForm();
        //Funcion para mover el scroll, para mejor diseño
        $('.container-modal-scrolling').scrollTop(0);
    });

    //eliminar informacion de contacto
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
                    input.val($(this).parent().parent().find(".InternalIdtbl").html().trim());
                    $(dom_element.form_delete).append(input);
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar las información de contacto seleccionada?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: dom_element.url_eliminar,
                            type: "POST",
                            data: $(dom_element.form_delete).serialize() + `&employeeid=${$('#EmployeeId').val().toString().trim()}`,
                            async: true,
                            success: function (data: ResponseUI) {
                                if (data.Type == "error") {
                                    $('.progreso').modal('hide');
                                    var _errors: string = "";
                                    data.Errors.forEach(function (x: string) {
                                        _errors += `${x}<br>`;
                                    });
                                    $(`.${dom_element.class_name_delete}`).remove();
                                    windows_message(_errors, data.Type);
                                } else {
                                    $('.progreso').modal('hide');
                                    fn.SearchContactsInformation($('#EmployeeId').val().toString())
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