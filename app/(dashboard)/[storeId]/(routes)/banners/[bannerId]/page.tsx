import db from "@/lib/db";
import { BannerForm } from "./components/banner-form";

interface BannerPageProps {
  params: {
    storeId: string;
    bannerId: string;
  };
}

const BannerPage = async ({ params }: BannerPageProps) => {
  const banner = await db.banner.findUnique({
    where: {
      id: params.bannerId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BannerForm initialData={banner} />
      </div>
    </div>
  );
};

export default BannerPage;
