import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ExternalLink, Menu, X, ChevronDown } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Particle background effect
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 2
            }}
          />
        ))}
      </div>
    );
  };

  // Floating Navbar
  const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'];

    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            HA
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setActiveSection(item.toLowerCase())}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-gray-900 px-6 py-4 space-y-4"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-300 hover:text-cyan-400"
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveSection(item.toLowerCase());
                }}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </motion.nav>
    );
  };

  // Hero Section
  const Hero = () => {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <ParticleBackground />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Hi, I'm Harish Anand.
            </motion.h1>
            
            <motion.p
              className="text-2xl md:text-3xl text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              I build intelligent robotic systems that see, think, and act.
            </motion.p>

            <motion.p
              className="text-lg md:text-xl text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Robotics & AI Engineer | M.S. Robotics & Autonomous Systems @ ASU
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold flex items-center gap-2 hover:from-cyan-600 hover:to-blue-700 transition-all"
              >
                🚀 View Projects
              </motion.a>
              
              <motion.a
                href="https://drive.google.com/uc?export=download&id=1rFuNqo-OMrq_Q8rbGYi4zAUv_A6Hxn1O"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold flex items-center gap-2 hover:from-purple-600 hover:to-pink-700 transition-all"
              >
                <Download size={20} /> Download Resume
              </motion.a>
            </motion.div>

            <motion.div
              className="flex justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.a
                href="https://linkedin.com/in/harish-anand-123456789"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={32} />
              </motion.a>
              <motion.a
                href="https://github.com/HarishAnand-hub"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Github size={32} />
              </motion.a>
              <motion.a
                href="mailto:harishanand077@gmail.com"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Mail size={32} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ opacity }}
        >
          <ChevronDown size={40} className="text-cyan-400" />
        </motion.div>
      </section>
    );
  };

  // About Section
  const About = () => {
    return (
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  I'm a Robotics and AI Engineer passionate about developing autonomous systems 
                  that combine intelligence, precision, and adaptability. Currently pursuing my 
                  Master's in Robotics and Autonomous Systems at Arizona State University, I focus 
                  on perception, decision-making, and control systems for intelligent machines.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  My work spans computer vision, deep learning, and robotic manipulation—bridging 
                  the gap between theoretical AI and real-world robotic applications that make a difference.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6 rounded-lg border border-cyan-500/20">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">🎓 Education</h3>
                  <p className="text-gray-300">M.S. Robotics and Autonomous Systems</p>
                  <p className="text-gray-400 text-sm">Arizona State University (2026)</p>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-lg border border-purple-500/20">
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">💻 Background</h3>
                  <p className="text-gray-300">B.Tech Computer Science & Engineering</p>
                  <p className="text-gray-400 text-sm">VIT Chennai (2025) — CGPA: 8.14/10</p>
                </div>

                <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-6 rounded-lg border border-pink-500/20">
                  <h3 className="text-xl font-semibold text-pink-400 mb-2">⚙️ Focus Areas</h3>
                  <p className="text-gray-300">Robotics • Computer Vision • Deep Learning • Autonomous Systems</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Projects Section
  const Projects = () => {
    const projects = [
      {
        title: '🤖 Autonomous Tic-Tac-Toe Robot with AI',
        description: 'Integrated computer vision + Minimax AI + Dobot for real-time gameplay. Achieved 98.5% detection accuracy with multi-method image processing. Deployed undefeated system using alpha–beta pruned Minimax.',
        tech: ['Python', 'OpenCV', 'AI', 'Dobot', 'Computer Vision'],
        github: 'https://github.com/HarishAnand-hub',
        gradient: 'from-cyan-500 to-blue-600'
      },
      {
        title: '🏗️ Vision-Guided Robotic Palletization',
        description: 'End-to-end YOLOv8 + motion planning pipeline for object sorting. Achieved sub-2mm precision and 100% classification accuracy with real-time robotic manipulation.',
        tech: ['YOLOv8', 'ROS', 'Python', 'Motion Planning'],
        github: 'https://github.com/HarishAnand-hub',
        gradient: 'from-purple-500 to-pink-600'
      },
      {
        title: '💓 Deep Learning for Heart Attack Prediction',
        description: 'Hybrid Xception + ResNet50 model for ECG-based diagnosis achieving 94.2% accuracy. Published at IEEE ICCCT 2025.',
        tech: ['TensorFlow', 'Keras', 'Deep Learning', 'Medical AI'],
        github: 'https://github.com/HarishAnand-hub',
        paper: 'https://doi.org/10.1109/example',
        gradient: 'from-pink-500 to-red-600'
      },
      {
        title: '⚽ Real-Time Football Detection & Tracking',
        description: 'YOLOv8-based custom object tracker achieving 87% mAP at 30 FPS. Optimized for real-time sports analytics with robust tracking under occlusions.',
        tech: ['YOLOv8', 'PyTorch', 'Computer Vision', 'Real-time Processing'],
        github: 'https://github.com/HarishAnand-hub',
        gradient: 'from-green-500 to-emerald-600'
      }
    ];

    return (
      <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                <div className="relative bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Github size={20} /> Code
                    </motion.a>
                    {project.paper && (
                      <motion.a
                        href={project.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <ExternalLink size={20} /> Paper
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Skills Section
  const Skills = () => {
    const skillCategories = [
      {
        title: 'Languages',
        skills: ['Python', 'C++', 'MATLAB', 'JavaScript', 'SQL'],
        icon: '💻'
      },
      {
        title: 'Robotics & AI',
        skills: ['ROS', 'OpenCV', 'YOLOv8', 'TensorFlow', 'PyTorch', 'Keras'],
        icon: '🤖'
      },
      {
        title: 'Tools & Platforms',
        skills: ['Git', 'Docker', 'Linux', 'CUDA', 'Streamlit', 'Dobot Magician'],
        icon: '🔧'
      },
      {
        title: 'Domains',
        skills: ['Computer Vision', 'Deep Learning', 'Autonomous Systems', 'Motion Planning'],
        icon: '🧠'
      }
    ];

    return (
      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Skills
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{category.icon}</span>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Experience Section
  const Experience = () => {
    const experiences = [
      {
        role: 'Software Development Intern',
        company: 'EVUDE',
        period: 'Sep–Nov 2023',
        description: [
          'Developed and deployed full-stack web applications',
          'Optimized backend for 30% faster response times',
          'Improved user experience through intuitive interface design'
        ],
        color: 'cyan'
      },
      {
        role: 'Engineering Intern',
        company: 'TVS Motor Company',
        period: 'Nov–Dec 2023',
        description: [
          'Automated data processing pipeline for production analytics',
          'Identified bottlenecks and improved efficiency by 15%',
          'Collaborated with cross-functional teams on process optimization'
        ],
        color: 'purple'
      }
    ];

    return (
      <section id="experience" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Experience
          </motion.h2>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className={`bg-gradient-to-br from-${exp.color}-500/10 to-${exp.color}-600/10 p-8 rounded-xl border border-${exp.color}-500/30 hover:border-${exp.color}-500/50 transition-all`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                      <p className={`text-${exp.color}-400 text-lg font-semibold`}>{exp.company}</p>
                    </div>
                    <span className="text-gray-400 mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className={`text-${exp.color}-400 mt-1`}>▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-8 rounded-xl border border-pink-500/30"
          >
            <h3 className="text-2xl font-bold text-white mb-4">🌐 Leadership & Activities</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-pink-400 mt-1">•</span>
                <span><strong>Rotary Club of Chennai</strong> — Community Tech & Education Volunteer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong>Game Developer Club Organizer</strong> — Hosted technical workshops for 100+ students</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    );
  };

  // Contact Section with Web3Forms
  const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus('sending');

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_key: '0de9615d-7648-47a3-8832-02a719d1308c',
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Portfolio Contact from ${formData.name}`,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setStatus(''), 5000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    return (
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-cyan-500/30"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              {status === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
                  ✗ Something went wrong. Please try again or email me directly.
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="text-cyan-400" size={24} />
                  <a href="mailto:harishanand077@gmail.com" className="hover:text-cyan-400 transition-colors">
                    harishanand077@gmail.com
                  </a>
                </div>

                <div className="flex gap-6">
                  <motion.a
                    href="https://linkedin.com/in/harish-anand-069762391"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Linkedin size={28} />
                  </motion.a>
                  <motion.a
                    href="https://github.com/HarishAnand-hub"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Github size={28} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Footer
  const Footer = () => {
    return (
      <footer className="bg-gray-950 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>© 2025 Harish Anand. Built with React + Tailwind CSS + Framer Motion</p>
          <p className="mt-2 text-sm">Designed and developed with 💙 for robotics and AI</p>
        </div>
      </footer>
    );
  };

  return (
    <div className="bg-gray-950 text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
