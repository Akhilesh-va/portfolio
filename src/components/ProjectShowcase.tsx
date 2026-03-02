import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, ExternalLink, Github, Zap, Layers, Smartphone, Check } from 'lucide-react';
import bagBuddyImg from '../assets/youbagbuddy.png';
import bidCraftImg from '../assets/bidcraft.png';

const projects = [
    {
        id: 1,
        title: 'Book Transpo',
        color: '#f87060',
        mockup: 'https://play-lh.googleusercontent.com/5T8Jwlikle_G8sJlh0w4pkTzfqYJ7q-PpAeJho-VVe1VyH4oOb-kXPIEAiJsGkrXLko=w480-h960',
        link: 'https://play.google.com/store/apps/details?id=com.booktranspo.users&hl=en_IN',
        tags: ['Android', 'Ktor', 'WebSockets', 'MongoDB'],
        description: 'Full-stack Android + Ktor backend powering real-time ride and transport operations.',
        problem: 'A ride-booking platform needed real-time location, multilingual address handling, and seamless business integration — without visible lag.',
        architecture: 'Developed Ktor backend with JWT auth and MongoDB. Unified user and transport apps under secure APIs. Built AI voice booking with multi-provider STT/TTS.',
        metrics: [
            'Reduced API latency by 40% via threading optimization',
            'Integrated full Google Maps stack (geocoding, routes)',
            'One backend, two apps, real-time workflows'
        ]
    },
    {
        id: 2,
        title: 'Your Bag Buddy AI',
        color: '#cdd7d6',
        mockup: bagBuddyImg,
        github: 'https://github.com/Akhilesh-va/YourBagBuddyAI',
        tags: ['Compose', 'Node.js', 'OpenRouter AI', 'WorkManager'],
        description: 'AI-generated packing lists powered by Node/Express backend and OpenRouter AI.',
        problem: 'Needed a scalable way to generate dynamic, intelligent travel checklists while handling device constraints and background synchronizations.',
        architecture: 'Kotlin + Jetpack Compose frontend. Node/Express backend deployed on Vercel. MongoDB with validated AI schemas. Shared checklist collaboration.',
        metrics: [
            'Reliable AI integration with cost-efficient prompts',
            'Smart reminders using WorkManager',
            'Production-ready backend architecture'
        ]
    },
    {
        id: 3,
        title: 'Bid Craft Agent',
        color: '#8B5CF6',
        mockup: bidCraftImg,
        github: 'https://github.com/Akhilesh-va/BidCraft-Agent-App',
        tags: ['Clean Architecture', 'Real-Time Systems', 'Node Backend', 'JWT Auth'],
        description: 'Built to ensure fairness, transparency, and immediate feedback in fast-moving bidding environments.',
        problem: 'Bidding processes are often slow, opaque, and fragmented. Users lack real-time visibility into their competitiveness or outbid status. In fast-moving environments, manual coordination and even seconds of delay mean lost opportunities.',
        architecture: 'Clean Architecture separating domain, data, and presentation layers. Reactive UI powered by StateFlow. Modular Android and Node backend integration featuring real-time bid state synchronization, server-side bid validation logic, and secure JWT-based authentication.',
        metrics: [
            'Instant bid status updates',
            'Real-time ranking visibility',
            'Secure and validated bidding flow',
            'Reduced uncertainty during live bidding',
            'Designed for scalable, multi-user environments'
        ]
    }
];

// Reusable 3D Tilt Card
function TiltCard({ project, onClick }: { project: typeof projects[0], onClick: () => void }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-[320px] h-[600px] rounded-[2rem] bg-black/40 border border-white/10 cursor-pointer shadow-2xl transition-colors duration-300 hover:border-primary/50 group"
        >
            {/* Phone Screen Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-white/10 rounded-b-xl w-32 mx-auto z-20" />

            {/* Mockup Image Layer */}
            <div
                style={{ transform: "translateZ(30px)" }}
                className="absolute inset-0 m-2 rounded-[1.5rem] overflow-hidden bg-zinc-950"
            >
                <img
                    src={project.mockup}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Content Layer over Image */}
            <div
                style={{ transform: "translateZ(60px)" }}
                className="absolute bottom-0 inset-x-0 p-6 flex flex-col pointer-events-none"
            >
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{project.title}</h3>
                <p className="text-sm text-gray-300 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/10 text-white backdrop-blur-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 40px ${project.color}40`, transform: "translateZ(-1px)" }} />
        </motion.div>
    );
}

export function ProjectShowcase() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const selectedProject = projects.find(p => p.id === selectedId);

    return (
        <section id="projects" className="w-full bg-background py-20 px-6 lg:px-24 flex flex-col relative">
            <div className="text-center mb-16 z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Featured <span className="text-primary">Projects</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Deep dives into complex challenges and their robust architectural solutions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 place-items-center max-w-7xl mx-auto w-full z-10 perspective-[1000px]">
                {projects.map((project) => (
                    <motion.div layoutId={`project-container-${project.id}`} key={project.id} className="flex justify-center w-full">
                        <TiltCard project={project} onClick={() => setSelectedId(project.id)} />
                    </motion.div>
                ))}
            </div>

            {/* Full Screen Modal */}
            <AnimatePresence>
                {selectedId && selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
                            onClick={() => setSelectedId(null)}
                        />

                        <motion.div
                            layoutId={`project-container-${selectedProject.id}`}
                            className="w-full max-w-5xl max-h-[90vh] bg-background overflow-y-auto overflow-hidden rounded-3xl z-10 pointer-events-auto flex flex-col lg:flex-row relative border border-white/10 shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/50 hover:bg-black rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Left Side: Huge Mockup */}
                            <div className="w-full lg:w-2/5 h-[400px] lg:h-auto relative">
                                <img src={selectedProject.mockup} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-zinc-900 lg:bg-gradient-to-t" />
                            </div>

                            {/* Right Side: Details */}
                            <div className="w-full lg:w-3/5 p-6 lg:p-8 flex flex-col">
                                <h3 className="text-3xl font-bold text-white mb-2" style={{ color: selectedProject.color }}>
                                    {selectedProject.title}
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    {selectedProject.tags.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="space-y-5 flex-1">
                                    <section>
                                        <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-1.5">
                                            <Zap size={18} className="text-primary" /> The Problem
                                        </h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{selectedProject.problem}</p>
                                    </section>

                                    <section>
                                        <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-1.5">
                                            <Layers size={18} className="text-secondary" /> Architecture
                                        </h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{selectedProject.architecture}</p>
                                    </section>

                                    <section>
                                        <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-1.5">
                                            <Smartphone size={18} className="text-[#b3a394]" /> Key Highlights & Impact
                                        </h4>
                                        <ul className="space-y-2">
                                            {selectedProject.metrics.map((metric, i) => (
                                                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                                    <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                                    <span className="leading-snug">{metric}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    {(selectedProject as any).link ? (
                                        <a href={(selectedProject as any).link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-primary text-black text-sm font-bold rounded-lg hover:bg-primary/80 transition-colors">
                                            <ExternalLink size={16} /> View on Play Store
                                        </a>
                                    ) : (
                                        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors">
                                            <ExternalLink size={16} /> View Case Study
                                        </button>
                                    )}
                                    {(selectedProject as any).github ? (
                                        <a href={(selectedProject as any).github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors">
                                            <Github size={16} /> View Source
                                        </a>
                                    ) : (
                                        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors">
                                            <Github size={16} /> Source
                                        </button>
                                    )}
                                </div>

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
