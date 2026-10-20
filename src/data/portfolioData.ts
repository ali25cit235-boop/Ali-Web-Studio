export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'android' | 'web' | 'python' | 'hardware';
  categoryLabel: string;
  year: string;
  status: 'Completed' | 'Active Exploration' | 'Ongoing Prototype';
  description: string;
  problemSolved: string;
  whatILearned: string[];
  techStack: string[];
  image?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface FocusArea {
  id: string;
  title: string;
  shortDesc: string;
  details: string;
  iconName: string;
  level: string;
  skills: string[];
  keyTools: string[];
  currentFocus: string;
}

export interface JourneyMilestone {
  year: string;
  period: string;
  title: string;
  tagline: string;
  description: string;
  learnings: string[];
}

export const portfolioConfig = {
  name: 'Ali Abbas',
  role: 'CIT Student & Technology Enthusiast',
  location: 'Pakistan (PKT / UTC+5)',
  statusBadge: 'Currently Learning & Building New Projects',
  tagline: 'Learning by Building. Growing Through Technology.',
  headline: 'Learning. Building. Exploring.',
  heroDescription:
    "I'm a CIT student passionate about technology, Android development, web experiences, Python, and AI-assisted creativity. I'm learning by building real projects and sharing my journey along the way.",
  aboutStory: {
    greeting: "Hello, I'm Ali Abbas.",
    p1: "I am a Computer Information Technology (CIT) student from Pakistan with a deep curiosity for how computer systems and software function from the ground up.",
    p2: "My journey started with a fascination for hardware—taking apart desktop towers, diagnosing memory faults, replacing thermal paste, and cleanly setting up Windows operating systems. That hands-on troubleshooting mindset naturally sparked my interest in writing code.",
    p3: "Today, I am actively building native Android applications with Kotlin, writing automation scripts in Python, and experimenting with modern web technologies and AI developer tools. I don't claim to know everything—I believe the most authentic way to grow is to stay humble, embrace trial and error, and continuously learn by building real things.",
  },
  contact: {
    whatsappNumber: '+92 310 6449454',
    whatsappCleanNumber: '923106449454',
    whatsappMessage: 'Hi Ali, I came across your portfolio and would like to connect with you regarding technology and projects!',
    email: 'aliabbascit.dev@gmail.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    location: 'Pakistan',
    availability: 'Open to learning opportunities, project collaborations, and tech discussions',
  },
  stats: [
    { label: 'Education', value: 'CIT Diploma', note: 'Computer Info Tech' },
    { label: 'Active Focus', value: 'Kotlin & Android', note: 'Jetpack Compose & Core' },
    { label: 'Projects Built', value: '12+', note: 'Apps, Scripts & Web' },
    { label: 'Mindset', value: 'Learn by Doing', note: 'Hands-on Builder' },
  ],
  terminalSnippets: [
    {
      id: 'kotlin',
      label: 'Kotlin / Android',
      filename: 'TaskItem.kt',
      language: 'kotlin',
      code: `// Android Jetpack Compose - Task Card
@Composable
fun TaskCard(task: TaskItem, onToggle: (Boolean) -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth().padding(8.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(checked = task.isCompleted, onCheckedChange = onToggle)
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text(text = task.title, style = MaterialTheme.typography.titleMedium)
                Text(text = "Priority: \${task.priority}", style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}`,
    },
    {
      id: 'python',
      label: 'Python / Script',
      filename: 'file_organizer.py',
      language: 'python',
      code: `import os, shutil
from pathlib import Path

# Automated Downloads Folder Cleaner
EXTENSIONS = {
    'Documents': ['.pdf', '.docx', '.txt', '.xlsx'],
    'Media': ['.jpg', '.png', '.mp4', '.mkv', '.mp3'],
    'Code': ['.py', '.kt', '.ts', '.html', '.css', '.json'],
    'Archives': ['.zip', '.rar', '.7z', '.tar.gz']
}

def organize_folder(target_dir):
    path = Path(target_dir)
    for file in path.iterdir():
        if file.is_file():
            ext = file.suffix.lower()
            category = next((cat for cat, exts in EXTENSIONS.items() if ext in exts), 'Others')
            dest = path / category
            dest.mkdir(exist_ok=True)
            shutil.move(str(file), str(dest / file.name))
            print(f"Sorted: {file.name} -> {category}/")`,
    },
    {
      id: 'powershell',
      label: 'Systems / Hardware',
      filename: 'SystemHealthCheck.ps1',
      language: 'powershell',
      code: `# Windows Hardware & Storage Health Diagnostic
Write-Host ">>> Running System Health & Storage Diagnostic..." -ForegroundColor Cyan

# Check Disk Free Space & Health
Get-Volume | Select-Object DriveLetter, FileSystemLabel, 
    @{Name="FreeGB";Expression={[math]::Round($_.SizeRemaining/1GB, 2)}},
    @{Name="TotalGB";Expression={[math]::Round($_.Size/1GB, 2)}}, HealthStatus

# Check CPU & RAM Utilization
$ram = Get-CimInstance Win32_OperatingSystem
$freeMem = [math]::Round($ram.FreePhysicalMemory / 1MB, 2)
$totalMem = [math]::Round($ram.TotalVisibleMemorySize / 1MB, 2)
Write-Host "RAM: $(($totalMem - $freeMem)) GB used of $totalMem GB total" -ForegroundColor Green`,
    },
    {
      id: 'web',
      label: 'Web / React',
      filename: 'PortfolioHero.tsx',
      language: 'typescript',
      code: `// Modern React + Tailwind Component
export function StatusIndicator({ isBuilding }: { isBuilding: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
      <span>Status: Active Exploration · CIT Student</span>
    </div>
  );
}`,
    },
  ],
};

