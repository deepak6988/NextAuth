'use client';
import react, { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login(){

    const router = useRouter();
    const [user, setUser] = useState({
        email : "",
        password : ""
    });
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try{
            setLoading(true);
            // Your login logic here
            const res = await axios.post('/api/users/login', user);
            console.log("Login successful:", res.data);
            toast.success("Login successful!");
            router.push('/profile'); 
        } catch (error:any) {
            console.log(error.message);
            toast.error("Login failed!");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href="/signup">Visit Signup page</Link>
        </div>
    )
}