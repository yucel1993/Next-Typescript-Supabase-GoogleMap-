import { Tables } from './supabase';

// https://supabase.com/docs/reference/javascript/typescript-support#helper-types-for-tables-and-joins
export type Event = Tables<'Events'>;
