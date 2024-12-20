import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const prefixes = {
  'Stocks of the Week': "Analyze the stock market for this week and identify the top-performing stocks based on the latest data from a fresh internet search. Include key performance indicators and reasons why these stocks stand out. Format the response professionally, starting with: 'These are the Top Stocks of the Week:'",
  'Stock Analysis': "Perform a professional stock analysis based on the latest data from a fresh internet search. Focus on key metrics such as P/E ratio, revenue growth, and market trends. Provide a clear, concise, and professional explanation, starting with: 'Here is your Personalized Professional Stock Analysis:'",
  'Chart Explanation': "Explain this stock chart in detail based on the latest data from a fresh internet search. Focus on trends, patterns, and key insights visible in the chart. Format the explanation professionally and begin with: 'Let me Explain this Chart to you!'",
  'Strategy Builder': "Develop a personalized stock trading strategy using insights from the latest data acquired through a fresh internet search. Provide actionable advice and clear steps, professionally formatted, beginning with: 'Here is your Personalized Strategy:'"
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { option, query } = await req.json();
    const prefix = prefixes[option as keyof typeof prefixes];
    const fullPrompt = `${prefix} ${query}`;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a professional stock market analyst. Be precise and concise.'
          },
          {
            role: 'user',
            content: fullPrompt
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false,
        search_domain_filter: ['perplexity.ai'],
        search_recency_filter: 'month'
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});