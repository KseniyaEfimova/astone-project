import { ApiResponse } from '../../Pages/Characters/Characters.tsx';

export const getApiData = async (url: string): Promise<ApiResponse> => {
  const response: Response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
