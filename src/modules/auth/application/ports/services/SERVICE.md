# Service (Port):
Un Service es un Port que representa la integración
con un sistema externo del negocio (API, microservicio,
sistema legado, CMS, ERP, etc.).

A diferencia de un Domain Service, que contiene lógica
pura del dominio, este Service describe una colaboración
externa necesaria para completar un Caso de Uso.

Define operaciones de negocio expuestas por otro sistema,
sin revelar detalles técnicos de comunicación.

Su implementación concreta vive en Infrastructure.
