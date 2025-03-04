import axios from "axios";

export async function POST(request: Request) {
    try {
        // Get the original URL path (everything after "/api/discord-proxy/")
        const urlPath = new URL(request.url).pathname.replace("/api/discord-proxy/", "");

        // Ensure a valid Discord API endpoint is provided
        if (!urlPath.startsWith("api/webhooks/") && !urlPath.startsWith("api/v")) {
            return new Response(JSON.stringify({ error: "Invalid Discord API path" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Construct the full Discord API URL
        const discordUrl = `https://discord.com/${urlPath}`;

        // Parse the incoming request body
        const body = await request.json();

        // Forward the request to Discord
        const discordResponse = await axios.post(discordUrl, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`, // Optional if needed
            },
        });

        // Return Discord's response to the client
        return new Response(JSON.stringify(discordResponse.data), {
            status: discordResponse.status,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error: any) {
        console.error("Proxy error:", error.response?.data || error.message);
        return new Response(JSON.stringify({ error: "Failed to forward request to Discord" }), {
            status: error.response?.status || 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
