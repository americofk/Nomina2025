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
            if ($(this).valid()) {
                e.preventDefault();
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
        if ($(this).valid()) {
            e.preventDefault();
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
        if ($(this).valid()) {
            e.preventDefault();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zaXRpb25FbXBsb3llZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1R5cGVTY3JpcHRGaWxlL0VtcGxveWVlcy9Qb3NpdGlvbkVtcGxveWVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsRUFBRSxDQUFDO0lBcUJSLElBQUksU0FBUyxHQUFXLENBQUMsQ0FBQztJQUMxQixJQUFJLFdBQVcsR0FBc0I7UUFDakMsSUFBSSxFQUFFLHVCQUF1QjtRQUM3QixlQUFlLEVBQUUsMENBQTBDO1FBQzNELFVBQVUsRUFBRSxrQkFBa0I7UUFDOUIsU0FBUyxFQUFFLDZCQUE2QjtRQUN4QyxTQUFTLEVBQUUsNEJBQTRCO1FBQ3ZDLFNBQVMsRUFBRSw2QkFBNkI7UUFDeEMsWUFBWSxFQUFFLG1DQUFtQztRQUNqRCxZQUFZLEVBQUUscUJBQXFCO1FBQ25DLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsU0FBUyxFQUFFLHlCQUF5QjtRQUNwQyxLQUFLLEVBQUUsMEJBQTBCO1FBQ2pDLFVBQVUsRUFBRSwrQkFBK0I7UUFDM0MsaUJBQWlCLEVBQUUsaUJBQWlCO1FBQ3BDLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsV0FBVyxFQUFFLDBCQUEwQjtRQUN2QyxZQUFZLEVBQUUsMkJBQTJCO1FBQ3pDLFNBQVMsRUFBRSx1QkFBdUI7S0FDckMsQ0FBQTtBQUNMLENBQUM7QUFFRCxzQkFBc0I7QUFDdEIsTUFBTSxFQUFFLEdBQUc7SUFDUCx5REFBeUQ7SUFDekQsaUJBQWlCLEVBQUUsVUFBVSxXQUFtQjtRQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsR0FBRyxFQUFFLEdBQUcsV0FBVyxDQUFDLFVBQVUsSUFBSSxXQUFXLEVBQUU7WUFDL0MsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsSUFBSTtZQUNYLE9BQU8sRUFBRSxVQUFVLElBQUk7Z0JBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztv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QyxVQUFVLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXJpYWJsZXM6IHtcclxuICAgIGludGVyZmFjZSBJRG9tRWxlbWVudF9Nb2RhbCB7XHJcbiAgICAgICAgZm9ybTogc3RyaW5nXHJcbiAgICAgICAgdXJsX2J1c2Nhcl9mb3JtOiBzdHJpbmcgLy8gYnVzY2FyIGZvcm11bGFyaW9cclxuICAgICAgICB1cmxfYnVzY2FyOiBzdHJpbmcgLy8gYnVzY2FyIGxpc3RhXHJcbiAgICAgICAgdXJsX2d1YXJkYXI6IHN0cmluZyAvLyBndWFyZGFyXHJcbiAgICAgICAgdXJsX2VsaW1pbmFyOiBzdHJpbmcgLy9lbGltaW5hclxyXG4gICAgICAgIGRpdl90YWJsZTogc3RyaW5nIC8vRGl2IGRvbmRlIHZhIGxhIHRhYmxhIGNvbiBsYSBsaXN0YVxyXG4gICAgICAgIHJvd190YWJsZTogc3RyaW5nIC8vUGFyYSBlbCBldmVudG8gZG9ibGVjbGljayBhbCBlZGl0YXJcclxuICAgICAgICBjb250X2Zvcm06IHN0cmluZyAvL0NvbnRlbmVkb3IgZGVsIGZvcm11bGFyaW8gbnVldm8geSBlZGl0YXIgcXVlIHNlIG9jdWx0YVxyXG4gICAgICAgIGJ0bl9jYW5jZWxhcjogc3RyaW5nIC8vQm90w7NuIGRlIGNhbmNlbGFyXHJcbiAgICAgICAgaWRfcHJpbmNpcGFsOiBzdHJpbmcgLy9JZCBwcmluY2lwYWwgZGUgZW1wbGVhZG9cclxuICAgICAgICBidG5fYWJyaXI6IHN0cmluZyAvL0JvdMOzbiBkZSBhYnJpciBlbCBtb2RhbFxyXG4gICAgICAgIG1vZGFsOiBzdHJpbmcgLy9Nb2RhbFxyXG4gICAgICAgIGJ0bl9jZXJyYXI6IHN0cmluZyAvLyBib3RvbiBkZSBjZXJyYXIgbW9kYWxcclxuICAgICAgICBjbGFzc19uYW1lX2RlbGV0ZTogc3RyaW5nIC8vIG5vbWJyZSBkZSBsYSBjbGFzZSBwYXJhIGVsaW1pbmFyXHJcbiAgICAgICAgZm9ybV9kZWxldGU6IHN0cmluZyAvLyBmb3JtdWxhcmlvIHBhcmEgZWxpbWluYXIsXHJcbiAgICAgICAgY2xhc3NfY2hlY2s6IHN0cmluZyAvLyBDaGVja2JveHggZGUgbGEgdGFibGFcclxuICAgICAgICBidG5fbnVldm86IHN0cmluZyAvL0JvdMOzbiBkZSBudWV2b1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBvcGVyYXRpb246IG51bWJlciA9IDA7XHJcbiAgICB2YXIgZG9tX2VsZW1lbnQ6IElEb21FbGVtZW50X01vZGFsID0ge1xyXG4gICAgICAgIGZvcm06IFwiI25ld19FbXBsb3llZVBvc2l0aW9uXCIsXHJcbiAgICAgICAgdXJsX2J1c2Nhcl9mb3JtOiBcIi9wdWVzdG9lbXBsZWFkb3MvRm9ybU5ld0VtcGxveWVlUG9zaXRpb25cIixcclxuICAgICAgICB1cmxfYnVzY2FyOiBcIi9wdWVzdG9lbXBsZWFkb3NcIixcclxuICAgICAgICBkaXZfdGFibGU6IFwiLmRhdGF0YWJsZS1FbXBsb3llZVBvc2l0aW9uXCIsXHJcbiAgICAgICAgcm93X3RhYmxlOiBcIi5yb3d0YWJsZS1FbXBsb3llZVBvc2l0aW9uXCIsXHJcbiAgICAgICAgY29udF9mb3JtOiBcIi5jb250LWZvcm0tRW1wbG95ZWVQb3NpdGlvblwiLFxyXG4gICAgICAgIGJ0bl9jYW5jZWxhcjogJy5idG5jYW5jZWxhcl9uZXdfRW1wbG95ZWVQb3NpdGlvbicsXHJcbiAgICAgICAgaWRfcHJpbmNpcGFsOiAnI0VtcGxveWVlSWRQb3NpdGlvbicsXHJcbiAgICAgICAgdXJsX2d1YXJkYXI6IFwiL3B1ZXN0b2VtcGxlYWRvcy9ndWFyZGFyXCIsXHJcbiAgICAgICAgYnRuX2FicmlyOiAnLm9wZW4tZW1wbG95ZWUtcG9zaXRpb24nLFxyXG4gICAgICAgIG1vZGFsOiAnLm1vZGFsLWVtcGxveWVlLVBvc2l0aW9uJyxcclxuICAgICAgICBidG5fY2VycmFyOiAnLmNsb3NlLW1vZGFsLUVtcGxveWVlUG9zaXRpb24nLFxyXG4gICAgICAgIGNsYXNzX25hbWVfZGVsZXRlOiBcImxpc3RpZF9Qb3NpdGlvblwiLFxyXG4gICAgICAgIGZvcm1fZGVsZXRlOiBcIiNmb3JtLWRlbGV0ZUVtcGxveWVlUG9zaXRpb25cIixcclxuICAgICAgICBjbGFzc19jaGVjazogXCIuc2VsZWN0LUVtcGxveWVlUG9zaXRpb25cIixcclxuICAgICAgICB1cmxfZWxpbWluYXI6IFwiL3B1ZXN0b2VtcGxlYWRvcy9lbGltaW5hclwiLFxyXG4gICAgICAgIGJ0bl9udWV2bzogJy5uZXctRW1wbG95ZWVQb3NpdGlvbidcclxuICAgIH1cclxufVxyXG5cclxuLy9BcnJlZ2xvIGRlIGZ1bmNpb25lc1xyXG5jb25zdCBmbiA9IHtcclxuICAgIC8vQnVzY2FyIGluZm9ybWFjaW9uZXMgZGUgY29kaWdvIGRlIGdhbmFuY2lhIGRlbCBlbXBsZWFkb1xyXG4gICAgU2VhcmNoRWFybmluZ0NvZGU6IGZ1bmN0aW9uIChfaWRFbXBsb3llZTogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgJHtkb21fZWxlbWVudC51cmxfYnVzY2FyfS8ke19pZEVtcGxveWVlfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZGl2X3RhYmxlKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmRpdl90YWJsZSkuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LnJvd190YWJsZSkuZGJsY2xpY2soZnVuY3Rpb24gbXlmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld0FkcmVlc2xpJykudGV4dChcIkVkaXRhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hFbXBsb3llZUVhcm5pbmdDb2RlSWQoX2lkRW1wbG95ZWUsICQodGhpcykuZmluZChcIi5Qb3NpdGlvbklkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nJykuc2Nyb2xsVG9wKDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9CdXNjYXIgZm9ybXVsYXJpbyBkZSBudWV2byB5IGVkaXRhclxyXG4gICAgU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUZvcm06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9idXNjYXJfZm9ybSxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLlNob3dGb3JtKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL0J1c2NhciBjb2RpZ28gZGUgY2FuYW5jaWEgcGFyYSBlZGl0YXJcclxuICAgIFNlYXJjaEVtcGxveWVlRWFybmluZ0NvZGVJZDogZnVuY3Rpb24gKF9pZEVtcGxveWVlOiBzdHJpbmcsIF9pbnRlcm5hbElkOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAke2RvbV9lbGVtZW50LnVybF9idXNjYXJ9LyR7X2lkRW1wbG95ZWV9LyR7X2ludGVybmFsSWR9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TaG93Rm9ybShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vU2F2ZSBFbXBsb3llZSBlYXJuaW5nIGNvZGVcclxuICAgIFNhdmVFbXBsb3llZUVhcm5pbmdDb2RlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBkb21fZWxlbWVudC51cmxfZ3VhcmRhcixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6ICQoZG9tX2VsZW1lbnQuZm9ybSkuc2VyaWFsaXplKCkgKyBgJm9wZXJhdGlvbj0ke29wZXJhdGlvbn1gLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5idG5uZXdBZHJlZXNsaScpLnRleHQoXCJOdWV2b1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEVhcm5pbmdDb2RlKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRvbV9lbGVtZW50LmZvcm0pIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL01vc3RyYXIgeSBjb25maWd1cmFyIGVsIG51ZXZvIGZvcm11bGFyaW8gZW4gZWwgZG9tXHJcbiAgICBTaG93Rm9ybTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuaHRtbCgnJyk7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmFwcGVuZChkYXRhKTtcclxuXHJcbiAgICAgICAgLy9jZXJyYXIgZm9ybXVsYXJpbyBkZSBudWV2YSBkaXJlY2Npb25cclxuICAgICAgICAkKGRvbV9lbGVtZW50LmJ0bl9jYW5jZWxhcikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcuYnRubmV3QWRyZWVzbGknKS50ZXh0KFwiTnVldm9cIilcclxuICAgICAgICAgICAgJChkb21fZWxlbWVudC5jb250X2Zvcm0pLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9zYXZlIGNvbnRhY3QgaW5mbyBlbXBsb3llZVxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuZm9ybSkuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGZuLlNhdmVFbXBsb3llZUVhcm5pbmdDb2RlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvbV9lbGVtZW50LmlkX3ByaW5jaXBhbCkudmFsKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSlcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAvL2ZuLlNlYXJjaExpc3RQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICAvL1BsdWdpbiBkZSBmZWNoYVxyXG4gICAgICAgIEluc3RhY2lhdGVMaXN0ZW5lcigpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL1NlYXJjaExpc3RQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgaWYgKCQoXCIjUG9zaXRpb25JZFwiKVswXS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgLy8gICAgICAgICQuYWpheCh7XHJcbiAgICAvLyAgICAgICAgICAgIHVybDogXCIvcHVlc3RvZW1wbGVhZG9zL0J1c2NhcmNvZGlnb3NwdWVzdG9zXCIsXHJcbiAgICAvLyAgICAgICAgICAgIHR5cGU6IFwiR2V0XCIsXHJcbiAgICAvLyAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgJChcIiNQb3NpdGlvbklkXCIpLmh0bWwoJycpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5Qb3NpdGlvbk5hbWUpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKHRoaXMuUG9zaXRpb25JZCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjUG9zaXRpb25JZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAvLyAgICAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgfSk7XHJcbiAgICAvLyAgICB9XHJcblxyXG4gICAgLy99XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmVzY3VjaGFkb3Jlczoge1xyXG4gICAgLy9BYnJpciBpbmZvcm1hY2nDs24gY29kaWdvIGRlIGNhbmFuY2lhXHJcbiAgICAkKGRvbV9lbGVtZW50LmJ0bl9hYnJpcikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZuLlNlYXJjaEVhcm5pbmdDb2RlKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5tb2RhbCkubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ2VycmFyIG1vZGFsIGRlIGluZm9ybWFjacOzbiBkZSBjb250YWN0b1xyXG4gICAgJChkb21fZWxlbWVudC5idG5fY2VycmFyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChkb21fZWxlbWVudC5tb2RhbCkubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9BYnJpciBmb3JtdWxhcmlvIGRlIG51ZXZvXHJcbiAgICAkKGRvbV9lbGVtZW50LmJ0bl9udWV2bykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wZXJhdGlvbiA9IDE7XHJcbiAgICAgICAgZm4uU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUZvcm0oKTtcclxuICAgICAgICAvL0Z1bmNpb24gcGFyYSBtb3ZlciBlbCBzY3JvbGwsIHBhcmEgbWVqb3IgZGlzZcOxb1xyXG4gICAgICAgICQoJy5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nJykuc2Nyb2xsVG9wKDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9lbGltaW5hciBpbmZvcm1hY2lvbiBkZSBjb250YWN0b1xyXG4gICAgJChkb21fZWxlbWVudC5mb3JtX2RlbGV0ZSkuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgJChgJHtkb21fZWxlbWVudC5jbGFzc19jaGVja31bdHlwZT1jaGVja2JveF1gKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIGRvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuUG9zaXRpb25JZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmZvcm1fZGVsZXRlKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIGxvcyBwdWVzdG9zIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogZG9tX2VsZW1lbnQudXJsX2VsaW1pbmFyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKGRvbV9lbGVtZW50LmZvcm1fZGVsZXRlKS5zZXJpYWxpemUoKSArIGAmZW1wbG95ZWVpZD0keyQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKS50cmltKCl9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoYC4ke2RvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlfWApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hFYXJuaW5nQ29kZSgkKCcjRW1wbG95ZWVJZCcpLnZhbCgpLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoYC4ke2RvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlfWApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChgJHtkb21fZWxlbWVudC5jbGFzc19jaGVja31bdHlwZT1jaGVja2JveF1gKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGAuJHtkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZX1gKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vUGFyYSBkaXNlw7FvLCBzZSBvY3VsdGEgZWwgaW5kaWNhZG9yIGFsIGhhY2VyIHNjcm9sbFxyXG4gICAgJChcIi5jb250YWluZXItbW9kYWwtc2Nyb2xsaW5nXCIpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uU2Nyb2xsOiBudW1iZXIgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmIChwb3NpdGlvblNjcm9sbCA+IDApXHJcbiAgICAgICAgICAgICQoJy5mb3ItZW1wbG95ZWUtY29udGFjdGluZm8nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQoJy5mb3ItZW1wbG95ZWUtY29udGFjdGluZm8nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL2NhZHVjYXIgcHVlc3RvXHJcbiAgICAkKFwiI0Zvcm0tUG9zaXRpb25FeHBpcmVcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgY2FkdWNhciBlbCBwdWVzdG8gc2VsZWNjaW9uYWRvP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvcHVlc3RvZW1wbGVhZG9zL2NhZHVjYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjRm9ybS1Qb3NpdGlvbkV4cGlyZVwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEVhcm5pbmdDb2RlKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0Zvcm0tUG9zaXRpb25FeHBpcmVcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNGb3JtLVBvc2l0aW9uRXhwaXJlXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL01vc3RyYXIgZm9ybXVsYXJpbyBkZSBjYWR1Y2FyXHJcbiAgICAkKFwiI2V4cGlyZS1wb3NpdGlvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29udGFkb3I6IG51bWJlciA9IDA7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChgJHtkb21fZWxlbWVudC5jbGFzc19jaGVja31bdHlwZT1jaGVja2JveF1gKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLkVtcGxveWVlSWRFeHBpcmVcIikudmFsKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5Qb3NpdGlvbklkRXhwaXJlXCIpLnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuUG9zaXRpb25JZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY29udGFkb3IgPT0gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb250YWRvciA+IDEpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHNvbG8gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiI0Zvcm0tUG9zaXRpb25FeHBpcmVcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NlcnJhciBmb3JtdWxhcmlvIGRlIGV4cGlyYWNpw7NuXHJcbiAgICAkKFwiLmJ0bmNhbmNlbGFyX2V4cGlyZXBvc2l0aW9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIjRm9ybS1Qb3NpdGlvbkV4cGlyZVwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IH0iXX0=