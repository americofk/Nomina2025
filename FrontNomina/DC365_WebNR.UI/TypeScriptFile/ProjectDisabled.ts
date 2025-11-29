/**
 * @file ProjectDisabled.ts
 * @description Módulo de gestión de proyectos inactivos. Permite eliminar,
 *              habilitar y listar proyectos que han sido deshabilitados.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module ProyectosInactivos
 */

//eliminar
$("#delete-Project").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
        var contador: boolean = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".select-ProjId[type=checkbox]").each(function () {

            if ($(this).is(":checked")) {
                contador = true
                let input = $(document.createElement('input'));
                input.attr("name", "IdProject");
                input.attr("class", "IdProject");
                input.val($(this).parent().parent().find(".ProjIdtbl").html().trim());
                $(".delete-Project").append(input);

            }

        });

        if (!contador) {
            windows_message("¡Debe seleccionar un registro!", "error");

        }
        else {
            windows_message("¿Desea eliminar los códigos de proyectos seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                    $.ajax({

                        url: "/proyectosinactivos/eliminar",
                        type: "POST",
                        data: $("#delete-Project").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            $(".IdProject").remove();
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
                                        $('.tbl-Project').replaceWith($('.tbl-Project', newDom));
                                    });
                                windows_message(data.Message, data.Type);
                            }

                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }

                    });
                },
                onCancel: function () {
                    $(".select-ProjId[type=checkbox]").prop('checked', false);
                    $(".IdProject").remove();


                }
            });

        }
    }
});

//dehabilitar proyecto
$('#Enable-Project').on('click', function () {
    if ($(this).is(":checked")) {
        var contador: boolean = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".select-ProjId[type=checkbox]").each(function () {

            if ($(this).is(":checked")) {
                contador = true
                let input = $(document.createElement('input'));
                input.attr("name", "IdProject");
                input.attr("class", "IdProject");
                input.val($(this).parent().parent().find(".ProjIdtbl").html().trim());
                $(".updateStatus-Project").append(input);

            }
        });

        if (!contador) {
            windows_message("¡Debe seleccionar un registro!", "error");
            $("#Enable-Project").prop('checked', false);
        }
        else {
            windows_message("¿Desea habilitar los proyectos seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })
                    $.ajax({
                        url: "/proyectosinactivos/actualizarestatus",
                        type: "POST",
                        data: $("#updateStatus-Project").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            $(".IdProject").remove();
                            $("#Enable-Project").prop('checked', false);

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
                                        $('.tbl-Project').replaceWith($('.tbl-Project', newDom));
                                    });
                                windows_message(data.Message, data.Type);
                            }

                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                },
                onCancel: function () {
                    $(".select-ProjId[type=checkbox]").prop('checked', false);
                    $("#Enable-Project").prop('checked', false);
                    $(".IdProject").remove();

                }
            });

        }
    }

});

$('.optionFilter').on('change', function () {
    optionFilterFunction(this);
    if ($('.textFilter').val() != "") {
        Datafilter(".tbody-Table-Project-Disabled", "/proyectosinactivos/FilterOrMoreData");
    }
});

$('.textFilterMask').on('keyup', function (e) {
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
        textFilterMaskFunction(this);
        Datafilter(".tbody-Table-Project-Disabled", "/proyectosinactivos/FilterOrMoreData");

    }
});

//paginacion
$("#content-scroll").scroll(function () {
    let currentscroll = $("#content-scroll").scrollTop();

    let maxscroll = $(".tbl-Project").outerHeight(true) - $("#content-scroll").outerHeight(true);
    if (currentscroll == Math.round(maxscroll)) {
        if (!isBusy) {
            moredata(maxscroll, "proyectosinactivos", ".tbody-Table-Project-Disabled");

        }
    }
});

export { }