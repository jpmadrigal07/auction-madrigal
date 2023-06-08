import Ongoing from "@/components/Ongoing"
import getItems from "@/helpers/getItems";
import getItemsCount from "@/helpers/getItemsCount";

export const metadata = {
  title: 'Auction - Ongoing',
  description: 'Auction Madrigal',
}

export default async function OngoingPage() {
  const items = await getItems('ongoing');
  const count = await getItemsCount();
  return (
    <Ongoing items={items} count={count} />
  )
}
