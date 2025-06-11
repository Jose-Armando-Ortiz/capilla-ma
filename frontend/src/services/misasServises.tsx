// src/services/misasService.ts
import axios from 'axios';

export interface Misa {
  id: number;
  fecha: string;
  descripcion: string;
}

export const fetchMisas = async (): Promise<Misa[]> => {
  const response = await axios.get<Misa[]>('http://localhost:8080/api/misas');
  return response.data;
};

