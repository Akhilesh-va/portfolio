import { useEffect } from 'react';
import Lenis from 'lenis';

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
            autoRaf: true,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        return () => {
            lenis.destroy();
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
