import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPortfolio } from "@/lib/portfolio";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

function safeHex(value: string, fallback: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolio();
  const title = data.seo.metaTitle || data.profile.name || "Portfolio";
  const description = data.seo.metaDescription;
  const siteUrl = getSiteUrl();

  return {
    title: { default: title, template: `%s — ${data.profile.name || "Portfolio"}` },
    description,
    applicationName: data.profile.name,
    authors: data.profile.name ? [{ name: data.profile.name, url: data.profile.githubUrl || undefined }] : undefined,
    creator: data.profile.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      title,
      description,
      siteName: data.profile.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await getPortfolio();
  const siteUrl = getSiteUrl();
  const paper = safeHex(data.settings.paperColor, "#efece4");
  const ink = safeHex(data.settings.inkColor, "#171a17");
  const signal = safeHex(data.settings.signalColor, "#1f6b45");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.profile.name,
    jobTitle: data.profile.jobTitle,
    description: data.seo.metaDescription,
    email: data.profile.email,
    telephone: data.profile.phoneHref.replace("tel:", ""),
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    sameAs: [data.profile.githubUrl, data.profile.linkedinUrl, data.profile.websiteUrl].filter(Boolean),
  };

  return (
    <>
      <style>{`:root{--color-paper:${paper};--color-ink:${ink};--color-signal:${signal}}`}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <SiteHeader shortName={data.profile.shortName} cvHref={data.profile.resumeUrl} nav={data.settings.navItems} />
      {children}
      <SiteFooter name={data.profile.name} footerText={data.settings.footerText} nav={data.settings.navItems} />
    </>
  );
}
