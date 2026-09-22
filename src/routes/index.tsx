import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Mail, Menu, Pencil, RotateCcw, X } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import portraitAsset from "../assets/ketha-bhanu-teja-portrait.jpeg.asset.json";
import ragVisual from "../assets/rag-chatbot-visual.jpg";
import emotionVisual from "../assets/emotion-detection-visual.jpg";
import placeholderVisual from "../assets/project-placeholder-visual.jpg";

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

const projectSchema = z.object({
  id: z.enum(["rag-chatbot", "emotion-detection", "future-project"]),
  title: z.string().trim().min(1, "Add a project title.").max(90, "Keep the title under 90 characters."),
  date: z.string().trim().min(1, "Add a date or date range.").max(30, "Keep the date under 30 characters."),
  description: z.string().trim().min(1, "Add a short project description.").max(420, "Keep the description under 420 characters."),
  skills: z.array(z.string().trim().min(1).max(30)).min(1, "Add at least one skill.").max(8, "Use no more than eight skills."),
  url: z.string().trim().max(300).refine(
    (value) => value === "" || /^https?:\/\//i.test(value),
    "Enter a full link beginning with http:// or https://.",
  ),
});

type Project = z.infer<typeof projectSchema>;

const projectsSchema = z.array(projectSchema).length(3);
const PROJECTS_STORAGE_KEY = "ketha-portfolio-projects-v1";

const initialProjects: Project[] = [
  {
    id: "rag-chatbot",
    title: "AI-Powered Multi-Document RAG Chatbot",
    date: "Jun–Aug 2025",
    description: "Enterprise document Q&A using LangChain, FAISS, Hugging Face embeddings, and OpenAI GPT. Custom chunking improved retrieval accuracy by 35% while reducing latency.",
    skills: ["Python", "LangChain", "FAISS", "Streamlit"],
    url: "",
  },
  {
    id: "emotion-detection",
    title: "Real-Time Facial Expression & Emotion Detection",
    date: "Jan–Mar 2025",
    description: "A deep CNN and OpenCV system achieving 92% validation accuracy, with 40% less overfitting and live webcam inference at 30+ FPS.",
    skills: ["TensorFlow", "Keras", "OpenCV", "Streamlit"],
    url: "",
  },
  {
    id: "future-project",
    title: "Your Next Project — Placeholder",
    date: "Add project dates",
    description: "Replace this text with a concise summary of the problem, your approach, and the result you achieved.",
    skills: ["Add skills"],
    url: "",
  },
];

const projectMedia = {
  "rag-chatbot": {
    src: ragVisual,
    alt: "Illustration of documents flowing through a retrieval-augmented generation system",
  },
  "emotion-detection": {
    src: emotionVisual,
    alt: "Illustration of a real-time facial emotion detection interface",
  },
  "future-project": {
    src: placeholderVisual,
    alt: "Illustration of a modular artificial intelligence workspace",
  },
} satisfies Record<Project["id"], { src: string; alt: string }>;

