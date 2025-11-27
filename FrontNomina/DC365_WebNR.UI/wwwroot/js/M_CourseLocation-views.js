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
 * @file M_CourseLocation-views.ts
 * @description Integración del sistema de vistas con el módulo de ubicación de cursos.
 */
(function initCourseLocationViews() {
    const w = window;
    const pageEl = document.getElementById('courselocation-page');
    if (!pageEl)
        return;
    const token = pageEl.dataset.token || '';
    const userRecId = parseInt(pageEl.dataset.user || '0', 10);
    const apiBase = '/api/v2.0';
    const allColumns = ['CourseLocationId', 'Name', 'Phone', 'Mail', 'Address', 'ContactName'];
    const defaultColumns = [...allColumns];
    const columnTitles = {
        'CourseLocationId': 'Id Ubicación',
        'Name': 'Nombre',
        'Phone': 'Teléfono',
        'Mail': 'Email',
        'Address': 'Dirección',
        'ContactName': 'Nombre del contacto'
    };
    let columnsManager = null;
    let viewsManager = null;
    if (w.GridColumnsManager) {
        columnsManager = new w.GridColumnsManager(allColumns, defaultColumns, applyColumnVisibility, (f) => columnTitles[f] || f);
    }
    if (w.GridViewsManager && token && userRecId > 0) {
        viewsManager = new w.GridViewsManager(apiBase, token, 'CourseLocation', userRecId, '');
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
            'CourseLocationId': 0, 'Name': 1, 'Phone': 2, 'Mail': 3, 'Address': 4, 'ContactName': 5
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTV9Db3Vyc2VMb2NhdGlvbi12aWV3cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL01fQ291cnNlTG9jYXRpb24tdmlld3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7OztHQUdHO0FBQ0gsQ0FBQyxTQUFTLHVCQUF1QjtJQUM3QixNQUFNLENBQUMsR0FBRyxNQUFhLENBQUM7SUFDeEIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzlELElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTztJQUVwQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7SUFDekMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzRCxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUM7SUFFNUIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0YsTUFBTSxjQUFjLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sWUFBWSxHQUEyQjtRQUN6QyxrQkFBa0IsRUFBRSxjQUFjO1FBQ2xDLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE1BQU0sRUFBRSxPQUFPO1FBQ2YsU0FBUyxFQUFFLFdBQVc7UUFDdEIsYUFBYSxFQUFFLHFCQUFxQjtLQUN2QyxDQUFDO0lBRUYsSUFBSSxjQUFjLEdBQVEsSUFBSSxDQUFDO0lBQy9CLElBQUksWUFBWSxHQUFRLElBQUksQ0FBQztJQUU3QixJQUFJLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3ZCLGNBQWMs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LENBQUMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIE1fQ291cnNlTG9jYXRpb24tdmlld3MudHNcclxuICogQGRlc2NyaXB0aW9uIEludGVncmFjacOzbiBkZWwgc2lzdGVtYSBkZSB2aXN0YXMgY29uIGVsIG3Ds2R1bG8gZGUgdWJpY2FjacOzbiBkZSBjdXJzb3MuXHJcbiAqL1xyXG4oZnVuY3Rpb24gaW5pdENvdXJzZUxvY2F0aW9uVmlld3MoKTogdm9pZCB7XHJcbiAgICBjb25zdCB3ID0gd2luZG93IGFzIGFueTtcclxuICAgIGNvbnN0IHBhZ2VFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3Vyc2Vsb2NhdGlvbi1wYWdlJyk7XHJcbiAgICBpZiAoIXBhZ2VFbCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHRva2VuID0gcGFnZUVsLmRhdGFzZXQudG9rZW4gfHwgJyc7XHJcbiAgICBjb25zdCB1c2VyUmVjSWQgPSBwYXJzZUludChwYWdlRWwuZGF0YXNldC51c2VyIHx8ICcwJywgMTApO1xyXG4gICAgY29uc3QgYXBpQmFzZSA9ICcvYXBpL3YyLjAnO1xyXG5cclxuICAgIGNvbnN0IGFsbENvbHVtbnMgPSBbJ0NvdXJzZUxvY2F0aW9uSWQnLCAnTmFtZScsICdQaG9uZScsICdNYWlsJywgJ0FkZHJlc3MnLCAnQ29udGFjdE5hbWUnXTtcclxuICAgIGNvbnN0IGRlZmF1bHRDb2x1bW5zID0gWy4uLmFsbENvbHVtbnNdO1xyXG4gICAgY29uc3QgY29sdW1uVGl0bGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgICAgICdDb3Vyc2VMb2NhdGlvbklkJzogJ0lkIFViaWNhY2nDs24nLFxyXG4gICAgICAgICdOYW1lJzogJ05vbWJyZScsXHJcbiAgICAgICAgJ1Bob25lJzogJ1RlbMOpZm9ubycsXHJcbiAgICAgICAgJ01haWwnOiAnRW1haWwnLFxyXG4gICAgICAgICdBZGRyZXNzJzogJ0RpcmVjY2nDs24nLFxyXG4gICAgICAgICdDb250YWN0TmFtZSc6ICdOb21icmUgZGVsIGNvbnRhY3RvJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY29sdW1uc01hbmFnZXI6IGFueSA9IG51bGw7XHJcbiAgICBsZXQgdmlld3NNYW5hZ2VyOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIGlmICh3LkdyaWRDb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgIGNvbHVtbnNNYW5hZ2VyID0gbmV3IHcuR3JpZENvbHVtbnNNYW5hZ2VyKGFsbENvbHVtbnMsIGRlZmF1bHRDb2x1bW5zLCBhcHBseUNvbHVtblZpc2liaWxpdHksIChmOiBzdHJpbmcpID0+IGNvbHVtblRpdGxlc1tmXSB8fCBmKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAody5HcmlkVmlld3NNYW5hZ2VyICYmIHRva2VuICYmIHVzZXJSZWNJZCA+IDApIHtcclxuICAgICAgICB2aWV3c01hbmFnZXIgPSBuZXcgdy5HcmlkVmlld3NNYW5hZ2VyKGFwaUJhc2UsIHRva2VuLCAnQ291cnNlTG9jYXRpb24nLCB1c2VyUmVjSWQsICcnKTtcclxuICAgICAgICB2aWV3c01hbmFnZXIuaW5pdGlhbGl6ZSgpLnRoZW4oKGNvbmZpZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ3MubGVuZ3RoID4gMCAmJiBjb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uc01hbmFnZXIuYXBwbHlDb2x1bW5Db25maWcoY29uZmlncyk7XHJcbiAgICAgICAgICAgICAgICBhcHBseUNvbHVtblZpc2liaWxpdHkoY29sdW1uc01hbmFnZXIuZ2V0VmlzaWJsZUNvbHVtbnMoKSk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ0bk1hbmFnZUNvbHVtbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW1hbmFnZS1jb2x1bW5zJyk7XHJcbiAgICBpZiAoYnRuTWFuYWdlQ29sdW1ucykge1xyXG4gICAgICAgIGJ0bk1hbmFnZUNvbHVtbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGNvbHVtbnNNYW5hZ2VyPy5zaG93Q29sdW1uc01vZGFsKCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAodGFyZ2V0LmlkID09PSAnYnRuLWFwcGx5LWNvbHVtbnMnKSB7XHJcbiAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyPy5hcHBseUNvbHVtbnMoKTtcclxuICAgICAgICAgICAgKCQgYXMgYW55KSgnI21vZGFsLW1hbmFnZS1jb2x1bW5zJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgaWYgKHZpZXdzTWFuYWdlcj8uaGFzQ3VycmVudFZpZXcoKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1zYXZlLXZpZXctY2hhbmdlcycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0bikgYnRuLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGJ0bk5ld1ZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy12aWV3Jyk7XHJcbiAgICBpZiAoYnRuTmV3Vmlldykge1xyXG4gICAgICAgIGJ0bk5ld1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctbmFtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dCkgaW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgKCQgYXMgYW55KSgnI21vZGFsLXNhdmUtdmlldycpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnRuQ29uZmlybVNhdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWNvbmZpcm0tc2F2ZS12aWV3Jyk7XHJcbiAgICBpZiAoYnRuQ29uZmlybVNhdmUpIHtcclxuICAgICAgICBidG5Db25maXJtU2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1uYW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IChpbnB1dD8udmFsdWUgfHwgJycpLnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKCFuYW1lKSB7IHcud2luZG93c19tZXNzYWdlPy4oJ0luZ3Jlc2UgdW4gbm9tYnJlIHBhcmEgbGEgdmlzdGEnLCAnZXJyb3InKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGlmICh2aWV3c01hbmFnZXIgJiYgY29sdW1uc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzRGVmYXVsdCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1pcy1kZWZhdWx0JykgYXMgSFRNTElucHV0RWxlbWVudCk/LmNoZWNrZWQgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1B1YmxpYyA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1pcy1wdWJsaWMnKSBhcyBIVE1MSW5wdXRFbGVtZW50KT8uY2hlY2tlZCB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgdmlld3NNYW5hZ2VyLnNhdmVWaWV3KG5hbWUsIGNvbHVtbnNNYW5hZ2VyLmdldEN1cnJlbnRDb2x1bW5Db25maWcoKSwgaXNEZWZhdWx0LCBpc1B1YmxpYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAob2spIHsgKCQgYXMgYW55KSgnI21vZGFsLXNhdmUtdmlldycpLm1vZGFsKCdoaWRlJyk7IHVwZGF0ZVZpZXdzRHJvcGRvd24oKTsgdXBkYXRlQ3VycmVudFZpZXdOYW1lKCk7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ0blNhdmVDaGFuZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1zYXZlLXZpZXctY2hhbmdlcycpO1xyXG4gICAgaWYgKGJ0blNhdmVDaGFuZ2VzKSB7XHJcbiAgICAgICAgYnRuU2F2ZUNoYW5nZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmICh2aWV3c01hbmFnZXIgJiYgY29sdW1uc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgdmlld3NNYW5hZ2VyLnVwZGF0ZVZpZXcoY29sdW1uc01hbmFnZXIuZ2V0Q3VycmVudENvbHVtbkNvbmZpZygpKTtcclxuICAgICAgICAgICAgICAgIGlmIChvaykgYnRuU2F2ZUNoYW5nZXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBhbmNob3IgPSB0YXJnZXQuY2xvc2VzdCgnW2RhdGEtdmlld10nKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAoIWFuY2hvcikgcmV0dXJuO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCB2aWV3SWQgPSBhbmNob3IuZGF0YXNldC52aWV3O1xyXG4gICAgICAgIGNvbnN0IGJ0blNhdmVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tc2F2ZS12aWV3LWNoYW5nZXMnKTtcclxuICAgICAgICBpZiAodmlld0lkID09PSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgY29sdW1uc01hbmFnZXI/LnJlc2V0VG9EZWZhdWx0KGRlZmF1bHRDb2x1bW5zKTtcclxuICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5KGRlZmF1bHRDb2x1bW5zKTtcclxuICAgICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudC12aWV3LW5hbWUnKTtcclxuICAgICAgICAgICAgaWYgKGVsKSBlbC50ZXh0Q29udGVudCA9ICdWaXN0YSBwb3IgZGVmZWN0byc7XHJcbiAgICAgICAgICAgIGlmIChidG5TYXZlRWwpIGJ0blNhdmVFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmlld3NNYW5hZ2VyICYmIGNvbHVtbnNNYW5hZ2VyICYmIHZpZXdJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb25maWdzID0gYXdhaXQgdmlld3NNYW5hZ2VyLmxvYWRWaWV3KHBhcnNlSW50KHZpZXdJZCwgMTApKTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zTWFuYWdlci5hcHBseUNvbHVtbkNvbmZpZyhjb25maWdzKTtcclxuICAgICAgICAgICAgICAgIGFwcGx5Q29sdW1uVmlzaWJpbGl0eShjb2x1bW5zTWFuYWdlci5nZXRWaXNpYmxlQ29sdW1ucygpKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0blNhdmVFbCkgYnRuU2F2ZUVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBhcHBseUNvbHVtblZpc2liaWxpdHkodmlzaWJsZTogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdNYWluVGFibGUnKTtcclxuICAgICAgICBpZiAoIXRhYmxlKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgaGVhZGVyVGV4dE1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IGNvbHVtblRpdGxlcztcclxuICAgICAgICBjb25zdCBjb2x1bW5JbmRleE1hcDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHtcclxuICAgICAgICAgICAgJ0NvdXJzZUxvY2F0aW9uSWQnOiAwLCAnTmFtZSc6IDEsICdQaG9uZSc6IDIsICdNYWlsJzogMywgJ0FkZHJlc3MnOiA0LCAnQ29udGFjdE5hbWUnOiA1XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBoZWFkZXJSb3cgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0aGVhZCB0cicpO1xyXG4gICAgICAgIGlmIChoZWFkZXJSb3cpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hDZWxsID0gaGVhZGVyUm93LnF1ZXJ5U2VsZWN0b3IoJy5jaGVjay1jZWxsLWFwcCcpO1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJDZWxscyA9IEFycmF5LmZyb20oaGVhZGVyUm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkOm5vdCguY2hlY2stY2VsbC1hcHApJykpO1xyXG4gICAgICAgICAgICBoZWFkZXJDZWxscy5mb3JFYWNoKGNlbGwgPT4gKGNlbGwgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG4gICAgICAgICAgICB2aXNpYmxlLmZvckVhY2goKGNvbE5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlclRleHQgPSBoZWFkZXJUZXh0TWFwW2NvbE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGhlYWRlckNlbGxzLmZpbmQoYyA9PiBjLnRleHRDb250ZW50Py50cmltKCkgPT09IGhlYWRlclRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHsgKGNlbGwgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnJzsgaGVhZGVyUm93LmFwcGVuZENoaWxkKGNlbGwpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tib3hDZWxsKSBoZWFkZXJSb3cuaW5zZXJ0QmVmb3JlKGNoZWNrYm94Q2VsbCwgaGVhZGVyUm93LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBib2R5Um93cyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyJyk7XHJcbiAgICAgICAgYm9keVJvd3MuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94Q2VsbCA9IHJvdy5xdWVyeVNlbGVjdG9yKCcuY2hlY2stY2VsbC1hcHAnKTtcclxuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBBcnJheS5mcm9tKHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZDpub3QoLmNoZWNrLWNlbGwtYXBwKScpKTtcclxuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuICAgICAgICAgICAgdmlzaWJsZS5mb3JFYWNoKChjb2xOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBjb2x1bW5JbmRleE1hcFtjb2xOYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChpZHggIT09IHVuZGVmaW5lZCAmJiBjZWxsc1tpZHhdKSB7IChjZWxsc1tpZHhdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJyc7IHJvdy5hcHBlbmRDaGlsZChjZWxsc1tpZHhdKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrYm94Q2VsbCkgcm93Lmluc2VydEJlZm9yZShjaGVja2JveENlbGwsIHJvdy5maXJzdENoaWxkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVWaWV3c0Ryb3Bkb3duKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdmlld3NNYW5hZ2VyKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVkLXZpZXdzLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgdmlld3MgPSB2aWV3c01hbmFnZXIuZ2V0QXZhaWxhYmxlVmlld3MoKTtcclxuICAgICAgICBpZiAodmlld3MubGVuZ3RoID09PSAwKSB7IGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJ0ZXh0LW11dGVkLXZpZXdzXCI+U2luIHZpc3RhcyBndWFyZGFkYXM8L3NwYW4+JzsgcmV0dXJuOyB9XHJcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcclxuICAgICAgICB2aWV3cy5mb3JFYWNoKCh2OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3Rhckljb24gPSB2LklzRGVmYXVsdCA/ICc8aSBjbGFzcz1cImZhIGZhLXN0YXJcIiBzdHlsZT1cImNvbG9yOiNmMGFkNGU7XCIgdGl0bGU9XCJWaXN0YSBwcmVkZXRlcm1pbmFkYVwiPjwvaT4nIDogYDxpIGNsYXNzPVwiZmEgZmEtc3Rhci1vIGJ0bi1zZXQtZGVmYXVsdFwiIGRhdGEtdmlldy1pZD1cIiR7di5SZWNJZH1cIiBzdHlsZT1cImNvbG9yOiM5OTk7IGN1cnNvcjpwb2ludGVyO1wiIHRpdGxlPVwiRXN0YWJsZWNlciBjb21vIHByZWRldGVybWluYWRhXCI+PC9pPmA7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJzYXZlZC12aWV3LWl0ZW1cIiBzdHlsZT1cImRpc3BsYXk6ZmxleDsganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOmNlbnRlcjsgcGFkZGluZzo1cHggMTVweDtcIj48YSBocmVmPVwiI1wiIGRhdGEtdmlldz1cIiR7di5SZWNJZH1cIiBzdHlsZT1cImZsZXg6MTsgY29sb3I6IzMzMzsgdGV4dC1kZWNvcmF0aW9uOm5vbmU7XCI+JHt2LlZpZXdOYW1lfTwvYT4ke3N0YXJJY29ufTwvZGl2PmA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tc2V0LWRlZmF1bHQnKS5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdJZCA9IHBhcnNlSW50KChidG4gYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmlld0lkIHx8ICcwJywgMTApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdJZCA+IDAgJiYgdmlld3NNYW5hZ2VyKSB7IGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCB2aWV3c01hbmFnZXIuc2V0RGVmYXVsdFZpZXcodmlld0lkKTsgaWYgKHN1Y2Nlc3MpIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF2aWV3c01hbmFnZXIpIHJldHVybjtcclxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50LXZpZXctbmFtZScpO1xyXG4gICAgICAgIGlmIChlbCkgZWwudGV4dENvbnRlbnQgPSB2aWV3c01hbmFnZXIuZ2V0Q3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICB9XHJcbn0pKCk7XHJcbiJdfQ==