/**
 * TablePagination.js
 * Componente reutilizable de paginacion para tablas
 */

class TablePagination {
    constructor(options) {
        this.options = {
            container: null,
            tableBody: null,
            apiEndpoint: '',
            pageSize: 20,
            pageSizes: [20, 50, 75, 100],
            searchDelay: 400,
            rowRenderer: null,
            onDataLoaded: null,
            onError: null,
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
        this.container = document.querySelector(this.options.container);
        if (!this.container) return;

        this.createPaginationUI();
        this.bindEvents();
        this.loadData();
    }

    createPaginationUI() {
        // Buscar contenedor de tabla
        const tableContainer = this.container.querySelector('.scrollbar-TablePrimari') ||
                              this.container.querySelector('.container-table-app');

        if (!tableContainer) return;

        // Hacer posicion relativa para el loading
        tableContainer.style.position = 'relative';

        // Crear loading overlay
        const loading = document.createElement('div');
        loading.className = 'table-loading';
        loading.innerHTML = '<div class="spinner"></div>';
        tableContainer.appendChild(loading);
        this.loadingEl = loading;

        // Crear contenedor de paginacion
        const paginationWrapper = document.createElement('div');
        paginationWrapper.className = 'pagination-wrapper';
        paginationWrapper.innerHTML = `
            <div class="pagination-info">
                <span class="records-count">
                    Mostrando <span class="from">0</span> - <span class="to">0</span>
                    de <span class="total">0</span> registros
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
                <button class="pagination-btn btn-first" title="Primera" disabled>
                    <i class="fa fa-angle-double-left"></i>
                </button>
                <button class="pagination-btn btn-prev" title="Anterior" disabled>
                    <i class="fa fa-angle-left"></i>
                </button>
                <div class="page-numbers"></div>
                <button class="pagination-btn btn-next" title="Siguiente" disabled>
                    <i class="fa fa-angle-right"></i>
                </button>
                <button class="pagination-btn btn-last" title="Ultima" disabled>
                    <i class="fa fa-angle-double-right"></i>
                </button>
                <div class="goto-page">
                    <label>Ir a:</label>
                    <input type="number" class="goto-input" min="1" value="1">
                </div>
            </div>
        `;

        // Insertar despues del contenedor de tabla
        const parent = tableContainer.parentNode;
        parent.insertBefore(paginationWrapper, tableContainer.nextSibling);

        this.paginationWrapper = paginationWrapper;
    }

    bindEvents() {
        if (!this.paginationWrapper) return;

        // Selector de tamano
        const sizeSelect = this.paginationWrapper.querySelector('.page-size-select');
        sizeSelect?.addEventListener('change', (e) => {
            this.options.pageSize = parseInt(e.target.value);
            this.currentPage = 1;
            this.loadData();
        });

        // Botones de navegacion
        this.paginationWrapper.querySelector('.btn-first')?.addEventListener('click', () => this.goToPage(1));
        this.paginationWrapper.querySelector('.btn-prev')?.addEventListener('click', () => this.goToPage(this.currentPage - 1));
        this.paginationWrapper.querySelector('.btn-next')?.addEventListener('click', () => this.goToPage(this.currentPage + 1));
        this.paginationWrapper.querySelector('.btn-last')?.addEventListener('click', () => this.goToPage(this.totalPages));

        // Input ir a pagina
        const gotoInput = this.paginationWrapper.querySelector('.goto-input');
        gotoInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const page = parseInt(gotoInput.value);
                if (page >= 1 && page <= this.totalPages) {
                    this.goToPage(page);
                }
            }
        });

        // Busqueda - conectar con input existente
        const searchInput = this.container.querySelector('.textFilterMask');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this.searchValue = e.target.value.trim();
                    this.currentPage = 1;
                    this.loadData();
                }, this.options.searchDelay);
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    searchInput.value = '';
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
                searchValue: this.searchValue,
                pageNumber: this.currentPage,
                pageSize: this.options.pageSize
            });

            const url = `${this.options.apiEndpoint}?${params}`;
            console.log('Fetching URL:', url);
            const response = await fetch(url);

            if (!response.ok) throw new Error('Error al cargar datos');

            const result = await response.json();

            // Debug
            console.log('API Response:', result);

            this.currentPage = result.pageNumber || 1;
            this.totalPages = result.totalPages || 1;
            this.totalRecords = result.totalRecords || 0;

            this.renderRows(result.data || []);
            this.updateUI();
            this.scrollToTop();

            if (this.options.onDataLoaded) {
                this.options.onDataLoaded(result);
            }

        } catch (error) {
            console.error('Error:', error);
            if (this.options.onError) {
                this.options.onError(error);
            }
        } finally {
            this.isLoading = false;
            this.showLoading(false);
        }
    }

    renderRows(data) {
        const tbody = document.querySelector(this.options.tableBody);
        if (!tbody || !this.options.rowRenderer) return;

        if (data.length === 0) {
            tbody.innerHTML = `
                <tr class="row-app">
                    <td colspan="100" style="text-align:center; padding:30px; color:#888;">
                        <i class="fa fa-inbox" style="font-size:24px; display:block; margin-bottom:10px;"></i>
                        No se encontraron registros
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = data.map((item, idx) =>
            this.options.rowRenderer(item, idx + 1 + ((this.currentPage - 1) * this.options.pageSize))
        ).join('');

        this.reattachEvents();
    }

    reattachEvents() {
        // Re-vincular checkboxes
        const checkboxes = document.querySelectorAll(this.options.tableBody + ' .check-table-app');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', function() {
                const row = this.closest('.row-app');
                if (row) row.classList.toggle('selected', this.checked);
            });
        });
    }

    updateUI() {
        if (!this.paginationWrapper) return;

        const from = this.totalRecords === 0 ? 0 : ((this.currentPage - 1) * this.options.pageSize) + 1;
        const to = Math.min(this.currentPage * this.options.pageSize, this.totalRecords);

        this.paginationWrapper.querySelector('.from').textContent = from;
        this.paginationWrapper.querySelector('.to').textContent = to;
        this.paginationWrapper.querySelector('.total').textContent = this.totalRecords;

        // Botones
        const btnFirst = this.paginationWrapper.querySelector('.btn-first');
        const btnPrev = this.paginationWrapper.querySelector('.btn-prev');
        const btnNext = this.paginationWrapper.querySelector('.btn-next');
        const btnLast = this.paginationWrapper.querySelector('.btn-last');

        btnFirst.disabled = this.currentPage <= 1;
        btnPrev.disabled = this.currentPage <= 1;
        btnNext.disabled = this.currentPage >= this.totalPages;
        btnLast.disabled = this.currentPage >= this.totalPages;

        this.renderPageNumbers();

        const gotoInput = this.paginationWrapper.querySelector('.goto-input');
        if (gotoInput) {
            gotoInput.value = this.currentPage;
            gotoInput.max = this.totalPages;
        }
    }

    renderPageNumbers() {
        const container = this.paginationWrapper.querySelector('.page-numbers');
        if (!container) return;

        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        if (start > 1) {
            pages.push(`<button class="pagination-btn" data-page="1">1</button>`);
            if (start > 2) pages.push(`<span class="ellipsis">...</span>`);
        }

        for (let i = start; i <= end; i++) {
            pages.push(`<button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`);
        }

        if (end < this.totalPages) {
            if (end < this.totalPages - 1) pages.push(`<span class="ellipsis">...</span>`);
            pages.push(`<button class="pagination-btn" data-page="${this.totalPages}">${this.totalPages}</button>`);
        }

        container.innerHTML = pages.join('');

        container.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', () => this.goToPage(parseInt(btn.dataset.page)));
        });
    }

    showLoading(show) {
        if (this.loadingEl) {
            this.loadingEl.classList.toggle('active', show);
        }
    }

    scrollToTop() {
        const tableContainer = this.container?.querySelector('.scrollbar-TablePrimari') ||
                              this.container?.querySelector('.container-table-app');
        if (tableContainer) {
            tableContainer.scrollTop = 0;
        }
    }

    refresh() {
        this.loadData();
    }

    reset() {
        this.currentPage = 1;
        this.searchValue = '';
        const searchInput = this.container?.querySelector('.textFilterMask');
        if (searchInput) searchInput.value = '';
        this.loadData();
    }
}

window.TablePagination = TablePagination;
