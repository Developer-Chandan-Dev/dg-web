"use client";
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

/**
 * BubbleField Component
 *
 * @param {number} count - How many bubbles to render (default: 30)
 * @param {number} speed - Speed factor (1 = normal, <1 = slower, >1 = faster) (default: 0.5)
 */
const BubbleField = ({ count = 30, speed = 0.5 }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const createBubble = () => {
            const bubble = document.createElement('div');

            // Reduced size: 4–12px
            const size = gsap.utils.random(4, 12);
            const x = gsap.utils.random(0, container.offsetWidth - size);

            // Balanced pastel-like colors for both light and dark mode
            const colors = [
                'rgba(255, 182, 193, 0.7)', // light pink
                'rgba(173, 216, 230, 0.6)', // light blue
                'rgba(144, 238, 144, 0.6)', // light green
                'rgba(221, 160, 221, 0.6)', // plum
                'rgba(255, 250, 205, 0.5)', // lemon chiffon
                'rgba(255, 255, 255, 0.2)', // soft white glow
                'rgba(0, 0, 0, 0.1)'        // subtle dark bubble (visible in light mode)
            ];
            const color = gsap.utils.random(colors);

            Object.assign(bubble.style, {
                position: 'absolute',
                bottom: '-40px',
                left: `${x}px`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: color,
                opacity: 0.8,
                pointerEvents: 'none',
                zIndex: 0,
            });

            container.appendChild(bubble);

            // Animate upward with slight left-right movement
            gsap.fromTo(
                bubble,
                { y: 0, x: 0, scale: 1, opacity: 0.8 },
                {
                    y: -window.innerHeight - 60,
                    x: `random(-20, 20)`,
                    scale: gsap.utils.random(0.5, 0.9),
                    opacity: 0,
                    duration: gsap.utils.random(10, 16),
                    ease: 'none',
                    onComplete: () => {
                        container.removeChild(bubble);
                        createBubble();
                    },
                }
            );
        };

        // Spawn bubbles with a slight stagger
        for (let i = 0; i < count; i++) {
            gsap.delayedCall(i * 0.15, createBubble);
        }

        // Apply speed factor
        gsap.globalTimeline.timeScale(speed);

        return () => {
            gsap.globalTimeline.timeScale(1);
            gsap.killTweensOf('*');
            container.innerHTML = '';
        };
    }, [count, speed]);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed inset-0 overflow-hidden z-0"
        />
    );
};

export default BubbleField;
