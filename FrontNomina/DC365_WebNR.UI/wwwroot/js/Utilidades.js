variables: {
    var page = 1;
    var isBusy = false;
    var isempty = false;
}
var configuracionNumeros = $("#FormatCodeIdOptions").val().toString();
// funcion para convertir en mayuscula
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbGlkYWRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL1V0aWxpZGFkZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxFQUFFLENBQUM7SUFDUixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7SUFDYixJQUFJLE1BQU0sR0FBWSxLQUFLLENBQUM7SUFDNUIsSUFBSSxPQUFPLEdBQVksS0FBSyxDQUFDO0FBQ2pDLENBQUM7QUFDRCxJQUFJLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBRXRFLHNDQUFzQztBQUN0QyxTQUFTLFNBQVMsQ0FBQyxLQUFhO0lBQzVCLElBQUksY0FBYyxHQUFXLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqRCxPQUFPLGNBQWMsQ0FBQztBQUMxQixDQUFDO0FBRUQsMERBQTBEO0FBQzFELFNBQVMsa0JBQWtCLENBQUMsS0FBYTtJQUNyQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQ2pDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQ2YsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUVELHNCQUFzQjtBQUN0QixTQUFTLFlBQVksQ0FBQyxLQUFLO0lBQ3ZCLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDckIsSUFBSSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4RCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsVUFBVSxD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LFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNuRixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekQsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbInZhcmlhYmxlczoge1xyXG4gICAgdmFyIHBhZ2UgPSAxO1xyXG4gICAgdmFyIGlzQnVzeTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdmFyIGlzZW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcclxufVxyXG52YXIgY29uZmlndXJhY2lvbk51bWVyb3MgPSAkKFwiI0Zvcm1hdENvZGVJZE9wdGlvbnNcIikudmFsKCkudG9TdHJpbmcoKTtcclxuXHJcbi8vIGZ1bmNpb24gcGFyYSBjb252ZXJ0aXIgZW4gbWF5dXNjdWxhXHJcbmZ1bmN0aW9uIE1heXVzY3VsYShjYW1wbzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHZhciBDYW1wb01heXVzY3VsYTogc3RyaW5nID0gY2FtcG8udG9VcHBlckNhc2UoKTtcclxuICAgIHJldHVybiBDYW1wb01heXVzY3VsYTtcclxufVxyXG5cclxuLy9mdW5jaW9uIHBhcmEgY29udmVydGlyIGxhcyBwcmltZXJhcyBsZXRyYXMgZW4gbWF5dXNjdWxhc1xyXG5mdW5jdGlvbiBGaXJ0c2NhcGl0YWxsZXR0ZXIoX3dvcmQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gX3dvcmQucmVwbGFjZSgvKF58XFxzKShbYS16XSkvZyxcclxuICAgICAgICBmdW5jdGlvbiAobSwgcDEsIHAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwMS50b0xvd2VyQ2FzZSgpICsgcDIudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuLy9mdW5jaW9uIGNhY3VsYXIgZWRhZFxyXG5mdW5jdGlvbiBjYWxjdWxhckVkYWQoZmVjaGEpIHtcclxuICAgIHZhciBob3kgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdmFyIGN1bXBsZWFub3MgPSBuZXcgRGF0ZShmZWNoYSk7XHJcbiAgICB2YXIgZWRhZCA9IGhveS5nZXRGdWxsWWVhcigpIC0gY3VtcGxlYW5vcy5nZXRGdWxsWWVhcigpO1xyXG4gICAgdmFyIG0gPSBob3kuZ2V0TW9udGgoKSAtIGN1bXBsZWFub3MuZ2V0TW9udGgoKTtcclxuXHJcbiAgICBpZiAobSA8IDAgfHwgKG0gPT09IDAgJiYgaG95LmdldERhdGUoKSA8IGN1bXBsZWFub3MuZ2V0RGF0ZSgpKSkge1xyXG4gICAgICAgIGVkYWQtLTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWRhZCsxO1xyXG59XHJcblxyXG4vL2Z1bmNpb24gcGFyYSB2YWxpZGFyIGVtYWlsXHJcbmZ1bmN0aW9uIHZhbGlkYXJfZW1haWwoZW1haWw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgdmFyIHJlZ2V4ID0gL14oW2EtekEtWjAtOV9cXC5cXC1dKStcXEAoKFthLXpBLVowLTlcXC1dKStcXC4pKyhbYS16QS1aMC05XXsyLDR9KSskLztcclxuICAgIHJldHVybiByZWdleC50ZXN0KGVtYWlsKSA/IHRydWUgOiBmYWxzZTtcclxufVxyXG5cclxuLy9mb3JtYXRpYXIgZmVjaGEgcGFyYSBlZGl0YXJcclxuZnVuY3Rpb24gRm9ybWF0RGF0ZShfZmVjaGE6IHN0cmluZykge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZShfZmVjaGEuc3BsaXQoXCIvXCIpLnJldmVyc2UoKS5qb2luKFwiLVwiKSk7XHJcbiAgICB2YXIgZGQgPSBkLmdldERhdGUoKTtcclxuICAgIHZhciBtbSA9IGQuZ2V0TW9udGgoKSArIDE7XHJcbiAgICB2YXIgeXkgPSBkLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgaWYgKG1tIDwgMTApIG1tID0gMCArIG1tO1xyXG4gICAgaWYgKGRkIDwgMTApIGRkID0gMCArIGRkO1xyXG4gICAgdmFyIG5ld2RhdGUgPSB5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkO1xyXG4gICAgcmV0dXJuIG5ld2RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvcm1hdERhdGVBdXRvQmluZGluZyhfZmVjaGE6IHN0cmluZykge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZShfZmVjaGEpO1xyXG4gICAgdmFyIGRkOiBudW1iZXIgPSBkLmdldERhdGUoKTtcclxuICAgIHZhciBtbTogbnVtYmVyID0gZC5nZXRNb250aCgpICsgMTtcclxuICAgIHZhciB5eTogbnVtYmVyID0gZC5nZXRGdWxsWWVhcigpO1xyXG4gICAgbGV0IG1tMjogc3RyaW5nO1xyXG4gICAgbGV0IGRkMjogc3RyaW5nO1xyXG5cclxuICAgIGlmIChtbSA8IDEwKSB7XHJcbiAgICAgICAgbW0yID0gXCIwXCIgKyBtbTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG1tMiA9IG1tLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRkIDwgMTApIHtcclxuICAgICAgICBkZDIgPSBcIjBcIiArIGRkO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZGQyID0gZGQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbmV3ZGF0ZSA9IHl5ICsgXCItXCIgKyBtbTIgKyBcIi1cIiArIGRkMjtcclxuICAgIHJldHVybiBuZXdkYXRlO1xyXG59XHJcblxyXG4vL0Z1bmNpb24gcGFyYSBtb3N0cmFyIG1vZGFsXHJcbi8vZnVuY3Rpb24gTGlzdGFEZXNwbGFnYWJsZShfZWxlbWVudCwgX21vZGFsKSB7XHJcblxyXG4vLyAgICB2YXIgcCA9ICQoX2VsZW1lbnQpO1xyXG4vLyAgICB2YXIgcG9zaXRpb24gPSBwLm9mZnNldCgpO1xyXG4vLyAgICB2YXIgbW9kYWwgPSBcIi5cIiArIF9tb2RhbDtcclxuLy8gICAgdmFyIGFuY2hvRG9jdW1lbnRvID0gJChkb2N1bWVudCkud2lkdGgoKTtcclxuLy8gICAgdmFyIGFsdG9Eb2N1bWVudG8gPSAkKGRvY3VtZW50KS5oZWlnaHQoKTtcclxuLy8gICAgdmFyIGFuY2hvTW9kYWwgPSAkKG1vZGFsKS53aWR0aCgpO1xyXG4vLyAgICB2YXIgYWx0b01vZGFsID0gJChtb2RhbCkuaGVpZ2h0KCk7XHJcblxyXG4vLyAgICBpZiAoYWx0b01vZGFsID09IDUwKSB7XHJcbi8vICAgICAgICBhbHRvTW9kYWwgPSAzMDA7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIHZhciBkaW1lbnNpb25Nb2RhbF9pbnB1dCA9IGFuY2hvTW9kYWwgKyBwb3NpdGlvbi5sZWZ0O1xyXG4vLyAgICB2YXIgYWx0b01vZGFsX2lucHV0ID0gYWx0b01vZGFsICsgcG9zaXRpb24udG9wO1xyXG4vLyAgICB2YXIgZGlmZXJlbmNpYURlcmVjaGE7XHJcbi8vICAgIHZhciBkaWZlcmVuY2lhQWJham87XHJcblxyXG4vLyAgICAvL3Bvc2ljaW9uIGhvcml6b250YWxcclxuLy8gICAgaWYgKGRpbWVuc2lvbk1vZGFsX2lucHV0ID4gYW5jaG9Eb2N1bWVudG8pIHtcclxuXHJcbi8vICAgICAgICBkaWZlcmVuY2lhRGVyZWNoYSA9IGFuY2hvRG9jdW1lbnRvIC0gKHAub3V0ZXJXaWR0aCgpICsgcG9zaXRpb24ubGVmdCk7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyByaWdodDogZGlmZXJlbmNpYURlcmVjaGEsIGxlZnQ6ICcnIH0pOyAvL3Bvc2l0aW9uLmxlZnR9KTtcclxuXHJcbi8vICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyBsZWZ0OiBwb3NpdGlvbi5sZWZ0LCByaWdodDogJycgfSk7XHJcbi8vICAgIH1cclxuLy8gICAgLy9wb3NpY2lvbiB2ZXJ0aWNhbCBcclxuLy8gICAgaWYgKGFsdG9Nb2RhbF9pbnB1dCA+IGFsdG9Eb2N1bWVudG8pIHtcclxuXHJcbi8vICAgICAgICBkaWZlcmVuY2lhQWJham8gPSBhbHRvRG9jdW1lbnRvIC0gKHAub3V0ZXJIZWlnaHQoKSArIHBvc2l0aW9uLnRvcCk7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyBib3R0b206IGRpZmVyZW5jaWFBYmFqbyArIDM1LCB0b3A6ICcnIH0pOyAvL3Bvc2l0aW9uLmxlZnR9KTtcclxuXHJcbi8vICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyB0b3A6IHBvc2l0aW9uLnRvcCArIDM1LCBib3R0b206ICcnIH0pO1xyXG4vLyAgICB9XHJcblxyXG4vLyAgICAkKG1vZGFsKS5yZW1vdmVDbGFzcygnZW1wbGVhZG9Db2xsYXBzZScpO1xyXG4vL307XHJcblxyXG4vL2Z1bmNpb24gcGFyYSBlc3RpbG8gZGUgYWRqdW50YXIgYXJjaGl2b1xyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBDYXB0dXJhbW9zIGVsIGNsaWNrIGVuIGVsIDxhPlxyXG4gICAgLy8gcHJldmVuaW1vcyBlbCBjb21wb3J0YW1pZW50byBwb3IgZGVmZWN0b1xyXG4gICAgLy8geSByZXBsaWNhbW9zIGVsIGNsaWNrIGVuIHN1IGhlcm1hbm8gaW5wdXQuXHJcbiAgICAkKFwiLnRyaWdnZXItdXBsb2FkXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygnLmZvcm0tZmlsZScpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBDYXB0dXJhbW9zIGVsIGNsaWNrIGVuIGVsIDxhPlxyXG4gICAgLy8gcHJldmVuaW1vcyBlbCBjb21wb3J0YW1pZW50byBwb3IgZGVmZWN0b1xyXG4gICAgLy8geSByZXBsaWNhbW9zIGVsIGNsaWNrIGVuIHN1IGhlcm1hbm8gaW5wdXQuXHJcbiAgICAkKFwiLnRyaWdnZXItdXBsb2FkLWVtcFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5mb3JtLWZpbGUnKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJChcIi50cmlnZ2VyLXVwbG9hZC1kb2NcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuZm9ybS1maWxlLWRvYycpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIudHJpZ2dlci11cGxvYWRUd29cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuZm9ybS1maWxlVHdvJykudHJpZ2dlcihcImNsaWNrXCIpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLy9mdW5jaW9uIHBhcmEgcmVkaXJlY2Npb25hciBhbCBsb2dpblxyXG5mdW5jdGlvbiByZWRpcmVjY2lvbmFyYWxMb2dpbihyZXN1bHQ6IGFueSkge1xyXG4gICAgaWYgKHJlc3VsdC5zdGF0dXMgPT0gNDAwKSB7XHJcbiAgICAgICAgd2luZG93c19tZXNzYWdlKFwiU3Ugc2VzacOzbiBoYSBleHBpcmFkb1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0xvZ2luL0luZGV4XCI7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvRXJyb3IvSW5kZXhcIjsgICAgICAgIFxyXG4gICAgfVxyXG4gICBcclxuXHJcbn1cclxuXHJcbi8vQXV0b21hdGljQmluZGluZ1xyXG5mdW5jdGlvbiBBdXRvbWF0aWNCaW5kaW5nKG9iajogb2JqZWN0LCBzZWxlY3Q6IHN0cmluZywgcHJlT2JqOiBzdHJpbmcgPSBcIlwiKSB7XHJcblxyXG4gICAgbGV0IHByb3BlcnRpZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0KTtcclxuXHJcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHgpID0+IHtcclxuICAgICAgICBsZXQgc2VsZWN0QnlBdHRyOiBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoYCMke3ByZU9ian0ke3h9YCk7XHJcbiAgICAgICAgaWYgKHNlbGVjdEJ5QXR0ci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RCeUF0dHJbMF0udHlwZSA9PSBcImNoZWNrYm94XCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS5jaGVja2VkID0gb2JqW3hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNlbGVjdEJ5QXR0clswXS50eXBlID09IFwic2VsZWN0LW9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RCeUF0dHJbMF0udmFsdWUgPSBvYmpbeF07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0QnlBdHRyWzBdLnR5cGUgPT0gXCJkYXRlXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS52YWx1ZSA9IEZvcm1hdERhdGVBdXRvQmluZGluZyhvYmpbeF0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoc2VsZWN0QnlBdHRyWzBdLnR5cGUgPT0gXCJ0aW1lXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpbeF0gIT0gbnVsbCAmJiBvYmpbeF0uVG90YWxNaWxsaXNlY29uZHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS52YWx1ZSA9IEZvcm1hdEhvdXJzKG9ialt4XS5Ub3RhbE1pbGxpc2Vjb25kcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RCeUF0dHJbMF0udmFsdWUgPSBvYmpbeF07XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvcm1hdEhvdXJzKGhvcmEpIHtcclxuICAgIC8vbGV0IGRhdG8gPSBuZXcgRGF0ZShob3JhKS50b0lTT1N0cmluZygpLnN1YnN0cigxNCwgOCk7XHJcbiAgICBsZXQgZGF0byA9IG5ldyBEYXRlKGhvcmEpLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDExLCA4KTtcclxuICAgIHJldHVybiBkYXRvO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIE5ld0Zvcm1hRGF0ZShfZmVjaGE6IHN0cmluZywgX2lzVG9kYXk6Ym9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJcIikge1xyXG4gICAgICAgIGNvbmZpZ3VyYWNpb25OdW1lcm9zID0gXCJlbi1VU1wiO1xyXG4gICAgfVxyXG4gICAgbGV0IGQ6IERhdGU7XHJcbiAgICBpZiAoIV9pc1RvZGF5KSB7XHJcbiAgICAgICAgdmFyIG5ld0RhdGVBcnJheTogQXJyYXk8c3RyaW5nPiA9IF9mZWNoYS5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgdmFyIG5ld0RhdGU6IHN0cmluZztcclxuICAgICAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJlbi1VU1wiKSB7XHJcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXdEYXRlQXJyYXlbMl0gKyBcIi1cIiArIG5ld0RhdGVBcnJheVswXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXdEYXRlQXJyYXlbMl0gKyBcIi1cIiArIG5ld0RhdGVBcnJheVsxXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzBdO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy92YXIgbmV3RGF0ZTAxOiBzdHJpbmcgPSBfZmVjaGEuc3BsaXQoXCIvXCIpLnJldmVyc2UoKS5qb2luKFwiLVwiKTtcclxuICAgICAgICAvL2lmIChfZmVjaGEuaW5kZXhPZihcIlRcIikgPT0gLTEpIHtcclxuICAgICAgICAvLyAgICBuZXdEYXRlID0gbmV3RGF0ZSArIFwiVDAwOjAwOjAwXCI7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgZCA9IG5ldyBEYXRlKG5ld0RhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkID0gbmV3IERhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGQ6IG51bWJlciA9IGQuZ2V0RGF0ZSgpO1xyXG4gICAgdmFyIG1tOiBudW1iZXIgPSBkLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgdmFyIHl5OiBudW1iZXIgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBsZXQgbW0yOiBzdHJpbmc7XHJcbiAgICBsZXQgZGQyOiBzdHJpbmc7XHJcblxyXG4gICAgaWYgKG1tIDwgMTApIHtcclxuICAgICAgICBtbTIgPSBcIjBcIiArIG1tO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbW0yID0gbW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGQgPCAxMCkge1xyXG4gICAgICAgIGRkMiA9IFwiMFwiICsgZGQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkZDIgPSBkZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBuZXdkYXRlID0geXkgKyBcIi1cIiArIG1tMiArIFwiLVwiICsgZGQyO1xyXG4gICAgcmV0dXJuIG5ld2RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvcm10RmVjaGFUaXBvQ2FsZW5kYXJpbyhfZmVjaGEpIHtcclxuICAgIHZhciBkZDogbnVtYmVyO1xyXG4gICAgdmFyIG1tOiBudW1iZXI7XHJcbiAgICBsZXQgbW0yOiBzdHJpbmc7XHJcbiAgICBsZXQgZGQyOiBzdHJpbmc7XHJcbiAgICB2YXIgbmV3RGF0ZUFycmF5OiBBcnJheTxzdHJpbmc+ID0gX2ZlY2hhLnNwbGl0KFwiL1wiKTtcclxuICAgIHZhciBuZXdEYXRlOiBzdHJpbmc7XHJcbiAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJlbi1VU1wiKSB7XHJcbiAgICAgICAgZGQgPSBwYXJzZUludChuZXdEYXRlQXJyYXlbMV0pO1xyXG4gICAgICAgIG1tID0gcGFyc2VJbnQobmV3RGF0ZUFycmF5WzBdKTtcclxuICAgICAgICBpZiAobW0gPCAxMCkge1xyXG4gICAgICAgICAgICBtbTIgPSBcIjBcIiArIG1tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbW0yID0gbW0udG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkZCA8IDEwKSB7XHJcbiAgICAgICAgICAgIGRkMiA9IFwiMFwiICsgZGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkZDIgPSBkZC50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3RGF0ZSA9IG5ld0RhdGVBcnJheVsyXSArIFwiLVwiICsgbW0yICsgXCItXCIgKyBkZDIgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbmV3RGF0ZSA9IG5ld0RhdGVBcnJheVsyXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzFdICsgXCItXCIgKyBuZXdEYXRlQXJyYXlbMF07XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4vL0xpc3RhIGRlIGRlcGFydGFtZW50b3NcclxuZnVuY3Rpb24gTGlzdERlcGFybWVudChfb3B0aW9uOiBzdHJpbmcgPSBcIiNEZXBhcnRtZW50SWRcIikge1xyXG4gICAgaWYgKCQoX29wdGlvbilbMF0uY2hpbGRyZW4ubGVuZ3RoID09IDApIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL3B1ZXN0b3NhY3Rpdm9zL0J1c2NhcmRlcGFydGFtZW50b3NcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHZXRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKF9vcHRpb24pLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLkRlcGFydG1lbnRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoX29wdGlvbikuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy9MaXN0YSBkZSBjYXJnb3NcclxuZnVuY3Rpb24gTGlzdEpvYnMoKSB7XHJcbiAgICBpZiAoJChcIiNKb2JJZFwiKVswXS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvcHVlc3Rvc2FjdGl2b3MvQnVzY2FyQ2FyZ29zXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR2V0XCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0pvYklkXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLkpvYklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNKb2JJZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vL0xpc3RhIGRlIHB1ZXN0b3NcclxuZnVuY3Rpb24gTGlzdFBvc2l0aW9uKCkge1xyXG4gICAgaWYgKCQoXCIjTm90aWZ5UG9zaXRpb25JZFwiKVswXS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvdmFjYW50ZXMvQnVzY2FyUHVlc3Rvc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNOb3RpZnlQb3NpdGlvbklkXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5Qb3NpdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKHRoaXMuUG9zaXRpb25JZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjTm90aWZ5UG9zaXRpb25JZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vL0xpc3RhIGRlIHBhaXNlc1xyXG5mdW5jdGlvbiBMaXN0Q291bnRyaWVzKENhbXBvOnN0cmluZykge1xyXG4gICAgaWYgKCQoQ2FtcG8pWzBdLmNoaWxkcmVuLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9kaXJlY2Npb25lbXBsZWFkb3MvcGFpc2VzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoQ2FtcG8pLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLkNvdW50cnlJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoQ2FtcG8pLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZm9ybWF0TnVtYmVyR3JhZih2YWx1ZTpudW1iZXIpIHtcclxuICAgIHJldHVybiB2YWx1ZS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIHsgc3R5bGU6IFwiY3VycmVuY3lcIiwgY3VycmVuY3k6IFwiVVNEXCIgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBGb3JtYXRFcnJvcnMoZGF0YSkge1xyXG4gICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICB9KTtcclxuICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG59XHJcblxyXG4vL2Z1bmN0aW9uIFNpbWJvbG9EZWNpbWFsKF9mb3JtYXRvKSB7XHJcbi8vICAgIHZhciBzaW1ib2xvX2RlY2ltYWwgPSAxLjE7XHJcbi8vICAgIHJldHVybiBzaW1ib2xvX2RlY2ltYWwudG9Mb2NhbGVTdHJpbmcoX2Zvcm1hdG8pLnN1YnN0cmluZygyLCAxKTtcclxuLy99XHJcblxyXG4vL2Zvcm1hdG8gbnVtZXJpY28gcGFyYSBjYWxjdWxhclxyXG4vL2Z1bmN0aW9uIEZvcm1hdG9OdW1lcmljb3NfQ2FsY3VsYXIoX251bWVybykge1xyXG5cclxuLy8gICAgaWYgKGNvbmZpZ3VyYWNpb25OdW1lcm9zID09IFwiXCIpIHtcclxuLy8gICAgICAgIGNvbmZpZ3VyYWNpb25OdW1lcm9zID0gXCJlbi1VU1wiO1xyXG4vLyAgICB9XHJcblxyXG4vLyAgICBpZiAoU2ltYm9sb0RlY2ltYWwoY29uZmlndXJhY2lvbk51bWVyb3MpID09ICcuJykge1xyXG4vLyAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvLC9nLCBcIlwiKTtcclxuLy8gICAgfVxyXG4vLyAgICBlbHNlIHtcclxuLy8gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuLy8gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCIuXCIpO1xyXG4vLyAgICB9XHJcbi8vICAgIHZhciBmb3JtYW51bWVybyA9IHBhcnNlRmxvYXQoX251bWVybyk7XHJcbi8vICAgIGlmIChpc05hTihmb3JtYW51bWVybykpIHtcclxuLy8gICAgICAgIGZvcm1hbnVtZXJvID0gMDtcclxuLy8gICAgfVxyXG4vLyAgICByZXR1cm4gcGFyc2VGbG9hdChmb3JtYW51bWVyby50b0ZpeGVkKDIpKTtcclxuLy99XHJcblxyXG4vL2Z1bmN0aW9uIEZvcm1hdG9OdW1lcmljb3NfTW9zdHJhcihfbnVtZXJvKSB7XHJcbiAgXHJcbi8vICAgIGlmIChjb25maWd1cmFjaW9uTnVtZXJvcyA9PSBcIlwiKSB7XHJcbi8vICAgICAgICBjb25maWd1cmFjaW9uTnVtZXJvcyA9IFwiZW4tVVNcIjtcclxuLy8gICAgfVxyXG5cclxuLy8gICAgaWYgKFNpbWJvbG9EZWNpbWFsKGNvbmZpZ3VyYWNpb25OdW1lcm9zKSA9PSAnLicpIHtcclxuLy8gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCJcIik7XHJcbi8vICAgIH1cclxuLy8gICAgZWxzZSB7XHJcbi8vICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC9cXC4vZywgXCJcIik7XHJcbi8vICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC8sL2csIFwiLlwiKTtcclxuLy8gICAgfVxyXG4vLyAgICB2YXIgZm9ybWFudW1lcm8gPSBwYXJzZUZsb2F0KF9udW1lcm8pO1xyXG4vLyAgICBpZiAoaXNOYU4oZm9ybWFudW1lcm8pKSB7XHJcbi8vICAgICAgICBmb3JtYW51bWVybyA9IDA7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoY29uZmlndXJhY2lvbk51bWVyb3MpLmZvcm1hdChmb3JtYW51bWVybyk7XHJcbi8vfVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIoX251bWVybzogc3RyaW5nLCBfbW9kaWZpZWRGb3JtYXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cclxuICAgIC8vU2VjY2nDs24gZGlzZcOxYWRhIHBhcmEgY29ycmVnaXIgbG9zIGZvcm1hdG9zIGFsIHJlYWxpemFyIG9wZXJhY2lvbmVzIGNvbiBuw7ptZXJvc1xyXG4gICAgaWYgKFNpbWJvbG9EZWNpbWFsKGNvbmZpZ3VyYWNpb25OdW1lcm9zKSAhPSAnLicgJiYgX21vZGlmaWVkRm9ybWF0ID09IHRydWUpIHtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC9cXC4vZywgXCIsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb25maWd1cmFjaW9uTnVtZXJvcyA9PSBcIlwiKSB7XHJcbiAgICAgICAgY29uZmlndXJhY2lvbk51bWVyb3MgPSBcImVuLVVTXCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFNpbWJvbG9EZWNpbWFsKGNvbmZpZ3VyYWNpb25OdW1lcm9zKSA9PSAnLicpIHtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC8sL2csIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xyXG4gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCIuXCIpO1xyXG4gICAgfVxyXG4gICAgdmFyIGZvcm1hbnVtZXJvID0gcGFyc2VGbG9hdChfbnVtZXJvKTtcclxuXHJcbiAgICBpZiAoaXNOYU4oZm9ybWFudW1lcm8pKSB7XHJcbiAgICAgICAgZm9ybWFudW1lcm8gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoY29uZmlndXJhY2lvbk51bWVyb3MpLmZvcm1hdChwYXJzZUZsb2F0KGZvcm1hbnVtZXJvLnRvRml4ZWQoMikpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gU2ltYm9sb0RlY2ltYWwoX2Zvcm1hdG8pIHtcclxuICAgIHZhciBzaW1ib2xvX2RlY2ltYWwgPSAxLjE7XHJcbiAgICByZXR1cm4gc2ltYm9sb19kZWNpbWFsLnRvTG9jYWxlU3RyaW5nKF9mb3JtYXRvKS5zdWJzdHJpbmcoMiwgMSk7XHJcbn1cclxuXHJcbi8vZm9ybWF0byBudW1lcmljbyBwYXJhIGNhbGN1bGFyXHJcbmZ1bmN0aW9uIEZvcm1hdG9OdW1lcmljb3NfQ2FsY3VsYXIoX251bWVybzogc3RyaW5nKSB7XHJcblxyXG4gICAgaWYgKGNvbmZpZ3VyYWNpb25OdW1lcm9zID09IFwiXCIpIHtcclxuICAgICAgICBjb25maWd1cmFjaW9uTnVtZXJvcyA9IFwiZW4tVVNcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoU2ltYm9sb0RlY2ltYWwoY29uZmlndXJhY2lvbk51bWVyb3MpID09ICcuJykge1xyXG4gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCJcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC9cXC4vZywgXCJcIik7XHJcbiAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvLC9nLCBcIi5cIik7XHJcbiAgICB9XHJcbiAgICB2YXIgZm9ybWFudW1lcm8gPSBwYXJzZUZsb2F0KF9udW1lcm8pO1xyXG4gICAgaWYgKGlzTmFOKGZvcm1hbnVtZXJvKSkge1xyXG4gICAgICAgIGZvcm1hbnVtZXJvID0gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJzZUZsb2F0KGZvcm1hbnVtZXJvLnRvRml4ZWQoMikpO1xyXG59XHJcblxyXG5cclxuLy9wbHVnaW4gcGFyYSBlbCBmb3JtYXRvICBudW3DqXJpY29cclxuZnVuY3Rpb24gVXNlUGx1Z2luTnVtYmVyRm9ybWF0KGZvcm06c3RyaW5nKSB7XHJcbiAgICAkKFwiLnBsdWdpbi1udW1iZXItZm9ybWF0XCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXMgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICBsZXQgbnVtOiBzdHJpbmcgPSB0aGF0LnZhbHVlO1xyXG5cclxuICAgICAgICAkKHRoYXQpLnZhbChGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIobnVtKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGAke2Zvcm19IC5wbHVnaW4tbnVtYmVyLWZvcm1hdGApLmVhY2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXMgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICBsZXQgbnVtOiBzdHJpbmcgPSB0aGF0LnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJlbi1VU1wiKSB7XHJcbiAgICAgICAgICAgIG51bSA9IG51bS5yZXBsYWNlKFwiLFwiLCBcIi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBudW0gPSBudW0ucmVwbGFjZShcIi5cIiwgXCIsXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCh0aGF0KS52YWwoRm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKG51bSkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vdHIgbG9hZGVyXHJcbmZ1bmN0aW9uIEFkZFRyTG9hZGVyKGVsZW1lbnQpIHtcclxuICAgICQoZWxlbWVudCkucHJlcGVuZCgnPHRyIGNsYXNzPVwidHItbG9hZGVyXCI+PHRkIGNvbHNwYW49XCIxXCI+IDwvdGQ+PHRkIGNvbHNwYW49XCIxXCI+ICdcclxuICAgICAgICArJzxkaXY+PC9kaXY+PC90ZD48dGQgY29sc3Bhbj1cIjRcIiA+PGRpdj48L2Rpdj48L3RkID48dGQgY29sc3Bhbj1cIjJcIiA+PGRpdj48L2Rpdj48L3RkID4gPHRkIGNvbHNwYW49XCIzXCI+PGRpdj48L2Rpdj48L3RkPiA8dGQgY29sc3Bhbj1cIjVcIiA+PGRpdj48L2Rpdj48L3RkPjwvdHI+Jyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIERhdGFmaWx0ZXIoX3Rib2R5dGFibGU6IHN0cmluZywgX3VybDogc3RyaW5nLCBfdHlwZUVtcGxveWU6IHN0cmluZyA9IFwiXCIsIF9uYW1lZmlsdHJlID0gXCIub3B0aW9uRmlsdGVyXCIsIF92YWx1ZXNGaWx0ZXIgPSAnLnRleHRGaWx0ZXInKSB7XHJcbiAgICBBZGRUckxvYWRlcigkKF90Ym9keXRhYmxlKSk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IF91cmwsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBQcm9wZXJ0eU5hbWU6ICQoX25hbWVmaWx0cmUpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIFByb3BlcnR5VmFsdWU6ICQoX3ZhbHVlc0ZpbHRlcikudmFsKCkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgdHlwZTogX3R5cGVFbXBsb3llXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoX3Rib2R5dGFibGUpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAkKF90Ym9keXRhYmxlKS5hcHBlbmQoZGF0YSk7XHJcbiAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gRGF0YWZpbHRlck1vZGFscyhfdGJvZHl0YWJsZTogc3RyaW5nLCBfdXJsOiBzdHJpbmcsIF9lbXBsb3llZWlkOiBzdHJpbmcsIF9uYW1lZmlsdHJlID0gXCIub3B0aW9uRmlsdGVyTW9kYWxcIiwgX3ZhbHVlc0ZpbHRlciA9ICcudGV4dEZpbHRlck1vZGFsJykge1xyXG4gICAgQWRkVHJMb2FkZXIoJChfdGJvZHl0YWJsZSkpO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiBfdXJsLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgUHJvcGVydHlOYW1lOiAkKF9uYW1lZmlsdHJlKS52YWwoKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBQcm9wZXJ0eVZhbHVlOiAkKF92YWx1ZXNGaWx0ZXIpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGVtcGxveWVlaWQ6IF9lbXBsb3llZWlkXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoX3Rib2R5dGFibGUpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAkKF90Ym9keXRhYmxlKS5hcHBlbmQoZGF0YSk7XHJcbiAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW9yZWRhdGEoX21heHNjcm9sbDogbnVtYmVyLCBfY29udHJvbGxlcjogc3RyaW5nLCBfdGJvZHk6IHN0cmluZywgX3R5cGU6IHN0cmluZyA9IFwiXCIsIF9pc1ZlcnNpb246Ym9vbGVhbiA9IGZhbHNlLF9pZDpzdHJpbmc9XCJcIikge1xyXG4gICAgcGFnZSsrO1xyXG4gICAgaXNCdXN5ID0gdHJ1ZTtcclxuICAgIGlmICghaXNlbXB0eSkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYC8ke19jb250cm9sbGVyfS9GaWx0ZXJPck1vcmVEYXRhYCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgX1BhZ2VOdW1iZXI6IHBhZ2UsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBfdHlwZSxcclxuICAgICAgICAgICAgICAgIElzVmVyc2lvbjogX2lzVmVyc2lvbixcclxuICAgICAgICAgICAgICAgIElkOiBfaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBcIlwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoX3Rib2R5KS5jaGlsZHJlbigpLmxhc3QoKS5hZnRlcihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbFRvcChfbWF4c2Nyb2xsKTtcclxuICAgICAgICAgICAgICAgICAgICAvL0PDs2RpZ28gcGFyYSBtb3N0cmFyIGxhIGF5dWRhXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5pZC1iYXRjaC1pbmZvXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhhdCA9ICQodGhpcylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3doZWxwKHRoYXQsIFwiL2hpc3RvcmlhbGxvdGVzL0luZm9Qcm9jZXNzXCIsIFwiLmNvbnQtYmF0Y2gtaW5mb1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuY2FyZC1oZWxwID4gcFwiKS5odG1sKHNwbGl0TWVzc2FnZSgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5kYXRhLWluZm8tYmF0Y2gnKS5odG1sKCkudHJpbSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpc2VtcHR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBGdW5jaW9uIHBhcmEgaGFiaWxpdGFyIGRvYmxlIGNsaWMgZW4gZmlsYXMgZGUgdGFibGFzIExpc3RQYWdlXHJcbi8vIFVzbyBjb24gcGFyYW1ldHJvOiBlbmFibGVSb3dEb3VibGVDbGljaygnLnRib2R5LVRhYmxlLURlcGFydG1lbnQnLCAnLkRlcGFydG1lbnRJZHRibCcsICcvZGVwYXJ0YW1lbnRvc2FjdGl2b3MvZ2V0YnlpZCcsIGNhbGxiYWNrLCAnSWQnKVxyXG4vLyBVc28gY29uIFVSTDogZW5hYmxlUm93RG91YmxlQ2xpY2soJy50Ym9keS1UYWJsZS1YJywgJy5YSWR0YmwnLCAnL2VuZHBvaW50L3tpZH0nLCBjYWxsYmFjaykgLSB7aWR9IHNlIHJlZW1wbGF6YSBjb24gZWwgdmFsb3JcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5mdW5jdGlvbiBlbmFibGVSb3dEb3VibGVDbGljayhcclxuICAgIHRib2R5U2VsZWN0b3I6IHN0cmluZyxcclxuICAgIGlkQ2VsbFNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICBhamF4VXJsOiBzdHJpbmcsXHJcbiAgICBvblN1Y2Nlc3NDYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCxcclxuICAgIGlkUGFyYW1OYW1lOiBzdHJpbmcgPSBcIklkXCJcclxuKSB7XHJcbiAgICAvLyBEZWxlZ2FjaW9uIGRlIGV2ZW50b3MgcGFyYSBmaWxhcyBkaW5hbWljYXNcclxuICAgICQoZG9jdW1lbnQpLm9uKCdkYmxjbGljaycsIGAke3Rib2R5U2VsZWN0b3J9IC5yb3ctYXBwYCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyBFdml0YXIgcXVlIGVsIGRvYmxlIGNsaWMgZW4gY2hlY2tib3ggZGlzcGFyZSBsYSBlZGljaW9uXHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSB8fCAkKGUudGFyZ2V0KS5pcygnbGFiZWwnKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPYnRlbmVyIGVsIElEIGRlbCByZWdpc3RybyBkZXNkZSBsYSBjZWxkYSBlc3BlY2lmaWNhZGFcclxuICAgICAgICBjb25zdCByb3dJZCA9ICQodGhpcykuZmluZChpZENlbGxTZWxlY3RvcikudGV4dCgpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgaWYgKCFyb3dJZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ05vIHNlIHB1ZG8gb2J0ZW5lciBlbCBJRCBkZWwgcmVnaXN0cm8nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTW9zdHJhciBpbmRpY2Fkb3IgZGUgY2FyZ2FcclxuICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pO1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmFyIHNpIGxhIFVSTCB1c2EgcGxhY2Vob2xkZXIge2lkfSBvIHBhcmFtZXRyb1xyXG4gICAgICAgIGxldCBmaW5hbFVybCA9IGFqYXhVcmw7XHJcbiAgICAgICAgbGV0IGFqYXhEYXRhOiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGFqYXhVcmwuaW5jbHVkZXMoJ3tpZH0nKSkge1xyXG4gICAgICAgICAgICAvLyBVUkwgY29uIElEIGVuIGxhIHJ1dGE6IC9lbmRwb2ludC97aWR9IC0+IC9lbmRwb2ludC8xMjNcclxuICAgICAgICAgICAgZmluYWxVcmwgPSBhamF4VXJsLnJlcGxhY2UoJ3tpZH0nLCByb3dJZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpZFBhcmFtTmFtZSkge1xyXG4gICAgICAgICAgICAvLyBVUkwgY29uIHBhcmFtZXRybzogL2VuZHBvaW50P0lkPTEyM1xyXG4gICAgICAgICAgICBhamF4RGF0YVtpZFBhcmFtTmFtZV0gPSByb3dJZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIExsYW1hciBhbCBlbmRwb2ludCBwYXJhIG9idGVuZXIgbG9zIGRhdG9zXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBmaW5hbFVybCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YTogYWpheERhdGEsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzc0NhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJObyBzZSBlbmNvbnRybyBlbCByZWdpc3Ryb1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFncmVnYXIgY2xhc2UgcGFyYSBpbmRpY2FyIHF1ZSBsYXMgZmlsYXMgc29uIGNsaWNrZWFibGVzXHJcbiAgICAkKGAke3Rib2R5U2VsZWN0b3J9IC5yb3ctYXBwYCkuYWRkQ2xhc3MoJ3Jvdy1jbGlja2FibGUnKTtcclxuXHJcbiAgICAvLyBPYnNlcnZhciBjYW1iaW9zIGVuIGVsIERPTSBwYXJhIGFwbGljYXIgY2xhc2UgYSBudWV2YXMgZmlsYXNcclxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xyXG4gICAgICAgICQoYCR7dGJvZHlTZWxlY3Rvcn0gLnJvdy1hcHBgKS5ub3QoJy5yb3ctY2xpY2thYmxlJykuYWRkQ2xhc3MoJ3Jvdy1jbGlja2FibGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRib2R5U2VsZWN0b3IpO1xyXG4gICAgaWYgKHRhcmdldE5vZGUpIHtcclxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldE5vZGUsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=