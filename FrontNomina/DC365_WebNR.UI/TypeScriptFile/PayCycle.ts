/**
 * @file PayCycle.ts
 * @description Módulo de gestión de ciclos de pago. Permite crear, editar
 *              y administrar los períodos de pago de la nómina.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module CiclosPago
 */

escuchadores: {

    //save PayCycle
    $("#SavePayCycle").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            $('.progreso').modal({ backdrop: 'static', keyboard: false })
            $('.PayrollIdPayCycle').val($('.PayrollId').val().toString());
            $.ajax({
                url: "/ciclopagos/guardar",
                type: "POST",
                data: $(this).serialize(),
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
                        fn.SearchListPayCycle($('.PayrollId').val().toString());
                

                    }


                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });

    //eliminar
    $("#deletePayCycle").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPayCycle[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "IdPayCycle");
                    input.attr("class", "IdPayCycle");
                    input.val($(this).parent().parent().find(".PayCycleIdtbl").html().trim());
                    $(".deletePayCycle").append(input);
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los ciclos de pagos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/ciclopagos/eliminar",
                            type: "POST",
                            data: $("#deletePayCycle").serialize() + `&_PayrollId=${$('.PayrollId').val().toString().trim()}`,
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".IdPayCycle").remove();
                                if (data.Type == "error") {
                                    var _errors: string = "";
                                    data.Errors.forEach(function (x: string) {
                                        _errors += `${x}<br>`;
                                    });
                                    windows_message(_errors, data.Type);
                                } else {
                                    fn.SearchListPayCycle($('.PayrollId').val().toString());
                                    page = 1;
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".selectPayCycle[type=checkbox]").prop('checked', false);
                        $(".IdPayCycle").remove();

                    }
                });

            }
        }
    });



}

//Arreglo de funciones
const fn = {

    //Buscar lista de cliclos de pago
    SearchListPayCycle: function (_payrollId: string) {
        $.ajax({
            url: `ciclopagos/${_payrollId}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    if (data.length > 0) {
                        $(".tbodyTableCyclePay").html('');
                        $(".tbodyTableCyclePay").append(data);

                        //Marcar como impuesto
                        $(".isfortax").on('click', function () {
                            $(".PayrollIdTax").val($("#PayrollId").val().toString());
                            $(".PayCycleIdTax").val($(this).parent().parent().parent().find(".PayCycleIdtbl").html().trim());                            
                            $(".IsForTaxTax").prop("checked", $(this).is(":checked"));
                            $(".IsForTaxTax").val($(this).is(":checked").toString());

                            let that = $(this);
                            $('.progreso').modal({ backdrop: 'static', keyboard: false })
                            $.ajax({
                                url: "/ciclopagos/marcarimpuesto",
                                type: "POST",
                                data: $("#FormMarkIsForTax").serialize(),
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

                        //Marcar como tss
                        $(".isfortss").on('click', function () {
                            $(".PayrollIdTss").val($("#PayrollId").val().toString());
                            $(".PayCycleIdTss").val($(this).parent().parent().parent().find(".PayCycleIdtbl").html().trim());
                            $(".IsForTss").prop("checked", $(this).is(":checked"));
                            $(".IsForTss").val($(this).is(":checked").toString());

                            let that = $(this);
                            $('.progreso').modal({ backdrop: 'static', keyboard: false })
                            $.ajax({
                                url: "/ciclopagos/marcartss",
                                type: "POST",
                                data: $("#FormMarkIsForTss").serialize(),
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
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
}

export { }