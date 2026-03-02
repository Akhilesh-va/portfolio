import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, Github, Linkedin, Mail, Cpu } from 'lucide-react';

export function ContactSection() {
    const [typedCommand, setTypedCommand] = useState('');
    const [showResult, setShowResult] = useState(false);
    const command = '> hire("akhilesh")';

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setTypedCommand(command.slice(0, index));
            index++;
            if (index > command.length) {
                clearInterval(interval);
                setTimeout(() => setShowResult(true), 800);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full bg-background py-20 px-6 lg:px-24 flex flex-col items-center justify-center relative">
            <div className="text-center mb-12 z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Let's Build <span className="text-primary">Something That Ships.</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Open to Android and mobile-focused roles.
                </p>
            </div>

            <div className="w-full max-w-3xl glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 flex flex-col">
                {/* Terminal Header */}
                <div className="h-12 bg-black/40 border-b border-white/10 flex items-center px-4 justify-between">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
                        <Terminal size={14} /> terminal ~ bash
                    </div>
                    <div className="w-16" /> {/* Spacer */}
                </div>

                {/* Terminal Body */}
                <div className="p-6 md:p-8 font-mono text-sm md:text-base min-h-[350px] flex flex-col">
                    <div className="flex items-center text-primary mb-2">
                        <span className="text-blue-400 font-bold mr-2">akhilesh@macbook</span> <span className="text-gray-400">~/portfolio</span>
                    </div>

                    <div className="text-white flex mb-6">
                        <span className="mr-2 text-primary">{typedCommand}</span>
                        {!showResult && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2.5 h-5 bg-primary block"
                            />
                        )}
                    </div>

                    <AnimatePresence>
                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex-1 flex flex-col text-gray-300"
                            >
                                <div className="mb-4 text-[#b3a394]">Executing profile initialization... [OK]</div>
                                <div className="mb-6">Contact parameters loaded successfully:</div>

                                <div className="flex flex-col gap-4 mb-10">
                                    <a href="mailto:akhileshbltr2002@gmail.com" className="flex items-center gap-4 hover:text-white transition-colors group cursor-pointer w-fit">
                                        <Mail size={18} className="text-secondary group-hover:text-primary transition-colors" />
                                        <span>akhileshbltr2002@gmail.com</span>
                                    </a>

                                    <a href="https://linkedin.com/in/akhileshsinghmaurya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-white transition-colors group cursor-pointer w-fit">
                                        <Linkedin size={18} className="text-secondary group-hover:text-primary transition-colors" />
                                        <span>LinkedIn</span>
                                    </a>
                                    <a href="https://github.com/Akhilesh-va" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-white transition-colors group cursor-pointer w-fit">
                                        <Github size={18} className="text-secondary group-hover:text-primary transition-colors" />
                                        <span>GitHub</span>
                                    </a>
                                    <div className="flex items-center gap-4 text-gray-400 mt-2">
                                        <span className="text-primary font-bold">Location:</span> Noida, India
                                    </div>
                                </div>

                                <div className="mt-auto flex flex-col md:flex-row items-center gap-6 border-t border-zinc-800 pt-6">
                                    <a href="mailto:akhileshbltr2002@gmail.com" className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-primary text-zinc-950 font-bold rounded-lg hover:bg-primary/90 transition-all glow-green">
                                        <Send size={18} /> Send Message
                                    </a>
                                    <span className="text-gray-500 text-xs flex items-center gap-2">
                                        <Cpu size={14} /> System ready for new connections.
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <footer className="w-full mt-32 border-t border-zinc-800 pt-8 pb-4 text-center text-gray-500 text-sm z-10">
                <p>© {new Date().getFullYear()} Akhilesh S. Built with React, Tailwind & Framer Motion.</p>
            </footer>
        </section>
    );
}
