import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://bderpapi.bangladesherp.com/api/' }),
  endpoints: (builder) => ({
    getCountry: builder.query({
      query: () => `v1/countries`,
    }),
  }),
})


export const {useGetCountryQuery} = vendorApi