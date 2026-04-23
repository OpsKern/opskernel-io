import { defineCollection, z } from 'astro:content';

// feature-proposals — intelligence feed from ~/ai-wiki/projects/hookd-core/intel/feature-proposals.md
// Populated at build time by .github/workflows/intel-refresh.yml. The source file is .gitignored;
// CI pulls it via AI_WIKI_DEPLOY_KEY and commits nothing — only the built site gets the content.
//
// Publish gate (also enforced in WhatsNew.astro):
//   visible_public === true AND priority ∈ {P0, P1} AND status === 'approved'
//
// The extraction prompt in worker-intelligence-routing.md MUST default visible_public:false.
// Flipping to true is a conscious per-entry operator action reviewed by OK_clo-review.

const featureProposals = defineCollection({
  type: 'content',
  schema: z.object({
    // Required — if an entry is missing any of these, build fails and it does not publish.
    engine: z.enum(['Claude', 'GPT', 'Gemini', 'Ollama', 'Cursor', 'Copilot', 'Other']),
    feature: z.string().min(3),
    implication: z.string().min(10),
    priority: z.enum(['P0', 'P1', 'P2', 'P3']),
    status: z.enum(['proposed', 'triaged', 'approved', 'rejected', 'deferred']),

    // Hard publish gate. Default false so an operator must consciously flip it.
    visible_public: z.boolean().default(false),

    // Source trail
    source_url: z.string().url().optional(),
    captured_at: z.coerce.date(),
    triaged_by: z.string().optional(),

    // Optional outgoing link
    hookd_doc: z.string().optional(),
  }),
});

export const collections = {
  'feature-proposals': featureProposals,
};
