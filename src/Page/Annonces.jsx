
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import { useEffect } from 'react'
import { get } from '../axios_utils';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Annonces() {
    const [loading, setLoading] = useState(true);
    const [data,setData]=useState([]);
    const [filters,setFilter] = useState({});

    useEffect(() => {
        
        setLoading(true);
        const fetchData = async () => {
            try {
                const [detail,filtre] = await Promise.all([
                    get('https://repr-izy-production.up.railway.app/api/v1/Annonces'),
                    get('https://repr-izy-production.up.railway.app/api/v1/Annonces/newAnnonce')
                ]);
                setData(detail.data.data[0]);
                setFilter(filtre.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 
    return (
        <div className="bg-white w-auto my-10">
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Liste des annonces</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">

                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    {loading ? 
                        <div className='h-screen w-screen flex items-center justify-center'>
                            <BounceLoader color="rgba(219, 85, 205, 1)" />
                        </div>
                        : 
                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <div className="groups grid grid-cols-1 grid-rows-2 gap-y-5">
                                    <div className="input-group">
                                        <input className=' rounded border-b w-full text-black border-gray-400 focus:ring-0 outline-none' type="text" name="libele" id="" placeholder='Libele' />
                                    </div>
                                    <div className="input-group">
                                        <input className='rounded border-b w-full text-black border-gray-400 focus:ring-0 outline-none' type="text" name="description" id="" placeholder='Description' />
                                    </div>
                                    <div className="input-group">
                                        <input className='rounded border-b w-full text-black border-gray-400 focus:ring-0 outline-none' type="text" name="annee" id="" placeholder='Annee' />
                                    </div>
                                    <div className="input-group">
                                        <select className='text-gray-400 rounded  w-full outline-none focus:border-gray-300 focus:outline-none' name="cat" id="">
                                            <option value="">Categorie</option>
                                            {filters[0].map((cat)=>(
                                                <option value={cat.id}>{cat.nom}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <select className='text-gray-400 rounded w-full outline-none focus:border-gray-300 focus:outline-none' name=" " id="">
                                            <option value="">Type</option>
                                            {filters[6].map((cat)=>(
                                                <option value={cat.id}>{cat.nom}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <select className='text-gray-400 rounded w-full outline-none focus:border-gray-300 focus:outline-none' name=" " id="">
                                            <option value="">Modele</option>
                                            {filters[4].map((cat)=>(
                                                <option value={cat.id}>{cat.nom}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <select className='text-gray-400 rounded w-full outline-none focus:border-gray-300 focus:outline-none' name=" " id="">
                                            <option value="">Transmission</option>
                                            {filters[5].map((cat)=>(
                                                <option value={cat.id}>{cat.nom}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <select className='text-gray-400 rounded w-full outline-none focus:border-gray-300 focus:outline-none' name=" " id="">
                                            <option value="">Energie</option>
                                            {filters[3].map((cat)=>(
                                                <option value={cat.id}>{cat.nom}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full submit">
                                    <input className='w-full h-11 text-black text-center transition border border-black rounded cursor-pointer hover:bg-black hover:text-white p-1 my-5' type="submit" value="Rechercher" />
                                </div>
                            </form>
                            <div className="lg:col-span-3 ">
                                <div className="bg-white my-0">
                                    <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
                                        <div className="mt-6 grid grid-cols-1 gap-y-5 sm:grid-rows-2 lg:grid-rows-4 xl:gap-x-8">
                                            {data.map((product) => (
                                                <div className="rounded h-5/6 flex flex-row group justify-around">
                                                    <div className="aspect-h-1 aspect-w-1 w-1/2 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                        <img
                                                            src={product.images[0]}
                                                            alt="Tsisy lty ah! tsisy"
                                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                        />
                                                    </div>
                                                    <div className="mt-4 mx-5 flex w-3/4">
                                                        <div>
                                                            <h2 className='text-2xl text-gray-700'>
                                                                <Link to={"/Detail/"+product.id}>
                                                                    <span aria-hidden="true" className="text-gray-700" />
                                                                    {product.libelle}
                                                                </Link>
                                                            </h2>
                                                            <p className="mt-1 flex flex-row text-sm text-gray-500 ">
                                                                {product.description}
                                                            </p>
                                                            <p className="text-2xl text-right font-medium text-gray-900">{product.prix}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    }
                </main>
            </div>
        </div>
    )
}
