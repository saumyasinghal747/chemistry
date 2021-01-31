import {heatValues, MissingInformationError, transitionTemps} from "./Definitions";


function energyRequired(
    startTemp:number,
    endTemp: number,
    grams:number,
    states:transitionTemps,
    specificHeat:heatValues,
    molarMass:number|null) : { energy?:number, error?:string } {

    // so we have all the information that we need. Now we need a bunch of if statements.
    // can we do this efficiently?
    // we need to calculate starting from the starting value.
    // So insert the two temperatures into an array along with the melting and boiling temperatures, then
    // find the index of the starting and ending, chop off the ends, start the calculations

    if (startTemp===endTemp) return {energy:0}; //no energy needed to do nothing, don't waste computation


    // insert all the temperatures into one array
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
    let tmps : Array<number>  = states.getTemps();
    tmps.push(startTemp, endTemp);
    // sort it!
    tmps.sort();
    const startIndex = tmps.indexOf(startTemp);
    const endIndex = tmps.indexOf(endTemp);
    // chop off the ends
    let temps = tmps.slice(startIndex,endIndex+1);

    // ok....

    //console.log(temps);
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
            //console.log(`Calculating ${c} x ${grams} x ${temps[1]-temps[0]}`)
            return c*grams*(temps[1]-temps[0]);

        }
        else {
            // recursive process
            // find the first segment
            // is the first one the start temp, if not, we need to use a different equation
            if (temps[0]!==temps[1]){
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
                //console.log(`Calculating ${c} x ${grams} x ${temps[1]-temps[0]}`)
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
                    // so we're going from liquid to gas, then [melting, boiling]
                }
                else {
                    // are we ever going to come here?
                    //
                    if (!specificHeat.vaporization) throw new MissingInformationError('Specific heat missing for vaporization transition');
                    c =  specificHeat.vaporization;
                }
                // uhh mass divided by molar mass times c?
                // kJ to J
                //console.log(`Calculating ${c} x 1000 x ${grams} / ${molarMass}`)
                return c*1000*grams/molarMass  + traverseTemps(temps.slice(1));
            }
        }
    }

    try {
        return {energy: dir * traverseTemps(temps)};
    }
    catch (e:any){
        return {
            error:e.message
        }
    }


}

export {energyRequired}

if (require.main === module) {
    // testing
    console.log('================================\n')
    console.log(energyRequired(
        140,
        -30,
        36.04,
        new transitionTemps({melting:0,boiling:100}),
        {
            solid:2.06,
            fusion:6.01,
            liquid:4.18,
            vaporization:40.7,
            gas:1.87
        },
        18.02
    ))
}