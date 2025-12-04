/**
 * CalendarHolidayPagination.js
 * Paginacion para la tabla de dias feriados
 */

let calendarHolidayPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initCalendarHolidayPagination();
});

function initCalendarHolidayPagination() {
    const container = document.getElementById('calendarholiday-page');
    if (!container) return;

    calendarHolidayPagination = new TablePagination({
        container: '#calendarholiday-page .ContenedorListEntity',
        tableBody: '.tbody-Table-CalendarHoliday',
        apiEndpoint: '/calendarholiday/GetCalendarHolidaysPaged',
        pageSize: 20,
        rowRenderer: renderCalendarHolidayRow,
        onDataLoaded: function(result) {
            reinitCalendarHolidayEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los dias feriados.', 'error');
            }
        }
    });
}

function renderCalendarHolidayRow(item, index) {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-DO');
    };

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app select-CalendarHoliday">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal CalendarDateIdtbl" data-title="Fecha">${formatDate(item.CalendarDate)}</td>
            <td class="cell-app Descriptiontbl" data-title="Descripcion">${item.Description || ''}</td>
        </tr>
    `;
}

function reinitCalendarHolidayEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-CalendarHoliday .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.select-CalendarHoliday');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditHoliday');
            if (editBtn) editBtn.click();
        });
    });
}

function refreshCalendarHolidayTable() {
    if (calendarHolidayPagination) calendarHolidayPagination.refresh();
}

function resetCalendarHolidayPagination() {
    if (calendarHolidayPagination) calendarHolidayPagination.reset();
}
