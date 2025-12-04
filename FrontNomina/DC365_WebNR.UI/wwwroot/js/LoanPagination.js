/**
 * LoanPagination.js
 * Paginacion para la tabla de prestamos
 */

let loanPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initLoanPagination();
});

function initLoanPagination() {
    const container = document.getElementById('loan-page');
    if (!container) return;

    loanPagination = new TablePagination({
        container: '#loan-page .ContenedorListEntity',
        tableBody: '.tbody-Table-Loans',
        apiEndpoint: '/prestamos/GetLoansPaged',
        pageSize: 20,
        rowRenderer: renderLoanRow,
        onDataLoaded: function(result) {
            reinitLoanEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los prestamos.', 'error');
            }
        }
    });
}

function renderLoanRow(item, index) {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-DO');
    };

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectLoans">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal LoanIdIdTbl" data-title="Id Codigo">${item.LoanId || ''}</td>
            <td class="cell-app Nametbl" data-title="Nombre del codigo">${item.Name || ''}</td>
            <td class="cell-app ProjIdtbl" data-title="Proyecto">${item.ProjId || ''}</td>
            <td class="cell-app ProjCategoryIdtbl" data-title="Categoria de proyecto">${item.ProjCategoryId || ''}</td>
            <td class="cell-app ValidFromtbl" data-title="Valido desde">${formatDate(item.ValidFrom)}</td>
            <td class="cell-app ValidTotbl" data-title="Valido hasta">${formatDate(item.ValidTo)}</td>
            <td class="cell-app LedgerAccounttbl" data-title="Cuenta contable">${item.LedgerAccount || ''}</td>
            <td class="cell-app DepartmentIdtbl" data-title="Departamento">${item.DepartmentId || ''}</td>
            <td class="cell-app Descriptiontbl" data-title="Descripcion">${item.Description || ''}</td>
        </tr>
    `;
}

function reinitLoanEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-Loans .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectLoans');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditLoan');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initLoanViews === 'function') {
        initLoanViews();
    }
}

function refreshLoanTable() {
    if (loanPagination) loanPagination.refresh();
}

function resetLoanPagination() {
    if (loanPagination) loanPagination.reset();
}
