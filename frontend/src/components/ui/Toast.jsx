import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

export default function Toast({ toasts = [], onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="rf-toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`rf-toast rf-toast--${toast.type || 'info'} animate-slide-up`}>
          <div className="rf-toast__icon">
            {toast.type === 'success' && <CheckCircle2 size={18} />}
            {toast.type === 'error' && <AlertCircle size={18} />}
            {toast.type === 'info' && <Info size={18} />}
          </div>
          <div className="rf-toast__content">
            {toast.title && <p className="rf-toast__title">{toast.title}</p>}
            <p className="rf-toast__message">{toast.message}</p>
          </div>
          <button
            className="rf-toast__close"
            onClick={() => onDismiss(toast.id)}
            aria-label="Close notification"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
