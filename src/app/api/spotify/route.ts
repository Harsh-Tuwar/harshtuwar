import { NextResponse } from 'next/server';

const {
	NEXT_PUBLIC_SPOTIFY_CLIENT_ID: client_id,
	NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET: client_secret,
	NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
	const params = new URLSearchParams();
	params.append('grant_type', 'refresh_token');
	params.append('refresh_token', refresh_token!);

	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		cache: 'no-store',
		body: params.toString(),
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	return response.json();
}

const getNowPlaying = async () => {
	const { access_token } = await getAccessToken();

	return fetch(NOW_PLAYING_ENDPOINT, {
		cache: 'no-store',
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};

interface Artist {
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export async function GET() {
	const response = await getNowPlaying();

	if (response.status === 204 || response.status > 400) {
		return NextResponse.json({ isPlaying: false }, { status: 200 });
	}

	const song = await response.json();
	const isPlaying = song.is_playing;
	const title = song.item.name;
	const artist = song.item.artists.map((_artist: Artist) => _artist.name).join(', ');
	const album = song.item.album.name;
	const albumImageUrl = song.item.album.images[0].url;
	const songUrl = song.item.external_urls.spotify;

	return NextResponse.json({
		album,
		albumImageUrl,
		artist,
		isPlaying,
		songUrl,
		title,
	});
}
