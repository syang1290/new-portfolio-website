import React, { useEffect, useRef, useCallback } from 'react';

// --- CONFIGURATION ---
const TEXT_LIST = ["Steve Yang", "UC Irvine", "CS Major", "Developer"];
const WORD_DISPLAY_DURATION = 6500; 
const DEFAULT_FONT_FAMILY = "'Roboto Mono', monospace";

// --- Physics Parameters ---
const initialPhysicsParams = {
    PARTICLE_COUNT_TARGET: 4000,
    PARTICLE_BASE_SIZE: 1.3, // Gets overridden dynamically for mobile
    ATTRACTION_FORCE_BASE: 0.10,
    NOISE_STRENGTH_BASE: 0.4,
    FRICTION: 0.95,
    MOUSE_INTERACTION_RADIUS: 90, // Gets overridden dynamically for mobile
    MOUSE_DISPERSE_STRENGTH: 1.2,
    TRAIL_ALPHA: 0.22
};

const MIN_FONT_SIZE = 10;
const SETTLE_DISTANCE_THRESHOLD = 4;
const SETTLE_ATTRACTION_MULTIPLIER = 0.15;
const SETTLE_NOISE_MULTIPLIER = 0.7;

const thermalPalettes = {
    neutral: ['#4285F4', '#73A9FF', '#DB4437', '#E06666', '#FF69B4', '#8A2BE2', '#DDA0DD', '#9370DB', '#BA55D3', '#C71585', '#E6E6FA'],
};
const PARTICLE_COLORS = [...thermalPalettes.neutral];

class Particle {
    constructor(targetX, targetY, canvasWidth, canvasHeight, physicsParams) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
        this.targetX = targetX;
        this.targetY = targetY;
        this.physicsParams = physicsParams;
        this.baseSize = this.physicsParams.PARTICLE_BASE_SIZE;
        this.size = this.baseSize + Math.random() * (this.baseSize * 0.5);
        this.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
        this.attractionOffset = (Math.random() - 0.5) * 0.04;
        this.noiseOffset = (Math.random() - 0.5) * 0.2;
    }

    update(mouse) {
        if (this.baseSize !== this.physicsParams.PARTICLE_BASE_SIZE) {
            this.baseSize = this.physicsParams.PARTICLE_BASE_SIZE;
        }
        this.size = this.baseSize + Math.random() * (this.baseSize * 0.5);

        const dxTarget = this.targetX - this.x;
        const dyTarget = this.targetY - this.y;
        const distTarget = Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget);

        let currentAttraction = Math.max(0.001, this.physicsParams.ATTRACTION_FORCE_BASE + this.attractionOffset);
        let currentNoise = Math.max(0, this.physicsParams.NOISE_STRENGTH_BASE + this.noiseOffset);

        if (distTarget < SETTLE_DISTANCE_THRESHOLD) {
            currentAttraction *= SETTLE_ATTRACTION_MULTIPLIER;
            currentNoise *= SETTLE_NOISE_MULTIPLIER;
        } else if (distTarget < SETTLE_DISTANCE_THRESHOLD * 4) {
            const factor = Math.max(0, (distTarget - SETTLE_DISTANCE_THRESHOLD) / (SETTLE_DISTANCE_THRESHOLD * 3));
            currentAttraction = currentAttraction * (SETTLE_ATTRACTION_MULTIPLIER + (1 - SETTLE_ATTRACTION_MULTIPLIER) * factor);
            currentNoise = currentNoise * (SETTLE_NOISE_MULTIPLIER + (1 - SETTLE_NOISE_MULTIPLIER) * factor);
        }

        let forceX = 0;
        let forceY = 0;

        if (mouse.x !== undefined && mouse.y !== undefined) {
            const dxMouse = this.x - mouse.x;
            const dyMouse = this.y - mouse.y;
            const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            if (distMouse < this.physicsParams.MOUSE_INTERACTION_RADIUS && distMouse > 0) {
                const angleMouse = Math.atan2(dyMouse, dxMouse);
                const disperseForce = (this.physicsParams.MOUSE_INTERACTION_RADIUS - distMouse) / this.physicsParams.MOUSE_INTERACTION_RADIUS * this.physicsParams.MOUSE_DISPERSE_STRENGTH;
                forceX += Math.cos(angleMouse) * disperseForce;
                forceY += Math.sin(angleMouse) * disperseForce;
                currentAttraction *= 0.1;
            }
        }

        if (distTarget > 0.01) {
            forceX += (dxTarget / distTarget) * currentAttraction * Math.min(distTarget, 100) * 0.1;
            forceY += (dyTarget / distTarget) * currentAttraction * Math.min(distTarget, 100) * 0.1;
        }

        forceX += (Math.random() - 0.5) * currentNoise;
        forceY += (Math.random() - 0.5) * currentNoise;

        this.vx += forceX;
        this.vy += forceY;
        this.vx *= this.physicsParams.FRICTION;
        this.vy *= this.physicsParams.FRICTION;
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.2, this.size), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = Math.min(5, this.size * 1.5);
        ctx.fill();
    }
}

