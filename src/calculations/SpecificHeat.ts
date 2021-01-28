interface heatValues {
    solid:number|null,
    fusion:number|null,
    liquid:number|null,
    vaporization:number|null,
    gas:number|null
}
class transitionTemps {
    melting:number;
    boiling:number;
    ionizing:number|null // hmm will i ever use this
    constructor(temps:{melting:number, boiling:number, ionizing:number|null}) {
        this.melting =  temps.melting;
        this.boiling = temps.boiling;
        this.ionizing = temps.ionizing || null; // ionization temperature is never 0, nothing is plasma at room temperature
    }
    getTemps():Array<number> {
        return [this.melting,this.boiling]
    }
}


class MissingInformationError extends Error {
    constructor(...params: any[]) {
        super(...params);
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MissingInformationError)
        }

        this.name = 'MissingInformationError'
    }
}


export function energyRequired(
    startTemp:number,
    endTemp: number,
    grams:number,
    states:transitionTemps,
    specificHeat:heatValues,
    molarMass:number|null) : number {

    // so we have all the information that we need. Now we need a bunch of if statements.
    // can we do this efficiently?
    // we need to calculate starting from the starting value.
    // So insert the two temperatures into an array along with the melting and boiling temperatures, then
    // find the index of the starting and ending, chop off the ends, start the calculations

    if (startTemp===endTemp) return 0; //no energy needed to do nothing, don't waste computation


    // insert all the temperatures into one array
    let tmps : Array<number>  = states.getTemps();
    tmps.push(startTemp, endTemp);
    // sort it!
    tmps.sort();
    const startIndex = tmps.indexOf(startTemp);
    const endIndex = tmps.indexOf(endTemp);
    // chop off the ends
    let temps = tmps.slice(startIndex,endIndex+1);
    let dir;
    if (startTemp < endTemp){
        // temperature going up
        dir  = 1;
    }
    else {
        // temperature going down
        dir  = -1;
        //i ❤️ javascript for this reason
        [startTemp,endTemp] = [endTemp,startTemp];
    }
    function traverseTemps(temps: Array<number>):number{
        // so we check if the second temp is our ending temperature is the second element. if it is, then we need to find out what phase we're in
        if (temps[1]===endTemp){
            // find out what phase we're in and calculate the specific heat
            let c:number;
            if (tmps[endIndex+1]===states.melting){
                // use the solid
                if (!specificHeat.solid) throw new MissingInformationError('Specific heat missing for solid state');
                c =  specificHeat.solid;
            }
            else if (tmps[endIndex+1]===states.boiling){
                // liquid
                if (!specificHeat.liquid) throw new MissingInformationError('Specific heat missing for liquid state');
                c =  specificHeat.liquid;
            }
            else {
                // gas
                if (!specificHeat.gas) throw new MissingInformationError('Specific heat missing for gas state');
                c =  specificHeat.gas;
            }

            return c*grams*(temps[1]-temps[0]);

        }
        else {
            // recursive process
            // find the first segment
            // is the first one the start temp, if not, we need to use a different equation
            if (temps[0]===startTemp){
                let c:number;
                if (temps[1]===states.melting){
                    // use the solid
                    if (!specificHeat.solid) throw new MissingInformationError('Specific heat missing for solid state');
                    c =  specificHeat.solid;
                }
                else if (temps[1]===states.boiling){
                    // liquid
                    if (!specificHeat.liquid) throw new MissingInformationError('Specific heat missing for liquid state');
                    c =  specificHeat.liquid;
                }
                else { // it must be ionization???
                    // gas
                    if (!specificHeat.gas) throw new MissingInformationError('Specific heat missing for gas state');
                    c =  specificHeat.gas;
                }
                return c*grams*(temps[1]-temps[0]) + traverseTemps(temps.slice(1));

            }
            else {

                // we are caught in between two phase changes.

                // we are going to need the molar mass.

                if (!molarMass) throw new MissingInformationError('Molar mass missing for substance');

                // find out what the first one is
                let c:number;
                if (temps[0]===states.melting){
                    if (!specificHeat.fusion) throw new MissingInformationError('Specific heat missing for fusion transition');
                    c =  specificHeat.fusion;
                }
                else {
                    if (!specificHeat.vaporization) throw new MissingInformationError('Specific heat missing for vaporization transition');
                    c =  specificHeat.vaporization;
                }
                // uhh mass divided by molar mass times c?
                return c*grams/molarMass + traverseTemps(temps.slice(1));
            }
        }
    }



    return dir * traverseTemps(temps);

}