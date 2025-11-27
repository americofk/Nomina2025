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
            // Debug: mostrar vistas disponibles
            const availableViews = viewsManager.getAvailableViews();
            console.log('Vistas disponibles:', availableViews);
            // Siempre actualizar el dropdown con las vistas disponibles
            updateViewsDropdown();
            // Si hay una vista por defecto con configuración, aplicarla
            if (configs.length > 0 && columnsManager) {
                columnsManager.applyColumnConfig(configs);
                applyColumnVisibility(columnsManager.getVisibleColumns());
                updateCurrentViewName();
            }
        }).catch((err) => {
            console.error('Error en initialize:', err);
        });
    }
    else {
        console.log('No se inicializó GridViewsManager:', {
            hasManager: !!w.GridViewsManager,
            hasToken: !!token,
            userRecId
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTV9EZXBhcnRtZW50LXZpZXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvTV9EZXBhcnRtZW50LXZpZXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7Ozs7Ozs7Ozs7QUFFSDs7O0dBR0c7QUFDSCxDQUFDLFNBQVMsbUJBQW1CO0lBQ3pCLE1BQU0sQ0FBQyxHQUFHLE1BQWEsQ0FBQztJQUN4QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDMUQsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPO0lBRXBCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNELE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQztJQUU1QixxQ0FBcUM7SUFDckMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ2pHLE1BQU0sY0FBYyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztJQUN2QyxNQUFNLFlBQVksR0FBMkI7UUFDekMsY0FBYyxFQUFFLGlCQUFpQjtRQUNqQyxNQUFNLEVBQUUseUJBQXlCO1FBQ2pDLFlBQVksRUFBRSxjQUFjO1FBQzVCLFdBQVcsRUFBRSxlQUFlO1FBQzVCLFNBQVMsRUFBRSxhQUFhO1FBQ3hCLGFBQWEsRUFBRSxhQUFhO0tBQy9CLENBQUM7SUFFRixJQUFJLGNBQWMsR0FBUSxJQUFJLENBQUM7SUFDL0IsSUFBSSxZQUFZLEdBQVEsSUFBSSxDQUFDO0lBRTdCLGlDQUFpQztJQUNqQyxJQUFJLENBQUMs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QixJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDMUIsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3hELElBQUksRUFBRTtZQUFFLEVBQUUsQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDL0QsQ0FBQztBQUNMLENBQUMsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgTV9EZXBhcnRtZW50LXZpZXdzLnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBJbnRlZ3JhY2nDs24gZGVsIHNpc3RlbWEgZGUgdmlzdGFzIGNvbiBlbCBtw7NkdWxvIGRlIGRlcGFydGFtZW50b3MuXHJcbiAqICAgICAgICAgICAgICBFc3RlIGFyY2hpdm8gc2UgY2FyZ2EgZGVzcHXDqXMgZGUgTV9EZXBhcnRtZW50LnRzLlxyXG4gKiBAYXV0aG9yIEVxdWlwbyBkZSBEZXNhcnJvbGxvXHJcbiAqIEBkYXRlIDIwMjVcclxuICogQG1vZHVsZSBEZXBhcnRhbWVudG9zVmlzdGFzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEluaWNpYWxpemEgZWwgc2lzdGVtYSBkZSBnZXN0acOzbiBkZSB2aXN0YXMgcGFyYSBkZXBhcnRhbWVudG9zLlxyXG4gKiBTZSBlamVjdXRhIGF1dG9tw6F0aWNhbWVudGUgYWwgY2FyZ2FyIGxhIHDDoWdpbmEuXHJcbiAqL1xyXG4oZnVuY3Rpb24gaW5pdERlcGFydG1lbnRWaWV3cygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHcgPSB3aW5kb3cgYXMgYW55O1xyXG4gICAgY29uc3QgcGFnZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlcGFydG1lbnQtcGFnZScpO1xyXG4gICAgaWYgKCFwYWdlRWwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0b2tlbiA9IHBhZ2VFbC5kYXRhc2V0LnRva2VuIHx8ICcnO1xyXG4gICAgY29uc3QgdXNlclJlY0lkID0gcGFyc2VJbnQocGFnZUVsLmRhdGFzZXQudXNlciB8fCAnMCcsIDEwKTtcclxuICAgIGNvbnN0IGFwaUJhc2UgPSAnL2FwaS92Mi4wJztcclxuXHJcbiAgICAvLyBDb2x1bW5hcyBkZWwgZ3JpZCBkZSBkZXBhcnRhbWVudG9zXHJcbiAgICBjb25zdCBhbGxDb2x1bW5zID0gWydEZXBhcnRtZW50SWQnLCAnTmFtZScsICdRdHlXb3JrZXJzJywgJ1N0YXJ0RGF0ZScsICdFbmREYXRlJywgJ0Rlc2NyaXB0aW9uJ107XHJcbiAgICBjb25zdCBkZWZhdWx0Q29sdW1ucyA9IFsuLi5hbGxDb2x1bW5zXTtcclxuICAgIGNvbnN0IGNvbHVtblRpdGxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICAgICAgICAnRGVwYXJ0bWVudElkJzogJ0lkIERlcGFydGFtZW50bycsXHJcbiAgICAgICAgJ05hbWUnOiAnTm9tYnJlIGRlbCBkZXBhcnRhbWVudG8nLFxyXG4gICAgICAgICdRdHlXb3JrZXJzJzogJ1RyYWJhamFkb3JlcycsXHJcbiAgICAgICAgJ1N0YXJ0RGF0ZSc6ICdGZWNoYSBpbmljaWFsJyxcclxuICAgICAgICAnRW5kRGF0ZSc6ICdGZWNoYSBmaW5hbCcsXHJcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ0Rlc2NyaXBjacOzbidcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGNvbHVtbnNNYW5hZ2VyOiBhbnkgPSBudWxsO1xyXG4gICAgbGV0IHZpZXdzTWFuYWdlcjogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyBJbmljaWFsaXphciBnZXN0b3IgZGUgY29sdW1uYXNcclxuICAgIGlmICh3LkdyaWRDb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgIGNvbHVtbnNNYW5hZ2VyID0gbmV3IHcuR3JpZENvbHVtbnNNYW5hZ2VyKFxyXG4gICAgICAgICAgICBhbGxDb2x1bW5zLFxyXG4gICAgICAgICAgICBkZWZhdWx0Q29sdW1ucyxcclxuICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5LFxyXG4gICAgICAgICAgICAoZjogc3RyaW5nKSA9PiBjb2x1bW5UaXRsZXNbZl0gfHwgZlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5pY2lhbGl6YXIgZ2VzdG9yIGRlIHZpc3Rhc1xyXG4gICAgaWYgKHcuR3JpZFZpZXdzTWFuYWdlciAmJiB0b2tlbiAmJiB1c2VyUmVjSWQgPiAwKSB7XHJcbiAgICAgICAgdmlld3NNYW5hZ2VyID0gbmV3IHcuR3JpZFZpZXdzTWFuYWdlcihhcGlCYXNlLCB0b2tlbiwgJ0RlcGFydG1lbnQnLCB1c2VyUmVjSWQsICcnKTtcclxuICAgICAgICB2aWV3c01hbmFnZXIuaW5pdGlhbGl6ZSgpLnRoZW4oKGNvbmZpZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIERlYnVnOiBtb3N0cmFyIHZpc3RhcyBkaXNwb25pYmxlc1xyXG4gICAgICAgICAgICBjb25zdCBhdmFpbGFibGVWaWV3cyA9IHZpZXdzTWFuYWdlci5nZXRBdmFpbGFibGVWaWV3cygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVmlzdGFzIGRpc3BvbmlibGVzOicsIGF2YWlsYWJsZVZpZXdzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNpZW1wcmUgYWN0dWFsaXphciBlbCBkcm9wZG93biBjb24gbGFzIHZpc3RhcyBkaXNwb25pYmxlc1xyXG4gICAgICAgICAgICB1cGRhdGVWaWV3c0Ryb3Bkb3duKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTaSBoYXkgdW5hIHZpc3RhIHBvciBkZWZlY3RvIGNvbiBjb25maWd1cmFjacOzbiwgYXBsaWNhcmxhXHJcbiAgICAgICAgICAgIGlmIChjb25maWdzLmxlbmd0aCA+IDAgJiYgY29sdW1uc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyLmFwcGx5Q29sdW1uQ29uZmlnKGNvbmZpZ3MpO1xyXG4gICAgICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5KGNvbHVtbnNNYW5hZ2VyLmdldFZpc2libGVDb2x1bW5zKCkpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlQ3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZW4gaW5pdGlhbGl6ZTonLCBlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm8gc2UgaW5pY2lhbGl6w7MgR3JpZFZpZXdzTWFuYWdlcjonLCB7XHJcbiAgICAgICAgICAgIGhhc01hbmFnZXI6ICEhdy5HcmlkVmlld3NNYW5hZ2VyLFxyXG4gICAgICAgICAgICBoYXNUb2tlbjogISF0b2tlbixcclxuICAgICAgICAgICAgdXNlclJlY0lkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IEFicmlyIG1vZGFsIGRlIGNvbHVtbmFzXHJcbiAgICBjb25zdCBidG5NYW5hZ2VDb2x1bW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1tYW5hZ2UtY29sdW1ucycpO1xyXG4gICAgaWYgKGJ0bk1hbmFnZUNvbHVtbnMpIHtcclxuICAgICAgICBidG5NYW5hZ2VDb2x1bW5zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb2x1bW5zTWFuYWdlcj8uc2hvd0NvbHVtbnNNb2RhbCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEV2ZW50OiBBcGxpY2FyIGNvbHVtbmFzIGRlbCBtb2RhbFxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICh0YXJnZXQuaWQgPT09ICdidG4tYXBwbHktY29sdW1ucycpIHtcclxuICAgICAgICAgICAgY29sdW1uc01hbmFnZXI/LmFwcGx5Q29sdW1ucygpO1xyXG4gICAgICAgICAgICAoJCBhcyBhbnkpKCcjbW9kYWwtbWFuYWdlLWNvbHVtbnMnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICBpZiAodmlld3NNYW5hZ2VyPy5oYXNDdXJyZW50VmlldygpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBNb3N0cmFyIGVsIGJvdMOzbiBndWFyZGFyIGNhbWJpb3NcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ0blNhdmVDaGFuZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1zYXZlLXZpZXctY2hhbmdlcycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0blNhdmVDaGFuZ2VzKSBidG5TYXZlQ2hhbmdlcy5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBFdmVudDogTnVldmEgdmlzdGFcclxuICAgIGNvbnN0IGJ0bk5ld1ZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy12aWV3Jyk7XHJcbiAgICBpZiAoYnRuTmV3Vmlldykge1xyXG4gICAgICAgIGJ0bk5ld1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdOYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1uYW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKHZpZXdOYW1lSW5wdXQpIHZpZXdOYW1lSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgKCQgYXMgYW55KSgnI21vZGFsLXNhdmUtdmlldycpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IENvbmZpcm1hciBndWFyZGFyIG51ZXZhIHZpc3RhXHJcbiAgICBjb25zdCBidG5Db25maXJtU2F2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tY29uZmlybS1zYXZlLXZpZXcnKTtcclxuICAgIGlmIChidG5Db25maXJtU2F2ZSkge1xyXG4gICAgICAgIGJ0bkNvbmZpcm1TYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctbmFtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSAodmlld05hbWVJbnB1dD8udmFsdWUgfHwgJycpLnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKCFuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB3LndpbmRvd3NfbWVzc2FnZT8uKCdJbmdyZXNlIHVuIG5vbWJyZSBwYXJhIGxhIHZpc3RhJywgJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZpZXdzTWFuYWdlciAmJiBjb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNEZWZhdWx0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LWlzLWRlZmF1bHQnKSBhcyBIVE1MSW5wdXRFbGVtZW50KT8uY2hlY2tlZCB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzUHVibGljID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LWlzLXB1YmxpYycpIGFzIEhUTUxJbnB1dEVsZW1lbnQpPy5jaGVja2VkIHx8IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCB2aWV3c01hbmFnZXIuc2F2ZVZpZXcobmFtZSwgY29sdW1uc01hbmFnZXIuZ2V0Q3VycmVudENvbHVtbkNvbmZpZygpLCBpc0RlZmF1bHQsIGlzUHVibGljKTtcclxuICAgICAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICAgICAgICAgICgkIGFzIGFueSkoJyNtb2RhbC1zYXZlLXZpZXcnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEV2ZW50OiBHdWFyZGFyIGNhbWJpb3MgZW4gdmlzdGEgYWN0dWFsXHJcbiAgICBjb25zdCBidG5TYXZlQ2hhbmdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tc2F2ZS12aWV3LWNoYW5nZXMnKTtcclxuICAgIGlmIChidG5TYXZlQ2hhbmdlcykge1xyXG4gICAgICAgIGJ0blNhdmVDaGFuZ2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAodmlld3NNYW5hZ2VyICYmIGNvbHVtbnNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IHZpZXdzTWFuYWdlci51cGRhdGVWaWV3KGNvbHVtbnNNYW5hZ2VyLmdldEN1cnJlbnRDb2x1bW5Db25maWcoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBPY3VsdGFyIGVsIGJvdMOzbiBndWFyZGFyIGNhbWJpb3NcclxuICAgICAgICAgICAgICAgICAgICBidG5TYXZlQ2hhbmdlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IENsaWNrIGVuIHZpc3RhIGRlbCBkcm9wZG93blxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGFuY2hvciA9IHRhcmdldC5jbG9zZXN0KCdbZGF0YS12aWV3XScpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICghYW5jaG9yKSByZXR1cm47XHJcblxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCB2aWV3SWQgPSBhbmNob3IuZGF0YXNldC52aWV3O1xyXG4gICAgICAgIGNvbnN0IGJ0blNhdmVDaGFuZ2VzRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXNhdmUtdmlldy1jaGFuZ2VzJyk7XHJcblxyXG4gICAgICAgIGlmICh2aWV3SWQgPT09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICBjb2x1bW5zTWFuYWdlcj8ucmVzZXRUb0RlZmF1bHQoZGVmYXVsdENvbHVtbnMpO1xyXG4gICAgICAgICAgICBhcHBseUNvbHVtblZpc2liaWxpdHkoZGVmYXVsdENvbHVtbnMpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Vmlld05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudC12aWV3LW5hbWUnKTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRWaWV3TmFtZSkgY3VycmVudFZpZXdOYW1lLnRleHRDb250ZW50ID0gJ1Zpc3RhIHBvciBkZWZlY3RvJztcclxuICAgICAgICAgICAgLy8gT2N1bHRhciBib3TDs24gZ3VhcmRhciBjYW1iaW9zXHJcbiAgICAgICAgICAgIGlmIChidG5TYXZlQ2hhbmdlc0VsKSBidG5TYXZlQ2hhbmdlc0VsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2aWV3c01hbmFnZXIgJiYgY29sdW1uc01hbmFnZXIgJiYgdmlld0lkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZ3MgPSBhd2FpdCB2aWV3c01hbmFnZXIubG9hZFZpZXcocGFyc2VJbnQodmlld0lkLCAxMCkpO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyLmFwcGx5Q29sdW1uQ29uZmlnKGNvbmZpZ3MpO1xyXG4gICAgICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5KGNvbHVtbnNNYW5hZ2VyLmdldFZpc2libGVDb2x1bW5zKCkpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlQ3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBPY3VsdGFyIGJvdMOzbiBndWFyZGFyIGNhbWJpb3MgYWwgY2FyZ2FyIHVuYSB2aXN0YVxyXG4gICAgICAgICAgICAgICAgaWYgKGJ0blNhdmVDaGFuZ2VzRWwpIGJ0blNhdmVDaGFuZ2VzRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBsaWNhIGxhIHZpc2liaWxpZGFkIHkgb3JkZW4gZGUgY29sdW1uYXMgYSBsYSB0YWJsYS5cclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIEFycmF5IGRlIG5vbWJyZXMgZGUgY29sdW1uYXMgdmlzaWJsZXMgZW4gZWwgb3JkZW4gZGVzZWFkby5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYXBwbHlDb2x1bW5WaXNpYmlsaXR5KHZpc2libGU6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTWFpblRhYmxlJyk7XHJcbiAgICAgICAgaWYgKCF0YWJsZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBNYXBlbyBkZSBub21icmUgZGUgY29sdW1uYSBhIGNsYXNlIENTUyBkZSBsYSBjZWxkYVxyXG4gICAgICAgIGNvbnN0IGNvbENsYXNzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgICAgICAgICAnRGVwYXJ0bWVudElkJzogJ0RlcGFydG1lbnRJZHRibCcsXHJcbiAgICAgICAgICAgICdOYW1lJzogJ05hbWV0YmwnLFxyXG4gICAgICAgICAgICAnUXR5V29ya2Vycyc6ICdRdHlXb3JrZXJzdGJsJyxcclxuICAgICAgICAgICAgJ1N0YXJ0RGF0ZSc6ICdTdGFydERhdGV0YmwnLFxyXG4gICAgICAgICAgICAnRW5kRGF0ZSc6ICdFbmREYXRldGJsJyxcclxuICAgICAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ0Rlc2NyaXB0aW9udGJsJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIE1hcGVvIGRlIG5vbWJyZSBkZSBjb2x1bW5hIGEgdGV4dG8gZGVsIGhlYWRlclxyXG4gICAgICAgIGNvbnN0IGhlYWRlclRleHRNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAgICAgICAgICdEZXBhcnRtZW50SWQnOiAnSWQgRGVwYXJ0YW1lbnRvJyxcclxuICAgICAgICAgICAgJ05hbWUnOiAnTm9tYnJlIGRlbCBkZXBhcnRhbWVudG8nLFxyXG4gICAgICAgICAgICAnUXR5V29ya2Vycyc6ICdUcmFiYWphZG9yZXMnLFxyXG4gICAgICAgICAgICAnU3RhcnREYXRlJzogJ0ZlY2hhIGluaWNpYWwnLFxyXG4gICAgICAgICAgICAnRW5kRGF0ZSc6ICdGZWNoYSBmaW5hbCcsXHJcbiAgICAgICAgICAgICdEZXNjcmlwdGlvbic6ICdEZXNjcmlwY2lvbidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBSZW9yZGVuYXIgeSBtb3N0cmFyL29jdWx0YXIgaGVhZGVyc1xyXG4gICAgICAgIGNvbnN0IGhlYWRlclJvdyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkIHRyJyk7XHJcbiAgICAgICAgaWYgKGhlYWRlclJvdykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja2JveENlbGwgPSBoZWFkZXJSb3cucXVlcnlTZWxlY3RvcignLmNoZWNrLWNlbGwtYXBwJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckNlbGxzID0gQXJyYXkuZnJvbShoZWFkZXJSb3cucXVlcnlTZWxlY3RvckFsbCgndGQ6bm90KC5jaGVjay1jZWxsLWFwcCknKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBPY3VsdGFyIHRvZGFzIGxhcyBjZWxkYXMgcHJpbWVyb1xyXG4gICAgICAgICAgICBoZWFkZXJDZWxscy5mb3JFYWNoKGNlbGwgPT4gKGNlbGwgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgLy8gTW9zdHJhciB5IHJlb3JkZW5hciBzb2xvIGxhcyB2aXNpYmxlc1xyXG4gICAgICAgICAgICB2aXNpYmxlLmZvckVhY2goKGNvbE5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlclRleHQgPSBoZWFkZXJUZXh0TWFwW2NvbE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGhlYWRlckNlbGxzLmZpbmQoYyA9PiBjLnRleHRDb250ZW50Py50cmltKCkgPT09IGhlYWRlclRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAoY2VsbCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlclJvdy5hcHBlbmRDaGlsZChjZWxsKTsgLy8gTW92ZXIgYWwgZmluYWwgcGFyYSByZW9yZGVuYXJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBc2VndXJhciBxdWUgZWwgY2hlY2tib3ggZXN0w6kgcHJpbWVyb1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tib3hDZWxsKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJSb3cuaW5zZXJ0QmVmb3JlKGNoZWNrYm94Q2VsbCwgaGVhZGVyUm93LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW9yZGVuYXIgeSBtb3N0cmFyL29jdWx0YXIgYm9keSByb3dzXHJcbiAgICAgICAgY29uc3QgYm9keVJvd3MgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0cicpO1xyXG4gICAgICAgIGJvZHlSb3dzLmZvckVhY2goKHJvdykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja2JveENlbGwgPSByb3cucXVlcnlTZWxlY3RvcignLmNoZWNrLWNlbGwtYXBwJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gQXJyYXkuZnJvbShyb3cucXVlcnlTZWxlY3RvckFsbCgndGQ6bm90KC5jaGVjay1jZWxsLWFwcCknKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBPY3VsdGFyIHRvZGFzIGxhcyBjZWxkYXMgcHJpbWVyb1xyXG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4gKGNlbGwgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgLy8gTW9zdHJhciB5IHJlb3JkZW5hciBzb2xvIGxhcyB2aXNpYmxlc1xyXG4gICAgICAgICAgICB2aXNpYmxlLmZvckVhY2goKGNvbE5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNvbENsYXNzTWFwW2NvbE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGNlbGxzLmZpbmQoYyA9PiBjLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjZWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKGNlbGwgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7IC8vIE1vdmVyIGFsIGZpbmFsIHBhcmEgcmVvcmRlbmFyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQXNlZ3VyYXIgcXVlIGVsIGNoZWNrYm94IGVzdMOpIHByaW1lcm9cclxuICAgICAgICAgICAgaWYgKGNoZWNrYm94Q2VsbCkge1xyXG4gICAgICAgICAgICAgICAgcm93Lmluc2VydEJlZm9yZShjaGVja2JveENlbGwsIHJvdy5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsaXphIGVsIGRyb3Bkb3duIGNvbiBsYXMgdmlzdGFzIGRpc3BvbmlibGVzLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVWaWV3c0Ryb3Bkb3duKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdmlld3NNYW5hZ2VyKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVkLXZpZXdzLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHZpZXdzID0gdmlld3NNYW5hZ2VyLmdldEF2YWlsYWJsZVZpZXdzKCk7XHJcbiAgICAgICAgaWYgKHZpZXdzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwidGV4dC1tdXRlZC12aWV3c1wiPlNpbiB2aXN0YXMgZ3VhcmRhZGFzPC9zcGFuPic7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gJyc7XHJcbiAgICAgICAgdmlld3MuZm9yRWFjaCgodjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJJY29uID0gdi5Jc0RlZmF1bHRcclxuICAgICAgICAgICAgICAgID8gJzxpIGNsYXNzPVwiZmEgZmEtc3RhclwiIHN0eWxlPVwiY29sb3I6I2YwYWQ0ZTtcIiB0aXRsZT1cIlZpc3RhIHByZWRldGVybWluYWRhXCI+PC9pPidcclxuICAgICAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmEgZmEtc3Rhci1vIGJ0bi1zZXQtZGVmYXVsdFwiIGRhdGEtdmlldy1pZD1cIiR7di5SZWNJZH1cIiBzdHlsZT1cImNvbG9yOiM5OTk7IGN1cnNvcjpwb2ludGVyO1wiIHRpdGxlPVwiRXN0YWJsZWNlciBjb21vIHByZWRldGVybWluYWRhXCI+PC9pPmA7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJzYXZlZC12aWV3LWl0ZW1cIiBzdHlsZT1cImRpc3BsYXk6ZmxleDsganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOmNlbnRlcjsgcGFkZGluZzo1cHggMTVweDtcIj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS12aWV3PVwiJHt2LlJlY0lkfVwiIHN0eWxlPVwiZmxleDoxOyBjb2xvcjojMzMzOyB0ZXh0LWRlY29yYXRpb246bm9uZTtcIj4ke3YuVmlld05hbWV9PC9hPlxyXG4gICAgICAgICAgICAgICAgJHtzdGFySWNvbn1cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJzIHBhcmEgZXN0YWJsZWNlciB2aXN0YSBwb3IgZGVmZWN0b1xyXG4gICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLXNldC1kZWZhdWx0JykuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgdmlld0lkID0gcGFyc2VJbnQoKGJ0biBhcyBIVE1MRWxlbWVudCkuZGF0YXNldC52aWV3SWQgfHwgJzAnLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlld0lkID4gMCAmJiB2aWV3c01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgdmlld3NNYW5hZ2VyLnNldERlZmF1bHRWaWV3KHZpZXdJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmlld3NEcm9wZG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3R1YWxpemEgZWwgbm9tYnJlIGRlIGxhIHZpc3RhIGFjdHVhbCBlbiBlbCBkcm9wZG93bi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlQ3VycmVudFZpZXdOYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdmlld3NNYW5hZ2VyKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudC12aWV3LW5hbWUnKTtcclxuICAgICAgICBpZiAoZWwpIGVsLnRleHRDb250ZW50ID0gdmlld3NNYW5hZ2VyLmdldEN1cnJlbnRWaWV3TmFtZSgpO1xyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuXHJcbiJdfQ==