/**
 * CourseTypePagination.js
 * Paginacion para la tabla de tipos de cursos
 */

let courseTypePagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initCourseTypePagination();
});

function initCourseTypePagination() {
    const container = document.getElementById('coursetype-page');
    if (!container) return;

    courseTypePagination = new TablePagination({
        container: '#coursetype-page .ContenedorListEntity',
        tableBody: '.tbody-Table-CourseType',
        apiEndpoint: '/tipocursos/GetCourseTypesPaged',
        pageSize: 20,
        rowRenderer: renderCourseTypeRow,
        onDataLoaded: function(result) {
            reinitCourseTypeEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los tipos de cursos.', 'error');
            }
        }
    });
}

function renderCourseTypeRow(item, index) {
    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectCourseType">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal CourseTypeIdtbltc" data-title="Código">${item.CourseTypeId || ''}</td>
            <td class="cell-app NametblTc" data-title="Nombre">${item.Name || ''}</td>
            <td class="cell-app Descriptiontbltc" data-title="Descripción">${item.Description || ''}</td>
        </tr>
    `;
}

function reinitCourseTypeEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-CourseType .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectCourseType');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditCourseType');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initCourseTypeViews === 'function') {
        initCourseTypeViews();
    }
}

function refreshCourseTypeTable() {
    if (courseTypePagination) courseTypePagination.refresh();
}

function resetCourseTypePagination() {
    if (courseTypePagination) courseTypePagination.reset();
}
