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
                if (data.length > 0) {
                    $(_option).html('');
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
                if (data.length > 0) {
                    $("#JobId").html('');
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
                if (data.length > 0) {
                    $("#NotifyPositionId").html('');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbGlkYWRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL1V0aWxpZGFkZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0dBUUc7QUFFSCxTQUFTLEVBQUUsQ0FBQztJQUNSLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNiLElBQUksTUFBTSxHQUFZLEtBQUssQ0FBQztJQUM1QixJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7QUFDakMsQ0FBQztBQUNELElBQUksb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7QUFFdEU7Ozs7R0FJRztBQUNILFNBQVMsU0FBUyxDQUFDLEtBQWE7SUFDNUIsSUFBSSxjQUFjLEdBQVcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pELE9BQU8sY0FBYyxDQUFDO0FBQzFCLENBQUM7QUFFRCwwREFBMEQ7QUFDMUQsU0FBUyxrQkFBa0IsQ0FBQyxLQUFhO0lBQ3JDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFDakMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDZixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsc0JBQXNCO0FBQ3RCLFNBQVMsWUFBWSxDQUFDLEtBQUs7SUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNyQixJQUFJLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFR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QUMsQ0FBQyxHQUFHLGFBQWEsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25GLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6RCxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIFV0aWxpZGFkZXMudHNcclxuICogQGRlc2NyaXB0aW9uIEZ1bmNpb25lcyB1dGlsaXRhcmlhcyBnZW5lcmFsZXMgcGFyYSBsYSBhcGxpY2FjacOzbiBkZSBuw7NtaW5hLlxyXG4gKiAgICAgICAgICAgICAgSW5jbHV5ZSBoZWxwZXJzIHBhcmEgbWFuZWpvIGRlIGZvcm11bGFyaW9zLCB2YWxpZGFjaW9uZXMsXHJcbiAqICAgICAgICAgICAgICBmb3JtYXRlbyBkZSBkYXRvcyB5IGNvbXVuaWNhY2nDs24gY29uIGVsIHNlcnZpZG9yLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBVdGlsaWRhZGVzXHJcbiAqL1xyXG5cclxudmFyaWFibGVzOiB7XHJcbiAgICB2YXIgcGFnZSA9IDE7XHJcbiAgICB2YXIgaXNCdXN5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB2YXIgaXNlbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG59XHJcbnZhciBjb25maWd1cmFjaW9uTnVtZXJvcyA9ICQoXCIjRm9ybWF0Q29kZUlkT3B0aW9uc1wiKS52YWwoKS50b1N0cmluZygpO1xyXG5cclxuLyoqXHJcbiAqIENvbnZpZXJ0ZSB1bmEgY2FkZW5hIGRlIHRleHRvIGEgbWF5w7pzY3VsYXNcclxuICogQHBhcmFtIHtzdHJpbmd9IGNhbXBvIC0gVGV4dG8gYSBjb252ZXJ0aXJcclxuICogQHJldHVybnMge3N0cmluZ30gVGV4dG8gZW4gbWF5w7pzY3VsYXNcclxuICovXHJcbmZ1bmN0aW9uIE1heXVzY3VsYShjYW1wbzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHZhciBDYW1wb01heXVzY3VsYTogc3RyaW5nID0gY2FtcG8udG9VcHBlckNhc2UoKTtcclxuICAgIHJldHVybiBDYW1wb01heXVzY3VsYTtcclxufVxyXG5cclxuLy9mdW5jaW9uIHBhcmEgY29udmVydGlyIGxhcyBwcmltZXJhcyBsZXRyYXMgZW4gbWF5dXNjdWxhc1xyXG5mdW5jdGlvbiBGaXJ0c2NhcGl0YWxsZXR0ZXIoX3dvcmQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gX3dvcmQucmVwbGFjZSgvKF58XFxzKShbYS16XSkvZyxcclxuICAgICAgICBmdW5jdGlvbiAobSwgcDEsIHAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwMS50b0xvd2VyQ2FzZSgpICsgcDIudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuLy9mdW5jaW9uIGNhY3VsYXIgZWRhZFxyXG5mdW5jdGlvbiBjYWxjdWxhckVkYWQoZmVjaGEpIHtcclxuICAgIHZhciBob3kgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdmFyIGN1bXBsZWFub3MgPSBuZXcgRGF0ZShmZWNoYSk7XHJcbiAgICB2YXIgZWRhZCA9IGhveS5nZXRGdWxsWWVhcigpIC0gY3VtcGxlYW5vcy5nZXRGdWxsWWVhcigpO1xyXG4gICAgdmFyIG0gPSBob3kuZ2V0TW9udGgoKSAtIGN1bXBsZWFub3MuZ2V0TW9udGgoKTtcclxuXHJcbiAgICBpZiAobSA8IDAgfHwgKG0gPT09IDAgJiYgaG95LmdldERhdGUoKSA8IGN1bXBsZWFub3MuZ2V0RGF0ZSgpKSkge1xyXG4gICAgICAgIGVkYWQtLTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWRhZCsxO1xyXG59XHJcblxyXG4vL2Z1bmNpb24gcGFyYSB2YWxpZGFyIGVtYWlsXHJcbmZ1bmN0aW9uIHZhbGlkYXJfZW1haWwoZW1haWw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgdmFyIHJlZ2V4ID0gL14oW2EtekEtWjAtOV9cXC5cXC1dKStcXEAoKFthLXpBLVowLTlcXC1dKStcXC4pKyhbYS16QS1aMC05XXsyLDR9KSskLztcclxuICAgIHJldHVybiByZWdleC50ZXN0KGVtYWlsKSA/IHRydWUgOiBmYWxzZTtcclxufVxyXG5cclxuLy9mb3JtYXRpYXIgZmVjaGEgcGFyYSBlZGl0YXJcclxuZnVuY3Rpb24gRm9ybWF0RGF0ZShfZmVjaGE6IHN0cmluZykge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZShfZmVjaGEuc3BsaXQoXCIvXCIpLnJldmVyc2UoKS5qb2luKFwiLVwiKSk7XHJcbiAgICB2YXIgZGQgPSBkLmdldERhdGUoKTtcclxuICAgIHZhciBtbSA9IGQuZ2V0TW9udGgoKSArIDE7XHJcbiAgICB2YXIgeXkgPSBkLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgaWYgKG1tIDwgMTApIG1tID0gMCArIG1tO1xyXG4gICAgaWYgKGRkIDwgMTApIGRkID0gMCArIGRkO1xyXG4gICAgdmFyIG5ld2RhdGUgPSB5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkO1xyXG4gICAgcmV0dXJuIG5ld2RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvcm1hdERhdGVBdXRvQmluZGluZyhfZmVjaGE6IHN0cmluZykge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZShfZmVjaGEpO1xyXG4gICAgdmFyIGRkOiBudW1iZXIgPSBkLmdldERhdGUoKTtcclxuICAgIHZhciBtbTogbnVtYmVyID0gZC5nZXRNb250aCgpICsgMTtcclxuICAgIHZhciB5eTogbnVtYmVyID0gZC5nZXRGdWxsWWVhcigpO1xyXG4gICAgbGV0IG1tMjogc3RyaW5nO1xyXG4gICAgbGV0IGRkMjogc3RyaW5nO1xyXG5cclxuICAgIGlmIChtbSA8IDEwKSB7XHJcbiAgICAgICAgbW0yID0gXCIwXCIgKyBtbTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG1tMiA9IG1tLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRkIDwgMTApIHtcclxuICAgICAgICBkZDIgPSBcIjBcIiArIGRkO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZGQyID0gZGQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbmV3ZGF0ZSA9IHl5ICsgXCItXCIgKyBtbTIgKyBcIi1cIiArIGRkMjtcclxuICAgIHJldHVybiBuZXdkYXRlO1xyXG59XHJcblxyXG4vL0Z1bmNpb24gcGFyYSBtb3N0cmFyIG1vZGFsXHJcbi8vZnVuY3Rpb24gTGlzdGFEZXNwbGFnYWJsZShfZWxlbWVudCwgX21vZGFsKSB7XHJcblxyXG4vLyAgICB2YXIgcCA9ICQoX2VsZW1lbnQpO1xyXG4vLyAgICB2YXIgcG9zaXRpb24gPSBwLm9mZnNldCgpO1xyXG4vLyAgICB2YXIgbW9kYWwgPSBcIi5cIiArIF9tb2RhbDtcclxuLy8gICAgdmFyIGFuY2hvRG9jdW1lbnRvID0gJChkb2N1bWVudCkud2lkdGgoKTtcclxuLy8gICAgdmFyIGFsdG9Eb2N1bWVudG8gPSAkKGRvY3VtZW50KS5oZWlnaHQoKTtcclxuLy8gICAgdmFyIGFuY2hvTW9kYWwgPSAkKG1vZGFsKS53aWR0aCgpO1xyXG4vLyAgICB2YXIgYWx0b01vZGFsID0gJChtb2RhbCkuaGVpZ2h0KCk7XHJcblxyXG4vLyAgICBpZiAoYWx0b01vZGFsID09IDUwKSB7XHJcbi8vICAgICAgICBhbHRvTW9kYWwgPSAzMDA7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIHZhciBkaW1lbnNpb25Nb2RhbF9pbnB1dCA9IGFuY2hvTW9kYWwgKyBwb3NpdGlvbi5sZWZ0O1xyXG4vLyAgICB2YXIgYWx0b01vZGFsX2lucHV0ID0gYWx0b01vZGFsICsgcG9zaXRpb24udG9wO1xyXG4vLyAgICB2YXIgZGlmZXJlbmNpYURlcmVjaGE7XHJcbi8vICAgIHZhciBkaWZlcmVuY2lhQWJham87XHJcblxyXG4vLyAgICAvL3Bvc2ljaW9uIGhvcml6b250YWxcclxuLy8gICAgaWYgKGRpbWVuc2lvbk1vZGFsX2lucHV0ID4gYW5jaG9Eb2N1bWVudG8pIHtcclxuXHJcbi8vICAgICAgICBkaWZlcmVuY2lhRGVyZWNoYSA9IGFuY2hvRG9jdW1lbnRvIC0gKHAub3V0ZXJXaWR0aCgpICsgcG9zaXRpb24ubGVmdCk7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyByaWdodDogZGlmZXJlbmNpYURlcmVjaGEsIGxlZnQ6ICcnIH0pOyAvL3Bvc2l0aW9uLmxlZnR9KTtcclxuXHJcbi8vICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyBsZWZ0OiBwb3NpdGlvbi5sZWZ0LCByaWdodDogJycgfSk7XHJcbi8vICAgIH1cclxuLy8gICAgLy9wb3NpY2lvbiB2ZXJ0aWNhbCBcclxuLy8gICAgaWYgKGFsdG9Nb2RhbF9pbnB1dCA+IGFsdG9Eb2N1bWVudG8pIHtcclxuXHJcbi8vICAgICAgICBkaWZlcmVuY2lhQWJham8gPSBhbHRvRG9jdW1lbnRvIC0gKHAub3V0ZXJIZWlnaHQoKSArIHBvc2l0aW9uLnRvcCk7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyBib3R0b206IGRpZmVyZW5jaWFBYmFqbyArIDM1LCB0b3A6ICcnIH0pOyAvL3Bvc2l0aW9uLmxlZnR9KTtcclxuXHJcbi8vICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyB0b3A6IHBvc2l0aW9uLnRvcCArIDM1LCBib3R0b206ICcnIH0pO1xyXG4vLyAgICB9XHJcblxyXG4vLyAgICAkKG1vZGFsKS5yZW1vdmVDbGFzcygnZW1wbGVhZG9Db2xsYXBzZScpO1xyXG4vL307XHJcblxyXG4vL2Z1bmNpb24gcGFyYSBlc3RpbG8gZGUgYWRqdW50YXIgYXJjaGl2b1xyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBDYXB0dXJhbW9zIGVsIGNsaWNrIGVuIGVsIDxhPlxyXG4gICAgLy8gcHJldmVuaW1vcyBlbCBjb21wb3J0YW1pZW50byBwb3IgZGVmZWN0b1xyXG4gICAgLy8geSByZXBsaWNhbW9zIGVsIGNsaWNrIGVuIHN1IGhlcm1hbm8gaW5wdXQuXHJcbiAgICAkKFwiLnRyaWdnZXItdXBsb2FkXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygnLmZvcm0tZmlsZScpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBDYXB0dXJhbW9zIGVsIGNsaWNrIGVuIGVsIDxhPlxyXG4gICAgLy8gcHJldmVuaW1vcyBlbCBjb21wb3J0YW1pZW50byBwb3IgZGVmZWN0b1xyXG4gICAgLy8geSByZXBsaWNhbW9zIGVsIGNsaWNrIGVuIHN1IGhlcm1hbm8gaW5wdXQuXHJcbiAgICAkKFwiLnRyaWdnZXItdXBsb2FkLWVtcFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5mb3JtLWZpbGUnKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJChcIi50cmlnZ2VyLXVwbG9hZC1kb2NcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuZm9ybS1maWxlLWRvYycpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIudHJpZ2dlci11cGxvYWRUd29cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuZm9ybS1maWxlVHdvJykudHJpZ2dlcihcImNsaWNrXCIpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLy9mdW5jaW9uIHBhcmEgcmVkaXJlY2Npb25hciBhbCBsb2dpblxyXG5mdW5jdGlvbiByZWRpcmVjY2lvbmFyYWxMb2dpbihyZXN1bHQ6IGFueSkge1xyXG4gICAgaWYgKHJlc3VsdC5zdGF0dXMgPT0gNDAwKSB7XHJcbiAgICAgICAgd2luZG93c19tZXNzYWdlKFwiU3Ugc2VzacOzbiBoYSBleHBpcmFkb1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0xvZ2luL0luZGV4XCI7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvRXJyb3IvSW5kZXhcIjsgICAgICAgIFxyXG4gICAgfVxyXG4gICBcclxuXHJcbn1cclxuXHJcbi8vQXV0b21hdGljQmluZGluZ1xyXG5mdW5jdGlvbiBBdXRvbWF0aWNCaW5kaW5nKG9iajogb2JqZWN0LCBzZWxlY3Q6IHN0cmluZywgcHJlT2JqOiBzdHJpbmcgPSBcIlwiKSB7XHJcblxyXG4gICAgbGV0IHByb3BlcnRpZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0KTtcclxuXHJcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHgpID0+IHtcclxuICAgICAgICBsZXQgc2VsZWN0QnlBdHRyOiBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoYCMke3ByZU9ian0ke3h9YCk7XHJcbiAgICAgICAgaWYgKHNlbGVjdEJ5QXR0ci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RCeUF0dHJbMF0udHlwZSA9PSBcImNoZWNrYm94XCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS5jaGVja2VkID0gb2JqW3hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNlbGVjdEJ5QXR0clswXS50eXBlID09IFwic2VsZWN0LW9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RCeUF0dHJbMF0udmFsdWUgPSBvYmpbeF07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0QnlBdHRyWzBdLnR5cGUgPT0gXCJkYXRlXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS52YWx1ZSA9IEZvcm1hdERhdGVBdXRvQmluZGluZyhvYmpbeF0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoc2VsZWN0QnlBdHRyWzBdLnR5cGUgPT0gXCJ0aW1lXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpbeF0gIT0gbnVsbCAmJiBvYmpbeF0uVG90YWxNaWxsaXNlY29uZHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS52YWx1ZSA9IEZvcm1hdEhvdXJzKG9ialt4XS5Ub3RhbE1pbGxpc2Vjb25kcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RCeUF0dHJbMF0udmFsdWUgPSBvYmpbeF07XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvcm1hdEhvdXJzKGhvcmEpIHtcclxuICAgIC8vbGV0IGRhdG8gPSBuZXcgRGF0ZShob3JhKS50b0lTT1N0cmluZygpLnN1YnN0cigxNCwgOCk7XHJcbiAgICBsZXQgZGF0byA9IG5ldyBEYXRlKGhvcmEpLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDExLCA4KTtcclxuICAgIHJldHVybiBkYXRvO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIE5ld0Zvcm1hRGF0ZShfZmVjaGE6IHN0cmluZywgX2lzVG9kYXk6Ym9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJcIikge1xyXG4gICAgICAgIGNvbmZpZ3VyYWNpb25OdW1lcm9zID0gXCJlbi1VU1wiO1xyXG4gICAgfVxyXG4gICAgbGV0IGQ6IERhdGU7XHJcbiAgICBpZiAoIV9pc1RvZGF5KSB7XHJcbiAgICAgICAgdmFyIG5ld0RhdGVBcnJheTogQXJyYXk8c3RyaW5nPiA9IF9mZWNoYS5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgdmFyIG5ld0RhdGU6IHN0cmluZztcclxuICAgICAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJlbi1VU1wiKSB7XHJcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXdEYXRlQXJyYXlbMl0gKyBcIi1cIiArIG5ld0RhdGVBcnJheVswXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXdEYXRlQXJyYXlbMl0gKyBcIi1cIiArIG5ld0RhdGVBcnJheVsxXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzBdO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy92YXIgbmV3RGF0ZTAxOiBzdHJpbmcgPSBfZmVjaGEuc3BsaXQoXCIvXCIpLnJldmVyc2UoKS5qb2luKFwiLVwiKTtcclxuICAgICAgICAvL2lmIChfZmVjaGEuaW5kZXhPZihcIlRcIikgPT0gLTEpIHtcclxuICAgICAgICAvLyAgICBuZXdEYXRlID0gbmV3RGF0ZSArIFwiVDAwOjAwOjAwXCI7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgZCA9IG5ldyBEYXRlKG5ld0RhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkID0gbmV3IERhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGQ6IG51bWJlciA9IGQuZ2V0RGF0ZSgpO1xyXG4gICAgdmFyIG1tOiBudW1iZXIgPSBkLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgdmFyIHl5OiBudW1iZXIgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBsZXQgbW0yOiBzdHJpbmc7XHJcbiAgICBsZXQgZGQyOiBzdHJpbmc7XHJcblxyXG4gICAgaWYgKG1tIDwgMTApIHtcclxuICAgICAgICBtbTIgPSBcIjBcIiArIG1tO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbW0yID0gbW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGQgPCAxMCkge1xyXG4gICAgICAgIGRkMiA9IFwiMFwiICsgZGQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkZDIgPSBkZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBuZXdkYXRlID0geXkgKyBcIi1cIiArIG1tMiArIFwiLVwiICsgZGQyO1xyXG4gICAgcmV0dXJuIG5ld2RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvcm10RmVjaGFUaXBvQ2FsZW5kYXJpbyhfZmVjaGEpIHtcclxuICAgIHZhciBkZDogbnVtYmVyO1xyXG4gICAgdmFyIG1tOiBudW1iZXI7XHJcbiAgICBsZXQgbW0yOiBzdHJpbmc7XHJcbiAgICBsZXQgZGQyOiBzdHJpbmc7XHJcbiAgICB2YXIgbmV3RGF0ZUFycmF5OiBBcnJheTxzdHJpbmc+ID0gX2ZlY2hhLnNwbGl0KFwiL1wiKTtcclxuICAgIHZhciBuZXdEYXRlOiBzdHJpbmc7XHJcbiAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJlbi1VU1wiKSB7XHJcbiAgICAgICAgZGQgPSBwYXJzZUludChuZXdEYXRlQXJyYXlbMV0pO1xyXG4gICAgICAgIG1tID0gcGFyc2VJbnQobmV3RGF0ZUFycmF5WzBdKTtcclxuICAgICAgICBpZiAobW0gPCAxMCkge1xyXG4gICAgICAgICAgICBtbTIgPSBcIjBcIiArIG1tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbW0yID0gbW0udG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkZCA8IDEwKSB7XHJcbiAgICAgICAgICAgIGRkMiA9IFwiMFwiICsgZGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkZDIgPSBkZC50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3RGF0ZSA9IG5ld0RhdGVBcnJheVsyXSArIFwiLVwiICsgbW0yICsgXCItXCIgKyBkZDIgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbmV3RGF0ZSA9IG5ld0RhdGVBcnJheVsyXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzFdICsgXCItXCIgKyBuZXdEYXRlQXJyYXlbMF07XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4vL0xpc3RhIGRlIGRlcGFydGFtZW50b3NcclxuZnVuY3Rpb24gTGlzdERlcGFybWVudChfb3B0aW9uOiBzdHJpbmcgPSBcIiNEZXBhcnRtZW50SWRcIikge1xyXG4gICAgaWYgKCQoX29wdGlvbilbMF0uY2hpbGRyZW4ubGVuZ3RoID09IDApIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL3B1ZXN0b3NhY3Rpdm9zL0J1c2NhcmRlcGFydGFtZW50b3NcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHZXRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKF9vcHRpb24pLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLkRlcGFydG1lbnRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoX29wdGlvbikuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy9MaXN0YSBkZSBjYXJnb3NcclxuZnVuY3Rpb24gTGlzdEpvYnMoKSB7XHJcbiAgICBpZiAoJChcIiNKb2JJZFwiKVswXS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvcHVlc3Rvc2FjdGl2b3MvQnVzY2FyQ2FyZ29zXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR2V0XCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0pvYklkXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLkpvYklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNKb2JJZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vL0xpc3RhIGRlIHB1ZXN0b3NcclxuZnVuY3Rpb24gTGlzdFBvc2l0aW9uKCkge1xyXG4gICAgaWYgKCQoXCIjTm90aWZ5UG9zaXRpb25JZFwiKVswXS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvdmFjYW50ZXMvQnVzY2FyUHVlc3Rvc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNOb3RpZnlQb3NpdGlvbklkXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5Qb3NpdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKHRoaXMuUG9zaXRpb25JZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjTm90aWZ5UG9zaXRpb25JZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vL0xpc3RhIGRlIHBhaXNlc1xyXG5mdW5jdGlvbiBMaXN0Q291bnRyaWVzKENhbXBvOnN0cmluZykge1xyXG4gICAgaWYgKCQoQ2FtcG8pWzBdLmNoaWxkcmVuLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9kaXJlY2Npb25lbXBsZWFkb3MvcGFpc2VzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoQ2FtcG8pLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLkNvdW50cnlJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoQ2FtcG8pLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZm9ybWF0TnVtYmVyR3JhZih2YWx1ZTpudW1iZXIpIHtcclxuICAgIHJldHVybiB2YWx1ZS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIHsgc3R5bGU6IFwiY3VycmVuY3lcIiwgY3VycmVuY3k6IFwiVVNEXCIgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBGb3JtYXRFcnJvcnMoZGF0YSkge1xyXG4gICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICB9KTtcclxuICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG59XHJcblxyXG4vL2Z1bmN0aW9uIFNpbWJvbG9EZWNpbWFsKF9mb3JtYXRvKSB7XHJcbi8vICAgIHZhciBzaW1ib2xvX2RlY2ltYWwgPSAxLjE7XHJcbi8vICAgIHJldHVybiBzaW1ib2xvX2RlY2ltYWwudG9Mb2NhbGVTdHJpbmcoX2Zvcm1hdG8pLnN1YnN0cmluZygyLCAxKTtcclxuLy99XHJcblxyXG4vL2Zvcm1hdG8gbnVtZXJpY28gcGFyYSBjYWxjdWxhclxyXG4vL2Z1bmN0aW9uIEZvcm1hdG9OdW1lcmljb3NfQ2FsY3VsYXIoX251bWVybykge1xyXG5cclxuLy8gICAgaWYgKGNvbmZpZ3VyYWNpb25OdW1lcm9zID09IFwiXCIpIHtcclxuLy8gICAgICAgIGNvbmZpZ3VyYWNpb25OdW1lcm9zID0gXCJlbi1VU1wiO1xyXG4vLyAgICB9XHJcblxyXG4vLyAgICBpZiAoU2ltYm9sb0RlY2ltYWwoY29uZmlndXJhY2lvbk51bWVyb3MpID09ICcuJykge1xyXG4vLyAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvLC9nLCBcIlwiKTtcclxuLy8gICAgfVxyXG4vLyAgICBlbHNlIHtcclxuLy8gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuLy8gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCIuXCIpO1xyXG4vLyAgICB9XHJcbi8vICAgIHZhciBmb3JtYW51bWVybyA9IHBhcnNlRmxvYXQoX251bWVybyk7XHJcbi8vICAgIGlmIChpc05hTihmb3JtYW51bWVybykpIHtcclxuLy8gICAgICAgIGZvcm1hbnVtZXJvID0gMDtcclxuLy8gICAgfVxyXG4vLyAgICByZXR1cm4gcGFyc2VGbG9hdChmb3JtYW51bWVyby50b0ZpeGVkKDIpKTtcclxuLy99XHJcblxyXG4vL2Z1bmN0aW9uIEZvcm1hdG9OdW1lcmljb3NfTW9zdHJhcihfbnVtZXJvKSB7XHJcbiAgXHJcbi8vICAgIGlmIChjb25maWd1cmFjaW9uTnVtZXJvcyA9PSBcIlwiKSB7XHJcbi8vICAgICAgICBjb25maWd1cmFjaW9uTnVtZXJvcyA9IFwiZW4tVVNcIjtcclxuLy8gICAgfVxyXG5cclxuLy8gICAgaWYgKFNpbWJvbG9EZWNpbWFsKGNvbmZpZ3VyYWNpb25OdW1lcm9zKSA9PSAnLicpIHtcclxuLy8gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCJcIik7XHJcbi8vICAgIH1cclxuLy8gICAgZWxzZSB7XHJcbi8vICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC9cXC4vZywgXCJcIik7XHJcbi8vICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC8sL2csIFwiLlwiKTtcclxuLy8gICAgfVxyXG4vLyAgICB2YXIgZm9ybWFudW1lcm8gPSBwYXJzZUZsb2F0KF9udW1lcm8pO1xyXG4vLyAgICBpZiAoaXNOYU4oZm9ybWFudW1lcm8pKSB7XHJcbi8vICAgICAgICBmb3JtYW51bWVybyA9IDA7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoY29uZmlndXJhY2lvbk51bWVyb3MpLmZvcm1hdChmb3JtYW51bWVybyk7XHJcbi8vfVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIoX251bWVybzogc3RyaW5nLCBfbW9kaWZpZWRGb3JtYXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cclxuICAgIC8vU2VjY2nDs24gZGlzZcOxYWRhIHBhcmEgY29ycmVnaXIgbG9zIGZvcm1hdG9zIGFsIHJlYWxpemFyIG9wZXJhY2lvbmVzIGNvbiBuw7ptZXJvc1xyXG4gICAgaWYgKFNpbWJvbG9EZWNpbWFsKGNvbmZpZ3VyYWNpb25OdW1lcm9zKSAhPSAnLicgJiYgX21vZGlmaWVkRm9ybWF0ID09IHRydWUpIHtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC9cXC4vZywgXCIsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb25maWd1cmFjaW9uTnVtZXJvcyA9PSBcIlwiKSB7XHJcbiAgICAgICAgY29uZmlndXJhY2lvbk51bWVyb3MgPSBcImVuLVVTXCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFNpbWJvbG9EZWNpbWFsKGNvbmZpZ3VyYWNpb25OdW1lcm9zKSA9PSAnLicpIHtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC8sL2csIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xyXG4gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCIuXCIpO1xyXG4gICAgfVxyXG4gICAgdmFyIGZvcm1hbnVtZXJvID0gcGFyc2VGbG9hdChfbnVtZXJvKTtcclxuXHJcbiAgICBpZiAoaXNOYU4oZm9ybWFudW1lcm8pKSB7XHJcbiAgICAgICAgZm9ybWFudW1lcm8gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoY29uZmlndXJhY2lvbk51bWVyb3MpLmZvcm1hdChwYXJzZUZsb2F0KGZvcm1hbnVtZXJvLnRvRml4ZWQoMikpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gU2ltYm9sb0RlY2ltYWwoX2Zvcm1hdG8pIHtcclxuICAgIHZhciBzaW1ib2xvX2RlY2ltYWwgPSAxLjE7XHJcbiAgICByZXR1cm4gc2ltYm9sb19kZWNpbWFsLnRvTG9jYWxlU3RyaW5nKF9mb3JtYXRvKS5zdWJzdHJpbmcoMiwgMSk7XHJcbn1cclxuXHJcbi8vZm9ybWF0byBudW1lcmljbyBwYXJhIGNhbGN1bGFyXHJcbmZ1bmN0aW9uIEZvcm1hdG9OdW1lcmljb3NfQ2FsY3VsYXIoX251bWVybzogc3RyaW5nKSB7XHJcblxyXG4gICAgaWYgKGNvbmZpZ3VyYWNpb25OdW1lcm9zID09IFwiXCIpIHtcclxuICAgICAgICBjb25maWd1cmFjaW9uTnVtZXJvcyA9IFwiZW4tVVNcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoU2ltYm9sb0RlY2ltYWwoY29uZmlndXJhY2lvbk51bWVyb3MpID09ICcuJykge1xyXG4gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCJcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC9cXC4vZywgXCJcIik7XHJcbiAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvLC9nLCBcIi5cIik7XHJcbiAgICB9XHJcbiAgICB2YXIgZm9ybWFudW1lcm8gPSBwYXJzZUZsb2F0KF9udW1lcm8pO1xyXG4gICAgaWYgKGlzTmFOKGZvcm1hbnVtZXJvKSkge1xyXG4gICAgICAgIGZvcm1hbnVtZXJvID0gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJzZUZsb2F0KGZvcm1hbnVtZXJvLnRvRml4ZWQoMikpO1xyXG59XHJcblxyXG5cclxuLy9wbHVnaW4gcGFyYSBlbCBmb3JtYXRvICBudW3DqXJpY29cclxuZnVuY3Rpb24gVXNlUGx1Z2luTnVtYmVyRm9ybWF0KGZvcm06c3RyaW5nKSB7XHJcbiAgICAkKFwiLnBsdWdpbi1udW1iZXItZm9ybWF0XCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXMgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICBsZXQgbnVtOiBzdHJpbmcgPSB0aGF0LnZhbHVlO1xyXG5cclxuICAgICAgICAkKHRoYXQpLnZhbChGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIobnVtKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGAke2Zvcm19IC5wbHVnaW4tbnVtYmVyLWZvcm1hdGApLmVhY2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXMgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICBsZXQgbnVtOiBzdHJpbmcgPSB0aGF0LnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJlbi1VU1wiKSB7XHJcbiAgICAgICAgICAgIG51bSA9IG51bS5yZXBsYWNlKFwiLFwiLCBcIi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBudW0gPSBudW0ucmVwbGFjZShcIi5cIiwgXCIsXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCh0aGF0KS52YWwoRm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKG51bSkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vdHIgbG9hZGVyXHJcbmZ1bmN0aW9uIEFkZFRyTG9hZGVyKGVsZW1lbnQpIHtcclxuICAgICQoZWxlbWVudCkucHJlcGVuZCgnPHRyIGNsYXNzPVwidHItbG9hZGVyXCI+PHRkIGNvbHNwYW49XCIxXCI+IDwvdGQ+PHRkIGNvbHNwYW49XCIxXCI+ICdcclxuICAgICAgICArJzxkaXY+PC9kaXY+PC90ZD48dGQgY29sc3Bhbj1cIjRcIiA+PGRpdj48L2Rpdj48L3RkID48dGQgY29sc3Bhbj1cIjJcIiA+PGRpdj48L2Rpdj48L3RkID4gPHRkIGNvbHNwYW49XCIzXCI+PGRpdj48L2Rpdj48L3RkPiA8dGQgY29sc3Bhbj1cIjVcIiA+PGRpdj48L2Rpdj48L3RkPjwvdHI+Jyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIERhdGFmaWx0ZXIoX3Rib2R5dGFibGU6IHN0cmluZywgX3VybDogc3RyaW5nLCBfdHlwZUVtcGxveWU6IHN0cmluZyA9IFwiXCIsIF9uYW1lZmlsdHJlID0gXCIub3B0aW9uRmlsdGVyXCIsIF92YWx1ZXNGaWx0ZXIgPSAnLnRleHRGaWx0ZXInKSB7XHJcbiAgICBBZGRUckxvYWRlcigkKF90Ym9keXRhYmxlKSk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IF91cmwsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBQcm9wZXJ0eU5hbWU6ICQoX25hbWVmaWx0cmUpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIFByb3BlcnR5VmFsdWU6ICQoX3ZhbHVlc0ZpbHRlcikudmFsKCkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgdHlwZTogX3R5cGVFbXBsb3llXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoX3Rib2R5dGFibGUpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAkKF90Ym9keXRhYmxlKS5hcHBlbmQoZGF0YSk7XHJcbiAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gRGF0YWZpbHRlck1vZGFscyhfdGJvZHl0YWJsZTogc3RyaW5nLCBfdXJsOiBzdHJpbmcsIF9lbXBsb3llZWlkOiBzdHJpbmcsIF9uYW1lZmlsdHJlID0gXCIub3B0aW9uRmlsdGVyTW9kYWxcIiwgX3ZhbHVlc0ZpbHRlciA9ICcudGV4dEZpbHRlck1vZGFsJykge1xyXG4gICAgQWRkVHJMb2FkZXIoJChfdGJvZHl0YWJsZSkpO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiBfdXJsLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgUHJvcGVydHlOYW1lOiAkKF9uYW1lZmlsdHJlKS52YWwoKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBQcm9wZXJ0eVZhbHVlOiAkKF92YWx1ZXNGaWx0ZXIpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGVtcGxveWVlaWQ6IF9lbXBsb3llZWlkXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoX3Rib2R5dGFibGUpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAkKF90Ym9keXRhYmxlKS5hcHBlbmQoZGF0YSk7XHJcbiAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW9yZWRhdGEoX21heHNjcm9sbDogbnVtYmVyLCBfY29udHJvbGxlcjogc3RyaW5nLCBfdGJvZHk6IHN0cmluZywgX3R5cGU6IHN0cmluZyA9IFwiXCIsIF9pc1ZlcnNpb246Ym9vbGVhbiA9IGZhbHNlLF9pZDpzdHJpbmc9XCJcIikge1xyXG4gICAgcGFnZSsrO1xyXG4gICAgaXNCdXN5ID0gdHJ1ZTtcclxuICAgIGlmICghaXNlbXB0eSkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYC8ke19jb250cm9sbGVyfS9GaWx0ZXJPck1vcmVEYXRhYCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgX1BhZ2VOdW1iZXI6IHBhZ2UsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBfdHlwZSxcclxuICAgICAgICAgICAgICAgIElzVmVyc2lvbjogX2lzVmVyc2lvbixcclxuICAgICAgICAgICAgICAgIElkOiBfaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBcIlwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoX3Rib2R5KS5jaGlsZHJlbigpLmxhc3QoKS5hZnRlcihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbFRvcChfbWF4c2Nyb2xsKTtcclxuICAgICAgICAgICAgICAgICAgICAvL0PDs2RpZ28gcGFyYSBtb3N0cmFyIGxhIGF5dWRhXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5pZC1iYXRjaC1pbmZvXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhhdCA9ICQodGhpcylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3doZWxwKHRoYXQsIFwiL2hpc3RvcmlhbGxvdGVzL0luZm9Qcm9jZXNzXCIsIFwiLmNvbnQtYmF0Y2gtaW5mb1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuY2FyZC1oZWxwID4gcFwiKS5odG1sKHNwbGl0TWVzc2FnZSgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5kYXRhLWluZm8tYmF0Y2gnKS5odG1sKCkudHJpbSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpc2VtcHR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGdW5jaW9uIHBhcmEgaGFiaWxpdGFyIGRvYmxlIGNsaWMgZW4gZmlsYXMgZGUgdGFibGFzIExpc3RQYWdlXHJcbi8vIFVzbyBjb24gcGFyYW1ldHJvOiBlbmFibGVSb3dEb3VibGVDbGljaygnLnRib2R5LVRhYmxlLURlcGFydG1lbnQnLCAnLkRlcGFydG1lbnRJZHRibCcsICcvZGVwYXJ0YW1lbnRvc2FjdGl2b3MvZ2V0YnlpZCcsIGNhbGxiYWNrLCAnSWQnKVxyXG4vLyBVc28gY29uIFVSTDogZW5hYmxlUm93RG91YmxlQ2xpY2soJy50Ym9keS1UYWJsZS1YJywgJy5YSWR0YmwnLCAnL2VuZHBvaW50L3tpZH0nLCBjYWxsYmFjaykgLSB7aWR9IHNlIHJlZW1wbGF6YSBjb24gZWwgdmFsb3JcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5mdW5jdGlvbiBlbmFibGVSb3dEb3VibGVDbGljayhcclxuICAgIHRib2R5U2VsZWN0b3I6IHN0cmluZyxcclxuICAgIGlkQ2VsbFNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICBhamF4VXJsOiBzdHJpbmcsXHJcbiAgICBvblN1Y2Nlc3NDYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCxcclxuICAgIGlkUGFyYW1OYW1lOiBzdHJpbmcgPSBcIklkXCJcclxuKSB7XHJcbiAgICAvLyBEZWxlZ2FjaW9uIGRlIGV2ZW50b3MgcGFyYSBmaWxhcyBkaW5hbWljYXNcclxuICAgICQoZG9jdW1lbnQpLm9uKCdkYmxjbGljaycsIGAke3Rib2R5U2VsZWN0b3J9IC5yb3ctYXBwYCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyBFdml0YXIgcXVlIGVsIGRvYmxlIGNsaWMgZW4gY2hlY2tib3ggZGlzcGFyZSBsYSBlZGljaW9uXHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSB8fCAkKGUudGFyZ2V0KS5pcygnbGFiZWwnKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPYnRlbmVyIGVsIElEIGRlbCByZWdpc3RybyBkZXNkZSBsYSBjZWxkYSBlc3BlY2lmaWNhZGFcclxuICAgICAgICBjb25zdCByb3dJZCA9ICQodGhpcykuZmluZChpZENlbGxTZWxlY3RvcikudGV4dCgpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgaWYgKCFyb3dJZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ05vIHNlIHB1ZG8gb2J0ZW5lciBlbCBJRCBkZWwgcmVnaXN0cm8nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTW9zdHJhciBpbmRpY2Fkb3IgZGUgY2FyZ2FcclxuICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pO1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmFyIHNpIGxhIFVSTCB1c2EgcGxhY2Vob2xkZXIge2lkfSBvIHBhcmFtZXRyb1xyXG4gICAgICAgIGxldCBmaW5hbFVybCA9IGFqYXhVcmw7XHJcbiAgICAgICAgbGV0IGFqYXhEYXRhOiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGFqYXhVcmwuaW5jbHVkZXMoJ3tpZH0nKSkge1xyXG4gICAgICAgICAgICAvLyBVUkwgY29uIElEIGVuIGxhIHJ1dGE6IC9lbmRwb2ludC97aWR9IC0+IC9lbmRwb2ludC8xMjNcclxuICAgICAgICAgICAgZmluYWxVcmwgPSBhamF4VXJsLnJlcGxhY2UoJ3tpZH0nLCByb3dJZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpZFBhcmFtTmFtZSkge1xyXG4gICAgICAgICAgICAvLyBVUkwgY29uIHBhcmFtZXRybzogL2VuZHBvaW50P0lkPTEyM1xyXG4gICAgICAgICAgICBhamF4RGF0YVtpZFBhcmFtTmFtZV0gPSByb3dJZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIExsYW1hciBhbCBlbmRwb2ludCBwYXJhIG9idGVuZXIgbG9zIGRhdG9zXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBmaW5hbFVybCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTogYWpheERhdGEsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzc0NhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJObyBzZSBlbmNvbnRybyBlbCByZWdpc3Ryb1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFncmVnYXIgY2xhc2UgcGFyYSBpbmRpY2FyIHF1ZSBsYXMgZmlsYXMgc29uIGNsaWNrZWFibGVzXHJcbiAgICAkKGAke3Rib2R5U2VsZWN0b3J9IC5yb3ctYXBwYCkuYWRkQ2xhc3MoJ3Jvdy1jbGlja2FibGUnKTtcclxuXHJcbiAgICAvLyBPYnNlcnZhciBjYW1iaW9zIGVuIGVsIERPTSBwYXJhIGFwbGljYXIgY2xhc2UgYSBudWV2YXMgZmlsYXNcclxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xyXG4gICAgICAgICQoYCR7dGJvZHlTZWxlY3Rvcn0gLnJvdy1hcHBgKS5ub3QoJy5yb3ctY2xpY2thYmxlJykuYWRkQ2xhc3MoJ3Jvdy1jbGlja2FibGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRib2R5U2VsZWN0b3IpO1xyXG4gICAgaWYgKHRhcmdldE5vZGUpIHtcclxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldE5vZGUsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=