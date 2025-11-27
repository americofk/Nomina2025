/**
 * @file EmployeeHistories.ts
 * @description Módulo de gestión de historial de empleados. Permite visualizar
 *              y administrar el historial de cambios y movimientos del empleado.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module HistorialEmpleados
 */

escuchadores: {
    //eliminar historial
    $("#Delete-employee-history").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            var _EmployeeID: string;
            let cont: number = 0;

            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".select-employeehistory[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", `listid[${cont}].EmployeeHistoryId`);
                    input.attr("class", "listid");
                    input.val($(this).parent().parent().find(".EmployeeHistoryIdTbl").html().trim());
                    _EmployeeID = $(this).parent().parent().find(".Employee-historyidtbl").html().trim();
                    $("#Delete-employee-history").append(input);
                    cont++;
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");

            }
            else {
                windows_message("¿Desea eliminar el historial seleccionado?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/historialempleado/eliminar",
                            type: "POST",
                            data: $("#Delete-employee-history").serialize() + `&employeeid=${_EmployeeID}`,
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                if (data.Type == "error") {
                                    var _errors: string = "";
                                    data.Errors.forEach(function (x: string) {
                                        _errors += `${x}<br>`;
                                    });
                                    $(".listid").remove();
                                    windows_message(_errors, data.Type);
                                } else {

                                    $(".listid").remove();
                                    $.get(location.href)
                                        .done(function (r) {
                                            var newDom = $(r);
                                            $('.tbl-history-employee').replaceWith($('.tbl-history-employee', newDom));
                                        });
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".select-employeehistory[type=checkbox]").prop('checked', false);
                        $(".listid").remove();
                    }
                });

            }
        }
    });

    //Mostrar formulario para actualizar
    $(".Edit-employee-history").on("click", function () {
        var contador: number = 0;
        let id: string;
        let idemployee: string;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $('.select-employeehistory[type=checkbox]').each(function () {
            if ($(this).is(":checked")) {
                contador++;

                id = $(this).parent().parent().find(".EmployeeHistoryIdTbl").html().trim();
                idemployee = $(this).parent().parent().find(".Employee-historyidtbl").html().trim();
            }
        });

        if (contador == 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        } else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
        }
        else {
            fn.FuntionUdateDate(".conteiner-update-date", id, idemployee);
        }
    });

    //Marcar para DGT
    $(".isforDGT").on('click', function () {
        
        $(".EmployeeHistoryId").val($(this).parent().parent().parent().find(".EmployeeHistoryIdTbl").html().trim());
        $(".IsUseDGT").prop('checked', $(this).is(":checked"));
        $(".IsUseDGT").val($(this).is(":checked").toString());

        let that = $(this);
        $('.progreso').modal({ backdrop: 'static', keyboard: false })
        $.ajax({
            url: "/historialempleado/marcarparadgt",
            type: "POST",
            data: $("#FormMarkIsForDgt").serialize(),
            async: true,
            success: function (data: ResponseUI) {
                $('.progreso').modal('hide');
                if (data.Type == "error") {
                    FormatErrors(data);
                    let mark = that.is(":checked");
                    that.prop("checked", !mark);
                } else {
                    windows_message(data.Message, data.Type);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    });
}

const fn = {
    FuntionUdateDate: function (call: string, id:string ,idemploye: string,) {
        $.ajax({
            url: 'historialempleado/FormUpdateEmployeeHistory',
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(call).html('');
                    $(call).append(data);
                    $(call).removeClass("collapse");
               
                    $("#Update-history-employee").submit(function (e) {
                        if ($(this).valid()) {
                            e.preventDefault();
                            windows_message("¿Desea actualizar el historial seleccionado?", "confirm", {
                                onOk: function () {
                                    $('.progreso').modal({ backdrop: 'static', keyboard: false })
                                    $.ajax({
                                        url: "/historialempleado/UpdateEmployeeHistory",
                                        type: "POST",
                                        data: $("#Update-history-employee").serialize() + `&employeeid=${idemploye}`,

                                        async: true,
                                        success: function (data: ResponseUI) {
                                            $('.progreso').modal('hide');
                                            if (data.Type == "error") {
                                                FormatErrors(data);
                                            } else {
                                                windows_message(data.Message, data.Type);
                                                $(call).addClass("collapse");
                                                $.get(location.href)
                                                    .done(function (r) {
                                                        var newDom = $(r);
                                                        $('.tbl-history-employee').replaceWith($('.tbl-history-employee', newDom));
                                                    });
                                            }
                                        }, error: function (xhr) {
                                            redireccionaralLogin(xhr);
                                        }

                                    });
                                },
                                onCancel: function () {

                                }
                            });
                        }
                    });


                    $(".btncancelar-Update-history-employee").on("click", function () {
                        $(call).addClass("collapse");
                    });

                    $(".EmployeeHistoryId-update").val(id);

                    //Plugin de fecha
                    InstaciateListener();
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
}

export { }