import Completed from "@/components/Completed"
import getItems from "@/helpers/getItems";
import getItemsCount from "@/helpers/getItemsCount";

export const metadata = {
  title: 'Auction - Completed',
  description: 'Auction Madrigal',
}

export default async function CompletedPage() {
  const items = await getItems('completed');
  const count = await getItemsCount();
  return (
    <Completed items={items} count={count} />
  )
}
