variables: {
    var option: number;

}

escuchadores: {
    //eliminar position
    $("#DeleteVacants").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            $(".selectPosition[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "IdPositionVacants");
                    input.attr("class", "IdPositionVacants");
                    input.val($(this).parent().parent().find(".PositionIdtblpos").html().trim());
                    $(".DeleteVacants").append(input);

                }

            });
        }
        if (!contador) {
            windows_message("Debe seleccionar un Registro!!", "error");

        }
        else {
            windows_message("¿Desea eliminar cargos seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                    $.ajax({
                        url: "/vacantes/eliminar",
                        type: "POST",
                        data: $("#DeleteVacants").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            $(".IdPositionVacants").remove();
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
                                        $('.tblCargosVcantes').replaceWith($('.tblCargosVcantes', newDom));
                                    });
                                windows_message(data.Message, data.Type);
                            }

                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }

                    });
                },
                onCancel: function () {
                    $(".selectPosition[type=checkbox]").prop('checked', false);
                    $(".IdPositionVacants").remove();

                }
            });

        }

    });

    //deshabilitar vacante
    $('#Diseblevacants').on('click', function () {
        if (!$(this).is(":checked")) {

            let contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPosition[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {

                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "PositionidVacant");
                    input.attr("class", "PositionidVacant");
                    input.val($(this).parent().parent().find(".PositionIdtblpos").html().trim());
                    $(".form-Diseblevacants").append(input);
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#Diseblevacants").prop('checked', true);
            }
            else {
                windows_message("¿Desea Inhabilitar vacante?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/vacantes/actualizarestatus",
                            type: "POST",
                            data: $("#form-Diseblevacants").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".PositionidVacant").remove();
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
                                            $('.tblCargosVcantes').replaceWith($('.tblCargosVcantes', newDom));
                                        });
                                    $("#Diseblevacants").prop('checked', true);
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".selectPosition[type=checkbox]").prop('checked', false);
                        $("#Diseblevacants").prop('checked', true);
                        $(".PositionidVacant").remove();

                    }
                });

            }
        }

    });

    //save vacants
    $("#createAndEditVacants").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            if ($('#NotifyPositionId').val() == $('#PositionId').val()) {
                windows_message("!El puesto al que notifica no puede ser el mismo al que esta editando!", "error");
                $('#NotifyPositionId').focus();

            } else {
                $.ajax({
                    url: "/vacantes/guardar",
                    type: "POST",
                    data: $(this).serialize() + `&operacion=${option}`,
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
                            $.get(location.href)
                                .done(function (r) {
                                    var newDom = $(r);
                                    $('.tblCargosVcantes').replaceWith($('.tblCargosVcantes', newDom));
                                });
                            let form = document.getElementById("createAndEditVacants") as HTMLFormElement;
                            form.reset();
                            funtionNewVacant("close");
                            windows_message(data.Message, data.Type);

                        }


                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }

        }
    });

    //Crear nueva vacante
    $('.NewVacants').on('click', function () {
        option = 1;
        let form = document.getElementById("createAndEditVacants") as HTMLFormElement;
        form.reset();
        $('.Showid').addClass('collapse');
        $('.setiartitulo').text('Nuevo puesto vacante');
        loadlistsSelect();
        funtionNewVacant("open");
    });

    //cerrar nueva vacante
    $('.OpCloseform').on('click', function () {

        funtionNewVacant("close");
    });

    //editar position
    $('.EditVacants').on('click', function () {

        let id: string;
        var contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectPosition[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                id = $(this).parent().parent().find(".PositionIdtblpos").html().trim();

            }

        });

        if (contador === 0) {
            windows_message("Debe seleccionar un Registro!!", "error");

        }
        else if (contador > 1) {

            windows_message("Debe seleccionar un solo Registro!!", "error");
        } else {
            $.ajax({

                url: `/vacantes/${id}`,
                type: "GET",
                async: true,
                success: function (data: IPosition) {
                    $('.progreso').modal('hide');
                    if (data != null) {
                        option = 2;
                        loadlistsSelect();
                        $('.Showid').removeClass('collapse');
                        $('.setiartitulo').text('Editar puesto');
                        AutomaticBinding(data, "#createAndEditVacants");
                        funtionNewVacant("open");

                    } else {
                        windows_message("No se encontró el cargo", "error");
                    }

                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }

            });
        }

    });

    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Vacants", "/vacantes/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Vacants", "/vacantes/FilterOrMoreData");

        }
    });

    //paginacion
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblCargosVcantes").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "vacantes", ".tbody-Table-Vacants");

            }
        }
    });

    // Habilitar doble clic en filas para editar
    enableRowDoubleClick(
        '.tbody-Table-Vacants',
        '.PositionIdtblpos',
        '/vacantes/{id}',
        function (data: IPosition) {
            option = 2;
            loadlistsSelect();
            AutomaticBinding(data, "#createAndEditVacants");
            $('.Showid').removeClass('collapse');
            $('.setiartitulo').text('Editar puesto vacante');
            funtionNewVacant("open");
        }
    );
}

funciones: {
    //funcion abrir nueva vacante
    function funtionNewVacant(_opcion) {
        if (_opcion == "open") {

            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');
        } else {
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
            $('.Showid').addClass('collapse');
        }
    }

    //cargar lista de select en formularios 
    function loadlistsSelect() {
        ListDeparment();
        ListJobs();
        ListPosition();
    }

    //funcion para editar position
    function EditVacants(Obj) {

        let id: string;
        var contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectPosition[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                id = $(this).parent().parent().find(".PositionIdtblpos").html().trim();

            }

        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un Registro!", "info");

        }
        else if (contador > 1) {

            windows_message("¡Debe seleccionar un solo Registro!", "info");
        } else {
            loadlistsSelect();
            var obj: IPosition = Obj.find(selected => selected.PositionId == id);
            option = 2;
            $('.Showid').removeClass('collapse');
            $('.setiartitulo').text('Editar puesto vacante');

            AutomaticBinding(obj, "#createAndEditVacants");
            funtionNewVacant("open");
        }

    }
}





