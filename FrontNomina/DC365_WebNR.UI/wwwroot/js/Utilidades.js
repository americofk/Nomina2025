/**
 * @file Utilidades.ts
 * @description Funciones utilitarias generales para la aplicación de nómina.
 *              Incluye helpers para manejo de formularios, validaciones,
 *              formateo de datos y comunicación con el servidor.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Utilidades
 */
variables: {
    var page = 1;
    var isBusy = false;
    var isempty = false;
}
var configuracionNumeros = $("#FormatCodeIdOptions").val().toString();
/**
 * Convierte una cadena de texto a mayúsculas
 * @param {string} campo - Texto a convertir
 * @returns {string} Texto en mayúsculas
 */
function Mayuscula(campo) {
    var CampoMayuscula = campo.toUpperCase();
    return CampoMayuscula;
}
//funcion para convertir las primeras letras en mayusculas
function Firtscapitalletter(_word) {
    return _word.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
        return p1.toLowerCase() + p2.toUpperCase();
    });
}
//funcion cacular edad
function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad + 1;
}
//funcion para validar email
function validar_email(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}
//formatiar fecha para editar
function FormatDate(_fecha) {
    var d = new Date(_fecha.split("/").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    if (mm < 10)
        mm = 0 + mm;
    if (dd < 10)
        dd = 0 + dd;
    var newdate = yy + "-" + mm + "-" + dd;
    return newdate;
}
function FormatDateAutoBinding(_fecha) {
    var d = new Date(_fecha);
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    let mm2;
    let dd2;
    if (mm < 10) {
        mm2 = "0" + mm;
    }
    else {
        mm2 = mm.toString();
    }
    if (dd < 10) {
        dd2 = "0" + dd;
    }
    else {
        dd2 = dd.toString();
    }
    var newdate = yy + "-" + mm2 + "-" + dd2;
    return newdate;
}
//Funcion para mostrar modal
//function ListaDesplagable(_element, _modal) {
//    var p = $(_element);
//    var position = p.offset();
//    var modal = "." + _modal;
//    var anchoDocumento = $(document).width();
//    var altoDocumento = $(document).height();
//    var anchoModal = $(modal).width();
//    var altoModal = $(modal).height();
//    if (altoModal == 50) {
//        altoModal = 300;
//    }
//    var dimensionModal_input = anchoModal + position.left;
//    var altoModal_input = altoModal + position.top;
//    var diferenciaDerecha;
//    var diferenciaAbajo;
//    //posicion horizontal
//    if (dimensionModal_input > anchoDocumento) {
//        diferenciaDerecha = anchoDocumento - (p.outerWidth() + position.left);
//        $(modal).css({ right: diferenciaDerecha, left: '' }); //position.left});
//    } else {
//        $(modal).css({ left: position.left, right: '' });
//    }
//    //posicion vertical 
//    if (altoModal_input > altoDocumento) {
//        diferenciaAbajo = altoDocumento - (p.outerHeight() + position.top);
//        $(modal).css({ bottom: diferenciaAbajo + 35, top: '' }); //position.left});
//    } else {
//        $(modal).css({ top: position.top + 35, bottom: '' });
//    }
//    $(modal).removeClass('empleadoCollapse');
//};
//funcion para estilo de adjuntar archivo
$(function () {
    // Capturamos el click en el <a>
    // prevenimos el comportamiento por defecto
    // y replicamos el click en su hermano input.
    $(".trigger-upload").on("click", function (e) {
        e.preventDefault();
        $(this).siblings('.form-file').trigger("click");
    });
});
$(function () {
    // Capturamos el click en el <a>
    // prevenimos el comportamiento por defecto
    // y replicamos el click en su hermano input.
    $(".trigger-upload-emp").on("click", function (e) {
        e.preventDefault();
        $('.form-file').trigger("click");
    });
});
$(function () {
    $(".trigger-upload-doc").on("click", function (e) {
        e.preventDefault();
        $(this).siblings('.form-file-doc').trigger("click");
    });
});
$(function () {
    $(".trigger-uploadTwo").on("click", function (e) {
        e.preventDefault();
        $(this).siblings('.form-fileTwo').trigger("click");
    });
});
//funcion para redireccionar al login
function redireccionaralLogin(result) {
    if (result.status == 400) {
        windows_message("Su sesión ha expirado", "error");
        setTimeout(function () {
            window.location.href = "/Login/Index";
        }, 500);
    }
    else {
        window.location.href = "/Error/Index";
    }
}
//AutomaticBinding
function AutomaticBinding(obj, select, preObj = "") {
    let properties = Object.getOwnPropertyNames(obj);
    let container = document.querySelector(select);
    properties.forEach((x) => {
        let selectByAttr = container.querySelectorAll(`#${preObj}${x}`);
        if (selectByAttr.length > 0) {
            if (selectByAttr[0].type == "checkbox") {
                selectByAttr[0].checked = obj[x];
            }
            else if (selectByAttr[0].type == "select-one") {
                selectByAttr[0].value = obj[x];
            }
            else if (selectByAttr[0].type == "date") {
                selectByAttr[0].value = FormatDateAutoBinding(obj[x]);
            }
            else if (selectByAttr[0].type == "time") {
                if (obj[x] != null && obj[x].TotalMilliseconds != null) {
                    selectByAttr[0].value = FormatHours(obj[x].TotalMilliseconds);
                }
            }
            else {
                selectByAttr[0].value = obj[x];
            }
        }
    });
}
function FormatHours(hora) {
    //let dato = new Date(hora).toISOString().substr(14, 8);
    let dato = new Date(hora).toISOString().substr(11, 8);
    return dato;
}
function NewFormaDate(_fecha, _isToday = false) {
    if (configuracionNumeros == "") {
        configuracionNumeros = "en-US";
    }
    let d;
    if (!_isToday) {
        var newDateArray = _fecha.split("/");
        var newDate;
        if (configuracionNumeros == "en-US") {
            newDate = newDateArray[2] + "-" + newDateArray[0] + "-" + newDateArray[1];
        }
        else {
            newDate = newDateArray[2] + "-" + newDateArray[1] + "-" + newDateArray[0];
        }
        //var newDate01: string = _fecha.split("/").reverse().join("-");
        //if (_fecha.indexOf("T") == -1) {
        //    newDate = newDate + "T00:00:00";
        //}
        d = new Date(newDate);
    }
    else {
        d = new Date();
    }
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    let mm2;
    let dd2;
    if (mm < 10) {
        mm2 = "0" + mm;
    }
    else {
        mm2 = mm.toString();
    }
    if (dd < 10) {
        dd2 = "0" + dd;
    }
    else {
        dd2 = dd.toString();
    }
    var newdate = yy + "-" + mm2 + "-" + dd2;
    return newdate;
}
function FormtFechaTipoCalendario(_fecha) {
    var dd;
    var mm;
    let mm2;
    let dd2;
    var newDateArray = _fecha.split("/");
    var newDate;
    if (configuracionNumeros == "en-US") {
        dd = parseInt(newDateArray[1]);
        mm = parseInt(newDateArray[0]);
        if (mm < 10) {
            mm2 = "0" + mm;
        }
        else {
            mm2 = mm.toString();
        }
        if (dd < 10) {
            dd2 = "0" + dd;
        }
        else {
            dd2 = dd.toString();
        }
        return newDate = newDateArray[2] + "-" + mm2 + "-" + dd2;
    }
    else {
        return newDate = newDateArray[2] + "-" + newDateArray[1] + "-" + newDateArray[0];
    }
}
//Lista de departamentos
function ListDeparment(_option = "#DepartmentId") {
    if ($(_option)[0].children.length == 0) {
        $.ajax({
            url: "/puestosactivos/Buscardepartamentos",
            type: "Get",
            async: false,
            success: function (data) {
                $(_option).html('');
                // Agregar opción vacía al inicio
                var emptyOption = $(document.createElement('option'));
                emptyOption.text('-- Seleccione --');
                emptyOption.val('');
                $(_option).append(emptyOption);
                if (data.length > 0) {
                    $(data).each(function () {
                        var option = $(document.createElement('option'));
                        option.text(this.Name);
                        option.val(this.DepartmentId);
                        $(_option).append(option);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
}
//Lista de cargos
function ListJobs() {
    if ($("#JobId")[0].children.length == 0) {
        $.ajax({
            url: "/puestosactivos/BuscarCargos",
            type: "Get",
            async: false,
            success: function (data) {
                $("#JobId").html('');
                // Agregar opción vacía al inicio
                var emptyOption = $(document.createElement('option'));
                emptyOption.text('-- Seleccione --');
                emptyOption.val('');
                $("#JobId").append(emptyOption);
                if (data.length > 0) {
                    $(data).each(function () {
                        var option = $(document.createElement('option'));
                        option.text(this.Name);
                        option.val(this.JobId);
                        $("#JobId").append(option);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
}
//Lista de puestos
function ListPosition() {
    if ($("#NotifyPositionId")[0].children.length == 0) {
        $.ajax({
            url: "/vacantes/BuscarPuestos",
            type: "POST",
            async: false,
            success: function (data) {
                $("#NotifyPositionId").html('');
                // Agregar opción vacía al inicio
                var emptyOption = $(document.createElement('option'));
                emptyOption.text('-- Seleccione --');
                emptyOption.val('');
                $("#NotifyPositionId").append(emptyOption);
                if (data.length > 0) {
                    $(data).each(function () {
                        var option = $(document.createElement('option'));
                        option.text(this.PositionName);
                        option.val(this.PositionId);
                        $("#NotifyPositionId").append(option);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
}
//Lista de paises
function ListCountries(Campo) {
    if ($(Campo)[0].children.length == 0) {
        $.ajax({
            url: "/direccionempleados/paises",
            type: "GET",
            async: false,
            success: function (data) {
                if (data.length > 0) {
                    $(Campo).html('');
                    $(data).each(function () {
                        var option = $(document.createElement('option'));
                        option.text(this.Name);
                        option.val(this.CountryId);
                        $(Campo).append(option);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
}
function formatNumberGraf(value) {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
function FormatErrors(data) {
    var _errors = "";
    data.Errors.forEach(function (x) {
        _errors += `${x}<br>`;
    });
    windows_message(_errors, data.Type);
}
//function SimboloDecimal(_formato) {
//    var simbolo_decimal = 1.1;
//    return simbolo_decimal.toLocaleString(_formato).substring(2, 1);
//}
//formato numerico para calcular
//function FormatoNumericos_Calcular(_numero) {
//    if (configuracionNumeros == "") {
//        configuracionNumeros = "en-US";
//    }
//    if (SimboloDecimal(configuracionNumeros) == '.') {
//        _numero = _numero.replace(/,/g, "");
//    }
//    else {
//        _numero = _numero.replace(/\./g, "");
//        _numero = _numero.replace(/,/g, ".");
//    }
//    var formanumero = parseFloat(_numero);
//    if (isNaN(formanumero)) {
//        formanumero = 0;
//    }
//    return parseFloat(formanumero.toFixed(2));
//}
//function FormatoNumericos_Mostrar(_numero) {
//    if (configuracionNumeros == "") {
//        configuracionNumeros = "en-US";
//    }
//    if (SimboloDecimal(configuracionNumeros) == '.') {
//        _numero = _numero.replace(/,/g, "");
//    }
//    else {
//        _numero = _numero.replace(/\./g, "");
//        _numero = _numero.replace(/,/g, ".");
//    }
//    var formanumero = parseFloat(_numero);
//    if (isNaN(formanumero)) {
//        formanumero = 0;
//    }
//    return new Intl.NumberFormat(configuracionNumeros).format(formanumero);
//}
function FormatoNumericos_Mostrar(_numero, _modifiedFormat = false) {
    //Sección diseñada para corregir los formatos al realizar operaciones con números
    if (SimboloDecimal(configuracionNumeros) != '.' && _modifiedFormat == true) {
        _numero = _numero.replace(/\./g, ",");
    }
    if (configuracionNumeros == "") {
        configuracionNumeros = "en-US";
    }
    if (SimboloDecimal(configuracionNumeros) == '.') {
        _numero = _numero.replace(/,/g, "");
    }
    else {
        _numero = _numero.replace(/\./g, "");
        _numero = _numero.replace(/,/g, ".");
    }
    var formanumero = parseFloat(_numero);
    if (isNaN(formanumero)) {
        formanumero = 0;
    }
    return new Intl.NumberFormat(configuracionNumeros).format(parseFloat(formanumero.toFixed(2)));
}
function SimboloDecimal(_formato) {
    var simbolo_decimal = 1.1;
    return simbolo_decimal.toLocaleString(_formato).substring(2, 1);
}
//formato numerico para calcular
function FormatoNumericos_Calcular(_numero) {
    if (configuracionNumeros == "") {
        configuracionNumeros = "en-US";
    }
    if (SimboloDecimal(configuracionNumeros) == '.') {
        _numero = _numero.replace(/,/g, "");
    }
    else {
        _numero = _numero.replace(/\./g, "");
        _numero = _numero.replace(/,/g, ".");
    }
    var formanumero = parseFloat(_numero);
    if (isNaN(formanumero)) {
        formanumero = 0;
    }
    return parseFloat(formanumero.toFixed(2));
}
//plugin para el formato  numérico
function UsePluginNumberFormat(form) {
    $(".plugin-number-format").on("change", function () {
        let that = this;
        let num = that.value;
        $(that).val(FormatoNumericos_Mostrar(num));
    });
    $(`${form} .plugin-number-format`).each(function (e) {
        let that = this;
        let num = that.value;
        if (configuracionNumeros == "en-US") {
            num = num.replace(",", ".");
        }
        else {
            num = num.replace(".", ",");
        }
        $(that).val(FormatoNumericos_Mostrar(num));
    });
}
//tr loader
function AddTrLoader(element) {
    $(element).prepend('<tr class="tr-loader"><td colspan="1"> </td><td colspan="1"> '
        + '<div></div></td><td colspan="4" ><div></div></td ><td colspan="2" ><div></div></td > <td colspan="3"><div></div></td> <td colspan="5" ><div></div></td></tr>');
}
function Datafilter(_tbodytable, _url, _typeEmploye = "", _namefiltre = ".optionFilter", _valuesFilter = '.textFilter') {
    AddTrLoader($(_tbodytable));
    $.ajax({
        url: _url,
        data: {
            PropertyName: $(_namefiltre).val().toString(),
            PropertyValue: $(_valuesFilter).val().toString(),
            type: _typeEmploye
        },
        type: "GET",
        async: true,
        success: function (data) {
            $(_tbodytable).html('');
            $(_tbodytable).append(data);
        }, error: function (xhr) {
            redireccionaralLogin(xhr);
        }
    });
}
function DatafilterModals(_tbodytable, _url, _employeeid, _namefiltre = ".optionFilterModal", _valuesFilter = '.textFilterModal') {
    AddTrLoader($(_tbodytable));
    $.ajax({
        url: _url,
        data: {
            PropertyName: $(_namefiltre).val().toString(),
            PropertyValue: $(_valuesFilter).val().toString(),
            employeeid: _employeeid
        },
        type: "GET",
        async: true,
        success: function (data) {
            $(_tbodytable).html('');
            $(_tbodytable).append(data);
        }, error: function (xhr) {
            redireccionaralLogin(xhr);
        }
    });
}
function moredata(_maxscroll, _controller, _tbody, _type = "", _isVersion = false, _id = "") {
    page++;
    isBusy = true;
    if (!isempty) {
        $.ajax({
            url: `/${_controller}/FilterOrMoreData`,
            data: {
                _PageNumber: page,
                type: _type,
                IsVersion: _isVersion,
                Id: _id
            },
            type: "GET",
            async: true,
            success: function (data) {
                if (data != "") {
                    $(_tbody).children().last().after(data);
                    $("#content-scroll").scrollTop(_maxscroll);
                    //Código para mostrar la ayuda
                    $(".id-batch-info").on("click", function () {
                        let that = $(this)[0];
                        showhelp(that, "/historiallotes/InfoProcess", ".cont-batch-info");
                        $(".card-help > p").html(splitMessage($(this).parent().parent().find('.data-info-batch').html().trim()));
                    });
                }
                else {
                    isempty = true;
                }
                isBusy = false;
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
}
// ============================================================================
// Funcion para habilitar doble clic en filas de tablas ListPage
// Uso con parametro: enableRowDoubleClick('.tbody-Table-Department', '.DepartmentIdtbl', '/departamentosactivos/getbyid', callback, 'Id')
// Uso con URL: enableRowDoubleClick('.tbody-Table-X', '.XIdtbl', '/endpoint/{id}', callback) - {id} se reemplaza con el valor
// ============================================================================
function enableRowDoubleClick(tbodySelector, idCellSelector, ajaxUrl, onSuccessCallback, idParamName = "Id") {
    // Delegacion de eventos para filas dinamicas
    $(document).on('dblclick', `${tbodySelector} .row-app`, function (e) {
        // Evitar que el doble clic en checkbox dispare la edicion
        if ($(e.target).is('input[type="checkbox"]') || $(e.target).is('label')) {
            return;
        }
        // Obtener el ID del registro desde la celda especificada
        const rowId = $(this).find(idCellSelector).text().trim();
        if (!rowId) {
            console.warn('No se pudo obtener el ID del registro');
            return;
        }
        // Mostrar indicador de carga
        $('.progreso').modal({ backdrop: 'static', keyboard: false });
        // Determinar si la URL usa placeholder {id} o parametro
        let finalUrl = ajaxUrl;
        let ajaxData = {};
        if (ajaxUrl.includes('{id}')) {
            // URL con ID en la ruta: /endpoint/{id} -> /endpoint/123
            finalUrl = ajaxUrl.replace('{id}', rowId);
        }
        else if (idParamName) {
            // URL con parametro: /endpoint?Id=123
            ajaxData[idParamName] = rowId;
        }
        // Llamar al endpoint para obtener los datos
        $.ajax({
            url: finalUrl,
            type: "GET",
            data: ajaxData,
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                if (data != null) {
                    onSuccessCallback(data);
                }
                else {
                    windows_message("No se encontro el registro", "error");
                }
            },
            error: function (xhr) {
                $('.progreso').modal('hide');
                redireccionaralLogin(xhr);
            }
        });
    });
    // Agregar clase para indicar que las filas son clickeables
    $(`${tbodySelector} .row-app`).addClass('row-clickable');
    // Observar cambios en el DOM para aplicar clase a nuevas filas
    const observer = new MutationObserver(function (mutations) {
        $(`${tbodySelector} .row-app`).not('.row-clickable').addClass('row-clickable');
    });
    const targetNode = document.querySelector(tbodySelector);
    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbGlkYWRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL1V0aWxpZGFkZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0dBUUc7QUFFSCxTQUFTLEVBQUUsQ0FBQztJQUNSLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNiLElBQUksTUFBTSxHQUFZLEtBQUssQ0FBQztJQUM1QixJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7QUFDakMsQ0FBQztBQUNELElBQUksb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7QUFFdEU7Ozs7R0FJRztBQUNILFNBQVMsU0FBUyxDQUFDLEtBQWE7SUFDNUIsSUFBSSxjQUFjLEdBQVcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pELE9BQU8sY0FBYyxDQUFDO0FBQzFCLENBQUM7QUFFRCwwREFBMEQ7QUFDMUQsU0FBUyxrQkFBa0IsQ0FBQyxLQUFhO0lBQ3JDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFDakMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDZixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsc0JBQXNCO0FBQ3RCLFNBQVMsWUFBWSxDQUFDLEtBQUs7SUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNyQixJQUFJLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFR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LFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgVXRpbGlkYWRlcy50c1xyXG4gKiBAZGVzY3JpcHRpb24gRnVuY2lvbmVzIHV0aWxpdGFyaWFzIGdlbmVyYWxlcyBwYXJhIGxhIGFwbGljYWNpw7NuIGRlIG7Ds21pbmEuXHJcbiAqICAgICAgICAgICAgICBJbmNsdXllIGhlbHBlcnMgcGFyYSBtYW5lam8gZGUgZm9ybXVsYXJpb3MsIHZhbGlkYWNpb25lcyxcclxuICogICAgICAgICAgICAgIGZvcm1hdGVvIGRlIGRhdG9zIHkgY29tdW5pY2FjacOzbiBjb24gZWwgc2Vydmlkb3IuXHJcbiAqIEBhdXRob3IgRXF1aXBvIGRlIERlc2Fycm9sbG9cclxuICogQGRhdGUgMjAyNVxyXG4gKiBAbW9kdWxlIFV0aWxpZGFkZXNcclxuICovXHJcblxyXG52YXJpYWJsZXM6IHtcclxuICAgIHZhciBwYWdlID0gMTtcclxuICAgIHZhciBpc0J1c3k6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHZhciBpc2VtcHR5OiBib29sZWFuID0gZmFsc2U7XHJcbn1cclxudmFyIGNvbmZpZ3VyYWNpb25OdW1lcm9zID0gJChcIiNGb3JtYXRDb2RlSWRPcHRpb25zXCIpLnZhbCgpLnRvU3RyaW5nKCk7XHJcblxyXG4vKipcclxuICogQ29udmllcnRlIHVuYSBjYWRlbmEgZGUgdGV4dG8gYSBtYXnDunNjdWxhc1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2FtcG8gLSBUZXh0byBhIGNvbnZlcnRpclxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUZXh0byBlbiBtYXnDunNjdWxhc1xyXG4gKi9cclxuZnVuY3Rpb24gTWF5dXNjdWxhKGNhbXBvOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgdmFyIENhbXBvTWF5dXNjdWxhOiBzdHJpbmcgPSBjYW1wby50b1VwcGVyQ2FzZSgpO1xyXG4gICAgcmV0dXJuIENhbXBvTWF5dXNjdWxhO1xyXG59XHJcblxyXG4vL2Z1bmNpb24gcGFyYSBjb252ZXJ0aXIgbGFzIHByaW1lcmFzIGxldHJhcyBlbiBtYXl1c2N1bGFzXHJcbmZ1bmN0aW9uIEZpcnRzY2FwaXRhbGxldHRlcihfd29yZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBfd29yZC5yZXBsYWNlKC8oXnxcXHMpKFthLXpdKS9nLFxyXG4gICAgICAgIGZ1bmN0aW9uIChtLCBwMSwgcDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHAxLnRvTG93ZXJDYXNlKCkgKyBwMi50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG4vL2Z1bmNpb24gY2FjdWxhciBlZGFkXHJcbmZ1bmN0aW9uIGNhbGN1bGFyRWRhZChmZWNoYSkge1xyXG4gICAgdmFyIGhveSA9IG5ldyBEYXRlKCk7XHJcbiAgICB2YXIgY3VtcGxlYW5vcyA9IG5ldyBEYXRlKGZlY2hhKTtcclxuICAgIHZhciBlZGFkID0gaG95LmdldEZ1bGxZZWFyKCkgLSBjdW1wbGVhbm9zLmdldEZ1bGxZZWFyKCk7XHJcbiAgICB2YXIgbSA9IGhveS5nZXRNb250aCgpIC0gY3VtcGxlYW5vcy5nZXRNb250aCgpO1xyXG5cclxuICAgIGlmIChtIDwgMCB8fCAobSA9PT0gMCAmJiBob3kuZ2V0RGF0ZSgpIDwgY3VtcGxlYW5vcy5nZXREYXRlKCkpKSB7XHJcbiAgICAgICAgZWRhZC0tO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlZGFkKzE7XHJcbn1cclxuXHJcbi8vZnVuY2lvbiBwYXJhIHZhbGlkYXIgZW1haWxcclxuZnVuY3Rpb24gdmFsaWRhcl9lbWFpbChlbWFpbDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICB2YXIgcmVnZXggPSAvXihbYS16QS1aMC05X1xcLlxcLV0pK1xcQCgoW2EtekEtWjAtOVxcLV0pK1xcLikrKFthLXpBLVowLTldezIsNH0pKyQvO1xyXG4gICAgcmV0dXJuIHJlZ2V4LnRlc3QoZW1haWwpID8gdHJ1ZSA6IGZhbHNlO1xyXG59XHJcblxyXG4vL2Zvcm1hdGlhciBmZWNoYSBwYXJhIGVkaXRhclxyXG5mdW5jdGlvbiBGb3JtYXREYXRlKF9mZWNoYTogc3RyaW5nKSB7XHJcbiAgICB2YXIgZCA9IG5ldyBEYXRlKF9mZWNoYS5zcGxpdChcIi9cIikucmV2ZXJzZSgpLmpvaW4oXCItXCIpKTtcclxuICAgIHZhciBkZCA9IGQuZ2V0RGF0ZSgpO1xyXG4gICAgdmFyIG1tID0gZC5nZXRNb250aCgpICsgMTtcclxuICAgIHZhciB5eSA9IGQuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICBpZiAobW0gPCAxMCkgbW0gPSAwICsgbW07XHJcbiAgICBpZiAoZGQgPCAxMCkgZGQgPSAwICsgZGQ7XHJcbiAgICB2YXIgbmV3ZGF0ZSA9IHl5ICsgXCItXCIgKyBtbSArIFwiLVwiICsgZGQ7XHJcbiAgICByZXR1cm4gbmV3ZGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gRm9ybWF0RGF0ZUF1dG9CaW5kaW5nKF9mZWNoYTogc3RyaW5nKSB7XHJcbiAgICB2YXIgZCA9IG5ldyBEYXRlKF9mZWNoYSk7XHJcbiAgICB2YXIgZGQ6IG51bWJlciA9IGQuZ2V0RGF0ZSgpO1xyXG4gICAgdmFyIG1tOiBudW1iZXIgPSBkLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgdmFyIHl5OiBudW1iZXIgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBsZXQgbW0yOiBzdHJpbmc7XHJcbiAgICBsZXQgZGQyOiBzdHJpbmc7XHJcblxyXG4gICAgaWYgKG1tIDwgMTApIHtcclxuICAgICAgICBtbTIgPSBcIjBcIiArIG1tO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbW0yID0gbW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGQgPCAxMCkge1xyXG4gICAgICAgIGRkMiA9IFwiMFwiICsgZGQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkZDIgPSBkZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBuZXdkYXRlID0geXkgKyBcIi1cIiArIG1tMiArIFwiLVwiICsgZGQyO1xyXG4gICAgcmV0dXJuIG5ld2RhdGU7XHJcbn1cclxuXHJcbi8vRnVuY2lvbiBwYXJhIG1vc3RyYXIgbW9kYWxcclxuLy9mdW5jdGlvbiBMaXN0YURlc3BsYWdhYmxlKF9lbGVtZW50LCBfbW9kYWwpIHtcclxuXHJcbi8vICAgIHZhciBwID0gJChfZWxlbWVudCk7XHJcbi8vICAgIHZhciBwb3NpdGlvbiA9IHAub2Zmc2V0KCk7XHJcbi8vICAgIHZhciBtb2RhbCA9IFwiLlwiICsgX21vZGFsO1xyXG4vLyAgICB2YXIgYW5jaG9Eb2N1bWVudG8gPSAkKGRvY3VtZW50KS53aWR0aCgpO1xyXG4vLyAgICB2YXIgYWx0b0RvY3VtZW50byA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xyXG4vLyAgICB2YXIgYW5jaG9Nb2RhbCA9ICQobW9kYWwpLndpZHRoKCk7XHJcbi8vICAgIHZhciBhbHRvTW9kYWwgPSAkKG1vZGFsKS5oZWlnaHQoKTtcclxuXHJcbi8vICAgIGlmIChhbHRvTW9kYWwgPT0gNTApIHtcclxuLy8gICAgICAgIGFsdG9Nb2RhbCA9IDMwMDtcclxuLy8gICAgfVxyXG5cclxuLy8gICAgdmFyIGRpbWVuc2lvbk1vZGFsX2lucHV0ID0gYW5jaG9Nb2RhbCArIHBvc2l0aW9uLmxlZnQ7XHJcbi8vICAgIHZhciBhbHRvTW9kYWxfaW5wdXQgPSBhbHRvTW9kYWwgKyBwb3NpdGlvbi50b3A7XHJcbi8vICAgIHZhciBkaWZlcmVuY2lhRGVyZWNoYTtcclxuLy8gICAgdmFyIGRpZmVyZW5jaWFBYmFqbztcclxuXHJcbi8vICAgIC8vcG9zaWNpb24gaG9yaXpvbnRhbFxyXG4vLyAgICBpZiAoZGltZW5zaW9uTW9kYWxfaW5wdXQgPiBhbmNob0RvY3VtZW50bykge1xyXG5cclxuLy8gICAgICAgIGRpZmVyZW5jaWFEZXJlY2hhID0gYW5jaG9Eb2N1bWVudG8gLSAocC5vdXRlcldpZHRoKCkgKyBwb3NpdGlvbi5sZWZ0KTtcclxuLy8gICAgICAgICQobW9kYWwpLmNzcyh7IHJpZ2h0OiBkaWZlcmVuY2lhRGVyZWNoYSwgbGVmdDogJycgfSk7IC8vcG9zaXRpb24ubGVmdH0pO1xyXG5cclxuLy8gICAgfSBlbHNlIHtcclxuLy8gICAgICAgICQobW9kYWwpLmNzcyh7IGxlZnQ6IHBvc2l0aW9uLmxlZnQsIHJpZ2h0OiAnJyB9KTtcclxuLy8gICAgfVxyXG4vLyAgICAvL3Bvc2ljaW9uIHZlcnRpY2FsIFxyXG4vLyAgICBpZiAoYWx0b01vZGFsX2lucHV0ID4gYWx0b0RvY3VtZW50bykge1xyXG5cclxuLy8gICAgICAgIGRpZmVyZW5jaWFBYmFqbyA9IGFsdG9Eb2N1bWVudG8gLSAocC5vdXRlckhlaWdodCgpICsgcG9zaXRpb24udG9wKTtcclxuLy8gICAgICAgICQobW9kYWwpLmNzcyh7IGJvdHRvbTogZGlmZXJlbmNpYUFiYWpvICsgMzUsIHRvcDogJycgfSk7IC8vcG9zaXRpb24ubGVmdH0pO1xyXG5cclxuLy8gICAgfSBlbHNlIHtcclxuLy8gICAgICAgICQobW9kYWwpLmNzcyh7IHRvcDogcG9zaXRpb24udG9wICsgMzUsIGJvdHRvbTogJycgfSk7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgICQobW9kYWwpLnJlbW92ZUNsYXNzKCdlbXBsZWFkb0NvbGxhcHNlJyk7XHJcbi8vfTtcclxuXHJcbi8vZnVuY2lvbiBwYXJhIGVzdGlsbyBkZSBhZGp1bnRhciBhcmNoaXZvXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIENhcHR1cmFtb3MgZWwgY2xpY2sgZW4gZWwgPGE+XHJcbiAgICAvLyBwcmV2ZW5pbW9zIGVsIGNvbXBvcnRhbWllbnRvIHBvciBkZWZlY3RvXHJcbiAgICAvLyB5IHJlcGxpY2Ftb3MgZWwgY2xpY2sgZW4gc3UgaGVybWFubyBpbnB1dC5cclxuICAgICQoXCIudHJpZ2dlci11cGxvYWRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuZm9ybS1maWxlJykudHJpZ2dlcihcImNsaWNrXCIpO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIENhcHR1cmFtb3MgZWwgY2xpY2sgZW4gZWwgPGE+XHJcbiAgICAvLyBwcmV2ZW5pbW9zIGVsIGNvbXBvcnRhbWllbnRvIHBvciBkZWZlY3RvXHJcbiAgICAvLyB5IHJlcGxpY2Ftb3MgZWwgY2xpY2sgZW4gc3UgaGVybWFubyBpbnB1dC5cclxuICAgICQoXCIudHJpZ2dlci11cGxvYWQtZW1wXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnLmZvcm0tZmlsZScpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAkKFwiLnRyaWdnZXItdXBsb2FkLWRvY1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQodGhpcykuc2libGluZ3MoJy5mb3JtLWZpbGUtZG9jJykudHJpZ2dlcihcImNsaWNrXCIpO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIi50cmlnZ2VyLXVwbG9hZFR3b1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQodGhpcykuc2libGluZ3MoJy5mb3JtLWZpbGVUd28nKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4vL2Z1bmNpb24gcGFyYSByZWRpcmVjY2lvbmFyIGFsIGxvZ2luXHJcbmZ1bmN0aW9uIHJlZGlyZWNjaW9uYXJhbExvZ2luKHJlc3VsdDogYW55KSB7XHJcbiAgICBpZiAocmVzdWx0LnN0YXR1cyA9PSA0MDApIHtcclxuICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJTdSBzZXNpw7NuIGhhIGV4cGlyYWRvXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvTG9naW4vSW5kZXhcIjtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9FcnJvci9JbmRleFwiOyAgICAgICAgXHJcbiAgICB9XHJcbiAgIFxyXG5cclxufVxyXG5cclxuLy9BdXRvbWF0aWNCaW5kaW5nXHJcbmZ1bmN0aW9uIEF1dG9tYXRpY0JpbmRpbmcob2JqOiBvYmplY3QsIHNlbGVjdDogc3RyaW5nLCBwcmVPYmo6IHN0cmluZyA9IFwiXCIpIHtcclxuXHJcbiAgICBsZXQgcHJvcGVydGllcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XHJcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3QpO1xyXG5cclxuICAgIHByb3BlcnRpZXMuZm9yRWFjaCgoeCkgPT4ge1xyXG4gICAgICAgIGxldCBzZWxlY3RCeUF0dHI6IE5vZGVMaXN0T2Y8SFRNTElucHV0RWxlbWVudD4gPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChgIyR7cHJlT2JqfSR7eH1gKTtcclxuICAgICAgICBpZiAoc2VsZWN0QnlBdHRyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdEJ5QXR0clswXS50eXBlID09IFwiY2hlY2tib3hcIikge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0QnlBdHRyWzBdLmNoZWNrZWQgPSBvYmpbeF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2VsZWN0QnlBdHRyWzBdLnR5cGUgPT0gXCJzZWxlY3Qtb25lXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS52YWx1ZSA9IG9ialt4XTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RCeUF0dHJbMF0udHlwZSA9PSBcImRhdGVcIikge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0QnlBdHRyWzBdLnZhbHVlID0gRm9ybWF0RGF0ZUF1dG9CaW5kaW5nKG9ialt4XSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChzZWxlY3RCeUF0dHJbMF0udHlwZSA9PSBcInRpbWVcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialt4XSAhPSBudWxsICYmIG9ialt4XS5Ub3RhbE1pbGxpc2Vjb25kcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0QnlBdHRyWzBdLnZhbHVlID0gRm9ybWF0SG91cnMob2JqW3hdLlRvdGFsTWlsbGlzZWNvbmRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS52YWx1ZSA9IG9ialt4XTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gRm9ybWF0SG91cnMoaG9yYSkge1xyXG4gICAgLy9sZXQgZGF0byA9IG5ldyBEYXRlKGhvcmEpLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDE0LCA4KTtcclxuICAgIGxldCBkYXRvID0gbmV3IERhdGUoaG9yYSkudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsIDgpO1xyXG4gICAgcmV0dXJuIGRhdG87XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gTmV3Rm9ybWFEYXRlKF9mZWNoYTogc3RyaW5nLCBfaXNUb2RheTpib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmIChjb25maWd1cmFjaW9uTnVtZXJvcyA9PSBcIlwiKSB7XHJcbiAgICAgICAgY29uZmlndXJhY2lvbk51bWVyb3MgPSBcImVuLVVTXCI7XHJcbiAgICB9XHJcbiAgICBsZXQgZDogRGF0ZTtcclxuICAgIGlmICghX2lzVG9kYXkpIHtcclxuICAgICAgICB2YXIgbmV3RGF0ZUFycmF5OiBBcnJheTxzdHJpbmc+ID0gX2ZlY2hhLnNwbGl0KFwiL1wiKTtcclxuICAgICAgICB2YXIgbmV3RGF0ZTogc3RyaW5nO1xyXG4gICAgICAgIGlmIChjb25maWd1cmFjaW9uTnVtZXJvcyA9PSBcImVuLVVTXCIpIHtcclxuICAgICAgICAgICAgbmV3RGF0ZSA9IG5ld0RhdGVBcnJheVsyXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzBdICsgXCItXCIgKyBuZXdEYXRlQXJyYXlbMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3RGF0ZSA9IG5ld0RhdGVBcnJheVsyXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzFdICsgXCItXCIgKyBuZXdEYXRlQXJyYXlbMF07XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3ZhciBuZXdEYXRlMDE6IHN0cmluZyA9IF9mZWNoYS5zcGxpdChcIi9cIikucmV2ZXJzZSgpLmpvaW4oXCItXCIpO1xyXG4gICAgICAgIC8vaWYgKF9mZWNoYS5pbmRleE9mKFwiVFwiKSA9PSAtMSkge1xyXG4gICAgICAgIC8vICAgIG5ld0RhdGUgPSBuZXdEYXRlICsgXCJUMDA6MDA6MDBcIjtcclxuICAgICAgICAvL31cclxuICAgICAgICBkID0gbmV3IERhdGUobmV3RGF0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZDogbnVtYmVyID0gZC5nZXREYXRlKCk7XHJcbiAgICB2YXIgbW06IG51bWJlciA9IGQuZ2V0TW9udGgoKSArIDE7XHJcbiAgICB2YXIgeXk6IG51bWJlciA9IGQuZ2V0RnVsbFllYXIoKTtcclxuICAgIGxldCBtbTI6IHN0cmluZztcclxuICAgIGxldCBkZDI6IHN0cmluZztcclxuXHJcbiAgICBpZiAobW0gPCAxMCkge1xyXG4gICAgICAgIG1tMiA9IFwiMFwiICsgbW07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBtbTIgPSBtbS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZCA8IDEwKSB7XHJcbiAgICAgICAgZGQyID0gXCIwXCIgKyBkZDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGRkMiA9IGRkLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG5ld2RhdGUgPSB5eSArIFwiLVwiICsgbW0yICsgXCItXCIgKyBkZDI7XHJcbiAgICByZXR1cm4gbmV3ZGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gRm9ybXRGZWNoYVRpcG9DYWxlbmRhcmlvKF9mZWNoYSkge1xyXG4gICAgdmFyIGRkOiBudW1iZXI7XHJcbiAgICB2YXIgbW06IG51bWJlcjtcclxuICAgIGxldCBtbTI6IHN0cmluZztcclxuICAgIGxldCBkZDI6IHN0cmluZztcclxuICAgIHZhciBuZXdEYXRlQXJyYXk6IEFycmF5PHN0cmluZz4gPSBfZmVjaGEuc3BsaXQoXCIvXCIpO1xyXG4gICAgdmFyIG5ld0RhdGU6IHN0cmluZztcclxuICAgIGlmIChjb25maWd1cmFjaW9uTnVtZXJvcyA9PSBcImVuLVVTXCIpIHtcclxuICAgICAgICBkZCA9IHBhcnNlSW50KG5ld0RhdGVBcnJheVsxXSk7XHJcbiAgICAgICAgbW0gPSBwYXJzZUludChuZXdEYXRlQXJyYXlbMF0pO1xyXG4gICAgICAgIGlmIChtbSA8IDEwKSB7XHJcbiAgICAgICAgICAgIG1tMiA9IFwiMFwiICsgbW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtbTIgPSBtbS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRkIDwgMTApIHtcclxuICAgICAgICAgICAgZGQyID0gXCIwXCIgKyBkZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRkMiA9IGRkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdEYXRlID0gbmV3RGF0ZUFycmF5WzJdICsgXCItXCIgKyBtbTIgKyBcIi1cIiArIGRkMiA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBuZXdEYXRlID0gbmV3RGF0ZUFycmF5WzJdICsgXCItXCIgKyBuZXdEYXRlQXJyYXlbMV0gKyBcIi1cIiArIG5ld0RhdGVBcnJheVswXTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vTGlzdGEgZGUgZGVwYXJ0YW1lbnRvc1xyXG5mdW5jdGlvbiBMaXN0RGVwYXJtZW50KF9vcHRpb246IHN0cmluZyA9IFwiI0RlcGFydG1lbnRJZFwiKSB7XHJcbiAgICBpZiAoJChfb3B0aW9uKVswXS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvcHVlc3Rvc2FjdGl2b3MvQnVzY2FyZGVwYXJ0YW1lbnRvc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdldFwiLFxyXG4gICAgICAgICAgICBhc3luYzogZmFsc2UsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJChfb3B0aW9uKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgIC8vIEFncmVnYXIgb3BjacOzbiB2YWPDrWEgYWwgaW5pY2lvXHJcbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlPcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgIGVtcHR5T3B0aW9uLnRleHQoJy0tIFNlbGVjY2lvbmUgLS0nKTtcclxuICAgICAgICAgICAgICAgIGVtcHR5T3B0aW9uLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAkKF9vcHRpb24pLmFwcGVuZChlbXB0eU9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkYXRhKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCh0aGlzLk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKHRoaXMuRGVwYXJ0bWVudElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChfb3B0aW9uKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vL0xpc3RhIGRlIGNhcmdvc1xyXG5mdW5jdGlvbiBMaXN0Sm9icygpIHtcclxuICAgIGlmICgkKFwiI0pvYklkXCIpWzBdLmNoaWxkcmVuLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9wdWVzdG9zYWN0aXZvcy9CdXNjYXJDYXJnb3NcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHZXRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgJChcIiNKb2JJZFwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgIC8vIEFncmVnYXIgb3BjacOzbiB2YWPDrWEgYWwgaW5pY2lvXHJcbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlPcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgIGVtcHR5T3B0aW9uLnRleHQoJy0tIFNlbGVjY2lvbmUgLS0nKTtcclxuICAgICAgICAgICAgICAgIGVtcHR5T3B0aW9uLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0pvYklkXCIpLmFwcGVuZChlbXB0eU9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkYXRhKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCh0aGlzLk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKHRoaXMuSm9iSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0pvYklkXCIpLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vTGlzdGEgZGUgcHVlc3Rvc1xyXG5mdW5jdGlvbiBMaXN0UG9zaXRpb24oKSB7XHJcbiAgICBpZiAoJChcIiNOb3RpZnlQb3NpdGlvbklkXCIpWzBdLmNoaWxkcmVuLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi92YWNhbnRlcy9CdXNjYXJQdWVzdG9zXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoXCIjTm90aWZ5UG9zaXRpb25JZFwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgIC8vIEFncmVnYXIgb3BjacOzbiB2YWPDrWEgYWwgaW5pY2lvXHJcbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlPcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgIGVtcHR5T3B0aW9uLnRleHQoJy0tIFNlbGVjY2lvbmUgLS0nKTtcclxuICAgICAgICAgICAgICAgIGVtcHR5T3B0aW9uLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI05vdGlmeVBvc2l0aW9uSWRcIikuYXBwZW5kKGVtcHR5T3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGRhdGEpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0KHRoaXMuUG9zaXRpb25OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLlBvc2l0aW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI05vdGlmeVBvc2l0aW9uSWRcIikuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy9MaXN0YSBkZSBwYWlzZXNcclxuZnVuY3Rpb24gTGlzdENvdW50cmllcyhDYW1wbzpzdHJpbmcpIHtcclxuICAgIGlmICgkKENhbXBvKVswXS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvZGlyZWNjaW9uZW1wbGVhZG9zL3BhaXNlc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKENhbXBvKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRhdGEpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0KHRoaXMuTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWwodGhpcy5Db3VudHJ5SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKENhbXBvKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdE51bWJlckdyYWYodmFsdWU6bnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdmFsdWUudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLCB7IHN0eWxlOiBcImN1cnJlbmN5XCIsIGN1cnJlbmN5OiBcIlVTRFwiIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gRm9ybWF0RXJyb3JzKGRhdGEpIHtcclxuICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgfSk7XHJcbiAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlKTtcclxufVxyXG5cclxuLy9mdW5jdGlvbiBTaW1ib2xvRGVjaW1hbChfZm9ybWF0bykge1xyXG4vLyAgICB2YXIgc2ltYm9sb19kZWNpbWFsID0gMS4xO1xyXG4vLyAgICByZXR1cm4gc2ltYm9sb19kZWNpbWFsLnRvTG9jYWxlU3RyaW5nKF9mb3JtYXRvKS5zdWJzdHJpbmcoMiwgMSk7XHJcbi8vfVxyXG5cclxuLy9mb3JtYXRvIG51bWVyaWNvIHBhcmEgY2FsY3VsYXJcclxuLy9mdW5jdGlvbiBGb3JtYXRvTnVtZXJpY29zX0NhbGN1bGFyKF9udW1lcm8pIHtcclxuXHJcbi8vICAgIGlmIChjb25maWd1cmFjaW9uTnVtZXJvcyA9PSBcIlwiKSB7XHJcbi8vICAgICAgICBjb25maWd1cmFjaW9uTnVtZXJvcyA9IFwiZW4tVVNcIjtcclxuLy8gICAgfVxyXG5cclxuLy8gICAgaWYgKFNpbWJvbG9EZWNpbWFsKGNvbmZpZ3VyYWNpb25OdW1lcm9zKSA9PSAnLicpIHtcclxuLy8gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCJcIik7XHJcbi8vICAgIH1cclxuLy8gICAgZWxzZSB7XHJcbi8vICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC9cXC4vZywgXCJcIik7XHJcbi8vICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC8sL2csIFwiLlwiKTtcclxuLy8gICAgfVxyXG4vLyAgICB2YXIgZm9ybWFudW1lcm8gPSBwYXJzZUZsb2F0KF9udW1lcm8pO1xyXG4vLyAgICBpZiAoaXNOYU4oZm9ybWFudW1lcm8pKSB7XHJcbi8vICAgICAgICBmb3JtYW51bWVybyA9IDA7XHJcbi8vICAgIH1cclxuLy8gICAgcmV0dXJuIHBhcnNlRmxvYXQoZm9ybWFudW1lcm8udG9GaXhlZCgyKSk7XHJcbi8vfVxyXG5cclxuLy9mdW5jdGlvbiBGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIoX251bWVybykge1xyXG4gIFxyXG4vLyAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJcIikge1xyXG4vLyAgICAgICAgY29uZmlndXJhY2lvbk51bWVyb3MgPSBcImVuLVVTXCI7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIGlmIChTaW1ib2xvRGVjaW1hbChjb25maWd1cmFjaW9uTnVtZXJvcykgPT0gJy4nKSB7XHJcbi8vICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC8sL2csIFwiXCIpO1xyXG4vLyAgICB9XHJcbi8vICAgIGVsc2Uge1xyXG4vLyAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xyXG4vLyAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvLC9nLCBcIi5cIik7XHJcbi8vICAgIH1cclxuLy8gICAgdmFyIGZvcm1hbnVtZXJvID0gcGFyc2VGbG9hdChfbnVtZXJvKTtcclxuLy8gICAgaWYgKGlzTmFOKGZvcm1hbnVtZXJvKSkge1xyXG4vLyAgICAgICAgZm9ybWFudW1lcm8gPSAwO1xyXG4vLyAgICB9XHJcblxyXG4vLyAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KGNvbmZpZ3VyYWNpb25OdW1lcm9zKS5mb3JtYXQoZm9ybWFudW1lcm8pO1xyXG4vL31cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gRm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKF9udW1lcm86IHN0cmluZywgX21vZGlmaWVkRm9ybWF0OiBib29sZWFuID0gZmFsc2UpIHtcclxuXHJcbiAgICAvL1NlY2Npw7NuIGRpc2XDsWFkYSBwYXJhIGNvcnJlZ2lyIGxvcyBmb3JtYXRvcyBhbCByZWFsaXphciBvcGVyYWNpb25lcyBjb24gbsO6bWVyb3NcclxuICAgIGlmIChTaW1ib2xvRGVjaW1hbChjb25maWd1cmFjaW9uTnVtZXJvcykgIT0gJy4nICYmIF9tb2RpZmllZEZvcm1hdCA9PSB0cnVlKSB7XHJcbiAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvXFwuL2csIFwiLFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJcIikge1xyXG4gICAgICAgIGNvbmZpZ3VyYWNpb25OdW1lcm9zID0gXCJlbi1VU1wiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChTaW1ib2xvRGVjaW1hbChjb25maWd1cmFjaW9uTnVtZXJvcykgPT0gJy4nKSB7XHJcbiAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvLC9nLCBcIlwiKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC8sL2csIFwiLlwiKTtcclxuICAgIH1cclxuICAgIHZhciBmb3JtYW51bWVybyA9IHBhcnNlRmxvYXQoX251bWVybyk7XHJcblxyXG4gICAgaWYgKGlzTmFOKGZvcm1hbnVtZXJvKSkge1xyXG4gICAgICAgIGZvcm1hbnVtZXJvID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KGNvbmZpZ3VyYWNpb25OdW1lcm9zKS5mb3JtYXQocGFyc2VGbG9hdChmb3JtYW51bWVyby50b0ZpeGVkKDIpKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNpbWJvbG9EZWNpbWFsKF9mb3JtYXRvKSB7XHJcbiAgICB2YXIgc2ltYm9sb19kZWNpbWFsID0gMS4xO1xyXG4gICAgcmV0dXJuIHNpbWJvbG9fZGVjaW1hbC50b0xvY2FsZVN0cmluZyhfZm9ybWF0bykuc3Vic3RyaW5nKDIsIDEpO1xyXG59XHJcblxyXG4vL2Zvcm1hdG8gbnVtZXJpY28gcGFyYSBjYWxjdWxhclxyXG5mdW5jdGlvbiBGb3JtYXRvTnVtZXJpY29zX0NhbGN1bGFyKF9udW1lcm86IHN0cmluZykge1xyXG5cclxuICAgIGlmIChjb25maWd1cmFjaW9uTnVtZXJvcyA9PSBcIlwiKSB7XHJcbiAgICAgICAgY29uZmlndXJhY2lvbk51bWVyb3MgPSBcImVuLVVTXCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFNpbWJvbG9EZWNpbWFsKGNvbmZpZ3VyYWNpb25OdW1lcm9zKSA9PSAnLicpIHtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC8sL2csIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xyXG4gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCIuXCIpO1xyXG4gICAgfVxyXG4gICAgdmFyIGZvcm1hbnVtZXJvID0gcGFyc2VGbG9hdChfbnVtZXJvKTtcclxuICAgIGlmIChpc05hTihmb3JtYW51bWVybykpIHtcclxuICAgICAgICBmb3JtYW51bWVybyA9IDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdChmb3JtYW51bWVyby50b0ZpeGVkKDIpKTtcclxufVxyXG5cclxuXHJcbi8vcGx1Z2luIHBhcmEgZWwgZm9ybWF0byAgbnVtw6lyaWNvXHJcbmZ1bmN0aW9uIFVzZVBsdWdpbk51bWJlckZvcm1hdChmb3JtOnN0cmluZykge1xyXG4gICAgJChcIi5wbHVnaW4tbnVtYmVyLWZvcm1hdFwiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IG51bTogc3RyaW5nID0gdGhhdC52YWx1ZTtcclxuXHJcbiAgICAgICAgJCh0aGF0KS52YWwoRm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKG51bSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChgJHtmb3JtfSAucGx1Z2luLW51bWJlci1mb3JtYXRgKS5lYWNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IG51bTogc3RyaW5nID0gdGhhdC52YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZ3VyYWNpb25OdW1lcm9zID09IFwiZW4tVVNcIikge1xyXG4gICAgICAgICAgICBudW0gPSBudW0ucmVwbGFjZShcIixcIiwgXCIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbnVtID0gbnVtLnJlcGxhY2UoXCIuXCIsIFwiLFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQodGhhdCkudmFsKEZvcm1hdG9OdW1lcmljb3NfTW9zdHJhcihudW0pKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vL3RyIGxvYWRlclxyXG5mdW5jdGlvbiBBZGRUckxvYWRlcihlbGVtZW50KSB7XHJcbiAgICAkKGVsZW1lbnQpLnByZXBlbmQoJzx0ciBjbGFzcz1cInRyLWxvYWRlclwiPjx0ZCBjb2xzcGFuPVwiMVwiPiA8L3RkPjx0ZCBjb2xzcGFuPVwiMVwiPiAnXHJcbiAgICAgICAgKyc8ZGl2PjwvZGl2PjwvdGQ+PHRkIGNvbHNwYW49XCI0XCIgPjxkaXY+PC9kaXY+PC90ZCA+PHRkIGNvbHNwYW49XCIyXCIgPjxkaXY+PC9kaXY+PC90ZCA+IDx0ZCBjb2xzcGFuPVwiM1wiPjxkaXY+PC9kaXY+PC90ZD4gPHRkIGNvbHNwYW49XCI1XCIgPjxkaXY+PC9kaXY+PC90ZD48L3RyPicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBEYXRhZmlsdGVyKF90Ym9keXRhYmxlOiBzdHJpbmcsIF91cmw6IHN0cmluZywgX3R5cGVFbXBsb3llOiBzdHJpbmcgPSBcIlwiLCBfbmFtZWZpbHRyZSA9IFwiLm9wdGlvbkZpbHRlclwiLCBfdmFsdWVzRmlsdGVyID0gJy50ZXh0RmlsdGVyJykge1xyXG4gICAgQWRkVHJMb2FkZXIoJChfdGJvZHl0YWJsZSkpO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiBfdXJsLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgUHJvcGVydHlOYW1lOiAkKF9uYW1lZmlsdHJlKS52YWwoKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBQcm9wZXJ0eVZhbHVlOiAkKF92YWx1ZXNGaWx0ZXIpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIHR5cGU6IF90eXBlRW1wbG95ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAkKF90Ym9keXRhYmxlKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgJChfdGJvZHl0YWJsZSkuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIERhdGFmaWx0ZXJNb2RhbHMoX3Rib2R5dGFibGU6IHN0cmluZywgX3VybDogc3RyaW5nLCBfZW1wbG95ZWVpZDogc3RyaW5nLCBfbmFtZWZpbHRyZSA9IFwiLm9wdGlvbkZpbHRlck1vZGFsXCIsIF92YWx1ZXNGaWx0ZXIgPSAnLnRleHRGaWx0ZXJNb2RhbCcpIHtcclxuICAgIEFkZFRyTG9hZGVyKCQoX3Rib2R5dGFibGUpKTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogX3VybCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIFByb3BlcnR5TmFtZTogJChfbmFtZWZpbHRyZSkudmFsKCkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgUHJvcGVydHlWYWx1ZTogJChfdmFsdWVzRmlsdGVyKS52YWwoKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBlbXBsb3llZWlkOiBfZW1wbG95ZWVpZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAkKF90Ym9keXRhYmxlKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgJChfdGJvZHl0YWJsZSkuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vcmVkYXRhKF9tYXhzY3JvbGw6IG51bWJlciwgX2NvbnRyb2xsZXI6IHN0cmluZywgX3Rib2R5OiBzdHJpbmcsIF90eXBlOiBzdHJpbmcgPSBcIlwiLCBfaXNWZXJzaW9uOmJvb2xlYW4gPSBmYWxzZSxfaWQ6c3RyaW5nPVwiXCIpIHtcclxuICAgIHBhZ2UrKztcclxuICAgIGlzQnVzeSA9IHRydWU7XHJcbiAgICBpZiAoIWlzZW1wdHkpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAvJHtfY29udHJvbGxlcn0vRmlsdGVyT3JNb3JlRGF0YWAsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIF9QYWdlTnVtYmVyOiBwYWdlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogX3R5cGUsXHJcbiAgICAgICAgICAgICAgICBJc1ZlcnNpb246IF9pc1ZlcnNpb24sXHJcbiAgICAgICAgICAgICAgICBJZDogX2lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gXCJcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKF90Ym9keSkuY2hpbGRyZW4oKS5sYXN0KCkuYWZ0ZXIoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGxUb3AoX21heHNjcm9sbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Dw7NkaWdvIHBhcmEgbW9zdHJhciBsYSBheXVkYVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuaWQtYmF0Y2gtaW5mb1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRoYXQgPSAkKHRoaXMpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93aGVscCh0aGF0LCBcIi9oaXN0b3JpYWxsb3Rlcy9JbmZvUHJvY2Vzc1wiLCBcIi5jb250LWJhdGNoLWluZm9cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmNhcmQtaGVscCA+IHBcIikuaHRtbChzcGxpdE1lc3NhZ2UoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuZGF0YS1pbmZvLWJhdGNoJykuaHRtbCgpLnRyaW0oKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNlbXB0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRnVuY2lvbiBwYXJhIGhhYmlsaXRhciBkb2JsZSBjbGljIGVuIGZpbGFzIGRlIHRhYmxhcyBMaXN0UGFnZVxyXG4vLyBVc28gY29uIHBhcmFtZXRybzogZW5hYmxlUm93RG91YmxlQ2xpY2soJy50Ym9keS1UYWJsZS1EZXBhcnRtZW50JywgJy5EZXBhcnRtZW50SWR0YmwnLCAnL2RlcGFydGFtZW50b3NhY3Rpdm9zL2dldGJ5aWQnLCBjYWxsYmFjaywgJ0lkJylcclxuLy8gVXNvIGNvbiBVUkw6IGVuYWJsZVJvd0RvdWJsZUNsaWNrKCcudGJvZHktVGFibGUtWCcsICcuWElkdGJsJywgJy9lbmRwb2ludC97aWR9JywgY2FsbGJhY2spIC0ge2lkfSBzZSByZWVtcGxhemEgY29uIGVsIHZhbG9yXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuZnVuY3Rpb24gZW5hYmxlUm93RG91YmxlQ2xpY2soXHJcbiAgICB0Ym9keVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICBpZENlbGxTZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgYWpheFVybDogc3RyaW5nLFxyXG4gICAgb25TdWNjZXNzQ2FsbGJhY2s6IChkYXRhOiBhbnkpID0+IHZvaWQsXHJcbiAgICBpZFBhcmFtTmFtZTogc3RyaW5nID0gXCJJZFwiXHJcbikge1xyXG4gICAgLy8gRGVsZWdhY2lvbiBkZSBldmVudG9zIHBhcmEgZmlsYXMgZGluYW1pY2FzXHJcbiAgICAkKGRvY3VtZW50KS5vbignZGJsY2xpY2snLCBgJHt0Ym9keVNlbGVjdG9yfSAucm93LWFwcGAsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgLy8gRXZpdGFyIHF1ZSBlbCBkb2JsZSBjbGljIGVuIGNoZWNrYm94IGRpc3BhcmUgbGEgZWRpY2lvblxyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pcygnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykgfHwgJChlLnRhcmdldCkuaXMoJ2xhYmVsJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT2J0ZW5lciBlbCBJRCBkZWwgcmVnaXN0cm8gZGVzZGUgbGEgY2VsZGEgZXNwZWNpZmljYWRhXHJcbiAgICAgICAgY29uc3Qgcm93SWQgPSAkKHRoaXMpLmZpbmQoaWRDZWxsU2VsZWN0b3IpLnRleHQoKS50cmltKCk7XHJcblxyXG4gICAgICAgIGlmICghcm93SWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdObyBzZSBwdWRvIG9idGVuZXIgZWwgSUQgZGVsIHJlZ2lzdHJvJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1vc3RyYXIgaW5kaWNhZG9yIGRlIGNhcmdhXHJcbiAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5hciBzaSBsYSBVUkwgdXNhIHBsYWNlaG9sZGVyIHtpZH0gbyBwYXJhbWV0cm9cclxuICAgICAgICBsZXQgZmluYWxVcmwgPSBhamF4VXJsO1xyXG4gICAgICAgIGxldCBhamF4RGF0YTogYW55ID0ge307XHJcblxyXG4gICAgICAgIGlmIChhamF4VXJsLmluY2x1ZGVzKCd7aWR9JykpIHtcclxuICAgICAgICAgICAgLy8gVVJMIGNvbiBJRCBlbiBsYSBydXRhOiAvZW5kcG9pbnQve2lkfSAtPiAvZW5kcG9pbnQvMTIzXHJcbiAgICAgICAgICAgIGZpbmFsVXJsID0gYWpheFVybC5yZXBsYWNlKCd7aWR9Jywgcm93SWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaWRQYXJhbU5hbWUpIHtcclxuICAgICAgICAgICAgLy8gVVJMIGNvbiBwYXJhbWV0cm86IC9lbmRwb2ludD9JZD0xMjNcclxuICAgICAgICAgICAgYWpheERhdGFbaWRQYXJhbU5hbWVdID0gcm93SWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBMbGFtYXIgYWwgZW5kcG9pbnQgcGFyYSBvYnRlbmVyIGxvcyBkYXRvc1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZmluYWxVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IGFqYXhEYXRhLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3NDYWxsYmFjayhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiTm8gc2UgZW5jb250cm8gZWwgcmVnaXN0cm9cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBZ3JlZ2FyIGNsYXNlIHBhcmEgaW5kaWNhciBxdWUgbGFzIGZpbGFzIHNvbiBjbGlja2VhYmxlc1xyXG4gICAgJChgJHt0Ym9keVNlbGVjdG9yfSAucm93LWFwcGApLmFkZENsYXNzKCdyb3ctY2xpY2thYmxlJyk7XHJcblxyXG4gICAgLy8gT2JzZXJ2YXIgY2FtYmlvcyBlbiBlbCBET00gcGFyYSBhcGxpY2FyIGNsYXNlIGEgbnVldmFzIGZpbGFzXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuICAgICAgICAkKGAke3Rib2R5U2VsZWN0b3J9IC5yb3ctYXBwYCkubm90KCcucm93LWNsaWNrYWJsZScpLmFkZENsYXNzKCdyb3ctY2xpY2thYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0YXJnZXROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0Ym9keVNlbGVjdG9yKTtcclxuICAgIGlmICh0YXJnZXROb2RlKSB7XHJcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXROb2RlLCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcclxuICAgIH1cclxufVxyXG5cclxuIl19