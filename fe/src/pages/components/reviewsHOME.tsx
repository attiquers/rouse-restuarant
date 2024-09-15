import { Star, StarHalf, User2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "A truly exceptional dining experience! The flavors were bold and perfectly balanced, and the service was top-notch. This is my new go-to spot for special occasions.",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
    text: "Fantastic food with a great atmosphere. The steak was cooked to perfection, and the staff made sure we had everything we needed. A bit pricey, but worth every penny.",
  },
  {
    id: 3,
    name: "Carol White",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    text: "Delicious dishes and a cozy ambiance. While the menu had some hits and misses, the overall experience was enjoyable. The dessert was a standout!",
  },
  {
    id: 4,
    name: "David Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Exceptional quality and service! Every dish we tried was packed with flavor, and the attention to detail was evident. Highly recommend this place for a memorable meal.",
  },
  {
    id: 5,
    name: "Emma Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "An unforgettable dining experience! The presentation of the food was beautiful, and each bite was a delight. The staff was friendly and attentive, making our evening perfect.",
  },
  {
    id: 6,
    name: "John Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
    text: "Great food and a warm, welcoming atmosphere. The burger was juicy and full of flavor. Only minor issue was a slight delay in service, but it was worth the wait.",
  },
  {
    id: 7,
    name: "Sophia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    text: "The restaurant has a great vibe and the dishes are tasty. The pasta was creamy and delicious, but the portions were smaller than expected. Overall, a good place to dine.",
  },
  {
    id: 8,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "An exceptional restaurant with a diverse menu and excellent service. The seafood platter was fresh and flavorful. Definitely a spot to revisit for anyone who loves great food.",
  },
  {
    id: 9,
    name: "Olivia Green",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 3.5,
    text: "The food was good but not outstanding. Some dishes were over-seasoned, and the service was a bit slow. It’s a decent place, but there’s room for improvement.",
  },
  {
    id: 10,
    name: "Liam Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
    text: "A great dining experience with a creative menu. The appetizers were delightful, and the main course was satisfying. The dessert was a bit of a letdown, but overall, a great place to eat.",
  },
  {
    id: 11,
    name: "Mia Clark",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Absolutely perfect in every way! The ambiance was delightful, and the food was exquisite. I can't wait to return and try more from the menu.",
  },
  {
    id: 12,
    name: "Noah Adams",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    text: "Very good experience overall. The service was friendly, and the dishes were flavorful. The only downside was the noise level, which made conversation a bit challenging.",
  },
  {
    id: 13,
    name: "Isabella Lewis",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
    text: "Great place with a varied menu. The vegetarian options were surprisingly good, and the desserts were delicious. Minor point – the wait was a bit long, but it was worth it.",
  },
  {
    id: 14,
    name: "Ethan Walker",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "One of the best dining experiences I've had. The food was flavorful, and the service was attentive. The chef clearly takes pride in their work.",
  },
  {
    id: 15,
    name: "Ava Harris",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 3.5,
    text: "Good food, but the service was a bit inconsistent. Some dishes were excellent, while others were average. It's a hit or miss experience, but still worth a try.",
  },
  {
    id: 16,
    name: "James Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
    text: "A delightful meal with a cozy atmosphere. The steak was cooked just right, and the sides complemented it perfectly. I would definitely recommend this place.",
  },
  {
    id: 17,
    name: "Charlotte White",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Fantastic food and exceptional service. Every detail was perfect, from the presentation to the taste. This is my new favorite restaurant in town!",
  },
  {
    id: 18,
    name: "Lucas King",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    text: "A solid dining option with a good variety of dishes. The food was tasty, and the environment was pleasant. The only drawback was the slightly high prices.",
  },
  {
    id: 19,
    name: "Amelia Scott",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
    text: "Really enjoyed the meal here. The seafood was fresh, and the service was attentive. A bit on the pricier side, but worth it for the quality.",
  },
  {
    id: 20,
    name: "Benjamin Green",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
    text: "Great dining experience with excellent food. The service was friendly, and the atmosphere was inviting. The only minor issue was the wait time during peak hours.",
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={i + fullStars} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  );
}

export default function ReviewCarousel() {
  const groupedReviews = [];
  for (let i = 0; i < reviews.length; i += 2) {
    groupedReviews.push(reviews.slice(i, i + 2));
  }

  return (
    <Carousel className="pt-20 md:pt-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <CarouselContent>
        {groupedReviews.map((group, index) => (
          <CarouselItem key={index}>
            <div className="space-y-4">
              {group.map((review) => (
                <Card key={review.id} className="border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 aspect-square bg-purple-500 rounded-full p-1">
                        {/* <img
                        className="w-16 h-16 rounded-full object-cover"
                        src={review.avatar}
                        alt={`${review.name}'s avatar`}
                      /> */}
                        <User2 className="w-full h-full text-gray-800" />
                      </div>
                      <div className="pl-4">
                        <h3 className="font-semibold text-xl">{review.name}</h3>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <p className="text-gray-600 text-md leading-tight">
                      {review.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="h-full  md:w-auto absolute -top-60 left-28 md:static ">
        <CarouselPrevious className="rounded-md w-20 h-20 md:h-full p-4  md:-ml-10" />
        <CarouselNext className="rounded-md w-20  h-20  md:h-full p-4 -mr-20 md:-mr-10" />
      </div>

      {/* 
      <div className="h-full w-32 md:w-auto absolute -top-60 left-20 md:relative md:-top-0 md:left-0">
        <CarouselPrevious className="rounded-md w-full h-20 md:h-full p-4  md:-ml-10" />
        <CarouselNext className="rounded-md w-full h-20  md:h-full p-4 -mr-10" />
      </div> */}
    </Carousel>
  );
}
