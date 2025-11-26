variables: {
    var option: number;
}

escuchadores: {
    //eliminar cargo
    $("#DeleteJobsDisabled").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;

            $(".selectJobs[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "IdJobsDisabled");
                    input.attr("class", "IdJobsDisabled");
                    input.val($(this).parent().parent().find(".JobIdtblpos").html().trim());
                    $(".DeleteJobsDisabled").append(input);

                }

            });
            if (!contador) {
                windows_message("Debe seleccionar un Registro!!", "error");

            }
            else {
                windows_message("¿Desea eliminar los cargos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({
                            url: "/cargosinactivos/eliminar",
                            type: "POST",
                            data: $("#DeleteJobsDisabled").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".IdJobsDisabled").remove();
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
                                            $('.tblCargosActivos').replaceWith($('.tblCargosActivos', newDom));
                                        });
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".selectJobs[type=checkbox]").prop('checked', false);
                        $(".IdJobsDisabled").remove();

                    }
                });

            }
        }
        
    });

    //habilitar cargo
    $('#jobEnabled').on('click', function () {
        if ($(this).is(":checked")) {

            let contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectJobs[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "JobIdpos");
                    input.attr("class", "JobIdpos");
                    input.val($(this).parent().parent().find(".JobIdtblpos").html().trim());
                    $(".form-Enebledjob").append(input);
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#jobEnabled").prop('checked', false);
            }
            else {
                windows_message("¿Desea habilitar los cargos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/cargosinactivos/actualizarestatus",
                            type: "POST",
                            data: $("#form-Enebledjob").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".JobIdpos").remove();

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
                                            $('.tblCargosActivos').replaceWith($('.tblCargosActivos', newDom));
                                        });
                                    windows_message(data.Message, data.Type);
                                }
                                $("#jobEnabled").prop('checked', false);
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectJobs[type=checkbox]").prop('checked', false);
                        $("#jobEnabled").prop('checked', false);
                        $(".JobIdpos").remove();

                    }
                });

            }
        }

    });

    //cerrar departamentos inhabilitados
    $('.Cerrar-JobsDisebled').on('click', function () {
        window.location.href = "/cargosactivos";
    });

    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-jobdisabled", "/cargosinactivos/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-jobdisabled", "/cargosinactivos/FilterOrMoreData");

        }
    });

    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblCargosActivos").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "cargosinactivos", ".tbody-Table-jobdisabled");

            }
        }
    });

    // Habilitar doble clic en filas para editar
    enableRowDoubleClick(
        '.tbody-Table-jobdisabled',
        '.JobIdtblpos',
        '/cargosactivos/{id}',
        function (data: IJob) {
            option = 2;
            AutomaticBinding(data, "#createAndEditJobs");
            $('.Showid').removeClass('collapse');
            $('.seteartitulo').text('Editar cargo');
            funtionNewJob("open");
        }
    );
}
