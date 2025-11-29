/**
 * @file LoansDisabled.ts
 * @description Módulo de gestión de préstamos inactivos. Permite eliminar,
 *              habilitar y listar préstamos que han sido deshabilitados.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module PrestamosInactivos
 */

esuchadores: {

    //Eliminar
    $("#DeleteLoan-disable").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectLoans-disable[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "listid_Loans");
                    input.attr("class", "listid_Loans");
                    input.val($(this).parent().parent().find(".LoanIdIdTbl").html().trim());
                    $("#DeleteLoan-disable").append(input);
                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los códigos de prestamos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/prestamosinactivos/eliminar",
                            type: "POST",
                            data: $("#DeleteLoan-disable").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".listid_Loans").remove();
                                if (data.Type == "error") {
                                    FormatErrors(data);
                                }
                                else {
                                    windows_message(data.Message, data.Type);
                                    fn.RefreshTable();
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectLoans-disable[type=checkbox]").prop('checked', false);
                        $(".listid_Loans").remove();
                    }
                });
            }
        }
    });

    //dehabilitar
    $('#DisabledLoan').on('click', function () {
        if ($(this).is(":checked")) {

            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectLoans-disable[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "listid_Loans");
                    input.attr("class", "listid_Loans");
                    input.val($(this).parent().parent().find(".LoanIdIdTbl").html().trim());
                    $(".updateStatusLoan-disable").append(input);

                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#DisabledLoan").prop('checked', false);
            }
            else {
                windows_message("¿Desea inhabilitar los prestamos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/prestamosinactivos/actualizarestatus",
                            type: "POST",
                            data: $("#updateStatusLoan-disable").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".listid_Loans").remove();
                                $("#DisabledLoan").prop('checked', false);
                                if (data.Type == "error") {
                                    var _errors: string = "";
                                    data.Errors.forEach(function (x: string) {
                                        _errors += `${x}<br>`;
                                    });
                                    windows_message(_errors, data.Type);
                                } else {

                                    fn.RefreshTable();
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectLoans-disable[type=checkbox]").prop('checked', false);
                        $("#DisabledLoan").prop('checked', false);
                        $(".listid_Loans").remove();

                    }
                });

            }
        }

    });

    $('.Loan-Enabled').on('click', function () {
        window.location.href = "/prestamos";

    });

    $('.close-loan-Disabled').on('click', function () {
        window.location.href = "/prestamos";

    });

    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Loans", "/prestamosinactivos/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Loans", "/prestamosinactivos/FilterOrMoreData");

        }
    });

    //paginacion
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblLoan-disable").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "prestamosinactivos", ".tbody-Table-Loans");

            }
        }
    });

}

//Funciones
const fn = {

    //Refrescar lista principal
    RefreshTable: function () {
        $.get(location.href)
            .done(function (r) {
                var newDom = $(r);
                $('.tblLoan-disable').replaceWith($('.tblLoan-disable', newDom));
            });
    },

}

export { }