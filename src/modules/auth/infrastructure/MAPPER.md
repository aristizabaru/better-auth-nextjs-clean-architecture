# Mapper:
Un Mapper es un componente responsable de traducir datos
entre representaciones de distintas capas o sistemas.

Su función típica en Clean Architecture es convertir:
- Modelos externos (DB records, API responses, SDK objects)
  en modelos internos del dominio (Entidades / Value Objects).
- Modelos del dominio en estructuras persistibles o transportables.

Esto evita contaminar el dominio con detalles técnicos
(campos, nombres, formatos) y permite que el modelo del negocio
permanezca estable aunque cambie la infraestructura.

Un Mapper puede vivir en Infrastructure (lo más común) o,
en algunos casos, en Application si mapea DTOs de entrada/salida.
Regla general: si el mapeo conoce formatos técnicos, es Infrastructure.