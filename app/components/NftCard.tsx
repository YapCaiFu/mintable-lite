import { FunctionComponent } from 'react';

interface NftCardProps {
    nft: {
        id: string;
        name: string;
        description: string;
        address: string;
    };
    image: string;
    handleViewDetails: (address: string, id: string) => void;
}

const NftCard: FunctionComponent<NftCardProps> = ({ nft, image, handleViewDetails }) => {
    return (
        <div className="bg-white rounded-md border p-4 relative">
            <img src={image} alt={nft.name} className="mb-4" />
            <h2 className="text-xl">{nft.name} #{nft.id}</h2>
            <p className="text-sm text-gray-600 mb-11 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                {nft.description}
            </p>
            <button
                onClick={() => handleViewDetails(nft.address, nft.id)}
                className="rounded-sm bg-orange-500 text-white text-sm p-2 absolute bottom-4 left-4"
            >
                View Details
            </button>
        </div>
    );
};

export default NftCard;
