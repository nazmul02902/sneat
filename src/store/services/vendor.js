import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://bderpapi.bangladesherp.com/api/v1/' }),
  endpoints: builder => ({
    getCountry: builder.query({
      query: () => `countries`
    }),
    getStates: builder.query({
      query: country_code => `states?filter[country_iso2]=${country_code}`
    }),
    getDistricts: builder.query({
      query: state_id => `districts?filter[state_id]=${state_id}`
    }),
    getThanas: builder.query({
      query: dist_id => `thanas?filter[district_id]=${dist_id}`
    }),
    getUnions: builder.query({
      query: thana_id => `unions?filter[thana_id]=${thana_id}`
    }),
    getZipcode: builder.query({
      query: union_id => `zipcodes?filter[union_id]=${union_id}`
    }),
    getStreets: builder.query({
      query: zip_id => `street-adresses?filter[union_id]=${zip_id}`
    })
  })
})

export const {
  useGetCountryQuery,
  useGetStatesQuery,
  useGetDistrictsQuery,
  useGetThanasQuery,
  useGetUnionsQuery,
  useGetZipcodeQuery,
  useGetStreetsQuery
} = vendorApi
