"use client"

import { useState, useEffect } from 'react'
import { ArrowRight, Check, Github, Globe, Shield, Zap, Triangle } from 'lucide-react'

export function Homepage() {
  const [inputUrl, setInputUrl] = useState('')
  const [outputUrl, setOutputUrl] = useState('')
  const [proxyDomain, setProxyDomain] = useState('')

  useEffect(() => {
    setProxyDomain(window.location.hostname)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputUrl = e.target.value
    setInputUrl(newInputUrl)
    setOutputUrl(newInputUrl.replace('discord.com', proxyDomain))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col items-center justify-center p-4 text-white">
      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Simple Discord Webhook Proxy</h1>
        <p className="text-xl mb-8 text-center">
          Seamlessly proxy Discord webhooks through Vercel, primarily for Roblox.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <label htmlFor="input-url" className="block text-sm font-medium mb-2">
              Input Discord Webhook URL
            </label>
            <div className="flex items-center">
              <input
                id="input-url"
                type="text"
                value={inputUrl}
                onChange={handleInputChange}
                placeholder="https://discord.com/api/webhooks/..."
                className="flex-grow px-4 py-2 rounded-l-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <div className="bg-white/20 px-4 py-2 rounded-r-lg">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="output-url" className="block text-sm font-medium mb-2">
              Output Proxy URL
            </label>
            <div className="flex items-center">
              <input
                id="output-url"
                type="text"
                value={outputUrl}
                readOnly
                className="flex-grow px-4 py-2 rounded-l-lg bg-white/20"
              />
              <button
                onClick={() => navigator.clipboard.writeText(outputUrl)}
                className="bg-white/20 px-4 py-2 rounded-r-lg hover:bg-white/30 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Feature
            icon={<Zap className="w-8 h-8" />}
            title="Easy to Integrate"
            description={`Simply replace discord.com with ${proxyDomain} in your webhook URL when sending. That's it.`}
          />
          <Feature
            icon={<Globe className="w-8 h-8" />}
            title="Globally Distributed"
            description="Powered by Vercel's global network, ensuring high availability and low latency across multiple continents."
          />
          <Feature
            icon={<Shield className="w-8 h-8" />}
            title="Complies with ToS"
            description="Built to comply with Discord's terms of service by enforcing rate limits and implementing anti-abuse measures."
          />
          <Feature
            icon={<Check className="w-8 h-8" />}
            title="Ratelimit Handling"
            description="Use POST /api/webhooks/:id/:token/queue, to automatically queue requests."
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <a
            href="https://vercel.com/new/clone?repository-url=https://github.com/star-ot/simple-discord-webhooks-proxy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            <Triangle className="w-4 h-4 mr-2 fill-current" />
            Deploy on Vercel
          </a>
          <a
            href="https://github.com/star-ot/simple-discord-webhooks-proxy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
          >
            <Github className="w-5 h-5 mr-2" />
            View source on GitHub
          </a>
        </div>
      </div>
      <footer className="mt-8 text-sm text-white/70 flex items-center justify-center">
        <span className="mr-1">Inspired by Lewisakura&apos;s </span>
        <a href="https://github.com/lewisakura/webhook-proxy" className="hover:underline mr-4">Webhook Proxy</a>
        <span>Made with ❤️ by <a target = "_blank" href="https://starvsk.dev">StarVSK</a></span>
      </footer>
    </div>
  )
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-6 transition-all hover:bg-white/10 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="mr-4 p-2 bg-white/10 rounded-full">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-white/80 flex-grow">{description}</p>
    </div>
  )
}