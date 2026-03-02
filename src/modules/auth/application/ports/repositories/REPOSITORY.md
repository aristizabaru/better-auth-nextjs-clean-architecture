# Repository (Port):
Un Repository es un tipo de Port cuya responsabilidad
es abstraer el acceso a la persistencia de Agregados
o Entidades del dominio.

Define operaciones como búsqueda, almacenamiento
o eliminación, sin exponer detalles sobre cómo
o dónde se almacenan los datos.

Desde la perspectiva del dominio y de la Application,
un Repository representa una colección conceptual
de objetos del modelo, no una tabla ni una base de datos.

Su implementación concreta vive en Infrastructure
(por ejemplo: Prisma, SQL, MongoDB, API externa, etc.).
