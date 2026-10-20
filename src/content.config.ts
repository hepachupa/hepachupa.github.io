import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const optStr = z.string().optional().nullable().transform((v) => (v ? v : undefined));
const optDate = z
  .union([z.coerce.date(), z.literal(''), z.null()])
  .optional()
  .transform((v) => (v instanceof Date && !isNaN(+v) ? v : undefined));

const link = z.object({ label: z.string(), url: z.string() });

// 프로젝트 / 수상 / 대외활동 공통 스키마 (빈 값은 모두 허용)
const item = z.object({
  title: z.string(),
  summary: optStr,
  tldr: z.array(z.string()).optional().nullable().transform((v) => (v ?? []).filter(Boolean)), // 상세 맨 위 3줄 요약
  start: z.coerce.date(),
  end: optDate,
  ongoing: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
  hidden: z.boolean().optional().default(false),
  hide_dates: z.boolean().optional().default(false), // 기간 표시 안 함 (정렬에는 사용)
  tags: z.array(z.string()).optional().nullable().transform((v) => v ?? []),
  thumbnail: optStr,
  // 프로젝트
  role: optStr,
  team: optStr,
  contribution: optStr,
  highlights: z.array(z.string()).optional().nullable().transform((v) => v ?? []),
  video: optStr,
  videos: z.array(z.string()).optional().nullable().transform((v) => (v ?? []).filter(Boolean)), // 추가 영상
  gallery: z.array(z.string()).optional().nullable().transform((v) => v ?? []),
  links: z.array(link).optional().nullable().transform((v) => v ?? []),
  // 수상
  organizer: optStr,
  result: optStr,
  certificate: optStr,
  related: optStr,
  // 대외활동
  organization: optStr,
});

const loader = (dir: string) => glob({ pattern: '**/*.md', base: `./src/content/${dir}` });

export const collections = {
  projects: defineCollection({ loader: loader('projects'), schema: item }),
  awards: defineCollection({ loader: loader('awards'), schema: item }),
  activities: defineCollection({ loader: loader('activities'), schema: item }),
};
