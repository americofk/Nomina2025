/**
 * @file Project.ts
 * @description Módulo de gestión de proyectos. Permite crear, editar,
 *              eliminar y administrar proyectos para asignación de costos.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Proyectos
 */

$(document).ready(function () {
    //tabla customers
    $(".Buscador-Project").keyup(function () {
        var _this = this;
        // Show only matching TR, hide rest of them
        $.each($(".tbl-Project tbody tr"), function () {
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
    funtionNewProject: function (option) {
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

    SettingNewAndEdit: function (type: string){
        if (type == "Edit") {
            option = 2;
            $('.TituloFormularios').text('Editar proyecto');
            $('.Showid').removeClass('collapse');
        }
        else {
            option = 1;
            $('.TituloFormularios').text('Nuevo proyecto');
            $('.Showid').addClass('collapse');

            let form = document.getElementById("createAndEditProject") as HTMLFormElement;
            form.reset();
        }
    }
}
escuchadores: {
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

                            url: "/proyectosactivos/eliminar",
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

    //abrir nuevo
    $('.NewProject').on('click', function () {
        let form = document.getElementById('createAndEditProject') as HTMLFormElement;
        form.reset();
        option = 1;
        $('.Showid').addClass('collapse');
        fn.SettingNewAndEdit("New");
        fn.funtionNewProject("open");
    });

    // Variable para controlar si debe cerrar después de guardar
    var shouldCloseAfterSave = false;

    //save
    $("#createAndEditProject").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            $('.progreso').modal({ backdrop: 'static', keyboard: false })
            $.ajax({
                url: "/proyectosactivos/guardar",
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
                                $('.tbl-Project').replaceWith($('.tbl-Project', newDom));
                            });
                        windows_message(data.Message, data.Type);

                        // Si era creacion y se devolvio el ID, cambiar a modo edicion
                        if (option === 1 && data.IdType) {
                            $('#ProjId').val(data.IdType);
                            option = 2;
                            $('.Showid').removeClass('collapse');
                            $('.seteartitulo').text('Editar proyecto');
                        }

                        if (shouldCloseAfterSave) {
                            fn.funtionNewProject("close");
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
        $("#createAndEditProject").submit();
    });

    //editar
    $('.EditProject').on('click', function () {

        let _id: string;
        var contador = 0;
        $(".select-ProjId[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".ProjIdtbl").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");

        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "info");
        } else{
            $.ajax({

                url: `/proyectosactivos/${_id}`,
                type: "GET",
                async: true,
                success: function (data: IProject) {
                    if (data != null) {
                        option = 2;
                        AutomaticBinding(data, "#createAndEditProject");
                       
                        $('.Showid').removeClass('collapse');
                  
                        fn.SettingNewAndEdit("Edit");
                        fn.funtionNewProject("open");
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
        fn.funtionNewProject("close");
    });

    //dehabilitar proyecto
    $('#Diseble-Project').on('click', function () {
        if (!$(this).is(":checked")) {
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
                $("#Diseble-Project").prop('checked', true);
            }
            else {
                windows_message("¿Desea inhabilitar los proyectos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/proyectosactivos/actualizarestatus",
                            type: "POST",
                            data: $("#updateStatus-Project").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".IdProject").remove();
                                $("#Diseble-Project").prop('checked', true);
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
                        $("#Diseble-Project").prop('checked', true);
                        $(".IdProject").remove();

                    }
                });

            }
        }

    });


    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Project", "/proyectosactivos/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Project", "/proyectosactivos/FilterOrMoreData");

        }
    });

    //paginacion
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tbl-Project").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "proyectosactivos", ".tbody-Table-Project");

            }
        }
    });

    // Habilitar doble clic en filas para editar
    enableRowDoubleClick(
        '.tbody-Table-Project',
        '.ProjIdtbl',
        '/proyectosactivos/{id}',
        function (data: IProject) {
            option = 2;
            AutomaticBinding(data, "#createAndEditProject");
            $('.Showid').removeClass('collapse');
            fn.SettingNewAndEdit("Edit");
            fn.funtionNewProject("open");
        }
    );
}

// Inicializar modal de auditoría
initAuditListPage('.select-ProjId', '.ProjIdtbl', '/proyectosactivos/getbyid', 'ProjId');

export { }