const form = document.querySelector('#coin-form');
const coin = document.querySelector('#coin');
const crypto = document.querySelector('#crypto');
const amount = document.querySelector('#amount');
const coinInfo = document.querySelector('.coin-info');

form.addEventListener('submit', async e =>{
    e.preventDefault();
    const coinSelected = [...coin.children].find(option => option.selected).value;
    const cryptoSelected = [...crypto.children].find(option => option.selected).value;
    const amountValue = amount.value;

    try {
        const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();
        const price = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
        const higherPrice = response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
        const lowerPrice = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
        const change24h = response.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;
        if (amountValue !== '') {
            const resultado = amountValue / response.RAW[cryptoSelected][coinSelected].PRICE;
            coinInfo.innerHTML = `
            <p class="info">El precio es: <span class="price">${price}</span></p>
            <p class="info">El precio más alto del día es: <span class="price">${higherPrice}</span></p>
            <p class="info">El precio más bajo del día es: <span class="price">${lowerPrice}</span></p>
            <p class="info">Variacion 24h: <span class="price">${change24h} %</span></p>
            <p class="info">Puedes comprar: <span class="price">${resultado.toFixed(7)} ${cryptoSelected}</span></p>
            `;
        }else{
            coinInfo.innerHTML = `
            <p class="info">El precio es: <span class="price">${price}</span></p>
            <p class="info">El precio más alto del día es: <span class="price">${higherPrice}</span></p>
            <p class="info">El precio más bajo del día es: <span class="price">${lowerPrice}</span></p>
            <p class="info">Variacion 24h: <span class="price">${change24h} %</span></p>
            `;
        };

        coinInfo.classList.add('show');

    } catch (error) {
        alert('error');
    }

});