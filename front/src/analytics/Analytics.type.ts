export type Options = {
  endpoint: string;
  events: string[];
  batch: number;
};

export type Props = {
  options: Options;
  children?: React.ReactNode;
};
