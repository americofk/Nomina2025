/**
 * @file Pagination.js
 * @description Componente de paginación reutilizable para tablas del sistema RH-365.
 *              Soporta búsqueda global, selector de registros por página y navegación.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Pagination
 */

class TablePagination {
    constructor(options) {
        this.options = {
            container: null,           // Contenedor de la tabla
            tableBody: null,           // Tbody de la tabla
            apiEndpoint: '',           // Endpoint para obtener datos
            type: '',                  // Tipo de entidad (Empleado, Desvinculado, etc.)
            pageSize: 20,              // Registros por página inicial
            pageSizes: [20, 50, 75, 100], // Opciones de tamaño
            searchDelay: 400,          // Delay para búsqueda (ms)
            onDataLoaded: null,        // Callback cuando se cargan datos
            onError: null,             // Callback en caso de error
            rowRenderer: null,         // Función para renderizar filas
            ...options
        };

        this.currentPage = 1;
        this.totalPages = 1;
        this.totalRecords = 0;
        this.searchValue = '';
        this.searchTimeout = null;
        this.isLoading = false;

        this.init();
    }

    init() {
        this.createPaginationUI();
        this.bindEvents();
    }

    createPaginationUI() {
        const container = document.querySelector(this.options.container);
        if (!container) return;

        // Crear contenedor de paginación si no existe
        let paginationContainer = container.querySelector('.pagination-container');
        if (!paginationContainer) {
            paginationContainer = document.createElement('div');
            paginationContainer.className = 'pagination-container';

            // Insertar después de la tabla
            const tableContainer = container.querySelector('.container-table-app') ||
                                  container.querySelector('.scrollbar-TablePrimari');
            if (tableContainer) {
                tableContainer.parentNode.insertBefore(paginationContainer, tableContainer.nextSibling);
            } else {
                container.appendChild(paginationContainer);
            }
        }

        paginationContainer.innerHTML = `
            <div class="pagination-info">
                <span class="records-info">
                    Mostrando <span class="showing-from">1</span> - <span class="showing-to">0</span>
                    de <span class="total-count">0</span> registros
                </span>
                <div class="page-size-selector">
                    <label>Mostrar:</label>
                    <select class="page-size-select">
                        ${this.options.pageSizes.map(size =>
                            `<option value="${size}" ${size === this.options.pageSize ? 'selected' : ''}>${size}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
            <div class="pagination-controls">
                <button class="pagination-btn btn-first" title="Primera página" disabled>
                    <i class="fa fa-angle-double-left"></i>
                </button>
                <button class="pagination-btn btn-prev" title="Página anterior" disabled>
                    <i class="fa fa-angle-left"></i>
                </button>
                <div class="page-numbers"></div>
                <button class="pagination-btn btn-next" title="Página siguiente" disabled>
                    <i class="fa fa-angle-right"></i>
                </button>
                <button class="pagination-btn btn-last" title="Última página" disabled>
                    <i class="fa fa-angle-double-right"></i>
                </button>
                <div class="goto-page">
                    <label>Ir a:</label>
                    <input type="number" class="goto-input" min="1" value="1">
                </div>
            </div>
        `;

        this.paginationContainer = paginationContainer;

        // Crear loading overlay
        this.createLoadingOverlay();

        // Mejorar el buscador existente
        this.enhanceSearchInput();
    }

    createLoadingOverlay() {
        const tableContainer = document.querySelector(this.options.container + ' .container-table-app') ||
                              document.querySelector(this.options.container + ' .scrollbar-TablePrimari');
        if (!tableContainer) return;

        // Hacer el contenedor relativo si no lo es
        const computedStyle = window.getComputedStyle(tableContainer);
        if (computedStyle.position === 'static') {
            tableContainer.style.position = 'relative';
        }

        let overlay = tableContainer.querySelector('.table-loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'table-loading-overlay';
            overlay.innerHTML = '<div class="spinner"></div>';
            tableContainer.appendChild(overlay);
        }
        this.loadingOverlay = overlay;
    }

    enhanceSearchInput() {
        // Buscar el input de búsqueda existente
        const searchInput = document.querySelector(this.options.container + ' .textFilterMask') ||
                           document.querySelector(this.options.container + ' input[type="search"]');

        if (searchInput) {
            this.searchInput = searchInput;

            // Agregar placeholder si no tiene
            if (!searchInput.placeholder) {
                searchInput.placeholder = 'Buscar...';
            }
        }
    }

    bindEvents() {
        if (!this.paginationContainer) return;

        // Selector de tamaño de página
        const pageSizeSelect = this.paginationContainer.querySelector('.page-size-select');
        if (pageSizeSelect) {
            pageSizeSelect.addEventListener('change', (e) => {
                this.options.pageSize = parseInt(e.target.value);
                this.currentPage = 1;
                this.loadData();
            });
        }

        // Botones de navegación
        this.paginationContainer.querySelector('.btn-first')?.addEventListener('click', () => this.goToPage(1));
        this.paginationContainer.querySelector('.btn-prev')?.addEventListener('click', () => this.goToPage(this.currentPage - 1));
        this.paginationContainer.querySelector('.btn-next')?.addEventListener('click', () => this.goToPage(this.currentPage + 1));
        this.paginationContainer.querySelector('.btn-last')?.addEventListener('click', () => this.goToPage(this.totalPages));

        // Input ir a página
        const gotoInput = this.paginationContainer.querySelector('.goto-input');
        if (gotoInput) {
            gotoInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const page = parseInt(gotoInput.value);
                    if (page >= 1 && page <= this.totalPages) {
                        this.goToPage(page);
                    }
                }
            });

            gotoInput.addEventListener('blur', () => {
                gotoInput.value = this.currentPage;
            });
        }

        // Búsqueda
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this.searchValue = e.target.value.trim();
                    this.currentPage = 1;
                    this.loadData();
                }, this.options.searchDelay);
            });

            // Limpiar búsqueda con Escape
            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.searchInput.value = '';
                    this.searchValue = '';
                    this.currentPage = 1;
                    this.loadData();
                }
            });
        }
    }

    goToPage(page) {
        if (page < 1 || page > this.totalPages || page === this.currentPage) return;
        this.currentPage = page;
        this.loadData();
    }

    async loadData() {
        if (this.isLoading) return;

        this.isLoading = true;
        this.showLoading(true);

        try {
            const params = new URLSearchParams({
                type: this.options.type,
                searchValue: this.searchValue,
                pageNumber: this.currentPage,
                pageSize: this.options.pageSize
            });

            const response = await fetch(`${this.options.apiEndpoint}?${params}`);

            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }

            const result = await response.json();

            this.currentPage = result.pageNumber || 1;
            this.totalPages = result.totalPages || 1;
            this.totalRecords = result.totalRecords || 0;

            this.renderTableRows(result.data || []);
            this.updatePaginationUI();

            if (this.options.onDataLoaded) {
                this.options.onDataLoaded(result);
            }

        } catch (error) {
            console.error('Error loading pagination data:', error);
            if (this.options.onError) {
                this.options.onError(error);
            } else {
                windows_message('Error al cargar los datos. Intente nuevamente.', 'error');
            }
        } finally {
            this.isLoading = false;
            this.showLoading(false);
        }
    }

    renderTableRows(data) {
        const tbody = document.querySelector(this.options.tableBody);
        if (!tbody) return;

        if (data.length === 0) {
            tbody.innerHTML = `
                <tr class="row-app no-data-row">
                    <td colspan="100" style="text-align: center; padding: 40px; color: #6c757d;">
                        <i class="fa fa-search" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
                        No se encontraron registros
                    </td>
                </tr>
            `;
            return;
        }

        if (this.options.rowRenderer) {
            tbody.innerHTML = data.map((item, index) =>
                this.options.rowRenderer(item, index + 1 + ((this.currentPage - 1) * this.options.pageSize))
            ).join('');
        }

        // Re-aplicar eventos a las filas
        this.reattachRowEvents();
    }

    reattachRowEvents() {
        // Evento para selección de fila
        const checkboxes = document.querySelectorAll(this.options.tableBody + ' .check-table-app');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const row = this.closest('.row-app');
                if (row) {
                    row.classList.toggle('selected', this.checked);
                }
            });
        });
    }

    updatePaginationUI() {
        if (!this.paginationContainer) return;

        const from = this.totalRecords === 0 ? 0 : ((this.currentPage - 1) * this.options.pageSize) + 1;
        const to = Math.min(this.currentPage * this.options.pageSize, this.totalRecords);

        // Actualizar información
        this.paginationContainer.querySelector('.showing-from').textContent = from;
        this.paginationContainer.querySelector('.showing-to').textContent = to;
        this.paginationContainer.querySelector('.total-count').textContent = this.totalRecords;

        // Actualizar botones
        const btnFirst = this.paginationContainer.querySelector('.btn-first');
        const btnPrev = this.paginationContainer.querySelector('.btn-prev');
        const btnNext = this.paginationContainer.querySelector('.btn-next');
        const btnLast = this.paginationContainer.querySelector('.btn-last');

        btnFirst.disabled = this.currentPage <= 1;
        btnPrev.disabled = this.currentPage <= 1;
        btnNext.disabled = this.currentPage >= this.totalPages;
        btnLast.disabled = this.currentPage >= this.totalPages;

        // Actualizar números de página
        this.renderPageNumbers();

        // Actualizar input de ir a página
        const gotoInput = this.paginationContainer.querySelector('.goto-input');
        if (gotoInput) {
            gotoInput.value = this.currentPage;
            gotoInput.max = this.totalPages;
        }
    }

    renderPageNumbers() {
        const container = this.paginationContainer.querySelector('.page-numbers');
        if (!container) return;

        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(this.totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        // Primera página y ellipsis
        if (startPage > 1) {
            pages.push(`<button class="pagination-btn" data-page="1">1</button>`);
            if (startPage > 2) {
                pages.push(`<span class="ellipsis">...</span>`);
            }
        }

        // Páginas visibles
        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === this.currentPage ? 'active' : '';
            pages.push(`<button class="pagination-btn ${isActive}" data-page="${i}">${i}</button>`);
        }

        // Última página y ellipsis
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                pages.push(`<span class="ellipsis">...</span>`);
            }
            pages.push(`<button class="pagination-btn" data-page="${this.totalPages}">${this.totalPages}</button>`);
        }

        container.innerHTML = pages.join('');

        // Eventos para números de página
        container.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.dataset.page);
                this.goToPage(page);
            });
        });
    }

    showLoading(show) {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.toggle('show', show);
        }
    }

    // Método público para refrescar los datos
    refresh() {
        this.loadData();
    }

    // Método público para resetear la paginación
    reset() {
        this.currentPage = 1;
        this.searchValue = '';
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        this.loadData();
    }

    // Método para actualizar la configuración
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
    }
}

// Exportar para uso global
window.TablePagination = TablePagination;
