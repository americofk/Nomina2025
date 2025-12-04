/**
 * CoursePagination.js
 * Paginacion para la tabla de cursos
 */

let coursePagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initCoursePagination();
});

function initCoursePagination() {
    const container = document.getElementById('course-page');
    if (!container) return;

    coursePagination = new TablePagination({
        container: '#course-page .ContenedorListEntity',
        tableBody: '.tbody-Table-Course',
        apiEndpoint: '/cursos/GetCoursesPaged',
        pageSize: 20,
        rowRenderer: renderCourseRow,
        onDataLoaded: function(result) {
            reinitCourseEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los cursos.', 'error');
            }
        }
    });
}

function renderCourseRow(item, index) {
    const formatDateTime = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleString('es-DO', { dateStyle: 'short', timeStyle: 'short' });
    };

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectCourse">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal CourseIdtblcur" data-title="Id Curso">${item.CourseId || ''}</td>
            <td class="cell-app CourseTypeNametblcur" data-title="Tipo de curso">${item.CourseTypeName || ''}</td>
            <td class="cell-app CourseNametblcur" data-title="Nombre de curso">${item.CourseName || ''}</td>
            <td class="cell-app StartDateTimetblcur" data-title="Fecha y hora de inicio">${formatDateTime(item.StartDateTime)}</td>
            <td class="cell-app EndDateTimetblcur" data-title="Fecha y hora final">${formatDateTime(item.EndDateTime)}</td>
            <td class="cell-app ClassRoomNametblcur" data-title="Aula o salon">${item.ClassRoomName || ''}</td>
            <td class="cell-app CourseStatustblcur" data-title="Estado">${item.CourseStatus || ''}</td>
        </tr>
    `;
}

function reinitCourseEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-Course .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectCourse');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditCourse');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initCourseViews === 'function') {
        initCourseViews();
    }
}

function refreshCourseTable() {
    if (coursePagination) coursePagination.refresh();
}

function resetCoursePagination() {
    if (coursePagination) coursePagination.reset();
}
