/**
 * @file M_Vacants-views.ts
 * @description Integración del sistema de vistas con el módulo de puestos vacantes.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function initVacantsViews() {
    const w = window;
    const pageEl = document.getElementById('vacants-page');
    if (!pageEl)
        return;
    const token = pageEl.dataset.token || '';
    const userRecId = parseInt(pageEl.dataset.user || '0', 10);
    const apiBase = '/api/v2.0';
    // Columnas del grid de puestos vacantes
    const allColumns = ['PositionId', 'PositionName', 'DepartmentId', 'JobId', 'NotifyPositionId', 'StartDate', 'EndDate', 'Description'];
    const defaultColumns = [...allColumns];
    const columnTitles = {
        'PositionId': 'Id puesto',
        'PositionName': 'Nombre del puesto',
        'DepartmentId': 'Departamento',
        'JobId': 'Cargo',
        'NotifyPositionId': 'Notifica al puesto',
        'StartDate': 'Fecha inicial',
        'EndDate': 'Fecha final',
        'Description': 'Descripción'
    };
    let columnsManager = null;
    let viewsManager = null;
    // Inicializar gestor de columnas
    if (w.GridColumnsManager) {
        columnsManager = new w.GridColumnsManager(allColumns, defaultColumns, applyColumnVisibility, (f) => columnTitles[f] || f);
    }
    // Inicializar gestor de vistas
    if (w.GridViewsManager && token && userRecId > 0) {
        viewsManager = new w.GridViewsManager(apiBase, token, 'Vacants', userRecId, '');
        viewsManager.initialize().then((configs) => {
            updateViewsDropdown();
            if (configs.length > 0 && columnsManager) {
                columnsManager.applyColumnConfig(configs);
                applyColumnVisibility(columnsManager.getVisibleColumns());
                updateCurrentViewName();
            }
        });
    }
    // Event: Abrir modal de columnas
    const btnManageColumns = document.getElementById('btn-manage-columns');
    if (btnManageColumns) {
        btnManageColumns.addEventListener('click', (e) => {
            e.preventDefault();
            columnsManager === null || columnsManager === void 0 ? void 0 : columnsManager.showColumnsModal();
        });
    }
    // Event: Aplicar columnas del modal
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'btn-apply-columns') {
            columnsManager === null || columnsManager === void 0 ? void 0 : columnsManager.applyColumns();
            $('#modal-manage-columns').modal('hide');
            if (viewsManager === null || viewsManager === void 0 ? void 0 : viewsManager.hasCurrentView()) {
                const btnSaveChanges = document.getElementById('btn-save-view-changes');
                if (btnSaveChanges)
                    btnSaveChanges.style.display = '';
            }
        }
    });
    // Event: Nueva vista
    const btnNewView = document.getElementById('btn-new-view');
    if (btnNewView) {
        btnNewView.addEventListener('click', (e) => {
            e.preventDefault();
            const viewNameInput = document.getElementById('view-name');
            if (viewNameInput)
                viewNameInput.value = '';
            $('#modal-save-view').modal('show');
        });
    }
    // Event: Confirmar guardar nueva vista
    const btnConfirmSave = document.getElementById('btn-confirm-save-view');
    if (btnConfirmSave) {
        btnConfirmSave.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const viewNameInput = document.getElementById('view-name');
            const name = ((viewNameInput === null || viewNameInput === void 0 ? void 0 : viewNameInput.value) || '').trim();
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
    // Event: Guardar cambios en vista actual
    const btnSaveChanges = document.getElementById('btn-save-view-changes');
    if (btnSaveChanges) {
        btnSaveChanges.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            if (viewsManager && columnsManager) {
                const ok = yield viewsManager.updateView(columnsManager.getCurrentColumnConfig());
                if (ok) {
                    btnSaveChanges.style.display = 'none';
                }
            }
        }));
    }
    // Event: Click en vista del dropdown
    document.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
        const target = e.target;
        const anchor = target.closest('[data-view]');
        if (!anchor)
            return;
        e.preventDefault();
        const viewId = anchor.dataset.view;
        const btnSaveChangesEl = document.getElementById('btn-save-view-changes');
        if (viewId === 'default') {
            columnsManager === null || columnsManager === void 0 ? void 0 : columnsManager.resetToDefault(defaultColumns);
            applyColumnVisibility(defaultColumns);
            const currentViewName = document.getElementById('current-view-name');
            if (currentViewName)
                currentViewName.textContent = 'Vista por defecto';
            if (btnSaveChangesEl)
                btnSaveChangesEl.style.display = 'none';
        }
        else if (viewsManager && columnsManager && viewId) {
            const configs = yield viewsManager.loadView(parseInt(viewId, 10));
            if (configs.length) {
                columnsManager.applyColumnConfig(configs);
                applyColumnVisibility(columnsManager.getVisibleColumns());
                updateCurrentViewName();
                if (btnSaveChangesEl)
                    btnSaveChangesEl.style.display = 'none';
            }
        }
    }));
    /**
     * Aplica la visibilidad y orden de columnas a la tabla.
     */
    function applyColumnVisibility(visible) {
        const table = document.getElementById('MainTable');
        if (!table)
            return;
        const headerTextMap = {
            'PositionId': 'Id puesto',
            'PositionName': 'Nombre del puesto',
            'DepartmentId': 'Departamento',
            'JobId': 'Cargo',
            'NotifyPositionId': 'Notifica al puesto',
            'StartDate': 'Fecha inicial',
            'EndDate': 'Fecha final',
            'Description': 'Descripción'
        };
        // Reordenar headers
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
            if (checkboxCell) {
                headerRow.insertBefore(checkboxCell, headerRow.firstChild);
            }
        }
        // Reordenar body rows - usando índice de columna basado en header
        const bodyRows = table.querySelectorAll('tbody tr');
        bodyRows.forEach((row) => {
            const checkboxCell = row.querySelector('.check-cell-app');
            const cells = Array.from(row.querySelectorAll('td:not(.check-cell-app)'));
            // Mapeo de índices: la tabla tiene columnas en orden fijo
            const columnIndexMap = {
                'PositionId': 0,
                'PositionName': 1,
                'DepartmentId': 2,
                'JobId': 3,
                'NotifyPositionId': 4,
                'StartDate': 5,
                'EndDate': 6,
                'Description': 7
            };
            cells.forEach(cell => cell.style.display = 'none');
            visible.forEach((colName) => {
                const idx = columnIndexMap[colName];
                if (idx !== undefined && cells[idx]) {
                    cells[idx].style.display = '';
                    row.appendChild(cells[idx]);
                }
            });
            if (checkboxCell) {
                row.insertBefore(checkboxCell, row.firstChild);
            }
        });
    }
    /**
     * Actualiza el dropdown con las vistas disponibles.
     */
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
            const starIcon = v.IsDefault
                ? '<i class="fa fa-star" style="color:#f0ad4e;" title="Vista predeterminada"></i>'
                : `<i class="fa fa-star-o btn-set-default" data-view-id="${v.RecId}" style="color:#999; cursor:pointer;" title="Establecer como predeterminada"></i>`;
            html += `<div class="saved-view-item" style="display:flex; justify-content:space-between; align-items:center; padding:5px 15px;">
                <a href="#" data-view="${v.RecId}" style="flex:1; color:#333; text-decoration:none;">${v.ViewName}</a>
                ${starIcon}
            </div>`;
        });
        container.innerHTML = html;
        container.querySelectorAll('.btn-set-default').forEach((btn) => {
            btn.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                e.stopPropagation();
                const viewId = parseInt(btn.dataset.viewId || '0', 10);
                if (viewId > 0 && viewsManager) {
                    const success = yield viewsManager.setDefaultView(viewId);
                    if (success) {
                        updateViewsDropdown();
                    }
                }
            }));
        });
    }
    /**
     * Actualiza el nombre de la vista actual.
     */
    function updateCurrentViewName() {
        if (!viewsManager)
            return;
        const el = document.getElementById('current-view-name');
        if (el)
            el.textContent = viewsManager.getCurrentViewName();
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTV9WYWNhbnRzLXZpZXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvTV9WYWNhbnRzLXZpZXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7Ozs7Ozs7OztBQUVILENBQUMsU0FBUyxnQkFBZ0I7SUFDdEIsTUFBTSxDQUFDLEdBQUcsTUFBYSxDQUFDO0lBQ3hCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdkQsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPO0lBRXBCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNELE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQztJQUU1Qix3Q0FBd0M7SUFDeEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN0SSxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7SUFDdkMsTUFBTSxZQUFZLEdBQTJCO1FBQ3pDLFlBQVksRUFBRSxXQUFXO1FBQ3pCLGNBQWMsRUFBRSxtQkFBbUI7UUFDbkMsY0FBYyxFQUFFLGNBQWM7UUFDOUIsT0FBTyxFQUFFLE9BQU87UUFDaEIsa0JBQWtCLEVBQUUsb0JBQW9CO1FBQ3hDLFdBQVcsRUFBRSxlQUFlO1FBQzVCLFNBQVMsRUFBRSxhQUFhO1FBQ3hCLGFBQWEsRUFBRSxhQUFhO0tBQy9CLENBQUM7SUFFRixJQUFJLGNBQWMsR0FBUSxJQUFJLENBQUM7SUFDL0IsSUFBSSxZQUFZLEdB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RUFBRSxDQUFDO2dCQUNuQixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3BCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBRSxHQUFtQixDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksWUFBWSxFQUFFLENBQUM7b0JBQzdCLE1BQU0sT0FBTyxHQUFHLE1BQU0sWUFBWSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDMUQsSUFBSSxPQUFPLEVBQUUsQ0FBQzt3QkFDVixtQkFBbUIsRUFBRSxDQUFDO29CQUMxQixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTLHFCQUFxQjtRQUMxQixJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDMUIsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3hELElBQUksRUFBRTtZQUFFLEVBQUUsQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDL0QsQ0FBQztBQUNMLENBQUMsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgTV9WYWNhbnRzLXZpZXdzLnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBJbnRlZ3JhY2nDs24gZGVsIHNpc3RlbWEgZGUgdmlzdGFzIGNvbiBlbCBtw7NkdWxvIGRlIHB1ZXN0b3MgdmFjYW50ZXMuXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uIGluaXRWYWNhbnRzVmlld3MoKTogdm9pZCB7XHJcbiAgICBjb25zdCB3ID0gd2luZG93IGFzIGFueTtcclxuICAgIGNvbnN0IHBhZ2VFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2YWNhbnRzLXBhZ2UnKTtcclxuICAgIGlmICghcGFnZUVsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdG9rZW4gPSBwYWdlRWwuZGF0YXNldC50b2tlbiB8fCAnJztcclxuICAgIGNvbnN0IHVzZXJSZWNJZCA9IHBhcnNlSW50KHBhZ2VFbC5kYXRhc2V0LnVzZXIgfHwgJzAnLCAxMCk7XHJcbiAgICBjb25zdCBhcGlCYXNlID0gJy9hcGkvdjIuMCc7XHJcblxyXG4gICAgLy8gQ29sdW1uYXMgZGVsIGdyaWQgZGUgcHVlc3RvcyB2YWNhbnRlc1xyXG4gICAgY29uc3QgYWxsQ29sdW1ucyA9IFsnUG9zaXRpb25JZCcsICdQb3NpdGlvbk5hbWUnLCAnRGVwYXJ0bWVudElkJywgJ0pvYklkJywgJ05vdGlmeVBvc2l0aW9uSWQnLCAnU3RhcnREYXRlJywgJ0VuZERhdGUnLCAnRGVzY3JpcHRpb24nXTtcclxuICAgIGNvbnN0IGRlZmF1bHRDb2x1bW5zID0gWy4uLmFsbENvbHVtbnNdO1xyXG4gICAgY29uc3QgY29sdW1uVGl0bGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgICAgICdQb3NpdGlvbklkJzogJ0lkIHB1ZXN0bycsXHJcbiAgICAgICAgJ1Bvc2l0aW9uTmFtZSc6ICdOb21icmUgZGVsIHB1ZXN0bycsXHJcbiAgICAgICAgJ0RlcGFydG1lbnRJZCc6ICdEZXBhcnRhbWVudG8nLFxyXG4gICAgICAgICdKb2JJZCc6ICdDYXJnbycsXHJcbiAgICAgICAgJ05vdGlmeVBvc2l0aW9uSWQnOiAnTm90aWZpY2EgYWwgcHVlc3RvJyxcclxuICAgICAgICAnU3RhcnREYXRlJzogJ0ZlY2hhIGluaWNpYWwnLFxyXG4gICAgICAgICdFbmREYXRlJzogJ0ZlY2hhIGZpbmFsJyxcclxuICAgICAgICAnRGVzY3JpcHRpb24nOiAnRGVzY3JpcGNpw7NuJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY29sdW1uc01hbmFnZXI6IGFueSA9IG51bGw7XHJcbiAgICBsZXQgdmlld3NNYW5hZ2VyOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vIEluaWNpYWxpemFyIGdlc3RvciBkZSBjb2x1bW5hc1xyXG4gICAgaWYgKHcuR3JpZENvbHVtbnNNYW5hZ2VyKSB7XHJcbiAgICAgICAgY29sdW1uc01hbmFnZXIgPSBuZXcgdy5HcmlkQ29sdW1uc01hbmFnZXIoXHJcbiAgICAgICAgICAgIGFsbENvbHVtbnMsXHJcbiAgICAgICAgICAgIGRlZmF1bHRDb2x1bW5zLFxyXG4gICAgICAgICAgICBhcHBseUNvbHVtblZpc2liaWxpdHksXHJcbiAgICAgICAgICAgIChmOiBzdHJpbmcpID0+IGNvbHVtblRpdGxlc1tmXSB8fCBmXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbmljaWFsaXphciBnZXN0b3IgZGUgdmlzdGFzXHJcbiAgICBpZiAody5HcmlkVmlld3NNYW5hZ2VyICYmIHRva2VuICYmIHVzZXJSZWNJZCA+IDApIHtcclxuICAgICAgICB2aWV3c01hbmFnZXIgPSBuZXcgdy5HcmlkVmlld3NNYW5hZ2VyKGFwaUJhc2UsIHRva2VuLCAnVmFjYW50cycsIHVzZXJSZWNJZCwgJycpO1xyXG4gICAgICAgIHZpZXdzTWFuYWdlci5pbml0aWFsaXplKCkudGhlbigoY29uZmlnczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdXBkYXRlVmlld3NEcm9wZG93bigpO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlncy5sZW5ndGggPiAwICYmIGNvbHVtbnNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zTWFuYWdlci5hcHBseUNvbHVtbkNvbmZpZyhjb25maWdzKTtcclxuICAgICAgICAgICAgICAgIGFwcGx5Q29sdW1uVmlzaWJpbGl0eShjb2x1bW5zTWFuYWdlci5nZXRWaXNpYmxlQ29sdW1ucygpKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IEFicmlyIG1vZGFsIGRlIGNvbHVtbmFzXHJcbiAgICBjb25zdCBidG5NYW5hZ2VDb2x1bW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1tYW5hZ2UtY29sdW1ucycpO1xyXG4gICAgaWYgKGJ0bk1hbmFnZUNvbHVtbnMpIHtcclxuICAgICAgICBidG5NYW5hZ2VDb2x1bW5zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb2x1bW5zTWFuYWdlcj8uc2hvd0NvbHVtbnNNb2RhbCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEV2ZW50OiBBcGxpY2FyIGNvbHVtbmFzIGRlbCBtb2RhbFxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICh0YXJnZXQuaWQgPT09ICdidG4tYXBwbHktY29sdW1ucycpIHtcclxuICAgICAgICAgICAgY29sdW1uc01hbmFnZXI/LmFwcGx5Q29sdW1ucygpO1xyXG4gICAgICAgICAgICAoJCBhcyBhbnkpKCcjbW9kYWwtbWFuYWdlLWNvbHVtbnMnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICBpZiAodmlld3NNYW5hZ2VyPy5oYXNDdXJyZW50VmlldygpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidG5TYXZlQ2hhbmdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tc2F2ZS12aWV3LWNoYW5nZXMnKTtcclxuICAgICAgICAgICAgICAgIGlmIChidG5TYXZlQ2hhbmdlcykgYnRuU2F2ZUNoYW5nZXMuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRXZlbnQ6IE51ZXZhIHZpc3RhXHJcbiAgICBjb25zdCBidG5OZXdWaWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1uZXctdmlldycpO1xyXG4gICAgaWYgKGJ0bk5ld1ZpZXcpIHtcclxuICAgICAgICBidG5OZXdWaWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctbmFtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmICh2aWV3TmFtZUlucHV0KSB2aWV3TmFtZUlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICgkIGFzIGFueSkoJyNtb2RhbC1zYXZlLXZpZXcnKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEV2ZW50OiBDb25maXJtYXIgZ3VhcmRhciBudWV2YSB2aXN0YVxyXG4gICAgY29uc3QgYnRuQ29uZmlybVNhdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLWNvbmZpcm0tc2F2ZS12aWV3Jyk7XHJcbiAgICBpZiAoYnRuQ29uZmlybVNhdmUpIHtcclxuICAgICAgICBidG5Db25maXJtU2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgdmlld05hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LW5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gKHZpZXdOYW1lSW5wdXQ/LnZhbHVlIHx8ICcnKS50cmltKCk7XHJcbiAgICAgICAgICAgIGlmICghbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdy53aW5kb3dzX21lc3NhZ2U/LignSW5ncmVzZSB1biBub21icmUgcGFyYSBsYSB2aXN0YScsICdlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2aWV3c01hbmFnZXIgJiYgY29sdW1uc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzRGVmYXVsdCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1pcy1kZWZhdWx0JykgYXMgSFRNTElucHV0RWxlbWVudCk/LmNoZWNrZWQgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1B1YmxpYyA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1pcy1wdWJsaWMnKSBhcyBIVE1MSW5wdXRFbGVtZW50KT8uY2hlY2tlZCB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgdmlld3NNYW5hZ2VyLnNhdmVWaWV3KG5hbWUsIGNvbHVtbnNNYW5hZ2VyLmdldEN1cnJlbnRDb2x1bW5Db25maWcoKSwgaXNEZWZhdWx0LCBpc1B1YmxpYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgICAgICAgICAoJCBhcyBhbnkpKCcjbW9kYWwtc2F2ZS12aWV3JykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVWaWV3c0Ryb3Bkb3duKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFdmVudDogR3VhcmRhciBjYW1iaW9zIGVuIHZpc3RhIGFjdHVhbFxyXG4gICAgY29uc3QgYnRuU2F2ZUNoYW5nZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXNhdmUtdmlldy1jaGFuZ2VzJyk7XHJcbiAgICBpZiAoYnRuU2F2ZUNoYW5nZXMpIHtcclxuICAgICAgICBidG5TYXZlQ2hhbmdlcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKHZpZXdzTWFuYWdlciAmJiBjb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCB2aWV3c01hbmFnZXIudXBkYXRlVmlldyhjb2x1bW5zTWFuYWdlci5nZXRDdXJyZW50Q29sdW1uQ29uZmlnKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuU2F2ZUNoYW5nZXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEV2ZW50OiBDbGljayBlbiB2aXN0YSBkZWwgZHJvcGRvd25cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBhbmNob3IgPSB0YXJnZXQuY2xvc2VzdCgnW2RhdGEtdmlld10nKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAoIWFuY2hvcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3Qgdmlld0lkID0gYW5jaG9yLmRhdGFzZXQudmlldztcclxuICAgICAgICBjb25zdCBidG5TYXZlQ2hhbmdlc0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1zYXZlLXZpZXctY2hhbmdlcycpO1xyXG5cclxuICAgICAgICBpZiAodmlld0lkID09PSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgY29sdW1uc01hbmFnZXI/LnJlc2V0VG9EZWZhdWx0KGRlZmF1bHRDb2x1bW5zKTtcclxuICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5KGRlZmF1bHRDb2x1bW5zKTtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFZpZXdOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnQtdmlldy1uYW1lJyk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Vmlld05hbWUpIGN1cnJlbnRWaWV3TmFtZS50ZXh0Q29udGVudCA9ICdWaXN0YSBwb3IgZGVmZWN0byc7XHJcbiAgICAgICAgICAgIGlmIChidG5TYXZlQ2hhbmdlc0VsKSBidG5TYXZlQ2hhbmdlc0VsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2aWV3c01hbmFnZXIgJiYgY29sdW1uc01hbmFnZXIgJiYgdmlld0lkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZ3MgPSBhd2FpdCB2aWV3c01hbmFnZXIubG9hZFZpZXcocGFyc2VJbnQodmlld0lkLCAxMCkpO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyLmFwcGx5Q29sdW1uQ29uZmlnKGNvbmZpZ3MpO1xyXG4gICAgICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5KGNvbHVtbnNNYW5hZ2VyLmdldFZpc2libGVDb2x1bW5zKCkpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlQ3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuU2F2ZUNoYW5nZXNFbCkgYnRuU2F2ZUNoYW5nZXNFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcGxpY2EgbGEgdmlzaWJpbGlkYWQgeSBvcmRlbiBkZSBjb2x1bW5hcyBhIGxhIHRhYmxhLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhcHBseUNvbHVtblZpc2liaWxpdHkodmlzaWJsZTogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdNYWluVGFibGUnKTtcclxuICAgICAgICBpZiAoIXRhYmxlKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlclRleHRNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAgICAgICAgICdQb3NpdGlvbklkJzogJ0lkIHB1ZXN0bycsXHJcbiAgICAgICAgICAgICdQb3NpdGlvbk5hbWUnOiAnTm9tYnJlIGRlbCBwdWVzdG8nLFxyXG4gICAgICAgICAgICAnRGVwYXJ0bWVudElkJzogJ0RlcGFydGFtZW50bycsXHJcbiAgICAgICAgICAgICdKb2JJZCc6ICdDYXJnbycsXHJcbiAgICAgICAgICAgICdOb3RpZnlQb3NpdGlvbklkJzogJ05vdGlmaWNhIGFsIHB1ZXN0bycsXHJcbiAgICAgICAgICAgICdTdGFydERhdGUnOiAnRmVjaGEgaW5pY2lhbCcsXHJcbiAgICAgICAgICAgICdFbmREYXRlJzogJ0ZlY2hhIGZpbmFsJyxcclxuICAgICAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ0Rlc2NyaXBjacOzbidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBSZW9yZGVuYXIgaGVhZGVyc1xyXG4gICAgICAgIGNvbnN0IGhlYWRlclJvdyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkIHRyJyk7XHJcbiAgICAgICAgaWYgKGhlYWRlclJvdykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja2JveENlbGwgPSBoZWFkZXJSb3cucXVlcnlTZWxlY3RvcignLmNoZWNrLWNlbGwtYXBwJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckNlbGxzID0gQXJyYXkuZnJvbShoZWFkZXJSb3cucXVlcnlTZWxlY3RvckFsbCgndGQ6bm90KC5jaGVjay1jZWxsLWFwcCknKSk7XHJcbiAgICAgICAgICAgIGhlYWRlckNlbGxzLmZvckVhY2goY2VsbCA9PiAoY2VsbCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcbiAgICAgICAgICAgIHZpc2libGUuZm9yRWFjaCgoY29sTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyVGV4dCA9IGhlYWRlclRleHRNYXBbY29sTmFtZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gaGVhZGVyQ2VsbHMuZmluZChjID0+IGMudGV4dENvbnRlbnQ/LnRyaW0oKSA9PT0gaGVhZGVyVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrYm94Q2VsbCkge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyUm93Lmluc2VydEJlZm9yZShjaGVja2JveENlbGwsIGhlYWRlclJvdy5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVvcmRlbmFyIGJvZHkgcm93cyAtIHVzYW5kbyDDrW5kaWNlIGRlIGNvbHVtbmEgYmFzYWRvIGVuIGhlYWRlclxyXG4gICAgICAgIGNvbnN0IGJvZHlSb3dzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdHInKTtcclxuICAgICAgICBib2R5Um93cy5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hDZWxsID0gcm93LnF1ZXJ5U2VsZWN0b3IoJy5jaGVjay1jZWxsLWFwcCcpO1xyXG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IEFycmF5LmZyb20ocm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkOm5vdCguY2hlY2stY2VsbC1hcHApJykpO1xyXG5cclxuICAgICAgICAgICAgLy8gTWFwZW8gZGUgw61uZGljZXM6IGxhIHRhYmxhIHRpZW5lIGNvbHVtbmFzIGVuIG9yZGVuIGZpam9cclxuICAgICAgICAgICAgY29uc3QgY29sdW1uSW5kZXhNYXA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7XHJcbiAgICAgICAgICAgICAgICAnUG9zaXRpb25JZCc6IDAsXHJcbiAgICAgICAgICAgICAgICAnUG9zaXRpb25OYW1lJzogMSxcclxuICAgICAgICAgICAgICAgICdEZXBhcnRtZW50SWQnOiAyLFxyXG4gICAgICAgICAgICAgICAgJ0pvYklkJzogMyxcclxuICAgICAgICAgICAgICAgICdOb3RpZnlQb3NpdGlvbklkJzogNCxcclxuICAgICAgICAgICAgICAgICdTdGFydERhdGUnOiA1LFxyXG4gICAgICAgICAgICAgICAgJ0VuZERhdGUnOiA2LFxyXG4gICAgICAgICAgICAgICAgJ0Rlc2NyaXB0aW9uJzogN1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuICAgICAgICAgICAgdmlzaWJsZS5mb3JFYWNoKChjb2xOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBjb2x1bW5JbmRleE1hcFtjb2xOYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChpZHggIT09IHVuZGVmaW5lZCAmJiBjZWxsc1tpZHhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKGNlbGxzW2lkeF0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbHNbaWR4XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tib3hDZWxsKSB7XHJcbiAgICAgICAgICAgICAgICByb3cuaW5zZXJ0QmVmb3JlKGNoZWNrYm94Q2VsbCwgcm93LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3R1YWxpemEgZWwgZHJvcGRvd24gY29uIGxhcyB2aXN0YXMgZGlzcG9uaWJsZXMuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF2aWV3c01hbmFnZXIpIHJldHVybjtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZWQtdmlld3MtY29udGFpbmVyJyk7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgdmlld3MgPSB2aWV3c01hbmFnZXIuZ2V0QXZhaWxhYmxlVmlld3MoKTtcclxuICAgICAgICBpZiAodmlld3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJ0ZXh0LW11dGVkLXZpZXdzXCI+U2luIHZpc3RhcyBndWFyZGFkYXM8L3NwYW4+JztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcclxuICAgICAgICB2aWV3cy5mb3JFYWNoKCh2OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3Rhckljb24gPSB2LklzRGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgPyAnPGkgY2xhc3M9XCJmYSBmYS1zdGFyXCIgc3R5bGU9XCJjb2xvcjojZjBhZDRlO1wiIHRpdGxlPVwiVmlzdGEgcHJlZGV0ZXJtaW5hZGFcIj48L2k+J1xyXG4gICAgICAgICAgICAgICAgOiBgPGkgY2xhc3M9XCJmYSBmYS1zdGFyLW8gYnRuLXNldC1kZWZhdWx0XCIgZGF0YS12aWV3LWlkPVwiJHt2LlJlY0lkfVwiIHN0eWxlPVwiY29sb3I6Izk5OTsgY3Vyc29yOnBvaW50ZXI7XCIgdGl0bGU9XCJFc3RhYmxlY2VyIGNvbW8gcHJlZGV0ZXJtaW5hZGFcIj48L2k+YDtcclxuICAgICAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cInNhdmVkLXZpZXctaXRlbVwiIHN0eWxlPVwiZGlzcGxheTpmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjsgYWxpZ24taXRlbXM6Y2VudGVyOyBwYWRkaW5nOjVweCAxNXB4O1wiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBkYXRhLXZpZXc9XCIke3YuUmVjSWR9XCIgc3R5bGU9XCJmbGV4OjE7IGNvbG9yOiMzMzM7IHRleHQtZGVjb3JhdGlvbjpub25lO1wiPiR7di5WaWV3TmFtZX08L2E+XHJcbiAgICAgICAgICAgICAgICAke3N0YXJJY29ufVxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xyXG5cclxuICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1zZXQtZGVmYXVsdCcpLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdJZCA9IHBhcnNlSW50KChidG4gYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmlld0lkIHx8ICcwJywgMTApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdJZCA+IDAgJiYgdmlld3NNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IHZpZXdzTWFuYWdlci5zZXREZWZhdWx0Vmlldyh2aWV3SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsaXphIGVsIG5vbWJyZSBkZSBsYSB2aXN0YSBhY3R1YWwuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXZpZXdzTWFuYWdlcikgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnQtdmlldy1uYW1lJyk7XHJcbiAgICAgICAgaWYgKGVsKSBlbC50ZXh0Q29udGVudCA9IHZpZXdzTWFuYWdlci5nZXRDdXJyZW50Vmlld05hbWUoKTtcclxuICAgIH1cclxufSkoKTtcclxuIl19