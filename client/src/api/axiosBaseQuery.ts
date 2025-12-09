// import axiosInstance from "./AxiosInstace";

// export const axiosBaseQuery =
//   () =>
//   async ({
//     url,
//     method = "GET",
//     data,
//     params,
//   }: {
//     url: string;
//     method?: string;
//     data?: any;
//     params?: any;
//   }) => {
//     try {
//       const result = await axiosInstance({
//         url,
//         method,
//         data,
//         params,
//       });

//       return { data: result.data };
//     } catch (axiosError: any) {
//       return {
//         error: {
//           status: axiosError.response?.status,
//           data: axiosError.response?.data || {
//             message: axiosError.message,
//           },
//         },
//       };
//     }
//   };


//===============================UPADTED BASE QUERY=============================


// src/api/axiosBaseQuery.ts
import axiosInstance from "./AxiosInstace";

export const axiosBaseQuery =
  () =>
  async ({
    url,
    method = "GET",
    data,
    params,
  }: {
    url: string;
    method?: string;
    data?: any;
    params?: any;
  }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (err: any) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || { message: err.message },
        },
      };
    }
  };
