export interface ResourceId {
	kind: string
	videoId: string
}

export interface Medium {
	height: string
	width: string
	url: string
}
export interface High {
	height: string
	width: string
	url: string
}

export interface Thumbnails {
	medium: Medium
	high: High
}

export interface Snippet {
	channelId: string
	channelTitle: string
	description: string
	playlistId: string
	position: string
	publishedAt: Date
	resourceId: ResourceId
	thumbnails: Thumbnails
	title: string
	videoOwnerChannelId: string
	videoOwnerChannelTitle: string
}

export interface RootObject {
	snippet: Snippet
}
