import axios from "axios";
import { headers } from "next/headers";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ webhookId: string, webhookToken: string }> }
) {
    // Extract the webhookId and webhookToken from the params
    const webhookId = (await params).webhookId;
    const webhookToken = (await params).webhookToken;

    console.log(`Webhook ID: ${webhookId}, Webhook Token: ${webhookToken}`);

    // Parse the incoming JSON body
    const body = await request.json();

    // Validate content and webhook ID/token
    if (!body.content && !body.embeds) {
        return new Response(JSON.stringify({ error: 'Content or embeds is required' }), {
            status: 400,
            headers: {
                'content-type': 'application/json',
            },
        });
    }

    if (!webhookId || !webhookToken) {
        return new Response(JSON.stringify({ error: 'Webhook ID and token are required' }), {
            status: 400,
            headers: {
                'content-type': 'application/json',
            },
        });
    }

    // Construct the Discord webhook URL
    const discordWebhookUrl = `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`;

    // Define a proxy (if available)
    const proxyUrl = process.env.DISCORD_PROXY_URL || "http://your-proxy.com"; // Replace with your proxy URL
    const useProxy = process.env.USE_DISCORD_PROXY === "true"; // Toggle proxy via environment variable

    try {
        // Configure Axios options
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...(useProxy ? { proxy: { host: proxyUrl, port: 8080 } } : {}), // Enable proxy if configured
        };

        // Attempt to send the request through the proxy (if enabled)
        const res = await axios.post(discordWebhookUrl, body, axiosConfig);

        // If successful, return the Discord response data
        console.log('Webhook sent successfully:', res.data);
        return new Response(JSON.stringify(res.data), {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        });
    } catch (error) {
        // If the request to Discord fails, log the error
        console.error('Failed to send webhook:', error);
        return new Response(JSON.stringify({ error: 'Failed to send webhook' }), {
            status: 500,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
}
