export interface Transacao {
  _id: string;
  tipo: string;
  valor: number;
  dataInclusao: Date;
  descricao: string;
}
