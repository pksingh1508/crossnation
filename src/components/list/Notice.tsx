import type { LucideIcon } from "lucide-react";

interface NoticeProps {
  icon: LucideIcon;
  text: string;
  action?: { label: string; onClick: () => void };
}

/** In place of a list or gallery: nothing found, or an error, with what to do next */
export function Notice({ icon: Icon, text, action }: NoticeProps) {
  return (
    <div className="flex flex-col items-center rounded-[2rem] border border-dashed border-neutral-200 px-6 py-16 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-neutral-900">
        <Icon aria-hidden className="size-5" />
      </span>
      <p className="mt-5 max-w-md text-lg font-semibold text-neutral-950">
        {text}
      </p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-6 inline-flex h-11 items-center rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition-colors duration-300 outline-none hover:bg-brand hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
