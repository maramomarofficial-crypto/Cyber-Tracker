import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// السطر ده هو اللي فيه المشكلة، لازم يبدأ بكلمة export
export const supabase = createClient(supabaseUrl, supabaseKey)