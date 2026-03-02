import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Smartphone, Radio, ShieldCheck, BrainCircuit } from 'lucide-react';

const items = [
    {
        title: "Production Android Apps",
        description: "Kotlin + Jetpack Compose apps built with Clean Architecture and real-world usage in mind.",
        icon: Smartphone,
        color: "from-blue-500 to-cyan-400"
    },
    {
        title: "Real-Time Systems",
        description: "Voice-enabled ride booking, live messaging, FCM notifications, and synchronized session handling.",
        icon: Radio,
        color: "from-green-500 to-emerald-400"
    },
    {
        title: "Secure Backends",
        description: "Ktor and Node/Express APIs with JWT authentication, MongoDB models, and public/private route separation.",
        icon: ShieldCheck,
        color: "from-purple-500 to-fuchsia-400"
    },
    {
        title: "AI Integrations That Don't Break",
        description: "Multi-provider STT/TTS, OpenRouter AI with strict JSON schemas, timeout-safe clients, and cost-aware iteration.",
        icon: BrainCircuit,
        color: "from-orange-500 to-rose-400"
    }
];

export function WhatIShipSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    // Floating Particles
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        size: Math.random() * 6 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
    }));

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    return (
        <section ref={containerRef} className="w-full bg-background py-24 px-6 lg:px-24 flex flex-col relative overflow-hidden">
            {/* Dark Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.02)_2px,transparent_2px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

            {/* Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
                    animate={{
                        y: [`${p.y}vh`, `${p.y - 20}vh`],
                        x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`],
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                    className="absolute rounded-full bg-primary blur-[2px] pointer-events-none z-0"
                    style={{ width: p.size, height: p.size }}
                />
            ))}

            <div className="text-center mb-20 z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">What</span> I Ship
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-24 h-1 bg-gradient-to-r from-primary to-green-300 mx-auto rounded-full"
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto z-10"
            >
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm overflow-hidden group hover:border-white/10 transition-colors duration-500"
                    >
                        {/* Hover Gradient Overlay */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${item.color} transition-opacity duration-500`} />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-800/80 mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                <item.icon className="w-7 h-7 text-white" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                {item.title}
                            </h3>

                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                {item.description}
                            </p>
                        </div>

                        {/* Decorative glow behind icon */}
                        <div className={`absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br ${item.color} rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0`} />
                    </motion.div>
                ))}
            </motion.div>

        </section>
    );
}
