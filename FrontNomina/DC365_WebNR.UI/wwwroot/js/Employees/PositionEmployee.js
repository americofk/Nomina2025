/**
 * @file PositionEmployee.ts
 * @description Módulo de gestión de puestos por empleado. Permite asignar,
 *              editar y eliminar asignaciones de puestos para cada empleado.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module PuestosEmpleados
 */
variables: {
    var operation = 0;
    var dom_element = {
        form: "#new_EmployeePosition",
        url_buscar_form: "/puestoempleados/FormNewEmployeePosition",
        url_buscar: "/puestoempleados",
        div_table: ".datatable-EmployeePosition",
        row_table: ".rowtable-EmployeePosition",
        cont_form: ".cont-form-EmployeePosition",
        btn_cancelar: '.btncancelar_new_EmployeePosition',
        id_principal: '#EmployeeIdPosition',
        url_guardar: "/puestoempleados/guardar",
        btn_abrir: '.open-employee-position',
        modal: '.modal-employee-Position',
        btn_cerrar: '.close-modal-EmployeePosition',
        class_name_delete: "listid_Position",
        form_delete: "#form-deleteEmployeePosition",
        class_check: ".select-EmployeePosition",
        url_eliminar: "/puestoempleados/eliminar",
        btn_nuevo: '.new-EmployeePosition'
    };
}
//Arreglo de funciones
const fn = {
    //Buscar informaciones de codigo de ganancia del empleado
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
                        fn.SearchEmployeeEarningCodeId(_idEmployee, $(this).find(".PositionIdtbl").html().trim());
                    });
                    $('.container-modal-scrolling').scrollTop(0);
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
    //Buscar codigo de canancia para editar
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
    //Save Employee earning code
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
        //fn.SearchListPosition();
        //Plugin de fecha
        InstaciateListener();
    }
    //SearchListPosition: function () {
    //    if ($("#PositionId")[0].children.length == 0) {
    //        $.ajax({
    //            url: "/puestoempleados/Buscarcodigospuestos",
    //            type: "Get",
    //            async: false,
    //            success: function (data) {
    //                if (data.length > 0) {
    //                    $("#PositionId").html('');
    //                    $(data).each(function () {
    //                        var option = $(document.createElement('option'));
    //                        option.text(this.PositionName);
    //                        option.val(this.PositionId);
    //                        $("#PositionId").append(option);
    //                    });
    //                }
    //            }, error: function (xhr) {
    //                redireccionaralLogin(xhr);
    //            }
    //        });
    //    }
    //}
};
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
            var contador = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(`${dom_element.class_check}[type=checkbox]`).each(function () {
                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", dom_element.class_name_delete);
                    input.attr("class", dom_element.class_name_delete);
                    input.val($(this).parent().parent().find(".PositionIdtbl").html().trim());
                    $(dom_element.form_delete).append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los puestos seleccionados?", "confirm", {
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
    //caducar puesto
    $("#Form-PositionExpire").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            windows_message("¿Desea caducar el puesto seleccionado?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $.ajax({
                        url: "/puestoempleados/caducar",
                        type: "POST",
                        data: $("#Form-PositionExpire").serialize(),
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                FormatErrors(data);
                            }
                            else {
                                fn.SearchEarningCode($('#EmployeeId').val().toString());
                                windows_message(data.Message, data.Type);
                                $("#Form-PositionExpire").addClass("collapse");
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                },
                onCancel: function () {
                    $(`${dom_element.class_check}[type=checkbox]`).prop('checked', false);
                    $("#Form-PositionExpire").addClass("collapse");
                }
            });
        }
    });
    //Mostrar formulario de caducar
    $("#expire-position").on("click", function () {
        var contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(`${dom_element.class_check}[type=checkbox]`).each(function () {
            if ($(this).is(":checked")) {
                contador++;
                $(".EmployeeIdExpire").val($('#EmployeeId').val().toString().trim());
                $(".PositionIdExpire").val($(this).parent().parent().find(".PositionIdtbl").html().trim());
            }
        });
        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
        }
        else {
            $("#Form-PositionExpire").removeClass("collapse");
        }
    });
    //Cerrar formulario de expiración
    $(".btncancelar_expireposition").on("click", function () {
        $("#Form-PositionExpire").addClass("collapse");
    });
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zaXRpb25FbXBsb3llZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1R5cGVTY3JpcHRGaWxlL0VtcGxveWVlcy9Qb3NpdGlvbkVtcGxveWVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFFSCxTQUFTLEVBQUUsQ0FBQztJQXFCUixJQUFJLFNBQVMsR0FBVyxDQUFDLENBQUM7SUFDMUIsSUFBSSxXQUFXLEdBQXNCO1FBQ2pDLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsZUFBZSxFQUFFLDBDQUEwQztRQUMzRCxVQUFVLEVBQUUsa0JBQWtCO1FBQzlCLFNBQVMsRUFBRSw2QkFBNkI7UUFDeEMsU0FBUyxFQUFFLDRCQUE0QjtRQUN2QyxTQUFTLEVBQUUsNkJBQTZCO1FBQ3hDLFlBQVksRUFBRSxtQ0FBbUM7UUFDakQsWUFBWSxFQUFFLHFCQUFxQjtRQUNuQyxXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLFNBQVMsRUFBRSx5QkFBeUI7UUFDcEMsS0FBSyxFQUFFLDBCQUEwQjtRQUNqQyxVQUFVLEVBQUUsK0JBQStCO1FBQzNDLGlCQUFpQixFQUFFLGlCQUFpQjtRQUNwQyxXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsWUFBWSxFQUFFLDJCQUEyQjtRQUN6QyxTQUFTLEVBQUUsdUJBQXVCO0tBQ3JDLENBQUE7QUFDTCxDQUFDO0FBRUQsc0JBQXNCO0FBQ3RCLE1BQU0sRUFBRSxHQUFHO0lBQ1AseURBQXlEO0lBQ3pELGlCQUFpQixFQUFFLFVBQVUsV0FBbUI7UUFDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxVQUFVLElBQUksV0FBVyxFQUFFO1lBQy9DLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFJO2dCQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcs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QUFPLEVBQUU7UUFDekMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZSBQb3NpdGlvbkVtcGxveWVlLnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBNw7NkdWxvIGRlIGdlc3Rpw7NuIGRlIHB1ZXN0b3MgcG9yIGVtcGxlYWRvLiBQZXJtaXRlIGFzaWduYXIsXHJcbiAqICAgICAgICAgICAgICBlZGl0YXIgeSBlbGltaW5hciBhc2lnbmFjaW9uZXMgZGUgcHVlc3RvcyBwYXJhIGNhZGEgZW1wbGVhZG8uXHJcbiAqIEBhdXRob3IgRXF1aXBvIGRlIERlc2Fycm9sbG9cclxuICogQGRhdGUgMjAyNVxyXG4gKiBAbW9kdWxlIFB1ZXN0b3NFbXBsZWFkb3NcclxuICovXHJcblxyXG52YXJpYWJsZXM6IHtcclxuICAgIGludGVyZmFjZSBJRG9tRWxlbWVudF9Nb2RhbCB7XHJcbiAgICAgICAgZm9ybTogc3RyaW5nXHJcbiAgICAgICAgdXJsX2J1c2Nhcl9mb3JtOiBzdHJpbmcgLy8gYnVzY2FyIGZvcm11bGFyaW9cclxuICAgICAgICB1cmxfYnVzY2FyOiBzdHJpbmcgLy8gYnVzY2FyIGxpc3RhXHJcbiAgICAgICAgdXJsX2d1YXJkYXI6IHN0cmluZyAvLyBndWFyZGFyXHJcbiAgICAgICAgdXJsX2VsaW1pbmFyOiBzdHJpbmcgLy9lbGltaW5hclxyXG4gICAgICAgIGRpdl90YWJsZTogc3RyaW5nIC8vRGl2IGRvbmRlIHZhIGxhIHRhYmxhIGNvbiBsYSBsaXN0YVxyXG4gICAgICAgIHJvd190YWJsZTogc3RyaW5nIC8vUGFyYSBlbCBldmVudG8gZG9ibGVjbGljayBhbCBlZGl0YXJcclxuICAgICAgICBjb250X2Zvcm06IHN0cmluZyAvL0NvbnRlbmVkb3IgZGVsIGZvcm11bGFyaW8gbnVldm8geSBlZGl0YXIgcXVlIHNlIG9jdWx0YVxyXG4gICAgICAgIGJ0bl9jYW5jZWxhcjogc3RyaW5nIC8vQm90w7NuIGRlIGNhbmNlbGFyXHJcbiAgICAgICAgaWRfcHJpbmNpcGFsOiBzdHJpbmcgLy9JZCBwcmluY2lwYWwgZGUgZW1wbGVhZG9cclxuICAgICAgICBidG5fYWJyaXI6IHN0cmluZyAvL0JvdMOzbiBkZSBhYnJpciBlbCBtb2RhbFxyXG4gICAgICAgIG1vZGFsOiBzdHJpbmcgLy9Nb2RhbFxyXG4gICAgICAgIGJ0bl9jZXJyYXI6IHN0cmluZyAvLyBib3RvbiBkZSBjZXJyYXIgbW9kYWxcclxuICAgICAgICBjbGFzc19uYW1lX2RlbGV0ZTogc3RyaW5nIC8vIG5vbWJyZSBkZSBsYSBjbGFzZSBwYXJhIGVsaW1pbmFyXHJcbiAgICAgICAgZm9ybV9kZWxldGU6IHN0cmluZyAvLyBmb3JtdWxhcmlvIHBhcmEgZWxpbWluYXIsXHJcbiAgICAgICAgY2xhc3NfY2hlY2s6IHN0cmluZyAvLyBDaGVja2JveHggZGUgbGEgdGFibGFcclxuICAgICAgICBidG5fbnVldm86IHN0cmluZyAvL0JvdMOzbiBkZSBudWV2b1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBvcGVyYXRpb246IG51bWJlciA9IDA7XHJcbiAgICB2YXIgZG9tX2VsZW1lbnQ6IElEb21FbGVtZW50X01vZGFsID0ge1xyXG4gICAgICAgIGZvcm06IFwiI25ld19FbXBsb3llZVBvc2l0aW9uXCIsXHJcbiAgICAgICAgdXJsX2J1c2Nhcl9mb3JtOiBcIi9wdWVzdG9lbXBsZWFkb3MvRm9ybU5ld0VtcGxveWVlUG9zaXRpb25cIixcclxuICAgICAgICB1cmxfYnVzY2FyOiBcIi9wdWVzdG9lbXBsZWFkb3NcIixcclxuICAgICAgICBkaXZfdGFibGU6IFwiLmRhdGF0YWJsZS1FbXBsb3llZVBvc2l0aW9uXCIsXHJcbiAgICAgICAgcm93X3RhYmxlOiBcIi5yb3d0YWJsZS1FbXBsb3llZVBvc2l0aW9uXCIsXHJcbiAgICAgICAgY29udF9mb3JtOiBcIi5jb250LWZvcm0tRW1wbG95ZWVQb3NpdGlvblwiLFxyXG4gICAgICAgIGJ0bl9jYW5jZWxhcjogJy5idG5jYW5jZWxhcl9uZXdfRW1wbG95ZWVQb3NpdGlvbicsXHJcbiAgICAgICAgaWRfcHJpbmNpcGFsOiAnI0VtcGxveWVlSWRQb3NpdGlvbicsXHJcbiAgICAgICAgdXJsX2d1YXJkYXI6IFwiL3B1ZXN0b2VtcGxlYWRvcy9ndWFyZGFyXCIsXHJcbiAgICAgICAgYnRuX2FicmlyOiAnLm9wZW4tZW1wbG95ZWUtcG9zaXRpb24nLFxyXG4gICAgICAgIG1vZGFsOiAnLm1vZGFsLWVtcGxveWVlLVBvc2l0aW9uJyxcclxuICAgICAgICBidG5fY2VycmFyOiAnLmNsb3NlLW1vZGFsLUVtcGxveWVlUG9zaXRpb24nLFxyXG4gICAgICAgIGNsYXNzX25hbWVfZGVsZXRlOiBcImxpc3RpZF9Qb3NpdGlvblwiLFxyXG4gICAgICAgIGZvcm1fZGVsZXRlOiBcIiNmb3JtLWRlbGV0ZUVtcGxveWVlUG9zaXRpb25cIixcclxuICAgICAgICBjbGFzc19jaGVjazogXCIuc2VsZWN0LUVtcGxveWVlUG9zaXRpb25cIixcclxuICAgICAgICB1cmxfZWxpbWluYXI6IFwiL3B1ZXN0b2VtcGxlYWRvcy9lbGltaW5hclwiLFxyXG4gICAgICAgIGJ0bl9udWV2bzogJy5uZXctRW1wbG95ZWVQb3NpdGlvbidcclxuICAgIH1cclxufVxyXG5cclxuLy9BcnJlZ2xvIGRlIGZ1bmNpb25lc1xyXG5jb25zdCBmbiA9IHtcclxuICAgIC8vQnVzY2FyIGluZm9ybWFjaW9uZXMgZGUgY29kaWdvIGRlIGdhbmFuY2lhIGRlbCBlbXBsZWFkb1xyXG4gICAgU2VhcmNoRWFybmluZ0NvZGU6IGZ1bmN0aW9uIChfaWRFbXBsb3llZTogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgJHtkb21fZWxlbWVudC51cmxfYnVzY2FyfS8ke19pZEVtcGxveWVlfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZGl2X3RhYmxlKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmRpdl90YWJsZSkuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LnJvd190YWJsZSkuZGJsY2xpY2soZnVuY3Rpb24gbXlmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld0FkcmVlc2xpJykudGV4dChcIkVkaXRhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hFbXBsb3llZUVhcm5pbmdDb2RlSWQoX2lkRW1wbG95ZWUsICQodGhpcykuZmluZChcIi5Qb3NpdGlvbklkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nJykuc2Nyb2xsVG9wKDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9CdXNjYXIgZm9ybXVsYXJpbyBkZSBudWV2byB5IGVkaXRhclxyXG4gICAgU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUZvcm06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9idXNjYXJfZm9ybSxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLlNob3dGb3JtKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL0J1c2NhciBjb2RpZ28gZGUgY2FuYW5jaWEgcGFyYSBlZGl0YXJcclxuICAgIFNlYXJjaEVtcGxveWVlRWFybmluZ0NvZGVJZDogZnVuY3Rpb24gKF9pZEVtcGxveWVlOiBzdHJpbmcsIF9pbnRlcm5hbElkOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAke2RvbV9lbGVtZW50LnVybF9idXNjYXJ9LyR7X2lkRW1wbG95ZWV9LyR7X2ludGVybmFsSWR9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TaG93Rm9ybShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vU2F2ZSBFbXBsb3llZSBlYXJuaW5nIGNvZGVcclxuICAgIFNhdmVFbXBsb3llZUVhcm5pbmdDb2RlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBkb21fZWxlbWVudC51cmxfZ3VhcmRhcixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6ICQoZG9tX2VsZW1lbnQuZm9ybSkuc2VyaWFsaXplKCkgKyBgJm9wZXJhdGlvbj0ke29wZXJhdGlvbn1gLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5idG5uZXdBZHJlZXNsaScpLnRleHQoXCJOdWV2b1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEVhcm5pbmdDb2RlKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRvbV9lbGVtZW50LmZvcm0pIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL01vc3RyYXIgeSBjb25maWd1cmFyIGVsIG51ZXZvIGZvcm11bGFyaW8gZW4gZWwgZG9tXHJcbiAgICBTaG93Rm9ybTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuaHRtbCgnJyk7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgLy9jZXJyYXIgZm9ybXVsYXJpbyBkZSBudWV2YSBkaXJlY2Npb25cclxuICAgICAgICAkKGRvbV9lbGVtZW50LmJ0bl9jYW5jZWxhcikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcuYnRubmV3QWRyZWVzbGknKS50ZXh0KFwiTnVldm9cIilcclxuICAgICAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9zYXZlIGNvbnRhY3QgaW5mbyBlbXBsb3llZVxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuZm9ybSkuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBTaWVtcHJlIHByZXZlbmlyIGVsIGVudsOtbyBuYXRpdm8gZGVsIGZvcm11bGFyaW9cclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBmbi5TYXZlRW1wbG95ZWVFYXJuaW5nQ29kZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb21fZWxlbWVudC5pZF9wcmluY2lwYWwpLnZhbCgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgLy9mbi5TZWFyY2hMaXN0UG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgLy9QbHVnaW4gZGUgZmVjaGFcclxuICAgICAgICBJbnN0YWNpYXRlTGlzdGVuZXIoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy9TZWFyY2hMaXN0UG9zaXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgIGlmICgkKFwiI1Bvc2l0aW9uSWRcIilbMF0uY2hpbGRyZW4ubGVuZ3RoID09IDApIHtcclxuICAgIC8vICAgICAgICAkLmFqYXgoe1xyXG4gICAgLy8gICAgICAgICAgICB1cmw6IFwiL3B1ZXN0b2VtcGxlYWRvcy9CdXNjYXJjb2RpZ29zcHVlc3Rvc1wiLFxyXG4gICAgLy8gICAgICAgICAgICB0eXBlOiBcIkdldFwiLFxyXG4gICAgLy8gICAgICAgICAgICBhc3luYzogZmFsc2UsXHJcbiAgICAvLyAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICQoXCIjUG9zaXRpb25JZFwiKS5odG1sKCcnKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAkKGRhdGEpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0KHRoaXMuUG9zaXRpb25OYW1lKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLlBvc2l0aW9uSWQpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1Bvc2l0aW9uSWRcIikuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgLy8gICAgICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgIH0pO1xyXG4gICAgLy8gICAgfVxyXG5cclxuICAgIC8vfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5lc2N1Y2hhZG9yZXM6IHtcclxuICAgIC8vQWJyaXIgaW5mb3JtYWNpw7NuIGNvZGlnbyBkZSBjYW5hbmNpYVxyXG4gICAgJChkb21fZWxlbWVudC5idG5fYWJyaXIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5TZWFyY2hFYXJuaW5nQ29kZSgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQubW9kYWwpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NlcnJhciBtb2RhbCBkZSBpbmZvcm1hY2nDs24gZGUgY29udGFjdG9cclxuICAgICQoZG9tX2VsZW1lbnQuYnRuX2NlcnJhcikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQubW9kYWwpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQWJyaXIgZm9ybXVsYXJpbyBkZSBudWV2b1xyXG4gICAgJChkb21fZWxlbWVudC5idG5fbnVldm8pLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcGVyYXRpb24gPSAxO1xyXG4gICAgICAgIGZuLlNlYXJjaEVtcGxveWVlRWFybmluZ0NvZGVGb3JtKCk7XHJcbiAgICAgICAgLy9GdW5jaW9uIHBhcmEgbW92ZXIgZWwgc2Nyb2xsLCBwYXJhIG1lam9yIGRpc2XDsW9cclxuICAgICAgICAkKCcuY29udGFpbmVyLW1vZGFsLXNjcm9sbGluZycpLnNjcm9sbFRvcCgwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vZWxpbWluYXIgaW5mb3JtYWNpb24gZGUgY29udGFjdG9cclxuICAgICQoZG9tX2VsZW1lbnQuZm9ybV9kZWxldGUpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gU2llbXByZSBwcmV2ZW5pciBlbCBlbnbDrW8gbmF0aXZvIGRlbCBmb3JtdWxhcmlvXHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgICAgICQoYCR7ZG9tX2VsZW1lbnQuY2xhc3NfY2hlY2t9W3R5cGU9Y2hlY2tib3hdYCkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIGRvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBvc2l0aW9uSWR0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5mb3JtX2RlbGV0ZSkuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBlbGltaW5hciBsb3MgcHVlc3RvcyBzZWxlY2Npb25hZG9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9lbGltaW5hcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChkb21fZWxlbWVudC5mb3JtX2RlbGV0ZSkuc2VyaWFsaXplKCkgKyBgJmVtcGxveWVlaWQ9JHskKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkudHJpbSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGAuJHtkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZX1gKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRWFybmluZ0NvZGUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGAuJHtkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZX1gKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoYCR7ZG9tX2VsZW1lbnQuY2xhc3NfY2hlY2t9W3R5cGU9Y2hlY2tib3hdYCkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1BhcmEgZGlzZcOxbywgc2Ugb2N1bHRhIGVsIGluZGljYWRvciBhbCBoYWNlciBzY3JvbGxcclxuICAgICQoXCIuY29udGFpbmVyLW1vZGFsLXNjcm9sbGluZ1wiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBwb3NpdGlvblNjcm9sbDogbnVtYmVyID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBpZiAocG9zaXRpb25TY3JvbGwgPiAwKVxyXG4gICAgICAgICAgICAkKCcuZm9yLWVtcGxveWVlLWNvbnRhY3RpbmZvJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkKCcuZm9yLWVtcGxveWVlLWNvbnRhY3RpbmZvJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9jYWR1Y2FyIHB1ZXN0b1xyXG4gICAgJChcIiNGb3JtLVBvc2l0aW9uRXhwaXJlXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gU2llbXByZSBwcmV2ZW5pciBlbCBlbnbDrW8gbmF0aXZvIGRlbCBmb3JtdWxhcmlvXHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGNhZHVjYXIgZWwgcHVlc3RvIHNlbGVjY2lvbmFkbz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3B1ZXN0b2VtcGxlYWRvcy9jYWR1Y2FyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0Zvcm0tUG9zaXRpb25FeHBpcmVcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hFYXJuaW5nQ29kZSgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNGb3JtLVBvc2l0aW9uRXhwaXJlXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChgJHtkb21fZWxlbWVudC5jbGFzc19jaGVja31bdHlwZT1jaGVja2JveF1gKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjRm9ybS1Qb3NpdGlvbkV4cGlyZVwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9Nb3N0cmFyIGZvcm11bGFyaW8gZGUgY2FkdWNhclxyXG4gICAgJChcIiNleHBpcmUtcG9zaXRpb25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICQoYCR7ZG9tX2VsZW1lbnQuY2xhc3NfY2hlY2t9W3R5cGU9Y2hlY2tib3hdYCkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIi5FbXBsb3llZUlkRXhwaXJlXCIpLnZhbCgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICQoXCIuUG9zaXRpb25JZEV4cGlyZVwiKS52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLlBvc2l0aW9uSWR0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yID09IDApIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBzb2xvIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJChcIiNGb3JtLVBvc2l0aW9uRXhwaXJlXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DZXJyYXIgZm9ybXVsYXJpbyBkZSBleHBpcmFjacOzblxyXG4gICAgJChcIi5idG5jYW5jZWxhcl9leHBpcmVwb3NpdGlvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiI0Zvcm0tUG9zaXRpb25FeHBpcmVcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgeyB9Il19