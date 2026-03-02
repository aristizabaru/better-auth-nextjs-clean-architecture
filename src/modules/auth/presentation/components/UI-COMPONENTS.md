# UI Components (Presentation):
Los componentes de UI representan la capa de interfaz del usuario.
Son responsables de renderizado, composición visual, estado de UI
y experiencia de usuario.

No contienen reglas del negocio; consumen resultados ya procesados
por Application y muestran información de forma coherente.

Cuando requieren acciones, delegan en controladores (Server Actions)
o consumen endpoints (Route Handlers), manteniendo el dominio aislado
de detalles de interacción y rendering.