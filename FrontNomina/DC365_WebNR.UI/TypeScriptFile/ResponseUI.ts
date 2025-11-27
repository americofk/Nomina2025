/**
 * @file ResponseUI.ts
 * @description Definición de interfaces para respuestas del servidor.
 *              Define los tipos de datos para las respuestas de la API.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Interfaces
 */

/**
 * Interface para respuestas estándar del servidor
 */
interface ResponseUI {
    Message: string
    Type: string
    IdType: string
    Errors: Array<String>
}

interface ResponseUIGeneric {
    Message: string
    Type: string
    Errors: Array<String>
    Obj: any
}