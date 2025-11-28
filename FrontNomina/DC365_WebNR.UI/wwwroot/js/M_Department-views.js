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
    const allColumns = ['DepartmentId', 'Name', 'AccountCode', 'QtyWorkers', 'StartDate', 'EndDate', 'Description'];
    const defaultColumns = [...allColumns];
    const columnTitles = {
        'DepartmentId': 'Id Departamento',
        'Name': 'Nombre del departamento',
        'AccountCode': 'Cuenta contable',
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
            'AccountCode': 'AccountCodetbl',
            'QtyWorkers': 'QtyWorkerstbl',
            'StartDate': 'StartDatetbl',
            'EndDate': 'EndDatetbl',
            'Description': 'Descriptiontbl'
        };
        // Mapeo de nombre de columna a texto del header
        const headerTextMap = {
            'DepartmentId': 'Id Departamento',
            'Name': 'Nombre del departamento',
            'AccountCode': 'Cuenta contable',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTV9EZXBhcnRtZW50LXZpZXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvTV9EZXBhcnRtZW50LXZpZXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7Ozs7Ozs7Ozs7QUFFSDs7O0dBR0c7QUFDSCxDQUFDLFNBQVMsbUJBQW1CO0lBQ3pCLE1BQU0sQ0FBQyxHQUFHLE1BQWEsQ0FBQztJQUN4QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDMUQsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPO0lBRXBCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNELE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQztJQUU1QixxQ0FBcUM7SUFDckMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNoSCxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7SUFDdkMsTUFBTSxZQUFZLEdBQTJCO1FBQ3pDLGNBQWMsRUFBRSxpQkFBaUI7UUFDakMsTUFBTSxFQUFFLHlCQUF5QjtRQUNqQyxhQUFhLEVBQUUsaUJBQWlCO1FBQ2hDLFlBQVksRUFBRSxjQUFjO1FBQzVCLFdBQVcsRUFBRSxlQUFlO1FBQzVCLFNBQVMsRUFBRSxhQUFhO1FBQ3hCLGFBQWEsRUFBRSxhQUFhO0tBQy9CLENBQUM7SUFFRixJQUFJLGNBQWMsR0FBUSxJQUFJLENBQUM7SUFDL0IsSUFBSSxZQUFZLEdBQVEsSUFBSSxD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QztRQUNILFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTNCLG9EQUFvRDtRQUNwRCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUMzRCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQU8sQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUNwQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUUsR0FBbUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDO29CQUM3QixNQUFNLE9BQU8sR0FBRyxNQUFNLFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzFELElBQUksT0FBTyxFQUFFLENBQUM7d0JBQ1YsbUJBQW1CLEVBQUUsQ0FBQztvQkFDMUIsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUyxxQkFBcUI7UUFDMUIsSUFBSSxDQUFDLFlBQVk7WUFBRSxPQUFPO1FBQzFCLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN4RCxJQUFJLEVBQUU7WUFBRSxFQUFFLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQy9ELENBQUM7QUFDTCxDQUFDLENBQUMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIE1fRGVwYXJ0bWVudC12aWV3cy50c1xyXG4gKiBAZGVzY3JpcHRpb24gSW50ZWdyYWNpw7NuIGRlbCBzaXN0ZW1hIGRlIHZpc3RhcyBjb24gZWwgbcOzZHVsbyBkZSBkZXBhcnRhbWVudG9zLlxyXG4gKiAgICAgICAgICAgICAgRXN0ZSBhcmNoaXZvIHNlIGNhcmdhIGRlc3B1w6lzIGRlIE1fRGVwYXJ0bWVudC50cy5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgRGVwYXJ0YW1lbnRvc1Zpc3Rhc1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBJbmljaWFsaXphIGVsIHNpc3RlbWEgZGUgZ2VzdGnDs24gZGUgdmlzdGFzIHBhcmEgZGVwYXJ0YW1lbnRvcy5cclxuICogU2UgZWplY3V0YSBhdXRvbcOhdGljYW1lbnRlIGFsIGNhcmdhciBsYSBww6FnaW5hLlxyXG4gKi9cclxuKGZ1bmN0aW9uIGluaXREZXBhcnRtZW50Vmlld3MoKTogdm9pZCB7XHJcbiAgICBjb25zdCB3ID0gd2luZG93IGFzIGFueTtcclxuICAgIGNvbnN0IHBhZ2VFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXBhcnRtZW50LXBhZ2UnKTtcclxuICAgIGlmICghcGFnZUVsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdG9rZW4gPSBwYWdlRWwuZGF0YXNldC50b2tlbiB8fCAnJztcclxuICAgIGNvbnN0IHVzZXJSZWNJZCA9IHBhcnNlSW50KHBhZ2VFbC5kYXRhc2V0LnVzZXIgfHwgJzAnLCAxMCk7XHJcbiAgICBjb25zdCBhcGlCYXNlID0gJy9hcGkvdjIuMCc7XHJcblxyXG4gICAgLy8gQ29sdW1uYXMgZGVsIGdyaWQgZGUgZGVwYXJ0YW1lbnRvc1xyXG4gICAgY29uc3QgYWxsQ29sdW1ucyA9IFsnRGVwYXJ0bWVudElkJywgJ05hbWUnLCAnQWNjb3VudENvZGUnLCAnUXR5V29ya2VycycsICdTdGFydERhdGUnLCAnRW5kRGF0ZScsICdEZXNjcmlwdGlvbiddO1xyXG4gICAgY29uc3QgZGVmYXVsdENvbHVtbnMgPSBbLi4uYWxsQ29sdW1uc107XHJcbiAgICBjb25zdCBjb2x1bW5UaXRsZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAgICAgJ0RlcGFydG1lbnRJZCc6ICdJZCBEZXBhcnRhbWVudG8nLFxyXG4gICAgICAgICdOYW1lJzogJ05vbWJyZSBkZWwgZGVwYXJ0YW1lbnRvJyxcclxuICAgICAgICAnQWNjb3VudENvZGUnOiAnQ3VlbnRhIGNvbnRhYmxlJyxcclxuICAgICAgICAnUXR5V29ya2Vycyc6ICdUcmFiYWphZG9yZXMnLFxyXG4gICAgICAgICdTdGFydERhdGUnOiAnRmVjaGEgaW5pY2lhbCcsXHJcbiAgICAgICAgJ0VuZERhdGUnOiAnRmVjaGEgZmluYWwnLFxyXG4gICAgICAgICdEZXNjcmlwdGlvbic6ICdEZXNjcmlwY2nDs24nXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBjb2x1bW5zTWFuYWdlcjogYW55ID0gbnVsbDtcclxuICAgIGxldCB2aWV3c01hbmFnZXI6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLy8gSW5pY2lhbGl6YXIgZ2VzdG9yIGRlIGNvbHVtbmFzXHJcbiAgICBpZiAody5HcmlkQ29sdW1uc01hbmFnZXIpIHtcclxuICAgICAgICBjb2x1bW5zTWFuYWdlciA9IG5ldyB3LkdyaWRDb2x1bW5zTWFuYWdlcihcclxuICAgICAgICAgICAgYWxsQ29sdW1ucyxcclxuICAgICAgICAgICAgZGVmYXVsdENvbHVtbnMsXHJcbiAgICAgICAgICAgIGFwcGx5Q29sdW1uVmlzaWJpbGl0eSxcclxuICAgICAgICAgICAgKGY6IHN0cmluZykgPT4gY29sdW1uVGl0bGVzW2ZdIHx8IGZcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluaWNpYWxpemFyIGdlc3RvciBkZSB2aXN0YXNcclxuICAgIGlmICh3LkdyaWRWaWV3c01hbmFnZXIgJiYgdG9rZW4gJiYgdXNlclJlY0lkID4gMCkge1xyXG4gICAgICAgIHZpZXdzTWFuYWdlciA9IG5ldyB3LkdyaWRWaWV3c01hbmFnZXIoYXBpQmFzZSwgdG9rZW4sICdEZXBhcnRtZW50JywgdXNlclJlY0lkLCAnJyk7XHJcbiAgICAgICAgdmlld3NNYW5hZ2VyLmluaXRpYWxpemUoKS50aGVuKChjb25maWdzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBTaWVtcHJlIGFjdHVhbGl6YXIgZWwgZHJvcGRvd24gY29uIGxhcyB2aXN0YXMgZGlzcG9uaWJsZXNcclxuICAgICAgICAgICAgdXBkYXRlVmlld3NEcm9wZG93bigpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2kgaGF5IHVuYSB2aXN0YSBwb3IgZGVmZWN0byBjb24gY29uZmlndXJhY2nDs24sIGFwbGljYXJsYVxyXG4gICAgICAgICAgICBpZiAoY29uZmlncy5sZW5ndGggPiAwICYmIGNvbHVtbnNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zTWFuYWdlci5hcHBseUNvbHVtbkNvbmZpZyhjb25maWdzKTtcclxuICAgICAgICAgICAgICAgIGFwcGx5Q29sdW1uVmlzaWJpbGl0eShjb2x1bW5zTWFuYWdlci5nZXRWaXNpYmxlQ29sdW1ucygpKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IEFicmlyIG1vZGFsIGRlIGNvbHVtbmFzXHJcbiAgICBjb25zdCBidG5NYW5hZ2VDb2x1bW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1tYW5hZ2UtY29sdW1ucycpO1xyXG4gICAgaWYgKGJ0bk1hbmFnZUNvbHVtbnMpIHtcclxuICAgICAgICBidG5NYW5hZ2VDb2x1bW5zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb2x1bW5zTWFuYWdlcj8uc2hvd0NvbHVtbnNNb2RhbCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEV2ZW50OiBBcGxpY2FyIGNvbHVtbmFzIGRlbCBtb2RhbFxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICh0YXJnZXQuaWQgPT09ICdidG4tYXBwbHktY29sdW1ucycpIHtcclxuICAgICAgICAgICAgY29sdW1uc01hbmFnZXI/LmFwcGx5Q29sdW1ucygpO1xyXG4gICAgICAgICAgICAoJCBhcyBhbnkpKCcjbW9kYWwtbWFuYWdlLWNvbHVtbnMnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICBpZiAodmlld3NNYW5hZ2VyPy5oYXNDdXJyZW50VmlldygpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBNb3N0cmFyIGVsIGJvdMOzbiBndWFyZGFyIGNhbWJpb3NcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ0blNhdmVDaGFuZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1zYXZlLXZpZXctY2hhbmdlcycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0blNhdmVDaGFuZ2VzKSBidG5TYXZlQ2hhbmdlcy5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBFdmVudDogTnVldmEgdmlzdGFcclxuICAgIGNvbnN0IGJ0bk5ld1ZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW5ldy12aWV3Jyk7XHJcbiAgICBpZiAoYnRuTmV3Vmlldykge1xyXG4gICAgICAgIGJ0bk5ld1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdOYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1uYW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKHZpZXdOYW1lSW5wdXQpIHZpZXdOYW1lSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgKCQgYXMgYW55KSgnI21vZGFsLXNhdmUtdmlldycpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IENvbmZpcm1hciBndWFyZGFyIG51ZXZhIHZpc3RhXHJcbiAgICBjb25zdCBidG5Db25maXJtU2F2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tY29uZmlybS1zYXZlLXZpZXcnKTtcclxuICAgIGlmIChidG5Db25maXJtU2F2ZSkge1xyXG4gICAgICAgIGJ0bkNvbmZpcm1TYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctbmFtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSAodmlld05hbWVJbnB1dD8udmFsdWUgfHwgJycpLnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKCFuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB3LndpbmRvd3NfbWVzc2FnZT8uKCdJbmdyZXNlIHVuIG5vbWJyZSBwYXJhIGxhIHZpc3RhJywgJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZpZXdzTWFuYWdlciAmJiBjb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNEZWZhdWx0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LWlzLWRlZmF1bHQnKSBhcyBIVE1MSW5wdXRFbGVtZW50KT8uY2hlY2tlZCB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzUHVibGljID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LWlzLXB1YmxpYycpIGFzIEhUTUxJbnB1dEVsZW1lbnQpPy5jaGVja2VkIHx8IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCB2aWV3c01hbmFnZXIuc2F2ZVZpZXcobmFtZSwgY29sdW1uc01hbmFnZXIuZ2V0Q3VycmVudENvbHVtbkNvbmZpZygpLCBpc0RlZmF1bHQsIGlzUHVibGljKTtcclxuICAgICAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICAgICAgICAgICgkIGFzIGFueSkoJyNtb2RhbC1zYXZlLXZpZXcnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEV2ZW50OiBHdWFyZGFyIGNhbWJpb3MgZW4gdmlzdGEgYWN0dWFsXHJcbiAgICBjb25zdCBidG5TYXZlQ2hhbmdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tc2F2ZS12aWV3LWNoYW5nZXMnKTtcclxuICAgIGlmIChidG5TYXZlQ2hhbmdlcykge1xyXG4gICAgICAgIGJ0blNhdmVDaGFuZ2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAodmlld3NNYW5hZ2VyICYmIGNvbHVtbnNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IHZpZXdzTWFuYWdlci51cGRhdGVWaWV3KGNvbHVtbnNNYW5hZ2VyLmdldEN1cnJlbnRDb2x1bW5Db25maWcoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBPY3VsdGFyIGVsIGJvdMOzbiBndWFyZGFyIGNhbWJpb3NcclxuICAgICAgICAgICAgICAgICAgICBidG5TYXZlQ2hhbmdlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IENsaWNrIGVuIHZpc3RhIGRlbCBkcm9wZG93blxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGFuY2hvciA9IHRhcmdldC5jbG9zZXN0KCdbZGF0YS12aWV3XScpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICghYW5jaG9yKSByZXR1cm47XHJcblxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCB2aWV3SWQgPSBhbmNob3IuZGF0YXNldC52aWV3O1xyXG4gICAgICAgIGNvbnN0IGJ0blNhdmVDaGFuZ2VzRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXNhdmUtdmlldy1jaGFuZ2VzJyk7XHJcblxyXG4gICAgICAgIGlmICh2aWV3SWQgPT09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICBjb2x1bW5zTWFuYWdlcj8ucmVzZXRUb0RlZmF1bHQoZGVmYXVsdENvbHVtbnMpO1xyXG4gICAgICAgICAgICBhcHBseUNvbHVtblZpc2liaWxpdHkoZGVmYXVsdENvbHVtbnMpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Vmlld05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudC12aWV3LW5hbWUnKTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRWaWV3TmFtZSkgY3VycmVudFZpZXdOYW1lLnRleHRDb250ZW50ID0gJ1Zpc3RhIHBvciBkZWZlY3RvJztcclxuICAgICAgICAgICAgLy8gT2N1bHRhciBib3TDs24gZ3VhcmRhciBjYW1iaW9zXHJcbiAgICAgICAgICAgIGlmIChidG5TYXZlQ2hhbmdlc0VsKSBidG5TYXZlQ2hhbmdlc0VsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2aWV3c01hbmFnZXIgJiYgY29sdW1uc01hbmFnZXIgJiYgdmlld0lkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZ3MgPSBhd2FpdCB2aWV3c01hbmFnZXIubG9hZFZpZXcocGFyc2VJbnQodmlld0lkLCAxMCkpO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyLmFwcGx5Q29sdW1uQ29uZmlnKGNvbmZpZ3MpO1xyXG4gICAgICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5KGNvbHVtbnNNYW5hZ2VyLmdldFZpc2libGVDb2x1bW5zKCkpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlQ3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBPY3VsdGFyIGJvdMOzbiBndWFyZGFyIGNhbWJpb3MgYWwgY2FyZ2FyIHVuYSB2aXN0YVxyXG4gICAgICAgICAgICAgICAgaWYgKGJ0blNhdmVDaGFuZ2VzRWwpIGJ0blNhdmVDaGFuZ2VzRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBsaWNhIGxhIHZpc2liaWxpZGFkIHkgb3JkZW4gZGUgY29sdW1uYXMgYSBsYSB0YWJsYS5cclxuICAgICAqIEBwYXJhbSB2aXNpYmxlIEFycmF5IGRlIG5vbWJyZXMgZGUgY29sdW1uYXMgdmlzaWJsZXMgZW4gZWwgb3JkZW4gZGVzZWFkby5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYXBwbHlDb2x1bW5WaXNpYmlsaXR5KHZpc2libGU6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTWFpblRhYmxlJyk7XHJcbiAgICAgICAgaWYgKCF0YWJsZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBNYXBlbyBkZSBub21icmUgZGUgY29sdW1uYSBhIGNsYXNlIENTUyBkZSBsYSBjZWxkYVxyXG4gICAgICAgIGNvbnN0IGNvbENsYXNzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgICAgICAgICAnRGVwYXJ0bWVudElkJzogJ0RlcGFydG1lbnRJZHRibCcsXHJcbiAgICAgICAgICAgICdOYW1lJzogJ05hbWV0YmwnLFxyXG4gICAgICAgICAgICAnQWNjb3VudENvZGUnOiAnQWNjb3VudENvZGV0YmwnLFxyXG4gICAgICAgICAgICAnUXR5V29ya2Vycyc6ICdRdHlXb3JrZXJzdGJsJyxcclxuICAgICAgICAgICAgJ1N0YXJ0RGF0ZSc6ICdTdGFydERhdGV0YmwnLFxyXG4gICAgICAgICAgICAnRW5kRGF0ZSc6ICdFbmREYXRldGJsJyxcclxuICAgICAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ0Rlc2NyaXB0aW9udGJsJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIE1hcGVvIGRlIG5vbWJyZSBkZSBjb2x1bW5hIGEgdGV4dG8gZGVsIGhlYWRlclxyXG4gICAgICAgIGNvbnN0IGhlYWRlclRleHRNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAgICAgICAgICdEZXBhcnRtZW50SWQnOiAnSWQgRGVwYXJ0YW1lbnRvJyxcclxuICAgICAgICAgICAgJ05hbWUnOiAnTm9tYnJlIGRlbCBkZXBhcnRhbWVudG8nLFxyXG4gICAgICAgICAgICAnQWNjb3VudENvZGUnOiAnQ3VlbnRhIGNvbnRhYmxlJyxcclxuICAgICAgICAgICAgJ1F0eVdvcmtlcnMnOiAnVHJhYmFqYWRvcmVzJyxcclxuICAgICAgICAgICAgJ1N0YXJ0RGF0ZSc6ICdGZWNoYSBpbmljaWFsJyxcclxuICAgICAgICAgICAgJ0VuZERhdGUnOiAnRmVjaGEgZmluYWwnLFxyXG4gICAgICAgICAgICAnRGVzY3JpcHRpb24nOiAnRGVzY3JpcGNpb24nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gUmVvcmRlbmFyIHkgbW9zdHJhci9vY3VsdGFyIGhlYWRlcnNcclxuICAgICAgICBjb25zdCBoZWFkZXJSb3cgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0aGVhZCB0cicpO1xyXG4gICAgICAgIGlmIChoZWFkZXJSb3cpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hDZWxsID0gaGVhZGVyUm93LnF1ZXJ5U2VsZWN0b3IoJy5jaGVjay1jZWxsLWFwcCcpO1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJDZWxscyA9IEFycmF5LmZyb20oaGVhZGVyUm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkOm5vdCguY2hlY2stY2VsbC1hcHApJykpO1xyXG5cclxuICAgICAgICAgICAgLy8gT2N1bHRhciB0b2RhcyBsYXMgY2VsZGFzIHByaW1lcm9cclxuICAgICAgICAgICAgaGVhZGVyQ2VsbHMuZm9yRWFjaChjZWxsID0+IChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1vc3RyYXIgeSByZW9yZGVuYXIgc29sbyBsYXMgdmlzaWJsZXNcclxuICAgICAgICAgICAgdmlzaWJsZS5mb3JFYWNoKChjb2xOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJUZXh0ID0gaGVhZGVyVGV4dE1hcFtjb2xOYW1lXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBoZWFkZXJDZWxscy5maW5kKGMgPT4gYy50ZXh0Q29udGVudD8udHJpbSgpID09PSBoZWFkZXJUZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmIChjZWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKGNlbGwgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJSb3cuYXBwZW5kQ2hpbGQoY2VsbCk7IC8vIE1vdmVyIGFsIGZpbmFsIHBhcmEgcmVvcmRlbmFyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQXNlZ3VyYXIgcXVlIGVsIGNoZWNrYm94IGVzdMOpIHByaW1lcm9cclxuICAgICAgICAgICAgaWYgKGNoZWNrYm94Q2VsbCkge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyUm93Lmluc2VydEJlZm9yZShjaGVja2JveENlbGwsIGhlYWRlclJvdy5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVvcmRlbmFyIHkgbW9zdHJhci9vY3VsdGFyIGJvZHkgcm93c1xyXG4gICAgICAgIGNvbnN0IGJvZHlSb3dzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdHInKTtcclxuICAgICAgICBib2R5Um93cy5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hDZWxsID0gcm93LnF1ZXJ5U2VsZWN0b3IoJy5jaGVjay1jZWxsLWFwcCcpO1xyXG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IEFycmF5LmZyb20ocm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkOm5vdCguY2hlY2stY2VsbC1hcHApJykpO1xyXG5cclxuICAgICAgICAgICAgLy8gT2N1bHRhciB0b2RhcyBsYXMgY2VsZGFzIHByaW1lcm9cclxuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1vc3RyYXIgeSByZW9yZGVuYXIgc29sbyBsYXMgdmlzaWJsZXNcclxuICAgICAgICAgICAgdmlzaWJsZS5mb3JFYWNoKChjb2xOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBjb2xDbGFzc01hcFtjb2xOYW1lXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBjZWxscy5maW5kKGMgPT4gYy5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpOyAvLyBNb3ZlciBhbCBmaW5hbCBwYXJhIHJlb3JkZW5hclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFzZWd1cmFyIHF1ZSBlbCBjaGVja2JveCBlc3TDqSBwcmltZXJvXHJcbiAgICAgICAgICAgIGlmIChjaGVja2JveENlbGwpIHtcclxuICAgICAgICAgICAgICAgIHJvdy5pbnNlcnRCZWZvcmUoY2hlY2tib3hDZWxsLCByb3cuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdHVhbGl6YSBlbCBkcm9wZG93biBjb24gbGFzIHZpc3RhcyBkaXNwb25pYmxlcy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlVmlld3NEcm9wZG93bigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXZpZXdzTWFuYWdlcikgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlZC12aWV3cy1jb250YWluZXInKTtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB2aWV3cyA9IHZpZXdzTWFuYWdlci5nZXRBdmFpbGFibGVWaWV3cygpO1xyXG4gICAgICAgIGlmICh2aWV3cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInRleHQtbXV0ZWQtdmlld3NcIj5TaW4gdmlzdGFzIGd1YXJkYWRhczwvc3Bhbj4nO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaHRtbCA9ICcnO1xyXG4gICAgICAgIHZpZXdzLmZvckVhY2goKHY6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFySWNvbiA9IHYuSXNEZWZhdWx0XHJcbiAgICAgICAgICAgICAgICA/ICc8aSBjbGFzcz1cImZhIGZhLXN0YXJcIiBzdHlsZT1cImNvbG9yOiNmMGFkNGU7XCIgdGl0bGU9XCJWaXN0YSBwcmVkZXRlcm1pbmFkYVwiPjwvaT4nXHJcbiAgICAgICAgICAgICAgICA6IGA8aSBjbGFzcz1cImZhIGZhLXN0YXItbyBidG4tc2V0LWRlZmF1bHRcIiBkYXRhLXZpZXctaWQ9XCIke3YuUmVjSWR9XCIgc3R5bGU9XCJjb2xvcjojOTk5OyBjdXJzb3I6cG9pbnRlcjtcIiB0aXRsZT1cIkVzdGFibGVjZXIgY29tbyBwcmVkZXRlcm1pbmFkYVwiPjwvaT5gO1xyXG4gICAgICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwic2F2ZWQtdmlldy1pdGVtXCIgc3R5bGU9XCJkaXNwbGF5OmZsZXg7IGp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuOyBhbGlnbi1pdGVtczpjZW50ZXI7IHBhZGRpbmc6NXB4IDE1cHg7XCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGRhdGEtdmlldz1cIiR7di5SZWNJZH1cIiBzdHlsZT1cImZsZXg6MTsgY29sb3I6IzMzMzsgdGV4dC1kZWNvcmF0aW9uOm5vbmU7XCI+JHt2LlZpZXdOYW1lfTwvYT5cclxuICAgICAgICAgICAgICAgICR7c3Rhckljb259XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XHJcblxyXG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVycyBwYXJhIGVzdGFibGVjZXIgdmlzdGEgcG9yIGRlZmVjdG9cclxuICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1zZXQtZGVmYXVsdCcpLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdJZCA9IHBhcnNlSW50KChidG4gYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmlld0lkIHx8ICcwJywgMTApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdJZCA+IDAgJiYgdmlld3NNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IHZpZXdzTWFuYWdlci5zZXREZWZhdWx0Vmlldyh2aWV3SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsaXphIGVsIG5vbWJyZSBkZSBsYSB2aXN0YSBhY3R1YWwgZW4gZWwgZHJvcGRvd24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXZpZXdzTWFuYWdlcikgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnQtdmlldy1uYW1lJyk7XHJcbiAgICAgICAgaWYgKGVsKSBlbC50ZXh0Q29udGVudCA9IHZpZXdzTWFuYWdlci5nZXRDdXJyZW50Vmlld05hbWUoKTtcclxuICAgIH1cclxufSkoKTtcclxuXHJcblxyXG4iXX0=