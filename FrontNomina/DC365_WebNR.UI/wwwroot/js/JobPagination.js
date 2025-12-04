/**
 * JobPagination.js
 * Paginacion para la tabla de cargos
 */

let jobPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initJobPagination();
});

function initJobPagination() {
    const container = document.getElementById('job-page');
    if (!container) return;

    jobPagination = new TablePagination({
        container: '#job-page .ContenedorListEntity',
        tableBody: '.tbody-Table-job',
        apiEndpoint: '/cargosactivos/GetJobsPaged',
        pageSize: 20,
        rowRenderer: renderJobRow,
        onDataLoaded: function(result) {
            reinitJobEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los cargos.', 'error');
            }
        }
    });
}

function renderJobRow(item, index) {
    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectJobs">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal JobIdtbl" data-title="Id. Cargo">${item.JobId || ''}</td>
            <td class="cell-app Nametbl" data-title="Nombre de cargo">${item.Name || ''}</td>
            <td class="cell-app Descriptiontbl" data-title="Descripcion">${item.Description || ''}</td>
            <td class="cell-app JobStatustbl" data-title="Estado">${item.JobStatus ? 'Activo' : 'Inactivo'}</td>
        </tr>
    `;
}

function reinitJobEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) {
        checkAll.checked = false;
    }

    const rows = document.querySelectorAll('.tbody-Table-job .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectJobs');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditJob');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initJobViews === 'function') {
        initJobViews();
    }
}

function refreshJobTable() {
    if (jobPagination) jobPagination.refresh();
}

function resetJobPagination() {
    if (jobPagination) jobPagination.reset();
}
