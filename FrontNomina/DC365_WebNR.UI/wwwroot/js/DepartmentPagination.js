/**
 * DepartmentPagination.js
 * Paginacion para la tabla de departamentos
 */

let departmentPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initDepartmentPagination();
});

function initDepartmentPagination() {
    const container = document.getElementById('department-page');
    if (!container) return;

    departmentPagination = new TablePagination({
        container: '#department-page .ContenedorListEntity',
        tableBody: '.tbody-Table-Department',
        apiEndpoint: '/departamentosactivos/GetDepartmentsPaged',
        pageSize: 20,
        rowRenderer: renderDepartmentRow,
        onDataLoaded: function(result) {
            reinitDepartmentEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los departamentos.', 'error');
            }
        }
    });
}

function renderDepartmentRow(item, index) {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-DO');
    };

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectDepartment">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal DepartmentIdtbl" data-title="Id Departamento">${item.DepartmentId || ''}</td>
            <td class="cell-app Nametbl" data-title="Nombre del Departamento">${item.Name || ''}</td>
            <td class="cell-app AccountCodetbl" data-title="Cuenta contable">${item.AccountCode || ''}</td>
            <td class="cell-app QtyWorkerstbl" data-title="Trabajadores">${item.QtyWorkers || 0}</td>
            <td class="cell-app StartDatetbl" data-title="Fecha inicial">${formatDate(item.StartDate)}</td>
            <td class="cell-app EndDatetbl" data-title="Fecha final">${formatDate(item.EndDate)}</td>
            <td class="cell-app Descriptiontbl styleRowDescripThree" data-title="Descripcion">${item.Description || ''}</td>
        </tr>
    `;
}

function reinitDepartmentEvents() {
    // Checkbox seleccionar todo
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) {
        checkAll.checked = false;
    }

    // Doble clic para editar
    const rows = document.querySelectorAll('.tbody-Table-Department .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectDepartment');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditDepartment');
            if (editBtn) editBtn.click();
        });
    });

    // Re-inicializar grid views si existe
    if (typeof initDepartmentViews === 'function') {
        initDepartmentViews();
    }
}

// Funciones globales
function refreshDepartmentTable() {
    if (departmentPagination) departmentPagination.refresh();
}

function resetDepartmentPagination() {
    if (departmentPagination) departmentPagination.reset();
}
