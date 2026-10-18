/**
 * Nadit Rabab Shah Pranzol - Portfolio Engine
 * Clean, modern vanilla JavaScript for high interactivity, responsiveness,
 * simulated network diagnostics terminal, and smooth UI transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initNavbarScrollSpy();
  initMobileMenu();
  initSkillFilters();
  initInteractiveTerminal();
  initProjectModals();
  initCertificateModal();
  initClipboardButtons();
  initContactForm();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light) with LocalStorage Persistence
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('nadit_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('nadit_theme', newTheme);
    updateThemeIcon(toggleBtn, newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  });
}

function updateThemeIcon(btn, theme) {
  const icon = btn.querySelector('i');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fas fa-moon';
    btn.setAttribute('aria-label', 'Switch to dark theme');
  } else {
    icon.className = 'fas fa-sun';
    btn.setAttribute('aria-label', 'Switch to light theme');
  }
}

/* ==========================================================================
   2. Typing Animation for Hero Subtitle
   ========================================================================== */
function initTypingEffect() {
  const roleEl = document.getElementById('typedRole');
  if (!roleEl) return;

  const roles = [
    'Junior Broadcast Engineer (IT)',
    'MikroTik Certified Engineer (MTCSE/MTCRE/MTCNA)',
    'Cisco CCNA Trained Network Specialist',
    'B.Sc. in Computer Science & Engineering',
    'IT Infrastructure & Systems Specialist'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const delayBetweenWords = 1800;

  function typeTick() {
    const currentWord = roles[roleIdx];

    if (isDeleting) {
      roleEl.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      roleEl.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let timeoutSpeed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentWord.length) {
      timeoutSpeed = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      timeoutSpeed = 400;
    }

    setTimeout(typeTick, timeoutSpeed);
  }

  typeTick();
}

/* ==========================================================================
   3. Navbar Scroll Effect & Active Section Spy
   ========================================================================== */
function initNavbarScrollSpy() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll spy
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileDrawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    menuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

/* ==========================================================================
   5. Skill Filtering System
   ========================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'block';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Interactive Terminal / Network Console
   ========================================================================== */
function initInteractiveTerminal() {
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalBody = document.querySelector('.terminal-body');
  const quickCmdBadges = document.querySelectorAll('.cmd-badge');

  if (!terminalInput || !terminalOutput) return;

  const commands = {
    help: `Available commands:
  • <span style="color:#38bdf8">whoami</span>       - Summary of Nadit's role & expertise
  • <span style="color:#38bdf8">skills</span>       - Key networking & technical domains
  • <span style="color:#38bdf8">experience</span>   - Career history at Independent TV & Southeast Bank
  • <span style="color:#38bdf8">certs</span>        - MikroTik (MTCNA, MTCRE, MTCSE) & Cisco CCNA
  • <span style="color:#38bdf8">ping</span>         - Test ICMP ping to broadcast server
  • <span style="color:#38bdf8">contact</span>      - Direct communication channels
  • <span style="color:#38bdf8">clear</span>        - Clear terminal screen`,

    whoami: `<span style="color:#10b981">Nadit Rabab Shah Pranzol</span>
Role: Junior Broadcast Engineer (IT) @ Independent Television Limited
Degree: B.Sc. in Computer Science & Engineering (CGPA 3.53/4.00)
Location: Dhaka, Bangladesh
Specialization: 24/7 Live Broadcast IT Systems, Enterprise Routing/Switching (MikroTik & Cisco), Server Hardening.`,

    skills: `• <strong style="color:#38bdf8">Networking:</strong> Cisco Routing & Switching, MikroTik RouterOS, LAN/WAN, VLAN, NAT, OSPF, Security.
• <strong style="color:#38bdf8">Broadcast & Systems:</strong> On-Air Transmission Systems, Linux/Windows Servers, PABX Telephony, Hardware Diagnosis.
• <strong style="color:#38bdf8">Cybersecurity:</strong> File Integrity Monitoring (FIM), SHA-256 Hashing, Server Hardening, Access Control.
• <strong style="color:#38bdf8">Services:</strong> DNS, DHCP, RADIUS, Proxy, SMTP, FTP, TFTP in VM Labs.`,

    experience: `[1] Junior Broadcast Engineer (IT) | Independent Television Ltd. (Jun 2025 – Present)
    • 24/7 Server maintenance & mission-critical broadcast automation
    • Rapid hardware/network troubleshooting to eliminate on-air broadcast downtime
    • Corporate IT & PABX telecommunications infrastructure

[2] Operations & IT Intern | Southeast Bank Limited (Feb 2024 – May 2024)
    • Core banking database entry & customer technical assistance
    • Financial audit reconciliation and records verification`,

    certs: `[✓] MikroTik Certified Network Associate (MTCNA) | Cert #2608NA7361 <span style="color:#6366f1">[PDF Document Attached]</span>
[✓] MikroTik Certified Routing Engineer (MTCRE)  | Cert #2608RE7389 <span style="color:#6366f1">[PDF Document Attached]</span>
[✓] MikroTik Certified Security Engineer (MTCSE) | Cert #2608SE7405 <span style="color:#6366f1">[PDF Document Attached]</span>
[✓] Cisco CCNA: Enterprise Networking, Security & Automation <span style="color:#38bdf8">[Credly Badge Verified]</span>
[✓] Cisco CCNA: Switching, Routing & Wireless Essentials <span style="color:#38bdf8">[Credly Badge Verified]</span>
[✓] Cisco CCNA: Introduction to Networks <span style="color:#38bdf8">[Credly Badge Verified]</span>`,

    ping: `PING broadcast.independent.tv (192.168.10.1) 56(84) bytes of data.
64 bytes from 192.168.10.1: icmp_seq=1 ttl=64 time=0.84 ms
64 bytes from 192.168.10.1: icmp_seq=2 ttl=64 time=0.72 ms
64 bytes from 192.168.10.1: icmp_seq=3 ttl=64 time=0.79 ms
64 bytes from 192.168.10.1: icmp_seq=4 ttl=64 time=0.68 ms
--- broadcast.independent.tv ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, rtt min/avg/max = 0.68/0.75/0.84 ms
<span style="color:#10b981">[STATUS: All systems nominal. 100% on-air broadcast availability.]</span>`,

    contact: `Email:   naditpranzol@gmail.com | naditshah6516@gmail.com
Phone:   +880 1852-365432 | +880 1983-553353
LinkedIn: linkedin.com/in/nadit-pranzol
Location: Niketan, Dhaka, Bangladesh`
  };

  function executeCommand(cmdText) {
    const trimmed = cmdText.trim().toLowerCase();
    
    // Add command to output
    const cmdLine = document.createElement('div');
    cmdLine.innerHTML = `<span style="color:#38bdf8">visitor@nadit-network:~$</span> ${escapeHTML(cmdText)}`;
    terminalOutput.appendChild(cmdLine);

    if (trimmed === 'clear') {
      terminalOutput.innerHTML = '';
      terminalInput.value = '';
      return;
    }

    const responseDiv = document.createElement('div');
    responseDiv.style.marginBottom = '0.75rem';
    responseDiv.style.marginTop = '0.25rem';

    if (commands[trimmed]) {
      responseDiv.innerHTML = commands[trimmed];
    } else if (trimmed === '') {
      // empty return
    } else {
      responseDiv.innerHTML = `<span style="color:#ef4444">command not found: "${escapeHTML(trimmed)}". Type <strong style="color:#38bdf8">help</strong> to see available commands.</span>`;
    }

    terminalOutput.appendChild(responseDiv);
    terminalInput.value = '';
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    }
  });

  quickCmdBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      const cmd = badge.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   7. Project Detail Modal Data & Handler
   ========================================================================== */
