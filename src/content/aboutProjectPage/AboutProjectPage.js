import React from 'react';
import arduino from "../../staticFiles/arduino-teplota.png";

import {
    Row, Column
} from 'carbon-components-react';

const AboutProjectPage = () => {
    return <div>
        <h3>
            Dnešný svet a dáta
        </h3>
        <p>
            Dnešný svet je plný dát o všetkom, a existuje množstvo aplikácií na ich spracovanie aby boli pre človeka
        prijateľnejšie na pochopenie, pretože sledovanie dát v ich surovom stave by bežných ľudom asi veľa nepovedali.
        Vezmime si napríklad dnešnú korona dobu, myslím si že ľudom oveľa viac napovie jeden graf ako množstvo hárkov s
        množstvom riadkov obsahujúce iba slová a čísla. A podobne to bude aj práci na školských experimentoch, kde žiaci
        napríklad majú merať teplotu, alebo niečo vážiť. Ručné zapisovanie hodnôt a ich následné spracovávanie nie je nič príjemné,
        avšak myslím si, že by bolo omnoho interaktívnejšie a zábavnejšie, ak by sa dané dáta dokázali vizualizovať na grafoch v
        reálnom času, kde by žiaci nestrácali čas zápisom ale mohli by priamo vidieť ako sa veci menia, bez zbytočných zaťažovaní
        zo zapisovaním. Alebo Manažéri firiem by mohli sledovať účinnosť svojích strojov a ich pracovní zaťaženie.V skratke v dnešnej
        dobe má  vizualizácie dát v reálnom čase mnoho využití. A presne tohto sa týka aj môj projekt, ktorý je na danú problematiku zameraný.
        V projekte som sa nekonkretizoval na určitý typ práce, ale ponechal som aplikáciu otvorenú pre všetky smery do bodúcna.
        </p>
        <h3>
            A ako to všetko funguje?
        </h3>
        <p>
            To je jednoduché, aplikácia sa skladá z klientskej časti, na ktorej práve čítate tento popis a serverovej časti, ktorý zbiera a
            spracuváva údaje a následne odosiela ich na zobrazenie. Na zber dát som vytvoril arduino zariadenie ku ktorému môžem pripájať
            zatiaľ 3 rôzne senzory a to senzory na: teplotu, vlhkosť vzduchu a vzdialensoť.
        </p>
        <Row>
            <Column xlg={4} lg={4} md={2}>
            </Column>
            <Column xlg={8} lg={8} md={4}>
                <div>
                    <img
                        className="senzor-img"
                        src={arduino}
                        alt="Grafy"
                    />
                </div>
            </Column>
            <Column xlg={4} lg={4} md={2}>
            </Column>
        </Row>
    </div>;
};

export default AboutProjectPage;