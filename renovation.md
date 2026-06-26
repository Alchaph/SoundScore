# SoundScore Renovation Plan

## Phase 1 — Purge Dead Code

### 1.1 Remove dead files
- [ ] Delete `client/src/app/models/Verification.ts` — never imported
- [ ] Delete `client/src/assets/i18n/e.json` — typo, `en.json` exists
- [ ] Delete `client/src/assets/i18n/Zch.json` — typo, `zh.json` exists
- [ ] Remove `e` and `Zch` from `environments.ts` language list

### 1.2 Clean package.json
- [ ] Remove `nodeunit`, `coveralls`, `jscoverage`, `mocha-lcov-reporter` — unused test deps
- [ ] Fix `"test"` script: change from `"nodeunit test"` to `"ng test"`
- [ ] Remove `"rxj": "^0.0.0-alpha.0"` — typo, never used

### 1.3 Remove leftover console.logs
- [ ] Strip debug `console.log`/`console.error` from `login.component.ts`

### 1.4 Remove email stubs
- [ ] Remove `System.out.println("DEV MODE: OTP...")` from `AuthenticationService.java` (was only for debugging)

---

## Phase 2 — Angular 22 Upgrade

> **Current**: 18.1.1 → **Target**: 22.0.x (latest stable)
> 
> Reference: https://angular.dev/update-guide (run `ng update` wizard)

### 2.1 Pre-upgrade checks
- [ ] Verify TypeScript ≥5.5 (currently 5.5.3) — needs ≥5.8 for Angular 22
- [ ] Verify Node ≥18.19 (currently using 20-alpine in Docker, fine)
- [ ] Commit everything so we can roll back

### 2.2 Step-by-step `ng update`
```bash
npx ng update @angular/cli@19 @angular/core@19 --allow-dirty
npx ng update @angular/cli@20 @angular/core@20 --allow-dirty  
npx ng update @angular/cli@21 @angular/core@21 --allow-dirty
npx ng update @angular/cli@22 @angular/core@22 --allow-dirty
npx ng update @angular/material@22 --allow-dirty   # if compatible
```

> Each step may require manual fixes. Run `npx ng build` after each.

### 2.3 Breaking changes to handle

| Change | Impact | Files |
|--------|--------|-------|
| Standalone components default (v19) | `standalone: true` is now implicit — can remove from all `@Component` decorators | All 20+ components |
| `NgClass`/`NgIf`/`NgFor` imports | Remove from `imports` arrays if not used with old `*ngIf` syntax | ~5 components |
| `@angular/fire` / `@firecms/neat` compatibility | May break on Angular 22. Check if `@firecms/neat` supports v22. If not, drop it and replace canvas background with plain CSS gradient. | `login.component.ts` |
| `ngx-bootstrap` compatibility | v12 targets Angular 17 — likely broken on v22. Replace with Angular Material equivalents or drop unused bootstrap features. | `package.json` |
| `ngx-mat-intl-tel-input` / `ngx-mat-input-tel` | May not support Angular 22. If broken, replace with plain `<input>` + `libphonenumber-js` validation. | `login.component.ts` |
| TypeScript strict mode | New Angular defaults may surface type errors in existing code. Fix incrementally or add `strict: false` temporarily. | `tsconfig.json` |

### 2.4 Convert remaining old template syntax
- [ ] 12 remaining `*ngIf`/`*ngFor`/`[ngClass]` → migrate to `@if`/`@for`/`[class]`

### 2.5 Update test infrastructure
- [ ] Fix 40 `.spec.ts` files — many were already broken before
- [ ] Switch from Karma/Jasmine to Jest (optional, but Karma is deprecated)
- [ ] Or at minimum: verify `npx ng test` runs

### 2.6 Final cleanup
- [ ] Remove `standalone: true` from all components (now default)
- [ ] Remove unused Angular imports (`NgClass`, `NgIf`, `NgFor` from component `imports`)
- [ ] Run `npx ng build --configuration production` — must pass with 0 errors
- [ ] Run `npx ng test` — fix any remaining failures
- [ ] Rebuild Docker frontend image: `docker compose build --no-cache frontend`

---

## Phase 3 — Backend Cleanup (Optional)

### 3.1 Spring Boot upgrade
- [ ] Current: Spring Boot 3.2.5 → consider 3.4.x (latest 3.x stable for Java 21)

### 3.2 Remove dead repositories/entities
- [ ] Check for unused entity classes or repository methods

---

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| `@firecms/neat` breaks on v22 | High | Drop it, replace with CSS gradient |
| `ngx-bootstrap` breaks | High | Already barely used, safe to drop |
| Phone input libs break | Medium | Replace with simple text input |
| Spec files fail | High | Fix or temporarily skip in CI |
| Docker build breaks | Medium | Rebuild after each step |
