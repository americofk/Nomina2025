/**
 * ProjectPagination.js
 * Paginacion para la tabla de proyectos
 */

let projectPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initProjectPagination();
});

function initProjectPagination() {
    const container = document.getElementById('project-page');
    if (!container) return;

    projectPagination = new TablePagination({
        container: '#project-page .ContenedorListEntity',
        tableBody: '.tbody-Table-Project',
        apiEndpoint: '/proyectosactivos/GetProjectsPaged',
        pageSize: 20,
        rowRenderer: renderProjectRow,
        onDataLoaded: function(result) {
            reinitProjectEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los proyectos.', 'error');
            }
        }
    });
}

function renderProjectRow(item, index) {
    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app select-ProjId">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal ProjIdtbl" data-title="ID Proyecto">${item.ProjId || ''}</td>
            <td class="cell-app Nametbl" data-title="Nombre del proyecto">${item.Name || ''}</td>
            <td class="cell-app LedgerAccounttbl" data-title="Cuenta contable">${item.LedgerAccount || ''}</td>
        </tr>
    `;
}

function reinitProjectEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-Project .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.select-ProjId');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditProject');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initProjectViews === 'function') {
        initProjectViews();
    }
}

function refreshProjectTable() {
    if (projectPagination) projectPagination.refresh();
}

function resetProjectPagination() {
    if (projectPagination) projectPagination.reset();
}
