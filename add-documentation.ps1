# Script para agregar documentación XML a archivos C#
# Agrega comentarios a clases, métodos y propiedades públicas

param(
    [string]$Path = ".",
    [switch]$WhatIf = $false
)

function Get-MethodDescription {
    param([string]$methodName, [string]$returnType, [string]$className)

    $descriptions = @{
        # Patrones comunes de métodos
        "^Get" = "Obtiene"
        "^GetAll" = "Obtiene todos los registros"
        "^GetById" = "Obtiene un registro por su identificador"
        "^GetId" = "Obtiene un registro por su identificador"
        "^Find" = "Busca"
        "^Search" = "Busca"
        "^Create" = "Crea un nuevo registro"
        "^Add" = "Agrega un nuevo registro"
        "^Insert" = "Inserta un nuevo registro"
        "^Post" = "Crea un nuevo registro"
        "^Save" = "Guarda los cambios del registro"
        "^Update" = "Actualiza un registro existente"
        "^Put" = "Actualiza un registro existente"
        "^Delete" = "Elimina un registro"
        "^Remove" = "Elimina un registro"
        "^Validate" = "Valida los datos"
        "^Check" = "Verifica"
        "^Is" = "Verifica si"
        "^Has" = "Verifica si tiene"
        "^Can" = "Verifica si puede"
        "^Load" = "Carga los datos"
        "^Download" = "Descarga"
        "^Upload" = "Carga un archivo"
        "^Export" = "Exporta los datos"
        "^Import" = "Importa los datos"
        "^Send" = "Envia"
        "^Process" = "Procesa"
        "^Calculate" = "Calcula"
        "^Convert" = "Convierte"
        "^Format" = "Formatea"
        "^Parse" = "Analiza y convierte"
        "^Build" = "Construye"
        "^Generate" = "Genera"
        "^Initialize" = "Inicializa"
        "^Configure" = "Configura"
        "^Setup" = "Configura"
        "^Reset" = "Reinicia"
        "^Clear" = "Limpia"
        "^Dispose" = "Libera los recursos"
        "^ToString" = "Convierte a cadena de texto"
        "^Equals" = "Compara igualdad"
        "^Compare" = "Compara"
        "^Sort" = "Ordena"
        "^Filter" = "Filtra"
        "^Map" = "Mapea"
        "^Transform" = "Transforma"
        "^Notify" = "Notifica"
        "^Log" = "Registra en el log"
        "^Authenticate" = "Autentica"
        "^Authorize" = "Autoriza"
        "^Login" = "Inicia sesion"
        "^Logout" = "Cierra sesion"
        "^Register" = "Registra"
        "^Hire" = "Contrata"
        "^Dismiss" = "Da de baja"
        "^Activate" = "Activa"
        "^Deactivate" = "Desactiva"
        "^Enable" = "Habilita"
        "^Disable" = "Deshabilita"
        "^UpdateStatus" = "Actualiza el estado"
        "^ChangeStatus" = "Cambia el estado"
    }

    foreach ($pattern in $descriptions.Keys) {
        if ($methodName -match $pattern) {
            return $descriptions[$pattern]
        }
    }

    # Si no coincide con ningun patron, generar descripcion generica
    if ($returnType -eq "void" -or $returnType -eq "Task") {
        return "Ejecuta la operacion $methodName"
    }
    elseif ($returnType -match "^IEnumerable|^List|^IList|^Collection") {
        return "Obtiene una coleccion de datos"
    }
    elseif ($returnType -match "^Task<") {
        return "Ejecuta la operacion $methodName de forma asincrona"
    }
    elseif ($returnType -eq "bool" -or $returnType -eq "Boolean") {
        return "Verifica y retorna verdadero o falso"
    }
    else {
        return "Ejecuta la operacion $methodName"
    }
}

