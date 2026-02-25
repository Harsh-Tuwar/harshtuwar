"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export function ShareButton() {
	const handleClick = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.success("Link copied!", {
				description: "The URL has been copied to your clipboard.",
			});
		} catch (err) {
			toast.error("Failed to copy", {
				description: "Could not copy the URL. Please try again.",
			});
		}
	};

	return (
		<Button variant="ghost" className="ml-auto" size="sm" onClick={handleClick}>
			<Share2 className="h-4 w-4 mr-2" />
			Share
		</Button>
	);
}
