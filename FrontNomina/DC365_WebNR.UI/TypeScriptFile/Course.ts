variables: {
    var option: number;
}

funciones: {
    //funcion abrir nuevo curso
    function funtionNewCourse(_opcion) {
        if (_opcion == "open") {

            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.optionform').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');
            $('.margenFormmularios').addClass('ContenedorFormularios2');
            $('.margenFormmularios').removeClass('ContenedorFormularios-three');

        } else {
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
            $('.Showid').addClass('collapse');

        }
    }

    //cargar lista de select en formularios 
    function loadlists() {
        ListCourseType();
        ListClassRoom();
    }

    //Lista de tipo de cursos
    function ListCourseType() {
        if ($("#CourseTypeId")[0].children.length == 0) {
            $.ajax({
                url: "/cursos/Tiposdecursos",
                type: "Get",
                async: false,

                success: function (data) {

                    if (data.length > 0) {
                        $("#CourseTypeId").html('');
                        $(data).each(function () {
                            var option = $(document.createElement('option'));
                            option.text(this.Name);
                            option.val(this.CourseTypeId);
                            $("#CourseTypeId").append(option);
                        });
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }

            });
        }

    }

    //Lista de tipo de aulas o salones
    function ListClassRoom() {
        if ($("#ClassRoomId")[0].children.length == 0) {
            $.ajax({
                url: "/cursos/SalonesdeCursos",
                type: "Get",
                async: false,

                success: function (data) {

                    if (data.length > 0) {
                        $("#ClassRoomId").html('');
                        $(data).each(function () {
                            var option = $(document.createElement('option'));
                            option.text(this.Name);
                            option.val(this.ClassRoomId);
                            $("#ClassRoomId").append(option);
                        });
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }

            });
        }

    }

    ////funcion para editar curso
    //function EditCourse(Obj) {

    //    let id: string;
    //    var contador = 0;
    //    // Recorremos todos los checkbox para contar los que estan seleccionados
    //    $(".selectCourse[type=checkbox]").each(function () {
    //        if ($(this).is(":checked")) {
    //            contador++;
    //            id = $(this).parent().parent().find(".CourseIdtblcur").html().trim();

    //        }

    //    });

    //    if (contador === 0) {
    //        windows_message("Debe seleccionar un Registro!!", "error");

    //    }
    //    else if (contador > 1) {

    //        windows_message("Debe seleccionar un solo Registro!!", "error");
    //    } else {
    //        loadlists();
    //        var obj: Course = Obj.find(selected => selected.CourseId == id);
    //        option = 2;
    //        $('.Showid').removeClass('collapse');
    //        $('.setiartitulo').text('Editar cursos');

    //        AutomaticBinding(obj, "#createAndEditCourse");
    //        funtionNewCourse("open");
    //    }

    //}
}

escuchadores: {
    //cerrar nuevo  curso
    $('.OpCloseform').on('click', function () {
        funtionNewCourse("close");
    });


    //Crear nuevo  curso
    $('.NewCourse').on('click', function () {
        option = 1;
       
        let form = document.getElementById("createAndEditCourse") as HTMLFormElement;
        form.reset();
        $('.Showid').addClass('collapse');
        $('.setiartitulo').text('Nuevo cursos');

      /*  loadlists();*/
        funtionNewCourse("open");
    });

    //save Course
    $("#createAndEditCourse").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            $('.progreso').modal({ backdrop: 'static', keyboard: false })
            $.ajax({
                url: "/cursos/guardar",
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
                                $('.tblCourse').replaceWith($('.tblCourse', newDom));
                            });
                        let form = document.getElementById("createAndEditCourse") as HTMLFormElement;
                        form.reset();
                        funtionNewCourse("close");
                        windows_message(data.Message, data.Type);

                    }


                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });

    //eliminar
    $("#DeleteCourse").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectCourse[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "CourseId");
                    input.attr("class", "CourseId");
                    input.val($(this).parent().parent().find(".CourseIdtblcur").html().trim());
                    $(".DeleteCourse").append(input);

                }

            });

            if (!contador) {
                windows_message("Debe seleccionar un Registro!!", "error");

            }
            else {
                windows_message("¿Desea eliminar los cusos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })
                        $.ajax({

                            url: "/cursos/eliminar",
                            type: "POST",
                            data: $("#DeleteCourse").serialize(),
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".CourseId").remove();
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
                                            $('.tblCourse').replaceWith($('.tblCourse', newDom));
                                        });
                                    windows_message(data.Message, data.Type);
                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".selectCourse[type=checkbox]").prop('checked', false);
                        $(".CourseId").remove();

                    }
                });

            }
        }
    });

    //editar
    $('.EditCourse').on('click', function () {

        let _id: string;
        var contador = 0;
        $(".selectCourse[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(".CourseIdtblcur").html().trim();
            }
        });

        if (contador === 0) {
            windows_message("Debe seleccionar un Registro!!", "error");

        }
        else if (contador > 1) {
            windows_message("¡Debe seleccionar un solo Registro!", "info");
        } else {
            $.ajax({

                url: `/cursos/${_id}`,
                type: "GET",
                async: true,
                success: function (data: Course) {
                    if (data != null) {
                        option = 2;
                  
                        $('.Showid').removeClass('collapse');
                        $('.setiartitulo').text('Editar cursos');
                        AutomaticBinding(data, "#createAndEditCourse");

                        funtionNewCourse("open");

                        $('.optionform').removeClass('collapse');
                        $('.margenFormmularios').removeClass('ContenedorFormularios2');
                        $('.margenFormmularios').addClass('ContenedorFormularios-three');

                    } else {
                        windows_message("No se encontró el código de curso", "error");
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
            Datafilter(".tbody-Table-Course", "/cursos/FilterOrMoreData");
        }
    });

    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);

            Datafilter(".tbody-Table-Course", "/cursos/FilterOrMoreData");

        }
    });

    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();

        let maxscroll = $(".tblCourse").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "cursos", ".tbody-Table-Course");

            }
        }
    });
}


