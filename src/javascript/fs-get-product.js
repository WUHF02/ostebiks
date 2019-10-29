document.addEventListener("DOMContentLoaded", function() {
  const params = new URLSearchParams(window.location.search);
  const skuId = params.get("sku");

  const db = firebase.firestore();

  let docRef = db.collection("wine").doc(skuId);

  docRef.get().then(function(doc) {
    const container = document.getElementsByClassName("page")[0];
    container.querySelector("h1").innerText = doc.data().name;
    container.querySelector(".price").innerText = `${doc.data().price} DKK`;
    container.querySelector(".region").innerText = doc.data().region;
    container.querySelector(".country").innerText = doc.data().country;
    container.querySelector(".category").innerText = doc.data().category;
    container.querySelector(".gallery__large").src = `/assets/images/${
      doc.data().image[0]
    }`;
    container.querySelectorAll(".gallery__small")[0].src = `/assets/images/${
      doc.data().image[0]
    }`;
    container.querySelectorAll(".gallery__small")[1].src = `/assets/images/${
      doc.data().image[1]
    }`;
    container.querySelectorAll(".gallery__small")[2].src = `/assets/images/${
      doc.data().image[2]
    }`;
    container.querySelectorAll(".gallery__small").forEach(function(img) {
      img.addEventListener("click", function() {
        container.querySelector(".gallery__large").src = this.src;
      });
    });
  });
});
