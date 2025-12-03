-- Agregar columna SeveranceRefRecId a SeveranceProcessDetails
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('SeveranceProcessDetails') AND name = 'SeveranceRefRecId')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SeveranceRefRecId] bigint NOT NULL DEFAULT 0;
    PRINT 'Columna SeveranceRefRecId agregada.';
END
ELSE
    PRINT 'Columna SeveranceRefRecId ya existe.';
GO
