/**
 * ClassRoomPagination.js
 * Paginacion para la tabla de salones de cursos
 */

let classRoomPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initClassRoomPagination();
});

function initClassRoomPagination() {
    const container = document.getElementById('classroom-page');
    if (!container) return;

    classRoomPagination = new TablePagination({
        container: '#classroom-page .ContenedorListEntity',
        tableBody: '.tbody-Table-ClassRoom',
        apiEndpoint: '/salonescurso/GetClassRoomsPaged',
        pageSize: 20,
        rowRenderer: renderClassRoomRow,
        onDataLoaded: function(result) {
            reinitClassRoomEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los salones de cursos.', 'error');
            }
        }
    });
}

function renderClassRoomRow(item, index) {
    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectClassRoom">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal ClassRoomIdtblcr" data-title="Id Salón">${item.ClassRoomId || ''}</td>
            <td class="cell-app Nametblcr" data-title="Nombre">${item.Name || ''}</td>
            <td class="cell-app CourseLocationIdtblcr" data-title="Ubicación">${item.CourseLocationId || ''}</td>
            <td class="cell-app MaxStudentQtyyblcr" data-title="Capacidad">${item.MaxStudentQty || ''}</td>
            <td class="cell-app AvailableTimeStarttblcr" data-title="Hora de inicio">${item.AvailableTimeStart || ''}</td>
            <td class="cell-app AvailableTimeEndtblcr" data-title="Hora final">${item.AvailableTimeEnd || ''}</td>
            <td class="cell-app Commenttblcr" data-title="Comentarios">${item.Comment || ''}</td>
        </tr>
    `;
}

function reinitClassRoomEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-ClassRoom .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectClassRoom');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditClassRoom');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initClassRoomViews === 'function') {
        initClassRoomViews();
    }
}

function refreshClassRoomTable() {
    if (classRoomPagination) classRoomPagination.refresh();
}

function resetClassRoomPagination() {
    if (classRoomPagination) classRoomPagination.reset();
}
