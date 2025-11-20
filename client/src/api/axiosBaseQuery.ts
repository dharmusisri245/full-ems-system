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
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || {
            message: axiosError.message,
          },
        },
      };
    }
  };
