/**
 * DeductionCodePagination.js
 * Paginacion para la tabla de codigos de deduccion
 */

let deductionCodePagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initDeductionCodePagination();
});

function initDeductionCodePagination() {
    const container = document.getElementById('deductioncode-page');
    if (!container) return;

    deductionCodePagination = new TablePagination({
        container: '#deductioncode-page .ContenedorListEntity',
        tableBody: '.tbody-Table-deductionCode',
        apiEndpoint: '/codigosdeduccion/GetDeductionCodesPaged',
        pageSize: 20,
        rowRenderer: renderDeductionCodeRow,
        onDataLoaded: function(result) {
            reinitDeductionCodeEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los codigos de deduccion.', 'error');
            }
        }
    });
}

function renderDeductionCodeRow(item, index) {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-DO');
    };

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectDeductionCode">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal InternalDeductionCode" data-title="Id Código" hidden>${item.InternalId || ''}</td>
            <td class="cell-app cell-principal DeductionCodeId-dc" data-title="Id Código">${item.DeductionCodeId || ''}</td>
            <td class="cell-app Name-dc" data-title="Nombre del código">${item.Name || ''}</td>
            <td class="cell-app PayrollAction-dc" data-title="Impacto de nómina">${item.PayrollAction || ''}</td>
            <td class="cell-app ProjId" data-title="Proyecto">${item.ProjId || ''}</td>
            <td class="cell-app ProjCategory" data-title="Categoría proyecto">${item.ProjCategory || ''}</td>
            <td class="cell-app ValidFrom" data-title="Válido desde">${formatDate(item.ValidFrom)}</td>
            <td class="cell-app ValidTo" data-title="Válido hasta">${formatDate(item.ValidTo)}</td>
            <td class="cell-app Description" data-title="Descripción">${item.Description || ''}</td>
        </tr>
    `;
}

function reinitDeductionCodeEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-deductionCode .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectDeductionCode');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditDeductionCode');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initDeductionCodeViews === 'function') {
        initDeductionCodeViews();
    }
}

function refreshDeductionCodeTable() {
    if (deductionCodePagination) deductionCodePagination.refresh();
}

function resetDeductionCodePagination() {
    if (deductionCodePagination) deductionCodePagination.reset();
}