function ProjectCard({
  project,
  onSave,
  onReset,
}: {
  project: Project;
  onSave: (project: Project) => void;
  onReset: (id: Project["id"]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(project);
  const [skillsText, setSkillsText] = useState(project.skills.join(", "));
  const [error, setError] = useState("");
  const media = projectMedia[project.id];

  const beginEditing = () => {
    setDraft(project);
    setSkillsText(project.skills.join(", "));
    setError("");
    setOpen(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = projectSchema.safeParse({
      ...draft,
      skills: skillsText.split(",").map((skill) => skill.trim()).filter(Boolean),
    });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Check the project details and try again.");
      return;
    }
    onSave(result.data);
    setOpen(false);
  };

  return (
    <>
      <article className="reveal glass-card group flex h-full flex-col overflow-hidden">
        <img src={media.src} alt={media.alt} width={1024} height={640} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-ink">{project.title}</h3>
            <Button type="button" variant="outline" size="icon" className="shrink-0 rounded-full bg-glass" aria-label={`Edit ${project.title}`} title="Edit project" onClick={beginEditing}>
              <Pencil />
            </Button>
          </div>
          <time className="mt-2 text-xs font-medium text-ink-soft">{project.date}</time>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.skills.map((skill) => <span key={skill} className="skill-pill">{skill}</span>)}
          </div>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer" className="placeholder-link mt-5 w-fit border-solid" aria-label={`Open ${project.title}`}>
              View project <ExternalLink size={15} />
            </a>
          ) : (
            <span className="placeholder-link mt-5 w-fit"><ExternalLink size={15} /> Project link — add in editor</span>
          )}
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90svh] w-[calc(100%-2rem)] overflow-y-auto border-glass-edge bg-card text-card-foreground sm:max-w-xl">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-ink">Edit project</DialogTitle>
              <DialogDescription>Update this card. Your changes are saved only on this device.</DialogDescription>
            </DialogHeader>
            <div className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`${project.id}-title`}>Project title</Label>
                <Input id={`${project.id}-title`} value={draft.title} maxLength={90} required onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${project.id}-date`}>Dates</Label>
                <Input id={`${project.id}-date`} value={draft.date} maxLength={30} required onChange={(event) => setDraft({ ...draft, date: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${project.id}-description`}>Description</Label>
                <Textarea id={`${project.id}-description`} value={draft.description} maxLength={420} required rows={5} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${project.id}-skills`}>Skills</Label>
                <Input id={`${project.id}-skills`} value={skillsText} maxLength={200} required aria-describedby={`${project.id}-skills-help`} onChange={(event) => setSkillsText(event.target.value)} />
                <p id={`${project.id}-skills-help`} className="text-xs text-muted-foreground">Separate up to eight skills with commas.</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${project.id}-url`}>Project link</Label>
                <Input id={`${project.id}-url`} type="url" value={draft.url} maxLength={300} placeholder="https://github.com/..." onChange={(event) => setDraft({ ...draft, url: event.target.value })} />
              </div>
              {error && <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">{error}</p>}
            </div>
            <DialogFooter className="mt-6 gap-2 sm:space-x-0">
              <Button type="button" variant="ghost" className="sm:mr-auto" onClick={() => { onReset(project.id); setOpen(false); }}>
                <RotateCcw /> Reset
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

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
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    try {
      const storedProjects = window.localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (!storedProjects) return;
      const result = projectsSchema.safeParse(JSON.parse(storedProjects));
      if (result.success) setProjects(result.data);
    } catch {
      window.localStorage.removeItem(PROJECTS_STORAGE_KEY);
    }
  }, []);

  const saveProject = (updatedProject: Project) => {
    setProjects((current) => {
      const next = current.map((project) => project.id === updatedProject.id ? updatedProject : project);
      window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetProject = (id: Project["id"]) => {
    const original = initialProjects.find((project) => project.id === id);
    if (!original) return;
    saveProject(original);
  };

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
        <section className="grid min-h-[calc(100svh-5.5rem)] items-center gap-5 py-6 sm:min-h-[calc(100svh-6rem)] sm:gap-10 sm:py-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0 text-center">
            <div className="hero-rise inline-flex items-center gap-2 rounded-full border border-glass-edge bg-glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-brand" /> AI / ML Engineer
            </div>
            <h1 className="hero-rise hero-delay-1 mt-4 font-display text-5xl font-bold leading-[1.04] text-ink sm:mt-6 sm:text-6xl lg:text-7xl">
              Ketha Bhanu<br />Teja
            </h1>
            <p className="hero-rise hero-delay-2 mx-auto mt-3 max-w-2xl font-display text-lg font-semibold text-ink sm:mt-5 sm:text-2xl">
              Building intelligent systems that see, retrieve, and reason.
            </p>
            <p className="hero-rise hero-delay-3 mx-auto mt-2 max-w-xl text-sm leading-relaxed text-ink-soft sm:mt-3 sm:text-lg">
              End-to-end machine learning pipelines, computer vision, and retrieval-augmented generation — from research to working products.
            </p>
            <div className="hero-rise hero-delay-4 mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
              <a href="#projects" className="primary-action">View projects</a>
              <a href="#contact" className="secondary-action">Get in touch</a>
            </div>
            <dl className="hero-rise hero-delay-4 mx-auto mt-6 grid max-w-lg grid-cols-3 gap-4 border-t border-glass-edge pt-4 sm:mt-10 sm:pt-6">
              <div><dt className="font-display text-2xl font-bold text-brand sm:text-3xl">92%</dt><dd className="mt-1 text-xs uppercase tracking-[0.08em] text-ink-soft">Validation accuracy</dd></div>
              <div><dt className="font-display text-2xl font-bold text-brand sm:text-3xl">35%</dt><dd className="mt-1 text-xs uppercase tracking-[0.08em] text-ink-soft">Retrieval lift</dd></div>
              <div><dt className="font-display text-2xl font-bold text-brand sm:text-3xl">30+</dt><dd className="mt-1 text-xs uppercase tracking-[0.08em] text-ink-soft">FPS real-time</dd></div>
            </dl>
          </div>
          <div className="hero-rise hero-delay-2 relative mx-auto w-full max-w-[9rem] sm:max-w-xs lg:max-w-sm">
            <div className="portrait-glow" aria-hidden="true" />
            <img src={portraitAsset.url} alt="Professional portrait of Ketha Bhanu Teja" width={590} height={615} className="relative aspect-[4/5] w-full rounded-[2rem] border border-glass-edge object-cover object-top shadow-portrait" />
            <div className="absolute -bottom-3 -left-8 -right-8 rounded-2xl border border-glass-edge bg-glass-strong px-2 py-2 text-center backdrop-blur-xl sm:-bottom-4 sm:left-4 sm:right-4 sm:px-4 sm:py-3">
              <p className="whitespace-nowrap font-display text-[10px] font-semibold text-ink sm:text-sm">Ravulapalem, Andhra Pradesh, India</p>
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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onSave={saveProject} onReset={resetProject} />
            ))}
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