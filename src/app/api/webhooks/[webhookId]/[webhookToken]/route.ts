import axios from "axios";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ webhookId: string, webhookToken: string }> }
) {
    // Extract webhookId and webhookToken
    const webhookId = (await params).webhookId;
    const webhookToken = (await params).webhookToken;

    console.log(`Webhook ID: ${webhookId}, Webhook Token: ${webhookToken}`);

    // Parse the incoming JSON body
    const body = await request.json();

    // Validate content and webhook ID/token
    if (!body.content && !body.embeds) {
        return new Response(JSON.stringify({ error: 'Content or embeds is required' }), {
            status: 400,
            headers: { 'content-type': 'application/json' },
        });
    }

    if (!webhookId || !webhookToken) {
        return new Response(JSON.stringify({ error: 'Webhook ID and token are required' }), {
            status: 400,
            headers: { 'content-type': 'application/json' },
        });
    }

    // Define Proxy URL (Optional)
    const PROXY_ENABLED = true; // Change to false if you want direct requests
    const PROXY_URL = "https://your-proxy.com/api/webhook"; // Replace with your proxy
    const PROXY_TOKEN = "your-secret-proxy-token"; // Optional auth token

    // Choose the webhook endpoint
    const discordWebhookUrl = PROXY_ENABLED
        ? `${PROXY_URL}?webhookId=${webhookId}&webhookToken=${webhookToken}`
        : `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`;

    try {
        // Send the request to the proxy or Discord
        const res = await axios.post(discordWebhookUrl, body, {
            headers: {
                'Content-Type': 'application/json',
                ...(PROXY_ENABLED && { 'Authorization': `Bearer ${PROXY_TOKEN}` }) // Add proxy auth if enabled
            },
        });

        console.log('Webhook sent successfully:', res.data);
        return new Response(JSON.stringify(res.data), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to send webhook:', error);
        return new Response(JSON.stringify({ error: 'Failed to send webhook' }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}
