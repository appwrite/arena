const res = await fetch('https://api.github.com/repos/appwrite/arena')
const data = await res.json()
const stars = typeof data.stargazers_count === 'number' ? data.stargazers_count : 0

const outPath = new URL('../src/data/github-stars.json', import.meta.url)
await Bun.write(outPath.pathname, JSON.stringify({ stars }, null, 2) + '\n')

console.log(`Fetched GitHub stars: ${stars}`)
