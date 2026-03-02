# Server Action (Presentation):
Una Server Action actúa como un controlador server-side orientado
a formularios e interacciones desde componentes de React.

Su función es ser delgada:
- Recibe datos desde la UI (FormData u objetos).
- Realiza validación estructural y normalización superficial.
- Llama a un Caso de Uso de Application.
- Traduce el resultado o el error a una respuesta de UX
  (estado, mensajes, redirecciones, revalidación, etc.).

No debe contener lógica de negocio ni conocer la infraestructura.
Es un punto de entrada que protege el dominio del ruido de la UI.