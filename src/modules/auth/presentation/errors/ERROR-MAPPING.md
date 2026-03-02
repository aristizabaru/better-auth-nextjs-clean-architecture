# Error Mapping (Presentation Responsibility):
Error Mapping es la responsabilidad de la capa Presentation de
traducir errores semánticos del dominio (Domain Errors) y errores
del proceso (Application) a representaciones apropiadas para el canal
de entrega (UI o HTTP).

Presentation entiende el "idioma de salida" (mensajes al usuario,
códigos HTTP, estados de formulario), pero no modifica ni redefine
reglas del negocio.

Regla clave: el dominio expresa el "por qué" (violación de invariantes)
y Presentation decide el "cómo se comunica" (mensaje, status, UX).

Esto evita contaminar Domain/Application con decisiones de interfaz,
manteniendo separación de responsabilidades.