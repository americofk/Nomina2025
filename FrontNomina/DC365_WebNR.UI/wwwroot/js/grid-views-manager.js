/**
 * @file grid-views-manager.ts
 * @description Gestión de vistas de usuario para grids/tablas.
 *              Permite guardar, cargar y administrar configuraciones de vista.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module GridViews
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
/**
 * Clase para gestionar vistas de usuario guardadas en la API.
 */
class GridViewsManager {
    /**
     * Constructor del gestor de vistas.
     * @param apiBase URL base de la API.
     * @param token Token de autenticación Bearer.
     * @param entityName Nombre de la entidad (ej: "Department").
     * @param userRefRecId RecId del usuario.
     * @param dataAreaId ID del área de datos (empresa).
     */
    constructor(apiBase, token, entityName, userRefRecId, dataAreaId) {
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
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loadAvailableViews();
                // Buscar vista por defecto
                const defaultView = this.availableViews.find(v => v.IsDefault);
                if (defaultView) {
                    return yield this.loadView(defaultView.RecId);
                }
                return [];
            }
            catch (error) {
                console.error('Error inicializando GridViewsManager:', error);
                return [];
            }
        });
    }
    /**
     * Carga las vistas disponibles desde la API.
     */
    loadAvailableViews() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.apiBase}/usergridviews?entityName=${encodeURIComponent(this.entityName)}&userRefRecId=${this.userRefRecId}`;
                console.log('Cargando vistas desde:', url);
                const response = yield this.fetchJson(url);
                console.log('Respuesta de vistas:', response);
                if (response === null || response === void 0 ? void 0 : response.Data) {
                    this.availableViews = response.Data;
                }
            }
            catch (error) {
                console.error('Error cargando vistas:', error);
                this.availableViews = [];
            }
        });
    }
    /**
     * Realiza una petición fetch con autenticación.
     * @param url URL de la petición.
     * @param options Opciones adicionales.
     * @returns Respuesta JSON.
     */
    fetchJson(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, options = {}) {
            const headers = Object.assign({ 'Accept': 'application/json', 'Content-Type': 'application/json' }, (options.headers || {}));
            if (this.token) {
                headers['Authorization'] = `Bearer ${this.token}`;
            }
            const response = yield fetch(url, Object.assign(Object.assign({}, options), { headers }));
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            // Si es 204 No Content, retornar vacío
            if (response.status === 204) {
                return null;
            }
            return response.json();
        });
    }
    /**
     * Carga una vista específica por su ID.
     * @param viewId RecId de la vista.
     * @returns Configuración de columnas de la vista.
     */
    loadView(viewId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.apiBase}/usergridviews/${viewId}`;
                const view = yield this.fetchJson(url);
                if (view) {
                    this.currentView = view;
                    // Registrar uso
                    this.recordUsage(viewId).catch(console.error);
                    // Parsear configuración
                    const config = JSON.parse(view.ViewConfig);
                    return config.columns || [];
                }
                return [];
            }
            catch (error) {
                console.error('Error cargando vista:', error);
                return [];
            }
        });
    }
    /**
     * Guarda una nueva vista.
     * @param viewName Nombre de la vista.
     * @param columnConfigs Configuración de columnas.
     * @param isDefault Si es la vista por defecto.
     * @param isPublic Si es pública.
     * @returns true si se guardó correctamente.
     */
    saveView(viewName_1, columnConfigs_1) {
        return __awaiter(this, arguments, void 0, function* (viewName, columnConfigs, isDefault = false, isPublic = false) {
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
                const result = yield this.fetchJson(url, {
                    method: 'POST',
                    body: JSON.stringify(request)
                });
                if (result) {
                    this.currentView = result;
                    yield this.loadAvailableViews();
                    this.showNotification('Vista guardada correctamente', 'success');
                    return true;
                }
                return false;
            }
            catch (error) {
                console.error('Error guardando vista:', error);
                this.showNotification('Error al guardar la vista', 'error');
                return false;
            }
        });
    }
    /**
     * Actualiza la vista actual.
     * @param columnConfigs Nueva configuración de columnas.
     * @returns true si se actualizó correctamente.
     */
    updateView(columnConfigs) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.fetchJson(url, {
                    method: 'PUT',
                    body: JSON.stringify(request)
                });
                if (result) {
                    this.currentView = result;
                    this.showNotification('Vista actualizada correctamente', 'success');
                    return true;
                }
                return false;
            }
            catch (error) {
                console.error('Error actualizando vista:', error);
                this.showNotification('Error al actualizar la vista', 'error');
                return false;
            }
        });
    }
    /**
     * Elimina una vista.
     * @param viewId RecId de la vista a eliminar.
     * @returns true si se eliminó correctamente.
     */
    deleteView(viewId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const url = `${this.apiBase}/usergridviews/${viewId}`;
                yield this.fetchJson(url, { method: 'DELETE' });
                // Si era la vista actual, limpiarla
                if (((_a = this.currentView) === null || _a === void 0 ? void 0 : _a.RecId) === viewId) {
                    this.currentView = null;
                }
                yield this.loadAvailableViews();
                this.showNotification('Vista eliminada correctamente', 'success');
                return true;
            }
            catch (error) {
                console.error('Error eliminando vista:', error);
                this.showNotification('Error al eliminar la vista', 'error');
                return false;
            }
        });
    }
    /**
     * Establece una vista como predeterminada.
     * @param viewId RecId de la vista.
     * @returns true si se estableció correctamente.
     */
    setDefaultView(viewId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.apiBase}/usergridviews/${viewId}/set-default`;
                const result = yield this.fetchJson(url, { method: 'POST' });
                if (result) {
                    yield this.loadAvailableViews();
                    this.showNotification('Vista establecida como predeterminada', 'success');
                    return true;
                }
                return false;
            }
            catch (error) {
                console.error('Error estableciendo vista predeterminada:', error);
                this.showNotification('Error al establecer vista predeterminada', 'error');
                return false;
            }
        });
    }
    /**
     * Registra el uso de una vista (incrementa contador).
     * @param viewId RecId de la vista.
     */
    recordUsage(viewId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.apiBase}/usergridviews/${viewId}/record-usage`;
                yield this.fetchJson(url, { method: 'POST' });
            }
            catch (error) {
                // Ignorar errores de registro de uso
            }
        });
    }
    /**
     * Obtiene las vistas disponibles.
     * @returns Array de vistas disponibles.
     */
    getAvailableViews() {
        return [...this.availableViews];
    }
    /**
     * Verifica si hay una vista actualmente cargada.
     * @returns true si hay una vista activa.
     */
    hasCurrentView() {
        return this.currentView !== null;
    }
    /**
     * Obtiene el nombre de la vista actual.
     * @returns Nombre de la vista o 'Vista por defecto'.
     */
    getCurrentViewName() {
        var _a;
        return ((_a = this.currentView) === null || _a === void 0 ? void 0 : _a.ViewName) || 'Vista por defecto';
    }
    /**
     * Obtiene el ID de la vista actual.
     * @returns RecId de la vista o null.
     */
    getCurrentViewId() {
        var _a;
        return ((_a = this.currentView) === null || _a === void 0 ? void 0 : _a.RecId) || null;
    }
    /**
     * Muestra una notificación al usuario.
     * @param message Mensaje a mostrar.
     * @param type Tipo de notificación (success, error, warning, info).
     */
    showNotification(message, type) {
        const w = window;
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
        }
        else if (w.windows_message) {
            w.windows_message(message, type);
        }
        else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }
}
// Exportar al ámbito global
window.GridViewsManager = GridViewsManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC12aWV3cy1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vVHlwZVNjcmlwdEZpbGUvZ3JpZC12aWV3cy1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7Ozs7Ozs7Ozs7QUFpQ0g7O0dBRUc7QUFDSCxNQUFNLGdCQUFnQjtJQVNsQjs7Ozs7OztPQU9HO0lBQ0gsWUFDSSxPQUFlLEVBQ2YsS0FBYSxFQUNiLFVBQWtCLEVBQ2xCLFlBQW9CLEVBQ3BCLFVBQWtCO1FBRWxCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDRyxVQUFVOztZQUNaLElBQUksQ0FBQztnQkFDRCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUVoQywyQkFBMkI7Z0JBQzNCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMvRCxJQUFJLFdBQVcsRUFBRSxDQUFDO29CQUNkLE9BQU8sTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEQsQ0FBQztnQkFFRCxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzlELE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1csa0JBQWtCOztZQUM1QixJQUFJLENBQUM7Z0JBQ0QsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyw2QkFBNkIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNoSSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBRTlDLElBQUksUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksRUFBRSxDQUFDO29CQUNqQixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hDLENBQUM7WUFDTCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUM3QixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVyxTQUFTOzZEQUFDLEdBQVcsRUFBRSxVQUF1QixFQUFFO1lBQzFELE1BQU0sT0FBTyxtQkFDVCxRQUFRLEVBQUUsa0JBQWtCLEVBQzVCLGNBQWMsRUFBRSxrQkFBa0IsSUFDL0IsQ0FBQyxPQUFPLENBQUMsT0FBaUMsSUFBSSxFQUFFLENBQUMsQ0FDdkQsQ0FBQztZQUVGLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxVQUFVLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0RCxDQUFDO1lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxrQ0FDekIsT0FBTyxLQUNWLE9BQU8sSUFDVCxDQUFDO1lBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDZixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUVELHVDQUF1QztZQUN2QyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFFRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0csUUFBUSxDQUFDLE1BQWM7O1lBQ3pCLElBQUksQ0FBQztnQkFDRCxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLGtCQUFrQixNQUFNLEVBQUUsQ0FBQztnQkFDdEQsTUFBTSxJQUFJLEdBQWlCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFckQsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDUCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztvQkFFeEIsZ0JBQWdCO29CQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRTlDLHdCQUF3QjtvQkFDeEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzNDLE9BQU8sTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7Z0JBQ2hDLENBQUM7Z0JBRUQsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM5QyxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7Ozs7OztPQU9HO0lBQ0csUUFBUTs2REFDVixRQUFnQixFQUNoQixhQUE2QixFQUM3QixZQUFxQixLQUFLLEVBQzFCLFdBQW9CLEtBQUs7WUFFekIsSUFBSSxDQUFDO2dCQUNELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztnQkFFOUQsTUFBTSxPQUFPLEdBQUc7b0JBQ1osWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO29CQUMvQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7b0JBQzNCLFFBQVEsRUFBRSxNQUFNO29CQUNoQixTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVM7b0JBQzFDLFFBQVEsRUFBRSxRQUFRO29CQUNsQixTQUFTLEVBQUUsU0FBUztvQkFDcEIsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsVUFBVSxFQUFFLFVBQVU7b0JBQ3RCLGFBQWEsRUFBRSxDQUFDO2lCQUNuQixDQUFDO2dCQUVGLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sZ0JBQWdCLENBQUM7Z0JBQzVDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7b0JBQ3JDLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztpQkFDaEMsQ0FBQyxDQUFDO2dCQUVILElBQUksTUFBTSxFQUFFLENBQUM7b0JBQ1QsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7b0JBQzFCLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyw4QkFBOEIsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDakUsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM1RCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNHLFVBQVUsQ0FBQyxhQUE2Qjs7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFDQUFxQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN4RSxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBRUQsSUFBSSxDQUFDO2dCQUNELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztnQkFFOUQsTUFBTSxPQUFPLEdBQUc7b0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztvQkFDN0IsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWTtvQkFDM0MsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVTtvQkFDdkMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTtvQkFDbkMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUztvQkFDckMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTtvQkFDbkMsZUFBZSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZTtvQkFDakQsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUztvQkFDckMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTtvQkFDbkMsVUFBVSxFQUFFLFVBQVU7b0JBQ3RCLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWE7aUJBQ2hELENBQUM7Z0JBRUYsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxnQkFBZ0IsQ0FBQztnQkFDNUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtvQkFDckMsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2lCQUNoQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxNQUFNLEVBQUUsQ0FBQztvQkFDVCxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztvQkFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlDQUFpQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNwRSxPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQztnQkFFRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsOEJBQThCLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQy9ELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0csVUFBVSxDQUFDLE1BQWM7OztZQUMzQixJQUFJLENBQUM7Z0JBQ0QsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxrQkFBa0IsTUFBTSxFQUFFLENBQUM7Z0JBQ3RELE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFFaEQsb0NBQW9DO2dCQUNwQyxJQUFJLENBQUEsTUFBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxLQUFLLE1BQUssTUFBTSxFQUFFLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixDQUFDO2dCQUVELE1BQU0sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQywrQkFBK0IsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDbEUsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLDRCQUE0QixFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM3RCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNHLGNBQWMsQ0FBQyxNQUFjOztZQUMvQixJQUFJLENBQUM7Z0JBQ0QsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxrQkFBa0IsTUFBTSxjQUFjLENBQUM7Z0JBQ2xFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFN0QsSUFBSSxNQUFNLEVBQUUsQ0FBQztvQkFDVCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO29CQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsdUNBQXVDLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzFFLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkNBQTJDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQywwQ0FBMEMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDM0UsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNXLFdBQVcsQ0FBQyxNQUFjOztZQUNwQyxJQUFJLENBQUM7Z0JBQ0QsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxrQkFBa0IsTUFBTSxlQUFlLENBQUM7Z0JBQ25FLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixxQ0FBcUM7WUFDekMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNILGlCQUFpQjtRQUNiLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7T0FHRztJQUNILGtCQUFrQjs7UUFDZCxPQUFPLENBQUEsTUFBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxRQUFRLEtBQUksbUJBQW1CLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7T0FHRztJQUNILGdCQUFnQjs7UUFDWixPQUFPLENBQUEsTUFBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxLQUFLLEtBQUksSUFBSSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssZ0JBQWdCLENBQUMsT0FBZSxFQUFFLElBQVk7UUFDbEQsTUFBTSxDQUFDLEdBQUcsTUFBYSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ1gsUUFBUSxJQUFJLEVBQUUsQ0FBQztnQkFDWCxLQUFLLFNBQVM7b0JBQ1YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM5QixNQUFNO2dCQUNWLEtBQUssT0FBTztvQkFDUixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1YsS0FBSyxTQUFTO29CQUNWLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztvQkFDdEMsTUFBTTtnQkFDVjtvQkFDSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDOUMsQ0FBQztRQUNMLENBQUM7YUFBTSxJQUFJLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO2FBQU0sQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN0RCxDQUFDO0lBQ0wsQ0FBQztDQUNKO0FBRUQsNEJBQTRCO0FBQzNCLE1BQWMsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZSBncmlkLXZpZXdzLW1hbmFnZXIudHNcclxuICogQGRlc2NyaXB0aW9uIEdlc3Rpw7NuIGRlIHZpc3RhcyBkZSB1c3VhcmlvIHBhcmEgZ3JpZHMvdGFibGFzLlxyXG4gKiAgICAgICAgICAgICAgUGVybWl0ZSBndWFyZGFyLCBjYXJnYXIgeSBhZG1pbmlzdHJhciBjb25maWd1cmFjaW9uZXMgZGUgdmlzdGEuXHJcbiAqIEBhdXRob3IgRXF1aXBvIGRlIERlc2Fycm9sbG9cclxuICogQGRhdGUgMjAyNVxyXG4gKiBAbW9kdWxlIEdyaWRWaWV3c1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmFjacOzbiBkZSB1bmEgY29sdW1uYSBpbmRpdmlkdWFsLlxyXG4gKi9cclxuaW50ZXJmYWNlIENvbHVtbkNvbmZpZyB7XHJcbiAgICBmaWVsZDogc3RyaW5nO1xyXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcclxuICAgIG9yZGVyOiBudW1iZXI7XHJcbiAgICB3aWR0aD86IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVzdHJ1Y3R1cmEgZGUgdW5hIHZpc3RhIGd1YXJkYWRhLlxyXG4gKi9cclxuaW50ZXJmYWNlIFVzZXJHcmlkVmlldyB7XHJcbiAgICBSZWNJZDogbnVtYmVyO1xyXG4gICAgVXNlclJlZlJlY0lkOiBudW1iZXI7XHJcbiAgICBFbnRpdHlOYW1lOiBzdHJpbmc7XHJcbiAgICBWaWV3VHlwZTogc3RyaW5nO1xyXG4gICAgVmlld1Njb3BlOiBzdHJpbmc7XHJcbiAgICBWaWV3TmFtZTogc3RyaW5nO1xyXG4gICAgVmlld0Rlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gICAgSXNEZWZhdWx0OiBib29sZWFuO1xyXG4gICAgSXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgICBWaWV3Q29uZmlnOiBzdHJpbmc7XHJcbiAgICBTY2hlbWFWZXJzaW9uOiBudW1iZXI7XHJcbiAgICBVc2FnZUNvdW50OiBudW1iZXI7XHJcbiAgICBMYXN0VXNlZE9uPzogc3RyaW5nO1xyXG4gICAgVGFncz86IHN0cmluZztcclxuICAgIElzUHVibGljPzogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENsYXNlIHBhcmEgZ2VzdGlvbmFyIHZpc3RhcyBkZSB1c3VhcmlvIGd1YXJkYWRhcyBlbiBsYSBBUEkuXHJcbiAqL1xyXG5jbGFzcyBHcmlkVmlld3NNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgYXBpQmFzZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB0b2tlbjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBlbnRpdHlOYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHVzZXJSZWZSZWNJZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBkYXRhQXJlYUlkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRWaWV3OiBVc2VyR3JpZFZpZXcgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBhdmFpbGFibGVWaWV3czogVXNlckdyaWRWaWV3W107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvciBkZWwgZ2VzdG9yIGRlIHZpc3Rhcy5cclxuICAgICAqIEBwYXJhbSBhcGlCYXNlIFVSTCBiYXNlIGRlIGxhIEFQSS5cclxuICAgICAqIEBwYXJhbSB0b2tlbiBUb2tlbiBkZSBhdXRlbnRpY2FjacOzbiBCZWFyZXIuXHJcbiAgICAgKiBAcGFyYW0gZW50aXR5TmFtZSBOb21icmUgZGUgbGEgZW50aWRhZCAoZWo6IFwiRGVwYXJ0bWVudFwiKS5cclxuICAgICAqIEBwYXJhbSB1c2VyUmVmUmVjSWQgUmVjSWQgZGVsIHVzdWFyaW8uXHJcbiAgICAgKiBAcGFyYW0gZGF0YUFyZWFJZCBJRCBkZWwgw6FyZWEgZGUgZGF0b3MgKGVtcHJlc2EpLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBhcGlCYXNlOiBzdHJpbmcsXHJcbiAgICAgICAgdG9rZW46IHN0cmluZyxcclxuICAgICAgICBlbnRpdHlOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgdXNlclJlZlJlY0lkOiBudW1iZXIsXHJcbiAgICAgICAgZGF0YUFyZWFJZDogc3RyaW5nXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmFwaUJhc2UgPSBhcGlCYXNlO1xyXG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcclxuICAgICAgICB0aGlzLmVudGl0eU5hbWUgPSBlbnRpdHlOYW1lO1xyXG4gICAgICAgIHRoaXMudXNlclJlZlJlY0lkID0gdXNlclJlZlJlY0lkO1xyXG4gICAgICAgIHRoaXMuZGF0YUFyZWFJZCA9IGRhdGFBcmVhSWQ7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5hdmFpbGFibGVWaWV3cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pY2lhbGl6YSBlbCBnZXN0b3IgY2FyZ2FuZG8gbGFzIHZpc3RhcyBkaXNwb25pYmxlcy5cclxuICAgICAqIEByZXR1cm5zIENvbmZpZ3VyYWNpw7NuIGRlIGNvbHVtbmFzIGRlIGxhIHZpc3RhIHBvciBkZWZlY3RvIChzaSBleGlzdGUpLlxyXG4gICAgICovXHJcbiAgICBhc3luYyBpbml0aWFsaXplKCk6IFByb21pc2U8Q29sdW1uQ29uZmlnW10+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRBdmFpbGFibGVWaWV3cygpO1xyXG5cclxuICAgICAgICAgICAgLy8gQnVzY2FyIHZpc3RhIHBvciBkZWZlY3RvXHJcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRWaWV3ID0gdGhpcy5hdmFpbGFibGVWaWV3cy5maW5kKHYgPT4gdi5Jc0RlZmF1bHQpO1xyXG4gICAgICAgICAgICBpZiAoZGVmYXVsdFZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmxvYWRWaWV3KGRlZmF1bHRWaWV3LlJlY0lkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluaWNpYWxpemFuZG8gR3JpZFZpZXdzTWFuYWdlcjonLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYXJnYSBsYXMgdmlzdGFzIGRpc3BvbmlibGVzIGRlc2RlIGxhIEFQSS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBsb2FkQXZhaWxhYmxlVmlld3MoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7dGhpcy5hcGlCYXNlfS91c2VyZ3JpZHZpZXdzP2VudGl0eU5hbWU9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5lbnRpdHlOYW1lKX0mdXNlclJlZlJlY0lkPSR7dGhpcy51c2VyUmVmUmVjSWR9YDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NhcmdhbmRvIHZpc3RhcyBkZXNkZTonLCB1cmwpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZmV0Y2hKc29uKHVybCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwdWVzdGEgZGUgdmlzdGFzOicsIHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZT8uRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVWaWV3cyA9IHJlc3BvbnNlLkRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjYXJnYW5kbyB2aXN0YXM6JywgZXJyb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmF2YWlsYWJsZVZpZXdzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhbGl6YSB1bmEgcGV0aWNpw7NuIGZldGNoIGNvbiBhdXRlbnRpY2FjacOzbi5cclxuICAgICAqIEBwYXJhbSB1cmwgVVJMIGRlIGxhIHBldGljacOzbi5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wY2lvbmVzIGFkaWNpb25hbGVzLlxyXG4gICAgICogQHJldHVybnMgUmVzcHVlc3RhIEpTT04uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgZmV0Y2hKc29uKHVybDogc3RyaW5nLCBvcHRpb25zOiBSZXF1ZXN0SW5pdCA9IHt9KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAuLi4ob3B0aW9ucy5oZWFkZXJzIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4gfHwge30pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG9rZW4pIHtcclxuICAgICAgICAgICAgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke3RoaXMudG9rZW59YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIGhlYWRlcnNcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaSBlcyAyMDQgTm8gQ29udGVudCwgcmV0b3JuYXIgdmFjw61vXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhcmdhIHVuYSB2aXN0YSBlc3BlY8OtZmljYSBwb3Igc3UgSUQuXHJcbiAgICAgKiBAcGFyYW0gdmlld0lkIFJlY0lkIGRlIGxhIHZpc3RhLlxyXG4gICAgICogQHJldHVybnMgQ29uZmlndXJhY2nDs24gZGUgY29sdW1uYXMgZGUgbGEgdmlzdGEuXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGxvYWRWaWV3KHZpZXdJZDogbnVtYmVyKTogUHJvbWlzZTxDb2x1bW5Db25maWdbXT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYXBpQmFzZX0vdXNlcmdyaWR2aWV3cy8ke3ZpZXdJZH1gO1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3OiBVc2VyR3JpZFZpZXcgPSBhd2FpdCB0aGlzLmZldGNoSnNvbih1cmwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSB2aWV3O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlZ2lzdHJhciB1c29cclxuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkVXNhZ2Uodmlld0lkKS5jYXRjaChjb25zb2xlLmVycm9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQYXJzZWFyIGNvbmZpZ3VyYWNpw7NuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSBKU09OLnBhcnNlKHZpZXcuVmlld0NvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLmNvbHVtbnMgfHwgW107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjYXJnYW5kbyB2aXN0YTonLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHdWFyZGEgdW5hIG51ZXZhIHZpc3RhLlxyXG4gICAgICogQHBhcmFtIHZpZXdOYW1lIE5vbWJyZSBkZSBsYSB2aXN0YS5cclxuICAgICAqIEBwYXJhbSBjb2x1bW5Db25maWdzIENvbmZpZ3VyYWNpw7NuIGRlIGNvbHVtbmFzLlxyXG4gICAgICogQHBhcmFtIGlzRGVmYXVsdCBTaSBlcyBsYSB2aXN0YSBwb3IgZGVmZWN0by5cclxuICAgICAqIEBwYXJhbSBpc1B1YmxpYyBTaSBlcyBww7pibGljYS5cclxuICAgICAqIEByZXR1cm5zIHRydWUgc2kgc2UgZ3VhcmTDsyBjb3JyZWN0YW1lbnRlLlxyXG4gICAgICovXHJcbiAgICBhc3luYyBzYXZlVmlldyhcclxuICAgICAgICB2aWV3TmFtZTogc3RyaW5nLFxyXG4gICAgICAgIGNvbHVtbkNvbmZpZ3M6IENvbHVtbkNvbmZpZ1tdLFxyXG4gICAgICAgIGlzRGVmYXVsdDogYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgICAgIGlzUHVibGljOiBib29sZWFuID0gZmFsc2VcclxuICAgICk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdDb25maWcgPSBKU09OLnN0cmluZ2lmeSh7IGNvbHVtbnM6IGNvbHVtbkNvbmZpZ3MgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgVXNlclJlZlJlY0lkOiB0aGlzLnVzZXJSZWZSZWNJZCxcclxuICAgICAgICAgICAgICAgIEVudGl0eU5hbWU6IHRoaXMuZW50aXR5TmFtZSxcclxuICAgICAgICAgICAgICAgIFZpZXdUeXBlOiAnR3JpZCcsXHJcbiAgICAgICAgICAgICAgICBWaWV3U2NvcGU6IGlzUHVibGljID8gJ1B1YmxpYycgOiAnUHJpdmF0ZScsXHJcbiAgICAgICAgICAgICAgICBWaWV3TmFtZTogdmlld05hbWUsXHJcbiAgICAgICAgICAgICAgICBJc0RlZmF1bHQ6IGlzRGVmYXVsdCxcclxuICAgICAgICAgICAgICAgIElzTG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFZpZXdDb25maWc6IHZpZXdDb25maWcsXHJcbiAgICAgICAgICAgICAgICBTY2hlbWFWZXJzaW9uOiAxXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFwaUJhc2V9L3VzZXJncmlkdmlld3NgO1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmZldGNoSnNvbih1cmwsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkQXZhaWxhYmxlVmlld3MoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbignVmlzdGEgZ3VhcmRhZGEgY29ycmVjdGFtZW50ZScsICdzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGd1YXJkYW5kbyB2aXN0YTonLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbignRXJyb3IgYWwgZ3VhcmRhciBsYSB2aXN0YScsICdlcnJvcicpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsaXphIGxhIHZpc3RhIGFjdHVhbC5cclxuICAgICAqIEBwYXJhbSBjb2x1bW5Db25maWdzIE51ZXZhIGNvbmZpZ3VyYWNpw7NuIGRlIGNvbHVtbmFzLlxyXG4gICAgICogQHJldHVybnMgdHJ1ZSBzaSBzZSBhY3R1YWxpesOzIGNvcnJlY3RhbWVudGUuXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHVwZGF0ZVZpZXcoY29sdW1uQ29uZmlnczogQ29sdW1uQ29uZmlnW10pOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFZpZXcpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKCdObyBoYXkgdmlzdGEgYWN0aXZhIHBhcmEgYWN0dWFsaXphcicsICd3YXJuaW5nJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdDb25maWcgPSBKU09OLnN0cmluZ2lmeSh7IGNvbHVtbnM6IGNvbHVtbkNvbmZpZ3MgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgUmVjSWQ6IHRoaXMuY3VycmVudFZpZXcuUmVjSWQsXHJcbiAgICAgICAgICAgICAgICBVc2VyUmVmUmVjSWQ6IHRoaXMuY3VycmVudFZpZXcuVXNlclJlZlJlY0lkLFxyXG4gICAgICAgICAgICAgICAgRW50aXR5TmFtZTogdGhpcy5jdXJyZW50Vmlldy5FbnRpdHlOYW1lLFxyXG4gICAgICAgICAgICAgICAgVmlld1R5cGU6IHRoaXMuY3VycmVudFZpZXcuVmlld1R5cGUsXHJcbiAgICAgICAgICAgICAgICBWaWV3U2NvcGU6IHRoaXMuY3VycmVudFZpZXcuVmlld1Njb3BlLFxyXG4gICAgICAgICAgICAgICAgVmlld05hbWU6IHRoaXMuY3VycmVudFZpZXcuVmlld05hbWUsXHJcbiAgICAgICAgICAgICAgICBWaWV3RGVzY3JpcHRpb246IHRoaXMuY3VycmVudFZpZXcuVmlld0Rlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgSXNEZWZhdWx0OiB0aGlzLmN1cnJlbnRWaWV3LklzRGVmYXVsdCxcclxuICAgICAgICAgICAgICAgIElzTG9ja2VkOiB0aGlzLmN1cnJlbnRWaWV3LklzTG9ja2VkLFxyXG4gICAgICAgICAgICAgICAgVmlld0NvbmZpZzogdmlld0NvbmZpZyxcclxuICAgICAgICAgICAgICAgIFNjaGVtYVZlcnNpb246IHRoaXMuY3VycmVudFZpZXcuU2NoZW1hVmVyc2lvblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7dGhpcy5hcGlCYXNlfS91c2VyZ3JpZHZpZXdzYDtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5mZXRjaEpzb24odXJsLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKCdWaXN0YSBhY3R1YWxpemFkYSBjb3JyZWN0YW1lbnRlJywgJ3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWN0dWFsaXphbmRvIHZpc3RhOicsIGVycm9yKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKCdFcnJvciBhbCBhY3R1YWxpemFyIGxhIHZpc3RhJywgJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbGltaW5hIHVuYSB2aXN0YS5cclxuICAgICAqIEBwYXJhbSB2aWV3SWQgUmVjSWQgZGUgbGEgdmlzdGEgYSBlbGltaW5hci5cclxuICAgICAqIEByZXR1cm5zIHRydWUgc2kgc2UgZWxpbWluw7MgY29ycmVjdGFtZW50ZS5cclxuICAgICAqL1xyXG4gICAgYXN5bmMgZGVsZXRlVmlldyh2aWV3SWQ6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYXBpQmFzZX0vdXNlcmdyaWR2aWV3cy8ke3ZpZXdJZH1gO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoSnNvbih1cmwsIHsgbWV0aG9kOiAnREVMRVRFJyB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNpIGVyYSBsYSB2aXN0YSBhY3R1YWwsIGxpbXBpYXJsYVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50Vmlldz8uUmVjSWQgPT09IHZpZXdJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEF2YWlsYWJsZVZpZXdzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbignVmlzdGEgZWxpbWluYWRhIGNvcnJlY3RhbWVudGUnLCAnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBlbGltaW5hbmRvIHZpc3RhOicsIGVycm9yKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uKCdFcnJvciBhbCBlbGltaW5hciBsYSB2aXN0YScsICdlcnJvcicpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXN0YWJsZWNlIHVuYSB2aXN0YSBjb21vIHByZWRldGVybWluYWRhLlxyXG4gICAgICogQHBhcmFtIHZpZXdJZCBSZWNJZCBkZSBsYSB2aXN0YS5cclxuICAgICAqIEByZXR1cm5zIHRydWUgc2kgc2UgZXN0YWJsZWNpw7MgY29ycmVjdGFtZW50ZS5cclxuICAgICAqL1xyXG4gICAgYXN5bmMgc2V0RGVmYXVsdFZpZXcodmlld0lkOiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFwaUJhc2V9L3VzZXJncmlkdmlld3MvJHt2aWV3SWR9L3NldC1kZWZhdWx0YDtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5mZXRjaEpzb24odXJsLCB7IG1ldGhvZDogJ1BPU1QnIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkQXZhaWxhYmxlVmlld3MoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05vdGlmaWNhdGlvbignVmlzdGEgZXN0YWJsZWNpZGEgY29tbyBwcmVkZXRlcm1pbmFkYScsICdzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGVzdGFibGVjaWVuZG8gdmlzdGEgcHJlZGV0ZXJtaW5hZGE6JywgZXJyb3IpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb24oJ0Vycm9yIGFsIGVzdGFibGVjZXIgdmlzdGEgcHJlZGV0ZXJtaW5hZGEnLCAnZXJyb3InKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdHJhIGVsIHVzbyBkZSB1bmEgdmlzdGEgKGluY3JlbWVudGEgY29udGFkb3IpLlxyXG4gICAgICogQHBhcmFtIHZpZXdJZCBSZWNJZCBkZSBsYSB2aXN0YS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyByZWNvcmRVc2FnZSh2aWV3SWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYXBpQmFzZX0vdXNlcmdyaWR2aWV3cy8ke3ZpZXdJZH0vcmVjb3JkLXVzYWdlYDtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5mZXRjaEpzb24odXJsLCB7IG1ldGhvZDogJ1BPU1QnIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIElnbm9yYXIgZXJyb3JlcyBkZSByZWdpc3RybyBkZSB1c29cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRpZW5lIGxhcyB2aXN0YXMgZGlzcG9uaWJsZXMuXHJcbiAgICAgKiBAcmV0dXJucyBBcnJheSBkZSB2aXN0YXMgZGlzcG9uaWJsZXMuXHJcbiAgICAgKi9cclxuICAgIGdldEF2YWlsYWJsZVZpZXdzKCk6IFVzZXJHcmlkVmlld1tdIHtcclxuICAgICAgICByZXR1cm4gWy4uLnRoaXMuYXZhaWxhYmxlVmlld3NdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmVyaWZpY2Egc2kgaGF5IHVuYSB2aXN0YSBhY3R1YWxtZW50ZSBjYXJnYWRhLlxyXG4gICAgICogQHJldHVybnMgdHJ1ZSBzaSBoYXkgdW5hIHZpc3RhIGFjdGl2YS5cclxuICAgICAqL1xyXG4gICAgaGFzQ3VycmVudFZpZXcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFZpZXcgIT09IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRpZW5lIGVsIG5vbWJyZSBkZSBsYSB2aXN0YSBhY3R1YWwuXHJcbiAgICAgKiBAcmV0dXJucyBOb21icmUgZGUgbGEgdmlzdGEgbyAnVmlzdGEgcG9yIGRlZmVjdG8nLlxyXG4gICAgICovXHJcbiAgICBnZXRDdXJyZW50Vmlld05hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50Vmlldz8uVmlld05hbWUgfHwgJ1Zpc3RhIHBvciBkZWZlY3RvJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGllbmUgZWwgSUQgZGUgbGEgdmlzdGEgYWN0dWFsLlxyXG4gICAgICogQHJldHVybnMgUmVjSWQgZGUgbGEgdmlzdGEgbyBudWxsLlxyXG4gICAgICovXHJcbiAgICBnZXRDdXJyZW50Vmlld0lkKCk6IG51bWJlciB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRWaWV3Py5SZWNJZCB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXVlc3RyYSB1bmEgbm90aWZpY2FjacOzbiBhbCB1c3VhcmlvLlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgTWVuc2FqZSBhIG1vc3RyYXIuXHJcbiAgICAgKiBAcGFyYW0gdHlwZSBUaXBvIGRlIG5vdGlmaWNhY2nDs24gKHN1Y2Nlc3MsIGVycm9yLCB3YXJuaW5nLCBpbmZvKS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG93Tm90aWZpY2F0aW9uKG1lc3NhZ2U6IHN0cmluZywgdHlwZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdyA9IHdpbmRvdyBhcyBhbnk7XHJcbiAgICAgICAgaWYgKHcuQUxFUlRTKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdy5BTEVSVFMub2sobWVzc2FnZSwgJ8OJeGl0bycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIHcuQUxFUlRTLmVycm9yKG1lc3NhZ2UsICdFcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2FybmluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdy5BTEVSVFMud2FybihtZXNzYWdlLCAnQWR2ZXJ0ZW5jaWEnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdy5BTEVSVFMuaW5mbyhtZXNzYWdlLCAnSW5mb3JtYWNpw7NuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHcud2luZG93c19tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIHcud2luZG93c19tZXNzYWdlKG1lc3NhZ2UsIHR5cGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbJHt0eXBlLnRvVXBwZXJDYXNlKCl9XSAke21lc3NhZ2V9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBFeHBvcnRhciBhbCDDoW1iaXRvIGdsb2JhbFxyXG4od2luZG93IGFzIGFueSkuR3JpZFZpZXdzTWFuYWdlciA9IEdyaWRWaWV3c01hbmFnZXI7XHJcblxyXG5cclxuIl19