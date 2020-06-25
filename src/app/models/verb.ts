export class Verb {

    public infinitiv: string;
    public present_first: string;
    public present_second: string;
    public present_third: string;
    public preteritum_first: string;
    public partizip: string;
    public konjuntiv_first: string;
    public imperativ_singular: string;
    public imperativ_plural: string;
    public helper: string;
    public isTrennbar: boolean;
    public isRegular: boolean;
    public translations: {}[];

    constructor() {}
}

export class VerbToCheck {
    present_third: string;
    preteritum_first: string;
    perfect_first: string;

    constructor() {}
}

export class Result {
    presentThirdResult: {
        word: string;
        value: number;
        class: string;
    }
    preteritumFirstResult: {
        word: string;
        value: number;
        class: string;
    }
    perfectFirstResult: {
        word: string;
        value: number;
        class: string;
    }
    next: boolean;
    attempts?: number;

    constructor() {}
}