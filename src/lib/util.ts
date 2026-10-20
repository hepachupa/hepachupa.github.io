export type Kind = 'project' | 'award' | 'activity';

export const KIND_LABEL: Record<Kind, string> = {
  project: '프로젝트',
  award: '수상',
  activity: '대외활동',
};

const pad = (n: number) => String(n).padStart(2, '0');
export const fmtMonth = (d: Date) => `${d.getFullYear()}.${pad(d.getMonth() + 1)}`;

export function period(d: { start: Date; end?: Date; ongoing?: boolean }) {
  const s = fmtMonth(d.start);
  if (d.ongoing) return `${s} – 진행 중`;
  if (!d.end) return s;
  const e = fmtMonth(d.end);
  return e === s ? s : `${s} – ${e}`;
}

/** "/images/a.png" 같은 경로에 base 경로를 붙입니다. 외부 URL은 그대로. */
export function asset(p?: string) {
  if (!p) return p;
  if (/^(https?:)?\/\//.test(p) || p.startsWith('data:')) return p;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (p.startsWith('/') ? p : '/' + p);
}

export function youtubeId(url?: string) {
  if (!url) return undefined;
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m?.[1];
}
