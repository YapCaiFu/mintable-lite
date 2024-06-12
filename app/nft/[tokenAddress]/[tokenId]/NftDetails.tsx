'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { convertIPFSUriToUrl } from '@/app/lib/utils';
import Header from '@/app/components/Header';
import NftDetail from '@/app/components/NftDetail';


type NFT = {
  id: string;
  name: string;
  description: string;
  image: string;
  seller: string;
  price: string;
};

export default function NftDetails({ params }: { params: { tokenAddress: string, tokenId: string } }) {
  const router = useRouter();
  const [ipfsUrl, setIpfsUrl] = useState('');
  const { tokenAddress, tokenId } = params;
  const [nft, setNft] = useState<NFT | null>(null);

  useEffect(() => {
    axios.post(`/api/authenticate`)
      .catch((err) => {
        console.error(err)
        router.replace('/')
      });
  }, []);

  useEffect(() => {
    const fetchIPFSImage = async (ipfsUri: string) => {
      try {
        const response = await fetch(convertIPFSUriToUrl(ipfsUri));
        if (response.ok) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setIpfsUrl(imageUrl);
        } else {
          console.error('Failed to fetch IPFS image:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching IPFS image:', error);
      }
    };

    axios.post(`/api/fetchnftdetail`, { address: tokenAddress, tokenId })
      .then(({ data }) => {
        const metadata = JSON.parse(data?.detail?.metadata)
        const price = data?.price?.last_sale ? `${data?.price?.last_sale.payment_token.token_decimals} ${data?.price?.last_sale.payment_token.token_symbol}` : data?.price?.message || 'No sale in this period'
        if (metadata?.image?.startsWith("ipfs")) {
          fetchIPFSImage(metadata?.image)
        } else {
          setIpfsUrl(metadata?.image)
        }
        setNft({
          id: tokenId,
          name: metadata?.name,
          description: metadata?.description,
          image: "",
          seller: data?.detail?.owner_of,
          price
        });
      })
      .catch((err) => {
        console.error(err)
      });
  }, []);

  async function signOut() {
    try {
      await axios.post(`/api/logout`);
      router.replace('/');
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="h-screen">
      <Header onSignOut={signOut} />
      <NftDetail nft={nft} ipfsUrl={ipfsUrl}/>
    </div>
  );
}
