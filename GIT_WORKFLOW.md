# Git Workflow

A tag‑centric process with disposable branches—minimal ceremony, maximal clarity.

---

## Why this workflow?

- **Immutable history** – every deployable build is sealed behind a `v<semver>` tag that never drifts.
- **Clean branch list** – day‑to‑day coding lives in short‑lived `work/b####` branches; they vanish after the pull‑request merge.
- **Optional snapshots** – need a nightly “save game”? Drop a `snap/YYYY.MM.DD‑n‑b####` tag.
- **Friendly releases** – final publishing (codename, notes, assets) happens in GitHub’s Releases UI; local scripts stay light.

---

## Ref map at a glance

| Ref              | Example                   | Mutable? | Use‑case                                            |
| ---------------- | ------------------------- | -------- | --------------------------------------------------- |
| **Main**         | `main`                    | ❌       | Always deploy‑ready.                                |
| **Work**         | `work/b0042`              | ✅       | Focused coding; auto‑deleted by GitHub on PR merge. |
| **Version tag**  | `v1.8.0`                  | ❌       | Single source of truth for what shipped.            |
| **Snapshot tag** | `snap/2025.05.12‑1‑b0042` | ❌       | Optional daily checkpoint.                          |

> GitHub releases (e.g. **Peter Pan ‑ 5**) are manual aliases that point to the matching `v*` tag.

---

## npm helpers (scripts/ folder)

| npm command                              | Behind the curtain                                                            |
| ---------------------------------------- | ----------------------------------------------------------------------------- |
| `npm run branch`                         | Creates the next `work/b####` branch and checks it out.                       |
| `npm run snap`                           | Tags the current work branch with `snap/YYYY.MM.DD‑n‑b####` and pushes it.    |
| `npm run bump:patch` / `minor` / `major` | On `main`: bumps `package.json`, commits, tags `vX.Y.Z`, pushes commit + tag. |

_(Script internals live in `scripts/`; this document focuses on when to run them.)_

---

## Daily routine

1. **Spin a branch** `npm run branch` → you land on `work/b####`.
2. Code; commit granularly.
3. *(Optional)* `npm run snap` at day’s end for a rollback anchor.
4. Open PR → CI passes → squash‑merge → GitHub auto‑deletes the branch.
5. On `main` `npm run bump:<level>` (patch/minor/major) → pushes `vX.Y.Z`.
6. In GitHub → **Draft new release** → choose the new tag, title it (`Peter Pan ‑ 5`), add notes, publish.

---

## Hotfix routine

1. `git checkout -b hotfix/<topic> v1.8.0` (start from the last good tag).
2. Repair, commit, PR, merge.
3. `npm run bump:patch` → creates & pushes `v1.8.1`.
4. Draft a GitHub release (**Peter Pan ‑ 6**) pointing to the new tag.

---

## Quick‑reference commands

| Need                    | Command                                |
| ----------------------- | -------------------------------------- |
| Next work branch        | `npm run branch`                       |
| Nightly snapshot        | `npm run snap`                         |
| Ship a patch            | `npm run bump:patch`                   |
| Roll back to yesterday  | `git checkout snap/YYYY.MM.DD‑n‑b####` |
| Deploy previous release | `git checkout v1.7.0`                  |

---

## FAQ

**Will deleting `work/b####` lose history?** No. Tags keep the commits alive.

**Do I have to snapshot every night?** No. Run snapshots only when you want a rollback anchor.

**Need parallel prod versions?** Branch off the tag you need (`release/1.x`) and continue using the same bump script inside that branch.

Everything else—branch protection, auto‑delete merged branches, required status checks—is configured in GitHub settings.

Stay lean, keep the tags immutable, and your history reads like a clean jazz chart instead of a scribbled napkin.
