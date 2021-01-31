export interface heatValues {
    solid:number|null,
    fusion:number|null,
    liquid:number|null,
    vaporization:number|null,
    gas:number|null
}
export class transitionTemps {
    melting:number;
    boiling:number;
    //ionizing:number|null // hmm will i ever use this
    constructor(temps:{melting:number, boiling:number}) {
        this.melting =  temps.melting;
        this.boiling = temps.boiling;
        //this.ionizing = temps.ionizing || null; // ionization temperature is never 0, nothing is plasma at room temperature
    }
    getTemps():Array<number> {
        return [this.melting, this.melting, this.boiling, this.boiling]
    }
}


export class MissingInformationError extends Error {
    constructor(...params: any[]) {
        super(...params);
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MissingInformationError)
        }

        this.name = 'MissingInformationError'
    }
}