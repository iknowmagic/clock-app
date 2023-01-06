import _random from 'lodash/random'

import quotes from './quotes.json'

export default function quote(request, response) {
  const quote = quotes[_random(0, quotes.length - 1)]
  response.status(200).json(quote)
}
