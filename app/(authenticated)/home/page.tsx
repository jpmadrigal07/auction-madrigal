import Ongoing from "@/components/Ongoing"
import getItems from "@/helpers/getItems";
import getItemsCount from "@/helpers/getItemsCount";

export const metadata = {
  title: 'Auction - Home',
  description: 'Auction Madrigal',
}

export default async function HomePage() {
  const items = await getItems('ongoing');
  const count = await getItemsCount();
  return (
    <Ongoing items={items} count={count} />
  )
}
