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
        form: "#new_EmployeeWorkCalendar",
        url_buscar_form: "/horarioempleado/FormNewEmployeeWorkCalendar",
        url_buscar: "/horarioempleado/ListCalendar",
        div_table: ".datatable-workcalendars",
        row_table: ".rowtable-WorkCalendar",
        cont_form: ".cont-form-new-workcalendars",
        btn_cancelar: '.btncancelar_new_workcalendars',
        id_principal: '#EmployeeIdWorkCalendar',
        url_guardar: "/horarioempleado/guardar",
        btn_abrir: '.open-employee-workcalendars',
        modal: '.modal-employee-workcalendars',
        btn_cerrar: '.close-modal-workcalendars',
        class_name_delete: "InternalId",
        form_delete: "#form-deleteWorkcalendars",
        class_check: ".select-EmployeeWorkCalendar",
        url_eliminar: "/horarioempleado/eliminar",
        btn_nuevo: '.new-workcalendars'
    }
}

//Arreglo de funciones
const fn = {
    //Buscar informacion de horario de empleados
    SearchWorkCalendars: function (_idEmployee: string) {
        $.ajax({
            url: `horarioempleado/${_idEmployee}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(dom_element.div_table).html('');
                    $(dom_element.div_table).append(data);

                    $(dom_element.row_table).dblclick(function myfunction() {
                        operation = 2;
                        fn.SearchEmployeeWorkCalendars(_idEmployee, $(this).find(".InternalId-WorkCalendartbl").html().trim());
                    });
                    $('.container-modal-scrolling').scrollTop(0);

                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    //Buscar formulario de nuevo y editar
    SearchEmployeeWorkCalendarsForm: function () {
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
    SearchEmployeeWorkCalendars: function (_idEmployee: string, _internalId: string) {
        var url = `${dom_element.url_buscar}/${_idEmployee}/${_internalId}`;
        $.ajax({
            url: `${dom_element.url_buscar}`,
            //url: `${dom_element.url_buscar}/${_idEmployee}/${_internalId}`,
            data: { employeeid: _idEmployee, internalId: _internalId },
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
    SaveEmployeeWorkCalendars: function () {
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
                    fn.SearchWorkCalendars($('#EmployeeId').val().toString());
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

        //save
        $(dom_element.form).submit(function (e) {
            e.preventDefault();
            if ($(this).valid()) {
                fn.SaveEmployeeWorkCalendars()
            }
        });

        $(dom_element.id_principal).val($('#EmployeeId').val().toString())
        $(dom_element.cont_form).removeClass("collapse");
        InstaciateListener();

        //Plugin de numeros
        UsePluginNumberFormat(dom_element.form);
    },

}
escuchadores: {
    //Abrir información de horarios 
    $(dom_element.btn_abrir).on('click', function () {
        fn.SearchWorkCalendars($('#EmployeeId').val().toString());
        $(dom_element.modal).modal({ backdrop: 'static', keyboard: false })

    });

    //Cerrar modal de horarios
    $(dom_element.btn_cerrar).on('click', function () {
        $(dom_element.modal).modal("hide");
    });

    //Abrir formulario nuevo
    $(dom_element.btn_nuevo).on('click', function () {
        operation = 1;
        fn.SearchEmployeeWorkCalendarsForm();
        //Funcion para mover el scroll, para mejor diseño
        $('.container-modal-scrolling').scrollTop(0);
    });

    //eliminar horarios de empleados
    $(dom_element.form_delete).submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            let cont: number = 0;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(`${dom_element.class_check}[type=checkbox]`).each(function () {
                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", `model[${cont}].InternalId`);
                    input.attr("class", dom_element.class_name_delete);
                    input.val($(this).parent().parent().find(".InternalId-WorkCalendartbl").html().trim());
                    $(dom_element.form_delete).append(input);
                    cont++;
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar las fechas seleccionadas?", "confirm", {
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
                                    fn.SearchWorkCalendars($('#EmployeeId').val().toString())
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


  

    $('.backward-btn').click(function () {

        $(".datatable-Loan-history").addClass("collpase-modal");
        $(".set-title-modloan").text("Préstamo");

        $(".forward").removeClass("collapse");
        $(".backward-btn").addClass("collapse");
        $(".datatable-Loan").removeClass("collapse");

    });

}

export { }