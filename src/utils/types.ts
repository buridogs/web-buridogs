
type LabelValueObject<T> = {
    label: string;
    value: T
}

export type FiltroOptionsType<T> = {
    filtro: LabelValueObject<T>,
    opcoes: LabelValueObject<T>[]
}