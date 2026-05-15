// API client — single source for hitting the FastAPI backend.
// All endpoints documented in HANDOFF.md §3.

import type { DashboardStats, ScanResult } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7860";

class ApiError extends Error {
  constructor(public status: number, message: string, public detail?: string) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    let detail: string | undefined;
    try { const body = await res.json(); detail = body?.detail || body?.error; } catch {}
    throw new ApiError(res.status, `API error ${res.status}`, detail);
  }
  return res.json();
}

/** POST /scan — scan a single URL. */
export function scanUrl(url: string): Promise<ScanResult> {
  return request<ScanResult>("/scan", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}

/** GET /dashboard/stats — aggregate stats, refreshes every 60s in the UI. */
export function getDashboardStats(): Promise<DashboardStats> {
  return request<DashboardStats>("/dashboard/stats");
}

/**
 * POST /bulk — upload a CSV. Returns an EventSource-like iterator of
 * `{ index, result }` events. Caller renders each result into the table.
 */
export async function* bulkScan(file: File): AsyncGenerator<{ index: number; result: ScanResult }> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_URL}/bulk`, { method: "POST", body: form });
  if (!res.ok || !res.body) throw new ApiError(res.status, "bulk scan failed");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    // SSE events are separated by blank lines
    const events = buffer.split("\n\n");
    buffer = events.pop() || "";
    for (const ev of events) {
      const line = ev.split("\n").find(l => l.startsWith("data: "));
      if (!line) continue;
      try {
        yield JSON.parse(line.slice(6));
      } catch { /* skip malformed */ }
    }
  }
}

export { ApiError };
