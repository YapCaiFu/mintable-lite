import { NextResponse } from "next/server";
import Moralis from 'moralis';
import axios from "axios";
import { startServer } from "@/app/lib/utils";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    await startServer();

    try {
        const { address, tokenId } = await req.json();

        const message = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
            "chain": "0x1",
            "format": "decimal",
            "mediaItems": true,
            address,
            tokenId
        });

        let detail = message?.raw?.result?.[0];
        let price;

        try {
            const url = `https://deep-index.moralis.io/api/v2.2/nft/${address}/${tokenId}/price?chain=eth&days=365`;
            const headers = {
                'accept': 'application/json',
                'X-API-Key': process.env.MORALIS_API_KEY,
            };

            const response = await axios.get(url, { headers });
            price = response?.data;
        } catch (error) {
            console.error(error);
        }

        return NextResponse.json({ detail, price }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 403 });
    }
}
