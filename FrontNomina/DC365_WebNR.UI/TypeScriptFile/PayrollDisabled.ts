//habilitar nómina
$('#EnabledPayroll').on('click', function () {
    if ($(this).is(":checked")) {
        var ListId = [];
        var contador: boolean = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectPayroll[type=checkbox]").each(function () {

            if ($(this).is(":checked")) {
                contador = true
                let input = $(document.createElement('input'));
                input.attr("name", "payrollIdOp");
                input.attr("class", "payrollIdOp");
                input.val($(this).parent().parent().find(".PayrollIdtbl").html().trim());
                $(".EnabledPayrolls").append(input);

            }
        });

        if (!contador) {
            windows_message("¡Debe seleccionar un registro!", "error");
            $("#EnabledPayroll").prop('checked', false);
        }
        else {
            windows_message("¿Desea habilitar nóminas seleccionadas?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })
                    $.ajax({
                        url: "/nominasinactivas/actualizarestatus",
                        type: "POST",
                        data: $("#EnabledPayrolls").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            $(".payrollIdOp").remove();
                            if (data.Type == "error") {
                                var _errors: string = "";
                                data.Errors.forEach(function (x: string) {
                                    _errors += `${x}<br>`;
                                });
                                windows_message(_errors, data.Type);
                            } else {

                                $.get(location.href)
                                    .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblPayrolls').replaceWith($('.tblPayrolls', newDom));
                                    });
                                $("#EnabledPayroll").prop('checked', false);
                                windows_message(data.Message, data.Type);
                            }

                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                },
                onCancel: function () {
                    $(".selectPayroll[type=checkbox]").prop('checked', false);
                    $("#EnabledPayroll").prop('checked', false);
                    $(".payrollIdOp").remove();
                }
            });

        }
    }

});

$('.optionFilter').on('change', function () {
    optionFilterFunction(this);
    if ($('.textFilter').val() != "") {
        Datafilter(".tbody-Table-Payroll-Disabled", "/nominasinactivas/FilterOrMoreData");
    }
});

$('.textFilterMask').on('keyup', function (e) {
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
        textFilterMaskFunction(this);
        Datafilter(".tbody-Table-Payroll-Disabled", "/nominasinactivas/FilterOrMoreData");

    }
});

$("#content-scroll").scroll(function () {
    let currentscroll = $("#content-scroll").scrollTop();

    let maxscroll = $(".tblPayrolls").outerHeight(true) - $("#content-scroll").outerHeight(true);
    if (currentscroll == Math.round(maxscroll)) {
        if (!isBusy) {
            moredata(maxscroll, "nominasinactivas", ".tbody-Table-Payroll-Disabled");

        }
    }
});

//eliminar
$("#deletePayroll").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        var contador: boolean = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectPayroll[type=checkbox]").each(function () {

            if ($(this).is(":checked")) {
                contador = true
                let input = $(document.createElement('input'));
                input.attr("name", "IdPayroll");
                input.attr("class", "IdPayroll");
                input.val($(this).parent().parent().find(".PayrollIdtbl").html().trim());
                $(".deletePayroll").append(input);

            }

        });

        if (!contador) {
            windows_message("¡Debe seleccionar un registro!", "error");

        }
        else {
            windows_message("¿Desea eliminar los códigos de nómina seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                    $.ajax({

                        url: "/nomina/eliminar",
                        type: "POST",
                        data: $("#deletePayroll").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            $(".IdPayroll").remove();
                            if (data.Type == "error") {
                                var _errors: string = "";
                                data.Errors.forEach(function (x: string) {
                                    _errors += `${x}<br>`;
                                });
                                windows_message(_errors, data.Type);
                            } else {

                                $.get(location.href)
                                    .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblPayrolls').replaceWith($('.tblPayrolls', newDom));
                                    });
                                windows_message(data.Message, data.Type);
                            }

                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }

                    });
                },
                onCancel: function () {
                    $(".selectPayroll[type=checkbox]").prop('checked', false);
                    $(".IdPayroll").remove();

                }
            });

        }
    }
});

//cerrar nuevo
$('.close-payrolldisable').on('click', function () {
    window.location.href = "/nomina";
});

export { }