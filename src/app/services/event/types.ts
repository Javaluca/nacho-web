export type NachoEvent = {
    type: string;
}

export type StartEvent = NachoEvent & {
    url: string
}

export type MouseMove = NachoEvent & {
    x: number,
    y: number
}

export type MouseClick = NachoEvent & {
    x: number,
    y: number
}

export type ViewPortResize = NachoEvent & {
    width: number,
    height: number
}

export type KeyDown = NachoEvent & {
    key: string,
    altKey: boolean,
    ctrlKey: boolean,
    shiftKey: boolean,
    keyCode: number
}