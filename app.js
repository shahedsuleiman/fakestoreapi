class Product{
    constructor (title, price, description , image){
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}

const products = [];
function fetchapiandlocal(){
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    const productData = data[i];
                    const product = new Product(
                        productData.title,
                        productData.price,
                        productData.description,
                        productData.image
                    );
                    products.push(product);
                }
                const mainSection = document.getElementById('main-section');

                products.map(product => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <img  style="width:250px;height:200px; " src="${product.image}" alt="${product.title}">
                        <h2>${product.title}</h2>
                        <p>Price: ${product.price}</p>
                        <p style="height:50px;overflow:hidden"> ${product.description}</p>
                        <button id="update">Update</button>
                        <button id="delete">Delete</button>
                    `;
                    mainSection.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching data:', error));

            fetch('http://localhost:3000/posts')
            .then(response => response.json())
            .then(data => {
                // for (let i = 1; i <= data.length; i++) {
                //     const productData = data[i];
                    
                //     // productData.content,
                //     console.log(productData.content);
                  
                   
                // }
                const mainSection = document.getElementById('main-section');

                data.map(product => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <img  style="width:250px;height:200px; " src="https://cdn.shopify.com/s/files/1/0095/9954/9540/products/Artboard5_8fe93ebe-f4aa-4efc-8544-dba6b0c07cfd_600x.png?v=1679535772" alt="reddress">
                        <h2>${product.content}</h2>
                        <button id="update" onClick="updatePost(${product.id})">Update</button>
                        <button id="delete" onClick="deletePost(${product.id})">Delete</button>
                    `;
                    mainSection.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching data:', error));

}
// const form = document.getElementById("usrform");
const cardcontainer = document.getElementById("cardContainer");
function createPost(event) {
    event.preventDefault();
    
    const content = document.getElementById("postContent").value;
    fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // price: price,
            content: content
        }),
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        const mainSection = document.getElementById('main-section'); 
    
        const postCard = document.createElement("div");
        
        postCard.classList.add("card");
        postCard.innerHTML = `
            <img  style="width:250px;height:200px; " src="https://cdn.shopify.com/s/files/1/0095/9954/9540/products/Artboard5_8fe93ebe-f4aa-4efc-8544-dba6b0c07cfd_600x.png?v=1679535772" alt="reddress">
           
            <p>${json.content}</p>
            <button id="update" onClick="updatePost(${json.id})">Update</button>
            <button id="delete" onClick="deletePost(${json.id})">Delete</button>
        `;

        mainSection.appendChild(postCard);
    })
    .catch((error) => console.error("Error posting data:", error));
    fetchapiandlocal();
}


function updatePost(postId){
    const updatedata = prompt("update post !");
    if(updatedata !== null){
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'put',
            headers : {
                "Content-Type": "application/json",
            },
            body: json.stringify({content:updatedata}),
        })
        .then((response) => {
            fetchapiandlocal();
        })
        .catch((error) => console.error('Error deleting post:', error));
    }

}
function deletePost(postId) {
    fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
    })
    .then((response) => {
        if (response.ok) {
            const postCard = document.getElementById(`post-${postId}`);
            if (postCard) {
                postCard.remove();
            }
        } else {
            console.error('Error deleting post');
        }
    })
    .catch((error) => console.error('Error deleting post:', error));
}
fetchapiandlocal();