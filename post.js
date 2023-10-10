
const form = document.getElementById("usrform");
const cardcontainer = document.getElementById("cardContainer");
function post(event)
{
    event.prevntDefault();
    const content = document.getElementById("postContent").value;
    fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content,
        }),
    })
    .then((response)=> response.json())
    .then((data) => {
        const postCard = document.createElement("div");
        postCard.classList.add("card");
        postCard.innerHTML = `
            <p>${data.content}</p>
        `;
        cardcontainer.appendChild(postCard);
    })
    .catch((error) => console.error("Error posting data:", error));

}