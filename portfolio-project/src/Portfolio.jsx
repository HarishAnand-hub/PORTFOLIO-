import React, { useState, useEffect, memo, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ExternalLink, Menu, X, ChevronDown, PlayCircle } from 'lucide-react';

// ==================== CONSTANTS ====================
const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/harish-anand-069762391',
  github: 'https://github.com/HarishAnand-hub',
  email: 'harishanand077@gmail.com',
  resume: 'https://drive.google.com/uc?export=download&id=1rFuNqo-OMrq_Q8rbGYi4zAUv_A6Hxn1O'
};

const NAV_ITEMS = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'];

const PROJECTS_DATA = [
  {
    title: '🌞 Solar Irradiance Forecasting using Graph Neural Networks',
    description: 'Architected novel hybrid GCN-LSTM deep learning model processing 5.1M NASA satellite data points across 6 cities, achieving 92% prediction accuracy while outperforming traditional ARIMA by 35%, XGBoost by 28%, and standard LSTM by 22%. Engineered spatial-temporal graph architecture with 32-dim embeddings and 64-unit LSTM generating 30-day forecasts, directly supporting India\'s 500 GW renewable energy target and enabling 500+ MW solar capacity planning decisions.',
    tech: ['PyTorch', 'Graph Neural Networks', 'LSTM', 'Python', 'NumPy', 'NASA Data', 'Spatial-Temporal Modeling'],
    github: 'https://github.com/HarishAnand-hub',
    gradient: 'from-yellow-500 to-orange-600',
    stats: ['92% Accuracy', '5.1M Data Points', 'Outperformed 3 Baselines']
  },
  {
    title: '🤖 Autonomous Tic-Tac-Toe Robot with AI',
    description: 'Developed end-to-end autonomous robotic system integrating real-time computer vision (OpenCV), game theory AI (Minimax), and 6-DOF robotic manipulation achieving 98.5% board detection accuracy and 99.2% piece recognition with 250ms decision-to-action latency. Implemented optimized Minimax algorithm with alpha-beta pruning reducing search complexity by 65% and achieving undefeated performance across 50+ competitive games with 100% optimal move selection under 150ms computation time.',
    tech: ['Python', 'OpenCV', 'ROS', 'Minimax AI', 'Dobot Magician', 'Computer Vision', 'Motion Planning'],
    github: 'https://github.com/HarishAnand-hub',
    gradient: 'from-cyan-500 to-blue-600',
    stats: ['98.5% Detection', 'Undefeated AI', '65% Search Reduction']
  },
  {
    title: '🏗️ Vision-Guided Robotic Palletization System',
    description: 'Designed production-grade YOLOv8n perception pipeline (11.2M parameters) processing at 45 FPS achieving 100% classification accuracy (0.98 mAP@0.5) across 6 diverse object classes with ROS-based motion planning and depth camera integration. Implemented trajectory optimization using cubic splines and inverse kinematics delivering sub-2mm XY placement precision, ±0.5° rotational accuracy, and 10.7s cycle time demonstrating industrial-grade automation capabilities.',
    tech: ['YOLOv8', 'PyTorch', 'ROS', 'Python', 'MoveIt', 'OpenCV', 'Inverse Kinematics', 'Motion Planning'],
    github: 'https://github.com/HarishAnand-hub',
    gradient: 'from-purple-500 to-pink-600',
    stats: ['100% Accuracy', 'Sub-2mm Precision', '45 FPS Real-time']
  },
  {
    title: '💓 Deep Learning for Cardiac Event Prediction',
    description: 'Architected hybrid transfer learning framework combining Xception (71-layer) and ResNet50 (50-layer) CNNs with ensemble voting, achieving 94.2% accuracy, 93.8% precision, and 0.97 AUC-ROC on 5,000+ ECG signals across 5 cardiac conditions with 10-fold cross-validation. Deployed production-ready Streamlit clinical decision support interface with ONNX runtime optimization enabling <200ms real-time inference, actively serving 100+ medical professionals for cardiac diagnostics. Published in IEEE ICCCT 2025.',
    tech: ['TensorFlow', 'Keras', 'Python', 'Transfer Learning', 'CNN', 'Medical Imaging', 'ONNX', 'Streamlit'],
    github: 'https://github.com/HarishAnand-hub',
    paper: 'https://doi.org/10.1109/ICCCT2025',
    gradient: 'from-pink-500 to-red-600',
    stats: ['94.2% Accuracy', 'IEEE Published 2025', '0.97 AUC-ROC']
  },
  {
    title: '⚽ Real-Time Football Detection & Tracking System',
    description: 'Developed custom YOLOv8 object detection pipeline with 2,000+ hand-annotated training images achieving 91% mAP@0.5 on multi-object tracking with real-time player and ball detection capabilities. Optimized deep learning model for embedded edge deployment through advanced pruning and quantization techniques, achieving 30 FPS inference on resource-constrained hardware while maintaining detection accuracy for sports analytics applications.',
    tech: ['YOLOv8', 'PyTorch', 'OpenCV', 'Python', 'Edge Computing', 'Model Optimization', 'Real-time Tracking'],
    github: 'https://github.com/HarishAnand-hub',
    gradient: 'from-green-500 to-emerald-600',
    stats: ['91% mAP', '30 FPS Edge Device', '2K+ Annotations']
  },
  {
    title: '📐 Forward & Inverse Kinematics Analysis',
    description: 'Implemented comprehensive kinematic modeling for Dobot Magician Lite using symbolic computation in MATLAB. Developed forward kinematics solver using homogeneous transformation matrices (HTM) and Denavit-Hartenberg parameters for precise end-effector position calculation. Created inverse kinematics solver computing joint angles for desired positions with multiple configuration solutions (elbow-up/down), achieving high accuracy validated through experimental testing across multiple target positions.',
    tech: ['MATLAB', 'Robotics Toolbox', 'Kinematics', 'Python', 'Symbolic Computation', 'DH Parameters'],
    github: 'https://github.com/HarishAnand-hub/Dobot-magician-lite-lab4',
    gradient: 'from-indigo-500 to-purple-600',
    stats: ['Multiple IK Solutions', 'Symbolic Solver', 'Experimental Validation']
  },
  {
    title: '🎯 Multi-Effector Pallet Handling System',
    description: 'Evaluated and compared suction cup versus parallel gripper end-effectors for automated pick-and-place operations on Dobot Magician Lite. Achieved 99.9% pickup success rate on flat surfaces with suction mechanism and demonstrated gripper adaptability across varied object geometries. Implemented precise motion planning with 9 taught coordinate points and safe waypoint navigation, correcting sub-millimeter misalignments through iterative calibration for industrial-grade reliability.',
    tech: ['Python', 'Dobot SDK', 'Motion Planning', 'End Effector Control', 'Process Automation'],
    github: 'https://github.com/HarishAnand-hub',
    demo: 'https://www.youtube.com/watch?v=BK863-FWJk',
    gradient: 'from-orange-500 to-red-600',
    stats: ['99.9% Success Rate', '9 Taught Points', 'Sub-mm Calibration']
  },
  {
    title: '✍️ Precision Robotic Letter Drawing System',
    description: 'Programmed Dobot Magician Lite for high-precision letter drawing achieving 0.2mm repeatability across 13 coordinate points. Designed and executed complex trajectory planning for writing "CIM" with positional errors ranging 0.1-0.5mm, demonstrating excellent accuracy and consistency. Analyzed effects of motor speed, payload mass, and relative coordinate systems on end-effector precision, validating robotic accuracy versus repeatability through multiple experimental runs and geometric verification.',
    tech: ['Python', 'DobotLab', 'Motion Control', 'Trajectory Planning', 'Precision Engineering'],
    github: 'https://github.com/HarishAnand-hub',
    demo: 'https://www.youtube.com/watch?v=92aYwBXBAUY',
    gradient: 'from-teal-500 to-cyan-600',
    stats: ['0.2mm Repeatability', '13 Coordinates', '0.1-0.5mm Error']
  }
];

