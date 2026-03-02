# Route Handler (Presentation) -> En la implementación de una ruta de API:
Un Route Handler (app/api/*) es un controlador HTTP que expone
endpoints del sistema.

Traduce el protocolo HTTP al lenguaje interno:
- Lee request (headers, params, body).
- Valida estructura del input.
- Invoca Casos de Uso.
- Construye la respuesta HTTP (NextResponse) con el formato adecuado.

No ejecuta queries directas ni implementa reglas del negocio.
Su responsabilidad es el mapeo entre HTTP y Application.