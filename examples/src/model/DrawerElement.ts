export enum DrawerElementInputType {
  TEXT_INPUT = 1,
  SELECT
}

export interface DrawerElement {
  line:number;
  column:number;
  label: string;
  type: DrawerElementInputType;
  value: string;
}
