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
  badge?: string;
  benchmark?: {
    before: string;
    after: string;
    metric: string;
  };
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

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  timeline: string;
  result: string;
  percentage: string;
  highlights: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  bulletPoints: string[];
}

export const portfolioConfig = {
  name: 'Ali Abbas',
  role: 'Computer Information Technology (CIT) Student | Android Developer (Kotlin) | Aspiring IT Professional',
  location: 'Kamalia, Pakistan',
  statusBadge: 'Building NetShield & Android Dynamic Island',
  tagline: 'Better Skills, Bigger Opportunities.',
  headline: 'Learning. Building. Exploring.',
  heroDescription:
    "I'm a Computer Information Technology (CIT) student from Kamalia with practical experience in computer hardware, software troubleshooting, and Windows maintenance. I build system utilities like NetShield, develop native Android apps in Kotlin, and create modern web experiences.",
  resumePdfUrl: '/assets/aistudio/Ali_Abbas_Resume_Full__1__865205bd.pdf',
  typingSpeed: '42 WPM',
  aboutStory: {
    greeting: "Hello, I'm Ali Abbas.",
    p1: "I am a Computer Information Technology (CIT) student at Government College of Technology (GCT) Kamalia, where I achieved an 87.5% score (1065/1200) in my first-year board examinations.",
    p2: "My practical foundation began on the ground at our family computer shop in Kamalia—diagnosing desktop component faults, testing RAM, replacing thermal paste, resolving daily operating system crashes, and performing clean Windows installations. That physical diagnostic discipline taught me to always understand the root cause before changing a single setting.",
    p3: "That hardware curiosity led naturally to systems programming and network security: I engineered NetShield (v4.0.0) to eliminate transparent ISP DNS leaks and port hijacking for Windows proxy users. Today, I am deeply focused on native Android development with Kotlin (including an expandable Dynamic Island status overlay prototype), Python automation, and modern web applications.",
  },
  careerObjective:
    'Seeking entry-level IT internships and technology opportunities to apply existing technical knowledge, gain practical experience, and continue developing Android development, programming, and troubleshooting skills with Kotlin.',
  workingStyle: [
    {
      title: 'Practical Diagnostic',
      desc: 'Check physical hardware & software causes before attempting fixes.',
    },
    {
      title: 'Safe Configuration',
      desc: 'Test every system change with a clear rollback and state-restoration path.',
    },
    {
      title: 'Project-Driven',
      desc: 'Build real Kotlin, Python, and web utilities to understand concepts deeply.',
    },
  ],
  contact: {
    whatsappNumber: '+92 310 6449454',
    whatsappCleanNumber: '923106449454',
    whatsappMessage: 'Hi Ali, I reviewed your Resume and Portfolio and would like to connect regarding an IT / development opportunity!',
    email: 'ali129kml@gmail.com',
    github: 'https://github.com/ali25cit235',
    githubRepoNetShield: 'https://github.com/ali25cit235-boop/NetShield-DNS-Guard',
    location: 'Kamalia, Punjab, Pakistan',
    availability: 'Open to entry-level IT internships, Android development roles, and project collaborations',
  },
  stats: [
    { label: 'Academic Standing', value: '87.5% (1065/1200)', note: 'DAE CIT · GCT Kamalia' },
    { label: 'Featured Utility', value: 'NetShield v4.0', note: 'DNS-Leak Guard & Firewall' },
    { label: 'Hands-on Practice', value: 'Family PC Shop', note: 'Hardware & OS Repairs' },
    { label: 'Typing Speed', value: '42 WPM', note: 'Fast & Accurate Execution' },
  ],
  education: [
    {
      degree: 'Diploma of Associate Engineering (DAE) — CIT',
      institution: 'Government College of Technology (GCT), Kamalia',
      location: 'Kamalia, Pakistan',
      timeline: '2025 – Present (3-Year Program)',
      result: '1065 / 1200 Marks',
      percentage: '87.5% (First Year Result · Distinction)',
      highlights: [
        'Computer Information Technology core curriculum',
        'Top-tier first year performance with 87.5% aggregate marks',
        'Completed official certification in Office Management (Word, Excel, PowerPoint, AI Tools)',
        'Independent focus on Operating Systems, Networking & Python programming',
      ],
    },
    {
      degree: 'Matriculation (Secondary School Certificate)',
      institution: 'Board of Intermediate and Secondary Education (BISE) Faisalabad',
      location: 'Faisalabad, Pakistan',
      timeline: 'Completed: 2025',
      result: '810 / 1200 Marks',
      percentage: '67.5%',
      highlights: [
        'Solid foundational science and mathematics background',
        'Transitioned directly into engineering & technical education',
      ],
    },
  ] as EducationItem[],
  experience: [
    {
      role: 'Hands-on Technical Practice in Computer Hardware & Software Support',
      company: 'Family Computer Shop',
      location: 'Kamalia, Pakistan',
      period: 'Practical Experience & Ongoing Support',
      description:
        'Daily hands-on troubleshooting of customer desktop towers, laptops, peripherals, and operating systems.',
      bulletPoints: [
        'Troubleshoot common PC hardware/software issues and assist with component installation & basic repairs.',
        'Install Windows 10/11, resolve everyday operating-system crashes, and support routine computer maintenance.',
        'Perform practical tasks such as RAM replacement, thermal servicing, cable checks, and preparing systems for use.',
        'Assist clients with software configurations, driver installations, and internet connectivity setup.',
      ],
    },
  ] as ExperienceItem[],
  skillLevels: [
    { name: 'Python Programming', level: 'Advanced', category: 'Programming' },
    { name: 'Android Development (Kotlin)', level: 'Intermediate', category: 'Mobile' },
    { name: 'Kotlin', level: 'Intermediate', category: 'Programming' },
    { name: 'Hardware & Software Troubleshooting', level: 'Intermediate', category: 'Systems' },
    { name: 'Windows Installation & OS Support', level: 'Intermediate', category: 'Systems' },
    { name: 'Computer Maintenance & Assembly', level: 'Intermediate', category: 'Hardware' },
    { name: 'HTML, CSS, JavaScript', level: 'Intermediate', category: 'Web' },
    { name: 'Typing, Email & Internet (42 WPM)', level: 'Intermediate', category: 'General' },
    { name: 'MS Word & MS Excel', level: 'Basic', category: 'Office' },
    { name: 'Office Administration', level: 'Basic', category: 'Office' },
  ],
  languages: [
    { name: 'Urdu', fluency: 'Native' },
    { name: 'Punjabi', fluency: 'Native' },
    { name: 'English', fluency: 'Intermediate' },
  ],
  terminalSnippets: [
    {
      id: 'netshield',
      label: 'NetShield / Python',
      filename: 'netshield_core.py',
      language: 'python',
      code: `# NetShield: Port-53 Firewall Kill-Switch & Dynamic Geo-DNS Enforcer
import subprocess, winreg

def enforce_kernel_firewall_killswitch():
    """Block unauthorized outbound UDP/TCP Port 53 queries to prevent ISP hijacking"""
    rule_name = "NetShield_Block_Port53_Outbound"
    cmd = (
        f'netsh advfirewall firewall add rule name="{rule_name}" '
        f'dir=out action=block protocol=UDP localport=any remoteport=53'
    )
    subprocess.run(cmd, shell=True, check=True)
    print("🛡️ [NetShield] Kernel Port-53 Kill-Switch Engaged (netsh advfirewall)")

def neutralize_windows_smhnr():
    """Disable Smart Multi-Homed Name Resolution (SMHNR) DNS Leaks via Registry"""
    key_path = r"Software\\Policies\\Microsoft\\Windows NT\\DNSClient"
    with winreg.CreateKey(winreg.HKEY_LOCAL_MACHINE, key_path) as key:
        winreg.SetValueEx(key, "DisableSmartNameResolution", 0, winreg.REG_DWORD, 1)
    print("🔒 [NetShield] SMHNR Disabled: No secondary adapter leaks.")`,
    },
    {
      id: 'kotlin-dynamic-island',
      label: 'Android / Dynamic Island',
      filename: 'DynamicIslandOverlay.kt',
      language: 'kotlin',
      code: `// Android Kotlin - Expandable Dynamic Island Status Overlay
class DynamicIslandOverlayService : Service() {
    private lateinit var windowManager: WindowManager
    private lateinit var overlayView: View
    private var isExpanded: Boolean = false

    override fun onCreate() {
        super.onCreate()
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
        setupOverlayPill()
    }

    private fun expandIsland() {
        isExpanded = true
        // Animate pill into expanded notification island
        overlayView.animate()
            .scaleX(1.35f)
            .scaleY(2.2f)
            .setDuration(240)
            .start()
    }
}`,
    },
    {
      id: 'task-flow',
      label: 'Kotlin / Room DB',
      filename: 'TaskItem.kt',
      language: 'kotlin',
      code: `// Android Jetpack Compose - Reactive State & Room DAO
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
      id: 'powershell',
      label: 'Systems / Diagnostic',
      filename: 'ShopDiagnostic.ps1',
      language: 'powershell',
      code: `# Family Computer Shop: Automated PC Diagnostic Routine
Write-Host ">>> Running System Health & Storage Diagnostic..." -ForegroundColor Cyan

# Check Disk Free Space & SMART Health
Get-Volume | Select-Object DriveLetter, FileSystemLabel, 
    @{Name="FreeGB";Expression={[math]::Round($_.SizeRemaining/1GB, 2)}},
    @{Name="TotalGB";Expression={[math]::Round($_.Size/1GB, 2)}}, HealthStatus

# Check CPU & RAM Utilization
$ram = Get-CimInstance Win32_OperatingSystem
$freeMem = [math]::Round($ram.FreePhysicalMemory / 1MB, 2)
$totalMem = [math]::Round($ram.TotalVisibleMemorySize / 1MB, 2)
Write-Host "RAM: $(($totalMem - $freeMem)) GB used of $totalMem GB total" -ForegroundColor Green`,
    },
  ],
};

export const focusAreas: FocusArea[] = [
  {
    id: 'netsec',
    title: 'Network Security & Windows Internals',
    shortDesc: 'DNS leak elimination, Windows Firewall automation, and packet routing defense.',
    details:
      'My passion in systems engineering focuses on network integrity: intercepting transparent ISP DNS hijacking, neutralizing Windows Smart Multi-Homed Name Resolution (SMHNR), unbinding IPv6 leaks, and building low-level socket tools.',
    iconName: 'Shield',
    level: 'Creator of NetShield v4.0',
    skills: ['DNS Hijacking Defense', 'Windows Firewall API (netsh)', 'Socket & DoH Programming', 'SMHNR & IPv6 Neutralization', 'Registry & Adapter Scripting'],
    keyTools: ['Python 3.10+', 'dnslib', 'aiohttp-socks', 'Wireshark', 'Whoer / IPInfo'],
    currentFocus: 'Expanding automated geo-aligned DoH routing and proxy kill-switches.',
  },
  {
    id: 'android',
    title: 'Android & Kotlin Development',
    shortDesc: 'Native Android apps, Jetpack Compose, and Dynamic Island status overlay prototype.',
    details:
      'Building modern Android apps using Kotlin and Android Studio. Currently developing an expandable Dynamic Island status/notification overlay prototype, exploring Room databases, StateFlow, and API integrations.',
    iconName: 'Smartphone',
    level: 'Intermediate Builder',
    skills: ['Kotlin Programming', 'Jetpack Compose', 'Android Studio', 'Room Local Database', 'Dynamic Island Overlay', 'StateFlow & Coroutines'],
    keyTools: ['Android Studio Hedgehog/Iguana', 'Gradle', 'Android Emulator', 'Physical Test Device'],
    currentFocus: 'Polishing Dynamic Island overlay animations and background notification triggers.',
  },
  {
    id: 'hardware-shop',
    title: 'Computer Hardware & Shop Support',
    shortDesc: 'Practical hands-on PC maintenance, diagnostics, and Windows installations.',
    details:
      'Practical technical experience gained at our family computer shop: diagnosing hardware faults, installing Windows 10/11, replacing RAM/SSDs, cable management, thermal paste servicing, and troubleshooting daily customer issues.',
    iconName: 'Cpu',
    level: 'Hands-On Shop Experience',
    skills: ['PC Component Assembly', 'Hardware Fault Diagnostics', 'Windows 10/11 Clean Installs', 'Driver & BIOS Configuration', 'Thermal Servicing', 'PowerShell Diagnostics'],
    keyTools: ['Precision Tool Kit', 'Thermal Paste', 'Rufus Bootable USB', 'CrystalDiskInfo & HWiNFO64'],
    currentFocus: 'Testing system changes with safe restore paths and automated health scripts.',
  },
  {
    id: 'python',
    title: 'Python Scripting & System Automation',
    shortDesc: 'Advanced Python scripts, automation daemons, and CustomTkinter desktop GUIs.',
    details:
      'Python is my most advanced programming language. I build multi-threaded desktop utilities with CustomTkinter, write background file management daemons, and automate network configurations.',
    iconName: 'Terminal',
    level: 'Advanced',
    skills: ['Python 3 & OOP', 'AsyncIO & Threading', 'CustomTkinter UI', 'dnslib & Socket Handling', 'Subprocess & Winreg'],
    keyTools: ['Python 3.12', 'CustomTkinter', 'PySocks', 'PowerShell'],
    currentFocus: 'Building lightweight system background daemons and automation scripts.',
  },
  {
    id: 'web',
    title: 'Web Experiences & Live Client Demos',
    shortDesc: 'Real-world responsive websites built with React, Tailwind, and modern tooling.',
    details:
      'Created real-world web experiences including Flavourz Restaurant, Sahiwal Broast, and Apex Auto Detailing. Experienced in React, TypeScript, Tailwind CSS, and smooth Framer Motion interactions.',
    iconName: 'Globe',
    level: 'Intermediate Builder',
    skills: ['React 19 & TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Responsive Layout Math', 'Vite Bundler'],
    keyTools: ['VS Code', 'Vite', 'Chrome DevTools', 'Netlify / Cloudflare Pages'],
    currentFocus: 'Creating high-performance, fluid interactive web portfolios and web apps.',
  },
];

export const projectsList: ProjectItem[] = [
  {
    id: 'netshield-dns-guard',
    title: 'NetShield: Dynamic DNS-Leak Guard & Proxy Enforcer',
    subtitle: 'System-level Windows network utility eliminating Transparent ISP DNS Hijacking, UDP leaks, and proxy mismatches.',
    category: 'python',
    categoryLabel: 'Network Security / Python',
    year: '2026',
    status: 'Completed',
    badge: 'FLAGSHIP PROJECT · v4.0.0',
    description:
      'A lightweight, system-level Windows networking utility engineered to eliminate Transparent ISP DNS Hijacking, UDP Port 53 Leaks, and Split-Tunnel Proxy Mismatches. Automatically detects active proxy geolocation and enforces strict, encrypted, geo-aligned DNS resolution across all network adapters with a kernel firewall kill-switch.',
    problemSolved:
      'When using residential proxies or split-tunnel VPNs on Windows, the OS frequently leaks DNS queries through the local ISP default gateway via Smart Multi-Homed Name Resolution (SMHNR) and IPv6 fallback, exposing the user\'s true country and triggering anti-fraud risk flags.',
    whatILearned: [
      'Configuring Windows Advanced Firewall rules programmatically via netsh advfirewall',
      'Neutralizing Windows Smart Multi-Homed Name Resolution (SMHNR) via Winreg policies',
      'Implementing a local DNS-over-HTTPS (DoH) resolver daemon using dnslib and aiohttp',
      'Building an asynchronous CustomTkinter dark-mode desktop GUI with live traffic telemetry',
    ],
    techStack: ['Python 3.10+', 'CustomTkinter', 'dnslib', 'PySocks', 'aiohttp-socks', 'Windows Firewall API', 'Winreg'],
    image: '/src/assets/images/netshield_security_guard_1792927629684.jpg',
    githubUrl: 'https://github.com/ali25cit235-boop/NetShield-DNS-Guard',
    benchmark: {
      before: '70% Disguise Score (Leaking Local ISP DNS)',
      after: '100% Zero-Leak Verified (TalkTalk / Target UK Geo-Match)',
      metric: 'Whoer / IPInfo / Scamalytics Anti-Fraud Audit',
    },
    codeSnippet: {
      language: 'python',
      code: `class FirewallKillSwitch:
    @staticmethod
    def block_unauthorized_port_53():
        """Kernel firewall kill-switch: Drops outbound UDP/TCP 53 to local ISP gateway"""
        cmd_udp = (
            'netsh advfirewall firewall add rule '
            'name="NetShield_Block_Port53_UDP" dir=out action=block '
            'protocol=UDP remoteport=53'
        )
        cmd_tcp = (
            'netsh advfirewall firewall add rule '
            'name="NetShield_Block_Port53_TCP" dir=out action=block '
            'protocol=TCP remoteport=53'
        )
        subprocess.run(cmd_udp, shell=True, check=True)
        subprocess.run(cmd_tcp, shell=True, check=True)
        print("[+] Port 53 outbound queries locked to encrypted DoH tunnel only.")`,
    },
    features: [
      'Automated Tunnel & Geo-Scanning: Verifies residential proxy authenticity and ASN',
      'Dynamic Geo-Aligned DNS Enforcement: Synchronizes system DNS with target region',
      'Kernel/Firewall Port-53 Kill-Switch: Programmatically blocks unauthorized leaks',
      'SMHNR & IPv6 Neutralization: Eliminates multi-adapter routing bypasses',
      'One-Click State Restoration: Clean rollback engine with ipconfig /flushdns',
    ],
  },
  {
    id: 'android-dynamic-island',
    title: 'Android Dynamic Island & Notification Overlay',
    subtitle: 'Expandable native notification pill overlay prototype built with Kotlin and Android Service architecture.',
    category: 'android',
    categoryLabel: 'Android / Kotlin',
    year: '2026',
    status: 'Ongoing Prototype',
    badge: 'FEATURED ON RESUME',
    description:
      'A modern Android development prototype that brings an expandable Dynamic Island status and notification overlay to Android devices. Explores Android Foreground Services, WindowManager overlays, smooth spring physics, and real-time state rendering.',
    problemSolved:
      'Provides a unified, minimal status pill at the top of the mobile screen for quick notifications, music controls, and timer alerts without pulling down the full status bar.',
    whatILearned: [
      'Managing Android WindowManager.LayoutParams for system-level overlay windows',
      'Handling touch event delegation between the overlay and underlying active apps',
      'Building expandable spring animations and gesture-based dismissal',
      'Exploring Firebase backend integration and live notification listeners',
    ],
    techStack: ['Kotlin', 'Android SDK', 'WindowManager', 'Jetpack Compose', 'Coroutines', 'Android Studio'],
    image: '/src/assets/images/android_kotlin_project_1792478732869.jpg',
    githubUrl: 'https://github.com/ali25cit235',
    codeSnippet: {
      language: 'kotlin',
      code: `// Dynamic Island View Setup
fun setupOverlayView(context: Context): View {
    val layoutParams = WindowManager.LayoutParams(
        WindowManager.LayoutParams.WRAP_CONTENT,
        WindowManager.LayoutParams.WRAP_CONTENT,
        WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
        WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
        PixelFormat.TRANSLUCENT
    ).apply {
        gravity = Gravity.TOP or Gravity.CENTER_HORIZONTAL
        y = 16 // Status bar offset
    }
    return ComposeView(context).apply {
        setContent { DynamicIslandPill(onExpand = { expandIsland() }) }
    }
}`,
    },
    features: [
      'Expandable notification island with smooth spring transitions',
      'Persistent foreground service with minimal battery overhead',
      'Touch gesture interactions (tap to expand, swipe to dismiss)',
      'Integrated status badges for playback and timer alerts',
    ],
  },
  {
    id: 'live-web-demos',
    title: 'Commercial Web Showcase Demos',
    subtitle: 'Three production-grade client showcase websites deployed on Netlify and Cloudflare Pages.',
    category: 'web',
    categoryLabel: 'Web / React',
    year: '2025',
    status: 'Completed',
    badge: 'LIVE ON CLOUDFLARE & NETLIFY',
    description:
      'A suite of live web development projects created for food, dining, and automotive services: Flavourz Restaurant, Sahiwal Broast, and Apex Auto Detailing. Demonstrates responsive layout design, clean typography, and interactive UI.',
    problemSolved:
      'Demonstrates end-to-end frontend craftsmanship—turning commercial business briefs into fast, high-converting, accessible web experiences.',
    whatILearned: [
      'Designing domain-tailored color palettes and typography pairings',
      'Optimizing mobile touch navigation and responsive menu systems',
      'Continuous deployment via Git to Netlify and Cloudflare Pages',
      'Implementing high-contrast dark modes and clean card layouts',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Cloudflare Pages', 'Netlify'],
    image: '/src/assets/images/apex_car_detailing_1791213804660.jpg',
    features: [
      'Flavourz Restaurant Demo: flavourz-restaurant-demo.netlify.app',
      'Sahiwal Broast Demo: sahiwal-broast-demo.pages.dev',
      'Apex Auto Detailing Studio: apex-auto-detailing-demo.pages.dev',
      'Mobile-first responsive grids with 100% viewport compliance',
    ],
  },
  {
    id: 'family-shop-maintenance',
    title: 'PC Hardware & Software Support Toolkit',
    subtitle: 'Diagnostic procedures, storage health checks, and Windows OS deployment scripts.',
    category: 'hardware',
    categoryLabel: 'Hardware & Systems',
    year: '2025',
    status: 'Completed',
    badge: 'SHOP PROVEN',
    description:
      'A practical suite of diagnostic scripts, SMART hard drive monitors, and clean installation routines developed through daily hands-on repair work at our family computer shop.',
    problemSolved:
      'Accelerates PC troubleshooting by automating memory leak checks, thermal stress logs, temporary file purges, and Windows update repairs.',
    whatILearned: [
      'Hands-on diagnosis of faulty RAM channels and thermal throttling',
      'Automating Windows maintenance with PowerShell CIM/WMI commands',
      'Configuring bootable deployment drives and clean driver packages',
      'Applying the principle: "Safe configuration with a clear restore path"',
    ],
    techStack: ['PowerShell', 'Windows WMI/CIM', 'CrystalDiskInfo', 'HWiNFO64', 'Batch Scripting'],
    image: '/src/assets/images/hardware_pc_bench_1792478731744.jpg',
    features: [
      'Automated SMART drive status report and storage analysis',
      'Thermal monitoring triggers and CPU/RAM load logging',
      'Clean Windows 10/11 installation and driver validation guide',
      'Hardware specification summary generator for bench logging',
    ],
  },
  {
    id: 'task-flow-android',
    title: 'TaskFlow — Student Task Companion',
    subtitle: 'Native Android app for tracking lab assignments, study milestones, and deadlines.',
    category: 'android',
    categoryLabel: 'Android / Kotlin',
    year: '2026',
    status: 'Ongoing Prototype',
    description:
      'A streamlined Android application designed to help CIT students keep track of lab assignments, upcoming quizzes, and daily study milestones without clutter.',
    problemSolved:
      'Works 100% offline using a local Room database with instant local search and zero intrusive ads.',
    whatILearned: [
      'Structuring Jetpack Compose UI state using ViewModels and StateFlow',
      'Implementing offline persistence with Android Room and DAO interfaces',
      'Configuring Material You dynamic theming and responsive phone layouts',
    ],
    techStack: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Coroutines', 'Material Design 3'],
    features: [
      'Offline-first data persistence using Room database',
      'Priority tags (High, Medium, Normal) with clean visual cues',
      'Deadline countdown and reminder alerts',
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
    ],
    techStack: ['Python 3', 'pathlib', 'shutil', 'argparse', 'Logging'],
    features: [
      'Automatic extension matching for 40+ common file formats',
      'Collision prevention (appends timestamps if file already exists)',
      'Dry-run mode to inspect moves before executing',
    ],
  },
];

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: '2023 – 2024',
    period: 'Family Computer Shop & Hardware Foundation',
    title: 'PC Hardware Repair & Hands-on Shop Practice',
    tagline: 'Learning how the physical machine operates before writing a line of code.',
    description:
      'Began hands-on technical work at our family computer shop in Kamalia. Diagnosed hardware component faults, assembled custom desktops, replaced thermal paste, upgraded RAM/SSDs, and performed clean Windows installations for retail clients.',
    learnings: ['PC Component Assembly & Diagnostics', 'Windows OS Deployment & Driver Configuration', 'Diagnostic-First Mindset: check causes before fixing'],
  },
  {
    year: '2025',
    period: 'GCT Kamalia & First Board Exam Distinction',
    title: 'Enrolled in DAE CIT & Achieved 87.5% Result',
    tagline: 'Formalizing computer science fundamentals and excelling academically.',
    description:
      'Enrolled in the 3-year Diploma of Associate Engineering (DAE) in Computer Information Technology at Government College of Technology, Kamalia. Scored an outstanding 1065 / 1200 marks (87.5% Distinction) in the first-year board examinations. Completed Office Management certification.',
    learnings: ['Top 87.5% first-year board academic standing', 'Networking fundamentals, DNS protocols, and socket programming', 'Advanced Python logic building and system scripting'],
  },
  {
    year: '2025 – 2026',
    period: 'Web Demos & Android Development',
    title: 'Commercial Web Demos & Kotlin Android Apps',
    tagline: 'Moving from basic scripts into building real user interfaces and mobile applications.',
    description:
      'Designed and deployed commercial web projects (Flavourz Restaurant, Sahiwal Broast, Apex Auto Detailing). Began studying native Android development in Android Studio with Kotlin, exploring Jetpack Compose and the Dynamic Island status overlay prototype.',
    learnings: ['Kotlin syntax, OOP, and Android Studio workflows', 'Jetpack Compose reactive UI architecture and overlay services', 'Modern web styling with Tailwind CSS and cloud deployment'],
  },
  {
    year: 'Present (2026)',
    period: 'NetShield & Systems Engineering',
    title: 'Engineering NetShield DNS Guard & Career Growth',
    tagline: 'Building open-source security utilities and seeking entry-level IT opportunities.',
    description:
      'Engineered and published NetShield (v4.0.0), a Windows DNS-leak guard and firewall kill-switch to eliminate ISP DNS hijacking for proxy users. Seeking entry-level IT internships to apply hands-on shop and software skills.',
    learnings: ['Windows Firewall API (netsh) & kernel port rules', 'Local DNS-over-HTTPS (DoH) resolver daemon implementation', 'Safe configuration: testing changes with a clear restore path'],
  },
];

export const techSetup = {
  hardware: [
    { title: 'Workstation PC', specs: 'Custom Build · Intel Core i5 · 16GB High-Speed RAM · 512GB NVMe SSD' },
    { title: 'Display Setup', specs: 'Dual Monitor Configuration for simultaneous coding, debugging, and network monitoring' },
    { title: 'Peripherals', specs: 'Tactile Mechanical Keyboard · Precision Ergonomic Mouse (42 WPM typing speed)' },
    { title: 'Testing Devices', specs: 'Physical Android Test Device (Android 14) + Windows 11 Elevated Test Environment' },
  ],
  software: [
    { title: 'Primary IDEs', specs: 'Android Studio (for Kotlin) & VS Code (for Python, TypeScript, Systems)' },
    { title: 'Terminal & Shell', specs: 'Windows Terminal + PowerShell 7 + Git Bash (Elevated Admin)' },
    { title: 'Operating Systems', specs: 'Windows 11 Pro (Primary) · Ubuntu Linux (in WSL & secondary testing)' },
    { title: 'Network Analysis Tools', specs: 'Wireshark, Whoer DNS Leak Test, IPInfo, netsh CLI' },
  ],
};
