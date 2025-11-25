

variables: {
    var option: number;
}

const fn = {
    //funcion abrir nuevo tipo de curso
    funtionNewCorseType: function(_opcion) {
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
            $('.Showidcourse').addClass('collapse');
        }
    },

    SettingNewAndEdit: function (type: string) {
        if (type == "Edit") {
            option = 2;
            $('.setiartitulo').text('Editar tipo de curso');
            $('.Showidcourse').removeClass('collapse');
        }
        else {
            option = 1;
            let form = document.getElementById("createAndEditTypeCourse") as HTMLFormElement;
            form.reset();
            $('.setiartitulo').text('Nuevo tipo de curso');
            $('.Showidcourse').addClass('collapse');
        }
    }
}

escuchadores: {
    //cerrar nuevo tipo de curso
    $('.OpCloseform').on('click', function () {
        fn.funtionNewCorseType("close");
    });

    //Crear nueva tipo de curso
    $('.NewCorseType').on('click', function () {
        fn.SettingNewAndEdit("New");
        fn.funtionNewCorseType("open");
    });

    //save tipo de curso
    $("#createAndEditTypeCourse").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            $.ajax({
                url: "/tipocursos/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
                async: true,
                success: function (data: ResponseUI) {
                    if (data.Type == "error") {
                        $('.progreso').modal('hide');
                        var _errors: string = "";
                        data.Errors.forEach(function (x: string) {
                            _errors += `${x}<br>`;
                        });
                        windows_message(_errors, data.Type);
                    } else {
                        windows_message(data.Message, data.Type);
                        $.get(location.href)
                            .done(function (r) {
                                var newDom = $(r);
                                $('.tblCourseType').replaceWith($('.tblCourseType', newDom));
                            });
                        let form = document.getElementById("createAndEditTypeCourse") as HTMLFormElement;
                        form.reset();
                        $('.progreso').modal('hide');
                        fn.funtionNewCorseType("close");
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });

    //funcion para editar tipos de curso
    $('.EditCourseType').on('click', function () {
        let _id: string;
        var contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectCourseType[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".CourseTypeIdtbltc").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro!", "error");
        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo registro!", "error");
        } else {
            $.ajax({
                url: "/tipocursos/getbyid",
                type: "GET",
                data:
                {
                    Id: _id
                },
                async: true,
                success: function (data: IDepartment) {
                    $('.progreso').modal('hide');
                    if (data != null) {
                        fn.SettingNewAndEdit("Edit");
                        AutomaticBinding(data, "#createAndEditTypeCourse");
                        fn.funtionNewCorseType("open");
                    } else {
                        windows_message("Error buscando datos", "error");
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });            
        }
    });

    //eliminar tipo de cursos
    $("#deleteCourseType").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            $(".selectCourseType[type=checkbox]").each(function () {
                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "ListIdTypeCourse");
                    input.attr("class", "ListIdTypeCourse");
                    input.val($(this).parent().parent().find(".CourseTypeIdtbltc").html().trim());
                    $(".deleteCourseType").append(input);
                }
            });
            if (!contador) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                windows_message("¿Desea eliminar los tipos de cursos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false });
                        $.ajax({
                            url: "/tipocursos/eliminar",
                            data: $("#deleteCourseType").serialize(),
                            type: "POST",
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                if (data.Type == "error") {
                                    FormatErrors(data);
                                } else {
                                    $(".ListIdTypeCourse").remove();
                                    $.get(location.href)
                                        .done(function (r) {
                                            var newDom = $(r);
                                            $('.tblCourseType').replaceWith($('.tblCourseType', newDom));
                                        });
                                    windows_message(data.Message, data.Type);
                                }
                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }
                        });
                    },
                    onCancel: function () {
                        $(".selectCourseType[type=checkbox]").prop('checked', false);
                        $(".ListIdTypeCourse").remove();
                    }
                });
            }
        }
    });

    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);

        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-CourseType", "/tipocursos/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);

            Datafilter(".tbody-Table-CourseType", "/tipocursos/FilterOrMoreData");

        }
    });

    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblCourseType").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "tipocursos", ".tbody-Table-CourseType");

            }
        }
    });
}

export { }
