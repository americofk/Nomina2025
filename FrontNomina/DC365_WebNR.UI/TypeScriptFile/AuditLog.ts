/**
 * @file AuditLog.ts
 * @description Módulo de gestión de registros de auditoría ISO 27001.
 *              Solo permite visualización de cambios en entidades del sistema.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Auditoria
 */

// Interface para el registro de auditoría
interface IAuditLog {
    recId: number;
    dataAreaId: string;
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
    entityName: string;
    fieldName: string;
    oldValue: string;
    newValue: string;
    changedBy: string;
    changedAt: string;
    entityRefRecId: number;
}

// Seleccionar/deseleccionar todos los checkboxes
$(document).on('change', '#selectAllAuditLog', function () {
    var isChecked = $(this).is(':checked');
    $('.selectAuditLog').prop('checked', isChecked);
});

// Ver detalles del registro seleccionado
$(document).on('click', '.ViewAuditLogDetails', function () {
    showAuditLogDetails();
});

// Función para mostrar detalles de auditoría
function showAuditLogDetails() {
    var recId: number = 0;
    var contador = 0;

    $(".selectAuditLog[type=checkbox]").each(function () {
        if ($(this).is(":checked")) {
            contador++;
            recId = parseInt($(this).parent().parent().find(".AuditLogRecIdtbl").html().trim());
        }
    });

    if (contador === 0) {
        windows_message("Debe seleccionar un registro para ver los detalles", "error");
        return;
    }

    if (contador > 1) {
        windows_message("Debe seleccionar solo un registro", "info");
        return;
    }

    // Obtener los datos del registro
    $.ajax({
        url: "/auditoria/getbyid",
        type: "GET",
        data: { RecId: recId },
        async: true,
        success: function (data: IAuditLog) {
            if (data != null) {
                populateAuditLogModal(data);
                $('.modal-AuditLogDetails').modal('show');
            } else {
                windows_message("Error obteniendo datos del registro", "error");
            }
        },
        error: function (xhr) {
            redireccionaralLogin(xhr);
        }
    });
}

// Llenar el modal con los datos
function populateAuditLogModal(data: any) {
    // Soportar tanto camelCase como PascalCase
    $('#audit-detail-recid').val((data.recId || data.RecId)?.toString() || '');
    $('#audit-detail-dataareaid').val(data.dataAreaId || data.DataAreaId || '');
    $('#audit-detail-entityname').val(data.entityName || data.EntityName || '');
    $('#audit-detail-fieldname').val(data.fieldName || data.FieldName || '');
    $('#audit-detail-changedby').val(data.changedBy || data.ChangedBy || '');
    $('#audit-detail-changedat').val(formatDateTime(data.changedAt || data.ChangedAt));
    $('#audit-detail-entityrefrecid').val((data.entityRefRecId || data.EntityRefRecId)?.toString() || '');
    $('#audit-detail-oldvalue').val(data.oldValue || data.OldValue || '');
    $('#audit-detail-newvalue').val(data.newValue || data.NewValue || '');
}

// Formatear fecha y hora
function formatDateTime(dateString: string): string {
    if (!dateString) return '';
    var date = new Date(dateString);
    var day = date.getDate() < 10 ? '0' + date.getDate() : String(date.getDate());
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : String(date.getMonth() + 1);
    var year = date.getFullYear();
    var hours = date.getHours() < 10 ? '0' + date.getHours() : String(date.getHours());
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : String(date.getMinutes());
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : String(date.getSeconds());
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

// Cerrar modal de detalles
$(document).on('click', '.close-modal-auditlog-details', function () {
    $('.modal-AuditLogDetails').modal('hide');
});

// Doble clic en fila para ver detalles
$(document).on('dblclick', '.tbody-Table-AuditLog .row-app', function () {
    // Desmarcar todos los checkboxes
    $('.selectAuditLog').prop('checked', false);
    // Marcar el checkbox de la fila actual
    $(this).find('.selectAuditLog').prop('checked', true);
    // Mostrar detalles
    showAuditLogDetails();
});

// Filtro de datos
$(document).on('change', '#auditlog-page .optionFilter', function () {
    optionFilterFunction(this);

    if ($('.textFilter').val() != "") {
        Datafilter(".tbody-Table-AuditLog", "/auditoria/FilterOrMoreData");
    }
});

$(document).on('keyup', '#auditlog-page .textFilterMask', function (e) {
    var keycode = (e as any).keyCode || (e as any).which;
    if (keycode == 13) {
        textFilterMaskFunction(this);
        Datafilter(".tbody-Table-AuditLog", "/auditoria/FilterOrMoreData");
    }
});

// Scroll infinito para paginación
$(document).on('scroll', '#auditlog-page #content-scroll', function () {
    let currentscroll = $("#content-scroll").scrollTop();
    let maxscroll = $(".tblAuditLog").outerHeight(true) - $("#content-scroll").outerHeight(true);

    if (currentscroll == Math.round(maxscroll)) {
        if (!isBusy) {
            moredata(maxscroll, "auditoria", ".tbody-Table-AuditLog");
        }
    }
});
