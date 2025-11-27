/**
 * @file CourseEmployees.ts
 * @description Módulo de gestión de empleados en cursos. Permite asignar,
 *              editar y eliminar empleados inscritos en cada curso.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module EmpleadosCursos
 */

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
        form: "#new_course-employees",
        url_buscar_form: "/cursosempleados/FormCourseEmployees",
        url_buscar: "/cursosempleados",
        div_table: ".datatable-course-employees",
        row_table: ".rowtable-course-employees",
        cont_form: ".cont-form-new-course-employees",
        btn_cancelar: '.btncancelar_new_course_employees',
        id_principal: '#CourseIdEmployeeId',
        url_guardar: "/cursosempleados/guardar",
        btn_abrir: '.open-course-employees',
        modal: '.modal-course-employees',
        btn_cerrar: '.close-modal-course-employees',
        class_name_delete: "listid_CourseEmployees",
        form_delete: "#form-course-employees",
        class_check: ".select-course-employees",
        url_eliminar: "/cursosempleados/eliminar",
        btn_nuevo: '.new-course-employees'
    }
}

//Arreglo de funciones
const fn = {
    //Buscar lista para la tabla
    Search_Course_Employees: function (_courseId: string) {
        $.ajax({
            url: `${dom_element.url_buscar}/${_courseId}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(dom_element.div_table).html('');
                    $(dom_element.div_table).append(data);

                    $(dom_element.row_table).dblclick(function myfunction() {
                        operation = 2;
                        fn.Search_Information_Course_Employees(_courseId, $(this).find(".EmployeeIdtbl").html().trim());
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    //Buscar formulario
    Search_Form_Course_Employees: function () {
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

    //Buscar información  para editar
    Search_Information_Course_Employees: function (_courseId: string, _EmployeesId: string) {
        $.ajax({
            url: `${dom_element.url_buscar}/${_courseId}/${_EmployeesId}`,
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
    Save_Course_Employees: function () {
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
                    fn.Search_Course_Employees($('#CourseId').val().toString());
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
        //cerrar formulario de nuevo instructor
        $(dom_element.btn_cancelar).on('click', function () {
            $(dom_element.cont_form).addClass("collapse");
        });
        //save nuevo instructor
        $(dom_element.form).submit(function (e) {
            if ($(this).valid()) {
                e.preventDefault();
                fn.Save_Course_Employees()
            }
        });

        $(dom_element.id_principal).val($('#CourseId').val().toString())
        $(dom_element.cont_form).removeClass("collapse");

    }
}


escuchadores: {
    //Abrir modal
    $(dom_element.btn_abrir).on('click', function () {
        fn.Search_Course_Employees($('#CourseId').val().toString());
        $(dom_element.modal).modal({ backdrop: 'static', keyboard: false });
    });

    //Cerrar modal
    $(dom_element.btn_cerrar).on('click', function () {
        $(dom_element.modal).modal("hide");
    });

    //Abrir formulario de nuevo
    $(dom_element.btn_nuevo).on('click', function () {
        operation = 1;
        fn.Search_Form_Course_Employees();
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
                    input.val($(this).parent().parent().find(".EmployeeIdtbl").html().trim());
                    $(dom_element.form_delete).append(input);
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar participantes seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: dom_element.url_eliminar,
                            type: "POST",
                            data: $(dom_element.form_delete).serialize() + `&courseid=${$('#CourseId').val().toString().trim()}`,
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
                                    fn.Search_Course_Employees($('#CourseId').val().toString())
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