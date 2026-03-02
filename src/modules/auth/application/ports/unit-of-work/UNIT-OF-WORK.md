# UnitOfWork (Port):
UnitOfWork es un Port que abstrae la gestión de una unidad
consistente de trabajo, normalmente asociada a una transacción.

Su propósito es garantizar que múltiples operaciones
sobre Repositories se ejecuten de forma atómica,
manteniendo la consistencia del sistema.

No define cómo se implementa la transacción
(base de datos, mecanismo distribuido, etc.),
sino que establece el contrato para coordinarla.

Permite que la capa Application controle los límites
transaccionales sin depender de tecnologías específicas.
