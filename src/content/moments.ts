/**
 * Once momentos del paso 3 — textos poéticos genéricos (del mes 1 al 11).
 * Fotos opcionales: copia las que quieras en public/meses/ y añade image: "nombre.jpg"
 * solo en los meses que elijas (no hace falta una foto por mes).
 */
export type Moment = {
  id: number;
  label: string;
  description: string;
  /** Opcional: archivo en public/meses/ */
  image?: string;
};

export const MOMENTS: readonly Moment[] = [
  {
    id: 1,
    label: "Mes 1",
    description:
      "El primer mes contigo: el tiempo aprendió a brillar distinto.",
    image: "0.jpeg",
  },
  {
    id: 2,
    label: "Mes 2",
    description:
      "Me enamoran tus cachetes — rosa tierna que guardo en silencio.",
    image: "4.jpeg",
  },
  {
    id: 3,
    label: "Mes 3",
    description:
      "Tu voz me calma; es refugio cuando el día pesa demasiado.",
      
  },
  {
    id: 4,
    label: "Mes 4",
    description: "Te amo en cada detalle, en lo dicho y en lo que callo.",
  },
  {
    id: 5,
    label: "Mes 5",
    description:
      "Gracias por tu apoyo en estos meses difíciles — no camino solo.",
  },
  {
    id: 6,
    label: "Mes 6",
    description: "Medio año de nosotros, y el cariño sigue creciendo.",
  },
  {
    id: 7,
    label: "Mes 7",
    description:
      "Tus cachetes son un susurro de alegría en mi memoria.",
    image: "2.jpeg",
  },
  {
    id: 8,
    label: "Mes 8",
    description:
      "Cuando hablas, el ruido del mundo se vuelve más leve.",
  },
  {
    id: 9,
    label: "Mes 9",
    description:
      "Agradezco tu fe en mí cuando yo dudaba del mañana.",
      
  },
  {
    id: 10,
    label: "Mes 10",
    description: "Diez meses amándote — y aún me sorprendes.",
    image: "3.jpeg",
  },
  {
    id: 11,
    label: "Mes 11",
    description: "Hoy, once meses: sigues siendo mi persona favorita.",
    image: "1.jpeg",
  },
] as const;
