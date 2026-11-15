/**
 * ==============================================================================
 * 💖 SPECIAL ROMANTIC EXPERIENCE (EXACT REPLICA)
 * ==============================================================================
 * All image and text configurations are organized clearly below.
 * You can replace any photo in the `image/photos/` folder or change text here!
 */

const CONFIG = {
    // 🎵 Audio
    music: 'music/music.mp3',

    // ⏱️ Countdown (in seconds)
    countdown: 3,

    // 🌧️ Matrix falling letters and neon colors
    matrixText: 'AYAHAMOUDY',
    matrixColor1: '#ff69b4',
    matrixColor2: '#ff1493',

    // ✨ Glowing Particle Words Sequence
    sequence: ["I'M", "TRULY", "SORRY", "MY", "LOVE", "AYA", "آية", "حبيبة حمودي", "❤"],
    sequenceColor: '#ff69b4',

    // 🐱 Center Cute Gif
    giftGif: 'image/happy5.gif',

    // 📖 Book Pages:
    // [0] = Front Cover
    // [1] = Page 1 (Left), [2] = Page 2 (Right) + note
    // [3] = Page 3 (Left), [4] = Page 4 (Right) + note
    pages: [
        {
            image: 'image/theend.jpg'
        },
        {
            image: 'image/photos/b1.png'
        },
        {
            image: 'image/photos/b2.png',
            content: 'آية.. حبيبة حمودي ونور عينه وعمري كله ❤️'
        },
        {
            image: 'image/photos/b3.png'
        },
        {
            image: 'image/photos/b4.png',
            content: 'كل ما بشوف ضحكتك، بتفكرني إني أكون أحسن نسخة من نفسي عشانك.. بحبك يا آية 💕'
        }
    ],

    // ❤️ Enable Flying Heart Photos Formation at the end of the book
    enableHeart: true
};

// ==============================================================================
// 1. STATE & GLOBAL VARIABLES
// ==============================================================================
let isStarted = false;
let isPlaying = false;
let matrixInterval = null;
let currentPage = 0;
let isFlipping = false;
let isBookFinished = false;
let typewriterTimeout = null;
let photoUrls = [];

// ==============================================================================
// 2. MATRIX RAIN EFFECT
// ==============================================================================
let matrixChars = CONFIG.matrixText.split('');

function initMatrixRain() {
    const matrixCanvas = document.getElementById('matrix-rain');
    if (!matrixCanvas) return;
    const matrixCtx = matrixCanvas.getContext('2d');

    matrixCanvas.style.display = 'block';
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const isMobile = window.innerWidth <= 768;
    const fontSize = isMobile ? 14 : 24;
    const intervalTime = isMobile ? 44 : 50;

    const columns = Math.floor(matrixCanvas.width / fontSize);
    const drops = [];
    const columnColors = [];
    const delays = [];
    const started = [];
    const maxLength = Math.floor(matrixCanvas.height / fontSize) + 2;

    for (let x = 0; x < columns; x++) {
        drops[x] = 0;
        columnColors[x] = x % 2 === 0 ? CONFIG.matrixColor1 : CONFIG.matrixColor2;
        delays[x] = Math.random() * 2000;
        started[x] = false;
    }

    let startTime = Date.now();

    function drawMatrixRain() {
        matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        matrixCtx.font = 'bold ' + fontSize + "px Menlo, Consolas, monospace";

        const currentTime = Date.now();

        for (let i = 0; i < drops.length; i++) {
            if (!started[i] && currentTime - startTime >= delays[i]) {
                started[i] = true;
            }

            if (started[i] && drops[i] < maxLength) {
                const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                const color = columnColors[i];

                matrixCtx.fillStyle = color;
                matrixCtx.shadowColor = color;
                matrixCtx.shadowBlur = 8;
                matrixCtx.fillText(text, x, y);
                matrixCtx.shadowBlur = 0;
            }

            if (started[i]) {
                drops[i]++;
            }

            if (drops[i] >= maxLength) {
                drops[i] = 0;
                delays[i] = Math.random() * 1000;
                started[i] = false;
            }
        }
    }

    if (matrixInterval) clearInterval(matrixInterval);
    matrixInterval = setInterval(drawMatrixRain, intervalTime);
}

