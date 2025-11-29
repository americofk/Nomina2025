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
    var isBusy: boolean = false;
    var isempty: boolean = false;
}
var configuracionNumeros = $("#FormatCodeIdOptions").val().toString();

/**
 * Convierte una cadena de texto a mayúsculas
 * @param {string} campo - Texto a convertir
 * @returns {string} Texto en mayúsculas
 */
function Mayuscula(campo: string): string {
    var CampoMayuscula: string = campo.toUpperCase();
    return CampoMayuscula;
}

//funcion para convertir las primeras letras en mayusculas
function Firtscapitalletter(_word: string): string {
    return _word.replace(/(^|\s)([a-z])/g,
        function (m, p1, p2) {
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

    return edad+1;
}

//funcion para validar email
function validar_email(email: string): boolean {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

//formatiar fecha para editar
function FormatDate(_fecha: string) {
    var d = new Date(_fecha.split("/").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();

    if (mm < 10) mm = 0 + mm;
    if (dd < 10) dd = 0 + dd;
    var newdate = yy + "-" + mm + "-" + dd;
    return newdate;
}

function FormatDateAutoBinding(_fecha: string) {
    var d = new Date(_fecha);
    var dd: number = d.getDate();
    var mm: number = d.getMonth() + 1;
    var yy: number = d.getFullYear();
    let mm2: string;
    let dd2: string;

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
function redireccionaralLogin(result: any) {
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
function AutomaticBinding(obj: object, select: string, preObj: string = "") {

    let properties = Object.getOwnPropertyNames(obj);
    let container = document.querySelector(select);

    properties.forEach((x) => {
        let selectByAttr: NodeListOf<HTMLInputElement> = container.querySelectorAll(`#${preObj}${x}`);
        if (selectByAttr.length > 0) {
            if (selectByAttr[0].type == "checkbox") {
                selectByAttr[0].checked = obj[x];
            }
            else if (selectByAttr[0].type == "select-one") {
                selectByAttr[0].value = obj[x];
            } else if (selectByAttr[0].type == "date") {
                selectByAttr[0].value = FormatDateAutoBinding(obj[x]);
            }else if (selectByAttr[0].type == "time") {
                if (obj[x] != null && obj[x].TotalMilliseconds != null) {
                    selectByAttr[0].value = FormatHours(obj[x].TotalMilliseconds);
                }
            } else {
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



function NewFormaDate(_fecha: string, _isToday:boolean = false) {
    if (configuracionNumeros == "") {
        configuracionNumeros = "en-US";
    }
    let d: Date;
    if (!_isToday) {
        var newDateArray: Array<string> = _fecha.split("/");
        var newDate: string;
        if (configuracionNumeros == "en-US") {
            newDate = newDateArray[2] + "-" + newDateArray[0] + "-" + newDateArray[1];
        } else {
            newDate = newDateArray[2] + "-" + newDateArray[1] + "-" + newDateArray[0];

        }
        //var newDate01: string = _fecha.split("/").reverse().join("-");
        //if (_fecha.indexOf("T") == -1) {
        //    newDate = newDate + "T00:00:00";
        //}
        d = new Date(newDate);
    } else {
        d = new Date();
    }

    var dd: number = d.getDate();
    var mm: number = d.getMonth() + 1;
    var yy: number = d.getFullYear();
    let mm2: string;
    let dd2: string;

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
    var dd: number;
    var mm: number;
    let mm2: string;
    let dd2: string;
    var newDateArray: Array<string> = _fecha.split("/");
    var newDate: string;
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
        return newDate = newDateArray[2] + "-" + mm2 + "-" + dd2 ;
    } else {
        return newDate = newDateArray[2] + "-" + newDateArray[1] + "-" + newDateArray[0];

    }
}

//Lista de departamentos
function ListDeparment(_option: string = "#DepartmentId") {
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
function ListCountries(Campo:string) {
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


function formatNumberGraf(value:number) {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}


function FormatErrors(data) {
    var _errors: string = "";
    data.Errors.forEach(function (x: string) {
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



function FormatoNumericos_Mostrar(_numero: string, _modifiedFormat: boolean = false) {

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
function FormatoNumericos_Calcular(_numero: string) {

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
function UsePluginNumberFormat(form:string) {
    $(".plugin-number-format").on("change", function () {
        let that = this as HTMLInputElement;
        let num: string = that.value;

        $(that).val(FormatoNumericos_Mostrar(num));
    });

    $(`${form} .plugin-number-format`).each(function (e) {
        let that = this as HTMLInputElement;
        let num: string = that.value;

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
        +'<div></div></td><td colspan="4" ><div></div></td ><td colspan="2" ><div></div></td > <td colspan="3"><div></div></td> <td colspan="5" ><div></div></td></tr>');
}

function Datafilter(_tbodytable: string, _url: string, _typeEmploye: string = "", _namefiltre = ".optionFilter", _valuesFilter = '.textFilter') {
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

function DatafilterModals(_tbodytable: string, _url: string, _employeeid: string, _namefiltre = ".optionFilterModal", _valuesFilter = '.textFilterModal') {
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

function moredata(_maxscroll: number, _controller: string, _tbody: string, _type: string = "", _isVersion:boolean = false,_id:string="") {
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
function enableRowDoubleClick(
    tbodySelector: string,
    idCellSelector: string,
    ajaxUrl: string,
    onSuccessCallback: (data: any) => void,
    idParamName: string = "Id"
) {
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
        let ajaxData: any = {};

        if (ajaxUrl.includes('{id}')) {
            // URL con ID en la ruta: /endpoint/{id} -> /endpoint/123
            finalUrl = ajaxUrl.replace('{id}', rowId);
        } else if (idParamName) {
            // URL con parametro: /endpoint?Id=123
            ajaxData[idParamName] = rowId;
        }

        // Llamar al endpoint para obtener los datos
        $.ajax({
            url: finalUrl,
            type: "GET",
            data: ajaxData,
            async: true,
            success: function (data: any) {
                $('.progreso').modal('hide');
                if (data != null) {
                    onSuccessCallback(data);
                } else {
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

