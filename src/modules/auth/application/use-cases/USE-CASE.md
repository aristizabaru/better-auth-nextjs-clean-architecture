# Use Case (Caso de Uso):
Un Caso de Uso representa una acción específica que el sistema
ejecuta desde la perspectiva del negocio (una intención del usuario
o del sistema con valor para el dominio).

Su responsabilidad es orquestar el flujo de un proceso:
recibe datos de entrada (DTOs), coordina la creación y uso de
Value Objects y Entidades del dominio, invoca Domain Services
cuando una regla del negocio no pertenece naturalmente a un objeto,
y se comunica con repositorios o servicios externos únicamente
a través de puertos (interfaces) definidos en la capa Application.

Contiene reglas del proceso (qué debe ocurrir y en qué orden),
pero no contiene detalles técnicos ni implementaciones concretas.
No conoce HTTP, headers, Next.js, Prisma, SQL, SDKs ni mecanismos
de persistencia: esos detalles quedan en Infrastructure y se acceden
mediante adaptadores que implementan los puertos.

Actúa como coordinador entre Presentation y Domain, asegurando que
las dependencias apunten hacia el dominio y que la infraestructura
sea intercambiable.

En términos conceptuales: el Caso de Uso decide "cuándo" aplicar
reglas y ejecutar pasos; el dominio define "qué" es válido mediante
invariantes y comportamientos propios.
