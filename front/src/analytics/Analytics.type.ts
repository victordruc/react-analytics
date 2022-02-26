export type Options = {
    endpoint: string,
    events: string[]
}

export type Props = {
    options: Options,
    children?: React.ReactNode
}