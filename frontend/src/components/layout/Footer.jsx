import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'

const EMAIL = 'pallabbarman02@gmail.com'

function FooterLink({ Icon, href, label, external }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      aria-label={label}
      className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-lg"
    >
      <Icon />
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="py-10 px-6 text-center border-t border-[var(--glass-border)] mt-10">
      <div className="flex justify-center gap-6 mb-4">
        <FooterLink
          Icon={FaEnvelope}
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
          label="Email"
          external={true}
        />

        <FooterLink
          Icon={FaLinkedin}
          href="https://www.linkedin.com/in/pallab-barman02"
          label="LinkedIn"
          external={true}
        />

        <FooterLink
          Icon={FaGithub}
          href="https://github.com/Pallabbarmon"
          label="GitHub"
          external={true}
        />
      </div>

      <p className="text-xs text-[var(--text-secondary)]">
        © {new Date().getFullYear()} Pallab Bormon. Built with React &amp; FastAPI.
      </p>
    </footer>
  )
}