import { ContratoLicitacao } from './contratoLicitacao.model';

export interface Licitacao {
  id_licitacao: number;
  nm_orgao: string;
  nr_licitacao: string;
  ano_licitacao: number;
  cd_tipo_modalidade: string;
  tp_licitacao: string;
  tipo_licitacao: string;
  tipo_modalidade_licitacao: string;
  data_abertura: Date;
  data_homologacao: Date;
  data_adjudicacao: Date;
  vl_homologado: number;
  descricao_objeto: string;
  merenda: boolean;
  contratosLicitacao: ContratoLicitacao[];
}
