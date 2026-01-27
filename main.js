/* 
   MYNEWSTAFF.AI | JESKO MOTION
   GSAP + SCROLLTRIGGER SCROLL-SCRUB
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Parallax Backgrounds (Subtle Flow)
    const parallaxBgs = gsap.utils.toArray('.bg-layer');
    parallaxBgs.forEach(bg => {
        const speed = bg.dataset.speed || 0.2;
        gsap.to(bg, {
            yPercent: 30 * speed,
            scale: 1.1, // Slight pulse
            ease: "none",
            scrollTrigger: {
                trigger: bg.parentNode,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 3. Section Transitions ("Disintegration" Flow)
    const sections = gsap.utils.toArray('section');

    sections.forEach((section, i) => {

        // Z-Index: Ascending order
        section.style.zIndex = i + 1;

        // Next section handling
        // ONLY apply pinning if there is actually a next section AND the current section is full height
        if (i < sections.length - 1) {
            const nextSection = sections[i + 1];

            // Pin current section
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                pin: true,
                pinSpacing: false,
                end: "bottom top",
                id: `pin-${i}`,
                // Only enable pinning on taller pages/sections where it makes sense
                // or if we are not on a mobile device where height: auto is set
                invalidateOnRefresh: true
            });

            // DISINTEGRATION EFFECT:
            const reveal = section.querySelector('.reveal');

            if (reveal) {
                gsap.to(reveal, {
                    scale: 0.75,         // Shrink significantly
                    opacity: 0,          // Fade out completely
                    filter: "blur(25px)", // Heavy cinematic blur
                    y: -150,             // Move UP as if flying away
                    transformOrigin: "center top",
                    ease: "power2.in",   // Accelerate out
                    scrollTrigger: {
                        trigger: nextSection,
                        start: "top bottom", // Starts when next section appears at bottom
                        end: "top 20%",      // Done before next section touches top (no hard lines)
                        scrub: true
                    }
                });
            }
        }

        // Entrance: "Emerging from the fog"
        // Elements slide UP and fade IN from a blur
        if (i > 0) {
            const reveal = section.querySelector('.reveal');
            gsap.fromTo(reveal,
                { y: 150, opacity: 0, filter: "blur(20px)" }, // Start deep, transparent, blurred
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.5,
                    ease: "power2.out", // Smooth landing
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%", // Start animation earlier
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    // 4. Shimmer Animation
    const shimmers = gsap.utils.toArray('.shimmer');
    shimmers.forEach(el => {
        gsap.to(el, {
            backgroundPosition: '200% center',
            duration: 15,
            repeat: -1,
            ease: 'none'
        });
    });

    // 5. Nav Visibility (Smart Hide)
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const nav = document.querySelector('.nav');

        // Only hide if we've scrolled down a bit
        if (currentScroll > lastScroll && currentScroll > 100) {
            gsap.to(nav, { y: -150, duration: 0.8, ease: "power3.out" });
        } else {
            gsap.to(nav, { y: 0, duration: 0.8, ease: "power3.out" });
        }
        lastScroll = currentScroll;
    });

});
