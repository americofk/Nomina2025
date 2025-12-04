/**
 * CourseLocationPagination.js
 * Paginacion para la tabla de ubicaciones de cursos
 */

let courseLocationPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initCourseLocationPagination();
});

function initCourseLocationPagination() {
    const container = document.getElementById('courselocation-page');
    if (!container) return;

    courseLocationPagination = new TablePagination({
        container: '#courselocation-page .ContenedorListEntity',
        tableBody: '.tbody-Table-CourseLocation',
        apiEndpoint: '/ubicacioncursos/GetCourseLocationsPaged',
        pageSize: 20,
        rowRenderer: renderCourseLocationRow,
        onDataLoaded: function(result) {
            reinitCourseLocationEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar las ubicaciones de cursos.', 'error');
            }
        }
    });
}

function renderCourseLocationRow(item, index) {
    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectCourseLocation">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal CourseLocationIdtblcl" data-title="Id Ubicación">${item.CourseLocationId || ''}</td>
            <td class="cell-app Nametblcl" data-title="Nombre">${item.Name || ''}</td>
            <td class="cell-app Phonetblcl" data-title="Teléfono">${item.Phone || ''}</td>
            <td class="cell-app Mailtblcl" data-title="Email">${item.Mail || ''}</td>
            <td class="cell-app Addresstblcl" data-title="Dirección">${item.Address || ''}</td>
            <td class="cell-app ContactNametblcl" data-title="Nombre del contacto">${item.ContactName || ''}</td>
        </tr>
    `;
}

function reinitCourseLocationEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-CourseLocation .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectCourseLocation');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditCourseLocation');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initCourseLocationViews === 'function') {
        initCourseLocationViews();
    }
}

function refreshCourseLocationTable() {
    if (courseLocationPagination) courseLocationPagination.refresh();
}

function resetCourseLocationPagination() {
    if (courseLocationPagination) courseLocationPagination.reset();
}
