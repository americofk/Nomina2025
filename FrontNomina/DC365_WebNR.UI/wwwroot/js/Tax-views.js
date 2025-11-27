var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @file Tax-views.ts
 * @description Integración del sistema de vistas con el módulo de impuestos.
 */
(function initTaxViews() {
    const w = window;
    const pageEl = document.getElementById('tax-page');
    if (!pageEl)
        return;
    const token = pageEl.dataset.token || '';
    const userRecId = parseInt(pageEl.dataset.user || '0', 10);
    const apiBase = '/api/v2.0';
    const allColumns = ['TaxId', 'Name', 'ProjId', 'ProjCategory', 'ValidFrom', 'ValidTo', 'Description'];
    const defaultColumns = [...allColumns];
    const columnTitles = {
        'TaxId': 'Id Código',
        'Name': 'Nombre del código',
        'ProjId': 'Proyecto',
        'ProjCategory': 'Categoría de proyecto',
        'ValidFrom': 'Válido desde',
        'ValidTo': 'Válido hasta',
        'Description': 'Descripción'
    };
    let columnsManager = null;
    let viewsManager = null;
    if (w.GridColumnsManager) {
        columnsManager = new w.GridColumnsManager(allColumns, defaultColumns, applyColumnVisibility, (f) => columnTitles[f] || f);
    }
    if (w.GridViewsManager && token && userRecId > 0) {
        viewsManager = new w.GridViewsManager(apiBase, token, 'Tax', userRecId, '');
        viewsManager.initialize().then((configs) => {
            updateViewsDropdown();
            if (configs.length > 0 && columnsManager) {
                columnsManager.applyColumnConfig(configs);
                applyColumnVisibility(columnsManager.getVisibleColumns());
                updateCurrentViewName();
            }
        });
    }
    const btnManageColumns = document.getElementById('btn-manage-columns');
    if (btnManageColumns) {
        btnManageColumns.addEventListener('click', (e) => { e.preventDefault(); columnsManager === null || columnsManager === void 0 ? void 0 : columnsManager.showColumnsModal(); });
    }
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'btn-apply-columns') {
            columnsManager === null || columnsManager === void 0 ? void 0 : columnsManager.applyColumns();
            $('#modal-manage-columns').modal('hide');
            if (viewsManager === null || viewsManager === void 0 ? void 0 : viewsManager.hasCurrentView()) {
                const btn = document.getElementById('btn-save-view-changes');
                if (btn)
                    btn.style.display = '';
            }
        }
    });
    const btnNewView = document.getElementById('btn-new-view');
    if (btnNewView) {
        btnNewView.addEventListener('click', (e) => {
            e.preventDefault();
            const input = document.getElementById('view-name');
            if (input)
                input.value = '';
            $('#modal-save-view').modal('show');
        });
    }
    const btnConfirmSave = document.getElementById('btn-confirm-save-view');
    if (btnConfirmSave) {
        btnConfirmSave.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const input = document.getElementById('view-name');
            const name = ((input === null || input === void 0 ? void 0 : input.value) || '').trim();
            if (!name) {
                (_a = w.windows_message) === null || _a === void 0 ? void 0 : _a.call(w, 'Ingrese un nombre para la vista', 'error');
                return;
            }
            if (viewsManager && columnsManager) {
                const isDefault = ((_b = document.getElementById('view-is-default')) === null || _b === void 0 ? void 0 : _b.checked) || false;
                const isPublic = ((_c = document.getElementById('view-is-public')) === null || _c === void 0 ? void 0 : _c.checked) || false;
                const ok = yield viewsManager.saveView(name, columnsManager.getCurrentColumnConfig(), isDefault, isPublic);
                if (ok) {
                    $('#modal-save-view').modal('hide');
                    updateViewsDropdown();
                    updateCurrentViewName();
                }
            }
        }));
    }
    const btnSaveChanges = document.getElementById('btn-save-view-changes');
    if (btnSaveChanges) {
        btnSaveChanges.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            if (viewsManager && columnsManager) {
                const ok = yield viewsManager.updateView(columnsManager.getCurrentColumnConfig());
                if (ok)
                    btnSaveChanges.style.display = 'none';
            }
        }));
    }
    document.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
        const target = e.target;
        const anchor = target.closest('[data-view]');
        if (!anchor)
            return;
        e.preventDefault();
        const viewId = anchor.dataset.view;
        const btnSaveEl = document.getElementById('btn-save-view-changes');
        if (viewId === 'default') {
            columnsManager === null || columnsManager === void 0 ? void 0 : columnsManager.resetToDefault(defaultColumns);
            applyColumnVisibility(defaultColumns);
            const el = document.getElementById('current-view-name');
            if (el)
                el.textContent = 'Vista por defecto';
            if (btnSaveEl)
                btnSaveEl.style.display = 'none';
        }
        else if (viewsManager && columnsManager && viewId) {
            const configs = yield viewsManager.loadView(parseInt(viewId, 10));
            if (configs.length) {
                columnsManager.applyColumnConfig(configs);
                applyColumnVisibility(columnsManager.getVisibleColumns());
                updateCurrentViewName();
                if (btnSaveEl)
                    btnSaveEl.style.display = 'none';
            }
        }
    }));
    function applyColumnVisibility(visible) {
        const table = document.getElementById('MainTable');
        if (!table)
            return;
        const headerTextMap = columnTitles;
        const columnIndexMap = {
            'TaxId': 0, 'Name': 1, 'ProjId': 2, 'ProjCategory': 3, 'ValidFrom': 4, 'ValidTo': 5, 'Description': 6
        };
        const headerRow = table.querySelector('thead tr');
        if (headerRow) {
            const checkboxCell = headerRow.querySelector('.check-cell-app');
            const headerCells = Array.from(headerRow.querySelectorAll('td:not(.check-cell-app)'));
            headerCells.forEach(cell => cell.style.display = 'none');
            visible.forEach((colName) => {
                const headerText = headerTextMap[colName];
                const cell = headerCells.find(c => { var _a; return ((_a = c.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === headerText; });
                if (cell) {
                    cell.style.display = '';
                    headerRow.appendChild(cell);
                }
            });
            if (checkboxCell)
                headerRow.insertBefore(checkboxCell, headerRow.firstChild);
        }
        const bodyRows = table.querySelectorAll('tbody tr');
        bodyRows.forEach((row) => {
            const checkboxCell = row.querySelector('.check-cell-app');
            const cells = Array.from(row.querySelectorAll('td:not(.check-cell-app)'));
            cells.forEach(cell => cell.style.display = 'none');
            visible.forEach((colName) => {
                const idx = columnIndexMap[colName];
                if (idx !== undefined && cells[idx]) {
                    cells[idx].style.display = '';
                    row.appendChild(cells[idx]);
                }
            });
            if (checkboxCell)
                row.insertBefore(checkboxCell, row.firstChild);
        });
    }
    function updateViewsDropdown() {
        if (!viewsManager)
            return;
        const container = document.getElementById('saved-views-container');
        if (!container)
            return;
        const views = viewsManager.getAvailableViews();
        if (views.length === 0) {
            container.innerHTML = '<span class="text-muted-views">Sin vistas guardadas</span>';
            return;
        }
        let html = '';
        views.forEach((v) => {
            const starIcon = v.IsDefault ? '<i class="fa fa-star" style="color:#f0ad4e;" title="Vista predeterminada"></i>' : `<i class="fa fa-star-o btn-set-default" data-view-id="${v.RecId}" style="color:#999; cursor:pointer;" title="Establecer como predeterminada"></i>`;
            html += `<div class="saved-view-item" style="display:flex; justify-content:space-between; align-items:center; padding:5px 15px;"><a href="#" data-view="${v.RecId}" style="flex:1; color:#333; text-decoration:none;">${v.ViewName}</a>${starIcon}</div>`;
        });
        container.innerHTML = html;
        container.querySelectorAll('.btn-set-default').forEach((btn) => {
            btn.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                e.stopPropagation();
                const viewId = parseInt(btn.dataset.viewId || '0', 10);
                if (viewId > 0 && viewsManager) {
                    const success = yield viewsManager.setDefaultView(viewId);
                    if (success)
                        updateViewsDropdown();
                }
            }));
        });
    }
    function updateCurrentViewName() {
        if (!viewsManager)
            return;
        const el = document.getElementById('current-view-name');
        if (el)
            el.textContent = viewsManager.getCurrentViewName();
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGF4LXZpZXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvVGF4LXZpZXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7R0FHRztBQUNILENBQUMsU0FBUyxZQUFZO0lBQ2xCLE1BQU0sQ0FBQyxHQUFHLE1BQWEsQ0FBQztJQUN4QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTztJQUVwQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7SUFDekMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzRCxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUM7SUFFNUIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN0RyxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7SUFDdkMsTUFBTSxZQUFZLEdBQTJCO1FBQ3pDLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsUUFBUSxFQUFFLFVBQVU7UUFDcEIsY0FBYyxFQUFFLHVCQUF1QjtRQUN2QyxXQUFXLEVBQUUsY0FBYztRQUMzQixTQUFTLEVBQUUsY0FBYztRQUN6QixhQUFhLEVBQUUsYUFBYTtLQUMvQixDQUFDO0lBRUYsSUFBSSxjQUFjLEdBQVEsSUFBSSxDQUFDO0lBQy9CLElBQUksWUFBWSxHQUFRLElBQUksQ0FBQztJQUU3QixJQUFJLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3ZCLGNBQWMs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RCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZSBUYXgtdmlld3MudHNcclxuICogQGRlc2NyaXB0aW9uIEludGVncmFjacOzbiBkZWwgc2lzdGVtYSBkZSB2aXN0YXMgY29uIGVsIG3Ds2R1bG8gZGUgaW1wdWVzdG9zLlxyXG4gKi9cclxuKGZ1bmN0aW9uIGluaXRUYXhWaWV3cygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHcgPSB3aW5kb3cgYXMgYW55O1xyXG4gICAgY29uc3QgcGFnZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RheC1wYWdlJyk7XHJcbiAgICBpZiAoIXBhZ2VFbCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHRva2VuID0gcGFnZUVsLmRhdGFzZXQudG9rZW4gfHwgJyc7XHJcbiAgICBjb25zdCB1c2VyUmVjSWQgPSBwYXJzZUludChwYWdlRWwuZGF0YXNldC51c2VyIHx8ICcwJywgMTApO1xyXG4gICAgY29uc3QgYXBpQmFzZSA9ICcvYXBpL3YyLjAnO1xyXG5cclxuICAgIGNvbnN0IGFsbENvbHVtbnMgPSBbJ1RheElkJywgJ05hbWUnLCAnUHJvaklkJywgJ1Byb2pDYXRlZ29yeScsICdWYWxpZEZyb20nLCAnVmFsaWRUbycsICdEZXNjcmlwdGlvbiddO1xyXG4gICAgY29uc3QgZGVmYXVsdENvbHVtbnMgPSBbLi4uYWxsQ29sdW1uc107XHJcbiAgICBjb25zdCBjb2x1bW5UaXRsZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAgICAgJ1RheElkJzogJ0lkIEPDs2RpZ28nLFxyXG4gICAgICAgICdOYW1lJzogJ05vbWJyZSBkZWwgY8OzZGlnbycsXHJcbiAgICAgICAgJ1Byb2pJZCc6ICdQcm95ZWN0bycsXHJcbiAgICAgICAgJ1Byb2pDYXRlZ29yeSc6ICdDYXRlZ29yw61hIGRlIHByb3llY3RvJyxcclxuICAgICAgICAnVmFsaWRGcm9tJzogJ1bDoWxpZG8gZGVzZGUnLFxyXG4gICAgICAgICdWYWxpZFRvJzogJ1bDoWxpZG8gaGFzdGEnLFxyXG4gICAgICAgICdEZXNjcmlwdGlvbic6ICdEZXNjcmlwY2nDs24nXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBjb2x1bW5zTWFuYWdlcjogYW55ID0gbnVsbDtcclxuICAgIGxldCB2aWV3c01hbmFnZXI6IGFueSA9IG51bGw7XHJcblxyXG4gICAgaWYgKHcuR3JpZENvbHVtbnNNYW5hZ2VyKSB7XHJcbiAgICAgICAgY29sdW1uc01hbmFnZXIgPSBuZXcgdy5HcmlkQ29sdW1uc01hbmFnZXIoYWxsQ29sdW1ucywgZGVmYXVsdENvbHVtbnMsIGFwcGx5Q29sdW1uVmlzaWJpbGl0eSwgKGY6IHN0cmluZykgPT4gY29sdW1uVGl0bGVzW2ZdIHx8IGYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3LkdyaWRWaWV3c01hbmFnZXIgJiYgdG9rZW4gJiYgdXNlclJlY0lkID4gMCkge1xyXG4gICAgICAgIHZpZXdzTWFuYWdlciA9IG5ldyB3LkdyaWRWaWV3c01hbmFnZXIoYXBpQmFzZSwgdG9rZW4sICdUYXgnLCB1c2VyUmVjSWQsICcnKTtcclxuICAgICAgICB2aWV3c01hbmFnZXIuaW5pdGlhbGl6ZSgpLnRoZW4oKGNvbmZpZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ3MubGVuZ3RoID4gMCAmJiBjb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uc01hbmFnZXIuYXBwbHlDb2x1bW5Db25maWcoY29uZmlncyk7XHJcbiAgICAgICAgICAgICAgICBhcHBseUNvbHVtblZpc2liaWxpdHkoY29sdW1uc01hbmFnZXIuZ2V0VmlzaWJsZUNvbHVtbnMoKSk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ0bk1hbmFnZUNvbHVtbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW1hbmFnZS1jb2x1bW5zJyk7XHJcbiAgICBpZiAoYnRuTWFuYWdlQ29sdW1ucykge1xyXG4gICAgICAgIGJ0bk1hbmFnZUNvbHVtbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGNvbHVtbnNNYW5hZ2VyPy5zaG93Q29sdW1uc01vZGFsKCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAodGFyZ2V0LmlkID09PSAnYnRuLWFwcGx5LWNvbHVtbnMnKSB7XHJcbiAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyPy5hcHBseUNvbHVtbnMoKTtcclxuICAgICAgICAgICAgKCQgYXMgYW55KSgnI21vZGFsLW1hbmFnZS1jb2x1bW5zJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgaWYgKHZpZXdzTWFuYWdlcj8uaGFzQ3VycmVudFZpZXcoKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1zYXZlLXZpZXctY2hhbmdlcycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0bikgYnRuLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGJ0bk5ld1ZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy12aWV3Jyk7XHJcbiAgICBpZiAoYnRuTmV3Vmlldykge1xyXG4gICAgICAgIGJ0bk5ld1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctbmFtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dCkgaW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgKCQgYXMgYW55KSgnI21vZGFsLXNhdmUtdmlldycpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnRuQ29uZmlybVNhdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWNvbmZpcm0tc2F2ZS12aWV3Jyk7XHJcbiAgICBpZiAoYnRuQ29uZmlybVNhdmUpIHtcclxuICAgICAgICBidG5Db25maXJtU2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1uYW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IChpbnB1dD8udmFsdWUgfHwgJycpLnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKCFuYW1lKSB7IHcud2luZG93c19tZXNzYWdlPy4oJ0luZ3Jlc2UgdW4gbm9tYnJlIHBhcmEgbGEgdmlzdGEnLCAnZXJyb3InKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGlmICh2aWV3c01hbmFnZXIgJiYgY29sdW1uc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzRGVmYXVsdCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1pcy1kZWZhdWx0JykgYXMgSFRNTElucHV0RWxlbWVudCk/LmNoZWNrZWQgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1B1YmxpYyA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1pcy1wdWJsaWMnKSBhcyBIVE1MSW5wdXRFbGVtZW50KT8uY2hlY2tlZCB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgdmlld3NNYW5hZ2VyLnNhdmVWaWV3KG5hbWUsIGNvbHVtbnNNYW5hZ2VyLmdldEN1cnJlbnRDb2x1bW5Db25maWcoKSwgaXNEZWZhdWx0LCBpc1B1YmxpYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAob2spIHsgKCQgYXMgYW55KSgnI21vZGFsLXNhdmUtdmlldycpLm1vZGFsKCdoaWRlJyk7IHVwZGF0ZVZpZXdzRHJvcGRvd24oKTsgdXBkYXRlQ3VycmVudFZpZXdOYW1lKCk7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ0blNhdmVDaGFuZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1zYXZlLXZpZXctY2hhbmdlcycpO1xyXG4gICAgaWYgKGJ0blNhdmVDaGFuZ2VzKSB7XHJcbiAgICAgICAgYnRuU2F2ZUNoYW5nZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmICh2aWV3c01hbmFnZXIgJiYgY29sdW1uc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgdmlld3NNYW5hZ2VyLnVwZGF0ZVZpZXcoY29sdW1uc01hbmFnZXIuZ2V0Q3VycmVudENvbHVtbkNvbmZpZygpKTtcclxuICAgICAgICAgICAgICAgIGlmIChvaykgYnRuU2F2ZUNoYW5nZXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBhbmNob3IgPSB0YXJnZXQuY2xvc2VzdCgnW2RhdGEtdmlld10nKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAoIWFuY2hvcikgcmV0dXJuO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCB2aWV3SWQgPSBhbmNob3IuZGF0YXNldC52aWV3O1xyXG4gICAgICAgIGNvbnN0IGJ0blNhdmVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tc2F2ZS12aWV3LWNoYW5nZXMnKTtcclxuICAgICAgICBpZiAodmlld0lkID09PSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgY29sdW1uc01hbmFnZXI/LnJlc2V0VG9EZWZhdWx0KGRlZmF1bHRDb2x1bW5zKTtcclxuICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5KGRlZmF1bHRDb2x1bW5zKTtcclxuICAgICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudC12aWV3LW5hbWUnKTtcclxuICAgICAgICAgICAgaWYgKGVsKSBlbC50ZXh0Q29udGVudCA9ICdWaXN0YSBwb3IgZGVmZWN0byc7XHJcbiAgICAgICAgICAgIGlmIChidG5TYXZlRWwpIGJ0blNhdmVFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmlld3NNYW5hZ2VyICYmIGNvbHVtbnNNYW5hZ2VyICYmIHZpZXdJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb25maWdzID0gYXdhaXQgdmlld3NNYW5hZ2VyLmxvYWRWaWV3KHBhcnNlSW50KHZpZXdJZCwgMTApKTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zTWFuYWdlci5hcHBseUNvbHVtbkNvbmZpZyhjb25maWdzKTtcclxuICAgICAgICAgICAgICAgIGFwcGx5Q29sdW1uVmlzaWJpbGl0eShjb2x1bW5zTWFuYWdlci5nZXRWaXNpYmxlQ29sdW1ucygpKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0blNhdmVFbCkgYnRuU2F2ZUVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBhcHBseUNvbHVtblZpc2liaWxpdHkodmlzaWJsZTogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdNYWluVGFibGUnKTtcclxuICAgICAgICBpZiAoIXRhYmxlKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgaGVhZGVyVGV4dE1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IGNvbHVtblRpdGxlcztcclxuICAgICAgICBjb25zdCBjb2x1bW5JbmRleE1hcDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHtcclxuICAgICAgICAgICAgJ1RheElkJzogMCwgJ05hbWUnOiAxLCAnUHJvaklkJzogMiwgJ1Byb2pDYXRlZ29yeSc6IDMsICdWYWxpZEZyb20nOiA0LCAnVmFsaWRUbyc6IDUsICdEZXNjcmlwdGlvbic6IDZcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGhlYWRlclJvdyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkIHRyJyk7XHJcbiAgICAgICAgaWYgKGhlYWRlclJvdykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja2JveENlbGwgPSBoZWFkZXJSb3cucXVlcnlTZWxlY3RvcignLmNoZWNrLWNlbGwtYXBwJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckNlbGxzID0gQXJyYXkuZnJvbShoZWFkZXJSb3cucXVlcnlTZWxlY3RvckFsbCgndGQ6bm90KC5jaGVjay1jZWxsLWFwcCknKSk7XHJcbiAgICAgICAgICAgIGhlYWRlckNlbGxzLmZvckVhY2goY2VsbCA9PiAoY2VsbCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcbiAgICAgICAgICAgIHZpc2libGUuZm9yRWFjaCgoY29sTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyVGV4dCA9IGhlYWRlclRleHRNYXBbY29sTmFtZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gaGVhZGVyQ2VsbHMuZmluZChjID0+IGMudGV4dENvbnRlbnQ/LnRyaW0oKSA9PT0gaGVhZGVyVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkgeyAoY2VsbCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICcnOyBoZWFkZXJSb3cuYXBwZW5kQ2hpbGQoY2VsbCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChjaGVja2JveENlbGwpIGhlYWRlclJvdy5pbnNlcnRCZWZvcmUoY2hlY2tib3hDZWxsLCBoZWFkZXJSb3cuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGJvZHlSb3dzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdHInKTtcclxuICAgICAgICBib2R5Um93cy5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hDZWxsID0gcm93LnF1ZXJ5U2VsZWN0b3IoJy5jaGVjay1jZWxsLWFwcCcpO1xyXG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IEFycmF5LmZyb20ocm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkOm5vdCguY2hlY2stY2VsbC1hcHApJykpO1xyXG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4gKGNlbGwgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG4gICAgICAgICAgICB2aXNpYmxlLmZvckVhY2goKGNvbE5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IGNvbHVtbkluZGV4TWFwW2NvbE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlkeCAhPT0gdW5kZWZpbmVkICYmIGNlbGxzW2lkeF0pIHsgKGNlbGxzW2lkeF0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnJzsgcm93LmFwcGVuZENoaWxkKGNlbGxzW2lkeF0pOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tib3hDZWxsKSByb3cuaW5zZXJ0QmVmb3JlKGNoZWNrYm94Q2VsbCwgcm93LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF2aWV3c01hbmFnZXIpIHJldHVybjtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZWQtdmlld3MtY29udGFpbmVyJyk7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcclxuICAgICAgICBjb25zdCB2aWV3cyA9IHZpZXdzTWFuYWdlci5nZXRBdmFpbGFibGVWaWV3cygpO1xyXG4gICAgICAgIGlmICh2aWV3cy5sZW5ndGggPT09IDApIHsgY29udGFpbmVyLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInRleHQtbXV0ZWQtdmlld3NcIj5TaW4gdmlzdGFzIGd1YXJkYWRhczwvc3Bhbj4nOyByZXR1cm47IH1cclxuICAgICAgICBsZXQgaHRtbCA9ICcnO1xyXG4gICAgICAgIHZpZXdzLmZvckVhY2goKHY6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFySWNvbiA9IHYuSXNEZWZhdWx0ID8gJzxpIGNsYXNzPVwiZmEgZmEtc3RhclwiIHN0eWxlPVwiY29sb3I6I2YwYWQ0ZTtcIiB0aXRsZT1cIlZpc3RhIHByZWRldGVybWluYWRhXCI+PC9pPicgOiBgPGkgY2xhc3M9XCJmYSBmYS1zdGFyLW8gYnRuLXNldC1kZWZhdWx0XCIgZGF0YS12aWV3LWlkPVwiJHt2LlJlY0lkfVwiIHN0eWxlPVwiY29sb3I6Izk5OTsgY3Vyc29yOnBvaW50ZXI7XCIgdGl0bGU9XCJFc3RhYmxlY2VyIGNvbW8gcHJlZGV0ZXJtaW5hZGFcIj48L2k+YDtcclxuICAgICAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cInNhdmVkLXZpZXctaXRlbVwiIHN0eWxlPVwiZGlzcGxheTpmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjsgYWxpZ24taXRlbXM6Y2VudGVyOyBwYWRkaW5nOjVweCAxNXB4O1wiPjxhIGhyZWY9XCIjXCIgZGF0YS12aWV3PVwiJHt2LlJlY0lkfVwiIHN0eWxlPVwiZmxleDoxOyBjb2xvcjojMzMzOyB0ZXh0LWRlY29yYXRpb246bm9uZTtcIj4ke3YuVmlld05hbWV9PC9hPiR7c3Rhckljb259PC9kaXY+YDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1zZXQtZGVmYXVsdCcpLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgdmlld0lkID0gcGFyc2VJbnQoKGJ0biBhcyBIVE1MRWxlbWVudCkuZGF0YXNldC52aWV3SWQgfHwgJzAnLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlld0lkID4gMCAmJiB2aWV3c01hbmFnZXIpIHsgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IHZpZXdzTWFuYWdlci5zZXREZWZhdWx0Vmlldyh2aWV3SWQpOyBpZiAoc3VjY2VzcykgdXBkYXRlVmlld3NEcm9wZG93bigpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXZpZXdzTWFuYWdlcikgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnQtdmlldy1uYW1lJyk7XHJcbiAgICAgICAgaWYgKGVsKSBlbC50ZXh0Q29udGVudCA9IHZpZXdzTWFuYWdlci5nZXRDdXJyZW50Vmlld05hbWUoKTtcclxuICAgIH1cclxufSkoKTtcclxuIl19