/**
 * @file TaxDetail.ts
 * @description Módulo de gestión de detalles de impuestos. Permite crear, editar
 *              y administrar las configuraciones específicas de cada impuesto.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module DetalleImpuestos
 */

variables: {

    var option: number;
}

const fn = {
    //Formulario de nuevo y editar
    SearchFormNewAndEditDetail: function (_id: string = "", viewmode: string = "new") {
        let url: string

        if (_id == "")
            url = `/detalleimpuestos/ObtenerFormNuevo`;
        else
            url = `/detalleimpuestos/ObtenerFormNuevo?taxid=${_id}`;

        $.ajax({
            url: url,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    fn.ShowForm(data, viewmode);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },

    //Buscar formulario de configuracion de tasa
    SearchListRateConfig: function (_id: string = "", viewmode: string = "new") {
        let url: string

        if (_id == "")
            url = `/detalleimpuestos/ObtenerFormNuevo`;
        else
            url = `/detalleimpuestos/ObtenerFormNuevo?TaxDetailid=${_id}`;
        $.ajax({
            url: url,
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".cont-form-new-config-isr").html('');
                    $("cont-form-new-config-isr").append(data);

                    //cerrar formulario de nueva direccion
                    $(".btncancelar_new_TaxDetail").on('click', function () {
                        $(".cont-form-new-config-isr").addClass("collapse");
                    });



                    


                    $(".cont-form-new-config-isr").removeClass("collapse");

                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },


    ShowForm: function (data, viewmode: string) {

        $(".cont-form-new-config-isr").html('');
        $(".cont-form-new-config-isr").append(data);

        //cerrar formulario de nuevo y editar
        $(".btncancelar_new_TaxDetail").on('click', function () {
            $(".cont-form-new-config-isr").addClass("collapse");
        });

        //Mostrar contenedor
        $(".cont-form-new-config-isr").removeClass("collapse");

        //guardar información
        $("#new_TaxDetail").submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
                $.ajax({
                    url: "/detalleimpuestos/guardar",
                    type: "POST",
                    data: $(this).serialize() + `&operation=${option}`,
                    async: true,
                    success: function (data: ResponseUI) {
                        $('.progreso').modal('hide');
                        if (data.Type == "error") {
                            FormatErrors(data);
                        }
                        else {
                            windows_message(data.Message, data.Type);
                            $(".cont-form-new-config-isr").addClass("collapse");

                            //Refrescamos la tabla con la información guardada
                            fn.SearchTaxDetail();
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        });


    },


    //lista detalle de impuestos
    SearchTaxDetail: function () {
        $.ajax({
            url: "detalleimpuestos",
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".tbodyTableTaxDetail").html('');
                    $(".tbodyTableTaxDetail").append(data);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    
}


export { fn }