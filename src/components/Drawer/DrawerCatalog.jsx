import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./drawer.scss";

function useLockBodyScroll(lock) {
  useEffect(() => {
    if (!lock) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [lock]);
}

function Drawer({
  isOpen,
  onClose,
  title,
  width = 440,
  side = "right",
  children,
  closeOnOverlay = true,
  initialFocusRef,
  ariaLabel
}) {
  const overlayRef = useRef(null);
  const drawerRef = useRef(null);
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = e => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleOverlay = e => {
    if (!closeOnOverlay) return;
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="drawer-overlay"
      ref={overlayRef}
      onMouseDown={handleOverlay}
      aria-hidden="false"
    >
      <aside
        ref={drawerRef}
        className={`drawer drawer--${side}`}
        style={{ width: typeof width === "number" ? `${width}px` : width }}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={title ? "drawer-title" : undefined}
      >
        <header className="drawer__header">
          {title && (
            <h2 id="drawer-title" className="drawer__title">
              {title}
            </h2>
          )}
          <button
            className="drawer__close"
            onClick={onClose}
            aria-label="Cerrar panel"
            data-autofocus
          >
            ×
          </button>
        </header>
        <div className="drawer__content">{children}</div>
      </aside>
    </div>,
    document.body
  );
};

export default Drawer;