function stopMatrixRain() {
    if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
    }
    const matrixCanvas = document.getElementById('matrix-rain');
    if (matrixCanvas) {
        matrixCanvas.style.display = 'none';
    }
}

// ==============================================================================
// 3. SHAPE SHIFTER PARTICLE ENGINE (Kenneth Cachia Shape Shifter Math)
// ==============================================================================
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 105, b: 180 };
}

const S = {
    Drawing: (function () {
        let canvas, context, renderFn;
        const requestFrame = window.requestAnimationFrame || function (cb) { setTimeout(cb, 1000 / 60); };

        return {
            init: function (el) {
                canvas = document.querySelector(el);
                context = canvas.getContext('2d');
                this.adjustCanvas();
                window.addEventListener('resize', () => this.adjustCanvas());
            },
            loop: function (fn) {
                renderFn = !renderFn ? fn : renderFn;
                this.clearFrame();
                renderFn();
                requestFrame.call(window, this.loop.bind(this));
            },
            adjustCanvas: function () {
                if (!canvas) return;
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            },
            clearFrame: function () {
                if (!context || !canvas) return;
                context.clearRect(0, 0, canvas.width, canvas.height);
            },
            getArea: function () {
                return { w: canvas ? canvas.width : window.innerWidth, h: canvas ? canvas.height : window.innerHeight };
            },
            drawCircle: function (p, c) {
                context.fillStyle = c.render();
                context.beginPath();
                context.arc(p.x, p.y, p.z, 0, 2 * Math.PI, true);
                context.closePath();
                context.fill();
            }
        };
    })(),

    Point: function (args) {
        this.x = args.x;
        this.y = args.y;
        this.z = args.z;
        this.a = args.a;
        this.h = args.h;
    },

    Color: function (r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
};

S.Color.prototype.render = function () {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
};

S.Dot = function (x, y) {
    const isMobile = window.innerWidth <= 768;
    this.p = new S.Point({
        x: x,
        y: y,
        z: isMobile ? 2 : 4,
        a: 1,
        h: 0
    });
    this.e = 0.07;
    this.s = true;
    const rgb = hexToRgb(CONFIG.sequenceColor);
    this.c = new S.Color(rgb.r, rgb.g, rgb.b, this.p.a);
    this.t = this.clone();
    this.q = [];
};

S.Dot.prototype = {
    clone: function () {
        return new S.Point({ x: this.x, y: this.y, z: this.z, a: this.a, h: this.h });
    },
    _draw: function () {
        const rgb = hexToRgb(CONFIG.sequenceColor);
        this.c.r = rgb.r;
        this.c.g = rgb.g;
        this.c.b = rgb.b;
        this.c.a = this.p.a;
        S.Drawing.drawCircle(this.p, this.c);
    },
    _moveTowards: function (n) {
        const dx = this.p.x - n.x;
        const dy = this.p.y - n.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const e = this.e * d;

        if (this.p.h === -1) {
            this.p.x = n.x;
            this.p.y = n.y;
            return true;
        }

        if (d > 1) {
            this.p.x -= (dx / d) * e;
            this.p.y -= (dy / d) * e;
        } else {
            if (this.p.h > 0) this.p.h--;
            else return true;
        }
        return false;
    },
    _update: function () {
        if (this._moveTowards(this.t)) {
            const p = this.q.shift();
            if (p) {
                this.t.x = p.x || this.p.x;
                this.t.y = p.y || this.p.y;
                this.t.z = p.z || this.p.z;
                this.t.a = p.a || this.p.a;
                this.p.h = p.h || 0;
            } else {
                if (this.s) {
                    const isMobile = window.innerWidth <= 768;
                    const amplitude = isMobile ? 0.1 : 3.142;
                    this.p.x -= Math.sin(Math.random() * amplitude);
                    this.p.y -= Math.sin(Math.random() * amplitude);
                } else {
                    this.move(new S.Point({
                        x: this.p.x + (Math.random() * 50) - 25,
                        y: this.p.y + (Math.random() * 50) - 25
                    }));
                }
            }
        }
        const d = this.p.a - this.t.a;
        this.p.a = Math.max(0.1, this.p.a - (d * 0.05));
    },
    move: function (p, avoidStatic) {
        const dx = this.p.x - p.x;
        const dy = this.p.y - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (!avoidStatic || (avoidStatic && d > 1)) {
            this.q.push(p);
        }
    },
    render: function () {
        this._update();
        this._draw();
    }
};

S.ShapeBuilder = (function () {
    const shapeCanvas = document.createElement('canvas');
    const shapeContext = shapeCanvas.getContext('2d');
    const fontFamily = "'Cairo', 'Segoe UI', Tahoma, Avenir, Helvetica Neue, Arial, sans-serif";

    function getGap() {
        return (window.innerWidth <= 768) ? 4 : 8;
    }

    function fit() {
        const gap = getGap();
        shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap;
        shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap;
        shapeContext.fillStyle = 'red';
        shapeContext.textBaseline = 'middle';
        shapeContext.textAlign = 'center';
    }

    function processCanvas() {
        const gap = getGap();
        const pixels = shapeContext.getImageData(0, 0, shapeCanvas.width, shapeCanvas.height).data;
        const dots = [];
        let x = 0, y = 0, fx = shapeCanvas.width, fy = shapeCanvas.height, w = 0, h = 0;

        for (let p = 0; p < pixels.length; p += (4 * gap)) {
            if (pixels[p + 3] > 0) {
                dots.push(new S.Point({ x: x, y: y }));
                w = x > w ? x : w;
                h = y > h ? y : h;
                fx = x < fx ? x : fx;
                fy = y < fy ? y : fy;
            }
            x += gap;
            if (x >= shapeCanvas.width) {
                x = 0;
                y += gap;
                p += gap * 4 * shapeCanvas.width;
            }
        }
        return { dots: dots, w: w + fx, h: h + fy };
    }

    function setFontSize(s) {
        shapeContext.font = 'bold ' + s + 'px ' + fontFamily;
    }

    fit();
    window.addEventListener('resize', fit);

    return {
        letter: function (l) {
            const isMobile = window.innerWidth <= 768;
            const baseFontSize = isMobile ? 240 : 480;
            setFontSize(baseFontSize);

            let widthMultiplier = 0.8;
            if (l === '❤' || l === '❤️') {
                widthMultiplier = 0.45;
            } else if (window.innerWidth < window.innerHeight) {
                widthMultiplier = 0.65;
            }

            const s = Math.min(
                baseFontSize,
                (shapeCanvas.width / shapeContext.measureText(l).width) * widthMultiplier * baseFontSize,
                (shapeCanvas.height / baseFontSize) * (!isNaN(parseFloat(l)) ? 0.8 : 0.35) * baseFontSize
            );

            setFontSize(s);
            shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
            shapeContext.fillText(l, shapeCanvas.width / 2, shapeCanvas.height / 2);
            return processCanvas();
        }
    };
})();

S.Shape = (function () {
    const dots = [];
    let width = 0, height = 0, cx = 0, cy = 0;

    function compensate() {
        const a = S.Drawing.getArea();
        cx = a.w / 2 - width / 2;
        cy = a.h / 2 - height / 2;
    }

    function getDotParams() {
        const isMobile = window.innerWidth <= 768;
        return isMobile
            ? { minSize: 1, maxSize: 4, minZ: 2 }
            : { minSize: 3, maxSize: 12, minZ: 4 };
    }

    return {
        switchShape: function (n, fast) {
            const a = S.Drawing.getArea();
            width = n.w;
            height = n.h;
            compensate();

            const params = getDotParams();

            if (n.dots.length > dots.length) {
                const diff = n.dots.length - dots.length;
                for (let d = 0; d < diff; d++) {
                    dots.push(new S.Dot(a.w / 2, a.h / 2));
                }
            }

            let d = 0;
            while (n.dots.length > 0) {
                const i = Math.floor(Math.random() * n.dots.length);
                const isMobile = window.innerWidth <= 768;
                dots[d].e = isMobile ? 0.35 : 0.11;

                if (dots[d].s) {
                    dots[d].move(new S.Point({
                        z: Math.random() * (params.maxSize - params.minSize) + params.minSize,
                        a: Math.random(),
                        h: 18
                    }));
                } else {
                    dots[d].move(new S.Point({
                        z: Math.random() * params.minZ + params.minZ,
                        h: fast ? 18 : 30
                    }));
                }

                dots[d].s = true;
                dots[d].move(new S.Point({
                    x: n.dots[i].x + cx,
                    y: n.dots[i].y + cy,
                    a: 1,
                    z: params.minZ,
                    h: 0
                }));

                n.dots = n.dots.slice(0, i).concat(n.dots.slice(i + 1));
                d++;
            }

            for (let i = d; i < dots.length; i++) {
                if (dots[i].s) {
                    dots[i].move(new S.Point({
                        z: Math.random() * (params.maxSize - params.minSize) + params.minSize,
                        a: Math.random(),
                        h: 20
                    }));
                    dots[i].s = false;
                    dots[i].e = 0.04;
                    dots[i].move(new S.Point({
                        x: Math.random() * a.w,
                        y: Math.random() * a.h,
                        a: 0.3,
                        z: Math.random() * params.minZ,
                        h: 0
                    }));
                }
            }
        },

        render: function () {
            for (let d = 0; d < dots.length; d++) {
                dots[d].render();
            }
        }
    };
})();

// ==============================================================================
// 4. SEQUENCE CONTROLLER
// ==============================================================================
function runSequence() {
    const canvas = document.querySelector('.canvas');
    if (canvas) canvas.style.display = 'block';

    S.Drawing.init('.canvas');
    S.Drawing.loop(() => S.Shape.render());

    // Step 1: Countdown 3, 2, 1
    let count = CONFIG.countdown;
    const isMobile = window.innerWidth <= 768;
    const countInterval = isMobile ? 1300 : 1400;

    const countTimer = setInterval(() => {
        if (count > 0) {
            S.Shape.switchShape(S.ShapeBuilder.letter(count.toString()), true);
            count--;
        } else {
            clearInterval(countTimer);
            startWordsSequence();
        }
    }, countInterval);
}

function startWordsSequence() {
    const words = [...CONFIG.sequence];
    const isMobile = window.innerWidth <= 768;
    const baseDelay = isMobile ? 1700 : 1900;

    function nextWord() {
        if (words.length > 0) {
            const word = words.shift();
            S.Shape.switchShape(S.ShapeBuilder.letter(word));
            const extra = Math.max(0, (word.length - 5) * 100);
            setTimeout(nextWord, baseDelay + extra);
        } else {
            // Sequence completed -> Trigger Gift and Starry transition
            setTimeout(triggerGiftCelebration, 1200);
        }
    }

    nextWord();
}

// ==============================================================================
// 5. STARRY SKY & FLOATING HEARTS
// ==============================================================================
function showStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    container.innerHTML = '';
    container.style.display = 'block';

    const starCount = 120;
    const starSizes = ['small', 'medium', 'large'];
    const frag = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = `star ${starSizes[Math.floor(Math.random() * starSizes.length)]}`;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 1.5) + 's';
        star.style.animationDelay = (Math.random() * 2) + 's';
        frag.appendChild(star);
    }
    container.appendChild(frag);
}

