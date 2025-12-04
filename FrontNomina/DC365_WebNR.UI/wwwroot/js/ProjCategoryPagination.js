/**
 * ProjCategoryPagination.js
 * Paginacion para la tabla de categorias de proyectos
 */

let projCategoryPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initProjCategoryPagination();
});

function initProjCategoryPagination() {
    const container = document.getElementById('projcategory-page');
    if (!container) return;

    projCategoryPagination = new TablePagination({
        container: '#projcategory-page .ContenedorListEntity',
        tableBody: '.tbody-Table-ProjectCategory',
        apiEndpoint: '/categoriaproyectoactivas/GetProjCategoriesPaged',
        pageSize: 20,
        rowRenderer: renderProjCategoryRow,
        onDataLoaded: function(result) {
            reinitProjCategoryEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar las categorias de proyectos.', 'error');
            }
        }
    });
}

function renderProjCategoryRow(item, index) {
    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app select-ProjectCategory">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal ProjCategoryIdtbl" data-title="ID Categoría">${item.ProjCategoryId || ''}</td>
            <td class="cell-app Nametbl" data-title="Nombre de la categoría">${item.CategoryName || ''}</td>
            <td class="cell-app LedgerAccounttbl" data-title="Cuenta contable">${item.LedgerAccount || ''}</td>
        </tr>
    `;
}

function reinitProjCategoryEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-ProjectCategory .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.select-ProjectCategory');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditProjectCategory');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initProjCategoryViews === 'function') {
        initProjCategoryViews();
    }
}

function refreshProjCategoryTable() {
    if (projCategoryPagination) projCategoryPagination.refresh();
}

function resetProjCategoryPagination() {
    if (projCategoryPagination) projCategoryPagination.reset();
}
