import React from 'react'
import { useEffect, useState } from 'react'
import { SiAudi, SiPorsche, SiToyota, SiMercedes, SiBmw } from "react-icons/si";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { get } from '../axios_utils';
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
    const [totalPages, setTotalPages] = useState(0);

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