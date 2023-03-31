import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const headers = {
//   'Content-Type': 'application/json',
  Authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTE2MTJlODBiOWQ4OTBkNDBmMDY4NmE2YWJjMDVlNzA3ZmZkYjMxNjA1NDU4ZWYyODIxN2JlMjBmNTBkNWRhNTFmNDhjNjUyZjhkNTM3MDIiLCJpYXQiOjE2Nzg2ODMwNTEuMTU0MzgxLCJuYmYiOjE2Nzg2ODMwNTEuMTU0MzgzLCJleHAiOjE2OTQ1ODA2NTEuMTQ2NzkzLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.VkXA0cY-HKMBz9sRYC1_xB2GYi0r9CGJUCzkuJlbY_ek6xFbYtapYgEYev10okk3rJGpyGZxSM4a9havi4jv7OaXByOeNr-02sdap1QQm0u28h8q29BmQov3BnDgviGYMYBZTR2yeoOGUeuTgsB_hcHrKbnffbOwAjE90IDJLqkrI52Z4rMuw99aDZEgC97DHRouSHsrn4hH2NWPsO0V9m86cg4VWzJfQC4g4HRZ_XrEdTXIgrKopIYxFWIwxn3BVdiZlTXMHej7jMhtI0g_072mjRtZqUhTgvyBU5N1CEtLF9DOTEXw8tozEC91hhMstdknKSHIc7hHBBiqP0o1zjIRLdQwrrXWiMzke1qY-nIDgPVsiG3Wg0JrH-Ldhcy1k4twvuIqD0saPt57fr7fWeGz86vdeChU1ezM8DmEDsEYhyM-F0vt0A9EFtPOeKGyWeGatG6VIyCQRQfY6AxyjweBWRKdQcQ6IU-dJafkOEEfOwfUjFLWiQIpheiKsQ7qGkGlsvbpdbI1rpJMcpR08Iefi6bGt0smcAlzkpR9yOX-c-F_Ex8HIyONWqlXaM_C45Fy3dQPteK7sVldpO1w6i_rc8fVEI6dxoflXrTdu8yh7jU4zaLeFH60_UIaPi4WwwbCTkCNxdIdnj3MM91J5wrtL_MJeb2jfCrJ-uoH7jo'
}

export const purchaseOrderApi = createApi({
  reducerPath: 'purchaseOrderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://bderpapi.bangladesherp.com/api/v1/' }),
  endpoints: builder => ({
    getVendors: builder.query<any, string>({
      query: () => ({
        url: `suppliers`,
        headers: headers
      }),
    }),
    getWareHouses: builder.query<any, string>({
        query: () => ({
            url: `warehouses`,
            headers: headers
        })
    }),
    getCustomers: builder.query<any, string>({
        query: () => ({
            url: `customers`,
            headers: headers
        })
    }),
  })
})

export const { useGetVendorsQuery, useGetWareHousesQuery, useGetCustomersQuery } = purchaseOrderApi
