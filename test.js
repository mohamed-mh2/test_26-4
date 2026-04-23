const adoptbtn = document.getElementById("adoptBtn");
const form = document.getElementById("formadd");
const addpet = document.getElementById("addBtn")
const container = document.querySelector(".petscard");
const Api = "https://69ea51dc15c7e2d51269ad63.mockapi.io/pets";


adoptbtn.addEventListener("click" , () => {
    form.classList.toggle("active");
})


async function renderData() {
    try {
        const response = await fetch(Api);
        const data = await response.json();
        console.log(data);
        container.innerHTML = "";
        data.forEach(item => {
            const div = document.createElement("div");
            div.className = "pets";
            div.innerHTML = `
            <h3>Pet: ${item.name}</h3>
            <p>Type: ${item.type}</p>
            <p>Color: ${item.color}</p>
            <p>Description: ${item.description}</p>
            <button type="button" class="deletePet">Delete</button>
            `;
            container.appendChild(div);
            const deleteBtn = div.querySelector(".deletePet");
            deleteBtn.dataset.id = item.id;

            deleteBtn.addEventListener("click", async () => {
                const confirmDelete = confirm("Are you sure you want to delete this pet?");
                if (!confirmDelete) return;
                
                try {
                    const response = await fetch(`${Api}/${item.id}`, {
                        method: "DELETE"
                    });
                    if (response.ok) {
                        div.remove();
                    }
                } catch (error) {
                    console.error("Error deleting pet:", error);
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
}

renderData();

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const item = {
        name: form.querySelector("#petname").value.trim(),
        type: form.querySelector("#pettype").value,
        color: form.querySelector("#colorinp").value,
        description: form.querySelector("#desc").value.trim()
    };

    try {
        const response = await fetch(Api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });
        if (response.ok) {
            form.reset();
            renderData();
        }
    } catch (error) {
        console.error("Error adding pet:", error);
    }
})


