
import { AxiosResponse } from "axios";
import { customRequest } from "./api/httpClient";


export interface PruebaResponse {
    username: string;
    email: string;
    module_name: string;
    description: string;
}

export interface PruebaPostResponse {
    codigo: number;
    mensaje: string;
    data : PruebaResponse[];
}

export const postPruebaService = async (
  id: number
): Promise<PruebaPostResponse | null> => {
  try {
    const response: AxiosResponse<PruebaPostResponse> = await customRequest<
      {
        id: number;
      },
      PruebaPostResponse
    >({
      url: `/api/Module/listar`,
      method: "post",
      data: {
        id
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};