import fetch from 'isomorphic-unfetch'

async function getTimezone() {
  return fetch(
    // eslint-disable-next-line no-undef
    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.VUE_APP_GEO_IP_KEY}`,
  )
}

export default async function timezone(request, response) {
  const timezoneResponse = await getTimezone()
  const timezoneData = await timezoneResponse.json()
  response.status(200).json(timezoneData)
}
