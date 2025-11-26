
var option: number;
//cerrar nuevo instructor
$('.OpCloseform').on('click', function () {
    $('.Showid').addClass('collapse');
    funtionNewInstructor("close");
});

//funcion abrir formulario para nuevo instructor
function funtionNewInstructor(_opcion) {
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
    }
}

//abrir nuevo instructor
$('.NewInstructor').on('click', function () {
    option = 1;
    let form = document.getElementById("createAndEditInstructor") as HTMLFormElement;
    form.reset();
    $('.setiartitulo').text('Nuevo instructor de cursos');
    $('.Showid').addClass('collapse');
    funtionNewInstructor("open");
});

//save tipo instrutor
$("#createAndEditInstructor").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        $('.progreso').modal({ backdrop: 'static', keyboard: false })
        $.ajax({
            url: "/instructor/guardar",
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
                    windows_message(data.Message, data.Type, {});
                    $.get(location.href)
                        .done(function (r) {
                            var newDom = $(r);
                            $('.tblInstructor').replaceWith($('.tblInstructor', newDom));
                        });
                    let form = document.getElementById("createAndEditInstructor") as HTMLFormElement;
                    form.reset();
                    $('.progreso').modal('hide');
                    funtionNewInstructor("close");
                }

            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
});

//funcion para editar instructor
$('.EditInstructor').on('click', function () {

    let _id: string;
    var contador = 0;
    $(".selectInstructor[type=checkbox]").each(function () {
        if ($(this).is(":checked")) {
            contador++;
            _id = $(this).parent().parent().find(".InstructorIdtblIns").html().trim();
        }
    });

    if (contador === 0) {
        windows_message("Debe seleccionar un Registro!!", "error");

    }
    else if (contador > 1) {

        windows_message("Debe seleccionar un solo Registro!!", "error");
    } else {
        $.ajax({

            url: "/instructor/getbyid",
            type: "GET",
            data:
            {
                Id: _id
            },
            async: true,
            success: function (data: IInstructor) {
                if (data != null) {
                    option = 2;
                    AutomaticBinding(data, "#createAndEditInstructor");
                    $('.setiartitulo').text('Editar instructor de cursos');
                    $('.Showid').removeClass('collapse');
                    funtionNewInstructor("open");
                } else {
                    $('.progreso').modal('hide');
                    windows_message("Error buscando datos", "error");
                }

            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });


    }

});

//eliminar tipo de cursos
$("#DeleteInstructor").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        var contador: boolean = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectInstructor[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador = true
                let input = $(document.createElement('input'));
                input.attr("name", "ListIdInstructort");
                input.attr("class", "ListIdInstructort");
                input.val($(this).parent().parent().find(".InstructorIdtblIns").html().trim());
                $(".DeleteInstructor").append(input);
            }

        });

        if (!contador) {
            windows_message("Debe seleccionar un Registro!!", "error");
        }
        else {
            windows_message("¿Desea eliminar los instructores seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                    $.ajax({
                        url: "/instructor/eliminar",
                        type: "POST",
                        data: $("#DeleteInstructor").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            if (data.Type == "error") {
                                $('.progreso').modal('hide');
                                var _errors: string = "";
                                data.Errors.forEach(function (x: string) {
                                    _errors += `${x}<br>`;
                                });
                                $(".ListIdInstructort").remove();
                                windows_message(_errors, data.Type);
                            } else {
                                $('.progreso').modal('hide');
                                $(".ListIdInstructort").remove();
                                $.get(location.href)
                                    .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblInstructor').replaceWith($('.tblInstructor', newDom));
                                    });
                                windows_message(data.Message, data.Type);
                            }

                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }

                    });
                },
                onCancel: function () {
                    $(".selectInstructor[type=checkbox]").prop('checked', false);
                    $(".ListIdInstructort").remove();
                }
            });

        }
    }
    
});


$('.optionFilter').on('change', function () {
    optionFilterFunction(this);
    if ($('.textFilter').val() != "") {
        Datafilter(".tbody-Table-Instructor", "/instructor/FilterOrMoreData");
    }
});

$('.textFilterMask').on('keyup', function (e) {
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
        textFilterMaskFunction(this);
        Datafilter(".tbody-Table-Instructor", "/instructor/FilterOrMoreData");

    }
});

$("#content-scroll").scroll(function () {
    let currentscroll = $("#content-scroll").scrollTop();

    let maxscroll = $(".tblInstructor").outerHeight(true) - $("#content-scroll").outerHeight(true);
    if (currentscroll == Math.round(maxscroll)) {
        if (!isBusy) {
            moredata(maxscroll, "instructor", ".tbody-Table-Instructor");

        }
    }
});

// Habilitar doble clic en filas para editar
enableRowDoubleClick(
    '.tbody-Table-Instructor',
    '.InstructorIdtblIns',
    '/instructor/getbyid',
    function (data: IInstructor) {
        option = 2;
        AutomaticBinding(data, "#createAndEditInstructor");
        $('.setiartitulo').text('Editar instructor de cursos');
        $('.Showid').removeClass('collapse');
        funtionNewInstructor("open");
    },
    'Id'
);