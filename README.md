# Simple Discord Webhook Proxy

Seamlessly proxy Discord webhooks through Vercel, primarily for Roblox. This project allows you to replace the default `discord.com` domain in your webhook URL with a proxy domain powered by Vercel's global network. It handles rate limits, complies with Discord's ToS, and is simple to integrate.

## Features

- **Easy to Integrate**: Simply replace `discord.com` with your proxy domain in the webhook URL when sending.
- **Globally Distributed**: Powered by Vercel's global network, ensuring high availability and low latency across multiple continents.
- **Complies with ToS**: Built to comply with Discord's terms of service by enforcing rate limits and implementing anti-abuse measures.
- **Rate Limit Handling**: Automatically queue requests using `POST /api/webhooks/:id/:token/queue` to handle rate limits.

## How to Use

1. **Input Discord Webhook URL**: Enter the Discord webhook URL (e.g., `https://discord.com/api/webhooks/...`).
2. **Get Proxy URL**: The input URL will be automatically converted to the proxy URL using your Vercel domain.
3. **Copy Proxy URL**: Click the "Copy" button to copy the proxy URL for use in your app.

## License

This project is licensed under the MIT License.

## Acknowledgments

Inspired by [Lewisakura's Webhook Proxy](https://github.com/lewisakura/webhook-proxy).

Made with ❤️ by [StarVSK](https://starvsk.dev).


## Getting Started

First, install dependancies:
```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

A test is available at `/api/test`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel
[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/star-ot/simple-discord-webhooks-proxy)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new/clone?repository-url=https://github.com/star-ot/simple-discord-webhooks-proxy) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
