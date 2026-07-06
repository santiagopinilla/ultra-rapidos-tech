# vinext-starter

Plantilla full-stack limpia basada en
[vinext](https://github.com/cloudflare/vinext), con soporte opcional para
Cloudflare D1 y Drizzle.

## Requisitos

- Node.js `>=22.13.0`

## Inicio rápido

```bash
npm install
npm run dev
npm run build
```

Esta plantilla no usa `wrangler.jsonc`.

## Qué incluye la estructura

- Edita el código de la app dentro de `app/`
- `.openai/hosting.json` declara bindings opcionales de Sites para D1 y R2
- `vite.config.ts` simula los bindings declarados en desarrollo local
- `db/schema.ts` inicia intencionalmente vacío
- `examples/d1/` contiene una superficie de ejemplo opcional para D1
- `drizzle.config.ts` permite generar migraciones locales cuando se necesite

## Qué hace este proyecto

Este repositorio levanta una tienda web llamada **Ultra Rápidos Tech**.

- `app/page.tsx` renderiza el componente principal de la tienda.
- `app/Storefront.tsx` contiene la interfaz completa: catálogo, filtros por
  categoría, carrito de cotización y enlace de pedido por correo.
- `app/layout.tsx` define metadatos globales (título, descripción, ícono) y
  la estructura base HTML.
- `app/chatgpt-auth.ts` incluye utilidades de autenticación con ChatGPT para
  leer identidad desde headers y construir rutas seguras de sign-in/sign-out.

En resumen: es una base lista para una tienda de accesorios tecnológicos con
UI en React/Next y preparada para integrarse con hosting y autenticación en
Cloudflare/OpenAI.

## Headers de autenticación del workspace

Los sitios de OpenAI Workspace pueden leer el correo del usuario actual desde
`oai-authenticated-user-email`.

Los sitios autenticados con SIWC también pueden recibir
`oai-authenticated-user-full-name` cuando el perfil SIWC del usuario tenga un
claim `name` no vacío. El nombre completo llega codificado como UTF-8
percent-encoded y viene acompañado del header
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Toma el nombre completo como opcional y usa el correo como fallback si no está:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Sign-In opcional con ChatGPT (gestionado por Dispatch)

Importa los helpers de `app/chatgpt-auth.ts` cuando el sitio necesite sign-in
con ChatGPT (opcional u obligatorio):

- Usa `getChatGPTUser()` para UI opcionalmente autenticada.
- Usa `requireChatGPTUser(returnTo)` para páginas server-rendered que deban
  redirigir visitantes anónimos a Sign in with ChatGPT.
- Usa `chatGPTSignInPath(returnTo)` y `chatGPTSignOutPath(returnTo)` para
  enlaces o acciones desde el navegador.
- Pasa una ruta relativa del mismo origen en `returnTo` para el destino tras
  iniciar/cerrar sesión. El helper valida y codifica de forma segura.
- Marca páginas protegidas con `export const dynamic = "force-dynamic"` porque
  dependen de headers de identidad por request.

Dispatch gestiona `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`,
las cookies OAuth y la inyección de headers de identidad. No implementes rutas
de app para esos paths reservados. Las rutas que no importan ni llaman el
helper siguen siendo compatibles con tráfico anónimo.

SIWC solo establece identidad; no prueba membresía de workspace. Para
restricciones globales, usa controles de acceso de la plataforma Sites o aplica
validaciones explícitas en servidor (membership/allowlist).

Usa SIWC para páginas de cuenta, paneles por usuario, registros guardados y
acciones de escritura asociadas al usuario actual de ChatGPT. Deja anónimo el
contenido público.

## Comandos útiles

- `npm run dev`: inicia desarrollo local
- `npm run build`: valida la salida de build de vinext
- `npm run db:generate`: genera migraciones de Drizzle tras cambios de esquema

## Más información

- [Documentación de vinext](https://github.com/cloudflare/vinext)
- [Guía de Drizzle para D1](https://orm.drizzle.team/docs/get-started/d1-new)
