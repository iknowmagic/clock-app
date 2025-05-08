export interface TimezoneResponse {
  ip: string
  continent_code: string
  continent_name: string
  country_code2: string
  country_code3: string
  country_name: string
  country_name_official: string
  country_capital: string
  state_prov: string
  district: string
  city: string
  zipcode: string
  latitude: string
  longitude: string
  is_eu: boolean
  country_flag: string
  country_emoji: string
  calling_code: string
  country_tld: string
  languages: string
  time_zone: {
    name: string
    offset: number
    current_time: string
    current_time_unix: number
    is_dst: boolean
    dst_savings: number
  }
}

export interface QuoteResponse {
  text: string
  author: string | null
}
