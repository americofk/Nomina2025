/**
 * TaxPagination.js
 * Paginacion para la tabla de impuestos
 */

let taxPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initTaxPagination();
});

function initTaxPagination() {
    const container = document.getElementById('tax-page');
    if (!container) return;

    taxPagination = new TablePagination({
        container: '#tax-page .ContenedorListEntity',
        tableBody: '.tbody-Table-Tax',
        apiEndpoint: '/impuestos/GetTaxesPaged',
        pageSize: 20,
        rowRenderer: renderTaxRow,
        onDataLoaded: function(result) {
            reinitTaxEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los impuestos.', 'error');
            }
        }
    });
}

function renderTaxRow(item, index) {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-DO');
    };

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectTax">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal TaxIdTbl" data-title="Id Código">${item.TaxId || ''}</td>
            <td class="cell-app Nametbl" data-title="Nombre del código">${item.Name || ''}</td>
            <td class="cell-app ProjIdtbl" data-title="Proyecto">${item.ProjId || ''}</td>
            <td class="cell-app ProjCategoryIdtbl" data-title="Categoría de proyecto">${item.ProjCategory || ''}</td>
            <td class="cell-app ValidFromtbl" data-title="Válido desde">${formatDate(item.ValidFrom)}</td>
            <td class="cell-app ValidTotbl" data-title="Válido hasta">${formatDate(item.ValidTo)}</td>
            <td class="cell-app Descriptiontbl" data-title="Descripción">${item.Description || ''}</td>
        </tr>
    `;
}

function reinitTaxEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-Tax .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectTax');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditTax');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initTaxViews === 'function') {
        initTaxViews();
    }
}

function refreshTaxTable() {
    if (taxPagination) taxPagination.refresh();
}

function resetTaxPagination() {
    if (taxPagination) taxPagination.reset();
}
