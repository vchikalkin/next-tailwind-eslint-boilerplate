<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Custom Project Rules & Workflow

## Stack
- Next.js 16, React 19, TypeScript, pnpm
- Tailwind v4, next-intl (locales: en, ru), MDX, next-themes
- Static export: `pnpm build:static` (STATIC_EXPORT=true)

## Conventions & Architecture
- UI: `components/ui/` — строго атомарные, чистые UI-компоненты.
- Блоки страниц: `components/sections/` или `components/modules/` — для крупных блоков.
- Локали: `messages/{locale}.json`, роуты под `app/[locale]/`.
- Все утилиты: `lib/utils.ts`. Для объединения классов Tailwind ВСЕГДА используй функцию `cn` (twMerge + clsx).
- **Варианты компонентов (class-variance-authority)**:
  1. Для создания многовариантных UI-компонентов (кнопки, бэджи, инпуты) ОБЯЗАН использовать библиотеку `class-variance-authority` (`cva`).
  2. Всегда экспортируй тип пропсов вариантов, используя `VariantProps<typeof yourComponentVariants>`, чтобы соблюдать строгие правила TypeScript и `eslint-config-sheriff`.
  3. Правила использования `cn` совместно с `cva`: Внутри компонента вызывай `cn(yourComponentVariants({ variant, size, className }))`, чтобы внешние стили (`className`) корректно перезаписывали стили вариантов через `twMerge`.
  4. Для простых условных классов (без множества вариантов) используй одиночный синтаксис `cn('базовые-стили', isActive && 'активный')`.
  5. Учитывай, что в проекте используется Tailwind v4 — пиши современные классы без устаревших конструкций.

## Code Quality & Component Architecture
- **Strict Linting**: Код должен ИДЕАЛЬНО соответствовать правилам eslint-config-sheriff. Перед отправкой кода ВСЕГДА мысленно проверяй его на соответствие правилам линтера. Не используй `any`, не пропускай типы пропсов и экспорты.
- **Component Splitting**: ЗАПРЕЩЕНО создавать огромные монолитные компоненты. Если размер файла компонента превышает 100-150 строк, ты ОБЯЗАН декомпозировать его на мелкие подкомпоненты.
- **Structural Layout**: Раскладывай переиспользуемые элементы в `components/ui/`, а специфичные для конкретных страниц части — в подпапки внутри `components/`. Держи структуру чистой и понятной.
- **i18n Strict**: Никогда не хардкодь текст. Если добавляешь новую строку, автоматически создавай ключи в `messages/en.json` and `messages/ru.json`.

## UI Libraries (shadcn/ui, Magic UI и др.)
- Если для решения задачи (например, сложный карусель, анимированная подложка, интерактивное облако тегов) существует готовое качественное решение в shadcn/ui, Magic UI или Aceternity UI — ты ДОЛЖЕН предложить его использовать.
- **Строгое правило**: Прежде чем выполнить команду установки или скопировать код библиотеки, остановись и спроси подтверждение у пользователя. Напиши краткую аргументацию (почему готовый компонент лучше, какие зависимости он подтянет и не раздует ли это бандл).
- Если готового подходящего компонента в библиотеках нет или задача тривиальная — пиши свой чистый кастомный компонент с нуля в папки `components/ui/` или `components/sections/`, не подключая внешние библиотеки.

## Verification
- Перед коммитом работают husky + lint-staged.
- Перед завершением любой крупной задачи ты обязан проверить проект, запустив `pnpm lint`.