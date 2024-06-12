import Link from "next/link";

const Card = ({ title, imageUrl, brandId }: { title: string, imageUrl: string, brandId: string }) => {
    return (
        <Link href={`\\brand\\${title}\\${brandId}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 inline-block">
                <img className="w-full h-32 sm:h-48 object-cover" src={imageUrl} alt={title} />
                <div className="p-4">
                    <h2 className="text-lg font-bold">{title}</h2>
                </div>
            </div>
        </Link>
    );
};

export default Card;
