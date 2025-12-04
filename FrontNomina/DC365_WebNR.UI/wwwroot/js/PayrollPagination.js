/**
 * Paginacion para Nominas (Payroll)
 */
let payrollPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initPayrollPagination();
});

function initPayrollPagination() {
    const container = document.getElementById('payroll-page');
    if (!container) return;

    payrollPagination = new TablePagination({
        container: '#payroll-page .ContenedorListEntity',
        tableBody: '.tbody-Table-Payroll',
        apiEndpoint: '/nomina/GetPayrollsPaged',
        pageSize: 20,
        rowRenderer: renderPayrollRow,
        onDataLoaded: function(result) {
            reinitPayrollEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar las nominas.', 'error');
            }
        }
    });
}

function renderPayrollRow(item, index) {
    const idCheck = `check-table-${index + 1}`;

    // Formatear fechas
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-DO');
    };

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="${idCheck}" type="checkbox" class="check-table-app selectPayroll">
                <label for="${idCheck}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal PayrollIdtbl" data-title="ID Nomina">
                ${item.PayrollId || ''}
            </td>
            <td class="cell-app Nametbl" data-title="Nombre de nomina">
                ${item.Name || ''}
            </td>
            <td class="cell-app QtyWorkerstbl" data-title="Frecuenca de pago">
                ${item.PayFrecuency || ''}
            </td>
            <td class="cell-app StartDatetbl" data-title="Valida desde">
                ${formatDate(item.ValidFrom)}
            </td>
            <td class="cell-app EndDatetbl" data-title="Valida hasta">
                ${formatDate(item.ValidTo)}
            </td>
            <td class="cell-app Descriptiontbl" data-title="Descripcion">
                ${item.Description || ''}
            </td>
        </tr>
    `;
}

function reinitPayrollEvents() {
    // Reinicializar checkbox principal
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) {
        checkAll.checked = false;
    }

    // Reinicializar eventos de seleccion de filas
    const rows = document.querySelectorAll('.tbody-Table-Payroll .row-app');
    rows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox') {
                const checkbox = this.querySelector('.selectPayroll');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
            }
        });
    });
}

// Funcion global para refrescar la tabla de nominas
function refreshPayrollTable() {
    if (payrollPagination) {
        payrollPagination.refresh();
    }
}

// Funcion para resetear la paginacion
function resetPayrollPagination() {
    if (payrollPagination) {
        payrollPagination.reset();
    }
}
