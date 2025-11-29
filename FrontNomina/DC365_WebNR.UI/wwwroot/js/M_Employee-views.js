/**
 * @file M_Employee-views.ts
 * @description Integración del sistema de vistas con el módulo de empleados.
 * Soporta Empleados, Prospectos y Dados de baja.
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
(function initEmployeeViews() {
    const w = window;
    const pageEl = document.getElementById('employee-page');
    if (!pageEl)
        return;
    const token = pageEl.dataset.token || '';
    const userRecId = parseInt(pageEl.dataset.user || '0', 10);
    const apiBase = '/api/v2.0';
    const entityName = pageEl.dataset.entity || 'Employee';
    const employeeType = pageEl.dataset.employeeType || 'Empleados';
    // Columnas del grid de empleados - todos los campos de la entidad
    const allColumns = [
        'EmployeeId', 'Name', 'LastName', 'PersonalTreatment', 'BirthDate', 'Gender', 'Age',
        'DependentsNumbers', 'MaritalStatus', 'NSS', 'ARS', 'AFP', 'AdmissionDate', 'Country',
        'EmployeeType', 'HomeOffice', 'OwnCar', 'HasDisability', 'ApplyforOvertime', 'IsFixedWorkCalendar',
        'WorkFrom', 'WorkTo', 'BreakWorkFrom', 'BreakWorkTo', 'EmployeeStatus', 'StartWorkDate',
        'EndWorkDate', 'PayMethod', 'WorkStatus', 'EmployeeAction', 'OccupationId', 'EducationLevelId',
        'DisabilityTypeId', 'Nationality', 'LocationId'
    ];
    // Columnas visibles por defecto (las más importantes)
    const defaultColumns = ['EmployeeId', 'Name', 'LastName', 'EmployeeType', 'AdmissionDate', 'Age'];
    // Títulos de las columnas
    const columnTitles = {
        'EmployeeId': 'Número de personal',
        'Name': 'Nombre',
        'LastName': 'Apellido',
        'PersonalTreatment': 'Tratamiento',
        'BirthDate': 'Fecha nacimiento',
        'Gender': 'Género',
        'Age': 'Edad',
        'DependentsNumbers': 'Dependientes',
        'MaritalStatus': 'Estado civil',
        'NSS': 'NSS',
        'ARS': 'ARS',
        'AFP': 'AFP',
        'AdmissionDate': 'Fecha ingreso',
        'Country': 'País',
        'EmployeeType': employeeType === 'Dados de baja' ? 'Motivo' : 'Tipo empleado',
        'HomeOffice': 'Home Office',
        'OwnCar': 'Vehículo propio',
        'HasDisability': 'Discapacidad',
        'ApplyforOvertime': 'Aplica horas extra',
        'IsFixedWorkCalendar': 'Calendario fijo',
        'WorkFrom': 'Hora entrada',
        'WorkTo': 'Hora salida',
        'BreakWorkFrom': 'Inicio descanso',
        'BreakWorkTo': 'Fin descanso',
        'EmployeeStatus': 'Estado',
        'StartWorkDate': 'Inicio trabajo',
        'EndWorkDate': 'Fin trabajo',
        'PayMethod': 'Método pago',
        'WorkStatus': 'Estado laboral',
        'EmployeeAction': 'Acción',
        'OccupationId': 'Ocupación',
        'EducationLevelId': 'Nivel educación',
        'DisabilityTypeId': 'Tipo discapacidad',
        'Nationality': 'Nacionalidad',
        'LocationId': 'Localidad'
    };
    let columnsManager = null;
    let viewsManager = null;
    // Inicializar gestor de columnas
    if (w.GridColumnsManager) {
        columnsManager = new w.GridColumnsManager(allColumns, defaultColumns, applyColumnVisibility, (f) => columnTitles[f] || f);
    }
    // Inicializar gestor de vistas
    if (w.GridViewsManager && token && userRecId > 0) {
        viewsManager = new w.GridViewsManager(apiBase, token, entityName, userRecId, '');
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
            'EmployeeId': 'Número de personal',
            'Name': 'Nombre',
            'LastName': 'Apellido',
            'PersonalTreatment': 'Tratamiento',
            'BirthDate': 'Fecha nacimiento',
            'Gender': 'Género',
            'Age': 'Edad',
            'DependentsNumbers': 'Dependientes',
            'MaritalStatus': 'Estado civil',
            'NSS': 'NSS',
            'ARS': 'ARS',
            'AFP': 'AFP',
            'AdmissionDate': 'Fecha ingreso',
            'Country': 'País',
            'EmployeeType': employeeType === 'Dados de baja' ? 'Motivo' : 'Tipo empleado',
            'HomeOffice': 'Home Office',
            'OwnCar': 'Vehículo propio',
            'HasDisability': 'Discapacidad',
            'ApplyforOvertime': 'Aplica horas extra',
            'IsFixedWorkCalendar': 'Calendario fijo',
            'WorkFrom': 'Hora entrada',
            'WorkTo': 'Hora salida',
            'BreakWorkFrom': 'Inicio descanso',
            'BreakWorkTo': 'Fin descanso',
            'EmployeeStatus': 'Estado',
            'StartWorkDate': 'Inicio trabajo',
            'EndWorkDate': 'Fin trabajo',
            'PayMethod': 'Método pago',
            'WorkStatus': 'Estado laboral',
            'EmployeeAction': 'Acción',
            'OccupationId': 'Ocupación',
            'EducationLevelId': 'Nivel educación',
            'DisabilityTypeId': 'Tipo discapacidad',
            'Nationality': 'Nacionalidad',
            'LocationId': 'Localidad'
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
        // Mapeo de clases CSS de las celdas
        const colClassMap = {
            'EmployeeId': 'EmployeeIdtbl',
            'Name': 'Nametbl',
            'LastName': 'LastNametbl',
            'PersonalTreatment': 'PersonalTreatmenttbl',
            'BirthDate': 'BirthDatetbl',
            'Gender': 'Gendertbl',
            'Age': 'Agetbl',
            'DependentsNumbers': 'DependentsNumberstbl',
            'MaritalStatus': 'MaritalStatustbl',
            'NSS': 'NSStbl',
            'ARS': 'ARStbl',
            'AFP': 'AFPtbl',
            'AdmissionDate': 'AdmissionDatetbl',
            'Country': 'Countrytbl',
            'EmployeeType': 'EmployeeTypetbl',
            'HomeOffice': 'HomeOfficetbl',
            'OwnCar': 'OwnCartbl',
            'HasDisability': 'HasDisabilitytbl',
            'ApplyforOvertime': 'ApplyforOvertimetbl',
            'IsFixedWorkCalendar': 'IsFixedWorkCalendartbl',
            'WorkFrom': 'WorkFromtbl',
            'WorkTo': 'WorkTotbl',
            'BreakWorkFrom': 'BreakWorkFromtbl',
            'BreakWorkTo': 'BreakWorkTotbl',
            'EmployeeStatus': 'EmployeeStatustbl',
            'StartWorkDate': 'StartWorkDatetbl',
            'EndWorkDate': 'EndWorkDatetbl',
            'PayMethod': 'PayMethodtbl',
            'WorkStatus': 'WorkStatustbl',
            'EmployeeAction': 'EmployeeActiontbl',
            'OccupationId': 'OccupationIdtbl',
            'EducationLevelId': 'EducationLevelIdtbl',
            'DisabilityTypeId': 'DisabilityTypeIdtbl',
            'Nationality': 'Nationalitytbl',
            'LocationId': 'LocationIdtbl'
        };
        // Reordenar body rows
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTV9FbXBsb3llZS12aWV3cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL01fRW1wbG95ZWUtdmlld3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7Ozs7Ozs7OztBQUVILENBQUMsU0FBUyxpQkFBaUI7SUFDdkIsTUFBTSxDQUFDLEdBQUcsTUFBYSxDQUFDO0lBQ3hCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDeEQsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPO0lBRXBCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNELE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQztJQUM1QixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUM7SUFDdkQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksV0FBVyxDQUFDO0lBRWhFLGtFQUFrRTtJQUNsRSxNQUFNLFVBQVUsR0FBRztRQUNmLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsS0FBSztRQUNuRixtQkFBbUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFNBQVM7UUFDckYsY0FBYyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLHFCQUFxQjtRQUNsRyxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUs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QUFtQixFQUFFLENBQUM7b0JBQzFCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVMscUJBQXFCO1FBQzFCLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUMxQixNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDeEQsSUFBSSxFQUFFO1lBQUUsRUFBRSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZSBNX0VtcGxveWVlLXZpZXdzLnRzXHJcbiAqIEBkZXNjcmlwdGlvbiBJbnRlZ3JhY2nDs24gZGVsIHNpc3RlbWEgZGUgdmlzdGFzIGNvbiBlbCBtw7NkdWxvIGRlIGVtcGxlYWRvcy5cclxuICogU29wb3J0YSBFbXBsZWFkb3MsIFByb3NwZWN0b3MgeSBEYWRvcyBkZSBiYWphLlxyXG4gKi9cclxuXHJcbihmdW5jdGlvbiBpbml0RW1wbG95ZWVWaWV3cygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHcgPSB3aW5kb3cgYXMgYW55O1xyXG4gICAgY29uc3QgcGFnZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtcGxveWVlLXBhZ2UnKTtcclxuICAgIGlmICghcGFnZUVsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdG9rZW4gPSBwYWdlRWwuZGF0YXNldC50b2tlbiB8fCAnJztcclxuICAgIGNvbnN0IHVzZXJSZWNJZCA9IHBhcnNlSW50KHBhZ2VFbC5kYXRhc2V0LnVzZXIgfHwgJzAnLCAxMCk7XHJcbiAgICBjb25zdCBhcGlCYXNlID0gJy9hcGkvdjIuMCc7XHJcbiAgICBjb25zdCBlbnRpdHlOYW1lID0gcGFnZUVsLmRhdGFzZXQuZW50aXR5IHx8ICdFbXBsb3llZSc7XHJcbiAgICBjb25zdCBlbXBsb3llZVR5cGUgPSBwYWdlRWwuZGF0YXNldC5lbXBsb3llZVR5cGUgfHwgJ0VtcGxlYWRvcyc7XHJcblxyXG4gICAgLy8gQ29sdW1uYXMgZGVsIGdyaWQgZGUgZW1wbGVhZG9zIC0gdG9kb3MgbG9zIGNhbXBvcyBkZSBsYSBlbnRpZGFkXHJcbiAgICBjb25zdCBhbGxDb2x1bW5zID0gW1xyXG4gICAgICAgICdFbXBsb3llZUlkJywgJ05hbWUnLCAnTGFzdE5hbWUnLCAnUGVyc29uYWxUcmVhdG1lbnQnLCAnQmlydGhEYXRlJywgJ0dlbmRlcicsICdBZ2UnLFxyXG4gICAgICAgICdEZXBlbmRlbnRzTnVtYmVycycsICdNYXJpdGFsU3RhdHVzJywgJ05TUycsICdBUlMnLCAnQUZQJywgJ0FkbWlzc2lvbkRhdGUnLCAnQ291bnRyeScsXHJcbiAgICAgICAgJ0VtcGxveWVlVHlwZScsICdIb21lT2ZmaWNlJywgJ093bkNhcicsICdIYXNEaXNhYmlsaXR5JywgJ0FwcGx5Zm9yT3ZlcnRpbWUnLCAnSXNGaXhlZFdvcmtDYWxlbmRhcicsXHJcbiAgICAgICAgJ1dvcmtGcm9tJywgJ1dvcmtUbycsICdCcmVha1dvcmtGcm9tJywgJ0JyZWFrV29ya1RvJywgJ0VtcGxveWVlU3RhdHVzJywgJ1N0YXJ0V29ya0RhdGUnLFxyXG4gICAgICAgICdFbmRXb3JrRGF0ZScsICdQYXlNZXRob2QnLCAnV29ya1N0YXR1cycsICdFbXBsb3llZUFjdGlvbicsICdPY2N1cGF0aW9uSWQnLCAnRWR1Y2F0aW9uTGV2ZWxJZCcsXHJcbiAgICAgICAgJ0Rpc2FiaWxpdHlUeXBlSWQnLCAnTmF0aW9uYWxpdHknLCAnTG9jYXRpb25JZCdcclxuICAgIF07XHJcbiAgICAvLyBDb2x1bW5hcyB2aXNpYmxlcyBwb3IgZGVmZWN0byAobGFzIG3DoXMgaW1wb3J0YW50ZXMpXHJcbiAgICBjb25zdCBkZWZhdWx0Q29sdW1ucyA9IFsnRW1wbG95ZWVJZCcsICdOYW1lJywgJ0xhc3ROYW1lJywgJ0VtcGxveWVlVHlwZScsICdBZG1pc3Npb25EYXRlJywgJ0FnZSddO1xyXG5cclxuICAgIC8vIFTDrXR1bG9zIGRlIGxhcyBjb2x1bW5hc1xyXG4gICAgY29uc3QgY29sdW1uVGl0bGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgICAgICdFbXBsb3llZUlkJzogJ07Dum1lcm8gZGUgcGVyc29uYWwnLFxyXG4gICAgICAgICdOYW1lJzogJ05vbWJyZScsXHJcbiAgICAgICAgJ0xhc3ROYW1lJzogJ0FwZWxsaWRvJyxcclxuICAgICAgICAnUGVyc29uYWxUcmVhdG1lbnQnOiAnVHJhdGFtaWVudG8nLFxyXG4gICAgICAgICdCaXJ0aERhdGUnOiAnRmVjaGEgbmFjaW1pZW50bycsXHJcbiAgICAgICAgJ0dlbmRlcic6ICdHw6luZXJvJyxcclxuICAgICAgICAnQWdlJzogJ0VkYWQnLFxyXG4gICAgICAgICdEZXBlbmRlbnRzTnVtYmVycyc6ICdEZXBlbmRpZW50ZXMnLFxyXG4gICAgICAgICdNYXJpdGFsU3RhdHVzJzogJ0VzdGFkbyBjaXZpbCcsXHJcbiAgICAgICAgJ05TUyc6ICdOU1MnLFxyXG4gICAgICAgICdBUlMnOiAnQVJTJyxcclxuICAgICAgICAnQUZQJzogJ0FGUCcsXHJcbiAgICAgICAgJ0FkbWlzc2lvbkRhdGUnOiAnRmVjaGEgaW5ncmVzbycsXHJcbiAgICAgICAgJ0NvdW50cnknOiAnUGHDrXMnLFxyXG4gICAgICAgICdFbXBsb3llZVR5cGUnOiBlbXBsb3llZVR5cGUgPT09ICdEYWRvcyBkZSBiYWphJyA/ICdNb3Rpdm8nIDogJ1RpcG8gZW1wbGVhZG8nLFxyXG4gICAgICAgICdIb21lT2ZmaWNlJzogJ0hvbWUgT2ZmaWNlJyxcclxuICAgICAgICAnT3duQ2FyJzogJ1ZlaMOtY3VsbyBwcm9waW8nLFxyXG4gICAgICAgICdIYXNEaXNhYmlsaXR5JzogJ0Rpc2NhcGFjaWRhZCcsXHJcbiAgICAgICAgJ0FwcGx5Zm9yT3ZlcnRpbWUnOiAnQXBsaWNhIGhvcmFzIGV4dHJhJyxcclxuICAgICAgICAnSXNGaXhlZFdvcmtDYWxlbmRhcic6ICdDYWxlbmRhcmlvIGZpam8nLFxyXG4gICAgICAgICdXb3JrRnJvbSc6ICdIb3JhIGVudHJhZGEnLFxyXG4gICAgICAgICdXb3JrVG8nOiAnSG9yYSBzYWxpZGEnLFxyXG4gICAgICAgICdCcmVha1dvcmtGcm9tJzogJ0luaWNpbyBkZXNjYW5zbycsXHJcbiAgICAgICAgJ0JyZWFrV29ya1RvJzogJ0ZpbiBkZXNjYW5zbycsXHJcbiAgICAgICAgJ0VtcGxveWVlU3RhdHVzJzogJ0VzdGFkbycsXHJcbiAgICAgICAgJ1N0YXJ0V29ya0RhdGUnOiAnSW5pY2lvIHRyYWJham8nLFxyXG4gICAgICAgICdFbmRXb3JrRGF0ZSc6ICdGaW4gdHJhYmFqbycsXHJcbiAgICAgICAgJ1BheU1ldGhvZCc6ICdNw6l0b2RvIHBhZ28nLFxyXG4gICAgICAgICdXb3JrU3RhdHVzJzogJ0VzdGFkbyBsYWJvcmFsJyxcclxuICAgICAgICAnRW1wbG95ZWVBY3Rpb24nOiAnQWNjacOzbicsXHJcbiAgICAgICAgJ09jY3VwYXRpb25JZCc6ICdPY3VwYWNpw7NuJyxcclxuICAgICAgICAnRWR1Y2F0aW9uTGV2ZWxJZCc6ICdOaXZlbCBlZHVjYWNpw7NuJyxcclxuICAgICAgICAnRGlzYWJpbGl0eVR5cGVJZCc6ICdUaXBvIGRpc2NhcGFjaWRhZCcsXHJcbiAgICAgICAgJ05hdGlvbmFsaXR5JzogJ05hY2lvbmFsaWRhZCcsXHJcbiAgICAgICAgJ0xvY2F0aW9uSWQnOiAnTG9jYWxpZGFkJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY29sdW1uc01hbmFnZXI6IGFueSA9IG51bGw7XHJcbiAgICBsZXQgdmlld3NNYW5hZ2VyOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vIEluaWNpYWxpemFyIGdlc3RvciBkZSBjb2x1bW5hc1xyXG4gICAgaWYgKHcuR3JpZENvbHVtbnNNYW5hZ2VyKSB7XHJcbiAgICAgICAgY29sdW1uc01hbmFnZXIgPSBuZXcgdy5HcmlkQ29sdW1uc01hbmFnZXIoXHJcbiAgICAgICAgICAgIGFsbENvbHVtbnMsXHJcbiAgICAgICAgICAgIGRlZmF1bHRDb2x1bW5zLFxyXG4gICAgICAgICAgICBhcHBseUNvbHVtblZpc2liaWxpdHksXHJcbiAgICAgICAgICAgIChmOiBzdHJpbmcpID0+IGNvbHVtblRpdGxlc1tmXSB8fCBmXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbmljaWFsaXphciBnZXN0b3IgZGUgdmlzdGFzXHJcbiAgICBpZiAody5HcmlkVmlld3NNYW5hZ2VyICYmIHRva2VuICYmIHVzZXJSZWNJZCA+IDApIHtcclxuICAgICAgICB2aWV3c01hbmFnZXIgPSBuZXcgdy5HcmlkVmlld3NNYW5hZ2VyKGFwaUJhc2UsIHRva2VuLCBlbnRpdHlOYW1lLCB1c2VyUmVjSWQsICcnKTtcclxuICAgICAgICB2aWV3c01hbmFnZXIuaW5pdGlhbGl6ZSgpLnRoZW4oKGNvbmZpZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVZpZXdzRHJvcGRvd24oKTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ3MubGVuZ3RoID4gMCAmJiBjb2x1bW5zTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uc01hbmFnZXIuYXBwbHlDb2x1bW5Db25maWcoY29uZmlncyk7XHJcbiAgICAgICAgICAgICAgICBhcHBseUNvbHVtblZpc2liaWxpdHkoY29sdW1uc01hbmFnZXIuZ2V0VmlzaWJsZUNvbHVtbnMoKSk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVDdXJyZW50Vmlld05hbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEV2ZW50OiBBYnJpciBtb2RhbCBkZSBjb2x1bW5hc1xyXG4gICAgY29uc3QgYnRuTWFuYWdlQ29sdW1ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbWFuYWdlLWNvbHVtbnMnKTtcclxuICAgIGlmIChidG5NYW5hZ2VDb2x1bW5zKSB7XHJcbiAgICAgICAgYnRuTWFuYWdlQ29sdW1ucy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29sdW1uc01hbmFnZXI/LnNob3dDb2x1bW5zTW9kYWwoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFdmVudDogQXBsaWNhciBjb2x1bW5hcyBkZWwgbW9kYWxcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAodGFyZ2V0LmlkID09PSAnYnRuLWFwcGx5LWNvbHVtbnMnKSB7XHJcbiAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyPy5hcHBseUNvbHVtbnMoKTtcclxuICAgICAgICAgICAgKCQgYXMgYW55KSgnI21vZGFsLW1hbmFnZS1jb2x1bW5zJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgaWYgKHZpZXdzTWFuYWdlcj8uaGFzQ3VycmVudFZpZXcoKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnRuU2F2ZUNoYW5nZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXNhdmUtdmlldy1jaGFuZ2VzJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuU2F2ZUNoYW5nZXMpIGJ0blNhdmVDaGFuZ2VzLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEV2ZW50OiBOdWV2YSB2aXN0YVxyXG4gICAgY29uc3QgYnRuTmV3VmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbmV3LXZpZXcnKTtcclxuICAgIGlmIChidG5OZXdWaWV3KSB7XHJcbiAgICAgICAgYnRuTmV3Vmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3Qgdmlld05hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LW5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAodmlld05hbWVJbnB1dCkgdmlld05hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAoJCBhcyBhbnkpKCcjbW9kYWwtc2F2ZS12aWV3JykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFdmVudDogQ29uZmlybWFyIGd1YXJkYXIgbnVldmEgdmlzdGFcclxuICAgIGNvbnN0IGJ0bkNvbmZpcm1TYXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1jb25maXJtLXNhdmUtdmlldycpO1xyXG4gICAgaWYgKGJ0bkNvbmZpcm1TYXZlKSB7XHJcbiAgICAgICAgYnRuQ29uZmlybVNhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdOYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1uYW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9ICh2aWV3TmFtZUlucHV0Py52YWx1ZSB8fCAnJykudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHcud2luZG93c19tZXNzYWdlPy4oJ0luZ3Jlc2UgdW4gbm9tYnJlIHBhcmEgbGEgdmlzdGEnLCAnZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmlld3NNYW5hZ2VyICYmIGNvbHVtbnNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0RlZmF1bHQgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctaXMtZGVmYXVsdCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQpPy5jaGVja2VkIHx8IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNQdWJsaWMgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctaXMtcHVibGljJykgYXMgSFRNTElucHV0RWxlbWVudCk/LmNoZWNrZWQgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IHZpZXdzTWFuYWdlci5zYXZlVmlldyhuYW1lLCBjb2x1bW5zTWFuYWdlci5nZXRDdXJyZW50Q29sdW1uQ29uZmlnKCksIGlzRGVmYXVsdCwgaXNQdWJsaWMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKCQgYXMgYW55KSgnI21vZGFsLXNhdmUtdmlldycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmlld3NEcm9wZG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlbnQ6IEd1YXJkYXIgY2FtYmlvcyBlbiB2aXN0YSBhY3R1YWxcclxuICAgIGNvbnN0IGJ0blNhdmVDaGFuZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1zYXZlLXZpZXctY2hhbmdlcycpO1xyXG4gICAgaWYgKGJ0blNhdmVDaGFuZ2VzKSB7XHJcbiAgICAgICAgYnRuU2F2ZUNoYW5nZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmICh2aWV3c01hbmFnZXIgJiYgY29sdW1uc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgdmlld3NNYW5hZ2VyLnVwZGF0ZVZpZXcoY29sdW1uc01hbmFnZXIuZ2V0Q3VycmVudENvbHVtbkNvbmZpZygpKTtcclxuICAgICAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0blNhdmVDaGFuZ2VzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFdmVudDogQ2xpY2sgZW4gdmlzdGEgZGVsIGRyb3Bkb3duXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgYW5jaG9yID0gdGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXZpZXddJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKCFhbmNob3IpIHJldHVybjtcclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXdJZCA9IGFuY2hvci5kYXRhc2V0LnZpZXc7XHJcbiAgICAgICAgY29uc3QgYnRuU2F2ZUNoYW5nZXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tc2F2ZS12aWV3LWNoYW5nZXMnKTtcclxuXHJcbiAgICAgICAgaWYgKHZpZXdJZCA9PT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgIGNvbHVtbnNNYW5hZ2VyPy5yZXNldFRvRGVmYXVsdChkZWZhdWx0Q29sdW1ucyk7XHJcbiAgICAgICAgICAgIGFwcGx5Q29sdW1uVmlzaWJpbGl0eShkZWZhdWx0Q29sdW1ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWaWV3TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50LXZpZXctbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFZpZXdOYW1lKSBjdXJyZW50Vmlld05hbWUudGV4dENvbnRlbnQgPSAnVmlzdGEgcG9yIGRlZmVjdG8nO1xyXG4gICAgICAgICAgICBpZiAoYnRuU2F2ZUNoYW5nZXNFbCkgYnRuU2F2ZUNoYW5nZXNFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmlld3NNYW5hZ2VyICYmIGNvbHVtbnNNYW5hZ2VyICYmIHZpZXdJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb25maWdzID0gYXdhaXQgdmlld3NNYW5hZ2VyLmxvYWRWaWV3KHBhcnNlSW50KHZpZXdJZCwgMTApKTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zTWFuYWdlci5hcHBseUNvbHVtbkNvbmZpZyhjb25maWdzKTtcclxuICAgICAgICAgICAgICAgIGFwcGx5Q29sdW1uVmlzaWJpbGl0eShjb2x1bW5zTWFuYWdlci5nZXRWaXNpYmxlQ29sdW1ucygpKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRWaWV3TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0blNhdmVDaGFuZ2VzRWwpIGJ0blNhdmVDaGFuZ2VzRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBsaWNhIGxhIHZpc2liaWxpZGFkIHkgb3JkZW4gZGUgY29sdW1uYXMgYSBsYSB0YWJsYS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYXBwbHlDb2x1bW5WaXNpYmlsaXR5KHZpc2libGU6IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTWFpblRhYmxlJyk7XHJcbiAgICAgICAgaWYgKCF0YWJsZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXJUZXh0TWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgICAgICAgICAnRW1wbG95ZWVJZCc6ICdOw7ptZXJvIGRlIHBlcnNvbmFsJyxcclxuICAgICAgICAgICAgJ05hbWUnOiAnTm9tYnJlJyxcclxuICAgICAgICAgICAgJ0xhc3ROYW1lJzogJ0FwZWxsaWRvJyxcclxuICAgICAgICAgICAgJ1BlcnNvbmFsVHJlYXRtZW50JzogJ1RyYXRhbWllbnRvJyxcclxuICAgICAgICAgICAgJ0JpcnRoRGF0ZSc6ICdGZWNoYSBuYWNpbWllbnRvJyxcclxuICAgICAgICAgICAgJ0dlbmRlcic6ICdHw6luZXJvJyxcclxuICAgICAgICAgICAgJ0FnZSc6ICdFZGFkJyxcclxuICAgICAgICAgICAgJ0RlcGVuZGVudHNOdW1iZXJzJzogJ0RlcGVuZGllbnRlcycsXHJcbiAgICAgICAgICAgICdNYXJpdGFsU3RhdHVzJzogJ0VzdGFkbyBjaXZpbCcsXHJcbiAgICAgICAgICAgICdOU1MnOiAnTlNTJyxcclxuICAgICAgICAgICAgJ0FSUyc6ICdBUlMnLFxyXG4gICAgICAgICAgICAnQUZQJzogJ0FGUCcsXHJcbiAgICAgICAgICAgICdBZG1pc3Npb25EYXRlJzogJ0ZlY2hhIGluZ3Jlc28nLFxyXG4gICAgICAgICAgICAnQ291bnRyeSc6ICdQYcOtcycsXHJcbiAgICAgICAgICAgICdFbXBsb3llZVR5cGUnOiBlbXBsb3llZVR5cGUgPT09ICdEYWRvcyBkZSBiYWphJyA/ICdNb3Rpdm8nIDogJ1RpcG8gZW1wbGVhZG8nLFxyXG4gICAgICAgICAgICAnSG9tZU9mZmljZSc6ICdIb21lIE9mZmljZScsXHJcbiAgICAgICAgICAgICdPd25DYXInOiAnVmVow61jdWxvIHByb3BpbycsXHJcbiAgICAgICAgICAgICdIYXNEaXNhYmlsaXR5JzogJ0Rpc2NhcGFjaWRhZCcsXHJcbiAgICAgICAgICAgICdBcHBseWZvck92ZXJ0aW1lJzogJ0FwbGljYSBob3JhcyBleHRyYScsXHJcbiAgICAgICAgICAgICdJc0ZpeGVkV29ya0NhbGVuZGFyJzogJ0NhbGVuZGFyaW8gZmlqbycsXHJcbiAgICAgICAgICAgICdXb3JrRnJvbSc6ICdIb3JhIGVudHJhZGEnLFxyXG4gICAgICAgICAgICAnV29ya1RvJzogJ0hvcmEgc2FsaWRhJyxcclxuICAgICAgICAgICAgJ0JyZWFrV29ya0Zyb20nOiAnSW5pY2lvIGRlc2NhbnNvJyxcclxuICAgICAgICAgICAgJ0JyZWFrV29ya1RvJzogJ0ZpbiBkZXNjYW5zbycsXHJcbiAgICAgICAgICAgICdFbXBsb3llZVN0YXR1cyc6ICdFc3RhZG8nLFxyXG4gICAgICAgICAgICAnU3RhcnRXb3JrRGF0ZSc6ICdJbmljaW8gdHJhYmFqbycsXHJcbiAgICAgICAgICAgICdFbmRXb3JrRGF0ZSc6ICdGaW4gdHJhYmFqbycsXHJcbiAgICAgICAgICAgICdQYXlNZXRob2QnOiAnTcOpdG9kbyBwYWdvJyxcclxuICAgICAgICAgICAgJ1dvcmtTdGF0dXMnOiAnRXN0YWRvIGxhYm9yYWwnLFxyXG4gICAgICAgICAgICAnRW1wbG95ZWVBY3Rpb24nOiAnQWNjacOzbicsXHJcbiAgICAgICAgICAgICdPY2N1cGF0aW9uSWQnOiAnT2N1cGFjacOzbicsXHJcbiAgICAgICAgICAgICdFZHVjYXRpb25MZXZlbElkJzogJ05pdmVsIGVkdWNhY2nDs24nLFxyXG4gICAgICAgICAgICAnRGlzYWJpbGl0eVR5cGVJZCc6ICdUaXBvIGRpc2NhcGFjaWRhZCcsXHJcbiAgICAgICAgICAgICdOYXRpb25hbGl0eSc6ICdOYWNpb25hbGlkYWQnLFxyXG4gICAgICAgICAgICAnTG9jYXRpb25JZCc6ICdMb2NhbGlkYWQnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gUmVvcmRlbmFyIGhlYWRlcnNcclxuICAgICAgICBjb25zdCBoZWFkZXJSb3cgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0aGVhZCB0cicpO1xyXG4gICAgICAgIGlmIChoZWFkZXJSb3cpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tib3hDZWxsID0gaGVhZGVyUm93LnF1ZXJ5U2VsZWN0b3IoJy5jaGVjay1jZWxsLWFwcCcpO1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJDZWxscyA9IEFycmF5LmZyb20oaGVhZGVyUm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkOm5vdCguY2hlY2stY2VsbC1hcHApJykpO1xyXG4gICAgICAgICAgICBoZWFkZXJDZWxscy5mb3JFYWNoKGNlbGwgPT4gKGNlbGwgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG4gICAgICAgICAgICB2aXNpYmxlLmZvckVhY2goKGNvbE5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlclRleHQgPSBoZWFkZXJUZXh0TWFwW2NvbE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGhlYWRlckNlbGxzLmZpbmQoYyA9PiBjLnRleHRDb250ZW50Py50cmltKCkgPT09IGhlYWRlclRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAoY2VsbCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlclJvdy5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChjaGVja2JveENlbGwpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlclJvdy5pbnNlcnRCZWZvcmUoY2hlY2tib3hDZWxsLCBoZWFkZXJSb3cuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1hcGVvIGRlIGNsYXNlcyBDU1MgZGUgbGFzIGNlbGRhc1xyXG4gICAgICAgIGNvbnN0IGNvbENsYXNzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgICAgICAgICAnRW1wbG95ZWVJZCc6ICdFbXBsb3llZUlkdGJsJyxcclxuICAgICAgICAgICAgJ05hbWUnOiAnTmFtZXRibCcsXHJcbiAgICAgICAgICAgICdMYXN0TmFtZSc6ICdMYXN0TmFtZXRibCcsXHJcbiAgICAgICAgICAgICdQZXJzb25hbFRyZWF0bWVudCc6ICdQZXJzb25hbFRyZWF0bWVudHRibCcsXHJcbiAgICAgICAgICAgICdCaXJ0aERhdGUnOiAnQmlydGhEYXRldGJsJyxcclxuICAgICAgICAgICAgJ0dlbmRlcic6ICdHZW5kZXJ0YmwnLFxyXG4gICAgICAgICAgICAnQWdlJzogJ0FnZXRibCcsXHJcbiAgICAgICAgICAgICdEZXBlbmRlbnRzTnVtYmVycyc6ICdEZXBlbmRlbnRzTnVtYmVyc3RibCcsXHJcbiAgICAgICAgICAgICdNYXJpdGFsU3RhdHVzJzogJ01hcml0YWxTdGF0dXN0YmwnLFxyXG4gICAgICAgICAgICAnTlNTJzogJ05TU3RibCcsXHJcbiAgICAgICAgICAgICdBUlMnOiAnQVJTdGJsJyxcclxuICAgICAgICAgICAgJ0FGUCc6ICdBRlB0YmwnLFxyXG4gICAgICAgICAgICAnQWRtaXNzaW9uRGF0ZSc6ICdBZG1pc3Npb25EYXRldGJsJyxcclxuICAgICAgICAgICAgJ0NvdW50cnknOiAnQ291bnRyeXRibCcsXHJcbiAgICAgICAgICAgICdFbXBsb3llZVR5cGUnOiAnRW1wbG95ZWVUeXBldGJsJyxcclxuICAgICAgICAgICAgJ0hvbWVPZmZpY2UnOiAnSG9tZU9mZmljZXRibCcsXHJcbiAgICAgICAgICAgICdPd25DYXInOiAnT3duQ2FydGJsJyxcclxuICAgICAgICAgICAgJ0hhc0Rpc2FiaWxpdHknOiAnSGFzRGlzYWJpbGl0eXRibCcsXHJcbiAgICAgICAgICAgICdBcHBseWZvck92ZXJ0aW1lJzogJ0FwcGx5Zm9yT3ZlcnRpbWV0YmwnLFxyXG4gICAgICAgICAgICAnSXNGaXhlZFdvcmtDYWxlbmRhcic6ICdJc0ZpeGVkV29ya0NhbGVuZGFydGJsJyxcclxuICAgICAgICAgICAgJ1dvcmtGcm9tJzogJ1dvcmtGcm9tdGJsJyxcclxuICAgICAgICAgICAgJ1dvcmtUbyc6ICdXb3JrVG90YmwnLFxyXG4gICAgICAgICAgICAnQnJlYWtXb3JrRnJvbSc6ICdCcmVha1dvcmtGcm9tdGJsJyxcclxuICAgICAgICAgICAgJ0JyZWFrV29ya1RvJzogJ0JyZWFrV29ya1RvdGJsJyxcclxuICAgICAgICAgICAgJ0VtcGxveWVlU3RhdHVzJzogJ0VtcGxveWVlU3RhdHVzdGJsJyxcclxuICAgICAgICAgICAgJ1N0YXJ0V29ya0RhdGUnOiAnU3RhcnRXb3JrRGF0ZXRibCcsXHJcbiAgICAgICAgICAgICdFbmRXb3JrRGF0ZSc6ICdFbmRXb3JrRGF0ZXRibCcsXHJcbiAgICAgICAgICAgICdQYXlNZXRob2QnOiAnUGF5TWV0aG9kdGJsJyxcclxuICAgICAgICAgICAgJ1dvcmtTdGF0dXMnOiAnV29ya1N0YXR1c3RibCcsXHJcbiAgICAgICAgICAgICdFbXBsb3llZUFjdGlvbic6ICdFbXBsb3llZUFjdGlvbnRibCcsXHJcbiAgICAgICAgICAgICdPY2N1cGF0aW9uSWQnOiAnT2NjdXBhdGlvbklkdGJsJyxcclxuICAgICAgICAgICAgJ0VkdWNhdGlvbkxldmVsSWQnOiAnRWR1Y2F0aW9uTGV2ZWxJZHRibCcsXHJcbiAgICAgICAgICAgICdEaXNhYmlsaXR5VHlwZUlkJzogJ0Rpc2FiaWxpdHlUeXBlSWR0YmwnLFxyXG4gICAgICAgICAgICAnTmF0aW9uYWxpdHknOiAnTmF0aW9uYWxpdHl0YmwnLFxyXG4gICAgICAgICAgICAnTG9jYXRpb25JZCc6ICdMb2NhdGlvbklkdGJsJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFJlb3JkZW5hciBib2R5IHJvd3NcclxuICAgICAgICBjb25zdCBib2R5Um93cyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyJyk7XHJcbiAgICAgICAgYm9keVJvd3MuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94Q2VsbCA9IHJvdy5xdWVyeVNlbGVjdG9yKCcuY2hlY2stY2VsbC1hcHAnKTtcclxuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBBcnJheS5mcm9tKHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZDpub3QoLmNoZWNrLWNlbGwtYXBwKScpKTtcclxuXHJcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiAoY2VsbCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcbiAgICAgICAgICAgIHZpc2libGUuZm9yRWFjaCgoY29sTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gY29sQ2xhc3NNYXBbY29sTmFtZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gY2VsbHMuZmluZChjID0+IGMuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAoY2VsbCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChjaGVja2JveENlbGwpIHtcclxuICAgICAgICAgICAgICAgIHJvdy5pbnNlcnRCZWZvcmUoY2hlY2tib3hDZWxsLCByb3cuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdHVhbGl6YSBlbCBkcm9wZG93biBjb24gbGFzIHZpc3RhcyBkaXNwb25pYmxlcy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlVmlld3NEcm9wZG93bigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXZpZXdzTWFuYWdlcikgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlZC12aWV3cy1jb250YWluZXInKTtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB2aWV3cyA9IHZpZXdzTWFuYWdlci5nZXRBdmFpbGFibGVWaWV3cygpO1xyXG4gICAgICAgIGlmICh2aWV3cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInRleHQtbXV0ZWQtdmlld3NcIj5TaW4gdmlzdGFzIGd1YXJkYWRhczwvc3Bhbj4nO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaHRtbCA9ICcnO1xyXG4gICAgICAgIHZpZXdzLmZvckVhY2goKHY6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFySWNvbiA9IHYuSXNEZWZhdWx0XHJcbiAgICAgICAgICAgICAgICA/ICc8aSBjbGFzcz1cImZhIGZhLXN0YXJcIiBzdHlsZT1cImNvbG9yOiNmMGFkNGU7XCIgdGl0bGU9XCJWaXN0YSBwcmVkZXRlcm1pbmFkYVwiPjwvaT4nXHJcbiAgICAgICAgICAgICAgICA6IGA8aSBjbGFzcz1cImZhIGZhLXN0YXItbyBidG4tc2V0LWRlZmF1bHRcIiBkYXRhLXZpZXctaWQ9XCIke3YuUmVjSWR9XCIgc3R5bGU9XCJjb2xvcjojOTk5OyBjdXJzb3I6cG9pbnRlcjtcIiB0aXRsZT1cIkVzdGFibGVjZXIgY29tbyBwcmVkZXRlcm1pbmFkYVwiPjwvaT5gO1xyXG4gICAgICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwic2F2ZWQtdmlldy1pdGVtXCIgc3R5bGU9XCJkaXNwbGF5OmZsZXg7IGp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuOyBhbGlnbi1pdGVtczpjZW50ZXI7IHBhZGRpbmc6NXB4IDE1cHg7XCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGRhdGEtdmlldz1cIiR7di5SZWNJZH1cIiBzdHlsZT1cImZsZXg6MTsgY29sb3I6IzMzMzsgdGV4dC1kZWNvcmF0aW9uOm5vbmU7XCI+JHt2LlZpZXdOYW1lfTwvYT5cclxuICAgICAgICAgICAgICAgICR7c3Rhckljb259XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLXNldC1kZWZhdWx0JykuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgdmlld0lkID0gcGFyc2VJbnQoKGJ0biBhcyBIVE1MRWxlbWVudCkuZGF0YXNldC52aWV3SWQgfHwgJzAnLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlld0lkID4gMCAmJiB2aWV3c01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgdmlld3NNYW5hZ2VyLnNldERlZmF1bHRWaWV3KHZpZXdJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmlld3NEcm9wZG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3R1YWxpemEgZWwgbm9tYnJlIGRlIGxhIHZpc3RhIGFjdHVhbC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlQ3VycmVudFZpZXdOYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdmlld3NNYW5hZ2VyKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudC12aWV3LW5hbWUnKTtcclxuICAgICAgICBpZiAoZWwpIGVsLnRleHRDb250ZW50ID0gdmlld3NNYW5hZ2VyLmdldEN1cnJlbnRWaWV3TmFtZSgpO1xyXG4gICAgfVxyXG59KSgpO1xyXG4iXX0=