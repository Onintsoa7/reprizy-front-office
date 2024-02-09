
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import { useEffect } from 'react'
import { get, manualPost, post,handleChange } from '../axios_utils';
import { BsHearts } from "react-icons/bs";
import Url from '../Url'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Annonces() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3); // Set the number of items per page
    const [totalPages, setTotalPages] = useState(0);
    const [formData,setFormData]=useState(new FormData());

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const [detail, filtre] = await Promise.all([
                    get(Url+'Annonces/validated'),
                    get(Url+'Annonces/newAnnonce')
                ]);
                setData(detail.data.data[0]);
                setFilters(filtre.data.data);
                setLoading(false);
                setUser(JSON.parse(localStorage.getItem("user")));
                setTotalPages(Math.ceil(detail.data.data[0].length / itemsPerPage));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Calculate the first and last item indices for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleFavorite = (idannonce) => {
        manualPost([], Url+`Annonces/addFavorite/${idannonce}`)
            .then((response) => {
                if (response.data.error !== null) {
                    setMessage(response.data.error);
                } else {
                    setMessage("Annonce ajoutée aux favoris !");
                }
                setIsModalOpen(true);
            });
    };

    // La fonction pour fermer la modal
    const closeModal = () => {
        setIsModalOpen(false);
        setMessage('');
    };

    const handleInput=(e)=>{
        handleChange(e,formData,setFormData);
        console.log(formData.values);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const [detail] = await Promise.all([
            post(formData,setFormData,Url+'Annonces/search')
        ]);
        setData((prevData) => detail.data.data[0]);
        const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    }
    return (
        <div className="bg-white w-auto my-10">
            <div>
                
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto mt-20">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        {/* Contenu de la modal */}
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        {/* Icône de succès */}
                                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            {/* Titre de la modal en fonction du message */}
                                            {message === "Annonce ajoutée aux favoris !" ? "Succès !" : "!"}
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {/* Afficher le message */}
                                                {message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                            <form onSubmit={handleSubmit} className="hidden lg:block">
                                    <h3 className="sr-only">Categories</h3>
                                    <div className="groups grid grid-cols-1 grid-rows-2 gap-y-5">
                                        <div className="input-group">
                                            <input onChange={handleInput} className=' rounded border-b w-full text-black border-gray-400 focus:ring-0 outline-none' type="text" name="libelle" id="" placeholder='Libele' />
                                        </div>
                                        <div className="input-group">
                                            <input onChange={handleInput} className='rounded border-b w-full text-black border-gray-400 focus:ring-0 outline-none' type="text" name="description" id="" placeholder='Description' />
                                        </div>
                                        <div className="input-group">
                                            <input onChange={handleInput} className='rounded border-b w-full text-black border-gray-400 focus:ring-0 outline-none' type="text" name="annee" id="" placeholder='Annee' />
                                        </div>
                                        <div className="input-group">
                                            <input onChange={handleInput} className='rounded border-b w-full text-black border-gray-400 focus:ring-0 outline-none' type="text" name="prixMin" id="" placeholder='Prix min' />
                                        </div>
                                        <div className="input-group">
                                            <input onChange={handleInput} className='rounded border-b w-full text-black border-gray-400 focus:ring-0 outline-none' type="text" name="prixMax" id="" placeholder='Prix max' />
                                        </div>
                                         <div className="input-group">
                                            <input onChange={handleInput} className='rounded border-b w-full text-black border-gray-400 focus:ring-0 outline-none' type="text" name="kilometrique" id="" placeholder='kilometrique' />
                                        </div>
                                        <div className="input-group">
                                            <select onChange={handleInput} className='text-gray-400 rounded  w-full outline-none focus:border-gray-300 focus:outline-none' name="idcategorie" id="">
                                                <option value="">Categorie</option>
                                                {filters[0].map((cat) => (
                                                    <option value={cat.id}>{cat.nom}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <select onChange={handleInput} className='text-gray-400 rounded w-full outline-none focus:border-gray-300 focus:outline-none' name="idtype" id="">
                                                <option value="">Type</option>
                                                {filters[6].map((cat) => (
                                                    <option value={cat.id}>{cat.nom}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <select onChange={handleInput} className='text-gray-400 rounded w-full outline-none focus:border-gray-300 focus:outline-none' name="idmodele" id="">
                                                <option value="">Modele</option>
                                                {filters[4].map((cat) => (
                                                    <option value={cat.id}>{cat.nom}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <select onChange={handleInput} className='text-gray-400 rounded w-full outline-none focus:border-gray-300 focus:outline-none' name="idtransmission" id="">
                                                <option value="">Transmission</option>
                                                {filters[5].map((cat) => (
                                                    <option value={cat.id}>{cat.nom}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <select onChange={handleInput} className='text-gray-400 rounded w-full outline-none focus:border-gray-300 focus:outline-none' name="idenergie" id="">
                                                <option value="">Energie</option>
                                                {filters[3].map((cat) => (
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
                                            <div className="mt-6 grid grid-cols-1 gap-y-5 sm:grid-rows-2 lg:grid-rows-3 xl:gap-x-8">
                                                {currentItems.map((product) => (
                                                    <div className="rounded h-auto flex flex-row group justify-around" key={product.id}>
                                                        <div className="aspect-h-1 aspect-w-1 w-1/2 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">

                                                            <Link to={"/Detail/" + product.id}>
                                                                <img
                                                                    src={product.images[0]}
                                                                    alt={product.libelle}
                                                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                                />
                                                            </ Link>
                                                        </div>
                                                        <div className="mt-4 mx-5 h-full flex w-3/4">
                                                            <div className='w-full'>
                                                                <Link to={"/Detail/" + product.id}>
                                                                    <h2 className='text-2xl text-gray-700'>
                                                                        <span aria-hidden="true" className="text-gray-700" />
                                                                        {product.libelle}
                                                                    </h2>
                                                                    <div className='w-full overflow-hidden h-52 p-2'>
                                                                        <p className="mt-1 flex flex-row text-sm text-gray-500 ">
                                                                            {product.description}
                                                                        </p>
                                                                    </div>
                                                                </ Link>
                                                                <div className='flex justify-between mt-6'>
                                                                    {user ? (
                                                                        <button className='text-black border-black' onClick={() => handleFavorite(product.id)} type="button">
                                                                            <BsHearts />
                                                                        </button>
                                                                    ) : null}
                                                                    <p className="text-2xl text-right font-medium text-gray-900">{'Ar' + product.prix}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pagination pt-6">
                                                <button onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentPage === 1}>&#60;</button>
                                                {Array.from({ length: totalPages }, (_, index) => (
                                                    <button key={index} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>{index + 1}</button>
                                                ))}
                                                <button onClick={() => setCurrentPage(prevPage => prevPage + 1)} disabled={currentPage === totalPages}>&#62;</button>
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
