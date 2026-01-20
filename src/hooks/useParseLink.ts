
export const useParsLink = () =>{
    const parseLink = async (url: string) =>{
        const response = await fetch(
            "http://localhost:3001/api/parse-link",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({url})
            }
        )
        if(!response.ok){
            throw new Error("Parse failed")
        }

        return response.json()
    }

    return { parseLink}
}