/**
 * @file CourseLocation.ts
 * @description Módulo de gestión de ubicaciones de cursos. Permite crear, editar,
 *              eliminar y listar las ubicaciones donde se imparten capacitaciones.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module UbicacionCursos
 */

var option: number;
//cerrar nueva ubicacion de curso
$('.OpCloseform').on('click', function () {
    funtionNewCourseLocation("close");
});

//funcion abrir nuevo tipo de curso
function funtionNewCourseLocation(_opcion) {
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

//Crear nueva ubicacion de curso
$('.NewCourseLocation').on('click', function () {
    option = 1;
    let form = document.getElementById("createAndEditCourseLocation") as HTMLFormElement;
    form.reset();
    $('.setiartitulo').text('Nueva ubicación de curso');
    $('.Showid').addClass('collapse');
    funtionNewCourseLocation("open");
});

//save ubicacion de curso
$("#createAndEditCourseLocation").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        $('.progreso').modal({ backdrop: 'static', keyboard: false })
        $.ajax({
            url: "/ubicacioncursos/guardar",
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
                    $('.progreso').modal('hide');
                    $.get(location.href)
                        .done(function (r) {
                            var newDom = $(r);
                            $('.tblCourseLocation').replaceWith($('.tblCourseLocation', newDom));
                        });
                    funtionNewCourseLocation("close");
                    windows_message(data.Message, data.Type);
                }


            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
});

//funcion para editar ubicacion de curso
$('.EditCourseLocation').on('click', function () {

    let id: string;
    var contador = 0;
    // Recorremos todos los checkbox para contar los que estan seleccionados
    $(".selectCourseLocation[type=checkbox]").each(function () {
        if ($(this).is(":checked")) {
            contador++;
            id = $(this).parent().parent().find(".CourseLocationIdtblcl").html().trim();
        }

    });

    if (contador === 0) {
        windows_message("Debe seleccionar un Registro!!", "error");
    }
    else if (contador > 1) {

        windows_message("Debe seleccionar un solo Registro!!", "error");
    } else {
        $.ajax({

            url: "/ubicacioncursos/getbyid",
            type: "GET",
            data:
            {
                Id: id
            },
            async: true,
            success: function (data: ICourseLocation) {
                if (data != null) {
                    option = 2;
                    AutomaticBinding(data, "#createAndEditCourseLocation");
                    $('.setiartitulo').text('Editar ubicación de curso');
                    $('.Showid').removeClass('collapse');
                    funtionNewCourseLocation("open");

                } else {
                    windows_message("Error buscando datos", "error");
                }

            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });
    }

});

//eliminar ubicacion de cursos
$("#DeleteCourseLocation").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        var contador: boolean = false;
        $(".selectCourseLocation[type=checkbox]").each(function () {

            if ($(this).is(":checked")) {
                contador=true;
                let input = $(document.createElement('input'));
                input.attr("name", "ListLocationId");
                input.attr("class", "ListLocationId");
                input.val($(this).parent().parent().find(".CourseLocationIdtblcl").html().trim());
                $(".DeleteCourseLocation").append(input);
            }

        });
        if (!contador) {
            windows_message("Debe seleccionar un Registro!!", "error");
        }
        else {
            windows_message("¿Desea eliminar ubicación de cursos seleccionadas?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                    $.ajax({
                        url: "/ubicacioncursos/eliminar",
                        type: "POST",
                        data: $("#DeleteCourseLocation").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            if (data.Type == "error") {
                                $('.progreso').modal('hide');
                                var _errors: string = "";
                                data.Errors.forEach(function (x: string) {
                                    _errors += `${x}<br>`;
                                });
                                $(".ListLocationId").remove();
                                windows_message(_errors, data.Type);
                            } else {
                                $('.progreso').modal('hide');
                                $(".ListLocationId").remove();
                                $.get(location.href)
                                    .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblCourseLocation').replaceWith($('.tblCourseLocation', newDom));
                                    });
                                windows_message(data.Message, data.Type);
                            }

                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }

                    });
                },
                onCancel: function () {
                    $(".selectCourseLocation[type=checkbox]").prop('checked', false);
                    $(".ListLocationId").remove();
                }
            });

        }
    }
   
});

$('.optionFilter').on('change', function () {
    optionFilterFunction(this);

    if ($('.textFilter').val() != "") {
        Datafilter(".tbody-Table-CourseLocation", "/ubicacioncursos/FilterOrMoreData");
    }
});

$('.textFilterMask').on('keyup', function (e) {
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
        textFilterMaskFunction(this);

        Datafilter(".tbody-Table-CourseLocation", "/ubicacioncursos/FilterOrMoreData");

    }
});

$("#content-scroll").scroll(function () {
    let currentscroll = $("#content-scroll").scrollTop();

    let maxscroll = $(".tblCourseLocation").outerHeight(true) - $("#content-scroll").outerHeight(true);
    if (currentscroll == Math.round(maxscroll)) {
        if (!isBusy) {
            moredata(maxscroll, "ubicacioncursos", ".tbody-Table-CourseLocation");

        }
    }
});

// Habilitar doble clic en filas para editar
enableRowDoubleClick(
    '.tbody-Table-CourseLocation',
    '.CourseLocationIdtblcl',
    '/ubicacioncursos/getbyid',
    function (data: ICourseLocation) {
        option = 2;
        AutomaticBinding(data, "#createAndEditCourseLocation");
        $('.setiartitulo').text('Editar ubicación de curso');
        $('.Showid').removeClass('collapse');
        funtionNewCourseLocation("open");
    },
    'Id'
);