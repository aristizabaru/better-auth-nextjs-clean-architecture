# EventPublisher (Port):
EventPublisher es un Port que permite publicar eventos
ocurridos en el dominio hacia otros sistemas o componentes,
sin acoplar la Application a un mecanismo específico
de mensajería o notificación.

Representa una forma de comunicación desacoplada
basada en eventos, facilitando extensibilidad
y separación de responsabilidades.

No define cómo se transportan los eventos
(mensajería, webhook, cola, log, etc.),
solo establece el contrato para su publicación.

Su implementación concreta pertenece a Infrastructure.
