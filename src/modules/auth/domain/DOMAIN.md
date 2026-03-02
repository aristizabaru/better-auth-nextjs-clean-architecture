# Domain Layer:
La capa de Domain contiene el modelo central del negocio.
Define los conceptos fundamentales del sistema, sus reglas,
invariantes y comportamientos, expresados mediante Entidades,
Value Objects, Domain Services y Errores de Dominio.

Representa el conocimiento puro del negocio, independiente
de frameworks, bases de datos, protocolos o detalles técnicos.
No conoce HTTP, Next.js, Prisma ni mecanismos de persistencia.

Su responsabilidad es proteger la consistencia del modelo
y garantizar que solo existan estados válidos dentro del sistema.
Es el núcleo estable de la aplicación, alrededor del cual
se organizan las demás capas.