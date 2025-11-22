# Repository Guidelines

## Project Structure & Module Organization
- `src/` for application code grouped by domain; shared helpers in `src/shared`.
- Tests live in `tests/` mirroring `src/` (`src/auth/login.ts` -> `tests/auth/login.spec.ts`); fixtures go in `tests/fixtures/`.
- Helper scripts belong in `scripts/` (executable, shellcheck-friendly). `docs/` holds ADRs/notes. Put static assets in `assets/`.

## Build, Test, and Development Commands
- Prefer a `Makefile` or `justfile` as the entry point:
  - `make setup` installs dependencies/tooling.
  - `make fmt` formats code; `make lint` runs static/type checks.
  - `make test` runs the suite; `make dev` starts the dev server or watch build.
- Language-native aliases are fine (e.g., `npm run test/lint/build`, `uv run pytest/ruff`); document any new command in `README.md`.

## Coding Style & Naming Conventions
- Use the language formatter (Prettier, Black, gofmt); never hand-format.
- Indent with 2 spaces for JS/TS, 4 for Python. Target ~100 characters per line unless tools dictate otherwise.
- Naming: `PascalCase` for types/classes, `camelCase` for functions/vars, `kebab-case` for config scripts, `snake_case` for Python modules. Prefer domain-specific filenames (e.g., `token-service.ts`).

## Testing Guidelines
- Name tests `*.spec.ts` or `test_*.py`; put integration tests in `tests/integration/`.
- Aim for ~80%+ coverage once metrics exist; focus on critical behaviors over totals.
- Keep fixtures small/explicit; use factories for complex data. Run `make test` before PRs and include repro steps when fixing bugs.

## Commit & Pull Request Guidelines
- Commit messages should be imperative and scoped (“Add token refresh”); keep one logical change per commit. Reference issues (`Refs #123` / `Fixes #123`).
- PRs need a short summary, testing notes (`Tests: make test`), and UI screenshots when relevant; call out breaking changes or migrations.
- Use descriptive kebab-case branches (`feature/add-auth-refresh`, `bugfix/fix-timezone-offset`) and avoid force-pushing during review unless requested.

## Security & Configuration Tips
- Keep secrets out of VCS; rely on env vars and `.env.example` placeholders.
- Ignore build artifacts and caches (`node_modules/`, `dist/`, `.venv/`, `.pytest_cache/`). Mock external services and prefer least-privilege credentials in tests.
