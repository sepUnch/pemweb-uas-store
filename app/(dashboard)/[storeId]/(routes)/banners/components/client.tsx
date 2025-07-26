'use client'

import { Banner } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BannerColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface BannerClientProps {
    data: BannerColumn[]
}

export const BannerClient: React.FC<BannerClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
        <div className="flex items-center justify-between">
            <Heading 
            title={`Banners (${data.length})`}
            description="Atur Banner untuk Toko Anda"
            />
            <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Banner
            </Button>
        </div>
        <Separator />
        <DataTable data={data} columns={columns} searchKey="label" />
        </>
    )
}