# 11 meses — Regalo web ARG

Mini web app romántica: tres pasos (palabra clave → fecha → ordenar 11 momentos) y un poema de 20 líneas que termina con **Maite Zaitut per sempre vita mia**.

## Personalizar antes de desplegar

Edita estos archivos:

| Archivo | Qué cambiar |
|---------|-------------|
| [`src/content/clues.ts`](src/content/clues.ts) | `KEYWORD_1`, `RELATIONSHIP_DATE`, pistas y textos de carta/WhatsApp |
| [`src/content/moments.ts`](src/content/moments.ts) | Las 11 frases de cada mes |
| [`src/content/poema.ts`](src/content/poema.ts) | El poema completo |

**Valores configurados:**

- Palabra clave: `dios`
- Fecha de inicio: `23/06/2025` → también válido como `23062025`

### Fotos de los 11 meses (opcional)

1. Copia tus fotos en [`public/meses/`](public/meses/) con nombres `01.jpg`, `02.jpg`, … `11.jpg` (una por mes).
2. En [`src/content/moments.ts`](src/content/moments.ts), añade `image: "01.jpg"` (etc.) en cada momento.
3. También puedes adjuntarlas en el chat de Cursor y pedir que las integre el agente.

Sin fotos, el paso 3 funciona igual con solo texto.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para probar desde cero, borra el progreso en las DevTools del navegador: Application → Local Storage → elimina `once-meses-progress`.

## Desplegar en Vercel

1. Sube el proyecto a GitHub (repositorio privado recomendado).
2. Entra en [vercel.com](https://vercel.com) → **Add New Project** → importa el repo.
3. Framework: **Next.js** (detectado automáticamente). No hace falta variables de entorno.
4. Deploy. Tu URL será algo como `https://once-meses.vercel.app`.

## QR y carta física

1. Cuando tengas la URL de Vercel, genera un QR en [qr-code-generator.com](https://www.qr-code-generator.com/) apuntando a esa URL.
2. Imprime el QR en una carta o sobre. Texto sugerido para la carta:

   > Hay un sobre que solo se abre para quien conoce nuestra historia.  
   > Escanea el código — la primera llave es la palabra con la que siempre nos decimos te quiero.

3. La **segunda llave** (fecha) envíala por WhatsApp más tarde, con el enlace de respaldo. Plantilla en `WHATSAPP_MESSAGE_TEMPLATE` dentro de [`src/content/clues.ts`](src/content/clues.ts).

## Flujo del ARG

```text
/          → Paso 1: palabra clave (carta + QR)
/juego     → Paso 2: fecha | Paso 3: ordenar 11 momentos
/poema     → Poema completo + confeti
```

El progreso se guarda en `localStorage` para que pueda cerrar el móvil y continuar.

## Estructura

```text
src/
├── app/           # Rutas Next.js
├── components/    # UI del ARG
├── content/       # Poema, pistas, momentos (editable)
└── lib/           # Validación y progreso
```

## Nota sobre las respuestas

Las soluciones están en el código del cliente (normal para un regalo). No uses esto para datos sensibles.
