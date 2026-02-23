// ports/repositories/* → operaciones tipo “gateway” (auth, db-backed things)
// ports/providers/* → fuentes de datos/config
// ports/services/* → acciones externas (email, payments, storage)

// Un Repository representa el mecanismo mediante el cual el dominio
// accede y persiste entidades o ejecuta operaciones que dependen
// de sistemas externos (base de datos, servicios de identidad, etc.).
// Es un puerto de salida definido en la capa de Application y
// cuya implementación concreta vive en Infrastructure.
// Permite aislar la lógica de negocio de los detalles técnicos
// de almacenamiento o integración externa.
