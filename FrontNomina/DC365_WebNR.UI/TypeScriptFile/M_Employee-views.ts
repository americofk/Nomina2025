/**
 * @file M_Employee-views.ts
 * @description Integración del sistema de vistas con el módulo de empleados.
 * Soporta Empleados, Prospectos y Dados de baja.
 */

(function initEmployeeViews(): void {
    const w = window as any;
    const pageEl = document.getElementById('employee-page');
    if (!pageEl) return;

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
    const columnTitles: Record<string, string> = {
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

    let columnsManager: any = null;
    let viewsManager: any = null;

    // Inicializar gestor de columnas
    if (w.GridColumnsManager) {
        columnsManager = new w.GridColumnsManager(
            allColumns,
            defaultColumns,
            applyColumnVisibility,
            (f: string) => columnTitles[f] || f
        );
    }

    // Inicializar gestor de vistas
    if (w.GridViewsManager && token && userRecId > 0) {
        viewsManager = new w.GridViewsManager(apiBase, token, entityName, userRecId, '');
        viewsManager.initialize().then((configs: any[]) => {
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
            columnsManager?.showColumnsModal();
        });
    }

    // Event: Aplicar columnas del modal
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'btn-apply-columns') {
            columnsManager?.applyColumns();
            ($ as any)('#modal-manage-columns').modal('hide');
            if (viewsManager?.hasCurrentView()) {
                const btnSaveChanges = document.getElementById('btn-save-view-changes');
                if (btnSaveChanges) btnSaveChanges.style.display = '';
            }
        }
    });

    // Event: Nueva vista
    const btnNewView = document.getElementById('btn-new-view');
    if (btnNewView) {
        btnNewView.addEventListener('click', (e) => {
            e.preventDefault();
            const viewNameInput = document.getElementById('view-name') as HTMLInputElement;
            if (viewNameInput) viewNameInput.value = '';
            ($ as any)('#modal-save-view').modal('show');
        });
    }

    // Event: Confirmar guardar nueva vista
    const btnConfirmSave = document.getElementById('btn-confirm-save-view');
    if (btnConfirmSave) {
        btnConfirmSave.addEventListener('click', async () => {
            const viewNameInput = document.getElementById('view-name') as HTMLInputElement;
            const name = (viewNameInput?.value || '').trim();
            if (!name) {
                w.windows_message?.('Ingrese un nombre para la vista', 'error');
                return;
            }
            if (viewsManager && columnsManager) {
                const isDefault = (document.getElementById('view-is-default') as HTMLInputElement)?.checked || false;
                const isPublic = (document.getElementById('view-is-public') as HTMLInputElement)?.checked || false;
                const ok = await viewsManager.saveView(name, columnsManager.getCurrentColumnConfig(), isDefault, isPublic);
                if (ok) {
                    ($ as any)('#modal-save-view').modal('hide');
                    updateViewsDropdown();
                    updateCurrentViewName();
                }
            }
        });
    }

    // Event: Guardar cambios en vista actual
    const btnSaveChanges = document.getElementById('btn-save-view-changes');
    if (btnSaveChanges) {
        btnSaveChanges.addEventListener('click', async (e) => {
            e.preventDefault();
            if (viewsManager && columnsManager) {
                const ok = await viewsManager.updateView(columnsManager.getCurrentColumnConfig());
                if (ok) {
                    btnSaveChanges.style.display = 'none';
                }
            }
        });
    }

    // Event: Click en vista del dropdown
    document.addEventListener('click', async (e) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('[data-view]') as HTMLElement;
        if (!anchor) return;

        e.preventDefault();
        const viewId = anchor.dataset.view;
        const btnSaveChangesEl = document.getElementById('btn-save-view-changes');

        if (viewId === 'default') {
            columnsManager?.resetToDefault(defaultColumns);
            applyColumnVisibility(defaultColumns);
            const currentViewName = document.getElementById('current-view-name');
            if (currentViewName) currentViewName.textContent = 'Vista por defecto';
            if (btnSaveChangesEl) btnSaveChangesEl.style.display = 'none';
        } else if (viewsManager && columnsManager && viewId) {
            const configs = await viewsManager.loadView(parseInt(viewId, 10));
            if (configs.length) {
                columnsManager.applyColumnConfig(configs);
                applyColumnVisibility(columnsManager.getVisibleColumns());
                updateCurrentViewName();
                if (btnSaveChangesEl) btnSaveChangesEl.style.display = 'none';
            }
        }
    });

    /**
     * Aplica la visibilidad y orden de columnas a la tabla.
     */
    function applyColumnVisibility(visible: string[]): void {
        const table = document.getElementById('MainTable');
        if (!table) return;

        const headerTextMap: Record<string, string> = {
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
            headerCells.forEach(cell => (cell as HTMLElement).style.display = 'none');
            visible.forEach((colName) => {
                const headerText = headerTextMap[colName];
                const cell = headerCells.find(c => c.textContent?.trim() === headerText);
                if (cell) {
                    (cell as HTMLElement).style.display = '';
                    headerRow.appendChild(cell);
                }
            });
            if (checkboxCell) {
                headerRow.insertBefore(checkboxCell, headerRow.firstChild);
            }
        }

        // Mapeo de clases CSS de las celdas
        const colClassMap: Record<string, string> = {
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

            cells.forEach(cell => (cell as HTMLElement).style.display = 'none');
            visible.forEach((colName) => {
                const className = colClassMap[colName];
                const cell = cells.find(c => c.classList.contains(className));
                if (cell) {
                    (cell as HTMLElement).style.display = '';
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
    function updateViewsDropdown(): void {
        if (!viewsManager) return;
        const container = document.getElementById('saved-views-container');
        if (!container) return;

        const views = viewsManager.getAvailableViews();
        if (views.length === 0) {
            container.innerHTML = '<span class="text-muted-views">Sin vistas guardadas</span>';
            return;
        }

        let html = '';
        views.forEach((v: any) => {
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
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const viewId = parseInt((btn as HTMLElement).dataset.viewId || '0', 10);
                if (viewId > 0 && viewsManager) {
                    const success = await viewsManager.setDefaultView(viewId);
                    if (success) {
                        updateViewsDropdown();
                    }
                }
            });
        });
    }

    /**
     * Actualiza el nombre de la vista actual.
     */
    function updateCurrentViewName(): void {
        if (!viewsManager) return;
        const el = document.getElementById('current-view-name');
        if (el) el.textContent = viewsManager.getCurrentViewName();
    }
})();
