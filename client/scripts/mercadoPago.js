const mp = new MercadoPago('YOUR_PUBLIC_KEY', {
    locale: 'es-AR' // Set the locale as per your requirement
});


document.getElementById('checkout-btn').addEventListener('click', async () => {
    try {
        const orderData = {
            title: document.querySelector(".producto-titulo").innerText,
            quantity: 1,
            price: document.querySelector(".producto-precio").innerText,
        }

        const response = await fetch("http://localhost:3000/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),

        });

        const preference = await response.json()
        createCheckoutButton(preference.id);
    }catch(error){
        console.log(error)
    }
    /*     window.location.href = global.init_point;
     */
});

const createCheckoutButton = (preferenceId) => {
    const bricklsBuilder = mp.bricks();

    const renderComponent = async () => {
        if(window.checkoutButton) window.checkoutButton.unmount();
        
        await bricklsBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
        });
    };

    renderComponent()
}

