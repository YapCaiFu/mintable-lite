'use client';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { UserAuthData } from '../types/next';
import Card from '../components/Card';
import Header from '../components/Header';
import { convertIPFSUriToUrl } from '../lib/utils';
import NftCard from '../components/NftCard';

const cards = [
  {
    title: "Starbucks",
    imageUrl: "https://openseauserdata.com/0x4006a717b390ff7ccc4350228c12902a3274f53a/1-1559779708.jpg",
    brandId: '0xdb1a17383ec5f23e2b1b30120ffa0e925e0b2397',
  },
  {
    title: "McDonald's",
    imageUrl: "https://lh3.googleusercontent.com/D9XfW0wLLuU3SIVHToFz3kQTHzgyQZj6T-clwH_DQl9yBg1Fro8h8Q38WJJEUmKZNtC7PoPJbvQsikumTWkp2Lbp2u4YM-FsuBuz",
    brandId: '0xdb1a17383ec5f23e2b1b30120ffa0e925e0b2397',
  },
];

type NFT = {
  id: string;
  name: string;
  description: string;
  image: string;
  address: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [message, setMessage] = useState('');
  const [session, setSession] = useState<UserAuthData | {}>({});
  const [nftAddress, setNftAddress] = useState('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB');

  useEffect(() => {
    axios.post(`/api/authenticate`)
      .then(({ data }) => {
        const { iat, ...authData } = data; // remove unimportant iat value

        setSession(authData);
      })
      .catch((err) => {
        console.error(err)
        router.replace('/')
      });
  }, []);

  async function signOut() {
    try {
      await axios.post(`/api/logout`);
      router.replace('/');
    } catch (error) {
      console.error(error)
      setMessage('Failed to logout');
    }
  }

  const fetchNFTs = async () => {
    try {
      const userNFTs: AxiosResponse<NFT[]> = await axios.post(`/api/fetchnft`, { address: nftAddress ? nftAddress : (session as UserAuthData)?.address });
      if (userNFTs.data) {
        setNfts(userNFTs.data);
      }
    } catch (error) {
      setMessage('Failed to fetch NFTs');
    }
  };

  useEffect(() => {
    if ((session as UserAuthData)?.address) {
      fetchNFTs();
    }
  }, [session]);

  const handleViewDetails = (tokenAddress: string, tokenId: string) => {
    router.push(`/nft/${tokenAddress}/${tokenId}`);
  };

  return (
    <div className="h-screen">
      <Header isDashboard onSignOut={signOut} />
      <div className='mx-auto p-6'>
        <h1 className="text-2xl font-bold mt-4 mb-4">My Custom Wallet Address</h1>
        <div className="flex mb-4">
          <input type="text" value={nftAddress} onChange={(event) => setNftAddress(event.target.value)} placeholder="Enter address"
            className="border border-gray-300 px-4 py-2 rounded-md mr-2" style={{ width: '450px' }} />
          <button className="bg-orange-500 text-sm text-white px-4 rounded-md" onClick={() => fetchNFTs()}>Submit</button>
        </div>
        <h1 className="text-2xl font-bold mt-6 mb-4">Brands Promotion</h1>
        <div className="overflow-x-auto  whitespace-nowrap">
          <div className="inline-flex space-x-4 pb-2">
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                imageUrl={card.imageUrl}
                brandId={card.brandId}
              />
            ))}
          </div>
        </div>
        <h1 className="text-2xl font-bold mt-6 mb-4">Your NFTs</h1>
        {message && <p className="text-red-500">{message}</p>}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {nfts.map((nft) => {
            const image = nft.image ? nft?.image?.startsWith("ipfs") ? convertIPFSUriToUrl(nft?.image) : nft.image : 'https://via.placeholder.com/500'
            return (
              <NftCard key={nft.id} nft={nft} image={image} handleViewDetails={handleViewDetails} />
            )
          })}
        </div>
      </div>
    </div>
  );
}
