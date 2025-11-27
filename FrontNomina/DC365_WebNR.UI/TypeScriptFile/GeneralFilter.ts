/**
 * @file GeneralFilter.ts
 * @description Módulo de filtros generales. Proporciona funciones para filtrar
 *              datos en las tablas según diferentes criterios y tipos de datos.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module FiltrosGenerales
 */

/**
 * Configura el tipo de filtro según la opción seleccionada
 * @param {HTMLElement} that - Elemento select con la opción de filtro
 */
function optionFilterFunction(that) {
    let typeFilter = $(that).val().toString().substring(0, 2);

    //Fecha
    if (typeFilter.toLowerCase() == "da") {
        if ($('.textFilterMask').attr("type").toLowerCase() != "date") {
            $('.textFilterMask').val("");
            $('.textFilter').val("");
        }

        $('.textFilterMask').attr("type", "Date");
        $('.textFilterMask').removeClass("plugin-number-format");
    }

    //Decimal
    if (typeFilter.toLowerCase() == "de") {
        if ($('.textFilterMask').attr("type").toLowerCase() != "number") {
            $('.textFilterMask').val("");
            $('.textFilter').val("");
        }

        $('.textFilterMask').attr("type", "Number");
    }

    //Texto
    if (typeFilter.toLowerCase() == "st") {
        if ($('.textFilterMask').attr("type").toLowerCase() != "text") {
            $('.textFilterMask').val("");
            $('.textFilter').val("");
        }

        $('.textFilterMask').attr("type", "Text");
        $('.textFilterMask').removeClass("plugin-number-format");
    }
}


function textFilterMaskFunction(that) {
    //let typeFilter = $(".optionFilter").val().toString().substring(0, 2);

    $(".textFilter").val($(that).val().toString());
}



//Escuchador del filtro
//$('.optionFilter').on('change', function () {


//});


//Escuchador del enter
//$('.textFilterMask').on('keyup', function (e) {
//    var keycode = e.keyCode || e.which;
//    if (keycode == 13) {
//        let typeFilter = $(".optionFilter").val().toString().substring(0, 2);

//        $(".textFilter").val($(this).val().toString());
//        //if (typeFilter.toLowerCase() == "de") {
//        //    $(".textFilter").val(FormatoNumericos_Calcular($(this).val().toString()));
//        //}
//        //else {
//        //}
//    }
//});