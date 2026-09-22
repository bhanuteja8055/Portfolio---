import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Mail, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import portraitAsset from "../assets/ketha-bhanu-teja-portrait.jpeg.asset.json";
import ragVisual from "../assets/rag-chatbot-visual.jpg";
import emotionVisual from "../assets/emotion-detection-visual.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ketha Bhanu Teja — AI/ML Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Ketha Bhanu Teja, an AI/ML engineer building machine learning pipelines, RAG systems, and real-time computer vision applications.",
      },
      { property: "og:title", content: "Ketha Bhanu Teja — AI/ML Engineer" },
      {
        property: "og:description",
        content:
          "Explore Ketha Bhanu Teja's work in RAG, machine learning, and real-time computer vision.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = ["About", "Experience", "Skills", "Projects", "Education"];

const skillGroups = [
  {
    title: "Languages & Core CS",
    skills: ["Python", "SQL", "JavaScript", "HTML5", "CSS3", "Data Structures", "OOP"],
  },
  {
    title: "AI / ML & Frameworks",
    skills: ["TensorFlow", "PyTorch", "Keras", "Scikit-Learn", "LangChain", "Hugging Face", "OpenCV"],
  },
  {
    title: "Data & Developer Tools",
    skills: ["FAISS", "Pandas", "NumPy", "Streamlit", "MySQL", "Git", "Jupyter Notebook", "MS Excel"],
  },
  {
    title: "Domain Expertise",
    skills: ["RAG", "CNNs", "SMOTE", "Prompt Engineering", "Model Evaluation", "Data Pipelines"],
  },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="reveal mb-9 flex items-center gap-3">
      <span className="h-px w-8 bg-brand" aria-hidden="true" />
      <div>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
        <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      </div>
    </div>
  );
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <div className="ambient-field" aria-hidden="true" />

      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <nav className="glass-nav mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-5 md:flex md:justify-between" aria-label="Main navigation">
          <a href="#top" className="min-w-0 truncate font-display text-base font-bold text-ink sm:text-lg">
            <span className="text-brand">K</span>etha Bhanu Teja
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
            ))}
          </div>
          <a href="#contact" className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-contrast transition hover:bg-brand md:inline-flex">Contact</a>
          <button
            type="button"
            className="icon-button md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          {menuOpen && (
            <div className="col-span-2 grid gap-1 border-t border-glass-edge pt-3 md:hidden">
              {[...navItems, "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{item}</a>
              ))}
            </div>
          )}
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="grid min-h-[calc(100svh-5.5rem)] items-center gap-8 py-10 sm:min-h-[calc(100svh-6rem)] sm:gap-10 sm:py-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0 text-center">
            <div className="hero-rise inline-flex items-center gap-2 rounded-full border border-glass-edge bg-glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-brand" /> AI / ML Engineer
            </div>
            <h1 className="hero-rise hero-delay-1 mt-6 font-display text-5xl font-bold leading-[1.04] text-ink sm:text-6xl lg:text-7xl">
              Ketha Bhanu<br />Teja
            </h1>
            <p className="hero-rise hero-delay-2 mx-auto mt-5 max-w-2xl font-display text-xl font-semibold text-ink sm:text-2xl">
              Building intelligent systems that see, retrieve, and reason.
            </p>
            <p className="hero-rise hero-delay-3 mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              End-to-end machine learning pipelines, computer vision, and retrieval-augmented generation — from research to working products.
            </p>
            <div className="hero-rise hero-delay-4 mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#projects" className="primary-action">View projects</a>
              <a href="#contact" className="secondary-action">Get in touch</a>
            </div>
            <dl className="hero-rise hero-delay-4 mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-glass-edge pt-6">
              <div><dt className="font-display text-2xl font-bold text-brand sm:text-3xl">92%</dt><dd className="mt-1 text-xs uppercase tracking-[0.08em] text-ink-soft">Validation accuracy</dd></div>
              <div><dt className="font-display text-2xl font-bold text-brand sm:text-3xl">35%</dt><dd className="mt-1 text-xs uppercase tracking-[0.08em] text-ink-soft">Retrieval lift</dd></div>
              <div><dt className="font-display text-2xl font-bold text-brand sm:text-3xl">30+</dt><dd className="mt-1 text-xs uppercase tracking-[0.08em] text-ink-soft">FPS real-time</dd></div>
            </dl>
          </div>
          <div className="hero-rise hero-delay-2 relative mx-auto w-full max-w-[13rem] sm:max-w-xs lg:max-w-sm">
            <div className="portrait-glow" aria-hidden="true" />
            <img src={portraitAsset.url} alt="Professional portrait of Ketha Bhanu Teja" width={590} height={615} className="relative aspect-[4/5] w-full rounded-[2rem] border border-glass-edge object-cover object-top shadow-portrait" />
            <div className="absolute -bottom-4 left-4 right-4 rounded-2xl border border-glass-edge bg-glass-strong px-4 py-3 text-center backdrop-blur-xl">
              <p className="font-display text-sm font-semibold text-ink">Ravulapalem, Andhra Pradesh, India</p>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 py-14 sm:py-20">
          <div className="reveal glass-panel p-7 sm:p-12">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand">About</p>
            <p className="mt-6 max-w-4xl text-xl leading-relaxed text-ink sm:text-2xl">
              I’m an AI/ML engineer with a B.Tech in Computer Science & Engineering, specializing in AI and machine learning. I build end-to-end ML pipelines, deep-learning systems, and RAG applications with a focus on measurable performance and practical deployment.
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
              My recent work spans real-time computer vision, document intelligence, model evaluation, and streamlined data workflows across research and agile engineering environments.
            </p>
          </div>
        </section>

        <section id="experience" className="scroll-mt-28 py-14 sm:py-20">
          <SectionHeading eyebrow="Career" title="Experience" />
          <div className="relative space-y-6 pl-6 sm:pl-9">
            <span className="timeline-line" aria-hidden="true" />
            <article className="reveal glass-card relative p-6 sm:p-8">
              <span className="timeline-dot bg-brand" aria-hidden="true" />
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0"><h3 className="font-display text-xl font-semibold text-ink">AI-ML Virtual Intern</h3><p className="mt-1 text-sm font-medium text-brand">AICTE – EduSkills · Virtual</p></div>
                <time className="shrink-0 rounded-full bg-brand-faint px-3 py-1 text-xs font-semibold text-brand">Oct–Dec 2024</time>
              </div>
              <ul className="achievement-list mt-5">
                <li>Engineered six end-to-end ML pipelines, increasing model accuracy by 12%.</li>
                <li>Applied SMOTE to reduce false-negative rates by 9% and standardized workflows to accelerate deployment by 20%.</li>
              </ul>
            </article>
            <article className="reveal glass-card relative p-6 sm:p-8">
              <span className="timeline-dot bg-accent" aria-hidden="true" />
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0"><h3 className="font-display text-xl font-semibold text-ink">Machine Learning Research Intern</h3><p className="mt-1 text-sm font-medium text-brand">IIIT Hyderabad · Hyderabad, AP</p></div>
                <time className="shrink-0 rounded-full bg-accent-faint px-3 py-1 text-xs font-semibold text-accent-deep">Aug 2023–May 2024</time>
              </div>
              <ul className="achievement-list mt-5">
                <li>Evaluated six model variants on 10,000+ records, reaching a peak ROC-AUC of 0.89.</li>
                <li>Automated benchmark testing and performance logging, cutting evaluation time by 25%.</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="skills" className="scroll-mt-28 py-14 sm:py-20">
          <SectionHeading eyebrow="Toolkit" title="Skills" />
          <div className="grid gap-5 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <article key={group.title} className="reveal glass-card p-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-brand">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => <span key={skill} className="skill-pill">{skill}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-28 py-14 sm:py-20">
          <SectionHeading eyebrow="Selected work" title="Projects & Highlights" />
          <div className="grid gap-6 md:grid-cols-2">
            <article className="reveal glass-card group overflow-hidden">
              <img src={ragVisual} alt="Illustration of documents flowing through a retrieval-augmented generation system" width={1024} height={640} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3"><h3 className="max-w-sm font-display text-xl font-semibold text-ink">AI-Powered Multi-Document RAG Chatbot</h3><time className="text-xs font-medium text-ink-soft">Jun–Aug 2025</time></div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">Enterprise document Q&A using LangChain, FAISS, Hugging Face embeddings, and OpenAI GPT. Custom chunking improved retrieval accuracy by 35% while reducing latency.</p>
                <div className="mt-4 flex flex-wrap gap-2"><span className="skill-pill">Python</span><span className="skill-pill">LangChain</span><span className="skill-pill">FAISS</span><span className="skill-pill">Streamlit</span></div>
                <span className="placeholder-link mt-5"><ExternalLink size={15} /> Project link — placeholder</span>
              </div>
            </article>
            <article className="reveal glass-card group overflow-hidden">
              <img src={emotionVisual} alt="Illustration of a real-time facial emotion detection interface" width={1024} height={640} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3"><h3 className="max-w-sm font-display text-xl font-semibold text-ink">Real-Time Facial Expression & Emotion Detection</h3><time className="text-xs font-medium text-ink-soft">Jan–Mar 2025</time></div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">A deep CNN and OpenCV system achieving 92% validation accuracy, with 40% less overfitting and live webcam inference at 30+ FPS.</p>
                <div className="mt-4 flex flex-wrap gap-2"><span className="skill-pill">TensorFlow</span><span className="skill-pill">Keras</span><span className="skill-pill">OpenCV</span><span className="skill-pill">Streamlit</span></div>
                <span className="placeholder-link mt-5"><ExternalLink size={15} /> Project link — placeholder</span>
              </div>
            </article>
          </div>
        </section>

        <section id="education" className="scroll-mt-28 py-14 sm:py-20">
          <SectionHeading eyebrow="Foundation" title="Education & Recognition" />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="reveal glass-card p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">2021–2025</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">B.Tech in Computer Science & Engineering</h3>
              <p className="mt-2 text-ink-soft">Artificial Intelligence & Machine Learning</p>
              <p className="mt-5 text-sm leading-relaxed text-ink-soft">Kakinada Institute of Engineering and Technology (JNTUK), Korangi, AP · CGPA 7.20 / 10.0</p>
            </div>
            <div className="reveal glass-card p-7 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ink">Certifications & achievements</h3>
              <ul className="achievement-list mt-5">
                <li>Python Foundation — Infosys Springboard</li>
                <li>Fundamentals of ML — IIIT Hyderabad</li>
                <li>Presented ML research papers at national symposia</li>
                <li>1st Place, Inter-College Kabaddi Tournament</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 py-14 pb-24 sm:py-20 sm:pb-28">
          <div className="reveal contact-panel p-7 sm:p-14">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand">Contact</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-ink sm:text-5xl">Let’s build something intelligent.</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">Open to AI/ML engineering opportunities, collaborations, and conversations about practical machine learning.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="mailto:bhanuteja725@gmail.com" className="primary-action"><Mail size={17} /> bhanuteja725@gmail.com</a>
              <a href="https://linkedin.com/in/KethaBhanuTeja" target="_blank" rel="noreferrer" className="secondary-action">LinkedIn <ExternalLink size={15} /></a>
              <a href="https://github.com/bhanuteja8055" target="_blank" rel="noreferrer" className="secondary-action">GitHub <ExternalLink size={15} /></a>
            </div>
          </div>
          <footer className="mt-8 flex flex-col gap-2 text-center text-xs text-ink-soft sm:flex-row sm:justify-between sm:text-left">
            <p>© 2026 Ketha Bhanu Teja</p><p>AI/ML Engineer · Andhra Pradesh, India</p>
          </footer>
        </section>
      </main>
    </div>
  );
}