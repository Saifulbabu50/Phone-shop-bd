const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
    // console.log(phones);
}


const displayPhone = (phones, isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    console.log('is show all', isShowAll)

    // display only fast 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        // 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 w-[364px] p-5 shadow-xl`
        // 3 set inner html
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt=""
            class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title text-4xl font-bold">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <h1 class="text-6xl font-bold">$999</h1>
            <div class="card-actions">
                <button onclick="handleSearchDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        // 4 append child
        phoneContainer.appendChild(phoneCard)
        // console.log(phoneCard)
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}

// 

const handleSearchDetail = async (id) => {
    // console.log('click', id)
    // load single phone data
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)

}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt=""/>
        <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span>Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
        <p><span>Memory:</span>${phone?.mainFeatures?.memory}</p>
        <p><span>Chipset:</span>${phone?.mainFeatures?.chipSet}</p>
        <p><span>Release data:</span>${phone?.releaseDate}</p>
        <p><span>Slug:</span>${phone?.slug}</p>
        <p><span>Brand:</span>${phone?.brand}</p>
        <p><span>GPS:</span>${phone?.others?.GPS}</p>

    `

    // show the modal
    show_details_modal.showModal();

}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value
    // console.log(searchText);
    loadPhone(searchText, isShowAll);

}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}

loadPhone()