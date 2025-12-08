/**
 * @file table-features.ts
 * @description Funcionalidades de tabla: filtro en todas las columnas y ordenamiento.
 * @author Equipo de Desarrollo
 * @date 2025
 */

/**
 * Inicializa el filtro que busca en todas las columnas de la tabla.
 * @param inputSelector Selector del input de búsqueda
 * @param tableSelector Selector de la tabla
 * @param tbodySelector Selector del tbody
 */
function initTableFilter(inputSelector: string, tableSelector: string, tbodySelector: string): void {
    // Buscar el input - puede ser un selector múltiple separado por comas
    let input: HTMLInputElement | null = null;
    const selectors = inputSelector.split(',').map(s => s.trim());

    for (const selector of selectors) {
        input = document.querySelector(selector) as HTMLInputElement;
        if (input) break;
    }

    if (!input) return;

    // Remover listener previo si existe (para evitar duplicados)
    const newInput = input.cloneNode(true) as HTMLInputElement;
    input.parentNode?.replaceChild(newInput, input);
    input = newInput;

    input.addEventListener('keyup', function () {
        const searchText = this.value.toLowerCase().trim();
        const rows = document.querySelectorAll(`${tbodySelector} tr.row-app`);

        rows.forEach((row) => {
            // Buscar en TODAS las celdas (excepto checkbox)
            const cells = row.querySelectorAll('td:not(.check-cell-app)');
            let found = false;

            // Si no hay texto de búsqueda, mostrar todas las filas
            if (searchText === '') {
                found = true;
            } else {
                cells.forEach((cell) => {
                    const cellText = (cell.textContent || '').toLowerCase();
                    if (cellText.includes(searchText)) {
                        found = true;
                    }
                });
            }

            (row as HTMLElement).style.display = found ? '' : 'none';
        });
    });

    // También ejecutar en el evento 'input' para mayor responsividad
    input.addEventListener('input', function () {
        const event = new Event('keyup');
        this.dispatchEvent(event);
    });
}

/**
 * Estado del ordenamiento por tabla
 */
const sortState: Map<string, { column: number; direction: 'asc' | 'desc' }> = new Map();

/**
 * Inicializa el ordenamiento de columnas al hacer clic en los headers.
 * @param tableSelector Selector de la tabla
 */
function initTableSort(tableSelector: string): void {
    const table = document.querySelector(tableSelector) as HTMLTableElement;
    if (!table) return;

    const headerRow = table.querySelector('thead tr');
    if (!headerRow) return;

    const headers = headerRow.querySelectorAll('td:not(.check-cell-app)');

    headers.forEach((header, index) => {
        const th = header as HTMLElement;

        // Agregar estilos de cursor y icono
        th.style.cursor = 'pointer';
        th.style.userSelect = 'none';
        th.style.position = 'relative';

        // Agregar icono de ordenamiento
        if (!th.querySelector('.sort-icon')) {
            const icon = document.createElement('i');
            icon.className = 'fa fa-sort sort-icon';
            icon.style.marginLeft = '5px';
            icon.style.opacity = '0.5';
            icon.style.fontSize = '12px';
            th.appendChild(icon);
        }

        th.addEventListener('click', () => {
            sortTable(tableSelector, index, th);
        });
    });
}

/**
 * Ordena la tabla por la columna especificada.
 */