const SKILL_CATEGORIES = [
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
    skills: ['Git', 'Docker', 'Linux', 'Streamlit', 'Dobot Magician', 'MATLAB'],
    icon: '🔧'
  },
  {
    title: 'Domains',
    skills: ['Computer Vision', 'Deep Learning', 'Autonomous Systems', 'Motion Planning'],
    icon: '🧠'
  }
];

const EXPERIENCES_DATA = [
  {
    role: 'Software Development Intern',
    company: 'EVUDE',
    period: 'Sep–Nov 2023',
    description: [
      'Architected and deployed production-ready full-stack web applications using modern frameworks',
      'Engineered backend optimizations achieving 30% reduction in API response times through efficient database queries and caching strategies',
      'Enhanced user engagement by 25% through implementation of intuitive UI/UX design principles and responsive interfaces',
      'Collaborated with cross-functional teams in agile environment to deliver features on tight deadlines'
    ],
    colorClasses: 'from-cyan-500/10 to-cyan-600/10 border-cyan-500/30 hover:border-cyan-500/50',
    textColor: 'text-cyan-400',
    bulletColor: 'text-cyan-400'
  },
  {
    role: 'Engineering Intern',
    company: 'TVS Motor Company',
    period: 'Nov–Dec 2023',
    description: [
      'Designed and implemented automated data processing pipeline handling 10,000+ records daily for production analytics',
      'Conducted comprehensive system analysis identifying critical bottlenecks, resulting in 15% efficiency improvement across manufacturing operations',
      'Developed real-time monitoring dashboards providing actionable insights to production managers',
      'Partnered with cross-functional engineering teams to optimize process workflows and reduce downtime',
      'Presented data-driven recommendations to senior management, influencing strategic process improvements'
    ],
    colorClasses: 'from-purple-500/10 to-purple-600/10 border-purple-500/30 hover:border-purple-500/50',
    textColor: 'text-purple-400',
    bulletColor: 'text-purple-400'
  }
];

