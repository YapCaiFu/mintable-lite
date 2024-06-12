import Brand from './Brand';

export function generateStaticParams() {
  return [
    {
      brandId: '0xdb1a17383ec5f23e2b1b30120ffa0e925e0b2397',
      brand: 'Starbucks'
    }
  ]
}

export default function Page({ params }: { params: { brand: string, brandId: string } }) {
  return <Brand params={params} />;
}