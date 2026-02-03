# Hugo Blog Animations - Elegantly Enhanced

## TL;DR

> **Quick Summary**: Add comprehensive but subtle animations to Hugo blog with PaperMod theme using custom CSS/JS
>
> **Deliverables**:
> - Custom animation styles (`static/css/animations.css`)
> - Intersection Observer logic (`static/js/animations.js`)
> - Hugo partial overrides for asset injection
> - Complete page load, scroll, hover, and background animations
>
> **Estimated Effort**: Short (3-4 files, ~300 lines total)
> **Parallel Execution**: NO - sequential tasks (depends on file creation order)
> **Critical Path**: CSS file → JS file → Partial overrides → Test

---

## Context

### Original Request
User wants to add "动效" (animations) to their Hugo blog with PaperMod theme. Desired effects: scroll animations, hover effects, page load animations, and background animations.

### Interview Summary
**Key Discussions**:
- Animation intensity: "微妙优雅" (subtle and elegant, not disturbing reading)
- Implementation: Custom CSS/JS (no third-party libraries like AOS or GSAP)
- Page coverage: All pages (homepage, posts, about, etc.)
- Mobile behavior: Identical animations across all devices
- Performance priority: Visual effects over performance optimization

**Research Findings**:
- PaperMod theme provides `extend_head.html` and `extend_footer.html` partial hooks
- No existing keyframe animations in PaperMod (only simple transitions) - low conflict risk
- Hugo version: v0.156.0-DEV (meets PaperMod requirements)
- Project needs to create `layouts/partials/` override files

### Metis Review
**Identified Gaps** (addressed):
- Scope boundaries: All pages, max 4 animation patterns, CSS <10KB, JS <5KB
- Performance: Lighthouse score validation included in acceptance criteria
- Testing: Local Hugo server testing, browser compatibility checks
- Accessibility: `prefers-reduced-motion` media query mandatory
- Guardrails: No theme file modifications, no external libraries

---

## Work Objectives

### Core Objective
Enhance the Hugo blog with elegant, subtle animations that improve user experience without distracting from content reading.

### Concrete Deliverables
- `static/css/animations.css` - All animation styles (page load, scroll, hover, background)
- `static/js/animations.js` - Intersection Observer for scroll-triggered animations
- `layouts/partials/extend_head.html` - Inject CSS into `<head>`
- `layouts/partials/extend_footer.html` - Inject JS before `</body>`

### Definition of Done
- [x] Local Hugo server runs without errors: `hugo server -D`
- [x] Animations visible on all pages (home, posts, about)
- [x] `prefers-reduced-motion` disables all animations
- [x] CSS file < 10KB, JS file < 5KB
- [x] No theme file modifications

### Must Have
- Page load fade-in animations (staggered)
- Scroll-triggered reveal animations
- Hover effects on cards, links, buttons
- Animated gradient background
- Accessibility support (reduced motion)

### Must NOT Have (Guardrails)
- Third-party animation libraries (AOS, GSAP, ScrollReveal, etc.)
- Modifications to `themes/PaperMod/` files
- Animations longer than 600ms duration
- Character-by-character text animations
- More than 4 distinct animation patterns
- Background animations that distract from reading

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks in this plan MUST be verifiable WITHOUT any human action.
> The executing agent will use tools (Bash, curl, grep) to verify deliverables.

### Test Decision
- **Infrastructure exists**: NO (Hugo project, no test framework)
- **Automated tests**: None (visual/animations require manual verification)
- **Framework**: N/A

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

> Every task includes detailed scenarios for automated verification.

**Verification Tools:**
- **File creation**: Bash (`ls`, `cat`, `wc -c`)
- **Local testing**: Bash (`hugo server -D`, `curl`, `grep`)
- **CSS validation**: Bash (`grep -c "animation"`, `grep "prefers-reduced-motion"`)
- **JS validation**: Bash (`grep -c "IntersectionObserver"`, `node --check`)

---

## Execution Strategy

### Parallel Execution Waves

