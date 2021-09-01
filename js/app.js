const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data.docs));

    searchField.value = '';
}

const displayBook = (books) => {
    console.log(books);
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
               <p class="card-text">Author: ${book.author_name}</p>
               <p class="card-text">Publisher: ${book.publisher}</p>
               <p class="card-text">First Publish: ${book.first_publish_year}</p>

                `;
        searchResult.appendChild(div);
    });
}
