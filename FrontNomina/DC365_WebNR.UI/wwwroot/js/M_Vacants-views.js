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
    // Columnas del grid de puestos vacantes - todos los campos
    const allColumns = ['PositionId', 'PositionName', 'IsVacant', 'DepartmentId', 'JobId', 'NotifyPositionId', 'PositionStatus', 'StartDate', 'EndDate', 'Description'];
    const defaultColumns = ['PositionId', 'PositionName', 'DepartmentId', 'JobId', 'NotifyPositionId', 'StartDate', 'EndDate', 'Description'];
    const columnTitles = {
        'PositionId': 'Id puesto',
        'PositionName': 'Nombre del puesto',
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
            'IsVacant': 'Es vacante',
            'DepartmentId': 'Departamento',
            'JobId': 'Cargo',
            'NotifyPositionId': 'Notifica al puesto',
            'PositionStatus': 'Estado',
            'StartDate': 'Fecha inicial',
            'EndDate': 'Fecha final',
            'Description': 'Descripción'
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTV9WYWNhbnRzLXZpZXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvTV9WYWNhbnRzLXZpZXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7Ozs7Ozs7OztBQUVILENBQUMsU0FBUyxnQkFBZ0I7SUFDdEIsTUFBTSxDQUFDLEdBQUcsTUFBYSxDQUFDO0lBQ3hCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdkQsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPO0lBRXBCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNELE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQztJQUU1QiwyREFBMkQ7SUFDM0QsTUFBTSxVQUFVLEdBQUcsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDcEssTUFBTSxjQUFjLEdBQUcsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMxSSxNQUFNLFlBQVksR0FBMkI7UUFDekMsWUFBWSxFQUFFLFdBQVc7UUFDekIsY0FBYyxFQUFFLG1CQUFtQjtRQUNuQyxVQUFVLEVBQUUsWUFBWTtRQUN4QixjQUFjLEVBQUUsY0FBYztRQUM5QixPQUFPLEVBQUUsT0FBTztRQUNoQixrQkFBa0IsRUFBRSxvQkFBb0I7UUFDeEMsZ0JBQWdCLEVBQUUsUUFBUTtRQUMxQixXQUFXLEVBQUUsZUFBZTtRQUM1QixTQUFTLEVBQUUsYUFBYTtRQUN4QixhQUFhLEVBQUUsYUFBYTtLQUMvQixDQUFDO0lBRUYsSUFBSSxjQUFjLEdBQVEsSUFBSSxDQUFDO0lBQy9CLElBQUksWUFBWSxHQUFRLElBQUksQ0FBQztJQUU3QixpQ0FBaUM7SUFDakMsSUFBSSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUN2QixjQUFjLEdBQUcsSUFBSSxDQUFDLENBQUMsa0JBQWtCLENBQ3JDLFVBQVUsRUFDVixjQUFjLEVBQ2QscUJBQXFCLEVBQ3JCLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUN0QyxDQUFDO0lBQ04sQ0FBQztJQUVELCtCQUErQjtJQUMvQixJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxLQUFLLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQy9DLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEYsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQWMsRUFBRSxFQUFFO1lBQzlDLG1CQUFtQixFQUFFLENBQUM7WUFDdEIsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQztnQkFDdkMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxxQkFBcUIsRUFBRSxDQUFDO1lBQzVCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpQ0FBaUM7SUFDakMsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDdkUsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ25CLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzdDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsZ0JBQWdCLEVBQUUsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxvQ0FBb0M7SUFDcEMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFxQixDQUFDO1FBQ3ZDLElBQUksTUFBTSxDQUFDLEVBQUUsS0FBSyxtQkFBbUIsRUFBRSxDQUFDO1lBQ3BDLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxZQUFZLEVBQUUsQ0FBQztZQUM5QixDQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEQsSUFBSSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsY0FBYyxFQUFFLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLGNBQWM7b0JBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQzFELENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxxQkFBcUI7SUFDckIsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMzRCxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2IsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBcUIsQ0FBQztZQUMvRSxJQUFJLGFBQWE7Z0JBQUUsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDM0MsQ0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHVDQUF1QztJQUN2QyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDeEUsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNqQixjQUFjLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQVMsRUFBRTs7WUFDaEQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXFCLENBQUM7WUFDL0UsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLGFBQWEsYUFBYixhQUFhLHVCQUFiLGFBQWEsQ0FBRSxLQUFLLEtBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNSLE1BQUEsQ0FBQyxDQUFDLGVBQWUsa0RBQUcsaUNBQWlDLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2hFLE9BQU87WUFDWCxDQUFDO1lBQ0QsSUFBSSxZQUFZLElBQUksY0FBYyxFQUFFLENBQUM7Z0JBQ2pDLE1BQU0sU0FBUyxHQUFHLENBQUEsTUFBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFzQiwwQ0FBRSxPQUFPLEtBQUksS0FBSyxDQUFDO2dCQUNyRyxNQUFNLFFBQVEsR0FBRyxDQUFBLE1BQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBc0IsMENBQUUsT0FBTyxLQUFJLEtBQUssQ0FBQztnQkFDbkcsTUFBTSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzNHLElBQUksRUFBRSxFQUFFLENBQUM7b0JBQ0osQ0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM3QyxtQkFBbUIsRUFBRSxDQUFDO29CQUN0QixxQkFBcUIsRUFBRSxDQUFDO2dCQUM1QixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQseUNBQXlDO0lBQ3pDLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN4RSxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ2pCLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBTyxDQUFDLEVBQUUsRUFBRTtZQUNqRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsSUFBSSxZQUFZLElBQUksY0FBYyxFQUFFLENBQUM7Z0JBQ2pDLE1BQU0sRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRixJQUFJLEVBQUUsRUFBRSxDQUFDO29CQUNMLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDMUMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFxQztJQUNyQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQU8sQ0FBQyxFQUFFLEVBQUU7UUFDM0MsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQXFCLENBQUM7UUFDdkMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQWdCLENBQUM7UUFDNUQsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPO1FBRXBCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNuQyxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUUxRSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN2QixjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQy9DLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNyRSxJQUFJLGVBQWU7Z0JBQUUsZUFBZSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQztZQUN2RSxJQUFJLGdCQUFnQjtnQkFBRSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUNsRSxDQUFDO2FBQU0sSUFBSSxZQUFZLElBQUksY0FBYyxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ2xELE1BQU0sT0FBTyxHQUFHLE1BQU0sWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEUsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2pCLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMscUJBQXFCLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztnQkFDMUQscUJBQXFCLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxnQkFBZ0I7b0JBQUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDbEUsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUg7O09BRUc7SUFDSCxTQUFTLHFCQUFxQixDQUFDLE9BQWlCO1FBQzVDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBRW5CLE1BQU0sYUFBYSxHQUEyQjtZQUMxQyxZQUFZLEVBQUUsV0FBVztZQUN6QixjQUFjLEVBQUUsbUJBQW1CO1lBQ25DLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLGNBQWMsRUFBRSxjQUFjO1lBQzlCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLGtCQUFrQixFQUFFLG9CQUFvQjtZQUN4QyxnQkFBZ0IsRUFBRSxRQUFRO1lBQzFCLFdBQVcsRUFBRSxlQUFlO1lBQzVCLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLGFBQWEsRUFBRSxhQUFhO1NBQy9CLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBMkI7WUFDeEMsWUFBWSxFQUFFLGVBQWU7WUFDN0IsY0FBYyxFQUFFLGlCQUFpQjtZQUNqQyxVQUFVLEVBQUUsYUFBYTtZQUN6QixjQUFjLEVBQUUsaUJBQWlCO1lBQ2pDLE9BQU8sRUFBRSxVQUFVO1lBQ25CLGtCQUFrQixFQUFFLHFCQUFxQjtZQUN6QyxnQkFBZ0IsRUFBRSxtQkFBbUI7WUFDckMsV0FBVyxFQUFFLGNBQWM7WUFDM0IsU0FBUyxFQUFFLFlBQVk7WUFDdkIsYUFBYSxFQUFFLGdCQUFnQjtTQUNsQyxDQUFDO1FBRUYsb0JBQW9CO1FBQ3BCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNoRSxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7WUFDdEYsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFFLElBQW9CLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQztZQUMxRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3hCLE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFDLE9BQUEsQ0FBQSxNQUFBLENBQUMsQ0FBQyxXQUFXLDBDQUFFLElBQUksRUFBRSxNQUFLLFVBQVUsQ0FBQSxFQUFBLENBQUMsQ0FBQztnQkFDekUsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDTixJQUFvQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO29CQUN6QyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLFlBQVksRUFBRSxDQUFDO2dCQUNmLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvRCxDQUFDO1FBQ0wsQ0FBQztRQUVELHdDQUF3QztRQUN4QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3JCLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMxRCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7WUFFMUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFFLElBQW9CLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQztZQUNwRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3hCLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlELElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ04sSUFBb0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztvQkFDekMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxZQUFZLEVBQUUsQ0FBQztnQkFDZixHQUFHLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUyxtQkFBbUI7UUFDeEIsSUFBSSxDQUFDLFlBQVk7WUFBRSxPQUFPO1FBQzFCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU87UUFFdkIsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0MsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3JCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsNERBQTRELENBQUM7WUFDbkYsT0FBTztRQUNYLENBQUM7UUFFRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDckIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFNBQVM7Z0JBQ3hCLENBQUMsQ0FBQyxnRkFBZ0Y7Z0JBQ2xGLENBQUMsQ0FBQyx5REFBeUQsQ0FBQyxDQUFDLEtBQUssbUZBQW1GLENBQUM7WUFDMUosSUFBSSxJQUFJO3lDQUNxQixDQUFDLENBQUMsS0FBSyx1REFBdUQsQ0FBQyxDQUFDLFFBQVE7a0JBQy9GLFFBQVE7bUJBQ1AsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO1FBQ0gsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFM0IsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDM0QsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFPLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDcEIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFFLEdBQW1CLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3hFLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztvQkFDN0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMxRCxJQUFJLE9BQU8sRUFBRSxDQUFDO3dCQUNWLG1CQUFtQixFQUFFLENBQUM7b0JBQzFCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVMscUJBQXFCO1FBQzFCLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUMxQixNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDeEQsSUFBSSxFQUFFO1lBQUUsRUFBRSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZSBNX1ZhY2FudHMtdmlld3MudHNcclxuICogQGRlc2NyaXB0aW9uIEludGVncmFjacOzbiBkZWwgc2lzdGVtYSBkZSB2aXN0YXMgY29uIGVsIG3Ds2R1bG8gZGUgcHVlc3RvcyB2YWNhbnRlcy5cclxuICovXHJcblxyXG4oZnVuY3Rpb24gaW5pdFZhY2FudHNWaWV3cygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHcgPSB3aW5kb3cgYXMgYW55O1xyXG4gICAgY29uc3QgcGFnZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZhY2FudHMtcGFnZScpO1xyXG4gICAgaWYgKCFwYWdlRWwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0b2tlbiA9IHBhZ2VFbC5kYXRhc2V0LnRva2VuIHx8ICcnO1xyXG4gICAgY29uc3QgdXNlclJlY0lkID0gcGFyc2VJbnQocGFnZUVsLmRhdGFzZXQudXNlciB8fCAnMCcsIDEwKTtcclxuICAgIGNvbnN0IGFwaUJhc2UgPSAnL2FwaS92Mi4wJztcclxuXHJcbiAgICAvLyBDb2x1bW5hcyBkZWwgZ3JpZCBkZSBwdWVzdG9zIHZhY2FudGVzIC0gdG9kb3MgbG9zIGNhbXBvc1xyXG4gICAgY29uc3QgYWxsQ29sdW1ucyA9IFsnUG9zaXRpb25JZCcsICdQb3NpdGlvbk5hbWUnLCAnSXNWYWNhbnQnLCAnRGVwYXJ0bWVudElkJywgJ0pvYklkJywgJ05vdGlmeVBvc2l0aW9uSWQnLCAnUG9zaXRpb25TdGF0dXMnLCAnU3RhcnREYXRlJywgJ0VuZERhdGUnLCAnRGVzY3JpcHRpb24nXTtcclxuICAgIGNvbnN0IGRlZmF1bHRDb2x1bW5zID0gWydQb3NpdGlvbklkJywgJ1Bvc2l0aW9uTmFtZScsICdEZXBhcnRtZW50SWQnLCAnSm9iSWQnLCAnTm90aWZ5UG9zaXRpb25JZCcsICdTdGFydERhdGUnLCAnRW5kRGF0ZScsICdEZXNjcmlwdGlvbiddO1xyXG4gICAgY29uc3QgY29sdW1uVGl0bGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgICAgICdQb3NpdGlvbklkJzogJ0lkIHB1ZXN0bycsXHJcbiAgICAgICAgJ1Bvc2l0aW9uTmFtZSc6ICdOb21icmUgZGVsIHB1ZXN0bycsXHJcbiAgICAgICAgJ0lzVmFjYW50JzogJ0VzIHZhY2FudGUnLFxyXG4gICAgICAgICdEZXBhcnRtZW50SWQnOiAnRGVwYXJ0YW1lbnRvJyxcclxuICAgICAgICAnSm9iSWQnOiAnQ2FyZ28nLFxyXG4gICAgICAgICdOb3RpZnlQb3NpdGlvbklkJzogJ05vdGlmaWNhIGFsIHB1ZXN0bycsXHJcbiAgICAgICAgJ1Bvc2l0aW9uU3RhdHVzJzogJ0VzdGFkbycsXHJcbiAgICAgICAgJ1N0YXJ0RGF0ZSc6ICdGZWNoYSBpbmljaWFsJyxcclxuICAgICAgICAnRW5kRGF0ZSc6ICdGZWNoYSBmaW5hbCcsXHJcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJzogJ0Rlc2NyaXBjacOzbidcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGNvbHVtbnNNYW5hZ2VyOiBhbnkgPSBudWxsO1xyXG4gICAgbGV0IHZpZXdzTWFuYWdlcjogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyBJbmljaWFsaXphciBnZXN0b3IgZGUgY29sdW1uYXNcclxuICAgIGlmICh3LkdyaWRDb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgIGNvbHVtbnNNYW5hZ2VyID0gbmV3IHcuR3JpZENvbHVtbnNNYW5hZ2VyKFxyXG4gICAgICAgICAgICBhbGxDb2x1bW5zLFxyXG4gICAgICAgICAgICBkZWZhdWx0Q29sdW1ucyxcclxuICAgICAgICAgICAgYXBwbHlDb2x1bW5WaXNpYmlsaXR5LFxyXG4gICAgICAgICAgICAoZjogc3RyaW5nKSA9PiBjb2x1bW5UaXRsZXNbZl0gfHwgZlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5pY2lhbGl6YXIgZ2VzdG9yIGRlIHZpc3Rhc1xyXG4gICAgaWYgKHcuR3JpZFZpZXdzTWFuYWdlciAmJiB0b2tlbiAmJiB1c2VyUmVjSWQgPiAwKSB7XHJcbiAgICAgICAgdmlld3NNYW5hZ2VyID0gbmV3IHcuR3JpZFZpZXdzTWFuYWdlcihhcGlCYXNlLCB0b2tlbiwgJ1ZhY2FudHMnLCB1c2VyUmVjSWQsICcnKTtcclxuICAgICAgICB2aWV3c01hbmFnZXIuaW5pdGlhbGl6ZSgpLnRoZW4oKGNvbmZpZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ3MubGVuZ3RoID4gMCAmJiBjb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uc01hbmFnZXIuYXBwbHlDb2x1bW5Db25maWcoY29uZmlncyk7XHJcbiAgICAgICAgICAgICAgICBhcHBseUNvbHVtblZpc2liaWxpdHkoY29sdW1uc01hbmFnZXIuZ2V0VmlzaWJsZUNvbHVtbnMoKSk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEV2ZW50OiBBYnJpciBtb2RhbCBkZSBjb2x1bW5hc1xyXG4gICAgY29uc3QgYnRuTWFuYWdlQ29sdW1ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbWFuYWdlLWNvbHVtbnMnKTtcclxuICAgIGlmIChidG5NYW5hZ2VDb2x1bW5zKSB7XHJcbiAgICAgICAgYnRuTWFuYWdlQ29sdW1ucy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29sdW1uc01hbmFnZXI/LnNob3dDb2x1bW5zTW9kYWwoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFdmVudDogQXBsaWNhciBjb2x1bW5hcyBkZWwgbW9kYWxcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAodGFyZ2V0LmlkID09PSAnYnRuLWFwcGx5LWNvbHVtbnMnKSB7XHJcbiAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyPy5hcHBseUNvbHVtbnMoKTtcclxuICAgICAgICAgICAgKCQgYXMgYW55KSgnI21vZGFsLW1hbmFnZS1jb2x1bW5zJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgaWYgKHZpZXdzTWFuYWdlcj8uaGFzQ3VycmVudFZpZXcoKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnRuU2F2ZUNoYW5nZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXNhdmUtdmlldy1jaGFuZ2VzJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuU2F2ZUNoYW5nZXMpIGJ0blNhdmVDaGFuZ2VzLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEV2ZW50OiBOdWV2YSB2aXN0YVxyXG4gICAgY29uc3QgYnRuTmV3VmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbmV3LXZpZXcnKTtcclxuICAgIGlmIChidG5OZXdWaWV3KSB7XHJcbiAgICAgICAgYnRuTmV3Vmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3Qgdmlld05hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LW5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAodmlld05hbWVJbnB1dCkgdmlld05hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAoJCBhcyBhbnkpKCcjbW9kYWwtc2F2ZS12aWV3JykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFdmVudDogQ29uZmlybWFyIGd1YXJkYXIgbnVldmEgdmlzdGFcclxuICAgIGNvbnN0IGJ0bkNvbmZpcm1TYXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1jb25maXJtLXNhdmUtdmlldycpO1xyXG4gICAgaWYgKGJ0bkNvbmZpcm1TYXZlKSB7XHJcbiAgICAgICAgYnRuQ29uZmlybVNhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdOYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1uYW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9ICh2aWV3TmFtZUlucHV0Py52YWx1ZSB8fCAnJykudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHcud2luZG93c19tZXNzYWdlPy4oJ0luZ3Jlc2UgdW4gbm9tYnJlIHBhcmEgbGEgdmlzdGEnLCAnZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmlld3NNYW5hZ2VyICYmIGNvbHVtbnNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0RlZmF1bHQgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctaXMtZGVmYXVsdCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQpPy5jaGVja2VkIHx8IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNQdWJsaWMgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctaXMtcHVibGljJykgYXMgSFRNTElucHV0RWxlbWVudCk/LmNoZWNrZWQgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IHZpZXdzTWFuYWdlci5zYXZlVmlldyhuYW1lLCBjb2x1bW5zTWFuYWdlci5nZXRDdXJyZW50Q29sdW1uQ29uZmlnKCksIGlzRGVmYXVsdCwgaXNQdWJsaWMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKCQgYXMgYW55KSgnI21vZGFsLXNhdmUtdmlldycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmlld3NEcm9wZG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IEd1YXJkYXIgY2FtYmlvcyBlbiB2aXN0YSBhY3R1YWxcclxuICAgIGNvbnN0IGJ0blNhdmVDaGFuZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1zYXZlLXZpZXctY2hhbmdlcycpO1xyXG4gICAgaWYgKGJ0blNhdmVDaGFuZ2VzKSB7XHJcbiAgICAgICAgYnRuU2F2ZUNoYW5nZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmICh2aWV3c01hbmFnZXIgJiYgY29sdW1uc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgdmlld3NNYW5hZ2VyLnVwZGF0ZVZpZXcoY29sdW1uc01hbmFnZXIuZ2V0Q3VycmVudENvbHVtbkNvbmZpZygpKTtcclxuICAgICAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0blNhdmVDaGFuZ2VzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFdmVudDogQ2xpY2sgZW4gdmlzdGEgZGVsIGRyb3Bkb3duXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgYW5jaG9yID0gdGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXZpZXddJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKCFhbmNob3IpIHJldHVybjtcclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXdJZCA9IGFuY2hvci5kYXRhc2V0LnZpZXc7XHJcbiAgICAgICAgY29uc3QgYnRuU2F2ZUNoYW5nZXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tc2F2ZS12aWV3LWNoYW5nZXMnKTtcclxuXHJcbiAgICAgICAgaWYgKHZpZXdJZCA9PT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyPy5yZXNldFRvRGVmYXVsdChkZWZhdWx0Q29sdW1ucyk7XHJcbiAgICAgICAgICAgIGFwcGx5Q29sdW1uVmlzaWJpbGl0eShkZWZhdWx0Q29sdW1ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWaWV3TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50LXZpZXctbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFZpZXdOYW1lKSBjdXJyZW50Vmlld05hbWUudGV4dENvbnRlbnQgPSAnVmlzdGEgcG9yIGRlZmVjdG8nO1xyXG4gICAgICAgICAgICBpZiAoYnRuU2F2ZUNoYW5nZXNFbCkgYnRuU2F2ZUNoYW5nZXNFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmlld3NNYW5hZ2VyICYmIGNvbHVtbnNNYW5hZ2VyICYmIHZpZXdJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb25maWdzID0gYXdhaXQgdmlld3NNYW5hZ2VyLmxvYWRWaWV3KHBhcnNlSW50KHZpZXdJZCwgMTApKTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zTWFuYWdlci5hcHBseUNvbHVtbkNvbmZpZyhjb25maWdzKTtcclxuICAgICAgICAgICAgICAgIGFwcGx5Q29sdW1uVmlzaWJpbGl0eShjb2x1bW5zTWFuYWdlci5nZXRWaXNpYmxlQ29sdW1ucygpKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0blNhdmVDaGFuZ2VzRWwpIGJ0blNhdmVDaGFuZ2VzRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBsaWNhIGxhIHZpc2liaWxpZGFkIHkgb3JkZW4gZGUgY29sdW1uYXMgYSBsYSB0YWJsYS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYXBwbHlDb2x1bW5WaXNpYmlsaXR5KHZpc2libGU6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTWFpblRhYmxlJyk7XHJcbiAgICAgICAgaWYgKCF0YWJsZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJUZXh0TWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgICAgICAgICAnUG9zaXRpb25JZCc6ICdJZCBwdWVzdG8nLFxyXG4gICAgICAgICAgICAnUG9zaXRpb25OYW1lJzogJ05vbWJyZSBkZWwgcHVlc3RvJyxcclxuICAgICAgICAgICAgJ0lzVmFjYW50JzogJ0VzIHZhY2FudGUnLFxyXG4gICAgICAgICAgICAnRGVwYXJ0bWVudElkJzogJ0RlcGFydGFtZW50bycsXHJcbiAgICAgICAgICAgICdKb2JJZCc6ICdDYXJnbycsXHJcbiAgICAgICAgICAgICdOb3RpZnlQb3NpdGlvbklkJzogJ05vdGlmaWNhIGFsIHB1ZXN0bycsXHJcbiAgICAgICAgICAgICdQb3NpdGlvblN0YXR1cyc6ICdFc3RhZG8nLFxyXG4gICAgICAgICAgICAnU3RhcnREYXRlJzogJ0ZlY2hhIGluaWNpYWwnLFxyXG4gICAgICAgICAgICAnRW5kRGF0ZSc6ICdGZWNoYSBmaW5hbCcsXHJcbiAgICAgICAgICAgICdEZXNjcmlwdGlvbic6ICdEZXNjcmlwY2nDs24nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgY29sQ2xhc3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAgICAgICAgICdQb3NpdGlvbklkJzogJ1Bvc2l0aW9uSWR0YmwnLFxyXG4gICAgICAgICAgICAnUG9zaXRpb25OYW1lJzogJ1Bvc2l0aW9uTmFtZXRibCcsXHJcbiAgICAgICAgICAgICdJc1ZhY2FudCc6ICdJc1ZhY2FudHRibCcsXHJcbiAgICAgICAgICAgICdEZXBhcnRtZW50SWQnOiAnRGVwYXJ0bWVudElkdGJsJyxcclxuICAgICAgICAgICAgJ0pvYklkJzogJ0pvYklkdGJsJyxcclxuICAgICAgICAgICAgJ05vdGlmeVBvc2l0aW9uSWQnOiAnTm90aWZ5UG9zaXRpb25JZHRibCcsXHJcbiAgICAgICAgICAgICdQb3NpdGlvblN0YXR1cyc6ICdQb3NpdGlvblN0YXR1c3RibCcsXHJcbiAgICAgICAgICAgICdTdGFydERhdGUnOiAnU3RhcnREYXRldGJsJyxcclxuICAgICAgICAgICAgJ0VuZERhdGUnOiAnRW5kRGF0ZXRibCcsXHJcbiAgICAgICAgICAgICdEZXNjcmlwdGlvbic6ICdEZXNjcmlwdGlvbnRibCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBSZW9yZGVuYXIgaGVhZGVyc1xyXG4gICAgICAgIGNvbnN0IGhlYWRlclJvdyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkIHRyJyk7XHJcbiAgICAgICAgaWYgKGhlYWRlclJvdykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja2JveENlbGwgPSBoZWFkZXJSb3cucXVlcnlTZWxlY3RvcignLmNoZWNrLWNlbGwtYXBwJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckNlbGxzID0gQXJyYXkuZnJvbShoZWFkZXJSb3cucXVlcnlTZWxlY3RvckFsbCgndGQ6bm90KC5jaGVjay1jZWxsLWFwcCknKSk7XHJcbiAgICAgICAgICAgIGhlYWRlckNlbGxzLmZvckVhY2goY2VsbCA9PiAoY2VsbCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcbiAgICAgICAgICAgIHZpc2libGUuZm9yRWFjaCgoY29sTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyVGV4dCA9IGhlYWRlclRleHRNYXBbY29sTmFtZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gaGVhZGVyQ2VsbHMuZmluZChjID0+IGMudGV4dENvbnRlbnQ/LnRyaW0oKSA9PT0gaGVhZGVyVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrYm94Q2VsbCkge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyUm93Lmluc2VydEJlZm9yZShjaGVja2JveENlbGwsIGhlYWRlclJvdy5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVvcmRlbmFyIGJvZHkgcm93cyB1c2FuZG8gY2xhc2VzIENTU1xyXG4gICAgICAgIGNvbnN0IGJvZHlSb3dzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdHInKTtcclxuICAgICAgICBib2R5Um93cy5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hDZWxsID0gcm93LnF1ZXJ5U2VsZWN0b3IoJy5jaGVjay1jZWxsLWFwcCcpO1xyXG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IEFycmF5LmZyb20ocm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkOm5vdCguY2hlY2stY2VsbC1hcHApJykpO1xyXG5cclxuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuICAgICAgICAgICAgdmlzaWJsZS5mb3JFYWNoKChjb2xOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBjb2xDbGFzc01hcFtjb2xOYW1lXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBjZWxscy5maW5kKGMgPT4gYy5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIChjZWxsIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrYm94Q2VsbCkge1xyXG4gICAgICAgICAgICAgICAgcm93Lmluc2VydEJlZm9yZShjaGVja2JveENlbGwsIHJvdy5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsaXphIGVsIGRyb3Bkb3duIGNvbiBsYXMgdmlzdGFzIGRpc3BvbmlibGVzLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVWaWV3c0Ryb3Bkb3duKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdmlld3NNYW5hZ2VyKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVkLXZpZXdzLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHZpZXdzID0gdmlld3NNYW5hZ2VyLmdldEF2YWlsYWJsZVZpZXdzKCk7XHJcbiAgICAgICAgaWYgKHZpZXdzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwidGV4dC1tdXRlZC12aWV3c1wiPlNpbiB2aXN0YXMgZ3VhcmRhZGFzPC9zcGFuPic7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gJyc7XHJcbiAgICAgICAgdmlld3MuZm9yRWFjaCgodjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJJY29uID0gdi5Jc0RlZmF1bHRcclxuICAgICAgICAgICAgICAgID8gJzxpIGNsYXNzPVwiZmEgZmEtc3RhclwiIHN0eWxlPVwiY29sb3I6I2YwYWQ0ZTtcIiB0aXRsZT1cIlZpc3RhIHByZWRldGVybWluYWRhXCI+PC9pPidcclxuICAgICAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmEgZmEtc3Rhci1vIGJ0bi1zZXQtZGVmYXVsdFwiIGRhdGEtdmlldy1pZD1cIiR7di5SZWNJZH1cIiBzdHlsZT1cImNvbG9yOiM5OTk7IGN1cnNvcjpwb2ludGVyO1wiIHRpdGxlPVwiRXN0YWJsZWNlciBjb21vIHByZWRldGVybWluYWRhXCI+PC9pPmA7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJzYXZlZC12aWV3LWl0ZW1cIiBzdHlsZT1cImRpc3BsYXk6ZmxleDsganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOmNlbnRlcjsgcGFkZGluZzo1cHggMTVweDtcIj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS12aWV3PVwiJHt2LlJlY0lkfVwiIHN0eWxlPVwiZmxleDoxOyBjb2xvcjojMzMzOyB0ZXh0LWRlY29yYXRpb246bm9uZTtcIj4ke3YuVmlld05hbWV9PC9hPlxyXG4gICAgICAgICAgICAgICAgJHtzdGFySWNvbn1cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tc2V0LWRlZmF1bHQnKS5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3SWQgPSBwYXJzZUludCgoYnRuIGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZpZXdJZCB8fCAnMCcsIDEwKTtcclxuICAgICAgICAgICAgICAgIGlmICh2aWV3SWQgPiAwICYmIHZpZXdzTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCB2aWV3c01hbmFnZXIuc2V0RGVmYXVsdFZpZXcodmlld0lkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVWaWV3c0Ryb3Bkb3duKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdHVhbGl6YSBlbCBub21icmUgZGUgbGEgdmlzdGEgYWN0dWFsLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF2aWV3c01hbmFnZXIpIHJldHVybjtcclxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50LXZpZXctbmFtZScpO1xyXG4gICAgICAgIGlmIChlbCkgZWwudGV4dENvbnRlbnQgPSB2aWV3c01hbmFnZXIuZ2V0Q3VycmVudFZpZXdOYW1lKCk7XHJcbiAgICB9XHJcbn0pKCk7XHJcbiJdfQ==