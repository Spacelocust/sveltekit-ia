import { fail, redirect } from '@sveltejs/kit';

import { queryGPT, searchCountry } from '$lib/server/GPT';
import { auth } from '$lib/server/auth';

import type { Actions } from './$types';

export const actions = {
  searchCountry: async ({ request }) => {
    const data = await request.formData();
    const search = (data.get('search') ?? '') as string;

    const completions = await queryGPT({ inputSystem: searchCountry, inputUser: search }, false);

    const result = completions.choices[0].message.content ?? 'null';

    if (result === 'null') return fail(404, { data: { result: [] }, error: true });

    return { data: { result: JSON.parse(result) }, error: false };
  },
} satisfies Actions;
