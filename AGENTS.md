<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:shadcn-agent-rules -->

# shadcn/ui (v4+)

- **`components.json` → `"style": "radix-nova"`** — este repo usa **Radix UI**, não Base UI.
- No `init` / `add`, se o CLI pedir a base dos componentes, escolher **Radix UI** (não Base UI).
- Primitivos: `asChild` em triggers (Popover, Dialog, etc.). Não usar `render` do Base UI.
- Antes de sugerir API de um componente UI, ler `src/components/ui/<nome>.tsx` e a doc Radix/shadcn radix correspondente.
- Detalhes: `.cursor/rules/shadcn-ui.mdc` e skill global `~/.cursor/skills/shadcn-ui/`.
<!-- END:shadcn-agent-rules -->
