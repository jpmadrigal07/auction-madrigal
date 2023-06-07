import Item from "@/components/Item"

export const metadata = {
  title: 'Auction - Item',
  description: 'Auction Madrigal',
}

export default function ItemPage({ params }: { params: { itemId: number } }) {
  if (!params.itemId || isNaN(params.itemId)) {
    return (
      <main className="pb-16 pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p>Item id is invalid</p>
        </div>
      </main>
    );

  }
  return <Item itemId={params.itemId} />
}
