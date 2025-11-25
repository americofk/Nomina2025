variables: {
    var option: number;
}



escuchadores: {


    //eliminar position
    $("#DeletePosition").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            $(".selectPosition[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "IdPosition");
                    input.attr("class", "IdPosition");
                    input.val($(this).parent().parent().find(".PositionIdtblpos").html().trim());
                    $(".DeletePosition").append(input);

                }

            });
        }
        if (!contador) {
            windows_message("!Debe seleccionar un registro!", "error");

        }
        else {
            windows_message("¿Desea eliminar los puestos seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                    $.ajax({
                        url: "/puestosactivos/eliminar",
                        type: "POST",
                        data: $("#DeletePosition").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            $('.progreso').modal('hide');
                            $(".IdPosition").remove();
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
                                        $('.tblPuestoActivos').replaceWith($('.tblPuestoActivos', newDom));
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
                    $(".IdPosition").remove();
                }
            });

        }

    });

    //Habilitar puesto
    $('#Enabledposition').on('click', function () {
        if ($(this).is(":checked")) {

            let contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPosition[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "PositionIdpos");
                    input.attr("class", "PositionIdpos");
                    input.val($(this).parent().parent().find(".PositionIdtblpos").html().trim());
                    $(".form-Enabledposition").append(input);
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#Enabledposition").prop('checked', false);
            }
            else {
                windows_message("¿Desea habilitar puesto?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/puestosinactivos/actualizarestatus",
                            type: "POST",
                            data: $("#form-Enabledposition").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".PositionIdpos").remove();
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
                                            $('.tblPuestoActivos').replaceWith($('.tblPuestoActivos', newDom));
                                        });
                                    $("#Enabledposition").prop('checked', false);
                                    windows_message(data.Message, data.Type);

                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".selectPosition[type=checkbox]").prop('checked', false);
                        $("#Enabledposition").prop('checked', false);
                        $(".PositionIdpos").remove();

                    }
                });

            }
        }

    });


    //cerrar opciones de puestos inhabilitados
    $('.Cerrar-PositionDisebled').on('click', function () {
        window.location.href = "/puestosactivos";
    });

    //marcar puesto como vacante
    $('#IsVacant').on('click', function () {
        if ($(this).is(":checked")) {

            let contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPosition[type=checkbox]").each(function () {


                if ($(this).is(":checked")) {

                    contador = true;
                    let input = $(document.createElement('input'));
                    input.attr("name", "PositionIdIsVacant");
                    input.attr("class", "PositionIdIsVacant");
                    input.val($(this).parent().parent().find(".PositionIdtblpos").html().trim());
                    $(".form-IsVacant").append(input);
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
                $("#IsVacant").prop('checked', false);
            }
            else {
                windows_message("¿Desea marcar puesto como vacante?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({
                            url: "/puestosactivos/marcarpuestovacante",
                            type: "POST",
                            data: $("#form-IsVacant").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".PositionIdIsVacant").remove();
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
                                            $('.tblPuestoActivos').replaceWith($('.tblPuestoActivos', newDom));
                                        });
                                    $("#IsVacant").prop('checked', false);
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".selectPosition[type=checkbox]").prop('checked', false);
                        $("#IsVacant").prop('checked', false);
                        $(".PositionIdIsVacant").remove();


                    }
                });

            }
        }

    });

    //validar campo nombre del puesto
    $("#PositionName").keyup(function () {
        let dimention = $(this).val().toString().length;
        if (dimention == 50) {
            windows_message("¡Solo 50 caracteres!", "error");
        };
    });

    //filtro
    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-Positiondisabled", "/puestosinactivos/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-Positiondisabled", "/puestosinactivos/FilterOrMoreData");

        }
    });

    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblPuestoActivos").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "puestosinactivos", ".tbody-Table-Positiondisabled");

            }
        }
    });
}



export { }





