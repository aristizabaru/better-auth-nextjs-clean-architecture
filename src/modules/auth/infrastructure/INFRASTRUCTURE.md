# Infrastructure Layer:
La capa de Infrastructure contiene las implementaciones concretas
de los contratos definidos en Application (Ports).

Su responsabilidad es interactuar con detalles técnicos externos:
bases de datos, ORMs, servicios HTTP, SDKs, colas, almacenamiento,
criptografía, proveedores de identidad, etc.

Infrastructure adapta el mundo externo al lenguaje interno del sistema:
traduce modelos externos (DTOs, respuestas de APIs, esquemas de DB)
a modelos del dominio (Entidades y Value Objects), y viceversa.

Puede contener lógica técnica (reintentos, timeouts, mapeo de errores,
serialización, formatos), pero no debe contener reglas esenciales
del negocio. Las decisiones de negocio permanecen en Domain/Application.

En términos de dependencias, Infrastructure depende de Application
(para implementar Ports) y puede conocer librerías/frameworks,
pero nunca debe ser conocida por Domain.