function sortTable(tableSelector: string, columnIndex: number, headerCell: HTMLElement): void {
    const table = document.querySelector(tableSelector) as HTMLTableElement;
    if (!table) return;

    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    // Obtener estado actual
    const currentState = sortState.get(tableSelector);
    let direction: 'asc' | 'desc' = 'asc';

    if (currentState && currentState.column === columnIndex) {
        direction = currentState.direction === 'asc' ? 'desc' : 'asc';
    }

    // Guardar nuevo estado
    sortState.set(tableSelector, { column: columnIndex, direction });

    // Actualizar iconos de todos los headers
    const allHeaders = table.querySelectorAll('thead td:not(.check-cell-app)');
    allHeaders.forEach((h) => {
        const icon = h.querySelector('.sort-icon') as HTMLElement;
        if (icon) {
            icon.className = 'fa fa-sort sort-icon';
            icon.style.opacity = '0.5';
        }
    });

    // Actualizar icono del header actual
    const currentIcon = headerCell.querySelector('.sort-icon') as HTMLElement;
    if (currentIcon) {
        currentIcon.className = direction === 'asc' ? 'fa fa-sort-asc sort-icon' : 'fa fa-sort-desc sort-icon';
        currentIcon.style.opacity = '1';
    }

    // Obtener filas y ordenar
    const rows = Array.from(tbody.querySelectorAll('tr.row-app'));

    rows.sort((a, b) => {
        // +1 porque la primera celda es el checkbox
        const cellA = a.querySelectorAll('td')[columnIndex + 1];
        const cellB = b.querySelectorAll('td')[columnIndex + 1];

        if (!cellA || !cellB) return 0;

        let valueA = (cellA.textContent || '').trim();
        let valueB = (cellB.textContent || '').trim();

        // Intentar comparar como números
        const numA = parseFloat(valueA.replace(/[^0-9.-]/g, ''));
        const numB = parseFloat(valueB.replace(/[^0-9.-]/g, ''));

        if (!isNaN(numA) && !isNaN(numB)) {
            return direction === 'asc' ? numA - numB : numB - numA;
        }

        // Intentar comparar como fechas (formato dd/mm/yyyy o similar)
        const dateA = parseDate(valueA);
        const dateB = parseDate(valueB);

        if (dateA && dateB) {
            return direction === 'asc'
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime();
        }

        // Comparar como texto
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();

        if (direction === 'asc') {
            return valueA.localeCompare(valueB, 'es');
        } else {
            return valueB.localeCompare(valueA, 'es');
        }
    });

    // Reinsertar filas ordenadas
    rows.forEach((row) => tbody.appendChild(row));
}

/**
 * Intenta parsear una fecha en varios formatos comunes.
 */
function parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;

    // Formato dd/mm/yyyy
    const parts1 = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (parts1) {
        return new Date(parseInt(parts1[3]), parseInt(parts1[2]) - 1, parseInt(parts1[1]));
    }

    // Formato mm/dd/yyyy
    const parts2 = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (parts2) {
        const date = new Date(parseInt(parts2[3]), parseInt(parts2[1]) - 1, parseInt(parts2[2]));
        if (!isNaN(date.getTime())) return date;
    }

    // Formato yyyy-mm-dd
    const parts3 = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (parts3) {
        return new Date(parseInt(parts3[1]), parseInt(parts3[2]) - 1, parseInt(parts3[3]));
    }

    return null;
}

/**
 * Inicializa todas las funcionalidades de tabla.
 * @param config Configuración de la tabla o selector de la tabla
 */
function initTableFeatures(config: string | {
    filterInput: string;
    table: string;
    tbody: string;
}): void {
    // Si es un string, crear configuración automática
    let tableSelector: string;
    let filterInputSelector: string;
    let tbodySelector: string;

    if (typeof config === 'string') {
        tableSelector = config;
        // Buscar el input de filtro más común (ViewFilter.cshtml usa .textFilterMask)
        filterInputSelector = '.textFilterMask, .form-control-text-filtre, .form-control-filtro, .form-control-FiltroDepartment, input[placeholder*="Buscar"], input[placeholder*="columnas"]';
        tbodySelector = `${config} tbody`;
    } else {
        tableSelector = config.table;
        filterInputSelector = config.filterInput;
        tbodySelector = config.tbody;
    }

    const doInit = () => {
        initTableFilter(filterInputSelector, tableSelector, tbodySelector);
        initTableSort(tableSelector);
    };

    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', doInit);
    } else {
        doInit();
    }
}

// Exportar al ámbito global
(window as any).initTableFeatures = initTableFeatures;
(window as any).initTableFilter = initTableFilter;
(window as any).initTableSort = initTableSort;
