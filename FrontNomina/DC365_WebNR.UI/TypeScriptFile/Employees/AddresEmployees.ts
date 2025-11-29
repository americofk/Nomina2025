/**
 * @file AddresEmployees.ts
 * @description Módulo de gestión de direcciones de empleados. Permite agregar,
 *              editar y eliminar direcciones asociadas a cada empleado.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module DireccionesEmpleados
 */

//var idpositionforRequirement: string;
var optionAddres: number;

funciones: {
    //Buscar direcciones del empleado
    function searchEmployeeAddressForm() {
        $.ajax({
            url: "/direccionempleados/formularioNewAddres",
            type: "GET",
            async: false,
            success: function (data) {
                if (data.length > 0) {
                    $(".contformnewaddres").html('');
                    $(".contformnewaddres").append(data);
                    //cerrar formulario de nueva direccion
                    $('.btncancelarNewAddress').on('click', function () {
                        $('.contformnewaddres').addClass("collapse");
                        $('.btnnewAdreesli').text("Nuevo")
                    });
                    //save Addres employee
                    $("#newAddres").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
                            saveAddresemployee()
                        }
                    });

                    $('#EmployeeIdAddres').val($('#EmployeeId').val().toString())
                    ListCountries("#CountryId");
                    $('.contformnewaddres').removeClass("collapse");
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });
    }

    //buscar direcciones de un empleado
    function searchEmployeeAddress(_idEmployee: string) {
        $.ajax({
            url: `/direccionempleados/${_idEmployee}`,
            type: "GET",
            //data: {
            //    employeeid: _idEmployee
            //},
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".dataTableAddress").html('');
                    $(".dataTableAddress").append(data);

                    $(".LineTableAddres").dblclick(function myfunction() {
                        searchEmployeeAddressId(_idEmployee, $(this).find(".InternalIdtbl").html().trim());
                        $('.container-modal-scrolling').scrollTop(0);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });
    }

    //buscar una direccion para editar
    function searchEmployeeAddressId(_idEmployee: string, _internalId: string) {
        $.ajax({

            url: `/direccionempleados/${_idEmployee}/${_internalId}`,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    optionAddres = 2;
                    $(".contformnewaddres").html('');
                    $(".contformnewaddres").append(data);
                    //cerrar formulario de nueva direccion
                    $('.btncancelarNewAddress').on('click', function () {
                        $('.contformnewaddres').addClass("collapse");
                        $('.btnnewAdreesli').text("Nuevo")

                    });

                    //save Addres employee
                    $("#newAddres").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
                            saveAddresemployee()
                        }
                    });

                    $('#EmployeeIdAddres').val($('#EmployeeId').val().toString())
                    $('.titulonuevadireccion').text("Editar dirección")
                    $('.btnnewAdreesli').text("Editar")
                    ListCountries("#CountryId");
                    $('.contformnewaddres').removeClass("collapse");
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }

        });

    }

    //save Addres employee
    function saveAddresemployee() {
        $.ajax({
            url: "/direccionempleados/guardar",
            type: "POST",
            data: $("#newAddres").serialize() + `&operacion=${optionAddres}`,
            async: true,
            success: function (data: ResponseUI) {
                if (data.Type == "error") {
                    $('.progreso').modal('hide');
                    var _errors: string = "";
                    data.Errors.forEach(function (x: string) {
                        _errors += `${x}<br>`;
                    });
                    windows_message(_errors, data.Type, {
                        onOk: function () {
                            $('.progreso').modal('hide');
                        }

                    });
                } else {

                    windows_message(data.Message, data.Type, {
                        onOk: function () {

                        }
                    });
                    searchEmployeeAddress($('#EmployeeId').val().toString());
                    let form = document.getElementById("newAddres") as HTMLFormElement;
                    form.reset();
                    $('.contformnewaddres').addClass("collapse");
                    $('.btnnewAdreesli').text("Nuevo")
                }


            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
}

escuchador: {
    //Para diseño, se oculta el indicador al hacer scroll
    $(".container-modal-scrolling").scroll(function () {
        let positionScroll: number = $(this).scrollTop();
        if (positionScroll > 0)
            $('.for-employee-address').addClass('collapse');
        else
            $('.for-employee-address').removeClass('collapse');
    });

    //abrir modal de direcciones del empleado
    $('.open-employee-address').on('click', function () {
        searchEmployeeAddress($('#EmployeeId').val().toString());
        $('.modNewAddress').modal({ backdrop: 'static', keyboard: false });
        //$('.progreso').modal({ backdrop: 'static', keyboard: false })

    });

    //cerrar modal de direcciones del empleado
    $('.close-modal-cerrarModAddres').on('click', function () {
        $('.modNewAddress').modal("hide");
    });

    //Abrir formulario de nueva direccion
    $('.NewAddress').on('click', function () {
        optionAddres = 1;
        searchEmployeeAddressForm();
        //Funcion para mover el scroll, para mejor diseño
        $('.container-modal-scrolling').scrollTop(0);
    });

    //eliminar direccion de empleado
    $("#DeleteAddress").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            var ListId = [];
            var contador: boolean = false;
            // Recorremos todos los checkbox para contar los que estan seleccionados
            $(".selectAddres[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    contador = true
                    let input = $(document.createElement('input'));
                    input.attr("name", "ListIdAddress");
                    input.attr("class", "ListIdAddress");
                    input.val($(this).parent().parent().find(".InternalIdtbl").html().trim());
                    $(".DeleteAddress").append(input);

                }

            });

            if (!contador) {
                windows_message("¡Debe seleccionar un Registro!", "error");

            }
            else {
                windows_message("¿Desea eliminar las direcciones seleccionadas?", "confirm", {
                    onOk: function () {
                        $('.progreso').modal({ backdrop: 'static', keyboard: false })

                        $.ajax({

                            url: "/direccionempleados/eliminar",
                            type: "POST",
                            data: $("#DeleteAddress").serialize() + `&employeeid=${$('#EmployeeId').val().toString().trim()}`,
                            async: true,
                            success: function (data: ResponseUI) {
                                if (data.Type == "error") {
                                    $('.progreso').modal('hide');
                                    var _errors: string = "";
                                    data.Errors.forEach(function (x: string) {
                                        _errors += `${x}<br>`;
                                    });
                                    $(".ListIdAddress").remove();
                                    windows_message(_errors, data.Type);
                                } else {
                                    $('.progreso').modal('hide');
                                    searchEmployeeAddress($('#EmployeeId').val().toString())
                                    $(".ListIdAddress").remove();
                                    windows_message(data.Message, data.Type);

                                }

                            }, error: function (xhr) {
                                redireccionaralLogin(xhr);
                            }

                        });
                    },
                    onCancel: function () {
                        $(".selectAddres[type=checkbox]").prop('checked', false);
                        $(".ListIdAddress").remove();
                    }
                });

            }
        }
    });

}