function initProjectModals() {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalCloseBtn');
  const viewDetailBtns = document.querySelectorAll('.view-project-btn');

  if (!modalOverlay || !modalTitle || !modalBody) return;

  const projectDetails = {
    'servers-network': {
      title: 'Server Configuration for Enhanced Network Security & Performance',
      category: 'Virtual Machine Infrastructure & Hardened Services',
      content: `
        <div style="margin-bottom:1.5rem">
          <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
            Designed, deployed, and hardened an enterprise-grade multi-tier network services infrastructure inside a virtualized environment. This testbed simulates mission-critical datacenter operations with strict security access boundaries, zero-trust authentication, and bandwidth optimization.
          </p>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-color);">
            <strong style="color:var(--primary); display:block; margin-bottom:0.35rem;">Core Network Protocols</strong>
            <span style="font-size:0.875rem; color:var(--text-secondary);">DNS, DHCP, RADIUS, Caching Proxy, SMTP, FTP, and TFTP.</span>
          </div>
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-color);">
            <strong style="color:var(--accent-emerald); display:block; margin-bottom:0.35rem;">Security Hardening</strong>
            <span style="font-size:0.875rem; color:var(--text-secondary);">RADIUS user access policies, firewall rulesets, proxy content filtering, secure credentials.</span>
          </div>
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-color);">
            <strong style="color:var(--accent-indigo); display:block; margin-bottom:0.35rem;">Environment</strong>
            <span style="font-size:0.875rem; color:var(--text-secondary);">Virtual Machine Hypervisors, Linux distributions, Windows Server, Virtual Network Adapters.</span>
          </div>
        </div>
        <div>
          <h4 style="font-size:1.05rem; margin-bottom:0.6rem; color:var(--text-primary);">Engineering Highlights:</h4>
          <ul style="color:var(--text-secondary); font-size:0.925rem; line-height:1.7; padding-left:1.25rem;">
            <li>Configured centralized AAA (Authentication, Authorization, and Accounting) via RADIUS to regulate network access.</li>
            <li>Optimized network packet routing and proxy caching to accelerate response times and reduce redundant upstream bandwidth consumption.</li>
            <li>Conducted simulated security stress tests and verified failover mechanisms across subnet boundaries.</li>
          </ul>
        </div>
      `
    },
    'file-integrity': {
      title: 'File Integrity Monitoring (FIM) Module with Advanced Hashing',
      category: 'Cybersecurity & Systems Integrity',
      content: `
        <div style="margin-bottom:1.5rem">
          <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
            Engineered an automated File Integrity Monitoring (FIM) security engine designed to protect critical operating system configuration files and sensitive directories from unauthorized tampering, ransomware modifications, or administrative drift.
          </p>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-color);">
            <strong style="color:var(--primary); display:block; margin-bottom:0.35rem;">Algorithms Used</strong>
            <span style="font-size:0.875rem; color:var(--text-secondary);">SHA-256 and MD5 cryptographic digest algorithms for baseline verification.</span>
          </div>
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-color);">
            <strong style="color:var(--accent-emerald); display:block; margin-bottom:0.35rem;">Detection Capabilities</strong>
            <span style="font-size:0.875rem; color:var(--text-secondary);">Real-time alerts for unauthorized modifications, file deletion, and new unauthorized payloads.</span>
          </div>
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-color);">
            <strong style="color:var(--accent-indigo); display:block; margin-bottom:0.35rem;">Security Application</strong>
            <span style="font-size:0.875rem; color:var(--text-secondary);">Server baseline compliance, tamper detection for system binaries and configuration registries.</span>
          </div>
        </div>
        <div>
          <h4 style="font-size:1.05rem; margin-bottom:0.6rem; color:var(--text-primary);">Engineering Highlights:</h4>
          <ul style="color:var(--text-secondary); font-size:0.925rem; line-height:1.7; padding-left:1.25rem;">
            <li>Generates cryptographic hash baselines and recursively monitors target system paths.</li>
            <li>Detects bit-level modifications instantly by comparing computed runtime digests with verified golden state signatures.</li>
            <li>Produces formatted alert logs and audit trails suitable for enterprise security operations center (SOC) review.</li>
          </ul>
        </div>
      `
    }
  };

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = btn.getAttribute('data-project');
      const data = projectDetails[pId];
      if (data) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. Clipboard Copy & Toast Notifications
   ========================================================================== */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`, 'success');
        const icon = btn.querySelector('i');
        if (icon) {
          const originalClass = icon.className;
          icon.className = 'fas fa-check';
          setTimeout(() => {
            icon.className = originalClass;
          }, 1500);
        }
      }).catch(() => {
        showToast('Failed to copy to clipboard', 'error');
      });
    });
  });
}

function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconClass = 'fas fa-info-circle';
  if (type === 'success') iconClass = 'fas fa-check-circle';
  if (type === 'error') iconClass = 'fas fa-exclamation-triangle';

  toast.innerHTML = `<i class="${iconClass}"></i> <span>${escapeHTML(message)}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   9. Interactive Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName')?.value.trim();
    const email = document.getElementById('formEmail')?.value.trim();
    const subject = document.getElementById('formSubject')?.value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('formMessage')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Prepare mailto link as fallback
    const mailtoUri = `mailto:naditpranzol@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent("Sender: " + name + " (" + email + ")\n\n" + message)}`;
    
    showToast(`Thank you ${name}! Opening mail client...`, 'success');
    setTimeout(() => {
      window.location.href = mailtoUri;
      form.reset();
    }, 1200);
  });
}