const ParticleTypography = () => {
    const canvasRef = useRef(null);
    const particlesArrayRef = useRef([]);
    const wordTargetPointsRef = useRef([]);
    const mouseRef = useRef({ x: undefined, y: undefined });
    const animationFrameIdRef = useRef(null);
    const physicsParamsRef = useRef({...initialPhysicsParams}); 
    const initialParticleCountCalculatedRef = useRef(false);
    const wordIndexRef = useRef(0);

    const getWordPoints = useCallback((word, mainCanvasWidth, mainCanvasHeight) => {
        if (!word || word.trim() === "" || mainCanvasWidth <= 0 || mainCanvasHeight <= 0) {
            return [{ sourceCanvasWidth: mainCanvasWidth, sourceCanvasHeight: mainCanvasHeight, isEmptyPlaceholder: true }];
        }

        // MOBILE RESPONSIVE LOGIC: Higher resolution sampling for tiny screens
        const isMobile = mainCanvasWidth < 768;
        const SAMPLING_DENSITY = isMobile ? 2 : 4; 
        const WIDTH_CONSTRAINT = isMobile ? 0.95 : 0.85; // Let text stretch wider on phones

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 3000;
        tempCanvas.height = 3000;
        const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });

        const normalizedWord = word.toUpperCase();
        let optimalFontSize = MIN_FONT_SIZE;

        for (let fs = 400; fs >= 10; fs -= 4) {
            tempCtx.font = `bold ${fs}px ${DEFAULT_FONT_FAMILY}`;
            const textWidth = tempCtx.measureText(normalizedWord).width;
            
            if (textWidth < mainCanvasWidth * WIDTH_CONSTRAINT && fs < mainCanvasHeight * 0.45) {
                optimalFontSize = fs;
                break;
            }
        }

        tempCtx.clearRect(0, 0, 3000, 3000);
        tempCtx.font = `bold ${optimalFontSize}px ${DEFAULT_FONT_FAMILY}`;
        tempCtx.fillStyle = 'white';
        tempCtx.textAlign = 'center';
        tempCtx.textBaseline = 'top'; 
        tempCtx.fillText(normalizedWord, 1500, 1000); 

        const imageData = tempCtx.getImageData(0, 0, 3000, 3000);
        const data = imageData.data;
        const rawPoints = [];
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

        // Scan the canvas using dynamic density
        for (let y = 800; y < 2000; y += SAMPLING_DENSITY) {
            for (let x = 500; x < 2500; x += SAMPLING_DENSITY) {
                const alphaIndex = (y * 3000 + x) * 4 + 3;
                if (data[alphaIndex] > 128) {
                    rawPoints.push({ x, y });
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }

        if (rawPoints.length === 0) {
             return [{ sourceCanvasWidth: mainCanvasWidth, sourceCanvasHeight: mainCanvasHeight, isEmptyPlaceholder: true }];
        }

        const actualWidth = maxX - minX;
        const actualHeight = maxY - minY;
        const offsetX = (mainCanvasWidth / 2) - (minX + actualWidth / 2);
        const offsetY = (mainCanvasHeight / 2) - (minY + actualHeight / 2);

        return rawPoints.map(p => ({
            x: p.x + offsetX,
            y: p.y + offsetY,
            sourceCanvasWidth: mainCanvasWidth,
            sourceCanvasHeight: mainCanvasHeight
        }));
    }, []);


    const initParticles = useCallback((forceRepopulateParticles = true, forceRecalculatePoints = true) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // MOBILE RESPONSIVE LOGIC: Adjust particle sizes and counts
        const isMobile = canvas.width < 768;
        physicsParamsRef.current.PARTICLE_BASE_SIZE = isMobile ? 0.8 : 1.3; // Smaller, crisper dots
        physicsParamsRef.current.MOUSE_INTERACTION_RADIUS = isMobile ? 50 : 90; // Smaller touch radius

        const currentWord = TEXT_LIST[wordIndexRef.current % TEXT_LIST.length].toUpperCase();

        if (forceRecalculatePoints || wordTargetPointsRef.current.length === 0 ||
            (wordTargetPointsRef.current.length > 0 && !wordTargetPointsRef.current[0].isEmptyPlaceholder && (wordTargetPointsRef.current[0].sourceCanvasWidth !== canvas.width || wordTargetPointsRef.current[0].sourceCanvasHeight !== canvas.height)) ||
            (wordTargetPointsRef.current.length > 0 && wordTargetPointsRef.current[0].isEmptyPlaceholder && (wordTargetPointsRef.current[0].sourceCanvasWidth !== canvas.width || wordTargetPointsRef.current[0].sourceCanvasHeight !== canvas.height))
        ) {
            wordTargetPointsRef.current = getWordPoints(currentWord, canvas.width, canvas.height);

            if (!initialParticleCountCalculatedRef.current && wordTargetPointsRef.current.length > 0 && !wordTargetPointsRef.current[0].isEmptyPlaceholder) {
                const particleCountStep = 100;
                const particleCountMin = isMobile ? 300 : 500;
                const particleCountMax = isMobile ? 2500 : 10000; // Limit max particles to prevent blobs
                const INITIAL_PARTICLES_PER_TARGET_POINT_RATIO = 1.0;

                let dynamicParticleCount = wordTargetPointsRef.current.length * INITIAL_PARTICLES_PER_TARGET_POINT_RATIO;
                dynamicParticleCount = Math.round(
                    Math.max(particleCountMin, Math.min(particleCountMax, dynamicParticleCount)) / particleCountStep
                ) * particleCountStep;

                physicsParamsRef.current.PARTICLE_COUNT_TARGET = dynamicParticleCount;
                initialParticleCountCalculatedRef.current = true;
            } else if (!initialParticleCountCalculatedRef.current) {
                 initialParticleCountCalculatedRef.current = true;
            }
        }

        if (forceRepopulateParticles || particlesArrayRef.current.length !== physicsParamsRef.current.PARTICLE_COUNT_TARGET) {
            particlesArrayRef.current = [];
            const count = physicsParamsRef.current.PARTICLE_COUNT_TARGET;
            if (wordTargetPointsRef.current.length === 0 || (wordTargetPointsRef.current.length > 0 && wordTargetPointsRef.current[0].isEmptyPlaceholder)) {
                for (let i = 0; i < count; i++) {
                    particlesArrayRef.current.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, canvas.width, canvas.height, physicsParamsRef.current));
                }
            } else {
                for (let i = 0; i < count; i++) {
                    const targetPoint = wordTargetPointsRef.current[i % wordTargetPointsRef.current.length];
                    particlesArrayRef.current.push(new Particle(targetPoint.x, targetPoint.y, canvas.width, canvas.height, physicsParamsRef.current));
                }
            }
        } else {
            particlesArrayRef.current.forEach((p, i) => {
                if (wordTargetPointsRef.current.length > 0 && !wordTargetPointsRef.current[0].isEmptyPlaceholder) {
                    const targetPoint = wordTargetPointsRef.current[i % wordTargetPointsRef.current.length];
                    p.targetX = targetPoint.x;
                    p.targetY = targetPoint.y;
                } else {
                    p.targetX = Math.random() * canvas.width;
                    p.targetY = Math.random() * canvas.height;
                }
                p.baseSize = physicsParamsRef.current.PARTICLE_BASE_SIZE;
            });
        }
    }, [getWordPoints]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.fillStyle = `rgba(0, 0, 0, ${physicsParamsRef.current.TRAIL_ALPHA})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';

        particlesArrayRef.current.forEach(particle => {
            particle.update(mouseRef.current);
            particle.draw(ctx);
        });
        
        ctx.shadowBlur = 0; 
        ctx.shadowColor = 'transparent';
        animationFrameIdRef.current = requestAnimationFrame(animate);
    }, []);

    const adjustLayout = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const newCanvasWidth = window.innerWidth;
        const newCanvasHeight = window.innerHeight;
        if (canvas.width !== newCanvasWidth || canvas.height !== newCanvasHeight) {
            canvas.width = newCanvasWidth;
            canvas.height = newCanvasHeight;
            initParticles(false, true); 
        }
    }, [initParticles]);

    useEffect(() => {
        let isMounted = true; 
        const canvasElement = canvasRef.current;
        if (!canvasElement) return;

        canvasElement.width = window.innerWidth;
        canvasElement.height = window.innerHeight;

        document.body.style.fontFamily = "'Inter', sans-serif"; 
        document.body.style.overscrollBehavior = 'none';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.classList.add('bg-black', 'text-gray-100');

        let intervalId;

        const startApp = () => {
            if (!isMounted) return; 

            adjustLayout(); 
            initParticles(true, true); 
            if (!animationFrameIdRef.current) animate();

            intervalId = setInterval(() => {
                wordIndexRef.current = (wordIndexRef.current + 1) % TEXT_LIST.length;
                initParticles(false, true); 
            }, WORD_DISPLAY_DURATION);
        };

        const fontInter = new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2)');
        const fontRobotoMono = new FontFace('Roboto Mono', 'url(https://fonts.gstatic.com/s/robotomono/v22/L0x5DF4xlVMF-BfR8bXMIjhGq3-cXbKDO1k.woff2)');
        
        Promise.all([fontInter.load(), fontRobotoMono.load()])
            .then((loadedFonts) => {
                loadedFonts.forEach(font => document.fonts.add(font));
                document.fonts.ready.then(startApp); 
            })
            .catch(() => {
                startApp(); 
            });

        const handleMouseMove = (event) => {
            const rect = canvasElement.getBoundingClientRect();
            mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        };
        const handleMouseLeave = () => {
            mouseRef.current = { x: undefined, y: undefined };
        };
        const handleTouchMove = (event) => {
            event.preventDefault();
            const rect = canvasElement.getBoundingClientRect();
            if (event.touches.length > 0) {
                mouseRef.current = { x: event.touches[0].clientX - rect.left, y: event.touches[0].clientY - rect.top };
            }
        };
        const handleTouchEnd = () => {
            mouseRef.current = { x: undefined, y: undefined };
        };

        canvasElement.addEventListener('mousemove', handleMouseMove);
        canvasElement.addEventListener('mouseleave', handleMouseLeave);
        canvasElement.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvasElement.addEventListener('touchend', handleTouchEnd);
        canvasElement.addEventListener('touchcancel', handleTouchEnd);

        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (animationFrameIdRef.current) {
                    cancelAnimationFrame(animationFrameIdRef.current);
                    animationFrameIdRef.current = null;
                }
                requestAnimationFrame(() => {
                    adjustLayout();
                    if (!animationFrameIdRef.current) animate(); 
                });
            }, 250);
        };
        window.addEventListener('resize', handleResize);

        return () => { 
            isMounted = false; 
            clearInterval(intervalId);
            cancelAnimationFrame(animationFrameIdRef.current);
            canvasElement.removeEventListener('mousemove', handleMouseMove);
            canvasElement.removeEventListener('mouseleave', handleMouseLeave);
            canvasElement.removeEventListener('touchmove', handleTouchMove);
            canvasElement.removeEventListener('touchend', handleTouchEnd);
            canvasElement.removeEventListener('touchcancel', handleTouchEnd);
            window.removeEventListener('resize', handleResize);
            
            document.body.style.fontFamily = "";
            document.body.classList.remove('bg-black', 'text-gray-100');
        };
    }, [adjustLayout, animate, initParticles]);

    return (
        <canvas 
            ref={canvasRef} 
            style={{ display: 'block', backgroundColor: '#000000', borderRadius: 0 }}
            className="w-full h-full"
        />
    );
};

export default ParticleTypography;