# Canvas 动画优化计划

## TL;DR

> **任务**: 优化博客背景动画效果
> 
> **目标**:
> - 更新 Canvas 动画为优化的内联脚本
> - 移除点阵背景（画面更干净）
> - Canvas opacity 从 0.3 提升到 1（完全可见）
> 
> **预计时间**: 5-10 分钟

---

## 上下文

### 当前状态
- 博客使用外部 JS 文件（`sakura-stars.js` 和 `animations.js`）
- CSS 有点阵背景（`radial-gradient`）
- Canvas 透明度为 0.3（太淡）

### 优化目标
1. **内联脚本**: 将 Canvas 动画直接嵌入到 footer，减少 HTTP 请求
2. **移除点阵**: 让背景更干净，突出动画效果
3. **完全可见**: Canvas opacity 设为 1

---

## 工作目标

### 核心任务
优化 Canvas 背景动画的视觉效果和性能。

### 具体交付物
- 更新的 `layouts/partials/extend_footer.html`（内联 Canvas 脚本）
- 修改的 `assets/css/extended/custom.css`（移除点阵，opacity: 1）

---

## TODOs

- [x] 1. 更新 extend_footer.html

  **操作**:
  - 移除外部 JS 引用
  - 添加优化的内联 Canvas 脚本
  - 脚本包含：
    - 樱花花瓣绘制（椭圆，粉色渐变）
    - 星星绘制（四角星形，金色/白色）
    - 旋转动画
    - 深色模式自适应
  
  **新内容** (完整替换):
  ```html
  <!-- Background Animation Script -->
  <script>
  (function() {
    'use strict';
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = null;
    let particles = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function initParticles() {
      const count = Math.floor((width * height) / 20000);
      particles = [];
      for (let i = 0; i < count; i++) {
        const isSpecial = Math.random() > 0.85;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isSpecial ? Math.random() * 3 + 1.5 : Math.random() * 2 + 0.5,
          speed: isSpecial ? Math.random() * 0.5 + 0.2 : Math.random() * 0.5 + 0.1,
          wind: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          isSpecial: isSpecial
        });
      }
    }

    function drawPetal(x, y, radius, rotation, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 2, radius, 0, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 2);
      gradient.addColorStop(0, `rgba(255, 220, 230, ${opacity})`);
      gradient.addColorStop(1, `rgba(255, 180, 200, ${opacity * 0.5})`);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    }

    function drawStar(x, y, radius, rotation, opacity, isGold) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      const spikes = 4;
      const outerRadius = radius * 1.5;
      const innerRadius = radius * 0.7;
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      if (isGold) {
        ctx.fillStyle = `rgba(255, 230, 150, ${opacity})`;
        ctx.shadowColor = 'rgba(255, 215, 100, 0.5)';
        ctx.shadowBlur = 5;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      }
      ctx.fill();
      ctx.restore();
    }

    function drawCircle(x, y, radius, opacity, isDark) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      if (isDark) {
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      } else {
        ctx.fillStyle = `rgba(255, 200, 210, ${opacity * 0.8})`;
      }
      ctx.fill();
    }

    function animate() {
      if (document.hidden || reducedMotion.matches) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y += p.speed;
        p.x += p.wind;
        p.rotation += p.rotationSpeed;
        if (p.y > height) { p.y = -10; p.x = Math.random() * width; }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
        if (isDarkMode) {
          if (p.isSpecial) { drawStar(p.x, p.y, p.radius, p.rotation, p.opacity, true); }
          else { drawCircle(p.x, p.y, p.radius, p.opacity, true); }
        } else {
          if (p.isSpecial) { drawPetal(p.x, p.y, p.radius, p.rotation, p.opacity); }
          else { drawCircle(p.x, p.y, p.radius, p.opacity, false); }
        }
      });
      animationId = requestAnimationFrame(animate);
    }

    function start() {
      if (!animationId) { resize(); initParticles(); animate(); }
    }

    window.addEventListener('resize', () => { resize(); initParticles(); });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => { isDarkMode = e.matches; });
    start();
  })();
  </script>
  ```

  **验证**:
  - [ ] 文件包含内联脚本
  - [ ] 无外部 JS 引用

- [x] 2. 修改 custom.css

  **操作**:
  - 找到 `html, body` 样式块
  - 注释掉或删除点阵背景代码
  - 修改 Canvas opacity 为 1
  
  **具体修改**:
  
  找到（约第 37-46 行）:
  ```css
  html, body {
    background-color: var(--bg-color) !important;
    background-image: radial-gradient(var(--dot-color) 1px, transparent 1px) !important;
    background-size: 24px 24px !important;
    ...
  }
  
  canvas {
    opacity: 0.3 !important;
  ```
  
  改为:
  ```css
  html, body {
    background-color: var(--bg-color) !important;
    /* 移除点阵背景 */
    color: var(--text-main) !important;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
    line-height: 1.8 !important;
    -webkit-font-smoothing: antialiased !important;
  }
  
  canvas {
    opacity: 1 !important;
    z-index: -1 !important;
  }
  ```

  **验证**:
  - [ ] 点阵背景已注释或删除
  - [ ] Canvas opacity: 1
  - [ ] Canvas z-index: -1

- [x] 3. 验证构建并部署

  **操作**:
  - 运行 `hugo --minify` 验证构建成功
  - 提交更改
  - 推送到 GitHub
  
  **验证**:
  - [ ] Hugo 构建成功（退出码 0）
  - [ ] Git 提交成功
  - [ ] 推送到 GitHub 成功

---

## 执行策略

### 任务依赖
- 任务 1 和 任务 2 可以**并行执行**
- 任务 3 依赖任务 1 和 2

### 代理分配
- **任务 1**: `delegate_task(category="quick", load_skills=["frontend-ui-ux"])`
- **任务 2**: `delegate_task(category="quick", load_skills=["frontend-ui-ux"])`
- **任务 3**: `delegate_task(category="quick", load_skills=["git-master"])`

---

## 验证标准

### 验证命令
```bash
# 1. 检查 footer 是否包含内联脚本
grep -c "createCanvas" layouts/partials/extend_footer.html
# 预期: Count >= 1

# 2. 检查是否移除了点阵背景
grep -c "radial-gradient" assets/css/extended/custom.css
# 预期: Count = 0 (或已注释)

# 3. 检查 Canvas opacity
grep "opacity.*1.*important" assets/css/extended/custom.css | grep canvas
# 预期: 找到 canvas { ... opacity: 1 !important; }

# 4. Hugo 构建验证
hugo --minify
# 预期: 退出码 0
```

### 最终清单
- [ ] Footer 包含完整的内联 Canvas 脚本
- [ ] 点阵背景已移除
- [ ] Canvas opacity 设为 1
- [ ] Canvas z-index 设为 -1
- [ ] Hugo 构建成功
- [ ] 已推送到 GitHub

---

## 成功标准

### 视觉效果
- ✅ 白天：浅灰白背景 + 粉色樱花飘落
- ✅ 夜晚：深空黑背景 + 金色/白色星星闪烁
- ✅ 动画流畅（60 FPS）
- ✅ 无点阵干扰（画面干净）

### 技术指标
- ✅ 减少两个 HTTP 请求（移除外部 JS）
- ✅ Canvas 完全可见（opacity: 1）
- ✅ 正确的层级（z-index: -1）
- ✅ 深色模式自动切换

---

## 部署后

**在线网址**: https://zishu-lab.github.io/zishu.github.io/

**验证要点**:
1. 刷新页面查看动画效果
2. 检查白天/夜间模式切换
3. 确认无点阵背景
4. 确认动画清晰可见
