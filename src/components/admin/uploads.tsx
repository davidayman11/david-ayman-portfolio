"use client";

import { useActionState, useState } from "react";
import { savePortrait, saveResume } from "@/actions/singletons";
import { initialState } from "@/lib/action-state";

export function PortraitForm({ src, position }: { src: string | null; position: number }) {
  const [state, action, pending] = useActionState(savePortrait, initialState);
  const [preview, setPreview] = useState(src);
  const [focus, setFocus] = useState(position);

  return (
    <form action={action} className="border border-line p-5">
      <h2 className="font-serif text-3xl tracking-[-0.03em]">Photo</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute">
        Replace the portrait and move it until the framing matches the homepage.
      </p>
      <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end">
        <div className="w-48 shrink-0 overflow-hidden border border-line bg-paper-deep">
          {preview ? (
            <img
              src={preview}
              alt="Portrait preview"
              className="aspect-[4/5] w-full object-cover"
              style={{ objectPosition: `center ${focus}%` }}
            />
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              Portrait
            </div>
          )}
        </div>
        <div className="w-full max-w-md space-y-4">
          <label className="block" htmlFor="portrait-position">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Crop position</span>
            <input
              id="portrait-position"
              name="portraitPosition"
              type="range"
              min={0}
              max={100}
              value={focus}
              onChange={(event) => setFocus(Number(event.target.value))}
              className="mt-3 block w-full accent-ink"
            />
            <span className="mt-1 block text-sm text-mute">
              {focus < 35 ? "Higher in the frame" : focus > 65 ? "Lower in the frame" : "Centered"}
            </span>
          </label>
          <label className="block" htmlFor="portrait-file">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Replace photo</span>
            <input
              id="portrait-file"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="mt-2 block w-full text-sm"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />
            <span className="mt-1 block text-sm text-mute">JPEG, PNG, or WebP. 4 MB maximum. Leave empty to keep this photo and save only the crop.</span>
          </label>
          {state.message ? (
            <p role="alert" className="border border-red-900/20 bg-red-50 px-3 py-2 text-sm text-red-900">
              {state.message}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-11 items-center border border-ink bg-ink px-4 text-sm text-paper disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save photo"}
          </button>
        </div>
      </div>
    </form>
  );
}

export function ResumeForm({ resumeUrl }: { resumeUrl: string | null }) {
  const [state, action, pending] = useActionState(saveResume, initialState);
  const [filename, setFilename] = useState("");

  return (
    <form action={action} className="border border-line p-5">
      <h2 className="font-serif text-3xl tracking-[-0.03em]">CV</h2>
      <p className="mt-2 text-sm leading-relaxed text-mute">
        {resumeUrl ? "A CV is already on the site. Upload a PDF to replace it." : "Upload the CV visitors can download."}
      </p>
      {resumeUrl ? (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4"
        >
          View current CV
        </a>
      ) : null}
      <label className="mt-4 block" htmlFor="resume-file">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Upload PDF</span>
        <input
          id="resume-file"
          name="resume"
          type="file"
          accept="application/pdf"
          required
          className="mt-2 block w-full text-sm"
          onChange={(event) => setFilename(event.target.files?.[0]?.name ?? "")}
        />
        {filename ? <span className="mt-1 block text-sm text-ink">{filename}</span> : null}
        {state.fieldErrors.resume ? (
          <span className="mt-1 block text-sm text-red-800">{state.fieldErrors.resume}</span>
        ) : null}
      </label>
      {state.message ? (
        <p role="alert" className="mt-4 border border-red-900/20 bg-red-50 px-3 py-2 text-sm text-red-900">
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 inline-flex min-h-11 items-center border border-ink bg-ink px-4 text-sm text-paper disabled:opacity-60"
      >
        {pending ? "Uploading…" : "Upload CV"}
      </button>
    </form>
  );
}
