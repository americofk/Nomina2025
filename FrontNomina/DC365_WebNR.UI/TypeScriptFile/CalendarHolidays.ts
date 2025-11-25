variables: {
    var page = 1;
    var isBusy: boolean = false;
    var option: number;
}

const fn = {
    //funcion abrir formulario
    funtionNewHoliday: function (option) {
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
            $('.TituloFormularios').text('Editar dia feriado');
            $('.Showid').removeClass('collapse');
        }
        else {
            option = 1;
            $('.TituloFormularios').text('Nuevo dia feriado');
            $('.Showid').addClass('collapse');

            let form = document.getElementById("createAndEditCalendarHoliday") as HTMLFormElement;
            form.reset();
        }
    }
}
escuchadores: {
    //eliminar
    $("#delete-Holiday").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            let cont = 0;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".select-CalendarHoliday[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", `model[${cont}].CalendarDate`);
                    input.attr("class", "IdCalendarDate");
                    input.val($(this).parent().parent().find(".CalendarDateIdtbl").html().trim());
                    $(".delete-Holiday").append(input);
                    cont++;
                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");

            }
            else {
                windows_message("¿Desea eliminar los dias feriados seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/calendarholiday/eliminar",
                            type: "POST",
                            data: $("#delete-Holiday").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".IdCalendarDate").remove();
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
                                            $('.tbl-CalendarHoliday').replaceWith($('.tbl-CalendarHoliday', newDom));
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
                        $(".IdCalendarDate").remove();


                    }
                });

            }
        }
    });

    //abrir nuevo
    $('.NewHoliday').on('click', function () {
        let form = document.getElementById('createAndEditCalendarHoliday') as HTMLFormElement;
        form.reset();
        option = 1;
        fn.SettingNewAndEdit("New");
        fn.funtionNewHoliday("open");
    });

    //save
    $("#createAndEditCalendarHoliday").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            $('.progreso').modal({ backdrop: 'static', keyboard: false })
            $.ajax({
                url: "/calendarholiday/guardar",
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
                                $('.tbl-CalendarHoliday').replaceWith($('.tbl-CalendarHoliday', newDom));
                            });
                        fn.funtionNewHoliday("close");
                        windows_message(data.Message, data.Type);

                    }


                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });

    //editar
    $('.EditHoliday').on('click', function () {

        let _id: string;
        var contador = 0;
        $(".select-CalendarHoliday[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".CalendarDateIdtbl").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");

        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "info");
        } else {
            $.ajax({

                url: `/calendarholiday/editar`,
                data: { Id: _id },
                type: "GET",
                async: true,
                success: function (data: ICalendarHoliday) {
                    if (data != null) {
                        option = 2;
                        AutomaticBinding(data, "#createAndEditCalendarHoliday");

                        fn.SettingNewAndEdit("Edit");
                        fn.funtionNewHoliday("open");
                    }

                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }

            });
        }

    });

    //cerrar nuevo
    $('.OpCloseform').on('click', function () {
        fn.funtionNewHoliday("close");
    });

 
    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-CalendarHoliday", "/calendarholiday/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-CalendarHoliday", "/calendarholiday/FilterOrMoreData");

        }
    });

    //paginacion
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tbl-CalendarHoliday").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "calendarholiday", ".tbody-Table-CalendarHoliday");

            }
        }
    });
}

export { }