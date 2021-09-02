//load results
const searchBook = () => {
    // toggleSpinner('block');
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
    books.forEach(book => {
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
        // toggleSpinner('none');
    });
}

//total result found
const resultCountDisplay = (count) => {
    if (!count) {
        validSearch();
    }
    else {
        const resultCount = document.getElementById('result-count');
        resultCount.innerHTML = `
        <h4 class="text-success">${count.num_found} Results found</h4>
        `;
    }
}
// //toggle sppiner
// const toggleSpinner = displayStyle => {
//     document.getElementById('spinner').style.display = displayStyle;
// }
const toggleResultCount = displayStyle => {
    document.getElementById('result-count').style.display = displayStyle;
}
//empty searchbox
const emptySearchBox = () => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
    errorMessage.innerHTML = `
    <h5>Please Enter Your Book Name!</h5>
    `;

}
//valid search
const validSearch = () => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
    errorMessage.innerHTML = `
    <h5>No Result Found!</h5>
    `;

}