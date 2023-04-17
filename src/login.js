import { React, useEffect } from 'react';

export function Login() {
    useEffect(()=>{
        let hash = window.location.hash;
        if(hash){
            const tokenL = hash.substring(1).split("&")[0].split("=")[1];            window.location.hash="";
            window.localStorage.setItem("token", tokenL)
        }
    });
}