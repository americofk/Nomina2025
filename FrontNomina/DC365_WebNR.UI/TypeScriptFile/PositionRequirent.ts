/**
 * @file PositionRequirent.ts
 * @description Módulo de gestión de requisitos de puestos. Permite crear, editar
 *              y administrar los requisitos necesarios para cada puesto vacante.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module RequisitosPuestos
 */

variables: {
    var idpositionforRequirement: string;
    var optionreq: number;
}

escuchadores: {
    //Para diseño, se oculta el indicador al hacer scroll
    $(".container-modal-scrolling").scroll(function () {
        let positionScroll: number = $(this).scrollTop();
        if (positionScroll > 0)
            $('.for-employee-address').addClass('collapse');
        else
            $('.for-employee-address').removeClass('collapse');
    });
    //abrir modal de requisitos
    $('.Requirement').on('click', function () {
        idpositionforRequirement = "";
        var contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectPosition[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                idpositionforRequirement = $(this).parent().parent().find(".PositionIdtblpos").html().trim();
            }

        });

        if (contador === 0) {
            windows_message("Debe seleccionar un Registro!!", "error");
        }
        else if (contador > 1) {

            windows_message("Debe seleccionar un solo Registro!!", "error");
        } else {
            searchPositionRequirement(idpositionforRequirement);

            $('.requisitopuestos').modal("show");
        }
    });

    //nuevo requisitos para puesto
    $('.NewRequirenTwo').on('click', function () {
        optionreq = 1;
        searchRequirementForm(idpositionforRequirement);
        //Funcion para mover el scroll, para mejor diseño
        $('.container-modal-scrolling').scrollTop(0);

    });


    //cerrar modal de requisitos de puestos
    $('.cerrarModRequirement').on('click', function () {

        $('.SaveRequirement').addClass('collapse');
        $('.DatosLineas').addClass('collapse');
        $('.requisitopuestos').modal("hide");
        idpositionforRequirement = "";
    });

    //eliminar requisitos de puesto
    $("#DeletePositionRequirement").submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
            var ListId = [];
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectPositionRequirement[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "ListPositionRequirement");
                    input.attr("class", "ListPositionRequirement");
                    input.val($(this).parent().parent().find(".NamePositionRequirement").html().trim());
                    $(".DeletePositionRequirement").append(input);

                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un Registro!", "error");

            }
            else {
                windows_message("¿Desea eliminar los requisitos seleccionados?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/requisitospuestos/eliminar",
                            type: "POST",
                            data: $("#DeletePositionRequirement").serialize() + `&positionid=${idpositionforRequirement}`,
                            async: true,
                            success: function (data: ResponseUI) {
                                $('.progreso').modal('hide');
                                $(".ListPositionRequirement").remove();
                                if (data.Type == "error") {
                                    var _errors: string = "";
                                    data.Errors.forEach(function (x: string) {
                                        _errors += `${x}<br>`;
                                    });
                                    windows_message(_errors, data.Type);
                                } else {
                                    searchPositionRequirement(idpositionforRequirement);
                                    windows_message(data.Message, data.Type);

                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".selectPositionRequirement[type=checkbox]").prop('checked', false);
                        $(".ListPositionRequirement").remove();
                    }
                });

            }
        }
    });


   

}

funciones: {

    //buscar el formulario para crear o editar requisitos
    function searchRequirementForm(_idpositionforRequirement: string) {
        $.ajax({
            url: "/requisitospuestos/formularioNewRequirement",
            type: "GET",
            async: false,
            success: function (data) {
                if (data.length > 0) {
                    $(".cont-form-newRequirent").html('');
                    $(".cont-form-newRequirent").append(data);
                    //cerrar formulario de nuevo requisito de puesto
                    $('.btncancelar_new_PositionRequirement').on('click', function () {
                        $('.cont-form-newRequirent').addClass("collapse");
                        $('.btnnewRequirent').text("Nuevo")
                    });
                    //save new requirentment position
                    $("#new_PositionRequirement").submit(function (e) {
                        if ($(this).valid()) {
                            e.preventDefault();
                            savePositionRequirement(_idpositionforRequirement)
                        }
                    });

                    //validar campo nombre del requisito
                    $("#Name").keyup(function () {
                        let dimention = $(this).val().toString().length;
                        if (dimention == 50) {
                            windows_message("¡Solo 50 caracteres!", "error");
                        };
                    });

                    $('#PositionIdRequirement').val(_idpositionforRequirement)
                    $('.cont-form-newRequirent').removeClass("collapse");
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });
    }

    //save Addres employee
    function savePositionRequirement(_idpositionforRequirement: string) {
        $.ajax({
            url: "/requisitospuestos/guardar",
            type: "POST",
            data: $("#new_PositionRequirement").serialize() + `&operacion=${optionreq}`,
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
                    searchPositionRequirement(_idpositionforRequirement);
                    let form = document.getElementById("new_PositionRequirement") as HTMLFormElement;
                    form.reset();
                    $('.cont-form-newRequirent').addClass("collapse");
                    $('.btnnewRequirent').text("Nuevo")
                    windows_message(data.Message, data.Type);
                }


            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
      //buscar los requisitos de un puesto
    function searchPositionRequirement(_idposition: string) {
        $.ajax({
            url: `/requisitospuestos/${_idposition}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".datatable-Requirement").html('');
                    $(".datatable-Requirement").append(data);

                    //doble clik en la linea para editar 
                    $(".LineTablePositionRequirement").dblclick(function myfunction() {
                        searchRequirementId(_idposition, $(this).find(".NamePositionRequirement").html().trim());
                    });

                   

                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });
    }

    //buscar un requisito para editar
    function searchRequirementId(_idposition: string, _internalId: string) {
        $.ajax({

            url: `/requisitospuestos/${_idposition}/${_internalId}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    optionreq = 2;
                    $(".cont-form-newRequirent").html('');
                    $(".cont-form-newRequirent").append(data);
                    //cerrar formulario de nueva direccion
                    $('.btncancelar_new_PositionRequirement').on('click', function () {
                        $('.cont-form-newRequirent').addClass("collapse");
                        $('.btnnewRequirent').text("Nuevo")
                    });
                    //save new requirentment position
                    $("#new_PositionRequirement").submit(function (e) {
                        if ($(this).valid()) {
                            e.preventDefault();
                            savePositionRequirement(_idposition)
                        }
                    });

                    $('.btnnewRequirent').text("Editar")
                    $('#PositionIdRequirement').val(_idposition)
                    $('.cont-form-newRequirent').removeClass("collapse");
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });

    }


}