function startFloatingHearts() {
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💞'];
    let count = 0;
    const maxHearts = 30;

    function spawn() {
        if (count >= maxHearts) return;
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.fontSize = (Math.random() * 18 + 14) + 'px';
        document.body.appendChild(heart);
        count++;

        setTimeout(() => heart.remove(), 4000);
        if (count < maxHearts) {
            setTimeout(spawn, 1500);
        }
    }
    spawn();
}

// ==============================================================================
// 6. GIFT CELEBRATION -> SHOW 3D BOOK
// ==============================================================================
function triggerGiftCelebration() {
    // Hide particle canvas and matrix rain
    const canvas = document.querySelector('.canvas');
    if (canvas) canvas.style.display = 'none';
    stopMatrixRain();

    // Show starry space background & floating hearts
    showStars();
    startFloatingHearts();

    // Show cute cat gif in the center
    const giftImg = document.getElementById('gift-image');
    if (giftImg) {
        giftImg.src = CONFIG.giftGif;
        giftImg.style.display = 'block';
        giftImg.style.animation = 'giftCelebration 2s ease-in-out';

        setTimeout(() => {
            giftImg.style.display = 'none';
            openBookAlbum();
        }, 3000);
    } else {
        openBookAlbum();
    }
}

// ==============================================================================
// 7. 3D FLIPPABLE BOOK ALBUM
// ==============================================================================
function calculatePageZIndexes() {
    const book = document.getElementById('book');
    if (!book) return;
    const pages = book.querySelectorAll('.page');
    const total = pages.length;

    pages.forEach((page, idx) => {
        const normalZ = total - idx;
        const flippedZ = idx + 1;
        page.style.setProperty('--page-z-index', normalZ.toString());
        page.style.setProperty('--page-flipped-z-index', flippedZ.toString());
    });
}

