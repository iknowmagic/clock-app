import fs from 'fs'
import path from 'path'

// Read the JSON file
// eslint-disable-next-line no-undef
const quotesPath = path.join(process.cwd(), 'api', 'quotes.json')
const quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf8'))

// Custom random function to replace lodash/random
function random(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function quote(request, response) {
  const quote = quotes[random(0, quotes.length - 1)]
  response.status(200).json(quote)
}
