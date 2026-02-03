// 简单的雪花效果 - 模仿 weilv.space
(function() {
  'use strict';
  
  // 创建雪花
  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animation = `fall ${5 + Math.random() * 5}s linear`;
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = (10 + Math.random() * 10) + 'px';
    snowflake.style.color = 'white';
    
    document.body.appendChild(snowflake);
    
    // 动画结束后移除元素
    setTimeout(() => {
      snowflake.remove();
    }, 10000);
  }
  
  // 定期生成雪花
  function startSnow() {
    setInterval(createSnowflake, 300);
  }
  
  // 页面加载完成后启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startSnow);
  } else {
    startSnow();
  }
})();
