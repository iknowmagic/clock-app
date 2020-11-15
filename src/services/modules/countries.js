import { countryService } from '@/services/http'

export const countries = {
  getAllCountries() {
    return countryService.get('/all', { useCache: true })
  },
  getSingleCountry(code: string) {
    return countryService.get(`/alpha/${code}`, { useCache: true })
  }
}
