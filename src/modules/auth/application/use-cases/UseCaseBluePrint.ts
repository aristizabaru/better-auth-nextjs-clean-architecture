// Un Caso de Uso representa una acción específica que el sistema
// puede ejecutar desde la perspectiva del negocio.
//
// Orquesta el flujo de un proceso: recibe datos de entrada (DTOs),
// crea y utiliza Value Objects y Entidades del dominio,
// aplica políticas o servicios del dominio cuando es necesario,
// y se comunica con repositorios o servicios externos
// a través de puertos definidos en Application.
//
// Contiene reglas del proceso (qué debe ocurrir en esta acción),
// pero no contiene detalles técnicos ni implementaciones concretas.
//
// Actúa como coordinador entre Presentation, Domain
// e Infrastructure, manteniendo las dependencias dirigidas
// hacia el dominio.
//
// El Caso de Uso decide "cuándo" aplicar reglas;
// el dominio define "cómo" se comportan esas reglas.
