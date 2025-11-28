/**
 * @file ProjCategory.ts
 * @description Módulo de gestión de categorías de proyectos. Permite crear, editar,
 *              eliminar y administrar las categorías para clasificar proyectos.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module CategoriasProyectos
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

variables: {
    var page = 1;
    var isBusy: boolean = false;
    var option: number;
}

const fn = {

    //funcion abrir formulario
    funtionNewProjectCategory: function (option) {
        if (option == "open") {
            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');
        } else {
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
        }
    },

    SettingNewAndEdit: function (type: string) {
        if (type == "Edit") {
            option = 2;
            $('.TituloFormularios').text('Editar categoría de proyecto');
            $('.Showid').removeClass('collapse');
        }
        else {
            option = 1;
            $('.TituloFormularios').text('Nueva categoría de proyecto');
            $('.Showid').addClass('collapse');

            let form = document.getElementById("createAndEditProjectCategory") as HTMLFormElement;
            form.reset();
        }
    }
}

escuchadores: {

    //eliminar
    $("#delete-ProjectCategory").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
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

                            url: "/categoriaproyectoactivas/eliminar",
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

    //abrir nuevo
    $('.NewProjectCategory').on('click', function () {
        let form = document.getElementById('createAndEditProjectCategory') as HTMLFormElement;
        form.reset();
        option = 1;
        $('.Showid').addClass('collapse');
        fn.SettingNewAndEdit("New");
        fn.funtionNewProjectCategory("open");
    });

    // Variable para controlar si debe cerrar después de guardar
    var shouldCloseAfterSave = false;

    //save
    $("#createAndEditProjectCategory").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            $('.progreso').modal({ backdrop: 'static', keyboard: false })
            $.ajax({
                url: "/categoriaproyectoactivas/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
                async: true,
                success: function (data: ResponseUIGeneric) {
                    $('.progreso').modal('hide');
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
                        if (shouldCloseAfterSave) {
                            fn.funtionNewProjectCategory("close");
                            shouldCloseAfterSave = false;
                        }
                    }


                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });

    // Guardar y cerrar
    $('.btnSaveAndClose').on('click', function () {
        shouldCloseAfterSave = true;
        $("#createAndEditProjectCategory").submit();
    });

    //editar
    $('.EditProjectCategory').on('click', function () {

        let _id: string;
        var contador = 0;
        $(".select-ProjectCategory[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".ProjCategoryIdtbl").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");

        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "info");
        } else {
            $.ajax({

                url: `/categoriaproyectoactivas/${_id}`,
                type: "GET",
                async: true,
                success: function (data: IProjCategory) {
                    if (data != null) {
                        option = 2;
                        AutomaticBinding(data, "#createAndEditProjectCategory");

                        $('.Showid').removeClass('collapse');
                        fn.SettingNewAndEdit("Edit");
                        fn.funtionNewProjectCategory("open");
                    }

                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }

            });
        }

    });

    //cerrar nuevo
    $('.OpCloseform').on('click', function () {
        $('.Showid').addClass('collapse');
        fn.funtionNewProjectCategory("close");
    });

    //dehabilitar proyecto
    $('#Diseble-ProjectCategory').on('click', function () {
        if (!$(this).is(":checked")) {
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
                $("#Diseble-ProjectCategory").prop('checked', true);
            }
            else {
                windows_message("¿Desea inhabilitar las categorías seleccionadas?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/categoriaproyectoactivas/actualizarestatus",
                            type: "POST",
                            data: $("#updateStatus-ProjectCategory").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".IdCategory").remove();
                                $("#Diseble-ProjectCategory").prop('checked', true);
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
                        $("#Diseble-ProjectCategory").prop('checked', true);
                        $(".IdCategory").remove();
                    }
                });

            }
        }

    });

    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-ProjectCategory", "/categoriaproyectoactivas/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-ProjectCategory", "/categoriaproyectoactivas/FilterOrMoreData");

        }
    });

    //paginacion
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tbl-ProjectCategory").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "categoriaproyectoactivas", ".tbody-Table-ProjectCategory");

            }
        }
    });

    // Habilitar doble clic en filas para editar
    enableRowDoubleClick(
        '.tbody-Table-ProjectCategory',
        '.ProjCategoryIdtbl',
        '/categoriaproyectoactivas/{id}',
        function (data: IProjCategory) {
            option = 2;
            AutomaticBinding(data, "#createAndEditProjectCategory");
            $('.Showid').removeClass('collapse');
            fn.SettingNewAndEdit("Edit");
            fn.funtionNewProjectCategory("open");
        }
    );
}

// Inicializar modal de auditoría
initAuditListPage('.select-ProjectCategory', '.ProjCategoryIdtbl', '/categoriaproyectoactivas/getbyid', 'ProjCategoryId');

export { }