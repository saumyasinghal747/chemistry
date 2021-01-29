"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.energyRequired = void 0;
var transitionTemps = /** @class */ (function () {
    //ionizing:number|null // hmm will i ever use this
    function transitionTemps(temps) {
        this.melting = temps.melting;
        this.boiling = temps.boiling;
        //this.ionizing = temps.ionizing || null; // ionization temperature is never 0, nothing is plasma at room temperature
    }
    transitionTemps.prototype.getTemps = function () {
        return [this.melting, this.melting, this.boiling, this.boiling];
    };
    return transitionTemps;
}());
var MissingInformationError = /** @class */ (function (_super) {
    __extends(MissingInformationError, _super);
    function MissingInformationError() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var _this = _super.apply(this, params) || this;
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, MissingInformationError);
        }
        _this.name = 'MissingInformationError';
        return _this;
    }
    return MissingInformationError;
}(Error));
function energyRequired(startTemp, endTemp, grams, states, specificHeat, molarMass) {
    // so we have all the information that we need. Now we need a bunch of if statements.
    // can we do this efficiently?
    // we need to calculate starting from the starting value.
    // So insert the two temperatures into an array along with the melting and boiling temperatures, then
    // find the index of the starting and ending, chop off the ends, start the calculations
    var _a;
    if (startTemp === endTemp)
        return 0; //no energy needed to do nothing, don't waste computation
    // insert all the temperatures into one array
    var dir;
    if (startTemp < endTemp) {
        // temperature going up
        dir = 1;
    }
    else {
        // temperature going down
        dir = -1;
        //i ❤️ javascript for this reason
        _a = [endTemp, startTemp], startTemp = _a[0], endTemp = _a[1];
    }
    var tmps = states.getTemps();
    tmps.push(startTemp, endTemp);
    // sort it!
    tmps.sort();
    var startIndex = tmps.indexOf(startTemp);
    var endIndex = tmps.indexOf(endTemp);
    // chop off the ends
    var temps = tmps.slice(startIndex, endIndex + 1);
    // ok....
    //console.log(temps);
    function traverseTemps(temps) {
        // so we check if the second temp is our ending temperature is the second element. if it is, then we need to find out what phase we're in
        if (temps[1] === endTemp) {
            // find out what phase we're in and calculate the specific heat
            var c = void 0;
            if (tmps[endIndex + 1] === states.melting) {
                // use the solid
                if (!specificHeat.solid)
                    throw new MissingInformationError('Specific heat missing for solid state');
                c = specificHeat.solid;
            }
            else if (tmps[endIndex + 1] === states.boiling) {
                // liquid
                if (!specificHeat.liquid)
                    throw new MissingInformationError('Specific heat missing for liquid state');
                c = specificHeat.liquid;
            }
            else {
                // gas
                if (!specificHeat.gas)
                    throw new MissingInformationError('Specific heat missing for gas state');
                c = specificHeat.gas;
            }
            console.log("Calculating " + c + " x " + grams + " x " + (temps[1] - temps[0]));
            return c * grams * (temps[1] - temps[0]);
        }
        else {
            // recursive process
            // find the first segment
            // is the first one the start temp, if not, we need to use a different equation
            if (temps[0] !== temps[1]) {
                var c = void 0;
                if (temps[1] === states.melting) {
                    // use the solid
                    if (!specificHeat.solid)
                        throw new MissingInformationError('Specific heat missing for solid state');
                    c = specificHeat.solid;
                }
                else if (temps[1] === states.boiling) {
                    // liquid
                    if (!specificHeat.liquid)
                        throw new MissingInformationError('Specific heat missing for liquid state');
                    c = specificHeat.liquid;
                }
                else { // it must be ionization???
                    // gas
                    if (!specificHeat.gas)
                        throw new MissingInformationError('Specific heat missing for gas state');
                    c = specificHeat.gas;
                }
                //console.log(`Calculating ${c} x ${grams} x ${temps[1]-temps[0]}`)
                return c * grams * (temps[1] - temps[0]) + traverseTemps(temps.slice(1));
            }
            else {
                // we are caught in between two phase changes.
                // we are going to need the molar mass.
                if (!molarMass)
                    throw new MissingInformationError('Molar mass missing for substance');
                // find out what the first one is
                var c = void 0;
                var c2 = void 0;
                if (temps[0] === states.melting) {
                    if (!specificHeat.fusion)
                        throw new MissingInformationError('Specific heat missing for fusion transition');
                    c = specificHeat.fusion;
                    // so we're going from liquid to gas, then [melting, boiling]
                }
                else {
                    // are we ever going to come here?
                    //
                    if (!specificHeat.vaporization)
                        throw new MissingInformationError('Specific heat missing for vaporization transition');
                    c = specificHeat.vaporization;
                }
                // uhh mass divided by molar mass times c?
                // kJ to J
                //console.log(`Calculating ${c} x 1000 x ${grams} / ${molarMass}`)
                return c * 1000 * grams / molarMass + traverseTemps(temps.slice(1));
            }
        }
    }
    return dir * traverseTemps(temps);
}
exports.energyRequired = energyRequired;
if (require.main === module) {
    // testing
    console.log('================================\n');
    console.log(energyRequired(140, -30, 36.04, new transitionTemps({ melting: 0, boiling: 100 }), {
        solid: 2.06,
        fusion: 6.01,
        liquid: 4.18,
        vaporization: 40.7,
        gas: 1.87
    }, 18.02));
}
