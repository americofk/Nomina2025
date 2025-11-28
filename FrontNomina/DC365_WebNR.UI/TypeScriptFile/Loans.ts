/**
 * @file Loans.ts
 * @description Módulo de gestión de préstamos. Permite crear, editar,
 *              eliminar y administrar préstamos a empleados.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Prestamos
 */

variables: {

    var option: number;
}

//Funciones
const fn = {
    //Formulario de nuevo y editar
    SearchFormNewAndEdit: function (_id: string = "", viewmode: string = "new") {
        let url: string

        if (_id == "")
            url = `/prestamos/ObtenerFormNuevo`;
        else
            url = `/prestamos/ObtenerFormNuevo?loanid=${_id}`;

        $.ajax({
            url: url,

            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    fn.ShowForm(data, viewmode);
                    fn.OpenCloseNewAndEdit("open");
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    /*
    * Método para mostrar el formulario, 
    * contiene el event para cerrar el formulario y guardar la data
    */
    ShowForm: function (data, viewmode: string) {

        $("#ContNewAndEditLoan").html('');
        $("#ContNewAndEditLoan").append(data);

        //cerrar formulario de nuevo y editar
        $(".OpCloseform").on('click', function () {
            $("#ContNewAndEditLoan").addClass("collapse");
            fn.OpenCloseNewAndEdit("close");
        });

        //guardar información
        $("#FormNewAndEditLoan").submit(function (e) {
            if ($(this).valid()) {
                e.preventDefault();
                $.ajax({
                    url: "/prestamos/guardar",
                    type: "POST",
                    data: $(this).serialize() + `&operation=${option}`,
                    async: true,
                    success: function (data: ResponseUI) {
                        $('.progreso').modal('hide');
                        if (data.Type == "error") {
                            FormatErrors(data);
                        }
                        else {
                            windows_message(data.Message, data.Type);
                            fn.OpenCloseNewAndEdit("close");

                            //Refrescamos la tabla con la información guardada
                            fn.RefreshTable();
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        });

        //Mostrar contenedor
        $("#ContNewAndEditLoan").removeClass("collapse");
        fn.SettingNewAndEdit(viewmode);

        InstaciateListener();
    },

    //Refrescar lista principal
    RefreshTable: function () {
        $.get(location.href)
            .done(function (r) {
                var newDom = $(r);
                $('.tblLoan').replaceWith($('.tblLoan', newDom));
            });
    },

    //Opciones del formulario si es nuevo o editar
    SettingNewAndEdit: function (viewmode: string) {
        if (viewmode == "new") {
            option = 1;
            $(".Showid").addClass("collapse");
        }
        else {
            option = 2;
            $(".Showid").removeClass("collapse");
        }
    },

    //funcion abrir nuevo formulario
    OpenCloseNewAndEdit: function (_opcion) {
        if (_opcion == "open") {
            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');

        } else {
            $('.contendorRolandCompaies').addClass('collapse');
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
        }
    },

    

}

esuchadores: {
    $(".NewLoan").on("click", function () {
        fn.SearchFormNewAndEdit();
    });

    $(".EditLoan").on("click", function () {
        let _id: string;
        var contador = 0;
        $(".selectLoans[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".LoanIdIdTbl").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }

        else if (contador > 1) {
            windows_message("¡Debe seleccionar un registro!", "info");
        }
        else {
            fn.SearchFormNewAndEdit(_id, "edit");
        }
    });

    //Eliminar
    $("#DeleteLoan").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectLoans[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "listid_Loans");
                    input.attr("class", "listid_Loans");
                    input.val($(this).parent().parent().find(".LoanIdIdTbl").html().trim());
                    $("#DeleteLoan").append(input);
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
                            url: "/prestamos/eliminar",
                            type: "POST",
                            data: $("#DeleteLoan").serialize(),
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
                        $(".selectLoans[type=checkbox]").prop('checked', false);
                        $(".listid_Loans").remove();
                    }
                });
            }
        }
    });

    //dehabilitar
    $('#DisebleLoan').on('click', function () {
        if (!$(this).is(":checked")) {

            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectLoans[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "listid_Loans");
                    input.attr("class", "listid_Loans");
                    input.val($(this).parent().parent().find(".LoanIdIdTbl").html().trim());
                    $(".updateStatusLoan").append(input);

                }
            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#DisebleLoan").prop('checked', true);
            }
            else {
                windows_message("¿Desea inhabilitar los prestamos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/prestamos/actualizarestatus",
                            type: "POST",
                            data: $("#updateStatusLoan").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".listid_Loans").remove();
                                $("#DisebleLoan").prop('checked', true);
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
                        $(".selectLoans[type=checkbox]").prop('checked', false);
                        $("#DisebleLoan").prop('checked', true);
                        $(".listid_Loans").remove();

                    }
                });

            }
        }

    });

    $('.Loan-Disabled').on('click', function () {
        window.location.href = "/prestamosinactivos";

    });

    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Loans", "/prestamos/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Loans", "/prestamos/FilterOrMoreData");

        }
    });

    //paginacion
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblLoan").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "prestamos", ".tbody-Table-Loans");

            }
        }
    });

    // Habilitar doble clic en filas para editar
    $(document).on('dblclick', '.tbody-Table-Loans .row-app', function (e) {
        if ($(e.target).is('input[type="checkbox"]') || $(e.target).is('label')) {
            return;
        }
        const rowId = $(this).find('.LoanIdIdTbl').text().trim();
        if (!rowId) { return; }
        fn.SearchFormNewAndEdit(rowId, "edit");
    });

    // Aplicar estilo clickable a las filas
    $('.tbody-Table-Loans .row-app').addClass('row-clickable');
}

initAuditListPage('.selectLoans', '.LoanIdIdTbl', '/prestamos/getbyid', 'loanid');

export { }