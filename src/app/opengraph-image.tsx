import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";

export const alt = "David Ayman Mahrous — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const seo = await prisma.seo.findUnique({ where: { id: "default" } }).catch(() => null);
  const profile = await prisma.profile.findUnique({ where: { id: "default" } }).catch(() => null);
  const hero = await prisma.hero.findUnique({ where: { id: "default" } }).catch(() => null);

  if (seo?.ogImageId) {
    const media = await prisma.media.findUnique({ where: { id: seo.ogImageId } }).catch(() => null);
    if (media && media.mimeType.startsWith("image/")) {
      const src = `data:${media.mimeType};base64,${Buffer.from(media.bytes).toString("base64")}`;
      return new ImageResponse(
        (
          <div style={{ width: "100%", height: "100%", display: "flex" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" width={1200} height={630} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ),
        { ...size },
      );
    }
  }

  const title = profile?.name || "David Ayman Mahrous";
  const description = seo?.metaDescription || hero?.subheading || "";
  const detail = [profile?.location, hero?.fact1Value].filter(Boolean).join(" · ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#efece4",
          color: "#171a17",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, textTransform: "uppercase" }}>
          {profile?.jobTitle || "Software Engineer"} / {profile?.focus || "Mobile"}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 0.95, letterSpacing: -2 }}>{title}</div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 820,
              color: "#31362f",
            }}
          >
            {description.slice(0, 180)}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#5c615b" }}>{detail}</div>
      </div>
    ),
    { ...size },
  );
}
