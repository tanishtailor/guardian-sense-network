
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude, longitude } = await req.json();
    const opencageApiKey = Deno.env.get('OPENCAGE_API_KEY');

    if (!opencageApiKey) {
      throw new Error('OPENCAGE_API_KEY not found in environment variables');
    }

    // Search for hospitals near the given coordinates
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=hospital&key=${opencageApiKey}&near=${latitude},${longitude}&limit=10&no_annotations=1`
    );

    if (!response.ok) {
      throw new Error(`OpenCage API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Format the hospital data
    const hospitals = data.results.map((result: any, index: number) => ({
      id: `hospital_${index}`,
      name: result.formatted || `Hospital ${index + 1}`,
      address: result.formatted,
      latitude: result.geometry.lat,
      longitude: result.geometry.lng,
      distance: result.distance || 0,
      // Mock contact info since OpenCage doesn't provide this
      phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      emergency: '911',
      type: 'Hospital'
    }));

    return new Response(JSON.stringify({ hospitals }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in nearby-hospitals function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch nearby hospitals',
      hospitals: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
