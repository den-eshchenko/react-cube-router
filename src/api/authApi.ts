import { RequestAuth, RequestRegistration, ResponseAuth } from "../types/auth";
import { commonApi } from "./commonApi";

export const authApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
      auth: builder.mutation<ResponseAuth, RequestAuth>({
        query: (body) => ({
          url: "auth/authorization",
          method: "POST",
          body,
        }),
      }),
      registration: builder.mutation<void, RequestRegistration>({
        query: (body) => ({
          url: "auth/registration",
          method: "POST",
          body,
        }),
      }),
      check: builder.query<{ login: string }, void>({
        query: () => ({ 
          url: "auth/check",
          method: "GET",
         })
      })
    }),
  });

export const { useAuthMutation, useRegistrationMutation, useLazyCheckQuery } = authApi;
