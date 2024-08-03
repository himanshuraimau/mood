
const createURL = (path:any)=>{
    return window.location.origin + path;
}

export const createNewEntry = async ()=>{
    const res = await fetch(
        new Request(createURL("/api/journal"),{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    )
    if (res.ok){
        const data = await res.json();
        return data.data;
    }
    return null;
}
    