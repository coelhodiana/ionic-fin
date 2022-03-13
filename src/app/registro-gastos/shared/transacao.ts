export interface Transacao {
  _id: string;
  valor: number;
  tipo: string;
  identificacao: string;
  descricao: string;
  data: Date;
  dataInclusao: Date;
  _userId: string;
}

