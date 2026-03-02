# Ports
Los Ports son contratos (interfaces) definidos en la capa
Application que describen cómo el sistema necesita interactuar
con el mundo externo.

No contienen implementación, solo definen qué operaciones
deben existir para que un Caso de Uso pueda ejecutarse
sin depender de detalles técnicos concretos.

Representan el principio de Inversión de Dependencias:
la Application no conoce bases de datos, SDKs, APIs ni frameworks;
solo conoce abstracciones que luego serán implementadas
en la capa de Infrastructure.

Un Port expresa una necesidad del sistema, no una tecnología.
La infraestructura se adapta al Port, no al revés.

## Port Taxonomy (Application Layer):
En este proyecto, los Ports representan contratos definidos
en la capa Application para desacoplar los Casos de Uso
de detalles técnicos o sistemas externos.

Se adoptan las siguientes categorías de Ports:

- Repository:
  Abstrae la persistencia de Entidades o Agregados del dominio.

- Provider:
  Abstrae capacidades técnicas externas o transversales
  (por ejemplo: autenticación, envío de emails, almacenamiento,
  generación de tokens, etc.).

- Service:
  Representa la integración con sistemas externos del negocio
  (APIs, microservicios, sistemas legados, CMS, ERP, etc.).

- EventPublisher (cuando aplica):
  Permite publicar eventos del dominio sin acoplarse
  a un mecanismo concreto de mensajería o notificación.

- UnitOfWork (cuando aplica):
  Abstrae la gestión de transacciones y límites de consistencia,
  permitiendo ejecutar múltiples operaciones de forma atómica.

Esta clasificación evita dependencias directas hacia infraestructura
y mantiene el principio de inversión de dependencias.