/**
 * UserPagination.js
 * Paginacion para la tabla de usuarios
 */

let userPagination = null;

document.addEventListener('DOMContentLoaded', function() {
    initUserPagination();
});

function initUserPagination() {
    const container = document.getElementById('user-page');
    if (!container) return;

    userPagination = new TablePagination({
        container: '#user-page .ContenedorListEntity',
        tableBody: '.tbody-Table-user',
        apiEndpoint: '/usuarios/GetUsersPaged',
        pageSize: 20,
        rowRenderer: renderUserRow,
        onDataLoaded: function(result) {
            reinitUserEvents();
        },
        onError: function(error) {
            if (typeof windows_message === 'function') {
                windows_message('Error al cargar los usuarios.', 'error');
            }
        }
    });
}

function renderUserRow(item, index) {
    const isAdmin = item.ElevationTypeBool ? "checked='checked'" : "";

    return `
        <tr class="row-app">
            <td class="cell-app check-cell-app">
                <input id="check-table-${index}" type="checkbox" class="check-table-app selectUsers">
                <label for="check-table-${index}" class="label-cell"></label>
            </td>
            <td class="cell-app cell-principal Aliastbl" data-title="Alias">${item.Alias || ''}</td>
            <td class="cell-app Nametbl" data-title="Nombre">${item.Name || ''}</td>
            <td class="cell-app QtyWorkerstbl" data-title="Email">${item.Email || ''}</td>
            <td class="cell-app FormatCodeIdtbl" data-title="Formato regional">${item.FormatCodeId || ''}</td>
            <td class="cell-app CompanyDefaultIdtbl" data-title="Empresa predefinida">${item.CompanyDefaultId || ''}</td>
            <td class="cell-app" data-title="¿Administrador?">
                <label class="switch disabled">
                    <input type="checkbox" disabled ${isAdmin}>
                    <span class="slider round"></span>
                </label>
            </td>
        </tr>
    `;
}

function reinitUserEvents() {
    const checkAll = document.querySelector('#check-table-0');
    if (checkAll) checkAll.checked = false;

    const rows = document.querySelectorAll('.tbody-Table-user .row-app');
    rows.forEach(row => {
        row.addEventListener('dblclick', function(e) {
            if (e.target.type === 'checkbox') return;
            const cb = this.querySelector('.selectUsers');
            if (cb) {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            }
            const editBtn = document.querySelector('.EditUsers');
            if (editBtn) editBtn.click();
        });
    });

    if (typeof initUserViews === 'function') {
        initUserViews();
    }
}

function refreshUserTable() {
    if (userPagination) userPagination.refresh();
}

function resetUserPagination() {
    if (userPagination) userPagination.reset();
}
