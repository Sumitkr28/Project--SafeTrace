"use client";

// Toast context — replaces the prototype's `window.toast` global.
// Wrap the app once in <ToastProvider>, then call useToast() anywhere.

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type ToastKind = "info" | "success" | "error";

export interface ToastOpts {
  title?: string;
  message?: string;
  kind?: ToastKind;
  duration?: number;       // ms, default 3200
}

interface Toast extends ToastOpts {
  id: string;
}

type Push = (opts: ToastOpts | string) => void;

const ToastContext = createContext<Push>(() => {});
const ToastListContext = createContext<Toast[]>([]);
const ToastDismissContext = createContext<(id: string) => void>(() => {});

export function useToast(): Push {
  return useContext(ToastContext);
}

export function useToasts(): Toast[] {
  return useContext(ToastListContext);
}

export function useDismissToast(): (id: string) => void {
  return useContext(ToastDismissContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push: Push = useCallback((opts) => {
    const t: Toast = {
      id: Math.random().toString(36).slice(2),
      ...(typeof opts === "string" ? { title: opts } : opts),
    };
    setToasts(prev => [...prev, t]);
    const dur = t.duration ?? 3200;
    setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), dur);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(x => x.id !== id));
  }, []);

  // Also wire window.toast for parity with the prototype's footer/links code.
  useEffect(() => {
    (window as any).toast = push;
    return () => { delete (window as any).toast; };
  }, [push]);

  return (
    <ToastContext.Provider value={push}>
      <ToastListContext.Provider value={toasts}>
        <ToastDismissContext.Provider value={dismiss}>
          {children}
        </ToastDismissContext.Provider>
      </ToastListContext.Provider>
    </ToastContext.Provider>
  );
}
