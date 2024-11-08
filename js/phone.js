const loadPhone = async() =>{
    const res = await fetch(' https://openapi.programming-hero.com/api/phones?search=iphone')
    const data = await res.json();
    const phones=data.data;
    displayPhone(phones);
    // console.log(phones);
}


const displayPhone = phones =>{
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');

    phones.forEach(phone => {
        // 2 create a div
        const phoneCard=document.createElement('div');
        phoneCard.classList =`card bg-base-100 w-96 shadow-xl`
        // 3 set inner html
        phoneCard.innerHTML =`
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt=""
            class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title text-4xl font-bold">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <h1 class="text-6xl font-bold">$999</h1>
            <div class="card-actions">
                <button class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        // 4 append child
        phoneContainer.appendChild(phoneCard)
        console.log(phoneCard)
    });
}



loadPhone()