function createPages() {
    const book = document.getElementById('book');
    if (!book) return;
    book.innerHTML = '';

    const totalPages = CONFIG.pages.length;
    const physicalPages = Math.ceil(totalPages / 2);

    for (let i = 0; i < physicalPages; i++) {
        const page = document.createElement('div');
        page.className = 'page';
        page.dataset.page = i;

        const frontIndex = i * 2;
        const backIndex = frontIndex + 1;

        // Front Face
        const front = document.createElement('div');
        front.className = 'page-front';
        if (frontIndex < totalPages && CONFIG.pages[frontIndex].image) {
            const img = document.createElement('img');
            img.src = CONFIG.pages[frontIndex].image;
            front.appendChild(img);
        } else {
            front.className += ' empty-page';
        }

        // Back Face
        const back = document.createElement('div');
        back.className = 'page-back';
        if (backIndex < totalPages && CONFIG.pages[backIndex].image) {
            const img = document.createElement('img');
            img.src = CONFIG.pages[backIndex].image;
            back.appendChild(img);
        } else {
            // End cover image
            const endImg = document.createElement('img');
            endImg.src = CONFIG.pages[0].image || 'image/theend.jpg';
            back.appendChild(endImg);
        }

        page.appendChild(front);
        page.appendChild(back);
        book.appendChild(page);

        // Click / Tap listener for turning
        page.addEventListener('click', (e) => {
            if (isFlipping) return;
            const rect = page.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const pageWidth = rect.width;

            if (clickX < pageWidth / 2 && page.classList.contains('flipped')) {
                prevPage();
            } else if (clickX >= pageWidth / 2 && !page.classList.contains('flipped')) {
                nextPage();
            }
        });
    }

    calculatePageZIndexes();
    photoUrls = CONFIG.pages.filter(p => p.image).map(p => p.image);
}

