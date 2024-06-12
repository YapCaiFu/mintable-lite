import { NextResponse } from "next/server";
import Moralis from 'moralis';
import { startServer } from "@/app/lib/utils";

export async function POST(req: Request) {
    if (req.method === 'POST') {
        await startServer();
        try {
            const res = await req.json()
            const { address } = res;

            const message = await Moralis.EvmApi.nft.getContractNFTs({
                "chain": "0x1",
                "format": "decimal",
                address
            });

            if (message?.raw) {
                const userNFTs = message.raw?.result?.map((nftItem: any) => {
                    const metadata = JSON.parse(nftItem?.metadata);
                    return {
                        id: nftItem.token_id,
                        address: nftItem.token_address,
                        name: metadata?.name,
                        description: metadata?.description,
                        image: metadata?.image,
                    };
                });

                return NextResponse.json(userNFTs, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
            }
        } catch (error) {
            console.error(error)
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 403 });
        }

    } else {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
}