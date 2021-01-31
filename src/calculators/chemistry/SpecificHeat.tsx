import React, { useState }  from 'react';
import { Form, FormInput, FormGroup, Card, CardBody, Alert} from "shards-react";
import {heatValues, transitionTemps} from "../../calculations/Definitions";
import {energyRequired} from "../../calculations/SpecificHeat";

function renderResult(heats:heatValues, temps:{melting:number, boiling:number}, transitions:[number,number],masses:{grams:number, molar:number}){
    const a  = energyRequired(transitions[0], transitions[1], masses.grams, new transitionTemps(temps), heats, masses.grams/masses.molar );
    if (a.error){
        return (
            <Alert theme="danger">
                {a.error}
            </Alert>
        )
    }
    return (
    <Alert theme="success">
        {a.error}
    </Alert>
    )
}

export default function SpecificHeat(){
    const [heats, setHeats] = useState({
        solid:null,
        fusion:null,
        liquid:null,
        vaporization:null,
        gas:null
    })
    const setHeat = (key:string,value:number)=>{
        let a: { [index: string]:number } = {};
        Object.assign(a,heats);
        a[key] = value;
        // @ts-ignore
        setHeats(a);
    }
    const [temps, setTemps] = useState({
        melting:null,
        boiling:null
    })
    const setTemp = (key:string,value:number)=>{
        let a: { [index: string]:number } = {};
        Object.assign(a,temps);
        a[key] = value;
        // @ts-ignore
        setTemps(a);
    }
    const [transitions, setTransitions] = useState([null,null])
    const setTransition = (key:string,value:number)=>{
        let a: { [index: string]:number } = {};
        Object.assign(a,transitions);
        a[key] = value;
        // @ts-ignore
        setTransitions(a);
    }
    const [masses, setMasses] = useState({
        grams:null,
        molar:null
    })
    const setMass = (key:string,value:number)=>{
        let a: { [index: string]:number } = {};
        Object.assign(a,masses);
        a[key] = value;
        // @ts-ignore
        setMasses(a);
    }
    //const [error, setError] = useState(null);
    const [energy, setEnergy] = useState({});
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="container pt-5">
            <h1>Energy Calculator</h1>
            <hr/>

            <Card className="my-2">
                <CardBody  className="row">
                    <h3>Specific Heats</h3>
                <div className="col mx-2">
            <Form>

                <FormGroup>
                    <label >Solid</label>
                    <FormInput value={heats.solid} onChange={(e:any)=>setHeat('solid',e.target.value)} type="number" id="#solid" placeholder="Solid" />
                </FormGroup>
                <FormGroup>
                    <label >Liquid</label>
                    <FormInput value={heats.liquid} onChange={(e:any)=>setHeat('liquid',e.target.value)} type="number"  placeholder="Liquid" />
                </FormGroup>
                <FormGroup>
                    <label >Gas</label>
                    <FormInput value={heats.gas} onChange={(e:any)=>setHeat('gas',e.target.value)} type="number"  placeholder="Gas" />
                </FormGroup>
            </Form>
                </div>
                <div className="col mx-2">
                        <Form>
                            <FormGroup>
                                <label >Fusion</label>
                                <FormInput value={heats.fusion} onChange={(e:any)=>setHeat('fusion',e.target.value)} type="number"  placeholder="Liquid" />
                            </FormGroup>
                            <FormGroup>
                                <label>Vaporization</label>
                                <FormInput  value={heats.vaporization} onChange={(e:any)=>setHeat('vaporization',e.target.value)} type="number" placeholder="Vaporization" />
                            </FormGroup>
                        </Form>
                    </div>
                </CardBody>
                </Card>

            <Card className="my-2">
            <CardBody>
                <h3>Phase Changes</h3>
                <Form className="row">
                    <FormGroup className="col mx-2">
                        <label >Melting</label>
                        <FormInput value={temps.melting} onChange={(e:any)=>setTemp('melting',e.target.value)} type="number"  placeholder="Melting" />
                    </FormGroup>
                    <FormGroup className="col mx-2">
                        <label>Boiling</label>
                        <FormInput  value={temps.boiling} onChange={(e:any)=>setTemp('boiling',e.target.value)} type="number" placeholder="Boiling" />
                    </FormGroup>
                </Form>
            </CardBody>
            </Card>
            <Card className="my-2">
                <CardBody>
                    <h3>Mass</h3>
                    <Form className="row">
                        <FormGroup className="col mx-2">
                            <label >Grams</label>
                            <FormInput value={masses.grams} onChange={(e:any)=>setMass('grams',e.target.value)} type="number"  placeholder="Grams" />
                        </FormGroup>
                        <FormGroup className="col mx-2">
                            <label>Molar</label>
                            <FormInput  value={masses.molar} onChange={(e:any)=>setMass('molar',e.target.value)} type="number" placeholder="Molar" />
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
            <Card className="my-2">
                <CardBody>
                    <h3>Temperature Change</h3>
                    <Form className="row">
                        <FormGroup className="col mx-2">
                            <label >Starting</label>
                            <FormInput value={transitions[0]} onChange={(e:any)=>setTransition('0',e.target.value)} type="number"  placeholder="Starting" />
                        </FormGroup>
                        <FormGroup className="col mx-2">
                            <label>Ending</label>
                            <FormInput  value={transitions[1]} onChange={(e:any)=>setTransition('1',e.target.value)} type="number" placeholder="Ending" />
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>

            <div className="container py-4 ">
                {
                    //@ts-ignore
                    renderResult(heats, temps, transitions, masses)
                }
            </div>

        </div>
    )
}