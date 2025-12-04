/**
 * Paginacion para Auditoria (AuditLog)
 */
let auditLogPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initAuditLogPagination();
});

function initAuditLogPagination() {
    const container = document.getElementById('auditlog-page');
    if (!container) return;

    auditLogPagination = new TablePagination({
        container: '#auditlog-page .ContenedorListEntity',
        tableBody: '.tbody-Table-AuditLog',
        apiEndpoint: '/auditoria/GetAuditLogsPaged',
        pageSize: 20,
        rowRenderer: renderAuditLogRow,
        onDataLoaded: function(result) {
            reinitAuditLogEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los registros de auditoria.', 'error');
            }
        }
    });
}

function renderAuditLogRow(item, index) {
    const idCheck = `checkAuditLog_${index + 1}`;

    // Formatear fecha
    let changedAtFormatted = '';
    if (item.ChangedAt) {
        const date = new Date(item.ChangedAt);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        changedAtFormatted = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    // Truncar valores largos
    let newValueDisplay = item.NewValue || '';
    if (newValueDisplay.length > 30) {
        newValueDisplay = newValueDisplay.substring(0, 30) + '...';
    }

    let oldValueDisplay = item.OldValue || '';
    if (oldValueDisplay.length > 30) {
        oldValueDisplay = oldValueDisplay.substring(0, 30) + '...';
    }

    return `
        <tr class="row-app" data-recid="${item.RecId || ''}">
            <td class="cell-app check-cell-app">
                <input id="${idCheck}" type="checkbox" class="check-table-app selectAuditLog">
                <label for="${idCheck}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal EntityNametbl" data-title="Entidad">
                ${item.EntityName || ''}
            </td>
            <td class="cell-app FieldNametbl" data-title="Campo">
                ${item.FieldName || ''}
            </td>
            <td class="cell-app NewValuetbl" data-title="Nuevo Valor">
                ${newValueDisplay}
            </td>
            <td class="cell-app OldValuetbl" data-title="Valor Anterior">
                ${oldValueDisplay}
            </td>
            <td class="cell-app ChangedAttbl" data-title="Fecha Cambio">
                ${changedAtFormatted}
            </td>
            <td class="cell-app ChangedBytbl" data-title="Modificado Por">
                ${item.ChangedBy || ''}
            </td>
        </tr>
    `;
}

function reinitAuditLogEvents() {
    // Reinicializar checkbox principal
    const checkAll = document.querySelector('#selectAllAuditLog');
    if (checkAll) {
        checkAll.checked = false;
    }

    // Reinicializar eventos de seleccion de filas
    const rows = document.querySelectorAll('.tbody-Table-AuditLog .row-app');
    rows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox') {
                const checkbox = this.querySelector('.selectAuditLog');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
            }
        });
    });
}

// Funcion global para refrescar la tabla de auditoria
function refreshAuditLogTable() {
    if (auditLogPagination) {
        auditLogPagination.refresh();
    }
}

// Funcion para resetear la paginacion
function resetAuditLogPagination() {
    if (auditLogPagination) {
        auditLogPagination.reset();
    }
}
