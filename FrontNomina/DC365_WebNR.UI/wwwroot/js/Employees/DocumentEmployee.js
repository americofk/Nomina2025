/**
 * @file DocumentEmployee.ts
 * @description Módulo de gestión de documentos de empleados. Permite cargar,
 *              visualizar y eliminar documentos asociados a cada empleado.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module DocumentosEmpleados
 */
variables: {
    var operation = 0;
    var dom_element = {
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
    };
}
//Arreglo de funciones
const fn = {
    //Buscar información de tabla
    SearchEarningCode: function (_idEmployee) {
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
                        $('.btnnewAdreesli').text("Editar");
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
    SearchEmployeeEarningCodeId: function (_idEmployee, _internalId) {
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
                    $('.btnnewAdreesli').text("Nuevo");
                    fn.SearchEarningCode($('#EmployeeId').val().toString());
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
        //cerrar formulario de nueva direccion
        $(dom_element.btn_cancelar).on('click', function () {
            $('.btnnewAdreesli').text("Nuevo");
            $(dom_element.cont_form).addClass("collapse");
        });
        //save contact info employee
        $(dom_element.form).submit(function (e) {
            e.preventDefault(); // Siempre prevenir el envío nativo del formulario
            if ($(this).valid()) {
                fn.SaveEmployeeEarningCode();
            }
        });
        $(dom_element.id_principal).val($('#EmployeeId').val().toString());
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
};
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
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            var contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(`${dom_element.class_check}[type=checkbox]`).each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
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
                                    fn.SearchEarningCode($('#EmployeeId').val().toString());
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
    //cargar documento - usar delegación de eventos para el input file dentro del modal
    $(document).on('change', '.Document', function (e) {
        let contador = 0;
        let internalid = "";
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(`${dom_element.class_check}[type=checkbox]`).each(function () {
            if ($(this).is(":checked")) {
                contador++;
                internalid = $(this).parent().parent().find(".InternalIdtblEd").html().trim();
            }
        });
        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
            // Limpiar el input file para permitir seleccionar el mismo archivo de nuevo
            $(this).val('');
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar solo un registro!", "error");
            $(this).val('');
        }
        else {
            let _dato = this;
            if (_dato.files != null && _dato.files.length > 0) {
                let originalform;
                originalform = document.querySelector("#save-empdoc-form");
                let dataform = new FormData(originalform);
                dataform.append("IdEmpleyee", $('#EmployeeId').val().toString());
                dataform.append("internalid", internalid);
                $('.progreso').modal({ backdrop: 'static', keyboard: false });
                $.ajax({
                    url: "/documentosempleados/cargardocumento",
                    type: "POST",
                    data: dataform,
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function (data) {
                        $('.progreso').modal('hide');
                        if (data.Type == "error") {
                            FormatErrors(data);
                        }
                        else {
                            windows_message(data.Message, data.Type);
                            fn.SearchEarningCode($('#EmployeeId').val().toString());
                        }
                        // Limpiar el input file
                        $('.Document').val('');
                    }, error: function (xhr) {
                        $('.progreso').modal('hide');
                        redireccionaralLogin(xhr);
                    }
                });
            }
        }
    });
    // Ver adjunto - abrir documento en nueva pestaña
    $(document).on('click', '.btn-ver-adjunto', function () {
        let contador = 0;
        let internalid = "";
        let hasAttach = false;
        let employeeId = $('#EmployeeId').val().toString();
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(`${dom_element.class_check}[type=checkbox]`).each(function () {
            if ($(this).is(":checked")) {
                contador++;
                internalid = $(this).parent().parent().find(".InternalIdtblEd").html().trim();
                // Verificar si tiene adjunto (el icono tiene clase fa-paperclip)
                hasAttach = $(this).parent().parent().find("i.fa-paperclip").length > 0;
            }
        });
        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar solo un registro!", "error");
        }
        else if (!hasAttach) {
            windows_message("El registro seleccionado no tiene documento adjunto.", "info");
        }
        else {
            // Abrir el documento en nueva pestaña
            window.open(`/documentosempleados/descargardocumento?IdEmployee=${employeeId}&internalid=${internalid}`, '_blank');
        }
    });
    // Eliminar adjunto
    $(document).on('click', '.btn-eliminar-adjunto', function () {
        let contador = 0;
        let internalid = "";
        let hasAttach = false;
        let employeeId = $('#EmployeeId').val().toString();
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(`${dom_element.class_check}[type=checkbox]`).each(function () {
            if ($(this).is(":checked")) {
                contador++;
                internalid = $(this).parent().parent().find(".InternalIdtblEd").html().trim();
                // Verificar si tiene adjunto (el icono tiene clase fa-paperclip)
                hasAttach = $(this).parent().parent().find("i.fa-paperclip").length > 0;
            }
        });
        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar solo un registro!", "error");
        }
        else if (!hasAttach) {
            windows_message("El registro seleccionado no tiene documento adjunto.", "info");
        }
        else {
            windows_message("¿Desea eliminar el archivo adjunto?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $.ajax({
                        url: "/documentosempleados/eliminaradjunto",
                        type: "POST",
                        data: {
                            IdEmployee: employeeId,
                            internalid: internalid
                        },
                        headers: {
                            'RequestVerificationToken': $('input[name="__RequestVerificationToken"]:first').val()
                        },
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                FormatErrors(data);
                            }
                            else {
                                windows_message(data.Message, data.Type);
                                fn.SearchEarningCode($('#EmployeeId').val().toString());
                            }
                        },
                        error: function (xhr) {
                            $('.progreso').modal('hide');
                            redireccionaralLogin(xhr);
                        }
                    });
                },
                onCancel: function () {
                    // No hacer nada
                }
            });
        }
    });
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnRFbXBsb3llZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1R5cGVTY3JpcHRGaWxlL0VtcGxveWVlcy9Eb2N1bWVudEVtcGxveWVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFFSCxTQUFTLEVBQUUsQ0FBQztJQXFCUixJQUFJLFNBQVMsR0FBVyxDQUFDLENBQUM7SUFDMUIsSUFBSSxXQUFXLEdBQXNCO1FBQ2pDLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsZUFBZSxFQUFFLDhDQUE4QztRQUMvRCxVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFNBQVMsRUFBRSw2QkFBNkI7UUFDeEMsU0FBUyxFQUFFLDRCQUE0QjtRQUN2QyxTQUFTLEVBQUUsNkJBQTZCO1FBQ3hDLFlBQVksRUFBRSxtQ0FBbUM7UUFDakQsWUFBWSxFQUFFLHFCQUFxQjtRQUNuQyxXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFNBQVMsRUFBRSx5QkFBeUI7UUFDcEMsS0FBSyxFQUFFLDBCQUEwQjtRQUNqQyxVQUFVLEVBQUUsK0JBQStCO1FBQzNDLGlCQUFpQixFQUFFLGlCQUFpQjtRQUNwQyxXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsWUFBWSxFQUFFLCtCQUErQjtRQUM3QyxTQUFTLEVBQUUsdUJBQXVCO0tBQ3JDLENBQUE7QUFDTCxDQUFDO0FBRUQsc0JBQXNCO0FBQ3RCLE1BQU0sRUFBRSxHQUFHO0lBQ1AsNkJBQTZCO0lBQzdCLGlCQUFpQixFQUFFLFVBQVUsV0FBbUI7UUFDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxVQUFVLElBQUksV0FBVyxFQUFFO1lBQy9DLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFJO2dCQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2xCLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNsQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFdEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxVQUFVO3dCQUNqRCxTQUFTLEdBQUcsQ0FBQyxDQUFDO3dCQUNkLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTt3QkFDbkMsRUFBRSxDQUFDLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDNUYsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVqRCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLDZCQUE2QixFQUFFO1FBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsV0FBVyxDQUFDLGVBQWU7WUFDaEMsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxVQUFVLElBQUk7Z0JBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDbEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsQ0FBQztZQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHO2dCQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFCQUFxQjtJQUNyQiwyQkFBMkIsRUFBRSxVQUFVLFdBQW1CLEVBQUUsV0FBbUI7UUFDM0UsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxVQUFVLElBQUksV0FBVyxJQUFJLFdBQVcsRUFBRTtZQUM5RCxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtnQkFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQ2xCLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHO2dCQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU07SUFDTix1QkFBdUIsRUFBRTtRQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsR0FBRyxFQUFFLFdBQVcsQ0FBQyxXQUFXO1lBQzVCLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsY0FBYyxTQUFTLEVBQUU7WUFDakUsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFnQjtnQkFDL0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO29CQUN2QixJQUFJLE9BQU8sR0FBVyxFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBUzt3QkFDbkMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUM7b0JBQzFCLENBQUMsQ0FBQyxDQUFDO29CQUNILGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO3FCQUFNLENBQUM7b0JBQ0osQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUNsQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ3hELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBb0IsQ0FBQztvQkFDdkUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNiLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5QyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdDLENBQUM7WUFHTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztnQkFDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxvREFBb0Q7SUFDcEQsUUFBUSxFQUFFLFVBQVUsSUFBSTtRQUNwQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QyxzQ0FBc0M7UUFDdEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1lBQ3BDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNsQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNILDRCQUE0QjtRQUM1QixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDdEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsa0RBQWtEO1lBQ3RFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ2QsRUFBRSxDQUFDLHVCQUF1QixFQUFFLENBQUE7WUFDaEMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDbEUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUMzQixxREFBcUQ7WUFDckQsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQyxDQUFDO2lCQUNJLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FHSixDQUFBO0FBRUQsWUFBWSxFQUFFLENBQUM7SUFDWCxhQUFhO0lBQ2IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ2pDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUVILGNBQWM7SUFDZCxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7UUFDbEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFFSCwyQkFBMkI7SUFDM0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ2pDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxFQUFFLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNuQyxpREFBaUQ7UUFDakQsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVTtJQUNWLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN6QyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxrREFBa0Q7UUFDdEUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUNsQixJQUFJLFFBQVEsR0FBWSxLQUFLLENBQUM7WUFDOUIsd0VBQXdFO1lBQ3hFLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNoRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDekIsUUFBUSxHQUFHLElBQUksQ0FBQTtvQkFDZixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQ25ELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQzVFLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ1osZUFBZSxDQUFDLGdDQUFnQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQy9ELENBQUM7aUJBQ0ksQ0FBQztnQkFDRixlQUFlLENBQUMsK0NBQStDLEVBQUUsU0FBUyxFQUFFO29CQUN4RSxJQUFJLEVBQUU7d0JBQ0YsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7d0JBRTdELENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBRUgsR0FBRyxFQUFFLFdBQVcsQ0FBQyxZQUFZOzRCQUM3QixJQUFJLEVBQUUsTUFBTTs0QkFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDeEcsS0FBSyxFQUFFLElBQUk7NEJBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBZ0I7Z0NBQy9CLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzdCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQztvQ0FDdkIsSUFBSSxPQUFPLEdBQVcsRUFBRSxDQUFDO29DQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQVM7d0NBQ25DLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDO29DQUMxQixDQUFDLENBQUMsQ0FBQztvQ0FDSCxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO29DQUNoRCxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDeEMsQ0FBQztxQ0FBTSxDQUFDO29DQUNKLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtvQ0FDdkQsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDaEQsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUM3QyxDQUFDOzRCQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHO2dDQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDOUIsQ0FBQzt5QkFFSixDQUFDLENBQUM7b0JBQ1AsQ0FBQztvQkFDRCxRQUFRLEVBQUU7d0JBQ04sQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLFdBQVcsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUN0RSxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNwRCxDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxxREFBcUQ7SUFDckQsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksY0FBYyxHQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqRCxJQUFJLGNBQWMsR0FBRyxDQUFDO1lBQ2xCLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7WUFFcEQsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9ELENBQUMsQ0FBQyxDQUFDO0lBR0gsbUZBQW1GO0lBQ25GLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUM7UUFDN0MsSUFBSSxRQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksVUFBVSxHQUFXLEVBQUUsQ0FBQztRQUM1Qix3RUFBd0U7UUFDeEUsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLFdBQVcsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDaEQsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pCLFFBQVEsRUFBRSxDQUFDO2dCQUNYLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEYsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDaEIsZUFBZSxDQUFDLGdDQUFnQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNELDRFQUE0RTtZQUM1RSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BCLENBQUM7YUFDSSxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNwQixlQUFlLENBQUMscUNBQXFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQixDQUFDO2FBQ0ksQ0FBQztZQUNGLElBQUksS0FBSyxHQUFHLElBQXdCLENBQUM7WUFDckMsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDaEQsSUFBSSxZQUE2QixDQUFDO2dCQUNsQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUUzRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDMUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUUxQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFFOUQsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDSCxHQUFHLEVBQUUsc0NBQXNDO29CQUMzQyxJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsS0FBSztvQkFDbEIsV0FBVyxFQUFFLEtBQUs7b0JBQ2xCLEtBQUssRUFBRSxJQUFJO29CQUNYLE9BQU8sRUFBRSxVQUFVLElBQWdCO3dCQUMvQixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFLENBQUM7NEJBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdkIsQ0FBQzs2QkFBTSxDQUFDOzRCQUNKLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDekMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO3dCQUM1RCxDQUFDO3dCQUNELHdCQUF3Qjt3QkFDeEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDM0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7d0JBQ25CLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzdCLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QixDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxpREFBaUQ7SUFDakQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUU7UUFDeEMsSUFBSSxRQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksVUFBVSxHQUFXLEVBQUUsQ0FBQztRQUM1QixJQUFJLFNBQVMsR0FBWSxLQUFLLENBQUM7UUFDL0IsSUFBSSxVQUFVLEdBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTNELHdFQUF3RTtRQUN4RSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsV0FBVyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNoRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDekIsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDOUUsaUVBQWlFO2dCQUNqRSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDNUUsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDaEIsZUFBZSxDQUFDLGdDQUFnQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELENBQUM7YUFDSSxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNwQixlQUFlLENBQUMscUNBQXFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEUsQ0FBQzthQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNsQixlQUFlLENBQUMsc0RBQXNELEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEYsQ0FBQzthQUNJLENBQUM7WUFDRixzQ0FBc0M7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxzREFBc0QsVUFBVSxlQUFlLFVBQVUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZILENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILG1CQUFtQjtJQUNuQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRTtRQUM3QyxJQUFJLFFBQVEsR0FBVyxDQUFDLENBQUM7UUFDekIsSUFBSSxVQUFVLEdBQVcsRUFBRSxDQUFDO1FBQzVCLElBQUksU0FBUyxHQUFZLEtBQUssQ0FBQztRQUMvQixJQUFJLFVBQVUsR0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFM0Qsd0VBQXdFO1FBQ3hFLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2hELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN6QixRQUFRLEVBQUUsQ0FBQztnQkFDWCxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUM5RSxpRUFBaUU7Z0JBQ2pFLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUM1RSxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNoQixlQUFlLENBQUMsZ0NBQWdDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0QsQ0FBQzthQUNJLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3BCLGVBQWUsQ0FBQyxxQ0FBcUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwRSxDQUFDO2FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2xCLGVBQWUsQ0FBQyxzREFBc0QsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRixDQUFDO2FBQ0ksQ0FBQztZQUNGLGVBQWUsQ0FBQyxxQ0FBcUMsRUFBRSxTQUFTLEVBQUU7Z0JBQzlELElBQUksRUFBRTtvQkFDRixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFFOUQsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDSCxHQUFHLEVBQUUsc0NBQXNDO3dCQUMzQyxJQUFJLEVBQUUsTUFBTTt3QkFDWixJQUFJLEVBQUU7NEJBQ0YsVUFBVSxFQUFFLFVBQVU7NEJBQ3RCLFVBQVUsRUFBRSxVQUFVO3lCQUN6Qjt3QkFDRCxPQUFPLEVBQUU7NEJBQ0wsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLGdEQUFnRCxDQUFDLENBQUMsR0FBRyxFQUFZO3lCQUNsRzt3QkFDRCxLQUFLLEVBQUUsSUFBSTt3QkFDWCxPQUFPLEVBQUUsVUFBVSxJQUFnQjs0QkFDL0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO2dDQUN2QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3ZCLENBQUM7aUNBQU0sQ0FBQztnQ0FDSixlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3pDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzs0QkFDNUQsQ0FBQzt3QkFDTCxDQUFDO3dCQUNELEtBQUssRUFBRSxVQUFVLEdBQUc7NEJBQ2hCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQzdCLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM5QixDQUFDO3FCQUNKLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNELFFBQVEsRUFBRTtvQkFDTixnQkFBZ0I7Z0JBQ3BCLENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIERvY3VtZW50RW1wbG95ZWUudHNcclxuICogQGRlc2NyaXB0aW9uIE3Ds2R1bG8gZGUgZ2VzdGnDs24gZGUgZG9jdW1lbnRvcyBkZSBlbXBsZWFkb3MuIFBlcm1pdGUgY2FyZ2FyLFxyXG4gKiAgICAgICAgICAgICAgdmlzdWFsaXphciB5IGVsaW1pbmFyIGRvY3VtZW50b3MgYXNvY2lhZG9zIGEgY2FkYSBlbXBsZWFkby5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgRG9jdW1lbnRvc0VtcGxlYWRvc1xyXG4gKi9cclxuXHJcbnZhcmlhYmxlczoge1xyXG4gICAgaW50ZXJmYWNlIElEb21FbGVtZW50X01vZGFsIHtcclxuICAgICAgICBmb3JtOiBzdHJpbmdcclxuICAgICAgICB1cmxfYnVzY2FyX2Zvcm06IHN0cmluZyAvLyBidXNjYXIgZm9ybXVsYXJpb1xyXG4gICAgICAgIHVybF9idXNjYXI6IHN0cmluZyAvLyBidXNjYXIgbGlzdGFcclxuICAgICAgICB1cmxfZ3VhcmRhcjogc3RyaW5nIC8vIGd1YXJkYXJcclxuICAgICAgICB1cmxfZWxpbWluYXI6IHN0cmluZyAvL2VsaW1pbmFyXHJcbiAgICAgICAgZGl2X3RhYmxlOiBzdHJpbmcgLy9EaXYgZG9uZGUgdmEgbGEgdGFibGEgY29uIGxhIGxpc3RhXHJcbiAgICAgICAgcm93X3RhYmxlOiBzdHJpbmcgLy9QYXJhIGVsIGV2ZW50byBkb2JsZWNsaWNrIGFsIGVkaXRhclxyXG4gICAgICAgIGNvbnRfZm9ybTogc3RyaW5nIC8vQ29udGVuZWRvciBkZWwgZm9ybXVsYXJpbyBudWV2byB5IGVkaXRhciBxdWUgc2Ugb2N1bHRhXHJcbiAgICAgICAgYnRuX2NhbmNlbGFyOiBzdHJpbmcgLy9Cb3TDs24gZGUgY2FuY2VsYXJcclxuICAgICAgICBpZF9wcmluY2lwYWw6IHN0cmluZyAvL0lkIHByaW5jaXBhbCBkZSBlbXBsZWFkb1xyXG4gICAgICAgIGJ0bl9hYnJpcjogc3RyaW5nIC8vQm90w7NuIGRlIGFicmlyIGVsIG1vZGFsXHJcbiAgICAgICAgbW9kYWw6IHN0cmluZyAvL01vZGFsXHJcbiAgICAgICAgYnRuX2NlcnJhcjogc3RyaW5nIC8vIGJvdG9uIGRlIGNlcnJhciBtb2RhbFxyXG4gICAgICAgIGNsYXNzX25hbWVfZGVsZXRlOiBzdHJpbmcgLy8gbm9tYnJlIGRlIGxhIGNsYXNlIHBhcmEgZWxpbWluYXJcclxuICAgICAgICBmb3JtX2RlbGV0ZTogc3RyaW5nIC8vIGZvcm11bGFyaW8gcGFyYSBlbGltaW5hcixcclxuICAgICAgICBjbGFzc19jaGVjazogc3RyaW5nIC8vIENoZWNrYm94eCBkZSBsYSB0YWJsYVxyXG4gICAgICAgIGJ0bl9udWV2bzogc3RyaW5nIC8vQm90w7NuIGRlIG51ZXZvXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9wZXJhdGlvbjogbnVtYmVyID0gMDtcclxuICAgIHZhciBkb21fZWxlbWVudDogSURvbUVsZW1lbnRfTW9kYWwgPSB7XHJcbiAgICAgICAgZm9ybTogXCIjbmV3X0VtcGxveWVlRG9jdW1lbnRcIixcclxuICAgICAgICB1cmxfYnVzY2FyX2Zvcm06IFwiL2RvY3VtZW50b3NlbXBsZWFkb3MvRm9ybU5ld0VtcGxveWVlRG9jdW1lbnRcIixcclxuICAgICAgICB1cmxfYnVzY2FyOiBcIi9kb2N1bWVudG9zZW1wbGVhZG9zXCIsXHJcbiAgICAgICAgZGl2X3RhYmxlOiBcIi5kYXRhdGFibGUtRW1wbG95ZWVEb2N1bWVudFwiLFxyXG4gICAgICAgIHJvd190YWJsZTogXCIucm93dGFibGUtRW1wbG95ZWVEb2N1bWVudFwiLFxyXG4gICAgICAgIGNvbnRfZm9ybTogXCIuY29udC1mb3JtLUVtcGxveWVlRG9jdW1lbnRcIixcclxuICAgICAgICBidG5fY2FuY2VsYXI6ICcuYnRuY2FuY2VsYXJfbmV3X0VtcGxveWVlRG9jdW1lbnQnLFxyXG4gICAgICAgIGlkX3ByaW5jaXBhbDogJyNFbXBsb3llZUlkRG9jdW1lbnQnLFxyXG4gICAgICAgIHVybF9ndWFyZGFyOiBcIi9kb2N1bWVudG9zZW1wbGVhZG9zL2d1YXJkYXJcIixcclxuICAgICAgICBidG5fYWJyaXI6ICcub3Blbi1lbXBsb3llZS1kb2N1bWVudCcsXHJcbiAgICAgICAgbW9kYWw6ICcubW9kYWwtZW1wbG95ZWUtZG9jdW1lbnQnLFxyXG4gICAgICAgIGJ0bl9jZXJyYXI6ICcuY2xvc2UtbW9kYWwtRW1wbG95ZWVEb2N1bWVudCcsXHJcbiAgICAgICAgY2xhc3NfbmFtZV9kZWxldGU6IFwibGlzdGlkX0RvY3VtZW50XCIsXHJcbiAgICAgICAgZm9ybV9kZWxldGU6IFwiI2Zvcm0tZGVsZXRlRW1wbG95ZWVEb2N1bWVudFwiLFxyXG4gICAgICAgIGNsYXNzX2NoZWNrOiBcIi5zZWxlY3QtRW1wbG95ZWVEb2N1bWVudFwiLFxyXG4gICAgICAgIHVybF9lbGltaW5hcjogXCIvZG9jdW1lbnRvc2VtcGxlYWRvcy9lbGltaW5hclwiLFxyXG4gICAgICAgIGJ0bl9udWV2bzogJy5uZXctRW1wbG95ZWVEb2N1bWVudCdcclxuICAgIH1cclxufVxyXG5cclxuLy9BcnJlZ2xvIGRlIGZ1bmNpb25lc1xyXG5jb25zdCBmbiA9IHtcclxuICAgIC8vQnVzY2FyIGluZm9ybWFjacOzbiBkZSB0YWJsYVxyXG4gICAgU2VhcmNoRWFybmluZ0NvZGU6IGZ1bmN0aW9uIChfaWRFbXBsb3llZTogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgJHtkb21fZWxlbWVudC51cmxfYnVzY2FyfS8ke19pZEVtcGxveWVlfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZGl2X3RhYmxlKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmRpdl90YWJsZSkuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LnJvd190YWJsZSkuZGJsY2xpY2soZnVuY3Rpb24gbXlmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld0FkcmVlc2xpJykudGV4dChcIkVkaXRhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hFbXBsb3llZUVhcm5pbmdDb2RlSWQoX2lkRW1wbG95ZWUsICQodGhpcykuZmluZChcIi5JbnRlcm5hbElkdGJsRWRcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nJykuc2Nyb2xsVG9wKDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9CdXNjYXIgZm9ybXVsYXJpbyBkZSBudWV2byB5IGVkaXRhclxyXG4gICAgU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUZvcm06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9idXNjYXJfZm9ybSxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLlNob3dGb3JtKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL0J1c2NhciBkYXRvcyBwb3IgaWRcclxuICAgIFNlYXJjaEVtcGxveWVlRWFybmluZ0NvZGVJZDogZnVuY3Rpb24gKF9pZEVtcGxveWVlOiBzdHJpbmcsIF9pbnRlcm5hbElkOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAke2RvbV9lbGVtZW50LnVybF9idXNjYXJ9LyR7X2lkRW1wbG95ZWV9LyR7X2ludGVybmFsSWR9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TaG93Rm9ybShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vU2F2ZVxyXG4gICAgU2F2ZUVtcGxveWVlRWFybmluZ0NvZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9ndWFyZGFyLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogJChkb21fZWxlbWVudC5mb3JtKS5zZXJpYWxpemUoKSArIGAmb3BlcmF0aW9uPSR7b3BlcmF0aW9ufWAsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld0FkcmVlc2xpJykudGV4dChcIk51ZXZvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRWFybmluZ0NvZGUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZG9tX2VsZW1lbnQuZm9ybSkgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vTW9zdHJhciB5IGNvbmZpZ3VyYXIgZWwgbnVldm8gZm9ybXVsYXJpbyBlbiBlbCBkb21cclxuICAgIFNob3dGb3JtOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5odG1sKCcnKTtcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAvL2NlcnJhciBmb3JtdWxhcmlvIGRlIG51ZXZhIGRpcmVjY2lvblxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuYnRuX2NhbmNlbGFyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5idG5uZXdBZHJlZXNsaScpLnRleHQoXCJOdWV2b1wiKVxyXG4gICAgICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3NhdmUgY29udGFjdCBpbmZvIGVtcGxveWVlXHJcbiAgICAgICAgJChkb21fZWxlbWVudC5mb3JtKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFNpZW1wcmUgcHJldmVuaXIgZWwgZW52w61vIG5hdGl2byBkZWwgZm9ybXVsYXJpb1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIGZuLlNhdmVFbXBsb3llZUVhcm5pbmdDb2RlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvbV9lbGVtZW50LmlkX3ByaW5jaXBhbCkudmFsKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSlcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICBJbnN0YWNpYXRlTGlzdGVuZXIoKTtcclxuICAgICAgICAkKCcjQ29udGFjdFR5cGUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL0FzaWduYXIgdGV4dG8gZGluw6FtaWNvIGEgbGEgaW5mb3JtYWNpw7NuIGRlIGNvbnRhY3RvXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmxibEluZm9Db250YWN0XCIpLnRleHQoXCJEaXJlY2Npw7NuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIi5sYmxJbmZvQ29udGFjdFwiKS50ZXh0KFwiTsO6bWVyb1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgIFxyXG59XHJcblxyXG5lc2N1Y2hhZG9yZXM6IHtcclxuICAgIC8vQWJyaXIgbW9kYWxcclxuICAgICQoZG9tX2VsZW1lbnQuYnRuX2FicmlyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm4uU2VhcmNoRWFybmluZ0NvZGUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAkKGRvbV9lbGVtZW50Lm1vZGFsKS5tb2RhbChcInNob3dcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NlcnJhciBtb2RhbFxyXG4gICAgJChkb21fZWxlbWVudC5idG5fY2VycmFyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5tb2RhbCkubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9BYnJpciBmb3JtdWxhcmlvIGRlIG51ZXZvXHJcbiAgICAkKGRvbV9lbGVtZW50LmJ0bl9udWV2bykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wZXJhdGlvbiA9IDE7XHJcbiAgICAgICAgZm4uU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUZvcm0oKTtcclxuICAgICAgICAvL0Z1bmNpb24gcGFyYSBtb3ZlciBlbCBzY3JvbGwsIHBhcmEgbWVqb3IgZGlzZcOxb1xyXG4gICAgICAgICQoJy5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nJykuc2Nyb2xsVG9wKDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9lbGltaW5hclxyXG4gICAgJChkb21fZWxlbWVudC5mb3JtX2RlbGV0ZSkuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBTaWVtcHJlIHByZXZlbmlyIGVsIGVudsOtbyBuYXRpdm8gZGVsIGZvcm11bGFyaW9cclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChgJHtkb21fZWxlbWVudC5jbGFzc19jaGVja31bdHlwZT1jaGVja2JveF1gKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIGRvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuSW50ZXJuYWxJZHRibEVkXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZm9ybV9kZWxldGUpLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgbG9zIGRvY3VtZW50b3Mgc2VsZWNjaW9uYWRvcz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBkb21fZWxlbWVudC51cmxfZWxpbWluYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoZG9tX2VsZW1lbnQuZm9ybV9kZWxldGUpLnNlcmlhbGl6ZSgpICsgYCZlbXBsb3llZWlkPSR7JCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpLnRyaW0oKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEVhcm5pbmdDb2RlKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoYC4ke2RvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlfWApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9QYXJhIGRpc2XDsW8sIHNlIG9jdWx0YSBlbCBpbmRpY2Fkb3IgYWwgaGFjZXIgc2Nyb2xsXHJcbiAgICAkKFwiLmNvbnRhaW5lci1tb2RhbC1zY3JvbGxpbmdcIikuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgcG9zaXRpb25TY3JvbGw6IG51bWJlciA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uU2Nyb2xsID4gMClcclxuICAgICAgICAgICAgJCgnLmZvci1lbXBsb3llZS1jb250YWN0aW5mbycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJCgnLmZvci1lbXBsb3llZS1jb250YWN0aW5mbycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vY2FyZ2FyIGRvY3VtZW50byAtIHVzYXIgZGVsZWdhY2nDs24gZGUgZXZlbnRvcyBwYXJhIGVsIGlucHV0IGZpbGUgZGVudHJvIGRlbCBtb2RhbFxyXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcuRG9jdW1lbnQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGxldCBjb250YWRvcjogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgaW50ZXJuYWxpZDogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJuYWxpZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5JbnRlcm5hbElkdGJsRWRcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY29udGFkb3IgPT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIC8vIExpbXBpYXIgZWwgaW5wdXQgZmlsZSBwYXJhIHBlcm1pdGlyIHNlbGVjY2lvbmFyIGVsIG1pc21vIGFyY2hpdm8gZGUgbnVldm9cclxuICAgICAgICAgICAgJCh0aGlzKS52YWwoJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb250YWRvciA+IDEpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHNvbG8gdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICQodGhpcykudmFsKCcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBfZGF0byA9IHRoaXMgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKF9kYXRvLmZpbGVzICE9IG51bGwgJiYgX2RhdG8uZmlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9yaWdpbmFsZm9ybTogSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlLWVtcGRvYy1mb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkYXRhZm9ybSA9IG5ldyBGb3JtRGF0YShvcmlnaW5hbGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgZGF0YWZvcm0uYXBwZW5kKFwiSWRFbXBsZXllZVwiLCAkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgZGF0YWZvcm0uYXBwZW5kKFwiaW50ZXJuYWxpZFwiLCBpbnRlcm5hbGlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9kb2N1bWVudG9zZW1wbGVhZG9zL2NhcmdhcmRvY3VtZW50b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hFYXJuaW5nQ29kZSgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIExpbXBpYXIgZWwgaW5wdXQgZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuRG9jdW1lbnQnKS52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBWZXIgYWRqdW50byAtIGFicmlyIGRvY3VtZW50byBlbiBudWV2YSBwZXN0YcOxYVxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idG4tdmVyLWFkanVudG8nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGNvbnRhZG9yOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBpbnRlcm5hbGlkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGxldCBoYXNBdHRhY2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgZW1wbG95ZWVJZDogc3RyaW5nID0gJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJuYWxpZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5JbnRlcm5hbElkdGJsRWRcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIC8vIFZlcmlmaWNhciBzaSB0aWVuZSBhZGp1bnRvIChlbCBpY29ubyB0aWVuZSBjbGFzZSBmYS1wYXBlcmNsaXApXHJcbiAgICAgICAgICAgICAgICBoYXNBdHRhY2ggPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCJpLmZhLXBhcGVyY2xpcFwiKS5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciBzb2xvIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghaGFzQXR0YWNoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkVsIHJlZ2lzdHJvIHNlbGVjY2lvbmFkbyBubyB0aWVuZSBkb2N1bWVudG8gYWRqdW50by5cIiwgXCJpbmZvXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gQWJyaXIgZWwgZG9jdW1lbnRvIGVuIG51ZXZhIHBlc3Rhw7FhXHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKGAvZG9jdW1lbnRvc2VtcGxlYWRvcy9kZXNjYXJnYXJkb2N1bWVudG8/SWRFbXBsb3llZT0ke2VtcGxveWVlSWR9JmludGVybmFsaWQ9JHtpbnRlcm5hbGlkfWAsICdfYmxhbmsnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBFbGltaW5hciBhZGp1bnRvXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ0bi1lbGltaW5hci1hZGp1bnRvJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjb250YWRvcjogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgaW50ZXJuYWxpZDogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBsZXQgaGFzQXR0YWNoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGVtcGxveWVlSWQ6IHN0cmluZyA9ICQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChgJHtkb21fZWxlbWVudC5jbGFzc19jaGVja31bdHlwZT1jaGVja2JveF1gKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIGludGVybmFsaWQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuSW50ZXJuYWxJZHRibEVkXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBWZXJpZmljYXIgc2kgdGllbmUgYWRqdW50byAoZWwgaWNvbm8gdGllbmUgY2xhc2UgZmEtcGFwZXJjbGlwKVxyXG4gICAgICAgICAgICAgICAgaGFzQXR0YWNoID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiaS5mYS1wYXBlcmNsaXBcIikubGVuZ3RoID4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY29udGFkb3IgPT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgc29sbyB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoIWhhc0F0dGFjaCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJFbCByZWdpc3RybyBzZWxlY2Npb25hZG8gbm8gdGllbmUgZG9jdW1lbnRvIGFkanVudG8uXCIsIFwiaW5mb1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgZWwgYXJjaGl2byBhZGp1bnRvP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvZG9jdW1lbnRvc2VtcGxlYWRvcy9lbGltaW5hcmFkanVudG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElkRW1wbG95ZWU6IGVtcGxveWVlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbGlkOiBpbnRlcm5hbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdSZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW4nOiAkKCdpbnB1dFtuYW1lPVwiX19SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl06Zmlyc3QnKS52YWwoKSBhcyBzdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRWFybmluZ0NvZGUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBObyBoYWNlciBuYWRhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IHsgfSJdfQ==