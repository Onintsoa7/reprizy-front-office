import { SiAudi, SiPorsche, SiToyota, SiMercedes, SiBmw } from "react-icons/si";

function Footer() {

    const Year = new Date().getFullYear();

    return (
        <footer className="foot">

            <div className="grid lg:grid-cols-4 gap-20 sm:grid-cols-1 p-20 ">
                <div className="flex flex-col gap-5">
                    <div className="footer__person-container">
                        <div className="footer__person">
                            <img src={'./mirado.jpg'} alt="Person 1" className="footer__person-image" />
                            <p>Mirado 1905</p>
                        </div>
                        <div className="footer__person">
                            <img src={'./oni.jpg'} alt="Person 2" className="footer__person-image" />
                            <p>Onintsoa 1767</p>
                        </div>
                        <div className="footer__person">
                            <img src={'./mahery.jpg'} alt="Person 3" className="footer__person-image" />
                            <p>Mahery 1758</p>
                        </div>
                        <div className="footer__person">
                            <img src={'./yohan.jpg'} alt="Person 4" className="footer__person-image" />
                            <p>Yohan 1795</p>
                        </div>
                    </div>
                </div>

                <div>
                    <li className="text-[22px] list-none font-semibold text-pink-500 py-2 uppercase">
                        Nos services
                    </li>
                    <li className="my-4 list-none">Web : <a href="/"> Repr' Izy web</a> </li>
                    <li className="my-4 list-none">Mobile</li>
                    <li className="my-4 list-none">Vente</li>
                    <li className="my-4 list-none">Achat</li>
                </div>
                <div className="mb-4 md:mb-0">
                    <h2 className="text-[22px] font-semibold text-pink-500 py-2 uppercase">Notre devise</h2>
                <p>Trouvez votre voiture idéale parmi notre large sélection de véhicules neufs et d'occasion.</p>
                <p>Contactez-nous pour toute question concernant nos services ou pour obtenir de l'aide dans votre recherche de voiture.</p>
                <p>Merci de choisir Repr'Izy pour votre prochain achat de voiture. Nous sommes là pour vous aider à trouver la voiture parfaite pour vos besoins et votre style de vie.</p>
            
                </div>
                <div>
                    <div className="footer__logo-container">
                        <div className="footer__person">
                            <img src={'./audi.svg'} alt="Audi Logo" className="footer__logo-image" />
                        </div>
                        <div className="footer__person">
                            <img src={'./volkswagen.svg'} alt="Volkswagen Logo" className="footer__logo-image" />
                        </div>
                        <div className="footer__person">
                            <img src={'./peugeot.svg'} alt="Peugeot Logo" className="footer__logo-image" />
                        </div>
                        <div className="footer__person">
                            <img src={'./mercedes.svg'} alt="Mercedes Logo" className="footer__logo-image" />
                        </div>
                        <div className="footer__person">
                            <img src={'./maserati.svg'} alt="Maserati Logo" className="footer__logo-image" />
                        </div>
                    </div>
                </div>
            </div>
            <h6 className="text-center pb-10">&copy; Copyright Repr'Izy by MOMY {Year}</h6>
        </footer>
    )
}

export default Footer;
