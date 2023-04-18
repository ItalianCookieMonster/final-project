
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://krrqfzhxonrtmvvuyjwj.supabase.co'
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycnFmemh4b25ydG12dnV5andqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyMjk3NTEsImV4cCI6MTk5NjgwNTc1MX0.pwywFQN5czyIIL52Usbe1bXIpjMjw5OiJx-9UmdvlOI'
export default createClient(supabaseUrl, supabaseApiKey)
