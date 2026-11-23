import type { ReactNode } from 'react';
import Seo from '../components/Seo';
import PageTitle from '../components/PageTitle';
import { ArrowIcon, InstagramIcon } from '../components/Icons';
import { site } from '../data/site';

export default function Contact() {
  return (
    <>
      <Seo title="Contact" description={`Contacter ${site.artist} pour une œuvre, une commande ou une question.`} />
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <PageTitle eyebrow="Écrivez-moi" title="Contact" />
        <div className="grid gap-16 md:grid-cols-12">
          <div className="animate-fade-up md:col-span-6">
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Une question sur un tableau, une envie de commande ou une idée de sujet&nbsp;? N'hésitez pas à me
              contacter, je serai ravi de vous répondre. À bientôt&nbsp;!
            </p>
          </div>
          <div className="animate-fade-up space-y-px md:col-span-6" style={{ animationDelay: '120ms' }}>
            <ContactRow href={`mailto:${site.email}`} label="E-mail" value={site.email} />
            <ContactRow
              href={site.instagram}
              label="Instagram"
              value={`@${site.instagram.split('/').filter(Boolean).pop()}`}
              icon={<InstagramIcon className="size-5" />}
              external
            />
            {site.shop && <ContactRow href={site.shop} label="Boutique" value="Acheter en ligne" external />}
          </div>
        </div>
      </div>
    </>
  );
}

function ContactRow({
  href,
  label,
  value,
  icon,
  external,
}: {
  href: string;
  label: string;
  value: string;
  icon?: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className="group flex items-center justify-between gap-6 border-b border-line py-6 first:border-t"
    >
      <div>
        <p className="text-xs tracking-[0.2em] text-muted uppercase">{label}</p>
        <p className="mt-2 flex items-center gap-3 font-display text-2xl break-all group-hover:text-accent sm:text-3xl">
          {icon}
          {value}
        </p>
      </div>
      <ArrowIcon className="size-6 shrink-0 -rotate-45 text-muted transition-transform group-hover:rotate-0 group-hover:text-accent" />
    </a>
  );
}
