/**
 * Scroll Progress Bar Module
 * Maneja la visualización del progreso de lectura de forma optimizada.
 */

(function() {
    const updateProgress = () => {
        const progressBar = document.getElementById('scrollProgress');
        if (!progressBar) return;

        const winScroll = window.scrollY || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (height > 0) {
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        } else {
            progressBar.style.width = "0%";
        }
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Inicializar al cargar el DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateProgress);
    } else {
        updateProgress();
    }
})();
