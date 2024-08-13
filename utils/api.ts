
const createURL = (path:any)=>{
    return window.location.origin + path;
}


export const updatedEntry = async (id:any, content:any)=>{
    const res = await fetch(
        new Request(createURL(`/api/journal/${id}`),{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({content})
        })
    )
    if (res.ok){
        const data = await res.json();
        return data.data;
    }
    return null;
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
    

export const askQuestion = async (question:any)=>{
    const res = await fetch(
        new Request(createURL("/api/question"),{
            method: "POST",
            body: JSON.stringify({question}),
        })
    )
    if (res.ok){
        const data = await res.json();
        return data.data;
    }
    return null;
}