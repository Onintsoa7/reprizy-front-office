import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
function Header() {
    const [sticky, setSticky] = useState(false);
    const [open, setOpen] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState({});
    const [user,setUser]=useState(null);

    const navigate = useNavigate();

    const deconnexion=()=>{
        setTimeout(()=>{
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/");   
            setUser(null);
        },2000);
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            const nav = document.querySelector("nav");
            window.scrollY > 0 ? setSticky(true) : setSticky(false);
        });
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    const Navbar = [
        {
            name: 'Accueil',
            link: '/',
        },
        {
            name: 'Annonces',
            link: '/Annonce',
        },
        {
            name: 'Message',
            link: '/Message',
        },
    ];

    const toggleSubmenu = (index) => {
        setSubmenuOpen((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <>
            <nav className={`lg:px-24 md:px-1 sm:px-14 px-8 py-2 shadow-md bg-black/80 fixed w-full left-0 top-0 z-[999] ${sticky ? "bg-black/60  text-black" : "text-black"
                }`}>
                <div className="justify-between mx-auto lg:w-full md:items-center md:flex">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <div className="mx-7">
                                <h4 className="text-4xl uppercase font-bolder text-white">
                                    Repr<span className="text-pink-500 text-5xl" >'Izy</span>
                                </h4>
                            </div>
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-gray-500 rounded-md outline-none border border-transparent focus:border-gray-400 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <RiArrowDropDownLine
                                            className="text-gray-500 cursor-pointer"
                                            size={24}
                                        />
                                    ) : (
                                        <RiArrowDropDownLine
                                            className="text-gray-500 cursor-pointer"
                                            size={24}
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`leading-10 flex justify-between items-center md:block ${navbar ? 'block' : 'hidden'
                            }`}
                    >
                        <ul className="list-none lg:flex md:flex sm:block block gap-x-8 gap-y-16">
                            {Navbar.map((item, index) => (
                                <li key={index} >
                                    <div className="flex items-center"
                                        onClick={() => toggleSubmenu(index)}>
                                        <Link
                                            to={item.link}
                                            className="text-white text-[1.15rem] font-medium tracking-wider hover:text-white ease-out duration-700"
                                        >
                                            {item.name}
                                        </Link>
                                        {item.submenu && (
                                            <RiArrowDropDownLine
                                                className="ml-1 size-7 text-white cursor-pointer"
                                            />
                                        )}
                                        {item.submenu && submenuOpen[index] && (
                                            <ul className="absolute mt-52 space-y-2 bg-transparent text-gray-500 text-pink-500">
                                                {item.submenu.map((subitem, subindex) => (
                                                    <li key={subindex}>
                                                        <Link
                                                            to={subitem.link}
                                                            className="block px-4 py-2 text-xl text-pink-500"
                                                        >
                                                            {subitem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </li>
                            ))}
                            {user ? 
                                <Menu as="div" className="relative inline-block text-left">
                                <div>
                                  <Menu.Button className="inline-flex w-10 h-10 justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    {/* Options
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                                    <img className='w-full h-auto' src={user.image} alt="Tsisy lty ah" />
                                  </Menu.Button>
                                </div>
                          
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <Link
                                            href="#"
                                            className={classNames(
                                              active ? 'bg-gray-100 text-purple-400' : 'text-purple-400',
                                              'block px-4 py-2 text-sm font-bold'
                                            )}
                                          >
                                            {user.prenom} {user.nom}
                                          </Link>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <Link
                                            to={"/favorites"}
                                            className={classNames(
                                              active ? 'bg-gray-100 text-purple-400' : 'text-purple-400',
                                              'block px-4 py-2 text-sm font-bold'
                                            )}
                                          >
                                            Favoris
                                          </Link>
                                        )}
                                      </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              type="button"
                                              onClick={deconnexion}
                                              className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm'
                                              )}
                                            >
                                              Se deconnecter
                                            </button>
                                          )}
                                        </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            :
                            <Link to={'/Login'}
                                className="bg-pink-400 text-[1.1rem] font-normal text-white px-4 py-1 rounded lg:ml-10 md:ml-2 sm:ml-0 ml-0 w-28  text-center"
                                type='submit' >
                                Connexion
                            </Link>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
