export interface IModalDelete {
  icon?: React.ReactNode;
  open: boolean;
  title: string;
  body: string;
  agreeMessage?: string;
  desagreeMessage: string;
  agreeIcon?: React.ReactNode;
  desagreeIcon?: React.ReactNode;
  onAgree?: () => void;
  onDesagree: () => void;
}
