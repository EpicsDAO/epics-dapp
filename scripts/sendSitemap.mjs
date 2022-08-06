import dotenv from 'dotenv'
dotenv.config()
import { readFileSync } from 'fs'
import { XMLParser } from 'fast-xml-parser'
const parser = new XMLParser()
import fetch from 'node-fetch'

const domain = 'app.epics.dev'

const main = async () => {
  try {
    const apiKey = process.env.BING_API_KEY
    if (!apiKey) {
      throw Error('No api key')
    }

    const sitemapXML = readFileSync('out/sitemap.xml', 'utf-8')
    console.log(sitemapXML)
    const sitemapJSON = parser.parse(sitemapXML)
    const googlePing = await fetch(
      `https://www.google.com/ping?sitemap=https://${domain}/sitemap.xml`,
      {
        method: 'GET',
      }
    )
    console.log(googlePing)
    const urlList = sitemapJSON.urlset.url.map((item) => item.loc)
    const [siteUrl] = urlList
    const body = { siteUrl, urlList }
    const response = await fetch(
      `https://ssl.bing.com/webmaster/api.svc/pox/SubmitUrlBatch?apikey=${apiKey}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    )
    console.log(response)
  } catch (error) {
    if (error.message.includes('No api key')) {
      console.error('Please set Bing API key in .env')
    } else if (error.message.includes('ENOENT: no such file or directory')) {
      console.error(
        'There is no sitemap.xml. please run `yarn build` to make sitemap on your local '
      )
    } else {
      console.log(error)
    }
  }
}

main()
