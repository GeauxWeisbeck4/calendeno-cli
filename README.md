# CalenDeno CLI Tool

A calendar CLI tool, built with Deno, Deno KV, and Typescript.

## 1. System Architecture & Tech Stack

- Runtime & Package Management: Deno v1.40+ or v2.x (native TypeScript execution, no build step required). 
- UI Framework: @inquirer/prompts or ink (via React in Deno) or @coral-xyz/anchor ANSI terminal helpers. For terminal rendering with layouts, ink (React for CLI) or clack / custom ANSI escape sequences combined with @std/cli works best. 
- Database & Persistence: Deno KV (Deno.openKv()) natively built into Deno for zero-dependency key-value and secondary index storage. 
- Markdown Rendering: marked + marked-terminal or terminal-kit / custom ANSI chalk formatting. 
- Date Manipulation: date-fns or native JS Date / Temporal.

## 2. Deno KV Data Schema (schema.ts)

- We organize events under hierarchical keys for fast range queries by date
