# Presentation Layer (Next.js):
La capa de Presentation es la frontera del sistema con el mundo externo.
En Next.js (App Router) incluye componentes de UI, Route Handlers y
Server Actions, actuando como controladores que reciben solicitudes
(HTTP o interacciones de usuario) y devuelven respuestas (UI o JSON).

Su responsabilidad es manejar preocupaciones de interfaz y entrega:
- Interpretar la entrada del usuario (params, body, forms).
- Validar forma del dato (validación estructural, p.ej. Zod).
- Invocar Casos de Uso de la capa Application.
- Traducir resultados y errores a un formato de salida apropiado
  (renderizado, navegación, mensajes de UI, NextResponse, etc.).

Presentation no contiene reglas del negocio ni invariantes del dominio.
Tampoco debe acceder directamente a infraestructura (DB, SDK, fetch);
solo coordina y traduce, delegando la lógica a Application y Domain