function openBookAlbum() {
    const book = document.getElementById('book');
    const bookContainer = document.querySelector('.book-container');
    if (!book || !bookContainer) return;

    createPages();
    bookContainer.style.display = 'block';
    bookContainer.classList.add('show');
    book.style.display = 'block';

    book.style.opacity = '0';
    book.style.transform = 'scale(0.8) translateY(40px)';
    book.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    requestAnimationFrame(() => {
        book.style.opacity = '1';
        book.style.transform = 'scale(1) translateY(0)';
    });
}

function nextPage() {
    const book = document.getElementById('book');
    const physicalPages = book.querySelectorAll('.page');
    const totalPhysical = physicalPages.length;

    if (currentPage < totalPhysical && !isFlipping) {
        const pageToFlip = physicalPages[currentPage];
        if (pageToFlip && !pageToFlip.classList.contains('flipped')) {
            isFlipping = true;
            pageToFlip.classList.add('flipping');

            setTimeout(() => {
                pageToFlip.classList.remove('flipping');
                pageToFlip.classList.add('flipped');
                currentPage++;
                isFlipping = false;
                showPageContent();
                checkIfBookFinished();
            }, 400);
        }
    }
}

function prevPage() {
    const book = document.getElementById('book');
    const physicalPages = book.querySelectorAll('.page');

    if (currentPage > 0 && !isFlipping) {
        isFlipping = true;
        currentPage--;
        const pageToFlip = physicalPages[currentPage];
        pageToFlip.classList.add('flipping');

        setTimeout(() => {
            pageToFlip.classList.remove('flipping');
            pageToFlip.classList.remove('flipped');
            isFlipping = false;
            showPageContent();
            isBookFinished = false;
        }, 400);
    }
}

