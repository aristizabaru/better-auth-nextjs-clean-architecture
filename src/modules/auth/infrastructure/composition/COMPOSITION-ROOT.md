# Composition Root:
El Composition Root es la unidad arquitectónica responsable
de materializar el grafo completo de dependencias del sistema.
Constituye el único punto donde se instancian implementaciones
concretas y se ensamblan los componentes abstractos definidos
en las capas internas.

En términos de Clean Architecture, el Composition Root:
- Crea instancias de Adapters (Infrastructure).
- Las vincula a los Ports definidos en Application.
- Inyecta dichas dependencias en los Use Cases.
- Determina qué implementación concreta satisface cada contrato.

No contiene lógica de negocio.
No define reglas del proceso.
No protege invariantes.
No pertenece al modelo del dominio.

Su función es exclusivamente estructural: resolver dependencias
y construir el sistema en tiempo de ejecución.

Desde el punto de vista de la Inversión de Dependencias:
- Application declara contratos (Ports).
- Infrastructure implementa dichos contratos.
- El Composition Root decide qué implementación concreta se utilizará,
  manteniendo el dominio aislado de tecnologías específicas.

En aplicaciones Next.js (App Router), suele ubicarse en la capa
de Infrastructure (por feature) y es consumido por Presentation.
De esta manera, Server Actions y Route Handlers reciben
Casos de Uso ya ensamblados, sin instanciar directamente SDKs,
clientes HTTP, ORM o Providers técnicos.

El Composition Root es el único punto legítimo de entrada
de dependencias tecnológicas concretas al sistema.