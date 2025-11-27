/**
 * @file grid-views-manager.ts
 * @description Gestión de vistas de usuario para grids/tablas.
 *              Permite guardar, cargar y administrar configuraciones de vista.
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
 * Estructura de una vista guardada.
 */
interface UserGridView {
    RecId: number;
    UserRefRecId: number;
    EntityName: string;
    ViewType: string;
    ViewScope: string;
    ViewName: string;
    ViewDescription?: string;
    IsDefault: boolean;
    IsLocked: boolean;
    ViewConfig: string;
    SchemaVersion: number;
    UsageCount: number;
    LastUsedOn?: string;
    Tags?: string;
    IsPublic?: boolean;
}

/**
 * Clase para gestionar vistas de usuario guardadas en la API.
 */
class GridViewsManager {
    private apiBase: string;
    private token: string;
    private entityName: string;
    private userRefRecId: number;
    private dataAreaId: string;
    private currentView: UserGridView | null;
    private availableViews: UserGridView[];

    /**
     * Constructor del gestor de vistas.
     * @param apiBase URL base de la API.
     * @param token Token de autenticación Bearer.
     * @param entityName Nombre de la entidad (ej: "Department").
     * @param userRefRecId RecId del usuario.
     * @param dataAreaId ID del área de datos (empresa).
     */
    constructor(
        apiBase: string,
        token: string,
        entityName: string,
        userRefRecId: number,
        dataAreaId: string
    ) {
        this.apiBase = apiBase;
        this.token = token;
        this.entityName = entityName;
        this.userRefRecId = userRefRecId;
        this.dataAreaId = dataAreaId;
        this.currentView = null;
        this.availableViews = [];
    }

    /**
     * Inicializa el gestor cargando las vistas disponibles.
     * @returns Configuración de columnas de la vista por defecto (si existe).
     */
    async initialize(): Promise<ColumnConfig[]> {
        try {
            await this.loadAvailableViews();

            // Buscar vista por defecto
            const defaultView = this.availableViews.find(v => v.IsDefault);
            if (defaultView) {
                return await this.loadView(defaultView.RecId);
            }

            return [];
        } catch (error) {
            console.error('Error inicializando GridViewsManager:', error);
            return [];
        }
    }

    /**
     * Carga las vistas disponibles desde la API.
     */
    private async loadAvailableViews(): Promise<void> {
        try {
            const url = `${this.apiBase}/usergridviews?entityName=${encodeURIComponent(this.entityName)}&userRefRecId=${this.userRefRecId}`;
            console.log('Cargando vistas desde:', url);
            const response = await this.fetchJson(url);
            console.log('Respuesta de vistas:', response);

            if (response?.Data) {
                this.availableViews = response.Data;
            }
        } catch (error) {
            console.error('Error cargando vistas:', error);
            this.availableViews = [];
        }
    }

    /**
     * Realiza una petición fetch con autenticación.
     * @param url URL de la petición.
     * @param options Opciones adicionales.
     * @returns Respuesta JSON.
     */
    private async fetchJson(url: string, options: RequestInit = {}): Promise<any> {
        const headers: Record<string, string> = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string> || {})
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        // Si es 204 No Content, retornar vacío
        if (response.status === 204) {
            return null;
        }

