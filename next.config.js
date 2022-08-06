/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
  env: {
    domain: 'app.epics.dev',
    copyright: 'Epics DAO',
    sitenameJA: '(開発中)Epics - 分散型クラウドソーシングプラットフォーム',
    sitenameEN: '(Now developing)Epics - Decentralized Crowdsourcing Platform',
    keywordsJA:
      'dApp, Solana, Web3, クラウドソージング, オープンソース, 開発, Buidl to Earn',
    keywordsEN:
      'dApp, Solana, Web3, Crowdsourcing, Open-source, Dev, Buidl to Earn',
    descriptionJA:
      'Buidl to Earn. Epicsはオープンソースソフトウェア開発のための分散型クラウドソーシングプラットフォームです。',
    descriptionEN:
      'Buidl to Earn. Epics is a decentralized crowdsourcing platform for open source software development.',
    twitterAccount: '@EpicsDAO',
    instagramAccount: 'epics.dao',
    githubAccount: 'EpicsDAO',
    discordInvitationLink: 'https://discord.gg/GmHYfyRamx',
  },
}

const intercept = require('intercept-stdout')

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return ''
  }
  return text
}

if (process.env.NODE_ENV === 'development') {
  intercept(interceptStdout)
}

module.exports = nextConfig
