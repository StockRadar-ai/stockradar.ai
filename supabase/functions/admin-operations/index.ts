import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, userId, data } = await req.json()

    // Verify admin status
    const { data: { user }, error: authError } = await supabase.auth.getUser(req.headers.get('Authorization')?.split(' ')[1] ?? '')
    if (authError || user?.email !== 'admin@stockradarr.com') {
      throw new Error('Unauthorized')
    }

    switch (action) {
      case 'getAnalytics':
        const { data: analytics, error: analyticsError } = await supabase
          .from('user_analytics')
          .select('*')
        
        if (analyticsError) throw analyticsError
        
        return new Response(
          JSON.stringify({
            totalUsers: analytics.length,
            premiumUsers: analytics.filter(u => u.subscription === 'Premium').length,
            basicUsers: analytics.filter(u => u.subscription === 'Basic').length,
            totalRequests: analytics.reduce((acc, u) => acc + u.requests, 0),
            averageRequests: analytics.length > 0 
              ? analytics.reduce((acc, u) => acc + u.requests, 0) / analytics.length 
              : 0,
            users: analytics
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'updateUser':
        const { error: updateError } = await supabase
          .from('user_analytics')
          .update(data)
          .eq('user_id', userId)
        
        if (updateError) throw updateError
        
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})