/**
 * @file grid-columns-manager.ts
 * @description Gestión de columnas de grid/tabla. Permite mostrar/ocultar,
 *              reordenar y configurar el ancho de las columnas.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module GridViews
 */
/**
 * Clase para gestionar las columnas de un grid/tabla.
 * Permite configurar visibilidad, orden y ancho de columnas.
 */
class GridColumnsManager {
    /**
     * Constructor del gestor de columnas.
     * @param allColumns Array con todos los nombres de columnas disponibles.
     * @param defaultVisible Array con las columnas visibles por defecto.
     * @param onChangeCallback Callback ejecutado cuando cambian las columnas.
     * @param titleize Función para convertir nombre de campo a título legible.
     */
    constructor(allColumns, defaultVisible, onChangeCallback, titleize) {
        this.allColumns = allColumns;
        this.visibleColumns = [...defaultVisible];
        this.columnConfigs = new Map();
        this.onChangeCallback = onChangeCallback || null;
        this.modalId = 'modal-manage-columns';
        this.titleize = titleize || this.defaultTitleize;
        // Inicializar configuración de columnas
        this.initializeColumnConfigs(defaultVisible);
    }
    /**
     * Función por defecto para convertir nombres de campo a títulos.
     * @param field Nombre del campo.
     * @returns Título formateado.
     */
    defaultTitleize(field) {
        return field
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/_/g, ' ')
            .replace(/^./, (c) => c.toUpperCase());
    }
    /**
     * Inicializa la configuración de columnas.
     * @param defaultVisible Columnas visibles por defecto.
     */
    initializeColumnConfigs(defaultVisible) {
        let order = 0;
        // Primero las columnas visibles (en orden)
        defaultVisible.forEach((col) => {
            this.columnConfigs.set(col, {
                field: col,
                visible: true,
                order: order++
            });
        });
        // Luego las columnas ocultas
        this.allColumns.forEach((col) => {
            if (!this.columnConfigs.has(col)) {
                this.columnConfigs.set(col, {
                    field: col,
                    visible: false,
                    order: order++
                });
            }
        });
    }
    /**
     * Muestra el modal para gestionar columnas.
     */
    showColumnsModal() {
        const modal = document.getElementById(this.modalId);
        if (!modal) {
            this.createModal();
        }
        else {
            // Si el modal ya existe, asegurar que los estilos estén aplicados
            this.addStyles();
        }
        this.renderColumnsList();
        $(`#${this.modalId}`).modal('show');
    }
    /**
     * Crea el modal HTML para gestionar columnas (solo si no existe en el HTML).
     */
    createModal() {
        // Si el modal ya existe en el HTML, no crear uno nuevo
        if (document.getElementById(this.modalId)) {
            this.addStyles();
            return;
        }
        const modalHtml = `
            <div class="modal fade" id="${this.modalId}" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-columns" role="document">
                    <div class="modal-content">
                        <div class="HeaderModal" style="display:flex; justify-content:space-between; align-items:center;">
                            <h4 class="TituloModal">
                                <i class="fa fa-columns" style="font-size:18px; margin-right:8px;"></i> Gestionar Columnas
                            </h4>
                            <button type="button" class="close" data-dismiss="modal" style="color:white; opacity:1; font-size:24px; margin:0; padding:0 5px;">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="padding:15px;">
                            <p class="text-muted" style="font-size:14px; margin-bottom:15px;">
                                Arrastra para reordenar. Marca/desmarca para mostrar/ocultar.
                            </p>
                            <div id="columns-list" class="columns-list-container">
                            </div>
                        </div>
                        <div class="modalfooter" style="padding:10px 15px;">
                            <button type="button" class="btn btn-default" data-dismiss="modal">
                                Cancelar
                            </button>
                            <button type="button" class="btn btn-primary" id="btn-apply-columns">
                                <i class="fa fa-check"></i> Aplicar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        this.addStyles();
    }
    /**
     * Añade los estilos CSS para el gestor de columnas.
     */
    addStyles() {
        if (document.getElementById('grid-columns-styles'))
            return;
        const styles = `
            <style id="grid-columns-styles">
                /* Modal de columnas - tamaño adecuado */
                .modal-dialog-columns {
                    width: 450px;
                    max-width: 90%;
                    margin: 60px auto;
                }

                /* Contenedor de lista de columnas - con scroll para muchas columnas */
                .columns-list-container {
                    max-height: 400px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 10px;
                    background: #fafafa;
                }

                /* Cada item de columna */
                .column-item {
                    display: flex;
                    align-items: center;
                    padding: 12px 15px;
                    margin: 6px 0;
                    background: #ffffff;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    cursor: grab;
                    transition: background 0.2s, box-shadow 0.2s;
                }

                .column-item:hover {
                    background: #e8f4fc;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .column-item.dragging {
                    opacity: 0.5;
                    cursor: grabbing;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }

                /* Icono de arrastre */
                .column-item .drag-handle {
                    margin-right: 12px;
                    color: #666;
                    font-size: 18px;
                }

                .column-item .drag-handle i {
                    font-size: 18px;
                }

                /* Label de columna */
                .column-item label {
                    margin: 0;
                    flex-grow: 1;
                    cursor: pointer;
                    font-size: 15px;
                    font-weight: 400;
                    color: #333;
                }

                /* Checkbox de columna */
                .column-item input[type="checkbox"] {
                    margin-right: 10px;
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                }

                /* Estilos para modal existente en HTML */
                #modal-manage-columns .modal-dialog {
                    width: 450px;
                    max-width: 90%;
                    margin: 60px auto;
                }

                #modal-manage-columns .modal-header {
                    background: #337ab7;
                    padding: 10px 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-direction: row-reverse;
                }

                #modal-manage-columns .modal-header .close {
                    color: white;
                    opacity: 1;
                    font-size: 24px;
                    margin: 0;
                    padding: 0;
                    order: 1;
                }

                #modal-manage-columns .modal-header .modal-title {
                    color: white;
                    font-size: 18px;
                    font-weight: 400;
                    margin: 0;
                    order: 2;
                }

                #modal-manage-columns .modal-body {
                    padding: 15px;
                }

                #modal-manage-columns .modal-body > p {
                    font-size: 14px;
                    margin-bottom: 15px;
                }

                /* Estilos para modal de guardar vista */
                #modal-save-view .modal-dialog {
                    width: 400px;
                    max-width: 90%;
                    margin: 60px auto;
                }

                #modal-save-view .modal-header {
                    background: #337ab7;
                    padding: 10px 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-direction: row-reverse;
                }

                #modal-save-view .modal-header .close {
                    color: white;
                    opacity: 1;
                    font-size: 24px;
                    margin: 0;
                    padding: 0;
                    order: 1;
                }

                #modal-save-view .modal-header .modal-title {
                    color: white;
                    font-size: 18px;
                    font-weight: 400;
                    margin: 0;
                    order: 2;
                }

                #modal-save-view .modal-body {
                    padding: 15px;
                }

                #modal-save-view .modal-body .form-group label {
                    font-size: 14px;
                    font-weight: 500;
                    margin-bottom: 5px;
                }

                #modal-save-view .modal-body .form-control {
                    font-size: 14px;
                }

                #modal-save-view .modal-body .checkbox label {
                    font-size: 14px;
                }

                #modal-save-view .modal-footer {
                    padding: 10px 15px;
                    border-top: 1px solid #e5e5e5;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    /**
     * Renderiza la lista de columnas en el modal.
     */
    renderColumnsList() {
        const container = document.getElementById('columns-list');
        if (!container)
            return;
        // Ordenar columnas por su orden actual
        const sortedConfigs = Array.from(this.columnConfigs.values())
            .sort((a, b) => a.order - b.order);
        let html = '';
        sortedConfigs.forEach((config) => {
            html += `
                <div class="column-item" data-field="${config.field}" draggable="true">
                    <span class="drag-handle">
                        <i class="fa fa-bars"></i>
                    </span>
                    <input type="checkbox"
                           id="col-${config.field}"
                           ${config.visible ? 'checked' : ''}>
                    <label for="col-${config.field}">
                        ${this.titleize(config.field)}
                    </label>
                </div>
            `;
        });
        container.innerHTML = html;
        this.setupDragAndDrop(container);
    }
    /**
     * Configura el drag & drop para reordenar columnas.
     * @param container Contenedor de la lista de columnas.
     */
    setupDragAndDrop(container) {
        const items = container.querySelectorAll('.column-item');
        let draggedItem = null;
        items.forEach((item) => {
            const element = item;
            element.addEventListener('dragstart', (e) => {
                var _a;
                draggedItem = element;
                element.classList.add('dragging');
                (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/plain', '');
            });
            element.addEventListener('dragend', () => {
                element.classList.remove('dragging');
                draggedItem = null;
            });
            element.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (!draggedItem || draggedItem === element)
                    return;
                const rect = element.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                if (e.clientY < midY) {
                    container.insertBefore(draggedItem, element);
                }
                else {
                    container.insertBefore(draggedItem, element.nextSibling);
                }
            });
        });
    }
    /**
     * Aplica los cambios de columnas y devuelve la nueva configuración.
     * @returns Array de configuración de columnas.
     */
    applyColumns() {
        const container = document.getElementById('columns-list');
        if (!container)
            return [];
        const items = container.querySelectorAll('.column-item');
        const newConfigs = [];
        const newVisible = [];
        items.forEach((item, index) => {
            const element = item;
            const field = element.dataset.field || '';
            const checkbox = element.querySelector('input[type="checkbox"]');
            const isVisible = (checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked) || false;
            const config = {
                field,
                visible: isVisible,
                order: index
            };
            newConfigs.push(config);
            this.columnConfigs.set(field, config);
            if (isVisible) {
                newVisible.push(field);
            }
        });
        this.visibleColumns = newVisible;
        if (this.onChangeCallback) {
            this.onChangeCallback(newVisible);
        }
        return newConfigs;
    }
    /**
     * Obtiene la configuración actual de columnas.
     * @returns Array de configuración de columnas.
     */
    getCurrentColumnConfig() {
        return Array.from(this.columnConfigs.values())
            .sort((a, b) => a.order - b.order);
    }
    /**
     * Aplica una configuración de columnas externa.
     * @param configs Array de configuración de columnas.
     */
    applyColumnConfig(configs) {
        this.columnConfigs.clear();
        const newVisible = [];
        configs.forEach((config) => {
            this.columnConfigs.set(config.field, config);
            if (config.visible) {
                newVisible.push(config.field);
            }
        });
        // Añadir columnas que existen pero no estaban en la configuración guardada
        this.allColumns.forEach((col) => {
            if (!this.columnConfigs.has(col)) {
                this.columnConfigs.set(col, {
                    field: col,
                    visible: false,
                    order: this.columnConfigs.size
                });
            }
        });
        this.visibleColumns = configs
            .filter(c => c.visible)
            .sort((a, b) => a.order - b.order)
            .map(c => c.field);
    }
    /**
     * Restablece las columnas a los valores por defecto.
     * @param defaultColumns Array de columnas por defecto.
     */
    resetToDefault(defaultColumns) {
        this.columnConfigs.clear();
        this.initializeColumnConfigs(defaultColumns);
        this.visibleColumns = [...defaultColumns];
    }
    /**
     * Obtiene las columnas visibles actualmente.
     * @returns Array de nombres de columnas visibles.
     */
    getVisibleColumns() {
        return [...this.visibleColumns];
    }
}
// Exportar al ámbito global
window.GridColumnsManager = GridColumnsManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1jb2x1bW5zLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UeXBlU2NyaXB0RmlsZS9ncmlkLWNvbHVtbnMtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBWUg7OztHQUdHO0FBQ0gsTUFBTSxrQkFBa0I7SUFRcEI7Ozs7OztPQU1HO0lBQ0gsWUFDSSxVQUFvQixFQUNwQixjQUF3QixFQUN4QixnQkFBOEMsRUFDOUMsUUFBb0M7UUFFcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsSUFBSSxJQUFJLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDO1FBRWpELHdDQUF3QztRQUN4QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxlQUFlLENBQUMsS0FBYTtRQUNqQyxPQUFPLEtBQUs7YUFDUCxPQUFPLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDO2FBQ25DLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO2FBQ2xCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7O09BR0c7SUFDSyx1QkFBdUIsQ0FBQyxjQUF3QjtRQUNwRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFZCwyQ0FBMkM7UUFDM0Ms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LElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxpQkFBaUI7UUFDYixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUNKO0FBRUQsNEJBQTRCO0FBQzNCLE1BQWMsQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZSBncmlkLWNvbHVtbnMtbWFuYWdlci50c1xyXG4gKiBAZGVzY3JpcHRpb24gR2VzdGnDs24gZGUgY29sdW1uYXMgZGUgZ3JpZC90YWJsYS4gUGVybWl0ZSBtb3N0cmFyL29jdWx0YXIsXHJcbiAqICAgICAgICAgICAgICByZW9yZGVuYXIgeSBjb25maWd1cmFyIGVsIGFuY2hvIGRlIGxhcyBjb2x1bW5hcy5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgR3JpZFZpZXdzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYWNpw7NuIGRlIHVuYSBjb2x1bW5hIGluZGl2aWR1YWwuXHJcbiAqL1xyXG5pbnRlcmZhY2UgQ29sdW1uQ29uZmlnIHtcclxuICAgIGZpZWxkOiBzdHJpbmc7XHJcbiAgICB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgb3JkZXI6IG51bWJlcjtcclxuICAgIHdpZHRoPzogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogQ2xhc2UgcGFyYSBnZXN0aW9uYXIgbGFzIGNvbHVtbmFzIGRlIHVuIGdyaWQvdGFibGEuXHJcbiAqIFBlcm1pdGUgY29uZmlndXJhciB2aXNpYmlsaWRhZCwgb3JkZW4geSBhbmNobyBkZSBjb2x1bW5hcy5cclxuICovXHJcbmNsYXNzIEdyaWRDb2x1bW5zTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGFsbENvbHVtbnM6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSB2aXNpYmxlQ29sdW1uczogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIGNvbHVtbkNvbmZpZ3M6IE1hcDxzdHJpbmcsIENvbHVtbkNvbmZpZz47XHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6ICgoY29sdW1uczogc3RyaW5nW10pID0+IHZvaWQpIHwgbnVsbDtcclxuICAgIHByaXZhdGUgbW9kYWxJZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB0aXRsZWl6ZTogKGZpZWxkOiBzdHJpbmcpID0+IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yIGRlbCBnZXN0b3IgZGUgY29sdW1uYXMuXHJcbiAgICAgKiBAcGFyYW0gYWxsQ29sdW1ucyBBcnJheSBjb24gdG9kb3MgbG9zIG5vbWJyZXMgZGUgY29sdW1uYXMgZGlzcG9uaWJsZXMuXHJcbiAgICAgKiBAcGFyYW0gZGVmYXVsdFZpc2libGUgQXJyYXkgY29uIGxhcyBjb2x1bW5hcyB2aXNpYmxlcyBwb3IgZGVmZWN0by5cclxuICAgICAqIEBwYXJhbSBvbkNoYW5nZUNhbGxiYWNrIENhbGxiYWNrIGVqZWN1dGFkbyBjdWFuZG8gY2FtYmlhbiBsYXMgY29sdW1uYXMuXHJcbiAgICAgKiBAcGFyYW0gdGl0bGVpemUgRnVuY2nDs24gcGFyYSBjb252ZXJ0aXIgbm9tYnJlIGRlIGNhbXBvIGEgdMOtdHVsbyBsZWdpYmxlLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBhbGxDb2x1bW5zOiBzdHJpbmdbXSxcclxuICAgICAgICBkZWZhdWx0VmlzaWJsZTogc3RyaW5nW10sXHJcbiAgICAgICAgb25DaGFuZ2VDYWxsYmFjaz86IChjb2x1bW5zOiBzdHJpbmdbXSkgPT4gdm9pZCxcclxuICAgICAgICB0aXRsZWl6ZT86IChmaWVsZDogc3RyaW5nKSA9PiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuYWxsQ29sdW1ucyA9IGFsbENvbHVtbnM7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlQ29sdW1ucyA9IFsuLi5kZWZhdWx0VmlzaWJsZV07XHJcbiAgICAgICAgdGhpcy5jb2x1bW5Db25maWdzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IG9uQ2hhbmdlQ2FsbGJhY2sgfHwgbnVsbDtcclxuICAgICAgICB0aGlzLm1vZGFsSWQgPSAnbW9kYWwtbWFuYWdlLWNvbHVtbnMnO1xyXG4gICAgICAgIHRoaXMudGl0bGVpemUgPSB0aXRsZWl6ZSB8fCB0aGlzLmRlZmF1bHRUaXRsZWl6ZTtcclxuXHJcbiAgICAgICAgLy8gSW5pY2lhbGl6YXIgY29uZmlndXJhY2nDs24gZGUgY29sdW1uYXNcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVDb2x1bW5Db25maWdzKGRlZmF1bHRWaXNpYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmNpw7NuIHBvciBkZWZlY3RvIHBhcmEgY29udmVydGlyIG5vbWJyZXMgZGUgY2FtcG8gYSB0w610dWxvcy5cclxuICAgICAqIEBwYXJhbSBmaWVsZCBOb21icmUgZGVsIGNhbXBvLlxyXG4gICAgICogQHJldHVybnMgVMOtdHVsbyBmb3JtYXRlYWRvLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlZmF1bHRUaXRsZWl6ZShmaWVsZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gZmllbGRcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMSAkMicpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csICcgJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL14uLywgKGMpID0+IGMudG9VcHBlckNhc2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmljaWFsaXphIGxhIGNvbmZpZ3VyYWNpw7NuIGRlIGNvbHVtbmFzLlxyXG4gICAgICogQHBhcmFtIGRlZmF1bHRWaXNpYmxlIENvbHVtbmFzIHZpc2libGVzIHBvciBkZWZlY3RvLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVDb2x1bW5Db25maWdzKGRlZmF1bHRWaXNpYmxlOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBvcmRlciA9IDA7XHJcblxyXG4gICAgICAgIC8vIFByaW1lcm8gbGFzIGNvbHVtbmFzIHZpc2libGVzIChlbiBvcmRlbilcclxuICAgICAgICBkZWZhdWx0VmlzaWJsZS5mb3JFYWNoKChjb2wpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb2x1bW5Db25maWdzLnNldChjb2wsIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBjb2wsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgb3JkZXI6IG9yZGVyKytcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEx1ZWdvIGxhcyBjb2x1bW5hcyBvY3VsdGFzXHJcbiAgICAgICAgdGhpcy5hbGxDb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29sdW1uQ29uZmlncy5oYXMoY29sKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5Db25maWdzLnNldChjb2wsIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogY29sLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyOiBvcmRlcisrXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXVlc3RyYSBlbCBtb2RhbCBwYXJhIGdlc3Rpb25hciBjb2x1bW5hcy5cclxuICAgICAqL1xyXG4gICAgc2hvd0NvbHVtbnNNb2RhbCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMubW9kYWxJZCk7XHJcbiAgICAgICAgaWYgKCFtb2RhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vZGFsKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gU2kgZWwgbW9kYWwgeWEgZXhpc3RlLCBhc2VndXJhciBxdWUgbG9zIGVzdGlsb3MgZXN0w6luIGFwbGljYWRvc1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN0eWxlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlckNvbHVtbnNMaXN0KCk7XHJcbiAgICAgICAgKCQoYCMke3RoaXMubW9kYWxJZH1gKSBhcyBhbnkpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhIGVsIG1vZGFsIEhUTUwgcGFyYSBnZXN0aW9uYXIgY29sdW1uYXMgKHNvbG8gc2kgbm8gZXhpc3RlIGVuIGVsIEhUTUwpLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZU1vZGFsKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIFNpIGVsIG1vZGFsIHlhIGV4aXN0ZSBlbiBlbCBIVE1MLCBubyBjcmVhciB1bm8gbnVldm9cclxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5tb2RhbElkKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN0eWxlcygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtb2RhbEh0bWwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbCBmYWRlXCIgaWQ9XCIke3RoaXMubW9kYWxJZH1cIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1kaWFsb2ctY29sdW1uc1wiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJIZWFkZXJNb2RhbFwiIHN0eWxlPVwiZGlzcGxheTpmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjsgYWxpZ24taXRlbXM6Y2VudGVyO1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiVGl0dWxvTW9kYWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNvbHVtbnNcIiBzdHlsZT1cImZvbnQtc2l6ZToxOHB4OyBtYXJnaW4tcmlnaHQ6OHB4O1wiPjwvaT4gR2VzdGlvbmFyIENvbHVtbmFzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgc3R5bGU9XCJjb2xvcjp3aGl0ZTsgb3BhY2l0eToxOyBmb250LXNpemU6MjRweDsgbWFyZ2luOjA7IHBhZGRpbmc6MCA1cHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JnRpbWVzOzwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIiBzdHlsZT1cInBhZGRpbmc6MTVweDtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGV4dC1tdXRlZFwiIHN0eWxlPVwiZm9udC1zaXplOjE0cHg7IG1hcmdpbi1ib3R0b206MTVweDtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJhc3RyYSBwYXJhIHJlb3JkZW5hci4gTWFyY2EvZGVzbWFyY2EgcGFyYSBtb3N0cmFyL29jdWx0YXIuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29sdW1ucy1saXN0XCIgY2xhc3M9XCJjb2x1bW5zLWxpc3QtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbGZvb3RlclwiIHN0eWxlPVwicGFkZGluZzoxMHB4IDE1cHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FuY2VsYXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBpZD1cImJ0bi1hcHBseS1jb2x1bW5zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGVja1wiPjwvaT4gQXBsaWNhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIG1vZGFsSHRtbCk7XHJcbiAgICAgICAgdGhpcy5hZGRTdHlsZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEHDsWFkZSBsb3MgZXN0aWxvcyBDU1MgcGFyYSBlbCBnZXN0b3IgZGUgY29sdW1uYXMuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkU3R5bGVzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZC1jb2x1bW5zLXN0eWxlcycpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IGBcclxuICAgICAgICAgICAgPHN0eWxlIGlkPVwiZ3JpZC1jb2x1bW5zLXN0eWxlc1wiPlxyXG4gICAgICAgICAgICAgICAgLyogTW9kYWwgZGUgY29sdW1uYXMgLSB0YW1hw7FvIGFkZWN1YWRvICovXHJcbiAgICAgICAgICAgICAgICAubW9kYWwtZGlhbG9nLWNvbHVtbnMge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0NTBweDtcclxuICAgICAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDkwJTtcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDYwcHggYXV0bztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvKiBDb250ZW5lZG9yIGRlIGxpc3RhIGRlIGNvbHVtbmFzIC0gY29uIHNjcm9sbCBwYXJhIG11Y2hhcyBjb2x1bW5hcyAqL1xyXG4gICAgICAgICAgICAgICAgLmNvbHVtbnMtbGlzdC1jb250YWluZXIge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heC1oZWlnaHQ6IDQwMHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8qIENhZGEgaXRlbSBkZSBjb2x1bW5hICovXHJcbiAgICAgICAgICAgICAgICAuY29sdW1uLWl0ZW0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMnB4IDE1cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiA2cHggMDtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogZ3JhYjtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnMsIGJveC1zaGFkb3cgMC4ycztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAuY29sdW1uLWl0ZW06aG92ZXIge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNlOGY0ZmM7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAuY29sdW1uLWl0ZW0uZHJhZ2dpbmcge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IGdyYWJiaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDhweCByZ2JhKDAsMCwwLDAuMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLyogSWNvbm8gZGUgYXJyYXN0cmUgKi9cclxuICAgICAgICAgICAgICAgIC5jb2x1bW4taXRlbSAuZHJhZy1oYW5kbGUge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTJweDtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzY2NjtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLmNvbHVtbi1pdGVtIC5kcmFnLWhhbmRsZSBpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLyogTGFiZWwgZGUgY29sdW1uYSAqL1xyXG4gICAgICAgICAgICAgICAgLmNvbHVtbi1pdGVtIGxhYmVsIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzMzMztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvKiBDaGVja2JveCBkZSBjb2x1bW5hICovXHJcbiAgICAgICAgICAgICAgICAuY29sdW1uLWl0ZW0gaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxOHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvKiBFc3RpbG9zIHBhcmEgbW9kYWwgZXhpc3RlbnRlIGVuIEhUTUwgKi9cclxuICAgICAgICAgICAgICAgICNtb2RhbC1tYW5hZ2UtY29sdW1ucyAubW9kYWwtZGlhbG9nIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDUwcHg7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4LXdpZHRoOiA5MCU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiA2MHB4IGF1dG87XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgI21vZGFsLW1hbmFnZS1jb2x1bW5zIC5tb2RhbC1oZWFkZXIge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICMzMzdhYjc7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTBweCAxNXB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICNtb2RhbC1tYW5hZ2UtY29sdW1ucyAubW9kYWwtaGVhZGVyIC5jbG9zZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyOiAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICNtb2RhbC1tYW5hZ2UtY29sdW1ucyAubW9kYWwtaGVhZGVyIC5tb2RhbC10aXRsZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICAgICAgICAgICAgICBvcmRlcjogMjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAjbW9kYWwtbWFuYWdlLWNvbHVtbnMgLm1vZGFsLWJvZHkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgI21vZGFsLW1hbmFnZS1jb2x1bW5zIC5tb2RhbC1ib2R5ID4gcCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLyogRXN0aWxvcyBwYXJhIG1vZGFsIGRlIGd1YXJkYXIgdmlzdGEgKi9cclxuICAgICAgICAgICAgICAgICNtb2RhbC1zYXZlLXZpZXcgLm1vZGFsLWRpYWxvZyB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwMHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIG1heC13aWR0aDogOTAlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogNjBweCBhdXRvO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICNtb2RhbC1zYXZlLXZpZXcgLm1vZGFsLWhlYWRlciB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogIzMzN2FiNztcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgI21vZGFsLXNhdmUtdmlldyAubW9kYWwtaGVhZGVyIC5jbG9zZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyOiAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICNtb2RhbC1zYXZlLXZpZXcgLm1vZGFsLWhlYWRlciAubW9kYWwtdGl0bGUge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXI6IDI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgI21vZGFsLXNhdmUtdmlldyAubW9kYWwtYm9keSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTVweDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAjbW9kYWwtc2F2ZS12aWV3IC5tb2RhbC1ib2R5IC5mb3JtLWdyb3VwIGxhYmVsIHtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgI21vZGFsLXNhdmUtdmlldyAubW9kYWwtYm9keSAuZm9ybS1jb250cm9sIHtcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgI21vZGFsLXNhdmUtdmlldyAubW9kYWwtYm9keSAuY2hlY2tib3ggbGFiZWwge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAjbW9kYWwtc2F2ZS12aWV3IC5tb2RhbC1mb290ZXIge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMTVweDtcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2U1ZTVlNTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9zdHlsZT5cclxuICAgICAgICBgO1xyXG4gICAgICAgIGRvY3VtZW50LmhlYWQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBzdHlsZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyaXphIGxhIGxpc3RhIGRlIGNvbHVtbmFzIGVuIGVsIG1vZGFsLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlckNvbHVtbnNMaXN0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2x1bW5zLWxpc3QnKTtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBPcmRlbmFyIGNvbHVtbmFzIHBvciBzdSBvcmRlbiBhY3R1YWxcclxuICAgICAgICBjb25zdCBzb3J0ZWRDb25maWdzID0gQXJyYXkuZnJvbSh0aGlzLmNvbHVtbkNvbmZpZ3MudmFsdWVzKCkpXHJcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLm9yZGVyIC0gYi5vcmRlcik7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gJyc7XHJcbiAgICAgICAgc29ydGVkQ29uZmlncy5mb3JFYWNoKChjb25maWcpID0+IHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uLWl0ZW1cIiBkYXRhLWZpZWxkPVwiJHtjb25maWcuZmllbGR9XCIgZHJhZ2dhYmxlPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZHJhZy1oYW5kbGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1iYXJzXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJjb2wtJHtjb25maWcuZmllbGR9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtjb25maWcudmlzaWJsZSA/ICdjaGVja2VkJyA6ICcnfT5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY29sLSR7Y29uZmlnLmZpZWxkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3RoaXMudGl0bGVpemUoY29uZmlnLmZpZWxkKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICAgIHRoaXMuc2V0dXBEcmFnQW5kRHJvcChjb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJhIGVsIGRyYWcgJiBkcm9wIHBhcmEgcmVvcmRlbmFyIGNvbHVtbmFzLlxyXG4gICAgICogQHBhcmFtIGNvbnRhaW5lciBDb250ZW5lZG9yIGRlIGxhIGxpc3RhIGRlIGNvbHVtbmFzLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldHVwRHJhZ0FuZERyb3AoY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb2x1bW4taXRlbScpO1xyXG4gICAgICAgIGxldCBkcmFnZ2VkSXRlbTogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gaXRlbSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGRyYWdnZWRJdGVtID0gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgICAgIChlIGFzIERyYWdFdmVudCkuZGF0YVRyYW5zZmVyPy5zZXREYXRhKCd0ZXh0L3BsYWluJywgJycpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgICAgIGRyYWdnZWRJdGVtID0gbnVsbDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGlmICghZHJhZ2dlZEl0ZW0gfHwgZHJhZ2dlZEl0ZW0gPT09IGVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pZFkgPSByZWN0LnRvcCArIHJlY3QuaGVpZ2h0IC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKGUgYXMgRHJhZ0V2ZW50KS5jbGllbnRZIDwgbWlkWSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoZHJhZ2dlZEl0ZW0sIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5zZXJ0QmVmb3JlKGRyYWdnZWRJdGVtLCBlbGVtZW50Lm5leHRTaWJsaW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcGxpY2EgbG9zIGNhbWJpb3MgZGUgY29sdW1uYXMgeSBkZXZ1ZWx2ZSBsYSBudWV2YSBjb25maWd1cmFjacOzbi5cclxuICAgICAqIEByZXR1cm5zIEFycmF5IGRlIGNvbmZpZ3VyYWNpw7NuIGRlIGNvbHVtbmFzLlxyXG4gICAgICovXHJcbiAgICBhcHBseUNvbHVtbnMoKTogQ29sdW1uQ29uZmlnW10ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2x1bW5zLWxpc3QnKTtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICBjb25zdCBpdGVtcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuY29sdW1uLWl0ZW0nKTtcclxuICAgICAgICBjb25zdCBuZXdDb25maWdzOiBDb2x1bW5Db25maWdbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IG5ld1Zpc2libGU6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBpdGVtIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZCA9IGVsZW1lbnQuZGF0YXNldC5maWVsZCB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tib3ggPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzVmlzaWJsZSA9IGNoZWNrYm94Py5jaGVja2VkIHx8IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29uZmlnOiBDb2x1bW5Db25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZCxcclxuICAgICAgICAgICAgICAgIHZpc2libGU6IGlzVmlzaWJsZSxcclxuICAgICAgICAgICAgICAgIG9yZGVyOiBpbmRleFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbmV3Q29uZmlncy5wdXNoKGNvbmZpZyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29sdW1uQ29uZmlncy5zZXQoZmllbGQsIGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdWaXNpYmxlLnB1c2goZmllbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmlzaWJsZUNvbHVtbnMgPSBuZXdWaXNpYmxlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vbkNoYW5nZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayhuZXdWaXNpYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdDb25maWdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0aWVuZSBsYSBjb25maWd1cmFjacOzbiBhY3R1YWwgZGUgY29sdW1uYXMuXHJcbiAgICAgKiBAcmV0dXJucyBBcnJheSBkZSBjb25maWd1cmFjacOzbiBkZSBjb2x1bW5hcy5cclxuICAgICAqL1xyXG4gICAgZ2V0Q3VycmVudENvbHVtbkNvbmZpZygpOiBDb2x1bW5Db25maWdbXSB7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5jb2x1bW5Db25maWdzLnZhbHVlcygpKVxyXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5vcmRlciAtIGIub3JkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBsaWNhIHVuYSBjb25maWd1cmFjacOzbiBkZSBjb2x1bW5hcyBleHRlcm5hLlxyXG4gICAgICogQHBhcmFtIGNvbmZpZ3MgQXJyYXkgZGUgY29uZmlndXJhY2nDs24gZGUgY29sdW1uYXMuXHJcbiAgICAgKi9cclxuICAgIGFwcGx5Q29sdW1uQ29uZmlnKGNvbmZpZ3M6IENvbHVtbkNvbmZpZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5Db25maWdzLmNsZWFyKCk7XHJcbiAgICAgICAgY29uc3QgbmV3VmlzaWJsZTogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgY29uZmlncy5mb3JFYWNoKChjb25maWcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb2x1bW5Db25maWdzLnNldChjb25maWcuZmllbGQsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgIGlmIChjb25maWcudmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgbmV3VmlzaWJsZS5wdXNoKGNvbmZpZy5maWVsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQcOxYWRpciBjb2x1bW5hcyBxdWUgZXhpc3RlbiBwZXJvIG5vIGVzdGFiYW4gZW4gbGEgY29uZmlndXJhY2nDs24gZ3VhcmRhZGFcclxuICAgICAgICB0aGlzLmFsbENvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb2x1bW5Db25maWdzLmhhcyhjb2wpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbkNvbmZpZ3Muc2V0KGNvbCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBjb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXI6IHRoaXMuY29sdW1uQ29uZmlncy5zaXplXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZpc2libGVDb2x1bW5zID0gY29uZmlnc1xyXG4gICAgICAgICAgICAuZmlsdGVyKGMgPT4gYy52aXNpYmxlKVxyXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5vcmRlciAtIGIub3JkZXIpXHJcbiAgICAgICAgICAgIC5tYXAoYyA9PiBjLmZpZWxkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc3RhYmxlY2UgbGFzIGNvbHVtbmFzIGEgbG9zIHZhbG9yZXMgcG9yIGRlZmVjdG8uXHJcbiAgICAgKiBAcGFyYW0gZGVmYXVsdENvbHVtbnMgQXJyYXkgZGUgY29sdW1uYXMgcG9yIGRlZmVjdG8uXHJcbiAgICAgKi9cclxuICAgIHJlc2V0VG9EZWZhdWx0KGRlZmF1bHRDb2x1bW5zOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29sdW1uQ29uZmlncy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbHVtbkNvbmZpZ3MoZGVmYXVsdENvbHVtbnMpO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZUNvbHVtbnMgPSBbLi4uZGVmYXVsdENvbHVtbnNdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0aWVuZSBsYXMgY29sdW1uYXMgdmlzaWJsZXMgYWN0dWFsbWVudGUuXHJcbiAgICAgKiBAcmV0dXJucyBBcnJheSBkZSBub21icmVzIGRlIGNvbHVtbmFzIHZpc2libGVzLlxyXG4gICAgICovXHJcbiAgICBnZXRWaXNpYmxlQ29sdW1ucygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLnZpc2libGVDb2x1bW5zXTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gRXhwb3J0YXIgYWwgw6FtYml0byBnbG9iYWxcclxuKHdpbmRvdyBhcyBhbnkpLkdyaWRDb2x1bW5zTWFuYWdlciA9IEdyaWRDb2x1bW5zTWFuYWdlcjtcclxuXHJcblxyXG4iXX0=