function typewriterEffect(el, text, speed = 35) {
    return new Promise((resolve) => {
        el.innerHTML = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                el.innerHTML += text.charAt(i);
                i++;
                typewriterTimeout = setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

async function showPageContent() {
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    const contentDisplay = document.getElementById('contentDisplay');
    const contentText = document.getElementById('contentText');
    if (!contentDisplay || !contentText) return;

    let logicalIndex = 0;
    if (currentPage === 0) {
        logicalIndex = 0;
    } else {
        logicalIndex = currentPage * 2;
    }

    const note = CONFIG.pages[logicalIndex]?.content;
    if (note) {
        contentDisplay.classList.add('show');
        contentText.innerHTML = '';
        await typewriterEffect(contentText, note);
    } else {
        contentDisplay.classList.remove('show');
    }
}

function checkIfBookFinished() {
    const book = document.getElementById('book');
    const physicalPages = book.querySelectorAll('.page');
    const lastPage = physicalPages[physicalPages.length - 1];

    if (currentPage >= physicalPages.length && lastPage && lastPage.classList.contains('flipped')) {
        if (!isBookFinished) {
            isBookFinished = true;
            const contentDisplay = document.getElementById('contentDisplay');
            if (contentDisplay) contentDisplay.classList.remove('show');

            setTimeout(() => {
                if (CONFIG.enableHeart) {
                    triggerHeartPhotoClimax();
                }
            }, 1000);
        }
    }
}

// ==============================================================================
// 8. CLIMAX: FIREWORKS, CONFETTI & 3D HEART PHOTO MOSAIC
// ==============================================================================
function triggerHeartPhotoClimax() {
    const book = document.getElementById('book');
    const bookContainer = document.querySelector('.book-container');
    if (book) book.style.display = 'none';
    if (bookContainer) bookContainer.style.display = 'none';

    // Fireworks & Confetti
    showFireworks();
    showConfettiBurst();

    // Flying photos into Heart
    spawnHeartPhotos();
}

function showFireworks() {
    const container = document.getElementById('fireworkContainer');
    if (!container) return;
    container.innerHTML = '';
    container.style.opacity = '1';

    const frag = document.createDocumentFragment();
    for (let i = 0; i < 20; i++) {
        const fw = document.createElement('div');
        fw.className = 'firework';
        fw.style.transform = `rotate(${i * 18}deg) translateY(-40px)`;
        frag.appendChild(fw);
    }
    container.appendChild(frag);

    setTimeout(() => {
        container.style.opacity = '0';
    }, 1200);
}

function showConfettiBurst() {
    const colors = ['#ff6f91', '#ff9671', '#ffc75f', '#f9f871', '#ff3c78'];
    for (let i = 0; i < 60; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        c.style.left = (window.innerWidth / 2 + (Math.random() * 80 - 40)) + 'px';
        c.style.top = (window.innerHeight / 2 + (Math.random() * 80 - 40)) + 'px';
        c.style.setProperty('--dx', (Math.random() * 500 - 250) + 'px');
        c.style.setProperty('--dy', (Math.random() * 500 - 250) + 'px');
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 2500);
    }
}

function spawnHeartPhotos() {
    const totalPhotos = 30;
    const centerX = window.innerWidth * 0.5;
    const centerY = window.innerHeight * 0.5;

    const isMobile = window.innerWidth <= 768 || window.innerHeight <= 500;
    const scale = isMobile ? 8 : 16;

    let index = 0;
    function spawnNext() {
        if (index >= totalPhotos) return;

        const photoUrl = photoUrls[index % photoUrls.length];
        const photo = document.createElement('img');
        photo.src = photoUrl;
        photo.className = 'photo';

        // Parametric Heart Formula
        const t = (index / totalPhotos) * 2 * Math.PI;
        const sin_t = Math.sin(t);
        const cos_t = Math.cos(t);
        const targetX = scale * 16 * Math.pow(sin_t, 3);
        const targetY = -scale * (13 * cos_t - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        photo.style.left = centerX + 'px';
        photo.style.top = centerY + 'px';
        photo.style.opacity = '0';
        photo.style.transform = 'translate(-50%, -50%) scale(0)';
        document.body.appendChild(photo);

        requestAnimationFrame(() => {
            photo.style.opacity = '1';
            photo.style.transform = 'translate(-50%, -50%) scale(1)';
            photo.style.left = (centerX + targetX) + 'px';
            photo.style.top = (centerY + targetY) + 'px';
        });

        index++;
        setTimeout(spawnNext, 80);
    }

    spawnNext();
}

// ==============================================================================
// 9. AUDIO & INITIAL SCREEN LISTENER
// ==============================================================================
function startExperience() {
    if (isStarted) return;
    isStarted = true;

    // 1. Hide Initial Screen with fade out
    const initialScreen = document.getElementById('initial-screen');
    if (initialScreen) {
        initialScreen.style.opacity = '0';
        setTimeout(() => {
            initialScreen.style.display = 'none';
        }, 800);
    }

    // 2. Play Background Audio
    const audio = document.getElementById('birthdayAudio');
    const musicBtn = document.getElementById('musicControl');
    if (audio) {
        audio.src = CONFIG.music;
        audio.volume = 0.7;
        audio.play().then(() => {
            isPlaying = true;
            if (musicBtn) {
                musicBtn.innerHTML = '⏸';
                musicBtn.classList.add('playing');
            }
        }).catch(err => {
            console.log('Audio autoplay prevented:', err);
        });
    }

    // 3. Start Matrix Rain & Particle Sequence
    initMatrixRain();
    runSequence();
}

// Music Play/Pause Toggle Button
const musicControlBtn = document.getElementById('musicControl');
if (musicControlBtn) {
    musicControlBtn.addEventListener('click', () => {
        const audio = document.getElementById('birthdayAudio');
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            musicControlBtn.innerHTML = '▶';
            musicControlBtn.classList.remove('playing');
            isPlaying = false;
        } else {
            audio.play().then(() => {
                musicControlBtn.innerHTML = '⏸';
                musicControlBtn.classList.add('playing');
                isPlaying = true;
            });
        }
    });
}

// Start upon first tap anywhere on initial screen
document.addEventListener('DOMContentLoaded', () => {
    const initialScreen = document.getElementById('initial-screen');
    if (initialScreen) {
        initialScreen.addEventListener('click', startExperience, { once: true });
        initialScreen.addEventListener('touchstart', startExperience, { once: true });
    }
});
