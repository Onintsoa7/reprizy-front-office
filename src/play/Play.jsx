import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
function Play({Component}) {
  return (
    <>
    <Header/>
    {Component}
    <Footer/>
    </>
  )
}

export default Play