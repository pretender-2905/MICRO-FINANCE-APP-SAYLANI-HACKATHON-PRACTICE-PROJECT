import Cards from "../components/Cards"

function LandingPage(){
    return(
        <div>
        <div className="text-center text-3xl text-green-600">
            LandingPage
        </div>
        <div className="mt-10 flex justify-center flex-col items-center gap-5">
        <div className="text-center text-3xl text-green-600">
        WEDDING
        </div>
        <div className="flex gap-10">
        <Cards type={"NIKAH"}/>
        <Cards type={"JAHEZ"}/>
        <Cards type={"VALIMA"}/>
        </div>
        </div>
        </div>

    )
}

export default LandingPage