/**
 * @file M_Department-views.ts
 * @description Integración del sistema de vistas con el módulo de departamentos.
 *              Este archivo se carga después de M_Department.ts.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module DepartamentosVistas
 */

/**
 * Inicializa el sistema de gestión de vistas para departamentos.
 * Se ejecuta automáticamente al cargar la página.
 */
(function initDepartmentViews(): void {
    const w = window as any;
    const pageEl = document.getElementById('department-page');
    if (!pageEl) return;

    const token = pageEl.dataset.token || '';
    const userRecId = parseInt(pageEl.dataset.user || '0', 10);
    const apiBase = '/api/v2.0';

    // Columnas del grid de departamentos
    const allColumns = ['DepartmentId', 'Name', 'QtyWorkers', 'StartDate', 'EndDate', 'Description'];
    const defaultColumns = [...allColumns];
    const columnTitles: Record<string, string> = {
        'DepartmentId': 'Id Departamento',
        'Name': 'Nombre del departamento',
        'QtyWorkers': 'Trabajadores',
        'StartDate': 'Fecha inicial',
        'EndDate': 'Fecha final',
        'Description': 'Descripción'
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
        viewsManager = new w.GridViewsManager(apiBase, token, 'Department', userRecId, '');
        viewsManager.initialize().then((configs: any[]) => {
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
                // Mostrar el botón guardar cambios
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
                    // Ocultar el botón guardar cambios
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
            // Ocultar botón guardar cambios
            if (btnSaveChangesEl) btnSaveChangesEl.style.display = 'none';
        } else if (viewsManager && columnsManager && viewId) {
            const configs = await viewsManager.loadView(parseInt(viewId, 10));
            if (configs.length) {
                columnsManager.applyColumnConfig(configs);
                applyColumnVisibility(columnsManager.getVisibleColumns());
                updateCurrentViewName();
                // Ocultar botón guardar cambios al cargar una vista
                if (btnSaveChangesEl) btnSaveChangesEl.style.display = 'none';
            }
        }
    });

    /**
     * Aplica la visibilidad y orden de columnas a la tabla.
     * @param visible Array de nombres de columnas visibles en el orden deseado.
     */
    function applyColumnVisibility(visible: string[]): void {
        const table = document.getElementById('MainTable');
        if (!table) return;

        // Mapeo de nombre de columna a clase CSS de la celda
        const colClassMap: Record<string, string> = {
            'DepartmentId': 'DepartmentIdtbl',
            'Name': 'Nametbl',
            'QtyWorkers': 'QtyWorkerstbl',
            'StartDate': 'StartDatetbl',
            'EndDate': 'EndDatetbl',
            'Description': 'Descriptiontbl'
        };

        // Mapeo de nombre de columna a texto del header
        const headerTextMap: Record<string, string> = {
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
            headerCells.forEach(cell => (cell as HTMLElement).style.display = 'none');

            // Mostrar y reordenar solo las visibles
            visible.forEach((colName) => {
                const headerText = headerTextMap[colName];
                const cell = headerCells.find(c => c.textContent?.trim() === headerText);
                if (cell) {
                    (cell as HTMLElement).style.display = '';
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
            cells.forEach(cell => (cell as HTMLElement).style.display = 'none');

            // Mostrar y reordenar solo las visibles
            visible.forEach((colName) => {
                const className = colClassMap[colName];
                const cell = cells.find(c => c.classList.contains(className));
                if (cell) {
                    (cell as HTMLElement).style.display = '';
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

        // Event listeners para establecer vista por defecto
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
     * Actualiza el nombre de la vista actual en el dropdown.
     */
    function updateCurrentViewName(): void {
        if (!viewsManager) return;
        const el = document.getElementById('current-view-name');
        if (el) el.textContent = viewsManager.getCurrentViewName();
    }
})();


