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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zaXRpb25FbXBsb3llZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1R5cGVTY3JpcHRGaWxlL0VtcGxveWVlcy9Qb3NpdGlvbkVtcGxveWVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFFSCxTQUFTLEVBQUUsQ0FBQztJQXFCUixJQUFJLFNBQVMsR0FBVyxDQUFDLENBQUM7SUFDMUIsSUFBSSxXQUFXLEdBQXNCO1FBQ2pDLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsZUFBZSxFQUFFLDBDQUEwQztRQUMzRCxVQUFVLEVBQUUsa0JBQWtCO1FBQzlCLFNBQVMsRUFBRSw2QkFBNkI7UUFDeEMsU0FBUyxFQUFFLDRCQUE0QjtRQUN2QyxTQUFTLEVBQUUsNkJBQTZCO1FBQ3hDLFlBQVksRUFBRSxtQ0FBbUM7UUFDakQsWUFBWSxFQUFFLHFCQUFxQjtRQUNuQyxXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLFNBQVMsRUFBRSx5QkFBeUI7UUFDcEMsS0FBSyxFQUFFLDBCQUEwQjtRQUNqQyxVQUFVLEVBQUUsK0JBQStCO1FBQzNDLGlCQUFpQixFQUFFLGlCQUFpQjtRQUNwQyxXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsWUFBWSxFQUFFLDJCQUEyQjtRQUN6QyxTQUFTLEVBQUUsdUJBQXVCO0tBQ3JDLENBQUE7QUFDTCxDQUFDO0FBRUQsc0JBQXNCO0FBQ3RCLE1BQU0sRUFBRSxHQUFHO0lBQ1AseURBQXlEO0lBQ3pELGlCQUFpQixFQUFFLFVBQVUsV0FBbUI7UUFDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxVQUFVLElBQUksV0FBVyxFQUFFO1lBQy9DLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFJO2dCQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2xCLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNsQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFdEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxVQUFVO3dCQUNqRCxTQUFTLEdBQUcsQ0FBQyxDQUFDO3dCQUNkLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTt3QkFDbkMsRUFBRSxDQUFDLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDOUYsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVqRCxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLDZCQUE2QixFQUFFO1FBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsV0FBVyxDQUFDLGVBQWU7WUFDaEMsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxVQUFVLElBQUk7Z0JBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDbEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsQ0FBQztZQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHO2dCQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHVDQUF1QztJQUN2QywyQkFBMkIsRUFBRSxVQUFVLFdBQW1CLEVBQUUsV0FBbUI7UUFDM0UsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxVQUFVLElBQUksV0FBVyxJQUFJLFdBQVcsRUFBRTtZQUM5RCxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJO1lBQ1gsT0FBTyxFQUFFLFVBQVUsSUFBSTtnQkFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQ2xCLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHO2dCQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDRCQUE0QjtJQUM1Qix1QkFBdUIsRUFBRTtRQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsR0FBRyxFQUFFLFdBQVcsQ0FBQyxXQUFXO1lBQzVCLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsY0FBYyxTQUFTLEVBQUU7WUFDakUsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVSxJQUFnQjtnQkFDL0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO29CQUN2QixJQUFJLE9BQU8sR0FBVyxFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBUzt3QkFDbkMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUM7b0JBQzFCLENBQUMsQ0FBQyxDQUFDO29CQUNILGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO3FCQUFNLENBQUM7b0JBQ0osQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUNsQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ3hELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBb0IsQ0FBQztvQkFDdkUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNiLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5QyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdDLENBQUM7WUFHTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztnQkFDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxvREFBb0Q7SUFDcEQsUUFBUSxFQUFFLFVBQVUsSUFBSTtRQUNwQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QyxzQ0FBc0M7UUFDdEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1lBQ3BDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNsQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNILDRCQUE0QjtRQUM1QixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDbEMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNuQixFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBQTtZQUNoQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUNsRSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCwwQkFBMEI7UUFFMUIsaUJBQWlCO1FBQ2pCLGtCQUFrQixFQUFFLENBQUM7SUFFekIsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxxREFBcUQ7SUFDckQsa0JBQWtCO0lBQ2xCLDJEQUEyRDtJQUMzRCwwQkFBMEI7SUFDMUIsMkJBQTJCO0lBQzNCLHdDQUF3QztJQUV4Qyx3Q0FBd0M7SUFDeEMsZ0RBQWdEO0lBQ2hELGdEQUFnRDtJQUNoRCwyRUFBMkU7SUFDM0UseURBQXlEO0lBQ3pELHNEQUFzRDtJQUN0RCwwREFBMEQ7SUFDMUQseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQix3Q0FBd0M7SUFDeEMsNENBQTRDO0lBQzVDLGVBQWU7SUFFZixhQUFhO0lBQ2IsT0FBTztJQUVQLEdBQUc7Q0FDTixDQUFBO0FBS0QsWUFBWSxFQUFFLENBQUM7SUFDWCxzQ0FBc0M7SUFDdEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ2pDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQyxDQUFDLENBQUM7SUFFSCx5Q0FBeUM7SUFDekMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ2xDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBRUgsMkJBQTJCO0lBQzNCLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUNqQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsRUFBRSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFDbkMsaURBQWlEO1FBQ2pELENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztJQUVILGtDQUFrQztJQUNsQyxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDekMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUNsQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsSUFBSSxRQUFRLEdBQVksS0FBSyxDQUFDO1lBQzlCLHdFQUF3RTtZQUN4RSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsV0FBVyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDaEQsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ3pCLFFBQVEsR0FBRyxJQUFJLENBQUE7b0JBQ2YsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDL0MsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQ2xELEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUNuRCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUMxRSxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDN0MsQ0FBQztZQUVMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNaLGVBQWUsQ0FBQyxnQ0FBZ0MsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMvRCxDQUFDO2lCQUNJLENBQUM7Z0JBQ0YsZUFBZSxDQUFDLDRDQUE0QyxFQUFFLFNBQVMsRUFBRTtvQkFDckUsSUFBSSxFQUFFO3dCQUNGLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO3dCQUU3RCxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUVILEdBQUcsRUFBRSxXQUFXLENBQUMsWUFBWTs0QkFDN0IsSUFBSSxFQUFFLE1BQU07NEJBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBQ3hHLEtBQUssRUFBRSxJQUFJOzRCQUNYLE9BQU8sRUFBRSxVQUFVLElBQWdCO2dDQUMvQixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFLENBQUM7b0NBQ3ZCLElBQUksT0FBTyxHQUFXLEVBQUUsQ0FBQztvQ0FDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFTO3dDQUNuQyxPQUFPLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQztvQ0FDMUIsQ0FBQyxDQUFDLENBQUM7b0NBQ0gsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDaEQsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3hDLENBQUM7cUNBQU0sQ0FBQztvQ0FDSixFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7b0NBQ3ZELENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7b0NBQ2hELGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDN0MsQ0FBQzs0QkFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRztnQ0FDbkIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzlCLENBQUM7eUJBRUosQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBQ0QsUUFBUSxFQUFFO3dCQUNOLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDdEUsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDcEQsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgscURBQXFEO0lBQ3JELENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLGNBQWMsR0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakQsSUFBSSxjQUFjLEdBQUcsQ0FBQztZQUNsQixDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7O1lBRXBELENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvRCxDQUFDLENBQUMsQ0FBQztJQUdILGdCQUFnQjtJQUNoQixDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLGVBQWUsQ0FBQyx3Q0FBd0MsRUFBRSxTQUFTLEVBQUU7Z0JBQ2pFLElBQUksRUFBRTtvQkFDRixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtvQkFFN0QsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFFSCxHQUFHLEVBQUUsMEJBQTBCO3dCQUMvQixJQUFJLEVBQUUsTUFBTTt3QkFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsU0FBUyxFQUFFO3dCQUMzQyxLQUFLLEVBQUUsSUFBSTt3QkFDWCxPQUFPLEVBQUUsVUFBVSxJQUFnQjs0QkFDL0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO2dDQUN2QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3ZCLENBQUM7aUNBQU0sQ0FBQztnQ0FDSixFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7Z0NBRXZELGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDekMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUNuRCxDQUFDO3dCQUNMLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHOzRCQUNuQixvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDOUIsQ0FBQztxQkFFSixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFDRCxRQUFRLEVBQUU7b0JBQ04sQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLFdBQVcsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN0RSxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ25ELENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFHSCwrQkFBK0I7SUFDL0IsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUM5QixJQUFJLFFBQVEsR0FBVyxDQUFDLENBQUM7UUFDekIsd0VBQXdFO1FBQ3hFLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2hELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN6QixRQUFRLEVBQUUsQ0FBQztnQkFFWCxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3JFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMvRixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNoQixlQUFlLENBQUMsZ0NBQWdDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0QsQ0FBQzthQUFNLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3RCLGVBQWUsQ0FBQyxxQ0FBcUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwRSxDQUFDO2FBQ0ksQ0FBQztZQUNGLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxpQ0FBaUM7SUFDakMsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUN6QyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIFBvc2l0aW9uRW1wbG95ZWUudHNcclxuICogQGRlc2NyaXB0aW9uIE3Ds2R1bG8gZGUgZ2VzdGnDs24gZGUgcHVlc3RvcyBwb3IgZW1wbGVhZG8uIFBlcm1pdGUgYXNpZ25hcixcclxuICogICAgICAgICAgICAgIGVkaXRhciB5IGVsaW1pbmFyIGFzaWduYWNpb25lcyBkZSBwdWVzdG9zIHBhcmEgY2FkYSBlbXBsZWFkby5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgUHVlc3Rvc0VtcGxlYWRvc1xyXG4gKi9cclxuXHJcbnZhcmlhYmxlczoge1xyXG4gICAgaW50ZXJmYWNlIElEb21FbGVtZW50X01vZGFsIHtcclxuICAgICAgICBmb3JtOiBzdHJpbmdcclxuICAgICAgICB1cmxfYnVzY2FyX2Zvcm06IHN0cmluZyAvLyBidXNjYXIgZm9ybXVsYXJpb1xyXG4gICAgICAgIHVybF9idXNjYXI6IHN0cmluZyAvLyBidXNjYXIgbGlzdGFcclxuICAgICAgICB1cmxfZ3VhcmRhcjogc3RyaW5nIC8vIGd1YXJkYXJcclxuICAgICAgICB1cmxfZWxpbWluYXI6IHN0cmluZyAvL2VsaW1pbmFyXHJcbiAgICAgICAgZGl2X3RhYmxlOiBzdHJpbmcgLy9EaXYgZG9uZGUgdmEgbGEgdGFibGEgY29uIGxhIGxpc3RhXHJcbiAgICAgICAgcm93X3RhYmxlOiBzdHJpbmcgLy9QYXJhIGVsIGV2ZW50byBkb2JsZWNsaWNrIGFsIGVkaXRhclxyXG4gICAgICAgIGNvbnRfZm9ybTogc3RyaW5nIC8vQ29udGVuZWRvciBkZWwgZm9ybXVsYXJpbyBudWV2byB5IGVkaXRhciBxdWUgc2Ugb2N1bHRhXHJcbiAgICAgICAgYnRuX2NhbmNlbGFyOiBzdHJpbmcgLy9Cb3TDs24gZGUgY2FuY2VsYXJcclxuICAgICAgICBpZF9wcmluY2lwYWw6IHN0cmluZyAvL0lkIHByaW5jaXBhbCBkZSBlbXBsZWFkb1xyXG4gICAgICAgIGJ0bl9hYnJpcjogc3RyaW5nIC8vQm90w7NuIGRlIGFicmlyIGVsIG1vZGFsXHJcbiAgICAgICAgbW9kYWw6IHN0cmluZyAvL01vZGFsXHJcbiAgICAgICAgYnRuX2NlcnJhcjogc3RyaW5nIC8vIGJvdG9uIGRlIGNlcnJhciBtb2RhbFxyXG4gICAgICAgIGNsYXNzX25hbWVfZGVsZXRlOiBzdHJpbmcgLy8gbm9tYnJlIGRlIGxhIGNsYXNlIHBhcmEgZWxpbWluYXJcclxuICAgICAgICBmb3JtX2RlbGV0ZTogc3RyaW5nIC8vIGZvcm11bGFyaW8gcGFyYSBlbGltaW5hcixcclxuICAgICAgICBjbGFzc19jaGVjazogc3RyaW5nIC8vIENoZWNrYm94eCBkZSBsYSB0YWJsYVxyXG4gICAgICAgIGJ0bl9udWV2bzogc3RyaW5nIC8vQm90w7NuIGRlIG51ZXZvXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9wZXJhdGlvbjogbnVtYmVyID0gMDtcclxuICAgIHZhciBkb21fZWxlbWVudDogSURvbUVsZW1lbnRfTW9kYWwgPSB7XHJcbiAgICAgICAgZm9ybTogXCIjbmV3X0VtcGxveWVlUG9zaXRpb25cIixcclxuICAgICAgICB1cmxfYnVzY2FyX2Zvcm06IFwiL3B1ZXN0b2VtcGxlYWRvcy9Gb3JtTmV3RW1wbG95ZWVQb3NpdGlvblwiLFxyXG4gICAgICAgIHVybF9idXNjYXI6IFwiL3B1ZXN0b2VtcGxlYWRvc1wiLFxyXG4gICAgICAgIGRpdl90YWJsZTogXCIuZGF0YXRhYmxlLUVtcGxveWVlUG9zaXRpb25cIixcclxuICAgICAgICByb3dfdGFibGU6IFwiLnJvd3RhYmxlLUVtcGxveWVlUG9zaXRpb25cIixcclxuICAgICAgICBjb250X2Zvcm06IFwiLmNvbnQtZm9ybS1FbXBsb3llZVBvc2l0aW9uXCIsXHJcbiAgICAgICAgYnRuX2NhbmNlbGFyOiAnLmJ0bmNhbmNlbGFyX25ld19FbXBsb3llZVBvc2l0aW9uJyxcclxuICAgICAgICBpZF9wcmluY2lwYWw6ICcjRW1wbG95ZWVJZFBvc2l0aW9uJyxcclxuICAgICAgICB1cmxfZ3VhcmRhcjogXCIvcHVlc3RvZW1wbGVhZG9zL2d1YXJkYXJcIixcclxuICAgICAgICBidG5fYWJyaXI6ICcub3Blbi1lbXBsb3llZS1wb3NpdGlvbicsXHJcbiAgICAgICAgbW9kYWw6ICcubW9kYWwtZW1wbG95ZWUtUG9zaXRpb24nLFxyXG4gICAgICAgIGJ0bl9jZXJyYXI6ICcuY2xvc2UtbW9kYWwtRW1wbG95ZWVQb3NpdGlvbicsXHJcbiAgICAgICAgY2xhc3NfbmFtZV9kZWxldGU6IFwibGlzdGlkX1Bvc2l0aW9uXCIsXHJcbiAgICAgICAgZm9ybV9kZWxldGU6IFwiI2Zvcm0tZGVsZXRlRW1wbG95ZWVQb3NpdGlvblwiLFxyXG4gICAgICAgIGNsYXNzX2NoZWNrOiBcIi5zZWxlY3QtRW1wbG95ZWVQb3NpdGlvblwiLFxyXG4gICAgICAgIHVybF9lbGltaW5hcjogXCIvcHVlc3RvZW1wbGVhZG9zL2VsaW1pbmFyXCIsXHJcbiAgICAgICAgYnRuX251ZXZvOiAnLm5ldy1FbXBsb3llZVBvc2l0aW9uJ1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0FycmVnbG8gZGUgZnVuY2lvbmVzXHJcbmNvbnN0IGZuID0ge1xyXG4gICAgLy9CdXNjYXIgaW5mb3JtYWNpb25lcyBkZSBjb2RpZ28gZGUgZ2FuYW5jaWEgZGVsIGVtcGxlYWRvXHJcbiAgICBTZWFyY2hFYXJuaW5nQ29kZTogZnVuY3Rpb24gKF9pZEVtcGxveWVlOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAke2RvbV9lbGVtZW50LnVybF9idXNjYXJ9LyR7X2lkRW1wbG95ZWV9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkb21fZWxlbWVudC5kaXZfdGFibGUpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZGl2X3RhYmxlKS5hcHBlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQucm93X3RhYmxlKS5kYmxjbGljayhmdW5jdGlvbiBteWZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb24gPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuYnRubmV3QWRyZWVzbGknKS50ZXh0KFwiRWRpdGFyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEVtcGxveWVlRWFybmluZ0NvZGVJZChfaWRFbXBsb3llZSwgJCh0aGlzKS5maW5kKFwiLlBvc2l0aW9uSWR0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnRhaW5lci1tb2RhbC1zY3JvbGxpbmcnKS5zY3JvbGxUb3AoMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL0J1c2NhciBmb3JtdWxhcmlvIGRlIG51ZXZvIHkgZWRpdGFyXHJcbiAgICBTZWFyY2hFbXBsb3llZUVhcm5pbmdDb2RlRm9ybTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZG9tX2VsZW1lbnQudXJsX2J1c2Nhcl9mb3JtLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogZmFsc2UsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4uU2hvd0Zvcm0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vQnVzY2FyIGNvZGlnbyBkZSBjYW5hbmNpYSBwYXJhIGVkaXRhclxyXG4gICAgU2VhcmNoRW1wbG95ZWVFYXJuaW5nQ29kZUlkOiBmdW5jdGlvbiAoX2lkRW1wbG95ZWU6IHN0cmluZywgX2ludGVybmFsSWQ6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYCR7ZG9tX2VsZW1lbnQudXJsX2J1c2Nhcn0vJHtfaWRFbXBsb3llZX0vJHtfaW50ZXJuYWxJZH1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNob3dGb3JtKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9TYXZlIEVtcGxveWVlIGVhcm5pbmcgY29kZVxyXG4gICAgU2F2ZUVtcGxveWVlRWFybmluZ0NvZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGRvbV9lbGVtZW50LnVybF9ndWFyZGFyLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogJChkb21fZWxlbWVudC5mb3JtKS5zZXJpYWxpemUoKSArIGAmb3BlcmF0aW9uPSR7b3BlcmF0aW9ufWAsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bm5ld0FkcmVlc2xpJykudGV4dChcIk51ZXZvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRWFybmluZ0NvZGUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZG9tX2VsZW1lbnQuZm9ybSkgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vTW9zdHJhciB5IGNvbmZpZ3VyYXIgZWwgbnVldm8gZm9ybXVsYXJpbyBlbiBlbCBkb21cclxuICAgIFNob3dGb3JtOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5odG1sKCcnKTtcclxuICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAvL2NlcnJhciBmb3JtdWxhcmlvIGRlIG51ZXZhIGRpcmVjY2lvblxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuYnRuX2NhbmNlbGFyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5idG5uZXdBZHJlZXNsaScpLnRleHQoXCJOdWV2b1wiKVxyXG4gICAgICAgICAgICAkKGRvbV9lbGVtZW50LmNvbnRfZm9ybSkuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3NhdmUgY29udGFjdCBpbmZvIGVtcGxveWVlXHJcbiAgICAgICAgJChkb21fZWxlbWVudC5mb3JtKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZm4uU2F2ZUVtcGxveWVlRWFybmluZ0NvZGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuaWRfcHJpbmNpcGFsKS52YWwoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKVxyXG4gICAgICAgICQoZG9tX2VsZW1lbnQuY29udF9mb3JtKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIC8vZm4uU2VhcmNoTGlzdFBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vUGx1Z2luIGRlIGZlY2hhXHJcbiAgICAgICAgSW5zdGFjaWF0ZUxpc3RlbmVyKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vU2VhcmNoTGlzdFBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICBpZiAoJChcIiNQb3NpdGlvbklkXCIpWzBdLmNoaWxkcmVuLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAvLyAgICAgICAgJC5hamF4KHtcclxuICAgIC8vICAgICAgICAgICAgdXJsOiBcIi9wdWVzdG9lbXBsZWFkb3MvQnVzY2FyY29kaWdvc3B1ZXN0b3NcIixcclxuICAgIC8vICAgICAgICAgICAgdHlwZTogXCJHZXRcIixcclxuICAgIC8vICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgLy8gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAkKFwiI1Bvc2l0aW9uSWRcIikuaHRtbCgnJyk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgJChkYXRhKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCh0aGlzLlBvc2l0aW9uTmFtZSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWwodGhpcy5Qb3NpdGlvbklkKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNQb3NpdGlvbklkXCIpLmFwcGVuZChvcHRpb24pO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgIC8vICAgICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICB9KTtcclxuICAgIC8vICAgIH1cclxuXHJcbiAgICAvL31cclxufVxyXG5cclxuXHJcblxyXG5cclxuZXNjdWNoYWRvcmVzOiB7XHJcbiAgICAvL0FicmlyIGluZm9ybWFjacOzbiBjb2RpZ28gZGUgY2FuYW5jaWFcclxuICAgICQoZG9tX2VsZW1lbnQuYnRuX2FicmlyKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm4uU2VhcmNoRWFybmluZ0NvZGUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAkKGRvbV9lbGVtZW50Lm1vZGFsKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DZXJyYXIgbW9kYWwgZGUgaW5mb3JtYWNpw7NuIGRlIGNvbnRhY3RvXHJcbiAgICAkKGRvbV9lbGVtZW50LmJ0bl9jZXJyYXIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKGRvbV9lbGVtZW50Lm1vZGFsKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0FicmlyIGZvcm11bGFyaW8gZGUgbnVldm9cclxuICAgICQoZG9tX2VsZW1lbnQuYnRuX251ZXZvKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgb3BlcmF0aW9uID0gMTtcclxuICAgICAgICBmbi5TZWFyY2hFbXBsb3llZUVhcm5pbmdDb2RlRm9ybSgpO1xyXG4gICAgICAgIC8vRnVuY2lvbiBwYXJhIG1vdmVyIGVsIHNjcm9sbCwgcGFyYSBtZWpvciBkaXNlw7FvXHJcbiAgICAgICAgJCgnLmNvbnRhaW5lci1tb2RhbC1zY3JvbGxpbmcnKS5zY3JvbGxUb3AoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2VsaW1pbmFyIGluZm9ybWFjaW9uIGRlIGNvbnRhY3RvXHJcbiAgICAkKGRvbV9lbGVtZW50LmZvcm1fZGVsZXRlKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBkb21fZWxlbWVudC5jbGFzc19uYW1lX2RlbGV0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5Qb3NpdGlvbklkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9tX2VsZW1lbnQuZm9ybV9kZWxldGUpLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgbG9zIHB1ZXN0b3Mgc2VsZWNjaW9uYWRvcz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBkb21fZWxlbWVudC51cmxfZWxpbWluYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoZG9tX2VsZW1lbnQuZm9ybV9kZWxldGUpLnNlcmlhbGl6ZSgpICsgYCZlbXBsb3llZWlkPSR7JCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpLnRyaW0oKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEVhcm5pbmdDb2RlKCQoJyNFbXBsb3llZUlkJykudmFsKCkudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChgLiR7ZG9tX2VsZW1lbnQuY2xhc3NfbmFtZV9kZWxldGV9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoYC4ke2RvbV9lbGVtZW50LmNsYXNzX25hbWVfZGVsZXRlfWApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9QYXJhIGRpc2XDsW8sIHNlIG9jdWx0YSBlbCBpbmRpY2Fkb3IgYWwgaGFjZXIgc2Nyb2xsXHJcbiAgICAkKFwiLmNvbnRhaW5lci1tb2RhbC1zY3JvbGxpbmdcIikuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgcG9zaXRpb25TY3JvbGw6IG51bWJlciA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uU2Nyb2xsID4gMClcclxuICAgICAgICAgICAgJCgnLmZvci1lbXBsb3llZS1jb250YWN0aW5mbycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJCgnLmZvci1lbXBsb3llZS1jb250YWN0aW5mbycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vY2FkdWNhciBwdWVzdG9cclxuICAgICQoXCIjRm9ybS1Qb3NpdGlvbkV4cGlyZVwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBjYWR1Y2FyIGVsIHB1ZXN0byBzZWxlY2Npb25hZG8/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9wdWVzdG9lbXBsZWFkb3MvY2FkdWNhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNGb3JtLVBvc2l0aW9uRXhwaXJlXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoRWFybmluZ0NvZGUoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRm9ybS1Qb3NpdGlvbkV4cGlyZVwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoYCR7ZG9tX2VsZW1lbnQuY2xhc3NfY2hlY2t9W3R5cGU9Y2hlY2tib3hdYCkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0Zvcm0tUG9zaXRpb25FeHBpcmVcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vTW9zdHJhciBmb3JtdWxhcmlvIGRlIGNhZHVjYXJcclxuICAgICQoXCIjZXhwaXJlLXBvc2l0aW9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb250YWRvcjogbnVtYmVyID0gMDtcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKGAke2RvbV9lbGVtZW50LmNsYXNzX2NoZWNrfVt0eXBlPWNoZWNrYm94XWApLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG5cclxuICAgICAgICAgICAgICAgICQoXCIuRW1wbG95ZWVJZEV4cGlyZVwiKS52YWwoJCgnI0VtcGxveWVlSWQnKS52YWwoKS50b1N0cmluZygpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLlBvc2l0aW9uSWRFeHBpcmVcIikudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5Qb3NpdGlvbklkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciA9PSAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gc29sbyByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQoXCIjRm9ybS1Qb3NpdGlvbkV4cGlyZVwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ2VycmFyIGZvcm11bGFyaW8gZGUgZXhwaXJhY2nDs25cclxuICAgICQoXCIuYnRuY2FuY2VsYXJfZXhwaXJlcG9zaXRpb25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNGb3JtLVBvc2l0aW9uRXhwaXJlXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IHsgfSJdfQ==