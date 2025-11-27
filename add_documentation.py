#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para agregar documentacion XML a archivos C#.
Agrega comentarios a clases, metodos y propiedades publicas.

Uso:
    python add_documentation.py [ruta] [--dry-run]

Ejemplos:
    python add_documentation.py .
    python add_documentation.py ./ApiNomina --dry-run
    python add_documentation.py ./FrontNomina
"""

import os
import re
import sys
from pathlib import Path

# Diccionario de descripciones para metodos
METHOD_DESCRIPTIONS = {
    r'^Get': 'Obtiene',
    r'^GetAll': 'Obtiene todos los registros',
    r'^GetById': 'Obtiene un registro por su identificador',
    r'^GetId': 'Obtiene un registro por su identificador',
    r'^Find': 'Busca',
    r'^Search': 'Busca',
    r'^Create': 'Crea un nuevo registro',
    r'^Add': 'Agrega un nuevo registro',
    r'^Insert': 'Inserta un nuevo registro',
    r'^Post': 'Crea o procesa',
    r'^Save': 'Guarda los cambios',
    r'^Update': 'Actualiza un registro existente',
    r'^Put': 'Actualiza un registro existente',
    r'^Delete': 'Elimina un registro',
    r'^Remove': 'Elimina un registro',
    r'^Validate': 'Valida los datos',
    r'^Check': 'Verifica',
    r'^Is': 'Verifica si',
    r'^Has': 'Verifica si tiene',
    r'^Can': 'Verifica si puede',
    r'^Load': 'Carga los datos',
    r'^Download': 'Descarga',
    r'^Upload': 'Carga un archivo',
    r'^Export': 'Exporta los datos',
    r'^Import': 'Importa los datos',
    r'^Send': 'Envia',
    r'^Process': 'Procesa',
    r'^Calculate': 'Calcula',
    r'^Convert': 'Convierte',
    r'^Format': 'Formatea',
    r'^Parse': 'Analiza y convierte',
    r'^Build': 'Construye',
    r'^Generate': 'Genera',
    r'^Initialize': 'Inicializa',
    r'^Configure': 'Configura',
    r'^Setup': 'Configura',
    r'^Reset': 'Reinicia',
    r'^Clear': 'Limpia',
    r'^Dispose': 'Libera los recursos',
    r'^ToString': 'Convierte a cadena de texto',
    r'^Equals': 'Compara igualdad',
    r'^Compare': 'Compara',
    r'^Sort': 'Ordena',
    r'^Filter': 'Filtra',
    r'^Map': 'Mapea',
    r'^Transform': 'Transforma',
    r'^Notify': 'Notifica',
    r'^Log': 'Registra en el log',
    r'^Authenticate': 'Autentica al usuario',
    r'^Authorize': 'Autoriza la operacion',
    r'^Login': 'Inicia sesion',
    r'^Logout': 'Cierra sesion',
    r'^Register': 'Registra',
    r'^Hire': 'Contrata al empleado',
    r'^Dismiss': 'Da de baja al empleado',
    r'^Activate': 'Activa',
    r'^Deactivate': 'Desactiva',
    r'^Enable': 'Habilita',
    r'^Disable': 'Deshabilita',
    r'^UpdateStatus': 'Actualiza el estado',
    r'^ChangeStatus': 'Cambia el estado',
    r'^select': 'Selecciona',
}

# Diccionario de descripciones para propiedades
PROPERTY_DESCRIPTIONS = {
    r'^Id$': 'Identificador unico',
    r'Id$': 'Identificador',
    r'Name$': 'Nombre',
    r'Description$': 'Descripcion',
    r'Date$': 'Fecha',
    r'Time$': 'Hora',
    r'DateTime$': 'Fecha y hora',
    r'^Created': 'Fecha de creacion',
    r'^Modified': 'Fecha de modificacion',
    r'^Updated': 'Fecha de actualizacion',
    r'^Is': 'Indica si',
    r'^Has': 'Indica si tiene',
    r'^Can': 'Indica si puede',
    r'Status$': 'Estado',
    r'State$': 'Estado',
    r'Type$': 'Tipo',
    r'Code$': 'Codigo',
    r'Number$': 'Numero',
    r'Count$': 'Cantidad',
    r'Total$': 'Total',
    r'Amount$': 'Monto',
    r'Price$': 'Precio',
    r'Rate$': 'Tasa',
    r'Percent': 'Porcentaje',
    r'Email$': 'Correo electronico',
    r'Phone$': 'Telefono',
    r'Address$': 'Direccion',
    r'City$': 'Ciudad',
    r'Country$': 'Pais',
    r'Province$': 'Provincia',
    r'Zip': 'Codigo postal',
    r'Url$': 'URL',
    r'Path$': 'Ruta',
    r'File': 'Archivo',
    r'Image': 'Imagen',
    r'Password': 'Contrasena',
    r'Token': 'Token de acceso',
    r'User': 'Usuario',
    r'Employee': 'Empleado',
    r'Company': 'Empresa',
    r'Department': 'Departamento',
    r'Position': 'Puesto',
    r'Job': 'Cargo',
    r'Salary': 'Salario',
    r'Payroll': 'Nomina',
    r'Tax': 'Impuesto',
    r'Loan': 'Prestamo',
    r'Deduction': 'Deduccion',
    r'Earning': 'Ganancia',
    r'^Active$': 'Indica si esta activo',
    r'^Enabled$': 'Indica si esta habilitado',
    r'^Visible$': 'Indica si es visible',
    r'^Required$': 'Indica si es requerido',
    r'^Valid$': 'Indica si es valido',
    r'Errors?$': 'Lista de errores',
    r'Message$': 'Mensaje',
    r'Result$': 'Resultado',
    r'Data$': 'Datos',
    r'List$': 'Lista',
    r'Items$': 'Elementos',
}

# Diccionario de descripciones para clases
CLASS_DESCRIPTIONS = {
    r'Controller$': 'Controlador para gestion de',
    r'Service$': 'Servicio para gestion de',
    r'Repository$': 'Repositorio para acceso a datos de',
    r'Handler$': 'Manejador para operaciones de',
    r'CommandHandler$': 'Manejador de comandos para',
    r'QueryHandler$': 'Manejador de consultas para',
    r'Helper$': 'Clase auxiliar para',
    r'Factory$': 'Fabrica para creacion de',
    r'Builder$': 'Constructor para',
    r'Validator$': 'Validador para',
    r'Manager$': 'Administrador de',
    r'Provider$': 'Proveedor de',
    r'Configuration$': 'Configuracion de entidad',
    r'Context$': 'Contexto de base de datos',
    r'Request$': 'Modelo de solicitud para',
    r'Response$': 'Modelo de respuesta para',
    r'Dto$': 'Objeto de transferencia de datos para',
    r'ViewModel$': 'Modelo de vista para',
    r'Attribute$': 'Atributo personalizado para',
    r'Exception$': 'Excepcion para',
    r'Extension$': 'Metodos de extension para',
    r'Filter$': 'Filtro para',
    r'Middleware$': 'Middleware para',
    r'Hub$': 'Hub de SignalR para',
    r'Binder$': 'Enlazador de modelos para',
    r'Base$': 'Clase base para',
    r'Process$': 'Proceso para',
    r'^Process': 'Servicio de proceso para',
    r'^I[A-Z]': 'Interfaz para',
}


def get_method_description(method_name, return_type):
    """Obtiene la descripcion para un metodo basado en su nombre."""
    for pattern, desc in METHOD_DESCRIPTIONS.items():
        if re.match(pattern, method_name, re.IGNORECASE):
            return desc

    # Descripcion generica
    if return_type in ('void', 'Task'):
        return f'Ejecuta la operacion {method_name}'
    elif 'IEnumerable' in return_type or 'List' in return_type:
        return 'Obtiene una coleccion de datos'
    elif return_type.startswith('Task<'):
        return f'Ejecuta {method_name} de forma asincrona'
    elif return_type in ('bool', 'Boolean'):
        return 'Verifica y retorna verdadero o falso'
    else:
        return f'Ejecuta la operacion {method_name}'


def get_property_description(prop_name, prop_type):
    """Obtiene la descripcion para una propiedad basada en su nombre."""
    for pattern, desc in PROPERTY_DESCRIPTIONS.items():
        if re.search(pattern, prop_name):
            return desc

    # Descripcion basada en tipo
    if 'string' in prop_type.lower():
        return f'Valor de texto para {prop_name}'
    elif any(t in prop_type.lower() for t in ['int', 'long', 'decimal', 'double', 'float']):
        return f'Valor numerico para {prop_name}'
    elif 'bool' in prop_type.lower():
        return f'Indica el estado de {prop_name}'
    elif 'DateTime' in prop_type:
        return f'Fecha de {prop_name}'
    elif any(t in prop_type for t in ['List', 'IEnumerable', 'ICollection', '[]']):
        return f'Coleccion de {prop_name}'
    else:
        return f'Obtiene o establece {prop_name}'


def get_class_description(class_name, class_type='class'):
    """Obtiene la descripcion para una clase basada en su nombre."""
    # Extraer nombre base
    base_name = re.sub(r'(Controller|Service|Repository|Handler|Helper|Factory|Builder|'
                       r'Validator|Manager|Provider|Configuration|Context|Request|Response|'
                       r'Dto|ViewModel|Attribute|Exception|Extension|Filter|Middleware|Hub|Binder)$',
                       '', class_name)

    for pattern, desc in CLASS_DESCRIPTIONS.items():
        if re.search(pattern, class_name):
            return f'{desc} {base_name}'

    if class_type == 'interface':
        return f'Interfaz para {base_name}'
    elif class_type == 'enum':
        return f'Enumeracion de valores para {base_name}'
    else:
        return f'Clase para gestion de {base_name}'


def has_xml_doc(content, pos):
    """Verifica si ya existe documentacion XML antes de la posicion dada."""
    # Buscar hacia atras hasta encontrar una linea no vacia
    before = content[:pos]
    lines = before.split('\n')

    # Revisar las ultimas lineas
    for i in range(len(lines) - 1, max(0, len(lines) - 10), -1):
        line = lines[i].strip()
        if line.startswith('/// <summary>') or line.startswith('/// </summary>'):
            return True
        if line and not line.startswith('//') and not line.startswith('[') and not line.startswith('#'):
            break
    return False


def add_documentation_to_content(content):
    """Agrega documentacion XML al contenido del archivo."""
    modified = False

    # Patron para clases, interfaces, enums
    class_pattern = re.compile(
        r'^(\s*)((?:\[[^\]]+\]\s*)*)'  # Indentacion y atributos
        r'(public|internal|private|protected)\s+'
        r'((?:abstract\s+|sealed\s+|static\s+|partial\s+)*)'
        r'(class|interface|enum|struct)\s+'
        r'(\w+)(?:<[^>]+>)?'  # Nombre de clase
        r'(?:\s*:\s*[^\r\n{]+)?'  # Herencia
        r'\s*\{',
        re.MULTILINE
    )

    def replace_class(match):
        nonlocal modified
        if has_xml_doc(content, match.start()):
            return match.group(0)

        indent = match.group(1)
        attrs = match.group(2) or ''
        access = match.group(3)
        modifiers = match.group(4) or ''
        class_type = match.group(5)
        class_name = match.group(6)

        desc = get_class_description(class_name, class_type)
        modified = True

        doc = f'{indent}/// <summary>\n{indent}/// {desc}.\n{indent}/// </summary>\n'
        return f'{doc}{match.group(0)}'

    content = class_pattern.sub(replace_class, content)

    # Patron para metodos publicos
    method_pattern = re.compile(
        r'^(\s*)((?:\[[^\]]+\]\s*)*)'  # Indentacion y atributos
        r'(public|protected)\s+'
        r'((?:virtual\s+|override\s+|abstract\s+|static\s+|async\s+)*)'
        r'([\w<>\[\],\?\s]+?)\s+'  # Tipo de retorno
        r'(\w+)\s*'  # Nombre del metodo
        r'\(([^)]*)\)\s*'  # Parametros
        r'(?:where\s+[^{]+)?'  # Restricciones genericas
        r'\{',
        re.MULTILINE
    )

    def replace_method(match):
        nonlocal modified
        if has_xml_doc(content, match.start()):
            return match.group(0)

        indent = match.group(1)
        attrs = match.group(2) or ''
        access = match.group(3)
        modifiers = match.group(4) or ''
        return_type = match.group(5).strip()
        method_name = match.group(6)
        params = match.group(7)

        # Ignorar constructores
        if return_type == method_name:
            return match.group(0)

        desc = get_method_description(method_name, return_type)
        modified = True

        doc = f'{indent}/// <summary>\n{indent}/// {desc}.\n{indent}/// </summary>\n'

        # Agregar parametros
        if params and params.strip():
            for param in params.split(','):
                param = param.strip()
                param_match = re.search(r'(?:[\w<>\[\]\?]+)\s+(\w+)(?:\s*=.*)?$', param)
                if param_match:
                    param_name = param_match.group(1)
                    doc += f'{indent}/// <param name="{param_name}">Parametro {param_name}.</param>\n'

        # Agregar retorno
        if return_type not in ('void', 'Task'):
            doc += f'{indent}/// <returns>Resultado de la operacion.</returns>\n'

        return f'{doc}{match.group(0)}'

    content = method_pattern.sub(replace_method, content)

    # Patron para propiedades publicas
    prop_pattern = re.compile(
        r'^(\s*)((?:\[[^\]]+\]\s*)*)'  # Indentacion y atributos
        r'(public)\s+'
        r'((?:virtual\s+|override\s+|abstract\s+|static\s+)*)'
        r'([\w<>\[\],\?\s]+?)\s+'  # Tipo
        r'(\w+)\s*'  # Nombre
        r'\{\s*(?:get|set)',
        re.MULTILINE
    )

    def replace_property(match):
        nonlocal modified
        if has_xml_doc(content, match.start()):
            return match.group(0)

        indent = match.group(1)
        prop_type = match.group(5).strip()
        prop_name = match.group(6)

        desc = get_property_description(prop_name, prop_type)
        modified = True

        doc = f'{indent}/// <summary>\n{indent}/// {desc}.\n{indent}/// </summary>\n'
        return f'{doc}{match.group(0)}'

    content = prop_pattern.sub(replace_property, content)

    return content, modified


def process_file(file_path, dry_run=False):
    """Procesa un archivo C# y agrega documentacion."""
    try:
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            content = f.read()

        new_content, modified = add_documentation_to_content(content)

        if modified:
            if dry_run:
                print(f'[DRY-RUN] Modificaria: {file_path}')
            else:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'[OK] Modificado: {file_path}')
            return True
        return False
    except Exception as e:
        print(f'[ERROR] {file_path}: {e}')
        return False


def main():
    # Parsear argumentos
    path = '.'
    dry_run = False

    args = sys.argv[1:]
    for arg in args:
        if arg == '--dry-run':
            dry_run = True
        elif not arg.startswith('-'):
            path = arg

    # Buscar archivos C#
    path = Path(path)
    if not path.exists():
        print(f'Error: La ruta {path} no existe')
        sys.exit(1)

    # Excluir carpetas
    exclude_dirs = {'obj', 'bin', 'Migrations', '.git', 'node_modules'}

    files = []
    for root, dirs, filenames in os.walk(path):
        # Filtrar directorios excluidos
        dirs[:] = [d for d in dirs if d not in exclude_dirs]

        for filename in filenames:
            if filename.endswith('.cs') and not filename.endswith('.Designer.cs'):
                files.append(os.path.join(root, filename))

    print(f'Procesando {len(files)} archivos C#...')
    if dry_run:
        print('(Modo simulacion - no se modificaran archivos)\n')

    modified_count = 0
    for file_path in files:
        if process_file(file_path, dry_run):
            modified_count += 1

    print(f'\nProceso completado!')
    print(f'Archivos procesados: {len(files)}')
    print(f'Archivos modificados: {modified_count}')


if __name__ == '__main__':
    main()
