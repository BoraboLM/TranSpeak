
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function AlertMessage({ title, message }) {
    return (
        <div className="flex items-center justify-center p-4">
            <Alert className="w-[600px] bg-slate-200">
                <Terminal className="h-4 w-4" />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>
        </div>

    )
}