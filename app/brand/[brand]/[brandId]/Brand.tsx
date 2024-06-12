'use client';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { UserAuthData } from '../../../types/next';
import { encodeUrl } from '@/app/lib/utils';
import Header from '@/app/components/Header';
import NftCard from '@/app/components/NftCard';

const cards = [
  {
    title: "Starbucks",
    imageUrl: "https://openseauserdata.com/0x4006a717b390ff7ccc4350228c12902a3274f53a/1-1559779708.jpg",
  },
  {
    title: "McDonald's",
    imageUrl: "https://lh3.googleusercontent.com/D9XfW0wLLuU3SIVHToFz3kQTHzgyQZj6T-clwH_DQl9yBg1Fro8h8Q38WJJEUmKZNtC7PoPJbvQsikumTWkp2Lbp2u4YM-FsuBuz",
  },
];

type NFT = {
  id: string;
  name: string;
  description: string;
  image: string;
  address: string;
};

export default function Brand({ params }: { params: { brand: string, brandId: string } }) {
  const { brand, brandId } = params;
  const router = useRouter();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [message, setMessage] = useState('');
  const brandImg = cards.find(card => card.title == brand)?.imageUrl as string;

  useEffect(() => {
    axios.post(`/api/authenticate`)
      .catch((err) => {
        console.error(err)
        router.replace('/')
      });
  }, []);


  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const userNFTs: AxiosResponse<NFT[]> = await axios.post(`/api/fetchbrand`, { address: brandId });
        if (userNFTs.data) {
          setNfts(userNFTs.data);
        }
      } catch (error) {
        setMessage('Failed to fetch NFTs');
      }
    };
    fetchNFTs();
  }, []);

  const handleViewDetails = (tokenAddress: string, tokenId: string) => {
    router.push(`/nft/${tokenAddress}/${tokenId}/${brand}/${encodeUrl(brandImg)}`);
  };

  async function signOut() {
    try {
      await axios.post(`/api/logout`);
      router.replace('/');
    } catch (error) {
      console.error(error)
      setMessage('Failed to logout');
    }
  }

  return (
    <div className="h-screen">
      <Header onSignOut={signOut} />
      <div className=' mx-auto p-4 '>
        <h1 className="text-2xl font-bold mt-6 mb-4">{brand}</h1>
        {message && <p className="text-red-500">{message}</p>}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {nfts.map((nft) => {
            const image = nft.image ? nft.image : brandImg
            return (
              <NftCard key={nft.id} nft={nft} image={image} handleViewDetails={handleViewDetails} />
            )
          })}
        </div>
      </div>
    </div>
  );
}
