/**
 * @file M_Position-views.ts
 * @description Integración del sistema de vistas con el módulo de puestos.
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
(function initPositionViews() {
    const w = window;
    const pageEl = document.getElementById('position-page');
    if (!pageEl)
        return;
    const token = pageEl.dataset.token || '';
    const userRecId = parseInt(pageEl.dataset.user || '0', 10);
    const apiBase = '/api/v2.0';
    // Columnas del grid de puestos - todos los campos de la entidad
    const allColumns = ['PositionId', 'PositionName', 'IsVacant', 'DepartmentId', 'JobId', 'NotifyPositionId', 'PositionStatus', 'StartDate', 'EndDate', 'Description'];
    const defaultColumns = ['PositionId', 'PositionName', 'DepartmentId', 'JobId', 'NotifyPositionId', 'StartDate', 'EndDate', 'Description'];
    const columnTitles = {
        'PositionId': 'Id.Puesto',
        'PositionName': 'Nombre de puesto',
        'IsVacant': 'Es vacante',
        'DepartmentId': 'Departamento',
        'JobId': 'Cargo',
        'NotifyPositionId': 'Notifica al puesto',
        'PositionStatus': 'Estado',
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
        viewsManager = new w.GridViewsManager(apiBase, token, 'Position', userRecId, '');
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
        const colClassMap = {
            'PositionId': 'PositionIdtbl',
            'PositionName': 'PositionNametbl',
            'IsVacant': 'IsVacanttbl',
            'DepartmentId': 'DepartmentIdtbl',
            'JobId': 'JobIdtbl',
            'NotifyPositionId': 'NotifyPositionIdtbl',
            'PositionStatus': 'PositionStatustbl',
            'StartDate': 'StartDatetbl',
            'EndDate': 'EndDatetbl',
            'Description': 'Descriptiontbl'
        };
        const headerTextMap = {
            'PositionId': 'Id.Puesto',
            'PositionName': 'Nombre de puesto',
            'IsVacant': 'Es vacante',
            'DepartmentId': 'Departamento',
            'JobId': 'Cargo',
            'NotifyPositionId': 'Notifica al puesto',
            'PositionStatus': 'Estado',
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
        // Reordenar body rows usando clases CSS
        const bodyRows = table.querySelectorAll('tbody tr');
        bodyRows.forEach((row) => {
            const checkboxCell = row.querySelector('.check-cell-app');
            const cells = Array.from(row.querySelectorAll('td:not(.check-cell-app)'));
            cells.forEach(cell => cell.style.display = 'none');
            visible.forEach((colName) => {
                const className = colClassMap[colName];
                const cell = cells.find(c => c.classList.contains(className));
                if (cell) {
                    cell.style.display = '';
                    row.appendChild(cell);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTV9Qb3NpdGlvbi12aWV3cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL01fUG9zaXRpb24tdmlld3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOzs7Ozs7Ozs7O0FBRUgsQ0FBQyxTQUFTLGlCQUFpQjtJQUN2QixNQUFNLENBQUMsR0FBRyxNQUFhLENBQUM7SUFDeEIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4RCxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU87SUFFcEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO0lBQ3pDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0QsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDO0lBRTVCLGdFQUFnRTtJQUNoRSxNQUFNLFVBQVUsR0FBRyxDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNwSyxNQUFNLGNBQWMsR0FBRyxDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzFJLE1BQU0sWUFBWSxHQUEyQjtRQUN6QyxZQUFZLEVBQUUsV0FBVztRQUN6QixjQUFjLEVBQUUsa0JBQWtCO1FBQ2xDLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLGNBQWMsRUFBRSxjQUFjO1FBQzlCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLGtCQUFrQixFQUFFLG9CQUFvQjtRQUN4QyxnQkFB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d3MudHNcclxuICogQGRlc2NyaXB0aW9uIEludGVncmFjacOzbiBkZWwgc2lzdGVtYSBkZSB2aXN0YXMgY29uIGVsIG3Ds2R1bG8gZGUgcHVlc3Rvcy5cclxuICovXHJcblxyXG4oZnVuY3Rpb24gaW5pdFBvc2l0aW9uVmlld3MoKTogdm9pZCB7XHJcbiAgICBjb25zdCB3ID0gd2luZG93IGFzIGFueTtcclxuICAgIGNvbnN0IHBhZ2VFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3NpdGlvbi1wYWdlJyk7XHJcbiAgICBpZiAoIXBhZ2VFbCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHRva2VuID0gcGFnZUVsLmRhdGFzZXQudG9rZW4gfHwgJyc7XHJcbiAgICBjb25zdCB1c2VyUmVjSWQgPSBwYXJzZUludChwYWdlRWwuZGF0YXNldC51c2VyIHx8ICcwJywgMTApO1xyXG4gICAgY29uc3QgYXBpQmFzZSA9ICcvYXBpL3YyLjAnO1xyXG5cclxuICAgIC8vIENvbHVtbmFzIGRlbCBncmlkIGRlIHB1ZXN0b3MgLSB0b2RvcyBsb3MgY2FtcG9zIGRlIGxhIGVudGlkYWRcclxuICAgIGNvbnN0IGFsbENvbHVtbnMgPSBbJ1Bvc2l0aW9uSWQnLCAnUG9zaXRpb25OYW1lJywgJ0lzVmFjYW50JywgJ0RlcGFydG1lbnRJZCcsICdKb2JJZCcsICdOb3RpZnlQb3NpdGlvbklkJywgJ1Bvc2l0aW9uU3RhdHVzJywgJ1N0YXJ0RGF0ZScsICdFbmREYXRlJywgJ0Rlc2NyaXB0aW9uJ107XHJcbiAgICBjb25zdCBkZWZhdWx0Q29sdW1ucyA9IFsnUG9zaXRpb25JZCcsICdQb3NpdGlvbk5hbWUnLCAnRGVwYXJ0bWVudElkJywgJ0pvYklkJywgJ05vdGlmeVBvc2l0aW9uSWQnLCAnU3RhcnREYXRlJywgJ0VuZERhdGUnLCAnRGVzY3JpcHRpb24nXTtcclxuICAgIGNvbnN0IGNvbHVtblRpdGxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICAgICAgICAnUG9zaXRpb25JZCc6ICdJZC5QdWVzdG8nLFxyXG4gICAgICAgICdQb3NpdGlvbk5hbWUnOiAnTm9tYnJlIGRlIHB1ZXN0bycsXHJcbiAgICAgICAgJ0lzVmFjYW50JzogJ0VzIHZhY2FudGUnLFxyXG4gICAgICAgICdEZXBhcnRtZW50SWQnOiAnRGVwYXJ0YW1lbnRvJyxcclxuICAgICAgICAnSm9iSWQnOiAnQ2FyZ28nLFxyXG4gICAgICAgICdOb3RpZnlQb3NpdGlvbklkJzogJ05vdGlmaWNhIGFsIHB1ZXN0bycsXHJcbiAgICAgICAgJ1Bvc2l0aW9uU3RhdHVzJzogJ0VzdGFkbycsXHJcbiAgICAgICAgJ1N0YXJ0RGF0ZSc6ICdGZWNoYSBpbmljaWFsJyxcclxuICAgICAgICAnRW5kRGF0ZSc6ICdGZWNoYSBmaW5hbCcsXHJcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ0Rlc2NyaXBjacOzbidcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGNvbHVtbnNNYW5hZ2VyOiBhbnkgPSBudWxsO1xyXG4gICAgbGV0IHZpZXdzTWFuYWdlcjogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyBJbmljaWFsaXphciBnZXN0b3IgZGUgY29sdW1uYXNcclxuICAgIGlmICh3LkdyaWRDb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgIGNvbHVtbnNNYW5hZ2VyID0gbmV3IHcuR3JpZENvbHVtbnNNYW5hZ2VyKFxyXG4gICAgICAgICAgICBhbGxDb2x1bW5zLFxyXG4gICAgICAgICAgICBkZWZhdWx0Q29sdW1ucyxcclxuICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5LFxyXG4gICAgICAgICAgICAoZjogc3RyaW5nKSA9PiBjb2x1bW5UaXRsZXNbZl0gfHwgZlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5pY2lhbGl6YXIgZ2VzdG9yIGRlIHZpc3Rhc1xyXG4gICAgaWYgKHcuR3JpZFZpZXdzTWFuYWdlciAmJiB0b2tlbiAmJiB1c2VyUmVjSWQgPiAwKSB7XHJcbiAgICAgICAgdmlld3NNYW5hZ2VyID0gbmV3IHcuR3JpZFZpZXdzTWFuYWdlcihhcGlCYXNlLCB0b2tlbiwgJ1Bvc2l0aW9uJywgdXNlclJlY0lkLCAnJyk7XHJcbiAgICAgICAgdmlld3NNYW5hZ2VyLmluaXRpYWxpemUoKS50aGVuKChjb25maWdzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICB1cGRhdGVWaWV3c0Ryb3Bkb3duKCk7XHJcbiAgICAgICAgICAgIGlmIChjb25maWdzLmxlbmd0aCA+IDAgJiYgY29sdW1uc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyLmFwcGx5Q29sdW1uQ29uZmlnKGNvbmZpZ3MpO1xyXG4gICAgICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5KGNvbHVtbnNNYW5hZ2VyLmdldFZpc2libGVDb2x1bW5zKCkpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlQ3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFdmVudDogQWJyaXIgbW9kYWwgZGUgY29sdW1uYXNcclxuICAgIGNvbnN0IGJ0bk1hbmFnZUNvbHVtbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW1hbmFnZS1jb2x1bW5zJyk7XHJcbiAgICBpZiAoYnRuTWFuYWdlQ29sdW1ucykge1xyXG4gICAgICAgIGJ0bk1hbmFnZUNvbHVtbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyPy5zaG93Q29sdW1uc01vZGFsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IEFwbGljYXIgY29sdW1uYXMgZGVsIG1vZGFsXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHRhcmdldC5pZCA9PT0gJ2J0bi1hcHBseS1jb2x1bW5zJykge1xyXG4gICAgICAgICAgICBjb2x1bW5zTWFuYWdlcj8uYXBwbHlDb2x1bW5zKCk7XHJcbiAgICAgICAgICAgICgkIGFzIGFueSkoJyNtb2RhbC1tYW5hZ2UtY29sdW1ucycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgIGlmICh2aWV3c01hbmFnZXI/Lmhhc0N1cnJlbnRWaWV3KCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ0blNhdmVDaGFuZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1zYXZlLXZpZXctY2hhbmdlcycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0blNhdmVDaGFuZ2VzKSBidG5TYXZlQ2hhbmdlcy5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBFdmVudDogTnVldmEgdmlzdGFcclxuICAgIGNvbnN0IGJ0bk5ld1ZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy12aWV3Jyk7XHJcbiAgICBpZiAoYnRuTmV3Vmlldykge1xyXG4gICAgICAgIGJ0bk5ld1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdOYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1uYW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKHZpZXdOYW1lSW5wdXQpIHZpZXdOYW1lSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgKCQgYXMgYW55KSgnI21vZGFsLXNhdmUtdmlldycpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IENvbmZpcm1hciBndWFyZGFyIG51ZXZhIHZpc3RhXHJcbiAgICBjb25zdCBidG5Db25maXJtU2F2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tY29uZmlybS1zYXZlLXZpZXcnKTtcclxuICAgIGlmIChidG5Db25maXJtU2F2ZSkge1xyXG4gICAgICAgIGJ0bkNvbmZpcm1TYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctbmFtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSAodmlld05hbWVJbnB1dD8udmFsdWUgfHwgJycpLnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKCFuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB3LndpbmRvd3NfbWVzc2FnZT8uKCdJbmdyZXNlIHVuIG5vbWJyZSBwYXJhIGxhIHZpc3RhJywgJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZpZXdzTWFuYWdlciAmJiBjb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNEZWZhdWx0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LWlzLWRlZmF1bHQnKSBhcyBIVE1MSW5wdXRFbGVtZW50KT8uY2hlY2tlZCB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzUHVibGljID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LWlzLXB1YmxpYycpIGFzIEhUTUxJbnB1dEVsZW1lbnQpPy5jaGVja2VkIHx8IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCB2aWV3c01hbmFnZXIuc2F2ZVZpZXcobmFtZSwgY29sdW1uc01hbmFnZXIuZ2V0Q3VycmVudENvbHVtbkNvbmZpZygpLCBpc0RlZmF1bHQsIGlzUHVibGljKTtcclxuICAgICAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICAgICAgICAgICgkIGFzIGFueSkoJyNtb2RhbC1zYXZlLXZpZXcnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEV2ZW50OiBHdWFyZGFyIGNhbWJpb3MgZW4gdmlzdGEgYWN0dWFsXHJcbiAgICBjb25zdCBidG5TYXZlQ2hhbmdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tc2F2ZS12aWV3LWNoYW5nZXMnKTtcclxuICAgIGlmIChidG5TYXZlQ2hhbmdlcykge1xyXG4gICAgICAgIGJ0blNhdmVDaGFuZ2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAodmlld3NNYW5hZ2VyICYmIGNvbHVtbnNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IHZpZXdzTWFuYWdlci51cGRhdGVWaWV3KGNvbHVtbnNNYW5hZ2VyLmdldEN1cnJlbnRDb2x1bW5Db25maWcoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgICAgICAgICBidG5TYXZlQ2hhbmdlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IENsaWNrIGVuIHZpc3RhIGRlbCBkcm9wZG93blxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGFuY2hvciA9IHRhcmdldC5jbG9zZXN0KCdbZGF0YS12aWV3XScpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICghYW5jaG9yKSByZXR1cm47XHJcblxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCB2aWV3SWQgPSBhbmNob3IuZGF0YXNldC52aWV3O1xyXG4gICAgICAgIGNvbnN0IGJ0blNhdmVDaGFuZ2VzRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXNhdmUtdmlldy1jaGFuZ2VzJyk7XHJcblxyXG4gICAgICAgIGlmICh2aWV3SWQgPT09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICBjb2x1bW5zTWFuYWdlcj8ucmVzZXRUb0RlZmF1bHQoZGVmYXVsdENvbHVtbnMpO1xyXG4gICAgICAgICAgICBhcHBseUNvbHVtblZpc2liaWxpdHkoZGVmYXVsdENvbHVtbnMpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Vmlld05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudC12aWV3LW5hbWUnKTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRWaWV3TmFtZSkgY3VycmVudFZpZXdOYW1lLnRleHRDb250ZW50ID0gJ1Zpc3RhIHBvciBkZWZlY3RvJztcclxuICAgICAgICAgICAgaWYgKGJ0blNhdmVDaGFuZ2VzRWwpIGJ0blNhdmVDaGFuZ2VzRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9IGVsc2UgaWYgKHZpZXdzTWFuYWdlciAmJiBjb2x1bW5zTWFuYWdlciAmJiB2aWV3SWQpIHtcclxuICAgICAgICAgICAgY29uc3QgY29uZmlncyA9IGF3YWl0IHZpZXdzTWFuYWdlci5sb2FkVmlldyhwYXJzZUludCh2aWV3SWQsIDEwKSk7XHJcbiAgICAgICAgICAgIGlmIChjb25maWdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uc01hbmFnZXIuYXBwbHlDb2x1bW5Db25maWcoY29uZmlncyk7XHJcbiAgICAgICAgICAgICAgICBhcHBseUNvbHVtblZpc2liaWxpdHkoY29sdW1uc01hbmFnZXIuZ2V0VmlzaWJsZUNvbHVtbnMoKSk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChidG5TYXZlQ2hhbmdlc0VsKSBidG5TYXZlQ2hhbmdlc0VsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwbGljYSBsYSB2aXNpYmlsaWRhZCB5IG9yZGVuIGRlIGNvbHVtbmFzIGEgbGEgdGFibGEuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFwcGx5Q29sdW1uVmlzaWJpbGl0eSh2aXNpYmxlOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ01haW5UYWJsZScpO1xyXG4gICAgICAgIGlmICghdGFibGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29sQ2xhc3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAgICAgICAgICdQb3NpdGlvbklkJzogJ1Bvc2l0aW9uSWR0YmwnLFxyXG4gICAgICAgICAgICAnUG9zaXRpb25OYW1lJzogJ1Bvc2l0aW9uTmFtZXRibCcsXHJcbiAgICAgICAgICAgICdJc1ZhY2FudCc6ICdJc1ZhY2FudHRibCcsXHJcbiAgICAgICAgICAgICdEZXBhcnRtZW50SWQnOiAnRGVwYXJ0bWVudElkdGJsJyxcclxuICAgICAgICAgICAgJ0pvYklkJzogJ0pvYklkdGJsJyxcclxuICAgICAgICAgICAgJ05vdGlmeVBvc2l0aW9uSWQnOiAnTm90aWZ5UG9zaXRpb25JZHRibCcsXHJcbiAgICAgICAgICAgICdQb3NpdGlvblN0YXR1cyc6ICdQb3NpdGlvblN0YXR1c3RibCcsXHJcbiAgICAgICAgICAgICdTdGFydERhdGUnOiAnU3RhcnREYXRldGJsJyxcclxuICAgICAgICAgICAgJ0VuZERhdGUnOiAnRW5kRGF0ZXRibCcsXHJcbiAgICAgICAgICAgICdEZXNjcmlwdGlvbic6ICdEZXNjcmlwdGlvbnRibCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJUZXh0TWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgICAgICAgICAnUG9zaXRpb25JZCc6ICdJZC5QdWVzdG8nLFxyXG4gICAgICAgICAgICAnUG9zaXRpb25OYW1lJzogJ05vbWJyZSBkZSBwdWVzdG8nLFxyXG4gICAgICAgICAgICAnSXNWYWNhbnQnOiAnRXMgdmFjYW50ZScsXHJcbiAgICAgICAgICAgICdEZXBhcnRtZW50SWQnOiAnRGVwYXJ0YW1lbnRvJyxcclxuICAgICAgICAgICAgJ0pvYklkJzogJ0NhcmdvJyxcclxuICAgICAgICAgICAgJ05vdGlmeVBvc2l0aW9uSWQnOiAnTm90aWZpY2EgYWwgcHVlc3RvJyxcclxuICAgICAgICAgICAgJ1Bvc2l0aW9uU3RhdHVzJzogJ0VzdGFkbycsXHJcbiAgICAgICAgICAgICdTdGFydERhdGUnOiAnRmVjaGEgaW5pY2lhbCcsXHJcbiAgICAgICAgICAgICdFbmREYXRlJzogJ0ZlY2hhIGZpbmFsJyxcclxuICAgICAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ0Rlc2NyaXBjacOzbidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBSZW9yZGVuYXIgaGVhZGVyc1xyXG4gICAgICAgIGNvbnN0IGhlYWRlclJvdyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkIHRyJyk7XHJcbiAgICAgICAgaWYgKGhlYWRlclJvdykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja2JveENlbGwgPSBoZWFkZXJSb3cucXVlcnlTZWxlY3RvcignLmNoZWNrLWNlbGwtYXBwJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckNlbGxzID0gQXJyYXkuZnJvbShoZWFkZXJSb3cucXVlcnlTZWxlY3RvckFsbCgndGQ6bm90KC5jaGVjay1jZWxsLWFwcCknKSk7XHJcbiAgICAgICAgICAgIGhlYWRlckNlbGxzLmZvckVhY2goY2VsbCA9PiAoY2VsbCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcbiAgICAgICAgICAgIHZpc2libGUuZm9yRWFjaCgoY29sTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyVGV4dCA9IGhlYWRlclRleHRNYXBbY29sTmFtZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gaGVhZGVyQ2VsbHMuZmluZChjID0+IGMudGV4dENvbnRlbnQ/LnRyaW0oKSA9PT0gaGVhZGVyVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrYm94Q2VsbCkge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyUm93Lmluc2VydEJlZm9yZShjaGVja2JveENlbGwsIGhlYWRlclJvdy5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVvcmRlbmFyIGJvZHkgcm93cyB1c2FuZG8gY2xhc2VzIENTU1xyXG4gICAgICAgIGNvbnN0IGJvZHlSb3dzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdHInKTtcclxuICAgICAgICBib2R5Um93cy5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hDZWxsID0gcm93LnF1ZXJ5U2VsZWN0b3IoJy5jaGVjay1jZWxsLWFwcCcpO1xyXG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IEFycmF5LmZyb20ocm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkOm5vdCguY2hlY2stY2VsbC1hcHApJykpO1xyXG5cclxuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuICAgICAgICAgICAgdmlzaWJsZS5mb3JFYWNoKChjb2xOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBjb2xDbGFzc01hcFtjb2xOYW1lXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBjZWxscy5maW5kKGMgPT4gYy5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrYm94Q2VsbCkge1xyXG4gICAgICAgICAgICAgICAgcm93Lmluc2VydEJlZm9yZShjaGVja2JveENlbGwsIHJvdy5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsaXphIGVsIGRyb3Bkb3duIGNvbiBsYXMgdmlzdGFzIGRpc3BvbmlibGVzLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVWaWV3c0Ryb3Bkb3duKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdmlld3NNYW5hZ2VyKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVkLXZpZXdzLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHZpZXdzID0gdmlld3NNYW5hZ2VyLmdldEF2YWlsYWJsZVZpZXdzKCk7XHJcbiAgICAgICAgaWYgKHZpZXdzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwidGV4dC1tdXRlZC12aWV3c1wiPlNpbiB2aXN0YXMgZ3VhcmRhZGFzPC9zcGFuPic7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gJyc7XHJcbiAgICAgICAgdmlld3MuZm9yRWFjaCgodjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJJY29uID0gdi5Jc0RlZmF1bHRcclxuICAgICAgICAgICAgICAgID8gJzxpIGNsYXNzPVwiZmEgZmEtc3RhclwiIHN0eWxlPVwiY29sb3I6I2YwYWQ0ZTtcIiB0aXRsZT1cIlZpc3RhIHByZWRldGVybWluYWRhXCI+PC9pPidcclxuICAgICAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmEgZmEtc3Rhci1vIGJ0bi1zZXQtZGVmYXVsdFwiIGRhdGEtdmlldy1pZD1cIiR7di5SZWNJZH1cIiBzdHlsZT1cImNvbG9yOiM5OTk7IGN1cnNvcjpwb2ludGVyO1wiIHRpdGxlPVwiRXN0YWJsZWNlciBjb21vIHByZWRldGVybWluYWRhXCI+PC9pPmA7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJzYXZlZC12aWV3LWl0ZW1cIiBzdHlsZT1cImRpc3BsYXk6ZmxleDsganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOmNlbnRlcjsgcGFkZGluZzo1cHggMTVweDtcIj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS12aWV3PVwiJHt2LlJlY0lkfVwiIHN0eWxlPVwiZmxleDoxOyBjb2xvcjojMzMzOyB0ZXh0LWRlY29yYXRpb246bm9uZTtcIj4ke3YuVmlld05hbWV9PC9hPlxyXG4gICAgICAgICAgICAgICAgJHtzdGFySWNvbn1cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tc2V0LWRlZmF1bHQnKS5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3SWQgPSBwYXJzZUludCgoYnRuIGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZpZXdJZCB8fCAnMCcsIDEwKTtcclxuICAgICAgICAgICAgICAgIGlmICh2aWV3SWQgPiAwICYmIHZpZXdzTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCB2aWV3c01hbmFnZXIuc2V0RGVmYXVsdFZpZXcodmlld0lkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVWaWV3c0Ryb3Bkb3duKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdHVhbGl6YSBlbCBub21icmUgZGUgbGEgdmlzdGEgYWN0dWFsLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF2aWV3c01hbmFnZXIpIHJldHVybjtcclxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50LXZpZXctbmFtZScpO1xyXG4gICAgICAgIGlmIChlbCkgZWwudGV4dENvbnRlbnQgPSB2aWV3c01hbmFnZXIuZ2V0Q3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICB9XHJcbn0pKCk7XHJcbiJdfQ==