function Get-PropertyDescription {
    param([string]$propertyName, [string]$propertyType)

    $descriptions = @{
        "^Id$" = "Identificador unico"
        "Id$" = "Identificador"
        "Name$" = "Nombre"
        "Description$" = "Descripcion"
        "Date$" = "Fecha"
        "Time$" = "Hora"
        "DateTime$" = "Fecha y hora"
        "^Created" = "Fecha de creacion"
        "^Modified" = "Fecha de modificacion"
        "^Updated" = "Fecha de actualizacion"
        "^Is" = "Indica si"
        "^Has" = "Indica si tiene"
        "^Can" = "Indica si puede"
        "Status$" = "Estado"
        "State$" = "Estado"
        "Type$" = "Tipo"
        "Code$" = "Codigo"
        "Number$" = "Numero"
        "Count$" = "Cantidad"
        "Total$" = "Total"
        "Amount$" = "Monto"
        "Price$" = "Precio"
        "Rate$" = "Tasa"
        "Percent" = "Porcentaje"
        "Email$" = "Correo electronico"
        "Phone$" = "Telefono"
        "Address$" = "Direccion"
        "City$" = "Ciudad"
        "Country$" = "Pais"
        "Province$" = "Provincia"
        "Zip" = "Codigo postal"
        "Url$" = "URL"
        "Path$" = "Ruta"
        "File" = "Archivo"
        "Image" = "Imagen"
        "Password" = "Contrasena"
        "User" = "Usuario"
        "Employee" = "Empleado"
        "Company" = "Empresa"
        "Department" = "Departamento"
        "Position" = "Puesto"
        "Job" = "Cargo"
        "Salary" = "Salario"
        "Payroll" = "Nomina"
        "Tax" = "Impuesto"
        "Loan" = "Prestamo"
        "Deduction" = "Deduccion"
        "Earning" = "Ganancia"
        "^Active$" = "Indica si esta activo"
        "^Enabled$" = "Indica si esta habilitado"
        "^Visible$" = "Indica si es visible"
        "^Required$" = "Indica si es requerido"
        "^Valid$" = "Indica si es valido"
    }

    foreach ($pattern in $descriptions.Keys) {
        if ($propertyName -match $pattern) {
            return $descriptions[$pattern]
        }
    }

    # Descripcion generica basada en el tipo
    if ($propertyType -match "^string") {
        return "Valor de texto para $propertyName"
    }
    elseif ($propertyType -match "^int|^long|^decimal|^double|^float") {
        return "Valor numerico para $propertyName"
    }
    elseif ($propertyType -match "^bool") {
        return "Indica el estado de $propertyName"
    }
    elseif ($propertyType -match "^DateTime") {
        return "Fecha y hora de $propertyName"
    }
    elseif ($propertyType -match "^List|^IEnumerable|^ICollection") {
        return "Coleccion de $propertyName"
    }
    else {
        return "Obtiene o establece $propertyName"
    }
}

function Get-ClassDescription {
    param([string]$className, [string]$classType)

    $descriptions = @{
        "Controller$" = "Controlador para gestion de"
        "Service$" = "Servicio para gestion de"
        "Repository$" = "Repositorio para acceso a datos de"
        "Handler$" = "Manejador para operaciones de"
        "CommandHandler$" = "Manejador de comandos para"
        "QueryHandler$" = "Manejador de consultas para"
        "Helper$" = "Clase auxiliar para"
        "Factory$" = "Fabrica para creacion de"
        "Builder$" = "Constructor para"
        "Validator$" = "Validador para"
        "Manager$" = "Administrador de"
        "Provider$" = "Proveedor de"
        "Configuration$" = "Configuracion de"
        "Context$" = "Contexto de"
        "Request$" = "Modelo de solicitud para"
        "Response$" = "Modelo de respuesta para"
        "Dto$" = "Objeto de transferencia de datos para"
        "ViewModel$" = "Modelo de vista para"
        "Entity$" = "Entidad de dominio para"
        "Model$" = "Modelo de datos para"
        "Attribute$" = "Atributo personalizado para"
        "Exception$" = "Excepcion para"
        "Extension$" = "Metodos de extension para"
        "Filter$" = "Filtro para"
        "Middleware$" = "Middleware para"
        "Hub$" = "Hub de SignalR para"
        "Binder$" = "Enlazador de modelos para"
    }

    # Extraer nombre base sin sufijo comun
    $baseName = $className -replace "(Controller|Service|Repository|Handler|Helper|Factory|Builder|Validator|Manager|Provider|Configuration|Context|Request|Response|Dto|ViewModel|Entity|Model|Attribute|Exception|Extension|Filter|Middleware|Hub|Binder)$", ""

    foreach ($pattern in $descriptions.Keys) {
        if ($className -match $pattern) {
            return "$($descriptions[$pattern]) $baseName"
        }
    }

    if ($classType -eq "interface") {
        return "Interfaz para $baseName"
    }
    elseif ($classType -eq "enum") {
        return "Enumeracion de valores para $baseName"
    }
    else {
        return "Clase para gestion de $baseName"
    }
}

