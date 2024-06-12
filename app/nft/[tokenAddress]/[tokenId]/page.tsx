import NftDetails from './NftDetails';

export function generateStaticParams() {
  return [
    {
      tokenAddress: '0x2f2a46df96a50e475319676cac6a6f30a69132ac',
      tokenId: '5573'
    }
  ]
}

export default function Page({ params }: { params:  { tokenAddress: string, tokenId: string }  }) {
  return <NftDetails params={params} />;
}