import React from 'react'
import '../index.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
 
  const [error,setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    mdp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const apiUrl = 'https://repr-izy-production.up.railway.app/api/v1/auth/login';

    try {
      const data = new FormData();
      data.append('username', formData.username); 
      data.append('mdp', formData.mdp);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: apiUrl,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data
      };
      const response = await axios.request(config);

      if (response.data.error) {
        console.error('Erreur lors de la requête:', response.data.error);
        setError(response.data.error);
        setLoading(false);
      } else {
        console.log('Login successful:', response.data);
        localStorage.setItem('token',response.data.data[1].token);
        localStorage.setItem('user', JSON.stringify(response.data.data[0]));
        navigate("/")
        setFormData({
          username: '',
          mdp: '',
        });
      }

    } catch (error) {
      console.error('Erreur lors de l\'envoi des données à railway:', error);
    }
  }

  return (
    <section className="bg-gray-50 flex items-center justify-center h-screen">
      <div className="flex h-full flex-row items-center justify-center md:h-screen">
        <div className="shadow h-3/4 w-2/2">
          <img className='rounded h-full w-full' src={'./logo.png'} alt="" />
        </div>
        <div className="w-full h-3/4 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Connectez vous à votre compte
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Votre nom d'utilisateur</label>
                <input onChange={handleChange} type="text" name="username" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
              </div>
              <div>
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Mot de passe</label>
                <input onChange={handleChange} type="password" name="mdp" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
              </div>
              <button type="submit" className="w-full text-black border-black hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Se connecter</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login