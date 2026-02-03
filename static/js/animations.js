(function() {
    'use strict';

    const THRESHOLD = 0.1;
    const REVEAL_CLASSES = ['.reveal', '.reveal-left', '.reveal-right'];
    const ACTIVE_CLASS = 'active';

    function initAnimations() {
        if (!('IntersectionObserver' in window)) {
            revealAllElements();
            return;
        }

        const revealElements = document.querySelectorAll(REVEAL_CLASSES.join(', '));

        if (revealElements.length === 0) {
            return;
        }

        const observer = new IntersectionObserver(
            function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(ACTIVE_CLASS);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: THRESHOLD,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        revealElements.forEach(function(element) {
            observer.observe(element);
        });
    }

    function revealAllElements() {
        const revealElements = document.querySelectorAll(REVEAL_CLASSES.join(', '));
        revealElements.forEach(function(element) {
            element.classList.add(ACTIVE_CLASS);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }
})();
