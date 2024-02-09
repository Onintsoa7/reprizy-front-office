import { useState,useEffect, useContext } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { Link, useParams } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { get, manualPost } from '../axios_utils';
import { ActiveConversationContext } from '../message/MessageContext/ActiveConversationProvider';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const {activeConversation,setActiveConversation}=useContext(ActiveConversationContext);
  const { id_annonce } = useParams();
  const [loading, setLoading] = useState(true);
  const [data,setData]=useState([]);
  var user = JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
        try {
            const [detail] = await Promise.all([
                get('https://repr-izy-production.up.railway.app/api/v1/Annonces/' + id_annonce),
            ]);
            setData(detail.data.data[0]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading();
        }
    };
    fetchData();
}, []);

  const Contacter=(iduser)=>{
    get('https://repr-izy-production.up.railway.app/api/v1/Conversations/conversation/'+iduser)
    .then((response)=>{
      if (response.data.data[0]) {
        setActiveConversation(response.data.data[0]);
        navigate("/message");
      }
    })
  } 


  return (
    <div className="bg-white py-24">
      { loading ? 
      <div className='w-screen h-screen absolute bg-opacity-55 bg-slate-500'>
        <BounceLoader className='translate-y-2/4 translate-x-2/4' color="rgba(219, 85, 205, 1)" />
      </div>
      :
      <div className="pt-6">
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={data.images[0]}
              alt="Tsisy lty ah!"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={data.images[1]}
                alt="Tsisy lty ah"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={data.images[2]}
                alt="Tsisy lty ah"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={data.images[3]}
              alt="Tsisy lty ah"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="flex justify-between lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{data.libelle}</h1>
            <i className='text-black'>{data.date ? new Date(data.date).toUTCString() : "Inconnu"}</i>
            </div>
            <p className='text-right text-black'>Vendeur: {data.user.prenom+" "+data.user.nom}</p>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">Ar{data.prix}</p>
            <div className="mt-10">
              <div className="text-black grid grid-cols-1 grid-rows-1 gap-y-3">
                <span className='flex justify-between'>Categorie: <p className='font-bold'>{data.cat ? data.cat.nom : "Inconnu"}</p></span>
                <span className='flex justify-between'>Type: <p className='font-bold'>{data.type?data.type.nom:"Inconnu"}</p></span>
                <span className='flex justify-between'>Modele: <p className='font-bold'>{data.modele?data.modele.nom:"Inconnu"}</p></span>
                <span className='flex justify-between'>Place: <p className='font-bold'>{data.place>0?data.place+" places":"Inconnu"}</p></span>
                <span className='flex justify-between'>Annee: <p className='font-bold'>{data.annee>1900?data.annee:"Inconnu"}</p></span>
                <span className='flex justify-between'>Kilometrique: <p className='font-bold'>{data.kilometrique}km</p></span>
                <span className='flex justify-between'>Etat du  vehicule: <p className='font-bold'>{data.etatVehicule>1900?data.etatVehicule.nom:"Inconnu"}</p></span>
                <span className='flex justify-between'>Transmission: <p className='font-bold'>{data.transmission?data.transmission.nom:"Inconnu"}</p></span>
                <span className='flex justify-between'>Energie: <p className='font-bold'>{data.energie?data.energie.nom:"Inconnu"}</p></span>
                <span className='flex justify-between'>Cylindree: <p className='font-bold'>{data.cylindre>0?data.cylindre:"Inconnu"}</p></span>
                <span className='flex justify-between'>Puissance: <p className='font-bold'>{data.puissance>0?data.puissance+"chv":"Inconnu"}</p></span>
                <span className='flex justify-between'>Nbr cylindre: <p className='font-bold'>{data.nbrCylindre>0?data.nbrCylindre:"Inconnu"}</p></span>
                <span className='flex justify-between'>Motricite: <p className='font-bold'>{data.moticite>0?data.moticite+" roues":"Inconnu"}</p></span>
              </div>
              {
                  user ? <button
                  type="button"
                  onClick={()=>Contacter(data.user.id)}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-black focus:outline-none ">
                    Contacter vendeur
                  </button> 
                  : null
              }
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}
