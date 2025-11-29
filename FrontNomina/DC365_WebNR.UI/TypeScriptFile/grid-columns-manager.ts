/**
 * @file grid-columns-manager.ts
 * @description Gestión de columnas de grid/tabla. Permite mostrar/ocultar,
 *              reordenar y configurar el ancho de las columnas.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module GridViews
 */

/**
 * Configuración de una columna individual.
 */
interface ColumnConfig {
    field: string;
    visible: boolean;
    order: number;
    width?: number;
}

/**
 * Clase para gestionar las columnas de un grid/tabla.
 * Permite configurar visibilidad, orden y ancho de columnas.
 */
class GridColumnsManager {
    private allColumns: string[];
    private visibleColumns: string[];
    private columnConfigs: Map<string, ColumnConfig>;
    private onChangeCallback: ((columns: string[]) => void) | null;
    private modalId: string;
    private titleize: (field: string) => string;

    /**
     * Constructor del gestor de columnas.
     * @param allColumns Array con todos los nombres de columnas disponibles.
     * @param defaultVisible Array con las columnas visibles por defecto.
     * @param onChangeCallback Callback ejecutado cuando cambian las columnas.
     * @param titleize Función para convertir nombre de campo a título legible.
     */
    constructor(
        allColumns: string[],
        defaultVisible: string[],
        onChangeCallback?: (columns: string[]) => void,
        titleize?: (field: string) => string
    ) {
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
    private defaultTitleize(field: string): string {
        return field
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/_/g, ' ')
            .replace(/^./, (c) => c.toUpperCase());
    }

    /**
     * Inicializa la configuración de columnas.
     * @param defaultVisible Columnas visibles por defecto.
     */
    private initializeColumnConfigs(defaultVisible: string[]): void {
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
    showColumnsModal(): void {
        const modal = document.getElementById(this.modalId);
        if (!modal) {
            this.createModal();
        } else {
            // Si el modal ya existe, asegurar que los estilos estén aplicados
            this.addStyles();
        }
        this.renderColumnsList();
        ($(`#${this.modalId}`) as any).modal('show');
    }

    /**
     * Crea el modal HTML para gestionar columnas (solo si no existe en el HTML).
     */
    private createModal(): void {
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
    private addStyles(): void {
        if (document.getElementById('grid-columns-styles')) return;

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
    private renderColumnsList(): void {
        const container = document.getElementById('columns-list');
        if (!container) return;

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
    private setupDragAndDrop(container: HTMLElement): void {
        const items = container.querySelectorAll('.column-item');
        let draggedItem: HTMLElement | null = null;

        items.forEach((item) => {
            const element = item as HTMLElement;

            element.addEventListener('dragstart', (e) => {
                draggedItem = element;
                element.classList.add('dragging');
                (e as DragEvent).dataTransfer?.setData('text/plain', '');
            });

            element.addEventListener('dragend', () => {
                element.classList.remove('dragging');
                draggedItem = null;
            });

            element.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (!draggedItem || draggedItem === element) return;

                const rect = element.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;

                if ((e as DragEvent).clientY < midY) {
                    container.insertBefore(draggedItem, element);
                } else {
                    container.insertBefore(draggedItem, element.nextSibling);
                }
            });
        });
    }

    /**
     * Aplica los cambios de columnas y devuelve la nueva configuración.
     * @returns Array de configuración de columnas.
     */
    applyColumns(): ColumnConfig[] {
        const container = document.getElementById('columns-list');
        if (!container) return [];

        const items = container.querySelectorAll('.column-item');
        const newConfigs: ColumnConfig[] = [];
        const newVisible: string[] = [];

        items.forEach((item, index) => {
            const element = item as HTMLElement;
            const field = element.dataset.field || '';
            const checkbox = element.querySelector('input[type="checkbox"]') as HTMLInputElement;
            const isVisible = checkbox?.checked || false;

            const config: ColumnConfig = {
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
    getCurrentColumnConfig(): ColumnConfig[] {
        return Array.from(this.columnConfigs.values())
            .sort((a, b) => a.order - b.order);
    }

    /**
     * Aplica una configuración de columnas externa.
     * @param configs Array de configuración de columnas.
     */
    applyColumnConfig(configs: ColumnConfig[]): void {
        this.columnConfigs.clear();
        const newVisible: string[] = [];

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
    resetToDefault(defaultColumns: string[]): void {
        this.columnConfigs.clear();
        this.initializeColumnConfigs(defaultColumns);
        this.visibleColumns = [...defaultColumns];
    }

    /**
     * Obtiene las columnas visibles actualmente.
     * @returns Array de nombres de columnas visibles.
     */
    getVisibleColumns(): string[] {
        return [...this.visibleColumns];
    }
}

// Exportar al ámbito global
(window as any).GridColumnsManager = GridColumnsManager;


