# Adapter:
Un Adapter es una implementación concreta de un Port
(contrato) definido en la capa Application.

Su propósito es "adaptar" una tecnología específica
(por ejemplo: Prisma, fetch, SDK de terceros, filesystem)
para que cumpla el contrato que la Application necesita,
sin que los Casos de Uso conozcan esos detalles.

Un Adapter pertenece a Infrastructure y constituye
el punto donde el sistema se acopla conscientemente
a una herramienta o proveedor.

La dirección de dependencia se mantiene invertida:
la Application define el contrato (Port) y la Infrastructure
lo implementa (Adapter).