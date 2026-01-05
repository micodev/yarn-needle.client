import { createMetaStore } from '../utils/metaStoreFactory'

export const useCountryStore = createMetaStore('country', {
  apiEndpoint: '/api/meta/countries',
  itemName: 'country',
  itemNamePlural: 'countries',
  mapResponse: (country) => ({
    id: country.id,
    code: country.code,
    name: country.name,
    dialCode: country.dialCode
  })
})
