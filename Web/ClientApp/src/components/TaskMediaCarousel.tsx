import React from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "material-ui-image";

interface Props {
  id: number;
  images: number;
}

const createSrc = (id: number, images: number): string[] => {
  const sA: string[] = [];
  for (let i = 0; i < images; i++) sA.push(`/api/image/${id}_${i}`);
  return sA;
};

const TaskMediaCarousel = ({ id, images }: Props): JSX.Element => {
  return (
    <Carousel>
      {createSrc(id, images).map((src) => (
        <Image src={src} />
      ))}
    </Carousel>
  );
};

export default TaskMediaCarousel;