function Add-DocumentationToFile {
    param([string]$filePath)

    $content = Get-Content $filePath -Raw -Encoding UTF8
    $originalContent = $content
    $modified = $false

    # Patron para clases sin documentacion
    $classPattern = '(?m)^(\s*)((?:public|internal|private|protected)\s+(?:abstract\s+|sealed\s+|static\s+|partial\s+)*(?:class|interface|enum|struct)\s+(\w+)(?:<[^>]+>)?(?:\s*:\s*[^\r\n{]+)?)\s*\{'

    $content = [regex]::Replace($content, $classPattern, {
        param($match)
        $indent = $match.Groups[1].Value
        $declaration = $match.Groups[2].Value
        $className = $match.Groups[3].Value

        # Verificar si ya tiene documentacion
        $beforeMatch = $content.Substring(0, $match.Index)
        $lastNewLine = $beforeMatch.LastIndexOf("`n")
        if ($lastNewLine -gt 0) {
            $linesBefore = $beforeMatch.Substring($lastNewLine - 100)
            if ($linesBefore -match '///\s*<summary>') {
                return $match.Value
            }
        }

        $classType = if ($declaration -match '\binterface\b') { "interface" }
                     elseif ($declaration -match '\benum\b') { "enum" }
                     elseif ($declaration -match '\bstruct\b') { "struct" }
                     else { "class" }

        $description = Get-ClassDescription -className $className -classType $classType
        $script:modified = $true

        return "$indent/// <summary>`n$indent/// $description.`n$indent/// </summary>`n$indent$declaration {"
    })

    # Patron para metodos publicos sin documentacion
    $methodPattern = '(?m)^(\s*)((?:\[[\w\(\),\s"=]+\]\s*)*)(public|protected)\s+((?:virtual\s+|override\s+|abstract\s+|static\s+|async\s+)*)([\w<>\[\],\s\?]+)\s+(\w+)\s*\(([^)]*)\)\s*(?:where\s+[^{]+)?{'

    $content = [regex]::Replace($content, $methodPattern, {
        param($match)
        $indent = $match.Groups[1].Value
        $attributes = $match.Groups[2].Value
        $accessModifier = $match.Groups[3].Value
        $modifiers = $match.Groups[4].Value
        $returnType = $match.Groups[5].Value.Trim()
        $methodName = $match.Groups[6].Value
        $parameters = $match.Groups[7].Value

        # Verificar si ya tiene documentacion
        $beforeMatch = $content.Substring(0, $match.Index)
        $lastNewLine = $beforeMatch.LastIndexOf("`n")
        if ($lastNewLine -gt 0) {
            $linesBefore = $beforeMatch.Substring([Math]::Max(0, $lastNewLine - 150))
            if ($linesBefore -match '///\s*<summary>') {
                return $match.Value
            }
        }

        # Ignorar constructores y propiedades
        if ($returnType -eq $methodName -or $methodName -match '^get_|^set_') {
            return $match.Value
        }

        $description = Get-MethodDescription -methodName $methodName -returnType $returnType
        $script:modified = $true

        $doc = "$indent/// <summary>`n$indent/// $description.`n$indent/// </summary>`n"

        # Agregar parametros
        if ($parameters -and $parameters.Trim()) {
            $params = $parameters -split ','
            foreach ($param in $params) {
                $param = $param.Trim()
                if ($param -match '(?:[\w<>\[\]\?]+)\s+(\w+)(?:\s*=.*)?$') {
                    $paramName = $Matches[1]
                    $doc += "$indent/// <param name=`"$paramName`">Parametro $paramName.</param>`n"
                }
            }
        }

        # Agregar retorno
        if ($returnType -ne "void" -and $returnType -ne "Task") {
            $doc += "$indent/// <returns>Resultado de la operacion.</returns>`n"
        }

        return "$doc$indent$attributes$accessModifier $modifiers$returnType $methodName($parameters) {"
    })

    # Patron para propiedades publicas sin documentacion
    $propertyPattern = '(?m)^(\s*)((?:\[[\w\(\),\s"=]+\]\s*)*)(public)\s+((?:virtual\s+|override\s+|abstract\s+|static\s+)*)([\w<>\[\],\?\s]+)\s+(\w+)\s*{\s*(?:get|set)'

    $content = [regex]::Replace($content, $propertyPattern, {
        param($match)
        $indent = $match.Groups[1].Value
        $attributes = $match.Groups[2].Value
        $accessModifier = $match.Groups[3].Value
        $modifiers = $match.Groups[4].Value
        $propertyType = $match.Groups[5].Value.Trim()
        $propertyName = $match.Groups[6].Value

        # Verificar si ya tiene documentacion
        $beforeMatch = $content.Substring(0, $match.Index)
        $lastNewLine = $beforeMatch.LastIndexOf("`n")
        if ($lastNewLine -gt 0) {
            $linesBefore = $beforeMatch.Substring([Math]::Max(0, $lastNewLine - 100))
            if ($linesBefore -match '///\s*<summary>') {
                return $match.Value
            }
        }

        $description = Get-PropertyDescription -propertyName $propertyName -propertyType $propertyType
        $script:modified = $true

        $fullMatch = $match.Value
        $getSetPart = ""
        if ($fullMatch -match '{\s*(get|set)') {
            $getSetPart = "{ " + $Matches[1]
        }

        return "$indent/// <summary>`n$indent/// $description.`n$indent/// </summary>`n$indent$attributes$accessModifier $modifiers$propertyType $propertyName $getSetPart"
    })

    if ($content -ne $originalContent) {
        if ($WhatIf) {
            Write-Host "Would modify: $filePath" -ForegroundColor Yellow
        }
        else {
            Set-Content -Path $filePath -Value $content -Encoding UTF8 -NoNewline
            Write-Host "Modified: $filePath" -ForegroundColor Green
        }
        return $true
    }
    return $false
}

# Buscar archivos C#
$files = Get-ChildItem -Path $Path -Filter "*.cs" -Recurse |
         Where-Object { $_.FullName -notmatch "\\(obj|bin|Migrations|\.designer\.cs)" }

$totalFiles = $files.Count
$modifiedFiles = 0

Write-Host "Procesando $totalFiles archivos C#..." -ForegroundColor Cyan

foreach ($file in $files) {
    try {
        if (Add-DocumentationToFile -filePath $file.FullName) {
            $modifiedFiles++
        }
    }
    catch {
        Write-Host "Error en $($file.FullName): $_" -ForegroundColor Red
    }
}

Write-Host "`nProceso completado!" -ForegroundColor Green
Write-Host "Archivos procesados: $totalFiles" -ForegroundColor Cyan
Write-Host "Archivos modificados: $modifiedFiles" -ForegroundColor Cyan
