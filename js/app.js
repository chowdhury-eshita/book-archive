//load results
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    if (searchText === '') {
        emptySearchBox();
    }
    else {
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data));
        searchField.value = '';
    }
}
//search result display
const displayBook = (data) => {
    resultCountDisplay(data);
    const books = data.docs;
    // console.log(books);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books?.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
           <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
               <p class="card-text">Author: ${book.author_name ? book.author_name : 'Not Available'}</p>
               <p class="card-text">Publisher: ${book.publisher[0] ? book.publisher[0] : 'Not Available'}</p>
               <p class="card-text">First Publish: ${book.first_publish_year}</p>

                `;
        searchResult.appendChild(div);
    });
}

//total result found
const resultCountDisplay = (count) => {
    const resultCount = document.getElementById('result-count');
    if (!count.num_found) {
        resultCount.innerHTML = `
    <h5 class="text-secondary">${count.num_found} Result Found!</h5>
    `;

    }
    else {
        resultCount.innerHTML = `
        <h4 class="text-success fw-bold">${count.num_found} Results found</h4>
        `;
    }
}

const toggleResultCount = displayStyle => {
    document.getElementById('result-count').style.display = displayStyle;
}
//empty searchbox
const emptySearchBox = () => {
    const errorMessage = document.getElementById('result-count');
    errorMessage.innerHTML = `
    <h5 class="text-danger">Please Enter Your Book Name!</h5>
    `;
}
