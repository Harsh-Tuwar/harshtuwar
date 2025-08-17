const HOME_CONTENT_ENDPOINT = 'api/content/home';

type RichText = {
  text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    code: boolean;
    color: string;
  };
};

async function getHeadlineContent(): Promise<{ data: RichText[][] }> {
	const url = process.env?.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

	const res = await fetch(`${url}/${HOME_CONTENT_ENDPOINT}`, {
		cache: "no-store"
	});

	if (!res.ok) {
		throw new Error("Failed to fetch content.");
	}

	const jsonData = await res.json();

	return { data: jsonData.data };
}

export default async function HeadlineContent() { 
  const response = await getHeadlineContent();

  return (
    <div className="text-md text-muted-foreground leading-relaxed max-w-xl space-y-4">
      {response.data.map((paragraphs, i) => (
        <p key={i}>
          {paragraphs.map((item, j) => {
            const { bold, italic, underline, strikethrough, color = "default" } = item.annotations;
            const className = [
              bold ? "font-bold" : "",
              italic ? "italic" : "",
              underline ? "underline" : "",
              strikethrough ? "line-through" : "",
              color !== "default" ? `text-${color}-500` : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <span key={j} className={className}>
                {item.text}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}
