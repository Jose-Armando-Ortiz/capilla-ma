import axios from 'axios';

export interface Evento {
  id: number;
  fecha: string;
  descripcion: string;
  hora: string
}

export const fetchEventos = async (): Promise<Evento[]> => {
  const response = await axios.get<Evento[]>('http://localhost:8080/api/eventos');
  return response.data;
};

