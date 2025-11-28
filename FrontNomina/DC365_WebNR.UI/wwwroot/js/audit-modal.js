/**
 * @file audit-modal.js
 * @description Funcionalidad reutilizable para el modal de información de auditoría
 */

// Función para formatear fecha y hora
function formatAuditDateTime(dateString) {
    if (!dateString) return '-';
    try {
        var date = new Date(dateString);
        if (isNaN(date.getTime())) return '-';
        return date.toLocaleString('es-DO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    } catch (e) {
        return dateString;
    }
}

// Función para mostrar el modal de auditoría con datos
function showAuditModal(data) {
    $('#audit-dataareaid').val(data.DataAreaId || '-');
    $('#audit-recid').val(data.RecId || '-');
    $('#audit-createdby').val(data.CreatedBy || '-');
    $('#audit-createdon').val(data.CreatedOn ? formatAuditDateTime(data.CreatedOn) : '-');
    $('#audit-modifiedby').val(data.ModifiedBy || '-');
    $('#audit-modifiedon').val(data.ModifiedOn ? formatAuditDateTime(data.ModifiedOn) : '-');

    // Mostrar el modal con animación
    $('#modal-audit-info').css('display', 'flex');
    setTimeout(function() {
        $('#modal-audit-info').addClass('show');
    }, 10);
}

// Función para mostrar auditoría desde campos del formulario
function showAuditModalFromForm() {
    var data = {
        DataAreaId: $('#DataAreaId').val() || '-',
        RecId: $('#RecId').val() || '-',
        CreatedBy: $('#CreatedBy').val() || '-',
        CreatedOn: $('#CreatedOn').val(),
        ModifiedBy: $('#ModifiedBy').val() || '-',
        ModifiedOn: $('#ModifiedOn').val()
    };
    showAuditModal(data);
}

// Cerrar modal de auditoría con animación
$(document).on('click', '.close-modal-audit', function() {
    $('#modal-audit-info').removeClass('show');
    setTimeout(function() {
        $('#modal-audit-info').css('display', 'none');
    }, 300);
});

// Función para inicializar auditoría en listpage
function initAuditListPage(checkboxSelector, idCellSelector, apiUrl, idParamName) {
    // Usar event delegation para elementos dinámicos
    $(document).off('click.auditListPage').on('click.auditListPage', '.AuditInfo', function() {
        var _id;
        var contador = 0;
        $(checkboxSelector + "[type=checkbox]").each(function() {
            if ($(this).is(":checked")) {
                contador++;
                _id = $(this).parent().parent().find(idCellSelector).html().trim();
            }
        });

        if (contador === 0) {
            windows_message("¡Debe seleccionar un registro para ver la información de auditoría!", "error");
            return;
        }

        if (contador > 1) {
            windows_message("¡Debe seleccionar solo un registro!", "info");
            return;
        }

        var requestData = {};
        requestData[idParamName || 'Id'] = _id;

        $.ajax({
            url: apiUrl,
            type: "GET",
            data: requestData,
            async: true,
            success: function(data) {
                if (data != null) {
                    showAuditModal(data);
                } else {
                    windows_message("Error obteniendo datos de auditoría", "error");
                }
            },
            error: function(xhr) {
                redireccionaralLogin(xhr);
            }
        });
    });

    // Evento para el formulario de edición - usar event delegation para elementos dinámicos
    $(document).off('click.auditFormPage').on('click.auditFormPage', '.AuditInfoForm', function() {
        showAuditModalFromForm();
    });
}
