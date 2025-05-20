import * as React from "react";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        {children}
        <button
          className="mt-4 text-sm text-red-500"
          onClick={() => onOpenChange(false)}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export function DialogContent({ children }) {
  return <div>{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}

export function DialogFooter({ children }) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}
