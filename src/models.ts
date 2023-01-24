export interface IDataList {
    dt: number
    dt_txt: string
    main: {
        temp: number
    }
    weather: {
        id: number
        description: string
    }[]
}
export interface IData {
    city: {
        id: number
        name: string
    }
    list: IDataList[]
}