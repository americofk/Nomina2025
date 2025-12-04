/**
 * InstructorPagination.js
 * Paginacion para la tabla de instructores
 */

let instructorPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initInstructorPagination();
});

function initInstructorPagination() {
    const container = document.getElementById('instructor-page');
    if (!container) return;

    instructorPagination = new TablePagination({
        container: '#instructor-page .ContenedorListEntity',
        tableBody: '.tbody-Table-Instructor',
        apiEndpoint: '/instructor/GetInstructorsPaged',
        pageSize: 20,
        rowRenderer: renderInstructorRow,
        onDataLoaded: function(result) {
            reinitInstructorEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los instructores.', 'error');
            }
        }
    });
}

function renderInstructorRow(item, index) {
    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectInstructor">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal InstructorIdtblIns" data-title="Código">${item.InstructorId || ''}</td>
            <td class="cell-app NametblIns" data-title="Nombre">${item.Name || ''}</td>
            <td class="cell-app PhonetblIns" data-title="Teléfono">${item.Phone || ''}</td>
            <td class="cell-app MailtblIns" data-title="Email">${item.Mail || ''}</td>
            <td class="cell-app CompanytblIns" data-title="Empresa">${item.Company || ''}</td>
            <td class="cell-app CommenttblIns" data-title="Comentario">${item.Comment || ''}</td>
        </tr>
    `;
}

function reinitInstructorEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-Instructor .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectInstructor');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditInstructor');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initInstructorViews === 'function') {
        initInstructorViews();
    }
}

function refreshInstructorTable() {
    if (instructorPagination) instructorPagination.refresh();
}

function resetInstructorPagination() {
    if (instructorPagination) instructorPagination.reset();
}
