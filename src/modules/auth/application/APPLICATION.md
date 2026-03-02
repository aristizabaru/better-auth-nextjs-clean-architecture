# Application Layer:
La capa de Application coordina y orquesta los casos de uso
del sistema. Define cómo se ejecutan las acciones del negocio,
en qué orden deben ocurrir y qué objetos del dominio participan,
sin contener reglas esenciales del modelo ni detalles técnicos
de infraestructura.

Actúa como puente entre Presentation y Domain, recibiendo datos
desde el exterior, transformándolos en estructuras adecuadas
para el dominio, y delegando la ejecución de reglas a Entidades,
Value Objects y Domain Services.

También define los contratos (puertos) hacia el mundo externo,
manteniendo la inversión de dependencias y asegurando que
el dominio permanezca aislado de frameworks, bases de datos
y tecnologías específicas.