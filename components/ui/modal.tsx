'use client'

// Impor SEMUA bagian dialog dari komponen shadcn/ui Anda
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode
}

// Anda menggunakan "export default" jadi tidak perlu "const Modal ="
export default function Modal({title, description, isOpen, onClose, children} : ModalProps) {

    const onChange = (open: boolean) => {
        if (!open){
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}