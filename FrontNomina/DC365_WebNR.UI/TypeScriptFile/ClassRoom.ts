/**
 * @file ClassRoom.ts
 * @description Módulo de gestión de salones de cursos. Permite crear, editar,
 *              eliminar y administrar aulas para capacitaciones.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module SalonesCursos
 */

var option: number;
//cerrar nuevo salon de curso
$('.OpCloseform').on('click', function () {
    funtionNewClassRoom("close");
});

//funcion abrir nuevo salon de curso
function funtionNewClassRoom(_opcion) {
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

//Crear nuevo salon de curso
$('.NewClassRoom').on('click', function () {
    option = 1;
    let form = document.getElementById("createAndEditClassRoom") as HTMLFormElement;
    form.reset();
    $('.setiartitulo').text('Nuevo salón de cursos');
    $('.Showid').addClass('collapse');
    funtionNewClassRoom("open");
});

//save salon de curso
$("#createAndEditClassRoom").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        $('.progreso').modal({ backdrop: 'static', keyboard: false })
        $.ajax({
            url: "/salonescurso/guardar",
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
                            $('.tblClassRoom').replaceWith($('.tblClassRoom', newDom));

                        });
                    funtionNewClassRoom("close");
                    windows_message(data.Message, data.Type);
                }

            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
});

//funcion para editar salon de curso
$('.EditClassRoom').on('click', function () {

    let id: string;
    var contador = 0;
    // Recorremos todos los checkbox para contar los que estan seleccionados
    $(".selectClassRoom[type=checkbox]").each(function () {
        if ($(this).is(":checked")) {
            contador++;
            id = $(this).parent().parent().find(".ClassRoomIdtblcr").html().trim();

        }

    });

    if (contador === 0) {
        windows_message("Debe seleccionar un registro!!", "error");

    }
    else if (contador > 1) {

        windows_message("Debe seleccionar un solo registro!!", "error");
    } else {
        $.ajax({

            url: "/salonescurso/getbyid",
            type: "GET",
            data:
            {
                Id: id
            },
            async: true,
            success: function (data: IClassRoom) {
                if (data != null) {
                    option = 2;
                    AutomaticBinding(data, "#createAndEditClassRoom");
                    $('.setiartitulo').text('Editar salón de cursos');
                    $('.Showid').removeClass('collapse');
                    funtionNewClassRoom("open");

                } else {
                    windows_message("Error buscando datos", "error");
                }

            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });
    }

});

//eliminar salon de cursos
$("#DeleteClassRoom").submit(function (e) {
    if ($(this).valid()) {
        e.preventDefault();
        var contador: boolean = false;
        $(".selectClassRoom[type=checkbox]").each(function () {

            if ($(this).is(":checked")) {
                contador = true;
                let input = $(document.createElement('input'));
                input.attr("name", "ListClassRoomId");
                input.attr("class", "ListClassRoomId");
                input.val($(this).parent().parent().find(".ClassRoomIdtblcr").html().trim());
                $(".DeleteClassRoom").append(input);
            }

        });
        if (!contador) {
            windows_message("Debe seleccionar un Registro!!", "error");
        }
        else {
            windows_message("¿Desea eliminar salon de cursos seleccionadas?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false })

                    $.ajax({
                        url: "/salonescurso/eliminar",
                        type: "POST",
                        data: $("#DeleteClassRoom").serialize(),
                        async: true,
                        success: function (data: ResponseUI) {
                            if (data.Type == "error") {
                                $('.progreso').modal('hide');
                                var _errors: string = "";
                                data.Errors.forEach(function (x: string) {
                                    _errors += `${x}<br>`;
                                });
                                $(".ListClassRoomId").remove();
                                windows_message(_errors, data.Type);
                            } else {
                                $('.progreso').modal('hide');
                                $(".ListClassRoomId").remove();
                                $.get(location.href)
                                    .done(function (r) {
                                        var newDom = $(r);
                                        $('.tblClassRoom').replaceWith($('.tblClassRoom', newDom));
                                    });
                                windows_message(data.Message, data.Type);
                            }

                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }

                    });
                },
                onCancel: function () {
                    $(".selectClassRoom[type=checkbox]").prop('checked', false);
                    $(".ListClassRoomId").remove();
                }
            });

        }
    }
 
});

$('.optionFilter').on('change', function () {
    optionFilterFunction(this);

    if ($('.textFilter').val() != "") {
        Datafilter(".tbody-Table-ClassRoom", "/salonescurso/FilterOrMoreData");
    }
});

$('.textFilterMask').on('keyup', function (e) {
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
        textFilterMaskFunction(this);

        Datafilter(".tbody-Table-ClassRoom", "/salonescurso/FilterOrMoreData");

    }
});

$("#content-scroll").scroll(function () {
    let currentscroll = $("#content-scroll").scrollTop();

    let maxscroll = $(".tblClassRoom").outerHeight(true) - $("#content-scroll").outerHeight(true);
    if (currentscroll == Math.round(maxscroll)) {
        if (!isBusy) {
            moredata(maxscroll, "salonescurso", ".tbody-Table-ClassRoom");

        }
    }
});

// Habilitar doble clic en filas para editar
enableRowDoubleClick(
    '.tbody-Table-ClassRoom',
    '.ClassRoomIdtblcr',
    '/salonescurso/getbyid',
    function (data: IClassRoom) {
        option = 2;
        AutomaticBinding(data, "#createAndEditClassRoom");
        $('.setiartitulo').text('Editar salón de cursos');
        $('.Showid').removeClass('collapse');
        funtionNewClassRoom("open");
    },
    'Id'
);