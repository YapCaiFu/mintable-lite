import { FunctionComponent } from 'react';

interface NftDetailsProps {
    nft: {
        id: string;
        name: string;
        description: string;
        image: string;
        seller: string;
        price: string;
        brand?: string;
    } | null;
    ipfsUrl: string;
    isPromo?: boolean;
}

const NftDetail: FunctionComponent<NftDetailsProps> = ({ isPromo, nft, ipfsUrl }) => {
    return (
        <div className="mx-auto p-4 flex flex-col items-center">
            <div className="bg-white border rounded-md p-4 flex items-center mb-4">
                <img src={ipfsUrl} alt={nft?.name} className="w-40 h-40 object-cover rounded-md mr-4" />
                <div>
                    <h2 className="text-xl">{nft?.name} #{nft?.id}</h2>
                    <p className="text-gray-600 mb-2">{nft?.description}</p>
                    <p className="text-gray-800 font-semibold">Seller:</p>
                    <p className="text-gray-800 mb-2">{nft?.seller}</p>
                    <p className="text-gray-800 font-semibold">Price:</p>
                    <p className="text-gray-800 mb-4">{nft?.price}</p>
                    {isPromo &&
                        <p className="text-red-500 mb-4 text-sm">{`Claim a free coffee on your next visit for ${nft?.brand} NFT`}</p>}
                </div>
            </div>
            <button className="text-white bg-orange-500 py-2 px-4 rounded-md">
                Sell
            </button>
        </div>
    );
};

export default NftDetail;