        return response.json();
    }

    /**
     * Carga una vista específica por su ID.
     * @param viewId RecId de la vista.
     * @returns Configuración de columnas de la vista.
     */
    async loadView(viewId: number): Promise<ColumnConfig[]> {
        try {
            const url = `${this.apiBase}/usergridviews/${viewId}`;
            const view: UserGridView = await this.fetchJson(url);

            if (view) {
                this.currentView = view;

                // Registrar uso
                this.recordUsage(viewId).catch(console.error);

                // Parsear configuración
                const config = JSON.parse(view.ViewConfig);
                return config.columns || [];
            }

            return [];
        } catch (error) {
            console.error('Error cargando vista:', error);
            return [];
        }
    }

    /**
     * Guarda una nueva vista.
     * @param viewName Nombre de la vista.
     * @param columnConfigs Configuración de columnas.
     * @param isDefault Si es la vista por defecto.
     * @param isPublic Si es pública.
     * @returns true si se guardó correctamente.
     */
    async saveView(
        viewName: string,
        columnConfigs: ColumnConfig[],
        isDefault: boolean = false,
        isPublic: boolean = false
    ): Promise<boolean> {
        try {
            const viewConfig = JSON.stringify({ columns: columnConfigs });

            const request = {
                UserRefRecId: this.userRefRecId,
                EntityName: this.entityName,
                ViewType: 'Grid',
                ViewScope: isPublic ? 'Public' : 'Private',
                ViewName: viewName,
                IsDefault: isDefault,
                IsLocked: false,
                ViewConfig: viewConfig,
                SchemaVersion: 1
            };

            const url = `${this.apiBase}/usergridviews`;
            const result = await this.fetchJson(url, {
                method: 'POST',
                body: JSON.stringify(request)
            });

            if (result) {
                this.currentView = result;
                await this.loadAvailableViews();
                this.showNotification('Vista guardada correctamente', 'success');
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error guardando vista:', error);
            this.showNotification('Error al guardar la vista', 'error');
            return false;
        }
    }

    /**
     * Actualiza la vista actual.
     * @param columnConfigs Nueva configuración de columnas.
     * @returns true si se actualizó correctamente.
     */
    async updateView(columnConfigs: ColumnConfig[]): Promise<boolean> {
        if (!this.currentView) {
            this.showNotification('No hay vista activa para actualizar', 'warning');
            return false;
        }

        try {
            const viewConfig = JSON.stringify({ columns: columnConfigs });

            const request = {
                RecId: this.currentView.RecId,
                UserRefRecId: this.currentView.UserRefRecId,
                EntityName: this.currentView.EntityName,
                ViewType: this.currentView.ViewType,
                ViewScope: this.currentView.ViewScope,
                ViewName: this.currentView.ViewName,
                ViewDescription: this.currentView.ViewDescription,
                IsDefault: this.currentView.IsDefault,
                IsLocked: this.currentView.IsLocked,
                ViewConfig: viewConfig,
                SchemaVersion: this.currentView.SchemaVersion
            };

            const url = `${this.apiBase}/usergridviews`;
            const result = await this.fetchJson(url, {
                method: 'PUT',
                body: JSON.stringify(request)
            });

            if (result) {
                this.currentView = result;
                this.showNotification('Vista actualizada correctamente', 'success');
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error actualizando vista:', error);
            this.showNotification('Error al actualizar la vista', 'error');
            return false;
        }
    }

    /**
     * Elimina una vista.
     * @param viewId RecId de la vista a eliminar.
     * @returns true si se eliminó correctamente.
     */
    async deleteView(viewId: number): Promise<boolean> {
        try {
            const url = `${this.apiBase}/usergridviews/${viewId}`;
            await this.fetchJson(url, { method: 'DELETE' });

            // Si era la vista actual, limpiarla
            if (this.currentView?.RecId === viewId) {
                this.currentView = null;
            }

            await this.loadAvailableViews();
            this.showNotification('Vista eliminada correctamente', 'success');
            return true;
        } catch (error) {
            console.error('Error eliminando vista:', error);
            this.showNotification('Error al eliminar la vista', 'error');
            return false;
        }
    }

    /**
     * Establece una vista como predeterminada.
     * @param viewId RecId de la vista.
     * @returns true si se estableció correctamente.
     */
    async setDefaultView(viewId: number): Promise<boolean> {
        try {
            const url = `${this.apiBase}/usergridviews/${viewId}/set-default`;
            const result = await this.fetchJson(url, { method: 'POST' });

            if (result) {
                await this.loadAvailableViews();
                this.showNotification('Vista establecida como predeterminada', 'success');
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error estableciendo vista predeterminada:', error);
            this.showNotification('Error al establecer vista predeterminada', 'error');
            return false;
        }
    }

    /**
     * Registra el uso de una vista (incrementa contador).
     * @param viewId RecId de la vista.
     */
    private async recordUsage(viewId: number): Promise<void> {
        try {
            const url = `${this.apiBase}/usergridviews/${viewId}/record-usage`;
            await this.fetchJson(url, { method: 'POST' });
        } catch (error) {
            // Ignorar errores de registro de uso
        }
    }

    /**
     * Obtiene las vistas disponibles.
     * @returns Array de vistas disponibles.
     */
    getAvailableViews(): UserGridView[] {
        return [...this.availableViews];
    }

    /**
     * Verifica si hay una vista actualmente cargada.
     * @returns true si hay una vista activa.
     */
    hasCurrentView(): boolean {
        return this.currentView !== null;
    }

    /**
     * Obtiene el nombre de la vista actual.
     * @returns Nombre de la vista o 'Vista por defecto'.
     */
    getCurrentViewName(): string {
        return this.currentView?.ViewName || 'Vista por defecto';
    }

    /**
     * Obtiene el ID de la vista actual.
     * @returns RecId de la vista o null.
     */
    getCurrentViewId(): number | null {
        return this.currentView?.RecId || null;
    }

    /**
     * Muestra una notificación al usuario.
     * @param message Mensaje a mostrar.
     * @param type Tipo de notificación (success, error, warning, info).
     */
    private showNotification(message: string, type: string): void {
        const w = window as any;
        if (w.ALERTS) {
            switch (type) {
                case 'success':
                    w.ALERTS.ok(message, 'Éxito');
                    break;
                case 'error':
                    w.ALERTS.error(message, 'Error');
                    break;
                case 'warning':
                    w.ALERTS.warn(message, 'Advertencia');
                    break;
                default:
                    w.ALERTS.info(message, 'Información');
            }
        } else if (w.windows_message) {
            w.windows_message(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }
}

// Exportar al ámbito global
(window as any).GridViewsManager = GridViewsManager;


