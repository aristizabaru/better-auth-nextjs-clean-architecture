# Composition Root (Composition / Wiring):
El Composition Root es el lugar donde se ensamblan
las dependencias concretas del sistema.

Aquí se crean instancias reales de Adapters (Infrastructure)
y se inyectan en los Casos de Uso (Application) mediante Ports.

Su objetivo es mantener el resto del código libre de "new PrismaClient()",
"new HttpClient()", "new ProviderX()", etc., concentrando el acoplamiento
a infraestructura en un único punto.

En Next.js, el Composition Root suele ubicarse en un módulo
de Infrastructure o en un archivo de "factories" por feature,
y es consumido por Presentation (Server Actions / Route Handlers)
para obtener Casos de Uso ya cableados.