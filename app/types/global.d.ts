export {}

declare global {
    interface DecisionItem {
        link: string
        title: string
        dates: string[]
        details: string[]
        abstract: string
        totalViews: number
        totalDownloads: number
    }
}
