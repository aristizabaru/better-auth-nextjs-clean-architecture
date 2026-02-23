// ports/repositories/* → operaciones tipo “gateway” (auth, db-backed things)
// ports/providers/* → fuentes de datos/config
// ports/services/* → acciones externas (email, payments, storage)

// Un Provider representa una fuente externa de datos auxiliares
// que el dominio necesita para tomar decisiones.
// No modela entidades del negocio, sino información de apoyo
// (configuración, feature flags, valores dinámicos, etc.).
// Se define como un puerto en Application y su implementación
// concreta vive en Infrastructure, manteniendo al dominio
// independiente del origen real de esos datos.
