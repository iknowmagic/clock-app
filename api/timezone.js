import fetch from 'isomorphic-unfetch'

async function getTimezone() {
  return fetch(
    `https://api.ipbase.com/v2/info?apikey=${process.env.VUE_APP_IP_BASE_KEY}`
  )
}

export default async function timezone(request, response) {
  const timezoneResponse = await getTimezone()
  const timezoneData = await timezoneResponse.json()
  response.status(200).json(timezoneData)
}
