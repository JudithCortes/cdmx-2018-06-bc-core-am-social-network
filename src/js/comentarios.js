//Agregando configuracion de firebase en js actual
window.petips.iniciaFirebase();

//Cerrar sesión
btnLogout.addEventListener('click', e => {
  window.petips.signOut();
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

//guardar datos
sendComent.addEventListener("click", e => {
//crear variable para cada elemento
//crear variables para cada elemento 
let mje= document.getElementById("mje").value;
//agregar documentos
let sendComent = document.getElementById("sendComent");
  //agregar documento y id
  db.collection("comentarios").add({
    coment: mje
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    
    document.getElementById("mje").value = " ";
    

})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
});
//crear variable de tabla
let seccionComentarios = document.getElementById("seccionComentarios");
//leer documentos
db.collection("comentarios").onSnapshot((querySnapshot) => {
  //limpiar la tabla
      seccionComentarios.innerHTML = " ";
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().coment}`);
        seccionComentarios. innerHTML += ` 

        <div class="card">
                         <div class="card-header">
                              <img src="../images/user.png" alt="user">
                              <h5 id="user">Diana</h5>
                         </div>
                         <h6 class="coment">${doc.data().coment}</h6>
                         <div class="card-footer text-muted">
                              <button type="button" class="btn btn-outline-light" onclick = "editar('${doc.id}','${doc.data().coment}')"><img src="../images/edit.png" alt="Edit"></button>
                              <button type="button" class="btn btn-outline-light" onclick = "eliminar('${doc.id}')"><img src="../images/delete.png" alt="Delete"></button>
                          </div>
                      </div>`
    });
});
//borrar datos
function eliminar(id){
  db.collection("comentarios").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}
const editar = (id,mje) => {

document.getElementById("mje").value = mje;
let guardar = document.getElementById("guardar");
//crear evento onclick
guardar.onclick = function (){
  let washingtonRef = db.collection("comentarios").doc(id);
  //crear una variable para cada elemento que cambiara

  let mje = document.getElementById("mje").value;
  // hacer un update
return washingtonRef.update({
    coment: mje,
})
.then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

}
}