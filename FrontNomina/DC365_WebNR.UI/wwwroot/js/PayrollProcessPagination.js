/**
 * PayrollProcessPagination.js
 * Paginacion para la tabla de procesos de nomina
 */

let payrollProcessPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initPayrollProcessPagination();
});

function initPayrollProcessPagination() {
    const container = document.getElementById('payrollprocess-page');
    if (!container) return;

    payrollProcessPagination = new TablePagination({
        container: '#payrollprocess-page .ContenedorListEntity',
        tableBody: '.tbody-Table-Payrollprocess',
        apiEndpoint: '/procesonomina/GetPayrollProcessPaged',
        pageSize: 20,
        rowRenderer: renderPayrollProcessRow,
        onDataLoaded: function(result) {
            reinitPayrollProcessEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los procesos de nomina.', 'error');
            }
        }
    });
}

function renderPayrollProcessRow(item, index) {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-DO');
    };

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectPayrollProcess">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal PayrollProcessIdTbl" data-title="Id Proceso">${item.PayrollProcessId || ''}</td>
            <td class="cell-app Nametbl" data-title="Descripcion">${item.Description || ''}</td>
            <td class="cell-app Nametbl" data-title="Nomina">${item.PayrollId || ''}</td>
            <td class="cell-app QtyWorkerstbl" data-title="Fecha de pago">${formatDate(item.PaymentDate)}</td>
            <td class="cell-app StartDatetbl" data-title="Inicio periodo">${formatDate(item.PeriodStartDate)}</td>
            <td class="cell-app EndDatetbl" data-title="Fin periodo">${formatDate(item.PeriodEndDate)}</td>
            <td class="cell-app Descriptiontbl cell-app-number" data-title="Empleados">${item.EmployeeQuantity || 0}</td>
            <td class="cell-app Descriptiontbl" data-title="Proyecto">${item.ProjId || ''}</td>
            <td class="cell-app PayrollProcessStatustbl" data-title="Estado">${item.PayrollProcessStatus || ''}</td>
        </tr>
    `;
}

function reinitPayrollProcessEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-Payrollprocess .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectPayrollProcess');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditPayrollProcess');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initPayrollProcessViews === 'function') {
        initPayrollProcessViews();
    }
}

function refreshPayrollProcessTable() {
    if (payrollProcessPagination) payrollProcessPagination.refresh();
}

function resetPayrollProcessPagination() {
    if (payrollProcessPagination) payrollProcessPagination.reset();
}
