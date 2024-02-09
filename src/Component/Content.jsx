import React from 'react'
import { useEffect, useState } from 'react'
import { SiAudi, SiPorsche, SiToyota, SiMercedes, SiBmw } from "react-icons/si";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { get, manualPost, post } from '../axios_utils';
import { BounceLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import { BsHearts } from "react-icons/bs";
import { ImNext } from "react-icons/im";
import { Menu, Transition } from '@headlessui/react'

function Content() {
    const social_media = [
        <SiMercedes />,
        <SiAudi />,
        <SiToyota />,
        <SiMercedes />,
        <SiAudi />
    ];
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3); // Set the number of items per page

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    // La fonction pour fermer la modal
    const closeModal = () => {
        setIsModalOpen(false);
        setMessage('');
    };
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const [detail, filtre] = await Promise.all([
                    get('https://repr-izy-production.up.railway.app/api/v1/Annonces'),
                    get('https://repr-izy-production.up.railway.app/api/v1/Annonces/newAnnonce')
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


    const handleFavorite = (idannonce) => {
        manualPost([], `https://repr-izy-production.up.railway.app/api/v1/Annonces/addFavorite/${idannonce}`)
            .then((response) => {
                if (response.data.error !== null) {
                    setMessage(response.data.error);
                } else {
                    setMessage("Annonce ajoutée aux favoris !");
                }
                setIsModalOpen(true);
            });
    };
    // Calculate the first and last item indices for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <section
                id="home"
                className="min-h-screen flex py-10 md:flex-row flex-col items-center"
            >

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
                <div className="flex-1 flex items-center justify-center h-full">
                    <img src={'./logo.png'} alt="" className="md:w-11/12 h-full object-cover" />
                </div>
                <div className="flex-1">
                    <div className="md:text-left text-center">
                        <h1 className="md:text-5xl text-2xl md:leading-normal leading-10 text-black font-extrabold">
                            <span className="text-gray-500 md:text-6xl text-5xl">
                                Bienvenue
                                <br />
                            </span>
                            dans <span>REPR' IZY</span>
                        </h1>
                        <RiDoubleQuotesL className='text-black' />
                        <h4 className="md:text-2xl text-lg md:leading-normal leading-5 mt-4 font-bold text-black">
                            Trouvez la voiture de vos rêves chez nous,
                        </h4>
                        <h4 className="md:text-2xl text-lg md:leading-normal leading-5 mt-4 font-bold text-black">
                            où la qualité et l'élégance se rencontrent.
                        </h4>
                        <br />
                        <RiDoubleQuotesR className='text-black' />
                        <button className="btn-primary mt-8 bg-pink-400">Contactez-nous</button>
                        <h4 className="md:text-2xl text-lg md:leading-normal leading-5 mt-4 font-bold text-black">
                            Avec nos fidèles partenaires:
                            <div className="flex space-x-4 mt-10">
                                <a
                                    className="text-black hover:text-pink-500 transform hover:scale-150 
                            transition-all duration-150 ease-in-out" href="">
                                    <SiMercedes />
                                </a>
                                <a
                                    className="text-black hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out" href="">
                                    <SiAudi />
                                </a>
                                <a
                                    className="text-black hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out" href="">
                                    <SiPorsche />
                                </a>
                                <a
                                    className="text-black hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out" href="">
                                    <SiToyota />
                                </a>
                                <a
                                    className="text-black hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out" href="">
                                    <SiBmw />
                                </a>
                            </div>
                        </h4>
                        <div className="mt-8 text-3xl flex items-center md:justify-start justify-center gap-5">
                            {social_media?.map((icon) => (
                                <div
                                    key={icon}
                                    className="hover:text-white cursor-pointer "
                                >
                                    <ion-icon name={icon}></ion-icon>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <hr></hr>
            <section
                id="home"
                className="min-h-screen py-10 md:flex-row flex-row items-center"
            >
                <h2>Quelques annonces de nos clients : </h2>
                {loading ?
                    <div className='h-screen w-screen flex items-center justify-center'>
                        <BounceLoader color="rgba(219, 85, 205, 1)" />
                    </div>
                    :
                    <div className="lg:row-span-3 ">
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
                            </div>
                        </div>
                    </div>
                }
                <div className="flex justify-center items-center h-full"> {/* Container div with flexbox properties */}
                    {/* Menu component with specified class names */}
                    <a href="/Annonce">
                        <Menu className="inline-flex w-10 h-10 justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            {/* Icon component */}
                            <ImNext className='w-20 h-auto' />
                        </Menu>
                    </a>
                </div>


            </section>
        </>
    )
}

export default Content