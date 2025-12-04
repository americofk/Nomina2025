/**
 * PositionPagination.js
 * Paginacion para la tabla de puestos
 */

let positionPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initPositionPagination();
});

function initPositionPagination() {
    const container = document.getElementById('position-page');
    if (!container) return;

    positionPagination = new TablePagination({
        container: '#position-page .ContenedorListEntity',
        tableBody: '.tbody-Table-Position',
        apiEndpoint: '/puestosactivos/GetPositionsPaged',
        pageSize: 20,
        rowRenderer: renderPositionRow,
        onDataLoaded: function(result) {
            reinitPositionEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los puestos.', 'error');
            }
        }
    });
}

function renderPositionRow(item, index) {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-DO');
    };

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectPosition">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal PositionIdtbl" data-title="Id.Puesto">${item.PositionId || ''}</td>
            <td class="cell-app PositionNametbl" data-title="Nombre de puesto">${item.PositionName || ''}</td>
            <td class="cell-app IsVacanttbl" data-title="Es vacante">${item.IsVacant ? 'Si' : 'No'}</td>
            <td class="cell-app DepartmentIdtbl" data-title="Departamento">${item.DepartmentId || ''}</td>
            <td class="cell-app JobIdtbl" data-title="Cargo">${item.JobId || ''}</td>
            <td class="cell-app NotifyPositionIdtbl" data-title="Notifica al puesto">${item.NotifyPositionId || ''}</td>
            <td class="cell-app PositionStatustbl" data-title="Estado">${item.PositionStatus ? 'Activo' : 'Inactivo'}</td>
            <td class="cell-app StartDatetbl" data-title="Fecha inicial">${formatDate(item.StartDate)}</td>
            <td class="cell-app EndDatetbl" data-title="Fecha final">${formatDate(item.EndDate)}</td>
            <td class="cell-app Descriptiontbl styleRowDescripThree" data-title="Descripcion">${item.Description || ''}</td>
        </tr>
    `;
}

function reinitPositionEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-Position .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectPosition');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditPosition');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initPositionViews === 'function') {
        initPositionViews();
    }
}

function refreshPositionTable() {
    if (positionPagination) positionPagination.refresh();
}

function resetPositionPagination() {
    if (positionPagination) positionPagination.reset();
}
