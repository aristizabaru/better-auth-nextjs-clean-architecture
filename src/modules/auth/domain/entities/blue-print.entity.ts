// Entity:
// Una Entidad representa un concepto central del dominio
// que posee identidad propia y continuidad en el tiempo.
//
// A diferencia de un Value Object, una Entidad no se define
// únicamente por sus atributos, sino por su identidad (id).
// Aunque sus propiedades cambien, sigue siendo "la misma" entidad.
//
// Puede contener reglas del negocio que le pertenecen
// naturalmente (invariantes y comportamientos propios),
// y forma parte del núcleo del modelo del dominio.
//
// Vive en la capa Domain y no depende de infraestructura,
// frameworks ni detalles técnicos externos.
//
// Si dos instancias tienen los mismos valores pero distinto id,
// siguen siendo entidades diferentes.