export const focusAreas: FocusArea[] = [
  {
    id: 'android',
    title: 'Android & Kotlin Development',
    shortDesc: 'Building intuitive mobile apps using Kotlin and Android Studio fundamentals.',
    details:
      'My biggest software passion is Android development. I study activity lifecycles, Jetpack Compose UI architecture, Room databases for local offline storage, and Material Design 3 guidelines.',
    iconName: 'Smartphone',
    level: 'Active Daily Learning',
    skills: ['Kotlin Programming', 'Jetpack Compose', 'Android Studio', 'Room Local Database', 'Material Design 3', 'State Management'],
    keyTools: ['Android Studio Hedgehog/Iguana', 'Gradle', 'Android Emulator', 'Physical Test Device'],
    currentFocus: 'Mastering Jetpack Compose layouts and reactive state handling.',
  },
  {
    id: 'web',
    title: 'Web Experiences & AI-Assisted Prototyping',
    shortDesc: 'Crafting responsive, high-performance web interfaces with React, Tailwind, and AI tools.',
    details:
      'I use modern web technologies to rapidly turn ideas into accessible web applications. By combining React, TypeScript, and Tailwind CSS with AI pair-programming, I explore frontend architecture and interactive design.',
    iconName: 'Globe',
    level: 'Intermediate Builder',
    skills: ['React 19 & Hooks', 'TypeScript', 'Tailwind CSS v4', 'Vite Bundler', 'Responsive UX Math', 'Framer Motion'],
    keyTools: ['VS Code', 'Vite', 'Chrome DevTools', 'AI Developer Assistants'],
    currentFocus: 'Creating smooth, accessible micro-interactions and dark-mode design systems.',
  },
  {
    id: 'python',
    title: 'Python Scripting & Automation',
    shortDesc: 'Automating repetitive computer tasks and building command-line utilities.',
    details:
      'Python is my go-to language for quick problem solving, automating repetitive desktop workflows, parsing file formats, and experimenting with logic and data structures.',
    iconName: 'Terminal',
    level: 'Practical Utility',
    skills: ['Python 3 Basics & OOP', 'File System Automation', 'CLI Tool Creation', 'JSON & CSV Processing', 'Requests & APIs'],
    keyTools: ['Python 3.12', 'Pip', 'Virtualenv', 'PowerShell'],
    currentFocus: 'Writing background file monitoring tools and simple API integration scripts.',
  },
  {
    id: 'hardware',
    title: 'Computer Hardware & Windows Maintenance',
    shortDesc: 'Hands-on hardware troubleshooting, PC assembly, and Windows OS configuration.',
    details:
      'Before writing code, I learned computers through hardware. I assemble custom PCs, diagnose faulty RAM and motherboards, replace thermal paste, and perform clean Windows installations and driver troubleshooting.',
    iconName: 'Cpu',
    level: 'Hands-On Experience',
    skills: ['PC Component Assembly', 'Hardware Fault Diagnostics', 'Windows 10/11 Clean Installs', 'Driver & BIOS Configuration', 'Thermal Management', 'PowerShell Diagnostics'],
    keyTools: ['Precision Tool Kit', 'Thermal Grizzly Paste', 'Rufus Bootable USB', 'HWiNFO64 & CrystalDiskInfo'],
    currentFocus: 'Understanding low-level hardware-software interaction and storage optimizations.',
  },
  {
    id: 'ai-tools',
    title: 'AI Tools & Modern Tech Exploration',
    shortDesc: 'Leveraging modern AI tooling to accelerate learning and build prototypes.',
    details:
      'Rather than relying blindly on AI, I treat LLMs and modern coding assistants as tireless tutors. I use prompt engineering, code explanations, and rapid prototyping to test hypotheses and learn faster.',
    iconName: 'Sparkles',
    level: 'Curious Explorer',
    skills: ['AI-Assisted Prototyping', 'Prompt Engineering', 'API Integration', 'LLM Debugging Workflows', 'Tech Trend Analysis'],
    keyTools: ['Google AI Studio', 'Gemini APIs', 'GitHub Copilot', 'Cursor'],
    currentFocus: 'Exploring conversational agent protocols and prompt-based logic pipelines.',
  },
];

