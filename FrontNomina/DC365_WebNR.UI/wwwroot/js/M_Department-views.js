/**
 * @file M_Department-views.ts
 * @description Integración del sistema de vistas con el módulo de departamentos.
 *              Este archivo se carga después de M_Department.ts.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module DepartamentosVistas
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
/**
 * Inicializa el sistema de gestión de vistas para departamentos.
 * Se ejecuta automáticamente al cargar la página.
 */
(function initDepartmentViews() {
    const w = window;
    const pageEl = document.getElementById('department-page');
    if (!pageEl)
        return;
    const token = pageEl.dataset.token || '';
    const userRecId = parseInt(pageEl.dataset.user || '0', 10);
    const apiBase = '/api/v2.0';
    // Columnas del grid de departamentos
    const allColumns = ['DepartmentId', 'Name', 'QtyWorkers', 'StartDate', 'EndDate', 'Description'];
    const defaultColumns = [...allColumns];
    const columnTitles = {
        'DepartmentId': 'Id Departamento',
        'Name': 'Nombre del departamento',
        'QtyWorkers': 'Trabajadores',
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
        viewsManager = new w.GridViewsManager(apiBase, token, 'Department', userRecId, '');
        viewsManager.initialize().then((configs) => {
            // Siempre actualizar el dropdown con las vistas disponibles
            updateViewsDropdown();
            // Si hay una vista por defecto con configuración, aplicarla
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
                // Mostrar el botón guardar cambios
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
                    // Ocultar el botón guardar cambios
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
            // Ocultar botón guardar cambios
            if (btnSaveChangesEl)
                btnSaveChangesEl.style.display = 'none';
        }
        else if (viewsManager && columnsManager && viewId) {
            const configs = yield viewsManager.loadView(parseInt(viewId, 10));
            if (configs.length) {
                columnsManager.applyColumnConfig(configs);
                applyColumnVisibility(columnsManager.getVisibleColumns());
                updateCurrentViewName();
                // Ocultar botón guardar cambios al cargar una vista
                if (btnSaveChangesEl)
                    btnSaveChangesEl.style.display = 'none';
            }
        }
    }));
    /**
     * Aplica la visibilidad y orden de columnas a la tabla.
     * @param visible Array de nombres de columnas visibles en el orden deseado.
     */
    function applyColumnVisibility(visible) {
        const table = document.getElementById('MainTable');
        if (!table)
            return;
        // Mapeo de nombre de columna a clase CSS de la celda
        const colClassMap = {
            'DepartmentId': 'DepartmentIdtbl',
            'Name': 'Nametbl',
            'QtyWorkers': 'QtyWorkerstbl',
            'StartDate': 'StartDatetbl',
            'EndDate': 'EndDatetbl',
            'Description': 'Descriptiontbl'
        };
        // Mapeo de nombre de columna a texto del header
        const headerTextMap = {
            'DepartmentId': 'Id Departamento',
            'Name': 'Nombre del departamento',
            'QtyWorkers': 'Trabajadores',
            'StartDate': 'Fecha inicial',
            'EndDate': 'Fecha final',
            'Description': 'Descripcion'
        };
        // Reordenar y mostrar/ocultar headers
        const headerRow = table.querySelector('thead tr');
        if (headerRow) {
            const checkboxCell = headerRow.querySelector('.check-cell-app');
            const headerCells = Array.from(headerRow.querySelectorAll('td:not(.check-cell-app)'));
            // Ocultar todas las celdas primero
            headerCells.forEach(cell => cell.style.display = 'none');
            // Mostrar y reordenar solo las visibles
            visible.forEach((colName) => {
                const headerText = headerTextMap[colName];
                const cell = headerCells.find(c => { var _a; return ((_a = c.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === headerText; });
                if (cell) {
                    cell.style.display = '';
                    headerRow.appendChild(cell); // Mover al final para reordenar
                }
            });
            // Asegurar que el checkbox esté primero
            if (checkboxCell) {
                headerRow.insertBefore(checkboxCell, headerRow.firstChild);
            }
        }
        // Reordenar y mostrar/ocultar body rows
        const bodyRows = table.querySelectorAll('tbody tr');
        bodyRows.forEach((row) => {
            const checkboxCell = row.querySelector('.check-cell-app');
            const cells = Array.from(row.querySelectorAll('td:not(.check-cell-app)'));
            // Ocultar todas las celdas primero
            cells.forEach(cell => cell.style.display = 'none');
            // Mostrar y reordenar solo las visibles
            visible.forEach((colName) => {
                const className = colClassMap[colName];
                const cell = cells.find(c => c.classList.contains(className));
                if (cell) {
                    cell.style.display = '';
                    row.appendChild(cell); // Mover al final para reordenar
                }
            });
            // Asegurar que el checkbox esté primero
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
        // Event listeners para establecer vista por defecto
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
     * Actualiza el nombre de la vista actual en el dropdown.
     */
    function updateCurrentViewName() {
        if (!viewsManager)
            return;
        const el = document.getElementById('current-view-name');
        if (el)
            el.textContent = viewsManager.getCurrentViewName();
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTV9EZXBhcnRtZW50LXZpZXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvTV9EZXBhcnRtZW50LXZpZXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7Ozs7Ozs7Ozs7QUFFSDs7O0dBR0c7QUFDSCxDQUFDLFNBQVMsbUJBQW1CO0lBQ3pCLE1BQU0sQ0FBQyxHQUFHLE1BQWEsQ0FBQztJQUN4QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDMUQsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPO0lBRXBCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNELE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQztJQUU1QixxQ0FBcUM7SUFDckMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ2pHLE1BQU0sY0FBYyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztJQUN2QyxNQUFNLFlBQVksR0FBMkI7UUFDekMsY0FBYyxFQUFFLGlCQUFpQjtRQUNqQyxNQUFNLEVBQUUseUJBQXlCO1FBQ2pDLFlBQVksRUFBRSxjQUFjO1FBQzVCLFdBQVcsRUFBRSxlQUFlO1FBQzVCLFNBQVMsRUFBRSxhQUFhO1FBQ3hCLGFBQWEsRUFBRSxhQUFhO0tBQy9CLENBQUM7SUFFRixJQUFJLGNBQWMsR0FBUSxJQUFJLENBQUM7SUFDL0IsSUFBSSxZQUFZLEdBQVEsSUFBSSxDQUFDO0lBRTdCLGlDQUFpQztJQUNqQyxJQUFJLENBQUMs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QkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzNELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBTyxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNuQixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3BCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBRSxHQUFtQixDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksWUFBWSxFQUFFLENBQUM7b0JBQzdCLE1BQU0sT0FBTyxHQUFHLE1BQU0sWUFBWSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDMUQsSUFBSSxPQUFPLEVBQUUsQ0FBQzt3QkFDVixtQkFBbUIsRUFBRSxDQUFDO29CQUMxQixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTLHFCQUFxQjtRQUMxQixJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDMUIsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3hELElBQUksRUFBRTtZQUFFLEVBQUUsQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDL0QsQ0FBQztBQUNMLENBQUMsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgTV9EZXBhcnRtZW50LXZpZXdzLnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBJbnRlZ3JhY2nDs24gZGVsIHNpc3RlbWEgZGUgdmlzdGFzIGNvbiBlbCBtw7NkdWxvIGRlIGRlcGFydGFtZW50b3MuXHJcbiAqICAgICAgICAgICAgICBFc3RlIGFyY2hpdm8gc2UgY2FyZ2EgZGVzcHXDqXMgZGUgTV9EZXBhcnRtZW50LnRzLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBEZXBhcnRhbWVudG9zVmlzdGFzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEluaWNpYWxpemEgZWwgc2lzdGVtYSBkZSBnZXN0acOzbiBkZSB2aXN0YXMgcGFyYSBkZXBhcnRhbWVudG9zLlxyXG4gKiBTZSBlamVjdXRhIGF1dG9tw6F0aWNhbWVudGUgYWwgY2FyZ2FyIGxhIHDDoWdpbmEuXHJcbiAqL1xyXG4oZnVuY3Rpb24gaW5pdERlcGFydG1lbnRWaWV3cygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHcgPSB3aW5kb3cgYXMgYW55O1xyXG4gICAgY29uc3QgcGFnZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlcGFydG1lbnQtcGFnZScpO1xyXG4gICAgaWYgKCFwYWdlRWwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0b2tlbiA9IHBhZ2VFbC5kYXRhc2V0LnRva2VuIHx8ICcnO1xyXG4gICAgY29uc3QgdXNlclJlY0lkID0gcGFyc2VJbnQocGFnZUVsLmRhdGFzZXQudXNlciB8fCAnMCcsIDEwKTtcclxuICAgIGNvbnN0IGFwaUJhc2UgPSAnL2FwaS92Mi4wJztcclxuXHJcbiAgICAvLyBDb2x1bW5hcyBkZWwgZ3JpZCBkZSBkZXBhcnRhbWVudG9zXHJcbiAgICBjb25zdCBhbGxDb2x1bW5zID0gWydEZXBhcnRtZW50SWQnLCAnTmFtZScsICdRdHlXb3JrZXJzJywgJ1N0YXJ0RGF0ZScsICdFbmREYXRlJywgJ0Rlc2NyaXB0aW9uJ107XHJcbiAgICBjb25zdCBkZWZhdWx0Q29sdW1ucyA9IFsuLi5hbGxDb2x1bW5zXTtcclxuICAgIGNvbnN0IGNvbHVtblRpdGxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICAgICAgICAnRGVwYXJ0bWVudElkJzogJ0lkIERlcGFydGFtZW50bycsXHJcbiAgICAgICAgJ05hbWUnOiAnTm9tYnJlIGRlbCBkZXBhcnRhbWVudG8nLFxyXG4gICAgICAgICdRdHlXb3JrZXJzJzogJ1RyYWJhamFkb3JlcycsXHJcbiAgICAgICAgJ1N0YXJ0RGF0ZSc6ICdGZWNoYSBpbmljaWFsJyxcclxuICAgICAgICAnRW5kRGF0ZSc6ICdGZWNoYSBmaW5hbCcsXHJcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ0Rlc2NyaXBjacOzbidcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGNvbHVtbnNNYW5hZ2VyOiBhbnkgPSBudWxsO1xyXG4gICAgbGV0IHZpZXdzTWFuYWdlcjogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyBJbmljaWFsaXphciBnZXN0b3IgZGUgY29sdW1uYXNcclxuICAgIGlmICh3LkdyaWRDb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgIGNvbHVtbnNNYW5hZ2VyID0gbmV3IHcuR3JpZENvbHVtbnNNYW5hZ2VyKFxyXG4gICAgICAgICAgICBhbGxDb2x1bW5zLFxyXG4gICAgICAgICAgICBkZWZhdWx0Q29sdW1ucyxcclxuICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5LFxyXG4gICAgICAgICAgICAoZjogc3RyaW5nKSA9PiBjb2x1bW5UaXRsZXNbZl0gfHwgZlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5pY2lhbGl6YXIgZ2VzdG9yIGRlIHZpc3Rhc1xyXG4gICAgaWYgKHcuR3JpZFZpZXdzTWFuYWdlciAmJiB0b2tlbiAmJiB1c2VyUmVjSWQgPiAwKSB7XHJcbiAgICAgICAgdmlld3NNYW5hZ2VyID0gbmV3IHcuR3JpZFZpZXdzTWFuYWdlcihhcGlCYXNlLCB0b2tlbiwgJ0RlcGFydG1lbnQnLCB1c2VyUmVjSWQsICcnKTtcclxuICAgICAgICB2aWV3c01hbmFnZXIuaW5pdGlhbGl6ZSgpLnRoZW4oKGNvbmZpZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFNpZW1wcmUgYWN0dWFsaXphciBlbCBkcm9wZG93biBjb24gbGFzIHZpc3RhcyBkaXNwb25pYmxlc1xyXG4gICAgICAgICAgICB1cGRhdGVWaWV3c0Ryb3Bkb3duKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTaSBoYXkgdW5hIHZpc3RhIHBvciBkZWZlY3RvIGNvbiBjb25maWd1cmFjacOzbiwgYXBsaWNhcmxhXHJcbiAgICAgICAgICAgIGlmIChjb25maWdzLmxlbmd0aCA+IDAgJiYgY29sdW1uc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyLmFwcGx5Q29sdW1uQ29uZmlnKGNvbmZpZ3MpO1xyXG4gICAgICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5KGNvbHVtbnNNYW5hZ2VyLmdldFZpc2libGVDb2x1bW5zKCkpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlQ3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFdmVudDogQWJyaXIgbW9kYWwgZGUgY29sdW1uYXNcclxuICAgIGNvbnN0IGJ0bk1hbmFnZUNvbHVtbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW1hbmFnZS1jb2x1bW5zJyk7XHJcbiAgICBpZiAoYnRuTWFuYWdlQ29sdW1ucykge1xyXG4gICAgICAgIGJ0bk1hbmFnZUNvbHVtbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyPy5zaG93Q29sdW1uc01vZGFsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IEFwbGljYXIgY29sdW1uYXMgZGVsIG1vZGFsXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHRhcmdldC5pZCA9PT0gJ2J0bi1hcHBseS1jb2x1bW5zJykge1xyXG4gICAgICAgICAgICBjb2x1bW5zTWFuYWdlcj8uYXBwbHlDb2x1bW5zKCk7XHJcbiAgICAgICAgICAgICgkIGFzIGFueSkoJyNtb2RhbC1tYW5hZ2UtY29sdW1ucycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgIGlmICh2aWV3c01hbmFnZXI/Lmhhc0N1cnJlbnRWaWV3KCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIE1vc3RyYXIgZWwgYm90w7NuIGd1YXJkYXIgY2FtYmlvc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnRuU2F2ZUNoYW5nZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXNhdmUtdmlldy1jaGFuZ2VzJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuU2F2ZUNoYW5nZXMpIGJ0blNhdmVDaGFuZ2VzLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEV2ZW50OiBOdWV2YSB2aXN0YVxyXG4gICAgY29uc3QgYnRuTmV3VmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbmV3LXZpZXcnKTtcclxuICAgIGlmIChidG5OZXdWaWV3KSB7XHJcbiAgICAgICAgYnRuTmV3Vmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3Qgdmlld05hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LW5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAodmlld05hbWVJbnB1dCkgdmlld05hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAoJCBhcyBhbnkpKCcjbW9kYWwtc2F2ZS12aWV3JykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFdmVudDogQ29uZmlybWFyIGd1YXJkYXIgbnVldmEgdmlzdGFcclxuICAgIGNvbnN0IGJ0bkNvbmZpcm1TYXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1jb25maXJtLXNhdmUtdmlldycpO1xyXG4gICAgaWYgKGJ0bkNvbmZpcm1TYXZlKSB7XHJcbiAgICAgICAgYnRuQ29uZmlybVNhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdOYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1uYW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9ICh2aWV3TmFtZUlucHV0Py52YWx1ZSB8fCAnJykudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHcud2luZG93c19tZXNzYWdlPy4oJ0luZ3Jlc2UgdW4gbm9tYnJlIHBhcmEgbGEgdmlzdGEnLCAnZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmlld3NNYW5hZ2VyICYmIGNvbHVtbnNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0RlZmF1bHQgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctaXMtZGVmYXVsdCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQpPy5jaGVja2VkIHx8IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNQdWJsaWMgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctaXMtcHVibGljJykgYXMgSFRNTElucHV0RWxlbWVudCk/LmNoZWNrZWQgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IHZpZXdzTWFuYWdlci5zYXZlVmlldyhuYW1lLCBjb2x1bW5zTWFuYWdlci5nZXRDdXJyZW50Q29sdW1uQ29uZmlnKCksIGlzRGVmYXVsdCwgaXNQdWJsaWMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKCQgYXMgYW55KSgnI21vZGFsLXNhdmUtdmlldycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmlld3NEcm9wZG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IEd1YXJkYXIgY2FtYmlvcyBlbiB2aXN0YSBhY3R1YWxcclxuICAgIGNvbnN0IGJ0blNhdmVDaGFuZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1zYXZlLXZpZXctY2hhbmdlcycpO1xyXG4gICAgaWYgKGJ0blNhdmVDaGFuZ2VzKSB7XHJcbiAgICAgICAgYnRuU2F2ZUNoYW5nZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmICh2aWV3c01hbmFnZXIgJiYgY29sdW1uc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgdmlld3NNYW5hZ2VyLnVwZGF0ZVZpZXcoY29sdW1uc01hbmFnZXIuZ2V0Q3VycmVudENvbHVtbkNvbmZpZygpKTtcclxuICAgICAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9jdWx0YXIgZWwgYm90w7NuIGd1YXJkYXIgY2FtYmlvc1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0blNhdmVDaGFuZ2VzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFdmVudDogQ2xpY2sgZW4gdmlzdGEgZGVsIGRyb3Bkb3duXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgYW5jaG9yID0gdGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXZpZXddJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKCFhbmNob3IpIHJldHVybjtcclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXdJZCA9IGFuY2hvci5kYXRhc2V0LnZpZXc7XHJcbiAgICAgICAgY29uc3QgYnRuU2F2ZUNoYW5nZXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tc2F2ZS12aWV3LWNoYW5nZXMnKTtcclxuXHJcbiAgICAgICAgaWYgKHZpZXdJZCA9PT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyPy5yZXNldFRvRGVmYXVsdChkZWZhdWx0Q29sdW1ucyk7XHJcbiAgICAgICAgICAgIGFwcGx5Q29sdW1uVmlzaWJpbGl0eShkZWZhdWx0Q29sdW1ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWaWV3TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50LXZpZXctbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFZpZXdOYW1lKSBjdXJyZW50Vmlld05hbWUudGV4dENvbnRlbnQgPSAnVmlzdGEgcG9yIGRlZmVjdG8nO1xyXG4gICAgICAgICAgICAvLyBPY3VsdGFyIGJvdMOzbiBndWFyZGFyIGNhbWJpb3NcclxuICAgICAgICAgICAgaWYgKGJ0blNhdmVDaGFuZ2VzRWwpIGJ0blNhdmVDaGFuZ2VzRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9IGVsc2UgaWYgKHZpZXdzTWFuYWdlciAmJiBjb2x1bW5zTWFuYWdlciAmJiB2aWV3SWQpIHtcclxuICAgICAgICAgICAgY29uc3QgY29uZmlncyA9IGF3YWl0IHZpZXdzTWFuYWdlci5sb2FkVmlldyhwYXJzZUludCh2aWV3SWQsIDEwKSk7XHJcbiAgICAgICAgICAgIGlmIChjb25maWdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uc01hbmFnZXIuYXBwbHlDb2x1bW5Db25maWcoY29uZmlncyk7XHJcbiAgICAgICAgICAgICAgICBhcHBseUNvbHVtblZpc2liaWxpdHkoY29sdW1uc01hbmFnZXIuZ2V0VmlzaWJsZUNvbHVtbnMoKSk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTtcclxuICAgICAgICAgICAgICAgIC8vIE9jdWx0YXIgYm90w7NuIGd1YXJkYXIgY2FtYmlvcyBhbCBjYXJnYXIgdW5hIHZpc3RhXHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuU2F2ZUNoYW5nZXNFbCkgYnRuU2F2ZUNoYW5nZXNFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcGxpY2EgbGEgdmlzaWJpbGlkYWQgeSBvcmRlbiBkZSBjb2x1bW5hcyBhIGxhIHRhYmxhLlxyXG4gICAgICogQHBhcmFtIHZpc2libGUgQXJyYXkgZGUgbm9tYnJlcyBkZSBjb2x1bW5hcyB2aXNpYmxlcyBlbiBlbCBvcmRlbiBkZXNlYWRvLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhcHBseUNvbHVtblZpc2liaWxpdHkodmlzaWJsZTogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdNYWluVGFibGUnKTtcclxuICAgICAgICBpZiAoIXRhYmxlKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIE1hcGVvIGRlIG5vbWJyZSBkZSBjb2x1bW5hIGEgY2xhc2UgQ1NTIGRlIGxhIGNlbGRhXHJcbiAgICAgICAgY29uc3QgY29sQ2xhc3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAgICAgICAgICdEZXBhcnRtZW50SWQnOiAnRGVwYXJ0bWVudElkdGJsJyxcclxuICAgICAgICAgICAgJ05hbWUnOiAnTmFtZXRibCcsXHJcbiAgICAgICAgICAgICdRdHlXb3JrZXJzJzogJ1F0eVdvcmtlcnN0YmwnLFxyXG4gICAgICAgICAgICAnU3RhcnREYXRlJzogJ1N0YXJ0RGF0ZXRibCcsXHJcbiAgICAgICAgICAgICdFbmREYXRlJzogJ0VuZERhdGV0YmwnLFxyXG4gICAgICAgICAgICAnRGVzY3JpcHRpb24nOiAnRGVzY3JpcHRpb250YmwnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gTWFwZW8gZGUgbm9tYnJlIGRlIGNvbHVtbmEgYSB0ZXh0byBkZWwgaGVhZGVyXHJcbiAgICAgICAgY29uc3QgaGVhZGVyVGV4dE1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICAgICAgICAgICAgJ0RlcGFydG1lbnRJZCc6ICdJZCBEZXBhcnRhbWVudG8nLFxyXG4gICAgICAgICAgICAnTmFtZSc6ICdOb21icmUgZGVsIGRlcGFydGFtZW50bycsXHJcbiAgICAgICAgICAgICdRdHlXb3JrZXJzJzogJ1RyYWJhamFkb3JlcycsXHJcbiAgICAgICAgICAgICdTdGFydERhdGUnOiAnRmVjaGEgaW5pY2lhbCcsXHJcbiAgICAgICAgICAgICdFbmREYXRlJzogJ0ZlY2hhIGZpbmFsJyxcclxuICAgICAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ0Rlc2NyaXBjaW9uJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFJlb3JkZW5hciB5IG1vc3RyYXIvb2N1bHRhciBoZWFkZXJzXHJcbiAgICAgICAgY29uc3QgaGVhZGVyUm93ID0gdGFibGUucXVlcnlTZWxlY3RvcigndGhlYWQgdHInKTtcclxuICAgICAgICBpZiAoaGVhZGVyUm93KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94Q2VsbCA9IGhlYWRlclJvdy5xdWVyeVNlbGVjdG9yKCcuY2hlY2stY2VsbC1hcHAnKTtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyQ2VsbHMgPSBBcnJheS5mcm9tKGhlYWRlclJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZDpub3QoLmNoZWNrLWNlbGwtYXBwKScpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE9jdWx0YXIgdG9kYXMgbGFzIGNlbGRhcyBwcmltZXJvXHJcbiAgICAgICAgICAgIGhlYWRlckNlbGxzLmZvckVhY2goY2VsbCA9PiAoY2VsbCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBNb3N0cmFyIHkgcmVvcmRlbmFyIHNvbG8gbGFzIHZpc2libGVzXHJcbiAgICAgICAgICAgIHZpc2libGUuZm9yRWFjaCgoY29sTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyVGV4dCA9IGhlYWRlclRleHRNYXBbY29sTmFtZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gaGVhZGVyQ2VsbHMuZmluZChjID0+IGMudGV4dENvbnRlbnQ/LnRyaW0oKSA9PT0gaGVhZGVyVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKGNlbGwpOyAvLyBNb3ZlciBhbCBmaW5hbCBwYXJhIHJlb3JkZW5hclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFzZWd1cmFyIHF1ZSBlbCBjaGVja2JveCBlc3TDqSBwcmltZXJvXHJcbiAgICAgICAgICAgIGlmIChjaGVja2JveENlbGwpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlclJvdy5pbnNlcnRCZWZvcmUoY2hlY2tib3hDZWxsLCBoZWFkZXJSb3cuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlb3JkZW5hciB5IG1vc3RyYXIvb2N1bHRhciBib2R5IHJvd3NcclxuICAgICAgICBjb25zdCBib2R5Um93cyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyJyk7XHJcbiAgICAgICAgYm9keVJvd3MuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94Q2VsbCA9IHJvdy5xdWVyeVNlbGVjdG9yKCcuY2hlY2stY2VsbC1hcHAnKTtcclxuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBBcnJheS5mcm9tKHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZDpub3QoLmNoZWNrLWNlbGwtYXBwKScpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE9jdWx0YXIgdG9kYXMgbGFzIGNlbGRhcyBwcmltZXJvXHJcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiAoY2VsbCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBNb3N0cmFyIHkgcmVvcmRlbmFyIHNvbG8gbGFzIHZpc2libGVzXHJcbiAgICAgICAgICAgIHZpc2libGUuZm9yRWFjaCgoY29sTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gY29sQ2xhc3NNYXBbY29sTmFtZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gY2VsbHMuZmluZChjID0+IGMuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAoY2VsbCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTsgLy8gTW92ZXIgYWwgZmluYWwgcGFyYSByZW9yZGVuYXJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBc2VndXJhciBxdWUgZWwgY2hlY2tib3ggZXN0w6kgcHJpbWVyb1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tib3hDZWxsKSB7XHJcbiAgICAgICAgICAgICAgICByb3cuaW5zZXJ0QmVmb3JlKGNoZWNrYm94Q2VsbCwgcm93LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3R1YWxpemEgZWwgZHJvcGRvd24gY29uIGxhcyB2aXN0YXMgZGlzcG9uaWJsZXMuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF2aWV3c01hbmFnZXIpIHJldHVybjtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZWQtdmlld3MtY29udGFpbmVyJyk7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgdmlld3MgPSB2aWV3c01hbmFnZXIuZ2V0QXZhaWxhYmxlVmlld3MoKTtcclxuICAgICAgICBpZiAodmlld3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJ0ZXh0LW11dGVkLXZpZXdzXCI+U2luIHZpc3RhcyBndWFyZGFkYXM8L3NwYW4+JztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcclxuICAgICAgICB2aWV3cy5mb3JFYWNoKCh2OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3Rhckljb24gPSB2LklzRGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgPyAnPGkgY2xhc3M9XCJmYSBmYS1zdGFyXCIgc3R5bGU9XCJjb2xvcjojZjBhZDRlO1wiIHRpdGxlPVwiVmlzdGEgcHJlZGV0ZXJtaW5hZGFcIj48L2k+J1xyXG4gICAgICAgICAgICAgICAgOiBgPGkgY2xhc3M9XCJmYSBmYS1zdGFyLW8gYnRuLXNldC1kZWZhdWx0XCIgZGF0YS12aWV3LWlkPVwiJHt2LlJlY0lkfVwiIHN0eWxlPVwiY29sb3I6Izk5OTsgY3Vyc29yOnBvaW50ZXI7XCIgdGl0bGU9XCJFc3RhYmxlY2VyIGNvbW8gcHJlZGV0ZXJtaW5hZGFcIj48L2k+YDtcclxuICAgICAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cInNhdmVkLXZpZXctaXRlbVwiIHN0eWxlPVwiZGlzcGxheTpmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjsgYWxpZ24taXRlbXM6Y2VudGVyOyBwYWRkaW5nOjVweCAxNXB4O1wiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBkYXRhLXZpZXc9XCIke3YuUmVjSWR9XCIgc3R5bGU9XCJmbGV4OjE7IGNvbG9yOiMzMzM7IHRleHQtZGVjb3JhdGlvbjpub25lO1wiPiR7di5WaWV3TmFtZX08L2E+XHJcbiAgICAgICAgICAgICAgICAke3N0YXJJY29ufVxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xyXG5cclxuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lcnMgcGFyYSBlc3RhYmxlY2VyIHZpc3RhIHBvciBkZWZlY3RvXHJcbiAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tc2V0LWRlZmF1bHQnKS5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3SWQgPSBwYXJzZUludCgoYnRuIGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZpZXdJZCB8fCAnMCcsIDEwKTtcclxuICAgICAgICAgICAgICAgIGlmICh2aWV3SWQgPiAwICYmIHZpZXdzTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCB2aWV3c01hbmFnZXIuc2V0RGVmYXVsdFZpZXcodmlld0lkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVWaWV3c0Ryb3Bkb3duKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdHVhbGl6YSBlbCBub21icmUgZGUgbGEgdmlzdGEgYWN0dWFsIGVuIGVsIGRyb3Bkb3duLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF2aWV3c01hbmFnZXIpIHJldHVybjtcclxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50LXZpZXctbmFtZScpO1xyXG4gICAgICAgIGlmIChlbCkgZWwudGV4dENvbnRlbnQgPSB2aWV3c01hbmFnZXIuZ2V0Q3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5cclxuIl19