import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    useEffect(() => {
        // Force scroll to top on reload
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        const lenis = new Lenis({
            autoRaf: false, // critical! disable to run purely on gsap's ticker
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        // Sync Lenis with GSAP ScrollTrigger to prevent animation breaking on scroll in production
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
        };
    }, []);

    return (
        <main className="relative min-h-screen w-full bg-background selection:bg-primary/30 selection:text-primary">
            {/* Background radial gradient for premium feel */}
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(61,220,132,0.03)_0%,rgba(11,15,25,1)_100%)] z-[-1]" />
            {children}
        </main>
    );
}
