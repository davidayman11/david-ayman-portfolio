"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

export type ListItem = {
  id: string;
  href: string;
  title: string;
  meta: string;
  search: string;
  badge?: string;
  filter?: string;
  thumb?: string | null;
};

function MoveButton({
  action,
  id,
  direction,
  label,
}: {
  action: (formData: FormData) => void;
  id: string;
  direction: "up" | "down";
  label: string;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="direction" value={direction} />
      <button
        type="submit"
        aria-label={label}
        className="inline-flex min-h-11 items-center border border-line px-3 text-sm hover:border-ink"
      >
        {direction === "up" ? "Up" : "Down"}
      </button>
    </form>
  );
}

function DeleteButton({
  action,
  id,
  label,
}: {
  action: (formData: FormData) => void;
  id: string;
  label: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex min-h-11 items-center border border-line px-3 text-sm text-red-900 hover:border-red-900"
      >
        Delete
      </button>
      <dialog
        ref={dialogRef}
        className="w-[min(100%,26rem)] border border-line bg-paper p-6 text-ink backdrop:bg-ink/40"
      >
        <form action={action}>
          <input type="hidden" name="id" value={id} />
          <h2 className="font-serif text-3xl tracking-[-0.03em]">Delete {label}?</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            This removes it from the portfolio. This cannot be undone.
          </p>
          <div className="mt-6 flex gap-2">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center border border-red-900 bg-red-900 px-4 text-sm text-paper"
            >
              Delete
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

export function RecordList({
  items,
  empty,
  searchPlaceholder,
  filters,
  reorder = false,
  moveAction,
  deleteAction,
}: {
  items: ListItem[];
  empty: string;
  searchPlaceholder: string;
  filters?: string[];
  reorder?: boolean;
  moveAction?: (formData: FormData) => void;
  deleteAction?: (formData: FormData) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesFilter = !filters || filter === "All" || item.filter === filter;
      const matchesQuery = !needle || `${item.title} ${item.meta} ${item.search}`.toLowerCase().includes(needle);
      return matchesFilter && matchesQuery;
    });
  }, [filter, filters, items, query]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="block w-full">
          <span className="sr-only">Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full border border-line bg-paper px-3 py-2.5 text-sm"
          />
        </label>
        {filters ? (
          <label className="block">
            <span className="sr-only">Filter</span>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="h-full min-h-11 border border-line bg-paper px-3 text-sm"
            >
              {filters.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      {shown.length === 0 ? (
        <p className="mt-8 border border-dashed border-line px-4 py-8 text-sm text-mute">{empty}</p>
      ) : (
        <ul className="mt-6 border-t border-line">
          {shown.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-3 border-b border-line py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                {item.thumb !== undefined ? (
                  <div className="size-12 shrink-0 overflow-hidden border border-line bg-paper-deep">
                    {item.thumb ? (
                      <img src={item.thumb} alt="" className="size-full object-cover" />
                    ) : (
                      <div className="flex size-full items-center justify-center font-mono text-[8px] uppercase tracking-[0.12em] text-mute">
                        Icon
                      </div>
                    )}
                  </div>
                ) : null}
                <div>
                <Link href={item.href} className="font-serif text-2xl tracking-[-0.03em]">
                  {item.title}
                </Link>
                <p className="mt-1 text-sm text-mute">
                  {item.badge ? (
                    <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
                      {item.badge}
                    </span>
                  ) : null}
                  {item.meta}
                </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {reorder && moveAction ? (
                  <>
                    <MoveButton action={moveAction} id={item.id} direction="up" label={`Move ${item.title} up`} />
                    <MoveButton action={moveAction} id={item.id} direction="down" label={`Move ${item.title} down`} />
                  </>
                ) : null}
                {deleteAction ? <DeleteButton action={deleteAction} id={item.id} label={item.title} /> : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
