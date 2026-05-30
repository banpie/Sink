import { readFile } from 'node:fs/promises'

const [, , baseUrl, token, file = 'scripts/banpie-links.json'] = process.argv

if (!baseUrl || !token) {
  console.error('Usage: node scripts/import-banpie-links.mjs https://s.banpie.info YOUR_SITE_TOKEN [file]')
  process.exit(1)
}

const payload = await readFile(file, 'utf8')
const response = await fetch(new URL('/api/link/import', baseUrl), {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'content-type': 'application/json',
  },
  body: payload,
})

const text = await response.text()
if (!response.ok) {
  console.error(text)
  process.exit(1)
}

console.log(text)
