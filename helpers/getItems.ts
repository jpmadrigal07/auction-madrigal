import { CACHE_REVALIDATE } from "@/helpers/constants";

async function getItems(type: 'ongoing' | 'completed') {
    const res = await fetch(`http://localhost:3000/api/item/${type}`, {
        next: { revalidate: CACHE_REVALIDATE },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default getItems;