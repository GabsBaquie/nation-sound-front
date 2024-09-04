import { slugify } from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { Info as InfoType } from "../../models/blocks";
import Button from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";

interface InfoProps {
  block: InfoType;
}

const InfoBlock: React.FC<InfoProps> = ({ block }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="mt-16">
      <h1 className="mb-4 text-xl md:text-2xl">{block.title}</h1>
      <p className="text-sm md:text-lg md:mb-4">{block.text}</p>
      <div>
        <Slider {...settings}>
          {block.carrousel.map((card) => (
            <Card key={card.id}>
              <CardHeader>
                <Image
                  width={150}
                  height={150}
                  src={card.image?.url || ""}
                  alt={card.image?.alternativeText || ""}
                  className="mx-auto"
                />
                <h2>{card.title}</h2>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>

              <CardFooter>
                <Link href={`/news/${slugify(card.title)}`} passHref>
                  <Button>Voir plus</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default InfoBlock;