
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import { useEffect } from 'react'
import { get, manualPost, post } from '../axios_utils';
import Url from '../Url'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Favotites() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3); // Set the number of items per page
    const [totalPages, setTotalPages] = useState(0);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


    useEffect(() => {

        setLoading(true);
        const fetchData = async () => {
            try {
                const [detail] = await Promise.all([
                    get(Url+'Annonces/favorites'),

                ]);
                setData(detail.data.data[0]);

                setLoading(false);
                setUser(JSON.parse(localStorage.getItem("user")));
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
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Liste des favoris</h1>
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
                                <div className="lg:col-span-3 ">
                                    <div className="bg-white my-0">
                                        <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
                                            <div className="mt-6 grid grid-cols-1 gap-y-5 sm:grid-rows-2 lg:grid-rows-3 xl:gap-x-8">
                                                {currentItems.map((product) => (
                                                    <Link to={"/Detail/" + product.annonce.id}>
                                                        <div className="rounded h-auto flex flex-row group justify-around">
                                                            <div className="aspect-h-1 aspect-w-1 w-1/2 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                                <img
                                                                    src={product.annonce.images[0]}
                                                                    alt="Tsisy lty ah! tsisy"
                                                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                                />
                                                            </div>
                                                            <div className="mt-4 mx-5 h-full flex w-3/4">
                                                                <div className='w-full'>
                                                                    <h2 className='text-2xl text-gray-700'>
                                                                        <span aria-hidden="true" className="text-gray-700" />
                                                                        {product.annonce.libelle}
                                                                    </h2>
                                                                    <div className='w-full overflow-hidden h-52 p-2'>
                                                                        <p className="mt-1 flex flex-row text-sm text-gray-500 ">
                                                                            {product.annonce.description}
                                                                        </p>
                                                                    </div>
                                                                    {/* <div className='flex justify-between'> */}
                                                                    <p className="text-2xl text-right font-medium text-gray-900">{'Ar' + product.annonce.prix}</p>
                                                                    {/* </div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
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
