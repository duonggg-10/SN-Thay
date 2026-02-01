// ================================
// MAIN JAVASCRIPT FILE
// Birthday Website for Teacher Điệp
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // ================================
    // DOM ELEMENTS
    // ================================
    const introScreen = document.getElementById('intro-screen');
    const clamContainer = document.getElementById('clam-container');
    const passwordInput = document.getElementById('password-input');
    const submitBtn = document.getElementById('submit-btn');
    const mainContent = document.getElementById('main-content');
    const loadingAnimation = document.getElementById('loading-animation');
    const audio = document.getElementById('bg-music');
    
    // ================================
    // INITIALIZE ALL FEATURES
    // ================================
    
    // 1. Initialize Bubbles
    initBubbles();
    
    // 2. Initialize Clam Interaction
    initClamInteraction();
    
    // 3. Initialize Password Check
    initPasswordCheck();
    
    // ================================
    // FUNCTIONS
    // ================================
    
    /**
     * Create animated bubbles in background
     */
    function initBubbles() {
        const bubbleContainer = document.getElementById('bubble-container');
        if (!bubbleContainer) return;
        
        // Create 20 bubbles
        for (let i = 0; i < 20; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Random size
            const size = Math.random() * 60 + 20;
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            
            // Random position
            bubble.style.left = Math.random() * 100 + '%';
            
            // Random delay
            bubble.style.animationDelay = Math.random() * 5 + 's';
            
            // Random duration
            bubble.style.animationDuration = (Math.random() * 10 + 10) + 's';
            
            bubbleContainer.appendChild(bubble);
        }
    }
    
    /**
     * Handle clam opening interaction
     */
    function initClamInteraction() {
        clamContainer.addEventListener('click', (e) => {
            // Don't trigger if clicking input or button
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            clamContainer.classList.add('is-open');
            passwordInput.focus();
        });
    }
    
    /**
     * Check password and unlock content
     */
    function initPasswordCheck() {
        function checkPassword() {
            const password = passwordInput.value.trim();
            
            if (password === '47') {
                // Show loading animation
                loadingAnimation.style.opacity = '1';
                loadingAnimation.style.pointerEvents = 'all';
                
                // Hide intro screen after 2 seconds
                setTimeout(() => {
                    introScreen.style.opacity = '0';
                    
                    setTimeout(() => {
                        introScreen.style.display = 'none';
                        mainContent.classList.remove('hidden');
                        
                        // Start all main features
                        startMainContent();
                    }, 1000);
                }, 2000);
            } else {
                // Wrong password
                passwordInput.value = '';
                passwordInput.placeholder = 'Sai rồi! Thử lại nhé 😊';
                passwordInput.style.borderColor = '#ff4757';
                
                // Shake animation
                clamContainer.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    clamContainer.style.animation = '';
                    passwordInput.style.borderColor = '';
                    passwordInput.placeholder = 'Sĩ số lớp?';
                }, 500);
            }
        }
        
        // Submit button click
        submitBtn.addEventListener('click', checkPassword);
        
        // Enter key
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
    
    /**
     * Start all main content features
     */
    function startMainContent() {
        // Confetti celebration
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });
            
            // More confetti after 1 second
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                });
                confetti({
                    particleCount: 150,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                });
            }, 1000);
        }
        
        // Initialize all features
        initMusic();
        initTimeCounter();
        initPhotoWall();
        initWishes();
        initCakeAnimation();
        initQuiz();
        initPromise();
        initCustomCursor();
        initScrollTop();
        initRandomRotations();
    }
    
    /**
     * Initialize background music
     */
    function initMusic() {
        const musicToggle = document.getElementById('music-toggle');
        const musicText = musicToggle.querySelector('.music-text');
        const musicIcon = musicToggle.querySelector('.music-icon');
        
        let isPlaying = false;
        let currentTrack = 0;
        
        // Create playlist from server data
        const playlist = musicPlaylistFromServer.map(filename => `/static/music/${filename}`);
        
        if (playlist.length === 0) {
            console.log('No music files found');
            musicToggle.style.display = 'none';
            return;
        }
        
        // Load first track
        function loadTrack(index) {
            audio.src = playlist[index];
        }
        
        // Play music
        function playMusic() {
            audio.play().then(() => {
                isPlaying = true;
                musicText.textContent = 'Music ON';
                musicIcon.textContent = '🎵';
            }).catch(err => {
                console.log('Auto-play prevented. Click to play music.');
            });
        }
        
        // Pause music
        function pauseMusic() {
            audio.pause();
            isPlaying = false;
            musicText.textContent = 'Music OFF';
            musicIcon.textContent = '🔇';
        }
        
        // Toggle music
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                pauseMusic();
            } else {
                if (!audio.src) {
                    loadTrack(currentTrack);
                }
                playMusic();
            }
        });
        
        // Auto-play next track
        audio.addEventListener('ended', () => {
            currentTrack = (currentTrack + 1) % playlist.length;
            loadTrack(currentTrack);
            if (isPlaying) {
                playMusic();
            }
        });
        
        // Auto-start music
        loadTrack(currentTrack);
        playMusic();
    }
    
    /**
     * Initialize time counter
     */
    function initTimeCounter() {
        const startDate = new Date('2025-08-26T07:00:00');
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const patienceBar = document.getElementById('patience-bar');
        const patienceStatus = document.getElementById('patience-status');
        const photoCount = document.getElementById('photo-count');
        
        // Set photo count
        if (photoCount && typeof totalPhotos !== 'undefined') {
            photoCount.textContent = totalPhotos;
        }
        
        function updateCounter() {
            const now = new Date();
            const diff = now - startDate;
            
            // Calculate time units
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Update DOM
            daysEl.textContent = days;
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
            
            // Patience bar logic (decreases every 100 days cycle)
            const daysCycle = days % 100;
            const patience = 100 - daysCycle;
            patienceBar.style.width = patience + '%';
            
            // Update patience percent display
            const percentEl = patienceBar.querySelector('.patience-percent');
            if (percentEl) {
                percentEl.textContent = Math.round(patience) + '%';
            }
            
            // Update status message
            if (patience > 80) {
                patienceStatus.textContent = '😊 Thầy vẫn còn rất kiên nhẫn!';
            } else if (patience > 60) {
                patienceStatus.textContent = '😐 Thầy đang cố gắng giữ bình tĩnh...';
            } else if (patience > 40) {
                patienceStatus.textContent = '😤 Thầy bắt đầu mất kiên nhẫn rồi đấy!';
            } else if (patience > 20) {
                patienceStatus.textContent = '😡 Cẩn thận! Thầy sắp nổi giận!';
            } else {
                patienceStatus.textContent = '🤯 SOS! Tụi em phải ngoan hơn!';
            }
        }
        
        // Update every second
        updateCounter();
        setInterval(updateCounter, 1000);
    }
    
    /**
     * Initialize photo wall with lightbox
     */
    function initPhotoWall() {
        const polaroids = document.querySelectorAll('.polaroid');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeLightbox = document.getElementById('close-lightbox');
        const prevBtn = document.getElementById('prev-photo');
        const nextBtn = document.getElementById('next-photo');
        
        let currentPhotoIndex = 0;
        const photos = Array.from(polaroids);
        
        // Random rotation for each polaroid
        polaroids.forEach((polaroid, index) => {
            const rotation = (Math.random() * 16 - 8); // -8 to 8 degrees
            polaroid.style.setProperty('--r', `${rotation}deg`);
            
            // Click to open lightbox
            polaroid.addEventListener('click', () => {
                currentPhotoIndex = index;
                openLightbox(index);
            });
        });
        
        function openLightbox(index) {
            const photo = photos[index];
            const img = photo.querySelector('img');
            const caption = photo.querySelector('.caption');
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption.textContent;
            lightbox.classList.remove('hidden');
        }
        
        function closeLightboxFn() {
            lightbox.classList.add('hidden');
        }
        
        function showPrevPhoto() {
            currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
            openLightbox(currentPhotoIndex);
        }
        
        function showNextPhoto() {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            openLightbox(currentPhotoIndex);
        }
        
        // Event listeners
        closeLightbox.addEventListener('click', closeLightboxFn);
        prevBtn.addEventListener('click', showPrevPhoto);
        nextBtn.addEventListener('click', showNextPhoto);
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightboxFn();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('hidden')) {
                if (e.key === 'Escape') closeLightboxFn();
                if (e.key === 'ArrowLeft') showPrevPhoto();
                if (e.key === 'ArrowRight') showNextPhoto();
            }
        });
    }
    
    /**
     * Initialize birthday wishes
     */
    function initWishes() {
        const shells = document.querySelectorAll('.shell');
        const wishModal = document.getElementById('wish-modal');
        const modalName = document.getElementById('modal-name');
        const modalMsg = document.getElementById('modal-msg');
        const closeModal = document.getElementById('close-modal');
        
        shells.forEach(shell => {
            shell.addEventListener('click', () => {
                const name = shell.dataset.name;
                const msg = shell.dataset.msg;
                
                modalName.textContent = name;
                modalMsg.textContent = msg;
                wishModal.classList.remove('hidden');
                
                // Confetti effect
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 50,
                        spread: 60,
                        origin: { y: 0.8 }
                    });
                }
            });
        });
        
        function closeWishModal() {
            wishModal.classList.add('hidden');
        }
        
        closeModal.addEventListener('click', closeWishModal);
        
        wishModal.addEventListener('click', (e) => {
            if (e.target === wishModal) {
                closeWishModal();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !wishModal.classList.contains('hidden')) {
                closeWishModal();
            }
        });
    }
    
    /**
     * Initialize birthday cake animation
     */
    function initCakeAnimation() {
        const blowBtn = document.getElementById('blow-candle-btn');
        const flame = document.querySelector('.flame');
        const cake = document.querySelector('.birthday-cake');
        
        if (!blowBtn || !flame) return;
        
        blowBtn.addEventListener('click', () => {
            // Hide flame
            flame.style.opacity = '0';
            flame.style.transform = 'translateX(-50%) scale(0)';
            
            // Huge confetti celebration
            if (typeof confetti === 'function') {
                const duration = 3000;
                const animationEnd = Date.now() + duration;
                
                const interval = setInterval(() => {
                    const timeLeft = animationEnd - Date.now();
                    
                    if (timeLeft <= 0) {
                        clearInterval(interval);
                        // Restore flame
                        setTimeout(() => {
                            flame.style.opacity = '1';
                            flame.style.transform = 'translateX(-50%) scale(1)';
                        }, 2000);
                        return;
                    }
                    
                    confetti({
                        particleCount: 3,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
                    });
                    confetti({
                        particleCount: 3,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
                    });
                }, 30);
            }
            
            // Change button text
            blowBtn.textContent = '🎉 Happy Birthday! 🎉';
            blowBtn.disabled = true;
            
            setTimeout(() => {
                blowBtn.textContent = '🌬️ Thổi nến đi thầy!';
                blowBtn.disabled = false;
            }, 5000);
        });
    }
    
    /**
     * Initialize quiz section
     */
    function initQuiz() {
        const quizBtns = document.querySelectorAll('.quiz-btn');
        const quizResult = document.getElementById('quiz-result');
        
        const responses = {
            'yes': '🎉 Tuyệt vời! Thầy thật là tâm huyết với lớp mình! 10A6 yêu thầy! 💖',
            'no': '😅 Không sao thầy, thầy có danh sách này mà! Đọc lại nha thầy! 📝',
            'maybe': '🤣 Haha! Ít nhất thầy cũng cố gắng rồi! Chúng em tha thứ cho thầy! 😘'
        };
        
        quizBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const answer = btn.dataset.answer;
                quizResult.textContent = responses[answer];
                quizResult.classList.remove('hidden');
                
                // Disable all buttons
                quizBtns.forEach(b => b.disabled = true);
                
                // Small confetti
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            });
        });
    }
    
    /**
     * Initialize promise section with runaway button
     */
    function initPromise() {
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');
        const promiseResult = document.getElementById('promise-result');
        
        // Yes button
        yesBtn.addEventListener('click', () => {
            promiseResult.querySelector('p').innerHTML = 
                '🎊 YÊU THẦY NHẤT! Thầy đã hứa rồi nhé, không được quên đấy! 💖<br><br>' +
                '<strong>Cam kết được ghi nhận vào lúc: ' + new Date().toLocaleString('vi-VN') + '</strong>';
            promiseResult.classList.remove('hidden');
            
            // Mega confetti
            if (typeof confetti === 'function') {
                const duration = 5000;
                const animationEnd = Date.now() + duration;
                
                const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
                
                const interval = setInterval(() => {
                    const timeLeft = animationEnd - Date.now();
                    
                    if (timeLeft <= 0) {
                        clearInterval(interval);
                        return;
                    }
                    
                    const particleCount = 50 * (timeLeft / duration);
                    
                    confetti({
                        particleCount,
                        spread: 360,
                        origin: { 
                            x: Math.random(),
                            y: Math.random() - 0.2
                        },
                        colors: colors
                    });
                }, 250);
            }
            
            // Disable buttons
            yesBtn.disabled = true;
            noBtn.disabled = true;
        });
        
        // No button (runaway)
        let runawayCount = 0;
        noBtn.addEventListener('mouseover', () => {
            runawayCount++;
            
            // Make button run away
            const maxX = window.innerWidth - noBtn.offsetWidth - 50;
            const maxY = window.innerHeight - noBtn.offsetHeight - 50;
            
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            noBtn.style.position = 'fixed';
            noBtn.style.left = randomX + 'px';
            noBtn.style.top = randomY + 'px';
            noBtn.style.transition = 'all 0.3s ease';
            
            // Change text after multiple attempts
            if (runawayCount === 3) {
                noBtn.textContent = '😅 Đuổi không kịp à?';
            } else if (runawayCount === 5) {
                noBtn.textContent = '🏃 Thầy chạy nhanh lắm!';
            } else if (runawayCount === 8) {
                noBtn.textContent = '😂 Bỏ cuộc chưa?';
            } else if (runawayCount === 10) {
                noBtn.textContent = '🤣 OK thôi, chọn Có đi!';
                noBtn.style.background = 'linear-gradient(135deg, #2ed573, #26de81)';
            }
        });
    }
    
    /**
     * Initialize custom cursor
     */
    function initCustomCursor() {
        const cursor = document.getElementById('custom-cursor');
        const trail = document.getElementById('cursor-trail');
        
        if (!cursor || !trail) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;
        
        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth trail effect
        function animateTrail() {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            
            trail.style.left = trailX + 'px';
            trail.style.top = trailY + 'px';
            trail.style.transform = 'translate(-50%, -50%)';
            
            requestAnimationFrame(animateTrail);
        }
        animateTrail();
        
        // Add active state on click
        document.addEventListener('mousedown', () => {
            cursor.classList.add('active');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('active');
        });
    }
    
    /**
     * Initialize scroll to top button
     */
    function initScrollTop() {
        const scrollTopBtn = document.getElementById('scroll-top');
        
        if (!scrollTopBtn) return;
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.pointerEvents = 'all';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.pointerEvents = 'none';
            }
        });
    }
    
    /**
     * Apply random rotations to elements
     */
    function initRandomRotations() {
        // Already handled in initPhotoWall for polaroids
    }
});

// Add shake animation dynamically
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}
`;
document.head.appendChild(style);