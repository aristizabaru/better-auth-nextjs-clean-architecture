# Provider (Port):
Un Provider es un Port que abstrae una capacidad técnica
externa o transversal necesaria para ejecutar un Caso de Uso.

No persiste Entidades del dominio ni contiene reglas
del negocio; describe funcionalidades como autenticación,
envío de correos, almacenamiento de archivos,
generación de tokens, cifrado, etc.

Define qué capacidad necesita la Application,
sin acoplarla a un proveedor o tecnología concreta.

Su implementación pertenece a Infrastructure.