/* ==========================================================================
   10. Certificate PDF Viewer Modal
   ========================================================================== */
function initCertificateModal() {
  const certModalOverlay = document.getElementById('certModalOverlay');
  const certPdfIframe = document.getElementById('certPdfIframe');
  const certModalTitleText = document.getElementById('certModalTitleText');
  const certDownloadLink = document.getElementById('certDownloadLink');
  const certModalCloseBtn = document.getElementById('certModalCloseBtn');
  const viewCertBtns = document.querySelectorAll('.view-cert-btn');

  if (!certModalOverlay || !certPdfIframe) return;

  viewCertBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pdfPath = btn.getAttribute('data-pdf');
      const title = btn.getAttribute('data-title') || 'Certificate Preview';

      if (pdfPath) {
        certPdfIframe.src = pdfPath;
        if (certModalTitleText) certModalTitleText.textContent = title;
        if (certDownloadLink) {
          certDownloadLink.href = pdfPath;
          certDownloadLink.setAttribute('download', pdfPath.split('/').pop());
        }
        certModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeCertModal() {
    certModalOverlay.classList.remove('active');
    certPdfIframe.src = '';
    document.body.style.overflow = '';
  }

  certModalCloseBtn?.addEventListener('click', closeCertModal);
  certModalOverlay.addEventListener('click', (e) => {
    if (e.target === certModalOverlay) closeCertModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModalOverlay.classList.contains('active')) {
      closeCertModal();
    }
  });
}

