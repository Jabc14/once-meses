/**
 * CONFIGURACIÓN DEL ARG — Personaliza antes de desplegar
 *
 * 1. keyword1: palabra íntima (apodo, canción, lugar...)
 * 2. relationshipDate: fecha de inicio de noviazgo
 * 3. Ajusta las pistas que irán en la carta física y en WhatsApp
 */

/** Palabra clave del paso 1 (sin distinguir mayúsculas ni tildes) */
export const KEYWORD_1 = "dios";

/** Fecha de inicio: 23 de junio de 2025 (11 meses desde mayo 2026) — cámbiala */
export const RELATIONSHIP_DATE = {
  day: 23,
  month: 6,
  year: 2025,
} as const;

/** Pista en la landing / carta física */
export const HINT_KEYWORD =
  "La primera llave es la palabra que repetimos como broma hasta hartarnos (y volver a decir).";

/** Pista para el paso 2 (WhatsApp o carta) */
export const HINT_DATE =
  "La segunda llave es el día en que empezó todo.";

/** Pista para ordenar los 11 momentos */
export const HINT_MOMENTS =
  "Ordena nuestros once meses del primero al undécimo. Arrastra cada tarjeta hasta que la historia tenga sentido.";

export const CARD_MESSAGE =
  "Hay un sobre que solo se abre para quien conoce nuestra historia. Escanea el código o visita el enlace.";

export const WHATSAPP_MESSAGE_TEMPLATE = `Si el QR no funciona, aquí está la puerta: [TU_URL]

La segunda llave la llevas en el corazón: recuerda el día en que empezamos todo (DDMMAAAA).`;
