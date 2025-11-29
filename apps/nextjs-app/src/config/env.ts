import * as z from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    ENABLE_API_MOCKING: z
      .string()
      .refine((s) => s === 'true' || s === 'false')
      .transform((s) => s === 'true')
      .optional(),
    APP_URL: z.string().optional().default('http://localhost:3000'),
    APP_MOCK_API_PORT: z.string().optional().default('8080'),
  });

  // For Nuxt, use runtime config instead of process.env
  const envVars = {
    API_URL: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:8080/api',
    ENABLE_API_MOCKING: process.env.NUXT_PUBLIC_ENABLE_API_MOCKING,
    APP_URL: process.env.NUXT_PUBLIC_URL || 'http://localhost:3000',
    APP_MOCK_API_PORT: process.env.NUXT_PUBLIC_MOCK_API_PORT || '8080',
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n')}
  `,
    );
  }

  return parsedEnv.data ?? {};
};

export const env = createEnv();
