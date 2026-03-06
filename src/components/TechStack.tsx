import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        title: 'Mobile',
        items: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Hilt', 'Room', 'Retrofit']
    },
    {
        title: 'Architecture',
        items: ['Clean Architecture', 'MVVM', 'MVI', 'SOLID', 'UDF']
    },
    {
        title: 'Backend',
        items: ['Ktor', 'Node.js', 'MongoDB', 'JWT', 'REST APIs']
    },
    {
        title: 'Services',
        items: ['Firebase', 'Google Maps', 'Cloudinary', 'OpenRouter AI']
    },
    {
        title: 'Tooling',
        items: ['Cursor', 'Android Studio', 'Git', 'Vercel']
    }
];

export function TechStack() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.tech-card',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%'
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-background py-20 px-6 lg:px-24 flex flex-col justify-center relative overflow-hidden">
            <div className="text-center mb-16 z-10 transition-colors duration-300">
                <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-white mb-4">
                    The <span className="text-secondary">Arsenal</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Modern tools to build fast, scalable, and maintainable systems.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full z-10 relative perspective-[1000px]">
                {categories.map((category, idx) => (
                    <div key={idx} className="tech-card bg-text/5 dark:bg-black/20 border border-text/10 dark:border-white/10 rounded-2xl p-8 hover:bg-text/10 dark:hover:bg-black/40 hover:border-text/20 dark:hover:border-white/20 transition-all duration-300 group">
                        <h3 className="text-2xl font-bold text-text dark:text-white mb-6 group-hover:text-secondary transition-colors">{category.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {category.items.map(item => (
                                <span key={item} className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-text/5 border border-text/10 dark:bg-white/5 dark:border-white/5 rounded-full backdrop-blur-sm group-hover:border-text/20 dark:group-hover:border-white/10 transition-colors">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Subtle mesh background element */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.05),transparent_50%)] pointer-events-none" />
        </section>
    );
}
