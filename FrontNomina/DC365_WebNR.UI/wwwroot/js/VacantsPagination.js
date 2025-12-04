/**
 * VacantsPagination.js
 * Paginacion para la tabla de vacantes
 */

let vacantsPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initVacantsPagination();
});

function initVacantsPagination() {
    const container = document.getElementById('vacants-page');
    if (!container) return;

    vacantsPagination = new TablePagination({
        container: '#vacants-page .ContenedorListEntity',
        tableBody: '.tbody-Table-Vacants',
        apiEndpoint: '/vacantes/GetVacantsPaged',
        pageSize: 20,
        rowRenderer: renderVacantsRow,
        onDataLoaded: function(result) {
            reinitVacantsEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar las vacantes.', 'error');
            }
        }
    });
}

function renderVacantsRow(item, index) {
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
            <td class="cell-app cell-principal PositionIdtbl" data-title="Id puesto">${item.PositionId || ''}</td>
            <td class="cell-app PositionNametbl" data-title="Nombre del puesto">${item.PositionName || ''}</td>
            <td class="cell-app IsVacanttbl" data-title="Es vacante">${item.IsVacant ? 'Sí' : 'No'}</td>
            <td class="cell-app DepartmentIdtbl" data-title="Departamento">${item.DepartmentId || ''}</td>
            <td class="cell-app JobIdtbl" data-title="Cargo">${item.JobId || ''}</td>
            <td class="cell-app NotifyPositionIdtbl" data-title="Notifica al puesto">${item.NotifyPositionId || ''}</td>
            <td class="cell-app PositionStatustbl" data-title="Estado">${item.PositionStatus ? 'Activo' : 'Inactivo'}</td>
            <td class="cell-app StartDatetbl" data-title="Fecha inicial">${formatDate(item.StartDate)}</td>
            <td class="cell-app EndDatetbl" data-title="Fecha final">${formatDate(item.EndDate)}</td>
            <td class="cell-app Descriptiontbl" data-title="Descripcion">${item.Description || ''}</td>
        </tr>
    `;
}

function reinitVacantsEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-Vacants .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectPosition');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditVacants');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initVacantsViews === 'function') {
        initVacantsViews();
    }
}

function refreshVacantsTable() {
    if (vacantsPagination) vacantsPagination.refresh();
}

function resetVacantsPagination() {
    if (vacantsPagination) vacantsPagination.reset();
}
