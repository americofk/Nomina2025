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
 * @file M_Instructor-views.ts
 * @description Integración del sistema de vistas con el módulo de instructores.
 */
(function initInstructorViews() {
    const w = window;
    const pageEl = document.getElementById('instructor-page');
    if (!pageEl)
        return;
    const token = pageEl.dataset.token || '';
    const userRecId = parseInt(pageEl.dataset.user || '0', 10);
    const apiBase = '/api/v2.0';
    const allColumns = ['InstructorId', 'Name', 'Phone', 'Mail', 'Company', 'Comment'];
    const defaultColumns = [...allColumns];
    const columnTitles = {
        'InstructorId': 'Código',
        'Name': 'Nombre',
        'Phone': 'Teléfono',
        'Mail': 'Email',
        'Company': 'Empresa',
        'Comment': 'Comentario'
    };
    let columnsManager = null;
    let viewsManager = null;
    if (w.GridColumnsManager) {
        columnsManager = new w.GridColumnsManager(allColumns, defaultColumns, applyColumnVisibility, (f) => columnTitles[f] || f);
    }
    if (w.GridViewsManager && token && userRecId > 0) {
        viewsManager = new w.GridViewsManager(apiBase, token, 'Instructor', userRecId, '');
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
            'InstructorId': 0, 'Name': 1, 'Phone': 2, 'Mail': 3, 'Company': 4, 'Comment': 5
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTV9JbnN0cnVjdG9yLXZpZXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvTV9JbnN0cnVjdG9yLXZpZXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7R0FHRztBQUNILENBQUMsU0FBUyxtQkFBbUI7SUFDekIsTUFBTSxDQUFDLEdBQUcsTUFBYSxDQUFDO0lBQ3hCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMxRCxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU87SUFFcEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO0lBQ3pDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0QsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDO0lBRTVCLE1BQU0sVUFBVSxHQUFHLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRixNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7SUFDdkMsTUFBTSxZQUFZLEdBQTJCO1FBQ3pDLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxVQUFVO1FBQ25CLE1BQU0sRUFBRSxPQUFPO1FBQ2YsU0FBUyxFQUFFLFNBQVM7UUFDcEIsU0FBUyxFQUFFLFlBQVk7S0FDMUIsQ0FBQztJQUVGLElBQUksY0FBYyxHQUFRLElBQUksQ0FBQztJQUMvQixJQUFJLFlBQVksR0FBUSxJQUFJLENBQUM7SUFFN0IsSUFBSSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUN2QixjQUFjLEdBQUcsSUFBSSxDQUFD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c291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIE1fSW5zdHJ1Y3Rvci12aWV3cy50c1xyXG4gKiBAZGVzY3JpcHRpb24gSW50ZWdyYWNpw7NuIGRlbCBzaXN0ZW1hIGRlIHZpc3RhcyBjb24gZWwgbcOzZHVsbyBkZSBpbnN0cnVjdG9yZXMuXHJcbiAqL1xyXG4oZnVuY3Rpb24gaW5pdEluc3RydWN0b3JWaWV3cygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHcgPSB3aW5kb3cgYXMgYW55O1xyXG4gICAgY29uc3QgcGFnZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0b3ItcGFnZScpO1xyXG4gICAgaWYgKCFwYWdlRWwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0b2tlbiA9IHBhZ2VFbC5kYXRhc2V0LnRva2VuIHx8ICcnO1xyXG4gICAgY29uc3QgdXNlclJlY0lkID0gcGFyc2VJbnQocGFnZUVsLmRhdGFzZXQudXNlciB8fCAnMCcsIDEwKTtcclxuICAgIGNvbnN0IGFwaUJhc2UgPSAnL2FwaS92Mi4wJztcclxuXHJcbiAgICBjb25zdCBhbGxDb2x1bW5zID0gWydJbnN0cnVjdG9ySWQnLCAnTmFtZScsICdQaG9uZScsICdNYWlsJywgJ0NvbXBhbnknLCAnQ29tbWVudCddO1xyXG4gICAgY29uc3QgZGVmYXVsdENvbHVtbnMgPSBbLi4uYWxsQ29sdW1uc107XHJcbiAgICBjb25zdCBjb2x1bW5UaXRsZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAgICAgJ0luc3RydWN0b3JJZCc6ICdDw7NkaWdvJyxcclxuICAgICAgICAnTmFtZSc6ICdOb21icmUnLFxyXG4gICAgICAgICdQaG9uZSc6ICdUZWzDqWZvbm8nLFxyXG4gICAgICAgICdNYWlsJzogJ0VtYWlsJyxcclxuICAgICAgICAnQ29tcGFueSc6ICdFbXByZXNhJyxcclxuICAgICAgICAnQ29tbWVudCc6ICdDb21lbnRhcmlvJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY29sdW1uc01hbmFnZXI6IGFueSA9IG51bGw7XHJcbiAgICBsZXQgdmlld3NNYW5hZ2VyOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIGlmICh3LkdyaWRDb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgIGNvbHVtbnNNYW5hZ2VyID0gbmV3IHcuR3JpZENvbHVtbnNNYW5hZ2VyKGFsbENvbHVtbnMsIGRlZmF1bHRDb2x1bW5zLCBhcHBseUNvbHVtblZpc2liaWxpdHksIChmOiBzdHJpbmcpID0+IGNvbHVtblRpdGxlc1tmXSB8fCBmKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAody5HcmlkVmlld3NNYW5hZ2VyICYmIHRva2VuICYmIHVzZXJSZWNJZCA+IDApIHtcclxuICAgICAgICB2aWV3c01hbmFnZXIgPSBuZXcgdy5HcmlkVmlld3NNYW5hZ2VyKGFwaUJhc2UsIHRva2VuLCAnSW5zdHJ1Y3RvcicsIHVzZXJSZWNJZCwgJycpO1xyXG4gICAgICAgIHZpZXdzTWFuYWdlci5pbml0aWFsaXplKCkudGhlbigoY29uZmlnczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdXBkYXRlVmlld3NEcm9wZG93bigpO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlncy5sZW5ndGggPiAwICYmIGNvbHVtbnNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zTWFuYWdlci5hcHBseUNvbHVtbkNvbmZpZyhjb25maWdzKTtcclxuICAgICAgICAgICAgICAgIGFwcGx5Q29sdW1uVmlzaWJpbGl0eShjb2x1bW5zTWFuYWdlci5nZXRWaXNpYmxlQ29sdW1ucygpKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnRuTWFuYWdlQ29sdW1ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbWFuYWdlLWNvbHVtbnMnKTtcclxuICAgIGlmIChidG5NYW5hZ2VDb2x1bW5zKSB7XHJcbiAgICAgICAgYnRuTWFuYWdlQ29sdW1ucy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgY29sdW1uc01hbmFnZXI/LnNob3dDb2x1bW5zTW9kYWwoKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICh0YXJnZXQuaWQgPT09ICdidG4tYXBwbHktY29sdW1ucycpIHtcclxuICAgICAgICAgICAgY29sdW1uc01hbmFnZXI/LmFwcGx5Q29sdW1ucygpO1xyXG4gICAgICAgICAgICAoJCBhcyBhbnkpKCcjbW9kYWwtbWFuYWdlLWNvbHVtbnMnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICBpZiAodmlld3NNYW5hZ2VyPy5oYXNDdXJyZW50VmlldygpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXNhdmUtdmlldy1jaGFuZ2VzJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuKSBidG4uc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYnRuTmV3VmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbmV3LXZpZXcnKTtcclxuICAgIGlmIChidG5OZXdWaWV3KSB7XHJcbiAgICAgICAgYnRuTmV3Vmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1uYW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKGlucHV0KSBpbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAoJCBhcyBhbnkpKCcjbW9kYWwtc2F2ZS12aWV3JykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBidG5Db25maXJtU2F2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tY29uZmlybS1zYXZlLXZpZXcnKTtcclxuICAgIGlmIChidG5Db25maXJtU2F2ZSkge1xyXG4gICAgICAgIGJ0bkNvbmZpcm1TYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LW5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gKGlucHV0Py52YWx1ZSB8fCAnJykudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHsgdy53aW5kb3dzX21lc3NhZ2U/LignSW5ncmVzZSB1biBub21icmUgcGFyYSBsYSB2aXN0YScsICdlcnJvcicpOyByZXR1cm47IH1cclxuICAgICAgICAgICAgaWYgKHZpZXdzTWFuYWdlciAmJiBjb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNEZWZhdWx0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LWlzLWRlZmF1bHQnKSBhcyBIVE1MSW5wdXRFbGVtZW50KT8uY2hlY2tlZCB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzUHVibGljID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LWlzLXB1YmxpYycpIGFzIEhUTUxJbnB1dEVsZW1lbnQpPy5jaGVja2VkIHx8IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCB2aWV3c01hbmFnZXIuc2F2ZVZpZXcobmFtZSwgY29sdW1uc01hbmFnZXIuZ2V0Q3VycmVudENvbHVtbkNvbmZpZygpLCBpc0RlZmF1bHQsIGlzUHVibGljKTtcclxuICAgICAgICAgICAgICAgIGlmIChvaykgeyAoJCBhcyBhbnkpKCcjbW9kYWwtc2F2ZS12aWV3JykubW9kYWwoJ2hpZGUnKTsgdXBkYXRlVmlld3NEcm9wZG93bigpOyB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnRuU2F2ZUNoYW5nZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXNhdmUtdmlldy1jaGFuZ2VzJyk7XHJcbiAgICBpZiAoYnRuU2F2ZUNoYW5nZXMpIHtcclxuICAgICAgICBidG5TYXZlQ2hhbmdlcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKHZpZXdzTWFuYWdlciAmJiBjb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCB2aWV3c01hbmFnZXIudXBkYXRlVmlldyhjb2x1bW5zTWFuYWdlci5nZXRDdXJyZW50Q29sdW1uQ29uZmlnKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9rKSBidG5TYXZlQ2hhbmdlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGFuY2hvciA9IHRhcmdldC5jbG9zZXN0KCdbZGF0YS12aWV3XScpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICghYW5jaG9yKSByZXR1cm47XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXdJZCA9IGFuY2hvci5kYXRhc2V0LnZpZXc7XHJcbiAgICAgICAgY29uc3QgYnRuU2F2ZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1zYXZlLXZpZXctY2hhbmdlcycpO1xyXG4gICAgICAgIGlmICh2aWV3SWQgPT09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICBjb2x1bW5zTWFuYWdlcj8ucmVzZXRUb0RlZmF1bHQoZGVmYXVsdENvbHVtbnMpO1xyXG4gICAgICAgICAgICBhcHBseUNvbHVtblZpc2liaWxpdHkoZGVmYXVsdENvbHVtbnMpO1xyXG4gICAgICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50LXZpZXctbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAoZWwpIGVsLnRleHRDb250ZW50ID0gJ1Zpc3RhIHBvciBkZWZlY3RvJztcclxuICAgICAgICAgICAgaWYgKGJ0blNhdmVFbCkgYnRuU2F2ZUVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2aWV3c01hbmFnZXIgJiYgY29sdW1uc01hbmFnZXIgJiYgdmlld0lkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZ3MgPSBhd2FpdCB2aWV3c01hbmFnZXIubG9hZFZpZXcocGFyc2VJbnQodmlld0lkLCAxMCkpO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyLmFwcGx5Q29sdW1uQ29uZmlnKGNvbmZpZ3MpO1xyXG4gICAgICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5KGNvbHVtbnNNYW5hZ2VyLmdldFZpc2libGVDb2x1bW5zKCkpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlQ3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuU2F2ZUVsKSBidG5TYXZlRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFwcGx5Q29sdW1uVmlzaWJpbGl0eSh2aXNpYmxlOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ01haW5UYWJsZScpO1xyXG4gICAgICAgIGlmICghdGFibGUpIHJldHVybjtcclxuICAgICAgICBjb25zdCBoZWFkZXJUZXh0TWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0gY29sdW1uVGl0bGVzO1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbkluZGV4TWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge1xyXG4gICAgICAgICAgICAnSW5zdHJ1Y3RvcklkJzogMCwgJ05hbWUnOiAxLCAnUGhvbmUnOiAyLCAnTWFpbCc6IDMsICdDb21wYW55JzogNCwgJ0NvbW1lbnQnOiA1XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBoZWFkZXJSb3cgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0aGVhZCB0cicpO1xyXG4gICAgICAgIGlmIChoZWFkZXJSb3cpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hDZWxsID0gaGVhZGVyUm93LnF1ZXJ5U2VsZWN0b3IoJy5jaGVjay1jZWxsLWFwcCcpO1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJDZWxscyA9IEFycmF5LmZyb20oaGVhZGVyUm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkOm5vdCguY2hlY2stY2VsbC1hcHApJykpO1xyXG4gICAgICAgICAgICBoZWFkZXJDZWxscy5mb3JFYWNoKGNlbGwgPT4gKGNlbGwgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG4gICAgICAgICAgICB2aXNpYmxlLmZvckVhY2goKGNvbE5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlclRleHQgPSBoZWFkZXJUZXh0TWFwW2NvbE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGhlYWRlckNlbGxzLmZpbmQoYyA9PiBjLnRleHRDb250ZW50Py50cmltKCkgPT09IGhlYWRlclRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHsgKGNlbGwgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnJzsgaGVhZGVyUm93LmFwcGVuZENoaWxkKGNlbGwpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tib3hDZWxsKSBoZWFkZXJSb3cuaW5zZXJ0QmVmb3JlKGNoZWNrYm94Q2VsbCwgaGVhZGVyUm93LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBib2R5Um93cyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyJyk7XHJcbiAgICAgICAgYm9keVJvd3MuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94Q2VsbCA9IHJvdy5xdWVyeVNlbGVjdG9yKCcuY2hlY2stY2VsbC1hcHAnKTtcclxuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBBcnJheS5mcm9tKHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZDpub3QoLmNoZWNrLWNlbGwtYXBwKScpKTtcclxuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuICAgICAgICAgICAgdmlzaWJsZS5mb3JFYWNoKChjb2xOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBjb2x1bW5JbmRleE1hcFtjb2xOYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChpZHggIT09IHVuZGVmaW5lZCAmJiBjZWxsc1tpZHhdKSB7IChjZWxsc1tpZHhdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJyc7IHJvdy5hcHBlbmRDaGlsZChjZWxsc1tpZHhdKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrYm94Q2VsbCkgcm93Lmluc2VydEJlZm9yZShjaGVja2JveENlbGwsIHJvdy5maXJzdENoaWxkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVWaWV3c0Ryb3Bkb3duKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdmlld3NNYW5hZ2VyKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVkLXZpZXdzLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgdmlld3MgPSB2aWV3c01hbmFnZXIuZ2V0QXZhaWxhYmxlVmlld3MoKTtcclxuICAgICAgICBpZiAodmlld3MubGVuZ3RoID09PSAwKSB7IGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJ0ZXh0LW11dGVkLXZpZXdzXCI+U2luIHZpc3RhcyBndWFyZGFkYXM8L3NwYW4+JzsgcmV0dXJuOyB9XHJcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcclxuICAgICAgICB2aWV3cy5mb3JFYWNoKCh2OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3Rhckljb24gPSB2LklzRGVmYXVsdCA/ICc8aSBjbGFzcz1cImZhIGZhLXN0YXJcIiBzdHlsZT1cImNvbG9yOiNmMGFkNGU7XCIgdGl0bGU9XCJWaXN0YSBwcmVkZXRlcm1pbmFkYVwiPjwvaT4nIDogYDxpIGNsYXNzPVwiZmEgZmEtc3Rhci1vIGJ0bi1zZXQtZGVmYXVsdFwiIGRhdGEtdmlldy1pZD1cIiR7di5SZWNJZH1cIiBzdHlsZT1cImNvbG9yOiM5OTk7IGN1cnNvcjpwb2ludGVyO1wiIHRpdGxlPVwiRXN0YWJsZWNlciBjb21vIHByZWRldGVybWluYWRhXCI+PC9pPmA7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJzYXZlZC12aWV3LWl0ZW1cIiBzdHlsZT1cImRpc3BsYXk6ZmxleDsganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOmNlbnRlcjsgcGFkZGluZzo1cHggMTVweDtcIj48YSBocmVmPVwiI1wiIGRhdGEtdmlldz1cIiR7di5SZWNJZH1cIiBzdHlsZT1cImZsZXg6MTsgY29sb3I6IzMzMzsgdGV4dC1kZWNvcmF0aW9uOm5vbmU7XCI+JHt2LlZpZXdOYW1lfTwvYT4ke3N0YXJJY29ufTwvZGl2PmA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tc2V0LWRlZmF1bHQnKS5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdJZCA9IHBhcnNlSW50KChidG4gYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmlld0lkIHx8ICcwJywgMTApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdJZCA+IDAgJiYgdmlld3NNYW5hZ2VyKSB7IGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCB2aWV3c01hbmFnZXIuc2V0RGVmYXVsdFZpZXcodmlld0lkKTsgaWYgKHN1Y2Nlc3MpIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF2aWV3c01hbmFnZXIpIHJldHVybjtcclxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50LXZpZXctbmFtZScpO1xyXG4gICAgICAgIGlmIChlbCkgZWwudGV4dENvbnRlbnQgPSB2aWV3c01hbmFnZXIuZ2V0Q3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICB9XHJcbn0pKCk7XHJcbiJdfQ==