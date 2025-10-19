"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Share2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ShareButton() {
	const [copied, setCopied] = useState(false);

	const handleClick = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopied(true);

			// hide alert automatically after 3 seconds
			setTimeout(() => setCopied(false), 3000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<>
			<Button variant="ghost" className="ml-auto" size="sm" onClick={handleClick}>
				<Share2 className="h-4 w-4 mr-2" />
				Share
			</Button>

			{copied && (
				<div className="fixed bottom-6 right-6 z-50 w-[300px]">
					<Alert className="border border-green-600 bg-green-50 shadow-lg">
						<CheckCircle className="h-4 w-4 text-green-600" />
						<div>
							Link copied!
							<AlertDescription className="text-green-700">
								The URL has been copied to your clipboard.
							</AlertDescription>
						</div>
					</Alert>
				</div>
			)}
		</>
	);
}