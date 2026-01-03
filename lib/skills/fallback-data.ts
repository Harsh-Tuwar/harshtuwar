import { SkillCategory, Technology } from '@/types/global.types';

/**
 * Fallback skill categories used when Notion is not configured or unavailable
 * This ensures the site always works even if Notion has issues
 */
export const fallbackSkillCategories: SkillCategory[] = [
  {
    id: "1",
    name: "Frontend Development",
    icon: "Code2",
    color: "from-cyan-500 to-blue-500",
    description: "Building responsive and interactive user interfaces",
    order: 1
  },
  {
    id: "2",
    name: "Backend Development",
    icon: "Server",
    color: "from-green-500 to-emerald-500",
    description: "Developing robust server-side applications",
    order: 2
  },
  {
    id: "3",
    name: "Database & Storage",
    icon: "Database",
    color: "from-blue-500 to-indigo-500",
    description: "Designing and managing data solutions",
    order: 3
  },
  {
    id: "4",
    name: "DevOps & Cloud",
    icon: "Cloud",
    color: "from-orange-500 to-red-500",
    description: "Deploying and scaling applications",
    order: 4
  },
];

/**
 * Fallback technologies used when Notion is not configured or unavailable
 * This ensures the site always works even if Notion has issues
 */
export const fallbackTechnologies: Technology[] = [
  { id: "1", name: "JavaScript", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20", order: 1 },
  { id: "2", name: "TypeScript", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20", order: 2 },
  { id: "3", name: "React", color: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20", order: 3 },
  { id: "4", name: "Next.js", color: "bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20", order: 4 },
  { id: "5", name: "Node.js", color: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20", order: 5 },
  { id: "6", name: "Python", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20", order: 6 },
  { id: "7", name: "PostgreSQL", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20", order: 7 },
  { id: "8", name: "MongoDB", color: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20", order: 8 },
  { id: "9", name: "Redis", color: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20", order: 9 },
  { id: "10", name: "AWS", color: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20", order: 10 },
  { id: "11", name: "Docker", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20", order: 11 },
  { id: "12", name: "Kubernetes", color: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20", order: 12 },
  { id: "13", name: "GraphQL", color: "bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20", order: 13 },
  { id: "14", name: "Tailwind CSS", color: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20", order: 14 },
  { id: "15", name: "Vercel", color: "bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20", order: 15 },
  { id: "16", name: "Git", color: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20", order: 16 },
  { id: "17", name: "REST APIs", color: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20", order: 17 },
  { id: "18", name: "Supabase", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20", order: 18 },
];
