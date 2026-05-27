const toneClasses = {
  success: 'border-emerald-200/70 bg-emerald-50/85 text-emerald-900',
  error: 'border-rose-200/70 bg-rose-50/85 text-rose-900',
  info: 'border-sage-200/70 bg-white/85 text-sage-900',
};

export function ToastViewport({ toasts }) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`pointer-events-auto animate-toast-in rounded-2xl border px-4 py-3 shadow-glass backdrop-blur-xl ${toneClasses[toast.tone] || toneClasses.info}`}
        >
          <p className="text-sm font-semibold">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
