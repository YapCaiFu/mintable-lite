import NftBrandDetail from './NftBrandDetail';

export function generateStaticParams() {
  return [
    {
      tokenAddress: '0x2f2a46df96a50e475319676cac6a6f30a69132ac',
      tokenId: '5573',
      image: 'https%03A--openseauserdata.com--0x4006a717b390ff7ccc4350228c12902a3274f53a--1-1559779708.jpg',
      brand: 'Starbucks'
    }
  ]
}

export default function Page({ params }: { params: { tokenAddress: string, tokenId: string, image: string, brand: string } }) {
  return <NftBrandDetail params={params} />;
}