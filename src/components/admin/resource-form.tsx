"use client";

import { useActionState, useRef, useState } from "react";
import { initialState, type ActionState } from "@/lib/action-state";

export type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "email" | "url" | "checkbox" | "file" | "password";
  required?: boolean;
  hint?: string;
  rows?: number;
  accept?: string;
};

const control = "mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink";

function RemovePhotoButton({
  action,
  id,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex min-h-11 items-center border border-line px-3 text-sm text-red-900 hover:border-red-900"
      >
        Remove photo
      </button>
      <dialog
        ref={dialogRef}
        className="w-[min(100%,26rem)] border border-line bg-paper p-6 text-ink backdrop:bg-ink/40"
      >
        <form action={action}>
          <input type="hidden" name="id" value={id} />
          <h2 className="font-serif text-3xl tracking-[-0.03em]">Remove this photo?</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            The project will show an empty icon until you upload another.
          </p>
          <div className="mt-6 flex gap-2">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center border border-red-900 bg-red-900 px-4 text-sm text-paper"
            >
              Remove photo
            </button>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex min-h-11 items-center border border-line px-4 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

export function ResourceForm({
  action,
  fields,
  values,
  hidden,
  submitLabel = "Save",
  preview,
  previewFrame = "photo",
  removeImage,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  fields: FieldConfig[];
  values: Record<string, string | boolean>;
  hidden?: Record<string, string>;
  submitLabel?: string;
  preview?: { src: string; alt: string } | null;
  previewFrame?: "photo" | "icon";
  removeImage?: { action: (formData: FormData) => void | Promise<void>; id: string };
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const previewSrc = localPreview ?? preview?.src ?? null;

  return (
    <div className="max-w-3xl">
      {previewFrame === "icon" ? (
        <div className="mb-5 flex items-center gap-4">
          <div className="size-20 shrink-0 overflow-hidden border border-line bg-paper-deep">
            {previewSrc ? (
              <img src={previewSrc} alt={preview?.alt ?? "App icon"} className="size-full object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center px-1 text-center font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-mute">
                App icon
              </div>
            )}
          </div>
          <div>
            <p className="max-w-sm text-sm leading-relaxed text-mute">
              Upload a square app icon or a photo. It appears beside the project on the site.
            </p>
            {removeImage && preview?.src && !localPreview ? (
              <div className="mt-3">
                <RemovePhotoButton action={removeImage.action} id={removeImage.id} />
              </div>
            ) : null}
          </div>
        </div>
      ) : previewSrc ? (
        <img src={previewSrc} alt={preview?.alt ?? ""} className="mb-5 size-28 border border-line object-cover" />
      ) : null}
      <form action={formAction} className="space-y-5">
      {Object.entries(hidden ?? {}).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {fields.map((field) => {
        const error = state.fieldErrors[field.name];
        const id = `field-${field.name}`;
        if (field.type === "checkbox") {
          return (
            <div key={field.name}>
              <label htmlFor={id} className="flex min-h-11 items-center gap-3 text-sm">
                <input
                  id={id}
                  name={field.name}
                  type="checkbox"
                  defaultChecked={values[field.name] === true}
                  className="size-4 accent-ink"
                />
                {field.label}
              </label>
              {field.hint ? <span className="mt-1 block text-sm text-mute">{field.hint}</span> : null}
              {error ? <span className="mt-1 block text-sm text-red-800">{error}</span> : null}
            </div>
          );
        }

        return (
          <label key={field.name} className="block" htmlFor={id}>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                id={id}
                name={field.name}
                required={field.required}
                rows={field.rows ?? 5}
                defaultValue={String(values[field.name] ?? "")}
                aria-invalid={error ? true : undefined}
                className={control}
              />
            ) : (
              <input
                id={id}
                name={field.name}
                type={field.type ?? "text"}
                required={field.required}
                accept={field.accept}
                defaultValue={
                  field.type === "file" || field.type === "password"
                    ? undefined
                    : String(values[field.name] ?? "")
                }
                autoComplete={
                  field.name === "currentPassword"
                    ? "current-password"
                    : field.type === "password"
                      ? "new-password"
                      : undefined
                }
                aria-invalid={error ? true : undefined}
                onChange={
                  field.type === "file"
                    ? (event) => {
                        const file = event.target.files?.[0];
                        if (file?.type.startsWith("image/")) setLocalPreview(URL.createObjectURL(file));
                      }
                    : undefined
                }
                className={field.type === "file" ? "mt-2 block w-full text-sm" : control}
              />
            )}
            {field.hint ? <span className="mt-1 block text-sm text-mute">{field.hint}</span> : null}
            {error ? (
              <span className="mt-1 block text-sm text-red-800">{error}</span>
            ) : null}
          </label>
        );
      })}
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
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
    </div>
  );
}
