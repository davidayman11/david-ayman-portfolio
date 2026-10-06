import { ImageResponse } from "next/og";

export const alt = "David Ayman Mahrous — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Software Engineer / Mobile
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 0.95,
              letterSpacing: -2,
            }}
          >
            David Ayman Mahrous
          </div>
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
            Flutter products for bookings, orders, inventory, attendance, and
            healthcare.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#5c615b" }}>
          Cairo · Pay Band Solutions
        </div>
      </div>
    ),
    { ...size },
  );
}
