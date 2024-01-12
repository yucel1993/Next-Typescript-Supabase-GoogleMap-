import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';
const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const secretKey = process.env.SUPABASE_SECRET_KEY!;

/* Diese Distanz darf nur die Aktionen ausführen, welche durch
Row Level Security erlaubt sind, sie kann also auch im Browser
genutzt werden. */
export const supabase = createClient<Database>(projectUrl, anonKey);

// Diese Instanz hat alle Rechte, unbedingt nur im Backend benutzen
export const supabaseBackend = createClient<Database>(projectUrl, secretKey);
