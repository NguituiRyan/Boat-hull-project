import { useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { profile, skills, experience, projects, type Project } from './content';

const nav = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'Resume', href: profile.links.resume },
  { label: 'LinkedIn', href: profile.links.linkedin },
  { label: 'X / Twitter', href: profile.links.twitter },
  { label: 'Dribbble', href: profile.links.dribbble },
];

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="glass-card-sm relative p-6 transition-transform duration-200 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-ring">
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="font-mono text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      <h3 className="font-heading text-2xl font-semibold mb-2">
        {/* Stretched over the card so the whole article is clickable */}
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="text-left after:absolute after:inset-0 focus-visible:outline-none"
        >
          {project.title}
        </button>
      </h3>
      <p className="text-muted-foreground">{project.blurb}</p>
    </article>
  );
}

function CaseStudyDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  // Keep the last project rendered so the content doesn't blank out
  // while the dialog's close animation plays.
  const lastProject = useRef(project);
  if (project) lastProject.current = project;
  const shown = project ?? lastProject.current;

  return (
    <Dialog open={project !== null} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
        {shown && (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-3xl">{shown.title}</DialogTitle>
              <DialogDescription>{shown.blurb}</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto space-y-4">
              <dl className="grid grid-cols-2 gap-4 font-mono text-sm border-y border-border py-4">
                <div>
                  <dt className="text-muted-foreground">Client</dt>
                  <dd>{shown.meta.client}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Role</dt>
                  <dd>{shown.meta.role}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Year</dt>
                  <dd>{shown.meta.year}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Deliverables</dt>
                  <dd>{shown.meta.deliverables}</dd>
                </div>
              </dl>
              {(
                [
                  ['Overview', shown.body.overview],
                  ['Problem', shown.body.problem],
                  ['Solution', shown.body.solution],
                  ['Process', shown.body.process],
                ] as const
              ).map(([heading, text]) => (
                <section key={heading}>
                  <h4 className="font-heading font-semibold text-lg mb-1">{heading}</h4>
                  <p className="text-muted-foreground">{text}</p>
                </section>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function App() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? projects : projects.filter(p => p.featured);

  return (
    <div id="top" className="relative">
      <div className="grid-overlay" />
      <div className="grain-overlay" />

      <header className="relative z-10 max-w-5xl mx-auto flex items-center justify-between px-6 py-6">
        <a href="#top" className="font-heading font-semibold text-lg">
          {profile.name}
        </a>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          {nav.map(item => (
            <a key={item.href} href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="py-24 md:py-36">
          <p className="font-mono text-primary mb-4">{profile.role}</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase leading-tight mb-8">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">{profile.tagline}</p>
        </section>

        {/* About + Skills */}
        <section id="about" className="py-20 border-t border-border grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading text-3xl font-semibold mb-6">About</h2>
            {profile.about.map(paragraph => (
              <p key={paragraph} className="text-muted-foreground mb-4">
                {paragraph}
              </p>
            ))}
            <p className="font-mono text-primary">{profile.hoursLine}</p>
          </div>
          <div>
            <h2 className="font-heading text-3xl font-semibold mb-6">Skills</h2>
            <ul className="grid grid-cols-2 gap-3">
              {skills.map(skill => (
                <li key={skill} className="glass-card-sm px-4 py-3 text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Experience */}
        <section className="py-20 border-t border-border">
          <h2 className="font-heading text-3xl font-semibold mb-8">Experience</h2>
          <ul className="divide-y divide-border">
            {experience.map(job => (
              <li key={job.company} className="py-4 flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-heading text-lg font-medium">{job.company}</span>
                <span className="text-muted-foreground">{job.role}</span>
                <span className="font-mono text-sm text-muted-foreground">{job.period}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Work */}
        <section id="work" className="py-20 border-t border-border">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-heading text-3xl font-semibold">Selected Work</h2>
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="font-mono text-sm text-primary hover:underline"
            >
              {showAll ? 'Show featured' : `All projects (${projects.length})`}
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {shown.map(project => (
              <ProjectCard key={project.slug} project={project} onOpen={setOpenProject} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 border-t border-border text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-6">
            Have a project in mind?
          </h2>
          <p className="text-muted-foreground mb-8">
            I'm open to consulting engagements, product work, and good conversations.
          </p>
          <a href={`mailto:${profile.email}`} className="btn-accent inline-block">
            Let's Talk
          </a>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-6">
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {/* '#' hrefs are unfilled placeholders — hide them until set in content.ts */}
            {[...nav, ...socials].filter(item => item.href !== '#').map(item => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-foreground transition-colors"
                {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <p className="font-mono text-sm text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>

      <CaseStudyDialog project={openProject} onClose={() => setOpenProject(null)} />
    </div>
  );
}

export default App;
