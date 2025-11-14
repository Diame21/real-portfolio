import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'aos/dist/aos.css'
import Aos from 'aos';


const ShopifyPage = () => {
     useEffect(() => {
        Aos.init({
            duration: 1000,
        });
    }, []);

    const [showForm, setShowForm] = useState(false)
    const [products, setProducts] = useState([])
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        image: null
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: [e.target.value] })
    }

    const handleImageChange = (e) => {
        const allImages = e.target.files
        console.log(allImages);
        const [justOne] = allImages
        const imageDir = URL.createObjectURL(justOne)
        // or 
        // const imageDir = URL.createObjectURL(e.target.files[1])
        console.log(imageDir);
        setForm({ ...form, [e.target.name]: imageDir })
    }

    const [errors, setErrors] = useState({})

    const validate = () => {
        const addError = {}
        if (!form.name) {
            addError.nameError = 'Product Name is required'
        }
        if (!form.price) {
            addError.priceError = 'Product Price is required'
        }
        if (!form.description) {
            addError.descriptionError = 'Product Description is required'
        }
        if (form.image === null) {
            addError.imageError = 'Product Image is required'
        }
        return addError
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const check = validate()
        if (Object.keys(check).length > 0) {
            setErrors(check)
        }
        else {
            setProducts([...products, form])
            setForm({
                name: '',
                description: '',
                price: '',
                image: null
            })
            setErrors({})
            setTimeout(() => {
                setShowForm(false)
            }, 1000)
        }
    }


    return (
        <>
            <div className='container py-20 px-4 md:px-8 lg:px-16 xl:px-32'  data-aos="zoom-in">
                <button onClick={() => setShowForm(!showForm)} className="bg-[#0A174E] mt-2 ml-1 rounded-md text-[#F5D042] w-fit mx-[auto] text-center p-3">
                    {showForm ? 'CLOSE PRODUCT' : 'ADD PRODUCT'}
                </button>

                {
                    showForm && (
                        <form onSubmit={handleSubmit} className="flex flex-col w-[100%] max-w-[500px] mx-[auto] mt-9 space-y-5 text-center bg-[#0A174E] p-5 ">
                            <div className="flex flex-col">
                                <label className='text-[#F5D042]'>Product Name</label>
                                <input type="text" name='name' value={form.name} onChange={handleChange} className="border border-[#F5D042]" />
                                <span className="text-red-300">{errors.nameError}</span>
                            </div>
                            <div className="flex flex-col">
                                <label className='text-[#F5D042]'>Product Price </label>
                                <input type="number" name='price' value={form.price} onChange={handleChange} className="border border-[#F5D042]" />
                                <span className="text-red-300">{errors.priceError}</span>
                            </div>
                            <div className="flex flex-col">
                                <label className='text-[#F5D042]'>Product Image</label>
                                <input type="file" multiple name='image' onChange={handleImageChange} className="border border-[#F5D042] text-[#F5D042]" />
                                <span className="text-red-300">{errors.imageError}</span>
                            </div>
                            <div className="flex flex-col">
                                <label className='text-[#F5D042]'>Product Description </label>
                                <textarea name="description" value={form.description} col="40" onChange={handleChange} className="border border-[#F5D042] marker" ></textarea>
                                <span className="text-red-300">{errors.descriptionError}</span>
                            </div>
                            <div>
                                <button type="submit" onClick={() => setShowForm(!showForm)} className="border border-[#F5D042] text-[#F5D042] rounded-md font-bold w-fit m-[auto] p-3 mr-4"> CANCEL</button>
                                <button type="submit" className="bg-[#F5D042] text-[#0A174E] w-fit rounded-md mx-[auto] text-center p-3">ADD PRODUCT</button>
                            </div>
                        </form>
                    )}

                {products.length > 0 ? (
                    <div className='flex flex-wrap flex-row justify-center w-[100%] max-w-[100%]'>
                        {products.map((product, id) => (
                            <div key={id} className='w-[23%] bg-[#0A174E] text-white m-auto mx-1 mt-6 p-2 rounded-md'>
                                <img src={product.image} className='w-[100%] h-[200px] object-cover' alt="Image" />
                                <h2 className='font-semibold'>{product.name}</h2>
                                <p>{product.description}</p>
                                <p className='font-semibold'>{product.price}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1 className='text-center mt-4 p-10 max-w-[900px] h-[500px] mx-auto flex justify-center items-center shadow-md shadow-[#0A174E]'>Add items to cart</h1>

                )}
            </div >
        </>
        // </div >
    )
}
export default ShopifyPage