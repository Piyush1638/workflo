import { CardProps } from "@/lib/interfaces/interfaces";
export interface DragProps {
  e: React.DragEvent<HTMLDivElement>;
  props?: CardProps;
  userId?: string;
}

export let dragTask: any;

export const handleDrag = ({ props }: DragProps) => {
  dragTask = props;
};


export const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};
