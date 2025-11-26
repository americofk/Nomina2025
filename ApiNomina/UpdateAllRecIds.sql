-- Script para actualizar todos los RecId = 0 con valores de la SEQUENCE
USE [DC365_PayrollDataApp];
GO

DECLARE @sql NVARCHAR(MAX);
DECLARE @tableName NVARCHAR(128);
DECLARE @count INT;

DECLARE tableCursor CURSOR FOR
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE COLUMN_NAME = 'RecId'
  AND TABLE_NAME != 'AuditLogs'
ORDER BY TABLE_NAME;

OPEN tableCursor;
FETCH NEXT FROM tableCursor INTO @tableName;

WHILE @@FETCH_STATUS = 0
BEGIN
    SET @sql = 'UPDATE [' + @tableName + '] SET RecId = NEXT VALUE FOR dbo.RecId WHERE RecId = 0;';
    EXEC sp_executesql @sql;

    SET @sql = 'SELECT @cnt = COUNT(*) FROM [' + @tableName + '] WHERE RecId > 0;';
    EXEC sp_executesql @sql, N'@cnt INT OUTPUT', @count OUTPUT;

    PRINT @tableName + ': ' + CAST(@count AS NVARCHAR(10)) + ' registros con RecId asignado';

    FETCH NEXT FROM tableCursor INTO @tableName;
END;

CLOSE tableCursor;
DEALLOCATE tableCursor;

PRINT 'Proceso completado - Todos los RecIds actualizados correctamente';
GO
