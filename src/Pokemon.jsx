import { useEffect, useState } from "react";
import "./index.css"
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

    const fetchPokemon = async()=>{
        try{
            const res = await fetch(API)
            const data = await res.json()
            
            const detailedPokemonData = data.results.map(async(curPokemon)=> {
                const res = await fetch(curPokemon.url)
                const data = await res.json()
                return data
            })

            // console.log(detailedPokemonData)

            const detailedResponses = await  Promise.all(detailedPokemonData)

            console.log(detailedResponses)

            setPokemon(detailedResponses)
            setLoading(false)

        }catch (error){
            console.log("Code nahi chal raha hai", error)
            setError(error)
            setLoading(false)
        }
    }

    useEffect(()=> {
        fetchPokemon()
    },[])

    const searchData = pokemon.filter((curPokemon) => curPokemon.name.toLowerCase().includes(search.toLowerCase()))

    if(loading){
        return(
            <div>
                <h1>Loading....</h1>
            </div>
        )
    }

    if(error){
        return(
            <div>
                <h1>Error: {error.message}</h1>
            </div>
        )
    }

    return(
        <section className="container">
            <header>
                <h1>Let Catch Pokemon</h1>
            </header>

            <div className="pokemon-search">
                <input 
                    type="text" 
                    placeholder="Search Pokemon"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    />
            </div>

            <ul className="cards">
                {
                    // pokemon.map((curPokemon)=> {
                        searchData.map((curPokemon)=> {
                        return(
                            <PokemonCards 
                                    key={curPokemon.id}
                                    pokemonData={curPokemon}
                            />
                        )
                    })
                }
            </ul>

        </section>
    )
}