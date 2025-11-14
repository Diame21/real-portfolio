import Aos from 'aos';
import React, { useEffect, useState } from 'react'
import 'aos/dist/aos.css'


const ContactPage = () => {
     useEffect(() => {
            Aos.init({
                duration: 1000,
            });
        }, []);

  const [form,setForm] = useState({
        username: '',
        email: '',
        comment: ''
    })
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: [e.target.value]})
    }
    const [errors, setErrors] = useState({})
    const validate = () => {
        const addError = {}
        if(!form.username){
            addError.usernameError = 'Username is required'
        }
        if(!form.email){
            addError.emailError = 'Email is required'
        }
        if(!form.comment){
            addError.commentError = 'Comment is required'
        }
        return addError
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const check = validate()
        if(Object.keys(check).length > 0){
            setErrors(check)
        }
        else{
            setForm({
                username: '',
                email: '',
                comment: ''
            })
            setErrors({})
            alert(`You've successfully submitted`);
        }

    }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col w-[100%] max-w-[500px] mx-[auto] mt-9 space-y-5 bg-[#0A174E] rounded-md p-5 " data-aos="fade-up">
        <div className="flex flex-col">
            <label className='text-[#F5D042]'>Username </label>
            <input type="text" name='username' value={form.username} onChange={handleChange} className="border border-black rounded-md p-1 ml-2" />
            <span className="text-red-700">{errors.usernameError}</span>
        </div>
        <div className="flex flex-col">
            <label className='text-[#F5D042]'>Email </label>
            <input type="email"  name='email' value={form.email} onChange={handleChange} className="border border-black rounded-md p-1 ml-2" />
            <span className="text-red-700">{errors.emailError}</span>
        </div>
        <div className="flex flex-col">
            <label className='text-[#F5D042]'>Comment Here</label>
            <textarea name="comment" value={form.comment} col="40" onChange={handleChange} className="border border-black marker rounded-md p-1 ml-2" ></textarea>
            <span className="text-red-700">{errors.commentError}</span>
        </div>
        <button type="submit" className="bg-[#F5D042] text-[#0A174E] hover:text-black w-fit m-[auto] text-center p-3 rounded-md">SIGN UP</button>
      </form>
    </>
  );
};



export default ContactPage