// ==================== OPTIMIZED PARTICLE BACKGROUND ====================
const ParticleBackground = memo(() => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const particleCount = dimensions.width < 768 ? 20 : 50;

  const particles = useMemo(() => 
    [...Array(particleCount)].map((_, i) => ({
      id: i,
      initialX: Math.random() * dimensions.width,
      initialY: Math.random() * dimensions.height,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      moveDistance: Math.random() * 100 + 50
    })), [particleCount, dimensions.width, dimensions.height]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{
            x: particle.initialX,
            y: particle.initialY,
            opacity: particle.opacity
          }}
          animate={{
            y: [null, particle.initialY - particle.moveDistance],
            opacity: [null, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatDelay: particle.delay,
            ease: "linear"
          }}
          style={{ willChange: 'transform, opacity' }}
        />
      ))}
    </div>
  );
});

ParticleBackground.displayName = 'ParticleBackground';

// ==================== NAVBAR COMPONENT ====================
const Navbar = memo(({ activeSection, setActiveSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 50);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
    setActiveSection(sectionId);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent cursor-pointer"
          onClick={() => scrollToSection('home')}
        >
          HA
        </motion.div>

        <div className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              whileHover={{ scale: 1.1 }}
              className={`text-gray-300 hover:text-cyan-400 transition-colors ${
                activeSection === item.toLowerCase() ? 'text-cyan-400' : ''
              }`}
            >
              {item}
            </motion.button>
          ))}
        </div>

        <button
          className="md:hidden text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-gray-900 px-6 py-4 space-y-4"
          role="menu"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="block w-full text-left text-gray-300 hover:text-cyan-400"
              role="menuitem"
            >
              {item}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
});

Navbar.displayName = 'Navbar';

