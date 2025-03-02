import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

   

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }


    useEffect(() => {
        getPasswords()
    }, [])

    const Copytext = (text) => {
        toast("Text copied", {autoClose: 2000});
        navigator.clipboard.writeText(text)
       
    };


    const showPasword = () => {
        if (ref.current.src.includes("src/icons/visibility_off.svg")) {
            ref.current.src = "src/icons/visibility.svg"
            passwordRef.current.type = "password";
        } else {
            ref.current.src = "src/icons/visibility_off.svg"
            passwordRef.current.type = "text";
        }
    }

    const savePassword = async () => {
        if(form.site!=="" && form.username!=="" && form.password!==""){
            toast("Password saved", {autoClose: 2000});
            setform({ site: "", username: "", password: "" })
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            
        }
    }

    const deletePassword= async(id) => {
        let elemt=passwordArray.find(item=>item.id===id)
        console.log('elemt.username', elemt.username)
        let b=window.confirm(`Do you want to delte password of ${elemt.username} for ${elemt.site}`)
        if(b){
            toast("Password deleted", {autoClose: 2000});
            setPasswordArray(passwordArray.filter(item=>item.id!==id))    
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

        }
    }
    const editPassword=(id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })   
        setPasswordArray(passwordArray.filter(item=>item.id!==id))    
        
    }
    
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <div className='bg-gradient-to-bl from-cyan-300 to-blue-600 md:w-3/4 mx-auto md:p-10 p-4 my-5 md:rounded-xl 'style={{ "min-height": 'calc(100vh - 82px)' }}>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
    <ToastContainer />
     

            <div className='mx-auto text-center'>
                <h1 className='text-3xl font-bold text-white'><span className='text-black'>&lt;</span>Pass<span className='text-black'>OP/&gt;</span></h1>
                <p className='text-white'>Your own password manager</p>
            </div>

            <div className=' space-y-4 pt-10 '>
                <input type="text" value={form.site} name='site' onChange={handleChange} placeholder='Enter Website URL' className='w-full rounded-full px-4 py-1 outline-none' />
                <div className='flex gap-5'>
                    <input type="text" value={form.username} name='username' onChange={handleChange} placeholder='Enter Username' className='w-2/3 rounded-full px-4 py-1 outline-none' />
                    <div className='relative md:w-1/3 rounded-full bg-white flex'>
                        <input type="password" ref={passwordRef} value={form.password} name='password' onChange={handleChange} placeholder='Enter Password' className='w-full rounded-full px-4 py-1 outline-none' />
                        <img ref={ref} src="src/icons/visibility.svg" alt="visible" className='pr-1' onClick={showPasword} />
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <button onClick={savePassword} className="relative inline-block px-10 py-2 w-fit  font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-blue-700 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-full"></span>
                        <span className="absolute inset-0 w-full h-full bg-blue-50 border-2 border-blue-700 group-hover:bg-gradient-to-l group-hover:from-cyan-400 group-hover:to-blue-700 rounded-full"></span>
                        <span className="relative text-blue-700 group-hover:text-white rounded-full flex justify-center items-center font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="currentColor" fill="currentColor">
                                <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg> &nbsp; Save Password
                        </span>
                    </button>
                </div>

                <div className="passwors">
                    <h1 className='text-xl font-semibold'>Your Passwords</h1>
                    {passwordArray.length === 0 && <h1 className='text-white'>add some password</h1>}


        
                    {passwordArray.length != 0 && <div className="relative overflow-x-auto mt-5">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-hidden rounded-md">
                            <thead className="text-xs text-white uppercase bg-blue-700">
                                <tr>
                                    <th scope="col" className="md:px-6 px-3 py-3">Website</th>
                                    <th scope="col" className="md:px-6 px-3 py-3">Username</th>
                                    <th scope="col" className="md:px-6 px-3 py-3">Password</th>
                                    <th scope="col" className="md:px-6 px-3 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((password, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td scope="row" className="md:px-6 px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className='flex gap-2 items-center'>
                                                <a href={password.site} target='_blank'>{password.site}</a><img src="src/icons/copy.svg"  alt="copy" onClick={(e) => { Copytext(password.site) }} />
                                            </div>
                                        </td>
                                        <td className="md:px-6 px-3 py-4">
                                            <div className='flex gap-2 items-center'>{password.username}<img src="src/icons/copy.svg"  alt="copy" onClick={(e) => { Copytext(password.username) }} />
                                            </div>
                                        </td>
                                        <td className="md:px-6 px-3 py-4">
                                            <div className='flex gap-2 items-center'>{"*".repeat(password.password.length)}<img src="src/icons/copy.svg"  alt="copy" onClick={(e) => { Copytext(password.password) }} />
                                            </div>
                                        </td>
                                        <td className="md:px-6 px-3 py-4">
                                            <div className='flex gap-2 items-center '>
                                                <span onClick={()=>{editPassword(password.id)}}><img src="src/icons/edit.svg" alt="edit" /></span>
                                                <span onClick={()=>{deletePassword(password.id)}}><img src="src/icons/delete.svg" alt="delte" /></span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}

                </div>

            </div>



        </div >
    )
}

export default Manager