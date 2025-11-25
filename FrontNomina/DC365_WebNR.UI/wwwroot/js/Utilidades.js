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
                selectByAttr[0].value = FormatHours(obj[x].TotalMilliseconds);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbGlkYWRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL1V0aWxpZGFkZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxFQUFFLENBQUM7SUFDUixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7SUFDYixJQUFJLE1BQU0sR0FBWSxLQUFLLENBQUM7SUFDNUIsSUFBSSxPQUFPLEdBQVksS0FBSyxDQUFDO0FBQ2pDLENBQUM7QUFDRCxJQUFJLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBRXRFLHNDQUFzQztBQUN0QyxTQUFTLFNBQVMsQ0FBQyxLQUFhO0lBQzVCLElBQUksY0FBYyxHQUFXLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqRCxPQUFPLGNBQWMsQ0FBQztBQUMxQixDQUFDO0FBRUQsMERBQTBEO0FBQzFELFNBQVMsa0JBQWtCLENBQUMsS0FBYTtJQUNyQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQ2pDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQ2YsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUVELHNCQUFzQjtBQUN0QixTQUFTLFlBQVksQ0FBQyxLQUFLO0lBQ3ZCLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDckIsSUFBSSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4RCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsVUFBVSxD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cmlhYmxlczoge1xyXG4gICAgdmFyIHBhZ2UgPSAxO1xyXG4gICAgdmFyIGlzQnVzeTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdmFyIGlzZW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcclxufVxyXG52YXIgY29uZmlndXJhY2lvbk51bWVyb3MgPSAkKFwiI0Zvcm1hdENvZGVJZE9wdGlvbnNcIikudmFsKCkudG9TdHJpbmcoKTtcclxuXHJcbi8vIGZ1bmNpb24gcGFyYSBjb252ZXJ0aXIgZW4gbWF5dXNjdWxhXHJcbmZ1bmN0aW9uIE1heXVzY3VsYShjYW1wbzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHZhciBDYW1wb01heXVzY3VsYTogc3RyaW5nID0gY2FtcG8udG9VcHBlckNhc2UoKTtcclxuICAgIHJldHVybiBDYW1wb01heXVzY3VsYTtcclxufVxyXG5cclxuLy9mdW5jaW9uIHBhcmEgY29udmVydGlyIGxhcyBwcmltZXJhcyBsZXRyYXMgZW4gbWF5dXNjdWxhc1xyXG5mdW5jdGlvbiBGaXJ0c2NhcGl0YWxsZXR0ZXIoX3dvcmQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gX3dvcmQucmVwbGFjZSgvKF58XFxzKShbYS16XSkvZyxcclxuICAgICAgICBmdW5jdGlvbiAobSwgcDEsIHAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwMS50b0xvd2VyQ2FzZSgpICsgcDIudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuLy9mdW5jaW9uIGNhY3VsYXIgZWRhZFxyXG5mdW5jdGlvbiBjYWxjdWxhckVkYWQoZmVjaGEpIHtcclxuICAgIHZhciBob3kgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdmFyIGN1bXBsZWFub3MgPSBuZXcgRGF0ZShmZWNoYSk7XHJcbiAgICB2YXIgZWRhZCA9IGhveS5nZXRGdWxsWWVhcigpIC0gY3VtcGxlYW5vcy5nZXRGdWxsWWVhcigpO1xyXG4gICAgdmFyIG0gPSBob3kuZ2V0TW9udGgoKSAtIGN1bXBsZWFub3MuZ2V0TW9udGgoKTtcclxuXHJcbiAgICBpZiAobSA8IDAgfHwgKG0gPT09IDAgJiYgaG95LmdldERhdGUoKSA8IGN1bXBsZWFub3MuZ2V0RGF0ZSgpKSkge1xyXG4gICAgICAgIGVkYWQtLTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWRhZCsxO1xyXG59XHJcblxyXG4vL2Z1bmNpb24gcGFyYSB2YWxpZGFyIGVtYWlsXHJcbmZ1bmN0aW9uIHZhbGlkYXJfZW1haWwoZW1haWw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgdmFyIHJlZ2V4ID0gL14oW2EtekEtWjAtOV9cXC5cXC1dKStcXEAoKFthLXpBLVowLTlcXC1dKStcXC4pKyhbYS16QS1aMC05XXsyLDR9KSskLztcclxuICAgIHJldHVybiByZWdleC50ZXN0KGVtYWlsKSA/IHRydWUgOiBmYWxzZTtcclxufVxyXG5cclxuLy9mb3JtYXRpYXIgZmVjaGEgcGFyYSBlZGl0YXJcclxuZnVuY3Rpb24gRm9ybWF0RGF0ZShfZmVjaGE6IHN0cmluZykge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZShfZmVjaGEuc3BsaXQoXCIvXCIpLnJldmVyc2UoKS5qb2luKFwiLVwiKSk7XHJcbiAgICB2YXIgZGQgPSBkLmdldERhdGUoKTtcclxuICAgIHZhciBtbSA9IGQuZ2V0TW9udGgoKSArIDE7XHJcbiAgICB2YXIgeXkgPSBkLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgaWYgKG1tIDwgMTApIG1tID0gMCArIG1tO1xyXG4gICAgaWYgKGRkIDwgMTApIGRkID0gMCArIGRkO1xyXG4gICAgdmFyIG5ld2RhdGUgPSB5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkO1xyXG4gICAgcmV0dXJuIG5ld2RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvcm1hdERhdGVBdXRvQmluZGluZyhfZmVjaGE6IHN0cmluZykge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZShfZmVjaGEpO1xyXG4gICAgdmFyIGRkOiBudW1iZXIgPSBkLmdldERhdGUoKTtcclxuICAgIHZhciBtbTogbnVtYmVyID0gZC5nZXRNb250aCgpICsgMTtcclxuICAgIHZhciB5eTogbnVtYmVyID0gZC5nZXRGdWxsWWVhcigpO1xyXG4gICAgbGV0IG1tMjogc3RyaW5nO1xyXG4gICAgbGV0IGRkMjogc3RyaW5nO1xyXG5cclxuICAgIGlmIChtbSA8IDEwKSB7XHJcbiAgICAgICAgbW0yID0gXCIwXCIgKyBtbTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG1tMiA9IG1tLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRkIDwgMTApIHtcclxuICAgICAgICBkZDIgPSBcIjBcIiArIGRkO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZGQyID0gZGQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbmV3ZGF0ZSA9IHl5ICsgXCItXCIgKyBtbTIgKyBcIi1cIiArIGRkMjtcclxuICAgIHJldHVybiBuZXdkYXRlO1xyXG59XHJcblxyXG4vL0Z1bmNpb24gcGFyYSBtb3N0cmFyIG1vZGFsXHJcbi8vZnVuY3Rpb24gTGlzdGFEZXNwbGFnYWJsZShfZWxlbWVudCwgX21vZGFsKSB7XHJcblxyXG4vLyAgICB2YXIgcCA9ICQoX2VsZW1lbnQpO1xyXG4vLyAgICB2YXIgcG9zaXRpb24gPSBwLm9mZnNldCgpO1xyXG4vLyAgICB2YXIgbW9kYWwgPSBcIi5cIiArIF9tb2RhbDtcclxuLy8gICAgdmFyIGFuY2hvRG9jdW1lbnRvID0gJChkb2N1bWVudCkud2lkdGgoKTtcclxuLy8gICAgdmFyIGFsdG9Eb2N1bWVudG8gPSAkKGRvY3VtZW50KS5oZWlnaHQoKTtcclxuLy8gICAgdmFyIGFuY2hvTW9kYWwgPSAkKG1vZGFsKS53aWR0aCgpO1xyXG4vLyAgICB2YXIgYWx0b01vZGFsID0gJChtb2RhbCkuaGVpZ2h0KCk7XHJcblxyXG4vLyAgICBpZiAoYWx0b01vZGFsID09IDUwKSB7XHJcbi8vICAgICAgICBhbHRvTW9kYWwgPSAzMDA7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIHZhciBkaW1lbnNpb25Nb2RhbF9pbnB1dCA9IGFuY2hvTW9kYWwgKyBwb3NpdGlvbi5sZWZ0O1xyXG4vLyAgICB2YXIgYWx0b01vZGFsX2lucHV0ID0gYWx0b01vZGFsICsgcG9zaXRpb24udG9wO1xyXG4vLyAgICB2YXIgZGlmZXJlbmNpYURlcmVjaGE7XHJcbi8vICAgIHZhciBkaWZlcmVuY2lhQWJham87XHJcblxyXG4vLyAgICAvL3Bvc2ljaW9uIGhvcml6b250YWxcclxuLy8gICAgaWYgKGRpbWVuc2lvbk1vZGFsX2lucHV0ID4gYW5jaG9Eb2N1bWVudG8pIHtcclxuXHJcbi8vICAgICAgICBkaWZlcmVuY2lhRGVyZWNoYSA9IGFuY2hvRG9jdW1lbnRvIC0gKHAub3V0ZXJXaWR0aCgpICsgcG9zaXRpb24ubGVmdCk7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyByaWdodDogZGlmZXJlbmNpYURlcmVjaGEsIGxlZnQ6ICcnIH0pOyAvL3Bvc2l0aW9uLmxlZnR9KTtcclxuXHJcbi8vICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyBsZWZ0OiBwb3NpdGlvbi5sZWZ0LCByaWdodDogJycgfSk7XHJcbi8vICAgIH1cclxuLy8gICAgLy9wb3NpY2lvbiB2ZXJ0aWNhbCBcclxuLy8gICAgaWYgKGFsdG9Nb2RhbF9pbnB1dCA+IGFsdG9Eb2N1bWVudG8pIHtcclxuXHJcbi8vICAgICAgICBkaWZlcmVuY2lhQWJham8gPSBhbHRvRG9jdW1lbnRvIC0gKHAub3V0ZXJIZWlnaHQoKSArIHBvc2l0aW9uLnRvcCk7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyBib3R0b206IGRpZmVyZW5jaWFBYmFqbyArIDM1LCB0b3A6ICcnIH0pOyAvL3Bvc2l0aW9uLmxlZnR9KTtcclxuXHJcbi8vICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyB0b3A6IHBvc2l0aW9uLnRvcCArIDM1LCBib3R0b206ICcnIH0pO1xyXG4vLyAgICB9XHJcblxyXG4vLyAgICAkKG1vZGFsKS5yZW1vdmVDbGFzcygnZW1wbGVhZG9Db2xsYXBzZScpO1xyXG4vL307XHJcblxyXG4vL2Z1bmNpb24gcGFyYSBlc3RpbG8gZGUgYWRqdW50YXIgYXJjaGl2b1xyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBDYXB0dXJhbW9zIGVsIGNsaWNrIGVuIGVsIDxhPlxyXG4gICAgLy8gcHJldmVuaW1vcyBlbCBjb21wb3J0YW1pZW50byBwb3IgZGVmZWN0b1xyXG4gICAgLy8geSByZXBsaWNhbW9zIGVsIGNsaWNrIGVuIHN1IGhlcm1hbm8gaW5wdXQuXHJcbiAgICAkKFwiLnRyaWdnZXItdXBsb2FkXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygnLmZvcm0tZmlsZScpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBDYXB0dXJhbW9zIGVsIGNsaWNrIGVuIGVsIDxhPlxyXG4gICAgLy8gcHJldmVuaW1vcyBlbCBjb21wb3J0YW1pZW50byBwb3IgZGVmZWN0b1xyXG4gICAgLy8geSByZXBsaWNhbW9zIGVsIGNsaWNrIGVuIHN1IGhlcm1hbm8gaW5wdXQuXHJcbiAgICAkKFwiLnRyaWdnZXItdXBsb2FkLWVtcFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5mb3JtLWZpbGUnKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJChcIi50cmlnZ2VyLXVwbG9hZC1kb2NcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuZm9ybS1maWxlLWRvYycpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIudHJpZ2dlci11cGxvYWRUd29cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuZm9ybS1maWxlVHdvJykudHJpZ2dlcihcImNsaWNrXCIpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLy9mdW5jaW9uIHBhcmEgcmVkaXJlY2Npb25hciBhbCBsb2dpblxyXG5mdW5jdGlvbiByZWRpcmVjY2lvbmFyYWxMb2dpbihyZXN1bHQ6IGFueSkge1xyXG4gICAgaWYgKHJlc3VsdC5zdGF0dXMgPT0gNDAwKSB7XHJcbiAgICAgICAgd2luZG93c19tZXNzYWdlKFwiU3Ugc2VzacOzbiBoYSBleHBpcmFkb1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0xvZ2luL0luZGV4XCI7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvRXJyb3IvSW5kZXhcIjsgICAgICAgIFxyXG4gICAgfVxyXG4gICBcclxuXHJcbn1cclxuXHJcbi8vQXV0b21hdGljQmluZGluZ1xyXG5mdW5jdGlvbiBBdXRvbWF0aWNCaW5kaW5nKG9iajogb2JqZWN0LCBzZWxlY3Q6IHN0cmluZywgcHJlT2JqOiBzdHJpbmcgPSBcIlwiKSB7XHJcblxyXG4gICAgbGV0IHByb3BlcnRpZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0KTtcclxuXHJcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHgpID0+IHtcclxuICAgICAgICBsZXQgc2VsZWN0QnlBdHRyOiBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoYCMke3ByZU9ian0ke3h9YCk7XHJcbiAgICAgICAgaWYgKHNlbGVjdEJ5QXR0ci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RCeUF0dHJbMF0udHlwZSA9PSBcImNoZWNrYm94XCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS5jaGVja2VkID0gb2JqW3hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNlbGVjdEJ5QXR0clswXS50eXBlID09IFwic2VsZWN0LW9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RCeUF0dHJbMF0udmFsdWUgPSBvYmpbeF07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0QnlBdHRyWzBdLnR5cGUgPT0gXCJkYXRlXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS52YWx1ZSA9IEZvcm1hdERhdGVBdXRvQmluZGluZyhvYmpbeF0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoc2VsZWN0QnlBdHRyWzBdLnR5cGUgPT0gXCJ0aW1lXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS52YWx1ZSA9IEZvcm1hdEhvdXJzKG9ialt4XS5Ub3RhbE1pbGxpc2Vjb25kcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RCeUF0dHJbMF0udmFsdWUgPSBvYmpbeF07XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvcm1hdEhvdXJzKGhvcmEpIHtcclxuICAgIC8vbGV0IGRhdG8gPSBuZXcgRGF0ZShob3JhKS50b0lTT1N0cmluZygpLnN1YnN0cigxNCwgOCk7XHJcbiAgICBsZXQgZGF0byA9IG5ldyBEYXRlKGhvcmEpLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDExLCA4KTtcclxuICAgIHJldHVybiBkYXRvO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIE5ld0Zvcm1hRGF0ZShfZmVjaGE6IHN0cmluZywgX2lzVG9kYXk6Ym9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJcIikge1xyXG4gICAgICAgIGNvbmZpZ3VyYWNpb25OdW1lcm9zID0gXCJlbi1VU1wiO1xyXG4gICAgfVxyXG4gICAgbGV0IGQ6IERhdGU7XHJcbiAgICBpZiAoIV9pc1RvZGF5KSB7XHJcbiAgICAgICAgdmFyIG5ld0RhdGVBcnJheTogQXJyYXk8c3RyaW5nPiA9IF9mZWNoYS5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgdmFyIG5ld0RhdGU6IHN0cmluZztcclxuICAgICAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJlbi1VU1wiKSB7XHJcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXdEYXRlQXJyYXlbMl0gKyBcIi1cIiArIG5ld0RhdGVBcnJheVswXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXdEYXRlQXJyYXlbMl0gKyBcIi1cIiArIG5ld0RhdGVBcnJheVsxXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzBdO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy92YXIgbmV3RGF0ZTAxOiBzdHJpbmcgPSBfZmVjaGEuc3BsaXQoXCIvXCIpLnJldmVyc2UoKS5qb2luKFwiLVwiKTtcclxuICAgICAgICAvL2lmIChfZmVjaGEuaW5kZXhPZihcIlRcIikgPT0gLTEpIHtcclxuICAgICAgICAvLyAgICBuZXdEYXRlID0gbmV3RGF0ZSArIFwiVDAwOjAwOjAwXCI7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgZCA9IG5ldyBEYXRlKG5ld0RhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkID0gbmV3IERhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGQ6IG51bWJlciA9IGQuZ2V0RGF0ZSgpO1xyXG4gICAgdmFyIG1tOiBudW1iZXIgPSBkLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgdmFyIHl5OiBudW1iZXIgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBsZXQgbW0yOiBzdHJpbmc7XHJcbiAgICBsZXQgZGQyOiBzdHJpbmc7XHJcblxyXG4gICAgaWYgKG1tIDwgMTApIHtcclxuICAgICAgICBtbTIgPSBcIjBcIiArIG1tO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbW0yID0gbW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGQgPCAxMCkge1xyXG4gICAgICAgIGRkMiA9IFwiMFwiICsgZGQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkZDIgPSBkZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBuZXdkYXRlID0geXkgKyBcIi1cIiArIG1tMiArIFwiLVwiICsgZGQyO1xyXG4gICAgcmV0dXJuIG5ld2RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvcm10RmVjaGFUaXBvQ2FsZW5kYXJpbyhfZmVjaGEpIHtcclxuICAgIHZhciBkZDogbnVtYmVyO1xyXG4gICAgdmFyIG1tOiBudW1iZXI7XHJcbiAgICBsZXQgbW0yOiBzdHJpbmc7XHJcbiAgICBsZXQgZGQyOiBzdHJpbmc7XHJcbiAgICB2YXIgbmV3RGF0ZUFycmF5OiBBcnJheTxzdHJpbmc+ID0gX2ZlY2hhLnNwbGl0KFwiL1wiKTtcclxuICAgIHZhciBuZXdEYXRlOiBzdHJpbmc7XHJcbiAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJlbi1VU1wiKSB7XHJcbiAgICAgICAgZGQgPSBwYXJzZUludChuZXdEYXRlQXJyYXlbMV0pO1xyXG4gICAgICAgIG1tID0gcGFyc2VJbnQobmV3RGF0ZUFycmF5WzBdKTtcclxuICAgICAgICBpZiAobW0gPCAxMCkge1xyXG4gICAgICAgICAgICBtbTIgPSBcIjBcIiArIG1tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbW0yID0gbW0udG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkZCA8IDEwKSB7XHJcbiAgICAgICAgICAgIGRkMiA9IFwiMFwiICsgZGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkZDIgPSBkZC50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3RGF0ZSA9IG5ld0RhdGVBcnJheVsyXSArIFwiLVwiICsgbW0yICsgXCItXCIgKyBkZDIgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbmV3RGF0ZSA9IG5ld0RhdGVBcnJheVsyXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzFdICsgXCItXCIgKyBuZXdEYXRlQXJyYXlbMF07XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4vL0xpc3RhIGRlIGRlcGFydGFtZW50b3NcclxuZnVuY3Rpb24gTGlzdERlcGFybWVudChfb3B0aW9uOiBzdHJpbmcgPSBcIiNEZXBhcnRtZW50SWRcIikge1xyXG4gICAgaWYgKCQoX29wdGlvbilbMF0uY2hpbGRyZW4ubGVuZ3RoID09IDApIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL3B1ZXN0b3NhY3Rpdm9zL0J1c2NhcmRlcGFydGFtZW50b3NcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHZXRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKF9vcHRpb24pLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLkRlcGFydG1lbnRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoX29wdGlvbikuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy9MaXN0YSBkZSBjYXJnb3NcclxuZnVuY3Rpb24gTGlzdEpvYnMoKSB7XHJcbiAgICBpZiAoJChcIiNKb2JJZFwiKVswXS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvcHVlc3Rvc2FjdGl2b3MvQnVzY2FyQ2FyZ29zXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR2V0XCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0pvYklkXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLkpvYklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNKb2JJZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vL0xpc3RhIGRlIHB1ZXN0b3NcclxuZnVuY3Rpb24gTGlzdFBvc2l0aW9uKCkge1xyXG4gICAgaWYgKCQoXCIjTm90aWZ5UG9zaXRpb25JZFwiKVswXS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvdmFjYW50ZXMvQnVzY2FyUHVlc3Rvc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNOb3RpZnlQb3NpdGlvbklkXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5Qb3NpdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKHRoaXMuUG9zaXRpb25JZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjTm90aWZ5UG9zaXRpb25JZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vL0xpc3RhIGRlIHBhaXNlc1xyXG5mdW5jdGlvbiBMaXN0Q291bnRyaWVzKENhbXBvOnN0cmluZykge1xyXG4gICAgaWYgKCQoQ2FtcG8pWzBdLmNoaWxkcmVuLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9kaXJlY2Npb25lbXBsZWFkb3MvcGFpc2VzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoQ2FtcG8pLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLkNvdW50cnlJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoQ2FtcG8pLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZm9ybWF0TnVtYmVyR3JhZih2YWx1ZTpudW1iZXIpIHtcclxuICAgIHJldHVybiB2YWx1ZS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIHsgc3R5bGU6IFwiY3VycmVuY3lcIiwgY3VycmVuY3k6IFwiVVNEXCIgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBGb3JtYXRFcnJvcnMoZGF0YSkge1xyXG4gICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICB9KTtcclxuICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUpO1xyXG59XHJcblxyXG4vL2Z1bmN0aW9uIFNpbWJvbG9EZWNpbWFsKF9mb3JtYXRvKSB7XHJcbi8vICAgIHZhciBzaW1ib2xvX2RlY2ltYWwgPSAxLjE7XHJcbi8vICAgIHJldHVybiBzaW1ib2xvX2RlY2ltYWwudG9Mb2NhbGVTdHJpbmcoX2Zvcm1hdG8pLnN1YnN0cmluZygyLCAxKTtcclxuLy99XHJcblxyXG4vL2Zvcm1hdG8gbnVtZXJpY28gcGFyYSBjYWxjdWxhclxyXG4vL2Z1bmN0aW9uIEZvcm1hdG9OdW1lcmljb3NfQ2FsY3VsYXIoX251bWVybykge1xyXG5cclxuLy8gICAgaWYgKGNvbmZpZ3VyYWNpb25OdW1lcm9zID09IFwiXCIpIHtcclxuLy8gICAgICAgIGNvbmZpZ3VyYWNpb25OdW1lcm9zID0gXCJlbi1VU1wiO1xyXG4vLyAgICB9XHJcblxyXG4vLyAgICBpZiAoU2ltYm9sb0RlY2ltYWwoY29uZmlndXJhY2lvbk51bWVyb3MpID09ICcuJykge1xyXG4vLyAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvLC9nLCBcIlwiKTtcclxuLy8gICAgfVxyXG4vLyAgICBlbHNlIHtcclxuLy8gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuLy8gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCIuXCIpO1xyXG4vLyAgICB9XHJcbi8vICAgIHZhciBmb3JtYW51bWVybyA9IHBhcnNlRmxvYXQoX251bWVybyk7XHJcbi8vICAgIGlmIChpc05hTihmb3JtYW51bWVybykpIHtcclxuLy8gICAgICAgIGZvcm1hbnVtZXJvID0gMDtcclxuLy8gICAgfVxyXG4vLyAgICByZXR1cm4gcGFyc2VGbG9hdChmb3JtYW51bWVyby50b0ZpeGVkKDIpKTtcclxuLy99XHJcblxyXG4vL2Z1bmN0aW9uIEZvcm1hdG9OdW1lcmljb3NfTW9zdHJhcihfbnVtZXJvKSB7XHJcbiAgXHJcbi8vICAgIGlmIChjb25maWd1cmFjaW9uTnVtZXJvcyA9PSBcIlwiKSB7XHJcbi8vICAgICAgICBjb25maWd1cmFjaW9uTnVtZXJvcyA9IFwiZW4tVVNcIjtcclxuLy8gICAgfVxyXG5cclxuLy8gICAgaWYgKFNpbWJvbG9EZWNpbWFsKGNvbmZpZ3VyYWNpb25OdW1lcm9zKSA9PSAnLicpIHtcclxuLy8gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCJcIik7XHJcbi8vICAgIH1cclxuLy8gICAgZWxzZSB7XHJcbi8vICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC9cXC4vZywgXCJcIik7XHJcbi8vICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC8sL2csIFwiLlwiKTtcclxuLy8gICAgfVxyXG4vLyAgICB2YXIgZm9ybWFudW1lcm8gPSBwYXJzZUZsb2F0KF9udW1lcm8pO1xyXG4vLyAgICBpZiAoaXNOYU4oZm9ybWFudW1lcm8pKSB7XHJcbi8vICAgICAgICBmb3JtYW51bWVybyA9IDA7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoY29uZmlndXJhY2lvbk51bWVyb3MpLmZvcm1hdChmb3JtYW51bWVybyk7XHJcbi8vfVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIoX251bWVybzogc3RyaW5nLCBfbW9kaWZpZWRGb3JtYXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cclxuICAgIC8vU2VjY2nDs24gZGlzZcOxYWRhIHBhcmEgY29ycmVnaXIgbG9zIGZvcm1hdG9zIGFsIHJlYWxpemFyIG9wZXJhY2lvbmVzIGNvbiBuw7ptZXJvc1xyXG4gICAgaWYgKFNpbWJvbG9EZWNpbWFsKGNvbmZpZ3VyYWNpb25OdW1lcm9zKSAhPSAnLicgJiYgX21vZGlmaWVkRm9ybWF0ID09IHRydWUpIHtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC9cXC4vZywgXCIsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb25maWd1cmFjaW9uTnVtZXJvcyA9PSBcIlwiKSB7XHJcbiAgICAgICAgY29uZmlndXJhY2lvbk51bWVyb3MgPSBcImVuLVVTXCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFNpbWJvbG9EZWNpbWFsKGNvbmZpZ3VyYWNpb25OdW1lcm9zKSA9PSAnLicpIHtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC8sL2csIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xyXG4gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCIuXCIpO1xyXG4gICAgfVxyXG4gICAgdmFyIGZvcm1hbnVtZXJvID0gcGFyc2VGbG9hdChfbnVtZXJvKTtcclxuXHJcbiAgICBpZiAoaXNOYU4oZm9ybWFudW1lcm8pKSB7XHJcbiAgICAgICAgZm9ybWFudW1lcm8gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoY29uZmlndXJhY2lvbk51bWVyb3MpLmZvcm1hdChwYXJzZUZsb2F0KGZvcm1hbnVtZXJvLnRvRml4ZWQoMikpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gU2ltYm9sb0RlY2ltYWwoX2Zvcm1hdG8pIHtcclxuICAgIHZhciBzaW1ib2xvX2RlY2ltYWwgPSAxLjE7XHJcbiAgICByZXR1cm4gc2ltYm9sb19kZWNpbWFsLnRvTG9jYWxlU3RyaW5nKF9mb3JtYXRvKS5zdWJzdHJpbmcoMiwgMSk7XHJcbn1cclxuXHJcbi8vZm9ybWF0byBudW1lcmljbyBwYXJhIGNhbGN1bGFyXHJcbmZ1bmN0aW9uIEZvcm1hdG9OdW1lcmljb3NfQ2FsY3VsYXIoX251bWVybzogc3RyaW5nKSB7XHJcblxyXG4gICAgaWYgKGNvbmZpZ3VyYWNpb25OdW1lcm9zID09IFwiXCIpIHtcclxuICAgICAgICBjb25maWd1cmFjaW9uTnVtZXJvcyA9IFwiZW4tVVNcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoU2ltYm9sb0RlY2ltYWwoY29uZmlndXJhY2lvbk51bWVyb3MpID09ICcuJykge1xyXG4gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCJcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC9cXC4vZywgXCJcIik7XHJcbiAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvLC9nLCBcIi5cIik7XHJcbiAgICB9XHJcbiAgICB2YXIgZm9ybWFudW1lcm8gPSBwYXJzZUZsb2F0KF9udW1lcm8pO1xyXG4gICAgaWYgKGlzTmFOKGZvcm1hbnVtZXJvKSkge1xyXG4gICAgICAgIGZvcm1hbnVtZXJvID0gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJzZUZsb2F0KGZvcm1hbnVtZXJvLnRvRml4ZWQoMikpO1xyXG59XHJcblxyXG5cclxuLy9wbHVnaW4gcGFyYSBlbCBmb3JtYXRvICBudW3DqXJpY29cclxuZnVuY3Rpb24gVXNlUGx1Z2luTnVtYmVyRm9ybWF0KGZvcm06c3RyaW5nKSB7XHJcbiAgICAkKFwiLnBsdWdpbi1udW1iZXItZm9ybWF0XCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXMgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICBsZXQgbnVtOiBzdHJpbmcgPSB0aGF0LnZhbHVlO1xyXG5cclxuICAgICAgICAkKHRoYXQpLnZhbChGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIobnVtKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGAke2Zvcm19IC5wbHVnaW4tbnVtYmVyLWZvcm1hdGApLmVhY2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXMgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICBsZXQgbnVtOiBzdHJpbmcgPSB0aGF0LnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJlbi1VU1wiKSB7XHJcbiAgICAgICAgICAgIG51bSA9IG51bS5yZXBsYWNlKFwiLFwiLCBcIi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBudW0gPSBudW0ucmVwbGFjZShcIi5cIiwgXCIsXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCh0aGF0KS52YWwoRm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKG51bSkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vdHIgbG9hZGVyXHJcbmZ1bmN0aW9uIEFkZFRyTG9hZGVyKGVsZW1lbnQpIHtcclxuICAgICQoZWxlbWVudCkucHJlcGVuZCgnPHRyIGNsYXNzPVwidHItbG9hZGVyXCI+PHRkIGNvbHNwYW49XCIxXCI+IDwvdGQ+PHRkIGNvbHNwYW49XCIxXCI+ICdcclxuICAgICAgICArJzxkaXY+PC9kaXY+PC90ZD48dGQgY29sc3Bhbj1cIjRcIiA+PGRpdj48L2Rpdj48L3RkID48dGQgY29sc3Bhbj1cIjJcIiA+PGRpdj48L2Rpdj48L3RkID4gPHRkIGNvbHNwYW49XCIzXCI+PGRpdj48L2Rpdj48L3RkPiA8dGQgY29sc3Bhbj1cIjVcIiA+PGRpdj48L2Rpdj48L3RkPjwvdHI+Jyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIERhdGFmaWx0ZXIoX3Rib2R5dGFibGU6IHN0cmluZywgX3VybDogc3RyaW5nLCBfdHlwZUVtcGxveWU6IHN0cmluZyA9IFwiXCIsIF9uYW1lZmlsdHJlID0gXCIub3B0aW9uRmlsdGVyXCIsIF92YWx1ZXNGaWx0ZXIgPSAnLnRleHRGaWx0ZXInKSB7XHJcbiAgICBBZGRUckxvYWRlcigkKF90Ym9keXRhYmxlKSk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IF91cmwsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBQcm9wZXJ0eU5hbWU6ICQoX25hbWVmaWx0cmUpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIFByb3BlcnR5VmFsdWU6ICQoX3ZhbHVlc0ZpbHRlcikudmFsKCkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgdHlwZTogX3R5cGVFbXBsb3llXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoX3Rib2R5dGFibGUpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAkKF90Ym9keXRhYmxlKS5hcHBlbmQoZGF0YSk7XHJcbiAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gRGF0YWZpbHRlck1vZGFscyhfdGJvZHl0YWJsZTogc3RyaW5nLCBfdXJsOiBzdHJpbmcsIF9lbXBsb3llZWlkOiBzdHJpbmcsIF9uYW1lZmlsdHJlID0gXCIub3B0aW9uRmlsdGVyTW9kYWxcIiwgX3ZhbHVlc0ZpbHRlciA9ICcudGV4dEZpbHRlck1vZGFsJykge1xyXG4gICAgQWRkVHJMb2FkZXIoJChfdGJvZHl0YWJsZSkpO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiBfdXJsLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgUHJvcGVydHlOYW1lOiAkKF9uYW1lZmlsdHJlKS52YWwoKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBQcm9wZXJ0eVZhbHVlOiAkKF92YWx1ZXNGaWx0ZXIpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGVtcGxveWVlaWQ6IF9lbXBsb3llZWlkXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoX3Rib2R5dGFibGUpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAkKF90Ym9keXRhYmxlKS5hcHBlbmQoZGF0YSk7XHJcbiAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW9yZWRhdGEoX21heHNjcm9sbDogbnVtYmVyLCBfY29udHJvbGxlcjogc3RyaW5nLCBfdGJvZHk6IHN0cmluZywgX3R5cGU6IHN0cmluZyA9IFwiXCIsIF9pc1ZlcnNpb246Ym9vbGVhbiA9IGZhbHNlLF9pZDpzdHJpbmc9XCJcIikge1xyXG4gICAgcGFnZSsrO1xyXG4gICAgaXNCdXN5ID0gdHJ1ZTtcclxuICAgIGlmICghaXNlbXB0eSkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYC8ke19jb250cm9sbGVyfS9GaWx0ZXJPck1vcmVEYXRhYCxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgX1BhZ2VOdW1iZXI6IHBhZ2UsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBfdHlwZSxcclxuICAgICAgICAgICAgICAgIElzVmVyc2lvbjogX2lzVmVyc2lvbixcclxuICAgICAgICAgICAgICAgIElkOiBfaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBcIlwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoX3Rib2R5KS5jaGlsZHJlbigpLmxhc3QoKS5hZnRlcihkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbFRvcChfbWF4c2Nyb2xsKTtcclxuICAgICAgICAgICAgICAgICAgICAvL0PDs2RpZ28gcGFyYSBtb3N0cmFyIGxhIGF5dWRhXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5pZC1iYXRjaC1pbmZvXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhhdCA9ICQodGhpcylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3doZWxwKHRoYXQsIFwiL2hpc3RvcmlhbGxvdGVzL0luZm9Qcm9jZXNzXCIsIFwiLmNvbnQtYmF0Y2gtaW5mb1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuY2FyZC1oZWxwID4gcFwiKS5odG1sKHNwbGl0TWVzc2FnZSgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5kYXRhLWluZm8tYmF0Y2gnKS5odG1sKCkudHJpbSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpc2VtcHR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuIl19