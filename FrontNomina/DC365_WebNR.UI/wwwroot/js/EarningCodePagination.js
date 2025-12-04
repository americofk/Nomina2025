/**
 * EarningCodePagination.js
 * Paginacion para la tabla de codigos de ganancia
 */

let earningCodePagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initEarningCodePagination();
});

function initEarningCodePagination() {
    const container = document.getElementById('earningcode-page');
    if (!container) return;

    earningCodePagination = new TablePagination({
        container: '#earningcode-page .ContenedorListEntity',
        tableBody: '.tbody-Table-EarningCode',
        apiEndpoint: '/codigosganancias/GetEarningCodesPaged',
        pageSize: 20,
        rowRenderer: renderEarningCodeRow,
        onDataLoaded: function(result) {
            reinitEarningCodeEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los codigos de ganancia.', 'error');
            }
        }
    });
}

function renderEarningCodeRow(item, index) {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-DO');
    };

    const tssChecked = item.IsTSS ? 'checked' : '';
    const isrChecked = item.IsISR ? 'checked' : '';
    const royaltyChecked = item.IsRoyaltyPayroll ? 'checked' : '';

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectEarningCode">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal EarningCodeIdtbl" data-title="Id Código">${item.EarningCodeId || ''}</td>
            <td class="cell-app Nametbl-Ec" data-title="Nombre">${item.Name || ''}</td>
            <td class="cell-app" data-title="Aplica TSS">
                <label class="switch disabled">
                    <input type="checkbox" disabled ${tssChecked}>
                    <span class="slider round"></span>
                </label>
            </td>
            <td class="cell-app" data-title="Aplica ISR">
                <label class="switch disabled">
                    <input type="checkbox" disabled ${isrChecked}>
                    <span class="slider round"></span>
                </label>
            </td>
            <td class="cell-app" data-title="Aplica regalía">
                <label class="switch disabled">
                    <input type="checkbox" disabled ${royaltyChecked}>
                    <span class="slider round"></span>
                </label>
            </td>
            <td class="cell-app ProjId-Ec" data-title="Proyecto">${item.ProjId || ''}</td>
            <td class="cell-app ValidFrom-Ec" data-title="Válido desde">${formatDate(item.ValidFrom)}</td>
            <td class="cell-app ValidTo-Ec" data-title="Válido hasta">${formatDate(item.ValidTo)}</td>
            <td class="cell-app" data-title="Índice base">${item.IndexBase || ''}</td>
            <td class="cell-app" data-title="Monto o porcentaje">${item.MultiplyAmount || ''}</td>
            <td class="cell-app Description-Ec" data-title="Descripción">${item.Description || ''}</td>
            <td class="cell-app Internalid-Ec" data-title="Descripción" hidden>${item.Internalid || ''}</td>
        </tr>
    `;
}

function reinitEarningCodeEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-EarningCode .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectEarningCode');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditEarningCode');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initEarningCodeViews === 'function') {
        initEarningCodeViews();
    }
}

function refreshEarningCodeTable() {
    if (earningCodePagination) earningCodePagination.refresh();
}

function resetEarningCodePagination() {
    if (earningCodePagination) earningCodePagination.reset();
}