export const projectsList: ProjectItem[] = [
  {
    id: 'task-flow-android',
    title: 'TaskFlow — Student Task Companion',
    subtitle: 'Native Android app for tracking assignments, deadlines, and study priorities.',
    category: 'android',
    categoryLabel: 'Android / Kotlin',
    year: '2026',
    status: 'Ongoing Prototype',
    description:
      'A streamlined Android application designed to help CIT students keep track of lab assignments, upcoming quizzes, and daily study milestones without clutter.',
    problemSolved:
      'Most task apps are bloated with ads or require constant online logins. TaskFlow works 100% offline using a local Room database with instant local search.',
    whatILearned: [
      'Structuring Jetpack Compose UI state using ViewModels and StateFlow',
      'Implementing offline persistence with Android Room and DAO interfaces',
      'Configuring Material You dynamic theming and responsive tablet/phone layouts',
      'Debugging Gradle build dependencies and Android emulator performance',
    ],
    techStack: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Coroutines', 'Material Design 3', 'Android Studio'],
    image: '/src/assets/images/android_kotlin_project_1792478732869.jpg',
    codeSnippet: {
      language: 'kotlin',
      code: `@Dao
interface TaskDao {
    @Query("SELECT * FROM tasks ORDER BY dueDate ASC")
    fun getAllTasks(): Flow<List<TaskEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTask(task: TaskEntity)

    @Update
    suspend fun updateTask(task: TaskEntity)
}`,
    },
    features: [
      'Offline-first data persistence using Room database',
      'Priority tags (High, Medium, Normal) with clean color cues',
      'Deadline countdown and reminder alerts',
      'Filter tasks by pending, completed, or subject tag',
    ],
  },
  {
    id: 'personal-portfolio',
    title: 'Ali Abbas — Personal Portfolio',
    subtitle: 'High-performance creative portfolio website with fluid animations and interactive terminal.',
    category: 'web',
    categoryLabel: 'Web / React',
    year: '2026',
    status: 'Completed',
    description:
      'A bespoke portfolio website built to showcase my journey as a CIT student, my projects in Android and Python, and my hands-on hardware background.',
    problemSolved:
      'Replaced a generic website layout with an authentic, fast, and accessible personal brand with zero AI fluff or fake claims.',
    whatILearned: [
      'Applying strict anti-slop frontend design rules (Zero-Pill discipline, 60-30-10 color math)',
      'Building an interactive multi-tab code terminal with instant copy feedback',
      'Crafting accessible modals with keyboard ESC triggers and backdrop click handling',
      'Optimizing performance with Vite and Tailwind CSS v4',
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Lucide React', 'Vite'],
    image: '/src/assets/images/ali_hero_workspace_1792478730711.jpg',
    features: [
      'Interactive syntax-highlighted code terminal with tab switching',
      'Categorized project filtering (Android, Web, Python, Systems)',
      'Rich project modal with code samples and key learnings',
      'Direct WhatsApp and email communication integrations',
      'Fully responsive across mobile (375px) to 4K displays',
    ],
  },
  {
    id: 'pc-diagnostic-toolkit',
    title: 'PC Diagnostics & Windows Toolkit',
    subtitle: 'PowerShell diagnostic suite and maintenance routines for desktop optimization.',
    category: 'hardware',
    categoryLabel: 'Hardware & Systems',
    year: '2025',
    status: 'Completed',
    description:
      'A collection of automated scripts and diagnostic procedures I developed while troubleshooting, cleaning, and optimizing desktop computers for peers and local labs.',
    problemSolved:
      'Saves hours of repetitive manual checking by automating disk health checks, memory leak detection, thermal stress logging, and bloatware removal.',
    whatILearned: [
      'Windows PowerShell scripting and CIM/WMI object querying',
      'Understanding SMART hard drive diagnostic telemetry',
      'Diagnosing thermal throttling in modern CPUs and GPUs',
      'Configuring bootable deployment drives and driver integrity checks',
    ],
    techStack: ['PowerShell', 'Windows WMI/CIM', 'CrystalDiskInfo', 'HWiNFO64', 'Batch Scripting'],
    image: '/src/assets/images/hardware_pc_bench_1792478731744.jpg',
    features: [
      'Automated SMART drive status report and free storage analysis',
      'Thermal monitoring trigger and background performance metrics',
      'Clean temporary file purge and Windows update cache repair',
      'Hardware specification summary exporter for bench logging',
    ],
  },
  {
    id: 'python-file-organizer',
    title: 'PyOrganizer — Automated Directory Cleaner',
    subtitle: 'Smart background CLI tool that sorts messy download folders into structured directories.',
    category: 'python',
    categoryLabel: 'Python Script',
    year: '2025',
    status: 'Completed',
    description:
      'A lightweight command-line script that categorizes downloads and project directories based on file extensions, creation dates, and custom rules.',
    problemSolved:
      'Eliminated desktop and download folder clutter by automatically moving files into designated subdirectories with safety collision checks.',
    whatILearned: [
      'Python standard library file handling with pathlib and shutil',
      'Exception handling to prevent file overwrites and permission errors',
      'Building command-line arguments using argparse',
      'Writing cross-platform compatible path resolution for Windows and Linux',
    ],
    techStack: ['Python 3', 'pathlib', 'shutil', 'argparse', 'Logging'],
    features: [
      'Automatic extension matching for 40+ common file formats',
      'Collision prevention (appends timestamps if file already exists)',
      'Dry-run mode to inspect moves before executing',
      'Detailed log file output of all operations',
    ],
  },
  {
    id: 'voice-agent-experiment',
    title: 'Voice Assistant Architecture Prototype',
    subtitle: 'Real-time conversational streaming experiment using Gemini Live and WebSockets.',
    category: 'web',
    categoryLabel: 'AI & WebSockets',
    year: '2026',
    status: 'Active Exploration',
    description:
      'An exploratory technical experiment to investigate how real-time bi-directional audio and text streaming works using modern WebSockets and AI models.',
    problemSolved:
      'Understood the complexities of low-latency streaming, audio buffer management, voice activity detection (VAD), and turn-taking.',
    whatILearned: [
      'Managing WebSocket connection states, reconnections, and heartbeats',
      'Processing client-side audio PCM buffers and Float32 to Int16 conversions',
      'Server-side API proxying with Node.js and Express',
      'Balancing conversational latency with reliable audio playback',
    ],
    techStack: ['Node.js', 'Express', 'WebSockets (ws)', 'Gemini API', 'TypeScript', 'Web Audio API'],
    features: [
      'Bi-directional streaming communication over WebSockets',
      'Audio chunk buffering and voice activity markers',
      'Fallback resilience for quota management',
      'Live transcription rendering in the UI',
    ],
  },
  {
    id: 'quicknotes-markdown',
    title: 'QuickNotes Markdown Mobile',
    subtitle: 'Minimalist note-taking concept with markdown rendering for Android.',
    category: 'android',
    categoryLabel: 'Android / Kotlin',
    year: '2026',
    status: 'Ongoing Prototype',
    description:
      'A distraction-free note taking app built with Kotlin, focusing on instant launch speed, clean typography, and markdown syntax preview.',
    problemSolved:
      'Provides a lightning-fast way to write code snippets, meeting points, and thoughts without waiting for sync spinners.',
    whatILearned: [
      'Custom text rendering in Jetpack Compose',
      'Implementing search filters with Kotlin Coroutines and Debounce',
      'Android back-button navigation with Compose Navigation',
      'Exporting plain text and markdown files to device storage',
    ],
    techStack: ['Kotlin', 'Jetpack Compose', 'Coroutines Flow', 'Android Room'],
    features: [
      'Instant markdown preview toggle',
      'Keyword search across all notes in milliseconds',
      'Auto-save on every keystroke',
      'Dark mode optimized for OLED screens',
    ],
  },
];

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: '2023',
    period: 'The Hardware Spark',
    title: 'Opening Towers & First Troubleshooting',
    tagline: 'Learning how the physical machine operates before writing a line of code.',
    description:
      'Began taking apart desktop towers, understanding motherboards, RAM channels, power supply units, and cooling solutions. Helped friends and family fix blue screens, upgrade storage, and perform clean Windows installations.',
    learnings: ['PC Component Assembly & Diagnostics', 'Windows OS Deployment & Driver Configuration', 'Root-cause troubleshooting mindset'],
  },
  {
    year: '2024',
    period: 'CIT Foundation',
    title: 'Enrolled in Computer Information Technology',
    tagline: 'Formalizing computer science fundamentals and discovering programming.',
    description:
      'Enrolled in the Computer Information Technology (CIT) program in Pakistan. Began studying networking models (OSI / TCP/IP), computer architecture, and writing my first Python scripts for basic algorithmic problems.',
    learnings: ['Networking fundamentals & protocols', 'Logic building & algorithmic thinking in Python', 'Database basics and operating system concepts'],
  },
  {
    year: '2025',
    period: 'Android & Modern Web',
    title: 'Diving into Kotlin and Frontend Systems',
    tagline: 'Moving from basic scripts into building real user interfaces.',
    description:
      'Started learning Kotlin and native Android application development in Android Studio. At the same time, learned modern web technologies (React, TypeScript, Tailwind) and started building complete prototypes using AI-assisted workflows.',
    learnings: ['Kotlin syntax, OOP, and Android Studio workflows', 'Jetpack Compose reactive UI architecture', 'Modern web styling with Tailwind CSS and React components'],
  },
  {
    year: 'Present (2026)',
    period: 'Active Building',
    title: 'Practical Projects & Expanding Systems',
    tagline: 'Turning concepts into working applications and documenting the journey.',
    description:
      'Currently focused on shipping real Android apps, creating practical automation tools, experimenting with conversational AI streaming, and sharing code openly. Balancing CIT coursework with daily hands-on coding.',
    learnings: ['Room DB offline-first architecture', 'WebSockets and streaming protocols', 'Clean software design and version control with Git'],
  },
];

export const techSetup = {
  hardware: [
    { title: 'Workstation PC', specs: 'Custom Build · Intel Core i5 · 16GB High-Speed RAM · 512GB NVMe SSD' },
    { title: 'Display Setup', specs: 'Dual Monitor Configuration for simultaneous coding, debugging, and docs' },
    { title: 'Peripherals', specs: 'Tactile Mechanical Keyboard · Precision Ergonomic Mouse' },
    { title: 'Testing Devices', specs: 'Physical Android Test Device (Android 14) + Android Studio Emulator' },
  ],
  software: [
    { title: 'Primary IDEs', specs: 'Android Studio (for Kotlin) & VS Code (for Web, TypeScript, Python)' },
    { title: 'Terminal & Shell', specs: 'Windows Terminal + PowerShell 7 + Git Bash' },
    { title: 'Operating Systems', specs: 'Windows 11 Pro (Primary) · Ubuntu Linux (in WSL & secondary testing)' },
    { title: 'Version Control', specs: 'Git CLI & GitHub for repository management' },
  ],
};
