"use client";

import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function CartDrawer({
  open,
  onClose,
  children,
}: Props) {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/70 backdrop-blur-sm
          transition-all duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Drawer */}

      <aside
        className={`
          fixed
          top-0
          right-0
          z-50
          flex
          h-screen
          w-full
          max-w-md
          flex-col
          border-l
          border-yellow-500/20
          bg-zinc-950
          shadow-2xl
          transition-transform
          duration-300
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

          <h2 className="text-2xl font-bold text-yellow-500">
            Carrello
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <X size={22} />
          </button>

        </div>

        {/* Contenuto */}

        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

      </aside>
    </>
  );
}