// ==================== HERO SECTION ====================
const Hero = memo(() => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
              style={{ willChange: 'transform' }}
            >
              🚀 View Projects
            </motion.a>
            
            <motion.a
              href={SOCIAL_LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold flex items-center gap-2 hover:from-purple-600 hover:to-pink-700 transition-all"
              style={{ willChange: 'transform' }}
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
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={32} />
            </motion.a>
            <motion.a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={32} />
            </motion.a>
            <motion.a
              href={`mailto:${SOCIAL_LINKS.email}`}
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="Email Contact"
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
        aria-hidden="true"
      >
        <ChevronDown size={40} className="text-cyan-400" />
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

// ==================== ABOUT SECTION ====================
const About = memo(() => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-16 rounded-full"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20"></div>
              
              <div className="relative bg-gray-800/90 backdrop-blur-xl p-10 md:p-12 rounded-3xl border border-gray-700/50">
                <p className="text-gray-300 text-xl leading-relaxed mb-6 text-center">
                  I'm a <span className="text-cyan-400 font-bold">Robotics and AI Engineer</span> passionate about developing 
                  autonomous systems that combine <span className="text-purple-400 font-semibold">intelligence</span>, <span className="text-pink-400 font-semibold">precision</span>, and <span className="text-cyan-400 font-semibold">adaptability</span>. 
                </p>
                <p className="text-gray-300 text-xl leading-relaxed mb-6 text-center">
                  Currently pursuing my Master's in Robotics and Autonomous Systems at <span className="text-yellow-400 font-bold">Arizona State University</span>, 
                  I focus on perception, decision-making, and control systems for intelligent machines.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed text-center">
                  My work spans <span className="text-cyan-400 font-semibold">computer vision</span>, <span className="text-purple-400 font-semibold">deep learning</span>, and <span className="text-pink-400 font-semibold">robotic manipulation</span>—bridging 
                  the gap between theoretical AI and real-world robotic applications.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Education</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative bg-gray-800 p-8 rounded-2xl border border-cyan-500/30 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-3xl">
                      🎓
                    </div>
                    <div>
                      <div className="text-sm text-cyan-400 font-semibold">2025 - 2027</div>
                      <h4 className="text-xl font-bold text-white">Master of Science</h4>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-cyan-300 mb-2">Robotics & Autonomous Systems</p>
                  <p className="text-gray-400">Arizona State University</p>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <span className="text-sm text-gray-500">Focus Areas:</span>
                    <p className="text-sm text-gray-300 mt-1">Perception • Control • AI Integration</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative bg-gray-800 p-8 rounded-2xl border border-purple-500/30 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-3xl">
                      💻
                    </div>
                    <div>
                      <div className="text-sm text-purple-400 font-semibold">2021 - 2025</div>
                      <h4 className="text-xl font-bold text-white">Bachelor of Technology</h4>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-purple-300 mb-2">Computer Science & Engineering</p>
                  <p className="text-gray-400">VIT Chennai</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Core Competencies</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Robotics', icon: '🤖', color: 'from-cyan-500 to-blue-500' },
                { name: 'Computer Vision', icon: '👁️', color: 'from-purple-500 to-pink-500' },
                { name: 'Deep Learning', icon: '🧠', color: 'from-pink-500 to-red-500' },
                { name: 'Autonomous Systems', icon: '🚗', color: 'from-green-500 to-emerald-500' },
                { name: 'Motion Planning', icon: '📐', color: 'from-yellow-500 to-orange-500' },
                { name: 'ROS & Control', icon: '⚙️', color: 'from-blue-500 to-cyan-500' },
              ].map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300`}></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 group-hover:border-gray-600 transition-all text-center">
                    <div className="text-4xl mb-3">{skill.icon}</div>
                    <p className="font-semibold text-white">{skill.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

About.displayName = 'About';

// ==================== PROJECTS SECTION ====================
const Projects = memo(() => {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
              tabIndex={0}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`} aria-hidden="true"></div>
              
              <div className="relative bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stats.map((stat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-full text-xs font-semibold border border-cyan-500/30"
                    >
                      {stat}
                    </span>
                  ))}
                </div>

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

                <div className="flex gap-4 flex-wrap">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    aria-label={`View code for ${project.title}`}
                  >
                    <Github size={20} /> View Code
                  </motion.a>
                  {project.paper && (
                    <motion.a
                      href={project.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      aria-label={`Read research paper for ${project.title}`}
                    >
                      <ExternalLink size={20} /> Research Paper
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                      aria-label={`Watch demo for ${project.title}`}
                    >
                      <PlayCircle size={20} /> Watch Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

// ==================== SKILLS SECTION ====================
const Skills = memo(() => {
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
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl" aria-hidden="true">{category.icon}</span>
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
});

Skills.displayName = 'Skills';

// ==================== EXPERIENCE SECTION ====================
const Experience = memo(() => {
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
          {EXPERIENCES_DATA.map((exp, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className={`bg-gradient-to-br ${exp.colorClasses} p-8 rounded-xl transition-all`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                    <p className={`${exp.textColor} text-lg font-semibold`}>{exp.company}</p>
                  </div>
                  <span className="text-gray-400 mt-2 md:mt-0">{exp.period}</span>
                </div>
                
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className={`${exp.bulletColor} mt-1`} aria-hidden="true">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-8 rounded-xl border border-pink-500/30"
        >
          <h3 className="text-2xl font-bold text-white mb-6">🌐 Leadership & Activities</h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-pink-400 mt-1" aria-hidden="true">•</span>
              <div>
                <strong>Rotary Club of Chennai</strong> — Community Tech & Education Volunteer
                <p className="text-gray-400 text-sm mt-1">Conducted digital literacy sessions and tech awareness drives for students.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1" aria-hidden="true">•</span>
              <div>
                <strong>Game Developer Club Organizer</strong> — Hosted technical workshops for 100+ students
                <p className="text-gray-400 text-sm mt-1">Led sessions on game design and programming fundamentals.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1" aria-hidden="true">•</span>
              <div>
                <strong>Cultural Fest Tech Committee</strong> — Developer & Coordinator
                <p className="text-gray-400 text-sm mt-1">Developed event registration and scheduling systems. Managed live technical support during the fest.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1" aria-hidden="true">•</span>
              <div>
                <strong>2nd Place, Inter-Departmental Football Tournament</strong>, VIT Chennai (2023)
                <p className="text-gray-400 text-sm mt-1">Represented the department football team, showcasing teamwork and leadership.</p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';

// ==================== CONTACT SECTION ====================
const Contact = memo(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('sending');

    try {
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message)
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '0de9615d-7648-47a3-8832-02a719d1308c',
          name: sanitizedData.name,
          email: sanitizedData.email,
          message: sanitizedData.message,
          subject: `Portfolio Contact from ${sanitizedData.name}`,
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
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
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
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange('name')}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none transition-colors ${
                  errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'
                }`}
                placeholder="Your Name"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange('email')}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none transition-colors ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'
                }`}
                placeholder="your.email@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={handleChange('message')}
                rows="5"
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none transition-colors resize-none ${
                  errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'
                }`}
                placeholder="Your message..."
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-sm text-red-400">{errors.message}</p>
              )}
            </div>

            {status === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400" role="alert">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400" role="alert">
                ✗ Something went wrong. Please try again or email me directly.
              </div>
            )}

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: status === 'sending' ? 1 : 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ willChange: 'transform' }}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="text-cyan-400" size={24} />
                <a 
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {SOCIAL_LINKS.email}
                </a>
              </div>

              <div className="flex gap-6">
                <motion.a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={28} />
                </motion.a>
                <motion.a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  aria-label="GitHub Profile"
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
});

Contact.displayName = 'Contact';

// ==================== FOOTER ====================
const Footer = memo(() => {
  return (
    <footer className="bg-gray-950 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
        <p>© 2025 Harish Anand. Built with React + Tailwind CSS + Framer Motion</p>
        <p className="mt-2 text-sm">Designed and developed with 💙 for robotics and AI</p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

// ==================== LOADING COMPONENT ====================
const LoadingScreen = memo(() => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full"
      />
    </div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';

// ==================== MAIN PORTFOLIO COMPONENT ====================
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.toLowerCase());
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-gray-950 text-white overflow-x-hidden">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
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