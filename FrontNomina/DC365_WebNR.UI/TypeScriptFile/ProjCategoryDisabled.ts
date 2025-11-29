/**
 * @file ProjCategoryDisabled.ts
 * @description Módulo de gestión de categorías de proyectos inactivas. Permite eliminar,
 *              habilitar y listar categorías que han sido deshabilitadas.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module CategoriasProyectosInactivas
 */

$(document).ready(function () {
    //tabla customers
    $(".Buscador-ProjectCategory").keyup(function () {
        var _this = this;
        // Show only matching TR, hide rest of them
        $.each($(".tbl-ProjectCategory tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toString().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });

});

//eliminar
$("#delete-ProjectCategory").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
        var contador: boolean = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".select-ProjectCategory[type=checkbox]").each(function () {

            if ($(this).is(":checked")) {
                contador = true
                let input = $(document.createElement('input'));
                input.attr("name", "IdCategory");
                input.attr("class", "IdCategory");
                input.val($(this).parent().parent().find(".ProjCategoryIdtbl").html().trim());
                $(".delete-ProjectCategory").append(input);

            }

        });

        if (!contador) {
            windows_message("¡Debe seleccionar un registro!", "error");

        }
        else {
            windows_message("¿Desea eliminar las categorías de proyectos seleccionadas?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                    $.ajax({

                        url: "/categoriaproyectoinactivas/eliminar",
                        type: "POST",
                        data: $("#delete-ProjectCategory").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            $(".IdCategory").remove();
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
                                        $('.tbl-ProjectCategory').replaceWith($('.tbl-ProjectCategory', newDom));
                                    });
                                windows_message(data.Message, data.Type);
                            }

                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }

                    });
                },
                onCancel: function () {
                    $(".select-ProjectCategory[type=checkbox]").prop('checked', false);
                    $(".IdCategory").remove();



                }
            });

        }
    }
});

//habilitar categoria de proyecto
$('#Enable-ProjectCategory').on('click', function () {
    if ($(this).is(":checked")) {
        var contador: boolean = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".select-ProjectCategory[type=checkbox]").each(function () {

            if ($(this).is(":checked")) {
                contador = true
                let input = $(document.createElement('input'));
                input.attr("name", "IdCategory");
                input.attr("class", "IdCategory");
                input.val($(this).parent().parent().find(".ProjCategoryIdtbl").html().trim());
                $(".updateStatus-ProjectCategory").append(input);

            }
        });

        if (!contador) {
            windows_message("¡Debe seleccionar un registro!", "error");
            $("#Enable-ProjectCategory").prop('checked', false);
        }
        else {
            windows_message("¿Desea habilitar las categorías seleccionadas?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })
                    $.ajax({
                        url: "/categoriaproyectoinactivas/actualizarestatus",
                        type: "POST",
                        data: $("#updateStatus-ProjectCategory").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            $(".IdCategory").remove();
                            $("#Enable-ProjectCategory").prop('checked', false);
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
                                        $('.tbl-ProjectCategory').replaceWith($('.tbl-ProjectCategory', newDom));
                                    });
                                windows_message(data.Message, data.Type);
                            }

                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                },
                onCancel: function () {
                    $(".select-ProjectCategory[type=checkbox]").prop('checked', false);
                    $("#Enable-ProjectCategory").prop('checked', false);
                    $(".IdCategory").remove();
                }
            });

        }
    }

});

$('.optionFilter').on('change', function () {
    optionFilterFunction(this);
    if ($('.textFilter').val() != "") {
        Datafilter(".tbody-Table-ProjectCategory-Disabled", "/categoriaproyectoinactivas/FilterOrMoreData");
    }
});

$('.textFilterMask').on('keyup', function (e) {
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
        textFilterMaskFunction(this);
        Datafilter(".tbody-Table-ProjectCategory-Disabled", "/categoriaproyectoinactivas/FilterOrMoreData");
    }
});

//paginacion
$("#content-scroll").scroll(function () {
    let currentscroll = $("#content-scroll").scrollTop();

    let maxscroll = $(".tbl-ProjectCategory").outerHeight(true) - $("#content-scroll").outerHeight(true);
    if (currentscroll == Math.round(maxscroll)) {
        if (!isBusy) {
            moredata(maxscroll, "categoriaproyectoinactivas", ".tbody-Table-ProjectCategory-Disabled");

        }
    }
});

export { }