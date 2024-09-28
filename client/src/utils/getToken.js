export const getToken = ()=>{
    return localStorage.getItem("trello-token");
}

export const logOut = () => {
    localStorage.removeItem("trello-token"); 
};
