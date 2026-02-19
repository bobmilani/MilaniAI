// Scroll-triggered animations
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

// Nav scroll effect
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    nav.classList.toggle('scrolled', currentScroll > 50);
    lastScroll = currentScroll;
}, { passive: true });

// Mobile menu toggle
const toggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    toggle.classList.toggle('active');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const position = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: position, behavior: 'smooth' });
        }
    });
});

// Easter egg vinyl player
const vinylBtn = document.getElementById('vinyl-btn');
const vinylPlayer = document.getElementById('vinyl-player');
const audio = document.getElementById('manifesto-audio');
const vinylProgress = document.getElementById('vinyl-progress');
const vinylProgressBar = document.getElementById('vinyl-progress-bar');
const vinylTime = document.getElementById('vinyl-time');

if (vinylBtn && audio) {
    vinylBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            vinylBtn.classList.add('spinning');
            vinylPlayer.classList.add('visible');
        } else {
            audio.pause();
            vinylBtn.classList.remove('spinning');
        }
    });

    audio.addEventListener('timeupdate', () => {
        const pct = (audio.currentTime / audio.duration) * 100;
        vinylProgress.style.width = pct + '%';
        const cur = Math.floor(audio.currentTime);
        const dur = Math.floor(audio.duration) || 30;
        vinylTime.textContent = `${Math.floor(cur / 60)}:${String(cur % 60).padStart(2, '0')} / ${Math.floor(dur / 60)}:${String(dur % 60).padStart(2, '0')}`;
    });

    audio.addEventListener('ended', () => {
        vinylBtn.classList.remove('spinning');
        vinylProgress.style.width = '0%';
        vinylTime.textContent = '0:00 / 3:58';
    });

    vinylProgressBar.addEventListener('click', (e) => {
        const rect = vinylProgressBar.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pct * audio.duration;
    });
}

// Legal page TOC active state
const tocLinks = document.querySelectorAll('.legal-toc a');
if (tocLinks.length > 0) {
    const tocObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    tocLinks.forEach((link) => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.legal-toc a[href="#${entry.target.id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        },
        { threshold: 0.1, rootMargin: '-100px 0px -60% 0px' }
    );
    document.querySelectorAll('.legal-content h2[id]').forEach((heading) => tocObserver.observe(heading));
}
