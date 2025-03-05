import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type MTGCardCarouselProps = {
  images: string[];
};

export function MTGCardCarousel({ images }: MTGCardCarouselProps) {
  return (
    <Carousel>
      <CarouselContent>
        {Array.from({ length: images.length }).map((_, index) => (
          <CarouselItem key={index}>
            <div>
              <Card>
                <CardContent className="m-0 p-0 flex items-center justify-center">
                  {
                    <img
                      className="rounded-3xl"
                      src={images[index]}
                      alt="Card"
                    ></img>
                  }
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