```
Sequential Execution (each task depends on previous):

Wave 1:
└── Task 1: Create layouts/ directory structure

Wave 2:
└── Task 2: Create CSS animations file

Wave 3:
└── Task 3: Create JS animations file

Wave 4:
├── Task 4: Create extend_head.html partial
└── Task 5: Create extend_footer.html partial

Wave 5:
└── Task 6: Local testing and validation

Critical Path: All tasks sequential (each file required for next step)
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2 | None |
| 2 | 1 | 3 | None |
| 3 | 2 | 4, 5 | None |
| 4 | 3 | 6 | 5 |
| 5 | 3 | 6 | 4 |
| 6 | 4, 5 | None | None |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1 | delegate_task(category="quick", load_skills=[], run_in_background=false) |
| 2 | 2 | delegate_task(category="visual-engineering", load_skills=["frontend-ui-ux"], run_in_background=false) |
| 3 | 3 | delegate_task(category="visual-engineering", load_skills=["frontend-ui-ux"], run_in_background=false) |
| 4 | 4, 5 | delegate_task(category="quick", load_skills=[], run_in_background=false) |
| 5 | 6 | delegate_task(category="quick", load_skills=[], run_in_background=false) |

---

## TODOs

- [x] 1. Create layouts/partials directory structure

  **What to do**:
  - Create `layouts/` directory in project root
  - Create `layouts/partials/` subdirectory
  - Verify directory creation

  **Must NOT do**:
  - Create any files in `themes/PaperMod/`
  - Modify any theme files

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Simple directory creation, trivial task
  - **Skills**: `[]`
    - No special skills needed for directory creation

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential
  - **Blocks**: Task 2
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `themes/PaperMod/layouts/` - Observe existing theme directory structure
  - Current project structure: `/home/zishu/workspace/myblog/` - Base path

  **API/Type References** (contracts to implement against):
  - N/A (directory structure task)

  **Test References** (testing patterns to follow):
  - N/A (no tests for this task)

  **Documentation References** (specs and requirements):
  - Hugo documentation: https://gohugo.io/templates/partials/ - Partial override patterns

  **External References** (libraries and frameworks):
  - N/A

  **WHY Each Reference Matters** (explain the relevance):
  - Directory structure shows Hugo's expected layout for partial overrides

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.

  **Agent-Executed QA Scenarios (MANDATORY — per-scenario, ultra-detailed):**

  Scenario: Directory structure created successfully
    Tool: Bash
    Preconditions: In /home/zishu/workspace/myblog/
    Steps:
      1. ls -la layouts/partials/
      2. Assert: Directory exists and is empty
      3. Assert: Parent directory is `layouts/`
    Expected Result: Empty `layouts/partials/` directory created
    Evidence: Directory listing output

  - [x] Directory `layouts/partials/` exists
  - [x] Directory is empty (no files yet)
  - [x] No files created in `themes/` directory

  **Commit**: NO
  - Will group with later tasks

---

- [x] 2. Create CSS animations file

  **What to do**:
  - Create `static/css/animations.css` with all animation styles
  - Implement keyframe animations (fadeInUp, fadeIn, gradientShift, shimmer, pulse, float)
  - Add scroll reveal classes (.reveal, .reveal-left, .reveal-right)
  - Add hover effects for cards, links, buttons
  - Add background gradient animation
  - Include `prefers-reduced-motion` media query for accessibility
  - Keep file size under 10KB

  **Must NOT do**:
  - Use third-party CSS or import external libraries
  - Create animations longer than 600ms duration
  - Animate navigation menus or critical interactive elements

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `visual-engineering`
    - Reason: CSS animations and visual effects require frontend UI/UX expertise
  - **Skills**: `["frontend-ui-ux"]`
    - `frontend-ui-ux`: CSS animation expertise, performance optimization, visual design principles
  - **Skills Evaluated but Omitted**:
    - No other skills needed for pure CSS task

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential
  - **Blocks**: Task 3
  - **Blocked By**: Task 1

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `themes/PaperMod/assets/css/` - Observe existing CSS structure and naming conventions
  - `themes/PaperMod/assets/css/common.css` - Note CSS variable usage (e.g., `--theme`)

  **API/Type References** (contracts to implement against):
  - CSS Animations specification: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations - @keyframes syntax
  - CSS Transitions: https://developer.mozilla.org/en-US/docs/Web/CSS/transition - Transition properties

  **Test References** (testing patterns to follow):
  - N/A (CSS verified by grep and file size)

  **Documentation References** (specs and requirements):
  - CSS animation best practices: https://web.dev/animations-guide/ - Performance tips
  - Accessibility: https://web.dev/prefers-reduced-motion/ - Reduced motion pattern

  **External References** (libraries and frameworks):
  - W3C CSS Animations: https://www.w3.org/TR/css-animations-1/ - Official specification

  **WHY Each Reference Matters** (explain the relevance):
  - Common.css shows CSS variable usage: ensures animations use theme colors correctly
  - MDN documentation: provides correct syntax for keyframe animations
  - Web.dev guides: performance and accessibility best practices

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.

  **Agent-Executed QA Scenarios (MANDATORY — per-scenario, ultra-detailed):**

  Scenario: CSS file created with all required animations
    Tool: Bash
    Preconditions: In /home/zishu/workspace/myblog/
    Steps:
      1. ls -la static/css/animations.css
      2. Assert: File exists
      3. wc -c static/css/animations.css
      4. Assert: File size < 10240 (10KB)
      5. grep -c "@keyframes" static/css/animations.css
      6. Assert: At least 5 keyframe animations defined
      7. grep "prefers-reduced-motion" static/css/animations.css
      8. Assert: Media query present (accessibility support)
      9. grep -c "\.reveal" static/css/animations.css
      10. Assert: Scroll reveal classes present
      11. grep -c "transition:" static/css/animations.css
      12. Assert: Hover effects present
    Expected Result: CSS file with all animations, under 10KB, accessible
    Evidence: grep and wc output

  Scenario: CSS file uses correct theme variables
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep "var(--theme" static/css/animations.css
      2. Assert: Theme variables referenced (not hardcoded colors)
    Expected Result: Animations respect PaperMod theme colors
    Evidence: grep output showing var(--theme)

  - [x] File `static/css/animations.css` created
  - [x] File size < 10KB (verified with `wc -c`)
  - [x] Contains `@keyframes fadeInUp`
  - [x] Contains `@keyframes fadeIn`
  - [x] Contains `@keyframes gradientShift`
  - [x] Contains `.reveal` class with `.active` modifier
  - [x] Contains `.reveal-left` and `.reveal-right` classes
  - [x] Contains hover effects (transitions on `.post-entry`, `a`, `.tags a`)
  - [x] Contains `prefers-reduced-motion` media query
  - [x] All animations use CSS variables from theme

  **Commit**: NO
  - Will group with later tasks

---

- [x] 3. Create JS animations file

  **What to do**:
  - Create `static/js/animations.js` with Intersection Observer logic
  - Implement scroll-triggered reveal functionality
  - Add event listener for DOMContentLoaded
  - Create observer with threshold (0.1 = 10% visible)
  - Add animation classes when elements enter viewport
  - Keep file size under 5KB
  - Ensure graceful degradation (works if JS fails)

  **Must NOT do**:
  - Import external JavaScript libraries
  - Use complex animation libraries
  - Animate critical navigation elements

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `visual-engineering`
    - Reason: Frontend JS for animations requires UI/UX expertise
  - **Skills**: `["frontend-ui-ux"]`
    - `frontend-ui-ux`: JavaScript animation patterns, Intersection Observer API, performance optimization

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential
  - **Blocks**: Tasks 4, 5
  - **Blocked By**: Task 2

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `themes/PaperMod/assets/js/fastsearch.js` - Note existing JS structure and patterns
  - `themes/PaperMod/assets/js/license.js` - Comment style

  **API/Type References** (contracts to implement against):
  - Intersection Observer API: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API - Observer constructor and options

  **Test References** (testing patterns to follow):
  - N/A (JS verified by grep and node --check)

  **Documentation References** (specs and requirements):
  - Intersection Observer best practices: https://web.dev/intersection-observer/ - Performance tips

  **External References** (libraries and frameworks):
  - MDN Web API: https://developer.mozilla.org/en-US/docs/Web/API - Complete browser API reference

  **WHY Each Reference Matters** (explain the relevance):
  - Fastsearch.js shows the theme's JavaScript coding style
  - Intersection Observer API docs provide correct syntax and options

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.

  **Agent-Executed QA Scenarios (MANDATORY — per-scenario, ultra-detailed):**

  Scenario: JS file created with Intersection Observer
    Tool: Bash
    Preconditions: In /home/zishu/workspace/myblog/
    Steps:
      1. ls -la static/js/animations.js
      2. Assert: File exists
      3. wc -c static/js/animations.js
      4. Assert: File size < 5120 (5KB)
      5. grep -c "IntersectionObserver" static/js/animations.js
      6. Assert: IntersectionObserver present
      7. grep "DOMContentLoaded" static/js/animations.js
      8. Assert: DOM load event listener present
      9. grep "\.reveal" static/js/animations.js
      10. Assert: Targets CSS reveal classes
      11. node --check static/js/animations.js
      12. Assert: No syntax errors
    Expected Result: JS file with Intersection Observer, under 5KB, valid syntax
    Evidence: grep, wc, and node output

  Scenario: JS has graceful error handling
    Tool: Bash
    Preconditions: File exists
    Steps:
      1. grep "try {" static/js/animations.js || echo "No try-catch found"
      2. grep "catch" static/js/animations.js || echo "No catch found"
      3. Note: Error handling optional for simple observer
    Expected Result: JS handles missing elements gracefully
    Evidence: grep output or note

  - [x] File `static/js/animations.js` created
  - [x] File size < 5KB (verified with `wc -c`)
  - [x] Contains `IntersectionObserver`
  - [x] Contains `DOMContentLoaded` event listener
  - [x] Targets `.reveal`, `.reveal-left`, `.reveal-right` classes
  - [x] Valid JavaScript syntax (verified with `node --check`)

  **Commit**: NO
  - Will group with later tasks

---

- [x] 4. Create extend_head.html partial

- [x] 5. Create extend_footer.html partial

  **What to do**:
  - Create `layouts/partials/extend_footer.html`
  - Add `<script>` tag for `static/js/animations.js`
  - Use Hugo's `relURL` function for correct path resolution
  - Follow Hugo template syntax

  **Must NOT do**:
  - Modify `themes/PaperMod/layouts/partials/extend_footer.html`
  - Use hardcoded paths (use `relURL`)

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Simple Hugo template file creation
  - **Skills**: `[]`
    - No special skills needed for basic Hugo template

  **Parallelization**:
  - **Can Run In Parallel**: NO (but can run alongside Task 4)
  - **Parallel Group**: Wave 4 (with Task 4)
  - **Blocks**: Task 6
  - **Blocked By**: Task 3

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `themes/PaperMod/layouts/partials/extend_footer.html` - See the empty template structure
  - `themes/PaperMod/layouts/partials/footer.html` - Note how scripts are included in theme

  **API/Type References** (contracts to implement against):
  - Hugo templates: https://gohugo.io/templates/introduction/ - Template syntax
  - Hugo relURL function: https://gohugo.io/functions/relurl/ - Path resolution

  **Test References** (testing patterns to follow):
  - N/A (template verified by grep and Hugo build)

  **Documentation References** (specs and requirements):
  - Hugo partials: https://gohugo.io/templates/partials/ - How partials work

  **External References** (libraries and frameworks):
  - N/A

  **WHY Each Reference Matters** (explain the relevance):
  - Theme's extend_footer.html shows the comment pattern to follow
  - Footer.html shows where scripts are typically loaded

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.

  **Agent-Executed QA Scenarios (MANDATORY — per-scenario, ultra-detailed):**

  Scenario: Partial file created with correct script tag
    Tool: Bash
    Preconditions: In /home/zishu/workspace/myblog/
    Steps:
      1. ls -la layouts/partials/extend_footer.html
      2. Assert: File exists
      3. cat layouts/partials/extend_footer.html
      4. Assert: Contains `<script src=` tag
      5. Assert: Uses `relURL` function
      6. Assert: References `js/animations.js`
      7. grep -c "{{" layouts/partials/extend_footer.html
      8. Assert: Hugo template syntax present
    Expected Result: Valid Hugo partial with JS script tag
    Evidence: cat and grep output

  - [x] File `layouts/partials/extend_footer.html` created
  - [x] Contains `<script src=` tag
  - [x] Uses `relURL` function for path resolution
  - [x] References `js/animations.js`

  **Commit**: NO
  - Will group with later tasks

---

- [x] 6. Local testing and validation

  **What to do**:
  - Start local Hugo server: `hugo server -D`
  - Wait for server to start (check for "Web Server is available")
  - Verify CSS file is being served
  - Verify JS file is being served
  - Check HTML output contains animation classes
  - Verify no build errors
  - Stop server after validation

  **Must NOT do**:
  - Deploy to GitHub Pages (local testing only)
  - Modify any files during testing

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Simple testing and validation task
  - **Skills**: `["playwright"]`
    - `playwright`: For browser automation and visual verification of animations

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential
  - **Blocks**: None (final task)
  - **Blocked By**: Tasks 4, 5

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `.hugo_build.lock` - Indicates Hugo has been run before
  - `public/` directory - Where Hugo generates output

  **API/Type References** (contracts to implement against):
  - Hugo CLI: https://gohugo.io/commands/hugo_server/ - Server command options

  **Test References** (testing patterns to follow):
  - N/A (testing IS this task)

  **Documentation References** (specs and requirements):
  - Hugo server documentation: https://gohugo.io/commands/hugo_server/

  **External References** (libraries and frameworks):
  - N/A

  **WHY Each Reference Matters** (explain the relevance):
  - CLI docs show correct server startup syntax and expected output

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.

  **Agent-Executed QA Scenarios (MANDATORY — per-scenario, ultra-detailed):**

  Scenario: Hugo server starts successfully
    Tool: Bash
    Preconditions: In /home/zishu/workspace/myblog/
    Steps:
      1. hugo server -D --port 1313 > /tmp/hugo.log 2>&1 &
      2. sleep 5
      3. grep -i "Web Server is available" /tmp/hugo.log
      4. Assert: Server started successfully
      5. curl -s http://localhost:1313/ | head -20
      6. Assert: HTML response received
      7. pkill -f "hugo server"
    Expected Result: Hugo server starts, serves HTML
    Evidence: Server log and curl output

  Scenario: CSS and JS files are accessible
    Tool: Bash
    Preconditions: Hugo server running on localhost:1313
    Steps:
      1. curl -s -o /dev/null -w "%{http_code}" http://localhost:1313/css/animations.css
      2. Assert: HTTP 200 (CSS accessible)
      3. curl -s -o /dev/null -w "%{http_code}" http://localhost:1313/js/animations.js
      4. Assert: HTTP 200 (JS accessible)
      5. curl -s http://localhost:1313/ | grep -o 'href="/css/animations.css"'
      6. Assert: CSS linked in HTML
      7. curl -s http://localhost:1313/ | grep -o 'src="/js/animations.js"'
      8. Assert: JS linked in HTML
    Expected Result: CSS and JS files served and linked
    Evidence: curl status codes and grep output

  Scenario: Animation classes present in generated HTML
    Tool: Bash
    Preconditions: Hugo server running
    Steps:
      1. curl -s http://localhost:1313/ | grep -c "post-entry"
      2. Assert: At least one post entry element exists (for hover effects)
      3. curl -s http://localhost:1313/posts/first-post/ | grep -c "post-entry"
      4. Assert: Post pages have entry elements
      5. pkill -f "hugo server"
    Expected Result: HTML structure supports animations
    Evidence: grep counts

  Scenario: Reduced motion media query verified
    Tool: Bash
    Preconditions: CSS file exists
    Steps:
      1. grep -A 20 "prefers-reduced-motion: reduce" static/css/animations.css | grep -c "animation-duration: 0.01ms"
      2. Assert: Animations disabled for reduced motion preference
      3. grep -c "\.reveal" static/css/animations.css
      4. Assert: Reveal classes exist (for scroll animations)
    Expected Result: Accessibility support implemented
    Evidence: grep output

  - [x] Hugo server starts without errors
  - [x] CSS file accessible at `/css/animations.css` (HTTP 200)
  - [x] JS file accessible at `/js/animations.js` (HTTP 200)
  - [x] CSS linked in HTML (`<link>` tag present)
  - [x] JS linked in HTML (`<script>` tag present)
  - [x] HTML contains target elements for animations (`.post-entry`, etc.)
  - [x] `prefers-reduced-motion` media query present in CSS

  **Commit**: YES
  - Message: `feat: add elegant animations (scroll, hover, load, background)`
  - Files: `static/css/animations.css`, `static/js/animations.js`, `layouts/partials/extend_head.html`, `layouts/partials/extend_footer.html`
  - Pre-commit: `hugo server -D` (local test)

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 6 | `feat: add elegant animations (scroll, hover, load, background)` | All created files | `hugo server -D` starts successfully |

---

## Success Criteria

### Verification Commands
```bash
# File structure
ls -la layouts/partials/  # Should show extend_head.html and extend_footer.html
ls -la static/css/animations.css  # Should exist
ls -la static/js/animations.js  # Should exist

# File sizes
wc -c static/css/animations.css  # Should be < 10240
wc -c static/js/animations.js  # Should be < 5120

# Animation presence
grep -c "@keyframes" static/css/animations.css  # Should be >= 5
grep -c "IntersectionObserver" static/js/animations.js  # Should be >= 1

# Accessibility
grep "prefers-reduced-motion" static/css/animations.css  # Should exist

# Local test
hugo server -D  # Should start without errors
curl http://localhost:1313/css/animations.css  # Should return 200
```

### Final Checklist
- [x] All 4 files created (CSS, JS, 2 partials)
- [x] File sizes within limits (CSS <10KB, JS <5KB)
- [x] No theme files modified
- [x] All required animations present (page load, scroll, hover, background)
- [x] Accessibility support included (`prefers-reduced-motion`)
- [x] Local Hugo server runs successfully
- [x] CSS and JS files accessible and linked in HTML
