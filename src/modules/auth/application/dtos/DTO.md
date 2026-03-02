# DTO (Data Transfer Object):
Un DTO es una estructura de datos definida en la capa Application
cuyo propósito es transportar información entre capas,
especialmente entre Presentation y Application.

No contiene lógica de negocio ni comportamiento;
su responsabilidad es representar contratos explícitos
de entrada y salida de los Casos de Uso.

Los DTOs permiten desacoplar el dominio de formatos externos,
evitando que Entidades o Value Objects se expongan directamente
hacia la capa de Presentation.

Representan reglas estructurales (forma del dato),
pero no reglas semánticas del dominio (invariantes).
La validación estructural puede ocurrir en Presentation,
mientras que la validación semántica ocurre en Domain.

En términos arquitectónicos, los DTOs formalizan
la frontera de la capa Application.
