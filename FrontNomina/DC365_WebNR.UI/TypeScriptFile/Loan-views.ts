/**
 * @file Loan-views.ts
 * @description Integración del sistema de vistas con el módulo de préstamos.
 */
(function initLoanViews(): void {
    const w = window as any;
    const pageEl = document.getElementById('loan-page');
    if (!pageEl) return;

    const token = pageEl.dataset.token || '';
    const userRecId = parseInt(pageEl.dataset.user || '0', 10);
    const apiBase = '/api/v2.0';

    const allColumns = ['LoanId', 'Name', 'ProjId', 'ProjCategoryId', 'ValidFrom', 'ValidTo', 'LedgerAccount', 'DepartmentId', 'Description'];
    const defaultColumns = [...allColumns];
    const columnTitles: Record<string, string> = {
        'LoanId': 'Id Código',
        'Name': 'Nombre del código',
        'ProjId': 'Proyecto',
        'ProjCategoryId': 'Categoría de proyecto',
        'ValidFrom': 'Válido desde',
        'ValidTo': 'Válido hasta',
        'LedgerAccount': 'Cuenta contable',
        'DepartmentId': 'Departamento',
        'Description': 'Descripción'
    };

    let columnsManager: any = null;
    let viewsManager: any = null;

    if (w.GridColumnsManager) {
        columnsManager = new w.GridColumnsManager(allColumns, defaultColumns, applyColumnVisibility, (f: string) => columnTitles[f] || f);
    }

    if (w.GridViewsManager && token && userRecId > 0) {
        viewsManager = new w.GridViewsManager(apiBase, token, 'Loan', userRecId, '');
        viewsManager.initialize().then((configs: any[]) => {
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
        btnManageColumns.addEventListener('click', (e) => { e.preventDefault(); columnsManager?.showColumnsModal(); });
    }

    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'btn-apply-columns') {
            columnsManager?.applyColumns();
            ($ as any)('#modal-manage-columns').modal('hide');
            if (viewsManager?.hasCurrentView()) {
                const btn = document.getElementById('btn-save-view-changes');
                if (btn) btn.style.display = '';
            }
        }
    });

    const btnNewView = document.getElementById('btn-new-view');
    if (btnNewView) {
        btnNewView.addEventListener('click', (e) => {
            e.preventDefault();
            const input = document.getElementById('view-name') as HTMLInputElement;
            if (input) input.value = '';
            ($ as any)('#modal-save-view').modal('show');
        });
    }

    const btnConfirmSave = document.getElementById('btn-confirm-save-view');
    if (btnConfirmSave) {
        btnConfirmSave.addEventListener('click', async () => {
            const input = document.getElementById('view-name') as HTMLInputElement;
            const name = (input?.value || '').trim();
            if (!name) { w.windows_message?.('Ingrese un nombre para la vista', 'error'); return; }
            if (viewsManager && columnsManager) {
                const isDefault = (document.getElementById('view-is-default') as HTMLInputElement)?.checked || false;
                const isPublic = (document.getElementById('view-is-public') as HTMLInputElement)?.checked || false;
                const ok = await viewsManager.saveView(name, columnsManager.getCurrentColumnConfig(), isDefault, isPublic);
                if (ok) { ($ as any)('#modal-save-view').modal('hide'); updateViewsDropdown(); updateCurrentViewName(); }
            }
        });
    }

    const btnSaveChanges = document.getElementById('btn-save-view-changes');
    if (btnSaveChanges) {
        btnSaveChanges.addEventListener('click', async (e) => {
            e.preventDefault();
            if (viewsManager && columnsManager) {
                const ok = await viewsManager.updateView(columnsManager.getCurrentColumnConfig());
                if (ok) btnSaveChanges.style.display = 'none';
            }
        });
    }

    document.addEventListener('click', async (e) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('[data-view]') as HTMLElement;
        if (!anchor) return;
        e.preventDefault();
        const viewId = anchor.dataset.view;
        const btnSaveEl = document.getElementById('btn-save-view-changes');
        if (viewId === 'default') {
            columnsManager?.resetToDefault(defaultColumns);
            applyColumnVisibility(defaultColumns);
            const el = document.getElementById('current-view-name');
            if (el) el.textContent = 'Vista por defecto';
            if (btnSaveEl) btnSaveEl.style.display = 'none';
        } else if (viewsManager && columnsManager && viewId) {
            const configs = await viewsManager.loadView(parseInt(viewId, 10));
            if (configs.length) {
                columnsManager.applyColumnConfig(configs);
                applyColumnVisibility(columnsManager.getVisibleColumns());
                updateCurrentViewName();
                if (btnSaveEl) btnSaveEl.style.display = 'none';
            }
        }
    });

    function applyColumnVisibility(visible: string[]): void {
        const table = document.getElementById('MainTable');
        if (!table) return;
        const headerTextMap: Record<string, string> = columnTitles;
        const columnIndexMap: Record<string, number> = {
            'LoanId': 0, 'Name': 1, 'ProjId': 2, 'ProjCategoryId': 3, 'ValidFrom': 4, 'ValidTo': 5, 'LedgerAccount': 6, 'DepartmentId': 7, 'Description': 8
        };
        const headerRow = table.querySelector('thead tr');
        if (headerRow) {
            const checkboxCell = headerRow.querySelector('.check-cell-app');
            const headerCells = Array.from(headerRow.querySelectorAll('td:not(.check-cell-app)'));
            headerCells.forEach(cell => (cell as HTMLElement).style.display = 'none');
            visible.forEach((colName) => {
                const headerText = headerTextMap[colName];
                const cell = headerCells.find(c => c.textContent?.trim() === headerText);
                if (cell) { (cell as HTMLElement).style.display = ''; headerRow.appendChild(cell); }
            });
            if (checkboxCell) headerRow.insertBefore(checkboxCell, headerRow.firstChild);
        }
        const bodyRows = table.querySelectorAll('tbody tr');
        bodyRows.forEach((row) => {
            const checkboxCell = row.querySelector('.check-cell-app');
            const cells = Array.from(row.querySelectorAll('td:not(.check-cell-app)'));
            cells.forEach(cell => (cell as HTMLElement).style.display = 'none');
            visible.forEach((colName) => {
                const idx = columnIndexMap[colName];
                if (idx !== undefined && cells[idx]) { (cells[idx] as HTMLElement).style.display = ''; row.appendChild(cells[idx]); }
            });
            if (checkboxCell) row.insertBefore(checkboxCell, row.firstChild);
        });
    }

    function updateViewsDropdown(): void {
        if (!viewsManager) return;
        const container = document.getElementById('saved-views-container');
        if (!container) return;
        const views = viewsManager.getAvailableViews();
        if (views.length === 0) { container.innerHTML = '<span class="text-muted-views">Sin vistas guardadas</span>'; return; }
        let html = '';
        views.forEach((v: any) => {
            const starIcon = v.IsDefault ? '<i class="fa fa-star" style="color:#f0ad4e;" title="Vista predeterminada"></i>' : `<i class="fa fa-star-o btn-set-default" data-view-id="${v.RecId}" style="color:#999; cursor:pointer;" title="Establecer como predeterminada"></i>`;
            html += `<div class="saved-view-item" style="display:flex; justify-content:space-between; align-items:center; padding:5px 15px;"><a href="#" data-view="${v.RecId}" style="flex:1; color:#333; text-decoration:none;">${v.ViewName}</a>${starIcon}</div>`;
        });
        container.innerHTML = html;
        container.querySelectorAll('.btn-set-default').forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault(); e.stopPropagation();
                const viewId = parseInt((btn as HTMLElement).dataset.viewId || '0', 10);
                if (viewId > 0 && viewsManager) { const success = await viewsManager.setDefaultView(viewId); if (success) updateViewsDropdown(); }
            });
        });
    }

    function updateCurrentViewName(): void {
        if (!viewsManager) return;
        const el = document.getElementById('current-view-name');
        if (el) el.textContent = viewsManager.getCurrentViewName();
    }
})();
