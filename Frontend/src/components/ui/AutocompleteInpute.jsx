import React from 'react'
import { Card, Input } from "@material-tailwind/react";

function AutocompleteInpute({autocomplete ,setCompetenceInputeVal ,competenceInputeVal ,addCompetence}) {
    console.log(autocomplete)
  return (
        <div className="relative pt-4">
            <Input
                label="Competnece"
                onChange={ (e)=>{
                    setCompetenceInputeVal(e.target.value)
                }
                }
                name="competenceInputeVal"
                value={
                    competenceInputeVal
                }
                autoComplete="off"
            />

            {/* autocomplete  */}
            {autocomplete && autocomplete?.length >
                0 && (
                <Card className="absolute mt-2 w-full max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 z-50 ">
                    <div className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-blue-gray-700">
                        {autocomplete.map(
                            (data) => {
                                return (
                                    <button
                                        key={
                                            data._id
                                        }
                                        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900 outline-none"
                                        style={{
                                            position:
                                                "relative",
                                            overflow:
                                                "hidden"
                                        }}
                                        onClick={() =>
                                            addCompetence(
                                                data.titre,
                                                data._id
                                            )
                                        }
                                    >
                                        {
                                            data.titre
                                        }
                                    </button>
                                );
                            }
                        )}
                    </div>
                </Card>
            )}
        </div>
    )
}

export default AutocompleteInpute