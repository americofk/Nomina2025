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
// ============================================================================
// Función para filtrar categorías de proyecto por proyecto seleccionado
// Se usa en formularios que tienen dropdowns de Proyecto y Categoría de Proyecto
// ============================================================================
function filterProjCategoryByProject(projectSelector = '#ProjId', categorySelector = '#ProjCategory') {
    // Guardar el valor actual de categoría (para modo edición)
    let currentCategoryValue = $(categorySelector).val();
    // Escuchar cambios en el dropdown de proyecto
    $(projectSelector).off('change.projCategoryFilter').on('change.projCategoryFilter', function () {
        let projId = $(this).val();
        let categoryDropdown = $(categorySelector);
        // Limpiar categorías actuales y agregar opción por defecto
        categoryDropdown.html('<option value="">Seleccione...</option>');
        if (projId && projId !== '') {
            // Obtener categorías filtradas por proyecto
            $.ajax({
                url: `/categoriaproyectoactivas/byproject/${projId}`,
                type: "GET",
                async: true,
                success: function (data) {
                    if (data && data.length > 0) {
                        data.forEach(function (category) {
                            let option = $('<option></option>');
                            // El frontend usa PascalCase (PropertyNamingPolicy = null en Startup.cs)
                            option.val(category.ProjCategoryId);
                            option.text(category.CategoryName);
                            categoryDropdown.append(option);
                        });
                    }
                },
                error: function (xhr) {
                    console.error("Error al cargar categorías de proyecto");
                }
            });
        }
    });
    // Si hay un proyecto preseleccionado (modo edición), cargar sus categorías
    let initialProjId = $(projectSelector).val();
    if (initialProjId && initialProjId !== '') {
        $.ajax({
            url: `/categoriaproyectoactivas/byproject/${initialProjId}`,
            type: "GET",
            async: true,
            success: function (data) {
                let categoryDropdown = $(categorySelector);
                categoryDropdown.html('<option value="">Seleccione...</option>');
                if (data && data.length > 0) {
                    data.forEach(function (category) {
                        let option = $('<option></option>');
                        // El frontend usa PascalCase (PropertyNamingPolicy = null en Startup.cs)
                        option.val(category.ProjCategoryId);
                        option.text(category.CategoryName);
                        categoryDropdown.append(option);
                    });
                    // Restaurar el valor seleccionado previamente
                    if (currentCategoryValue && currentCategoryValue !== '') {
                        categoryDropdown.val(currentCategoryValue);
                    }
                }
            },
            error: function (xhr) {
                console.error("Error al cargar categorías de proyecto");
            }
        });
    }
}
// Exponer funciones necesarias para módulos ES6 en el objeto window
window.filterProjCategoryByProject = filterProjCategoryByProject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbGlkYWRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL1V0aWxpZGFkZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0dBUUc7QUFFSCxTQUFTLEVBQUUsQ0FBQztJQUNSLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNiLElBQUksTUFBTSxHQUFZLEtBQUssQ0FBQztJQUM1QixJQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7QUFDakMsQ0FBQztBQUNELElBQUksb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7QUFFdEU7Ozs7R0FJRztBQUNILFNBQVMsU0FBUyxDQUFDLEtBQWE7SUFDNUIsSUFBSSxjQUFjLEdBQVcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pELE9BQU8sY0FBYyxDQUFDO0FBQzFCLENBQUM7QUFFRCwwREFBMEQ7QUFDMUQsU0FBUyxrQkFBa0IsQ0FBQyxLQUFhO0lBQ3JDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFDakMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDZixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsc0JBQXNCO0FBQ3RCLFNBQVMsWUFBWSxDQUFDLEtBQUs7SUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNyQixJQUFJLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFR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LGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDcEMsQ0FBQyxDQUFDLENBQUM7b0JBRUgsOENBQThDO29CQUM5QyxJQUFJLG9CQUFvQixJQUFJLG9CQUFvQixLQUFLLEVBQUUsRUFBRSxDQUFDO3dCQUN0RCxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztvQkFDL0MsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUNELEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUM1RCxDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztBQUNMLENBQUM7QUFFRCxvRUFBb0U7QUFDbkUsTUFBYyxDQUFDLDJCQUEyQixHQUFHLDJCQUEyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIFV0aWxpZGFkZXMudHNcclxuICogQGRlc2NyaXB0aW9uIEZ1bmNpb25lcyB1dGlsaXRhcmlhcyBnZW5lcmFsZXMgcGFyYSBsYSBhcGxpY2FjacOzbiBkZSBuw7NtaW5hLlxyXG4gKiAgICAgICAgICAgICAgSW5jbHV5ZSBoZWxwZXJzIHBhcmEgbWFuZWpvIGRlIGZvcm11bGFyaW9zLCB2YWxpZGFjaW9uZXMsXHJcbiAqICAgICAgICAgICAgICBmb3JtYXRlbyBkZSBkYXRvcyB5IGNvbXVuaWNhY2nDs24gY29uIGVsIHNlcnZpZG9yLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBVdGlsaWRhZGVzXHJcbiAqL1xyXG5cclxudmFyaWFibGVzOiB7XHJcbiAgICB2YXIgcGFnZSA9IDE7XHJcbiAgICB2YXIgaXNCdXN5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB2YXIgaXNlbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG59XHJcbnZhciBjb25maWd1cmFjaW9uTnVtZXJvcyA9ICQoXCIjRm9ybWF0Q29kZUlkT3B0aW9uc1wiKS52YWwoKS50b1N0cmluZygpO1xyXG5cclxuLyoqXHJcbiAqIENvbnZpZXJ0ZSB1bmEgY2FkZW5hIGRlIHRleHRvIGEgbWF5w7pzY3VsYXNcclxuICogQHBhcmFtIHtzdHJpbmd9IGNhbXBvIC0gVGV4dG8gYSBjb252ZXJ0aXJcclxuICogQHJldHVybnMge3N0cmluZ30gVGV4dG8gZW4gbWF5w7pzY3VsYXNcclxuICovXHJcbmZ1bmN0aW9uIE1heXVzY3VsYShjYW1wbzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHZhciBDYW1wb01heXVzY3VsYTogc3RyaW5nID0gY2FtcG8udG9VcHBlckNhc2UoKTtcclxuICAgIHJldHVybiBDYW1wb01heXVzY3VsYTtcclxufVxyXG5cclxuLy9mdW5jaW9uIHBhcmEgY29udmVydGlyIGxhcyBwcmltZXJhcyBsZXRyYXMgZW4gbWF5dXNjdWxhc1xyXG5mdW5jdGlvbiBGaXJ0c2NhcGl0YWxsZXR0ZXIoX3dvcmQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gX3dvcmQucmVwbGFjZSgvKF58XFxzKShbYS16XSkvZyxcclxuICAgICAgICBmdW5jdGlvbiAobSwgcDEsIHAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwMS50b0xvd2VyQ2FzZSgpICsgcDIudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuLy9mdW5jaW9uIGNhY3VsYXIgZWRhZFxyXG5mdW5jdGlvbiBjYWxjdWxhckVkYWQoZmVjaGEpIHtcclxuICAgIHZhciBob3kgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdmFyIGN1bXBsZWFub3MgPSBuZXcgRGF0ZShmZWNoYSk7XHJcbiAgICB2YXIgZWRhZCA9IGhveS5nZXRGdWxsWWVhcigpIC0gY3VtcGxlYW5vcy5nZXRGdWxsWWVhcigpO1xyXG4gICAgdmFyIG0gPSBob3kuZ2V0TW9udGgoKSAtIGN1bXBsZWFub3MuZ2V0TW9udGgoKTtcclxuXHJcbiAgICBpZiAobSA8IDAgfHwgKG0gPT09IDAgJiYgaG95LmdldERhdGUoKSA8IGN1bXBsZWFub3MuZ2V0RGF0ZSgpKSkge1xyXG4gICAgICAgIGVkYWQtLTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWRhZCsxO1xyXG59XHJcblxyXG4vL2Z1bmNpb24gcGFyYSB2YWxpZGFyIGVtYWlsXHJcbmZ1bmN0aW9uIHZhbGlkYXJfZW1haWwoZW1haWw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgdmFyIHJlZ2V4ID0gL14oW2EtekEtWjAtOV9cXC5cXC1dKStcXEAoKFthLXpBLVowLTlcXC1dKStcXC4pKyhbYS16QS1aMC05XXsyLDR9KSskLztcclxuICAgIHJldHVybiByZWdleC50ZXN0KGVtYWlsKSA/IHRydWUgOiBmYWxzZTtcclxufVxyXG5cclxuLy9mb3JtYXRpYXIgZmVjaGEgcGFyYSBlZGl0YXJcclxuZnVuY3Rpb24gRm9ybWF0RGF0ZShfZmVjaGE6IHN0cmluZykge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZShfZmVjaGEuc3BsaXQoXCIvXCIpLnJldmVyc2UoKS5qb2luKFwiLVwiKSk7XHJcbiAgICB2YXIgZGQgPSBkLmdldERhdGUoKTtcclxuICAgIHZhciBtbSA9IGQuZ2V0TW9udGgoKSArIDE7XHJcbiAgICB2YXIgeXkgPSBkLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgaWYgKG1tIDwgMTApIG1tID0gMCArIG1tO1xyXG4gICAgaWYgKGRkIDwgMTApIGRkID0gMCArIGRkO1xyXG4gICAgdmFyIG5ld2RhdGUgPSB5eSArIFwiLVwiICsgbW0gKyBcIi1cIiArIGRkO1xyXG4gICAgcmV0dXJuIG5ld2RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvcm1hdERhdGVBdXRvQmluZGluZyhfZmVjaGE6IHN0cmluZykge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZShfZmVjaGEpO1xyXG4gICAgdmFyIGRkOiBudW1iZXIgPSBkLmdldERhdGUoKTtcclxuICAgIHZhciBtbTogbnVtYmVyID0gZC5nZXRNb250aCgpICsgMTtcclxuICAgIHZhciB5eTogbnVtYmVyID0gZC5nZXRGdWxsWWVhcigpO1xyXG4gICAgbGV0IG1tMjogc3RyaW5nO1xyXG4gICAgbGV0IGRkMjogc3RyaW5nO1xyXG5cclxuICAgIGlmIChtbSA8IDEwKSB7XHJcbiAgICAgICAgbW0yID0gXCIwXCIgKyBtbTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG1tMiA9IG1tLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRkIDwgMTApIHtcclxuICAgICAgICBkZDIgPSBcIjBcIiArIGRkO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZGQyID0gZGQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbmV3ZGF0ZSA9IHl5ICsgXCItXCIgKyBtbTIgKyBcIi1cIiArIGRkMjtcclxuICAgIHJldHVybiBuZXdkYXRlO1xyXG59XHJcblxyXG4vL0Z1bmNpb24gcGFyYSBtb3N0cmFyIG1vZGFsXHJcbi8vZnVuY3Rpb24gTGlzdGFEZXNwbGFnYWJsZShfZWxlbWVudCwgX21vZGFsKSB7XHJcblxyXG4vLyAgICB2YXIgcCA9ICQoX2VsZW1lbnQpO1xyXG4vLyAgICB2YXIgcG9zaXRpb24gPSBwLm9mZnNldCgpO1xyXG4vLyAgICB2YXIgbW9kYWwgPSBcIi5cIiArIF9tb2RhbDtcclxuLy8gICAgdmFyIGFuY2hvRG9jdW1lbnRvID0gJChkb2N1bWVudCkud2lkdGgoKTtcclxuLy8gICAgdmFyIGFsdG9Eb2N1bWVudG8gPSAkKGRvY3VtZW50KS5oZWlnaHQoKTtcclxuLy8gICAgdmFyIGFuY2hvTW9kYWwgPSAkKG1vZGFsKS53aWR0aCgpO1xyXG4vLyAgICB2YXIgYWx0b01vZGFsID0gJChtb2RhbCkuaGVpZ2h0KCk7XHJcblxyXG4vLyAgICBpZiAoYWx0b01vZGFsID09IDUwKSB7XHJcbi8vICAgICAgICBhbHRvTW9kYWwgPSAzMDA7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIHZhciBkaW1lbnNpb25Nb2RhbF9pbnB1dCA9IGFuY2hvTW9kYWwgKyBwb3NpdGlvbi5sZWZ0O1xyXG4vLyAgICB2YXIgYWx0b01vZGFsX2lucHV0ID0gYWx0b01vZGFsICsgcG9zaXRpb24udG9wO1xyXG4vLyAgICB2YXIgZGlmZXJlbmNpYURlcmVjaGE7XHJcbi8vICAgIHZhciBkaWZlcmVuY2lhQWJham87XHJcblxyXG4vLyAgICAvL3Bvc2ljaW9uIGhvcml6b250YWxcclxuLy8gICAgaWYgKGRpbWVuc2lvbk1vZGFsX2lucHV0ID4gYW5jaG9Eb2N1bWVudG8pIHtcclxuXHJcbi8vICAgICAgICBkaWZlcmVuY2lhRGVyZWNoYSA9IGFuY2hvRG9jdW1lbnRvIC0gKHAub3V0ZXJXaWR0aCgpICsgcG9zaXRpb24ubGVmdCk7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyByaWdodDogZGlmZXJlbmNpYURlcmVjaGEsIGxlZnQ6ICcnIH0pOyAvL3Bvc2l0aW9uLmxlZnR9KTtcclxuXHJcbi8vICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyBsZWZ0OiBwb3NpdGlvbi5sZWZ0LCByaWdodDogJycgfSk7XHJcbi8vICAgIH1cclxuLy8gICAgLy9wb3NpY2lvbiB2ZXJ0aWNhbCBcclxuLy8gICAgaWYgKGFsdG9Nb2RhbF9pbnB1dCA+IGFsdG9Eb2N1bWVudG8pIHtcclxuXHJcbi8vICAgICAgICBkaWZlcmVuY2lhQWJham8gPSBhbHRvRG9jdW1lbnRvIC0gKHAub3V0ZXJIZWlnaHQoKSArIHBvc2l0aW9uLnRvcCk7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyBib3R0b206IGRpZmVyZW5jaWFBYmFqbyArIDM1LCB0b3A6ICcnIH0pOyAvL3Bvc2l0aW9uLmxlZnR9KTtcclxuXHJcbi8vICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAkKG1vZGFsKS5jc3MoeyB0b3A6IHBvc2l0aW9uLnRvcCArIDM1LCBib3R0b206ICcnIH0pO1xyXG4vLyAgICB9XHJcblxyXG4vLyAgICAkKG1vZGFsKS5yZW1vdmVDbGFzcygnZW1wbGVhZG9Db2xsYXBzZScpO1xyXG4vL307XHJcblxyXG4vL2Z1bmNpb24gcGFyYSBlc3RpbG8gZGUgYWRqdW50YXIgYXJjaGl2b1xyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBDYXB0dXJhbW9zIGVsIGNsaWNrIGVuIGVsIDxhPlxyXG4gICAgLy8gcHJldmVuaW1vcyBlbCBjb21wb3J0YW1pZW50byBwb3IgZGVmZWN0b1xyXG4gICAgLy8geSByZXBsaWNhbW9zIGVsIGNsaWNrIGVuIHN1IGhlcm1hbm8gaW5wdXQuXHJcbiAgICAkKFwiLnRyaWdnZXItdXBsb2FkXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygnLmZvcm0tZmlsZScpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBDYXB0dXJhbW9zIGVsIGNsaWNrIGVuIGVsIDxhPlxyXG4gICAgLy8gcHJldmVuaW1vcyBlbCBjb21wb3J0YW1pZW50byBwb3IgZGVmZWN0b1xyXG4gICAgLy8geSByZXBsaWNhbW9zIGVsIGNsaWNrIGVuIHN1IGhlcm1hbm8gaW5wdXQuXHJcbiAgICAkKFwiLnRyaWdnZXItdXBsb2FkLWVtcFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5mb3JtLWZpbGUnKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJChcIi50cmlnZ2VyLXVwbG9hZC1kb2NcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuZm9ybS1maWxlLWRvYycpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIudHJpZ2dlci11cGxvYWRUd29cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuZm9ybS1maWxlVHdvJykudHJpZ2dlcihcImNsaWNrXCIpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLy9mdW5jaW9uIHBhcmEgcmVkaXJlY2Npb25hciBhbCBsb2dpblxyXG5mdW5jdGlvbiByZWRpcmVjY2lvbmFyYWxMb2dpbihyZXN1bHQ6IGFueSkge1xyXG4gICAgaWYgKHJlc3VsdC5zdGF0dXMgPT0gNDAwKSB7XHJcbiAgICAgICAgd2luZG93c19tZXNzYWdlKFwiU3Ugc2VzacOzbiBoYSBleHBpcmFkb1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0xvZ2luL0luZGV4XCI7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvRXJyb3IvSW5kZXhcIjsgICAgICAgIFxyXG4gICAgfVxyXG4gICBcclxuXHJcbn1cclxuXHJcbi8vQXV0b21hdGljQmluZGluZ1xyXG5mdW5jdGlvbiBBdXRvbWF0aWNCaW5kaW5nKG9iajogb2JqZWN0LCBzZWxlY3Q6IHN0cmluZywgcHJlT2JqOiBzdHJpbmcgPSBcIlwiKSB7XHJcblxyXG4gICAgbGV0IHByb3BlcnRpZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0KTtcclxuXHJcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHgpID0+IHtcclxuICAgICAgICBsZXQgc2VsZWN0QnlBdHRyOiBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoYCMke3ByZU9ian0ke3h9YCk7XHJcbiAgICAgICAgaWYgKHNlbGVjdEJ5QXR0ci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RCeUF0dHJbMF0udHlwZSA9PSBcImNoZWNrYm94XCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS5jaGVja2VkID0gb2JqW3hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNlbGVjdEJ5QXR0clswXS50eXBlID09IFwic2VsZWN0LW9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RCeUF0dHJbMF0udmFsdWUgPSBvYmpbeF07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0QnlBdHRyWzBdLnR5cGUgPT0gXCJkYXRlXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS52YWx1ZSA9IEZvcm1hdERhdGVBdXRvQmluZGluZyhvYmpbeF0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoc2VsZWN0QnlBdHRyWzBdLnR5cGUgPT0gXCJ0aW1lXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpbeF0gIT0gbnVsbCAmJiBvYmpbeF0uVG90YWxNaWxsaXNlY29uZHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEJ5QXR0clswXS52YWx1ZSA9IEZvcm1hdEhvdXJzKG9ialt4XS5Ub3RhbE1pbGxpc2Vjb25kcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RCeUF0dHJbMF0udmFsdWUgPSBvYmpbeF07XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvcm1hdEhvdXJzKGhvcmEpIHtcclxuICAgIC8vbGV0IGRhdG8gPSBuZXcgRGF0ZShob3JhKS50b0lTT1N0cmluZygpLnN1YnN0cigxNCwgOCk7XHJcbiAgICBsZXQgZGF0byA9IG5ldyBEYXRlKGhvcmEpLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDExLCA4KTtcclxuICAgIHJldHVybiBkYXRvO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIE5ld0Zvcm1hRGF0ZShfZmVjaGE6IHN0cmluZywgX2lzVG9kYXk6Ym9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJcIikge1xyXG4gICAgICAgIGNvbmZpZ3VyYWNpb25OdW1lcm9zID0gXCJlbi1VU1wiO1xyXG4gICAgfVxyXG4gICAgbGV0IGQ6IERhdGU7XHJcbiAgICBpZiAoIV9pc1RvZGF5KSB7XHJcbiAgICAgICAgdmFyIG5ld0RhdGVBcnJheTogQXJyYXk8c3RyaW5nPiA9IF9mZWNoYS5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgdmFyIG5ld0RhdGU6IHN0cmluZztcclxuICAgICAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJlbi1VU1wiKSB7XHJcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXdEYXRlQXJyYXlbMl0gKyBcIi1cIiArIG5ld0RhdGVBcnJheVswXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0RhdGUgPSBuZXdEYXRlQXJyYXlbMl0gKyBcIi1cIiArIG5ld0RhdGVBcnJheVsxXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzBdO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy92YXIgbmV3RGF0ZTAxOiBzdHJpbmcgPSBfZmVjaGEuc3BsaXQoXCIvXCIpLnJldmVyc2UoKS5qb2luKFwiLVwiKTtcclxuICAgICAgICAvL2lmIChfZmVjaGEuaW5kZXhPZihcIlRcIikgPT0gLTEpIHtcclxuICAgICAgICAvLyAgICBuZXdEYXRlID0gbmV3RGF0ZSArIFwiVDAwOjAwOjAwXCI7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgZCA9IG5ldyBEYXRlKG5ld0RhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkID0gbmV3IERhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGQ6IG51bWJlciA9IGQuZ2V0RGF0ZSgpO1xyXG4gICAgdmFyIG1tOiBudW1iZXIgPSBkLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgdmFyIHl5OiBudW1iZXIgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBsZXQgbW0yOiBzdHJpbmc7XHJcbiAgICBsZXQgZGQyOiBzdHJpbmc7XHJcblxyXG4gICAgaWYgKG1tIDwgMTApIHtcclxuICAgICAgICBtbTIgPSBcIjBcIiArIG1tO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbW0yID0gbW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGQgPCAxMCkge1xyXG4gICAgICAgIGRkMiA9IFwiMFwiICsgZGQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkZDIgPSBkZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBuZXdkYXRlID0geXkgKyBcIi1cIiArIG1tMiArIFwiLVwiICsgZGQyO1xyXG4gICAgcmV0dXJuIG5ld2RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEZvcm10RmVjaGFUaXBvQ2FsZW5kYXJpbyhfZmVjaGEpIHtcclxuICAgIHZhciBkZDogbnVtYmVyO1xyXG4gICAgdmFyIG1tOiBudW1iZXI7XHJcbiAgICBsZXQgbW0yOiBzdHJpbmc7XHJcbiAgICBsZXQgZGQyOiBzdHJpbmc7XHJcbiAgICB2YXIgbmV3RGF0ZUFycmF5OiBBcnJheTxzdHJpbmc+ID0gX2ZlY2hhLnNwbGl0KFwiL1wiKTtcclxuICAgIHZhciBuZXdEYXRlOiBzdHJpbmc7XHJcbiAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJlbi1VU1wiKSB7XHJcbiAgICAgICAgZGQgPSBwYXJzZUludChuZXdEYXRlQXJyYXlbMV0pO1xyXG4gICAgICAgIG1tID0gcGFyc2VJbnQobmV3RGF0ZUFycmF5WzBdKTtcclxuICAgICAgICBpZiAobW0gPCAxMCkge1xyXG4gICAgICAgICAgICBtbTIgPSBcIjBcIiArIG1tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbW0yID0gbW0udG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkZCA8IDEwKSB7XHJcbiAgICAgICAgICAgIGRkMiA9IFwiMFwiICsgZGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkZDIgPSBkZC50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3RGF0ZSA9IG5ld0RhdGVBcnJheVsyXSArIFwiLVwiICsgbW0yICsgXCItXCIgKyBkZDIgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbmV3RGF0ZSA9IG5ld0RhdGVBcnJheVsyXSArIFwiLVwiICsgbmV3RGF0ZUFycmF5WzFdICsgXCItXCIgKyBuZXdEYXRlQXJyYXlbMF07XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4vL0xpc3RhIGRlIGRlcGFydGFtZW50b3NcclxuZnVuY3Rpb24gTGlzdERlcGFybWVudChfb3B0aW9uOiBzdHJpbmcgPSBcIiNEZXBhcnRtZW50SWRcIikge1xyXG4gICAgaWYgKCQoX29wdGlvbilbMF0uY2hpbGRyZW4ubGVuZ3RoID09IDApIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL3B1ZXN0b3NhY3Rpdm9zL0J1c2NhcmRlcGFydGFtZW50b3NcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHZXRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoX29wdGlvbikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBBZ3JlZ2FyIG9wY2nDs24gdmFjw61hIGFsIGluaWNpb1xyXG4gICAgICAgICAgICAgICAgdmFyIGVtcHR5T3B0aW9uID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XHJcbiAgICAgICAgICAgICAgICBlbXB0eU9wdGlvbi50ZXh0KCctLSBTZWxlY2Npb25lIC0tJyk7XHJcbiAgICAgICAgICAgICAgICBlbXB0eU9wdGlvbi52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgJChfb3B0aW9uKS5hcHBlbmQoZW1wdHlPcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLkRlcGFydG1lbnRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoX29wdGlvbikuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy9MaXN0YSBkZSBjYXJnb3NcclxuZnVuY3Rpb24gTGlzdEpvYnMoKSB7XHJcbiAgICBpZiAoJChcIiNKb2JJZFwiKVswXS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvcHVlc3Rvc2FjdGl2b3MvQnVzY2FyQ2FyZ29zXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR2V0XCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICQoXCIjSm9iSWRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBBZ3JlZ2FyIG9wY2nDs24gdmFjw61hIGFsIGluaWNpb1xyXG4gICAgICAgICAgICAgICAgdmFyIGVtcHR5T3B0aW9uID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XHJcbiAgICAgICAgICAgICAgICBlbXB0eU9wdGlvbi50ZXh0KCctLSBTZWxlY2Npb25lIC0tJyk7XHJcbiAgICAgICAgICAgICAgICBlbXB0eU9wdGlvbi52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNKb2JJZFwiKS5hcHBlbmQoZW1wdHlPcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLkpvYklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNKb2JJZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vL0xpc3RhIGRlIHB1ZXN0b3NcclxuZnVuY3Rpb24gTGlzdFBvc2l0aW9uKCkge1xyXG4gICAgaWYgKCQoXCIjTm90aWZ5UG9zaXRpb25JZFwiKVswXS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvdmFjYW50ZXMvQnVzY2FyUHVlc3Rvc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiI05vdGlmeVBvc2l0aW9uSWRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBBZ3JlZ2FyIG9wY2nDs24gdmFjw61hIGFsIGluaWNpb1xyXG4gICAgICAgICAgICAgICAgdmFyIGVtcHR5T3B0aW9uID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XHJcbiAgICAgICAgICAgICAgICBlbXB0eU9wdGlvbi50ZXh0KCctLSBTZWxlY2Npb25lIC0tJyk7XHJcbiAgICAgICAgICAgICAgICBlbXB0eU9wdGlvbi52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNOb3RpZnlQb3NpdGlvbklkXCIpLmFwcGVuZChlbXB0eU9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkYXRhKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCh0aGlzLlBvc2l0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWwodGhpcy5Qb3NpdGlvbklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNOb3RpZnlQb3NpdGlvbklkXCIpLmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vTGlzdGEgZGUgcGFpc2VzXHJcbmZ1bmN0aW9uIExpc3RDb3VudHJpZXMoQ2FtcG86c3RyaW5nKSB7XHJcbiAgICBpZiAoJChDYW1wbylbMF0uY2hpbGRyZW4ubGVuZ3RoID09IDApIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL2RpcmVjY2lvbmVtcGxlYWRvcy9wYWlzZXNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChDYW1wbykuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChkYXRhKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCh0aGlzLk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKHRoaXMuQ291bnRyeUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChDYW1wbykuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBmb3JtYXROdW1iZXJHcmFmKHZhbHVlOm51bWJlcikge1xyXG4gICAgcmV0dXJuIHZhbHVlLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIiwgeyBzdHlsZTogXCJjdXJyZW5jeVwiLCBjdXJyZW5jeTogXCJVU0RcIiB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIEZvcm1hdEVycm9ycyhkYXRhKSB7XHJcbiAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgIH0pO1xyXG4gICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSk7XHJcbn1cclxuXHJcbi8vZnVuY3Rpb24gU2ltYm9sb0RlY2ltYWwoX2Zvcm1hdG8pIHtcclxuLy8gICAgdmFyIHNpbWJvbG9fZGVjaW1hbCA9IDEuMTtcclxuLy8gICAgcmV0dXJuIHNpbWJvbG9fZGVjaW1hbC50b0xvY2FsZVN0cmluZyhfZm9ybWF0bykuc3Vic3RyaW5nKDIsIDEpO1xyXG4vL31cclxuXHJcbi8vZm9ybWF0byBudW1lcmljbyBwYXJhIGNhbGN1bGFyXHJcbi8vZnVuY3Rpb24gRm9ybWF0b051bWVyaWNvc19DYWxjdWxhcihfbnVtZXJvKSB7XHJcblxyXG4vLyAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJcIikge1xyXG4vLyAgICAgICAgY29uZmlndXJhY2lvbk51bWVyb3MgPSBcImVuLVVTXCI7XHJcbi8vICAgIH1cclxuXHJcbi8vICAgIGlmIChTaW1ib2xvRGVjaW1hbChjb25maWd1cmFjaW9uTnVtZXJvcykgPT0gJy4nKSB7XHJcbi8vICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC8sL2csIFwiXCIpO1xyXG4vLyAgICB9XHJcbi8vICAgIGVsc2Uge1xyXG4vLyAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xyXG4vLyAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvLC9nLCBcIi5cIik7XHJcbi8vICAgIH1cclxuLy8gICAgdmFyIGZvcm1hbnVtZXJvID0gcGFyc2VGbG9hdChfbnVtZXJvKTtcclxuLy8gICAgaWYgKGlzTmFOKGZvcm1hbnVtZXJvKSkge1xyXG4vLyAgICAgICAgZm9ybWFudW1lcm8gPSAwO1xyXG4vLyAgICB9XHJcbi8vICAgIHJldHVybiBwYXJzZUZsb2F0KGZvcm1hbnVtZXJvLnRvRml4ZWQoMikpO1xyXG4vL31cclxuXHJcbi8vZnVuY3Rpb24gRm9ybWF0b051bWVyaWNvc19Nb3N0cmFyKF9udW1lcm8pIHtcclxuICBcclxuLy8gICAgaWYgKGNvbmZpZ3VyYWNpb25OdW1lcm9zID09IFwiXCIpIHtcclxuLy8gICAgICAgIGNvbmZpZ3VyYWNpb25OdW1lcm9zID0gXCJlbi1VU1wiO1xyXG4vLyAgICB9XHJcblxyXG4vLyAgICBpZiAoU2ltYm9sb0RlY2ltYWwoY29uZmlndXJhY2lvbk51bWVyb3MpID09ICcuJykge1xyXG4vLyAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvLC9nLCBcIlwiKTtcclxuLy8gICAgfVxyXG4vLyAgICBlbHNlIHtcclxuLy8gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuLy8gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCIuXCIpO1xyXG4vLyAgICB9XHJcbi8vICAgIHZhciBmb3JtYW51bWVybyA9IHBhcnNlRmxvYXQoX251bWVybyk7XHJcbi8vICAgIGlmIChpc05hTihmb3JtYW51bWVybykpIHtcclxuLy8gICAgICAgIGZvcm1hbnVtZXJvID0gMDtcclxuLy8gICAgfVxyXG5cclxuLy8gICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChjb25maWd1cmFjaW9uTnVtZXJvcykuZm9ybWF0KGZvcm1hbnVtZXJvKTtcclxuLy99XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIEZvcm1hdG9OdW1lcmljb3NfTW9zdHJhcihfbnVtZXJvOiBzdHJpbmcsIF9tb2RpZmllZEZvcm1hdDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcblxyXG4gICAgLy9TZWNjacOzbiBkaXNlw7FhZGEgcGFyYSBjb3JyZWdpciBsb3MgZm9ybWF0b3MgYWwgcmVhbGl6YXIgb3BlcmFjaW9uZXMgY29uIG7Dum1lcm9zXHJcbiAgICBpZiAoU2ltYm9sb0RlY2ltYWwoY29uZmlndXJhY2lvbk51bWVyb3MpICE9ICcuJyAmJiBfbW9kaWZpZWRGb3JtYXQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoL1xcLi9nLCBcIixcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbmZpZ3VyYWNpb25OdW1lcm9zID09IFwiXCIpIHtcclxuICAgICAgICBjb25maWd1cmFjaW9uTnVtZXJvcyA9IFwiZW4tVVNcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoU2ltYm9sb0RlY2ltYWwoY29uZmlndXJhY2lvbk51bWVyb3MpID09ICcuJykge1xyXG4gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoLywvZywgXCJcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC9cXC4vZywgXCJcIik7XHJcbiAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvLC9nLCBcIi5cIik7XHJcbiAgICB9XHJcbiAgICB2YXIgZm9ybWFudW1lcm8gPSBwYXJzZUZsb2F0KF9udW1lcm8pO1xyXG5cclxuICAgIGlmIChpc05hTihmb3JtYW51bWVybykpIHtcclxuICAgICAgICBmb3JtYW51bWVybyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChjb25maWd1cmFjaW9uTnVtZXJvcykuZm9ybWF0KHBhcnNlRmxvYXQoZm9ybWFudW1lcm8udG9GaXhlZCgyKSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBTaW1ib2xvRGVjaW1hbChfZm9ybWF0bykge1xyXG4gICAgdmFyIHNpbWJvbG9fZGVjaW1hbCA9IDEuMTtcclxuICAgIHJldHVybiBzaW1ib2xvX2RlY2ltYWwudG9Mb2NhbGVTdHJpbmcoX2Zvcm1hdG8pLnN1YnN0cmluZygyLCAxKTtcclxufVxyXG5cclxuLy9mb3JtYXRvIG51bWVyaWNvIHBhcmEgY2FsY3VsYXJcclxuZnVuY3Rpb24gRm9ybWF0b051bWVyaWNvc19DYWxjdWxhcihfbnVtZXJvOiBzdHJpbmcpIHtcclxuXHJcbiAgICBpZiAoY29uZmlndXJhY2lvbk51bWVyb3MgPT0gXCJcIikge1xyXG4gICAgICAgIGNvbmZpZ3VyYWNpb25OdW1lcm9zID0gXCJlbi1VU1wiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChTaW1ib2xvRGVjaW1hbChjb25maWd1cmFjaW9uTnVtZXJvcykgPT0gJy4nKSB7XHJcbiAgICAgICAgX251bWVybyA9IF9udW1lcm8ucmVwbGFjZSgvLC9nLCBcIlwiKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIF9udW1lcm8gPSBfbnVtZXJvLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuICAgICAgICBfbnVtZXJvID0gX251bWVyby5yZXBsYWNlKC8sL2csIFwiLlwiKTtcclxuICAgIH1cclxuICAgIHZhciBmb3JtYW51bWVybyA9IHBhcnNlRmxvYXQoX251bWVybyk7XHJcbiAgICBpZiAoaXNOYU4oZm9ybWFudW1lcm8pKSB7XHJcbiAgICAgICAgZm9ybWFudW1lcm8gPSAwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoZm9ybWFudW1lcm8udG9GaXhlZCgyKSk7XHJcbn1cclxuXHJcblxyXG4vL3BsdWdpbiBwYXJhIGVsIGZvcm1hdG8gIG51bcOpcmljb1xyXG5mdW5jdGlvbiBVc2VQbHVnaW5OdW1iZXJGb3JtYXQoZm9ybTpzdHJpbmcpIHtcclxuICAgICQoXCIucGx1Z2luLW51bWJlci1mb3JtYXRcIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcyBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgIGxldCBudW06IHN0cmluZyA9IHRoYXQudmFsdWU7XHJcblxyXG4gICAgICAgICQodGhhdCkudmFsKEZvcm1hdG9OdW1lcmljb3NfTW9zdHJhcihudW0pKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoYCR7Zm9ybX0gLnBsdWdpbi1udW1iZXItZm9ybWF0YCkuZWFjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcyBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgIGxldCBudW06IHN0cmluZyA9IHRoYXQudmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChjb25maWd1cmFjaW9uTnVtZXJvcyA9PSBcImVuLVVTXCIpIHtcclxuICAgICAgICAgICAgbnVtID0gbnVtLnJlcGxhY2UoXCIsXCIsIFwiLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG51bSA9IG51bS5yZXBsYWNlKFwiLlwiLCBcIixcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKHRoYXQpLnZhbChGb3JtYXRvTnVtZXJpY29zX01vc3RyYXIobnVtKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy90ciBsb2FkZXJcclxuZnVuY3Rpb24gQWRkVHJMb2FkZXIoZWxlbWVudCkge1xyXG4gICAgJChlbGVtZW50KS5wcmVwZW5kKCc8dHIgY2xhc3M9XCJ0ci1sb2FkZXJcIj48dGQgY29sc3Bhbj1cIjFcIj4gPC90ZD48dGQgY29sc3Bhbj1cIjFcIj4gJ1xyXG4gICAgICAgICsnPGRpdj48L2Rpdj48L3RkPjx0ZCBjb2xzcGFuPVwiNFwiID48ZGl2PjwvZGl2PjwvdGQgPjx0ZCBjb2xzcGFuPVwiMlwiID48ZGl2PjwvZGl2PjwvdGQgPiA8dGQgY29sc3Bhbj1cIjNcIj48ZGl2PjwvZGl2PjwvdGQ+IDx0ZCBjb2xzcGFuPVwiNVwiID48ZGl2PjwvZGl2PjwvdGQ+PC90cj4nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gRGF0YWZpbHRlcihfdGJvZHl0YWJsZTogc3RyaW5nLCBfdXJsOiBzdHJpbmcsIF90eXBlRW1wbG95ZTogc3RyaW5nID0gXCJcIiwgX25hbWVmaWx0cmUgPSBcIi5vcHRpb25GaWx0ZXJcIiwgX3ZhbHVlc0ZpbHRlciA9ICcudGV4dEZpbHRlcicpIHtcclxuICAgIEFkZFRyTG9hZGVyKCQoX3Rib2R5dGFibGUpKTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogX3VybCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIFByb3BlcnR5TmFtZTogJChfbmFtZWZpbHRyZSkudmFsKCkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgUHJvcGVydHlWYWx1ZTogJChfdmFsdWVzRmlsdGVyKS52YWwoKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICB0eXBlOiBfdHlwZUVtcGxveWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgJChfdGJvZHl0YWJsZSkuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICQoX3Rib2R5dGFibGUpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBEYXRhZmlsdGVyTW9kYWxzKF90Ym9keXRhYmxlOiBzdHJpbmcsIF91cmw6IHN0cmluZywgX2VtcGxveWVlaWQ6IHN0cmluZywgX25hbWVmaWx0cmUgPSBcIi5vcHRpb25GaWx0ZXJNb2RhbFwiLCBfdmFsdWVzRmlsdGVyID0gJy50ZXh0RmlsdGVyTW9kYWwnKSB7XHJcbiAgICBBZGRUckxvYWRlcigkKF90Ym9keXRhYmxlKSk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IF91cmwsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBQcm9wZXJ0eU5hbWU6ICQoX25hbWVmaWx0cmUpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIFByb3BlcnR5VmFsdWU6ICQoX3ZhbHVlc0ZpbHRlcikudmFsKCkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgZW1wbG95ZWVpZDogX2VtcGxveWVlaWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgJChfdGJvZHl0YWJsZSkuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICQoX3Rib2R5dGFibGUpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtb3JlZGF0YShfbWF4c2Nyb2xsOiBudW1iZXIsIF9jb250cm9sbGVyOiBzdHJpbmcsIF90Ym9keTogc3RyaW5nLCBfdHlwZTogc3RyaW5nID0gXCJcIiwgX2lzVmVyc2lvbjpib29sZWFuID0gZmFsc2UsX2lkOnN0cmluZz1cIlwiKSB7XHJcbiAgICBwYWdlKys7XHJcbiAgICBpc0J1c3kgPSB0cnVlO1xyXG4gICAgaWYgKCFpc2VtcHR5KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgLyR7X2NvbnRyb2xsZXJ9L0ZpbHRlck9yTW9yZURhdGFgLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBfUGFnZU51bWJlcjogcGFnZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IF90eXBlLFxyXG4gICAgICAgICAgICAgICAgSXNWZXJzaW9uOiBfaXNWZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgSWQ6IF9pZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IFwiXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChfdGJvZHkpLmNoaWxkcmVuKCkubGFzdCgpLmFmdGVyKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjY29udGVudC1zY3JvbGxcIikuc2Nyb2xsVG9wKF9tYXhzY3JvbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ8OzZGlnbyBwYXJhIG1vc3RyYXIgbGEgYXl1ZGFcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmlkLWJhdGNoLWluZm9cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aGF0ID0gJCh0aGlzKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd2hlbHAodGhhdCwgXCIvaGlzdG9yaWFsbG90ZXMvSW5mb1Byb2Nlc3NcIiwgXCIuY29udC1iYXRjaC1pbmZvXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5jYXJkLWhlbHAgPiBwXCIpLmh0bWwoc3BsaXRNZXNzYWdlKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmRhdGEtaW5mby1iYXRjaCcpLmh0bWwoKS50cmltKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzZW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEZ1bmNpb24gcGFyYSBoYWJpbGl0YXIgZG9ibGUgY2xpYyBlbiBmaWxhcyBkZSB0YWJsYXMgTGlzdFBhZ2VcclxuLy8gVXNvIGNvbiBwYXJhbWV0cm86IGVuYWJsZVJvd0RvdWJsZUNsaWNrKCcudGJvZHktVGFibGUtRGVwYXJ0bWVudCcsICcuRGVwYXJ0bWVudElkdGJsJywgJy9kZXBhcnRhbWVudG9zYWN0aXZvcy9nZXRieWlkJywgY2FsbGJhY2ssICdJZCcpXHJcbi8vIFVzbyBjb24gVVJMOiBlbmFibGVSb3dEb3VibGVDbGljaygnLnRib2R5LVRhYmxlLVgnLCAnLlhJZHRibCcsICcvZW5kcG9pbnQve2lkfScsIGNhbGxiYWNrKSAtIHtpZH0gc2UgcmVlbXBsYXphIGNvbiBlbCB2YWxvclxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmZ1bmN0aW9uIGVuYWJsZVJvd0RvdWJsZUNsaWNrKFxyXG4gICAgdGJvZHlTZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgaWRDZWxsU2VsZWN0b3I6IHN0cmluZyxcclxuICAgIGFqYXhVcmw6IHN0cmluZyxcclxuICAgIG9uU3VjY2Vzc0NhbGxiYWNrOiAoZGF0YTogYW55KSA9PiB2b2lkLFxyXG4gICAgaWRQYXJhbU5hbWU6IHN0cmluZyA9IFwiSWRcIlxyXG4pIHtcclxuICAgIC8vIERlbGVnYWNpb24gZGUgZXZlbnRvcyBwYXJhIGZpbGFzIGRpbmFtaWNhc1xyXG4gICAgJChkb2N1bWVudCkub24oJ2RibGNsaWNrJywgYCR7dGJvZHlTZWxlY3Rvcn0gLnJvdy1hcHBgLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIC8vIEV2aXRhciBxdWUgZWwgZG9ibGUgY2xpYyBlbiBjaGVja2JveCBkaXNwYXJlIGxhIGVkaWNpb25cclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXMoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpIHx8ICQoZS50YXJnZXQpLmlzKCdsYWJlbCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE9idGVuZXIgZWwgSUQgZGVsIHJlZ2lzdHJvIGRlc2RlIGxhIGNlbGRhIGVzcGVjaWZpY2FkYVxyXG4gICAgICAgIGNvbnN0IHJvd0lkID0gJCh0aGlzKS5maW5kKGlkQ2VsbFNlbGVjdG9yKS50ZXh0KCkudHJpbSgpO1xyXG5cclxuICAgICAgICBpZiAoIXJvd0lkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignTm8gc2UgcHVkbyBvYnRlbmVyIGVsIElEIGRlbCByZWdpc3RybycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNb3N0cmFyIGluZGljYWRvciBkZSBjYXJnYVxyXG4gICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluYXIgc2kgbGEgVVJMIHVzYSBwbGFjZWhvbGRlciB7aWR9IG8gcGFyYW1ldHJvXHJcbiAgICAgICAgbGV0IGZpbmFsVXJsID0gYWpheFVybDtcclxuICAgICAgICBsZXQgYWpheERhdGE6IGFueSA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoYWpheFVybC5pbmNsdWRlcygne2lkfScpKSB7XHJcbiAgICAgICAgICAgIC8vIFVSTCBjb24gSUQgZW4gbGEgcnV0YTogL2VuZHBvaW50L3tpZH0gLT4gL2VuZHBvaW50LzEyM1xyXG4gICAgICAgICAgICBmaW5hbFVybCA9IGFqYXhVcmwucmVwbGFjZSgne2lkfScsIHJvd0lkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlkUGFyYW1OYW1lKSB7XHJcbiAgICAgICAgICAgIC8vIFVSTCBjb24gcGFyYW1ldHJvOiAvZW5kcG9pbnQ/SWQ9MTIzXHJcbiAgICAgICAgICAgIGFqYXhEYXRhW2lkUGFyYW1OYW1lXSA9IHJvd0lkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTGxhbWFyIGFsIGVuZHBvaW50IHBhcmEgb2J0ZW5lciBsb3MgZGF0b3NcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGZpbmFsVXJsLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBhamF4RGF0YSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzQ2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIk5vIHNlIGVuY29udHJvIGVsIHJlZ2lzdHJvXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWdyZWdhciBjbGFzZSBwYXJhIGluZGljYXIgcXVlIGxhcyBmaWxhcyBzb24gY2xpY2tlYWJsZXNcclxuICAgICQoYCR7dGJvZHlTZWxlY3Rvcn0gLnJvdy1hcHBgKS5hZGRDbGFzcygncm93LWNsaWNrYWJsZScpO1xyXG5cclxuICAgIC8vIE9ic2VydmFyIGNhbWJpb3MgZW4gZWwgRE9NIHBhcmEgYXBsaWNhciBjbGFzZSBhIG51ZXZhcyBmaWxhc1xyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcbiAgICAgICAgJChgJHt0Ym9keVNlbGVjdG9yfSAucm93LWFwcGApLm5vdCgnLnJvdy1jbGlja2FibGUnKS5hZGRDbGFzcygncm93LWNsaWNrYWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGJvZHlTZWxlY3Rvcik7XHJcbiAgICBpZiAodGFyZ2V0Tm9kZSkge1xyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0Tm9kZSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRnVuY2nDs24gcGFyYSBmaWx0cmFyIGNhdGVnb3LDrWFzIGRlIHByb3llY3RvIHBvciBwcm95ZWN0byBzZWxlY2Npb25hZG9cclxuLy8gU2UgdXNhIGVuIGZvcm11bGFyaW9zIHF1ZSB0aWVuZW4gZHJvcGRvd25zIGRlIFByb3llY3RvIHkgQ2F0ZWdvcsOtYSBkZSBQcm95ZWN0b1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmZ1bmN0aW9uIGZpbHRlclByb2pDYXRlZ29yeUJ5UHJvamVjdChwcm9qZWN0U2VsZWN0b3I6IHN0cmluZyA9ICcjUHJvaklkJywgY2F0ZWdvcnlTZWxlY3Rvcjogc3RyaW5nID0gJyNQcm9qQ2F0ZWdvcnknKSB7XHJcbiAgICAvLyBHdWFyZGFyIGVsIHZhbG9yIGFjdHVhbCBkZSBjYXRlZ29yw61hIChwYXJhIG1vZG8gZWRpY2nDs24pXHJcbiAgICBsZXQgY3VycmVudENhdGVnb3J5VmFsdWUgPSAkKGNhdGVnb3J5U2VsZWN0b3IpLnZhbCgpIGFzIHN0cmluZztcclxuXHJcbiAgICAvLyBFc2N1Y2hhciBjYW1iaW9zIGVuIGVsIGRyb3Bkb3duIGRlIHByb3llY3RvXHJcbiAgICAkKHByb2plY3RTZWxlY3Rvcikub2ZmKCdjaGFuZ2UucHJvakNhdGVnb3J5RmlsdGVyJykub24oJ2NoYW5nZS5wcm9qQ2F0ZWdvcnlGaWx0ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHByb2pJZCA9ICQodGhpcykudmFsKCkgYXMgc3RyaW5nO1xyXG4gICAgICAgIGxldCBjYXRlZ29yeURyb3Bkb3duID0gJChjYXRlZ29yeVNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgLy8gTGltcGlhciBjYXRlZ29yw61hcyBhY3R1YWxlcyB5IGFncmVnYXIgb3BjacOzbiBwb3IgZGVmZWN0b1xyXG4gICAgICAgIGNhdGVnb3J5RHJvcGRvd24uaHRtbCgnPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjY2lvbmUuLi48L29wdGlvbj4nKTtcclxuXHJcbiAgICAgICAgaWYgKHByb2pJZCAmJiBwcm9qSWQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIC8vIE9idGVuZXIgY2F0ZWdvcsOtYXMgZmlsdHJhZGFzIHBvciBwcm95ZWN0b1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBgL2NhdGVnb3JpYXByb3llY3RvYWN0aXZhcy9ieXByb2plY3QvJHtwcm9qSWR9YCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBhbnlbXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGNhdGVnb3J5OiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSAkKCc8b3B0aW9uPjwvb3B0aW9uPicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWwgZnJvbnRlbmQgdXNhIFBhc2NhbENhc2UgKFByb3BlcnR5TmFtaW5nUG9saWN5ID0gbnVsbCBlbiBTdGFydHVwLmNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbChjYXRlZ29yeS5Qcm9qQ2F0ZWdvcnlJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dChjYXRlZ29yeS5DYXRlZ29yeU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlEcm9wZG93bi5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFsIGNhcmdhciBjYXRlZ29yw61hcyBkZSBwcm95ZWN0b1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2kgaGF5IHVuIHByb3llY3RvIHByZXNlbGVjY2lvbmFkbyAobW9kbyBlZGljacOzbiksIGNhcmdhciBzdXMgY2F0ZWdvcsOtYXNcclxuICAgIGxldCBpbml0aWFsUHJvaklkID0gJChwcm9qZWN0U2VsZWN0b3IpLnZhbCgpIGFzIHN0cmluZztcclxuICAgIGlmIChpbml0aWFsUHJvaklkICYmIGluaXRpYWxQcm9qSWQgIT09ICcnKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgL2NhdGVnb3JpYXByb3llY3RvYWN0aXZhcy9ieXByb2plY3QvJHtpbml0aWFsUHJvaklkfWAsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogYW55W10pIHtcclxuICAgICAgICAgICAgICAgIGxldCBjYXRlZ29yeURyb3Bkb3duID0gJChjYXRlZ29yeVNlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5RHJvcGRvd24uaHRtbCgnPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjY2lvbmUuLi48L29wdGlvbj4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGNhdGVnb3J5OiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9ICQoJzxvcHRpb24+PC9vcHRpb24+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVsIGZyb250ZW5kIHVzYSBQYXNjYWxDYXNlIChQcm9wZXJ0eU5hbWluZ1BvbGljeSA9IG51bGwgZW4gU3RhcnR1cC5jcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbChjYXRlZ29yeS5Qcm9qQ2F0ZWdvcnlJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0KGNhdGVnb3J5LkNhdGVnb3J5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5RHJvcGRvd24uYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc3RhdXJhciBlbCB2YWxvciBzZWxlY2Npb25hZG8gcHJldmlhbWVudGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudENhdGVnb3J5VmFsdWUgJiYgY3VycmVudENhdGVnb3J5VmFsdWUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5RHJvcGRvd24udmFsKGN1cnJlbnRDYXRlZ29yeVZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgY2FyZ2FyIGNhdGVnb3LDrWFzIGRlIHByb3llY3RvXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEV4cG9uZXIgZnVuY2lvbmVzIG5lY2VzYXJpYXMgcGFyYSBtw7NkdWxvcyBFUzYgZW4gZWwgb2JqZXRvIHdpbmRvd1xyXG4od2luZG93IGFzIGFueSkuZmlsdGVyUHJvakNhdGVnb3J5QnlQcm9qZWN0ID0gZmlsdGVyUHJvakNhdGVnb3J5QnlQcm9qZWN0O1xyXG5cclxuIl19