import { useMTGContext } from "@/contexts/contexts";
import { getImgMTG } from "@/services/allCardsMTGService";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import { MTGCardCarousel } from "./MTGCardCarousel";

export function MTGCardImage() {
  const { lastClickedId } = useMTGContext();
  const { data, error, isLoading } = useQuery<
    { exists: boolean; cardImgUris?: string[] },
    Error
  >({
    queryKey: [lastClickedId],
    queryFn: () => getImgMTG(lastClickedId),
    enabled: lastClickedId !== "",
  });

  if (isLoading)
    return (
      <Skeleton className="text-center w-full h-full rounded-3xl bg-secondary"></Skeleton>
    );
  if (error)
    return (
      <div className="flex items-center justify-center text-center w-full h-full rounded-3xl bg-secondary">
        Error...
      </div>
    );

  if (!data?.exists) {
    return (
      <div className="flex items-center justify-center text-center w-full h-full rounded-3xl bg-secondary"></div>
    );
  }

  const imageUri = data?.cardImgUris ? data.cardImgUris : [];

  return imageUri.length > 1 ? (
    <MTGCardCarousel images={imageUri}></MTGCardCarousel>
  ) : (
    <img className="rounded-3xl" src={imageUri[0]} alt="Card"></img>
  );
}
