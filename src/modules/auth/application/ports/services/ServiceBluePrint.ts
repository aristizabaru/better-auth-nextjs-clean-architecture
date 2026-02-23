// Un Service (como puerto de salida) representa una acción externa
// que el dominio necesita ejecutar para cumplir una regla o proceso,
// pero cuya implementación concreta depende de infraestructura.
//
// Define únicamente la intención del dominio (qué se necesita hacer),
// sin exponer detalles técnicos como SDKs, APIs o librerías externas.
//
// Su implementación vive en la capa de Infrastructure, donde se
// resuelven los detalles técnicos reales (proveedores de email,
// pasarelas de pago, almacenamiento, etc.).
//
// Permite que los casos de uso expresen acciones del negocio
// sin depender directamente de tecnologías específicas.
//
// A diferencia de un Provider (que entrega datos auxiliares),
// un Service ejecuta una acción externa como parte del proceso.
